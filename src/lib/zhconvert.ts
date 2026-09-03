import * as OpenCC from 'opencc-js';
import { ConverterBuilder } from 'opencc-js/core';
import type { DictGroup, DictLike, LocalePreset } from 'opencc-js/core';

// How this site converts Simplified (mainland) to Traditional (Taiwan) — the
// ONE definition of it. Used at build time from two worlds:
//
//   * under Vite, by `s2t` below, which derives every Traditional UI string,
//     term label, glossary entry and marketing page from its zh-Hans source, so
//     we never hand-maintain Traditional copies of fixed strings;
//   * under plain Node, by `scripts/gen-zh-hant.mjs`, which regenerates
//     `content/blog/**/index.zh-Hant.mdx`.
//
// It used to be defined twice: this file held a bare `s2twp` converter and the
// generator held a corrected one. The result shipped a page whose article text
// said 權限 under a nav item that said 許可權 — right in the prose, wrong in the
// chrome, in the same viewport. So both callers now build from here.
//
// ⛔ Node loads this module directly (`import('…/zhconvert.ts')`, type
// stripping, Node 22.18+), which resolves specifiers by Node's own rules. Bare
// package specifiers like `opencc-js` are fine in both worlds; an extensionless
// RELATIVE specifier such as `./i18n` is Vite-only and would make the generator
// fail with ERR_MODULE_NOT_FOUND. Keep relative imports out of this file — the
// same constraint `src/lib/term-data.ts` documents, for the same reason.

// ─── Taiwanese vocabulary: s2twp, minus two wrong entries ──────────────────
//
// `twp` is the right preset. Its phrase layer is what turns 数据 into 資料,
// 程序 into 程式, 对象 into 物件, 接口 into 介面, 服务器 into 伺服器, 软件 into
// 軟體, 信息 into 資訊, 缓存 into 快取, 用户 into 使用者 and 默认/缺省 into
// 預設 — 123 of its 603 phrase entries fire in the blog corpus, and all but two
// are the ordinary Taiwanese term. Dropping to plain `tw` to escape those two
// would lose every one of the rest, so the preset stays and the two are
// shadowed.
//
// HOW THE SHADOW WORKS. `s2twp` runs three conversion groups in order:
// [STPhrases, STCharacters] → [TWPhrases] → [TWVariants]. Inside one group the
// FIRST dictionary wins — `Trie.loadDictGroup` loads a group in reverse, so a
// dictionary listed earlier is loaded later and overwrites. An identity entry at
// the head of the TWPhrases group therefore disables exactly that one TWPhrases
// rule and nothing else: the correction lands at the stage that introduces the
// defect, and the character conversion underneath is untouched.
//
// WHY IDENTITY ENTRIES AND NOT A POST-PASS. Rewriting 許可權 back to 權限 after
// the fact would also rewrite a genuine 许可权 — a real Simplified word — that
// the preset had converted correctly. Shadowing leaves 许可权 → 許可權 alone and
// only stops 权限 from being rewritten. TWPhrases is the only dictionary in the
// chain that can emit 許可權 or 例項 at all: STPhrases (49276 entries),
// STCharacters (3882) and TWVariants (39) contain neither string.
export const TWP_PHRASE_OVERRIDES: readonly (readonly [string, string])[] = [
  // 权限 → 許可權 is a Microsoft-glossary rendering; 權限 is the ordinary term in
  // Taiwanese technical and legal writing. Keyed on the post-s2t form, which is
  // what the TWPhrases group sees.
  ['權限', '權限'],
  // 实例 → 例項 is not standard Taiwanese usage in any register.
  ['實例', '實例'],
];

/** `s2twp` with TWP_PHRASE_OVERRIDES shadowing the head of its phrase group. */
function buildVocabularyConverter(): (text: string) => string {
  const stock = OpenCC.Locale.configs?.s2twp;
  if (!stock || stock.conversionChain?.length !== 3) {
    throw new Error(
      'opencc-js no longer exposes an s2twp config with three conversion groups, ' +
        'so the phrase overrides in src/lib/zhconvert.ts have nowhere to sit. ' +
        'Re-derive them against the new shape before taking the upgrade.'
    );
  }
  const preset: LocalePreset = {
    from: OpenCC.Locale.from,
    to: OpenCC.Locale.to,
    configs: {
      ...OpenCC.Locale.configs,
      s2twp: {
        segmentation: stock.segmentation,
        // Group 1 is [TWPhrases]; the override goes in front of it.
        conversionChain: stock.conversionChain.map((group, i) =>
          i === 1 ? ([TWP_PHRASE_OVERRIDES as DictLike, ...group] as DictGroup) : group
        ),
      },
    },
  };
  return ConverterBuilder(preset)({ from: 'cn', to: 'twp' });
}

// ─── 里 → 裡: the locative, where a straddling phrase match pinned it ───────
//
// Not vocabulary. STCharacters already converts a bare 里 to 裏, which
// TWVariants then makes 裡, so the locative is OpenCC's default and 541 of the
// 553 locatives in the blog corpus come out right unaided. The twelve that do
// not are all one accident: OpenCC segments the Simplified text with STPhrases
// before converting it, and a two-character STPhrases entry that pins 里 as 里 —
// a place name, a proper noun, a measure word — matches ACROSS the word
// boundary and takes the 里 with it:
//
//   脚本里 → 本里 (a village)          函数里    → 数里 (a distance)
//   架构里根本 / 系统里根本 → 里根 (Reagan)   文件里加 → 里加 (Riga)
//   周报里拉出 → 里拉 (the lira)        定义里长 → 里长 (a village chief)
//   知道里面 → 道里 (a district of Harbin)
//
// Each of those entries is right in its own context, so none of them is
// shadowed; the straddle is repaired after conversion instead, and only behind a
// listed word. A wrong 裡 is worse than a wrong 里 — the reader who would catch it
// never sees it — so this is a whitelist by construction. It cannot fire on 公里,
// 英里, 里程碑, 鄰里, 里長 or a place name, because none of those follow one of
// the listed words. The straddle also blocks the phrase layer, which is why the
// text these rules touch reads 腳本 and 函數 rather than 指令碼 and 函式; both
// spellings are listed so the rule holds once a straddle stops hiding one.
export const LOCATIVE_LI: readonly (readonly [RegExp, string])[] = [
  // …里 directly after a technical artifact. `(?!程)` holds 里程碑 out: 系統里程碑
  // is a milestone, not something inside the system.
  [/(指令碼|腳本|架構|系統|週報|檔案|定義|函數|函式)里(?!程)/g, '$1裡'],
  // …道里 — a word ending in 道 followed by the locative. Matched as whole words,
  // never as a bare 道 + 里, so the district 道里 itself is left alone.
  [/(知道|報道|頻道|通道)里(?!程)/g, '$1裡'],
];

/**
 * 里 that is genuinely 里. Only used to keep the generator's warning quiet;
 * being absent from this list costs a line of build output, never a wrong
 * character.
 */
export const GENUINE_LI =
  /公里|英里|海里|華里|里程|里長|里民|里弄|鄰里|故里|鄉里|萬里|千里|百里|里根|里加|里拉|阿里|巴里|德里|克里|居里/g;

const convertVocabulary = buildVocabularyConverter();

/**
 * Simplified (mainland) → Traditional (Taiwan, phrase conversion), with the two
 * wrong preset entries shadowed and the straddled locative repaired.
 */
export const s2t = (s: string): string => {
  let out = convertVocabulary(s);
  for (const [pattern, replacement] of LOCATIVE_LI) out = out.replace(pattern, replacement);
  return out;
};

/** Every 里 in converted text that LOCATIVE_LI did not claim. */
export function unresolvedLocatives(text: string): string[] {
  const found: string[] = [];
  for (const match of text.replace(GENUINE_LI, '').matchAll(/.{0,8}里.{0,8}/g)) {
    found.push(match[0].replace(/\s+/g, ' ').trim());
  }
  return found;
}

// ─── Fixture: the conversion, pinned ───────────────────────────────────────
//
// This repo has no test runner, and the property worth pinning is a negative
// one — 权限 comes out 權限 while a genuine 许可权 is left alone — which an
// opencc-js upgrade that reshuffles the phrase dictionaries, or an edit to the
// rules above, would break silently in build output no one reads. A preset bump
// that reinstated 許可權 would put it back in 435 blog occurrences AND in the nav
// of every Traditional page, in `title` tags, cards, RSS and the sitemap, with
// nothing to say it had happened.
//
// The cases live here, next to the rules they pin, and are run by
// `scripts/gen-zh-hant.mjs`, which `pnpm dev` and `pnpm build` both execute
// before Astro starts — so nothing is written or served without them passing.
export const CONVERSION_CASES: readonly (readonly [string, string])[] = [
  // The two shadowed TWPhrases entries — bare, and in the phrase contexts the
  // corpus actually uses, since the phrase layer is what the shadow sits in.
  ['权限', '權限'],
  ['权限边界', '權限邊界'],
  ['行级权限', '行級權限'],
  ['读取权限', '讀取權限'],
  ['字段级权限', '欄位級權限'],
  ['权限检查跑在哪一层', '權限檢查跑在哪一層'],
  ['实例', '實例'],
  ['实例化', '實例化'],
  ['数据库实例', '資料庫實例'],
  // …and a genuine 许可权 / 例项 in the source still converts on its own terms.
  ['许可权', '許可權'],
  ['例项', '例項'],
  // The rest of the preset still applies. This is the whole reason `twp` is
  // kept rather than dropped to `tw` to escape the two entries above.
  ['数据 程序 对象 接口 服务器', '資料 程式 物件 介面 伺服器'],
  ['软件 信息 缓存 用户 默认 缺省', '軟體 資訊 快取 使用者 預設 預設'],
  // The UI strings this module derives — the half that shipped wrong until the
  // two converters were merged into one.
  ['权限与安全', '權限與安全'],
  ['权限模型', '權限模型'],
  ['字段级权限与审计', '欄位級權限與審計'],
  // The straddled locative 里, in every shape the corpus produced it.
  ['只存在于命令式处理函数里', '只存在於命令式處理函數裡'],
  ['流程隐藏在脚本里', '流程隱藏在腳本裡'],
  ['系统里根本没有', '系統裡根本沒有'],
  ['架构里根本没有', '架構裡根本沒有'],
  ['从周报里拉出来', '從週報裡拉出來'],
  ['在规则文件里加三条', '在規則檔案裡加三條'],
  ['而该从定义里长出来', '而該從定義裡長出來'],
  ['用户不知道里面有什么', '使用者不知道裡面有什麼'],
  // …and the genuine 里 it must never touch: a distance, a milestone, a
  // village, a district, a place name.
  ['五公里', '五公里'],
  ['本周里程碑', '本週里程碑'],
  ['系统里程碑', '系統里程碑'],
  ['邻里和里长', '鄰里和里長'],
  ['道里区', '道里區'],
  ['万里长城', '萬里長城'],
];
