import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'platform',
    navLabel: '平台总览',
    title: 'ObjectOS 平台：AI 编写的业务应用背后的全部能力',
    description:
      '一个受治理运行时，供给每个 AI 编写的业务应用所需的数据库、API、界面、自动化、审批、权限与报表分析。',
    eyebrow: '平台总览',
    heroTitle: '一个业务系统需要的一切，由运行时供给。',
    lead:
      '你的 Agent 用紧凑的元数据描述业务，ObjectOS 把它变成可运行的系统：数据库与 API、权限感知的界面、自动化流程、审批队列和仪表盘——治理在运行时强制执行，而不是停留在演示片里。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看产品导览', href: '/en/product-tour/' },
    metrics: [
      { value: '25+', label: '每个已部署应用背后的运行时服务' },
      { value: '6', label: '能力域，从数据建模到报表分析' },
      { value: '1,792 行', label: '一个完整 CRM 的元数据，其余由运行时供给' },
    ],
    artifact: {
      eyebrow: 'Agent 写的那 1%',
      title: '一份定义，背后是一整个应用。',
      body:
        '这就是一个受治理订单对象的形状。权限集、审批流程、视图和 AI 工具是同一套可审阅栈里的并列定义——而表、API、界面、队列和审计由运行时供给。',
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
        title: '六大能力域，一个受治理运行时',
        copy:
          '一个成熟业务平台该有的能力这里都有——区别在于：定义由你的 AI 编写，组装由运行时完成。',
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
          '上面每一项能力都是元数据驱动的——这正是平台可被 AI 编写的原因：定义小、diff 可读、运行时强制执行。',
        items: [
          {
            title: 'AI Build & Ask',
            body: '用自然语言描述变更并审阅 diff，或对实时业务数据提问——始终在登录用户的权限之内。',
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
      columns: ['业务需求', 'AI 编写', '运行时供给'],
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
          '本页的运行时能力——数据、界面、自动化、审批、权限、报表分析——都属于开源 ObjectStack 平台。AI 自带（BYO-AI）：编码 Agent 以源码文件编写元数据，任意 MCP 客户端可以查询你的对象。产品内的 AI Build 与 Ask 助手在云端与企业版提供。',
      },
      {
        question: '能跑在我们自己的基础设施里吗？',
        answer:
          '可以。ObjectOS 支持自托管，可运行在 VPC、本地服务器或隔离网络中；企业版还支持本地模型、内部身份系统和自有密钥管理。',
      },
    ],
  } satisfies MarketingPage;

export default page;
