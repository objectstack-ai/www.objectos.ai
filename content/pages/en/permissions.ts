import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'permissions',
    navLabel: 'Permissions & security',
    title: 'ObjectOS Permissions: Role, Row, and Field-Level Control for AI-Written Apps',
    description:
      'Role-based, row-level, and field-level access control with a permission matrix editor and an audit log viewer, record sharing, and tenant isolation — enforced on people and AI agents alike.',
    eyebrow: 'Permissions & security',
    heroTitle: 'Who sees what, who changes what — enforced at runtime.',
    lead:
      'Take a sales organization: reps see only their team’s accounts, the cost field is masked for them, managers see the whole region, and audit wants to know who changed that discount. In ObjectOS that boundary is one reviewable definition — enforced on every query, API call, and AI tool call.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'Review the trust model', href: '/en/trust-center/' },
    metrics: [
      { value: '3 layers', label: 'Object, record, and field-level control in one model' },
      { value: 'Per user', label: 'AI agents inherit the signed-in user’s permissions' },
      { value: 'Immutable', label: 'Audit trail for reads, writes, grants, and tool calls' },
    ],
    artifact: {
      eyebrow: 'Authority as metadata',
      title: 'Permissions a reviewer can actually read.',
      body:
        'This is that sales scenario: cases readable and creatable, accounts read-only, payout read-only and SSN invisible, and a row rule that scopes reps to their own team. The runtime enforces it everywhere — UI, API, and AI tools.',
      code: `export const SupportPermissionSet = {
  name: 'support_agent',
  label: 'Support Agent',
  objects: {
    support_case: { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: false },
    crm_account: { allowRead: true, allowCreate: false, allowEdit: false, allowDelete: false },
  },
  // Field-level security
  fields: {
    payout: { readable: true, editable: false },
    ssn: { readable: false, editable: false },
  },
  // Row-level security — CEL predicates enforced on every query
  rowLevelSecurity: [
    {
      name: 'case_own_team',
      label: 'Own Team Cases Only',
      object: 'support_case',
      operation: 'select' as const,
      using: 'team == current_user.team',
      positions: ['support'],
      enabled: true,
    },
  ],
};`,
    },
    sections: [
      {
        id: 'layers',
        eyebrow: 'Access model',
        title: 'Lay the sales org’s boundaries down layer by layer',
        copy:
          'One model covers the whole spectrum — from broad role grants to a single shared record — so exceptions do not turn into custom code.',
        items: [
          {
            title: 'Roles & permission sets',
            body: '“Sales rep” is a permission set: accounts readable and creatable, orders editable, quotes never deletable. Secure by default — nothing is readable until a definition says so.',
          },
          {
            title: 'Row-level rules',
            body: 'One expression — team == current_user.team — and reps see only their team; switch it to the manager hierarchy and a manager sees the region. Filtering happens inside the query engine, so there is nothing to bypass.',
          },
          {
            title: 'Field-level security',
            body: 'Cost is read-only for reps, SSN invisible entirely — a masked field stays masked in the UI, the API, exports, and every AI response.',
          },
          {
            title: 'Record sharing',
            body: 'Two teams collaborating on one big account? Share that single record with the collaborator instead of widening a whole role — the exception is stored, visible, and revocable.',
          },
          {
            title: 'Tenant isolation',
            body: 'Organizations and workspaces stay isolated at the runtime layer, so multi-team and multi-client deployments share nothing by accident.',
          },
        ],
      },
      {
        id: 'admin',
        eyebrow: 'The admin surfaces',
        title: 'Checked off in a matrix, answered from a log',
        copy:
          'The permission definition your agent writes opens as a familiar matrix in the open-source ObjectStack console — and when something looks wrong, the audit viewer answers it line by line.',
        items: [
          {
            title: 'The permission matrix editor',
            body: 'A Salesforce-style layout: object-level create/read/edit/delete and View All / Modify All checkboxes on top; click an object and the lower half switches to its field-level read/write matrix.',
          },
          {
            title: 'Assignments in plain sight',
            body: 'Every permission set page lists who it is assigned to — reviewing authority never means cross-referencing another screen.',
          },
          {
            title: 'The audit log viewer',
            body: 'Filter by action, object, actor, and date; open any entry and a side drawer shows the full event with old → new value diffs — “who changed that discount” is three clicks to an answer.',
          },
          {
            title: 'AI calls, side by side',
            body: 'AI tool calls appear in the same log as human activity — same filters, same diffs — so reviewing the AI is the same job as reviewing people.',
          },
        ],
      },
      {
        id: 'ai-safety',
        eyebrow: 'AI under the same rules',
        title: 'Agents get your permission model, not a service account',
        copy:
          'The fastest way to lose control of AI is to give it superuser access. ObjectOS never does: every agent action runs as the signed-in user who asked for it.',
        items: [
          {
            title: 'User-scoped execution',
            body: 'A rep asks the AI “which of my accounts are likely to renew” — the AI sees that rep’s team’s accounts, with cost still masked. Nothing more.',
          },
          {
            title: 'Approval-gated writes',
            body: 'Structural changes and sensitive actions queue for human sign-off before they execute, with the full diff attached.',
          },
          {
            title: 'Everything audited',
            body: 'Record changes, permission grants, session revocations, approval decisions, and AI tool calls all land in the immutable audit log.',
          },
        ],
      },
    ],
    table: {
      columns: ['A reviewer asks', 'AI writes', 'Runtime enforces'],
      rows: [
        ['Who can read this object?', 'Roles and permission sets in metadata', 'Checks on every query, API call, and tool call'],
        ['Which rows can a rep see?', 'A row rule scoped by owner or team', 'Filters applied inside the query engine'],
        ['Can AI see the cost field?', 'Field rules with masking', 'Masked fields in UI, API, exports, and AI answers'],
        ['Who changed that discount?', 'Nothing — audit ships with the runtime', 'Old → new diffs, entry by entry, in the audit viewer'],
      ],
    },
    checklistTitle: 'A security review should confirm',
    checklist: [
      'Every object has an explicit read and write policy.',
      'Row rules match the org hierarchy, not a copy of it.',
      'Sensitive fields are masked for every consumer, including AI.',
      'Structural changes cannot ship without an approval record.',
      'The audit log captures tool calls, not just record writes.',
    ],
    faqs: [
      {
        question: 'Do AI agents get their own service account?',
        answer:
          'No. Agents act as the signed-in user and inherit that user’s object, row, and field permissions. There is no privileged AI identity to leak or misuse.',
      },
      {
        question: 'Are the permission matrix and audit viewer in the open-source ObjectStack?',
        answer:
          'Yes. The permission matrix editor and the audit log viewer ship in the open-source ObjectStack console — alongside roles, row rules, field security, sharing, tenant isolation, and the audit log itself, all of which apply equally to MCP tool access.',
      },
    ],
  } satisfies MarketingPage;

export default page;
