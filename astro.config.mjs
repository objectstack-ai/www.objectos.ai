import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build
export default defineConfig({
  site: 'https://blog.objectos.ai',
  // Bind all interfaces; the port comes from the launcher (PORT env, with
  // 4321 as the default) so the preview panel's autoPort can pick a free one.
  server: { host: true },
  integrations: [mdx()],
});
