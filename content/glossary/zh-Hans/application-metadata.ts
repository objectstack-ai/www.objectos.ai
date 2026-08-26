import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'application-metadata',
  term: '应用元数据',
  title: '应用元数据是什么：定义、示例，以及 AI 为什么需要它',
  description:
    '应用元数据是一个业务应用的类型化定义——对象、字段、权限、流程、API——以源文件形式保存，由运行时直接执行，而不是生成一堆应用代码。',
  definition:
    '应用元数据是一个业务应用的结构化、类型化定义——它的对象、字段、关系、视图、权限、流程、动作和 API——以源文件形式保存，由运行时直接读取并执行，而不是先生成一份应用代码。',
  explanation: [
    '真正的区别不在「配置还是代码」，而在运行时发生了什么。生成代码是一次性导出：生成器吐出控制器、表单和迁移脚本之后，这些产物就开始各自漂移，最初的意图也随之丢失。元数据则始终是活的源头。你在定义文件里改一条权限规则，API、界面、审计日志和 Agent 工具会同时跟着变——因为这四者都是在每一次请求时从那一条声明推导出来的。',
    '这个性质正是元数据适合作为 AI 目标格式的原因。一个完整的 CRM 用元数据表达大约 15 万 token，编码 Agent 可以在一个上下文窗口里装下整个系统，而不是对着一个只能抽样阅读的代码库猜。又因为定义是类型化并经过 schema 校验的，写错字段名或写了一个不存在的权限值，会在校验关卡直接失败，而不是变成上线后的运行时惊喜。',
    '它同样决定了 AI 写的软件能不能被审阅。Agent 加一个审批环节时，diff 就是定义文件里可读的几行——而不是分散在控制器、模板、迁移脚本和测试里的四百行。一个有业务决策权、但对框架内部毫无兴趣的审阅者，能读懂这份 diff，明白「谁可以做什么」变成了什么样，然后签字。',
  ],
  alsoKnownAs: ['应用程序元数据', '元数据驱动的应用定义'],
  relatedTerms: ['governed-runtime'],
  articleSlugs: [
    'natural-language-to-app-metadata',
    'business-app-in-16k-tokens',
    'low-code-vs-ai-native-app-platform',
  ],
  pageSlugs: ['data-modeling', 'platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
