import { readFileSync } from 'node:fs';
import { readdir, rename, rmdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { rehypeCjkSegmentBreaks } from './scripts/lib/cjk-segment-break.mjs';
import { remarkCjkQuotes } from './scripts/lib/cjk-quotes.mjs';
import sitemap from '@astrojs/sitemap';
import { readPostLastmods } from './scripts/lib/post-dates.mjs';

// `lastmod` for the sitemap, keyed by URL path. Read from MDX frontmatter
// rather than the content collection, because this config is evaluated before
// Astro is running and `astro:content` is not importable here. Resolved from
// this file's own location so it does not depend on the working directory.
// Only blog posts are in the map; see scripts/lib/post-dates.mjs for why every
// other page class intentionally gets no `lastmod`.
const POST_LASTMOD = readPostLastmods(fileURLToPath(new URL('.', import.meta.url)));

// `/<locale>/404/`, the per-locale 404 route before `locale404` renames it.
const LOCALE_404 = /^\/[^/]+\/404\/$/;

// Where `astro build` writes pages: the default `outDir`, which this config
// does not override. The sitemap filter below reads the built pages from here.
const OUT_DIR = new URL('./dist/', import.meta.url);

/**
 * Whether a built page may be listed in the sitemap: it must be indexable and
 * its own canonical. A sitemap entry tells a crawler "index this URL"; listing
 * a `noindex` page is the "Submitted URL marked noindex" error, and listing a
 * page that canonicalizes elsewhere submits a duplicate.
 *
 * The answer is read from the built page itself rather than re-derived here
 * from the registries, because the fallback rule has many producers — the
 * marketing and glossary registries, pricing/legal/security
 * (src/lib/fallback.ts), the templated cluster pages, thin topic hubs and
 * archived posts — and a second copy of each would drift from the page that
 * actually ships. The integration calls `filter` from its `astro:build:done`
 * hook, after every page is written. `pnpm seo:smoke` asserts the result: no
 * sitemap URL is noindexed or canonicalizes elsewhere.
 */
function isSelfCanonicalAndIndexable(pageUrl) {
  const { pathname } = new URL(pageUrl);
  if (!pathname.endsWith('/')) {
    throw new Error(`sitemap filter: ${pageUrl} is not a directory URL; cannot locate its built page`);
  }
  let html;
  try {
    html = readFileSync(new URL(`.${decodeURIComponent(pathname)}index.html`, OUT_DIR), 'utf8');
  } catch (error) {
    // Failing loudly: a page this cannot read would otherwise be listed or
    // dropped on a guess.
    throw new Error(`sitemap filter: cannot read the built page for ${pageUrl}: ${error.message}`);
  }
  const head = html.slice(0, html.indexOf('</head>'));
  if (/<meta name="robots" content="[^"]*\bnoindex\b/.test(head)) return false;
  return /<link rel="canonical" href="([^"]*)"/.exec(head)?.[1] === pageUrl;
}

/**
 * Astro names only the top-level `/404` route `404.html`; `src/pages/[lang]/404.astro`
 * is emitted as `<locale>/404/index.html`. Cloudflare Pages serves the nearest
 * `404.html` to a missing URL, so each locale's page is moved to
 * `<locale>/404.html`, where Pages finds it for every missing URL under that
 * locale. A `<locale>/404/` directory left behind would be a real, 200-status
 * URL, so `rmdir` (which refuses a non-empty directory) fails the build if
 * anything else landed there; `pnpm seo:smoke` asserts every locale has its
 * `404.html` and no `404/` directory.
 */
const locale404 = {
  name: 'locale-404',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const root = fileURLToPath(dir);
      for (const entry of await readdir(root, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const from = `${root}${entry.name}/404/index.html`;
        try {
          await rename(from, `${root}${entry.name}/404.html`);
        } catch (error) {
          if (error.code === 'ENOENT') continue;
          throw error;
        }
        await rmdir(`${root}${entry.name}/404`);
      }
    },
  },
};

// https://astro.build
export default defineConfig({
  site: 'https://www.objectos.ai',
  // Bind all interfaces; the port comes from the launcher (PORT env, with
  // 4321 as the default) so the preview panel's autoPort can pick a free one.
  server: { host: true },
  // Shiki's default `github-dark` paints comments #6A737D on #24292e, 3.04:1.
  // `github-dark-default` keeps the block dark (BlogPost.astro draws the
  // code-block scrollbar light for it) and puts comments at #8b949e on
  // #0d1117, 6.15:1, the lowest of the token colours the posts use.
  // A source line break between two CJK characters renders as a stray space in
  // Chromium and Safari; this removes it from the rendered prose (code
  // excluded). MDX inherits `markdown` config. See scripts/lib/cjk-segment-break.mjs,
  // and `pnpm content:lint --dist`, which fails the build on any that remain.
  // Smartypants curls quotes by their neighbours, which points the opening mark
  // of a zh or ja pair the wrong way; `remarkCjkQuotes` runs after it and sets
  // each mark by its position in its pair, in zh-Hans, zh-Hant, ja and ko files
  // only. See scripts/lib/cjk-quotes.mjs; `content:lint --dist` guards it too.
  markdown: { shikiConfig: { theme: 'github-dark-default' }, remarkPlugins: [remarkCjkQuotes], rehypePlugins: [rehypeCjkSegmentBreaks] },
  integrations: [
    mdx(),
    sitemap({
      // The root language redirect and the per-locale 404 pages are not
      // content (the top-level /404 the integration drops by itself); every
      // other page is listed only if it is indexable and self-canonical.
      filter: (page) => {
        const { pathname } = new URL(page);
        if (pathname === '/' || LOCALE_404.test(pathname)) return false;
        return isSelfCanonicalAndIndexable(page);
      },
      // Spread the item through: the integration also fills `links`,
      // `priority` and `changefreq`, and returning a fresh object would drop
      // whatever it set. Returning `undefined` would drop the URL entirely,
      // so a page with no date is returned unchanged, without a `lastmod`.
      serialize: (item) => {
        const lastmod = POST_LASTMOD.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
    locale404,
  ],
});
