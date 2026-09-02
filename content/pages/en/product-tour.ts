import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'product-tour',
    navLabel: 'Product tour',
    title: 'ObjectOS Product Tour: From Prompt to Governed App',
    description:
      'See how teams use ObjectOS to take an ObjectStack app from a business request to production: typed metadata, a human-reviewed diff, and governed operation.',
    eyebrow: 'Product tour',
    heroTitle: 'From one request to a governed application.',
    lead:
      'ObjectStack is the open target format and runtime for AI-written enterprise software: an agent writes compact metadata, a person reviews the diff, and the runtime derives the repeatable application surfaces. ObjectOS is the commercial production platform for building, deploying, and operating those apps.',
    primary: { label: 'Point your agent at ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: 'Review the trust model', href: '/en/trust-center/' },
    metrics: [
      { value: '<150k tokens', label: 'A complete CRM including UI — one context window' },
      { value: '<100k tokens', label: 'Objects, workflows, permissions, and business logic' },
      { value: '~50k tokens', label: 'The UI metadata for the complete CRM' },
    ],
    artifact: {
      eyebrow: 'Review surface',
      title: 'The diff is the product boundary.',
      body:
        'Instead of asking a reviewer to audit a generated application codebase, ObjectStack gives the agent an open, typed definition layer to change: objects, fields, views, permissions, workflows, actions, APIs, and tools.',
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
            body: 'The coding agent edits Strict TypeScript ObjectStack definitions that must conform to the published Zod schemas instead of generating controllers, screens, migrations, APIs, and permission glue by hand.',
            meta: 'AI writes',
          },
          {
            title: '3. Reviewer signs off',
            body: 'After the validation gate passes, the reviewer checks a compact diff: field names, relationships, permissions, transitions, workflow rules, and tool exposure.',
            meta: 'Human review',
          },
          {
            title: '4. Runtime supplies surfaces',
            body: 'The ObjectStack runtime derives tables, views, forms, ObjectQL, APIs, audit trails, MCP tools, and admin surfaces. ObjectOS operates the resulting app in production.',
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
          'Most enterprise software value is already trapped in databases, ERP, CRM, ticketing, files, and custom systems. ObjectStack gives agents an explicit object model over that estate; ObjectOS gives teams a production platform for operating apps built on it.',
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
      columns: ['Layer', 'AI writes', 'ObjectStack runtime derives'],
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
          'No. Low-code usually optimizes human screen building. ObjectOS is the commercial production platform for ObjectStack apps. ObjectStack is the open, typed target format and runtime that keeps metadata reviewable and enforces governance on every call.',
      },
      {
        question: 'How do ObjectStack and ObjectOS differ?',
        answer:
          'ObjectStack defines and runs the application as open, versioned metadata. ObjectOS is the commercial production platform that adds the in-app AI experience, team operation, deployment choices, and enterprise support around ObjectStack apps.',
      },
    ],
  } satisfies MarketingPage;

export default page;
