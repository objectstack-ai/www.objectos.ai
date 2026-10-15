import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning['zh-Hans'];

const page = {
    slug: 'agent-developer',
    navLabel: 'Agent 开发指南',
    title: 'Agent 开发指南：AI 如何编写 ObjectStack 元数据',
    description:
      '编码 Agent 的 README 路径：npm create objectstack@latest 写入 AGENTS.md，Agent 编写类型化元数据，os validate 拒掉运行时会失败的东西，npx os dev --ui 把应用渲染出来供人审阅。',
    eyebrow: 'Agent 开发指南',
    heroTitle: '别教每个开发者手写应用。教你的 Agent 目标格式。',
    lead:
      `${p.t2}Agent 是作者，你是审阅者：脚手架写入 AGENTS.md，让 Agent 一开始就带着协议规则；Strict TypeScript、Zod schema 与 os validate 会在无效输出进入运行时前将其拒掉；整个应用小到 AI 能整体装下。`,
    primary: { label: '照 README 路径走', href: 'https://github.com/objectstack-ai/objectstack#try-it-in-five-minutes' },
    secondary: { label: '查看模板模式', href: '/en/templates/' },
    metrics: [
      { value: 'AGENTS.md', label: '由脚手架写入，Agent 一开始就带着协议规则' },
      { value: '4 道闸门', label: '类型化、校验、审阅、治理——横在 Agent 与你的用户之间' },
      { value: '整体装下', label: '应用小到 AI 能整体装下——README 自带的示例 CRM 可端到端读完' },
    ],
    artifact: {
      eyebrow: 'README 路径',
      title: '三条命令，你的 Agent 就有了规则',
      body:
        '脚手架安装 AI skills 包并写入 AGENTS.md，Agent 一开始就带着协议规则，而不是泛泛的“给我写点 TypeScript”先验。在 Claude Code、Cursor 或 Copilot 里描述需求；Agent 写的是类型化元数据而不是代码库，闸门会拒掉运行时会静默失败的东西。然后在浏览器里预览真实应用，并在一份读得懂的 diff 上提出下一次变更。',
      code: `# 1 · 创建项目：安装 AI skills 包，写入 AGENTS.md
npm create objectstack@latest my-app && cd my-app

# 2 · 用 Claude Code（或 Cursor、Copilot……）打开它，描述业务需求：
#    “搭一个支持台。加一个 ticket 对象，有 subject、description、
#     priority 选择和 status 选择。加一个只在未解决工单上显示的
#     Resolve 动作。加一个 Open tickets 列表视图和 Support 导航组。
#     做完跑 npm run validate。”

# 3 · 在浏览器里预览
npx os dev --ui   # -> http://localhost:3000/_console/`,
    },
    sections: [
      {
        id: 'workflow',
        eyebrow: '工作流',
        title: 'Agent 编写的开发闭环',
        copy:
          '闭环刻意保持简单：给 Agent 完整的当前定义与运营上下文，让它编辑类型化元数据，跑 validation gate，然后在部署前由人审阅业务权限。',
        items: [
          {
            title: '1. 提供运营上下文',
            body: '把业务流程、对象命名、权限边界、流程状态、集成约束与完整的当前定义交给 Agent。应用小到 AI 能整体装下——README 自带的示例 CRM 可端到端读完——因此可以被整体检视，无需从碎片里拼凑。',
            meta: '上下文',
          },
          {
            title: '2. 生成元数据',
            body: 'Agent 以 Strict TypeScript 编辑对象、视图、流程、动作、仪表盘、翻译与工具定义，而不是生成应用胶水代码。',
            meta: '编写',
          },
          {
            title: '3. 通过 validation gate',
            body: '以 Strict TypeScript 模式编译，逐项用 Zod schema 校验定义，再检查权限、必填标签、示例数据、对象查询与流程流转。',
            meta: '验证',
          },
          {
            title: '4. 审阅权限',
            body: '人审的是权限变化：数据访问、写权、审批绕行、导出与 AI 工具暴露。',
            meta: '批准',
          },
        ],
      },
      {
        id: 'patterns',
        eyebrow: '模式',
        title: 'Agent 应该生成什么',
        copy:
          '最好的生成式变更用清晰的业务概念命名，并让运行时权力保持显式。',
        items: [
          {
            title: '对象与字段',
            body: '使用业务命名、关系、校验、索引与生命周期规则，与真实运营一一对应，并符合已发布的 Zod schema。',
          },
          {
            title: '视图与动作',
            body: '从对象模型生成列表、表单、看板、仪表盘与动作元数据，而不是一次性界面。',
          },
          {
            title: '流程与审批',
            body: '把流转与审批闸门显式定义出来，运行时才能对人和 Agent 一体执行。',
          },
          {
            title: 'Agent 工具',
            body: '只通过 MCP 暴露有边界的对象查询与动作，带策略检查和便于审计的命名。',
          },
        ],
      },
    ],
    table: {
      columns: ['旧的开发表面', 'Agent 编写的 ObjectStack 表面', '评审者要问的'],
      rows: [
        ['控制器代码', '对象动作元数据', '谁能调用这个动作？'],
        ['自定义鉴权检查', '对象、行级与字段级权限', '数据权限发生了什么变化？'],
        ['手搭的界面', '视图与表单元数据', '这个界面支撑哪条流程？'],
        ['临时拼的 AI 提示词', '策略感知的工具契约', '模型能读什么、能改什么？'],
      ],
    },
    checklistTitle: 'Agent 编写的 ObjectStack diff 评审清单',
    checklist: [
      'Agent 是否检视了完整的当前应用，而不是根据碎片猜测缺失状态？',
      '变更是否通过 Strict TypeScript 编译、Zod schema 校验与 validation gate？',
      '这份 diff 改的是业务权限，还是只有呈现？',
      '对象与字段命名是否稳定且贴合领域？',
      '读、写、导出与工具的默认值是否保守？',
      '敏感动作的审批闸门是否显式？',
      '测试或示例数据能否演示这条流程？',
      '未来的 Agent 能否检索并复用同一个模式？',
    ],
    faqs: [
      {
        question: '开发者还需要懂 ObjectStack 吗？',
        answer:
          '需要，但主要任务变了。人负责设计边界、审阅 diff、写测试、维护示例；重复性的元数据编写更多交给 Agent。',
      },
      {
        question: '任何编码 Agent 都能写 ObjectStack 吗？',
        answer:
          '只要有清晰的文档、示例、规则、测试与完整的当前定义，任何强力编码 Agent 都能使用这个格式。Strict TypeScript、Zod schema 与 validation gate 会在部署前给出确定性反馈；通过后，同一应用可自托管于 ObjectStack，也可由 ObjectOS 使用同一开源运行时代为运营。',
      },
    ],
  } satisfies MarketingPage;

export default page;
