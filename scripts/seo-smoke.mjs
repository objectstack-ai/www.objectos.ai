#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cwd, exit } from 'node:process';
import { decodeEntities, languageMismatches } from './lib/text-lang.mjs';

const ROOT = cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.objectos.ai';
const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'de', 'es', 'fr', 'ko'];
const issues = [];

// Marketing pages rendered from fallback content are intentionally
// canonicalized to the source locale and noindexed (see [cluster].astro),
// so the expectations below are derived from which locales actually have
// a content file per slug under content/pages/.
const CONTENT_PAGES = path.join(ROOT, 'content', 'pages');
const FALLBACK_LOCALE = 'en';
const marketingContentLocales = new Map();
for (const dirent of await readdir(CONTENT_PAGES, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  for (const entry of await readdir(path.join(CONTENT_PAGES, dirent.name))) {
    if (!entry.endsWith('.ts')) continue;
    const slug = entry.replace(/\.ts$/, '');
    if (!marketingContentLocales.has(slug)) marketingContentLocales.set(slug, new Set());
    marketingContentLocales.get(slug).add(dirent.name);
  }
}
// zh-Hant marketing pages are derived from zh-Hans at build time (registry
// deepS2t), so they count as first-class localized pages too.
for (const locales of marketingContentLocales.values()) {
  if (locales.has('zh-Hans')) locales.add('zh-Hant');
}
// Glossary term pages follow exactly the same fallback rule as marketing pages
// (see src/pages/[lang]/glossary/), so the expectations are derived the same
// way: from which locales actually have an authored file per slug. The glossary
// is a first-class page type here, not an optional extra — an empty or missing
// content tree is an error, so this coverage cannot silently become a no-op.
const CONTENT_GLOSSARY = path.join(ROOT, 'content', 'glossary');
const glossaryContentLocales = new Map();
const glossaryLocales = new Set();
try {
  for (const dirent of await readdir(CONTENT_GLOSSARY, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    for (const entry of await readdir(path.join(CONTENT_GLOSSARY, dirent.name))) {
      if (!entry.endsWith('.ts')) continue;
      const slug = entry.replace(/\.ts$/, '');
      if (!glossaryContentLocales.has(slug)) glossaryContentLocales.set(slug, new Set());
      glossaryContentLocales.get(slug).add(dirent.name);
      glossaryLocales.add(dirent.name);
    }
  }
} catch {
  issues.push('Missing content/glossary: the glossary surface has no authored content');
}
// zh-Hant glossary terms are derived from zh-Hans at build time (registry
// deepS2t), so they count as first-class localized pages too.
for (const locales of glossaryContentLocales.values()) {
  if (locales.has('zh-Hans')) locales.add('zh-Hant');
}
if (glossaryLocales.has('zh-Hans')) glossaryLocales.add('zh-Hant');
const GLOSSARY_SLUGS = [...glossaryContentLocales.keys()].sort();

const CLUSTER_SLUGS = [
  'ai-native-app-platform',
  'legacy-system-modernization',
  'self-hosted-ai',
  'crm-case-management-ai',
  'manufacturing-ai',
];
const CLUSTER_PATHS = LOCALES.flatMap((locale) =>
  CLUSTER_SLUGS.map((slug) => `/${locale}/${slug}/`)
);
// Only the English cluster pages are written per cluster; every other locale's
// is one template with the name swapped (src/lib/cluster-i18n.ts), so those are
// fallbacks: noindexed, canonical to English, and out of llms.txt and the
// sitemap. When a locale gets real per-cluster copy, this list grows with it.
const CLUSTER_AUTHORED_LOCALES = new Set(['en']);

async function readDist(file) {
  try {
    return await readFile(path.join(DIST, file), 'utf8');
  } catch {
    issues.push(`Missing dist file: ${file}`);
    return '';
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    if (entry.isFile()) files.push(full);
  }
  return files;
}

function requireContains(file, body, pattern, message) {
  const ok = typeof pattern === 'string' ? body.includes(pattern) : pattern.test(body);
  if (!ok) issues.push(`${file}: ${message}`);
}

function requireExcludes(file, body, pattern, message) {
  const present = typeof pattern === 'string' ? body.includes(pattern) : pattern.test(body);
  if (present) issues.push(`${file}: ${message}`);
}

const robots = await readDist('robots.txt');
requireContains(
  'robots.txt',
  robots,
  `Sitemap: ${SITE}/sitemap-index.xml`,
  'does not point crawlers to the sitemap index'
);

const sitemapIndex = await readDist('sitemap-index.xml');
requireContains('sitemap-index.xml', sitemapIndex, `${SITE}/sitemap-0.xml`, 'missing sitemap-0.xml entry');

const sitemap = await readDist('sitemap-0.xml');
requireContains('sitemap-0.xml', sitemap, `${SITE}/en/blog/`, 'missing English blog index');
requireContains('sitemap-0.xml', sitemap, `${SITE}/zh-Hans/blog/`, 'missing Simplified Chinese blog index');

const llms = await readDist('llms.txt');
requireContains('llms.txt', llms, '# ObjectOS', 'missing title');
requireContains('llms.txt', llms, '## English Articles', 'missing English article section');
requireContains('llms.txt', llms, '## Simplified Chinese Articles', 'missing Simplified Chinese article section');
requireContains('llms.txt', llms, '## Glossary', 'missing glossary section');
requireContains(
  'llms.txt',
  llms,
  '## Simplified Chinese Glossary',
  'missing Simplified Chinese glossary section'
);
if (GLOSSARY_SLUGS.length === 0) {
  issues.push('content/glossary: no glossary terms found — the glossary surface is empty');
}
for (const locale of ['en', 'zh-Hans']) {
  requireContains(
    'llms.txt',
    llms,
    `${SITE}/${locale}/glossary/`,
    `missing ${locale} glossary index`
  );
  requireContains(
    'sitemap-0.xml',
    sitemap,
    `${SITE}/${locale}/glossary/`,
    `missing ${locale} glossary index`
  );
  for (const slug of GLOSSARY_SLUGS) {
    const termUrl = `${SITE}/${locale}/glossary/${slug}/`;
    requireContains('llms.txt', llms, termUrl, `missing glossary term ${termUrl}`);
    requireContains('sitemap-0.xml', sitemap, termUrl, `missing glossary term ${termUrl}`);
  }
}
for (const clusterPath of CLUSTER_PATHS) {
  const url = `${SITE}${clusterPath}`;
  if (CLUSTER_AUTHORED_LOCALES.has(clusterPath.split('/')[1])) {
    requireContains('llms.txt', llms, url, `missing cluster page ${clusterPath}`);
    requireContains('sitemap-0.xml', sitemap, url, `missing cluster page ${clusterPath}`);
  } else {
    requireExcludes('llms.txt', llms, `(${url})`, `lists templated cluster page ${clusterPath}`);
    requireExcludes('sitemap-0.xml', sitemap, `<loc>${url}</loc>`, `lists templated cluster page ${clusterPath}`);
  }
}

// The 404 surface. Cloudflare Pages treats a deployment with no top-level
// `404.html` as a single-page app: every missing URL answers 200 with the root
// language-redirect page, which is a soft 404 to crawlers and a silent landing
// on a home page for readers. With one, Pages serves the NEAREST `404.html` to
// the missing URL with status 404, so each locale carries its own at
// `<locale>/404.html` (renamed there by the `locale-404` integration in
// astro.config.mjs). A 404 page answers for every missing URL, so it names no
// canonical, is noindexed, stays out of the sitemap, and links the three
// pages a lost reader most likely wants.
const NOT_FOUND_PAGES = [
  { file: '404.html', locale: 'en' },
  ...LOCALES.map((locale) => ({ file: `${locale}/404.html`, locale })),
];
for (const { file, locale } of NOT_FOUND_PAGES) {
  const html = await readDist(file);
  if (!html) continue;
  requireContains(file, html, `<html lang="${locale}">`, 'missing matching html lang');
  requireContains(file, html, '<meta name="robots" content="noindex, nofollow">', '404 page must be noindexed');
  requireExcludes(file, html, 'rel="canonical"', '404 page must not name a canonical URL');
  requireExcludes(file, html, 'property="og:url"', '404 page must not name an Open Graph URL');
  // Inside <main>: the header already links all three on every page, so a
  // whole-document match would pass with the 404 body missing.
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  for (const href of [`/${locale}/`, `/${locale}/blog/`, `/${locale}/pricing/`]) {
    requireContains(file, main, `href="${href}"`, `404 page body must link ${href}`);
  }
}
for (const locale of LOCALES) {
  const leftover = `${locale}/404/index.html`;
  const exists = await access(path.join(DIST, leftover)).then(() => true, () => false);
  if (exists) issues.push(`${leftover}: the per-locale 404 was not moved to ${locale}/404.html — it is a 200-status page`);
}
requireExcludes('sitemap-0.xml', sitemap, /\/404(\.html|\/)?<\/loc>/, 'lists a 404 page');

const rootRss = await readDist('rss.xml');
requireContains('rss.xml', rootRss, '<rss version="2.0"', 'is not an RSS feed');
requireContains('rss.xml', rootRss, `${SITE}/rss.xml`, 'missing root feed self URL');
requireContains('rss.xml', rootRss, '<item>', 'has no feed items');

for (const locale of LOCALES) {
  const rss = await readDist(`${locale}/rss.xml`);
  requireContains(`${locale}/rss.xml`, rss, '<rss version="2.0"', 'is not an RSS feed');
  requireContains(`${locale}/rss.xml`, rss, `${SITE}/${locale}/rss.xml`, 'missing locale feed self URL');
  requireContains(`${locale}/rss.xml`, rss, '<item>', 'has no feed items');
}

for (const clusterPath of CLUSTER_PATHS) {
  const file = `${clusterPath.replace(/^\//, '')}index.html`;
  const html = await readDist(file);
  requireContains(file, html, `${SITE}${clusterPath}`, 'missing absolute cluster URL');
  requireContains(file, html, '"@type":"FAQPage"', 'missing FAQPage JSON-LD');
  requireContains(file, html, '"@type":"ItemList"', 'missing reading path ItemList JSON-LD');
}

// Glossary pages carry the same locale guarantees as every other page type:
// per-page canonical, noindex on untranslated fallbacks, and hreflang only for
// locales where the term really exists.
for (const locale of LOCALES) {
  const indexFile = `${locale}/glossary/index.html`;
  const indexHtml = await readDist(indexFile);
  const indexIsFallback = !glossaryLocales.has(locale);
  const indexCanonical = indexIsFallback ? `${SITE}/en/glossary/` : `${SITE}/${locale}/glossary/`;
  requireContains(indexFile, indexHtml, '"@type":"DefinedTermSet"', 'missing DefinedTermSet JSON-LD');
  requireContains(
    indexFile,
    indexHtml,
    `<link rel="canonical" href="${indexCanonical}">`,
    'missing expected canonical URL'
  );
  if (indexIsFallback) {
    requireContains(
      indexFile,
      indexHtml,
      '<meta name="robots" content="noindex, nofollow">',
      'fallback-content glossary index must be noindexed'
    );
    requireExcludes(
      indexFile,
      indexHtml,
      `hreflang="${locale}" href="${SITE}/${locale}/glossary/"`,
      'fallback-content glossary index must not advertise itself as an hreflang equivalent'
    );
  }

  for (const slug of GLOSSARY_SLUGS) {
    const file = `${locale}/glossary/${slug}/index.html`;
    const html = await readDist(file);
    const contentLocales = glossaryContentLocales.get(slug);
    const isFallback = !contentLocales.has(locale);
    const canonical = isFallback
      ? `${SITE}/en/glossary/${slug}/`
      : `${SITE}/${locale}/glossary/${slug}/`;
    requireContains(file, html, '"@type":"DefinedTerm"', 'missing DefinedTerm JSON-LD');
    requireContains(file, html, '"@type":"BreadcrumbList"', 'missing BreadcrumbList JSON-LD');
    requireContains(
      file,
      html,
      `<link rel="canonical" href="${canonical}">`,
      'missing expected canonical URL'
    );
    if (isFallback) {
      requireContains(
        file,
        html,
        '<meta name="robots" content="noindex, nofollow">',
        'fallback-content glossary term must be noindexed'
      );
      requireExcludes(
        file,
        html,
        `hreflang="${locale}" href="${SITE}/${locale}/glossary/${slug}/"`,
        'fallback-content glossary term must not advertise itself as an hreflang equivalent'
      );
    }
    // Every locale that really has the term must be advertised as an equivalent.
    for (const equivalent of contentLocales) {
      requireContains(
        file,
        html,
        `hreflang="${equivalent}" href="${SITE}/${equivalent}/glossary/${slug}/"`,
        `missing hreflang for real equivalent ${equivalent}`
      );
    }
  }
}

// Marketing pages carry the same locale guarantees as glossary pages: per-page
// canonical, noindex on untranslated fallbacks, and hreflang only for locales
// where the page really exists. The canonical half is covered by the generic
// sweep below; the hreflang half is asserted only here. Marketing pages are a
// first-class surface, so an empty content tree is an error, not a silent no-op.
const MARKETING_SLUGS = [...marketingContentLocales.keys()].sort();
if (MARKETING_SLUGS.length === 0) {
  issues.push('content/pages: no marketing pages found — the marketing surface is empty');
}
for (const locale of LOCALES) {
  for (const slug of MARKETING_SLUGS) {
    const file = `${locale}/${slug}/index.html`;
    const html = await readDist(file);
    const contentLocales = marketingContentLocales.get(slug);
    if (!contentLocales.has(locale)) {
      requireContains(
        file,
        html,
        '<meta name="robots" content="noindex, nofollow">',
        'fallback-content marketing page must be noindexed'
      );
    }
    // A locale with no authored file renders fallback content and is noindexed,
    // so no page of this slug may name it as an hreflang equivalent — least of
    // all the fallback page itself.
    for (const other of LOCALES) {
      if (contentLocales.has(other)) continue;
      requireExcludes(
        file,
        html,
        `hreflang="${other}" href="${SITE}/${other}/${slug}/"`,
        other === locale
          ? 'fallback-content marketing page must not advertise itself as an hreflang equivalent'
          : `must not advertise noindexed fallback locale ${other} as an hreflang equivalent`
      );
    }
    // Every locale that really has the page must be advertised as an equivalent.
    for (const equivalent of contentLocales) {
      requireContains(
        file,
        html,
        `hreflang="${equivalent}" href="${SITE}/${equivalent}/${slug}/"`,
        `missing hreflang for real equivalent ${equivalent}`
      );
    }
  }
}

// The language switcher answers a different question from hreflang: it should
// offer the reader the same page in the locale they pick, fallback locales
// included, because those URLs are really built and render fine. Narrowing the
// hreflang set must not narrow the switcher — before `navAlternates` existed,
// one prop fed both and a reader on /ja/mcp/ who picked German landed on /de/.
// Header.astro renders the switcher twice (desktop `menu-item`, mobile
// `drawer-lang`); both are checked, since fixing only one is the likely defect.
const SWITCHER_ANCHOR = /class="((?:menu-item|drawer-lang)[^"]*)" href="([^"]+)" data-lang="([^"]+)"/g;

function checkSwitcher(file, html, locale, pathFor) {
  const anchors = [...html.matchAll(SWITCHER_ANCHOR)];
  // Two switchers x every locale. A markup change that drops the attributes
  // would otherwise turn this whole check into a silent no-op.
  if (anchors.length !== LOCALES.length * 2) {
    issues.push(
      `${file}: expected ${LOCALES.length * 2} language-switcher links, found ${anchors.length}`
    );
    return;
  }
  let active = 0;
  for (const [, className, href, lang] of anchors) {
    if (href !== pathFor(lang)) {
      issues.push(
        `${file}: language switcher sends ${lang} to ${href}, not ${pathFor(lang)} — ` +
          'the switcher must offer the same page in the chosen locale'
      );
    }
    if (!className.includes('active')) continue;
    active += 1;
    if (lang !== locale) {
      issues.push(`${file}: language switcher marks ${lang} active on a ${locale} page`);
    }
    if (href !== pathFor(locale)) {
      issues.push(
        `${file}: active language-switcher entry points at ${href}, not the page being read`
      );
    }
  }
  if (active !== 2) {
    issues.push(`${file}: expected 1 active language-switcher entry per switcher, found ${active}`);
  }
}

for (const locale of LOCALES) {
  for (const slug of MARKETING_SLUGS) {
    if (marketingContentLocales.get(slug).has(locale)) continue;
    const file = `${locale}/${slug}/index.html`;
    checkSwitcher(file, await readDist(file), locale, (lang) => `/${lang}/${slug}/`);
  }
  for (const slug of GLOSSARY_SLUGS) {
    if (glossaryContentLocales.get(slug).has(locale)) continue;
    const file = `${locale}/glossary/${slug}/index.html`;
    checkSwitcher(file, await readDist(file), locale, (lang) => `/${lang}/glossary/${slug}/`);
  }
}

// `lastmod` is the one field in the sitemap protocol that carries freshness,
// and it is also the only consumer where a *revision* belongs: `date` drives
// sort order and RSS `pubDate` (a revision must not reorder the blog or
// re-notify subscribers), while `lastmod` answers "did this change?" and so
// tracks `updated ?? date`. The sitemap shipped zero `lastmod` elements for
// months and nothing noticed, because this script only ever checked it for
// URLs. Both halves below are load-bearing:
//   * every blog-post URL carries a `lastmod` equal to its `updated ?? date`;
//   * every other URL carries none. There is no meaningful content date for a
//     locale home, blog index, topic hub, marketing, cluster, glossary or
//     legal page, and build time is not a substitute — a `lastmod` that moves
//     on every deploy for every URL teaches crawlers the field is meaningless
//     on this site, which is worse than omitting it.
// The expected dates are read from the same frontmatter map `astro.config.mjs`
// serializes from, so what this asserts is that the built sitemap really
// reflects the content tree. It is imported here rather than at the top of the
// file to keep this check one self-contained block.
const { readPostLastmods } = await import('./lib/post-dates.mjs');
const postLastmods = readPostLastmods(ROOT);
// W3C datetime, the only format the sitemap protocol allows for lastmod:
// a complete date, optionally with a time that carries an explicit zone.
const W3C_DATETIME = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?$/;
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => ({
  loc: entry.match(/<loc>([^<]*)<\/loc>/)?.[1],
  lastmod: entry.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1],
}));
if (sitemapEntries.length === 0) {
  issues.push(
    'sitemap-0.xml: parsed no url entries — every lastmod check below would be a silent no-op'
  );
}
let postEntriesChecked = 0;
for (const { loc, lastmod } of sitemapEntries) {
  if (!loc) {
    issues.push('sitemap-0.xml: found a url entry with no loc');
    continue;
  }
  const expected = postLastmods.get(new URL(loc).pathname);
  if (!expected) {
    if (lastmod !== undefined) {
      issues.push(
        `sitemap-0.xml: ${loc} carries lastmod ${lastmod}, but it has no content date — ` +
          'a page with nothing meaningful to report must not report a synthetic one'
      );
    }
    continue;
  }
  postEntriesChecked += 1;
  if (lastmod === undefined) {
    issues.push(
      `sitemap-0.xml: blog post ${loc} has no lastmod (expected ${expected.toISOString()})`
    );
    continue;
  }
  if (!W3C_DATETIME.test(lastmod)) {
    issues.push(`sitemap-0.xml: blog post ${loc} has lastmod "${lastmod}", not a W3C datetime`);
    continue;
  }
  // Compare instants, not strings: "2026-06-05" and "2026-06-05T00:00:00.000Z"
  // are the same moment and both are valid here.
  if (Date.parse(lastmod) !== expected.getTime()) {
    issues.push(
      `sitemap-0.xml: blog post ${loc} has lastmod ${lastmod}, ` +
        `expected ${expected.toISOString()} (updated ?? date)`
    );
  }
}
if (postEntriesChecked === 0) {
  issues.push(
    'sitemap-0.xml: no blog-post URL matched the frontmatter date map — ' +
      'an empty match is a failure, not a pass'
  );
}

// ─── Every built page, read once ───────────────────────────────────────────
//
// The sweeps below are invariants over the whole build rather than lists of
// expected URLs: a fallback page has many producers (the marketing and
// glossary registries, src/lib/fallback.ts for pricing, legal and security,
// the templated cluster pages, thin topic hubs), and asserting the shape of
// the result catches a new producer that gets the rule wrong without this
// script having to learn about it first.
const allHtmlFiles = (await walk(DIST))
  .filter((file) => file.endsWith('.html'))
  .map((file) => path.relative(DIST, file).split(path.sep).join('/'))
  .sort();
const servedUrl = (file) => `${SITE}/${file.replace(/(^|\/)index\.html$/, '$1')}`;
const attrOf = (tag, name) => {
  const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag);
  return m ? decodeEntities(m[1]) : undefined;
};
const TAG = (name) => new RegExp(`<${name}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`, 'g');
const pages = new Map();
for (const file of allHtmlFiles) {
  const html = await readDist(file);
  const headEnd = html.indexOf('</head>');
  const head = headEnd === -1 ? html : html.slice(0, headEnd);
  const metas = [...head.matchAll(TAG('meta'))].map(([tag]) => tag);
  const links = [...head.matchAll(TAG('link'))].map(([tag]) => tag);
  const meta = (key, value) => attrOf(metas.find((tag) => attrOf(tag, key) === value) ?? '', 'content');
  pages.set(file, {
    file,
    html,
    url: servedUrl(file),
    noindex: /\bnoindex\b/.test(meta('name', 'robots') ?? ''),
    refresh: metas.some((tag) => (attrOf(tag, 'http-equiv') ?? '').toLowerCase() === 'refresh'),
    canonical: attrOf(links.find((tag) => attrOf(tag, 'rel') === 'canonical') ?? '', 'href'),
    hreflangs: links
      .filter((tag) => attrOf(tag, 'rel') === 'alternate' && attrOf(tag, 'hreflang'))
      .map((tag) => ({ hreflang: attrOf(tag, 'hreflang'), href: attrOf(tag, 'href') })),
    ogUrl: meta('property', 'og:url'),
    ogLocale: meta('property', 'og:locale'),
    ogImageAlt: meta('property', 'og:image:alt'),
    ogImageWidth: meta('property', 'og:image:width'),
    ogImageHeight: meta('property', 'og:image:height'),
  });
}
const pageAt = (href) => {
  let url;
  try {
    url = new URL(href);
  } catch {
    return undefined;
  }
  if (url.origin !== SITE) return undefined;
  const rel = decodeURIComponent(url.pathname).replace(/^\//, '');
  return pages.get(rel === '' || rel.endsWith('/') ? `${rel}index.html` : rel);
};

// ─── /.well-known/security.txt (RFC 9116) ───────────────────────────────────
//
// The file is static (public/.well-known/), so nothing regenerates it: an
// `Expires` that passes turns the file into one RFC 9116 says to ignore, and a
// mailbox changed on the security page but not here sends reports to two
// places. Both are checked against the built site: every `Contact:` mailbox is
// a mailto link on the page `Policy:` names, and that page carries the anchor.
// Expired (or not a date) fails; RFC 9116 §2.5.5 asks for less than a year
// ahead, so more than a year fails too; under 60 days left only warns, so a
// renewal is due before the date fails every build.
const securityTxt = await readDist('.well-known/security.txt');
if (securityTxt) {
  const fieldValues = (name) =>
    [...securityTxt.matchAll(new RegExp(`^${name}:[ \\t]*(\\S.*?)[ \\t]*$`, 'gmi'))].map((m) => m[1]);
  const contacts = fieldValues('Contact');
  const expires = fieldValues('Expires');
  const policies = fieldValues('Policy');
  const canonicals = fieldValues('Canonical');
  const DAY = 24 * 60 * 60 * 1000;
  if (contacts.length === 0) issues.push('.well-known/security.txt: no Contact field (RFC 9116 requires one)');
  if (expires.length !== 1) {
    issues.push(`.well-known/security.txt: needs exactly one Expires field, found ${expires.length}`);
  } else {
    const at = Date.parse(expires[0]);
    const left = at - Date.now();
    if (Number.isNaN(at)) issues.push(`.well-known/security.txt: Expires "${expires[0]}" is not a date`);
    else if (left <= 0) issues.push(`.well-known/security.txt: Expires ${expires[0]} has passed; set a new date under a year ahead`);
    else if (left > 366 * DAY) issues.push(`.well-known/security.txt: Expires ${expires[0]} is more than a year ahead (RFC 9116 §2.5.5)`);
    else if (left < 60 * DAY) console.warn(`! .well-known/security.txt: Expires ${expires[0]} is ${Math.ceil(left / DAY)} days away; renew it`);
  }
  if (!canonicals.includes(`${SITE}/.well-known/security.txt`)) {
    issues.push(`.well-known/security.txt: Canonical must be ${SITE}/.well-known/security.txt`);
  }
  if (policies.length !== 1) {
    issues.push(`.well-known/security.txt: needs exactly one Policy field, found ${policies.length}`);
  } else {
    const policyPage = pageAt(policies[0]);
    if (!policyPage) {
      issues.push(`.well-known/security.txt: Policy ${policies[0]} is not a page this build serves`);
    } else {
      const anchor = new URL(policies[0]).hash.slice(1);
      if (anchor && !policyPage.html.includes(`id="${anchor}"`)) {
        issues.push(`.well-known/security.txt: Policy page ${policyPage.file} has no id="${anchor}"`);
      }
      for (const contact of contacts.filter((c) => c.startsWith('mailto:'))) {
        if (!policyPage.html.includes(`href="${contact}"`)) {
          issues.push(
            `.well-known/security.txt: Contact ${contact} is not linked from ${policyPage.file} — ` +
              'the security page (SECURITY_CONTACT in src/lib/security.ts) and security.txt name different mailboxes'
          );
        }
      }
    }
  }
}

// ─── Subprocessor rows awaiting confirmation ────────────────────────────────
//
// A row named in SUBPROCESSORS_TO_CONFIRM (src/lib/security.ts) renders with
// `data-subprocessor-pending="<card>"`. Publishing a provider production does
// not use, or leaving out one it does, is a false statement in a legal list,
// so the build refuses to ship while any row is still unconfirmed.
{
  const pending = new Map();
  for (const page of pages.values()) {
    for (const m of page.html.matchAll(/<tr\b[^>]*\sdata-subprocessor-pending="([^"]*)"[^>]*>\s*<td\b[^>]*>([^<]*)<\/td>/g)) {
      const key = `${m[2]} (${m[1]})`;
      pending.set(key, (pending.get(key) ?? 0) + 1);
    }
  }
  for (const [row, count] of pending) {
    issues.push(
      `security page: subprocessor ${row} is not confirmed yet (${count} pages) — confirm it on the card, then ` +
        'remove it from SUBPROCESSORS_TO_CONFIRM in src/lib/security.ts (or delete the row)'
    );
  }
}

// Indexable = no `noindex` and its own canonical: the only pages a sitemap may
// list or an hreflang / canonical annotation may point at.
const isIndexable = (page) => Boolean(page) && !page.noindex && page.canonical === page.url;
const isNotFound = (file) => /(^|\/)404\.html$/.test(file);

const htmlFiles = allHtmlFiles
  .filter((file) => file !== 'index.html')
  // Checked above: a 404 page has no canonical URL and no hreflang set.
  .filter((file) => !isNotFound(file));

for (const file of htmlFiles) {
  const page = pages.get(file);
  const { html } = page;
  // Glossary paths are matched first: `<locale>/glossary/index.html` also
  // satisfies the two-segment marketing pattern, and falling through to it
  // would compute the wrong canonical for the fallback locales.
  const glossaryTermMatch = file.match(/^([^/]+)\/glossary\/([^/]+)\/index\.html$/);
  const glossaryIndexMatch = file.match(/^([^/]+)\/glossary\/index\.html$/);
  const marketingMatch = file.match(/^([^/]+)\/([^/]+)\/index\.html$/);

  // A fallback the registries name, with the canonical it must carry. Other
  // fallbacks (pricing, legal, security, thin hubs) are held to the generic
  // canonical rule below instead of a second copy of their source tables.
  let registryCanonicalPath = null;
  if (glossaryTermMatch && LOCALES.includes(glossaryTermMatch[1])) {
    const [, locale, slug] = glossaryTermMatch;
    const contentLocales = glossaryContentLocales.get(slug);
    if (contentLocales && !contentLocales.has(locale)) {
      registryCanonicalPath = `/${FALLBACK_LOCALE}/glossary/${slug}/`;
    }
  } else if (glossaryIndexMatch && LOCALES.includes(glossaryIndexMatch[1])) {
    if (!glossaryLocales.has(glossaryIndexMatch[1])) {
      registryCanonicalPath = `/${FALLBACK_LOCALE}/glossary/`;
    }
  } else if (marketingMatch && LOCALES.includes(marketingMatch[1])) {
    const [, locale, slug] = marketingMatch;
    const contentLocales = marketingContentLocales.get(slug);
    if (contentLocales && !contentLocales.has(locale)) {
      registryCanonicalPath = `/${FALLBACK_LOCALE}/${slug}/`;
    } else if (CLUSTER_SLUGS.includes(slug) && !CLUSTER_AUTHORED_LOCALES.has(locale)) {
      registryCanonicalPath = `/${FALLBACK_LOCALE}/${slug}/`;
    }
  }
  if (registryCanonicalPath !== null) {
    const canonical = `${SITE}${registryCanonicalPath}`;
    requireContains(file, html, `<link rel="canonical" href="${canonical}">`, 'missing expected canonical URL');
    requireContains(
      file,
      html,
      '<meta name="robots" content="noindex, nofollow">',
      'fallback-content page must be noindexed'
    );
  } else if (page.canonical !== page.url && !page.noindex) {
    // A page may name another URL as canonical only as a fallback, and a
    // fallback is noindexed: an indexable page that canonicalizes elsewhere
    // asks to be indexed and merged at once.
    issues.push(
      `${file}: canonical ${page.canonical ?? '(none)'} is not the page's own URL, but the page is not noindexed`
    );
  }
  if (page.ogUrl !== page.canonical) {
    issues.push(`${file}: og:url ${page.ogUrl ?? '(none)'} differs from the canonical ${page.canonical ?? '(none)'}`);
  }
  requireContains(file, html, 'type="application/ld+json"', 'missing JSON-LD structured data');

  const locale = LOCALES.find((candidate) => file.startsWith(`${candidate}/`));
  if (locale) {
    requireContains(file, html, `<html lang="${locale}">`, 'missing matching html lang');
    // A noindexed page may have no indexable equivalent at all (a thin hub in
    // every locale), and then it has no hreflang set to anchor an x-default.
    if (!page.noindex) {
      requireContains(file, html, 'rel="alternate" hreflang="x-default"', 'missing x-default hreflang');
    }
    requireContains(file, html, `href="${SITE}/${locale}/rss.xml"`, 'missing locale RSS discovery link');
  }

  if (/^[^/]+\/blog\/[^/]+\/index\.html$/.test(file) && !file.includes('/topics/')) {
    requireContains(file, html, '"@type":"BlogPosting"', 'missing BlogPosting JSON-LD');
    requireContains(file, html, '"@type":"BreadcrumbList"', 'missing BreadcrumbList JSON-LD');
  }
  if (/^[^/]+\/blog\/topics\/.+\/index\.html$/.test(file)) {
    requireContains(file, html, '"@type":"BreadcrumbList"', 'topic hub missing BreadcrumbList JSON-LD');
    requireContains(file, html, '"@type":"ItemList"', 'topic hub missing ItemList JSON-LD');
  }
}

// ─── 1. The sitemap lists only indexable, self-canonical pages ──────────────
//
// A noindexed URL in the sitemap is Search Console's "Submitted URL marked
// noindex"; a URL that canonicalizes elsewhere submits a duplicate. 190 noindexed
// fallback pages were listed before the sitemap filter read the built pages
// (astro.config.mjs). Checked against the built page each entry names, so the
// filter cannot drift from what the page says about itself.
let sitemapChecked = 0;
for (const { loc } of sitemapEntries) {
  if (!loc) continue;
  sitemapChecked += 1;
  const page = pageAt(loc);
  if (!page) issues.push(`sitemap-0.xml: lists ${loc}, which is not a built page`);
  else if (page.noindex) issues.push(`sitemap-0.xml: lists noindexed page ${loc}`);
  else if (page.canonical !== loc) {
    issues.push(`sitemap-0.xml: lists ${loc}, whose canonical is ${page.canonical ?? '(none)'}`);
  }
}
const noindexedBuilt = [...pages.values()].filter((page) => page.noindex && !isNotFound(page.file)).length;

// ─── 2. Canonical and hreflang point only at indexable pages ────────────────
//
// An hreflang annotation claims its target is a real, indexable page in that
// language; a canonical claims its target is the page to index. Pointing
// either at a noindexed or non-canonical URL is the pattern that indexed 20
// English pricing/legal pages as de/es/fr/ja/ko: each was self-canonical and
// listed in every locale's hreflang set.
let annotationsChecked = 0;
for (const page of pages.values()) {
  if (page.file === 'index.html') continue;
  if (page.canonical && page.canonical !== page.url) {
    annotationsChecked += 1;
    const target = pageAt(page.canonical);
    if (!isIndexable(target)) {
      issues.push(`${page.file}: canonical ${page.canonical} is not an indexable, self-canonical page`);
    }
  }
  for (const { hreflang, href } of page.hreflangs) {
    annotationsChecked += 1;
    if (!isIndexable(pageAt(href))) {
      issues.push(`${page.file}: hreflang="${hreflang}" points at ${href}, which is not an indexable, self-canonical page`);
    }
  }
}

// ─── 3. The body is written in the language it declares ─────────────────────
//
// Every block of prose inside `<main>` must be in the language of its nearest
// `lang` (scripts/lib/text-lang.mjs). This is what failed on 215 pages: the
// marketing, glossary, pricing and legal fallbacks rendered English under
// `lang="de"`/`"ja"`/..., and the partly translated security pages mixed
// English sections into a translated frame — wrong for a screen reader (WCAG
// 3.1.1/3.1.2) and wrong for a crawler deciding what language a page is in.
// Checked on every page, indexable or not: a noindexed fallback is still read.
let langBlocksJudged = 0;
const judgedLangs = new Set();
for (const page of pages.values()) {
  if (page.file === 'index.html') continue;
  const result = languageMismatches(page.html);
  if (result === null) {
    issues.push(`${page.file}: has no <main> — its body language cannot be checked`);
    continue;
  }
  langBlocksJudged += result.judged;
  for (const lang of result.confirmed) judgedLangs.add(lang);
  if (result.mismatches.length === 0) continue;
  const first = result.mismatches[0];
  issues.push(
    `${page.file}: ${result.mismatches.length} of ${result.judged} judged blocks in <main> are not in their ` +
      `declared language — e.g. lang="${first.lang}" but written in ${first.detected}: ` +
      `"${first.text.slice(0, 80)}…" (mark it with lang="${first.detected}", or fix the producer)`
  );
}
for (const locale of LOCALES) {
  if (!judgedLangs.has(locale)) {
    issues.push(
      `language check: no ${locale} block was confidently identified anywhere in the build — ` +
        'the check measured nothing for that locale, which is not a pass'
    );
  }
}

// ─── 4. No internal link redirects ──────────────────────────────────────────
//
// A link that redirects costs the reader a round trip and tells a crawler the
// linked URL is not the real one. Cloudflare Pages answers a directory page
// requested without its trailing slash (or as `.../index.html`) with a 308 to
// the slash form; `/` is the language-redirect page; a `_redirects` source is
// a redirect by definition. Host and scheme variants (`http://`, the apex) are
// not this build's to answer for and are not judged.
const redirectRules = (await readFile(path.join(DIST, '_redirects'), 'utf8').catch(() => ''))
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const source = line.split(/\s+/)[0];
    const pattern = source
      .split('*')
      .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/:[A-Za-z]\w*/g, '[^/]+'))
      .join('.*');
    return { source, re: new RegExp(`^${pattern}$`) };
  });
function redirectReason(url) {
  const pathname = decodeURIComponent(url.pathname);
  const rule = redirectRules.find(({ re }) => re.test(pathname));
  if (rule) return `matches the _redirects source ${rule.source}`;
  if (pathname === '/') return 'is the root language redirect (meta refresh to /en/)';
  const rel = pathname.replace(/^\//, '');
  if (rel.endsWith('/index.html') && pages.has(rel)) return 'is served at its directory URL (Pages answers 308)';
  if (!rel.endsWith('/') && !path.extname(rel) && pages.has(`${rel}/index.html`)) {
    return 'has no trailing slash (Pages answers 308 to the slash form)';
  }
  return null;
}
let internalLinksChecked = 0;
const redirecting = new Map(); // "href — reason" -> files
for (const page of pages.values()) {
  const bodyStart = page.html.indexOf('<body');
  const refs = [
    ...[...page.html.slice(bodyStart).matchAll(TAG('a'))].map(([tag]) => attrOf(tag, 'href')),
    page.canonical,
    page.ogUrl,
    ...page.hreflangs.map(({ href }) => href),
  ];
  for (const href of refs) {
    if (!href || href.startsWith('#')) continue;
    let url;
    try {
      url = new URL(href, page.url);
    } catch {
      continue;
    }
    if (url.origin !== SITE) continue;
    internalLinksChecked += 1;
    const reason = redirectReason(url);
    if (!reason) continue;
    const key = `${href} — ${reason}`;
    redirecting.set(key, [...(redirecting.get(key) ?? []), page.file]);
  }
}
for (const [key, files] of redirecting) {
  const unique = [...new Set(files)];
  issues.push(
    `internal link ${key}; linked from ${unique.length} page${unique.length === 1 ? '' : 's'}: ` +
      `${unique.slice(0, 3).join(', ')}${unique.length > 3 ? ', …' : ''}`
  );
}
if (internalLinksChecked === 0) {
  issues.push('redirect check: found no internal links — an empty match is a failure, not a pass');
}

// ─── The root page ──────────────────────────────────────────────────────────
//
// `/` is a redirect (zero-delay meta refresh to /en/ plus a language script),
// so it names /en/ as its canonical, its hreflang alternates are absolute (a
// relative hreflang href is ignored), and it is not also noindexed — that pair
// asks for the page to be dropped and merged at once.
{
  const root = pages.get('index.html');
  if (root) {
    if (root.canonical !== `${SITE}/en/`) {
      issues.push(`index.html: canonical is ${root.canonical ?? '(none)'}, expected ${SITE}/en/`);
    }
    if (root.noindex && root.refresh) issues.push('index.html: combines noindex with a meta refresh');
    if (root.hreflangs.length !== LOCALES.length + 1) {
      issues.push(`index.html: expected ${LOCALES.length + 1} hreflang links, found ${root.hreflangs.length}`);
    }
    for (const { hreflang, href } of root.hreflangs) {
      if (!href?.startsWith(`${SITE}/`)) issues.push(`index.html: hreflang="${hreflang}" href "${href}" is not absolute`);
    }
  }
}

let inlineScriptDigests = 0;
// ─── Cache headers for hashed assets ────────────────────────────────────────
//
// Every file astro writes under /_astro/ has a content hash in its name, so it
// can be cached forever; without `_headers` Pages serves them with max-age=0.
// The rule is only safe while the names really are hashed, so that is checked
// too.
{
  const headers = await readFile(path.join(DIST, '_headers'), 'utf8').catch(() => null);
  if (!headers) issues.push('_headers: missing — /_astro/* is served with max-age=0');
  else if (!/^\/_astro\/\*\s*\n[ \t]+Cache-Control:\s*public,\s*max-age=31536000,\s*immutable\s*$/m.test(headers)) {
    issues.push('_headers: no "/_astro/*  Cache-Control: public, max-age=31536000, immutable" rule');
  }
  const assets = await readdir(path.join(DIST, '_astro')).catch(() => []);
  const unhashed = assets.filter((name) => !/\.[A-Za-z0-9_-]{8}(?:_[A-Za-z0-9_-]+)?\.[a-z0-9]+$/.test(name));
  if (assets.length === 0) issues.push('_astro/: no assets found — the immutable rule covers nothing');
  for (const name of unhashed) issues.push(`_astro/${name}: not content-hashed, but /_astro/* is cached as immutable`);

  // The /* block's CSP allows inline scripts by sha256 only, so an edited script
  // body is blocked in production, and `astro dev`/`preview` never serve
  // _headers to show it. Every inline script CSP governs (no type, a JavaScript
  // type, module, importmap, speculationrules; data blocks such as ld+json are
  // not governed) must be listed, and a listed digest no page uses is an issue
  // too, so the policy allows exactly what ships.
  const csp = /^\/\*[ \t]*\n(?:[ \t]+.*\n)*?[ \t]+Content-Security-Policy:(.*)$/im.exec(headers ?? '')?.[1] ?? '';
  const allowed = new Set(/(?:^|;)\s*script-src\b([^;]*)/.exec(csp)?.[1].match(/'sha256-[A-Za-z0-9+/]+=*'/g) ?? []);
  const used = new Map();
  for (const page of pages.values()) {
    for (const [, attrs, body] of page.html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
      const type = (attrOf(attrs, 'type') ?? '').trim().toLowerCase();
      if (/\ssrc=/.test(attrs) || !/^(|module|importmap|speculationrules|(text|application)\/(x-)?(java|ecma)script)$/.test(type)) continue;
      const digest = `'sha256-${createHash('sha256').update(body).digest('base64')}'`;
      used.set(digest, { file: used.get(digest)?.file ?? page.file, count: (used.get(digest)?.count ?? 0) + 1 });
    }
  }
  if (!csp) issues.push('_headers: the /* block has no Content-Security-Policy');
  for (const [digest, { file, count }] of used) {
    if (!allowed.has(digest)) issues.push(`${file}: inline script ${digest} (on ${count} page${count === 1 ? '' : 's'}) is not in the /* CSP script-src, so the browser blocks it`);
  }
  for (const digest of allowed) if (!used.has(digest)) issues.push(`_headers: CSP script-src lists ${digest}, which no built page uses`);
  inlineScriptDigests = used.size;
}

// ─── Open Graph and the Organization node ───────────────────────────────────
const OG_LOCALES = new Set(['en_US', 'zh_CN', 'zh_TW', 'ja_JP', 'de_DE', 'es_ES', 'fr_FR', 'ko_KR']);
for (const page of pages.values()) {
  if (page.file === 'index.html') continue;
  if (!OG_LOCALES.has(page.ogLocale)) {
    issues.push(`${page.file}: og:locale "${page.ogLocale ?? '(none)'}" is not one of ${[...OG_LOCALES].join(', ')}`);
  }
  if (!page.ogImageAlt) issues.push(`${page.file}: missing og:image:alt`);
  if (!page.ogImageWidth !== !page.ogImageHeight) {
    issues.push(`${page.file}: og:image:width and og:image:height must be given together`);
  }
  requireContains(
    page.file,
    page.html,
    '"@type":"Organization","@id":"https://www.objectos.ai/#organization"',
    'Organization JSON-LD has no @id'
  );
  requireContains(page.file, page.html, '"sameAs":["https://github.com/', 'Organization JSON-LD has no sameAs');
}

if (issues.length > 0) {
  for (const issue of issues) console.error(`x ${issue}`);
  console.error(`\nSEO smoke test failed (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  exit(1);
}

console.log(
  `SEO smoke test passed (${htmlFiles.length} HTML pages checked; ${sitemapChecked} sitemap URLs against ` +
    `${noindexedBuilt} noindexed pages; ${annotationsChecked} canonical/hreflang annotations; ` +
    `${langBlocksJudged} prose blocks language-checked; ${internalLinksChecked} internal links redirect-checked; ` +
    `${inlineScriptDigests} inline script digests CSP-checked)`
);
