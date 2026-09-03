import { localeSeg, type Locale } from './i18n';
import { s2t } from './zhconvert';
import {
  RAW_GROUPS,
  RAW_TERMS,
  termSlugPath,
  type TermGroup,
  type TermIdentity,
  type TermLabels,
} from './term-data';

// One unified taxonomy. Every browse axis (topic / role / solution / industry)
// is just a "term" with a `group`. Hubs all live under one flat URL namespace
// (/<locale>/blog/topics/<slug>); the axis never appears in the URL — it only
// groups terms in the menus. `topic` may nest one level (parent -> child).
//
// The taxonomy *data* — slugs, groups, parents, authored labels — lives in
// `./term-data`, which imports nothing so that `scripts/content-lint.mjs` can
// load it under plain Node and resolve the `/<locale>/blog/topics/<slugPath>/`
// links authors write. This module adds what only the running site needs: the
// derived Traditional Chinese labels (OpenCC s2twp, so we never hand-maintain a
// third copy) and the lookups. Add a term in `./term-data`, not here.

export type { TermGroup, TermIdentity } from './term-data';
export { termSlugPath };

export interface Term extends TermIdentity {
  label: Record<Locale, string>;
}

export interface GroupMeta {
  group: TermGroup;
  label: Record<Locale, string>;
  cardinality: 'one' | 'many'; // per article
  inMainNav: boolean; // topic = primary header nav; others = filters
}

const addHant = <T extends { label: TermLabels }>(
  x: T
): T & { label: Record<Locale, string> } => ({
  ...x,
  label: { ...x.label, 'zh-Hant': s2t(x.label['zh-Hans']) },
});

export const GROUPS: GroupMeta[] = RAW_GROUPS.map(addHant);
export const TERMS: Term[] = RAW_TERMS.map(addHant);

// --- lookups -----------------------------------------------------------------
const BY_SLUG = new Map(TERMS.map((t) => [t.slug, t]));

export const termBySlug = (slug: string): Term | undefined => BY_SLUG.get(slug);
export const termsByGroup = (group: TermGroup): Term[] =>
  TERMS.filter((t) => t.group === group);
export const slugsByGroup = (group: TermGroup): string[] =>
  termsByGroup(group).map((t) => t.slug);
export const groupMeta = (group: TermGroup): GroupMeta =>
  GROUPS.find((g) => g.group === group)!;
export const termLabel = (slug: string, locale: Locale): string =>
  BY_SLUG.get(slug)?.label[locale] ?? slug;
export const childTopics = (parentSlug: string): Term[] =>
  TERMS.filter((t) => t.group === 'topic' && t.parent === parentSlug);

export function termDescription(term: Term, locale: Locale): string {
  const label = term.label[locale];
  const descriptions: Record<Locale, Record<TermGroup, string>> = {
    en: {
      topic: `Articles about ${label}, with practical notes on AI-written enterprise software, governed data, application development, and agent workflows.`,
      solution: `Practical guidance for ${label} scenarios, including data models, workflows, permissions, integrations, and AI agent patterns for enterprise teams.`,
      role: `Articles for ${label} on building, operating, and governing AI-written business applications with ObjectOS.`,
      industry: `Articles for ${label} teams on connecting existing systems, business data, workflows, and AI agents without replacing core platforms.`,
    },
    'zh-Hans': {
      topic: `围绕${label}的文章，关注 AI-native 企业软件、受控数据、应用搭建和 Agent 工作流的实践。`,
      solution: `关于${label}场景的实践思考，覆盖数据模型、流程、权限、集成以及企业 AI Agent 的设计方式。`,
      role: `面向${label}的文章，讨论如何用 ObjectOS 构建、运行和治理 AI-native 业务应用。`,
      industry: `面向${label}团队的文章，讨论如何连接现有系统、业务数据、流程与 AI Agent，而不是替换核心平台。`,
    },
    'zh-Hant': {
      topic: `圍繞${label}的文章，關注 AI-native 企業軟體、受控資料、應用搭建和 Agent 工作流的實踐。`,
      solution: `關於${label}場景的實踐思考，覆蓋資料模型、流程、許可權、整合以及企業 AI Agent 的設計方式。`,
      role: `面向${label}的文章，討論如何用 ObjectOS 構建、執行和治理 AI-native 業務應用。`,
      industry: `面向${label}團隊的文章，討論如何連線現有系統、業務資料、流程與 AI Agent，而不是替換核心平臺。`,
    },
    ja: {
      topic: `${label}に関する記事。AI-native な企業ソフトウェア、管理されたデータ、アプリ開発、エージェントワークフローを実践的に扱います。`,
      solution: `${label}のシナリオについて、データモデル、ワークフロー、権限、連携、企業向け AI エージェントの設計を扱います。`,
      role: `${label}向けに、ObjectOS で AI-native な業務アプリを構築、運用、統制する方法をまとめます。`,
      industry: `${label}チーム向けに、既存システム、業務データ、ワークフロー、AI エージェントをコアプラットフォームの置き換えなしにつなぐ方法を扱います。`,
    },
    de: {
      topic: `Artikel zu ${label}: praktische Gedanken zu AI-nativer Unternehmenssoftware, kontrollierten Daten, App-Entwicklung und Agent-Workflows.`,
      solution: `Praxiswissen zu ${label}: Datenmodelle, Workflows, Berechtigungen, Integrationen und AI-Agent-Muster für Unternehmen.`,
      role: `Artikel für ${label} über Aufbau, Betrieb und Governance AI-nativer Geschäftsanwendungen mit ObjectOS.`,
      industry: `Artikel für Teams in ${label}: bestehende Systeme, Geschäftsdaten, Workflows und AI Agents verbinden, ohne Kernplattformen zu ersetzen.`,
    },
    es: {
      topic: `Artículos sobre ${label}, con notas prácticas sobre software empresarial AI-native, datos gobernados, desarrollo de apps y flujos con agentes.`,
      solution: `Ideas prácticas para ${label}: modelos de datos, workflows, permisos, integraciones y patrones de agentes AI para equipos empresariales.`,
      role: `Artículos para ${label} sobre construir, operar y gobernar aplicaciones de negocio AI-native con ObjectOS.`,
      industry: `Artículos para equipos de ${label} sobre conectar sistemas existentes, datos de negocio, workflows y agentes AI sin reemplazar plataformas centrales.`,
    },
    fr: {
      topic: `Articles sur ${label}, avec des notes pratiques sur les logiciels d’entreprise AI-native, les données gouvernées, les applications et les workflows d’agents.`,
      solution: `Réflexions pratiques sur ${label} : modèles de données, workflows, permissions, intégrations et agents AI pour les équipes d’entreprise.`,
      role: `Articles pour ${label} sur la construction, l’exploitation et la gouvernance d’applications métier AI-native avec ObjectOS.`,
      industry: `Articles pour les équipes ${label} sur la connexion des systèmes existants, données métier, workflows et agents AI sans remplacer les plateformes centrales.`,
    },
    ko: {
      topic: `${label}에 관한 글입니다. AI-native 엔터프라이즈 소프트웨어, 관리되는 데이터, 앱 개발, 에이전트 워크플로를 실무 관점에서 다룹니다.`,
      solution: `${label} 시나리오에 대한 실무 관점입니다. 데이터 모델, 워크플로, 권한, 통합, 기업용 AI 에이전트 패턴을 다룹니다.`,
      role: `${label}를 위해 ObjectOS로 AI-native 비즈니스 애플리케이션을 구축, 운영, 거버넌스하는 방법을 다룹니다.`,
      industry: `${label} 팀을 위해 기존 시스템, 비즈니스 데이터, 워크플로, AI 에이전트를 핵심 플랫폼 교체 없이 연결하는 방법을 다룹니다.`,
    },
  };

  return descriptions[locale][term.group];
}

/** Full hub href for a term: /<locale>/blog/topics/<slugPath>. */
export function termHref(locale: Locale, term: Term): string {
  return `/${localeSeg(locale)}/blog/topics/${termSlugPath(term)}/`;
}
