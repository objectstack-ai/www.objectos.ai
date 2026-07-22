import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'approvals',
    navLabel: '审批',
    title: 'ObjectOS 审批：业务变更与 AI 动作的多级签核',
    description:
      '多级审批，按用户、角色、团队与管理层级解析审批人，配备三页签审批收件箱、升级与记录锁定——AI 编写的结构性变更在上线前也要过同一个队列。',
    eyebrow: '审批',
    heroTitle: '每个有分量的变更，都要等一个"同意"。',
    lead:
      '一笔超过 15% 的折扣批下来是什么样？流程停驻、订单锁定，财务在审批收件箱里看到请求——记录快照、谁在什么时候做了什么，一目了然；批准放行，驳回带评论退回，超时自动升级。AI 刚提议的 schema 变更，走的也是这同一个队列。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看权限与安全', href: '/en/permissions/' },
    metrics: [
      { value: '4 种路由', label: '指定用户、角色、团队或管理层级' },
      { value: '锁定', label: '决策未定时，记录保持原样' },
      { value: '留痕', label: '每次请求、决定与升级都被审计' },
    ],
    artifact: {
      eyebrow: '签核即元数据',
      title: '一屏就能审完的审批策略。',
      body:
        '这就是那条折扣审批链：财务先审（一人响应即可），高管复核（须一致通过），全程锁定记录，最多两轮退回修改。策略本身是一份任何人都读得懂的紧凑定义。',
      code: `import { defineFlow } from '@objectstack/spec';

export const DiscountApproval = defineFlow({
  name: 'sales_discount_approval',
  label: 'Discount Approval',
  type: 'autolaunched',
  nodes: [
    {
      id: 'start',
      type: 'start',
      label: 'On Large Discount',
      config: {
        objectName: 'sales_order',
        triggerType: 'record-after-update',
        condition: 'discount > 15 && discount != previous.discount',
      },
    },
    {
      id: 'finance_review',
      type: 'approval',
      label: 'Finance Review',
      config: {
        approvers: [{ type: 'role', value: 'finance' }],
        behavior: 'first_response',
        lockRecord: true,
        maxRevisions: 2,
      },
    },
    {
      id: 'exec_review',
      type: 'approval',
      label: 'Executive Review',
      config: {
        approvers: [{ type: 'role', value: 'exec' }],
        behavior: 'unanimous',
        lockRecord: true,
      },
    },
    { id: 'approved', type: 'end', label: 'Approved' },
    { id: 'rejected', type: 'end', label: 'Rejected' },
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'finance_review' },
    { id: 'e2', source: 'finance_review', target: 'exec_review', label: 'approve' },
    { id: 'e3', source: 'finance_review', target: 'rejected', label: 'reject' },
    { id: 'e4', source: 'exec_review', target: 'approved', label: 'approve' },
    { id: 'e5', source: 'exec_review', target: 'rejected', label: 'reject' },
  ],
});`,
    },
    sections: [
      {
        id: 'model',
        eyebrow: '审批模型',
        title: '跟着这笔折扣走完两级签核',
        copy:
          '审批人的解析走与权限相同的身份模型，组织调整不会弄断签核链——下面每一步都写在同一份定义里。',
        items: [
          {
            title: '两级审批链',
            body: '财务先审、高管复核，按序串联在一个流程里；财务是"一人响应即可"，高管是"须一致通过"——行为按步骤单独设定。',
          },
          {
            title: '审批人按组织解析',
            body: '路由给 finance 角色、某个团队，或沿申请人的管理层级向上——在请求发起那一刻按实时身份解析，人事变动不用改流程。',
          },
          {
            title: '超时就升级',
            body: '财务三天没处理？请求自动升级并提醒——流程不会卡死在某一个收件箱里。',
          },
          {
            title: '记录锁定与退回',
            body: '决策期间订单保持原样，谁也改不了；财务也可以"退回修改"——销售改完折扣重新提交，最多两轮（maxRevisions: 2）。',
          },
          {
            title: '决策全程留痕',
            body: '问了谁、谁答了、看到的是什么快照、什么时候——每次审批留下完整且不可变的轨迹，审计随时可查。',
          },
        ],
      },
      {
        id: 'inbox',
        eyebrow: '审批收件箱',
        title: '审批人真正用的那个界面',
        copy:
          '开源 ObjectStack 控制台自带审批收件箱——不是邮件里的一个链接，而是一个带上下文、能直接决策的工作台。',
        items: [
          {
            title: '三个页签',
            body: '"我的待办"（等我批的）、"我提交的"（我发起的走到哪了）、"全部"（分页总览）——每行显示流程、记录、提交人、状态与时间。',
          },
          {
            title: '侧栏里带上下文决策',
            body: '点开任何一行：记录快照、逐步操作时间线、批准/驳回按钮和评论框——不用跳转到别处找信息。',
          },
          {
            title: '撤回与退回修改',
            body: '提交人可以撤回自己的请求；审批人可以退回修改而不是一驳了之——状态色区分待办、通过、驳回、撤回、退回。',
          },
          {
            title: '为高频审批人设计',
            body: 'j/k 上下移动、Enter 打开、a/r 批准或驳回——处理一队请求不需要碰鼠标。',
          },
        ],
      },
      {
        id: 'ai-gate',
        eyebrow: 'AI 治理闸门',
        title: '审人的队列，同样审 AI',
        copy:
          '这就是让 AI 编写的软件可治理的机制：Agent 提出的结构性变更不会直接上线——它们排队。',
        items: [
          {
            title: '结构性变更排队',
            body: 'Agent 提议新对象、字段、流程或权限变更时，变更以紧凑 diff 的形式落入同一个审批收件箱。',
          },
          {
            title: 'diff 就是请求本身',
            body: '审阅者看到的正是将要发生的变化——schema、权限、自动化——而不是一段转述。',
          },
          {
            title: '敏感动作也设闸',
            body: '运行时动作同样可以要求签核，AI 触发的退款或批量更新会停下来等人。',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', '运行时供给'],
      rows: [
        ['15% 以上的折扣要过财务', '变更上的一个审批步骤', '路由、收件箱、锁定、决策记录'],
        ['大额退款需要两级批准', '一条多级审批链', '按序签核，带升级与退回修改'],
        ['不让流程卡死在一个收件箱', '一个超时与升级路径', '自动升级与提醒'],
        ['AI 的 schema 变更必须有人审', '提议的 diff 本身', '部署之前的那道审批队列'],
      ],
    },
    checklistTitle: '审批评审应确认',
    checklist: [
      '每个高影响动作都写明了自己的审批路径。',
      '路由基于角色与层级，而不是写死的人名。',
      '每一步都定义了超时与升级。',
      '决策未定时记录被锁定。',
      'AI 提议的结构性变更无法绕过队列。',
    ],
    faqs: [
      {
        question: '审批是独立于流程的另一套系统吗？',
        answer:
          '不是——审批是流程里的一个持久步骤。整个过程只有一个执行模型：流程暂停，人来决定，流程继续。',
      },
      {
        question: '审批收件箱在开源 ObjectStack 里吗？',
        answer:
          '在。三页签收件箱、侧栏时间线、评论、撤回与退回修改、键盘快捷键，连同多级审批、审批人解析、升级、记录锁定与审计轨迹，都是开源 ObjectStack 的一部分。',
      },
    ],
  } satisfies MarketingPage;

export default page;
