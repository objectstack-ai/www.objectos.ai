import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'governed-runtime',
  term: '受治理运行时',
  title: '受治理运行时是什么：定义，以及 AI Agent 为什么需要它',
  description:
    '受治理运行时在每一次读取、写入和工具调用上强制执行身份、权限、审批与审计——让 AI Agent 与它所代表的那个人处在同一条边界之内。',
  definition:
    '受治理运行时是这样一种应用运行时：它在每一次读取、写入和工具调用上强制执行身份、权限、审批和审计日志，使 AI Agent 与它所代表的那个人受完全相同的规则约束。',
  explanation: [
    '多数 AI 集成把规则放错了地方。写在提示词里的「绝不要修改已关闭的商机」只是一句建议；而一个握着数据库凭据的服务账号根本没有规则可言。受治理运行时把边界挪到模型下面：Agent 调用一个工具，运行时解析出真正的操作身份，套用行级与字段级权限，把有实质影响的操作路由到审批，并写下审计记录——无论调用方是浏览器会话、API 客户端还是一次 MCP 工具调用。',
    '这也是为什么「自托管 AI」通常问的是运行时，而不是模型。权重跑在哪里，远不如「哪个组件决定 Agent 能读什么、能执行哪个动作、事后留下什么证据」重要。聊天界面无法可靠地执行这些判断；掌握数据访问路径的那一层才可以。',
    '有一个很实际的检验：如果明天把这个 Agent 换成一个用同一套登录凭据的实习生，系统的安全性会有任何变化吗？在受治理运行时里答案是不会——因为强制执行从来就不依赖调用方自觉。',
  ],
  alsoKnownAs: ['受治理的应用运行时', '策略强制运行时'],
  relatedTerms: ['application-metadata'],
  articleSlugs: [
    'ai-agent-business-data-security-boundaries',
    'when-ai-agent-deletes-production-database',
    'self-hosted-ai-app-platform',
  ],
  pageSlugs: ['permissions', 'trust-center', 'mcp'],
} satisfies GlossaryTerm;

export default term;
