import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'app-ui',
    navLabel: 'App interfaces',
    title: 'ObjectOS App Interfaces: Permission-Aware Screens Rendered from Metadata',
    description:
      'Forms, views, and dashboards render straight from metadata — shaped by each user’s permissions, updated in real time, and localized — with no hand-built frontend for the CRUD surfaces.',
    eyebrow: 'App interfaces',
    heroTitle: 'Screens nobody hand-builds. Views everyone trusts.',
    lead:
      'Most business-app effort goes into screens that restate the data model: a list, a form, a dashboard, again and again. ObjectOS renders those surfaces from the definition itself — and every user sees exactly what their permissions allow, nothing more.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See analytics & reporting', href: '/en/analytics/' },
    metrics: [
      { value: 'Zero', label: 'Hand-built frontend for list, form, and detail surfaces' },
      { value: 'Per user', label: 'Rows, fields, and actions filtered by permissions' },
      { value: 'Live', label: 'Screens update in real time as records change' },
    ],
    artifact: {
      eyebrow: 'A screen as metadata',
      title: 'The view is part of the reviewable definition.',
      body:
        'Views, forms, and dashboards are declared next to the objects they present. When an agent adds a field or a status, the affected screens are part of the same small diff — not a separate frontend ticket.',
      code: `import { defineView } from '@objectstack/spec';

const data = { provider: 'object' as const, object: 'support_case' };

export const CaseViews = defineView({
  list: {
    label: 'All Cases',
    type: 'grid',
    data,
    columns: [
      { field: 'subject' },
      { field: 'customer' },
      { field: 'priority' },
      { field: 'status' },
      { field: 'due_date' },
    ],
    appearance: {
      allowedVisualizations: ['grid', 'kanban', 'calendar'],
    },
    kanban: { groupByField: 'status', columns: ['subject', 'customer', 'priority'] },
    calendar: { startDateField: 'due_date', titleField: 'subject', colorField: 'status' },
  },
  listViews: {
    open: {
      label: 'Open Cases',
      type: 'grid',
      data,
      columns: [{ field: 'subject' }, { field: 'customer' }, { field: 'priority' }],
      filter: [{ field: 'status', operator: 'equals', value: 'open' }],
    },
  },
});`,
    },
    sections: [
      {
        id: 'surfaces',
        eyebrow: 'Rendered from metadata',
        title: 'The surfaces every business app needs, supplied',
        copy:
          'Typed fields carry their own widgets and formatting, so generated screens look and behave consistently without a design system project.',
        items: [
          {
            title: 'Views & lists',
            body: 'Tables, kanbans, and filtered lists with sorting, saved filters, and bulk actions — declared, not built.',
          },
          {
            title: 'Forms & detail pages',
            body: 'Create and edit forms follow the field types and validations, so the UI can never drift from the rules.',
          },
          {
            title: 'Dashboards',
            body: 'Charts and counters over live data sit next to the records they summarize, sharing the same definitions.',
          },
          {
            title: 'Navigation & apps',
            body: 'Objects group into apps with menus and pages, so each team gets a focused workspace instead of one giant admin.',
          },
          {
            title: 'Multi-language UI',
            body: 'Labels, formats, and translations resolve per locale, so one definition serves every region.',
          },
        ],
      },
      {
        id: 'permission-aware',
        eyebrow: 'Permission-aware by construction',
        title: 'One screen definition, a different view for every user',
        copy:
          'Screens are not personalized by hand — they are shaped by the permission model. That is what keeps a generated UI trustworthy.',
        items: [
          {
            title: 'Rows they can see',
            body: 'Row-level rules filter every list and dashboard, so a rep, a manager, and an auditor see different data on the same screen.',
          },
          {
            title: 'Fields they can read',
            body: 'Masked and hidden fields stay masked in tables, forms, exports, and detail views — enforced by the runtime, not the frontend.',
          },
          {
            title: 'Actions they can take',
            body: 'Buttons and menu items appear only when the user’s permissions and the record’s state allow the action.',
          },
          {
            title: 'Real-time collaboration',
            body: 'Record changes, comments, and activity feeds stream to open screens, so teams work from the same live picture.',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['A workspace for the support team', 'Views, forms, and an app definition', 'Rendered screens, navigation, saved filters'],
        ['Managers see more than reps', 'Row and field rules on the object', 'The same screen, shaped per user'],
        ['A field only finance can edit', 'One field-level rule', 'Read-only rendering everywhere else'],
        ['Screens in three languages', 'Labels and locale settings', 'Localized UI from one definition'],
      ],
    },
    checklistTitle: 'A UI review should confirm',
    checklist: [
      'Screens are declared in metadata, not forked into custom code.',
      'Every list and dashboard respects row-level rules.',
      'Masked fields stay masked in exports and detail views.',
      'Actions are permission-gated, not just hidden.',
      'New fields reach screens through the same reviewed diff.',
    ],
    faqs: [
      {
        question: 'Can we still build custom screens?',
        answer:
          'Yes. The generated surfaces cover the repetitive CRUD majority, and the same APIs and permission model back any custom frontend you add — custom screens never bypass governance.',
      },
      {
        question: 'Are the app interfaces in the open-source edition?',
        answer:
          'Yes. Metadata-rendered views, forms, dashboards, navigation, localization, and real-time updates are part of the open-source runtime.',
      },
    ],
  } satisfies MarketingPage;

export default page;
