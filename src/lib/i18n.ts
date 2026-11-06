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

/**
 * `og:locale` value. Open Graph takes `language_TERRITORY` (Facebook's locale
 * list), not a BCP-47 tag: `en` and `zh_Hans` are not values it knows, and a
 * consumer that does not recognize the value falls back to `en_US` for every
 * page. Script subtags map to the territory each script is read in.
 */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
  ja: 'ja_JP',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  ko: 'ko_KR',
};

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

// The statuses a status pill labels. A production build renders only
// `published` posts (src/lib/posts.ts), so a pill reading "Published" told a
// reader nothing; only a post that would not ship gets a pill, in `astro dev`
// or a CONTENT_INCLUDE_ARCHIVED build.
type StatusKey = 'archived';

interface Strings {
  siteName: string;
  siteNav: {
    product: string;
    developers: string;
    resources: string;
    /** docs.objectos.ai — the product documentation. */
    productDocs: string;
    /** objectstack.ai — the developer site: the open protocol, SDK, CLI and docs. */
    developerDocs: string;
    menu: string;
    productTour: string;
    platform: string;
    aiBuildAsk: string;
    /**
     * The "Why ObjectOS" top-level group (its trigger in the bar and the drawer,
     * and the footer column of the same name). Its entries are `compareFit`,
     * `security`, `referenceStories`, `useCases` and `aiAdoption`.
     */
    whyObjectOs: string;
    /** /[lang]/compare/ — the first entry under Why ObjectOS, and its footer link. */
    compareFit: string;
    /** The positioning pillar, /[lang]/ontology/ — first entry under Product → Evaluate. */
    ontology: string;
    dataModeling: string;
    appInterfaces: string;
    analytics: string;
    automation: string;
    approvals: string;
    permissionsSecurity: string;
    groupEvaluate: string;
    groupCapabilities: string;
    /**
     * /[lang]/security/, the trust hub: the one menu entry for trust, under
     * Why ObjectOS, and the footer's link to the same page.
     */
    security: string;
    /**
     * /[lang]/trust-center/. It has no menu entry of its own (it is a
     * sub-section linked from `security`); the footer still names it.
     */
    trustCenter: string;
    /**
     * The five Capabilities entries. Each names an existing capability page and
     * stands for the pages folded under it: `capDataApps` opens data modeling
     * (app interfaces folds under it), `capAutomationApprovals` opens process
     * automation (approvals folds under it), `capAnalytics` opens analytics;
     * `aiBuildAsk` and `toolsMcp` keep their page labels, and permissions sits
     * under `security`. A folded page keeps its own label (`appInterfaces`,
     * `approvals`, `permissionsSecurity`) for the footer and its parent page.
     */
    capDataApps: string;
    capAutomationApprovals: string;
    capAnalytics: string;
    toolsMcp: string;
    /** The Developers entry for /[lang]/agent-developer/ (and its footer link). */
    startWithAgent: string;
    templates: string;
    referenceStories: string;
    /** /[lang]/use-cases/ — the fourth entry under Why ObjectOS, and its footer link. */
    useCases: string;
    /** /[lang]/enterprise-ai-adoption/ — the fifth entry under Why ObjectOS, and its footer link. */
    aiAdoption: string;
    glossary: string;
    /** Accessible name of the mobile drawer's close button. */
    close: string;
    /** Visible label of the drawer's theme button. */
    theme: string;
    /** Accessible name and tooltip of the theme toggle. */
    toggleTheme: string;
    /** Prefix of the language switcher's name, punctuation included: "Language: English". */
    languagePrefix: string;
    /** Accessible names of the header's navigation landmarks. */
    primaryNav: string;
    browseNav: string;
    mobileNav: string;
    /** Accessible name of the footer's navigation landmark (its four columns). */
    footerNav: string;
    /**
     * Accessible name of the footer's Company & Legal row (Privacy, Terms,
     * Refunds, llms.txt, RSS and GitHub), beside the brand line.
     */
    companyLegal: string;
    /** /[lang]/blog/ — the first entry under Resources, and its footer link. */
    blog: string;
    /** The YouTube channel — an external entry under Resources, and its footer link. */
    videos: string;
    /**
     * Label over the five pillar guides: the second column of the Resources
     * panel, the drawer's sub-label and the footer's sub-label. It is a label,
     * not a link — the guides have no index page.
     */
    guides: string;
    /**
     * Accessible name of the home page's own guides strip. It is not `guides`:
     * two navigation landmarks with one name cannot be told apart (axe
     * `landmark-unique`), and the footer is on the home page too.
     */
    featuredGuides: string;
    /** /[lang]/forward-deployed-engineers/ — footer only, under Why ObjectOS. */
    forFde: string;
    /**
     * Name and tooltip of a language-switcher option for a locale this article
     * has no translation in; the option opens that locale's blog instead. It
     * starts with the language's own name, which is the option's visible text.
     */
    langUnavailable: (lang: string) => string;
  };
  getStarted: string;
  /**
   * The link to /contact/ (`CONTACT_URL`, #397): the footer's Why ObjectOS
   * entry and the second button of the home page's closing CTA.
   */
  contactUs: string;
  /** The ObjectOS Cloud sign-in link in the header, drawer and footer. */
  signIn: string;
  skipToContent: string;
  /** The footer reuses every `siteNav` label (Platform overview included) for its links. */
  footer: { terms: string; privacy: string; pricing: string; refunds: string };
  /** The 404 page (`src/pages/404.astro`, `src/pages/[lang]/404.astro`). */
  notFound: {
    title: string;
    heading: string;
    lead: string;
    home: string;
    blog: string;
    pricing: string;
  };
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
    productDocs: 'Product docs',
    developerDocs: 'Developer docs & protocol',
    menu: 'Menu',
    productTour: 'Product tour',
    platform: 'Platform overview',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Why ObjectOS',
    compareFit: 'Comparison & fit',
    ontology: 'Ontology',
    dataModeling: 'Data modeling',
    appInterfaces: 'App interfaces',
    analytics: 'Analytics & reporting',
    automation: 'Process automation',
    approvals: 'Approvals',
    permissionsSecurity: 'Permissions & security',
    groupEvaluate: 'Evaluate',
    groupCapabilities: 'Capabilities',
    security: 'Security & trust',
    trustCenter: 'Trust center',
    capDataApps: 'Data & apps',
    capAutomationApprovals: 'Automation & approvals',
    capAnalytics: 'Analytics',
    toolsMcp: 'Tools & MCP',
    startWithAgent: 'Start with your agent',
    templates: 'Templates',
    referenceStories: 'Reference stories',
    useCases: 'Use cases',
    aiAdoption: 'AI adoption',
    glossary: 'Glossary',
    close: 'Close',
    theme: 'Theme',
    toggleTheme: 'Toggle dark mode',
    languagePrefix: 'Language: ',
    primaryNav: 'Primary',
    browseNav: 'Browse',
    mobileNav: 'Mobile',
    footerNav: 'Footer',
    companyLegal: 'Company & Legal',
    blog: 'Blog',
    videos: 'Videos',
    guides: 'Guides',
    featuredGuides: 'Featured guides',
    forFde: 'For FDE teams',
    langUnavailable: (lang) => `${lang} — this article is not available in this language; opens the blog`,
  },
  getStarted: 'Get started',
  contactUs: 'Contact us',
  signIn: 'Sign in',
  skipToContent: 'Skip to content',
  footer: { terms: 'Terms & License', privacy: 'Privacy', pricing: 'Pricing', refunds: 'Refunds' },
  notFound: {
    title: 'Page not found',
    heading: 'This page does not exist.',
    lead: 'The link may be out of date, or the page may have moved. Start from one of these instead.',
    home: 'Home',
    blog: 'Blog',
    pricing: 'Pricing',
  },
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'article' : 'articles'} on executable business ontologies, runtime governance, and agent-operated applications.`,
  backToList: 'All articles',
  alsoOn: 'Also published on',
  references: 'References',
  by: 'By',
  updated: 'Updated',
  empty: 'No articles yet.',
  relatedTitle: 'Related articles',
  status: { archived: 'Archived' },
};

const zhHans: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: '产品',
    developers: '开发者',
    resources: '资源',
    productDocs: '产品文档',
    developerDocs: '开发者文档与协议',
    menu: '菜单',
    productTour: '产品导览',
    platform: '平台总览',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: '为什么选 ObjectOS',
    compareFit: '对比与适用边界',
    ontology: '本体',
    dataModeling: '数据建模',
    appInterfaces: '应用界面',
    analytics: '报表与分析',
    automation: '流程自动化',
    approvals: '审批',
    permissionsSecurity: '权限与安全',
    groupEvaluate: '评估',
    groupCapabilities: '平台能力',
    security: '安全与信任',
    trustCenter: '信任中心',
    capDataApps: '数据与应用',
    capAutomationApprovals: '自动化与审批',
    capAnalytics: '报表与分析',
    toolsMcp: '工具与 MCP',
    startWithAgent: '从你的 Agent 开始',
    templates: '模板',
    referenceStories: '参考案例',
    useCases: '使用场景',
    aiAdoption: '企业 AI 落地',
    glossary: '术语表',
    close: '关闭',
    theme: '主题',
    toggleTheme: '切换深色模式',
    languagePrefix: '语言：',
    primaryNav: '主导航',
    browseNav: '浏览',
    mobileNav: '移动端导航',
    footerNav: '页脚',
    companyLegal: '公司与法律',
    blog: '博客',
    videos: '视频',
    guides: '专题指南',
    featuredGuides: '精选专题',
    forFde: '面向驻场工程（FDE）团队',
    langUnavailable: (lang) => `${lang}——本文暂无该语言版本，将打开该语言的博客`,
  },
  getStarted: '开始使用',
  contactUs: '联系我们',
  signIn: '登录',
  skipToContent: '跳到正文',
  footer: { terms: '条款与许可', privacy: '隐私政策', pricing: '定价', refunds: '退款政策' },
  notFound: {
    title: '页面不存在',
    heading: '这个页面不存在。',
    lead: '链接可能已经过期，或者页面已经移动。可以从下面这些页面重新开始。',
    home: '首页',
    blog: '博客',
    pricing: '定价',
  },
  audience: '受众',
  articlesTitle: '文章',
  articlesLead: (n) => `${n} 篇关于可执行业务本体、运行时治理与 Agent 操作应用的文章。`,
  backToList: '全部文章',
  alsoOn: '同步发布于',
  references: '参考链接',
  by: '作者',
  updated: '更新于',
  empty: '还没有文章。',
  relatedTitle: '相关文章',
  status: { archived: '已归档' },
};

const ja: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: '製品',
    developers: '開発者',
    resources: 'リソース',
    productDocs: '製品ドキュメント',
    developerDocs: '開発者ドキュメントとプロトコル',
    menu: 'メニュー',
    productTour: 'プロダクトツアー',
    platform: 'プラットフォーム概要',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'ObjectOS を選ぶ理由',
    compareFit: '比較と適合性',
    ontology: 'オントロジー',
    dataModeling: 'データモデリング',
    appInterfaces: 'アプリ画面',
    analytics: 'レポートと分析',
    automation: 'プロセス自動化',
    approvals: '承認',
    permissionsSecurity: '権限とセキュリティ',
    groupEvaluate: '検討',
    groupCapabilities: '機能',
    security: 'セキュリティと信頼',
    trustCenter: 'トラストセンター',
    capDataApps: 'データとアプリ',
    capAutomationApprovals: '自動化と承認',
    capAnalytics: 'レポートと分析',
    toolsMcp: 'ツールと MCP',
    startWithAgent: 'エージェントから始める',
    templates: 'テンプレート',
    referenceStories: '導入事例',
    useCases: 'ユースケース',
    aiAdoption: 'AI の導入',
    glossary: '用語集',
    close: '閉じる',
    theme: 'テーマ',
    toggleTheme: 'ダークモードを切り替え',
    languagePrefix: '言語：',
    primaryNav: 'メインナビゲーション',
    browseNav: 'ブラウズ',
    mobileNav: 'モバイルナビゲーション',
    footerNav: 'フッター',
    companyLegal: '会社と法務',
    blog: 'ブログ',
    videos: '動画',
    guides: 'ガイド',
    featuredGuides: '注目のガイド',
    forFde: 'FDE チーム向け',
    langUnavailable: (lang) => `${lang} — この記事にはこの言語の版がありません。ブログ一覧を開きます`,
  },
  getStarted: 'はじめる',
  contactUs: 'お問い合わせ',
  signIn: 'ログイン',
  skipToContent: '本文へ移動',
  footer: { terms: '利用規約・ライセンス', privacy: 'プライバシー', pricing: '料金', refunds: '返金' },
  notFound: {
    title: 'ページが見つかりません',
    heading: 'このページは存在しません。',
    lead: 'リンクが古いか、ページが移動した可能性があります。以下のページからお探しください。',
    home: 'ホーム',
    blog: 'ブログ',
    pricing: '料金',
  },
  audience: '読者',
  articlesTitle: '記事',
  articlesLead: (n) => `実行可能なビジネスオントロジー、ランタイムガバナンス、エージェントが操作するアプリケーションに関する ${n} 本の記事。`,
  backToList: 'すべての記事',
  alsoOn: '同時掲載',
  references: '参考リンク',
  by: '著者',
  updated: '更新日',
  empty: '記事はまだありません。',
  relatedTitle: '関連記事',
  status: { archived: 'アーカイブ済み' },
};

const de: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Produkt',
    developers: 'Entwickler',
    resources: 'Ressourcen',
    productDocs: 'Produktdokumentation',
    developerDocs: 'Entwicklerdokumentation & Protokoll',
    menu: 'Menü',
    productTour: 'Produkt-Tour',
    platform: 'Plattform-Überblick',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Warum ObjectOS',
    compareFit: 'Vergleich & Eignung',
    ontology: 'Ontologie',
    dataModeling: 'Datenmodellierung',
    appInterfaces: 'App-Oberflächen',
    analytics: 'Analysen & Berichte',
    automation: 'Prozessautomatisierung',
    approvals: 'Freigaben',
    permissionsSecurity: 'Berechtigungen & Sicherheit',
    groupEvaluate: 'Evaluieren',
    groupCapabilities: 'Funktionen',
    security: 'Sicherheit & Vertrauen',
    trustCenter: 'Trust Center',
    capDataApps: 'Daten & Apps',
    capAutomationApprovals: 'Automatisierung & Freigaben',
    capAnalytics: 'Analysen',
    toolsMcp: 'Tools & MCP',
    startWithAgent: 'Mit Ihrem Agent starten',
    templates: 'Vorlagen',
    referenceStories: 'Referenzberichte',
    useCases: 'Anwendungsfälle',
    aiAdoption: 'AI-Einführung',
    glossary: 'Glossar',
    close: 'Schließen',
    theme: 'Darstellung',
    toggleTheme: 'Dunkelmodus umschalten',
    languagePrefix: 'Sprache: ',
    primaryNav: 'Hauptnavigation',
    browseNav: 'Durchstöbern',
    mobileNav: 'Mobile Navigation',
    footerNav: 'Fußzeile',
    companyLegal: 'Unternehmen & Rechtliches',
    blog: 'Blog',
    videos: 'Videos',
    guides: 'Leitfäden',
    featuredGuides: 'Ausgewählte Leitfäden',
    forFde: 'Für FDE-Teams',
    langUnavailable: (lang) => `${lang} – dieser Artikel ist in dieser Sprache nicht verfügbar; öffnet den Blog`,
  },
  getStarted: 'Loslegen',
  contactUs: 'Kontakt',
  signIn: 'Anmelden',
  skipToContent: 'Zum Inhalt springen',
  footer: { terms: 'Bedingungen & Lizenz', privacy: 'Datenschutz', pricing: 'Preise', refunds: 'Rückerstattung' },
  notFound: {
    title: 'Seite nicht gefunden',
    heading: 'Diese Seite gibt es nicht.',
    lead: 'Der Link ist vielleicht veraltet, oder die Seite ist umgezogen. Starten Sie stattdessen hier.',
    home: 'Startseite',
    blog: 'Blog',
    pricing: 'Preise',
  },
  audience: 'Zielgruppe',
  articlesTitle: 'Artikel',
  articlesLead: (n) => `${n} ${n === 1 ? 'Artikel' : 'Artikel'} über ausführbare Geschäftsontologien, Runtime-Governance und von Agents bediente Anwendungen.`,
  backToList: 'Alle Artikel',
  alsoOn: 'Auch veröffentlicht auf',
  references: 'Referenzen',
  by: 'Von',
  updated: 'Aktualisiert',
  empty: 'Noch keine Artikel.',
  relatedTitle: 'Ähnliche Artikel',
  status: { archived: 'Archiviert' },
};

const es: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Producto',
    developers: 'Desarrolladores',
    resources: 'Recursos',
    productDocs: 'Documentación del producto',
    developerDocs: 'Documentación para desarrolladores y protocolo',
    menu: 'Menú',
    productTour: 'Recorrido del producto',
    platform: 'Resumen de plataforma',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Por qué ObjectOS',
    compareFit: 'Comparativa y encaje',
    ontology: 'Ontología',
    dataModeling: 'Modelado de datos',
    appInterfaces: 'Interfaces de la app',
    analytics: 'Analítica e informes',
    automation: 'Automatización de procesos',
    approvals: 'Aprobaciones',
    permissionsSecurity: 'Permisos y seguridad',
    groupEvaluate: 'Evaluar',
    groupCapabilities: 'Capacidades',
    security: 'Seguridad y confianza',
    trustCenter: 'Centro de confianza',
    capDataApps: 'Datos y apps',
    capAutomationApprovals: 'Automatización y aprobaciones',
    capAnalytics: 'Analítica',
    toolsMcp: 'Herramientas y MCP',
    startWithAgent: 'Empieza con tu agente',
    templates: 'Plantillas',
    referenceStories: 'Casos de referencia',
    useCases: 'Casos de uso',
    aiAdoption: 'Adopción de AI',
    glossary: 'Glosario',
    close: 'Cerrar',
    theme: 'Tema',
    toggleTheme: 'Cambiar modo oscuro',
    languagePrefix: 'Idioma: ',
    primaryNav: 'Navegación principal',
    browseNav: 'Explorar',
    mobileNav: 'Navegación móvil',
    footerNav: 'Pie de página',
    companyLegal: 'Empresa y legal',
    blog: 'Blog',
    videos: 'Vídeos',
    guides: 'Guías',
    featuredGuides: 'Guías destacadas',
    forFde: 'Para equipos FDE',
    langUnavailable: (lang) => `${lang}: este artículo no está disponible en este idioma; abre el blog`,
  },
  getStarted: 'Empezar',
  contactUs: 'Contáctanos',
  signIn: 'Iniciar sesión',
  skipToContent: 'Saltar al contenido',
  footer: { terms: 'Términos y licencia', privacy: 'Privacidad', pricing: 'Precios', refunds: 'Reembolsos' },
  notFound: {
    title: 'Página no encontrada',
    heading: 'Esta página no existe.',
    lead: 'Puede que el enlace esté desactualizado o que la página se haya movido. Empieza desde una de estas.',
    home: 'Inicio',
    blog: 'Blog',
    pricing: 'Precios',
  },
  audience: 'Audiencia',
  articlesTitle: 'Artículos',
  articlesLead: (n) => `${n} ${n === 1 ? 'artículo' : 'artículos'} sobre ontologías de negocio ejecutables, gobernanza del runtime y aplicaciones operadas por agentes.`,
  backToList: 'Todos los artículos',
  alsoOn: 'También publicado en',
  references: 'Referencias',
  by: 'Por',
  updated: 'Actualizado',
  empty: 'Aún no hay artículos.',
  relatedTitle: 'Artículos relacionados',
  status: { archived: 'Archivado' },
};

const fr: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: 'Produit',
    developers: 'Développeurs',
    resources: 'Ressources',
    productDocs: 'Documentation produit',
    developerDocs: 'Documentation développeur et protocole',
    menu: 'Menu',
    productTour: 'Visite du produit',
    platform: 'Aperçu de la plateforme',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'Pourquoi ObjectOS',
    compareFit: 'Comparatif et adéquation',
    ontology: 'Ontologie',
    dataModeling: 'Modélisation des données',
    appInterfaces: 'Interfaces applicatives',
    analytics: 'Analytique et rapports',
    automation: 'Automatisation des processus',
    approvals: 'Approbations',
    permissionsSecurity: 'Permissions et sécurité',
    groupEvaluate: 'Évaluer',
    groupCapabilities: 'Capacités',
    security: 'Sécurité et confiance',
    trustCenter: 'Centre de confiance',
    capDataApps: 'Données et apps',
    capAutomationApprovals: 'Automatisation et approbations',
    capAnalytics: 'Analytique',
    toolsMcp: 'Outils et MCP',
    startWithAgent: 'Commencez avec votre agent',
    templates: 'Modèles',
    referenceStories: 'Cas de référence',
    useCases: 'Cas d’usage',
    aiAdoption: 'Adoption de l’AI',
    glossary: 'Glossaire',
    close: 'Fermer',
    theme: 'Thème',
    toggleTheme: 'Basculer le mode sombre',
    languagePrefix: 'Langue : ',
    primaryNav: 'Navigation principale',
    browseNav: 'Parcourir',
    mobileNav: 'Navigation mobile',
    footerNav: 'Pied de page',
    companyLegal: 'Entreprise et mentions légales',
    blog: 'Blog',
    videos: 'Vidéos',
    guides: 'Guides',
    featuredGuides: 'Guides à la une',
    forFde: 'Pour les équipes FDE',
    langUnavailable: (lang) => `${lang} : cet article n’est pas disponible dans cette langue ; ouvre le blog`,
  },
  getStarted: 'Commencer',
  contactUs: 'Nous contacter',
  signIn: 'Se connecter',
  skipToContent: 'Aller au contenu',
  footer: { terms: 'Conditions et licence', privacy: 'Confidentialité', pricing: 'Tarifs', refunds: 'Remboursements' },
  notFound: {
    title: 'Page introuvable',
    heading: 'Cette page n’existe pas.',
    lead: 'Le lien est peut-être obsolète, ou la page a été déplacée. Repartez plutôt de l’une de celles-ci.',
    home: 'Accueil',
    blog: 'Blog',
    pricing: 'Tarifs',
  },
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'article' : 'articles'} sur les ontologies métier exécutables, la gouvernance du runtime et les applications opérées par les agents.`,
  backToList: 'Tous les articles',
  alsoOn: 'Également publié sur',
  references: 'Références',
  by: 'Par',
  updated: 'Mis à jour',
  empty: 'Aucun article pour le moment.',
  relatedTitle: 'Articles liés',
  status: { archived: 'Archivé' },
};

const ko: Strings = {
  siteName: 'ObjectOS',
  siteNav: {
    product: '제품',
    developers: '개발자',
    resources: '리소스',
    productDocs: '제품 문서',
    developerDocs: '개발자 문서 및 프로토콜',
    menu: '메뉴',
    productTour: '제품 둘러보기',
    platform: '플랫폼 개요',
    aiBuildAsk: 'AI Build & Ask',
    whyObjectOs: 'ObjectOS를 선택하는 이유',
    compareFit: '비교와 적합성',
    ontology: '온톨로지',
    dataModeling: '데이터 모델링',
    appInterfaces: '앱 화면',
    analytics: '분석과 리포트',
    automation: '프로세스 자동화',
    approvals: '승인',
    permissionsSecurity: '권한과 보안',
    groupEvaluate: '평가',
    groupCapabilities: '기능',
    security: '보안과 신뢰',
    trustCenter: '트러스트 센터',
    capDataApps: '데이터와 앱',
    capAutomationApprovals: '자동화와 승인',
    capAnalytics: '분석',
    toolsMcp: '도구 및 MCP',
    startWithAgent: '에이전트로 시작하기',
    templates: '템플릿',
    referenceStories: '레퍼런스 사례',
    useCases: '활용 사례',
    aiAdoption: 'AI 도입',
    glossary: '용어집',
    close: '닫기',
    theme: '테마',
    toggleTheme: '다크 모드 전환',
    languagePrefix: '언어: ',
    primaryNav: '주 메뉴',
    browseNav: '둘러보기',
    mobileNav: '모바일 메뉴',
    footerNav: '바닥글',
    companyLegal: '회사 및 법적 고지',
    blog: '블로그',
    videos: '동영상',
    guides: '가이드',
    featuredGuides: '추천 가이드',
    forFde: 'FDE 팀용',
    langUnavailable: (lang) => `${lang} — 이 글은 이 언어로 제공되지 않습니다. 블로그 목록으로 이동합니다`,
  },
  getStarted: '시작하기',
  contactUs: '문의하기',
  signIn: '로그인',
  skipToContent: '본문으로 건너뛰기',
  footer: { terms: '약관 및 라이선스', privacy: '개인정보 보호', pricing: '가격', refunds: '환불' },
  notFound: {
    title: '페이지를 찾을 수 없습니다',
    heading: '이 페이지는 존재하지 않습니다.',
    lead: '링크가 오래되었거나 페이지가 이동했을 수 있습니다. 아래 페이지에서 다시 시작해 보세요.',
    home: '홈',
    blog: '블로그',
    pricing: '가격',
  },
  audience: '대상',
  articlesTitle: '글',
  articlesLead: (n) => `실행 가능한 비즈니스 온톨로지, 런타임 거버넌스, 에이전트가 운영하는 애플리케이션에 관한 글 ${n}개.`,
  backToList: '전체 글',
  alsoOn: '동시 게시',
  references: '참고 링크',
  by: '작성자',
  updated: '업데이트',
  empty: '아직 글이 없습니다.',
  relatedTitle: '관련 글',
  status: { archived: '보관됨' },
};

// Traditional UI is auto-derived from Simplified (s2twp) — never hand-kept.
const toHant = (s: Strings): Strings => ({
  siteName: s2t(s.siteName),
  siteNav: {
    product: s2t(s.siteNav.product),
    developers: s2t(s.siteNav.developers),
    resources: s2t(s.siteNav.resources),
    productDocs: s2t(s.siteNav.productDocs),
    developerDocs: s2t(s.siteNav.developerDocs),
    menu: s2t(s.siteNav.menu),
    productTour: s2t(s.siteNav.productTour),
    platform: s2t(s.siteNav.platform),
    aiBuildAsk: s2t(s.siteNav.aiBuildAsk),
    whyObjectOs: s2t(s.siteNav.whyObjectOs),
    compareFit: s2t(s.siteNav.compareFit),
    ontology: s2t(s.siteNav.ontology),
    dataModeling: s2t(s.siteNav.dataModeling),
    appInterfaces: s2t(s.siteNav.appInterfaces),
    analytics: s2t(s.siteNav.analytics),
    automation: s2t(s.siteNav.automation),
    approvals: s2t(s.siteNav.approvals),
    permissionsSecurity: s2t(s.siteNav.permissionsSecurity),
    groupEvaluate: s2t(s.siteNav.groupEvaluate),
    groupCapabilities: s2t(s.siteNav.groupCapabilities),
    security: s2t(s.siteNav.security),
    trustCenter: s2t(s.siteNav.trustCenter),
    capDataApps: s2t(s.siteNav.capDataApps),
    capAutomationApprovals: s2t(s.siteNav.capAutomationApprovals),
    capAnalytics: s2t(s.siteNav.capAnalytics),
    toolsMcp: s2t(s.siteNav.toolsMcp),
    startWithAgent: s2t(s.siteNav.startWithAgent),
    templates: s2t(s.siteNav.templates),
    referenceStories: s2t(s.siteNav.referenceStories),
    useCases: s2t(s.siteNav.useCases),
    aiAdoption: s2t(s.siteNav.aiAdoption),
    glossary: s2t(s.siteNav.glossary),
    close: s2t(s.siteNav.close),
    theme: s2t(s.siteNav.theme),
    toggleTheme: s2t(s.siteNav.toggleTheme),
    languagePrefix: s2t(s.siteNav.languagePrefix),
    primaryNav: s2t(s.siteNav.primaryNav),
    browseNav: s2t(s.siteNav.browseNav),
    mobileNav: s2t(s.siteNav.mobileNav),
    footerNav: s2t(s.siteNav.footerNav),
    companyLegal: s2t(s.siteNav.companyLegal),
    blog: s2t(s.siteNav.blog),
    videos: s2t(s.siteNav.videos),
    guides: s2t(s.siteNav.guides),
    featuredGuides: s2t(s.siteNav.featuredGuides),
    forFde: s2t(s.siteNav.forFde),
    // The language name is spliced in after conversion: s2t would rewrite a
    // Simplified-script name such as 简体中文.
    langUnavailable: (lang) => s2t(s.siteNav.langUnavailable('{lang}')).replace('{lang}', lang),
  },
  getStarted: s2t(s.getStarted),
  contactUs: s2t(s.contactUs),
  signIn: s2t(s.signIn),
  skipToContent: s2t(s.skipToContent),
  footer: {
    terms: s2t(s.footer.terms),
    privacy: s2t(s.footer.privacy),
    pricing: s2t(s.footer.pricing),
    refunds: s2t(s.footer.refunds),
  },
  notFound: {
    title: s2t(s.notFound.title),
    heading: s2t(s.notFound.heading),
    lead: s2t(s.notFound.lead),
    home: s2t(s.notFound.home),
    blog: s2t(s.notFound.blog),
    pricing: s2t(s.notFound.pricing),
  },
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
  status: { archived: s2t(s.status.archived) },
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

// Theme tokens, not hex: the pill sits on a tint of --surface in both themes,
// so one colour cannot clear 4.5:1 in light and dark. Values and ratios live
// with the tokens in src/layouts/Base.astro.
export const STATUS_COLOR: Record<StatusKey, string> = {
  archived: 'var(--status-archived)',
};
