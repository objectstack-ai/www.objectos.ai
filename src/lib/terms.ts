import { localeSeg, type Locale } from './i18n';
import { s2t } from './zhconvert';

// One unified taxonomy. Every browse axis (topic / role / solution / industry)
// is just a "term" with a `group`. Hubs all live under one flat URL namespace
// (/<locale>/blog/topics/<slug>); the axis never appears in the URL — it only
// groups terms in the menus. `topic` may nest one level (parent -> child).
//
// Labels are authored in English + Simplified Chinese; Traditional (zh-Hant)
// is auto-derived via OpenCC s2twp, so we never hand-maintain a third copy.

export type TermGroup = 'topic' | 'role' | 'solution' | 'industry';

export interface Term {
  slug: string;
  group: TermGroup;
  label: Record<Locale, string>;
  parent?: string; // topic-only: slug of the parent topic
}

export interface GroupMeta {
  group: TermGroup;
  label: Record<Locale, string>;
  cardinality: 'one' | 'many'; // per article
  inMainNav: boolean; // topic = primary header nav; others = filters
}

type LabelInput = { en: string; 'zh-Hans': string };
type RawTerm = Omit<Term, 'label'> & { label: LabelInput };
type RawGroup = Omit<GroupMeta, 'label'> & { label: LabelInput };

const addHant = <T extends { label: LabelInput }>(
  x: T
): T & { label: Record<Locale, string> } => ({
  ...x,
  label: { ...x.label, 'zh-Hant': s2t(x.label['zh-Hans']) },
});

const RAW_GROUPS: RawGroup[] = [
  { group: 'topic', label: { en: 'Topics', 'zh-Hans': '主题' }, cardinality: 'one', inMainNav: true },
  { group: 'solution', label: { en: 'Solutions', 'zh-Hans': '解决方案' }, cardinality: 'many', inMainNav: false },
  { group: 'role', label: { en: 'Audience', 'zh-Hans': '受众' }, cardinality: 'one', inMainNav: false },
  { group: 'industry', label: { en: 'Industry', 'zh-Hans': '行业' }, cardinality: 'many', inMainNav: false },
];

const RAW_TERMS: RawTerm[] = [
  // — Topics (主题) — primary axis. Horizontal themes. Can nest via `parent`.
  { slug: 'ai-agents', group: 'topic', label: { en: 'AI & Agents', 'zh-Hans': 'AI 与智能体' } },
  { slug: 'app-building', group: 'topic', label: { en: 'App Development', 'zh-Hans': '应用搭建' } },
  { slug: 'integration-data', group: 'topic', label: { en: 'Integration & Data', 'zh-Hans': '集成与数据' } },
  { slug: 'automation', group: 'topic', label: { en: 'Process Automation', 'zh-Hans': '流程自动化' } },
  { slug: 'modernization', group: 'topic', label: { en: 'Modernization', 'zh-Hans': '系统现代化' } },
  { slug: 'governance', group: 'topic', label: { en: 'Security & Governance', 'zh-Hans': '安全与治理' } },
  { slug: 'customer-stories', group: 'topic', label: { en: 'Customer Stories', 'zh-Hans': '客户故事' } },

  // — Roles (受众) — single, required.
  { slug: 'business', group: 'role', label: { en: 'Business Leaders', 'zh-Hans': '业务决策者' } },
  { slug: 'it', group: 'role', label: { en: 'IT Leaders', 'zh-Hans': 'IT / CIO' } },
  { slug: 'developer', group: 'role', label: { en: 'Developers', 'zh-Hans': '开发者' } },
  { slug: 'general', group: 'role', label: { en: 'General', 'zh-Hans': '通用' } },

  // — Solutions (解决方案) — vertical apps on the platform. Optional, 0..n.
  { slug: 'crm', group: 'solution', label: { en: 'CRM', 'zh-Hans': 'CRM 客户管理' } },
  { slug: 'portals', group: 'solution', label: { en: 'Customer Portals', 'zh-Hans': '客户门户与自助' } },
  { slug: 'onboarding', group: 'solution', label: { en: 'Customer Onboarding', 'zh-Hans': '客户开户' } },
  { slug: 'case-management', group: 'solution', label: { en: 'Case Management', 'zh-Hans': '案件管理' } },
  { slug: 'field-service', group: 'solution', label: { en: 'Field Service', 'zh-Hans': '现场服务' } },
  { slug: 'supply-chain', group: 'solution', label: { en: 'Supply Chain & Procurement', 'zh-Hans': '供应链与采购' } },
  { slug: 'hr', group: 'solution', label: { en: 'HR & Internal Apps', 'zh-Hans': '人事与内部应用' } },

  // — Industries (行业) — optional, 0..n. Hidden until an article uses one.
  { slug: 'financial-services', group: 'industry', label: { en: 'Financial Services', 'zh-Hans': '金融' } },
  { slug: 'insurance', group: 'industry', label: { en: 'Insurance', 'zh-Hans': '保险' } },
  { slug: 'healthcare', group: 'industry', label: { en: 'Healthcare & Life Sciences', 'zh-Hans': '医疗健康' } },
  { slug: 'manufacturing', group: 'industry', label: { en: 'Manufacturing', 'zh-Hans': '制造' } },
  { slug: 'retail', group: 'industry', label: { en: 'Retail & Consumer Goods', 'zh-Hans': '零售消费品' } },
  { slug: 'public-sector', group: 'industry', label: { en: 'Public Sector', 'zh-Hans': '政府公共' } },
  { slug: 'telecom-media', group: 'industry', label: { en: 'Telecom & Media', 'zh-Hans': '电信媒体' } },
  { slug: 'energy-utilities', group: 'industry', label: { en: 'Energy & Utilities', 'zh-Hans': '能源公用' } },
];

export const GROUPS: GroupMeta[] = RAW_GROUPS.map(addHant);
export const TERMS: Term[] = RAW_TERMS.map(addHant);

// --- lookups -----------------------------------------------------------------
const BY_SLUG = new Map(TERMS.map((t) => [t.slug, t]));

export const termBySlug = (slug: string): Term | undefined => BY_SLUG.get(slug);
export const termsByGroup = (group: TermGroup): Term[] =>
  TERMS.filter((t) => t.group === group);
export const slugsByGroup = (group: TermGroup): string[] =>
  termsByGroup(group).map((t) => t.slug);
export const groupMeta = (group: TermGroup): GroupMeta =>
  GROUPS.find((g) => g.group === group)!;
export const termLabel = (slug: string, locale: Locale): string =>
  BY_SLUG.get(slug)?.label[locale] ?? slug;
export const childTopics = (parentSlug: string): Term[] =>
  TERMS.filter((t) => t.group === 'topic' && t.parent === parentSlug);

/** URL path segment(s) for a term — nested for child topics. */
export function termSlugPath(term: Term): string {
  return term.group === 'topic' && term.parent
    ? `${term.parent}/${term.slug}`
    : term.slug;
}

/** Full hub href for a term: /<locale>/blog/topics/<slugPath>. */
export function termHref(locale: Locale, term: Term): string {
  return `/${localeSeg(locale)}/blog/topics/${termSlugPath(term)}`;
}
