import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'templates',
    navLabel: '模板',
    title: 'ObjectStack 模板：受治理 AI 应用的起步应用',
    description:
      '从八个可 fork 的 ObjectStack 模板起步——todo、contracts、procurement、compliance、helpdesk、content、hr、project——而不是让 AI 生成一整个应用代码库。',
    eyebrow: '模板',
    heroTitle: '从一个运营模型开始，而不是一个空白应用。',
    lead:
      '模板给编码 Agent 一个具体的目标：对象模型、视图、权限、流程、动作与 AI 工具——可以复制、审阅、改造，并直接在 ObjectOS 中运行。',
    primary: { label: '打开模板源码', href: 'https://github.com/objectstack-ai/templates' },
    secondary: { label: '查看产品导览', href: '/en/product-tour/' },
    metrics: [
      { value: '8 个模板', label: 'todo、contracts、procurement、compliance、helpdesk、content、hr、project' },
      { value: '一层定义', label: '对象、UI、流程、API 与 AI 工具出自同一份定义' },
      { value: '可审阅', label: '每个模板的变更都是元数据 diff' },
    ],
    artifact: {
      eyebrow: '模板解剖',
      title: '每个模板都应能当作一个业务系统来读',
      body:
        '有用的 AI 应用模板不只是几张界面。它写明让业务流程可治理的对象、权限、流程流转、审批、报表与 Agent 工具。',
      steps: [
        '对象模型：记录、关系、状态与校验。',
        '权限模型：谁能读、写、审批、导出或转授。',
        '流程模型：流转、SLA 计时器、升级规则与审批。',
        'Agent 工具：通过 MCP 或产品内 AI 暴露的安全读取与动作。',
      ],
    },
    sections: [
      {
        id: 'catalog',
        eyebrow: '目录',
        title: '默认目录里有什么',
        copy:
          '八个可 fork 的起步应用，每个都是真实成形的应用：在 Marketplace 一键安装，或用 CLI 克隆得到可扩展的 TypeScript 代码库。Apache-2.0，fork 无需请示。你的 Agent 可以 fork 一份、修改元数据，然后开一个 diff 供人审阅。',
        items: [
          {
            title: 'todo',
            body: '可 fork 的起步应用：任何“待办事项，按某种方式分组”的工具。',
            meta: '任务与项目',
          },
          {
            title: 'contracts',
            body: '可 fork 的起步应用：审批 + 文档 AI。',
            meta: '合同全生命周期管理，含 AI 条款提取',
          },
          {
            title: 'procurement',
            body: '可 fork 的起步应用：审批链 + 收货。',
            meta: '供应商、PO、三单匹配',
          },
          {
            title: 'compliance',
            body: '可 fork 的起步应用：证据收集工作流。',
            meta: 'SOC 2 / ISO 27001 控制项',
          },
          {
            title: 'helpdesk',
            body: '可 fork 的起步应用：工单 + SLA + AI 副驾。',
            meta: 'AI 优先的客户支持',
          },
          {
            title: 'content',
            body: '可 fork 的起步应用：生命周期 + 指标。',
            meta: '编辑日历 + 渠道 ROI',
          },
          {
            title: 'hr',
            body: '可 fork 的起步应用：以人为中心的应用。',
            meta: '通讯录、组织架构、休假',
          },
          {
            title: 'project',
            body: '可 fork 的起步应用：项目管理工具。',
            meta: '项目 / 任务 / 里程碑跟踪',
          },
        ],
      },
      {
        id: 'why',
        eyebrow: '模板为什么重要',
        title: '模板同时压缩生成时间与评审风险',
        copy:
          'AI 造软件最安全的路径不是一个空白提示词，而是一个评审者认得出对象与规则的既有运营模型。',
        items: [
          {
            title: 'Agent 继承命名习惯',
            body: '对象、字段、流程与权限的命名保持一致，后续变更对人和模型都更容易。',
          },
          {
            title: '评审者拿到熟悉的基线',
            body: '模板给 IT 和业务负责人一个已知参照来对比 diff，而不是一个陌生的代码库。',
          },
          {
            title: '团队保有所有权',
            body: '模板以源码元数据的形式住在你的仓库里，改造它不用等供应商的路线图。',
          },
        ],
      },
    ],
    table: {
      columns: ['路径', '你做什么', '你得到什么'],
      rows: [
        ['从 Marketplace 安装', '打开 Marketplace，搜索模板，点击 Install，刷新', '应用出现在导航里——记录、视图、流程、权限全部就绪'],
        ['fork 为代码库', 'pnpm dlx @objectstack/cli create my-app --template todo', '一个自包含的 pnpm 包：*.object.ts、*.view.ts、*.flow.ts 文件，可编辑、lint、测试、提交'],
        ['发布你的 fork', 'pnpm build，然后 os package publish', '你的 marketplace——安装你的 fork 的客户拿到的是你的品牌与你的修改'],
      ],
    },
    checklistTitle: '模板评审清单',
    checklist: [
      '评审者能在五分钟内看懂对象模型吗？',
      '高风险动作与建议是否分离？',
      '默认权限是否保守？',
      '审计事件命名是否清晰？',
      '模板能否先用示例数据跑起来，再碰生产？',
    ],
    faqs: [
      {
        question: '模板是生产系统吗？',
        answer:
          '它们是起点。生产部署前应评审对象命名、权限、流程、模型路由、示例数据、集成边界与审计策略。',
      },
      {
        question: '我的 Agent 能改模板吗？',
        answer:
          '能——这正是模板的意义：给 Agent 一个明确的目标格式，给评审者一份小的元数据 diff。',
      },
    ],
  } satisfies MarketingPage;

export default page;
