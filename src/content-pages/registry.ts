import { LOCALES, type Locale } from '../lib/i18n';
import { s2t } from '../lib/zhconvert';
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
  'forward-deployed-engineers',
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

// Traditional-Chinese marketing content is derived from Simplified (s2t),
// never hand-kept — though a hand-written zh-Hant file, if ever added,
// takes precedence over the derived copy.
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
  const hansPages = RAW_PAGES_BY_LOCALE['zh-Hans'] ?? [];
  const hantPages = RAW_PAGES_BY_LOCALE['zh-Hant'] ?? [];
  const hantSlugs = new Set(hantPages.map((page) => page.slug));
  const derived = hansPages.filter((page) => !hantSlugs.has(page.slug)).map((page) => deepS2t(page));
  if (derived.length > 0) {
    RAW_PAGES_BY_LOCALE['zh-Hant'] = [...hantPages, ...derived].sort(
      (a, b) => orderOf(a.slug) - orderOf(b.slug) || a.slug.localeCompare(b.slug)
    );
  }
}

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
