import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: '本体（Ontology）',
  title: '企业软件里的本体（Ontology）：定义，以及它归谁所有',
  description:
    '本体是对一个业务领域的形式化建模——它有哪些类、每个类带哪些属性、彼此之间是什么关系——写成机器可读的形式，让软件和 AI Agent 能对业务本身做推理，而不是对着一堆原始数据表猜。',
  definition:
    '本体（Ontology）在企业语境下，是对一个业务领域的形式化建模——业务打交道的那些类、描述它们的属性、以及把它们连起来的关系——以机器可读的形式表达出来，让软件（如今还有 AI Agent）能够对业务本身做推理，而不是对着一堆原始数据表猜。',
  explanation: [
    '这个词来自哲学，经由知识工程进入企业软件，但真正干活的那层含义很窄也很实用：本体为整个组织一次性命名类型（客户、工单、设备）、每个类型带的属性，以及类型之间的连接。这正是它和数据库 schema 的分界。schema 描述的是某一个应用怎么存自己的行；本体描述的是这家公司所说的「客户」到底指什么，并且要写得让十几个系统、一个报表工具和一个模型都能解析出同一个答案。2026 年多数人想到这个词时脑子里是 Palantir Foundry——它的本体建模质量确实高；微软 Fabric IQ 和 Google 的企业知识图谱也在往同一层挤。',
    '大部分本体工作都在风险刚开始的地方停住了。检索级的本体是一个读模型：它让 Agent 把业务说清楚，却对「Agent 要动手改点什么」只字未提。把它补完整的能力，是被声明出来、且做权限校验的写操作——动作（Action）——连同挂在同一份定义上的权限与审计规则。Palantir 多年来一直把写操作收拢进受治理的 Action，这份功劳应该给它；「这个设计对不对」从来不是待议的问题。',
    '待议的问题是：这份文件在谁手里。在 ObjectStack 里，本体不是某个托管平台内部的一层，它就是应用自己的类型化元数据——那份元数据就是你的业务本体：一份开放、带版本、由你拥有的定义，写清你的对象、权限和流程，而不是散落在框架各处的代码。这正是 open business ontology（开放的业务本体）这个说法要承载的差别。一份你能读、能 diff、能搬到另一个宿主上去的定义，和一份同样优秀但住在厂商引擎里、迁移等于重建的定义，是两种不同的资产。',
    '也要把限度说清楚：本体不会让 AI Agent 变正确，把业务建模好依然是缓慢的、充满分歧的人的工作，没有哪种格式能替你走完。格式能决定的事情要窄得多——结果是否小到 Agent 能一次读完、是否严格到能在编写时点就把 Agent 的错误挡回去、是否可移植到能活过它最初被写下的那个平台。',
  ],
  alsoKnownAs: ['企业本体', '业务本体', '领域本体'],
  relatedTerms: [
    'semantic-layer',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'typed-metadata',
    'governed-runtime',
  ],
  articleSlugs: [
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-platform-comparison',
    'objectos-action-tools',
  ],
  pageSlugs: ['data-modeling', 'platform', 'ai'],
} satisfies GlossaryTerm;

export default term;
