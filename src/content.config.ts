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

      // `date` and `updated` are two different facts and must never be
      // conflated. `date` is when the article was FIRST published and is
      // immutable — external references, RSS `pubDate` and the crawl history
      // all point at it. `updated` records a later substantive revision.
      // Refreshing a post sets `updated`; it never rewrites `date`.
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),

      // Publishing lifecycle — `astro check` fails on an invalid value.
      status: z
        .enum(['published', 'archived'])
        .default('published'),

      // Opt-out from the "every published post has an English original" gate in
      // `scripts/content-lint.mjs`. English is the source language, so a live
      // translation with no `index.mdx` is normally drift — a post missing from
      // the primary market while the site builds clean. The one legitimate case
      // is a post whose argument is already covered by a different English page,
      // where writing the original would ship a competitor to a live page for a
      // single intent. Set it on the published locale file.
      //
      // `.min(1)` is the point of the field: the reason is what turns an
      // exemption into a decision someone can audit later, and content-lint
      // prints every exemption it honours so an exempt post cannot quietly
      // become an invisible one. An exemption with no reason is just a gap.
      noEnglishOriginal: z.string().min(1).optional(),

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
    })
      // An `updated` that precedes `date` is not a typo to tolerate — it is a
      // claim that the article was revised before it existed. Reject it here,
      // at the producer, so no renderer has to guess which of the two is real.
      .superRefine((data, ctx) => {
        if (data.updated && data.updated.getTime() < data.date.getTime()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['updated'],
            message:
              `updated (${data.updated.toISOString().slice(0, 10)}) is earlier than ` +
              `date (${data.date.toISOString().slice(0, 10)}); ` +
              `\`date\` is the first-publication date and must not be rewritten when refreshing.`,
          });
        }
      }),
});

export const collections = { blog };
