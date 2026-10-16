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
    trustCenter: string;
    toolsMcp: string;
    agentGuide: string;
    templates: string;
    referenceStories: string;
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
    /** Accessible name of the home page's topic-cluster links. */
    topicClusters: string;
  };
  getStarted: string;
  skipToContent: string;
  /**
   * `platform` is the footer's short label; the header uses the longer
   * `siteNav.platform`. Every other footer link reuses its `siteNav` label.
   */
  footer: { terms: string; privacy: string; pricing: string; refunds: string; platform: string };
  /** The 404 page (`src/pages/404.astro`, `src/pages/[lang]/404.astro`). */
  notFound: {
    title: string;
    heading: string;
    lead: string;
    home: string;
    blog: string;
    pricing: string;
  };
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
    ontology: 'Ontology',
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
    glossary: 'Glossary',
    close: 'Close',
    theme: 'Theme',
    toggleTheme: 'Toggle dark mode',
    languagePrefix: 'Language: ',
    primaryNav: 'Primary',
    browseNav: 'Browse',
    mobileNav: 'Mobile',
    topicClusters: 'Topic clusters',
  },
  getStarted: 'Get started',
  skipToContent: 'Skip to content',
  footer: { terms: 'Terms & License', privacy: 'Privacy', pricing: 'Pricing', refunds: 'Refunds', platform: 'Platform' },
  notFound: {
    title: 'Page not found',
    heading: 'This page does not exist.',
    lead: 'The link may be out of date, or the page may have moved. Start from one of these instead.',
    home: 'Home',
    blog: 'Blog',
    pricing: 'Pricing',
  },
  all: 'Home',
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
    ontology: '本体',
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
    glossary: '术语表',
    close: '关闭',
    theme: '主题',
    toggleTheme: '切换深色模式',
    languagePrefix: '语言：',
    primaryNav: '主导航',
    browseNav: '浏览',
    mobileNav: '移动端导航',
    topicClusters: '专题导航',
  },
  getStarted: '开始使用',
  skipToContent: '跳到正文',
  footer: { terms: '许可协议', privacy: '隐私政策', pricing: '定价', refunds: '退款政策', platform: '平台' },
  notFound: {
    title: '页面不存在',
    heading: '这个页面不存在。',
    lead: '链接可能已经过期，或者页面已经移动。可以从下面这些页面重新开始。',
    home: '首页',
    blog: '博客',
    pricing: '定价',
  },
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
    ontology: 'オントロジー',
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
    glossary: '用語集',
    close: '閉じる',
    theme: 'テーマ',
    toggleTheme: 'ダークモードを切り替え',
    languagePrefix: '言語：',
    primaryNav: 'メインナビゲーション',
    browseNav: 'ブラウズ',
    mobileNav: 'モバイルナビゲーション',
    topicClusters: 'トピッククラスター',
  },
  getStarted: 'はじめる',
  skipToContent: '本文へ移動',
  footer: { terms: '利用規約・ライセンス', privacy: 'プライバシー', pricing: '料金', refunds: '返金', platform: 'プラットフォーム' },
  notFound: {
    title: 'ページが見つかりません',
    heading: 'このページは存在しません。',
    lead: 'リンクが古いか、ページが移動した可能性があります。以下のページからお探しください。',
    home: 'ホーム',
    blog: 'ブログ',
    pricing: '料金',
  },
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
    ontology: 'Ontologie',
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
    glossary: 'Glossar',
    close: 'Schließen',
    theme: 'Darstellung',
    toggleTheme: 'Dunkelmodus umschalten',
    languagePrefix: 'Sprache: ',
    primaryNav: 'Hauptnavigation',
    browseNav: 'Durchstöbern',
    mobileNav: 'Mobile Navigation',
    topicClusters: 'Themencluster',
  },
  getStarted: 'Loslegen',
  skipToContent: 'Zum Inhalt springen',
  footer: { terms: 'Bedingungen & Lizenz', privacy: 'Datenschutz', pricing: 'Preise', refunds: 'Rückerstattung', platform: 'Plattform' },
  notFound: {
    title: 'Seite nicht gefunden',
    heading: 'Diese Seite gibt es nicht.',
    lead: 'Der Link ist vielleicht veraltet, oder die Seite ist umgezogen. Starten Sie stattdessen hier.',
    home: 'Startseite',
    blog: 'Blog',
    pricing: 'Preise',
  },
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
    ontology: 'Ontología',
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
    glossary: 'Glosario',
    close: 'Cerrar',
    theme: 'Tema',
    toggleTheme: 'Cambiar modo oscuro',
    languagePrefix: 'Idioma: ',
    primaryNav: 'Navegación principal',
    browseNav: 'Explorar',
    mobileNav: 'Navegación móvil',
    topicClusters: 'Grupos temáticos',
  },
  getStarted: 'Empezar',
  skipToContent: 'Saltar al contenido',
  footer: { terms: 'Términos y licencia', privacy: 'Privacidad', pricing: 'Precios', refunds: 'Reembolsos', platform: 'Plataforma' },
  notFound: {
    title: 'Página no encontrada',
    heading: 'Esta página no existe.',
    lead: 'Puede que el enlace esté desactualizado o que la página se haya movido. Empieza desde una de estas.',
    home: 'Inicio',
    blog: 'Blog',
    pricing: 'Precios',
  },
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
    ontology: 'Ontologie',
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
    glossary: 'Glossaire',
    close: 'Fermer',
    theme: 'Thème',
    toggleTheme: 'Basculer le mode sombre',
    languagePrefix: 'Langue : ',
    primaryNav: 'Navigation principale',
    browseNav: 'Parcourir',
    mobileNav: 'Navigation mobile',
    topicClusters: 'Groupes thématiques',
  },
  getStarted: 'Commencer',
  skipToContent: 'Aller au contenu',
  footer: { terms: 'Conditions et licence', privacy: 'Confidentialité', pricing: 'Tarifs', refunds: 'Remboursements', platform: 'Plateforme' },
  notFound: {
    title: 'Page introuvable',
    heading: 'Cette page n’existe pas.',
    lead: 'Le lien est peut-être obsolète, ou la page a été déplacée. Repartez plutôt de l’une de celles-ci.',
    home: 'Accueil',
    blog: 'Blog',
    pricing: 'Tarifs',
  },
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
    ontology: '온톨로지',
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
    glossary: '용어집',
    close: '닫기',
    theme: '테마',
    toggleTheme: '다크 모드 전환',
    languagePrefix: '언어: ',
    primaryNav: '주 메뉴',
    browseNav: '둘러보기',
    mobileNav: '모바일 메뉴',
    topicClusters: '주제 클러스터',
  },
  getStarted: '시작하기',
  skipToContent: '본문으로 건너뛰기',
  footer: { terms: '약관 및 라이선스', privacy: '개인정보 보호', pricing: '가격', refunds: '환불', platform: '플랫폼' },
  notFound: {
    title: '페이지를 찾을 수 없습니다',
    heading: '이 페이지는 존재하지 않습니다.',
    lead: '링크가 오래되었거나 페이지가 이동했을 수 있습니다. 아래 페이지에서 다시 시작해 보세요.',
    home: '홈',
    blog: '블로그',
    pricing: '가격',
  },
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
    ontology: s2t(s.siteNav.ontology),
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
    glossary: s2t(s.siteNav.glossary),
    close: s2t(s.siteNav.close),
    theme: s2t(s.siteNav.theme),
    toggleTheme: s2t(s.siteNav.toggleTheme),
    languagePrefix: s2t(s.siteNav.languagePrefix),
    primaryNav: s2t(s.siteNav.primaryNav),
    browseNav: s2t(s.siteNav.browseNav),
    mobileNav: s2t(s.siteNav.mobileNav),
    topicClusters: s2t(s.siteNav.topicClusters),
  },
  getStarted: s2t(s.getStarted),
  skipToContent: s2t(s.skipToContent),
  footer: {
    terms: s2t(s.footer.terms),
    privacy: s2t(s.footer.privacy),
    pricing: s2t(s.footer.pricing),
    refunds: s2t(s.footer.refunds),
    platform: s2t(s.footer.platform),
  },
  notFound: {
    title: s2t(s.notFound.title),
    heading: s2t(s.notFound.heading),
    lead: s2t(s.notFound.lead),
    home: s2t(s.notFound.home),
    blog: s2t(s.notFound.blog),
    pricing: s2t(s.notFound.pricing),
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

// Theme tokens, not hex: the pill sits on a tint of --surface in both themes,
// so one colour cannot clear 4.5:1 in light and dark. Values and ratios live
// with the tokens in src/layouts/Base.astro.
export const STATUS_COLOR: Record<StatusKey, string> = {
  published: 'var(--status-published)',
  archived: 'var(--status-archived)',
};
