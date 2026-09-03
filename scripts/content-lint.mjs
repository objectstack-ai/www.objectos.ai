#!/usr/bin/env node
// Deterministic content checks for the blog publishing gate.
//
// Default behavior checks every MDX file. Use `--published` in CI/builds to
// skip archived content and check only indexable content. `--dist` is a
// separate mode that checks the BUILT HTML instead of the sources; it runs
// after `astro build` (see the `build` script in package.json).

import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { cwd, argv, exit } from 'node:process';
import yaml from 'js-yaml';
import { splitFrontmatter as splitFence } from './lib/frontmatter.mjs';

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const GLOSSARY = path.join(ROOT, 'content', 'glossary');
const PAGES = path.join(ROOT, 'content', 'pages');
const CLUSTERS_MODULE = path.join(ROOT, 'src', 'lib', 'clusters.ts');
const TERMS_MODULE = path.join(ROOT, 'src', 'lib', 'term-data.ts');
const args = new Set(argv.slice(2));
const onlyPublished = args.has('--published');
const today = new Date();
today.setHours(23, 59, 59, 999);

const VALID_STATUS = new Set(['published', 'archived']);

// ─── Built HTML: no literal `**` in rendered prose ────────────────────────
//
// A `**bold**` span whose delimiter touches CJK punctuation on the inside and
// a CJK letter on the outside is not a flanking delimiter run, so CommonMark
// emits the asterisks verbatim and the reader sees `**` mid-sentence. It is
// not a renderer bug and the markdown is valid, which is exactly why nothing
// else here catches it: this script's MDX pass, `astro check`, `astro build`
// and `seo:smoke` all pass on a post that renders broken. English almost never
// trips it because English puts a space next to the delimiter; the four CJK
// locales — the ones least likely to have a reader who reports it — trip it
// constantly. An audit at 4dd647c found 24 built pages in that state.
//
// Two decisions this check is deliberately built on:
//
//   * It reads the BUILT HTML, not the MDX. The defect exists only in rendered
//     output, so an MDX-level heuristic would have to re-implement CommonMark's
//     flanking rule tolerantly — and a tolerant re-parse of the thing being
//     gated is how a gate silently stops gating. The renderer's own output is
//     the only source that cannot disagree with the renderer.
//   * The `<code>`/`<pre>` exclusion is STRUCTURAL — the emitted HTML is parsed
//     and those elements skipped — not a regex hoping to spot a code fence.
//     Real pages depend on it: `<code>138****5678</code>` is a masked phone
//     number, and an English post quotes `**` in a snippet. Both are correct,
//     and a regex that tried to except them by pattern would either miss them
//     or punch a hole a real defect could hide in.
const DIST = path.join(ROOT, 'dist');

/** Elements whose text is not prose: never scanned. */
const SKIP_ELEMENTS = new Set(['code', 'pre']);

/**
 * HTML elements whose content is raw text rather than markup. Their bodies are
 * scripts and stylesheets, not anything a reader reads, and `**` is ordinary
 * there (`a ** b` is exponentiation). Skipped for the same reason as the two
 * above: the rule is about rendered prose.
 */
const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'textarea', 'title']);

/** Index of the `>` closing a tag, honouring quoted attribute values. */
function tagEnd(html, from) {
  let quote = null;
  for (let i = from; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === '>') {
      return i;
    }
  }
  return -1;
}

/**
 * Text nodes of a document that are prose: outside `<code>`/`<pre>` and outside
 * raw-text elements. Returns `{ index, text }` so a hit can be reported with
 * the surrounding sentence.
 */
function proseTextNodes(html) {
  const nodes = [];
  let i = 0;
  let skipDepth = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      if (skipDepth === 0) nodes.push({ index: i, text: html.slice(i) });
      break;
    }
    if (lt > i && skipDepth === 0) nodes.push({ index: i, text: html.slice(i, lt) });
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    if (html.startsWith('<!', lt)) {
      const end = tagEnd(html, lt + 2);
      i = end === -1 ? html.length : end + 1;
      continue;
    }
    const tag = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(lt, lt + 64));
    if (!tag) {
      // A bare `<` in text. Emitted HTML escapes it, but treating it as text
      // keeps an unexpected one visible to the scan instead of silently
      // swallowing the rest of the document.
      if (skipDepth === 0) nodes.push({ index: lt, text: '<' });
      i = lt + 1;
      continue;
    }
    const closing = tag[1] === '/';
    const name = tag[2].toLowerCase();
    const end = tagEnd(html, lt + tag[0].length);
    if (end === -1) break;
    const selfClosing = html[end - 1] === '/';
    i = end + 1;
    if (!closing && !selfClosing && RAW_TEXT_ELEMENTS.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, i);
      i = close === -1 ? html.length : close;
      continue;
    }
    if (SKIP_ELEMENTS.has(name)) {
      if (closing) skipDepth = Math.max(0, skipDepth - 1);
      else if (!selfClosing) skipDepth++;
    }
  }
  return nodes;
}

/**
 * `**` reaches a reader as two asterisks however it was spelled, so the numeric
 * and named character references for `*` are resolved before matching. Without
 * this the rule would be satisfiable by an escape that changes nothing a reader
 * sees.
 */
function decodeAsterisks(text) {
  return text.replace(/&(?:#0*42|#[xX]0*2[aA]|ast);/g, '*');
}

/** Every built blog page: `dist/<locale>/blog/<slug>/index.html`. */
async function builtBlogPages(dir) {
  const pages = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return pages;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...(await builtBlogPages(full)));
    else if (entry.name === 'index.html' && /(^|[\\/])blog[\\/]/.test(path.relative(DIST, full))) {
      pages.push(full);
    }
  }
  return pages;
}

/**
 * The gate. Returns the process exit code.
 *
 * A run that measured nothing is a failure, not a pass: with no `dist/`, or a
 * `dist/` holding no blog pages, "no page contains `**`" is true and means
 * nothing. Reporting that as green is how this gate would quietly stop gating
 * the day the build layout moves.
 */
async function checkBuiltProse() {
  const pages = await builtBlogPages(DIST);
  if (pages.length === 0) {
    console.error(
      `✗ content lint --dist found no built blog pages under ${path.relative(ROOT, DIST)}/.\n` +
        `  This mode reads the rendered HTML, so it must run AFTER \`astro build\` — ` +
        `\`pnpm build\` wires it in that order.\n` +
        `  Nothing was checked, which is not the same as nothing being wrong.`
    );
    return 1;
  }

  const offenders = [];
  for (const page of pages.sort()) {
    const html = await readFile(page, 'utf8');
    const hits = [];
    for (const node of proseTextNodes(html)) {
      const text = decodeAsterisks(node.text);
      let at = text.indexOf('**');
      while (at !== -1) {
        const from = Math.max(0, at - 60);
        hits.push(text.slice(from, at + 60).replace(/\s+/g, ' ').trim());
        at = text.indexOf('**', at + 2);
      }
    }
    if (hits.length > 0) offenders.push({ page: path.relative(DIST, page), hits });
  }

  if (offenders.length === 0) {
    console.log(
      `✓ content lint --dist passed (${pages.length} built blog page${pages.length === 1 ? '' : 's'} checked)`
    );
    return 0;
  }

  for (const { page, hits } of offenders) {
    console.log(`✗ ${page}: ${hits.length} literal ** in rendered prose`);
    for (const hit of hits) console.log(`    …${hit}…`);
  }
  console.error(
    `\n✗ content lint --dist failed (${offenders.length} page${offenders.length === 1 ? '' : 's'} of ` +
      `${pages.length} render a literal **)\n` +
      `  A bold span did not close. CommonMark closes \`**\` only on a flanking delimiter run: ` +
      `a closing run preceded by punctuation must also be followed by whitespace or punctuation, ` +
      `and an opening run followed by punctuation must be preceded by whitespace or punctuation. ` +
      `CJK prose puts a letter where English puts a space, so a delimiter sitting against ` +
      `（）「」。：" does not pair.\n` +
      `  Fix it by MOVING the delimiter, never by deleting the emphasis:\n` +
      `    **用語（gloss）**は…   ->  **用語**（gloss）は…      (past a trailing gloss)\n` +
      `    …しか呼べない。**モ    ->  …しか呼べない**。モ       (inside sentence punctuation)\n` +
      `    **"引用"**の…          ->  "**引用**"の…             (inside the quotes)\n` +
      `  Edit the authored locale; zh-Hant is generated by \`pnpm gen:zh-hant\`.`
  );
  return 1;
}

if (args.has('--dist')) {
  exit(await checkBuiltProse());
}

// The frontmatter taxonomy, derived from the module that declares it instead of
// restated here. `src/lib/term-data.ts` holds the same rows `src/content.config.ts`
// turns into its Zod enums (through `slugsByGroup` in `src/lib/terms.ts`), so one
// edit to the taxonomy moves this gate and the build together.
//
// A literal copy here was never a second opinion, it was a second producer of one
// fact — and it drifted in the direction an author feels: add a term, use it in a
// post, and this script rejected the post that `astro check` and `astro build`
// both accept, naming the post while the file to edit was this one.
//
// The frontmatter field and the taxonomy group differ in name for the audience
// axis: `audience` holds a `role` slug. `src/content.config.ts` maps it the same
// way (`audience: z.enum(ROLE)`).
const { RAW_TERMS, termSlugPath } = await readTermData();
const slugsInGroup = (group) =>
  new Set(RAW_TERMS.filter((term) => term.group === group).map((term) => term.slug));
const VALID_TOPIC = slugsInGroup('topic');
const VALID_AUDIENCE = slugsInGroup('role');
const VALID_SOLUTION = slugsInGroup('solution');
const VALID_INDUSTRY = slugsInGroup('industry');

// `topic` and `audience` carry one slug; `solutions` and `industries` carry a
// list of them (`z.array(z.enum(...)).default([])` in `src/content.config.ts`).
// Only an absent field defaults to the empty list there, so anything else that
// is not a list — `solutions:` with nothing after it parses as null — is an
// error here too, which is the point: this gate and the build should reach the
// same verdict on the same file.
const LIST_TERM_FIELDS = [
  { field: 'solutions', noun: 'solution', valid: VALID_SOLUTION },
  { field: 'industries', noun: 'industry', valid: VALID_INDUSTRY },
];
const PLACEHOLDERS = [
  { label: 'Write your article here', pattern: /write your article here/i },
  { label: 'your-domain.com', pattern: /your-domain\.com/i },
  { label: 'TODO', pattern: /\bTODO\b/ },
  { label: 'TBD', pattern: /\bTBD\b/i },
  { label: 'lorem ipsum', pattern: /lorem ipsum/i },
];

function localeFromFile(file) {
  const base = path.basename(file);
  const match = base.match(/^index\.([A-Za-z-]+)\.mdx$/);
  return match?.[1] ?? 'en';
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

// The fence itself is split by `scripts/lib/frontmatter.mjs`, shared with the
// sitemap's `lastmod` reader so the two cannot drift into accepting different
// files. The wording below stays here: this gate's messages are read by its
// callers, so the helper reports what went wrong and this function says it.
function splitFrontmatter(source, file) {
  const split = splitFence(source);
  if (!split.ok) {
    throw new Error(
      split.reason === 'no-opening-fence'
        ? `${file} does not start with YAML frontmatter`
        : `${file} has no closing frontmatter fence`
    );
  }
  return {
    raw: split.raw,
    body: split.body.trim(),
  };
}

function words(text) {
  const latin = text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?/g) ?? [];
  const han = text.match(/[\u3400-\u9fff]/g) ?? [];
  const kana = text.match(/[\u3040-\u30ff]/g) ?? [];
  const hangul = text.match(/[\uac00-\ud7af]/g) ?? [];
  return latin.length + Math.ceil((han.length + kana.length + hangul.length) / 2);
}

function localAssetRefs(data, body) {
  const refs = [];
  if (typeof data.cover === 'string' && data.cover.startsWith('./')) {
    refs.push(data.cover);
  }
  const imagePattern = /!\[[^\]]*]\((\.\/[^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const match of body.matchAll(imagePattern)) refs.push(match[1]);
  return refs;
}

function bodyImageRefs(body) {
  const refs = [];
  const imagePattern = /!\[[^\]]*]\((\.\/[^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const match of body.matchAll(imagePattern)) refs.push(match[1]);
  return refs;
}

// YAML parses a bare `2026-06-05` into a Date, so echoing the raw value back
// prints a full JS date string. Report the calendar day the author wrote.
function ymd(value) {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toISOString().slice(0, 10);
}

function addIssue(issues, file, data, severity, message) {
  issues.push({
    file,
    status: data?.status ?? 'unknown',
    severity,
    message,
  });
}

// ─── Internal cross-links ──────────────────────────────────────────────────
//
// Nothing else in the gate chain resolves an internal link target: `astro check`
// type-checks components, and the SEO smoke test only inspects pages that were
// built — a link to a page that never existed is invisible to both. So a typo in
// a body link or in a glossary `relatedTerms` slug reaches production as a 404
// (blog) or as a cross-link that silently renders as nothing (glossary).
//
// Both surfaces resolve against the same registries, built once below from the
// authored trees. The rule mirrors what the site actually builds, which differs
// per surface and is the whole reason locale severity is not uniform:
//
//   * blog       — `src/pages/[lang]/blog/[...slug].astro` emits paths only for
//                  locales that have a file. No fallback: a link to a locale
//                  with no `index.<locale>.mdx` is a hard 404, so it is an error.
//   * glossary   — `src/glossary/registry.ts` falls back to English, so an
//                  untranslated locale renders a real (noindexed, canonicalized)
//                  page. Missing translation is a warning; a slug authored in no
//                  locale at all is not built anywhere and is an error.
//   * marketing  — `src/content-pages/registry.ts`, same fallback rule as the
//                  glossary.
//   * cluster    — `src/lib/clusters.ts`, built for every locale unconditionally.
//   * topic hub  — `src/lib/term-data.ts` crossed with the published posts.
//                  `src/pages/[lang]/blog/topics/[...slug].astro` emits a hub
//                  only for a term some post in that locale carries, so a real
//                  term nobody has written about 404s exactly like a typo does.

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

/** Locale-less routes: `src/pages/*` plus whatever `public/` copies verbatim. */
const ROOT_ROUTES = new Set(['llms.txt', 'rss.xml']);

/** `content/blog/<slug>/index.mdx` + `index.<locale>.mdx` -> slug -> locales. */
async function readBlogRegistry() {
  const bySlug = new Map();
  for (const entry of await readdir(BLOG, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const locales = new Set();
    for (const file of await readdir(path.join(BLOG, entry.name))) {
      const match = file.match(/^index(?:\.([A-Za-z-]+))?\.mdx$/);
      if (match) locales.add(match[1] ?? 'en');
    }
    if (locales.size > 0) bySlug.set(entry.name, locales);
  }
  return bySlug;
}

/** `content/<tree>/<locale>/<slug>.ts` -> slug -> locales. */
async function readLocaleTree(dir) {
  const bySlug = new Map();
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    for (const file of await readdir(path.join(dir, entry.name))) {
      if (!file.endsWith('.ts')) continue;
      const slug = file.slice(0, -3);
      const locales = bySlug.get(slug) ?? new Set();
      locales.add(entry.name);
      bySlug.set(slug, locales);
    }
  }
  return bySlug;
}

async function readClusterSlugs() {
  try {
    const module = await import(pathToFileURL(CLUSTERS_MODULE).href);
    return new Set(module.CLUSTERS.map((cluster) => cluster.slug));
  } catch (error) {
    console.error(
      `✗ content lint could not read cluster slugs from src/lib/clusters.ts, so ` +
        `/<locale>/<cluster>/ links cannot be resolved.\n` +
        `  This script imports that module directly, which needs Node type ` +
        `stripping (Node 22.18+) and type-only imports in the module.\n` +
        `  ${error.message}`
    );
    exit(1);
  }
}

/**
 * The taxonomy itself, read once from the module that declares it. Two things in
 * this script need it — the frontmatter term checks above and the topic-hub
 * registry below — and reading it once is the point: a second reader is a second
 * producer of the same fact, which is the drift this gate exists to catch.
 *
 * The module is imported, never text-matched: re-deriving the slug list by
 * scraping a TypeScript file is exactly the tolerant re-parse a gate must not do.
 * `src/lib/term-data.ts` deliberately has no value imports so that plain Node can
 * load it; see its header before adding one.
 */
async function readTermData() {
  try {
    return await import(pathToFileURL(TERMS_MODULE).href);
  } catch (error) {
    console.error(
      `✗ content lint could not read the term list from src/lib/term-data.ts, so ` +
        `topic / audience / solutions / industries cannot be checked and ` +
        `/<locale>/blog/topics/<slug>/ links cannot be resolved.\n` +
        `  This script imports that module directly, which needs Node type ` +
        `stripping (Node 22.18+) and a module with no value imports — an ` +
        `extensionless specifier like './i18n' resolves under Vite only.\n` +
        `  ${error.message}`
    );
    exit(1);
  }
}

/**
 * Topic hubs — `/<locale>/blog/topics/<slugPath>/`, one page per term the site
 * has content for. Two separate facts decide whether such a URL exists, so the
 * registry carries both:
 *
 *   * the term list and its nesting, from `src/lib/term-data.ts` (`readTermData`
 *     above). This script calls that module's own `termSlugPath`, so the gate and
 *     the route cannot disagree about where a hub lives.
 *   * which terms have content in which locale. `getStaticPaths` emits a hub
 *     only for the terms `getAllUsedTerms(locale)` returns, and a topic hub also
 *     aggregates its children's articles (`articleHasTerm`, src/lib/posts.ts).
 *
 * Keyed on PUBLISHED posts whatever `--published` says: `astro build` exposes
 * published posts only (`shouldExposePost`), so a link asks what production
 * serves, not what `astro dev` additionally renders.
 */
async function readTermHubs() {
  const usedByLocale = new Map();
  for (const file of await walk(BLOG)) {
    let data;
    try {
      data = yaml.load(splitFrontmatter(await readFile(file, 'utf8'), file).raw) ?? {};
    } catch {
      continue; // malformed frontmatter is reported by the main pass
    }
    if (data.status !== 'published') continue;
    const locale = localeFromFile(file);
    const used = usedByLocale.get(locale) ?? new Set();
    for (const slug of [
      data.topic,
      data.audience,
      ...(Array.isArray(data.solutions) ? data.solutions : []),
      ...(Array.isArray(data.industries) ? data.industries : []),
    ]) {
      if (typeof slug === 'string' && slug !== '') used.add(slug);
    }
    usedByLocale.set(locale, used);
  }

  const childSlugs = new Map();
  for (const term of RAW_TERMS) {
    if (term.group !== 'topic' || !term.parent) continue;
    childSlugs.set(term.parent, [...(childSlugs.get(term.parent) ?? []), term.slug]);
  }

  const byPath = new Map(); // hub path -> locales the site builds it in
  const pathBySlug = new Map(); // term slug -> its one canonical hub path
  for (const term of RAW_TERMS) {
    const owned = [term.slug, ...(childSlugs.get(term.slug) ?? [])];
    const locales = new Set();
    for (const [locale, used] of usedByLocale) {
      if (owned.some((slug) => used.has(slug))) locales.add(locale);
    }
    byPath.set(termSlugPath(term), locales);
    pathBySlug.set(term.slug, termSlugPath(term));
  }
  return { byPath, pathBySlug };
}

/**
 * Locale segments the site routes. Derived from the authored trees rather than
 * hard-coded, so adding a locale needs no edit here: a locale is routable
 * exactly when it has content. zh-Hant is the one derived locale — the glossary
 * and marketing registries generate it from zh-Hans (s2t) instead of files.
 */
function routableLocales(...registries) {
  const locales = new Set();
  for (const registry of registries) {
    for (const set of registry.values()) for (const locale of set) locales.add(locale);
  }
  if (locales.has('zh-Hans')) locales.add('zh-Hant');
  return locales;
}

/** Does a locale-fallback registry (glossary, marketing) serve this locale? */
function fallbackLocaleState(locales, locale) {
  const derived = locale === 'zh-Hant' && locales.has('zh-Hans');
  if (locales.has(locale) || derived) return 'authored';
  return locales.has('en') ? 'fallback' : 'unbuilt';
}

const blogLocaleFile = (locale) => (locale === 'en' ? 'index.mdx' : `index.${locale}.mdx`);

/**
 * Code samples are not links. Strip fenced blocks and inline spans before
 * scanning so a documented URL in a snippet is never resolved.
 */
function stripCode(body) {
  return body.replace(/^ {0,3}(`{3,}|~{3,})[\s\S]*?^ {0,3}\1/gm, '').replace(/`[^`\n]*`/g, '');
}

/** Absolute internal links in a body: `[text](/en/blog/x/)` and `href="/en/..."`. */
function internalLinks(body) {
  const links = [];
  const source = stripCode(body);
  const markdown = /(?<!!)\[([^\]]*)]\((\/[^)\s]*)(?:\s+"[^"]*")?\)/g;
  for (const match of source.matchAll(markdown)) {
    links.push({ text: match[1], href: match[2] });
  }
  const attribute = /\bhref=["'](\/[^"'\s]*)["']/g;
  for (const match of source.matchAll(attribute)) {
    links.push({ text: match[1], href: match[1] });
  }
  return links;
}

/** Files `public/` serves at the site root, e.g. `/images/hero.png`. */
async function readPublicAssets(dir, prefix = '') {
  const assets = new Set();
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      for (const nested of await readPublicAssets(path.join(dir, entry.name), `${name}/`)) {
        assets.add(nested);
      }
    } else if (entry.isFile()) {
      assets.add(name);
    }
  }
  return assets;
}

/**
 * One `/<locale>/blog/topics/<slugPath>/` hub link. The path is a single
 * segment for a top-level term and `<parent>/<slug>` for a nested topic, which
 * is why a flat slug set is not enough to answer this: `governance/automation`
 * spells two real terms and names no page.
 */
function resolveTopicHub(locale, segments, hubs) {
  const example = [...hubs.byPath]
    .filter(([, locales]) => locales.has(locale))
    .map(([hubPath]) => hubPath)
    .sort()[0];
  const suggestion = example ? `, e.g. /${locale}/blog/topics/${example}/` : '';

  if (segments.length === 0) {
    return {
      severity: 'error',
      reason:
        `there is no topic index page — the route builds one page per term, so link a ` +
        `specific hub${suggestion}`,
    };
  }

  const slugPath = segments.join('/');
  const built = hubs.byPath.get(slugPath);
  if (!built) {
    const leaf = segments[segments.length - 1];
    const canonical = hubs.pathBySlug.get(leaf);
    if (canonical) {
      return {
        severity: 'error',
        reason:
          `the term "${leaf}" exists but its hub is /${locale}/blog/topics/${canonical}/ — ` +
          `a topic is nested under a parent only when it declares one in ` +
          `src/lib/term-data.ts, and "${slugPath}" is not a path the route builds`,
      };
    }
    return {
      severity: 'error',
      reason:
        `no term "${leaf}" in src/lib/term-data.ts, so no hub page exists at this URL — ` +
        `fix the slug, or add the term${suggestion}`,
    };
  }

  if (built.size === 0) {
    return {
      severity: 'error',
      reason:
        `the term "${slugPath}" is declared but no published post carries it, and the hub ` +
        `route builds a page only for terms with content, so this URL 404s in every locale`,
    };
  }
  if (!built.has(locale)) {
    return {
      severity: 'error',
      reason:
        `no published post in ${locale} carries the term "${slugPath}", and the hub route ` +
        `builds only the locales that have content, so this URL 404s — link ` +
        `/${[...built].sort().join('|')}/blog/topics/${slugPath}/, or translate a post ` +
        `that carries the term`,
    };
  }
  return null;
}

/**
 * Resolve one absolute internal link against the registries.
 * Returns null when the link resolves, otherwise `{ severity, reason }`.
 */
function resolveInternalLink(href, registries) {
  const clean = href.split('#')[0].split('?')[0];
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) return null; // "/" — the locale-picking root page
  const [locale, ...rest] = segments;
  if (!registries.locales.has(locale)) {
    const relative = segments.join('/');
    if (ROOT_ROUTES.has(relative) || registries.publicAssets.has(relative)) return null;
    return {
      severity: 'error',
      reason:
        `"${locale}" is not a routable locale segment; ` +
        `expected one of ${[...registries.locales].sort().join(', ')}`,
    };
  }
  if (rest.length === 0) return null; // locale home
  if (rest.length === 1 && STATIC_ROUTES.has(rest[0])) return null;

  if (rest[0] === 'blog') {
    if (rest[1] === 'topics') return resolveTopicHub(locale, rest.slice(2), registries.termHubs);
    if (rest.length !== 2) {
      return { severity: 'error', reason: 'not a blog post URL (/<locale>/blog/<slug>/)' };
    }
    const slug = rest[1];
    const locales = registries.blog.get(slug);
    if (!locales) {
      return {
        severity: 'error',
        reason: `no post directory content/blog/${slug}/ — create it, or fix the slug`,
      };
    }
    if (!locales.has(locale)) {
      return {
        severity: 'error',
        reason:
          `content/blog/${slug}/${blogLocaleFile(locale)} does not exist, and the blog ` +
          `route builds only the locales that have a file, so this URL 404s — ` +
          `translate the post or link ${`/${[...locales].sort().join('|')}/blog/${slug}/`}`,
      };
    }
    return null;
  }

  if (rest[0] === 'glossary') {
    if (rest.length !== 2) {
      return { severity: 'error', reason: 'not a glossary term URL (/<locale>/glossary/<slug>/)' };
    }
    const slug = rest[1];
    const locales = registries.glossary.get(slug);
    if (!locales) {
      return {
        severity: 'error',
        reason: `no term file content/glossary/*/${slug}.ts — create it, or fix the slug`,
      };
    }
    const state = fallbackLocaleState(locales, locale);
    if (state === 'unbuilt') {
      return {
        severity: 'error',
        reason:
          `the term is authored only in ${[...locales].sort().join(', ')}, and the glossary ` +
          `registry falls back to English only, so this URL is never built`,
      };
    }
    if (state === 'fallback') {
      return {
        severity: 'warn',
        reason:
          `content/glossary/${locale}/${slug}.ts does not exist, so this URL renders the ` +
          `noindexed English fallback`,
      };
    }
    return null;
  }

  if (rest.length === 1 && registries.clusters.has(rest[0])) return null;

  if (rest.length === 1) {
    const slug = rest[0];
    const locales = registries.pages.get(slug);
    if (!locales) {
      return {
        severity: 'error',
        reason:
          `no marketing page content/pages/*/${slug}.ts and no cluster with that slug ` +
          `in src/lib/clusters.ts — create one, or fix the slug`,
      };
    }
    const state = fallbackLocaleState(locales, locale);
    if (state === 'unbuilt') {
      return {
        severity: 'error',
        reason:
          `the page is authored only in ${[...locales].sort().join(', ')}, and the marketing ` +
          `registry falls back to English only, so this URL is never built`,
      };
    }
    if (state === 'fallback') {
      return {
        severity: 'warn',
        reason:
          `content/pages/${locale}/${slug}.ts does not exist, so this URL renders the ` +
          `noindexed English fallback`,
      };
    }
    return null;
  }

  return { severity: 'error', reason: 'not a route this site builds' };
}

// ─── Cross-locale body links ───────────────────────────────────────────────
//
// A link is resolvable and still wrong when it names a locale the file is not
// written in. `resolveInternalLink` above finds `/zh-Hans/blog/x/` in an `index.ja.mdx`
// perfectly real, because it is: the page builds, the link works, and the reader
// is quietly moved out of the language they were reading in — at which point the
// language switcher offers to "switch" them to the locale they were already in.
// Nothing else in the gate chain looks at the locale segment at all.
//
// THE RULE IS CONDITIONAL, AND THE CONDITION IS THE WHOLE DESIGN. A deliberate
// cross-locale link is a real thing: an English-only companion post linked from
// a translation is the author's only option, and the alternative — a same-locale
// URL that was never built — is a hard 404 the check above already rejects. So
// the finding fires only when the SAME-LOCALE TARGET EXISTS. Then the link is
// unambiguously a mistake, because the page the reader wanted is right there in
// their language.
//
// That is the same rule `scripts/gen-zh-hant.mjs` enforces on the generated side:
// it rewrites a `/zh-Hans/` link to `/zh-Hant/` only when the Traditional target
// is provably built, and withholds the rewrite otherwise because a manufactured
// 404 is worse than a cross-locale link. One rule, two enforcement points — the
// generator repairs the links it can reach, this catches the hand-written locales
// (`.ja`, `.ko`, `.de`, `.es`, `.fr`) that have no generator to blame. If the two
// ever disagree, one of them is wrong and a shared rule makes that visible.
//
// "The same-locale target exists" is answered by calling `resolveInternalLink`
// on the swapped URL rather than by re-deriving existence per surface. A second
// answer to that question is a second producer of one fact, and it would drift
// exactly where it matters: the two would disagree about some URL, and the
// disagreement would surface as a cross-locale error on a link whose same-locale
// form 404s — the manufactured 404 this rule exists to avoid. Reusing the
// resolver also means a `warn` verdict (the noindexed English fallback the
// glossary and marketing registries serve) does NOT count as existing. That is
// deliberate and conservative: choosing the real English page over a noindexed
// English-bodied duplicate is a defensible authoring call, not a mistake, and
// option 2's discipline is to fire only on the unambiguous case.

/** `/en/blog/x/#anchor` -> `/ja/blog/x/#anchor`. Null when there is no segment to swap. */
function withLocale(href, locale) {
  const match = href.match(/^\/[^/#?]+(\/[^#?]*)?([#?].*)?$/);
  if (!match) return null;
  return `/${locale}${match[1] ?? ''}${match[2] ?? ''}`;
}

/**
 * One body link read from a file written in `fileLocale`. Returns null when the
 * link is same-locale, carries no routable locale segment, or has no built
 * same-locale counterpart; otherwise `{ severity, reason }`.
 */
function crossLocaleMiss(href, fileLocale, registries) {
  const clean = href.split('#')[0].split('?')[0];
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) return null; // "/" — the locale-picking root page
  const linkLocale = segments[0];
  // A root route or a `public/` asset has no locale to be wrong about.
  if (!registries.locales.has(linkLocale)) return null;
  if (linkLocale === fileLocale) return null;

  const sameLocale = withLocale(href, fileLocale);
  if (!sameLocale || resolveInternalLink(sameLocale, registries) !== null) return null;

  // zh-Hant posts are generated from zh-Hans unless hand-maintained, so naming
  // the generated file as the place to edit would send the author to a file the
  // next `pnpm gen:zh-hant` overwrites.
  const authored =
    fileLocale === 'zh-Hant'
      ? ' If this file carries the `@generated` marker, fix the link in the zh-Hans source and re-run `pnpm gen:zh-hant`.'
      : '';

  return {
    severity: 'error',
    reason:
      `this file is the ${fileLocale} version, the link points at ${linkLocale}, and ` +
      `${sameLocale} IS built — so the reader is sent out of the language they were ` +
      `reading in for a page that exists in it. Change the locale segment to ` +
      `${sameLocale}; do not delete the link. (A cross-locale link is accepted when ` +
      `the same-locale target does not exist — an English-only companion post is the ` +
      `author's only option there, and this rule stays silent on it.)${authored}`,
  };
}

const registries = {
  blog: await readBlogRegistry(),
  glossary: await readLocaleTree(GLOSSARY),
  pages: await readLocaleTree(PAGES),
  clusters: await readClusterSlugs(),
  termHubs: await readTermHubs(),
  publicAssets: await readPublicAssets(path.join(ROOT, 'public')),
};
registries.locales = routableLocales(registries.blog, registries.glossary, registries.pages);

const files = await walk(BLOG);
const posts = [];
const issues = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const source = await readFile(file, 'utf8');
  let frontmatter;
  let body;
  let data;
  try {
    frontmatter = splitFrontmatter(source, rel);
    body = frontmatter.body;
    data = yaml.load(frontmatter.raw) ?? {};
  } catch (error) {
    addIssue(issues, rel, null, 'error', error.message);
    continue;
  }

  if (onlyPublished && data.status !== 'published') continue;

  const slug = path.basename(path.dirname(file));
  const locale = localeFromFile(file);
  const post = { file: rel, path: file, slug, locale, data, body };
  posts.push(post);

  for (const key of ['title', 'description', 'date', 'status', 'topic', 'audience']) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      addIssue(issues, rel, data, 'error', `Missing required frontmatter field: ${key}`);
    }
  }

  if (!VALID_STATUS.has(data.status)) {
    addIssue(issues, rel, data, 'error', `Invalid status: ${data.status}`);
  }
  if (data.topic && !VALID_TOPIC.has(data.topic)) {
    addIssue(issues, rel, data, 'error', `Invalid topic: ${data.topic}`);
  }
  if (data.audience && !VALID_AUDIENCE.has(data.audience)) {
    addIssue(issues, rel, data, 'error', `Invalid audience: ${data.audience}`);
  }

  // A frontmatter group nobody checks is the same defect as one checked against
  // a stale list, only further from being noticed: until this ran, an author
  // could put any string in `solutions` or `industries` and every gate this
  // script owns stayed green, leaving `astro build` to be the first to object.
  for (const { field, noun, valid } of LIST_TERM_FIELDS) {
    const value = data[field];
    if (value === undefined) continue;
    if (!Array.isArray(value)) {
      addIssue(issues, rel, data, 'error', `${field} must be a list of terms, got: ${value}`);
      continue;
    }
    for (const slug of value) {
      if (!valid.has(slug)) {
        addIssue(issues, rel, data, 'error', `Invalid ${noun}: ${slug}`);
      }
    }
  }

  if (typeof data.title === 'string') {
    if (data.title.length > 95) {
      addIssue(issues, rel, data, 'warn', `Title is long (${data.title.length} chars)`);
    }
    if (data.title.length < 12) {
      addIssue(issues, rel, data, 'warn', 'Title is very short');
    }
  }

  if (typeof data.description === 'string') {
    if (data.description.length < 55) {
      addIssue(issues, rel, data, 'warn', `Description is short (${data.description.length} chars)`);
    }
    if (data.description.length > 230) {
      addIssue(issues, rel, data, 'warn', `Description is long (${data.description.length} chars)`);
    }
  }

  if (data.date) {
    const date = new Date(data.date);
    if (Number.isNaN(date.getTime())) {
      addIssue(issues, rel, data, 'error', `Invalid date: ${data.date}`);
    } else if (date > today) {
      addIssue(issues, rel, data, 'warn', `Date is in the future: ${data.date}`);
    }
  }

  // `updated` = a later substantive revision. `date` stays the first-publication
  // date; refreshing an article must never rewrite it. This mirrors the schema
  // refinement in src/content.config.ts so the failure lands at the earlier,
  // more readable gate (this script runs before `astro build`).
  if (data.updated !== undefined && data.updated !== null && data.updated !== '') {
    const updated = new Date(data.updated);
    if (Number.isNaN(updated.getTime())) {
      addIssue(issues, rel, data, 'error', `Invalid updated: ${data.updated}`);
    } else {
      if (updated > today) {
        addIssue(issues, rel, data, 'warn', `Updated is in the future: ${ymd(data.updated)}`);
      }
      const date = data.date ? new Date(data.date) : null;
      if (date && !Number.isNaN(date.getTime()) && updated < date) {
        addIssue(
          issues,
          rel,
          data,
          'error',
          `updated (${ymd(data.updated)}) is earlier than date (${ymd(data.date)}); ` +
            '`date` is the first-publication date and must not be rewritten when refreshing'
        );
      }
    }
  }

  if (words(body) < 450) {
    addIssue(issues, rel, data, 'warn', `Body looks thin (${words(body)} estimated words)`);
  }

  const renderedContent = `${JSON.stringify(data)}\n${body}`;
  for (const placeholder of PLACEHOLDERS) {
    if (placeholder.pattern.test(renderedContent)) {
      addIssue(issues, rel, data, 'error', `Placeholder text found: ${placeholder.label}`);
    }
  }

  for (const ref of localAssetRefs(data, body)) {
    const target = path.join(path.dirname(file), ref);
    try {
      await access(target);
    } catch {
      addIssue(issues, rel, data, 'error', `Missing local asset: ${ref}`);
    }
  }

  if (
    typeof data.cover === 'string' &&
    data.cover.startsWith('./') &&
    bodyImageRefs(body).includes(data.cover)
  ) {
    addIssue(issues, rel, data, 'error', `Cover image is duplicated in article body: ${data.cover}`);
  }

  for (const link of internalLinks(body)) {
    const miss = resolveInternalLink(link.href, registries);
    if (miss) {
      addIssue(
        issues,
        rel,
        data,
        miss.severity,
        `Dangling internal link [${link.text}](${link.href}): ${miss.reason}`
      );
    }
    // A link that does not resolve at all is reported once, above. Its locale is
    // not the interesting fact about it, and a second finding on the same link
    // would send the author to fix the segment of a URL that 404s either way.
    if (miss?.severity === 'error') continue;
    const crossed = crossLocaleMiss(link.href, locale, registries);
    if (crossed) {
      addIssue(
        issues,
        rel,
        data,
        crossed.severity,
        `Cross-locale internal link [${link.text}](${link.href}): ${crossed.reason}`
      );
    }
  }

  const seenBodyImages = new Map();
  for (const ref of bodyImageRefs(body)) {
    const count = seenBodyImages.get(ref) ?? 0;
    seenBodyImages.set(ref, count + 1);
  }
  for (const [ref, count] of seenBodyImages) {
    if (count > 1) {
      addIssue(issues, rel, data, 'error', `Body image is repeated ${count} times: ${ref}`);
    }
  }
}

// ─── Every published post has an English original ─────────────────────────
//
// English is the source language; every other locale is a translation of it,
// and `src/pages/[lang]/blog/[...slug].astro` builds only the locales that have
// a file. So a directory publishing `index.zh-Hans.mdx` with no `index.mdx` is
// not a partly-translated post — it is a post that does not exist in the
// primary market at all, and nothing else notices: the site builds clean, the
// Chinese pages render, and the gap is visible only to someone counting files.
// An audit at 676ef13 found eight posts in exactly that state.
//
// The rule keys on PUBLISHED locale files rather than on file presence, so a
// draft or archived translation written before the English original is fine —
// only a *live* post with no English original is a violation. It reuses the
// blog registry built above rather than walking the tree again.
//
// Opt-out: `noEnglishOriginal: "<reason>"` on the published locale file, for a
// post whose argument is already covered by a different English page (writing
// the original would ship a competitor to a live page for one intent). The
// reason is mandatory — an exemption without one is a gap wearing the costume
// of a decision — and every honoured exemption is printed, so an exempt post
// cannot quietly become an invisible one.
const EXEMPT_FIELD = 'noEnglishOriginal';
const honouredExemptions = new Set();

const publishedTranslations = new Map();
for (const post of posts) {
  if (post.data.status !== 'published' || post.locale === 'en') continue;
  const group = publishedTranslations.get(post.slug) ?? [];
  group.push(post);
  publishedTranslations.set(post.slug, group);
}

for (const slug of [...publishedTranslations.keys()].sort()) {
  // `readBlogRegistry` records 'en' exactly when `index.mdx` is on disk. The
  // question here is whether the English original EXISTS, not what status it
  // carries: an archived English original is a deliberate retirement, not drift.
  if (registries.blog.get(slug)?.has('en')) continue;

  const group = publishedTranslations.get(slug).sort((a, b) => a.file.localeCompare(b.file));
  let exempt = false;
  for (const post of group) {
    const reason = post.data[EXEMPT_FIELD];
    if (reason === undefined || reason === null) continue;
    if (typeof reason !== 'string' || reason.trim() === '') {
      addIssue(
        issues,
        post.file,
        post.data,
        'error',
        `${EXEMPT_FIELD} must carry the reason as a non-empty string, e.g. ` +
          `${EXEMPT_FIELD}: "covered in English by /en/blog/<other-slug>/" — an exemption ` +
          `with no reason records nothing, so it is not honoured`
      );
      continue;
    }
    exempt = true;
    // zh-Hant is generated from zh-Hans (`pnpm gen:zh-hant` copies the whole
    // file), so an opt-out written once appears on both; identical reasons
    // collapse to one line here, and genuinely different reasons both print.
    honouredExemptions.add(`content/blog/${slug} — ${reason.trim()}`);
  }
  if (exempt) continue;

  const localeFiles = group.map((post) => path.basename(post.path)).join(', ');
  addIssue(
    issues,
    group[0].file,
    group[0].data,
    'error',
    `content/blog/${slug}/ publishes ${localeFiles} but has no index.mdx; English is the ` +
      `source language and the blog route builds only the locales that have a file, so ` +
      `this post is absent from the primary market while looking fine everywhere else — ` +
      `write the English original at content/blog/${slug}/index.mdx, or, if its argument ` +
      `is already covered by another English page, record why on the published locale ` +
      `file with ${EXEMPT_FIELD}: "<reason>"`
  );
}

// An opt-out on a post that DOES have an English original is a stale claim: the
// frontmatter says "deliberately no English page" next to the English page.
// Not blocking — the post is correct — but it must not rot unseen.
for (const post of posts) {
  const reason = post.data[EXEMPT_FIELD];
  if (reason === undefined || reason === null) continue;
  if (!registries.blog.get(post.slug)?.has('en')) continue;
  addIssue(
    issues,
    post.file,
    post.data,
    'warn',
    `${EXEMPT_FIELD} is stale: content/blog/${post.slug}/index.mdx exists, so this post ` +
      `has an English original and the exemption records nothing — remove the field`
  );
}

// ─── Glossary cross-references ────────────────────────────────────────────
//
// `src/components/GlossaryTermPage.astro` maps every `relatedTerms`,
// `pageSlugs` and `articleSlugs` entry through a registry lookup and filters
// the misses out before render — correct at runtime (an untranslated article is
// not a broken promise) and invisible at authoring time, so a permanently
// misspelled slug produces a passing build and a cross-link that never appears.
//
// `articleSlugs` is deliberately existence-only: dropping an article that is
// untranslated in the current locale is the intended behaviour, so the question
// is "does this slug name a post at all", not "does it resolve in every locale".
const terms = [];
for (const locale of await readdir(GLOSSARY, { withFileTypes: true })) {
  if (!locale.isDirectory()) continue;
  for (const file of await readdir(path.join(GLOSSARY, locale.name))) {
    if (!file.endsWith('.ts')) continue;
    const full = path.join(GLOSSARY, locale.name, file);
    const rel = path.relative(ROOT, full);
    const fileSlug = file.slice(0, -3);
    let term;
    try {
      term = (await import(pathToFileURL(full).href)).default;
    } catch (error) {
      addIssue(issues, rel, { status: 'published' }, 'error', `Cannot load term: ${error.message}`);
      continue;
    }
    // The registry keys terms by `term.slug` and drops any file whose slug does
    // not match its filename, so a mismatch removes the term from the site as
    // silently as a dangling cross-link — and would make the slug set this
    // check resolves against wrong.
    if (term.slug !== fileSlug) {
      addIssue(
        issues,
        rel,
        { status: 'published' },
        'error',
        `Term slug "${term.slug}" does not match its filename "${fileSlug}.ts"; ` +
          `the glossary registry drops the file, so the term is never published`
      );
    }
    terms.push({ file: rel, locale: locale.name, term });
  }
}

for (const { file, term } of terms) {
  const crossRefs = [
    {
      key: 'relatedTerms',
      values: term.relatedTerms,
      resolves: (slug) => registries.glossary.has(slug),
      remedy: (slug) => `add content/glossary/*/${slug}.ts, or fix the slug`,
    },
    {
      key: 'articleSlugs',
      values: term.articleSlugs,
      resolves: (slug) => registries.blog.has(slug),
      remedy: (slug) => `add content/blog/${slug}/, or fix the slug`,
    },
    {
      key: 'pageSlugs',
      values: term.pageSlugs,
      resolves: (slug) => registries.pages.has(slug),
      remedy: (slug) => `add content/pages/*/${slug}.ts, or fix the slug`,
    },
  ];
  for (const { key, values, resolves, remedy } of crossRefs) {
    if (!Array.isArray(values)) {
      addIssue(issues, file, { status: 'published' }, 'error', `Missing required field: ${key}`);
      continue;
    }
    for (const slug of values) {
      if (!resolves(slug)) {
        addIssue(
          issues,
          file,
          { status: 'published' },
          'error',
          `Dangling ${key} slug "${slug}": nothing resolves it, so the cross-link is ` +
            `dropped before render — ${remedy(slug)}`
        );
      }
    }
  }
}

function duplicateKey(post, key) {
  const value = post.data[key];
  return typeof value === 'string'
    ? `${post.locale}::${value.trim().toLowerCase()}`
    : null;
}

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const post of posts) {
    const value = duplicateKey(post, key);
    if (!value) continue;
    const first = seen.get(value);
    if (first) {
      const severity =
        first.data.status === 'published' && post.data.status === 'published'
          ? 'error'
          : 'warn';
      addIssue(
        issues,
        post.file,
        post.data,
        severity,
        `Duplicate ${key} in ${post.locale}; first seen in ${first.file}`
      );
    } else {
      seen.set(value, post);
    }
  }
}

const blocking = issues.filter(
  (issue) =>
    issue.severity === 'error' &&
    (issue.status === 'published' || issue.status === 'unknown')
);

const checked = `${posts.length} file${posts.length === 1 ? '' : 's'}, ${terms.length} glossary term${terms.length === 1 ? '' : 's'}`;

// Print before the issue list and before the clean-run early exit: an exemption
// suppresses a blocking error, so it has to be visible on a passing run too —
// that is the whole difference between a documented decision and a silent gap.
for (const exemption of [...honouredExemptions].sort()) {
  console.log(`honoured exemption: ${exemption}`);
}

if (issues.length === 0) {
  console.log(`✓ content lint passed (${checked} checked)`);
  exit(0);
}

for (const issue of issues) {
  const marker =
    issue.severity === 'error' &&
    (issue.status === 'published' || issue.status === 'unknown')
      ? '✗'
      : issue.severity === 'error'
        ? '!'
        : '•';
  console.log(`${marker} ${issue.file}: ${issue.message}`);
}

if (blocking.length > 0) {
  console.error(`\n✗ content lint failed (${blocking.length} blocking issue${blocking.length === 1 ? '' : 's'})`);
  exit(1);
}

console.log(`\n✓ content lint passed (${checked} checked)`);
