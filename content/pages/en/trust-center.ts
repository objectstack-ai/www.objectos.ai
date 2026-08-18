import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'trust-center',
    navLabel: 'Trust center',
    title: 'ObjectOS Trust Center for Governed AI Applications',
    description:
      'Review the ObjectOS trust model: data residency, self-hosted deployment, identity, permissions, approvals, audit logs, AI tool boundaries, and enterprise security review materials.',
    eyebrow: 'Trust center',
    heroTitle: 'AI can write software. The harder question is whether you can approve it.',
    lead:
      'ObjectOS is designed for the procurement, security, and IT review that happens after a demo works. It keeps business data under customer control and makes agent authority explicit in metadata and runtime enforcement.',
    primary: { label: 'Read the security model', href: '/en/security/' },
    secondary: { label: 'See deployment paths', href: '/en/pricing/' },
    metrics: [
      { value: 'Self-hosted', label: 'Run in your VPC, servers, or isolated network' },
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
          'ObjectOS can deploy and operate the ObjectStack runtime inside customer-controlled infrastructure. Unless you configure external providers, business records, prompts, files, audit logs, and credentials stay inside that boundary.',
        items: [
          {
            title: 'Data residency',
            body: 'Connect customer-controlled databases and storage. ObjectOS does not require application records to be copied into a vendor workspace.',
          },
          {
            title: 'No required telemetry',
            body: 'The open-source ObjectStack runtime does not need a license callback or product telemetry channel to operate.',
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
        ['Identity', 'Project identity and permission metadata', 'SSO, SCIM, admin roles, session policy mapping'],
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
          'Self-hosted deployments are controlled by the customer. Cloud or Enterprise data usage should be governed by the relevant commercial agreement; the product direction is to keep customer data out of general model training unless a customer explicitly agrees.',
      },
      {
        question: 'Can ObjectOS run without internet access?',
        answer:
          'Yes. ObjectOS Enterprise can operate the ObjectStack runtime in self-hosted and isolated deployment patterns. The exact model depends on package mirrors, model routing, identity, and customer infrastructure.',
      },
    ],
  } satisfies MarketingPage;

export default page;
