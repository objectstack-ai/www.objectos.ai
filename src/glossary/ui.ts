import type { Locale } from '../lib/i18n';
import { s2t } from '../lib/zhconvert';

/**
 * Chrome strings for the glossary surface. Authored per locale; Traditional is
 * derived (s2t). A locale gets chrome here as soon as it has one authored
 * term, because from then on its glossary index is indexable (registry
 * `GLOSSARY_LOCALES`) and its translated terms render in its own language — a
 * translated term page under English chrome would mix languages in one view.
 * A locale with no authored term keeps falling back to English, chrome and
 * content alike.
 *
 * A locale can be partly translated (ja/ko/de/es/fr carry 5 of 24 terms,
 * #428): its index lists the translated terms first and the English stand-ins
 * after them under `fallbackHeading`, marked `lang="en"`.
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
  /** Heading over the English stand-ins on a partly translated index. */
  fallbackHeading: string;
  /** One sentence under it: what those cards are and why they are English. */
  fallbackLead: string;
}

const EN_UI: GlossaryUi = {
  eyebrow: 'Glossary',
  indexTitle: 'ObjectStack Glossary',
  indexHeading: 'The vocabulary of an executable business ontology.',
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
  fallbackHeading: 'Not yet translated',
  fallbackLead: 'These terms are shown in English until a translation is written.',
};

const ZH_HANS_UI: GlossaryUi = {
  eyebrow: '术语表',
  indexTitle: 'ObjectStack 术语表',
  indexHeading: '一份可执行的业务本体，用的是这套词汇。',
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
  fallbackHeading: '尚未翻译',
  fallbackLead: '这些术语在译文写好之前以英文显示。',
};

const JA_UI: GlossaryUi = {
  eyebrow: '用語集',
  indexTitle: 'ObjectStack 用語集',
  // 業務, not ビジネス: ビジネスオントロジー is one ten-character phrase, wider
  // than a 360px line at h1 size, so it split as ビジネスオントロジ / ーを.
  indexHeading: '実行可能な業務オントロジーを語るための用語。',
  indexLead:
    'このサイトで使う用語の定義集です。引用されることを前提に書いています。各項目はそれだけで意味の通る一文の定義から始まり、実務で何を意味するかを説明し、その用語を使う記事やページへリンクします。',
  termCount: (n) => `${n} 語`,
  termEyebrow: '用語',
  definitionLabel: '定義',
  alsoKnownAsLabel: '別名',
  explanationLabel: '実務では',
  relatedLabel: '関連用語',
  usedInLabel: 'この用語が使われている場所',
  usedInLead: 'この用語を実際に使っているページと記事。',
  pagesLabel: '製品ページ',
  articlesLabel: '記事',
  backToIndex: 'すべての用語',
  empty: 'まだ用語はありません。',
  fallbackHeading: '未翻訳の用語',
  fallbackLead: '以下の用語は、翻訳ができるまで英語で表示しています。',
};

const KO_UI: GlossaryUi = {
  eyebrow: '용어집',
  indexTitle: 'ObjectStack 용어집',
  indexHeading: '실행 가능한 비즈니스 온톨로지를 말하는 어휘.',
  indexLead:
    '이 사이트가 쓰는 용어의 정의 모음으로, 인용되도록 썼습니다. 각 항목은 그 자체로 뜻이 통하는 한 문장의 정의로 시작해, 실무에서 그 용어가 무엇을 뜻하는지 설명하고 그 용어를 쓰는 글과 페이지로 연결합니다.',
  termCount: (n) => `용어 ${n}개`,
  termEyebrow: '용어',
  definitionLabel: '정의',
  alsoKnownAsLabel: '다른 이름',
  explanationLabel: '실무에서는',
  relatedLabel: '관련 용어',
  usedInLabel: '이 용어가 쓰이는 곳',
  usedInLead: '이 용어를 실제로 쓰는 페이지와 글.',
  pagesLabel: '제품 페이지',
  articlesLabel: '글',
  backToIndex: '전체 용어',
  empty: '아직 용어가 없습니다.',
  fallbackHeading: '아직 번역되지 않은 용어',
  fallbackLead: '아래 용어는 번역이 나오기 전까지 영어로 표시됩니다.',
};

const DE_UI: GlossaryUi = {
  eyebrow: 'Glossar',
  indexTitle: 'ObjectStack-Glossar',
  indexHeading: 'Das Vokabular einer ausführbaren Geschäftsontologie.',
  indexLead:
    'Definitionen der Begriffe, die diese Website verwendet, geschrieben, um zitiert zu werden. Jeder Eintrag beginnt mit einem Satz, der für sich allein steht, erklärt dann, was der Begriff in der Praxis bedeutet, und verlinkt die Artikel und Seiten, die ihn verwenden.',
  termCount: (n) => `${n} ${n === 1 ? 'Begriff' : 'Begriffe'}`,
  termEyebrow: 'Glossarbegriff',
  definitionLabel: 'Definition',
  alsoKnownAsLabel: 'Auch bekannt als',
  explanationLabel: 'In der Praxis',
  relatedLabel: 'Verwandte Begriffe',
  usedInLabel: 'Wo dieser Begriff verwendet wird',
  usedInLead: 'Seiten und Artikel, die mit diesem Begriff arbeiten.',
  pagesLabel: 'Produktseiten',
  articlesLabel: 'Artikel',
  backToIndex: 'Alle Begriffe',
  empty: 'Noch keine Begriffe.',
  fallbackHeading: 'Noch nicht übersetzt',
  fallbackLead: 'Diese Begriffe erscheinen auf Englisch, bis eine Übersetzung vorliegt.',
};

const ES_UI: GlossaryUi = {
  eyebrow: 'Glosario',
  indexTitle: 'Glosario de ObjectStack',
  indexHeading: 'El vocabulario de una ontología de negocio ejecutable.',
  indexLead:
    'Definiciones de los términos que usa este sitio, escritas para ser citadas. Cada entrada abre con una frase que se sostiene sola, explica después qué significa el término en la práctica y enlaza los artículos y páginas que lo usan.',
  termCount: (n) => `${n} ${n === 1 ? 'término' : 'términos'}`,
  termEyebrow: 'Término del glosario',
  definitionLabel: 'Definición',
  alsoKnownAsLabel: 'También conocido como',
  explanationLabel: 'En la práctica',
  relatedLabel: 'Términos relacionados',
  usedInLabel: 'Dónde se usa este término',
  usedInLead: 'Páginas y artículos que ponen este término en práctica.',
  pagesLabel: 'Páginas de producto',
  articlesLabel: 'Artículos',
  backToIndex: 'Todos los términos',
  empty: 'Todavía no hay términos.',
  fallbackHeading: 'Aún sin traducir',
  fallbackLead: 'Estos términos se muestran en inglés hasta que exista una traducción.',
};

const FR_UI: GlossaryUi = {
  eyebrow: 'Glossaire',
  indexTitle: 'Glossaire ObjectStack',
  indexHeading: 'Le vocabulaire d’une ontologie métier exécutable.',
  indexLead:
    'Les définitions des termes qu’emploie ce site, écrites pour être citées. Chaque entrée s’ouvre sur une phrase qui tient seule, explique ensuite ce que le terme signifie en pratique et renvoie aux articles et aux pages qui l’emploient.',
  termCount: (n) => `${n} ${n === 1 ? 'terme' : 'termes'}`,
  termEyebrow: 'Terme du glossaire',
  definitionLabel: 'Définition',
  alsoKnownAsLabel: 'Aussi appelé',
  explanationLabel: 'En pratique',
  relatedLabel: 'Termes associés',
  usedInLabel: 'Où ce terme est employé',
  usedInLead: 'Les pages et les articles qui mettent ce terme en œuvre.',
  pagesLabel: 'Pages produit',
  articlesLabel: 'Articles',
  backToIndex: 'Tous les termes',
  empty: 'Aucun terme pour l’instant.',
  fallbackHeading: 'Pas encore traduits',
  fallbackLead: 'Ces termes s’affichent en anglais jusqu’à ce qu’une traduction soit rédigée.',
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
  fallbackHeading: s2t(s.fallbackHeading),
  fallbackLead: s2t(s.fallbackLead),
});

const UI: Partial<Record<Locale, GlossaryUi>> = {
  en: EN_UI,
  'zh-Hans': ZH_HANS_UI,
  'zh-Hant': toHant(ZH_HANS_UI),
  ja: JA_UI,
  ko: KO_UI,
  de: DE_UI,
  es: ES_UI,
  fr: FR_UI,
};

export const glossaryUi = (locale: Locale): GlossaryUi => UI[locale] ?? EN_UI;
