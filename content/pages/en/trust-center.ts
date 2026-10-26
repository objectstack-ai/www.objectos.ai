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
      `ObjectOS is designed for the procurement, security, and IT review that happens after a demo works. ${p.e1} On either edition, agent authority is explicit in metadata and runtime enforcement.`,
    primary: { label: 'Read the security model', href: '/en/security/' },
    secondary: { label: 'See deployment paths', href: '/en/pricing/' },
    metrics: [
      { value: '2 editions', label: 'Hosted on ObjectOS Cloud, or self-managed on your own infrastructure with ObjectOS Enterprise' },
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
        id: 'boundaries',
        eyebrow: 'Boundaries',
        title: 'Keep sensitive business data inside controlled infrastructure',
        copy:
          'On ObjectOS Enterprise — from its single-node entry option, Business Self-Managed, up — the runtime, your business data, user identities, audit log, files, and secrets all live in your own infrastructure; unless you configure external providers, they stay inside that boundary. ObjectOS Cloud is operated by us.',
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
        ['Identity', 'Project identity and permission metadata; SSO / SAML from ObjectOS Business', 'SCIM and identity lifecycle, admin roles, session policy mapping'],
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
