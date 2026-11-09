import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning.en;

const page = {
    slug: 'trust-center',
    navLabel: 'Trust center',
    title: 'ObjectOS Trust Center for Governed AI Applications',
    description:
      'Review the ObjectOS trust model: data residency, self-hosted deployment, identity, permissions, approvals, audit logs, AI tool boundaries, and enterprise security review materials.',
    eyebrow: 'Trust center',
    heroTitle: 'AI can write software. The harder question is whether you can approve it.',
    lead:
      `ObjectOS is designed for the procurement, security, and IT review that happens after a demo works. ${p.e1} On every edition, agent authority is explicit in metadata and runtime enforcement.`,
    primary: { label: 'Read the security model', href: '/en/security/' },
    secondary: { label: 'See deployment paths', href: '/en/pricing/' },
    metrics: [
      { value: '3 editions', label: `${p.descriptor}: open source and free to self-host; hosted in the browser with nothing to install; self-managed on your own infrastructure` },
      { value: 'User scoped', label: 'Agents inherit the signed-in user permissions' },
      { value: 'Auditable', label: 'Reads, writes, tool calls, approvals, and schema changes' },
    ],
    artifact: {
      eyebrow: 'Security review packet',
      title: 'What a reviewer should receive before sign-off',
      body:
        'A governed AI app should arrive with an architecture boundary, object authority map, approval policy, audit plan, integration list, model routing, and rollback plan. ObjectStack metadata is structured so those materials can be generated from the same source definitions.',
      steps: [
        'Deployment boundary: where runtime, database, files, identity, and models run.',
        'Authority map: object, record, field, workflow, action, and AI tool permissions.',
        'Audit plan: what is logged for people, agents, APIs, and approvals.',
        'Change plan: how metadata changes are reviewed, promoted, and rolled back.',
      ],
    },
    sections: [
      {
        id: 'gates',
        eyebrow: 'Four gates',
        title: 'Four gates every AI action passes',
        copy:
          'Leadership asks one question: how do we stop the AI from doing something wrong? This is the answer as a checklist, and each gate links to the page that shows how it works. Undo is not on the list. The audit log shows each change old → new, but we do not claim a one-step revert of an AI action, so it does not count as a gate.',
        items: [
          {
            meta: 'Gate 1 · Permissions',
            title: 'Same access as the person it works for',
            body: 'AI can see and do only what the person it is working for is allowed to see and do.',
            href: '/en/permissions/#ai-safety',
          },
          {
            meta: 'Gate 2 · Data rules',
            title: 'The same automatic checks',
            body: 'The rules that stop a person saving bad data stop the AI too. They run on every write, whoever makes it.',
            href: '/en/data-modeling/#modeling',
          },
          {
            meta: 'Gate 3 · Approvals',
            title: 'Sensitive changes wait for a person',
            body: 'A structural change, or an action you mark for sign-off such as a refund or a bulk update, waits for a person to approve it.',
            href: '/en/approvals/#ai-gate',
          },
          {
            meta: 'Gate 4 · Audit',
            title: 'Every AI tool call leaves a trail',
            body: 'AI tool calls land in the same audit log as people’s actions, so reviewing the AI is the same job as reviewing your team.',
            href: '/en/permissions/#admin',
          },
        ],
      },
      {
        id: 'boundaries',
        eyebrow: 'Boundaries',
        title: 'Keep sensitive business data inside controlled infrastructure',
        copy:
          'On ObjectOS Enterprise, a private deployment, the runtime, your business data, user identities, audit log, files, and secrets all live in your own infrastructure; unless you configure external providers, they stay inside that boundary. ObjectOS Cloud is operated by us.',
        items: [
          {
            title: 'Data residency',
            body: 'On ObjectOS Enterprise, connect your own databases and storage: business records, identities, audit logs, and files live there, not in a vendor workspace.',
          },
          {
            title: 'License check',
            body: 'Self-managed ObjectOS Enterprise validates its license online (air-gapped Enterprise licenses are offline-validated). The open-source ObjectStack runtime has no telemetry, no license check, and no update ping.',
          },
          {
            title: 'Model choice',
            body: 'Use cloud models, private endpoints, or local models based on the sensitivity of the workflow and deployment.',
          },
        ],
      },
      {
        id: 'authority',
        eyebrow: 'Authority',
        title: 'AI acts through governed tools, not raw database access',
        copy:
          'The runtime evaluates identity, roles, row rules, field rules, approval policy, and action contracts before an AI tool can read or write data.',
        items: [
          {
            title: 'Signed-in user inheritance',
            body: 'AI sees what the user can see and acts only within the user authority unless an explicitly approved service role is configured.',
          },
          {
            title: 'Approval before sensitive writes',
            body: 'High-risk actions such as refunds, contract changes, escalations, exports, and permission updates can require human approval.',
          },
          {
            title: 'Field-level controls',
            body: 'Sensitive fields can be hidden, read-only, masked, or excluded from AI tool exposure even when the record itself is visible.',
          },
        ],
      },
    ],
    table: {
      columns: ['Review area', 'Available now', 'Enterprise packet'],
      rows: [
        ['Deployment', 'Self-hosted open-source ObjectStack runtime', 'VPC, private network, air-gapped deployment notes'],
        ['Identity', 'Project identity and permission metadata; SSO / SAML / OIDC included free in the open-source framework', 'SCIM and identity lifecycle, admin roles, session policy mapping'],
        ['AI governance', 'MCP tools, object permissions, approvals', 'Model routing policy and prompt/data boundary report'],
        ['Audit', 'Runtime audit design and metadata review', 'Exportable audit retention and investigation workflow'],
      ],
    },
    checklistTitle: 'Security review checklist',
    checklist: [
      'Where does each class of business data live?',
      'Which model endpoints can receive prompts or retrieved records?',
      'Which objects, fields, and actions are exposed to AI tools?',
      'Which writes require human approval?',
      'How are user actions and agent actions distinguished in audit?',
      'How is a bad metadata change rolled back?',
    ],
    faqs: [
      {
        question: 'Does ObjectOS train models on customer data?',
        answer:
          'If you enable AI features or connect a model provider, prompts, context, Customer Data, and outputs may be sent to the selected provider as necessary to perform the request. We do not use Customer Data from paid Cloud Services to train general-purpose models unless the customer affirmatively agrees or a separate agreement expressly permits it. The Privacy Policy is the governing text.',
      },
      {
        question: 'Can ObjectOS run without internet access?',
        answer:
          'Yes. ObjectOS Enterprise can operate the ObjectStack runtime in self-hosted and isolated deployment patterns. The exact model depends on package mirrors, model routing, identity, and customer infrastructure.',
      },
    ],
  } satisfies MarketingPage;

export default page;
