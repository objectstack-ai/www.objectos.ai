import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';
import {
  TERMS,
  termBySlug,
  termsByGroup,
  type Term,
  type TermGroup,
} from './terms';

export interface PostGroup {
  slug: string; // base slug, shared across languages
  langs: Partial<Record<Locale, CollectionEntry<'blog'>>>;
  primary: CollectionEntry<'blog'>; // prefer English, else whatever exists
}

type PostData = CollectionEntry<'blog'>['data'];

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
    const group = groups.get(slug) ?? { slug, langs: {}, primary: entry };
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

/** The term slugs an article carries for a given axis. */
export function articleTermSlugs(data: PostData, group: TermGroup): string[] {
  switch (group) {
    case 'topic':
      return data.topic ? [data.topic] : [];
    case 'role':
      return data.audience ? [data.audience] : [];
    case 'solution':
      return data.solutions ?? [];
    case 'industry':
      return data.industries ?? [];
  }
}

/** Does an article belong to a term's hub? (topic hubs aggregate their children.) */
export function articleHasTerm(data: PostData, term: Term): boolean {
  if (term.group === 'topic') {
    if (data.topic === term.slug) return true;
    return termBySlug(data.topic)?.parent === term.slug; // child rolls up to parent
  }
  return articleTermSlugs(data, term.group).includes(term.slug);
}

/** Terms of a group that have at least one post, in canonical order. */
export async function getUsedTerms(group: TermGroup): Promise<Term[]> {
  const groups = await getPostGroups();
  return termsByGroup(group).filter((term) =>
    groups.some((g) => articleHasTerm(g.primary.data, term))
  );
}

/** Every term (any group) that has content — used to generate hub pages. */
export async function getAllUsedTerms(): Promise<Term[]> {
  const groups = await getPostGroups();
  return TERMS.filter((term) =>
    groups.some((g) => articleHasTerm(g.primary.data, term))
  );
}
