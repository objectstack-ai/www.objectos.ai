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
 * (「ObjectOS 仍然有自管(Enterprise)」) and Q2 (「Cloud 租户可以导出本体,拿到开源运行时上跑」),
 * restated under the edition model the maintainer chose on 2026-10-26
 * (「模型 2:ObjectOS 三版本」): ObjectOS is one product in three editions —
 * Community (open source, self-hosted, free), Cloud and Enterprise — and
 * ObjectStack is the open protocol and SDK all three are built on. So E1 names
 * the three editions and keeps Q2's portability promise, and the protocol is
 * named once more, as the `protocol` link beside it (→ objectstack.ai), not as
 * a second product. Both sites use it verbatim.
 *
 * Translations keep T1–T4, E1 and the protocol link semantically exact. zh-Hans T1 is the README's
 * own Chinese line, 本体即软件。 zh-Hant is derived from zh-Hans, never hand-kept.
 */
/**
 * The developer site: the open ObjectStack protocol, SDK, CLI and docs. The
 * header, the footer and the home hero link it from here, so the product site
 * names the protocol in one place.
 */
export const OBJECTSTACK_URL = 'https://objectstack.ai';

/**
 * ObjectOS Cloud's account pages. The header CTA, the home hero, the pricing
 * page's Free and Team buttons and the footer all link these two constants,
 * so the hosted product is named in one place. `cloud.objectos.ai/` itself
 * redirects to this site, so the links name the console's own pages.
 */
export const CLOUD_SIGNUP_URL = 'https://cloud.objectos.ai/_console/register';
export const CLOUD_SIGNIN_URL = 'https://cloud.objectos.ai/_console/login';

export const CANONICAL = {
  t1: 'The ontology is the software.',
  t2: 'One executable business ontology. AI writes it, the runtime runs it, agents operate it, you own it.',
  t3: ['Executable', 'AI-writable', 'Agent-operable', 'You own it'],
  t4: "Want the same loop hosted, in the browser, nothing to install? That's ObjectOS, the commercial runtime environment built on this stack.",
  e1: 'ObjectOS comes in three editions: ObjectOS Community, open source and free to self-host; ObjectOS Cloud, hosted in the browser with nothing to install; and ObjectOS Enterprise, self-managed on your own infrastructure. On every edition you can export your ontology and run it on another.',
  protocol: 'Built on the open ObjectStack protocol',
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
  /** The secondary link under E1: what the editions are built on, → `OBJECTSTACK_URL`. */
  protocol: string;
}

const en: PositioningStrings = {
  t1: CANONICAL.t1,
  t1Lines: ['The ontology', 'is the software.'],
  t2: CANONICAL.t2,
  t3: [...CANONICAL.t3],
  t4: T4_STANDALONE,
  descriptor: 'the commercial runtime environment built on ObjectStack',
  e1: CANONICAL.e1,
  protocol: CANONICAL.protocol,
};

const zhHans: PositioningStrings = {
  t1: '本体即软件。',
  t1Lines: ['本体', '即软件。'],
  t2: '一份可执行的业务本体。AI 编写它，运行时运行它，Agent 操作它，你拥有它。',
  t3: ['可执行', 'AI 可编写', 'Agent 可操作', '归你所有'],
  t4: '想把同一个循环托管起来、在浏览器里用、什么都不用安装？那就是 ObjectOS——建立在 ObjectStack 之上的商业运行环境。',
  descriptor: '建立在 ObjectStack 之上的商业运行环境',
  e1: 'ObjectOS 有三个版本：ObjectOS Community，开源、可免费自托管；ObjectOS Cloud，托管在浏览器中、无需安装；ObjectOS Enterprise，自管部署在你自己的基础设施上。无论哪个版本，你都可以导出本体，拿到另一个版本上运行。',
  protocol: '建立在开放的 ObjectStack 协议之上',
};

const ja: PositioningStrings = {
  t1: 'オントロジーがソフトウェアである。',
  t1Lines: ['オントロジーが', 'ソフトウェアである。'],
  t2: '実行可能なビジネスオントロジーをひとつ。AI が書き、ランタイムが動かし、エージェントが操作し、あなたが所有する。',
  t3: ['実行可能', 'AI が書ける', 'エージェントが操作できる', 'あなたが所有する'],
  t4: '同じループをホスト型で、ブラウザだけで、何もインストールせずに使いたい？それが ObjectOS — ObjectStack の上に構築された商用ランタイム環境です。',
  descriptor: 'ObjectStack の上に構築された商用ランタイム環境',
  e1: 'ObjectOS には 3 つのエディションがあります。オープンソースで無料でセルフホストできる ObjectOS Community、ブラウザ上でホストされインストール不要の ObjectOS Cloud、自社インフラでセルフマネージドの ObjectOS Enterprise です。どのエディションでも、オントロジーをエクスポートして別のエディションで実行できます。',
  protocol: 'オープンな ObjectStack プロトコルの上に構築',
};

const de: PositioningStrings = {
  t1: 'Die Ontologie ist die Software.',
  t1Lines: ['Die Ontologie', 'ist die Software.'],
  t2: 'Eine ausführbare Geschäftsontologie. AI schreibt sie, die Runtime führt sie aus, Agents bedienen sie, Sie besitzen sie.',
  t3: ['Ausführbar', 'Von AI schreibbar', 'Von Agents bedienbar', 'Sie besitzen sie'],
  t4: 'Dieselbe Schleife gehostet, im Browser, ohne Installation? Das ist ObjectOS, die kommerzielle Laufzeitumgebung auf Basis von ObjectStack.',
  descriptor: 'die kommerzielle Laufzeitumgebung auf Basis von ObjectStack',
  e1: 'ObjectOS gibt es in drei Editionen: ObjectOS Community, quelloffen und kostenlos selbst gehostet; ObjectOS Cloud, gehostet im Browser ohne Installation; und ObjectOS Enterprise, selbst verwaltet auf Ihrer eigenen Infrastruktur. In jeder Edition können Sie Ihre Ontologie exportieren und in einer anderen ausführen.',
  protocol: 'Gebaut auf dem offenen ObjectStack-Protokoll',
};

const es: PositioningStrings = {
  t1: 'La ontología es el software.',
  t1Lines: ['La ontología', 'es el software.'],
  t2: 'Una ontología de negocio ejecutable. La AI la escribe, el runtime la ejecuta, los agentes la operan, tú la posees.',
  t3: ['Ejecutable', 'Escribible por AI', 'Operable por agentes', 'Tú la posees'],
  t4: '¿Quieres el mismo ciclo alojado, en el navegador, sin instalar nada? Eso es ObjectOS, el entorno de ejecución comercial construido sobre ObjectStack.',
  descriptor: 'el entorno de ejecución comercial construido sobre ObjectStack',
  e1: 'ObjectOS se ofrece en tres ediciones: ObjectOS Community, open source y gratuita para autoalojar; ObjectOS Cloud, alojada en el navegador sin instalar nada; y ObjectOS Enterprise, autogestionada en tu propia infraestructura. En cualquier edición puedes exportar tu ontología y ejecutarla en otra.',
  protocol: 'Construido sobre el protocolo abierto ObjectStack',
};

const fr: PositioningStrings = {
  t1: 'L’ontologie est le logiciel.',
  t1Lines: ['L’ontologie', 'est le logiciel.'],
  t2: 'Une ontologie métier exécutable. L’AI l’écrit, le runtime l’exécute, les agents l’opèrent, vous la possédez.',
  t3: ['Exécutable', 'Rédigeable par l’AI', 'Opérable par les agents', 'Vous la possédez'],
  t4: 'Vous voulez la même boucle, hébergée, dans le navigateur, sans rien installer ? C’est ObjectOS, l’environnement d’exécution commercial construit sur ObjectStack.',
  descriptor: 'l’environnement d’exécution commercial construit sur ObjectStack',
  e1: 'ObjectOS existe en trois éditions : ObjectOS Community, open source et gratuite à auto-héberger ; ObjectOS Cloud, hébergée dans le navigateur, sans rien installer ; et ObjectOS Enterprise, autogérée sur votre propre infrastructure. Quelle que soit l’édition, vous pouvez exporter votre ontologie et l’exécuter sur une autre.',
  protocol: 'Construit sur le protocole ouvert ObjectStack',
};

const ko: PositioningStrings = {
  t1: '온톨로지가 곧 소프트웨어다.',
  t1Lines: ['온톨로지가', '곧 소프트웨어다.'],
  t2: '실행 가능한 비즈니스 온톨로지 하나. AI가 쓰고, 런타임이 실행하고, 에이전트가 운영하고, 당신이 소유합니다.',
  t3: ['실행 가능', 'AI가 작성', '에이전트가 운영', '당신이 소유'],
  t4: '같은 루프를 호스팅으로, 브라우저에서, 아무것도 설치하지 않고 쓰고 싶다면? 그것이 ObjectOS, ObjectStack 위에 구축된 상용 런타임 환경입니다.',
  descriptor: 'ObjectStack 위에 구축된 상용 런타임 환경',
  e1: 'ObjectOS는 세 가지 에디션으로 제공됩니다. 오픈소스이며 무료로 직접 호스팅하는 ObjectOS Community, 설치 없이 브라우저에서 호스팅되는 ObjectOS Cloud, 자체 인프라에서 직접 운영하는 ObjectOS Enterprise입니다. 어느 에디션에서든 온톨로지를 내보내 다른 에디션에서 실행할 수 있습니다.',
  protocol: '오픈 ObjectStack 프로토콜 위에 구축',
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
  protocol: s2t(zhHans.protocol),
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
