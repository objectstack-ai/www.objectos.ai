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

// https://astro.build
export default defineConfig({
  site: 'https://www.objectos.ai',
  // Bind all interfaces; the port comes from the launcher (PORT env, with
  // 4321 as the default) so the preview panel's autoPort can pick a free one.
  server: { host: true },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
      // Spread the item through: the integration also fills `links`,
      // `priority` and `changefreq`, and returning a fresh object would drop
      // whatever it set. Returning `undefined` would drop the URL entirely,
      // so a page with no date is returned unchanged, without a `lastmod`.
      serialize: (item) => {
        const lastmod = POST_LASTMOD.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],
});
