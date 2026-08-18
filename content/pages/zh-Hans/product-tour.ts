import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'product-tour',
    navLabel: '产品导览',
    title: 'ObjectOS 产品导览：从一句需求到受治理的应用',
    description:
      '了解团队如何在 ObjectOS 中把业务需求变成 ObjectStack 类型化元数据，经人审阅 diff 后投入受治理的生产运营。',
    eyebrow: '产品导览',
    heroTitle: '从一句需求，到一个受治理的应用。',
    lead:
      'ObjectStack 是 AI 编写企业软件的开放、类型化目标格式与运行时：Agent 编写紧凑的元数据，人审阅 diff，运行时派生可重复的应用表面。ObjectOS 是用于构建、部署与运营这些应用的商业生产平台。',
    primary: { label: '把你的 Agent 指向 ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: '查看信任模型', href: '/en/trust-center/' },
    metrics: [
      { value: '<150k tokens', label: '完整 CRM 全应用（含 UI），一个上下文窗口即可容纳' },
      { value: '<100k tokens', label: '对象、流程、权限与其他业务逻辑' },
      { value: '约 50k tokens', label: '完整 CRM 的 UI 元数据' },
    ],
    artifact: {
      eyebrow: '审阅面',
      title: 'diff 就是产品边界。',
      body:
        'ObjectStack 不要求审阅者去审计一整个生成的应用代码库，而是给 Agent 一个开放、类型化的定义层：对象、字段、视图、权限、流程、动作、API 和工具。',
      code: `import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Case = ObjectSchema.create({
  name: 'support_case',
  label: 'Case',
  fields: {
    subject: Field.text({ label: 'Subject', required: true, searchable: true }),
    customer: Field.lookup('crm_account', { label: 'Customer' }),
    priority: Field.select({
      label: 'Priority',
      options: [
        { label: 'Low', value: 'low', default: true },
        { label: 'Normal', value: 'normal' },
        { label: 'Urgent', value: 'urgent', color: '#EF4444' },
      ],
    }),
    status: Field.select({
      label: 'Status',
      trackHistory: true,
      options: [
        { label: 'New', value: 'new', default: true },
        { label: 'Triage', value: 'triage' },
        { label: 'Waiting', value: 'waiting' },
        { label: 'Resolved', value: 'resolved' },
      ],
    }),
  },
});`,
    },
    sections: [
      {
        id: 'flow',
        eyebrow: '工作方式',
        title: '受治理的构建闭环',
        copy:
          '这个产品闭环围绕两类真正的读者设计：编写系统的 AI，和必须理解并批准它的人。',
        items: [
          {
            title: '1. 描述业务变更',
            body: '从一个真实的运营需求出发：工单队列、审批链、采购流程、客户门户，或任何已经有负责人和规则的流程。',
            meta: '人的意图',
          },
          {
            title: '2. Agent 编写元数据',
            body: '编码 Agent 编辑必须符合已发布 Zod schema 的 Strict TypeScript ObjectStack 定义，而不是手工生成控制器、界面、迁移、API 和权限胶水。',
            meta: 'AI 编写',
          },
          {
            title: '3. 审阅者签核',
            body: 'Validation gate 通过后，审阅者检查一份紧凑的 diff：字段名、关系、权限、状态流转、流程规则和工具暴露。',
            meta: '人的审阅',
          },
          {
            title: '4. 运行时供给表面',
            body: 'ObjectStack 运行时从元数据派生表、视图、表单、ObjectQL、API、审计轨迹、MCP 工具和管理界面；ObjectOS 负责将应用投入生产运营。',
            meta: '运行时层',
          },
          {
            title: '5. Agent 在策略内运作',
            body: 'AI 通过受治理的工具查询与行动，这些工具继承身份、记录规则、字段规则、审批与审计日志。',
            meta: '受治理的 AI',
          },
        ],
      },
      {
        id: 'connect',
        eyebrow: '现有系统',
        title: '加一层对象模型，而不是替换记录系统',
        copy:
          '企业软件的大部分价值已经锁在数据库、ERP、CRM、工单、文件和自研系统里。ObjectStack 给 Agent 一个覆盖这些资产的显式对象模型；ObjectOS 则给团队一个运营这些应用的生产平台。',
        items: [
          {
            title: '连接数据库与 API',
            body: '把现有记录映射成业务对象、关系、计算字段和动作，不必推倒重来做迁移。',
          },
          {
            title: '权限保持显式',
            body: '每个对象都写明谁能读、写、审批、导出、自动化，或把它暴露为工具。这份权限在审阅中始终可见。',
          },
          {
            title: '在其上生长新表面',
            body: '同一份定义可以支撑内部应用、仪表盘、门户、流程、API、报表和 AI Agent 工具。',
          },
        ],
      },
    ],
    table: {
      columns: ['层', 'AI 编写', 'ObjectStack 运行时派生'],
      rows: [
        ['数据模型', '对象、字段、关系、校验', '表、迁移、ObjectQL、生成的 API'],
        ['体验', '视图、表单、仪表盘、动作', '渲染 UI、导航、状态、访问检查'],
        ['治理', '角色、行级规则、字段规则、审批', '运行时执行、审计日志、用户级工具'],
        ['AI 面', 'Agent 工具、技能、提示词、动作契约', 'MCP 暴露、策略检查、执行记录'],
      ],
    },
    checklistTitle: '审阅者应能回答',
    checklist: [
      '哪些业务对象发生了变化？',
      '哪些人、角色和 Agent 获得了新权限？',
      '哪些动作在执行前需要审批？',
      '哪些数据可以离开运行时（如果有）？',
      '变更之后审计日志里会出现什么？',
    ],
    faqs: [
      {
        question: 'ObjectOS 是低代码平台吗？',
        answer:
          '不是。低代码通常优化的是人拖拽界面的效率。ObjectOS 是 ObjectStack 应用的商业生产平台；ObjectStack 才是开放、类型化的目标格式与运行时，让元数据可审阅，并在每次调用中强制治理。',
      },
      {
        question: 'ObjectStack 与 ObjectOS 有什么区别？',
        answer:
          'ObjectStack 以开放、版本化元数据定义并运行应用。ObjectOS 是围绕 ObjectStack 应用提供产品内 AI、团队运营、部署选项与企业支持的商业生产平台。',
      },
    ],
  } satisfies MarketingPage;

export default page;
