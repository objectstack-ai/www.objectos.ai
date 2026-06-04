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

type LabelInput = {
  en: string;
  'zh-Hans': string;
  ja: string;
  de: string;
  es: string;
  fr: string;
  ko: string;
};
type RawTerm = Omit<Term, 'label'> & { label: LabelInput };
type RawGroup = Omit<GroupMeta, 'label'> & { label: LabelInput };

const addHant = <T extends { label: LabelInput }>(
  x: T
): T & { label: Record<Locale, string> } => ({
  ...x,
  label: { ...x.label, 'zh-Hant': s2t(x.label['zh-Hans']) },
});

const RAW_GROUPS: RawGroup[] = [
  { group: 'topic', label: { en: 'Topics', 'zh-Hans': '主题', ja: 'トピック', de: 'Themen', es: 'Temas', fr: 'Sujets', ko: '주제' }, cardinality: 'one', inMainNav: true },
  { group: 'solution', label: { en: 'Solutions', 'zh-Hans': '解决方案', ja: 'ソリューション', de: 'Lösungen', es: 'Soluciones', fr: 'Solutions', ko: '솔루션' }, cardinality: 'many', inMainNav: false },
  { group: 'role', label: { en: 'Audience', 'zh-Hans': '受众', ja: '読者', de: 'Zielgruppe', es: 'Audiencia', fr: 'Audience', ko: '대상' }, cardinality: 'one', inMainNav: false },
  { group: 'industry', label: { en: 'Industry', 'zh-Hans': '行业', ja: '業界', de: 'Branche', es: 'Industria', fr: 'Secteur', ko: '산업' }, cardinality: 'many', inMainNav: false },
];

const RAW_TERMS: RawTerm[] = [
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

export function termDescription(term: Term, locale: Locale): string {
  const label = term.label[locale];
  const descriptions: Record<Locale, Record<TermGroup, string>> = {
    en: {
      topic: `Articles about ${label}, with practical notes on AI-native enterprise software, governed data, application development, and agent workflows.`,
      solution: `Practical thinking on ${label} scenarios, including data models, workflows, permissions, integrations, and AI agent patterns for enterprise teams.`,
      role: `Articles for ${label} on building, operating, and governing AI-native business applications with ObjectOS.`,
      industry: `Articles for ${label} teams on connecting existing systems, business data, workflows, and AI agents without replacing core platforms.`,
    },
    'zh-Hans': {
      topic: `围绕${label}的文章，关注 AI-native 企业软件、受控数据、应用搭建和 Agent 工作流的实践。`,
      solution: `关于${label}场景的实践思考，覆盖数据模型、流程、权限、集成以及企业 AI Agent 的设计方式。`,
      role: `面向${label}的文章，讨论如何用 ObjectOS 构建、运行和治理 AI-native 业务应用。`,
      industry: `面向${label}团队的文章，讨论如何连接现有系统、业务数据、流程与 AI Agent，而不是替换核心平台。`,
    },
    'zh-Hant': {
      topic: `圍繞${label}的文章，關注 AI-native 企業軟體、受控資料、應用搭建和 Agent 工作流的實踐。`,
      solution: `關於${label}場景的實踐思考，覆蓋資料模型、流程、許可權、整合以及企業 AI Agent 的設計方式。`,
      role: `面向${label}的文章，討論如何用 ObjectOS 構建、執行和治理 AI-native 業務應用。`,
      industry: `面向${label}團隊的文章，討論如何連線現有系統、業務資料、流程與 AI Agent，而不是替換核心平臺。`,
    },
    ja: {
      topic: `${label}に関する記事。AI-native な企業ソフトウェア、管理されたデータ、アプリ開発、エージェントワークフローを実践的に扱います。`,
      solution: `${label}のシナリオについて、データモデル、ワークフロー、権限、連携、企業向け AI エージェントの設計を扱います。`,
      role: `${label}向けに、ObjectOS で AI-native な業務アプリを構築、運用、統制する方法をまとめます。`,
      industry: `${label}チーム向けに、既存システム、業務データ、ワークフロー、AI エージェントをコアプラットフォームの置き換えなしにつなぐ方法を扱います。`,
    },
    de: {
      topic: `Artikel zu ${label}: praktische Gedanken zu AI-nativer Unternehmenssoftware, kontrollierten Daten, App-Entwicklung und Agent-Workflows.`,
      solution: `Praxiswissen zu ${label}: Datenmodelle, Workflows, Berechtigungen, Integrationen und AI-Agent-Muster für Unternehmen.`,
      role: `Artikel für ${label} über Aufbau, Betrieb und Governance AI-nativer Geschäftsanwendungen mit ObjectOS.`,
      industry: `Artikel für Teams in ${label}: bestehende Systeme, Geschäftsdaten, Workflows und AI Agents verbinden, ohne Kernplattformen zu ersetzen.`,
    },
    es: {
      topic: `Artículos sobre ${label}, con notas prácticas sobre software empresarial AI-native, datos gobernados, desarrollo de apps y flujos con agentes.`,
      solution: `Ideas prácticas para ${label}: modelos de datos, workflows, permisos, integraciones y patrones de agentes AI para equipos empresariales.`,
      role: `Artículos para ${label} sobre construir, operar y gobernar aplicaciones de negocio AI-native con ObjectOS.`,
      industry: `Artículos para equipos de ${label} sobre conectar sistemas existentes, datos de negocio, workflows y agentes AI sin reemplazar plataformas centrales.`,
    },
    fr: {
      topic: `Articles sur ${label}, avec des notes pratiques sur les logiciels d’entreprise AI-native, les données gouvernées, les applications et les workflows d’agents.`,
      solution: `Réflexions pratiques sur ${label} : modèles de données, workflows, permissions, intégrations et agents AI pour les équipes d’entreprise.`,
      role: `Articles pour ${label} sur la construction, l’exploitation et la gouvernance d’applications métier AI-native avec ObjectOS.`,
      industry: `Articles pour les équipes ${label} sur la connexion des systèmes existants, données métier, workflows et agents AI sans remplacer les plateformes centrales.`,
    },
    ko: {
      topic: `${label}에 관한 글입니다. AI-native 엔터프라이즈 소프트웨어, 관리되는 데이터, 앱 개발, 에이전트 워크플로를 실무 관점에서 다룹니다.`,
      solution: `${label} 시나리오에 대한 실무 관점입니다. 데이터 모델, 워크플로, 권한, 통합, 기업용 AI 에이전트 패턴을 다룹니다.`,
      role: `${label}를 위해 ObjectOS로 AI-native 비즈니스 애플리케이션을 구축, 운영, 거버넌스하는 방법을 다룹니다.`,
      industry: `${label} 팀을 위해 기존 시스템, 비즈니스 데이터, 워크플로, AI 에이전트를 핵심 플랫폼 교체 없이 연결하는 방법을 다룹니다.`,
    },
  };

  return descriptions[locale][term.group];
}

/** URL path segment(s) for a term — nested for child topics. */
export function termSlugPath(term: Term): string {
  return term.group === 'topic' && term.parent
    ? `${term.parent}/${term.slug}`
    : term.slug;
}

/** Full hub href for a term: /<locale>/blog/topics/<slugPath>. */
export function termHref(locale: Locale, term: Term): string {
  return `/${localeSeg(locale)}/blog/topics/${termSlugPath(term)}/`;
}
