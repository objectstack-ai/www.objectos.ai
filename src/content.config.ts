import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { slugsByGroup } from './lib/terms';

const TOPIC = slugsByGroup('topic') as [string, ...string[]];
const ROLE = slugsByGroup('role') as [string, ...string[]];
const SOLUTION = slugsByGroup('solution') as [string, ...string[]];
const INDUSTRY = slugsByGroup('industry') as [string, ...string[]];

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

      // Faceted taxonomy — terms from the unified list (src/lib/terms.ts).
      topic: z.enum(TOPIC), // primary axis (header nav) — required, single
      audience: z.enum(ROLE), // who it's written for — required, single
      solutions: z.array(z.enum(SOLUTION)).default([]), // optional, 0..n
      industries: z.array(z.enum(INDUSTRY)).default([]), // optional, 0..n
      tags: z.array(z.string()).default([]), // long-tail (freeform)
      cover: image().optional(),

      // Where this article has been published externally.
      channels: z.array(channel).default([]),
    }),
});

export const collections = { blog };
