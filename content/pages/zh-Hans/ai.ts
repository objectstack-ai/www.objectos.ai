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
      '开发者把 Claude Code 这类编码 Agent 指向源码项目来构建 ObjectStack 应用。ObjectOS 为团队增加第二条路径：业务人员在 ObjectOS Cloud（托管版）或 Enterprise（自管版）中通过对话描述变更。两条路径都产出同一种类型化 ObjectStack 元数据，并运行在同一受治理运行时上；ObjectOS AI Ask 则在提问者本人的权限内回答实时数据并执行动作。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '看 Agent 如何编写元数据', href: '/en/agent-developer/' },
    metrics: [
      { value: '2 条路径', label: '在源码里用编码 Agent，或在云端用对话' },
      { value: '整体装下', label: '应用小到 AI 能整体装下——README 自带的示例 CRM 可端到端读完' },
      { value: 'Enterprise', label: 'AI 动作审计、护栏与权限限定属于 ObjectOS Enterprise' },
    ],
    artifact: {
      eyebrow: '构建闭环',
      title: '从一句话到一个受治理的应用。',
      body:
        '这个闭环的设计原则是：速度永远不越过控制——AI 快速起草，决定权在人。',
      steps: [
        '描述：“跟踪供应商合同，带续约提醒，超过 5 万美元的合同需要审批。”',
        '你的 AI——源码里的编码 Agent，或产品内的构建器——起草对象、字段、视图和续约流程。',
        '在源码里，变更是一份由你审阅的紧凑 git diff；在 ObjectOS Cloud 中，对已上线且已有记录的应用所做的变更存为草稿，由人来发布。',
        '合并或发布之后，ObjectStack 运行时派生并上线表、API、界面、自动化和审计。',
        'AI Ask 随即可以为每个用户回答合同问题，范围以其可见数据为界。',
      ],
    },
    sections: [
      {
        id: 'build',
        eyebrow: 'AI Build',
        title: '两种构建方式，同一份可审阅的定义',
        copy:
          '无论 AI 是在你的代码仓库里工作，还是在 ObjectOS 聊天面板里工作，产出都是由人审阅并拥有的同一种 ObjectStack 类型化元数据。整份定义小到 Agent 能整体装下：objectstack README 自带的示例 CRM——对象、视图、仪表盘、线索转化流程、权限集、动作、翻译——可以端到端读完，并在一次变更里整体重构。',
        items: [
          {
            title: '在源码里，用你的编码 Agent',
            body: '开发者把 Claude Code、Cursor 或任意编码 Agent 指向项目；它以源码文件写出全部类型的元数据，在浏览器中预览、以 git diff 审阅——类 Salesforce DX 的工作流。',
          },
          {
            title: '在云端，用对话',
            body: 'ObjectOS Cloud 与 Enterprise 版中，业务人员在聊天里描述变更；产品内构建器把它起草成 ObjectStack 元数据并实时预览——Airtable 式的易用，配运行时治理。',
          },
          {
            title: '可视化设计器微调',
            body: '对象、视图、流程、仪表盘各有设计器：字段拖拽排序、流程画布、看板列配置——审阅模式还能对比草稿与已发布版本的 diff，AI 起草的内容不碰文件就能调好。',
          },
          {
            title: '已上线应用的改动由人发布',
            body: '在源码里，Agent 的改动是一份由你审阅、合并的 git diff。在 ObjectOS Cloud 中，构建器会立即发布第一次构建；应用上线并有了记录之后，改动先存为草稿，等人发布后才生效。',
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
            title: '执行向 AI 开放的动作',
            body: 'Ask 可以执行管理员向 AI 开放的动作——指派、升级、生成摘要——都在用户权限范围内。',
          },
          {
            title: '一切留痕',
            body: '在 ObjectOS Enterprise 中，Ask 的查询与动作和人的操作一样写入审计日志，审查方式完全相同。',
          },
        ],
      },
      {
        id: 'ask-sources',
        eyebrow: 'AI Ask',
        title: '问数：每个数字都标明来源',
        copy:
          '用自然语言问业务问题，再核对答案里的任何一个数字。Ask 内置于 ObjectOS Cloud 与 Enterprise（Enterprise 版为预览版）。',
        items: [
          {
            title: '每个数字都带来源说明',
            body: '每个答案都标明数字从哪来：哪个对象、哪些筛选条件、统计了什么、怎么分组。',
          },
          {
            title: '附上记录链接',
            body: '答案提到的记录都附有链接，数字背后是哪些记录，点开就能看到。',
          },
          {
            title: '只读你能看的',
            body: 'Ask 以提问者本人的权限读取数据，答案不会用到这个人无权看到的记录或字段。',
          },
        ],
      },
      {
        id: 'record-edits',
        eyebrow: 'AI 改数据',
        title: 'AI 改数据，先等你确认',
        copy:
          '让产品内 AI 新建或修改一条记录时，你确认之前什么都不会保存。内置于 ObjectOS Cloud 与 Enterprise（Enterprise 版为预览版）。',
        items: [
          {
            title: '先列出新旧值',
            body: 'AI 在一张卡片上提出修改，逐个列出字段；修改已有记录时，新值旁边就是原来的值。',
          },
          {
            title: '你确认后，以你的权限执行',
            body: '只有提出请求的本人能确认这次修改。确认后它以这个人的权限执行，记录级、字段级权限和校验规则都和保存表单时一样生效。',
          },
          {
            title: '一次只改一条记录',
            body: '产品内 AI 每次确认只改一条记录，不能删除记录，也不能批量修改；遇到这类需求，它会引导你去打开那条记录或列表。',
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
            body: 'npm create objectstack@latest 生成项目并写入 AGENTS.md，Claude Code、Cursor 或任意编码 Agent 一开始就带着协议规则；它直接编辑仓库中的 ObjectStack 定义，npx os dev --ui 把它渲染出来，审阅就是普通的 git diff。',
          },
          {
            title: '任意 MCP 客户端可问询',
            body: 'MCP 服务器把对象、查询和动作暴露给你运行的任何模型——托管的或完全本地的。',
          },
          {
            title: '同一运行时，治理按版本',
            body: '在开源运行时上，MCP 工具调用在调用者权限内执行，它们对记录的读取和写入都会被审计。ObjectOS 按版本提供产品内 AI：Free（免费方案）可试用，Team（团队方案）提供产品内 AI Build 与 Ask；Enterprise 提供同样的 AI（预览版），另加 AI 治理——界面内 AI 每次工具调用的审计、护栏、权限限定。',
          },
        ],
      },
    ],
    table: {
      columns: ['版本', 'AI 如何构建', 'AI 如何回答'],
      rows: [
        ['开源 ObjectStack', '编码 Agent 编辑元数据源码文件，以 git diff 审阅', '任意 MCP 客户端用你自己的模型查询受治理对象'],
        ['ObjectOS Cloud Free', '产品内 AI Build 试用', '产品内 AI Ask 试用'],
        ['ObjectOS Cloud Team', '产品内 AI Build 起草变更；对已上线且已有记录的应用所做的变更存为草稿，由人来发布', '产品内 AI Ask 回答时标明来源，并提出由用户确认的记录修改'],
        ['ObjectOS Enterprise（自管或按合同）', '同上（预览版），另加 AI 治理：界面内 AI 每次工具调用的审计、护栏、权限限定；部署在你自己的基础设施上，另支持自带模型', '同上（预览版），Ask 的工具调用受审计与护栏约束，另支持本地模型与内部身份系统'],
      ],
    },
    faqs: [
      {
        question: '怎么防止 AI 弄坏生产环境？',
        answer:
          '对任何经 MCP 工作的 Agent，ObjectStack 运行时都在发起用户的权限之内执行每次工具调用，并审计它对记录的读取和写入。在产品内，AI 提出的记录修改要等用户确认后才执行；在 ObjectOS Cloud 中，对已上线且已有记录的应用所做的变更存为草稿，由人来发布。ObjectOS Enterprise 为产品内 AI 另加 AI 治理——每次工具调用的审计、护栏、权限限定；外部 MCP Agent 不在这项逐次审计的范围内。',
      },
      {
        question: '用的是什么模型？',
        answer:
          'ObjectOS Cloud 由托管模型驱动 AI Build 与 Ask。开源 ObjectStack 自带模型——任意兼容 MCP 的客户端或本地模型。自管部署的 ObjectOS Enterprise 自带模型或密钥。',
      },
    ],
  } satisfies MarketingPage;

export default page;
