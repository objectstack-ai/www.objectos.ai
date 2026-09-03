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

// ─── Taiwanese vocabulary: s2twp, minus eight wrong entries ────────────────
//
// `twp` is the right preset. Its phrase layer is what turns 数据 into 資料,
// 程序 into 程式, 对象 into 物件, 接口 into 介面, 服务器 into 伺服器, 软件 into
// 軟體, 信息 into 資訊, 缓存 into 快取, 用户 into 使用者 and 默认/缺省 into
// 預設 — 123 of its 603 phrase entries fire in the blog corpus, and all but
// eight are the ordinary Taiwanese term. Dropping to plain `tw` to escape those
// eight would lose every one of the rest, so the preset stays and the eight are
// shadowed.
//
// HOW THE SHADOW WORKS. `s2twp` runs three conversion groups in order:
// [STPhrases, STCharacters] → [TWPhrases] → [TWVariants]. Inside one group the
// FIRST dictionary wins — `Trie.loadDictGroup` loads a group in reverse, so a
// dictionary listed earlier is loaded later and overwrites. An entry at the head
// of the TWPhrases group therefore replaces exactly that one TWPhrases rule and
// nothing else: the correction lands at the stage that introduces the defect,
// and the character conversion underneath is untouched. An entry whose two sides
// are equal disables the stock rule outright; an entry with a different right
// side substitutes for it.
//
// WHY OVERRIDE ENTRIES AND NOT A POST-PASS. Rewriting 許可權 back to 權限 after
// the fact would also rewrite a genuine 许可权 — a real Simplified word — that
// the preset had converted correctly. Shadowing leaves 许可权 → 許可權 alone and
// only stops 权限 from being rewritten. The same asymmetry is why 適配器 →
// 介面卡 is repaired here and not afterwards: 介面卡 is a real Taiwanese word (a
// network interface card), it is what a source 介面卡 must stay, and STPhrases
// carries it as an identity entry to keep it that way. A post-pass could not
// tell the two apart; the shadow never sees the genuine one.
//
// WHY THE SHADOW REACHES ALL EIGHT. Keyed on the post-s2t form, which is what
// the TWPhrases group sees — 权限 arrives as 權限, 镜像 as 鏡像, 扩展 as 擴展.
// And TWPhrases is the only dictionary in the chain that can emit any of the
// eight wrong strings at all, which is what makes shadowing it sufficient:
// across STPhrases (49276 entries), STCharacters (3882) and TWVariants (39),
// the only hit for any of them is STPhrases' identity entry 介面卡 → 介面卡,
// which can preserve a NIC but can never introduce one.
export const TWP_PHRASE_OVERRIDES: readonly (readonly [string, string])[] = [
  // 权限 → 許可權 is a Microsoft-glossary rendering; 權限 is the ordinary term in
  // Taiwanese technical and legal writing.
  ['權限', '權限'],
  // 实例 → 例項 is not standard Taiwanese usage in any register.
  ['實例', '實例'],

  // ── Mechanical over-substitutions: a fragment appended or swapped ────────
  //
  // These five are not contested vocabulary. The preset glues on a word part,
  // or swaps a character, in a way that is wrong in Taiwanese usage in any
  // register and for any audience — so each is corrected to the ordinary term
  // rather than merely disabled, since leaving the mainland spelling standing
  // would be its own defect.
  //
  // 全局 → 全域性 appends a 性 that turns the noun into an adjective.
  ['全局', '全域'],
  // 扩展 → 擴充套件 appends 套件 ("package"). Every use in this corpus is the
  // verb — extend a system, extend an object model — never a plug-in.
  ['擴展', '擴充'],
  // 适配器 → 介面卡 substitutes different hardware: 介面卡 is a network
  // interface card. The adapter of the adapter pattern is 配接器.
  ['適配器', '配接器'],
  // 控件 → 控制元件 appends 元件 ("component"). The standard UI-control term is
  // 控制項, which this corpus already ships elsewhere from a source 控制项 —
  // closing the split is half the point of the entry.
  ['控件', '控制項'],
  // 镜像 → 映象 swaps the second character; a disk or container image is 映像.
  // TWPhrases carries the same 象/像 slip a second time in 顯像管 → 映象管,
  // left alone deliberately: no source here writes 显像管, and a CRT is not
  // this card's business.
  ['鏡像', '映像'],

  // ── One normalization, not a repair ─────────────────────────────────────
  //
  // 脚本 → 指令碼 is the Microsoft-glossary rendering; 腳本 is the ordinary
  // Taiwanese word, and in this corpus the referent is always shell or webhook
  // glue in an automation argument, never a screenplay. The reason it cannot
  // wait for a vocabulary round is that the corpus already shipped BOTH: the
  // STPhrases entry 本里 matches across the word boundary in 脚本里 and blocks
  // the phrase layer along with the character layer, so a handful of sites
  // escaped the substitution and read 腳本 while the rest read 指令碼. The
  // identity entry settles every site the same way, straddled or not.
  ['腳本', '腳本'],
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
// text these rules touch reads 函數 rather than 函式; both spellings are listed
// so the rule holds once a straddle stops hiding one. 腳本 no longer depends on
// that — TWP_PHRASE_OVERRIDES settles it everywhere — but 指令碼 stays in the
// alternation for the same reason 函式 does: this list must not be the thing
// that breaks if an override above is ever reconsidered.
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
  // The five mechanical over-substitutions, bare and in the phrase shapes the
  // corpus actually writes. Each pins BOTH halves: the wrong string is gone and
  // the ordinary term is what took its place, so a preset bump that reinstated
  // 全域性 and a well-meant edit that merely disabled it both fail here.
  ['全局', '全域'],
  ['看清全局', '看清全域'],
  ['错误却是全局的', '錯誤卻是全域的'],
  ['一个全局定时服务', '一個全域定時服務'],
  ['扩展', '擴充'],
  ['逐步扩展', '逐步擴充'],
  ['扩展存量系统', '擴充存量系統'],
  ['适配器', '配接器'],
  ['接入适配器', '接入配接器'],
  ['控件', '控制項'],
  ['拖控件', '拖控制項'],
  ['镜像', '映像'],
  ['开放镜像格式', '開放映像格式'],
  ['离线容器镜像', '離線容器映像'],
  // 脚本 normalized, straddled (see LOCATIVE_LI) and not.
  ['脚本', '腳本'],
  ['写一段脚本', '寫一段腳本'],
  ['脚本和 webhook', '腳本和 webhook'],
  // …and the genuine words these five must never disturb. 介面卡 IS a Taiwanese
  // word — a network interface card — and a source that writes one keeps it;
  // that is the whole reason 适配器 is repaired in the phrase layer rather than
  // rewritten afterwards. 控制项 already converts to the same 控制項 the 控件
  // override now emits, which is the split this closes.
  ['介面卡', '介面卡'],
  ['全域', '全域'],
  ['控制项', '控制項'],
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
