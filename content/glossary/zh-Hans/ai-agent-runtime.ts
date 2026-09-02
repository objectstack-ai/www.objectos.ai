import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ai-agent-runtime',
  term: 'AI Agent 运行时',
  title: 'AI Agent 运行时是什么：定义，以及它和受治理运行时的区别',
  description:
    'AI Agent 运行时负责执行 Agent 的循环——调模型、调工具、在步骤之间保存状态；而它所操作的那个业务系统，才决定每一次调用是否被允许。两个层，一个被混用的名字。',
  definition:
    'AI Agent 运行时是执行 Agent 循环的那个运行环境——它负责调用模型、发起工具调用、在步骤之间承载状态与记忆，并处理重试、超时与并发，使一个 Agent 以受监督的程序方式运行，而不只是一次提示词调用。',
  explanation: [
    '有两种完全不同的东西都在用这个名字，而它们的区别决定了出事时该由谁负责。一种在 Agent 一侧：执行循环的框架或托管服务——图执行器、Agent SDK、把模型步骤嵌进去的流程引擎。另一种在系统一侧：Agent 所操作的那个业务应用的运行时，它解析出真正的操作身份，并决定某次读取或写入究竟是否被允许。读任何厂商关于「Agent 运行时」的说法，第一步都是问清楚指的是哪一种——两者回答的是不同的问题，谁也替代不了谁。',
    'Agent 运行时真正拥有的问题既真实又棘手：让一个长时间运行的循环在多个步骤之间保持可恢复，在重试失败步骤时不把一次写入做成两次，约束并发与 token 开销，为人工介入而暂停并干净地恢复，发现可用工具（往往通过 MCP），以及留下「Agent 尝试过什么、为什么这么做」的轨迹。一个在任务中途丢掉状态、或在重试时悄悄重复副作用的 Agent，是任何权限模型都修不好的生产事故。',
    '它拿不到的，是对数据的裁决权。Agent 运行时位于持有记录的那个系统之外，因此它能强制的范围只到「提供哪些工具」，而到不了「某个具体调用方透过这些工具能看见什么」。一条行级规则依赖的是把操作身份放到记录上求值——这个判断只有记录系统本身做得了。所以 Agent 运行时与受治理运行时是互补关系而非竞争关系：前者决定 Agent 尝试做什么，后者决定实际发生了什么。当同一家厂商两样都卖时，值得追问的是：上一次调用的权限检查，究竟由哪个组件执行？',
  ],
  alsoKnownAs: ['Agent 执行环境', 'Agent 编排层', '智能体运行时'],
  relatedTerms: [
    'governed-runtime',
    'governed-tool-layer',
    'agent-guardrails',
    'mcp',
    'application-definition-vs-runtime',
  ],
  articleSlugs: [
    'why-ai-agent-pilots-fail-four-layers',
    'ai-agent-workbench',
    'enterprise-agent-true-cost',
  ],
  pageSlugs: ['ai', 'agent-developer', 'mcp'],
} satisfies GlossaryTerm;

export default term;
