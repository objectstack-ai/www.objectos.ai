import type { Locale } from './i18n';

export interface AudienceDef {
  slug: string;
  label: Record<Locale, string>;
}

// Who an article is written for. One audience per article.
export const AUDIENCES = [
  { slug: 'boss', label: { en: 'For Leaders', 'zh-Hans': '决策者' } },
  { slug: 'developer', label: { en: 'For Developers', 'zh-Hans': '开发者' } },
  { slug: 'general', label: { en: 'General', 'zh-Hans': '通用' } },
] as const satisfies readonly AudienceDef[];

export type AudienceSlug = (typeof AUDIENCES)[number]['slug'];

export const AUDIENCE_SLUGS = AUDIENCES.map((a) => a.slug) as [
  AudienceSlug,
  ...AudienceSlug[],
];

export function audienceLabel(slug: AudienceSlug, locale: Locale): string {
  return AUDIENCES.find((a) => a.slug === slug)!.label[locale];
}

export function audiencePath(locale: Locale, slug: AudienceSlug): string {
  return locale === 'en' ? `/audience/${slug}` : `/zh/audience/${slug}`;
}
