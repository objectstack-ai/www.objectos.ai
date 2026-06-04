#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cwd, exit } from 'node:process';

const ROOT = cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.objectos.ai';
const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'de', 'es', 'fr', 'ko'];
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
const issues = [];

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

const htmlFiles = (await walk(DIST))
  .filter((file) => file.endsWith('.html'))
  .map((file) => path.relative(DIST, file).split(path.sep).join('/'))
  .filter((file) => file !== 'index.html');

for (const file of htmlFiles) {
  const html = await readDist(file);
  const expectedPath = `/${file.replace(/index\.html$/, '')}`;
  const canonical = `${SITE}${expectedPath}`;
  requireContains(file, html, `<link rel="canonical" href="${canonical}">`, 'missing expected canonical URL');
  requireContains(file, html, `<meta property="og:url" content="${canonical}">`, 'missing expected Open Graph URL');
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
