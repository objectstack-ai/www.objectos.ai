import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'approvals',
    navLabel: '审批',
    title: 'ObjectOS 审批：业务变更与 AI 动作的多级签核',
    description:
      '多级审批，按用户、角色、团队与管理层级解析审批人，支持升级与记录锁定——AI 编写的结构性变更在上线前也要过同一个队列。',
    eyebrow: '审批',
    heroTitle: '每个有分量的变更，都要等一个"同意"。',
    lead:
      '超过阈值的折扣、合同条款、退款、AI 刚刚提议的 schema 变更——有些变更不该凭任何一个人的一句话就上线。ObjectOS 把签核变成一等运行时能力：发起、路由、升级、留痕。',
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
        '审批步骤以持久暂停的形式住在流程里：流程停下，请求送到对的人手里，记录被锁定，发生的一切都被写下来。策略本身是一份任何人都读得懂的紧凑定义。',
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
        title: '按组织架构路由，而不是写死一份名单',
        copy:
          '审批人的解析走与权限相同的身份模型，组织调整不会弄断签核链。',
        items: [
          {
            title: '多级审批链',
            body: '跨角色、跨层级地串联审批——先财务，再申请人的直属经理——都在同一份定义的步骤里。',
          },
          {
            title: '审批人解析',
            body: '路由给指定用户、某个角色、某个团队，或沿管理层级向上——在请求发起时按实时身份解析。',
          },
          {
            title: '升级与超时',
            body: '停留过久的请求会自动升级，流程不会卡死在某一个收件箱里。',
          },
          {
            title: '记录锁定',
            body: '决策悬而未决时记录保持原样——不会有编辑抢在审阅者前面生效。',
          },
          {
            title: '决策记录',
            body: '问了谁、谁答了、他们看到了什么、什么时候——每次审批都留下完整且不可变的轨迹。',
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
            body: 'Agent 提议新对象、字段、流程或权限变更时，变更以紧凑 diff 的形式落入审批队列。',
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
        ['15% 以上的折扣要过财务', '变更上的一个审批步骤', '路由、队列、锁定、决策记录'],
        ['大额退款需要两级批准', '一条多级审批链', '按序签核，带升级'],
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
        question: '审批在开源版里吗？',
        answer:
          '在。多级审批、审批人解析、升级、记录锁定与审计轨迹都是开源运行时的一部分——包括把守结构性变更的那道队列。',
      },
    ],
  } satisfies MarketingPage;

export default page;
