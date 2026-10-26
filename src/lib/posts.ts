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
type StatusKey = PostData['status'];

const PUBLIC_STATUSES: StatusKey[] = ['published'];
const includeArchived =
  import.meta.env.DEV || import.meta.env.CONTENT_INCLUDE_ARCHIVED === 'true';

export function isPublicPost(data: PostData): boolean {
  return PUBLIC_STATUSES.includes(data.status);
}

export function shouldExposePost(data: PostData): boolean {
  return includeArchived || isPublicPost(data);
}

/** Split an entry id like "my-post.zh-Hans" into { slug, locale }. */
export function parseId(id: string): { slug: string; locale: Locale } {
  const m = id.match(/^(.*)\.([a-z]{2}(?:-[A-Za-z]+)?)$/);
  if (m) return { slug: m[1], locale: m[2] as Locale };
  return { slug: id, locale: 'en' };
}

/** All blog entries grouped by base slug, so each article = one row. */
export async function getPostGroups(): Promise<PostGroup[]> {
  const entries = (await getCollection('blog')).filter((entry) =>
    shouldExposePost(entry.data)
  );
  const groups = new Map<string, PostGroup>();

  for (const entry of entries) {
    const { slug, locale } = parseId(entry.id);
    const group = groups.get(slug) ?? { slug, langs: {}, primary: entry };
    group.langs[locale] = entry;
    if (locale === 'en') group.primary = entry;
    groups.set(slug, group);
  }

  return [...groups.values()].sort(
    (a, b) =>
      b.primary.data.date.getTime() - a.primary.data.date.getTime() ||
      b.slug.localeCompare(a.slug)
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

export interface LocalePost {
  slug: string; // base slug (no locale suffix)
  entry: CollectionEntry<'blog'>;
}

/** Posts that actually exist in a locale (untranslated posts are excluded). */
export async function getPostsInLocale(locale: Locale): Promise<LocalePost[]> {
  const groups = await getPostGroups();
  return groups
    .filter((g) => g.langs[locale])
    .map((g) => ({ slug: g.slug, entry: g.langs[locale]! }));
}

/** Terms of a group used by posts that exist in `locale`, in canonical order. */
export async function getUsedTerms(
  group: TermGroup,
  locale: Locale
): Promise<Term[]> {
  const groups = await getPostGroups();
  return termsByGroup(group).filter((term) =>
    groups.some((g) => g.langs[locale] && articleHasTerm(g.langs[locale]!.data, term))
  );
}

/**
 * A hub listing fewer posts than this is noindexed. Its only text of its own
 * is `termDescription` — one sentence shared by every hub of the term's group
 * with the label swapped in — so a one- or two-post hub is a thin page that
 * duplicates the posts it lists. It stays built and linked (the menus and the
 * post chips point at it, and a reader browsing a topic still wants it); it is
 * kept out of the index, the sitemap and every hub's hreflang set until the
 * topic has enough writing to stand as a page.
 */
export const MIN_INDEXABLE_HUB_POSTS = 3;

/** Every term (any group) with content in `locale` — used to generate hubs. */
export async function getAllUsedTerms(locale: Locale): Promise<Term[]> {
  const groups = await getPostGroups();
  return TERMS.filter((term) =>
    groups.some((g) => g.langs[locale] && articleHasTerm(g.langs[locale]!.data, term))
  );
}

/**
 * The locale whose hub a reader in `locale` should be sent to for `term`, or
 * `undefined` when no hub to link exists.
 *
 * A hub is built only where a published post carries the term — the topics
 * route emits exactly `getAllUsedTerms(locale)` — so `termHref(locale, term)`
 * is a dead link wherever that set lacks the term. Hand-curated term lists (a
 * cluster's `relatedTerms`) are not derived from posts and have no such
 * guarantee: this answers the reader's own hub when it is built, the English
 * hub when only that one is, and nothing otherwise.
 */
export async function builtHubLocale(
  term: Term,
  locale: Locale
): Promise<Locale | undefined> {
  for (const candidate of locale === 'en' ? (['en'] as const) : ([locale, 'en'] as const)) {
    if ((await getAllUsedTerms(candidate)).some((used) => used.slug === term.slug)) return candidate;
  }
  return undefined;
}
