export type Locale = 'en' | 'zh-Hans';

export const LOCALES: Locale[] = ['en', 'zh-Hans'];

export const otherLocale = (l: Locale): Locale =>
  l === 'en' ? 'zh-Hans' : 'en';

/** Dashboard URL for a locale. */
export const homePath = (l: Locale): string => (l === 'en' ? '/' : '/zh/');

/** Article URL for an entry id, given its locale. */
export const postPath = (id: string): string => `/blog/${id}`;

export const htmlLang = (l: Locale): string =>
  l === 'en' ? 'en' : 'zh-Hans';

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

export const ui: Record<Locale, Strings> = {
  en: {
    siteName: 'ObjectStack',
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
    status: {
      draft: 'Draft',
      review: 'In review',
      published: 'Published',
      archived: 'Archived',
    },
  },
  'zh-Hans': {
    siteName: 'ObjectStack',
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
    status: {
      draft: '草稿',
      review: '审阅中',
      published: '已发布',
      archived: '已归档',
    },
  },
};

export const STATUS_COLOR: Record<StatusKey, string> = {
  draft: '#a8a29e',
  review: '#d97706',
  published: '#059669',
  archived: '#78716c',
};
