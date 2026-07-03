import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'templates',
    navLabel: '模板',
    title: 'ObjectStack 模板：受治理 AI 应用的起步应用',
    description:
      '从可审阅的 ObjectStack 模板起步——Helpdesk、合同、采购、CRM、制造与员工服务——而不是让 AI 生成一整个应用代码库。',
    eyebrow: '模板',
    heroTitle: '从一个运营模型开始，而不是一个空白应用。',
    lead:
      '模板给编码 Agent 一个具体的目标：对象模型、视图、权限、流程、动作与 AI 工具——可以复制、审阅、改造，并直接在 ObjectOS 中运行。',
    primary: { label: '打开模板源码', href: 'https://github.com/objectstack-ai/templates' },
    secondary: { label: '查看产品导览', href: '/en/product-tour/' },
    metrics: [
      { value: '6 个起步', label: '客服、合同、采购、CRM、制造、员工服务' },
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
        title: '常见企业工作流的起步应用',
        copy:
          '这些是参考模板，不是锁死的产品。你的 Agent 可以 fork 一份、修改元数据，然后开一个 diff 供人审阅。',
        items: [
          {
            title: 'Helpdesk 客服',
            body: '工单、客户、SLA、队列、摘要、建议回复、知识检索、升级审批。',
            meta: '客服运营',
          },
          {
            title: '合同管理',
            body: '相对方、义务、续约、条款提取、审批阶段、红线批注、审计轨迹。',
            meta: '法务运营',
          },
          {
            title: '采购',
            body: '供应商、采购申请、PO、收货、三单匹配、预算检查、例外审批。',
            meta: '支出管控',
          },
          {
            title: 'CRM 案件管理',
            body: '客户、商机、案件、活动、归属、风险信号、用户级 AI 摘要。',
            meta: '营收与服务',
          },
          {
            title: '制造服务',
            body: '资产、工单、备件、维护历史、停机报告、现场服务建议。',
            meta: '运营',
          },
          {
            title: '员工服务',
            body: '申请、制度、审批、路由、员工数据边界、内部知识检索。',
            meta: '内部应用',
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
      columns: ['模板', '包含的对象', 'Agent 安全动作'],
      rows: [
        ['Helpdesk', '工单、客户、SLA、知识文章', '摘要、分类、建议回复、升级送审'],
        ['合同', '合同、相对方、条款、义务', '提取元数据、标记风险、起草续约任务'],
        ['采购', '供应商、采购申请、PO、收货单', '校验政策、准备审批、匹配例外'],
        ['CRM', '客户、联系人、商机、案件', '客户摘要、识别风险、建议下一步'],
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
