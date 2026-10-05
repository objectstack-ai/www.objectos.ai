import { s2t } from './zhconvert';
import type { Locale } from './i18n';

/**
 * The one-line positioning, quoted — never paraphrased.
 *
 * Source of truth (maintainer ruling Q4, 2026-10-05): the objectstack README,
 * `objectstack-ai/objectstack` `README.md` at `origin/main`, lines 7–16 (T1, T2,
 * T3) and 26–30 (T4). `objectstack-ai/objectos` quotes the same strings, and a
 * gate is to compare the copies, so this module is the ONLY place on this site
 * that spells them: every page that states what ObjectStack is, or what ObjectOS
 * is, reads from here. The old "open target format and runtime … commercial
 * production platform" sentence is gone; do not reintroduce a local copy.
 *
 * `CANONICAL` is byte-for-byte the README (straight apostrophe in T4 included).
 * E1 is the edition clause the PM seat fixed from the maintainer's rulings Q1
 * (「ObjectOS 仍然有自管(Enterprise)」) and Q2 (「Cloud 租户可以导出本体,拿到开源运行时上跑」);
 * both sites use it verbatim.
 *
 * Translations keep T1–T4 and E1 semantically exact. zh-Hans T1 is the README's
 * own Chinese line, 本体即软件。 zh-Hant is derived from zh-Hans, never hand-kept.
 */
export const CANONICAL = {
  t1: 'The ontology is the software.',
  t2: 'One executable business ontology. AI writes it, the runtime runs it, agents operate it, you own it.',
  t3: ['Executable', 'AI-writable', 'Agent-operable', 'You own it'],
  t4: "Want the same loop hosted, in the browser, nothing to install? That's ObjectOS, the commercial runtime environment built on this stack.",
  e1: 'ObjectOS runs hosted in the browser with nothing to install (ObjectOS Cloud) or self-managed on your own infrastructure (ObjectOS Enterprise), and on either edition you can export your ontology and run it on the open-source ObjectStack runtime.',
} as const;

/**
 * T4 outside the README. In the README "this stack" refers to the repository
 * the reader is looking at; on this site that referent is lost, so the one
 * substitution the canonical note allows is made — "this stack" → "ObjectStack".
 * Nothing else in the sentence moves.
 */
export const T4_STANDALONE = CANONICAL.t4.replace('this stack', 'ObjectStack');

export interface PositioningStrings {
  /** T1, one sentence. The home H1 renders `t1Lines`, which rejoin to exactly this. */
  t1: string;
  /** T1 split for the two-line hero: dark first line, accented second line. */
  t1Lines: [string, string];
  /** T2. */
  t2: string;
  /** T3, the four promises, in README order. */
  t3: [string, string, string, string];
  /** T4 in its standalone form (see `T4_STANDALONE`). */
  t4: string;
  /** The noun phrase from T4 that says what ObjectOS is; a substring of `t4`. */
  descriptor: string;
  /** E1, the edition clause. */
  e1: string;
}

const en: PositioningStrings = {
  t1: CANONICAL.t1,
  t1Lines: ['The ontology', 'is the software.'],
  t2: CANONICAL.t2,
  t3: [...CANONICAL.t3],
  t4: T4_STANDALONE,
  descriptor: 'the commercial runtime environment built on ObjectStack',
  e1: CANONICAL.e1,
};

const zhHans: PositioningStrings = {
  t1: '本体即软件。',
  t1Lines: ['本体', '即软件。'],
  t2: '一份可执行的业务本体。AI 编写它，运行时运行它，Agent 操作它，你拥有它。',
  t3: ['可执行', 'AI 可编写', 'Agent 可操作', '归你所有'],
  t4: '想把同一个循环托管起来、在浏览器里用、什么都不用安装？那就是 ObjectOS——建立在 ObjectStack 之上的商业运行环境。',
  descriptor: '建立在 ObjectStack 之上的商业运行环境',
  e1: 'ObjectOS 既可托管在浏览器中、无需安装（ObjectOS Cloud），也可自管部署在你自己的基础设施上（ObjectOS Enterprise）；无论哪个版本，你都可以导出本体，拿到开源的 ObjectStack 运行时上运行。',
};

const ja: PositioningStrings = {
  t1: 'オントロジーがソフトウェアである。',
  t1Lines: ['オントロジーが', 'ソフトウェアである。'],
  t2: '実行可能なビジネスオントロジーをひとつ。AI が書き、ランタイムが動かし、エージェントが操作し、あなたが所有する。',
  t3: ['実行可能', 'AI が書ける', 'エージェントが操作できる', 'あなたが所有する'],
  t4: '同じループをホスト型で、ブラウザだけで、何もインストールせずに使いたい？それが ObjectOS — ObjectStack の上に構築された商用ランタイム環境です。',
  descriptor: 'ObjectStack の上に構築された商用ランタイム環境',
  e1: 'ObjectOS は、ブラウザ上でホストされインストール不要の ObjectOS Cloud としても、自社インフラでセルフマネージドの ObjectOS Enterprise としても動作します。どちらのエディションでも、オントロジーをエクスポートしてオープンソースの ObjectStack ランタイムで実行できます。',
};

const de: PositioningStrings = {
  t1: 'Die Ontologie ist die Software.',
  t1Lines: ['Die Ontologie', 'ist die Software.'],
  t2: 'Eine ausführbare Geschäftsontologie. AI schreibt sie, die Runtime führt sie aus, Agents bedienen sie, Sie besitzen sie.',
  t3: ['Ausführbar', 'Von AI schreibbar', 'Von Agents bedienbar', 'Sie besitzen sie'],
  t4: 'Dieselbe Schleife gehostet, im Browser, ohne Installation? Das ist ObjectOS, die kommerzielle Laufzeitumgebung auf Basis von ObjectStack.',
  descriptor: 'die kommerzielle Laufzeitumgebung auf Basis von ObjectStack',
  e1: 'ObjectOS läuft gehostet im Browser ohne Installation (ObjectOS Cloud) oder selbst verwaltet auf Ihrer eigenen Infrastruktur (ObjectOS Enterprise), und in beiden Editionen können Sie Ihre Ontologie exportieren und auf der quelloffenen ObjectStack Runtime ausführen.',
};

const es: PositioningStrings = {
  t1: 'La ontología es el software.',
  t1Lines: ['La ontología', 'es el software.'],
  t2: 'Una ontología de negocio ejecutable. La AI la escribe, el runtime la ejecuta, los agentes la operan, tú la posees.',
  t3: ['Ejecutable', 'Escribible por AI', 'Operable por agentes', 'Tú la posees'],
  t4: '¿Quieres el mismo ciclo alojado, en el navegador, sin instalar nada? Eso es ObjectOS, el entorno de ejecución comercial construido sobre ObjectStack.',
  descriptor: 'el entorno de ejecución comercial construido sobre ObjectStack',
  e1: 'ObjectOS funciona alojado en el navegador sin instalar nada (ObjectOS Cloud) o autogestionado en tu propia infraestructura (ObjectOS Enterprise), y en cualquiera de las dos ediciones puedes exportar tu ontología y ejecutarla en el runtime open source de ObjectStack.',
};

const fr: PositioningStrings = {
  t1: 'L’ontologie est le logiciel.',
  t1Lines: ['L’ontologie', 'est le logiciel.'],
  t2: 'Une ontologie métier exécutable. L’AI l’écrit, le runtime l’exécute, les agents l’opèrent, vous la possédez.',
  t3: ['Exécutable', 'Rédigeable par l’AI', 'Opérable par les agents', 'Vous la possédez'],
  t4: 'Vous voulez la même boucle, hébergée, dans le navigateur, sans rien installer ? C’est ObjectOS, l’environnement d’exécution commercial construit sur ObjectStack.',
  descriptor: 'l’environnement d’exécution commercial construit sur ObjectStack',
  e1: 'ObjectOS fonctionne hébergé dans le navigateur, sans rien installer (ObjectOS Cloud), ou autogéré sur votre propre infrastructure (ObjectOS Enterprise) ; dans les deux éditions, vous pouvez exporter votre ontologie et l’exécuter sur le runtime open source ObjectStack.',
};

const ko: PositioningStrings = {
  t1: '온톨로지가 곧 소프트웨어다.',
  t1Lines: ['온톨로지가', '곧 소프트웨어다.'],
  t2: '실행 가능한 비즈니스 온톨로지 하나. AI가 쓰고, 런타임이 실행하고, 에이전트가 운영하고, 당신이 소유합니다.',
  t3: ['실행 가능', 'AI가 작성', '에이전트가 운영', '당신이 소유'],
  t4: '같은 루프를 호스팅으로, 브라우저에서, 아무것도 설치하지 않고 쓰고 싶다면? 그것이 ObjectOS, ObjectStack 위에 구축된 상용 런타임 환경입니다.',
  descriptor: 'ObjectStack 위에 구축된 상용 런타임 환경',
  e1: 'ObjectOS는 설치 없이 브라우저에서 호스팅되는 ObjectOS Cloud로도, 자체 인프라에서 직접 운영하는 ObjectOS Enterprise로도 실행되며, 어느 에디션에서든 온톨로지를 내보내 오픈소스 ObjectStack 런타임에서 실행할 수 있습니다.',
};

// Traditional Chinese is derived from Simplified (s2twp), never hand-kept —
// the same rule the home, pricing, security and marketing-page copy follow.
const zhHant: PositioningStrings = {
  t1: s2t(zhHans.t1),
  t1Lines: [s2t(zhHans.t1Lines[0]), s2t(zhHans.t1Lines[1])],
  t2: s2t(zhHans.t2),
  t3: [s2t(zhHans.t3[0]), s2t(zhHans.t3[1]), s2t(zhHans.t3[2]), s2t(zhHans.t3[3])],
  t4: s2t(zhHans.t4),
  descriptor: s2t(zhHans.descriptor),
  e1: s2t(zhHans.e1),
};

export const positioning: Record<Locale, PositioningStrings> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  ja,
  de,
  es,
  fr,
  ko,
};

/** How `MarketingHome.astro` joins the two H1 lines: no space in CJK scripts that use none. */
export const heroLineJoin = (locale: Locale): string =>
  locale === 'zh-Hans' || locale === 'zh-Hant' || locale === 'ja' ? '' : ' ';

// Two facts the copy above promises and a later edit could quietly break:
// the two-line hero must still read as exactly T1, and the phrase every page
// uses to say what ObjectOS is must still be the one T4 uses. Checked once, at
// load, so `astro check`/`astro build` fail loudly instead of a page drifting.
for (const [locale, strings] of Object.entries(positioning) as [Locale, PositioningStrings][]) {
  const rejoined = strings.t1Lines.join(heroLineJoin(locale));
  if (rejoined !== strings.t1) {
    throw new Error(
      `positioning[${locale}].t1Lines rejoin to "${rejoined}", not T1 "${strings.t1}"`
    );
  }
  if (!strings.t4.includes(strings.descriptor)) {
    throw new Error(
      `positioning[${locale}].descriptor "${strings.descriptor}" is not a substring of T4 "${strings.t4}"`
    );
  }
}
