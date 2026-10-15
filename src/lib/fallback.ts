import { LOCALES, type Locale } from './i18n';

/**
 * The fallback rule, for a page type built at every locale URL but authored
 * in only some locales.
 *
 * A locale without its own copy renders the source locale's (English) copy, so
 * that URL is a duplicate of the source page in another page's language. It is
 * therefore noindexed and canonicalized to the source URL; `<main>` takes the
 * source language (`contentLocale`, see Base.astro); and no page names it as an
 * hreflang equivalent, because an hreflang annotation claims its target is a
 * real, indexable page in that language. The language switcher still offers
 * every locale (`navAlternates`): those URLs are built and read fine, and a
 * reader who picks German should stay on the same page.
 *
 * Marketing and glossary pages apply the same rule through their registries
 * (`src/content-pages/registry.ts`, `src/glossary/registry.ts`); this is the
 * form for page types whose per-locale copy lives in one module (pricing,
 * legal, security) or is not authored per locale at all (the topic clusters).
 *
 * `sourceLocaleOf` answers, for any locale, whose copy that locale's page
 * renders: itself when authored, another locale when it falls back.
 */
export interface FallbackRoute {
  sourceLocale: Locale;
  isFallback: boolean;
  canonical: string;
  alternates: Partial<Record<Locale, string>>;
  navAlternates: Partial<Record<Locale, string>>;
}

export function fallbackRoute(
  locale: Locale,
  sourceLocaleOf: (locale: Locale) => Locale,
  pathFor: (locale: Locale) => string
): FallbackRoute {
  const sourceLocale = sourceLocaleOf(locale);
  return {
    sourceLocale,
    isFallback: sourceLocale !== locale,
    canonical: pathFor(sourceLocale),
    alternates: Object.fromEntries(
      LOCALES.filter((l) => sourceLocaleOf(l) === l).map((l) => [l, pathFor(l)])
    ),
    navAlternates: Object.fromEntries(LOCALES.map((l) => [l, pathFor(l)])),
  };
}

/**
 * `sourceLocaleOf` for a per-locale copy table whose fallback locales hold the
 * very same object as `en` (`ja: pricingEn`, ...). Identity, not equality, is
 * the test: a locale is authored exactly when it has its own copy object, so
 * adding a translation makes the page indexable with no second list to update.
 */
export const sourceLocaleByIdentity =
  <T,>(copies: Record<Locale, T>) =>
  (locale: Locale): Locale =>
    locale !== 'en' && copies[locale] === copies.en ? 'en' : locale;
