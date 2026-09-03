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
import { CONVERSION_CASES, s2t, unresolvedLocatives } from '../src/lib/zhconvert.ts';

// The conversion itself — the preset, the two shadowed phrase entries and the
// locative repair — lives in `src/lib/zhconvert.ts`, because the site derives
// its Traditional UI strings, term labels, glossary and marketing pages from the
// same rules. Read that file before changing how anything converts; it explains
// why each override exists and why Node can load it. Node imports it directly
// via type stripping, which is why the specifier carries its `.ts` extension.
const convert = s2t;


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

// ─── Fixtures: the scoped rewrite and the conversion, pinned ───────────────
//
// This repo has no test runner, and the properties worth pinning are negative
// ones — a link is rewritten, an identical string inside code is not; 权限 comes
// out 權限 while a genuine 许可权 is left alone — which a later edit to the
// patterns above, or an opencc-js upgrade that reshuffles the phrase
// dictionaries, would break silently in output no one reads.
//
// This script is where both sets run, because `pnpm dev` and `pnpm build` both
// execute it before Astro starts: the link cases are this file's own, and the
// conversion cases come from `src/lib/zhconvert.ts`, which the site itself
// converts with. Pinning them here means a bad conversion fails the build before
// a single MDX file is written or a single page is served — which is the failure
// this round exists to prevent, since the conversion now reaches the nav,
// glossary and marketing routes as well as the corpus.
//
// The link cases run off a stub registry where `known` is built and `ghost` is
// not. Pure string work; the generator prints nothing unless a case fails.
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

  // The conversion cases live beside the rules they pin, in
  // `src/lib/zhconvert.ts`, because that module is what both the site and this
  // generator convert with. Running them here is what makes them run at all:
  // `pnpm dev` and `pnpm build` both execute this script before Astro starts.
  check('conversion', convert, CONVERSION_CASES);

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
