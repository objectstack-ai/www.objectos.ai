import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'mcp',
  term: 'MCP（模型上下文协议）',
  title: 'MCP（模型上下文协议）：它标准化了什么，又把什么留给了你',
  description:
    '模型上下文协议是一项开放标准，用统一的客户端—服务端接口把 AI 应用连接到工具、数据与提示词——它标准化的是「Agent 怎样够到工具」，而不是「这次调用是否被允许」。',
  definition:
    'MCP（模型上下文协议）是一项开放标准，它规定了 AI 应用如何通过统一的客户端—服务端接口连接到外部工具、数据源与提示词，使任何符合该标准的客户端都能使用任何符合该标准的服务端，而不必为这一对组合单独写集成代码。',
  explanation: [
    '这项协议规定的是客户端与服务端之间的一套 JSON-RPC 交互。服务端对外声明 tools（可调用的操作）、resources（可读取的数据）与 prompts（可复用的指令模板）；客户端——聊天应用、IDE 或一个 Agent 运行时——在连接时发现它们，并通过 stdio 或 HTTP 发起调用。它由 Anthropic 于 2024 年底提出，以开放规范的形式公开，如今已被众多厂商与开源项目的客户端和服务端实现。它拿下的价值是组合意义上的：N 个客户端与 M 个工具，不再需要 N×M 份各写各的集成。',
    '连接标准不谈权威，MCP 也刻意不去谈。它描述一次调用如何被封装和传输，但不决定这次调用适用谁的权限、这个操作生效前是否需要一次签字、事后又留下什么证据。这些判断属于持有数据的那个系统——所以一个 MCP 服务端的安全上限，永远不会高于它所包装的那个接口：把它架在一条裸数据库连接前面，交给 Agent 的就是服务账号的触及范围，而不是提问那个人的触及范围。',
    '把两者分清楚的说法很干净：MCP 标准化的是「Agent 怎样够到工具」，而受治理工具层决定的是「这次调用是否被允许、是否被记录」。两者都需要。连接能力比治理能力早到好几年，正是一个 Agent 兴高采烈地导出了提问者本无权查看的记录的由来——不是因为它有恶意，而是因为这条路径上从来没有人问过「调用的是谁」。',
  ],
  alsoKnownAs: ['模型上下文协议', 'MCP 服务端', 'MCP 客户端'],
  relatedTerms: [
    'governed-tool-layer',
    'ai-agent-runtime',
    'agent-guardrails',
    'governed-runtime',
    'permission-model',
  ],
  articleSlugs: [
    'mcp-governed-tool-layer',
    'objectos-action-tools',
    'ai-agent-business-data-security-boundaries',
  ],
  pageSlugs: ['mcp', 'ai'],
} satisfies GlossaryTerm;

export default term;
