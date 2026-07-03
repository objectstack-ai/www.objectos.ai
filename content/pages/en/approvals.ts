import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'approvals',
    navLabel: 'Approvals',
    title: 'ObjectOS Approvals: Multi-Step Sign-Off for Business Changes and AI Actions',
    description:
      'Multi-step approvals with user, role, team, and hierarchy resolution, a three-tab approvals inbox, escalation, and record locking — the same queue that gates AI-written structural changes before they ship.',
    eyebrow: 'Approvals',
    heroTitle: 'Every consequential change waits for a yes.',
    lead:
      'What does a 15%+ discount actually look like getting approved? The flow parks, the order locks, and finance sees the request in the approvals inbox — record snapshot, who did what when, all in one panel. Approve to release it, reject with a comment to send it back, and a stalled request escalates on its own. The schema change an AI just proposed rides the exact same queue.',
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
        'This is that discount chain: finance reviews first (any one responder), executives confirm (unanimous), the record stays locked throughout, and at most two revision round-trips. The policy itself is a compact definition anyone can read.',
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
        title: 'Follow the discount through both sign-offs',
        copy:
          'Approvers resolve against the same identity model as permissions, so reorganizations do not break sign-off chains — and every step below lives in one definition.',
        items: [
          {
            title: 'A two-step chain',
            body: 'Finance reviews first, executives confirm, sequenced in one flow — finance is “first response wins”, executives are “must be unanimous”, and each step sets its own behavior.',
          },
          {
            title: 'Approvers resolved from the org',
            body: 'Route to the finance role, a team, or up the requester’s manager hierarchy — resolved against live identity at request time, so personnel changes never mean editing flows.',
          },
          {
            title: 'Stalls escalate themselves',
            body: 'Finance hasn’t touched it in three days? The request escalates and reminds automatically — processes stop dying in one inbox.',
          },
          {
            title: 'Locking and send-back',
            body: 'While the decision is pending the order holds still — nobody edits past the reviewer. Finance can also return it for revision: sales fixes the discount and resubmits, at most twice (maxRevisions: 2).',
          },
          {
            title: 'Every decision on the record',
            body: 'Who was asked, who answered, which snapshot they saw, and when — a complete, immutable trail behind every approval, ready for audit.',
          },
        ],
      },
      {
        id: 'inbox',
        eyebrow: 'The approvals inbox',
        title: 'The screen approvers actually work in',
        copy:
          'The open-source console ships an approvals inbox — not a link in an email, but a workbench with context where decisions actually happen.',
        items: [
          {
            title: 'Three tabs',
            body: '“My pending” (waiting on me), “Submitted by me” (where are mine), and “All” (paginated overview) — each row shows the process, record, submitter, status, and time.',
          },
          {
            title: 'Decide with context, in a side panel',
            body: 'Open any row: the record snapshot, the step-by-step action timeline, approve/reject buttons, and a comment box — no hunting through other screens for context.',
          },
          {
            title: 'Recall and return for revision',
            body: 'Submitters can recall their own requests; reviewers can return for revision instead of a flat reject — with status colors for pending, approved, rejected, recalled, and returned.',
          },
          {
            title: 'Built for high-volume approvers',
            body: 'j/k to move, Enter to open, a/r to approve or reject — clearing a queue of requests never touches the mouse.',
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
            body: 'When an agent proposes new objects, fields, flows, or permission changes, the change lands in the same approvals inbox as a compact diff.',
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
        ['Discounts above 15% need finance', 'An approval step on the change', 'Routing, the inbox, locking, decision records'],
        ['Big refunds need two approvals', 'A multi-step chain', 'Sequenced sign-off with escalation and send-back'],
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
        question: 'Is the approvals inbox in the open-source edition?',
        answer:
          'Yes. The three-tab inbox, side-panel timeline, comments, recall and return-for-revision, and keyboard shortcuts ship in the open-source console — alongside multi-step approvals, approver resolution, escalation, record locking, and the audit trail.',
      },
    ],
  } satisfies MarketingPage;

export default page;
