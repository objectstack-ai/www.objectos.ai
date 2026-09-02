#!/usr/bin/env node
// Deterministic content checks for the blog publishing gate.
//
// Default behavior checks every MDX file. Use `--published` in CI/builds to
// skip archived content and check only indexable content.

import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { cwd, argv, exit } from 'node:process';
import yaml from 'js-yaml';

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const GLOSSARY = path.join(ROOT, 'content', 'glossary');
const PAGES = path.join(ROOT, 'content', 'pages');
const CLUSTERS_MODULE = path.join(ROOT, 'src', 'lib', 'clusters.ts');
const args = new Set(argv.slice(2));
const onlyPublished = args.has('--published');
const today = new Date();
today.setHours(23, 59, 59, 999);

const VALID_STATUS = new Set(['published', 'archived']);
const VALID_TOPIC = new Set([
  'ai-agents',
  'app-building',
  'integration-data',
  'automation',
  'modernization',
  'governance',
  'customer-stories',
]);
const VALID_AUDIENCE = new Set(['business', 'it', 'developer', 'general']);
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

function splitFrontmatter(source, file) {
  if (!source.startsWith('---\n')) {
    throw new Error(`${file} does not start with YAML frontmatter`);
  }
  const end = source.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error(`${file} has no closing frontmatter fence`);
  }
  return {
    raw: source.slice(4, end),
    body: source.slice(end + 4).trim(),
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
    // Topic hubs come from `src/lib/terms.ts`, which this script cannot import
    // (it value-imports extensionless modules that only Vite resolves), so the
    // shape is recognized but the slug is not resolved. Tracked separately.
    if (rest[1] === 'topics') return null;
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

const registries = {
  blog: await readBlogRegistry(),
  glossary: await readLocaleTree(GLOSSARY),
  pages: await readLocaleTree(PAGES),
  clusters: await readClusterSlugs(),
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
