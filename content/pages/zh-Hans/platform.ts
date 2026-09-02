import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'platform',
    navLabel: '平台总览',
    title: 'ObjectOS 平台：AI 编写的业务应用背后的全部能力',
    description:
      'ObjectOS 是 ObjectStack 应用的商业生产平台，把产品内 AI、部署与团队运营建立在开放、受治理的 ObjectStack 运行时之上。',
    eyebrow: '平台总览',
    heroTitle: '一个业务系统需要的一切，随时可投入生产。',
    lead:
      '你的 Agent 用紧凑、类型化的 ObjectStack 元数据描述业务。开放的 ObjectStack 运行时派生数据库、API、权限感知的界面、自动化流程、审批队列和仪表盘，并在每次调用中强制治理。ObjectOS 把这个基础打包成用于构建、部署与生产运营的商业平台。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看产品导览', href: '/en/product-tour/' },
    metrics: [
      { value: '25+', label: '每个已部署应用背后的运行时服务' },
      { value: '6', label: '能力域，从数据建模到报表分析' },
      { value: '<150k tokens', label: '完整 CRM 全应用（含 UI），一个上下文窗口可容纳' },
    ],
    artifact: {
      eyebrow: 'Agent 编写的类型化元数据',
      title: '一份定义，背后是一整个应用。',
      body:
        '这就是一个受治理订单对象的形状。权限集、审批流程、视图和 AI 工具都是同一套可审阅 ObjectStack 目标格式中的并列定义，表、API、界面、队列和审计则由 ObjectStack 运行时派生。',
      code: `import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Order = ObjectSchema.create({
  name: 'sales_order',
  label: 'Order',
  fields: {
    customer: Field.lookup('crm_account', { label: 'Customer', required: true }),
    total: Field.currency({ label: 'Total', min: 0 }),
    discount: Field.percent({ label: 'Discount', max: 30 }),
    status: Field.select({
      label: 'Status',
      trackHistory: true,
      options: [
        { label: 'Draft', value: 'draft', default: true },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Fulfilled', value: 'fulfilled' },
      ],
    }),
  },
});`,
    },
    sections: [
      {
        id: 'capabilities',
        eyebrow: '能力地图',
        title: '六大能力域，一个开放、受治理的运行时',
        copy:
          '一个成熟业务平台该有的能力这里都有——区别在于：ObjectStack 定义由你的 AI 编写，组装由它的运行时完成。',
        items: [
          {
            title: '数据建模',
            body: '对象、关系和校验规则自动变成表、迁移、查询语言和 REST API——支持 Postgres、MySQL、SQLite、MongoDB 等多种数据库。',
            meta: '指南',
            href: '/en/data-modeling/',
          },
          {
            title: '应用界面',
            body: '表单、视图和仪表盘直接从元数据渲染，每个用户看到的恰好是权限允许的内容——无需手写前端。',
            meta: '指南',
            href: '/en/app-ui/',
          },
          {
            title: '流程自动化',
            body: '支持持久暂停与恢复的流程，记录变更、定时、API 三类触发器，后台作业，以及可靠的 Webhook 投递。',
            meta: '指南',
            href: '/en/automation/',
          },
          {
            title: '审批',
            body: '多级审批，按用户、角色、团队和层级解析审批人，支持升级与决策期间的记录锁定。',
            meta: '指南',
            href: '/en/approvals/',
          },
          {
            title: '权限与安全',
            body: '角色、行级、字段级三层控制，配合记录共享、租户隔离和不可变审计日志。',
            meta: '指南',
            href: '/en/permissions/',
          },
          {
            title: '报表与分析',
            body: '在同一批受治理对象上做聚合、时间序列、漏斗和仪表盘——不用再接一套独立的 BI。',
            meta: '指南',
            href: '/en/analytics/',
          },
        ],
      },
      {
        id: 'ai-native',
        eyebrow: '为 AI 而设计',
        title: '让 Agent 来写，让人来审',
        copy:
          '上面每一项 ObjectStack 能力都以元数据定义——这正是「元数据驱动开发」在作者是 AI 时依然成立的原因：整体可装入上下文的定义、可读 diff 与运行时强制执行。ObjectOS 则为团队增加产品内 AI 与生产运营体验。',
        items: [
          {
            title: 'AI Build & Ask',
            body: '在 ObjectOS 云端与企业版中，用自然语言描述变更并审阅 diff，或对实时业务数据提问——始终在登录用户的权限之内。',
            meta: '指南',
            href: '/en/ai/',
          },
          {
            title: '工具与 MCP',
            body: '对象、查询和动作成为受策略约束的工具，供 Claude、Cursor 或任意 MCP 客户端调用——以元数据声明，无需手写胶水代码。',
            meta: '指南',
            href: '/en/mcp/',
          },
          {
            title: '设计器与控制台',
            body: '16+ 个开源 ObjectStack 管理界面——对象设计器、流程画布、审批收件箱、权限矩阵、审计查看器——AI 起草的一切，人都能微调。',
          },
          {
            title: '审阅闭环',
            body: '结构性变更以紧凑 diff 的形式进入审批队列，人签核之后运行时才会发布任何东西。',
            meta: '指南',
            href: '/en/product-tour/',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', 'ObjectStack 运行时派生'],
      rows: [
        ['一个带 API 的客户数据库', '对象、字段、关系', '表、迁移、查询语言、REST 端点'],
        ['给每个团队各自的界面', '视图、表单、仪表盘', '尊重每个用户权限的渲染 UI'],
        ['折扣生效前先审批', '一条带审批节点的流程规则', '审批队列、升级、记录锁定、审计'],
        ['能回答实时数据的 AI', '工具与动作契约', '以登录用户为边界的策略化 MCP 工具'],
      ],
    },
    faqs: [
      {
        question: '开源 ObjectStack 包含哪些能力？',
        answer:
          '本页的运行时能力——数据、界面、自动化、审批、权限、报表分析——都属于开源 ObjectStack 目标格式与运行时。AI 自带（BYO-AI）：编码 Agent 以源码文件编写元数据，任意 MCP 客户端可以查询你的对象。产品内 AI Build 与 Ask 是 ObjectOS 云端与企业版能力。',
      },
      {
        question: '能跑在我们自己的基础设施里吗？',
        answer:
          '可以。开源 ObjectStack 运行时可自托管。ObjectOS 企业版也支持私有部署到 VPC、本地服务器或隔离网络，并提供本地模型、内部身份系统、自有密钥管理与企业支持。',
      },
    ],
  } satisfies MarketingPage;

export default page;
