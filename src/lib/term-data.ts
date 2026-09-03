// The term taxonomy, as data. Single source of truth for hub slugs and nesting.
//
// This module has two consumers, and the second one is the reason it exists
// apart from `./terms`:
//
//   * `src/lib/terms.ts` — derives the zh-Hant labels and the lookups the site
//     renders with. Runs under Vite.
//   * `scripts/content-lint.mjs` — plain Node, resolves the
//     `/<locale>/blog/topics/<slugPath>/` links authors write in article bodies.
//
// Node runs a `.ts` file by stripping its types, which erases `import type` but
// leaves value imports to be resolved by Node's own rules — extensionless
// specifiers like `./i18n` are Vite-only and fail with ERR_MODULE_NOT_FOUND.
// `terms.ts` value-imports `./i18n` and `./zhconvert`, so Node cannot load it;
// this module imports nothing and must stay that way. `src/lib/clusters.ts` is
// importable from the same script for the same reason.
//
// ⛔ Adding a value import here breaks the content gate's ability to tell a real
// topic hub from a typo, and it breaks it loudly (`content:lint` exits 1 with
// the module error) rather than silently — but the fix is to keep the import
// out, not to re-derive the slug list by text-matching this file.
//
// One unified taxonomy. Every browse axis (topic / role / solution / industry)
// is just a "term" with a `group`. Hubs all live under one flat URL namespace
// (/<locale>/blog/topics/<slug>); the axis never appears in the URL — it only
// groups terms in the menus. `topic` may nest one level (parent -> child).
//
// Labels are authored in English + Simplified Chinese; Traditional (zh-Hant)
// is auto-derived via OpenCC s2twp in `./terms`, so we never hand-maintain a
// third copy.

export type TermGroup = 'topic' | 'role' | 'solution' | 'industry';

/** The structural half of a term: everything that decides its hub URL. */
export interface TermIdentity {
  slug: string;
  group: TermGroup;
  parent?: string; // topic-only: slug of the parent topic
}

/** Authored labels. zh-Hant is derived, never authored, so it is absent here. */
export interface TermLabels {
  en: string;
  'zh-Hans': string;
  ja: string;
  de: string;
  es: string;
  fr: string;
  ko: string;
}

export interface RawTerm extends TermIdentity {
  label: TermLabels;
}

export interface RawGroup {
  group: TermGroup;
  label: TermLabels;
  cardinality: 'one' | 'many'; // per article
  inMainNav: boolean; // topic = primary header nav; others = filters
}

export const RAW_GROUPS: RawGroup[] = [
  { group: 'topic', label: { en: 'Topics', 'zh-Hans': '主题', ja: 'トピック', de: 'Themen', es: 'Temas', fr: 'Sujets', ko: '주제' }, cardinality: 'one', inMainNav: true },
  { group: 'solution', label: { en: 'Solutions', 'zh-Hans': '解决方案', ja: 'ソリューション', de: 'Lösungen', es: 'Soluciones', fr: 'Solutions', ko: '솔루션' }, cardinality: 'many', inMainNav: false },
  { group: 'role', label: { en: 'Audience', 'zh-Hans': '受众', ja: '読者', de: 'Zielgruppe', es: 'Audiencia', fr: 'Audience', ko: '대상' }, cardinality: 'one', inMainNav: false },
  { group: 'industry', label: { en: 'Industry', 'zh-Hans': '行业', ja: '業界', de: 'Branche', es: 'Industria', fr: 'Secteur', ko: '산업' }, cardinality: 'many', inMainNav: false },
];

export const RAW_TERMS: RawTerm[] = [
  // — Topics (主题) — primary axis. Horizontal themes. Can nest via `parent`.
  { slug: 'ai-agents', group: 'topic', label: { en: 'AI & Agents', 'zh-Hans': 'AI 与智能体', ja: 'AI とエージェント', de: 'AI & Agenten', es: 'AI y agentes', fr: 'AI et agents', ko: 'AI와 에이전트' } },
  { slug: 'app-building', group: 'topic', label: { en: 'App Development', 'zh-Hans': '应用搭建', ja: 'アプリ開発', de: 'App-Entwicklung', es: 'Desarrollo de apps', fr: 'Développement applicatif', ko: '앱 개발' } },
  { slug: 'integration-data', group: 'topic', label: { en: 'Integration & Data', 'zh-Hans': '集成与数据', ja: '連携とデータ', de: 'Integration & Daten', es: 'Integración y datos', fr: 'Intégration et données', ko: '통합과 데이터' } },
  { slug: 'automation', group: 'topic', label: { en: 'Process Automation', 'zh-Hans': '流程自动化', ja: 'プロセス自動化', de: 'Prozessautomatisierung', es: 'Automatización de procesos', fr: 'Automatisation des processus', ko: '프로세스 자동화' } },
  { slug: 'modernization', group: 'topic', label: { en: 'Modernization', 'zh-Hans': '系统现代化', ja: 'モダナイゼーション', de: 'Modernisierung', es: 'Modernización', fr: 'Modernisation', ko: '현대화' } },
  { slug: 'governance', group: 'topic', label: { en: 'Security & Governance', 'zh-Hans': '安全与治理', ja: 'セキュリティとガバナンス', de: 'Sicherheit & Governance', es: 'Seguridad y gobernanza', fr: 'Sécurité et gouvernance', ko: '보안과 거버넌스' } },
  { slug: 'customer-stories', group: 'topic', label: { en: 'Customer Stories', 'zh-Hans': '客户故事', ja: '顧客事例', de: 'Kundengeschichten', es: 'Historias de clientes', fr: 'Cas clients', ko: '고객 사례' } },

  // — Roles (受众) — single, required.
  { slug: 'business', group: 'role', label: { en: 'Business Leaders', 'zh-Hans': '业务决策者', ja: 'ビジネスリーダー', de: 'Business-Verantwortliche', es: 'Líderes de negocio', fr: 'Dirigeants métier', ko: '비즈니스 리더' } },
  { slug: 'it', group: 'role', label: { en: 'IT Leaders', 'zh-Hans': 'IT / CIO', ja: 'IT / CIO', de: 'IT / CIO', es: 'IT / CIO', fr: 'IT / CIO', ko: 'IT / CIO' } },
  { slug: 'developer', group: 'role', label: { en: 'Developers', 'zh-Hans': '开发者', ja: '開発者', de: 'Entwickler', es: 'Desarrolladores', fr: 'Développeurs', ko: '개발자' } },
  { slug: 'general', group: 'role', label: { en: 'General', 'zh-Hans': '通用', ja: '一般', de: 'Allgemein', es: 'General', fr: 'Général', ko: '일반' } },

  // — Solutions (解决方案) — vertical apps on the platform. Optional, 0..n.
  { slug: 'crm', group: 'solution', label: { en: 'CRM', 'zh-Hans': 'CRM 客户管理', ja: 'CRM', de: 'CRM', es: 'CRM', fr: 'CRM', ko: 'CRM' } },
  { slug: 'portals', group: 'solution', label: { en: 'Customer Portals', 'zh-Hans': '客户门户与自助', ja: '顧客ポータル', de: 'Kundenportale', es: 'Portales de clientes', fr: 'Portails clients', ko: '고객 포털' } },
  { slug: 'onboarding', group: 'solution', label: { en: 'Customer Onboarding', 'zh-Hans': '客户开户', ja: '顧客オンボーディング', de: 'Kunden-Onboarding', es: 'Alta de clientes', fr: 'Onboarding client', ko: '고객 온보딩' } },
  { slug: 'case-management', group: 'solution', label: { en: 'Case Management', 'zh-Hans': '案件管理', ja: 'ケース管理', de: 'Fallmanagement', es: 'Gestión de casos', fr: 'Gestion des dossiers', ko: '케이스 관리' } },
  { slug: 'field-service', group: 'solution', label: { en: 'Field Service', 'zh-Hans': '现场服务', ja: 'フィールドサービス', de: 'Außendienst', es: 'Servicio de campo', fr: 'Service terrain', ko: '현장 서비스' } },
  { slug: 'supply-chain', group: 'solution', label: { en: 'Supply Chain & Procurement', 'zh-Hans': '供应链与采购', ja: 'サプライチェーンと調達', de: 'Lieferkette & Einkauf', es: 'Cadena de suministro y compras', fr: 'Supply chain et achats', ko: '공급망과 구매' } },
  { slug: 'hr', group: 'solution', label: { en: 'HR & Internal Apps', 'zh-Hans': '人事与内部应用', ja: '人事と社内アプリ', de: 'HR & interne Apps', es: 'RR. HH. y apps internas', fr: 'RH et apps internes', ko: 'HR 및 내부 앱' } },

  // — Industries (行业) — optional, 0..n. Hidden until an article uses one.
  { slug: 'financial-services', group: 'industry', label: { en: 'Financial Services', 'zh-Hans': '金融', ja: '金融サービス', de: 'Finanzdienstleistungen', es: 'Servicios financieros', fr: 'Services financiers', ko: '금융 서비스' } },
  { slug: 'insurance', group: 'industry', label: { en: 'Insurance', 'zh-Hans': '保险', ja: '保険', de: 'Versicherung', es: 'Seguros', fr: 'Assurance', ko: '보험' } },
  { slug: 'healthcare', group: 'industry', label: { en: 'Healthcare & Life Sciences', 'zh-Hans': '医疗健康', ja: '医療・ライフサイエンス', de: 'Gesundheit & Life Sciences', es: 'Salud y ciencias de la vida', fr: 'Santé et sciences de la vie', ko: '헬스케어와 생명과학' } },
  { slug: 'manufacturing', group: 'industry', label: { en: 'Manufacturing', 'zh-Hans': '制造', ja: '製造', de: 'Fertigung', es: 'Manufactura', fr: 'Industrie manufacturière', ko: '제조' } },
  { slug: 'retail', group: 'industry', label: { en: 'Retail & Consumer Goods', 'zh-Hans': '零售消费品', ja: '小売・消費財', de: 'Handel & Konsumgüter', es: 'Retail y bienes de consumo', fr: 'Retail et biens de consommation', ko: '리테일과 소비재' } },
  { slug: 'public-sector', group: 'industry', label: { en: 'Public Sector', 'zh-Hans': '政府公共', ja: '公共部門', de: 'Öffentlicher Sektor', es: 'Sector público', fr: 'Secteur public', ko: '공공 부문' } },
  { slug: 'telecom-media', group: 'industry', label: { en: 'Telecom & Media', 'zh-Hans': '电信媒体', ja: '通信・メディア', de: 'Telekommunikation & Medien', es: 'Telecomunicaciones y medios', fr: 'Télécoms et médias', ko: '통신과 미디어' } },
  { slug: 'energy-utilities', group: 'industry', label: { en: 'Energy & Utilities', 'zh-Hans': '能源公用', ja: 'エネルギー・公益', de: 'Energie & Versorgung', es: 'Energía y utilities', fr: 'Énergie et utilities', ko: '에너지와 유틸리티' } },
];

/**
 * URL path segment(s) for a term — nested for child topics.
 *
 * This is the only definition of the nesting rule. `./terms` re-exports it for
 * the site (`termHref`, and the `getStaticPaths` of
 * `src/pages/[lang]/blog/topics/[...slug].astro`), and `scripts/content-lint.mjs`
 * imports it to resolve authored hub links, so the gate and the router cannot
 * disagree about where a hub lives.
 */
export function termSlugPath(term: TermIdentity): string {
  return term.group === 'topic' && term.parent
    ? `${term.parent}/${term.slug}`
    : term.slug;
}
