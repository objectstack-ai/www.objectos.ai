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

/** Article URL: /<locale>/blog/<baseSlug>. */
export const postPath = (l: Locale, slug: string): string =>
  `/${l}/blog/${slug}/`;

/** BCP-47 lang attribute (the locale codes are already valid). */
export const htmlLang = (l: Locale): string => l;

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
  siteNav: { platform: string; ai: string; security: string; resources: string; docs: string };
  footer: { terms: string; privacy: string };
  all: string;
  audience: string;
  articlesTitle: string;
  articlesLead: (n: number) => string;
  backToList: string;
  alsoOn: string;
  references: string;
  by: string;
  empty: string;
  relatedTitle: string;
  status: Record<StatusKey, string>;
}

const en: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: 'Platform', ai: 'AI', security: 'Security', resources: 'Resources', docs: 'Docs' },
  footer: { terms: 'Terms & License', privacy: 'Privacy' },
  all: 'All',
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'piece' : 'pieces'} on building AI-native software.`,
  backToList: 'All articles',
  alsoOn: 'Also published on',
  references: 'References',
  by: 'By',
  empty: 'No articles yet.',
  relatedTitle: 'Related articles',
  status: { published: 'Published', archived: 'Archived' },
};

const zhHans: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: '平台', ai: 'AI', security: '安全', resources: '资源', docs: '文档' },
  footer: { terms: '许可协议', privacy: '隐私政策' },
  all: '全部',
  audience: '受众',
  articlesTitle: '文章',
  articlesLead: (n) => `${n} 篇关于构建 AI-native 软件的文章。`,
  backToList: '全部文章',
  alsoOn: '同步发布于',
  references: '参考链接',
  by: '作者',
  empty: '还没有文章。',
  relatedTitle: '相关文章',
  status: { published: '已发布', archived: '已归档' },
};

const ja: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: 'プラットフォーム', ai: 'AI', security: 'セキュリティ', resources: 'リソース', docs: 'ドキュメント' },
  footer: { terms: '利用規約・ライセンス', privacy: 'プライバシー' },
  all: 'すべて',
  audience: '読者',
  articlesTitle: '記事',
  articlesLead: (n) => `AI-native ソフトウェア構築に関する ${n} 本の記事。`,
  backToList: 'すべての記事',
  alsoOn: '同時掲載',
  references: '参考リンク',
  by: '著者',
  empty: '記事はまだありません。',
  relatedTitle: '関連記事',
  status: { published: '公開済み', archived: 'アーカイブ済み' },
};

const de: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: 'Plattform', ai: 'AI', security: 'Sicherheit', resources: 'Ressourcen', docs: 'Dokumentation' },
  footer: { terms: 'Bedingungen & Lizenz', privacy: 'Datenschutz' },
  all: 'Alle',
  audience: 'Zielgruppe',
  articlesTitle: 'Artikel',
  articlesLead: (n) => `${n} ${n === 1 ? 'Artikel' : 'Artikel'} über den Aufbau AI-nativer Software.`,
  backToList: 'Alle Artikel',
  alsoOn: 'Auch veröffentlicht auf',
  references: 'Referenzen',
  by: 'Von',
  empty: 'Noch keine Artikel.',
  relatedTitle: 'Ähnliche Artikel',
  status: { published: 'Veröffentlicht', archived: 'Archiviert' },
};

const es: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: 'Plataforma', ai: 'AI', security: 'Seguridad', resources: 'Recursos', docs: 'Documentación' },
  footer: { terms: 'Términos y licencia', privacy: 'Privacidad' },
  all: 'Todo',
  audience: 'Audiencia',
  articlesTitle: 'Artículos',
  articlesLead: (n) => `${n} ${n === 1 ? 'artículo' : 'artículos'} sobre crear software AI-native.`,
  backToList: 'Todos los artículos',
  alsoOn: 'También publicado en',
  references: 'Referencias',
  by: 'Por',
  empty: 'Aún no hay artículos.',
  relatedTitle: 'Artículos relacionados',
  status: { published: 'Publicado', archived: 'Archivado' },
};

const fr: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: 'Plateforme', ai: 'AI', security: 'Sécurité', resources: 'Ressources', docs: 'Documentation' },
  footer: { terms: 'Conditions et licence', privacy: 'Confidentialité' },
  all: 'Tous',
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'article' : 'articles'} sur la construction de logiciels AI-native.`,
  backToList: 'Tous les articles',
  alsoOn: 'Également publié sur',
  references: 'Références',
  by: 'Par',
  empty: 'Aucun article pour le moment.',
  relatedTitle: 'Articles liés',
  status: { published: 'Publié', archived: 'Archivé' },
};

const ko: Strings = {
  siteName: 'ObjectOS',
  siteNav: { platform: '플랫폼', ai: 'AI', security: '보안', resources: '리소스', docs: '문서' },
  footer: { terms: '약관 및 라이선스', privacy: '개인정보 보호' },
  all: '전체',
  audience: '대상',
  articlesTitle: '글',
  articlesLead: (n) => `AI-native 소프트웨어 구축에 관한 글 ${n}개.`,
  backToList: '전체 글',
  alsoOn: '동시 게시',
  references: '참고 링크',
  by: '작성자',
  empty: '아직 글이 없습니다.',
  relatedTitle: '관련 글',
  status: { published: '게시됨', archived: '보관됨' },
};

// Traditional UI is auto-derived from Simplified (s2twp) — never hand-kept.
const toHant = (s: Strings): Strings => ({
  siteName: s2t(s.siteName),
  siteNav: {
    platform: s2t(s.siteNav.platform),
    ai: s2t(s.siteNav.ai),
    security: s2t(s.siteNav.security),
    resources: s2t(s.siteNav.resources),
    docs: s2t(s.siteNav.docs),
  },
  footer: {
    terms: s2t(s.footer.terms),
    privacy: s2t(s.footer.privacy),
  },
  all: s2t(s.all),
  audience: s2t(s.audience),
  articlesTitle: s2t(s.articlesTitle),
  articlesLead: (n) => s2t(s.articlesLead(n)),
  backToList: s2t(s.backToList),
  alsoOn: s2t(s.alsoOn),
  references: s2t(s.references),
  by: s2t(s.by),
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
