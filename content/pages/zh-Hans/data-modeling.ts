import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'data-modeling',
    navLabel: '数据建模',
    title: 'ObjectOS 数据建模：从业务对象到数据库与 API',
    description:
      '对象、关系、校验和公式自动变成表、迁移、查询语言和 REST API——支持 Postgres、MySQL、SQLite、MongoDB 等，现有数据库可原地联邦接入。',
    eyebrow: '数据建模',
    heroTitle: '描述业务对象，数据库和 API 随之而来。',
    lead:
      '每个业务系统都始于同一个问题：我们要管理什么？在 ObjectOS 里，答案是一份紧凑的对象定义——表、迁移、查询引擎和 REST 端点由运行时供给，而不是手写。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看流程自动化', href: '/en/automation/' },
    metrics: [
      { value: '5+', label: '数据库：Postgres、MySQL、SQLite、Turso、MongoDB' },
      { value: '0', label: '手写端点——REST API 直接来自元数据' },
      { value: '原地', label: '现有数据库无需迁移即可联邦接入' },
    ],
    artifact: {
      eyebrow: '模型即源码',
      title: '一份对象定义，schema、规则和 API 全在里面。',
      body:
        '字段、关系、校验和计算值都住在一份可审阅的定义里。运行时把它变成表和迁移，在每条写路径上执行规则，并对外提供 API——同一份定义，AI Agent 也能读懂并扩展。',
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
        title: '团队和 Agent 都读得懂的一套业务词汇',
        copy:
          '定义贴着业务的说法走：客户、订单、工单、审批。没有 ORM 类，没有散落各处的 schema 文件。',
        items: [
          {
            title: '对象与关系',
            body: '为记录及其关联建模——lookup、主从、多对多——引用完整性由运行时替你维护。',
          },
          {
            title: '校验与规则',
            body: '约束以表达式的形式声明在它所保护的字段旁边，在每条写路径上生效：UI、API、导入和 AI 工具。',
          },
          {
            title: '公式与默认值',
            body: '计算字段和动态默认值用全平台统一的表达式语言，派生值在任何地方都保持一致。',
          },
          {
            title: '类型化的业务字段',
            body: '货币、百分比、选择列表、日期、文件与关系——字段类型自带语义，UI、API 和 Agent 都能理解。',
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
            body: 'schema 变更在 Postgres、MySQL、SQLite、Turso 或 MongoDB 上自动成为迁移——没有 SQL 脚本要写、要排序。',
          },
          {
            title: '查询引擎',
            body: '一种查询语言，支持过滤、关系与聚合，每个请求都被权限模型约束。',
          },
          {
            title: 'REST API',
            body: '对象存在的那一刻，CRUD、批量与发现端点就存在了——带版本、带文档、带权限校验。',
          },
          {
            title: '现有数据库，联邦接入',
            body: '内省一个外部数据库，把它的表挂载为对象——在不迁移数据的前提下加上权限、流程和 AI 工具。',
          },
          {
            title: '文件存储',
            body: '附件与文档存放在本地磁盘或 S3 兼容存储上，访问控制跟随其所属的记录。',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', '运行时供给'],
      rows: [
        ['管理客户与订单', '对象、字段、关系', '表、迁移、引用完整性'],
        ['把脏数据挡在门外', '表达式形式的校验规则', '在 UI、API、导入和 AI 写入上强制执行'],
        ['给移动团队一个 API', '不用多写——对象本身就够了', '带权限与发现的 REST 端点'],
        ['继续用手里的 ERP 数据库', '一份联邦定义', '外部表挂载为受治理对象'],
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
        question: '数据层在开源版里吗？',
        answer:
          '在。对象、关系、校验、公式、迁移、查询引擎、REST API、联邦与文件存储都是开源运行时的一部分。',
      },
    ],
  } satisfies MarketingPage;

export default page;
