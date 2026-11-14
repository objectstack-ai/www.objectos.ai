import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Point internal links at a locale-fallback page to the page it falls back to.
 *
 * A locale without its own copy of a marketing, glossary, pricing, legal,
 * security or changelog page still has a URL there (`/ja/pricing/`). That page
 * renders the English copy, is `noindex, nofollow`, and canonicalizes to the
 * English URL (src/lib/fallback.ts). Linking to it from the header, footer and
 * body of every indexable page in that locale spent most of the locale's
 * internal links on dead ends: measured on the build at `ea20640`, 33 of the 42
 * `/ja/` links on `/ja/` and 36 of 51 on a Japanese article led to a noindexed
 * fallback, and Search Console listed 345 such URLs under "Excluded by
 * 'noindex' tag". A crawler following them reaches a page it may not index and
 * whose links it may not follow, so the authored pages behind them got none of
 * that link equity.
 *
 * So each such link is rewritten to the fallback's canonical, the page that
 * really holds the content. Two kinds of link are left alone:
 *   - the language switcher (`data-lang`): picking German must still land on
 *     the German URL of the page being read (Header.astro, `navAlternates`);
 *   - any link whose target is not a pure locale fallback, i.e. a noindexed
 *     page that canonicalizes to itself (an archived post, a thin topic hub)
 *     or to a page that is not itself indexable. Those keep their href.
 *
 * The rule is read from the built pages, not re-derived from the registries,
 * for the reason the sitemap filter in astro.config.mjs gives: the fallback
 * rule has many producers, and a second copy of each would drift from the page
 * that actually ships. It runs from `astro:build:done`, after every page is
 * written; `astro dev` serves the unrewritten links, which only changes where a
 * click lands, not what a reader can reach. `pnpm seo:smoke` asserts the
 * result: no non-switcher link in the build targets a locale fallback.
 */

const TAG = (name) => new RegExp(`<${name}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`, 'g');
const attrOf = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** The served path of a built page: `ja/pricing/index.html` -> `/ja/pricing/`. */
const servedPath = (rel) => `/${rel.replace(/(^|\/)index\.html$/, '$1')}`;

function readHead(html) {
  const end = html.indexOf('</head>');
  const head = end === -1 ? html : html.slice(0, end);
  const robots = [...head.matchAll(TAG('meta'))]
    .map(([tag]) => tag)
    .find((tag) => attrOf(tag, 'name') === 'robots');
  const canonical = [...head.matchAll(TAG('link'))]
    .map(([tag]) => tag)
    .find((tag) => attrOf(tag, 'rel') === 'canonical');
  return {
    noindex: /\bnoindex\b/.test(attrOf(robots ?? '', 'content') ?? ''),
    canonical: canonical ? attrOf(canonical, 'href') : undefined,
  };
}

/**
 * Map of fallback path -> canonical path, for every built page that is a pure
 * locale fallback: noindexed, canonical to a different path that differs only
 * in its first (locale) segment, and whose canonical is itself an indexable,
 * self-canonical page.
 */
export function fallbackTargets(pages, site) {
  const targets = new Map();
  for (const [pagePath, page] of pages) {
    if (!page.noindex || !page.canonical?.startsWith(`${site}/`)) continue;
    const canonicalPath = page.canonical.slice(site.length);
    if (canonicalPath === pagePath) continue;
    const rest = (p) => p.replace(/^\/[^/]+/, '');
    if (rest(canonicalPath) !== rest(pagePath)) continue;
    const target = pages.get(canonicalPath);
    if (!target || target.noindex || target.canonical !== `${site}${canonicalPath}`) continue;
    targets.set(pagePath, canonicalPath);
  }
  return targets;
}

/** Rewrite the `<a href>`s in one page's `<body>`; returns the new HTML and how many changed. */
export function rewriteLinks(html, targets, site) {
  const bodyStart = html.indexOf('<body');
  if (bodyStart === -1) return { html, count: 0 };
  let count = 0;
  const body = html.slice(bodyStart).replace(TAG('a'), (tag) => {
    if (/\sdata-lang="/.test(tag)) return tag;
    const href = attrOf(tag, 'href');
    if (!href) return tag;
    const absolute = href.startsWith(`${site}/`);
    if (!absolute && !href.startsWith('/')) return tag;
    const local = absolute ? href.slice(site.length) : href;
    const cut = local.search(/[?#]/);
    const pathname = cut === -1 ? local : local.slice(0, cut);
    const target = targets.get(pathname);
    if (!target) return tag;
    count += 1;
    const next = `${absolute ? site : ''}${target}${cut === -1 ? '' : local.slice(cut)}`;
    return tag.replace(` href="${href}"`, ` href="${next}"`);
  });
  return { html: html.slice(0, bodyStart) + body, count };
}

export async function rewriteFallbackLinks(distDir, site) {
  const files = (await walk(distDir)).map((full) => ({
    full,
    rel: path.relative(distDir, full).split(path.sep).join('/'),
  }));
  const pages = new Map();
  const html = new Map();
  for (const { full, rel } of files) {
    const source = await readFile(full, 'utf8');
    html.set(full, source);
    if (/(^|\/)404\.html$/.test(rel)) continue;
    pages.set(servedPath(rel), readHead(source));
  }
  const targets = fallbackTargets(pages, site);
  if (targets.size === 0) {
    // Every locale but en falls back on some page today; finding none means
    // the head markup this reads has changed, not that the site is clean.
    throw new Error('fallback-links: found no locale-fallback pages; check the robots/canonical markup');
  }
  let rewritten = 0;
  for (const { full } of files) {
    const { html: next, count } = rewriteLinks(html.get(full), targets, site);
    if (count === 0) continue;
    rewritten += count;
    await writeFile(full, next);
  }
  return { fallbacks: targets.size, rewritten };
}
