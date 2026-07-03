import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'permissions',
    navLabel: '权限与安全',
    title: 'ObjectOS 权限：为 AI 编写的应用提供角色、行级与字段级控制',
    description:
      '基于角色、行级与字段级的访问控制，配合记录共享、租户隔离和不可变审计日志——对人和 AI Agent 同等强制执行。',
    eyebrow: '权限与安全',
    heroTitle: '谁能看什么、谁能改什么——在运行时强制执行。',
    lead:
      '业务软件的生死取决于权限边界：哪个团队能读这条记录，哪些字段保持脱敏，哪些变更需要签核。ObjectOS 把这份权限写进可审阅的定义里，并在每一次查询、API 调用和 AI 工具调用上强制执行。',
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
        '授权逻辑不再散落在控制器和界面里，而是一份紧凑的定义：谁、对哪些行、细到哪些字段。运行时在所有入口统一执行——UI、API 和 AI 工具。',
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
      roles: ['support'],
      enabled: true,
      priority: 10,
    },
  ],
};`,
    },
    sections: [
      {
        id: 'layers',
        eyebrow: '访问模型',
        title: '贴合组织真实运作方式的控制',
        copy:
          '一个模型覆盖全谱系——从大范围的角色授权到单条共享记录——例外不再演变成定制代码。',
        items: [
          {
            title: '角色与权限集',
            body: '按角色或权限集授予对象级权限，默认安全姿态：没有定义明确允许之前，什么都不可读。',
          },
          {
            title: '行级规则',
            body: '按所有者、团队或组织层级圈定记录范围——销售看自己的客户，经理看整个大区，而规则只是一行元数据。',
          },
          {
            title: '字段级安全',
            body: '按角色脱敏或隐藏敏感字段。被脱敏的字段在 UI、API、导出和每一条 AI 回答里都保持脱敏。',
          },
          {
            title: '记录共享',
            body: '不扩大角色权限，就能对单条记录逐例授权——例外被记录、可见、可撤销。',
          },
          {
            title: '租户隔离',
            body: '组织与工作区在运行时层保持隔离，多团队、多客户部署不会有任何意外共享。',
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
            body: '回答问题或执行动作的 Agent，能看到的行和字段与它的用户完全一致——一分不多。',
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
        ['销售能看到哪些行？', '按所有者或团队圈定的行级规则', '过滤在查询引擎内部生效'],
        ['AI 能看到薪资字段吗？', '带脱敏的字段规则', 'UI、API、导出与 AI 回答全部脱敏'],
        ['这个变更谁批准的？', '动作上的审批要求', '队列、签核记录、不可变审计条目'],
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
        question: '这些在开源版里吗？',
        answer:
          '在。权限模型——角色、行级规则、字段级安全、共享、租户隔离与审计日志——是开源运行时的一部分，并同等适用于 MCP 工具访问。',
      },
    ],
  } satisfies MarketingPage;

export default page;
