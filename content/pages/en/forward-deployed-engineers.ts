import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'forward-deployed-engineers',
    navLabel: 'For FDEs',
    title: 'Forward-Deployed Engineer Tools: An Ontology-First, Open-Source Stack',
    description:
      'ObjectStack gives FDEs an open target format and governed runtime for a client-owned open business ontology; ObjectOS is the optional commercial platform for production operations.',
    eyebrow: 'For forward-deployed engineers',
    heroTitle: 'Ship like the best FDE teams. Hand over what they never do: the ontology.',
    lead:
      'The forward-deployed model won: embed with the client, model their business, deliver working software fast. Its weak point is the handover — the ontology stays locked in a platform the client rents forever. ObjectStack makes the ontology a set of typed, open files in the client’s repo and runs it with governed runtime enforcement. ObjectOS is the optional commercial production platform for clients who want in-app AI, managed or private deployment, and support.',
    primary: { label: 'Start with ObjectStack', href: 'https://github.com/objectstack-ai/objectstack' },
    secondary: { label: 'Read the FDE article', href: '/en/blog/forward-deployed-engineer-tools/' },
    metrics: [
      { value: '<150k tokens', label: 'A complete CRM including UI — small enough to review whole' },
      { value: '<100k tokens', label: 'Client-owned objects, workflows, permissions, and business logic' },
      { value: '~50k tokens', label: 'UI metadata added to the complete CRM definition' },
    ],
    artifact: {
      eyebrow: 'The deliverable',
      title: 'The handover is the product: an ontology in the client’s repo',
      body:
        'A forward-deployed engagement ends. What remains decides what it was worth: typed objects, permissions, and flows that the client’s own team — and their AI agents — can read, run, and keep changing without you.',
      code: `client-repo/
├── objectstack.config.ts   # the app manifest
├── src/objects/            # the client's nouns — typed, validated
├── src/flows/              # the client's verbs — approvals, automation
├── src/permissions/        # who may see and do what
└── dist/objectstack.json   # one artifact, runs on any ObjectStack runtime`,
    },
    sections: [
      {
        id: 'playbook',
        eyebrow: 'The playbook',
        title: 'Ontology-first, like the model that proved it',
        copy:
          'The FDE method that works front-loads the business ontology before any AI application ships — generic models give generic answers; value lives in the client’s nouns and verbs.',
        items: [
          {
            title: '1. Discover',
            body: 'Embed with the operators. Capture the objects, relationships, permissions, and approval paths that actually run the business.',
            meta: 'Embed',
          },
          {
            title: '2. Model',
            body: 'Turn discovery into typed metadata with your coding agent — objects, flows, permissions as compact, validated definitions.',
            meta: 'Write',
          },
          {
            title: '3. Ship',
            body: 'The ObjectStack runtime derives the database, REST APIs, admin Console, and MCP tools from the definition. Demo on real workflows the same week.',
            meta: 'Run',
          },
          {
            title: '4. Govern and leave',
            body: 'Permissions, approvals, and audit are enforced by the ObjectStack runtime — the system stays inside its fence after you roll off.',
            meta: 'Hand over',
          },
        ],
      },
      {
        id: 'why-open',
        eyebrow: 'Why open',
        title: 'The client keeps the ontology. You keep the client.',
        copy:
          'An open definition changes the economics of forward-deployed work: nothing about the engagement depends on reselling a platform seat.',
        items: [
          {
            title: 'No seat to sell',
            body: 'ObjectStack is Apache-2.0. Your bid is your engineering, not a license markup the client resents later.',
          },
          {
            title: 'Security review reads the diff',
            body: 'Permissions and audit are metadata. The client’s security team can review the complete definition — under 150k tokens for a full CRM, with business logic under 100k — instead of trusting a black-box platform boundary.',
          },
          {
            title: 'Any AI, under governance',
            body: 'The app is an MCP server out of the box — the client’s Claude, Cursor, or local models operate it inside user permissions.',
          },
          {
            title: 'Patterns compound',
            body: 'Every engagement leaves you reusable, typed patterns — objects, flows, permission sets — that your agent applies to the next client.',
          },
        ],
      },
    ],
    table: {
      columns: ['Engagement concern', 'Closed platform (e.g. Foundry)', 'Open ObjectStack + optional ObjectOS'],
      rows: [
        ['Where the ontology lives', 'Inside the vendor’s platform', 'Typed files in the client’s repo (Apache-2.0)'],
        ['What the client pays for', 'Platform seats, indefinitely', 'ObjectOS production operations — or self-host ObjectStack at no license cost'],
        ['Who maintains it later', 'Vendor-trained specialists', 'Any coding agent plus a human reviewer'],
        ['AI access', 'Platform-native assistants only', 'Open MCP — Claude, Cursor, local models'],
        ['Security review', 'Trust the platform boundary', 'Read the diff — permissions and audit are metadata'],
      ],
    },
    checklistTitle: 'FDE engagement checklist',
    checklist: [
      'Model the client’s nouns and verbs as objects and flows before any UI conversation.',
      'Keep the whole definition under the 150k-token complete-app budget, so your agent can reason about and refactor it whole.',
      'Default permissions conservative; make every authority change explicit in the diff.',
      'Hand over the repo, the compiled artifact, and a review checklist — not a login to your tenant.',
      'Leave MCP enabled so the client’s own AI can operate the app under their permissions.',
    ],
    faqs: [
      {
        question: 'Is this a Palantir Foundry replacement?',
        answer:
          'For the ontology-first application workflow — modeling a business and shipping governed apps on it — the overlap is real, and the definition layer here is open instead of proprietary. Foundry remains stronger for massive-scale data federation and analytics pipelines; many clients need only the application layer.',
      },
      {
        question: 'Do I need ObjectOS to serve clients?',
        answer:
          'No. ObjectStack is an open-source target format and runtime; its runtime can be self-hosted at no license cost, with Console and governance included. ObjectOS is the commercial production platform for clients who want the browser-based AI Builder, managed cloud or private Enterprise deployment, team operations, and support.',
      },
    ],
  } satisfies MarketingPage;

export default page;
