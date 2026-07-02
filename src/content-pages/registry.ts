import { LOCALES, type Locale } from '../lib/i18n';
import type { MarketingPage } from './types';

const PAGE_ORDER = [
  'product-tour',
  'platform',
  'ai',
  'mcp',
  'permissions',
  'data-modeling',
  'app-ui',
  'automation',
  'approvals',
  'analytics',
  'trust-center',
  'templates',
  'agent-developer',
  'customer-stories',
];

const FALLBACK_LOCALE: Locale = 'en';
const localeSet = new Set<string>(LOCALES);
const pageModules = import.meta.glob<MarketingPage>('../../content/pages/*/*.ts', {
  eager: true,
  import: 'default',
});

const orderOf = (slug: string): number => {
  const index = PAGE_ORDER.indexOf(slug);
  return index === -1 ? PAGE_ORDER.length : index;
};

const RAW_PAGES_BY_LOCALE = Object.entries(pageModules).reduce<
  Partial<Record<Locale, MarketingPage[]>>
>((pagesByLocale, [modulePath, page]) => {
  const match = modulePath.match(/content\/pages\/([^/]+)\/([^/]+)\.ts$/);
  if (!match) return pagesByLocale;
  const [, locale, fileSlug] = match;
  if (!localeSet.has(locale) || fileSlug !== page.slug) return pagesByLocale;
  const pages = pagesByLocale[locale as Locale] ?? [];
  pages.push(page);
  pages.sort((a, b) => orderOf(a.slug) - orderOf(b.slug) || a.slug.localeCompare(b.slug));
  pagesByLocale[locale as Locale] = pages;
  return pagesByLocale;
}, {});

const fallbackPages = RAW_PAGES_BY_LOCALE[FALLBACK_LOCALE] ?? [];

const pageMapForLocale = (locale: Locale): Map<string, MarketingPage> =>
  new Map((RAW_PAGES_BY_LOCALE[locale] ?? []).map((page) => [page.slug, page]));

const localizedPage = (locale: Locale, slug: string): MarketingPage | undefined =>
  RAW_PAGES_BY_LOCALE[locale]?.find((page) => page.slug === slug);

export const getMarketingPages = (locale: Locale): readonly MarketingPage[] => {
  const localizedPages = pageMapForLocale(locale);
  const mergedPages = fallbackPages.map((page) => localizedPages.get(page.slug) ?? page);
  const fallbackSlugs = new Set(fallbackPages.map((page) => page.slug));
  const localizedOnlyPages = (RAW_PAGES_BY_LOCALE[locale] ?? []).filter(
    (page) => !fallbackSlugs.has(page.slug)
  );
  return [...mergedPages, ...localizedOnlyPages].sort(
    (a, b) => orderOf(a.slug) - orderOf(b.slug) || a.slug.localeCompare(b.slug)
  );
};

export const getMarketingPage = (
  locale: Locale,
  slug: string
): MarketingPage | undefined =>
  localizedPage(locale, slug) ?? localizedPage(FALLBACK_LOCALE, slug);

export const getMarketingPageSourceLocale = (
  locale: Locale,
  slug: string
): Locale | undefined =>
  localizedPage(locale, slug)
    ? locale
    : localizedPage(FALLBACK_LOCALE, slug)
      ? FALLBACK_LOCALE
      : undefined;

export const marketingPagePath = (locale: Locale, slug: string): string =>
  `/${locale}/${slug}/`;

export const marketingPageAlternates = (
  slug: string
): Partial<Record<Locale, string>> =>
  Object.fromEntries(
    LOCALES.filter((locale) => Boolean(getMarketingPage(locale, slug))).map((locale) => [
      locale,
      marketingPagePath(locale, slug),
    ])
  );
