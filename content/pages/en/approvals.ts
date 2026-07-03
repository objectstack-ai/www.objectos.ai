import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'approvals',
    navLabel: 'Approvals',
    title: 'ObjectOS Approvals: Multi-Step Sign-Off for Business Changes and AI Actions',
    description:
      'Multi-step approvals with user, role, team, and hierarchy resolution, escalation, and record locking — the same queue that gates AI-written structural changes before they ship.',
    eyebrow: 'Approvals',
    heroTitle: 'Every consequential change waits for a yes.',
    lead:
      'Discounts above a threshold, contract terms, refunds, schema changes an AI just proposed — some changes should not ship on anyone’s say-so alone. ObjectOS turns sign-off into a first-class runtime capability: requested, routed, escalated, and recorded.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See permissions & security', href: '/en/permissions/' },
    metrics: [
      { value: '4 ways', label: 'Route to a user, role, team, or manager hierarchy' },
      { value: 'Locked', label: 'Records hold still while a decision is pending' },
      { value: 'Recorded', label: 'Every request, decision, and escalation is audited' },
    ],
    artifact: {
      eyebrow: 'Sign-off as metadata',
      title: 'The approval policy fits in one review.',
      body:
        'Approval steps live inside flows as durable pauses: the process stops, the right people get the request, the record locks, and everything that happens is written down. The policy itself is a compact definition anyone can read.',
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
        eyebrow: 'The approval model',
        title: 'Routing that matches the org chart, not a hardcoded list',
        copy:
          'Approvals resolve against the same identity model as permissions, so reorganizations do not break sign-off chains.',
        items: [
          {
            title: 'Multi-step chains',
            body: 'Sequence approvals across roles and levels — finance first, then the requester’s manager — as steps in one definition.',
          },
          {
            title: 'Approver resolution',
            body: 'Route to a specific user, a role, a team, or up the manager hierarchy, resolved at request time against live identity.',
          },
          {
            title: 'Escalation & timeouts',
            body: 'A request that sits too long escalates automatically, so processes do not stall on one inbox.',
          },
          {
            title: 'Record locking',
            body: 'While a decision is pending, the record holds still — no edits racing past the reviewer.',
          },
          {
            title: 'Decision records',
            body: 'Who was asked, who answered, what they saw, and when — every approval leaves a complete, immutable trail.',
          },
        ],
      },
      {
        id: 'ai-gate',
        eyebrow: 'The AI governance gate',
        title: 'The same queue that reviews people reviews AI',
        copy:
          'This is the mechanism that makes AI-written software governable: structural changes from an agent do not ship — they queue.',
        items: [
          {
            title: 'Structural changes queue',
            body: 'When an agent proposes new objects, fields, flows, or permission changes, the change lands in an approval queue as a compact diff.',
          },
          {
            title: 'The diff is the request',
            body: 'Reviewers see exactly what would change — schema, authority, automation — not a description of it.',
          },
          {
            title: 'Sensitive actions gated',
            body: 'Runtime actions can require sign-off too, so an AI-triggered refund or bulk update waits for a person.',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['Discounts above 15% need finance', 'An approval step on the change', 'Routing, queues, locking, decision records'],
        ['Big refunds need two approvals', 'A multi-step chain', 'Sequenced sign-off with escalation'],
        ['Nothing stalls in one inbox', 'A timeout and an escalation path', 'Automatic escalation and reminders'],
        ['AI schema changes get reviewed', 'The proposed diff itself', 'The approval queue in front of deployment'],
      ],
    },
    checklistTitle: 'An approval review should confirm',
    checklist: [
      'Every high-consequence action names its approval path.',
      'Routing uses roles and hierarchy, not hardcoded people.',
      'Timeouts and escalation are defined for every step.',
      'Records lock while decisions are pending.',
      'AI-proposed structural changes cannot bypass the queue.',
    ],
    faqs: [
      {
        question: 'Are approvals a separate system from flows?',
        answer:
          'No — an approval is a durable step inside a flow. That keeps one execution model for the whole process: the flow pauses, people decide, the flow resumes.',
      },
      {
        question: 'Are approvals in the open-source edition?',
        answer:
          'Yes. Multi-step approvals, approver resolution, escalation, record locking, and the audit trail are part of the open-source runtime — including the queue that gates structural changes.',
      },
    ],
  } satisfies MarketingPage;

export default page;
