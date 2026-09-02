import { LOCALES, type Locale } from '../lib/i18n';
import { s2t } from '../lib/zhconvert';
import type { GlossaryTerm } from './types';

/**
 * Same shape as `src/content-pages/registry.ts`: eager-glob a per-locale tree
 * of authored TypeScript modules, derive zh-Hant from zh-Hans, and fall back
 * to English for locales that have no authored file yet.
 *
 * `glossaryTermAlternates` lists only locales where the term really exists, so a
 * noindexed fallback page is never advertised as an hreflang equivalent.
 * `marketingPageAlternates` now follows the same rule; the two registries agree.
 */

const FALLBACK_LOCALE: Locale = 'en';
const localeSet = new Set<string>(LOCALES);
const termModules = import.meta.glob<GlossaryTerm>('../../content/glossary/*/*.ts', {
  eager: true,
  import: 'default',
});

const bySlug = (a: GlossaryTerm, b: GlossaryTerm): number => a.slug.localeCompare(b.slug);

const RAW_TERMS_BY_LOCALE = Object.entries(termModules).reduce<
  Partial<Record<Locale, GlossaryTerm[]>>
>((termsByLocale, [modulePath, term]) => {
  const match = modulePath.match(/content\/glossary\/([^/]+)\/([^/]+)\.ts$/);
  if (!match) return termsByLocale;
  const [, locale, fileSlug] = match;
  if (!localeSet.has(locale) || fileSlug !== term.slug) return termsByLocale;
  const terms = termsByLocale[locale as Locale] ?? [];
  terms.push(term);
  terms.sort(bySlug);
  termsByLocale[locale as Locale] = terms;
  return termsByLocale;
}, {});

// Traditional Chinese is derived from Simplified (s2t), never hand-kept —
// though a hand-written zh-Hant file, if ever added, wins over the derived copy.
const deepS2t = <T,>(value: T): T => {
  if (typeof value === 'string') return s2t(value) as unknown as T;
  if (Array.isArray(value)) return value.map(deepS2t) as unknown as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, deepS2t(entry)])
    ) as unknown as T;
  }
  return value;
};

{
  const hansTerms = RAW_TERMS_BY_LOCALE['zh-Hans'] ?? [];
  const hantTerms = RAW_TERMS_BY_LOCALE['zh-Hant'] ?? [];
  const hantSlugs = new Set(hantTerms.map((term) => term.slug));
  const derived = hansTerms
    .filter((term) => !hantSlugs.has(term.slug))
    // The slug is a URL segment: keep it Latin, convert only the prose.
    .map((term) => ({ ...deepS2t(term), slug: term.slug }));
  if (derived.length > 0) {
    RAW_TERMS_BY_LOCALE['zh-Hant'] = [...hantTerms, ...derived].sort(bySlug);
  }
}

const fallbackTerms = RAW_TERMS_BY_LOCALE[FALLBACK_LOCALE] ?? [];

const localizedTerm = (locale: Locale, slug: string): GlossaryTerm | undefined =>
  RAW_TERMS_BY_LOCALE[locale]?.find((term) => term.slug === slug);

/** Locales that carry real glossary content (authored, or derived from it). */
export const GLOSSARY_LOCALES: readonly Locale[] = LOCALES.filter(
  (locale) => (RAW_TERMS_BY_LOCALE[locale] ?? []).length > 0
);

const glossaryLocaleSet = new Set<Locale>(GLOSSARY_LOCALES);

export const hasGlossaryContent = (locale: Locale): boolean => glossaryLocaleSet.has(locale);

/** Every term visible in a locale, with English standing in where untranslated. */
export const getGlossaryTerms = (locale: Locale): readonly GlossaryTerm[] => {
  const localized = new Map((RAW_TERMS_BY_LOCALE[locale] ?? []).map((term) => [term.slug, term]));
  const merged = fallbackTerms.map((term) => localized.get(term.slug) ?? term);
  const fallbackSlugs = new Set(fallbackTerms.map((term) => term.slug));
  const localizedOnly = (RAW_TERMS_BY_LOCALE[locale] ?? []).filter(
    (term) => !fallbackSlugs.has(term.slug)
  );
  return [...merged, ...localizedOnly].sort(bySlug);
};

export const getGlossaryTerm = (locale: Locale, slug: string): GlossaryTerm | undefined =>
  localizedTerm(locale, slug) ?? localizedTerm(FALLBACK_LOCALE, slug);

/** Which locale the rendered copy actually came from — drives canonical + noindex. */
export const getGlossaryTermSourceLocale = (
  locale: Locale,
  slug: string
): Locale | undefined =>
  localizedTerm(locale, slug)
    ? locale
    : localizedTerm(FALLBACK_LOCALE, slug)
      ? FALLBACK_LOCALE
      : undefined;

/** Locale the glossary index renders in — English wherever nothing is authored. */
export const getGlossaryIndexSourceLocale = (locale: Locale): Locale =>
  hasGlossaryContent(locale) ? locale : FALLBACK_LOCALE;

export const glossaryIndexPath = (locale: Locale): string => `/${locale}/glossary/`;

export const glossaryTermPath = (locale: Locale, slug: string): string =>
  `/${locale}/glossary/${slug}/`;

/** hreflang targets for a term — real equivalents only, never fallback pages. */
export const glossaryTermAlternates = (slug: string): Partial<Record<Locale, string>> =>
  Object.fromEntries(
    LOCALES.filter((locale) => Boolean(localizedTerm(locale, slug))).map((locale) => [
      locale,
      glossaryTermPath(locale, slug),
    ])
  );

/** hreflang targets for the index — real equivalents only. */
export const glossaryIndexAlternates = (): Partial<Record<Locale, string>> =>
  Object.fromEntries(
    GLOSSARY_LOCALES.map((locale) => [locale, glossaryIndexPath(locale)])
  );
