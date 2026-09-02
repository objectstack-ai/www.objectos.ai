import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'agent-guardrails',
  term: 'Agent 护栏',
  title: 'Agent 护栏是什么：定义，以及哪些护栏 Agent 可以直接绕过',
  description:
    'Agent 护栏是对「AI Agent 可以做什么」施加的各种约束——提示词规则、输出过滤、权限检查、审批闸门、审计——而真正决定它们价值的，是其中哪些 Agent 可以视而不见。',
  definition:
    'Agent 护栏是对 AI Agent 可以做什么所施加的各种约束——从提示词指令、输出过滤，到运行时的权限检查、审批闸门与审计日志——它们分成两类：Agent 可以视而不见的，和它绕不过去的。',
  explanation: [
    '同一个词下面装着两类东西。建议型护栏作用在模型身上：系统提示词里的规则、为劝阻某次调用而写的工具描述、输出校验器、拒答训练。它们改变的是坏动作发生的概率。强制型护栏作用在系统身上：一次调用以谁的身份执行、行级与字段级的权限检查、把动作挂起直到有人签字的审批、无论有没有人在看都会写下的审计记录。它们改变的是「这件事到底做不做得成」。把两类当成一回事，正是一个系统上线时所谓的「护栏」最后只剩提示词里一段话的原因。',
    '一个问题就能把它们分开：如果 Agent 决意要做那件被禁止的事，它做得到吗？凡是答案取决于模型是否配合的，就是建议型。写在系统提示词里的「绝不要修改已关闭的商机」是一句建议，长上下文、一种不常见的措辞、或一个态度笃定的用户都可能把它绕过去；同一条规则表达成字段级权限，就成了调用方没法争辩的事实。建议型护栏依然有它的位置——它降低尝试发生的频率，也让模型在模棱两可的请求上表现更好——但它绝不该是 Agent 与一次破坏性写入之间唯一的东西。',
    '两类护栏都回答不了「这个动作是不是对的」。一个本来就合法持有退款权限的客服 Agent，可以发出一笔本不该发出的退款，而强制型护栏恰恰会放行，因为这个动作在权限之内。这个缺口要靠评测、对高影响动作设置审批阈值、以及按「可撤销」来设计流程来补，而不是靠在工具面上再加约束。所以一份值得评审的护栏清单，会为每一条规则记下两件事：它属于哪一类，以及它被违反时可观察到的后果是什么。',
  ],
  alsoKnownAs: ['AI 护栏', 'Agent 安全控制', 'Agent 约束'],
  relatedTerms: [
    'governed-runtime',
    'governed-tool-layer',
    'ai-agent-runtime',
    'declared-vs-enforced',
    'row-level-security',
    'approval-workflow',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'when-ai-agent-deletes-production-database',
  ],
  pageSlugs: ['permissions', 'approvals', 'trust-center'],
} satisfies GlossaryTerm;

export default term;
