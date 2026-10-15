import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning.en;

const page = {
    slug: 'platform',
    navLabel: 'Platform',
    title: 'ObjectOS Platform: The Capabilities Behind AI-Written Business Apps',
    description: `ObjectOS is ${p.descriptor}: in-app AI Build and Ask, deployment, and team operations on the open, governed ObjectStack runtime.`,
    eyebrow: 'Platform',
    heroTitle: 'Everything a business system needs. Ready for production.',
    lead: `Your agent describes the business as one typed ObjectStack ontology. The open ObjectStack runtime derives the database, APIs, permission-aware screens, automated processes, approval queues, and dashboards, enforcing governance on every call. ${p.t4}`,
    primary: { label: 'Point your agent at ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    metrics: [
      { value: '12', label: 'Typed primitives in the runtime vocabulary, from objects and permissions to AI tools and datasources' },
      { value: '6', label: 'Capability areas, from data modeling to analytics' },
      { value: '4 gates', label: 'Typed, validated, reviewed, governed — between the agent and your users' },
    ],
    artifact: {
      eyebrow: 'Typed metadata your agent writes',
      title: 'One definition. A whole application behind it.',
      body:
        'This is the shape of a governed order object. Permission sets, approval flows, views, and AI tools are sibling ObjectStack definitions in the same reviewable target format, while the ObjectStack runtime derives tables, APIs, screens, queues, and audit.',
      code: `import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Order = ObjectSchema.create({
  name: 'sales_order',
  label: 'Order',
  fields: {
    customer: Field.lookup('crm_account', { label: 'Customer', required: true }),
    total: Field.currency({ label: 'Total', min: 0 }),
    discount: Field.percent({ label: 'Discount', max: 30 }),
    status: Field.select({
      label: 'Status',
      trackHistory: true,
      options: [
        { label: 'Draft', value: 'draft', default: true },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Fulfilled', value: 'fulfilled' },
      ],
    }),
  },
});`,
    },
    sections: [
      {
        id: 'capabilities',
        eyebrow: 'Capability map',
        title: 'Six capability areas, one open governed runtime',
        copy:
          'The same capabilities you would expect from a mature business platform — except your AI writes the ObjectStack definition and its runtime does the assembly.',
        items: [
          {
            title: 'Data modeling',
            body: 'Objects, relationships, and validations become tables, migrations, a query language, and REST APIs — on Postgres, MySQL, SQLite, MongoDB, and more.',
            meta: 'Guide',
            href: '/en/data-modeling/',
          },
          {
            title: 'App interfaces',
            body: 'Forms, views, and dashboards render straight from metadata, and every user sees exactly what their permissions allow — no hand-built frontend.',
            meta: 'Guide',
            href: '/en/app-ui/',
          },
          {
            title: 'Process automation',
            body: 'Flows with durable pause and resume, record-change, scheduled, and API triggers, background jobs, and reliable webhook delivery.',
            meta: 'Guide',
            href: '/en/automation/',
          },
          {
            title: 'Approvals',
            body: 'Multi-step approvals with user, role, team, and hierarchy resolution, escalation, and record locking while a decision is pending.',
            meta: 'Guide',
            href: '/en/approvals/',
          },
          {
            title: 'Permissions & security',
            body: 'Role-based, row-level, and field-level control with record sharing, tenant isolation, and an immutable audit trail.',
            meta: 'Guide',
            href: '/en/permissions/',
          },
          {
            title: 'Analytics & reporting',
            body: 'Aggregations, time series, funnels, and dashboards over the same governed objects — no separate BI stack to wire up.',
            meta: 'Guide',
            href: '/en/analytics/',
          },
        ],
      },
      {
        id: 'ai-native',
        eyebrow: 'Built for AI',
        title: 'Designed to be written by agents, reviewed by people',
        copy:
          `Every ObjectStack capability above is defined as metadata, which is what makes metadata driven development work when the author is an AI: a whole-context definition, readable diffs, and runtime enforcement. ObjectOS, ${p.descriptor}, adds the in-app AI Builder and Ask on top of that open mechanism, with AI governance from Business and hosted or self-managed delivery.`,
        items: [
          {
            title: 'AI Build & Ask',
            body: 'In ObjectOS Cloud and Enterprise, describe a change in natural language and review the diff, or ask questions over live business data — always inside the signed-in user’s permissions.',
            meta: 'Guide',
            href: '/en/ai/',
          },
          {
            title: 'Tools & MCP',
            body: 'Objects, queries, and actions become policy-checked tools for Claude, Cursor, or any MCP client — declared as metadata, never handwritten glue.',
            meta: 'Guide',
            href: '/en/mcp/',
          },
          {
            title: 'Designers & console',
            body: 'The open-source Console renders the real app and Studio authors the same metadata visually — the object designer, flow canvas, approvals inbox, permission matrix, and audit viewer — so people fine-tune everything the AI drafts.',
          },
          {
            title: 'The review loop',
            body: 'Structural changes land as compact diffs in an approval queue, so a person signs off before the runtime ships anything.',
            meta: 'Guide',
            href: '/en/product-tour/',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'ObjectStack runtime derives'],
      rows: [
        ['A customer database with an API', 'Objects, fields, relationships', 'Tables, migrations, query language, REST endpoints'],
        ['Screens for each team', 'Views, forms, dashboards', 'Rendered UI that respects each user’s permissions'],
        ['An approval before discounts ship', 'A flow rule with an approval step', 'Approval queues, escalation, record locking, audit'],
        ['AI that answers from live data', 'Tool and action contracts', 'Policy-checked MCP tools scoped to the signed-in user'],
      ],
    },
    faqs: [
      {
        question: 'Which capabilities are in the open-source ObjectStack?',
        answer:
          'The runtime capabilities on this page — data, UI, automation, approvals, permissions, analytics — are part of open-source ObjectStack, Apache-2.0: the protocol, kernel, CLI, production runtime, Console UI, and MCP server, with no feature gate between development and production. You bring your own AI: a coding agent writes metadata as source files and any MCP client can query your objects. The in-app AI Builder and Ask are what ObjectOS adds — on Cloud, Business Self-Managed, and Enterprise.',
      },
      {
        question: 'Can it run in our own infrastructure?',
        answer:
          'Yes, three ways. The open-source ObjectStack runtime self-hosts free, with bring-your-own AI over MCP. ObjectOS Business Self-Managed is a licensed single-node deployment that puts the in-app AI on your own infrastructure, bring your own model or key. ObjectOS Enterprise is the full private deployment — a VPC, local servers, or an air-gapped network — with clustering, local models, internal identity, your own secret management, and enterprise support.',
      },
    ],
  } satisfies MarketingPage;

export default page;
