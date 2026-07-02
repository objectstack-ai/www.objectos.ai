import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'automation',
    navLabel: 'Process automation',
    title: 'ObjectOS Automation: Flows, Triggers, Jobs, and Webhooks for Business Processes',
    description:
      'Multi-step flows with durable pause and resume, record-change, scheduled, and API triggers, background jobs, and reliable webhook delivery — defined as metadata an AI agent can write and a person can review.',
    eyebrow: 'Process automation',
    heroTitle: 'Processes that run themselves — and wait for people when they must.',
    lead:
      'Real business processes are not straight lines: they branch, wait for a decision, retry a failed step, and pick up where they left off. ObjectOS flows are built for that shape — durable, multi-step, and defined in metadata your agent can write and your team can read.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See approvals', href: '/en/approvals/' },
    metrics: [
      { value: '3', label: 'Trigger types: record change, schedule, and API' },
      { value: 'Durable', label: 'Flows pause for people and resume without losing state' },
      { value: 'Outbox', label: 'Webhook delivery backed by a durable, retrying queue' },
    ],
    artifact: {
      eyebrow: 'A process you can read',
      title: 'The escalation policy is the diff.',
      body:
        'A flow is a sequence of typed steps — conditions, updates, human tasks, and calls out. When the process changes, the change is a few readable lines, not a rewrite of a worker service.',
      code: `defineFlow('escalateOverdueCases', {
  trigger: schedule('every 30m'),
  steps: [
    query('Case', where('status = "open" AND slaDue < now()')),
    forEach('case', [
      update({ priority: 'high' }),
      notify('case.owner.manager', template('sla-breach')),
      waitFor(approval('support-lead'), { timeout: '4h', escalate: 'director' }),
    ]),
  ],
});`,
    },
    sections: [
      {
        id: 'flows',
        eyebrow: 'Build the process',
        title: 'Flows that survive contact with the real world',
        copy:
          'Steps compose into processes that handle branching, waiting, and failure — the parts that usually turn into unmaintainable worker code.',
        items: [
          {
            title: 'Multi-step flows',
            body: 'Conditions, loops, updates, and calls compose as a graph of typed steps, so complex processes stay inspectable.',
          },
          {
            title: 'Durable pause & resume',
            body: 'A flow can wait hours or weeks for a person or an event. State is persisted — a restart or deploy never loses a running process.',
          },
          {
            title: 'Human-in-the-loop steps',
            body: 'Screen flows and approval steps put a person inside the process, with the pending work visible in their queue.',
          },
          {
            title: 'Failure handling',
            body: 'Retries and error paths are part of the definition, so the unhappy path gets reviewed like everything else.',
          },
        ],
      },
      {
        id: 'run',
        eyebrow: 'Start it, schedule it, connect it',
        title: 'Every way a process begins — and leaves the building',
        copy:
          'Triggers, schedules, and delivery are runtime services, so none of this needs infrastructure work per process.',
        items: [
          {
            title: 'Record-change triggers',
            body: 'React to creates, updates, and deletes with conditions — when a discount crosses 15%, when a case reopens.',
          },
          {
            title: 'Scheduled runs',
            body: 'Cron and interval schedules for recurring work: nightly rollups, renewal reminders, SLA sweeps.',
          },
          {
            title: 'API triggers',
            body: 'Launch a flow from an external system or an AI tool call, with inputs validated against the definition.',
          },
          {
            title: 'Background jobs & queues',
            body: 'Long-running work moves to a durable queue with retries, keeping requests fast and the process reliable.',
          },
          {
            title: 'Webhook delivery',
            body: 'Outbound calls go through a durable outbox with retries and delivery records — integrations stop silently dropping events.',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['Escalate overdue cases', 'A scheduled flow with conditions', 'Execution, retries, and run history'],
        ['Pause a deal until finance signs off', 'An approval step inside the flow', 'Durable waiting, queues, and resumption'],
        ['Sync new orders to the ERP', 'A record-change trigger and a webhook', 'Durable outbox, retries, delivery records'],
        ['Nightly usage rollups', 'A cron schedule and an update step', 'Job scheduling and background execution'],
      ],
    },
    checklistTitle: 'An automation review should confirm',
    checklist: [
      'Every flow has a named owner and a readable purpose.',
      'Waiting states have timeouts and escalation paths.',
      'External calls go through the webhook outbox, not ad-hoc fetches.',
      'Failure paths are defined, not implied.',
      'Flow changes arrive as diffs with an approval trail.',
    ],
    faqs: [
      {
        question: 'What happens to running flows on deploy or restart?',
        answer:
          'Flow state is durable. A process waiting on a person or a timer resumes exactly where it paused — restarts and deploys do not lose or duplicate work.',
      },
      {
        question: 'Is automation in the open-source edition?',
        answer:
          'Yes. Flows, all three trigger types, scheduling, background queues, and webhook delivery are part of the open-source runtime.',
      },
    ],
  } satisfies MarketingPage;

export default page;
