// The blog's URL -> `lastmod` map, read straight from MDX frontmatter.
//
// `astro.config.mjs` needs this to fill the sitemap's `lastmod`, and it runs
// before Astro exists, so the content collection API is not available there —
// only the files on disk are. `scripts/seo-smoke.mjs` needs the same map to
// assert what the built sitemap actually says, so the mapping lives here once
// instead of being written twice and drifting.
//
// What `lastmod` means here (and what it deliberately does not):
//   * A blog post maps to `updated ?? date` — the revision date when the post
//     declares one, the first-publication date otherwise. This is the one
//     consumer where a revision belongs: sort order and RSS `pubDate` stay on
//     `date`, because a revision must not reorder the blog or re-notify
//     subscribers, but a crawler asking "did this change?" wants the revision.
//   * Every other page class — locale homes, blog indexes, topic hubs,
//     marketing, cluster, glossary, pricing/legal — is absent from this map on
//     purpose, so it gets no `lastmod` at all. There is no meaningful content
//     date for those, and build time is not a substitute: a `lastmod` that
//     moves on every deploy for every URL teaches crawlers the field is noise
//     on this site, which is worse than omitting it.
//
// Entry ids are derived exactly the way the content collection derives them
// (`generateId` in src/content.config.ts, `parseId` in src/lib/posts.ts). Keep
// the two in sync: this file maps a post back to the URL that route builds.

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { splitFrontmatter } from './frontmatter.mjs';

/** Every `.mdx` under `dir`, recursively. */
function walkMdx(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(full));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

/**
 * Parse the YAML frontmatter block of an MDX source.
 *
 * The fence split comes from `./frontmatter.mjs`, shared with
 * `scripts/content-lint.mjs` so the gate and this map cannot drift into
 * accepting different files. The wording stays here: this reader throws where
 * the gate collects, and both sets of strings are their own caller's.
 */
function frontmatter(source, file) {
  const split = splitFrontmatter(source);
  if (!split.ok) {
    throw new Error(
      split.reason === 'no-opening-fence'
        ? `${file} does not start with YAML frontmatter`
        : `${file} has no closing frontmatter fence`
    );
  }
  const data = yaml.load(split.raw);
  if (!data || typeof data !== 'object') {
    throw new Error(`${file} has empty or non-object frontmatter`);
  }
  return data;
}

/**
 * Collection id for a blog file path relative to `content/blog`, matching
 * `generateId` in src/content.config.ts: "<slug>/index.mdx" -> "<slug>",
 * "<slug>/index.zh-Hans.mdx" -> "<slug>.zh-Hans"; flat files keep their name.
 */
function entryId(relative) {
  return relative.replace(/\.mdx$/, '').replace(/\/index(\.[\w-]+)?$/, '$1');
}

/** Split an id into slug + locale, matching `parseId` in src/lib/posts.ts. */
function parseEntryId(id) {
  const match = id.match(/^(.*)\.([a-z]{2}(?:-[A-Za-z]+)?)$/);
  return match ? { slug: match[1], locale: match[2] } : { slug: id, locale: 'en' };
}

/**
 * A frontmatter date value as a Date. js-yaml resolves an unquoted
 * `2026-06-05` to a Date already; a quoted one arrives as a string.
 */
function toDate(value, file, field) {
  if (value === undefined || value === null) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${file}: \`${field}\` is not a valid date (${String(value)})`);
  }
  return date;
}

/**
 * Map every blog post URL path to the instant its `lastmod` should carry.
 *
 * @param {string} root Project root (the directory holding `content/`).
 * @returns {Map<string, Date>} "/<locale>/blog/<slug>/" -> `updated ?? date`.
 */
export function readPostLastmods(root) {
  const blogDir = path.join(root, 'content', 'blog');
  /** @type {Map<string, Map<string, Date>>} slug -> locale -> date */
  const bySlug = new Map();

  for (const file of walkMdx(blogDir)) {
    const relative = path.relative(blogDir, file).split(path.sep).join('/');
    const { slug, locale } = parseEntryId(entryId(relative));
    const data = frontmatter(readFileSync(file, 'utf8'), relative);
    const date = toDate(data.date, relative, 'date');
    if (!date) throw new Error(`${relative}: frontmatter has no \`date\``);
    const updated = toDate(data.updated, relative, 'updated');
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    bySlug.get(slug).set(locale, updated ?? date);
  }

  const lastmods = new Map();
  for (const [slug, byLocale] of bySlug) {
    // zh-Hant is generated from zh-Hans (scripts/gen-zh-hant.mjs), so the
    // Simplified file is where its dates are authored. The generated copy
    // carries the same frontmatter today, but a hand-maintained zh-Hant
    // override could drift; the Simplified source stays authoritative.
    const hans = byLocale.get('zh-Hans');
    if (hans && byLocale.has('zh-Hant')) byLocale.set('zh-Hant', hans);
    for (const [locale, date] of byLocale) {
      lastmods.set(`/${locale}/blog/${slug}/`, date);
    }
  }
  return lastmods;
}
