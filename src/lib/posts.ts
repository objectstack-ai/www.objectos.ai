import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export interface PostGroup {
  slug: string; // base slug, shared across languages
  langs: Partial<Record<Locale, CollectionEntry<'blog'>>>;
  primary: CollectionEntry<'blog'>; // prefer English, else whatever exists
}

/** Split an entry id like "my-post.zh-Hans" into { slug, locale }. */
export function parseId(id: string): { slug: string; locale: Locale } {
  const m = id.match(/^(.*)\.([a-z]{2}(?:-[A-Za-z]+)?)$/);
  if (m) return { slug: m[1], locale: m[2] as Locale };
  return { slug: id, locale: 'en' };
}

/** All blog entries grouped by base slug, so each article = one row. */
export async function getPostGroups(): Promise<PostGroup[]> {
  const entries = await getCollection('blog');
  const groups = new Map<string, PostGroup>();

  for (const entry of entries) {
    const { slug, locale } = parseId(entry.id);
    const group = groups.get(slug) ?? {
      slug,
      langs: {},
      primary: entry,
    };
    group.langs[locale] = entry;
    if (locale === 'en') group.primary = entry;
    groups.set(slug, group);
  }

  return [...groups.values()].sort(
    (a, b) => b.primary.data.date.getTime() - a.primary.data.date.getTime()
  );
}

/** Pick the entry for the wanted locale, falling back to the other language. */
export function entryFor(
  group: PostGroup,
  locale: Locale
): CollectionEntry<'blog'> {
  return group.langs[locale] ?? group.primary;
}
