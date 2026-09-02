import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'permissions',
    navLabel: '权限与安全',
    title: 'ObjectOS 权限：为 AI 编写的应用提供角色、行级与字段级控制',
    description:
      '基于角色、行级与字段级的访问控制，配备权限矩阵编辑器与审计日志查看器，支持记录共享、租户隔离——对人和 AI Agent 同等强制执行。',
    eyebrow: '权限与安全',
    heroTitle: '谁能看什么、谁能改什么——在运行时强制执行。',
    lead:
      '拿一个销售组织来说：代表只能看自己团队的客户，成本价字段对他们脱敏，经理能看整个大区，审计随时要查"这条折扣谁改的"。在 ObjectOS 里，这套边界是一份可审阅的定义——在每一次查询、API 调用和 AI 工具调用上强制执行。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看信任模型', href: '/en/trust-center/' },
    metrics: [
      { value: '3 层', label: '对象、记录、字段三级控制，一个模型' },
      { value: '按用户', label: 'AI Agent 继承登录用户的权限' },
      { value: '不可变', label: '读、写、授权与工具调用全程留痕' },
    ],
    artifact: {
      eyebrow: '权限即元数据',
      title: '审阅者真的读得懂的权限。',
      body:
        '这就是那个销售场景：支持工单可读可建、客户只读，成本相关字段只读、SSN 完全不可见，行级规则限定"只看本团队"。运行时在所有入口统一执行——UI、API 和 AI 工具。',
      code: `export const SupportPermissionSet = {
  name: 'support_agent',
  label: 'Support Agent',
  objects: {
    support_case: { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: false },
    crm_account: { allowRead: true, allowCreate: false, allowEdit: false, allowDelete: false },
  },
  // Field-level security
  fields: {
    payout: { readable: true, editable: false },
    ssn: { readable: false, editable: false },
  },
  // Row-level security — CEL predicates enforced on every query
  rowLevelSecurity: [
    {
      name: 'case_own_team',
      label: 'Own Team Cases Only',
      object: 'support_case',
      operation: 'select' as const,
      using: 'team == current_user.team',
      positions: ['support'],
      enabled: true,
    },
  ],
};`,
    },
    sections: [
      {
        id: 'layers',
        eyebrow: '访问模型',
        title: '把销售组织的边界一层层落下来',
        copy:
          '一个模型覆盖全谱系——从大范围的角色授权到单条共享记录——例外不再演变成定制代码。',
        items: [
          {
            title: '角色与权限集',
            body: '"销售代表"是一个权限集：客户可读可建、订单可编辑、报价单不可删。默认安全姿态——没有定义明确允许之前，什么都不可读。',
          },
          {
            title: '行级规则',
            body: '"team == current_user.team" 一行表达式，代表就只看本团队；换成沿组织层级向上，经理就看整个大区——过滤发生在查询引擎内部，绕不过去。',
          },
          {
            title: '字段级安全',
            body: '成本价对代表只读、SSN 完全不可见——被脱敏的字段在 UI、API、导出和每一条 AI 回答里都保持脱敏。',
          },
          {
            title: '记录共享',
            body: '跨团队协作一单大客户？把这一条记录共享给协作人，不用扩大整个角色——例外被记录、可见、可撤销。',
          },
          {
            title: '租户隔离',
            body: '组织与工作区在运行时层保持隔离，多团队、多客户部署不会有任何意外共享。',
          },
        ],
      },
      {
        id: 'admin',
        eyebrow: '权限管理界面',
        title: '矩阵里勾出来，日志里查得到',
        copy:
          'Agent 写的权限定义，管理员在开源 ObjectStack 控制台里打开就是熟悉的矩阵——出了问题，审计查看器一条条对得上。',
        items: [
          {
            title: '权限矩阵编辑器',
            body: 'Salesforce 式布局：上半屏是对象级增删改查与 View All/Modify All 勾选，点中某个对象，下半屏立即换成它的字段级读/写矩阵。',
          },
          {
            title: '看得见的分配',
            body: '每个权限集页面直接列出"分配给了谁"——审阅权限时不用去别处反查。',
          },
          {
            title: '审计日志查看器',
            body: '按动作、对象、操作者、时间筛选；点开任何一条，侧抽屉展示完整事件与字段的旧值 → 新值 diff——"这条折扣谁改的"三次点击有答案。',
          },
          {
            title: 'AI 调用并排可查',
            body: 'AI 工具调用和人的操作出现在同一份日志里，同样的筛选、同样的 diff——审查 AI 和审查人是同一种工作。',
          },
        ],
      },
      {
        id: 'ai-safety',
        eyebrow: 'AI 同规',
        title: 'Agent 拿到的是你的权限模型，不是服务账号',
        copy:
          '失去 AI 控制最快的方式就是给它超级用户权限。ObjectOS 从不这么做：每个 Agent 动作都以发起它的登录用户身份执行。',
        items: [
          {
            title: '用户级执行',
            body: '代表问 AI"我的客户里谁最可能续约"，AI 看到的就是他那个团队的客户——成本价照样脱敏，一分不多。',
          },
          {
            title: '写操作过审批',
            body: '结构性变更与敏感动作在执行前排队等人签核，完整 diff 随附。',
          },
          {
            title: '一切被审计',
            body: '记录变更、权限授予、会话吊销、审批决定和 AI 工具调用，全部写入不可变审计日志。',
          },
        ],
      },
    ],
    table: {
      columns: ['审阅者会问', 'AI 编写', '运行时执行'],
      rows: [
        ['谁能读这个对象？', '元数据中的角色与权限集', '每次查询、API 调用、工具调用都校验'],
        ['代表能看到哪些行？', '按所有者或团队圈定的行级规则', '过滤在查询引擎内部生效'],
        ['AI 能看到成本价吗？', '带脱敏的字段规则', 'UI、API、导出与 AI 回答全部脱敏'],
        ['这个折扣谁改的？', '不用写——审计是运行时自带的', '审计查看器里旧值 → 新值一条条对'],
      ],
    },
    checklistTitle: '安全评审应确认',
    checklist: [
      '每个对象都有显式的读写策略。',
      '行级规则对应组织层级本身，而不是它的副本。',
      '敏感字段对所有消费方脱敏，包括 AI。',
      '结构性变更没有审批记录就无法上线。',
      '审计日志覆盖工具调用，而不只是记录写入。',
    ],
    faqs: [
      {
        question: 'AI Agent 有自己的服务账号吗？',
        answer:
          '没有。Agent 以登录用户身份行动，继承该用户的对象、行级与字段级权限。不存在可被泄露或滥用的特权 AI 身份。',
      },
      {
        question: '权限矩阵和审计查看器在开源 ObjectStack 里吗？',
        answer:
          '在。权限矩阵编辑器、审计日志查看器，连同角色、行级规则、字段级安全、共享、租户隔离与审计日志本身，都是开源 ObjectStack 的一部分，并同等适用于 MCP 工具访问。',
      },
    ],
  } satisfies MarketingPage;

export default page;
