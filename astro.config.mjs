import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
    }),
  ],
});
