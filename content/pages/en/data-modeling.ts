import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'data-modeling',
    navLabel: 'Data modeling',
    title: 'ObjectOS Data Modeling: From Business Objects to Database and APIs',
    description:
      'Objects, relationships, validations, and formulas become tables, migrations, a query language, and REST APIs — with an object designer, an ER diagram, and datasource sync that federates existing databases in place.',
    eyebrow: 'Data modeling',
    heroTitle: 'Describe the business objects. The database and APIs follow.',
    lead:
      'Take a subscription-billing system: customers, plans, seats, MRR, renewal dates, status. In ObjectOS that is one compact object definition — tables, migrations, the query engine, and REST endpoints are supplied by the runtime. Your agent can write it, and your team can fine-tune it field by field in the object designer.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See process automation', href: '/en/automation/' },
    metrics: [
      { value: '20+', label: 'Field types — text, currency, percent, lookup, formula, file' },
      { value: 'Zero', label: 'Hand-written endpoints — REST APIs come from metadata' },
      { value: 'In place', label: 'Existing databases federate without migration' },
    ],
    artifact: {
      eyebrow: 'The model is the source',
      title: 'One object definition. Schema, rules, and API included.',
      body:
        'This is that subscription object: fields, relationships, validation, and history tracking in one reviewable definition. The runtime turns it into tables and migrations, enforces the rules on every write, and serves the API — the same definition an agent can extend and the designer can open.',
      code: `import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Subscription = ObjectSchema.create({
  name: 'billing_subscription',
  label: 'Subscription',
  searchableFields: ['plan', 'status'],
  fields: {
    customer: Field.lookup('crm_account', { label: 'Customer', required: true }),
    plan: Field.select({
      label: 'Plan',
      options: [
        { label: 'Starter', value: 'starter', default: true },
        { label: 'Team', value: 'team' },
        { label: 'Business', value: 'business' },
      ],
    }),
    seats: Field.number({ label: 'Seats', min: 1 }),
    mrr: Field.currency({ label: 'MRR', scale: 2, min: 0 }),
    renews_at: Field.date({ label: 'Renews at' }),
    status: Field.select({
      label: 'Status',
      trackHistory: true,
      options: [
        { label: 'Active', value: 'active', default: true, color: '#10B981' },
        { label: 'Past due', value: 'past_due', color: '#F59E0B' },
        { label: 'Churned', value: 'churned', color: '#EF4444' },
      ],
    }),
  },
});`,
    },
    sections: [
      {
        id: 'modeling',
        eyebrow: 'Model the business',
        title: 'Build the subscription system step by step',
        copy:
          'Definitions stay close to how the business talks: customers, plans, renewals. No ORM classes, no scattered schema files — every step below stays inside one definition.',
        items: [
          {
            title: 'Objects & relationships',
            body: 'The subscription looks up its customer, invoices hang off it master-detail, tags attach many-to-many — and the runtime keeps referential integrity, so deleting the wrong parent stops being an incident.',
          },
          {
            title: 'Validations & rules',
            body: '“Seats can’t drop below assigned users.” “MRR can’t go negative.” Constraints are expressions next to the fields they protect, enforced on every write path: UI, API, imports, and AI tools.',
          },
          {
            title: 'Formulas & defaults',
            body: '“ARR = MRR × 12.” “Renewal defaults to order date + 365.” Computed fields and dynamic defaults use one expression language, so every entry point computes the same answer.',
          },
          {
            title: 'Typed business fields',
            body: 'Currency carries precision and symbol, percent carries its bounds, picklists carry colors and history tracking — field types carry meaning the UI, API, and agents all understand.',
          },
        ],
      },
      {
        id: 'designer',
        eyebrow: 'The object designer',
        title: 'Fine-tune fields, see the model as a diagram, mount the old database',
        copy:
          'The definition your agent writes opens as a visual surface in the open-source ObjectStack console — changing a field never requires reading a line of code.',
        items: [
          {
            title: 'The field editor',
            body: 'Click “+ Add field” to pick from 20+ types, drag rows to reorder, group fields into sections; the right-side inspector edits labels, required flags, options, and colors — every change lands as a draft.',
          },
          {
            title: 'See the diff before publishing',
            body: 'The designer’s review mode compares the draft against the published version item by item — added and modified fields at a glance, the same experience as reviewing an agent’s diff.',
          },
          {
            title: 'The ER diagram',
            body: 'Entity boxes, relationship lines with cardinality labels, auto-layout, and a minimap — the whole data model in one picture, and dragging a line is creating a relationship.',
          },
          {
            title: 'Datasource sync',
            body: 'Connection forms generate from the driver’s schema, “Test connection” verifies it, then pick from the remote table list — introspect an existing ERP or CRM database and mount its tables as governed objects.',
          },
        ],
      },
      {
        id: 'runtime-surfaces',
        eyebrow: 'From model to running system',
        title: 'The parts you never write again',
        copy:
          'Everything below is generated and kept in sync with the definition — which is exactly why an AI-written change stays a small, reviewable diff.',
        items: [
          {
            title: 'Tables & migrations',
            body: 'Add a “discount” field to the subscription and the migration appears on Postgres, MySQL, SQLite, Turso, or MongoDB — no SQL scripts to write or sequence.',
          },
          {
            title: 'Query engine',
            body: '“Subscriptions renewing this month with MRR over 10k” — one query language covers filtering, relations, and aggregation, with the permission model enforced on every request.',
          },
          {
            title: 'REST APIs',
            body: 'CRUD, batch, and discovery endpoints exist the moment an object does — the mobile team starts the next morning, with versioning, docs, and permission checks included.',
          },
          {
            title: 'File storage',
            body: 'Contract PDFs and invoice attachments ride on local disk or S3-compatible storage, with access control following the record they belong to.',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['Track subscriptions and customers', 'Objects, fields, relationships', 'Tables, migrations, referential integrity'],
        ['Seats can never be oversold', 'One validation expression', 'Enforcement on UI, API, imports, and AI writes'],
        ['An API for the mobile team', 'Nothing extra — the object is enough', 'REST endpoints with permissions and discovery'],
        ['Use the ERP database we already have', 'A federation definition', 'Introspected external tables as governed objects'],
      ],
    },
    checklistTitle: 'A data review should confirm',
    checklist: [
      'Every object maps to a business concept someone owns.',
      'Validations live in the definition, not in screens.',
      'Derived values are formulas, not copy-pasted logic.',
      'External systems are federated or integrated, not forked.',
      'API access rides the same permission model as the UI.',
    ],
    faqs: [
      {
        question: 'Which databases can it run on?',
        answer:
          'Postgres, MySQL, SQLite, Turso, and MongoDB are supported today, and the data layer is driver-based. Federation can additionally mount tables from external databases without moving the data.',
      },
      {
        question: 'Are the object designer and ER diagram in the open-source ObjectStack?',
        answer:
          'Yes. The object designer, the ER data-model designer, and datasource sync ship in the open-source ObjectStack console — alongside objects, relationships, validations, formulas, migrations, the query engine, REST APIs, and file storage.',
      },
    ],
  } satisfies MarketingPage;

export default page;
