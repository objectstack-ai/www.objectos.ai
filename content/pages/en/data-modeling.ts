import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'data-modeling',
    navLabel: 'Data modeling',
    title: 'ObjectOS Data Modeling: From Business Objects to Database and APIs',
    description:
      'Objects, relationships, validations, and formulas become tables, migrations, a query language, and REST APIs — on Postgres, MySQL, SQLite, MongoDB, and more, with existing databases federated in place.',
    eyebrow: 'Data modeling',
    heroTitle: 'Describe the business objects. The database and APIs follow.',
    lead:
      'Every business system starts with the same question: what are we keeping track of? In ObjectOS the answer is a compact object definition — and the tables, migrations, query engine, and REST endpoints are supplied by the runtime instead of written by hand.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See process automation', href: '/en/automation/' },
    metrics: [
      { value: '5+', label: 'Databases: Postgres, MySQL, SQLite, Turso, MongoDB' },
      { value: 'Zero', label: 'Hand-written endpoints — REST APIs come from metadata' },
      { value: 'In place', label: 'Existing databases federate without migration' },
    ],
    artifact: {
      eyebrow: 'The model is the source',
      title: 'One object definition. Schema, rules, and API included.',
      body:
        'Fields, relationships, validation, and computed values live in one reviewable definition. The runtime turns it into tables and migrations, enforces the rules on every write, and serves the API — the same definition an AI agent can read and extend.',
      code: `defineObject('Subscription', {
  fields: {
    customer: relation('Customer', { required: true }),
    plan: picklist(['starter', 'team', 'business']),
    seats: integer({ min: 1 }),
    mrr: formula('seats * plan.pricePerSeat'),
    renewsAt: date(),
  },
  validate: {
    seatLimit: rule('seats <= plan.maxSeats', 'Too many seats for this plan'),
  },
});`,
    },
    sections: [
      {
        id: 'modeling',
        eyebrow: 'Model the business',
        title: 'A vocabulary your team — and your agent — can read',
        copy:
          'Definitions stay close to how the business talks: customers, orders, cases, approvals. No ORM classes, no scattered schema files.',
        items: [
          {
            title: 'Objects & relationships',
            body: 'Model records and how they connect — lookups, master-detail, many-to-many — and the runtime keeps referential integrity for you.',
          },
          {
            title: 'Validations & rules',
            body: 'Declare constraints as expressions next to the fields they protect. They run on every write path: UI, API, imports, and AI tools.',
          },
          {
            title: 'Formulas & defaults',
            body: 'Computed fields and dynamic defaults use one expression language across the platform, so derived values stay consistent everywhere.',
          },
          {
            title: 'Typed business fields',
            body: 'Currency, percent, picklists, dates, files, and relations — field types carry meaning the UI, API, and agents all understand.',
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
            body: 'Schema changes become migrations on Postgres, MySQL, SQLite, Turso, or MongoDB — no SQL scripts to write or sequence.',
          },
          {
            title: 'Query engine',
            body: 'One query language with filtering, relations, and aggregation, enforced by the permission model on every request.',
          },
          {
            title: 'REST APIs',
            body: 'CRUD, batch, and discovery endpoints exist the moment an object does — versioned, documented, and permission-checked.',
          },
          {
            title: 'Existing databases, federated',
            body: 'Introspect an external database and mount its tables as objects — add permissions, workflows, and AI tools without migrating the data.',
          },
          {
            title: 'File storage',
            body: 'Attachments and documents ride on local disk or S3-compatible storage, with access control following the record they belong to.',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['Track customers and orders', 'Objects, fields, relationships', 'Tables, migrations, referential integrity'],
        ['Keep bad data out', 'Validation rules as expressions', 'Enforcement on UI, API, imports, and AI writes'],
        ['An API for the mobile team', 'Nothing extra — the object is enough', 'REST endpoints with permissions and discovery'],
        ['Use the ERP database we already have', 'A federation definition', 'External tables mounted as governed objects'],
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
        question: 'Is the data layer in the open-source edition?',
        answer:
          'Yes. Objects, relationships, validations, formulas, migrations, the query engine, REST APIs, federation, and file storage are all part of the open-source runtime.',
      },
    ],
  } satisfies MarketingPage;

export default page;
