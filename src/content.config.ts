import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { PRODUCT_SLUGS } from './lib/products';
import { AUDIENCE_SLUGS } from './lib/audiences';

// One external publication of an article (own blog, Medium, WeChat, ...).
const channel = z.object({
  platform: z.string(),
  url: z.string().url(),
  published_at: z.coerce.date().optional(),
});

// The `blog` collection reads your existing files in content/blog/ directly.
// Filenames are the slug; `<slug>.<locale>.mdx` is a translation.
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './content/blog',
    // Keep the raw filename as the id (default slugifies, which would mangle
    // the ".zh-Hans" locale marker into "zh-hans" and break grouping).
    // Folder-per-post: "<slug>/index.mdx" -> "<slug>", and
    // "<slug>/index.zh-Hans.mdx" -> "<slug>.zh-Hans". Flat files still work too.
    generateId: ({ entry }) =>
      entry.replace(/\.mdx$/, '').replace(/\/index(\.[\w-]+)?$/, '$1'),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string().default('ObjectStack Team'),
      date: z.coerce.date(),

      // Publishing lifecycle — `astro check` fails on an invalid value.
      status: z
        .enum(['draft', 'review', 'published', 'archived'])
        .default('draft'),

      // The canonical (original) URL — point every reprint back here for SEO.
      canonical_url: z.string().url().optional(),

      // Faceted taxonomy — one value each, from controlled lists.
      product: z.enum(PRODUCT_SLUGS), // primary axis (top-level nav)
      audience: z.enum(AUDIENCE_SLUGS), // who it's written for
      tags: z.array(z.string()).default([]), // topic / long-tail (freeform)
      cover: image().optional(),

      // Where this article has been published externally.
      channels: z.array(channel).default([]),
    }),
});

export const collections = { blog };
