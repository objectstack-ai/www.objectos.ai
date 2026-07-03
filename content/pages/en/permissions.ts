import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'permissions',
    navLabel: 'Permissions & security',
    title: 'ObjectOS Permissions: Role, Row, and Field-Level Control for AI-Written Apps',
    description:
      'Role-based, row-level, and field-level access control with record sharing, tenant isolation, and an immutable audit trail — enforced on people and AI agents alike.',
    eyebrow: 'Permissions & security',
    heroTitle: 'Who sees what, who changes what — enforced at runtime.',
    lead:
      'Business software lives or dies on authority: which team reads a record, which fields stay masked, which changes need sign-off. ObjectOS makes that authority part of the reviewable definition and enforces it on every query, API call, and AI tool call.',
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
        'Instead of authorization logic scattered across controllers and screens, authority is a compact definition: who, over which rows, down to which fields. The runtime enforces it everywhere — UI, API, and AI tools.',
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
      roles: ['support'],
      enabled: true,
      priority: 10,
    },
  ],
};`,
    },
    sections: [
      {
        id: 'layers',
        eyebrow: 'Access model',
        title: 'Control that matches how organizations actually work',
        copy:
          'One model covers the whole spectrum — from broad role grants to a single shared record — so exceptions do not turn into custom code.',
        items: [
          {
            title: 'Roles & permission sets',
            body: 'Grant object-level rights by role or permission set, with a secure-by-default posture: nothing is readable until a definition says so.',
          },
          {
            title: 'Row-level rules',
            body: 'Scope records by owner, team, or organization hierarchy — a rep sees their accounts, a manager sees the region, and the rule is one line of metadata.',
          },
          {
            title: 'Field-level security',
            body: 'Mask or hide sensitive fields per role. A masked field stays masked in the UI, the API, exports, and every AI response.',
          },
          {
            title: 'Record sharing',
            body: 'Grant case-by-case access to a single record without widening a role — the exception is stored, visible, and revocable.',
          },
          {
            title: 'Tenant isolation',
            body: 'Organizations and workspaces stay isolated at the runtime layer, so multi-team and multi-client deployments share nothing by accident.',
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
            body: 'An agent answering a question or running an action sees exactly the rows and fields its user could see — nothing more.',
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
        ['Can AI see salary fields?', 'Field rules with masking', 'Masked fields in UI, API, exports, and AI answers'],
        ['Who approved this change?', 'Approval requirements on actions', 'Queues, sign-off records, immutable audit entries'],
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
        question: 'Is this in the open-source edition?',
        answer:
          'Yes. The permission model — roles, row rules, field security, sharing, tenant isolation, and audit logging — is part of the open-source runtime, and it applies equally to MCP tool access.',
      },
    ],
  } satisfies MarketingPage;

export default page;
