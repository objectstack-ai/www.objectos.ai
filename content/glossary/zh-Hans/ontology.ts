import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: '本体（Ontology）',
  title: '企业软件里的本体（Ontology）：可执行的业务本体，以及它归谁所有',
  description:
    '可执行的业务本体，是由运行时直接运行的那份业务定义——对象与字段、关系、动作、权限、流程，以及 Agent 与工具定义——它被校验，而不是被推理。',
  definition:
    '本体（Ontology）在 ObjectStack 所用的意义上，是一份可执行的业务本体：对一个业务的定义——它的对象与字段、关系、动作、权限、流程，以及 Agent 与工具定义——以类型化元数据写出，由运行时校验后直接运行，让软件和 AI Agent 通过这一份定义去操作业务，而不是对着一堆原始数据表猜。',
  explanation: [
    '本体即软件。在 ObjectStack 里，本体不是某个托管平台内部的一层：它就是应用自己的定义——对象与字段、关系、动作、权限、流程，以及 Agent 与工具定义——由运行时直接运行：数据库、REST API、界面和 MCP 工具都从它派生，权限与审计在每一次调用上执行。这个词带着四条边界。它是可执行的，不是知识表示意义上的本体：没有继承、没有公理、没有推理机——定义被校验，然后被运行。它不是架在你现有系统之上的语义层：它本身就是系统，联邦外部数据源默认只读，且尚在早期。视图、仪表盘、应用和翻译是本体的投影，不是本体的一部分。代码也没有消失：它以钩子、动作体、CEL 和受限 JSX 的形式搬进了运行时。',
    '这个词来自哲学，经由知识工程进入企业软件，在那里它指对一个领域的形式化建模——类、属性、关系——让软件能对其推理。那层含义很窄也很实用：本体为整个组织一次性命名类型（客户、工单、设备）、每个类型带的属性，以及类型之间的连接，这正是它和数据库 schema 的分界。schema 描述的是某一个应用怎么存自己的行；本体描述的是这家公司所说的「客户」到底指什么，并且要写得让十几个系统、一个报表工具和一个模型都能解析出同一个答案。2026 年多数人想到这个词时脑子里是 Palantir Foundry——它的本体建模质量确实高；微软 Fabric IQ 和 Google 的企业知识图谱也在往同一层挤。',
    '大部分本体工作都在风险刚开始的地方停住了。检索级的本体是一个读模型：它让 Agent 把业务说清楚，却对「Agent 要动手改点什么」只字未提。把它补完整的能力，是被声明出来、且做权限校验的写操作——动作（Action）——连同挂在同一份定义上的权限与审计规则。Palantir 多年来一直把写操作收拢进受治理的 Action，这份功劳应该给它；「这个设计对不对」从来不是待议的问题。',
    '待议的问题是：这份文件在谁手里。在 ObjectStack 里，这份定义就是你的业务本体：开放、带版本、归你所有，放在你自己的仓库里，既不是散落在框架各处的代码，也不是锁在厂商系统里的一张图。一份你能读、能 diff、能搬到另一个宿主上去的定义，和一份同样优秀但住在厂商引擎里、迁移等于重建的定义，是两种不同的资产。并且，本体不会让 AI Agent 变正确：把业务建模好依然是缓慢的、充满分歧的人的工作，没有哪种格式能替你走完。格式能决定的事情要窄得多——结果是否小到 Agent 能一次读完、是否严格到能在编写时点就把 Agent 的错误挡回去、是否可移植到能活过它最初被写下的那个平台。',
  ],
  alsoKnownAs: ['可执行业务本体', '业务本体', '企业本体', '领域本体'],
  relatedTerms: [
    'ontology-projection',
    'semantic-layer',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'typed-metadata',
    'governed-runtime',
  ],
  articleSlugs: [
    'what-does-the-ontology-is-the-software-mean',
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-platform-comparison',
    'objectos-action-tools',
  ],
  pageSlugs: ['data-modeling', 'app-ui', 'permissions', 'mcp', 'agent-developer', 'platform', 'ai'],
} satisfies GlossaryTerm;

export default term;
