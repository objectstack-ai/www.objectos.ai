import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'app-ui',
    navLabel: '应用界面',
    title: 'ObjectOS 应用界面：从元数据渲染的权限感知界面',
    description:
      '表单、视图和仪表盘直接从元数据渲染——按每个用户的权限成形、实时更新，并可在带实时预览的视图设计器里用列检查器与筛选构建器微调。',
    eyebrow: '应用界面',
    heroTitle: '没人手写的界面，人人信得过的视图。',
    lead:
      '拿一个客服工作台来说：客服在网格里处理待办工单，主管拖着按状态分组的看板，所有人都会看截止日历。在 ObjectOS 里这是一份视图定义——按用户渲染、随记录实时变化，还能在视图设计器里调整，不碰一个文件。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看报表与分析', href: '/en/analytics/' },
    metrics: [
      { value: '0', label: '列表、表单、详情页——没有手写前端' },
      { value: '按用户', label: '行、字段与动作按权限过滤' },
      { value: '实时', label: '记录一变，打开的界面跟着变' },
    ],
    artifact: {
      eyebrow: '界面即元数据',
      title: '视图是可审阅定义的一部分。',
      body:
        '这就是那个工作台：带列的网格、按状态分组的看板、截止日历，还有一个存好的"待办工单"列表——一份定义。Agent 加一个字段时，受影响的界面就在同一份小 diff 里，而不是另开一张前端工单。',
      code: `import { defineView } from '@objectstack/spec';

const data = { provider: 'object' as const, object: 'support_case' };

export const CaseViews = defineView({
  list: {
    label: 'All Cases',
    type: 'grid',
    data,
    columns: [
      { field: 'subject' },
      { field: 'customer' },
      { field: 'priority' },
      { field: 'status' },
      { field: 'due_date' },
    ],
    appearance: {
      allowedVisualizations: ['grid', 'kanban', 'calendar'],
    },
    kanban: { groupByField: 'status', columns: ['subject', 'customer', 'priority'] },
    calendar: { startDateField: 'due_date', titleField: 'subject', colorField: 'status' },
  },
  listViews: {
    open: {
      label: 'Open Cases',
      type: 'grid',
      data,
      columns: [{ field: 'subject' }, { field: 'customer' }, { field: 'priority' }],
      filter: [{ field: 'status', operator: 'equals', value: 'open' }],
    },
  },
});`,
    },
    sections: [
      {
        id: 'surfaces',
        eyebrow: '从元数据渲染',
        title: '把工作台一个面一个面看过去',
        copy:
          '类型化字段自带控件与格式，生成的界面外观行为天然一致——不需要先做一个设计系统项目。',
        items: [
          {
            title: '视图与列表',
            body: '同一批工单渲染成网格、看板或日历——带排序、"待办工单"这样的保存筛选和批量操作——声明出来的，不是搭出来的。',
          },
          {
            title: '表单与详情页',
            body: '工单表单跟着字段类型和校验走：优先级渲染成带颜色的选择列表，必填就是必填。界面永远不会和规则脱节。',
          },
          {
            title: '仪表盘',
            body: '工单量和 SLA 计数器就摆在它们所汇总的队列旁边，共享同一份定义与权限。',
          },
          {
            title: '导航与应用',
            body: '客服团队得到一个聚焦的工作区——它的对象、视图、仪表盘组成一个应用——而不是一个巨大的后台。',
          },
          {
            title: '多语言界面',
            body: '标签、格式与翻译按 locale 解析，一份定义服务所有地区。',
          },
        ],
      },
      {
        id: 'designer',
        eyebrow: '视图设计器',
        title: '看着界面调界面',
        copy:
          '视图在开源 ObjectStack 控制台的实时预览设计器中打开——预览用的就是真实渲染器加载草稿，所见即所发布。',
        items: [
          {
            title: '边改边看的实时预览',
            body: '改一列，网格立刻变——设计器用真实数据渲染列表、看板、日历和表单视图，改动过程全程可见。',
          },
          {
            title: '列与筛选检查器',
            body: '在检查器里增删、隐藏、重排列；可视化地搭嵌套与/或筛选——"待办、紧急、未指派"不用写一行查询。',
          },
          {
            title: '积木式详情页',
            body: '详情页由块组成——分节、字段、按钮——每块带可见性规则，在画布上拖到位。',
          },
          {
            title: '响应式是默认项',
            body: '页面设计器预览手机、平板、桌面三档断点，带组件树和撤销/重做——布局决策始终看得见。',
          },
        ],
      },
      {
        id: 'permission-aware',
        eyebrow: '权限感知是构造出来的',
        title: '一份界面定义，每个用户各见其面',
        copy:
          '界面不是手工做的千人千面——它由权限模型塑形。这正是生成式 UI 值得信任的原因。',
        items: [
          {
            title: '能看到的行',
            body: '客服的网格只有本团队的工单，审计员的网格是全部——同一份界面定义，行级规则在查询内部生效。',
          },
          {
            title: '能读到的字段',
            body: '被脱敏、被隐藏的字段在表格、表单、导出和详情页里保持脱敏——由运行时执行，不靠前端自觉。',
          },
          {
            title: '能执行的动作',
            body: '"升级"按钮只在用户权限与记录状态都允许时出现——服务端把关，不只是藏起来。',
          },
          {
            title: '实时协作',
            body: '记录变更、评论和动态流式推送到打开的界面，团队面对的是同一幅实时图景。',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', '运行时供给'],
      rows: [
        ['给客服团队一个工作台', '视图、表单和一份应用定义', '渲染的界面、导航、保存筛选'],
        ['主管要看板，客服要网格', '一份视图、两种可视化', '同一份定义，两种都渲染'],
        ['经理看得比客服多', '对象上的行级与字段级规则', '同一个界面，按用户成形'],
        ['运营调列不用发版', '什么都不用写——设计器编辑的就是同一份元数据', '实时预览、检查器、草稿'],
      ],
    },
    checklistTitle: '界面评审应确认',
    checklist: [
      '界面声明在元数据里，而不是被 fork 成定制代码。',
      '每个列表和仪表盘都遵守行级规则。',
      '脱敏字段在导出和详情页里保持脱敏。',
      '动作有权限把关，而不只是被隐藏。',
      '新字段通过同一份被审阅的 diff 到达界面。',
    ],
    faqs: [
      {
        question: '还能自己写定制界面吗？',
        answer:
          '能。生成的界面覆盖重复度最高的 CRUD 主体，同一套 API 与权限模型支撑你添加的任何定制前端——定制界面绕不过治理。',
      },
      {
        question: '视图设计器在开源 ObjectStack 里吗？',
        answer:
          '在。带实时预览的视图设计器、列与筛选检查器、积木式页面画布和响应式页面设计器都随开源 ObjectStack 控制台发布——连同元数据渲染的视图、表单、仪表盘、导航、多语言与实时更新。',
      },
    ],
  } satisfies MarketingPage;

export default page;
