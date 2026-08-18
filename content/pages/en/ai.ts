import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'ai',
    navLabel: 'AI Build & Ask',
    title: 'AI Build & Ask: Create and Query Business Apps in Natural Language',
    description:
      'ObjectOS AI Build turns a described change into reviewable ObjectStack metadata. AI Ask answers over live business data inside user permissions; open-source ObjectStack supports your own agent via MCP.',
    eyebrow: 'AI Build & Ask',
    heroTitle: 'Describe the change. Review the diff. Ship the app.',
    lead:
      'Developers build ObjectStack apps by pointing a coding agent like Claude Code at the source project. ObjectOS adds a second path for teams: business users describe the change in conversation on Cloud or Enterprise. Both produce the same typed ObjectStack metadata and run on the same governed runtime; ObjectOS AI Ask answers and acts on live data inside the permissions of the person asking.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See how agents write metadata', href: '/en/agent-developer/' },
    metrics: [
      { value: '2 paths', label: 'Build with a coding agent in source, or by conversation in the cloud' },
      { value: '<150k tokens', label: 'A complete CRM, including UI, held in one context window' },
      { value: '0 bypasses', label: 'Every AI action runs inside user permissions and audit' },
    ],
    artifact: {
      eyebrow: 'The build loop',
      title: 'From one sentence to a governed application.',
      body:
        'The loop is designed so speed never outruns control: the AI moves fast on the draft, and a person owns the decision.',
      steps: [
        'Describe: “Track vendor contracts with renewal reminders and an approval for anything over $50k.”',
        'Your AI — a coding agent in source, or the in-app builder — drafts the objects, fields, views, and renewal flow.',
        'Structural changes land in the approval queue as a compact, readable diff.',
        'You approve — the ObjectStack runtime derives and ships tables, APIs, screens, automations, and audit.',
        'AI Ask now answers contract questions for each user, scoped to what they may see.',
      ],
    },
    sections: [
      {
        id: 'build',
        eyebrow: 'AI Build',
        title: 'Two ways to build — one reviewable definition',
        copy:
          'Whether the AI works in your repository or in an ObjectOS chat panel, the output is the same typed ObjectStack metadata a human reviews and owns. A complete CRM is under 150k tokens: business logic — objects, workflows, and permissions — stays under 100k, and UI metadata adds about 50k.',
        items: [
          {
            title: 'In source, with your coding agent',
            body: 'Developers point Claude Code, Cursor, or any coding agent at the project; it writes every metadata type as source files, previewed in the browser and reviewed as a git diff — a Salesforce DX-style workflow.',
          },
          {
            title: 'In the cloud, by conversation',
            body: 'On ObjectOS Cloud and Enterprise, business users describe the change in chat; the in-app builder drafts it as ObjectStack metadata with live preview — Airtable-style ease with runtime governance.',
          },
          {
            title: 'Visual designers to fine-tune',
            body: 'Objects, views, flows, and dashboards each have a designer — drag-to-reorder fields, a flow canvas, kanban column config — and review mode diffs the draft against the published version, so tuning what the AI drafted never touches a file.',
          },
          {
            title: 'Approval before structure changes',
            body: 'Anything that changes the shape of the system queues for human sign-off with the full diff — on either path.',
          },
        ],
      },
      {
        id: 'ask',
        eyebrow: 'AI Ask',
        title: 'Answers and actions over live business data',
        copy:
          'AI Ask works inside the product, over real records — not a stale export — and it never sees more than the person asking.',
        items: [
          {
            title: 'Question the business',
            body: '“Which contracts renew this quarter?” “Which vendors slipped SLA twice?” — answered from live objects with permissions applied.',
          },
          {
            title: 'Run approved actions',
            body: 'Ask can trigger actions that metadata explicitly exposes — assign, escalate, generate a summary — within the user’s rights.',
          },
          {
            title: 'Everything on the record',
            body: 'Every Ask query and action lands in the audit log alongside human activity, so review works the same for both.',
          },
        ],
      },
      {
        id: 'byo-ai',
        eyebrow: 'Open-source ObjectStack',
        title: 'Bring your own AI, keep the same governance',
        copy:
          'Open-source ObjectStack has no built-in assistant — by design. Your coding agent writes the same metadata as source files, and any MCP client queries the same governed objects through its open runtime.',
        items: [
          {
            title: 'Agent writes source files',
            body: 'Claude Code, Cursor, or any coding agent edits ObjectStack definitions in your repo; review happens as ordinary git diffs.',
          },
          {
            title: 'Any MCP client can ask',
            body: 'The MCP server exposes your objects, queries, and actions to whatever model you run — hosted or fully local.',
          },
          {
            title: 'Same runtime, same rules',
            body: 'Permissions, approvals, and audit apply identically. The edition changes who hosts the AI, never how it is governed.',
          },
        ],
      },
    ],
    table: {
      columns: ['Edition', 'How AI builds', 'How AI answers'],
      rows: [
        ['Open-source ObjectStack', 'Your coding agent edits metadata source files; review as git diffs', 'Any MCP client queries governed objects with your own model'],
        ['ObjectOS Cloud Team & Business', 'In-app AI Build drafts changes; approvals gate structure', 'In-app AI Ask answers and runs approved actions'],
        ['ObjectOS Enterprise', 'Same, plus private deployment and bring-your-own-model', 'Same, plus local models and internal identity'],
      ],
    },
    faqs: [
      {
        question: 'What stops AI from breaking production?',
        answer:
          'The ObjectStack runtime enforces three guarantees: structural changes require human approval, every action runs inside the requesting user’s permissions, and everything is audited. ObjectOS makes that approval and audit loop available in the production product, so AI can draft quickly but cannot ship silently.',
      },
      {
        question: 'Which models does it use?',
        answer:
          'Cloud editions run managed models behind AI Build and Ask. The open-source ObjectStack brings your own — any MCP-compatible client or a local model. Enterprise adds bring-your-own-model for private deployments.',
      },
    ],
  } satisfies MarketingPage;

export default page;
