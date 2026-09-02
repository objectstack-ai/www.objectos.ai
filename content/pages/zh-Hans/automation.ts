import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'automation',
    navLabel: '流程自动化',
    title: 'ObjectOS 自动化：面向业务流程的流程、触发器、作业与 Webhook',
    description:
      '支持持久暂停与恢复的多步流程，带 16+ 类型节点的可视化流程画布，带测试触发的运行历史，三类触发器，后台作业与 outbox 背书的 Webhook 投递。',
    eyebrow: '流程自动化',
    heroTitle: '流程自己跑——该等人的时候，等人。',
    lead:
      '拿一个真实流程来说：订单金额超过 10 万，财务必须签核，结果要同步 ERP，负责人要收到通知。这就是一次分支、一次人工等待、一次对外调用和一条通知——恰好是 ObjectOS 流程为之而生的形状：持久、多步，你的 Agent 用元数据写出来，你的团队在画布上画出来。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看审批', href: '/en/approvals/' },
    metrics: [
      { value: '16+', label: '画布上的类型化节点——判断、等待、审批、脚本、子流程' },
      { value: '持久', label: '流程为人暂停、恢复时状态一分不丢' },
      { value: 'Outbox', label: 'Webhook 投递由持久重试队列背书' },
    ],
    artifact: {
      eyebrow: '一份读得懂的流程',
      title: '升级策略本身就是 diff。',
      body:
        '这是一条完整可运行的策略：工单 SLA 超时，提升优先级并在收件箱通知负责人。你的 Agent 用几行可读的定义写出它——同一条流程在可视化设计器里就是一张图。',
      code: `import { defineFlow } from '@objectstack/spec';

export const EscalateBreachedCases = defineFlow({
  name: 'support_escalate_breached',
  label: 'Escalate SLA Breaches',
  type: 'autolaunched',
  nodes: [
    {
      id: 'start',
      type: 'start',
      label: 'On SLA Breach',
      config: {
        objectName: 'support_case',
        triggerType: 'record-after-update',
        condition: 'sla_breached == true && previous.sla_breached != true',
      },
    },
    {
      id: 'raise',
      type: 'update_record',
      label: 'Raise Priority',
      config: {
        objectName: 'support_case',
        filter: { id: '{record.id}' },
        fields: { priority: 'urgent' },
      },
    },
    {
      id: 'notify',
      type: 'notify',
      label: 'Notify Case Owner',
      config: {
        topic: 'case.sla_breach',
        recipients: ['{record.owner}'],
        channels: ['inbox'],
        severity: 'warning',
        title: 'SLA breached: {record.subject}',
        actionUrl: '/support_case/{record.id}',
      },
    },
    { id: 'end', type: 'end', label: 'End' },
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'raise' },
    { id: 'e2', source: 'raise', target: 'notify' },
    { id: 'e3', source: 'notify', target: 'end' },
  ],
});`,
    },
    sections: [
      {
        id: 'flows',
        eyebrow: '搭建流程',
        title: '跟着那笔 10 万的订单走一遍流程',
        copy:
          '下面每一步都是同一份定义里的一个类型化节点——那些通常演变成不可维护 worker 代码的部分，在这里保持声明式、保持可审阅。',
        items: [
          {
            title: '按业务条件分支',
            body: '判断节点给订单分路：10 万以下直接进入履约；超过的走审批路径。条件是写在真实字段上的表达式，不是埋在 worker 里的代码。',
          },
          {
            title: '等财务——持久地等',
            body: '审批节点让流程停驻。就算签核花了两周，状态也扛得住每一次部署与重启，然后从这个节点精确恢复。',
          },
          {
            title: '更新、通知、对外调用',
            body: '批准之后：update_record 节点翻转状态，notify 节点送达负责人收件箱，http_request 节点把订单推给 ERP。',
          },
          {
            title: '把不顺利的路也画进去',
            body: 'ERP 超时是定义的一部分——重试与错误边直接画在流程里，失败路径和其他部分一样要过审阅。',
          },
          {
            title: '把人放进流程里',
            body: '屏幕流节点在流程中途收集输入——驳回原因、替补供应商——待办步骤出现在经办人的队列里。',
          },
        ],
      },
      {
        id: 'designer',
        eyebrow: '流程设计器',
        title: '画布上画，队列里跑，历史里查',
        copy:
          '每条流程都能在开源 ObjectStack 控制台的可视化设计器中打开——Agent 写的那份定义，就是运营团队能接手的那张图。',
        items: [
          {
            title: '16+ 类型化节点的面板',
            body: '把 start、判断、等待、审批、创建/更新记录、http_request、脚本、循环、并行、子流程节点拖上画布；把节点丢到边上即可在路径中间插入。',
          },
          {
            title: '能打标签的分支',
            body: '边可以携带条件与标签——approve、reject、超阈值——校验把断路标成可点击的徽标，任何东西运行之前就能看到。',
          },
          {
            title: '上线之前先模拟',
            body: '在画布上单步推演：走过的节点和边会高亮，不碰任何数据就能看到一条记录会走哪条路。',
          },
          {
            title: '测试运行与运行历史',
            body: '用类型化输入发起一次测试，然后看运行表——状态徽标、时长、每次运行的输出——点开任何一次运行，看每个步骤到底做了什么。',
          },
          {
            title: '带预览的调度',
            body: 'Cron 表达式边输入边显示接下来五次触发时间，"每月最后一个周五"在真正运行之前就被验证。',
          },
        ],
      },
      {
        id: 'run',
        eyebrow: '启动、定时、对外连接',
        title: '流程开始的每一种方式——以及走出系统的方式',
        copy:
          '触发器、调度和投递都是运行时服务，不需要为每个流程单独做基础设施。',
        items: [
          {
            title: '记录变更触发器',
            body: '带条件地响应创建、更新与删除——折扣超过 15% 时、工单重新打开时、阶段易手时。',
          },
          {
            title: '定时运行',
            body: 'Cron 与间隔调度承担周期性工作：每夜汇总、续约提醒、SLA 巡检。',
          },
          {
            title: 'API 触发器',
            body: '从外部系统或 AI 工具调用启动流程，输入按定义校验。',
          },
          {
            title: '后台作业与队列',
            body: '长耗时工作移入带重试的持久队列，请求保持轻快，流程保持可靠。',
          },
          {
            title: 'Webhook 投递',
            body: '对外调用经由带重试与投递记录的持久 outbox——集成不再悄悄丢事件。',
          },
        ],
      },
    ],
    table: {
      columns: ['业务需求', 'AI 编写', '运行时供给'],
      rows: [
        ['10 万以上的订单等财务签核', '一个判断节点和一个审批节点', '持久等待、队列、锁定与恢复'],
        ['每夜升级逾期工单', '一条带条件的定时流程', '执行、重试与运行历史'],
        ['已批准订单同步 ERP', '审批之后的一个 http_request 节点', '持久 outbox、重试、投递记录'],
        ['运营改流程不用发版', '什么都不用写——画布编辑的就是同一份元数据', '可视化设计器、校验与模拟'],
      ],
    },
    checklistTitle: '自动化评审应确认',
    checklist: [
      '每条流程都有明确的负责人和一句读得懂的用途。',
      '审批步骤声明 SLA——升级给谁、超时后如何处理。',
      '定时等待要配上巡检任务或审批网关；等待节点本身不会在到点时自动唤醒。',
      '对外调用走 Webhook outbox，而不是临时 fetch。',
      '失败路径画在流程里，而不是心照不宣。',
      '流程变更以 diff 形式到达，带审批轨迹。',
    ],
    faqs: [
      {
        question: '部署或重启时，正在运行的流程会怎样？',
        answer:
          '流程状态是持久的。等待某个人或某个定时器的流程会从暂停处精确恢复——重启和部署不会丢失或重复任何工作。',
      },
      {
        question: '可视化设计器在开源 ObjectStack 里吗？',
        answer:
          '在。流程画布、节点面板、校验、模拟、运行历史和调度预览都随开源 ObjectStack 控制台发布——连同流程、全部三类触发器、后台队列和 Webhook 投递。',
      },
    ],
  } satisfies MarketingPage;

export default page;
