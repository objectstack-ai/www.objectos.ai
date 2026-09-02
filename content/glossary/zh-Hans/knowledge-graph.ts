import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'knowledge-graph',
  term: '知识图谱',
  title: '知识图谱是什么：定义，以及它和本体的区别',
  description:
    '知识图谱把一个组织的信息表达成节点和带类型的边，让「这些东西之间怎么连」这类问题靠遍历关系来回答，而不是靠一层层 join 数据表。',
  definition:
    '知识图谱把一个组织的信息表达成节点和带类型的边——它关心的实体，以及实体之间带标签的关系——从而让「这些东西之间是怎么连起来的」这类问题，可以通过遍历关系来回答，而不是通过 join 一张张数据表。',
  explanation: [
    '要抓住这个行业一直含混过去的区别，最干净的说法是：本体是 schema，知识图谱是按这个 schema 装满了的实例数据。本体说的是「工单挂在设备上、设备属于客户」；知识图谱装的是那几百万条真实的工单、设备、客户，以及它们之间的边。工程上，图要么存成 RDF 三元组、上面覆一层 OWL 本体，要么存成 Neo4j 这类引擎里的属性图；而大量生产环境的图跑在一套从来没被写下来的本体上——这正是同一张图里两个团队对「客户」给出互不兼容定义的由来。',
    '在「关系形状」的问题上，知识图谱是对的工具，而且没有别的东西能接近它。欺诈团伙、实际受益人链条、供应链依赖、跨网络的影响面分析、跨十几个源系统的实体归并，以及任何形如「离这里四跳的是什么」的问题，对图来说是母语，用关系型 join 写则从别扭一路走到不可能。如果你的问题是这个，答案就是一个图数据库，没有哪个应用平台可以替代。',
    '它和语义层共有的那道限度是同一道：知识图谱压倒性地是一个读结构。它记录「这些东西连着」，但不声明谁可以改动它们、允许哪些操作、以及一次改动留下什么审计记录。ObjectStack 是从另一端处理这些连接的——关系被声明为对象上的类型化字段，就写在应用自己的元数据里，于是业务的那张图是应用赖以运行的那份定义的自然结果，而不是另一个需要同步的存储；又因为这份定义是你仓库里的文件，它是一份开放的业务本体，而不是别人平台里的一张图。这是关于所有权与治理的主张，不是关于图分析的：ObjectStack 不是图数据库，也不打算去赢深度多跳遍历。',
  ],
  alsoKnownAs: ['企业知识图谱', '语义图谱', '实体图'],
  relatedTerms: [
    'ontology',
    'semantic-layer',
    'object-type-and-action-type',
    'application-metadata',
    'typed-metadata',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-race-open-vs-closed',
    'ai-ontology-open-protocol',
    'crm-ai-understands-customers',
  ],
  pageSlugs: ['data-modeling', 'analytics'],
} satisfies GlossaryTerm;

export default term;
