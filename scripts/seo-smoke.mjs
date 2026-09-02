#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cwd, exit } from 'node:process';

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
  requireContains('llms.txt', llms, `${SITE}${clusterPath}`, `missing cluster page ${clusterPath}`);
  requireContains('sitemap-0.xml', sitemap, `${SITE}${clusterPath}`, `missing cluster page ${clusterPath}`);
}

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

const htmlFiles = (await walk(DIST))
  .filter((file) => file.endsWith('.html'))
  .map((file) => path.relative(DIST, file).split(path.sep).join('/'))
  .filter((file) => file !== 'index.html');

for (const file of htmlFiles) {
  const html = await readDist(file);
  const expectedPath = `/${file.replace(/index\.html$/, '')}`;
  // Glossary paths are matched first: `<locale>/glossary/index.html` also
  // satisfies the two-segment marketing pattern, and falling through to it
  // would compute the wrong canonical for the fallback locales.
  const glossaryTermMatch = file.match(/^([^/]+)\/glossary\/([^/]+)\/index\.html$/);
  const glossaryIndexMatch = file.match(/^([^/]+)\/glossary\/index\.html$/);
  const marketingMatch = file.match(/^([^/]+)\/([^/]+)\/index\.html$/);

  let canonicalPath = expectedPath;
  let isFallbackContent = false;
  if (glossaryTermMatch && LOCALES.includes(glossaryTermMatch[1])) {
    const [, locale, slug] = glossaryTermMatch;
    const contentLocales = glossaryContentLocales.get(slug);
    if (contentLocales && !contentLocales.has(locale)) {
      isFallbackContent = true;
      canonicalPath = `/${FALLBACK_LOCALE}/glossary/${slug}/`;
    }
  } else if (glossaryIndexMatch && LOCALES.includes(glossaryIndexMatch[1])) {
    if (!glossaryLocales.has(glossaryIndexMatch[1])) {
      isFallbackContent = true;
      canonicalPath = `/${FALLBACK_LOCALE}/glossary/`;
    }
  } else if (marketingMatch && LOCALES.includes(marketingMatch[1])) {
    const contentLocales = marketingContentLocales.get(marketingMatch[2]);
    if (contentLocales && !contentLocales.has(marketingMatch[1])) {
      isFallbackContent = true;
      canonicalPath = `/${FALLBACK_LOCALE}/${marketingMatch[2]}/`;
    }
  }
  const canonical = `${SITE}${canonicalPath}`;
  requireContains(file, html, `<link rel="canonical" href="${canonical}">`, 'missing expected canonical URL');
  requireContains(file, html, `<meta property="og:url" content="${canonical}">`, 'missing expected Open Graph URL');
  if (isFallbackContent) {
    requireContains(
      file,
      html,
      '<meta name="robots" content="noindex, nofollow">',
      'fallback-content page must be noindexed'
    );
  }
  requireContains(file, html, 'type="application/ld+json"', 'missing JSON-LD structured data');

  const locale = LOCALES.find((candidate) => file.startsWith(`${candidate}/`));
  if (locale) {
    requireContains(file, html, `<html lang="${locale}">`, 'missing matching html lang');
    requireContains(file, html, 'rel="alternate" hreflang="x-default"', 'missing x-default hreflang');
    requireContains(file, html, `href="${SITE}/${locale}/rss.xml"`, 'missing locale RSS discovery link');
  }

  if (/^[^/]+\/blog\/[^/]+\/index\.html$/.test(file) && !file.includes('/topics/')) {
    requireContains(file, html, '"@type":"BlogPosting"', 'missing BlogPosting JSON-LD');
    requireContains(file, html, '"@type":"BreadcrumbList"', 'missing BreadcrumbList JSON-LD');
  }
}

if (issues.length > 0) {
  for (const issue of issues) console.error(`x ${issue}`);
  console.error(`\nSEO smoke test failed (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  exit(1);
}

console.log(`SEO smoke test passed (${htmlFiles.length} HTML pages checked)`);
