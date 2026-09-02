import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'governed-tool-layer',
  term: '受治理工具层',
  title: '受治理工具层是什么：定义，以及它在 MCP 之上补了什么',
  description:
    '受治理工具层位于 AI Agent 与业务系统之间，把每一个可调用的操作变成受控动作：带上调用者身份、检查权限、需要时走审批、并留下审计记录。',
  definition:
    '受治理工具层是位于 AI Agent 与业务系统之间的那一层——在这一层里，Agent 调用的是受控动作而不是裸接口，因此每一次调用都带着发起者的身份、按这个人的权限被检查、在动作需要签字时暂停等待审批，并最终落进审计账本。',
  explanation: [
    '这一层之所以存在，是因为把 Agent 接进系统最快的做法——把一个现成接口包成工具——包住的往往是为可信后端调用方设计的东西。这类接口默认授权已经在上游发生过，所以它自己什么都不验证。直接暴露给 Agent，它就以服务的触及范围去查询，而不是提问那个人的；写操作被归到服务名下，而不是任何一个可追责的人身上；这些调用也压根不进业务审计账本。把裸接口包成工具，可能等于悄悄给 Agent 发了一张超级用户通行证。',
    '「受治理」具体必须落成四条性质。身份要传递下去：调用以发起它的那个人的身份执行，并且在一个 Agent 调用另一个 Agent 时继续如此——越权往往不出现在第一跳，而是悄悄出现在第二跳。强制点要落在运行时而不是提示词里：越权调用应当被当场拦下，而不是被劝阻。审批要成为动作本身的属性：有实质影响的操作，无论从哪个入口被够到，都会停下来等一次签字。所有调用要落进同一本账：这样「谁看了什么」事后才有答案。还有第五条性质，它决定前四条能不能扛住规模——工具应当由业务对象的定义派生出来，因为手写的身份检查撑不过几十个服务端和几百个工具。',
    'ObjectStack 把这一层从元数据里生成出来。一个动作只有在它自己的定义里主动选择开放，才会成为 Agent 可调用的工具——ai.exposed 标志默认为 false，什么都不写的动作就是没有开放；而已开放的动作，走的是与 REST 路由同一道权限闸门、同一个动作执行器，而不是另开一条并行通道。有一条诚实的边界对任何实现都成立，包括这一个：受治理工具层约束的是影响半径，不是判断力。它能阻止 Agent 去做它无权做的事，却拦不住一次「在权限之内但本不该做」的操作。那个缺口属于评测、高风险动作的审批阈值和流程设计。',
  ],
  alsoKnownAs: ['受治理的工具', '受控动作层', '策略强制工具层'],
  relatedTerms: [
    'mcp',
    'governed-runtime',
    'agent-guardrails',
    'ai-agent-runtime',
    'approval-workflow',
    'audit-trail',
  ],
  articleSlugs: [
    'mcp-governed-tool-layer',
    'objectos-action-tools',
    'objectos-agent-permission-boundaries',
  ],
  pageSlugs: ['mcp', 'permissions', 'approvals'],
} satisfies GlossaryTerm;

export default term;
