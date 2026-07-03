import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'automation',
    navLabel: '流程自动化',
    title: 'ObjectOS 自动化：面向业务流程的流程、触发器、作业与 Webhook',
    description:
      '支持持久暂停与恢复的多步流程，记录变更、定时、API 三类触发器，后台作业与可靠的 Webhook 投递——以 AI Agent 能编写、人能审阅的元数据定义。',
    eyebrow: '流程自动化',
    heroTitle: '流程自己跑——该等人的时候，等人。',
    lead:
      '真实的业务流程从来不是一条直线：它会分叉、等一个决定、重试失败的步骤，然后从中断处继续。ObjectOS 的流程就是为这种形状而生——持久、多步，用你的 Agent 能写、你的团队能读的元数据来定义。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '查看审批', href: '/en/approvals/' },
    metrics: [
      { value: '3 类', label: '触发器：记录变更、定时与 API' },
      { value: '持久', label: '流程为人暂停、恢复时状态一分不丢' },
      { value: 'Outbox', label: 'Webhook 投递由持久重试队列背书' },
    ],
    artifact: {
      eyebrow: '一份读得懂的流程',
      title: '升级策略本身就是 diff。',
      body:
        '流程是一串类型化的步骤——条件、更新、人工任务和对外调用。流程变了，变化就是几行可读的定义，而不是重写一个 worker 服务。',
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
        title: '经得起真实世界考验的流程',
        copy:
          '步骤组合成能处理分叉、等待和失败的流程——这些恰恰是通常演变成不可维护 worker 代码的部分。',
        items: [
          {
            title: '多步流程',
            body: '条件、循环、更新和调用组合成一张类型化步骤的图，复杂流程依然一眼可查。',
          },
          {
            title: '持久暂停与恢复',
            body: '流程可以为一个人或一个事件等上几小时甚至几周。状态被持久化——重启或部署不会丢掉任何在跑的流程。',
          },
          {
            title: '人在环中的步骤',
            body: '屏幕流与审批步骤把人放进流程里，待办工作出现在他们的队列中。',
          },
          {
            title: '失败处理',
            body: '重试与错误路径是定义的一部分，"不顺利的那条路"也会像其他部分一样被审阅。',
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
            body: '带条件地响应创建、更新与删除——折扣超过 15% 时、工单重新打开时。',
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
        ['升级逾期工单', '一条带条件的定时流程', '执行、重试与运行历史'],
        ['交易暂停到财务签核', '流程内的一个审批步骤', '持久等待、队列与恢复'],
        ['新订单同步到 ERP', '一个记录变更触发器和一个 Webhook', '持久 outbox、重试、投递记录'],
        ['每夜用量汇总', '一条 cron 调度和一个更新步骤', '作业调度与后台执行'],
      ],
    },
    checklistTitle: '自动化评审应确认',
    checklist: [
      '每条流程都有明确的负责人和一句读得懂的用途。',
      '等待状态配有超时与升级路径。',
      '对外调用走 Webhook outbox，而不是临时 fetch。',
      '失败路径被明确定义，而不是心照不宣。',
      '流程变更以 diff 形式到达，带审批轨迹。',
    ],
    faqs: [
      {
        question: '部署或重启时，正在运行的流程会怎样？',
        answer:
          '流程状态是持久的。等待某个人或某个定时器的流程会从暂停处精确恢复——重启和部署不会丢失或重复任何工作。',
      },
      {
        question: '自动化在开源版里吗？',
        answer:
          '在。流程、全部三类触发器、调度、后台队列和 Webhook 投递都是开源运行时的一部分。',
      },
    ],
  } satisfies MarketingPage;

export default page;
