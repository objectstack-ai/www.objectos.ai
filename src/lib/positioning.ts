import { s2t } from './zhconvert';
import type { Locale } from './i18n';

/**
 * The one-line positioning, quoted — never paraphrased.
 *
 * Source of truth (maintainer ruling Q4, 2026-10-05): the objectstack README,
 * `objectstack-ai/objectstack` `README.md`, read at the latest release tag —
 * `@objectstack/cli@18.2.0`, commit 27f38ada — lines 7–14 (T1, T2, T3) and
 * 27–31 (T4, the sentence that names ObjectOS's three editions; objectstack
 * #26148 put it there under the maintainer's three-edition ruling of
 * 2026-10-26). `objectstack-ai/objectos` quotes the same sentence
 * (`apps/docs/lib/positioning.ts`, objectos #416), so this module is the ONLY
 * place on this site that spells them: every page that states what ObjectStack
 * is, or what ObjectOS is, reads from here. The old "commercial runtime
 * environment built on this stack" T4 is gone from the README and from here;
 * do not reintroduce a local copy.
 *
 * `CANONICAL` is the README's prose with its Markdown rendered away, nothing
 * else: the blockquote and heading marks, the bold around T2's first sentence,
 * the code spans around `ghcr.io/objectstack-ai/objectstack` and `os start`,
 * the link on "ObjectOS", and T4's "([Ship it](#ship-it))" — a link to a
 * README section that has no target off the README — all go, every word stays
 * in the README's order. `scripts/check-positioning.mjs` derives T1–T4 from the
 * pinned snapshot `scripts/positioning/README.objectstack.md` (that tag's
 * file, byte for byte, hash-checked) by exactly those rules and fails
 * `pnpm build` on any difference, naming the README lines. To move the
 * positioning: change the README first, re-pin the snapshot, then copy the
 * words here. The gate parses `CANONICAL` from this file's text, so keep each
 * key on the shape it reads: one `key: 'string'` (or `"string"`) per line, and
 * `t3` as one line of quoted strings.
 *
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
 * E1's second half follows docs.objectos.ai#334, Q1 (comment 6568804196):
 * exporting a Cloud or Enterprise tenant's ontology to run it on the open
 * runtime is planned, not shipped, until objectstack#28914 lands. Until then
 * that ruling supersedes Q2's "can export today". The two sentences after the
 * editions are docs.objectos.ai `OBJECTOS_EDITIONS` at 46781141, byte for byte.
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

/**
 * The two external destinations the navigation names besides the docs sites:
 * the source repository (Developers → GitHub, and the footer's Developers and
 * Company & Legal rows) and the YouTube channel (Resources → Videos, the
 * footer's Resources column and the home page's video section).
 */
export const GITHUB_REPO_URL = 'https://github.com/objectstack-ai/objectstack';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@objectstack';

export const CANONICAL = {
  t1: 'The ontology is the software.',
  t2: 'One executable business ontology. AI writes it, the runtime runs it, agents operate it, you own it.',
  t3: ['Executable', 'AI-writable', 'Agent-operable', 'You own it'],
  t4: 'To run it, this repository ships ObjectOS Community — the ghcr.io/objectstack-ai/objectstack image, os start and the Console, free and self-hosted — while ObjectOS Cloud is the hosted edition and ObjectOS Enterprise the self-managed, licensed one.',
  e1: 'ObjectOS comes in three editions: ObjectOS Community, open source and free to self-host; ObjectOS Cloud, hosted in the browser with nothing to install; and ObjectOS Enterprise, self-managed on your own infrastructure. Your ontology is ordinary ObjectStack metadata. Exporting it from ObjectOS Cloud or ObjectOS Enterprise to run on the open-source ObjectStack runtime is planned.',
  protocol: 'Built on the open ObjectStack protocol',
} as const;

/**
 * T4 outside the README. In the README "this repository" is the one the reader
 * is looking at; on this site that referent is lost, so the one substitution
 * the canonical note allows is made — "this repository" → "the ObjectStack
 * repository", the same words objectos uses. Nothing else in the sentence
 * moves. `descriptor` below is not a substring of T4 any more: the sentence
 * names the editions one by one and has no single noun phrase for ObjectOS, so
 * the descriptor is the three editions' short name, and the load-time check
 * at the bottom holds it to the names T4 spells.
 */
export const T4_STANDALONE = CANONICAL.t4.replace('this repository', 'the ObjectStack repository');

/** The three edition names T4 spells, in T4's order; `descriptor` lists them. */
const EDITIONS = ['Community', 'Cloud', 'Enterprise'] as const;

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
  /**
   * The short name for what ObjectOS is, as T4 says it: the three editions,
   * "ObjectOS Community, Cloud and Enterprise", in T4's order. The home
   * eyebrow, the pricing and security leads and `/llms.txt` build their
   * "ObjectOS comes in three editions, …" sentence around it.
   */
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
  descriptor: 'ObjectOS Community, Cloud and Enterprise',
  e1: CANONICAL.e1,
  protocol: CANONICAL.protocol,
};

const zhHans: PositioningStrings = {
  t1: '本体即软件。',
  t1Lines: ['本体', '即软件。'],
  t2: '一份可执行的业务本体。AI 编写它，运行时运行它，Agent 操作它，你拥有它。',
  t3: ['可执行', 'AI 可编写', 'Agent 可操作', '归你所有'],
  // The same words docs.objectos.ai uses for this sentence (objectos #416).
  t4: '为了运行它，ObjectStack 仓库提供 ObjectOS Community —— ghcr.io/objectstack-ai/objectstack 镜像、os start 和 Console，免费且自托管 —— 而 ObjectOS Cloud 是托管版本，ObjectOS Enterprise 是自管理、需许可的版本。',
  descriptor: 'ObjectOS Community、Cloud 与 Enterprise',
  e1: 'ObjectOS 有三个版本：ObjectOS Community，开源、可免费自托管；ObjectOS Cloud，托管在浏览器中、无需安装；ObjectOS Enterprise，自管部署在你自己的基础设施上。你的本体是普通的 ObjectStack 元数据。从 ObjectOS Cloud 或 ObjectOS Enterprise 导出本体、在开源的 ObjectStack 运行时上运行，目前尚在计划中。',
  protocol: '建立在开放的 ObjectStack 协议之上',
};

const ja: PositioningStrings = {
  t1: 'オントロジーがソフトウェアである。',
  t1Lines: ['オントロジーが', 'ソフトウェアである。'],
  t2: '実行可能なビジネスオントロジーをひとつ。AI が書き、ランタイムが動かし、エージェントが操作し、あなたが所有する。',
  t3: ['実行可能', 'AI が書ける', 'エージェントが操作できる', 'あなたが所有する'],
  // The same words docs.objectos.ai uses for this sentence (objectos #416).
  t4: 'それを実行するために、ObjectStack リポジトリは ObjectOS Community（ghcr.io/objectstack-ai/objectstack イメージ、os start、Console からなる、無料のセルフホスト版）を提供し、ObjectOS Cloud はホスト型のエディション、ObjectOS Enterprise はセルフマネージドのライセンス制のエディションです。',
  descriptor: 'ObjectOS Community、Cloud、Enterprise',
  e1: 'ObjectOS には 3 つのエディションがあります。オープンソースで無料でセルフホストできる ObjectOS Community、ブラウザ上でホストされインストール不要の ObjectOS Cloud、自社インフラでセルフマネージドの ObjectOS Enterprise です。オントロジーは通常の ObjectStack メタデータです。ObjectOS Cloud または ObjectOS Enterprise からエクスポートしてオープンソースの ObjectStack ランタイムで実行する機能は、計画中です。',
  protocol: 'オープンな ObjectStack プロトコルの上に構築',
};

const de: PositioningStrings = {
  t1: 'Die Ontologie ist die Software.',
  t1Lines: ['Die Ontologie', 'ist die Software.'],
  t2: 'Eine ausführbare Geschäftsontologie. AI schreibt sie, die Runtime führt sie aus, Agents bedienen sie, Sie besitzen sie.',
  t3: ['Ausführbar', 'Von AI schreibbar', 'Von Agents bedienbar', 'Sie besitzen sie'],
  t4: 'Zum Ausführen liefert das ObjectStack-Repository ObjectOS Community — das Image ghcr.io/objectstack-ai/objectstack, os start und die Console, kostenlos und selbst gehostet — während ObjectOS Cloud die gehostete Edition ist und ObjectOS Enterprise die selbst verwaltete, lizenzierte.',
  descriptor: 'ObjectOS Community, Cloud und Enterprise',
  e1: 'ObjectOS gibt es in drei Editionen: ObjectOS Community, quelloffen und kostenlos selbst gehostet; ObjectOS Cloud, gehostet im Browser ohne Installation; und ObjectOS Enterprise, selbst verwaltet auf Ihrer eigenen Infrastruktur. Ihre Ontologie besteht aus gewöhnlichen ObjectStack-Metadaten. Der Export aus ObjectOS Cloud oder ObjectOS Enterprise zur Ausführung auf der quelloffenen ObjectStack Runtime ist geplant.',
  protocol: 'Gebaut auf dem offenen ObjectStack-Protokoll',
};

const es: PositioningStrings = {
  t1: 'La ontología es el software.',
  t1Lines: ['La ontología', 'es el software.'],
  t2: 'Una ontología de negocio ejecutable. La AI la escribe, el runtime la ejecuta, los agentes la operan, tú la posees.',
  t3: ['Ejecutable', 'Escribible por AI', 'Operable por agentes', 'Tú la posees'],
  t4: 'Para ejecutarlo, el repositorio de ObjectStack incluye ObjectOS Community — la imagen ghcr.io/objectstack-ai/objectstack, os start y la Console, gratuita y autoalojada — mientras que ObjectOS Cloud es la edición alojada y ObjectOS Enterprise la autogestionada, con licencia.',
  descriptor: 'ObjectOS Community, Cloud y Enterprise',
  e1: 'ObjectOS se ofrece en tres ediciones: ObjectOS Community, open source y gratuita para autoalojar; ObjectOS Cloud, alojada en el navegador sin instalar nada; y ObjectOS Enterprise, autogestionada en tu propia infraestructura. Tu ontología son metadatos ordinarios de ObjectStack. La exportación desde ObjectOS Cloud u ObjectOS Enterprise para ejecutarla en el runtime open source de ObjectStack está prevista.',
  protocol: 'Construido sobre el protocolo abierto ObjectStack',
};

const fr: PositioningStrings = {
  t1: 'L’ontologie est le logiciel.',
  t1Lines: ['L’ontologie', 'est le logiciel.'],
  t2: 'Une ontologie métier exécutable. L’AI l’écrit, le runtime l’exécute, les agents l’opèrent, vous la possédez.',
  t3: ['Exécutable', 'Rédigeable par l’AI', 'Opérable par les agents', 'Vous la possédez'],
  t4: 'Pour l’exécuter, le dépôt ObjectStack fournit ObjectOS Community — l’image ghcr.io/objectstack-ai/objectstack, os start et la Console, gratuite et auto-hébergée — tandis qu’ObjectOS Cloud est l’édition hébergée et ObjectOS Enterprise l’édition autogérée, sous licence.',
  descriptor: 'ObjectOS Community, Cloud et Enterprise',
  e1: 'ObjectOS existe en trois éditions : ObjectOS Community, open source et gratuite à auto-héberger ; ObjectOS Cloud, hébergée dans le navigateur, sans rien installer ; et ObjectOS Enterprise, autogérée sur votre propre infrastructure. Votre ontologie est faite de métadonnées ObjectStack ordinaires. Son export depuis ObjectOS Cloud ou ObjectOS Enterprise, pour l’exécuter sur le runtime open source ObjectStack, est prévu.',
  protocol: 'Construit sur le protocole ouvert ObjectStack',
};

const ko: PositioningStrings = {
  t1: '온톨로지가 곧 소프트웨어다.',
  t1Lines: ['온톨로지가', '곧 소프트웨어다.'],
  t2: '실행 가능한 비즈니스 온톨로지 하나. AI가 쓰고, 런타임이 실행하고, 에이전트가 운영하고, 당신이 소유합니다.',
  t3: ['실행 가능', 'AI가 작성', '에이전트가 운영', '당신이 소유'],
  t4: '이를 실행하기 위해 ObjectStack 저장소는 ObjectOS Community(ghcr.io/objectstack-ai/objectstack 이미지, os start, Console로 이루어진 무료 직접 호스팅 에디션)를 제공하며, ObjectOS Cloud는 호스팅 에디션, ObjectOS Enterprise는 직접 운영하는 라이선스 에디션입니다.',
  descriptor: 'ObjectOS Community, Cloud, Enterprise',
  e1: 'ObjectOS는 세 가지 에디션으로 제공됩니다. 오픈소스이며 무료로 직접 호스팅하는 ObjectOS Community, 설치 없이 브라우저에서 호스팅되는 ObjectOS Cloud, 자체 인프라에서 직접 운영하는 ObjectOS Enterprise입니다. 온톨로지는 일반적인 ObjectStack 메타데이터입니다. ObjectOS Cloud 또는 ObjectOS Enterprise에서 내보내 오픈소스 ObjectStack 런타임에서 실행하는 기능은 계획 중입니다.',
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
// uses to say what ObjectOS is must still name the editions T4 names — all
// three, in T4's order, each spelled "ObjectOS <edition>" in T4 itself.
// Checked once, at load, so `astro build` (and the dev server) fail loudly
// instead of a page drifting. (T4 against the README is the build-time
// gate, `scripts/check-positioning.mjs`.)
for (const [locale, strings] of Object.entries(positioning) as [Locale, PositioningStrings][]) {
  const rejoined = strings.t1Lines.join(heroLineJoin(locale));
  if (rejoined !== strings.t1) {
    throw new Error(
      `positioning[${locale}].t1Lines rejoin to "${rejoined}", not T1 "${strings.t1}"`
    );
  }
  const positions = EDITIONS.map((edition) => strings.descriptor.indexOf(edition));
  const inOrder = positions.every((at, i) => at >= 0 && (i === 0 || at > positions[i - 1]));
  if (!strings.descriptor.startsWith('ObjectOS ') || !inOrder) {
    throw new Error(
      `positioning[${locale}].descriptor "${strings.descriptor}" must name ObjectOS ${EDITIONS.join(', ')} in that order`
    );
  }
  for (const edition of EDITIONS) {
    if (!strings.t4.includes(`ObjectOS ${edition}`)) {
      throw new Error(`positioning[${locale}].t4 does not spell "ObjectOS ${edition}": "${strings.t4}"`);
    }
  }
}
