import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology-projection',
  term: '本体投影',
  title: '本体投影：从本体派生出来的视图、仪表盘、应用和翻译',
  description:
    '本体投影是从可执行业务本体派生出来的视图、仪表盘、应用或翻译：同样以元数据编写、经同一道门禁校验，但不是本体的一部分——改动核心，投影跟着变。',
  definition:
    '本体投影（Ontology projection）是从一份可执行的业务本体派生出来的视图、仪表盘、应用或翻译——它同样以元数据编写、经同一道门禁校验，但不是本体本身的一部分，所以改动核心时投影跟着变，而删掉一个投影，它所展示的业务原封不动。',
  explanation: [
    '本体是运行时直接运行的那份业务定义：对象与字段、关系、动作、权限、流程，以及 Agent 与工具定义。人眼看到的一切都是它的投影。列表视图把一个对象的字段和权限投到一张网格上；仪表盘把对对象的查询投到图表上；应用把对象、视图和动作编成一个可导航的产品；翻译把每个标签投到一种语言里。投影是真实的元数据——同样被编写、有类型、经校验、要审阅——但它描述的是业务怎么被呈现，而不是业务是什么。',
    '分辨核心与投影的测试，是删掉它会发生什么。删掉一个看板视图，工单、它们的负责人、谁能编辑它们都原封不动；删掉限定这个看板范围的那条权限，业务就变了。这正是这个区分能圈定 Agent 要装下多少东西才能推理业务的原因：装核心，而不是装每一个界面。它也决定了审阅者读什么：只碰投影的 diff 改的是呈现，碰到核心的 diff 改的是权限。',
    '有两样东西不是投影，却常被当成投影。动作是本体的一部分：它定义对一条记录能做什么、在什么条件下能做，Agent 把它当作工具来调用。权限是本体的一部分：视图由权限塑形，而不是定义权限。代码也不是投影——钩子、动作体、CEL 表达式和受限 JSX 在运行时内部运行，和一切从本体派生出来的东西待在同一道权限与审计围栏里。',
  ],
  alsoKnownAs: ['投影', '视图投影', '本体的投影'],
  relatedTerms: [
    'ontology',
    'application-metadata',
    'typed-metadata',
    'definition-layer',
    'reviewable-diff',
    'object-type-and-action-type',
  ],
  articleSlugs: ['what-does-the-ontology-is-the-software-mean'],
  pageSlugs: ['app-ui'],
} satisfies GlossaryTerm;

export default term;
