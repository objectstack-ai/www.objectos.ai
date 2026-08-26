import type { Locale } from '../lib/i18n';
import { s2t } from '../lib/zhconvert';

/**
 * Chrome strings for the glossary surface. Authored in English and Simplified
 * Chinese; Traditional is derived (s2t) and every other locale falls back to
 * English — the same rule the term content itself follows, so a locale is
 * either fully localized or fully a fallback.
 */
interface GlossaryUi {
  eyebrow: string;
  indexTitle: string;
  indexHeading: string;
  indexLead: string;
  /** e.g. "12 terms" — takes the count so plurals stay in the locale. */
  termCount: (n: number) => string;
  termEyebrow: string;
  definitionLabel: string;
  alsoKnownAsLabel: string;
  explanationLabel: string;
  relatedLabel: string;
  usedInLabel: string;
  usedInLead: string;
  pagesLabel: string;
  articlesLabel: string;
  backToIndex: string;
  empty: string;
}

const EN_UI: GlossaryUi = {
  eyebrow: 'Glossary',
  indexTitle: 'ObjectStack Glossary',
  indexHeading: 'The vocabulary of AI-written enterprise software.',
  indexLead:
    'Definitions for the terms this site uses, written to be quoted. Each entry opens with one self-contained sentence, then explains what the term means in practice and links to the articles and pages that use it.',
  termCount: (n) => `${n} ${n === 1 ? 'term' : 'terms'}`,
  termEyebrow: 'Glossary term',
  definitionLabel: 'Definition',
  alsoKnownAsLabel: 'Also known as',
  explanationLabel: 'In practice',
  relatedLabel: 'Related terms',
  usedInLabel: 'Where this term is used',
  usedInLead: 'Pages and articles that put this term to work.',
  pagesLabel: 'Product pages',
  articlesLabel: 'Articles',
  backToIndex: 'All terms',
  empty: 'No terms yet.',
};

const ZH_HANS_UI: GlossaryUi = {
  eyebrow: '术语表',
  indexTitle: 'ObjectStack 术语表',
  indexHeading: 'AI 编写的企业软件，用的是这套词汇。',
  indexLead:
    '本站使用的术语定义，写出来就是为了被引用。每条先给一句可独立成立的定义，再解释它在实践中意味着什么，并链接到用到它的文章与页面。',
  termCount: (n) => `${n} 条术语`,
  termEyebrow: '术语',
  definitionLabel: '定义',
  alsoKnownAsLabel: '又称',
  explanationLabel: '在实践中',
  relatedLabel: '相关术语',
  usedInLabel: '这个术语用在哪里',
  usedInLead: '真正用到这个术语的页面与文章。',
  pagesLabel: '产品页面',
  articlesLabel: '文章',
  backToIndex: '全部术语',
  empty: '还没有术语。',
};

// Traditional is derived from Simplified — never hand-kept.
const toHant = (s: GlossaryUi): GlossaryUi => ({
  eyebrow: s2t(s.eyebrow),
  indexTitle: s2t(s.indexTitle),
  indexHeading: s2t(s.indexHeading),
  indexLead: s2t(s.indexLead),
  termCount: (n) => s2t(s.termCount(n)),
  termEyebrow: s2t(s.termEyebrow),
  definitionLabel: s2t(s.definitionLabel),
  alsoKnownAsLabel: s2t(s.alsoKnownAsLabel),
  explanationLabel: s2t(s.explanationLabel),
  relatedLabel: s2t(s.relatedLabel),
  usedInLabel: s2t(s.usedInLabel),
  usedInLead: s2t(s.usedInLead),
  pagesLabel: s2t(s.pagesLabel),
  articlesLabel: s2t(s.articlesLabel),
  backToIndex: s2t(s.backToIndex),
  empty: s2t(s.empty),
});

const UI: Partial<Record<Locale, GlossaryUi>> = {
  en: EN_UI,
  'zh-Hans': ZH_HANS_UI,
  'zh-Hant': toHant(ZH_HANS_UI),
};

export const glossaryUi = (locale: Locale): GlossaryUi => UI[locale] ?? EN_UI;
