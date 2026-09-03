#!/usr/bin/env node
// Generate Traditional-Chinese (zh-Hant, Taiwan / s2twp) blog posts from the
// Simplified (zh-Hans) sources. Auto-convert by default; a hand-written
// zh-Hant file (one WITHOUT the @generated marker) is left untouched so you
// can polish tone/idioms for specific articles.
//
// Runs before `pnpm dev` and `pnpm build`.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import * as OpenCC from 'opencc-js';
import { ConverterBuilder } from 'opencc-js/core';

// ─── Taiwanese vocabulary: s2twp, minus two wrong entries ──────────────────
//
// `twp` is the right preset. Its phrase layer is what turns 数据 into 資料,
// 程序 into 程式, 对象 into 物件, 接口 into 介面, 服务器 into 伺服器, 软件 into
// 軟體, 信息 into 資訊, 缓存 into 快取, 用户 into 使用者 and 默认/缺省 into
// 預設 — 145 of its 603 phrase entries fire in this corpus, and all but two are
// the ordinary Taiwanese term. Dropping to plain `tw` to escape those two would
// lose every one of the rest, so the preset stays and the two are shadowed.
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
const TWP_PHRASE_OVERRIDES = [
  // 权限 → 許可權 is a Microsoft-glossary rendering; 權限 is the ordinary term in
  // Taiwanese technical and legal writing. Keyed on the post-s2t form, which is
  // what the TWPhrases group sees.
  ['權限', '權限'],
  // 实例 → 例項 is not standard Taiwanese usage in any register.
  ['實例', '實例'],
];

/** `s2twp` with TWP_PHRASE_OVERRIDES shadowing the head of its phrase group. */
function buildVocabularyConverter() {
  const stock = OpenCC.Locale.configs?.s2twp;
  if (!stock || stock.conversionChain?.length !== 3) {
    console.error(
      '✗ gen-zh-hant: opencc-js no longer exposes an s2twp config with three ' +
        'conversion groups, so the phrase overrides have nowhere to sit. ' +
        'Re-derive them against the new shape before taking the upgrade.'
    );
    process.exit(1);
  }
  return ConverterBuilder({
    from: OpenCC.Locale.from,
    to: OpenCC.Locale.to,
    configs: {
      ...OpenCC.Locale.configs,
      s2twp: {
        segmentation: stock.segmentation,
        // Group 1 is [TWPhrases]; the override goes in front of it.
        conversionChain: stock.conversionChain.map((group, i) =>
          i === 1 ? [TWP_PHRASE_OVERRIDES, ...group] : group
        ),
      },
    },
  })({ from: 'cn', to: 'twp' });
}

// ─── 里 → 裡: the locative, where a straddling phrase match pinned it ───────
//
// Not vocabulary. STCharacters already converts a bare 里 to 裏, which
// TWVariants then makes 裡, so the locative is OpenCC's default and 541 of the
// 553 locatives in this corpus come out right unaided. The twelve that do not
// are all one accident: OpenCC segments the Simplified text with STPhrases
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
const LOCATIVE_LI = [
  // …里 directly after a technical artifact. `(?!程)` holds 里程碑 out: 系統里程碑
  // is a milestone, not something inside the system.
  [/(指令碼|腳本|架構|系統|週報|檔案|定義|函數|函式)里(?!程)/g, '$1裡'],
  // …道里 — a word ending in 道 followed by the locative. Matched as whole words,
  // never as a bare 道 + 里, so the district 道里 itself is left alone.
  [/(知道|報道|頻道|通道)里(?!程)/g, '$1裡'],
];

/**
 * 里 that is genuinely 里. Only used to keep the warning below quiet; being
 * absent from this list costs a line of build output, never a wrong character.
 */
const GENUINE_LI =
  /公里|英里|海里|華里|里程|里長|里民|里弄|鄰里|故里|鄉里|萬里|千里|百里|里根|里加|里拉|阿里|巴里|德里|克里|居里/g;

const convertVocabulary = buildVocabularyConverter();

/** s2twp with the two phrase entries shadowed and the straddled 里 repaired. */
function convert(source) {
  let out = convertVocabulary(source);
  for (const [pattern, replacement] of LOCATIVE_LI) out = out.replace(pattern, replacement);
  return out;
}

/** Every 里 left in a converted file that LOCATIVE_LI did not claim. */
function unresolvedLocatives(text) {
  const found = [];
  for (const match of text.replace(GENUINE_LI, '').matchAll(/.{0,8}里.{0,8}/g)) {
    found.push(match[0].replace(/\s+/g, ' ').trim());
  }
  return found;
}

// Pure-ASCII marker so OpenCC never touches it and includes() is reliable.
const MARKER =
  '# @generated zh-Hant from zh-Hans (s2twp) — edit the zh-Hans file; delete this line to hand-maintain.';

const ROOT = process.cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const GLOSSARY = path.join(ROOT, 'content', 'glossary');

// ─── Cross-locale body links ───────────────────────────────────────────────
//
// OpenCC only rewrites Han characters, so an internal link written in the
// Simplified source as `[标题](/zh-Hans/blog/some-slug/)` survives verbatim into
// the generated file, and the Traditional page then sends a Traditional reader
// to the Simplified companion post. Rewriting `/zh-Hans/…` to `/zh-Hant/…` on
// the way out fixes that — but only where the Traditional target is actually
// built. A wrong-locale link is a defect; a link the generator turned into a
// 404 is a worse one, so a target this script cannot prove is left alone and
// reported instead.
//
// WHERE THE CONDITIONAL IS LOAD-BEARING. Two routes are emitted per-locale with
// no fallback, so only they can 404 after a rewrite:
//
//   * blog posts — `src/pages/[lang]/blog/[...slug].astro` emits a path only for
//     the locales where the post has a file. That is the check below: the
//     Traditional file exists after this run when the Simplified source exists
//     (this script writes it) or a hand-maintained copy is already there.
//   * topic hubs — `src/pages/[lang]/blog/topics/[...slug].astro` emits a path
//     only for locales where a post actually *uses* the term. Resolving that
//     needs the term extractor in `src/lib/terms.ts`, which this script does not
//     import, so `/zh-Hans/blog/topics/…` is never rewritten — reported instead.
//
// WHERE NO CHECK IS NEEDED, AND SO NONE IS INVENTED. Everything else under a
// routed locale builds for zh-Hant exactly when it builds for zh-Hans:
//
//   * the locale home and the per-locale static pages are `src/pages/[lang]/*`,
//     emitted for every entry of `LOCALES` in `src/lib/i18n.ts` — zh-Hant is one.
//   * glossary terms and marketing pages derive zh-Hant from zh-Hans and fall
//     back to English (`src/glossary/registry.ts`, `src/content-pages/registry.ts`),
//     so the two locales resolve together or not at all. The one thing that can
//     still be false is the term existing anywhere, which is checked.
//   * clusters are emitted for every locale unconditionally, but a bare
//     `/zh-Hans/<slug>/` is ambiguous between a cluster and a marketing page
//     without importing `src/lib/clusters.ts`, so an unmatched single segment is
//     reported rather than rewritten.
//
// WHERE THE REWRITE NEVER APPLIES. Link targets only. Fenced blocks and inline
// spans are masked out first, using the same two patterns `scripts/content-lint.mjs`
// strips before it resolves links, so the generator and the validator agree on
// what counts as a link. Frontmatter is excluded by construction — only the body
// is handed to the rewriter — and a slug is never a link target, so slugs (in
// frontmatter, in the URL itself, or in a `relatedTerms` list) are never touched.

/** URL segments under `/<locale>/` that are pages rather than content slugs. */
const STATIC_ROUTES = new Set([
  'blog',
  'glossary',
  'pricing',
  'privacy',
  'refunds',
  'rss.xml',
  'security',
  'terms',
]);

/** Locales the glossary/marketing registries can serve a zh-Hant page from. */
const HANT_SOURCE_LOCALES = ['zh-Hant', 'zh-Hans', 'en'];

/** Fenced code blocks and inline code spans. Mirrors content-lint's stripCode. */
const CODE = /^ {0,3}(`{3,}|~{3,})[\s\S]*?^ {0,3}\1|`[^`\n]*`/gm;

/** `[text](/path)` and `[text](/path "title")`, never images. Mirrors content-lint. */
const MARKDOWN_LINK = /(?<!!)(\[[^\]]*]\()(\/[^)\s]*)((?:\s+"[^"]*")?\))/g;

/** `href="/path"`. Mirrors content-lint. */
const HREF_ATTRIBUTE = /(\bhref=["'])(\/[^"'\s]*)(["'])/g;

/**
 * Will the site build `/zh-Hant<rest>`? `rest` is the path after the locale
 * segment, e.g. `/blog/some-slug/`. Unproven shapes answer false so the caller
 * leaves the Simplified link in place rather than inventing a 404.
 */
function zhHantTargetBuilds(rest) {
  const segments = rest.split('/').filter(Boolean);
  if (segments.length === 0) return true; // locale home
  if (segments.length === 1 && STATIC_ROUTES.has(segments[0])) return true;

  if (segments.length === 2 && segments[0] === 'blog') {
    const slug = segments[1];
    if (slug === 'topics') return false; // needs the term extractor; see above
    const dir = path.join(BLOG, slug);
    return (
      existsSync(path.join(dir, 'index.zh-Hans.mdx')) ||
      existsSync(path.join(dir, 'index.zh-Hant.mdx'))
    );
  }

  if (segments.length === 2 && segments[0] === 'glossary') {
    const slug = segments[1];
    return HANT_SOURCE_LOCALES.some((locale) =>
      existsSync(path.join(GLOSSARY, locale, `${slug}.ts`))
    );
  }

  return false;
}

/**
 * `/zh-Hans/blog/x/#anchor` -> `/zh-Hant/blog/x/#anchor`, or null when this is
 * not a Simplified link or its Traditional target is not provably built.
 */
function localizeHref(href, targetBuilds) {
  const match = href.match(/^\/zh-Hans(\/[^#?]*)?([#?].*)?$/);
  if (!match) return null;
  const rest = match[1] ?? '';
  const suffix = match[2] ?? '';
  if (!targetBuilds(rest)) return null;
  return `/zh-Hant${rest}${suffix}`;
}

/** Rewrite link targets in one run of prose (never called on code). */
function rewriteProse(text, targetBuilds, onSkip) {
  const swap = (open, href, close) => {
    const localized = localizeHref(href, targetBuilds);
    if (localized) return `${open}${localized}${close}`;
    if (href.startsWith('/zh-Hans/') || href === '/zh-Hans') onSkip(href);
    return `${open}${href}${close}`;
  };
  return text
    .replace(MARKDOWN_LINK, (_whole, open, href, close) => swap(open, href, close))
    .replace(HREF_ATTRIBUTE, (_whole, open, href, close) => swap(open, href, close));
}

/** Rewrite link targets in a post body, leaving every code region byte-identical. */
function rewriteBodyLinks(body, targetBuilds, onSkip) {
  let out = '';
  let cursor = 0;
  for (const match of body.matchAll(CODE)) {
    out += rewriteProse(body.slice(cursor, match.index), targetBuilds, onSkip);
    out += match[0]; // code, verbatim
    cursor = match.index + match[0].length;
  }
  return out + rewriteProse(body.slice(cursor), targetBuilds, onSkip);
}

/** Split the leading `---\n…\n---\n` block off, so the body alone is rewritten. */
function splitFrontmatter(source) {
  const match = source.match(/^---\n[\s\S]*?\n---\n/);
  if (!match) return { head: '', body: source };
  return { head: match[0], body: source.slice(match[0].length) };
}

// ─── Fixtures: the scoped rewrite and the vocabulary, pinned ───────────────
//
// This repo has no test runner, and the properties worth pinning are negative
// ones — a link is rewritten, an identical string inside code is not; 权限 comes
// out 權限 while a genuine 许可权 is left alone — which a later edit to the
// patterns above, or an opencc-js upgrade that reshuffles the phrase
// dictionaries, would break silently in generated output no one reads. A preset
// bump that reinstated 許可權 would put it back in 435 places, in `title` tags,
// cards, RSS and the sitemap, with nothing to say it had happened. So the cases
// run on every `pnpm dev` and `pnpm build`, off a stub registry where `known` is
// built and `ghost` is not. Pure string work; the generator prints nothing
// unless a case fails.
function selfTest() {
  const failures = [];
  const check = (label, run, cases) => {
    for (const [input, expected] of cases) {
      const actual = run(input);
      if (actual !== expected) failures.push({ label, input, expected, actual });
    }
  };

  const stub = (rest) =>
    rest === '' || rest === '/' || rest === '/blog/known/' || rest === '/glossary/known/';
  check('link-rewrite', (input) => rewriteBodyLinks(input, stub, () => {}), [
    // A body link is rewritten…
    ['[标题](/zh-Hans/blog/known/)', '[标题](/zh-Hant/blog/known/)'],
    ['<a href="/zh-Hans/blog/known/">x</a>', '<a href="/zh-Hant/blog/known/">x</a>'],
    ['[t](/zh-Hans/blog/known/#anchor)', '[t](/zh-Hant/blog/known/#anchor)'],
    ['[t](/zh-Hans/blog/known/ "title")', '[t](/zh-Hant/blog/known/ "title")'],
    ['[t](/zh-Hans/glossary/known/)', '[t](/zh-Hant/glossary/known/)'],
    ['[t](/zh-Hans/)', '[t](/zh-Hant/)'],
    // …and the same string in code is not.
    ['`/zh-Hans/blog/known/`', '`/zh-Hans/blog/known/`'],
    ['`[t](/zh-Hans/blog/known/)`', '`[t](/zh-Hans/blog/known/)`'],
    ['```\n[t](/zh-Hans/blog/known/)\n```', '```\n[t](/zh-Hans/blog/known/)\n```'],
    ['~~~md\n[t](/zh-Hans/blog/known/)\n~~~', '~~~md\n[t](/zh-Hans/blog/known/)\n~~~'],
    // Neither is anything whose Traditional target is not provably built.
    ['[t](/zh-Hans/blog/ghost/)', '[t](/zh-Hans/blog/ghost/)'],
    ['[t](/zh-Hans/blog/topics/agents/)', '[t](/zh-Hans/blog/topics/agents/)'],
    // Not link targets: images, other locales, and a look-alike prefix.
    ['![alt](/zh-Hans/blog/known/cover.png)', '![alt](/zh-Hans/blog/known/cover.png)'],
    ['[t](/en/blog/known/)', '[t](/en/blog/known/)'],
    ['[t](/zh-Hansard/blog/known/)', '[t](/zh-Hansard/blog/known/)'],
    // Prose either side of a fence is still rewritten.
    [
      '[a](/zh-Hans/blog/known/)\n```\n/zh-Hans/blog/known/\n```\n[b](/zh-Hans/blog/known/)',
      '[a](/zh-Hant/blog/known/)\n```\n/zh-Hans/blog/known/\n```\n[b](/zh-Hant/blog/known/)',
    ],
  ]);

  check('conversion', convert, [
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
  ]);

  if (failures.length > 0) {
    console.error('✗ gen-zh-hant: fixture failed');
    for (const { label, input, expected, actual } of failures) {
      console.error(`  [${label}]`);
      console.error(`  in:       ${JSON.stringify(input)}`);
      console.error(`  expected: ${JSON.stringify(expected)}`);
      console.error(`  actual:   ${JSON.stringify(actual)}`);
    }
    process.exit(1);
  }
}

selfTest();

const entries = await readdir(BLOG, { withFileTypes: true }).catch(() => []);
const slugs = entries.filter((d) => d.isDirectory()).map((d) => d.name);

let made = 0;
let kept = 0;
let relinked = 0;
const skipped = [];
const locatives = [];
for (const slug of slugs) {
  const src = path.join(BLOG, slug, 'index.zh-Hans.mdx');
  const out = path.join(BLOG, slug, 'index.zh-Hant.mdx');
  if (!existsSync(src)) continue;

  // Respect a hand-maintained Traditional override.
  if (existsSync(out)) {
    const current = await readFile(out, 'utf8');
    if (!current.includes(MARKER)) {
      kept++;
      continue;
    }
  }

  const raw = await readFile(src, 'utf8');
  // OpenCC only rewrites Han characters, so YAML keys, slugs, markdown
  // syntax and code stay intact. Convert first, then point body links at the
  // Traditional locale, then stamp the marker.
  const { head, body } = splitFrontmatter(convert(raw));
  const rel = path.relative(ROOT, out);
  const localized = rewriteBodyLinks(body, zhHantTargetBuilds, (href) =>
    skipped.push({ file: rel, href })
  );
  if (localized !== body) relinked++;
  const converted = `${head}${localized}`.replace(/^---\n/, `---\n${MARKER}\n`);
  for (const ctx of unresolvedLocatives(converted)) locatives.push({ file: rel, ctx });
  await writeFile(out, converted, 'utf8');
  made++;
}

console.log(
  `✓ zh-Hant: generated ${made}, kept ${kept} hand-maintained, ` +
    `${relinked} with body links pointed at /zh-Hant/`
);

if (skipped.length > 0) {
  console.warn(
    `⚠ zh-Hant: left ${skipped.length} /zh-Hans/ link(s) as-is — no provable ` +
      `Traditional build, and a manufactured 404 is worse than a cross-locale link:`
  );
  for (const { file, href } of skipped) console.warn(`    ${file}: ${href}`);
}

if (locatives.length > 0) {
  console.warn(
    `⚠ zh-Hant: ${locatives.length} 里 the locative whitelist did not claim. ` +
      `Each is either a genuine 里 (add it to GENUINE_LI to quiet this line) or a ` +
      `straddled locative that belongs in LOCATIVE_LI — a wrong 裡 is invisible to ` +
      `the reader who would catch it, so neither list guesses:`
  );
  for (const { file, ctx } of locatives) console.warn(`    ${file}: …${ctx}…`);
}
