import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'ai',
    navLabel: 'AI Build & Ask',
    title: 'AI Build 与 Ask：用自然语言创建和问询业务应用',
    description:
      'ObjectOS AI Build 把一句描述变成可审阅的 ObjectStack 元数据；AI Ask 在用户权限内回答实时数据问题，开源 ObjectStack 则通过 MCP 接入你自己的 AI。',
    eyebrow: 'AI Build & Ask',
    heroTitle: '描述变更，审阅 diff，上线应用。',
    lead:
      '开发者把 Claude Code 这类编码 Agent 指向源码项目来构建 ObjectStack 应用。ObjectOS 为团队增加第二条路径：业务人员在云端或企业版中通过对话描述变更。两条路径都产出同一种类型化 ObjectStack 元数据，并运行在同一受治理运行时上；ObjectOS AI Ask 则在提问者本人的权限内回答实时数据并执行动作。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '看 Agent 如何编写元数据', href: '/en/agent-developer/' },
    metrics: [
      { value: '2 条路径', label: '在源码里用编码 Agent，或在云端用对话' },
      { value: '<150k tokens', label: '完整 CRM 全应用（含 UI），一个上下文窗口可容纳' },
      { value: '0 后门', label: '每次 AI 动作都在用户权限与审计之内' },
    ],
    artifact: {
      eyebrow: '构建闭环',
      title: '从一句话到一个受治理的应用。',
      body:
        '这个闭环的设计原则是：速度永远不越过控制——AI 快速起草，决定权在人。',
      steps: [
        '描述：“跟踪供应商合同，带续约提醒，超过 5 万美元的合同需要审批。”',
        '你的 AI——源码里的编码 Agent，或产品内的构建器——起草对象、字段、视图和续约流程。',
        '结构性变更以紧凑、可读的 diff 进入审批队列。',
        '你批准——ObjectStack 运行时派生并上线表、API、界面、自动化和审计。',
        'AI Ask 随即可以为每个用户回答合同问题，范围以其可见数据为界。',
      ],
    },
    sections: [
      {
        id: 'build',
        eyebrow: 'AI Build',
        title: '两种构建方式，同一份可审阅的定义',
        copy:
          '无论 AI 是在你的代码仓库里工作，还是在 ObjectOS 聊天面板里工作，产出都是由人审阅并拥有的同一种 ObjectStack 类型化元数据。完整 CRM 全应用小于 150k tokens：对象、流程、权限等业务逻辑小于 100k，UI 元数据约 50k。',
        items: [
          {
            title: '在源码里，用你的编码 Agent',
            body: '开发者把 Claude Code、Cursor 或任意编码 Agent 指向项目；它以源码文件写出全部类型的元数据，在浏览器中预览、以 git diff 审阅——类 Salesforce DX 的工作流。',
          },
          {
            title: '在云端，用对话',
            body: 'ObjectOS 云端与企业版中，业务人员在聊天里描述变更；产品内构建器把它起草成 ObjectStack 元数据并实时预览——Airtable 式的易用，配运行时治理。',
          },
          {
            title: '可视化设计器微调',
            body: '对象、视图、流程、仪表盘各有设计器：字段拖拽排序、流程画布、看板列配置——审阅模式还能对比草稿与已发布版本的 diff，AI 起草的内容不碰文件就能调好。',
          },
          {
            title: '结构变更先过审批',
            body: '任何改变系统形状的变更都会带着完整 diff 排队等人签核——两条路径都一样。',
          },
        ],
      },
      {
        id: 'ask',
        eyebrow: 'AI Ask',
        title: '对实时业务数据的回答与行动',
        copy:
          'AI Ask 在产品内工作，面对的是真实记录而不是过期导出——而且它看到的永远不会比提问者本人更多。',
        items: [
          {
            title: '向业务提问',
            body: '“哪些合同这个季度续约？”“哪些供应商两次错过 SLA？”——从实时对象中回答，权限全程生效。',
          },
          {
            title: '执行已批准的动作',
            body: 'Ask 可以触发元数据显式暴露的动作——指派、升级、生成摘要——都在用户权限范围内。',
          },
          {
            title: '一切留痕',
            body: '每次 Ask 的查询与动作都和人的操作一样写入审计日志，审查方式完全相同。',
          },
        ],
      },
      {
        id: 'byo-ai',
        eyebrow: '开源 ObjectStack',
        title: '自带你的 AI，治理保持一致',
        copy:
          '开源 ObjectStack 有意不内置助手：你的编码 Agent 以源码文件编写同样的元数据，任意 MCP 客户端通过它的开放运行时查询同样受治理的对象。',
        items: [
          {
            title: 'Agent 写源码文件',
            body: 'Claude Code、Cursor 或任意编码 Agent 直接编辑仓库中的 ObjectStack 定义，审阅就是普通的 git diff。',
          },
          {
            title: '任意 MCP 客户端可问询',
            body: 'MCP 服务器把对象、查询和动作暴露给你运行的任何模型——托管的或完全本地的。',
          },
          {
            title: '同一运行时，同一规则',
            body: '权限、审批和审计的执行方式完全一致。版本只改变谁来托管 AI，从不改变治理方式。',
          },
        ],
      },
    ],
    table: {
      columns: ['版本', 'AI 如何构建', 'AI 如何回答'],
      rows: [
        ['开源 ObjectStack', '编码 Agent 编辑元数据源码文件，以 git diff 审阅', '任意 MCP 客户端用你自己的模型查询受治理对象'],
        ['ObjectOS 云端 Team 与 Business', '产品内 AI Build 起草变更，审批把守结构', '产品内 AI Ask 回答问题并执行已批准动作'],
        ['ObjectOS 企业版', '同上，另支持私有部署与自带模型', '同上，另支持本地模型与内部身份系统'],
      ],
    },
    faqs: [
      {
        question: '怎么防止 AI 弄坏生产环境？',
        answer:
          'ObjectStack 运行时强制三条保证：结构性变更必须经人审批；每个动作都在发起用户的权限之内执行；一切都被审计。ObjectOS 把这套审批与审计闭环提供在生产产品中，因此 AI 可以快速起草，却无法悄悄上线。',
      },
      {
        question: '用的是什么模型？',
        answer:
          '云端版本由托管模型驱动 AI Build 与 Ask。开源 ObjectStack 自带模型——任意兼容 MCP 的客户端或本地模型。企业版支持在私有部署中自带模型。',
      },
    ],
  } satisfies MarketingPage;

export default page;
