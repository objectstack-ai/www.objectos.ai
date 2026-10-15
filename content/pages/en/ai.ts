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
      { value: 'Held whole', label: 'Apps small enough for AI to hold whole — the bundled CRM loads end-to-end' },
      { value: 'Business+', label: 'AI action audit, guardrails, and permission scoping start on ObjectOS Business' },
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
          'Whether the AI works in your repository or in an ObjectOS chat panel, the output is the same typed ObjectStack metadata a human reviews and owns. The definition stays small enough for an agent to hold whole: the objectstack README’s bundled CRM — objects, views, a dashboard, a lead-conversion flow, permission sets, actions, translations — loads end-to-end and refactors in one change.',
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
            body: 'On ObjectOS Business and Enterprise, Ask queries and actions land in the audit log alongside human activity, so review works the same for both.',
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
            body: 'npm create objectstack@latest scaffolds a project and writes an AGENTS.md, so Claude Code, Cursor, or any coding agent starts with the protocol’s rules loaded; it edits ObjectStack definitions in your repo, npx os dev --ui renders them, and review happens as ordinary git diffs.',
          },
          {
            title: 'Any MCP client can ask',
            body: 'The MCP server exposes your objects, queries, and actions to whatever model you run — hosted or fully local.',
          },
          {
            title: 'Same runtime, governance by edition',
            body: 'On the open-source runtime, MCP tool calls run inside the caller’s permissions and land in the audit log. ObjectOS adds in-app AI by edition: a taste on Free, in-app AI Build and Ask on Team, and AI governance — action audit, guardrails, permission scoping — from Business.',
          },
        ],
      },
    ],
    table: {
      columns: ['Edition', 'How AI builds', 'How AI answers'],
      rows: [
        ['Open-source ObjectStack', 'Your coding agent edits metadata source files; review as git diffs', 'Any MCP client queries governed objects with your own model'],
        ['ObjectOS Cloud Free', 'A taste of in-app AI Build', 'A taste of in-app AI Ask'],
        ['ObjectOS Cloud Team', 'In-app AI Build drafts changes; approvals gate structure', 'In-app AI Ask answers and runs approved actions'],
        ['ObjectOS Business (Cloud or Self-Managed)', 'Same, plus AI governance: action audit, guardrails, permission scoping', 'Same, with Ask queries and actions audited and guardrailed'],
        ['ObjectOS Enterprise', 'Same, plus private deployment and bring-your-own-model', 'Same, plus local models and internal identity'],
      ],
    },
    faqs: [
      {
        question: 'What stops AI from breaking production?',
        answer:
          'The ObjectStack runtime enforces two guarantees for any agent working over MCP: structural changes require human approval, and every tool call runs inside the requesting user’s permissions and is audited. ObjectOS Business and Enterprise add AI governance for the in-app AI — action audit, guardrails, permission scoping — so AI can draft quickly but cannot ship silently.',
      },
      {
        question: 'Which models does it use?',
        answer:
          'Cloud editions run managed models behind AI Build and Ask. The open-source ObjectStack brings your own — any MCP-compatible client or a local model. Business Self-Managed and Enterprise private deployments bring your own model or key.',
      },
    ],
  } satisfies MarketingPage;

export default page;
