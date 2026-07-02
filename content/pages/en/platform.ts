import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'platform',
    navLabel: 'Platform',
    title: 'ObjectOS Platform: The Capabilities Behind AI-Written Business Apps',
    description:
      'One governed runtime supplies the database, APIs, screens, automation, approvals, permissions, and analytics that every AI-written business application needs.',
    eyebrow: 'Platform',
    heroTitle: 'Everything a business system needs. Supplied by the runtime.',
    lead:
      'Your agent describes the business in compact metadata. ObjectOS turns it into a working system: database and APIs, permission-aware screens, automated processes, approval queues, and dashboards — with governance enforced at runtime, not promised in a slide.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'Take the product tour', href: '/en/product-tour/' },
    metrics: [
      { value: '25+', label: 'Runtime services behind every deployed application' },
      { value: '6', label: 'Capability areas, from data modeling to analytics' },
      { value: '~1%', label: 'Metadata surface the AI writes; the runtime supplies the rest' },
    ],
    artifact: {
      eyebrow: 'The 1% your agent writes',
      title: 'One definition. A whole application behind it.',
      body:
        'This is the entire "code" for a governed order object: schema, validation, permissions, an approval rule, and an AI tool. Tables, APIs, screens, queues, and audit come from the runtime.',
      code: `defineObject('Order', {
  fields: {
    customer: relation('Customer'),
    total: currency({ min: 0 }),
    discount: percent({ max: 30 }),
    status: picklist(['draft', 'submitted', 'approved', 'fulfilled']),
  },
  permissions: {
    sales: can(['read', 'create', 'update']),
    finance: can(['read', 'approve']),
  },
  flows: {
    discountApproval: onChange('discount', { above: 15, require: 'finance' }),
  },
  tools: expose(['query', 'summarize'], { as: 'user' }),
});`,
    },
    sections: [
      {
        id: 'capabilities',
        eyebrow: 'Capability map',
        title: 'Six capability areas, one governed runtime',
        copy:
          'The same capabilities you would expect from a mature business platform — except your AI writes the definition and the runtime does the assembly.',
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
          'Every capability above is metadata-driven, which is exactly what makes the platform AI-writable: small definitions, readable diffs, and runtime enforcement.',
        items: [
          {
            title: 'AI Build & Ask',
            body: 'Describe a change in natural language and review the diff, or ask questions over live business data — always inside the signed-in user’s permissions.',
            meta: 'Guide',
            href: '/en/ai/',
          },
          {
            title: 'Tools & MCP',
            body: 'Objects, queries, and actions become policy-checked tools for Claude, Cursor, or any MCP client — generated from metadata, never handwritten.',
            meta: 'Guide',
            href: '/en/mcp/',
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
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['A customer database with an API', 'Objects, fields, relationships', 'Tables, migrations, query language, REST endpoints'],
        ['Screens for each team', 'Views, forms, dashboards', 'Rendered UI that respects each user’s permissions'],
        ['An approval before discounts ship', 'A flow rule with an approval step', 'Approval queues, escalation, record locking, audit'],
        ['AI that answers from live data', 'Tool and action contracts', 'Policy-checked MCP tools scoped to the signed-in user'],
      ],
    },
    faqs: [
      {
        question: 'Which capabilities are in the open-source edition?',
        answer:
          'The runtime capabilities on this page — data, UI, automation, approvals, permissions, analytics — are part of the open-source platform. You bring your own AI: a coding agent writes metadata as source files and any MCP client can query your objects. The in-app AI Build and Ask assistants run on Cloud and Enterprise.',
      },
      {
        question: 'Can it run in our own infrastructure?',
        answer:
          'Yes. ObjectOS is self-hostable and runs in VPCs, on local servers, or in air-gapped networks, with local models, internal identity, and your own secret management on Enterprise.',
      },
    ],
  } satisfies MarketingPage;

export default page;
