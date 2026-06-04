import { s2t } from './zhconvert';

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant' | 'ja' | 'de' | 'es' | 'fr' | 'ko';

export const LOCALES: Locale[] = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'de', 'es', 'fr', 'ko'];

/** URL segment for a locale = the locale code itself (matches objectos.ai). */
export const localeSeg = (l: Locale): string => l;

/** URL segment -> Locale (undefined if not a known locale segment). */
export const segToLocale = (seg: string): Locale | undefined =>
  (LOCALES as string[]).includes(seg) ? (seg as Locale) : undefined;

/** Home (article list) URL: /en/, /zh-Hans/, /zh-Hant/. */
export const homePath = (l: Locale): string => `/${l}/`;

/** Article URL: /<locale>/blog/<baseSlug>. */
export const postPath = (l: Locale, slug: string): string =>
  `/${l}/blog/${slug}`;

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

type StatusKey = 'draft' | 'review' | 'published' | 'archived';

interface Strings {
  siteName: string;
  nav: string;
  all: string;
  audience: string;
  articlesTitle: string;
  articlesLead: (n: number) => string;
  backToList: string;
  alsoOn: string;
  references: string;
  by: string;
  empty: string;
  status: Record<StatusKey, string>;
}

const en: Strings = {
  siteName: 'ObjectOS',
  nav: 'Writing',
  all: 'All',
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'piece' : 'pieces'} on building AI-native software.`,
  backToList: 'All articles',
  alsoOn: 'Also published on',
  references: 'References',
  by: 'By',
  empty: 'No articles yet.',
  status: { draft: 'Draft', review: 'In review', published: 'Published', archived: 'Archived' },
};

const zhHans: Strings = {
  siteName: 'ObjectOS',
  nav: '文章',
  all: '全部',
  audience: '受众',
  articlesTitle: '文章',
  articlesLead: (n) => `${n} 篇关于构建 AI-native 软件的文章。`,
  backToList: '全部文章',
  alsoOn: '同步发布于',
  references: '参考链接',
  by: '作者',
  empty: '还没有文章。',
  status: { draft: '草稿', review: '审阅中', published: '已发布', archived: '已归档' },
};

const ja: Strings = {
  siteName: 'ObjectOS',
  nav: '記事',
  all: 'すべて',
  audience: '読者',
  articlesTitle: '記事',
  articlesLead: (n) => `AI-native ソフトウェア構築に関する ${n} 本の記事。`,
  backToList: 'すべての記事',
  alsoOn: '同時掲載',
  references: '参考リンク',
  by: '著者',
  empty: '記事はまだありません。',
  status: { draft: '下書き', review: 'レビュー中', published: '公開済み', archived: 'アーカイブ済み' },
};

const de: Strings = {
  siteName: 'ObjectOS',
  nav: 'Artikel',
  all: 'Alle',
  audience: 'Zielgruppe',
  articlesTitle: 'Artikel',
  articlesLead: (n) => `${n} ${n === 1 ? 'Artikel' : 'Artikel'} über den Aufbau AI-nativer Software.`,
  backToList: 'Alle Artikel',
  alsoOn: 'Auch veröffentlicht auf',
  references: 'Referenzen',
  by: 'Von',
  empty: 'Noch keine Artikel.',
  status: { draft: 'Entwurf', review: 'In Prüfung', published: 'Veröffentlicht', archived: 'Archiviert' },
};

const es: Strings = {
  siteName: 'ObjectOS',
  nav: 'Artículos',
  all: 'Todo',
  audience: 'Audiencia',
  articlesTitle: 'Artículos',
  articlesLead: (n) => `${n} ${n === 1 ? 'artículo' : 'artículos'} sobre crear software AI-native.`,
  backToList: 'Todos los artículos',
  alsoOn: 'También publicado en',
  references: 'Referencias',
  by: 'Por',
  empty: 'Aún no hay artículos.',
  status: { draft: 'Borrador', review: 'En revisión', published: 'Publicado', archived: 'Archivado' },
};

const fr: Strings = {
  siteName: 'ObjectOS',
  nav: 'Articles',
  all: 'Tous',
  audience: 'Audience',
  articlesTitle: 'Articles',
  articlesLead: (n) => `${n} ${n === 1 ? 'article' : 'articles'} sur la construction de logiciels AI-native.`,
  backToList: 'Tous les articles',
  alsoOn: 'Également publié sur',
  references: 'Références',
  by: 'Par',
  empty: 'Aucun article pour le moment.',
  status: { draft: 'Brouillon', review: 'En revue', published: 'Publié', archived: 'Archivé' },
};

const ko: Strings = {
  siteName: 'ObjectOS',
  nav: '글',
  all: '전체',
  audience: '대상',
  articlesTitle: '글',
  articlesLead: (n) => `AI-native 소프트웨어 구축에 관한 글 ${n}개.`,
  backToList: '전체 글',
  alsoOn: '동시 게시',
  references: '참고 링크',
  by: '작성자',
  empty: '아직 글이 없습니다.',
  status: { draft: '초안', review: '검토 중', published: '게시됨', archived: '보관됨' },
};

// Traditional UI is auto-derived from Simplified (s2twp) — never hand-kept.
const toHant = (s: Strings): Strings => ({
  siteName: s2t(s.siteName),
  nav: s2t(s.nav),
  all: s2t(s.all),
  audience: s2t(s.audience),
  articlesTitle: s2t(s.articlesTitle),
  articlesLead: (n) => s2t(s.articlesLead(n)),
  backToList: s2t(s.backToList),
  alsoOn: s2t(s.alsoOn),
  references: s2t(s.references),
  by: s2t(s.by),
  empty: s2t(s.empty),
  status: {
    draft: s2t(s.status.draft),
    review: s2t(s.status.review),
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
  draft: '#a8a29e',
  review: '#d97706',
  published: '#059669',
  archived: '#78716c',
};
