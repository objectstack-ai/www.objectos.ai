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
      { value: 'Enterprise', label: 'AI action audit, guardrails, and permission scoping are part of ObjectOS Enterprise' },
    ],
    artifact: {
      eyebrow: 'The build loop',
      title: 'From one sentence to a governed application.',
      body:
        'The loop is designed so speed never outruns control: the AI moves fast on the draft, and a person owns the decision.',
      steps: [
        'Describe: “Track vendor contracts with renewal reminders and an approval for anything over $50k.”',
        'Your AI — a coding agent in source, or the in-app builder — drafts the objects, fields, views, and renewal flow.',
        'In source, the change is a compact git diff you review; on ObjectOS Cloud, a change to a live app that already holds records is saved as a draft for a person to publish.',
        'Once it is merged or published, the ObjectStack runtime derives and ships tables, APIs, screens, automations, and audit.',
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
            title: 'A person publishes changes to a live app',
            body: 'In source, your agent’s change is a git diff you review and merge. On ObjectOS Cloud, the builder publishes a first build right away; once the app is live and holds records, a change is saved as a draft until a person publishes it.',
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
            title: 'Run actions exposed to AI',
            body: 'Ask can run actions an admin has exposed to AI — assign, escalate, generate a summary — within the user’s permissions.',
          },
          {
            title: 'Everything on the record',
            body: 'On ObjectOS Enterprise, Ask queries and actions land in the audit log alongside human activity, so review works the same for both.',
          },
        ],
      },
      {
        id: 'ask-sources',
        eyebrow: 'AI Ask',
        title: 'Ask: every number shows its source',
        copy:
          'Ask about the business in plain language, then check any figure in the answer. Ask is built into ObjectOS Cloud and Enterprise (a preview on Enterprise).',
        items: [
          {
            title: 'A source line with every figure',
            body: 'Each answer says where its numbers come from: the object, the filters, what was measured, and how it was grouped.',
          },
          {
            title: 'Links to the records',
            body: 'A record the answer names comes with a link to it, so you can open what sits behind a figure.',
          },
          {
            title: 'Only what you may see',
            body: 'Ask reads with the permissions of the person asking, so an answer never draws on records or fields that person cannot see.',
          },
        ],
      },
      {
        id: 'record-edits',
        eyebrow: 'AI record edits',
        title: 'AI edits wait for you',
        copy:
          'When you ask the in-product AI to add or change a record, nothing is saved until you confirm. Built into ObjectOS Cloud and Enterprise (a preview on Enterprise).',
        items: [
          {
            title: 'Old and new values first',
            body: 'The AI proposes the change on a card that lists each field, and on an update shows the stored value beside the new one.',
          },
          {
            title: 'Runs as you, after you confirm',
            body: 'Only the person who asked can confirm the change. It then runs with that person’s permissions, under the same record, field, and validation rules as saving the form.',
          },
          {
            title: 'One record at a time',
            body: 'The in-product AI changes one record per confirmation. It cannot delete records or edit them in bulk; for those it points you to the record or the list.',
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
            body: 'On the open-source runtime, MCP tool calls run inside the caller’s permissions, and the record reads and writes they make are audited. ObjectOS adds in-app AI by edition: a taste on Free, in-app AI Build and Ask on Team, and on Enterprise the same AI as a preview plus AI governance — per-call audit of the in-app AI’s tool calls, guardrails, permission scoping.',
          },
        ],
      },
    ],
    table: {
      columns: ['Edition', 'How AI builds', 'How AI answers'],
      rows: [
        ['Open-source ObjectStack', 'Your coding agent edits metadata source files; review as git diffs', 'Any MCP client queries governed objects with your own model'],
        ['ObjectOS Cloud Free', 'A taste of in-app AI Build', 'A taste of in-app AI Ask'],
        ['ObjectOS Cloud Team', 'In-app AI Build drafts changes; a change to a live app that holds records waits as a draft for a person to publish', 'In-app AI Ask answers with a source line and proposes record changes the user confirms'],
        ['ObjectOS Enterprise (self-managed or by contract)', 'Same, as a preview, plus AI governance: per-call audit of the in-app AI’s tool calls, guardrails, permission scoping; on your own infrastructure with bring-your-own-model', 'Same, as a preview, with Ask’s tool calls audited and guardrailed, plus local models and internal identity'],
      ],
    },
    faqs: [
      {
        question: 'What stops AI from breaking production?',
        answer:
          'For any agent working over MCP, the ObjectStack runtime runs each tool call inside the requesting user’s permissions and audits the record reads and writes it makes. In the product, an AI record change runs only after the user confirms it, and on ObjectOS Cloud a change to a live app that already holds records waits as a draft for a person to publish. ObjectOS Enterprise adds AI governance for the in-app AI — per-call audit of its tool calls, guardrails, permission scoping; an external MCP agent is outside that per-call audit.',
      },
      {
        question: 'Which models does it use?',
        answer:
          'Cloud editions run managed models behind AI Build and Ask. The open-source ObjectStack brings your own — any MCP-compatible client or a local model. Self-managed ObjectOS Enterprise brings your own model or key.',
      },
    ],
  } satisfies MarketingPage;

export default page;
