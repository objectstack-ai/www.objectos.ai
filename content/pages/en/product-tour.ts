import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'product-tour',
    navLabel: 'Product tour',
    title: 'ObjectOS Product Tour: From Prompt to Governed App',
    description:
      'See how ObjectOS turns a business request into reviewable ObjectStack metadata, then runs the app with permissions, approvals, audit, APIs, UI, and AI tools.',
    eyebrow: 'Product tour',
    heroTitle: 'From one request to a governed application.',
    lead:
      'ObjectOS is not another code generator. It is the target format and runtime where AI-written enterprise software lands: the agent writes compact metadata, a person reviews the diff, and the runtime supplies the repeatable application surfaces.',
    primary: { label: 'Point your agent at ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: 'Review the trust model', href: '/en/trust-center/' },
    metrics: [
      { value: '5 steps', label: 'Requirement, metadata, review, runtime, governed AI' },
      { value: '1,792 lines', label: 'A complete CRM — the whole business system' },
      { value: '~16k tokens', label: 'So the entire app fits in the agent’s context' },
    ],
    artifact: {
      eyebrow: 'Review surface',
      title: 'The diff is the product boundary.',
      body:
        'Instead of asking a reviewer to audit a generated application codebase, ObjectStack asks the agent to change the business definition layer: objects, fields, views, permissions, workflows, actions, APIs, and tools.',
      code: `import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Case = ObjectSchema.create({
  name: 'support_case',
  label: 'Case',
  fields: {
    subject: Field.text({ label: 'Subject', required: true, searchable: true }),
    customer: Field.lookup('crm_account', { label: 'Customer' }),
    priority: Field.select({
      label: 'Priority',
      options: [
        { label: 'Low', value: 'low', default: true },
        { label: 'Normal', value: 'normal' },
        { label: 'Urgent', value: 'urgent', color: '#EF4444' },
      ],
    }),
    status: Field.select({
      label: 'Status',
      trackHistory: true,
      options: [
        { label: 'New', value: 'new', default: true },
        { label: 'Triage', value: 'triage' },
        { label: 'Waiting', value: 'waiting' },
        { label: 'Resolved', value: 'resolved' },
      ],
    }),
  },
});`,
    },
    sections: [
      {
        id: 'flow',
        eyebrow: 'How it works',
        title: 'The governed build loop',
        copy:
          'The product loop is designed around the two readers that matter: the AI that writes the system and the human who must understand and approve it.',
        items: [
          {
            title: '1. Describe the business change',
            body: 'Start with a real operating request: a case queue, approval chain, procurement flow, customer portal, or workflow that already has owners and rules.',
            meta: 'Human intent',
          },
          {
            title: '2. Agent writes metadata',
            body: 'The coding agent edits ObjectStack definitions instead of generating controllers, screens, migrations, APIs, and permission glue by hand.',
            meta: 'AI writes',
          },
          {
            title: '3. Reviewer signs off',
            body: 'The reviewer checks a compact diff: field names, relationships, permissions, transitions, workflow rules, and tool exposure.',
            meta: 'Human review',
          },
          {
            title: '4. Runtime supplies surfaces',
            body: 'ObjectOS turns metadata into tables, views, forms, ObjectQL, APIs, audit trails, MCP tools, and admin surfaces.',
            meta: 'Runtime layer',
          },
          {
            title: '5. Agents operate inside policy',
            body: 'AI can query and act through governed tools that inherit identity, record rules, field rules, approvals, and audit logging.',
            meta: 'Governed AI',
          },
        ],
      },
      {
        id: 'connect',
        eyebrow: 'Existing systems',
        title: 'Add an object layer without replacing systems of record',
        copy:
          'Most enterprise software value is already trapped in databases, ERP, CRM, ticketing, files, and custom systems. ObjectOS gives agents an explicit object model over that estate.',
        items: [
          {
            title: 'Connect databases and APIs',
            body: 'Map existing records into business objects, relationships, calculated fields, and actions without forcing a rip-and-replace migration.',
          },
          {
            title: 'Keep authority explicit',
            body: 'Each object says who can read, write, approve, export, automate, or expose it as a tool. That authority remains visible in review.',
          },
          {
            title: 'Ship new surfaces on top',
            body: 'The same definition can back internal apps, dashboards, portals, workflows, APIs, reports, and AI agent tools.',
          },
        ],
      },
    ],
    table: {
      columns: ['Layer', 'AI writes', 'ObjectOS supplies'],
      rows: [
        ['Data model', 'Objects, fields, relationships, validations', 'Tables, migrations, ObjectQL, generated APIs'],
        ['Experience', 'Views, forms, dashboards, actions', 'Rendered UI, navigation, status states, access checks'],
        ['Governance', 'Roles, row rules, field rules, approvals', 'Runtime enforcement, audit log, user-scoped tools'],
        ['AI surface', 'Agent tools, skills, prompts, action contracts', 'MCP exposure, policy checks, execution records'],
      ],
    },
    checklistTitle: 'A reviewer should be able to answer',
    checklist: [
      'What business objects changed?',
      'Which people, roles, and agents gained authority?',
      'Which actions need approval before execution?',
      'Which data can leave the runtime, if any?',
      'What will appear in audit logs after the change?',
    ],
    faqs: [
      {
        question: 'Is ObjectOS a low-code builder?',
        answer:
          'No. Low-code usually optimizes human screen building. ObjectOS is a target format and runtime for AI-written business software, where metadata stays reviewable and runtime governance stays enforced.',
      },
      {
        question: 'Is the 1% claim a benchmark?',
        answer:
          'It is a review-surface heuristic for typical CRUD and workflow apps. The exact ratio depends on the domain, but the key point is that the agent edits metadata while ObjectOS supplies repeated application mechanics.',
      },
    ],
  } satisfies MarketingPage;

export default page;
