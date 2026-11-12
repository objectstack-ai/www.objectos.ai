import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning['zh-Hans'];

// 写给被转发链接的董事长、总经理或 CIO 的组织级页面（#369；2026-11-05 裁决：
// 营销页，「为什么选 ObjectOS」第 5 项）。/use-cases/ 回答“我的团队能用它做什么”，
// 本页回答“企业怎样安全地引入 AI、从哪里开始”。下文每一条产品说法都复述一个
// 已发布的机制页并链接过去——/data-modeling/、/permissions/、/approvals/、
// /trust-center/；ObjectStack 是什么（t2）与导出条款（e1）引自
// `src/lib/positioning.ts`。不写回滚、不写“权限内自动关闭占比”：两者都没有
// 已发布的机制。报销制度是通用示例，不来自任何客户。
const page = {
    slug: 'enterprise-ai-adoption',
    navLabel: '企业 AI 落地',
    title: '企业 AI 落地：AI 如何真正进入一家公司，从哪里开始',
    description:
      '写给被转发这个链接的管理者：AI 试点为什么卡在没写下来的制度、够不着的系统和查不到的痕迹上；一条报销制度的三种状态；三步试点。',
    eyebrow: '企业 AI 落地',
    heroTitle: 'AI 如何真正进入一家公司：先把制度写下来。',
    lead:
      'AI 试点在公司里卡住，原因往往不在模型，而在模型周围的组织：制度在人脑子里，存着数据的系统 AI 够不着，AI 动了手却没有谁能查的痕迹。在一个流程里补上这三个缺口，AI 就能在那里接手真正的工作，并且不超出你授予的权限。下面是：一条普通的报销制度的三种写法、一个三步试点，以及这种做法解决不了什么。',
    primary: { label: '看一条制度的三种状态', href: '#three-states' },
    secondary: { label: '按团队看使用场景', href: '/en/use-cases/' },
    metrics: [
      { value: '制度在人脑里', label: '制度存在于经验和例外里，而不是写成系统能检查的条文。' },
      { value: '系统够不着', label: 'AI 需要的记录在 ERP、CRM 和表格里，它没法安全地读取。' },
      { value: '没有痕迹', label: 'AI 动了手，没人说得清是谁允许的、改了什么、凭的是谁的权限。' },
    ],
    artifact: {
      eyebrow: '核心观点',
      title: '制度写得越清楚，AI 越能放手干。',
      body:
        'AI 只能守住它读得懂、运行时又查得了的制度。拿一条普通的差旅报销制度来说：写在制度文件里的一段话，助手可以引用，却没人能让它照办；写进本体——一个对象、几个字段、一条校验、一个审批步骤——同一条制度就会在每一次写入时强制执行，对人和 Agent 一视同仁，每一次请求和决定都留下记录。这条制度是通用示例，不来自任何客户。',
      code: `// (a) 现在的制度文本：差旅制度第 4 条
//   4.1 每笔差旅报销必须附票据。
//   4.2 报销金额不得超过已批准的差旅预算。
//   4.3 超过 5,000 的报销需部门负责人审批。
//   4.4 审计人员可查看报销单，但不能修改。

// (b) 同一条制度，写进本体
export const TravelClaim = ObjectSchema.create({
  name: 'travel_claim',
  label: '差旅报销',
  fields: {
    amount: Field.currency({ label: '金额', required: true }),
    trip_budget: Field.currency({ label: '差旅预算' }),
    receipt: Field.file({ label: '票据', required: true }), // 4.1
  },
  validations: [{                                         // 4.2
    name: 'within_trip_budget',
    type: 'script',
    condition: 'record.amount > record.trip_budget',
    message: '制度 4.2：报销金额超出差旅预算。',
  }],
});

// 4.3：报销流程里的一个审批步骤（见 /approvals/），
// 在 'amount > 5000' 时启动
{ id: 'head_review', type: 'approval', config: {
    approvers: [{ type: 'role', value: 'department_head' }],
    lockRecord: true,
} }

// 4.4：审计人员的权限集（见 /permissions/）
travel_claim: { allowRead: true, allowCreate: false,
                allowEdit: false, allowDelete: false }

// (c) 运行时强制执行
// 报销 6,200，预算 5,000 → 拒绝：制度 4.2
// 报销 6,200，预算 8,000 → 保存；记录锁定，等部门负责人决定
// 审计人员修改报销单 → 拒绝：只读（4.4）
// 审计日志：AI 助手以登录员工身份创建报销单；
// 审计日志：head_review 由部门负责人批准`,
    },
    sections: [
      {
        id: 'three-states',
        eyebrow: '一条制度，三种状态',
        title: '同一条报销制度：一段文字、一份本体、一个运行中的系统',
        copy:
          '三种状态各管一件事：文字告诉人制度是什么，本体告诉系统，运行时让所有人——人和 Agent——都照办，并留下记录。',
        items: [
          {
            meta: '(a) 制度文本',
            title: '文件里的四句话',
            body: '票据、差旅预算、超额审批、审计只读。AI 助手可以引用这四句话，但没有任何东西能阻止它，或任何人，提交一张违反制度的报销单。',
          },
          {
            meta: '(b) 本体',
            title: '一个评审者读得懂的对象',
            href: '/en/data-modeling/',
            body: '同样的四句话，变成一个带类型字段的报销对象、一条紧挨着所保护字段的校验、一个审批步骤和一个只读权限集——一份小小的定义，而不是散落在各个界面里的逻辑。',
          },
          {
            meta: '(c) 运行时',
            title: '拒绝、流转、留痕',
            href: '/en/approvals/',
            body: '超预算的报销在每一条写入路径上都会被拒绝：表单、API、导入或 AI 工具调用。超过额度的报销等待部门负责人审批，期间记录锁定。每次请求与决定都被审计。',
          },
          {
            meta: '同一条制度下的 AI',
            title: '助手就是那位员工，不是超级用户',
            href: '/en/permissions/',
            body: '提交报销单的助手以登录员工的身份行事，不超出该员工的权限。审计人员的修改也同样被拒绝。助手读取和改动的记录与人的操作出现在同一份审计日志里；在 Enterprise 版中，AI 治理还会审计界面内 AI 的每一次工具调用。',
          },
        ],
      },
      {
        id: 'systems',
        eyebrow: 'AI 接到哪里',
        title: '从你已经在用的系统开始',
        copy:
          'AI 的用处取决于它能读到哪些记录。风险更低的路径通常是先读取现有系统里已有的数据，而不是先替换它们。',
        items: [
          {
            title: '先连接，再考虑迁移',
            href: '/en/legacy-system-modernization/',
            body: '现有的 ERP 或 CRM 数据库可以不搬一条记录，就挂载为受治理的对象，AI 通过和其他一切相同的权限读取它。遗留系统现代化指南有完整的步骤。',
          },
          {
            title: '默认只读，尚在早期',
            href: '/en/data-modeling/',
            body: '联邦接入默认只读；写回源系统要按对象有意开启。它也尚在早期：读路径是成熟的那一条，第一个试点请围绕读取来规划。',
          },
          {
            title: 'Agent 通过受治理的工具行事',
            href: '/en/trust-center/',
            body: '无论是你自己经 MCP 接入的 Agent，还是 ObjectOS 的产品内 AI，都以登录用户身份通过受治理的工具行事，而不是直接访问数据库。信任中心写明了每一个 AI 动作要经过什么。',
          },
        ],
      },
      {
        id: 'pilot',
        eyebrow: '三步试点',
        title: '选一个流程，把它写下来，量三个数',
        copy: '第一个试点要小到能做完，具体到能评判。下面三步与行业无关。',
        items: [
          {
            meta: '第 1 步',
            title: '选一个制度已成文的流程',
            body: '选一个制度已经写在纸面上、有明确业务负责人的流程：费用报销、采购申请、服务工单。如果没人写得出这条制度，它还不适合做试点。',
          },
          {
            meta: '第 2 步',
            title: '把它写进本体',
            href: '/en/agent-developer/',
            body: '把制度变成对象、字段、校验、审批步骤和权限。你的编码 Agent 可以起草这份定义；流程负责人把它当作一个小 diff 来评审，逐条对照制度。',
          },
          {
            meta: '第 3 步',
            title: '量三个数',
            href: '/en/customer-stories/#evidence',
            body: '节省的工时、从申请到决定的周期、差错率，都与试点开始前测得的基线对比。参考案例页列出了受治理试点还应衡量的其他指标。',
          },
        ],
      },
      {
        id: 'limits',
        eyebrow: '它解决不了什么',
        title: '把制度写下来也解决不了的三件事',
        copy:
          '这种做法把成文的制度搬进一个会强制执行它的系统，对工作中没有成文的部分无能为力——这一点在试点之前说清楚，好过试点之后。',
        items: [
          {
            title: '没人写下来的制度',
            body: '如果制度只存在于某位经理的判断里，就还没有东西可以建模。把它写下来是组织自己的工作，而且常常比搭建本身更费时间。',
          },
          {
            title: '没人说得清的判断',
            body: '有些决定依赖从未被说出来的经验：和某家供应商的关系、某位客户的历史。AI 可以把这些情况准备好，决定仍应由人来做。',
          },
          {
            title: '还不存在的集成',
            body: '一个没有可访问的数据库或 API 的系统，AI 依然够不着。联邦接入尚在早期，写回源系统是一个有意的步骤，不是默认行为。',
          },
        ],
      },
    ],
    checklistTitle: '试点开始前，请确认',
    checklist: [
      '这个流程有成文的制度和明确的业务负责人。',
      '它需要的记录读得到，来自你在运行的系统或通过导入。',
      'AI 可以执行的每个动作都已列出，需要人审批的已标明。',
      '工时、周期和差错率都有基线。',
      '大家对试点不覆盖什么已有共识。',
    ],
    faqs: [
      {
        question: '一句话说，ObjectStack 是什么？',
        answer: p.t2,
      },
      {
        question: 'AI 会自作主张吗？',
        answer:
          '只在你授予的权限之内行事。Agent 以登录用户身份执行，不超出该用户的权限；需要审批的业务决定由流程中的审批节点交给人；它读取和改动的记录与人的操作写进同一份审计日志。界面内 AI 每次工具调用的审计属于 Enterprise 版的 AI 治理。',
      },
      {
        question: '我们能把本体带走吗？',
        answer: p.e1,
      },
    ],
  } satisfies MarketingPage;

export default page;
