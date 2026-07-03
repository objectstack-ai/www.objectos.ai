import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'data-modeling',
    navLabel: '数据建模',
    title: 'ObjectOS 数据建模：从业务对象到数据库与 API',
    description:
      '对象、关系、校验和公式自动变成表、迁移、查询语言和 REST API——配备对象设计器、ER 图和数据源同步，现有数据库可原地联邦接入。',
    eyebrow: '数据建模',
    heroTitle: '描述业务对象，数据库和 API 随之而来。',
    lead:
      '以一个订阅计费系统为例：客户、套餐、席位、MRR、续约日、状态。在 ObjectOS 里，这就是一份紧凑的对象定义——表、迁移、查询引擎和 REST 端点由运行时供给；你的 Agent 能写它，你的团队能在对象设计器里逐字段微调它。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看流程自动化', href: '/en/automation/' },
    metrics: [
      { value: '20+', label: '字段类型——文本、货币、百分比、lookup、公式、文件' },
      { value: '0', label: '手写端点——REST API 直接来自元数据' },
      { value: '原地', label: '现有数据库无需迁移即可联邦接入' },
    ],
    artifact: {
      eyebrow: '模型即源码',
      title: '一份对象定义，schema、规则和 API 全在里面。',
      body:
        '这就是那个订阅对象：字段、关系、校验和历史追踪都在一份可审阅的定义里。运行时把它变成表和迁移，在每条写路径上执行规则，并对外提供 API——同一份定义，Agent 能读懂扩展，设计器能打开微调。',
      code: `import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Subscription = ObjectSchema.create({
  name: 'billing_subscription',
  label: 'Subscription',
  searchableFields: ['plan', 'status'],
  fields: {
    customer: Field.lookup('crm_account', { label: 'Customer', required: true }),
    plan: Field.select({
      label: 'Plan',
      options: [
        { label: 'Starter', value: 'starter', default: true },
        { label: 'Team', value: 'team' },
        { label: 'Business', value: 'business' },
      ],
    }),
    seats: Field.number({ label: 'Seats', min: 1 }),
    mrr: Field.currency({ label: 'MRR', scale: 2, min: 0 }),
    renews_at: Field.date({ label: 'Renews at' }),
    status: Field.select({
      label: 'Status',
      trackHistory: true,
      options: [
        { label: 'Active', value: 'active', default: true, color: '#10B981' },
        { label: 'Past due', value: 'past_due', color: '#F59E0B' },
        { label: 'Churned', value: 'churned', color: '#EF4444' },
      ],
    }),
  },
});`,
    },
    sections: [
      {
        id: 'modeling',
        eyebrow: '为业务建模',
        title: '把订阅系统一步步建出来',
        copy:
          '定义贴着业务的说法走：客户、套餐、续约。没有 ORM 类，没有散落各处的 schema 文件——下面每一步都停留在同一份定义里。',
        items: [
          {
            title: '对象与关系',
            body: '订阅 lookup 到客户，发票主从挂在订阅下，多对多标签随取随用——引用完整性由运行时维护，删错父记录这种事故不再发生。',
          },
          {
            title: '校验与规则',
            body: '"席位数不能低于已分配用户""MRR 不能为负"——约束以表达式声明在字段旁边，在 UI、API、导入和 AI 工具的每条写路径上生效。',
          },
          {
            title: '公式与默认值',
            body: '"年化收入 = MRR × 12""续约日默认下单日 + 365"——计算字段和动态默认值用全平台同一种表达式语言，任何入口算出来都一致。',
          },
          {
            title: '类型化的业务字段',
            body: '货币自带精度与符号，百分比自带上限，选择列表自带颜色与历史追踪——字段类型携带语义，UI、API 和 Agent 都能直接理解。',
          },
        ],
      },
      {
        id: 'designer',
        eyebrow: '对象设计器',
        title: '字段级微调，图上看关系，一键接存量库',
        copy:
          'Agent 写的定义，管理员在开源控制台里打开就是可视化界面——改一个字段不需要读一行代码。',
        items: [
          {
            title: '字段编辑器',
            body: '点"+ 添加字段"从 20+ 类型中挑选，拖拽行排序，字段分组成节；右侧检查器改标签、必填、选项和颜色，改动即成草稿。',
          },
          {
            title: '发布前看 diff',
            body: '设计器的审阅模式把草稿与已发布版本逐项对比——新增、修改一目了然，和审 Agent 的 diff 是同一种体验。',
          },
          {
            title: 'ER 图设计器',
            body: '实体框、带基数标注的关系连线、自动布局和小地图——整个数据模型一张图看懂，拖一条线就是一个新关系。',
          },
          {
            title: '数据源同步',
            body: '连接表单按驱动自动生成，点"测试连接"验证，再从远程表清单里勾选——introspect 现有 ERP/CRM 数据库，外部表直接生成受治理对象。',
          },
        ],
      },
      {
        id: 'runtime-surfaces',
        eyebrow: '从模型到运行的系统',
        title: '那些你再也不用写的部分',
        copy:
          '下面这一切都由定义生成并保持同步——这正是 AI 编写的变更能始终保持为一份小而可审的 diff 的原因。',
        items: [
          {
            title: '表与迁移',
            body: '给订阅加一个"折扣"字段，Postgres、MySQL、SQLite、Turso 或 MongoDB 上的迁移自动生成——没有 SQL 脚本要写、要排序。',
          },
          {
            title: '查询引擎',
            body: '"本月续约且 MRR 大于 1 万的订阅"——一种查询语言搞定过滤、关系与聚合，每个请求都被权限模型约束。',
          },
          {
            title: 'REST API',
            body: '对象存在的那一刻，CRUD、批量与发现端点就存在了——移动团队第二天就能开工，带版本、带文档、带权限校验。',
          },
          {
            title: '文件存储',
            body: '合同 PDF、发票附件存放在本地磁盘或 S3 兼容存储上，访问控制跟随其所属的记录。',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', '运行时供给'],
      rows: [
        ['管理订阅与客户', '对象、字段、关系', '表、迁移、引用完整性'],
        ['席位数不能超卖', '一条表达式校验规则', '在 UI、API、导入和 AI 写入上强制执行'],
        ['给移动团队一个 API', '不用多写——对象本身就够了', '带权限与发现的 REST 端点'],
        ['继续用手里的 ERP 数据库', '一份联邦定义', 'introspect 外部表，挂载为受治理对象'],
      ],
    },
    checklistTitle: '数据评审应确认',
    checklist: [
      '每个对象都对应一个有归属人的业务概念。',
      '校验写在定义里，而不是写在界面里。',
      '派生值是公式，而不是复制粘贴的逻辑。',
      '外部系统走联邦或集成，而不是被复刻一份。',
      'API 访问与 UI 走同一套权限模型。',
    ],
    faqs: [
      {
        question: '支持哪些数据库？',
        answer:
          '目前支持 Postgres、MySQL、SQLite、Turso 和 MongoDB，数据层基于驱动架构。联邦还能在不搬移数据的情况下挂载外部数据库的表。',
      },
      {
        question: '对象设计器和 ER 图在开源版里吗？',
        answer:
          '在。对象设计器、ER 数据模型设计器、数据源同步，连同对象、关系、校验、公式、迁移、查询引擎、REST API 与文件存储，都是开源版的一部分。',
      },
    ],
  } satisfies MarketingPage;

export default page;
