import type { Locale } from './i18n';

export interface ProductDef {
  slug: string;
  label: Record<Locale, string>;
}

// Your product lines. This is the PRIMARY axis (top-level nav).
// Add a product here, then set `product: <slug>` in an article's frontmatter.
// Only products that have at least one article show up in the nav.
export const PRODUCTS = [
  { slug: 'objectstack', label: { en: 'ObjectStack', 'zh-Hans': 'ObjectStack' } },
  // Example — add your other products like this:
  // { slug: 'product-b', label: { en: 'Product B', 'zh-Hans': '产品B' } },
] as const satisfies readonly ProductDef[];

export type ProductSlug = (typeof PRODUCTS)[number]['slug'];

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug) as [
  ProductSlug,
  ...ProductSlug[],
];

export function productLabel(slug: ProductSlug, locale: Locale): string {
  return PRODUCTS.find((p) => p.slug === slug)!.label[locale];
}

export function productPath(locale: Locale, slug: ProductSlug): string {
  return locale === 'en' ? `/product/${slug}` : `/zh/product/${slug}`;
}
