import { readdir, rename, rmdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
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
  integrations: [
    mdx(),
    sitemap({
      // The root language redirect and the per-locale 404 pages are not
      // content (the top-level /404 the integration drops by itself).
      filter: (page) => {
        const { pathname } = new URL(page);
        return pathname !== '/' && !LOCALE_404.test(pathname);
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
