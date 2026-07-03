import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'analytics',
    navLabel: '报表与分析',
    title: 'ObjectOS 分析：在受治理对象上做仪表盘与报表',
    description:
      '在应用运行的同一批受治理对象上做聚合、时间序列、漏斗和仪表盘——配备小部件式仪表盘设计器与分节式报表设计器，权限感知是构造出来的。',
    eyebrow: '报表与分析',
    heroTitle: '答案来自记录系统本身——而不是第二套数据栈。',
    lead:
      '财务要看按套餐分的 MRR 逐月走势，运营要一块 SLA 仪表盘。常见做法是导出到 BI 工具——权限、口径和新鲜度在那里悄悄漂移。ObjectOS 直接在受治理对象上回答这些问题：数据集定义一次，仪表盘渲染，设计器组装。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看数据建模', href: '/en/data-modeling/' },
    metrics: [
      { value: '3 种', label: '查询策略：原生 SQL、ObjectQL、内存计算' },
      { value: '同一套规则', label: '行级与字段级权限作用于每一张报表' },
      { value: '0 ETL', label: '报表跑在实时对象上，不是导出的副本' },
    ],
    artifact: {
      eyebrow: '指标即元数据',
      title: '度量定义一次，处处复用。',
      body:
        '数据集为业务命名它关心的度量与维度。仪表盘、报表和 AI 提问都解析到同一份定义——"月度经常性收入"只有一个意思。',
      code: `import { defineDataset, defineReport } from '@objectstack/spec/ui';

export const RevenueDataset = defineDataset({
  name: 'billing_revenue',
  label: 'Revenue',
  object: 'billing_subscription',
  dimensions: [
    { name: 'plan', label: 'Plan', field: 'plan', type: 'string' },
    { name: 'month', label: 'Month', field: 'renews_at', type: 'date', dateGranularity: 'month' },
  ],
  measures: [
    { name: 'mrr', label: 'MRR', aggregate: 'sum', field: 'mrr', format: '0.0' },
    { name: 'active_subs', label: 'Active Subscriptions', aggregate: 'count' },
  ],
});

export const MrrByPlan = defineReport({
  name: 'billing_mrr_by_plan',
  label: 'MRR by Plan',
  type: 'summary',
  drilldown: true,
  dataset: 'billing_revenue',
  rows: ['plan'],
  values: ['mrr'],
});`,
    },
    sections: [
      {
        id: 'primitives',
        eyebrow: '报表原语',
        title: '先回答财务的问题，然后继续往下问',
        copy:
          '分析服务把问题编译到合适的策略——能下推 SQL 的下推，必须运行时算的就在运行时算。',
        items: [
          {
            title: '聚合与分组',
            body: '"按套餐分的 MRR"就是数据集在一个维度上的求和——求和、计数、平均与分组穿透关系，由查询引擎完成。',
          },
          {
            title: '时间序列',
            body: '逐月续约曲线、逐周工单量——在任何日期维度上按日、周、月做时区感知的分桶。',
          },
          {
            title: '漏斗',
            body: '试用 → 付费、申请 → 批准 → 履约——跨状态字段与流程的阶段转化。',
          },
          {
            title: '仪表盘',
            body: 'MRR 图、活跃订阅计数器和流失表组成一块可分享的仪表盘，就在它们汇总的记录旁边。',
          },
          {
            title: '语义数据集',
            body: '命名的度量与维度让每个团队——和每条 AI 回答——算出来的是同一组数字。',
          },
        ],
      },
      {
        id: 'designer',
        eyebrow: '仪表盘与报表设计器',
        title: '点选组装，存成元数据',
        copy:
          '仪表盘和报表在开源控制台的设计器中打开——你点出来的东西，存下来就是 Agent 写的那种可审阅定义。',
        items: [
          {
            title: '仪表盘设计器',
            body: '在网格画布上点一个小部件，检查器随即打开——标题、图表类型、数据绑定；从 10+ 种类型里添加新部件——设计过程中图表渲染的就是真实数据。',
          },
          {
            title: '报表设计器',
            body: '分节式版面——报表头、明细、分组与页脚——把文本、字段、图表、表格元素摆上画布，预览开关随时检查产出。',
          },
          {
            title: '下钻到记录',
            body: '开了 drilldown 的报表，审阅者点一下 MRR 数字就落到背后那批订阅上——下钻路上权限照常生效。',
          },
          {
            title: '一个数据集喂饱所有',
            body: '设计器把小部件绑定到数据集而不是裸表——仪表盘、报表和 AI 回答共用同一个"收入"的定义。',
          },
        ],
      },
      {
        id: 'governed',
        eyebrow: '治理是设计出来的',
        title: '报表尊重的是应用同一套权限',
        copy:
          '因为分析跑在运行时内部，权限模型不是事后补丁——它就是执行路径。',
        items: [
          {
            title: '权限感知的结果',
            body: '大区经理的仪表盘只聚合他大区的行；脱敏字段永远不会漏进图表或导出。',
          },
          {
            title: 'AI 与人同一套规则',
            body: 'AI Ask 在与每块仪表盘相同的权限内回答——聊天答案绝不会比屏幕多露一行。',
          },
          {
            title: '没有导出漂移',
            body: '报表读的是实时对象而不是过期副本——会上的数字就是系统里的数字。',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', '运行时供给'],
      rows: [
        ['按套餐、按月看 MRR', '一个带度量与维度的数据集', '编译的查询、图表与缓存'],
        ['运营仪表盘加一张 KPI 卡', '什么都不用写——在设计器里点出来', '小部件检查器、实时数据、存为元数据'],
        ['按阶段看转化', '一张按阶段字段的汇总报表', '阶段间计算与趋势'],
        ['问 AI"三季度收官如何？"', '不用新写——数据集就够了', '同样受治理的数字，在聊天里'],
      ],
    },
    checklistTitle: '分析评审应确认',
    checklist: [
      '关键度量在数据集里定义一次，而不是每张图各定义一份。',
      '仪表盘继承行级与字段级权限。',
      '时间序列使用一致的时区与日历。',
      'AI 回答与报表解析到同一份定义。',
      '没有任何管道把数据导出到治理更弱的副本。',
    ],
    faqs: [
      {
        question: '这会取代我们的 BI 工具吗？',
        answer:
          '对业务对象上的运营报表，你不再需要一套独立栈：仪表盘、漏斗和时间序列都跑在平台内。跨系统的数据仓库场景 ObjectOS 与之共存——联邦与 API 让受治理对象很容易被消费。',
      },
      {
        question: '仪表盘和报表设计器在开源版里吗？',
        answer:
          '在。小部件式仪表盘设计器、分节式报表设计器、下钻、聚合、时间序列、漏斗与语义数据集都是开源运行时的一部分，权限执行与平台其他部分完全一致。',
      },
    ],
  } satisfies MarketingPage;

export default page;
