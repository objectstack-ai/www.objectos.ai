import { s2t } from './zhconvert';

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant' | 'ja' | 'de' | 'es' | 'fr' | 'ko';

export const LOCALES: Locale[] = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'de', 'es', 'fr', 'ko'];

/** URL segment for a locale = the locale code itself (matches objectos.ai). */
export const localeSeg = (l: Locale): string => l;

/** URL segment -> Locale (undefined if not a known locale segment). */
export const segToLocale = (seg: string): Locale | undefined =>
  (LOCALES as string[]).includes(seg) ? (seg as Locale) : undefined;

/** Marketing home URL: /en/, /zh-Hans/, /zh-Hant/, ... */
export const homePath = (l: Locale): string => `/${l}/`;

/** Blog index URL: /<locale>/blog/. */
export const blogPath = (l: Locale): string => `/${l}/blog/`;

/** RSS feed URL: /<locale>/rss.xml. */
export const rssPath = (l: Locale): string => `/${l}/rss.xml`;

/** Legal page URLs. */
export const securityPath = (l: Locale): string => `/${l}/security/`;
export const termsPath = (l: Locale): string => `/${l}/terms/`;
export const privacyPath = (l: Locale): string => `/${l}/privacy/`;
export const refundsPath = (l: Locale): string => `/${l}/refunds/`;

/** Pricing page URL. */
export const pricingPath = (l: Locale): string => `/${l}/pricing/`;

/** Article URL: /<locale>/blog/<baseSlug>. */
export const postPath = (l: Locale, slug: string): string =>
  `/${l}/blog/${slug}/`;

/** BCP-47 lang attribute (the locale codes are already valid). */
export const htmlLang = (l: Locale): string => l;

/** Human-readable date in the active locale; keep ISO dates in `datetime`. */
export const formatDate = (locale: Locale, date: Date): string =>
  new Intl.DateTimeFormat(htmlLang(locale), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

/** Short label for the language toggle. */
export const LANG_LABEL: Record<Locale, string> = {
  en: 'EN',
  'zh-Hans': '简',
  'zh-Hant': '繁',
  ja: '日',
  de: 'DE',
  es: 'ES',
  fr: 'FR',
  ko: '한',
};

/** Native name, shown in the language dropdown (scales to many locales). */
export const LANG_NATIVE: Record<Locale, string> = {
  en: 'English',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
  ja: '日本語',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  ko: '한국어',
};

type StatusKey = 'published' | 'archived';

interface Strings {
  siteName: string;
  siteNav: {
    product: string;
    developers: string;
    resources: string;
    docs: string;
    menu: string;
    productTour: string;
    platform: string;
    aiBuildAsk: string;
    whyObjectOs: string;
    dataModeling: string;
    appInterfaces: string;
    analytics: string;
    automation: string;
    approvals: string;
    permissionsSecurity: string;
    groupEvaluate: string;
    groupCapabilities: string;
    trustCenter: string;
    toolsMcp: string;
    agentGuide: string;
    templates: string;
    referenceStories: string;
  };
  getStarted: string;
  skipToContent: string;
  footer: { terms: string; privacy: string; pricing: string; refunds: string };
  all: string;
  audience: string;
  articlesTitle: string;
  articlesLead: (n: number) => string;
  backToList: string;
  alsoOn: string;
  references: string;
  by: string;
  /** Prefix for the revision date, e.g. "Updated 25 Aug 2026". */
  updated: string;
  empty: string;
  relatedTitle: string;
  status: Record<StatusKey, string>;
}

const en: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Product',
    developers: 'Developers',
    resources: 'Resources',
    docs: 'Docs',
    menu: 'Menu',
    productTour: 'Product tour',
    platform: 'Platform overview',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Why ObjectOS',
    dataModeling: 'Data modeling',
    appInterfaces: 'App interfaces',
    analytics: 'Analytics & reporting',
    automation: 'Process automation',
    approvals: 'Approvals',
    permissionsSecurity: 'Permissions & security',
    groupEvaluate: 'Evaluate',
    groupCapabilities: 'Capabilities',
    trustCenter: 'Trust center',
    toolsMcp: 'Tools & MCP',
    agentGuide: 'Agent guide',
    templates: 'Templates',
    referenceStories: 'Reference stories',
  },
  getStarted: 'Get started',
  skipToContent: 'Skip to content',
  footer: { terms: 'Terms & License', privacy: 'Privacy', pricing: 'Pricing', refunds: 'Refunds' },
  all: 'Home',
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'article' : 'articles'} on AI-written enterprise software, runtime governance, and agent-ready applications.`,
  backToList: 'All articles',
  alsoOn: 'Also published on',
  references: 'References',
  by: 'By',
  updated: 'Updated',
  empty: 'No articles yet.',
  relatedTitle: 'Related articles',
  status: { published: 'Published', archived: 'Archived' },
};

const zhHans: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: '产品',
    developers: '开发者',
    resources: '资源',
    docs: '文档',
    menu: '菜单',
    productTour: '产品导览',
    platform: '平台总览',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: '为什么选 ObjectOS',
    dataModeling: '数据建模',
    appInterfaces: '应用界面',
    analytics: '报表与分析',
    automation: '流程自动化',
    approvals: '审批',
    permissionsSecurity: '权限与安全',
    groupEvaluate: '评估',
    groupCapabilities: '平台能力',
    trustCenter: '信任中心',
    toolsMcp: '工具与 MCP',
    agentGuide: 'Agent 开发指南',
    templates: '模板',
    referenceStories: '参考案例',
  },
  getStarted: '开始使用',
  skipToContent: '跳到正文',
  footer: { terms: '许可协议', privacy: '隐私政策', pricing: '定价', refunds: '退款政策' },
  all: '首页',
  audience: '受众',
  articlesTitle: '文章',
  articlesLead: (n) => `${n} 篇关于构建 AI-native 软件的文章。`,
  backToList: '全部文章',
  alsoOn: '同步发布于',
  references: '参考链接',
  by: '作者',
  updated: '更新于',
  empty: '还没有文章。',
  relatedTitle: '相关文章',
  status: { published: '已发布', archived: '已归档' },
};

const ja: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: '製品',
    developers: '開発者',
    resources: 'リソース',
    docs: 'Docs',
    menu: 'メニュー',
    productTour: 'プロダクトツアー',
    platform: 'プラットフォーム概要',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'ObjectOS を選ぶ理由',
    dataModeling: 'データモデリング',
    appInterfaces: 'アプリ画面',
    analytics: 'レポートと分析',
    automation: 'プロセス自動化',
    approvals: '承認',
    permissionsSecurity: '権限とセキュリティ',
    groupEvaluate: '検討',
    groupCapabilities: '機能',
    trustCenter: 'トラストセンター',
    toolsMcp: 'ツールと MCP',
    agentGuide: 'エージェント開発ガイド',
    templates: 'テンプレート',
    referenceStories: '導入事例',
  },
  getStarted: 'はじめる',
  skipToContent: '本文へ移動',
  footer: { terms: '利用規約・ライセンス', privacy: 'プライバシー', pricing: '料金', refunds: '返金' },
  all: 'ホーム',
  audience: '読者',
  articlesTitle: '記事',
  articlesLead: (n) => `AI-native ソフトウェア構築に関する ${n} 本の記事。`,
  backToList: 'すべての記事',
  alsoOn: '同時掲載',
  references: '参考リンク',
  by: '著者',
  updated: '更新日',
  empty: '記事はまだありません。',
  relatedTitle: '関連記事',
  status: { published: '公開済み', archived: 'アーカイブ済み' },
};

const de: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Produkt',
    developers: 'Entwickler',
    resources: 'Ressourcen',
    docs: 'Docs',
    menu: 'Menü',
    productTour: 'Produkt-Tour',
    platform: 'Plattform-Überblick',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Warum ObjectOS',
    dataModeling: 'Datenmodellierung',
    appInterfaces: 'App-Oberflächen',
    analytics: 'Analysen & Berichte',
    automation: 'Prozessautomatisierung',
    approvals: 'Freigaben',
    permissionsSecurity: 'Berechtigungen & Sicherheit',
    groupEvaluate: 'Evaluieren',
    groupCapabilities: 'Funktionen',
    trustCenter: 'Trust Center',
    toolsMcp: 'Tools & MCP',
    agentGuide: 'Agent-Leitfaden',
    templates: 'Vorlagen',
    referenceStories: 'Referenzberichte',
  },
  getStarted: 'Loslegen',
  skipToContent: 'Zum Inhalt springen',
  footer: { terms: 'Bedingungen & Lizenz', privacy: 'Datenschutz', pricing: 'Preise', refunds: 'Rückerstattung' },
  all: 'Start',
  audience: 'Zielgruppe',
  articlesTitle: 'Artikel',
  articlesLead: (n) => `${n} ${n === 1 ? 'Artikel' : 'Artikel'} über den Aufbau AI-nativer Software.`,
  backToList: 'Alle Artikel',
  alsoOn: 'Auch veröffentlicht auf',
  references: 'Referenzen',
  by: 'Von',
  updated: 'Aktualisiert',
  empty: 'Noch keine Artikel.',
  relatedTitle: 'Ähnliche Artikel',
  status: { published: 'Veröffentlicht', archived: 'Archiviert' },
};

const es: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Producto',
    developers: 'Desarrolladores',
    resources: 'Recursos',
    docs: 'Docs',
    menu: 'Menú',
    productTour: 'Recorrido del producto',
    platform: 'Resumen de plataforma',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Por qué ObjectOS',
    dataModeling: 'Modelado de datos',
    appInterfaces: 'Interfaces de la app',
    analytics: 'Analítica e informes',
    automation: 'Automatización de procesos',
    approvals: 'Aprobaciones',
    permissionsSecurity: 'Permisos y seguridad',
    groupEvaluate: 'Evaluar',
    groupCapabilities: 'Capacidades',
    trustCenter: 'Centro de confianza',
    toolsMcp: 'Herramientas y MCP',
    agentGuide: 'Guía para agentes',
    templates: 'Plantillas',
    referenceStories: 'Casos de referencia',
  },
  getStarted: 'Empezar',
  skipToContent: 'Saltar al contenido',
  footer: { terms: 'Términos y licencia', privacy: 'Privacidad', pricing: 'Precios', refunds: 'Reembolsos' },
  all: 'Inicio',
  audience: 'Audiencia',
  articlesTitle: 'Artículos',
  articlesLead: (n) => `${n} ${n === 1 ? 'artículo' : 'artículos'} sobre crear software AI-native.`,
  backToList: 'Todos los artículos',
  alsoOn: 'También publicado en',
  references: 'Referencias',
  by: 'Por',
  updated: 'Actualizado',
  empty: 'Aún no hay artículos.',
  relatedTitle: 'Artículos relacionados',
  status: { published: 'Publicado', archived: 'Archivado' },
};

const fr: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Produit',
    developers: 'Développeurs',
    resources: 'Ressources',
    docs: 'Docs',
    menu: 'Menu',
    productTour: 'Visite du produit',
    platform: 'Aperçu de la plateforme',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Pourquoi ObjectOS',
    dataModeling: 'Modélisation des données',
    appInterfaces: 'Interfaces applicatives',
    analytics: 'Analytique et rapports',
    automation: 'Automatisation des processus',
    approvals: 'Approbations',
    permissionsSecurity: 'Permissions et sécurité',
    groupEvaluate: 'Évaluer',
    groupCapabilities: 'Capacités',
    trustCenter: 'Centre de confiance',
    toolsMcp: 'Outils et MCP',
    agentGuide: 'Guide agent',
    templates: 'Modèles',
    referenceStories: 'Cas de référence',
  },
  getStarted: 'Commencer',
  skipToContent: 'Aller au contenu',
  footer: { terms: 'Conditions et licence', privacy: 'Confidentialité', pricing: 'Tarifs', refunds: 'Remboursements' },
  all: 'Accueil',
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'article' : 'articles'} sur la construction de logiciels AI-native.`,
  backToList: 'Tous les articles',
  alsoOn: 'Également publié sur',
  references: 'Références',
  by: 'Par',
  updated: 'Mis à jour',
  empty: 'Aucun article pour le moment.',
  relatedTitle: 'Articles liés',
  status: { published: 'Publié', archived: 'Archivé' },
};

const ko: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: '제품',
    developers: '개발자',
    resources: '리소스',
    docs: '문서',
    menu: '메뉴',
    productTour: '제품 둘러보기',
    platform: '플랫폼 개요',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'ObjectOS를 선택하는 이유',
    dataModeling: '데이터 모델링',
    appInterfaces: '앱 화면',
    analytics: '분석과 리포트',
    automation: '프로세스 자동화',
    approvals: '승인',
    permissionsSecurity: '권한과 보안',
    groupEvaluate: '평가',
    groupCapabilities: '기능',
    trustCenter: '트러스트 센터',
    toolsMcp: '도구 및 MCP',
    agentGuide: '에이전트 가이드',
    templates: '템플릿',
    referenceStories: '레퍼런스 사례',
  },
  getStarted: '시작하기',
  skipToContent: '본문으로 건너뛰기',
  footer: { terms: '약관 및 라이선스', privacy: '개인정보 보호', pricing: '가격', refunds: '환불' },
  all: '홈',
  audience: '대상',
  articlesTitle: '글',
  articlesLead: (n) => `AI-native 소프트웨어 구축에 관한 글 ${n}개.`,
  backToList: '전체 글',
  alsoOn: '동시 게시',
  references: '참고 링크',
  by: '작성자',
  updated: '업데이트',
  empty: '아직 글이 없습니다.',
  relatedTitle: '관련 글',
  status: { published: '게시됨', archived: '보관됨' },
};

// Traditional UI is auto-derived from Simplified (s2twp) — never hand-kept.
const toHant = (s: Strings): Strings => ({
  siteName: s2t(s.siteName),
  siteNav: {
    product: s2t(s.siteNav.product),
    developers: s2t(s.siteNav.developers),
    resources: s2t(s.siteNav.resources),
    docs: s2t(s.siteNav.docs),
    menu: s2t(s.siteNav.menu),
    productTour: s2t(s.siteNav.productTour),
    platform: s2t(s.siteNav.platform),
    aiBuildAsk: s2t(s.siteNav.aiBuildAsk),
    whyObjectOs: s2t(s.siteNav.whyObjectOs),
    dataModeling: s2t(s.siteNav.dataModeling),
    appInterfaces: s2t(s.siteNav.appInterfaces),
    analytics: s2t(s.siteNav.analytics),
    automation: s2t(s.siteNav.automation),
    approvals: s2t(s.siteNav.approvals),
    permissionsSecurity: s2t(s.siteNav.permissionsSecurity),
    groupEvaluate: s2t(s.siteNav.groupEvaluate),
    groupCapabilities: s2t(s.siteNav.groupCapabilities),
    trustCenter: s2t(s.siteNav.trustCenter),
    toolsMcp: s2t(s.siteNav.toolsMcp),
    agentGuide: s2t(s.siteNav.agentGuide),
    templates: s2t(s.siteNav.templates),
    referenceStories: s2t(s.siteNav.referenceStories),
  },
  getStarted: s2t(s.getStarted),
  skipToContent: s2t(s.skipToContent),
  footer: {
    terms: s2t(s.footer.terms),
    privacy: s2t(s.footer.privacy),
    pricing: s2t(s.footer.pricing),
    refunds: s2t(s.footer.refunds),
  },
  all: s2t(s.all),
  audience: s2t(s.audience),
  articlesTitle: s2t(s.articlesTitle),
  articlesLead: (n) => s2t(s.articlesLead(n)),
  backToList: s2t(s.backToList),
  alsoOn: s2t(s.alsoOn),
  references: s2t(s.references),
  by: s2t(s.by),
  updated: s2t(s.updated),
  empty: s2t(s.empty),
  relatedTitle: s2t(s.relatedTitle),
  status: {
    published: s2t(s.status.published),
    archived: s2t(s.status.archived),
  },
});

export const ui: Record<Locale, Strings> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': toHant(zhHans),
  ja,
  de,
  es,
  fr,
  ko,
};

export const STATUS_COLOR: Record<StatusKey, string> = {
  published: '#059669',
  archived: '#78716c',
};
