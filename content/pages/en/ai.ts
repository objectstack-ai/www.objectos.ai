import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'ai',
    navLabel: 'AI Build & Ask',
    title: 'AI Build & Ask: Create and Query Business Apps in Natural Language',
    description:
      'AI Build turns a described change into reviewable metadata. AI Ask answers questions over live business data inside user permissions. Open source brings your own agent via MCP.',
    eyebrow: 'AI Build & Ask',
    heroTitle: 'Describe the change. Review the diff. Ship the app.',
    lead:
      'AI Build drafts objects, fields, views, flows, and permissions from a plain-language request — and structural changes wait for your approval. AI Ask answers questions and runs approved actions over live data, always inside the permissions of the person asking.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See how agents write metadata', href: '/en/agent-developer/' },
    metrics: [
      { value: '2 modes', label: 'AI Build creates the system; AI Ask answers and acts' },
      { value: '~1%', label: 'Metadata surface the AI writes for CRUD/workflow apps' },
      { value: '0 bypasses', label: 'Every AI action runs inside user permissions and audit' },
    ],
    artifact: {
      eyebrow: 'The build loop',
      title: 'From one sentence to a governed application.',
      body:
        'The loop is designed so speed never outruns control: the AI moves fast on the draft, and a person owns the decision.',
      steps: [
        'Describe: “Track vendor contracts with renewal reminders and an approval for anything over $50k.”',
        'AI Build drafts the objects, fields, views, renewal flow, and permission model.',
        'Structural changes land in the approval queue as a compact, readable diff.',
        'You approve — the runtime ships tables, APIs, screens, automations, and audit.',
        'AI Ask now answers contract questions for each user, scoped to what they may see.',
      ],
    },
    sections: [
      {
        id: 'build',
        eyebrow: 'AI Build',
        title: 'The builder that produces definitions, not codebases',
        copy:
          'On Cloud and Enterprise, the in-app builder turns natural language into ObjectStack metadata — the same compact format a human administrator would review and own.',
        items: [
          {
            title: 'Whole-system drafts',
            body: 'One request can produce objects, relationships, views, flows, and permissions together, so the draft is a working system, not a fragment.',
          },
          {
            title: 'Approval before structure changes',
            body: 'Anything that changes the shape of the system — new objects, fields, permissions — queues for human sign-off with the full diff.',
          },
          {
            title: 'Small, reviewable iterations',
            body: 'Follow-up requests become small metadata diffs, which is what keeps iteration fast weeks and months after the first version ships.',
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
        eyebrow: 'Open source',
        title: 'Bring your own AI, keep the same governance',
        copy:
          'The open-source edition has no built-in assistant — by design. Your coding agent writes the same metadata as source files, and any MCP client queries the same governed objects.',
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
        ['Community (open source)', 'Your coding agent edits metadata source files; review as git diffs', 'Any MCP client queries governed objects with your own model'],
        ['Cloud Team & Business', 'In-app AI Build drafts changes; approvals gate structure', 'In-app AI Ask answers and runs approved actions'],
        ['Enterprise', 'Same, plus private deployment and bring-your-own-model', 'Same, plus local models and internal identity'],
      ],
    },
    faqs: [
      {
        question: 'What stops AI from breaking production?',
        answer:
          'Three runtime guarantees: structural changes require human approval, every action runs inside the requesting user’s permissions, and everything is audited. The AI can draft quickly precisely because it cannot ship silently.',
      },
      {
        question: 'Which models does it use?',
        answer:
          'Cloud editions run managed models behind AI Build and Ask. Open source brings your own — any MCP-compatible client or a local model. Enterprise adds bring-your-own-model for private deployments.',
      },
    ],
  } satisfies MarketingPage;

export default page;
