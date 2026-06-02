import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build
export default defineConfig({
  integrations: [mdx()],
});
