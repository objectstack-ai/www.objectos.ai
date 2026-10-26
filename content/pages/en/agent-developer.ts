import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning.en;

const page = {
    slug: 'agent-developer',
    navLabel: 'Agent developer',
    title: 'Agent Developer Guide: How AI Writes ObjectStack Metadata',
    description:
      'The README path for a coding agent: npm create objectstack@latest writes an AGENTS.md, the agent writes typed metadata, os validate rejects what would fail at runtime, and npx os dev --ui renders the app for review.',
    eyebrow: 'Agent developer',
    heroTitle: 'Do not teach every developer to hand-write apps. Teach your agent to write the ontology.',
    lead:
      `${p.t2} The ontology is what the agent writes — ${p.t3[1]}, in the README’s four promises — and you are the reviewer: the scaffolder writes an AGENTS.md so the agent starts with the protocol’s rules loaded, Strict TypeScript, Zod schemas, and os validate reject invalid output before it reaches the runtime, and the whole app stays small enough for AI to hold whole.`,
    primary: { label: 'Follow the README path', href: 'https://github.com/objectstack-ai/objectstack#try-it-in-five-minutes' },
    secondary: { label: 'See template patterns', href: '/en/templates/' },
    metrics: [
      { value: 'AGENTS.md', label: 'Written by the scaffolder, so the agent starts with the protocol’s rules loaded' },
      { value: '4 gates', label: 'Typed, validated, reviewed, governed — between the agent and your users' },
      { value: 'Held whole', label: 'Apps small enough for AI to hold whole — the bundled CRM loads end-to-end' },
    ],
    artifact: {
      eyebrow: 'The README path',
      title: 'Three commands, and your agent has the rules',
      body:
        'The scaffolder installs the AI skills bundle and writes an AGENTS.md, so the agent starts with the protocol’s rules already loaded — not with generic “write me some TypeScript” priors. Describe the requirement in Claude Code, Cursor, or Copilot; the agent writes typed metadata, not a codebase, and the gate rejects what would fail silently at runtime. Then preview the real app in the browser and ask for the next change on a diff you can read.',
      code: `# 1 · Create a project: installs the AI skills bundle, writes AGENTS.md
npm create objectstack@latest my-app && cd my-app

# 2 · Open it in Claude Code (or Cursor, Copilot, ...) and describe the need:
#    "Build a support desk. Add a ticket object with subject, description,
#     a priority select and a status select. Add a Resolve action that only
#     shows on tickets that aren't already resolved. Add an Open tickets
#     list view and a Support nav group. Run npm run validate when done."

# 3 · Preview in the browser
npx os dev --ui   # -> http://localhost:3000/_console/`,
    },
    sections: [
      {
        id: 'workflow',
        eyebrow: 'Workflow',
        title: 'The agent-written development loop',
        copy:
          'The loop is intentionally simple: give the agent the complete current definition and operating context, let it edit typed metadata, run the validation gate, then review business authority before deployment.',
        items: [
          {
            title: '1. Provide operating context',
            body: 'Give the agent the business process, object names, permission boundaries, workflow states, integration constraints, and the complete current definition. The app stays small enough for AI to hold whole — the README’s bundled CRM loads end-to-end — so it can be inspected as a whole instead of reconstructed from fragments.',
            meta: 'Context',
          },
          {
            title: '2. Write the ontology',
            body: 'The agent edits the ontology — objects and fields, relations, actions, permissions, flows, and tool definitions — and its projections — views, dashboards, translations — as Strict TypeScript rather than generating app glue code.',
            meta: 'Write',
          },
          {
            title: '3. Pass the validation gate',
            body: 'Compile in Strict TypeScript mode, validate every definition against its Zod schema, then check permissions, required labels, sample data, object queries, and workflow transitions.',
            meta: 'Verify',
          },
          {
            title: '4. Review authority',
            body: 'Humans review what authority changed: data access, write power, approval bypasses, exports, and AI tool exposure.',
            meta: 'Approve',
          },
        ],
      },
      {
        id: 'patterns',
        eyebrow: 'Patterns',
        title: 'What the agent should generate',
        copy:
          'The best generated change names business concepts clearly and keeps runtime power explicit.',
        items: [
          {
            title: 'Objects and fields',
            body: 'Use business names, relationships, validations, indexes, and lifecycle rules that map to real operations and conform to the published Zod schemas.',
          },
          {
            title: 'Views and actions',
            body: 'Generate list, form, kanban, dashboard, and action metadata from the object model, not one-off screens.',
          },
          {
            title: 'Workflows and approvals',
            body: 'Define transitions and approval gates explicitly so the runtime can enforce them for people and agents.',
          },
          {
            title: 'Agent tools',
            body: 'Expose only bounded object queries and actions through MCP, with policy checks and audit-friendly names.',
          },
        ],
      },
    ],
    table: {
      columns: ['Old developer surface', 'Agent-written ObjectStack surface', 'Reviewer question'],
      rows: [
        ['Controller code', 'Object action metadata', 'Who can invoke this action?'],
        ['Custom auth checks', 'Object, row, and field permissions', 'What data authority changed?'],
        ['Hand-built screens', 'View and form metadata', 'Which workflow does this screen support?'],
        ['Ad hoc AI prompt', 'Policy-aware tool contract', 'What can the model read or mutate?'],
      ],
    },
    checklistTitle: 'Diff review checklist for agent-written ObjectStack',
    checklist: [
      'Did the agent inspect the whole current application instead of inferring missing state from fragments?',
      'Does the change pass Strict TypeScript compilation, Zod schema validation, and the validation gate?',
      'Does the diff change business authority or only presentation?',
      'Are object and field names stable and domain-specific?',
      'Are defaults conservative for reads, writes, exports, and tools?',
      'Are approval gates explicit for sensitive actions?',
      'Can tests or sample data demonstrate the workflow?',
      'Can a future agent retrieve and reuse the same pattern?',
    ],
    faqs: [
      {
        question: 'Should developers still understand ObjectStack?',
        answer:
          'Yes, but the primary developer task changes. Humans design boundaries, review diffs, write tests, and curate examples; agents do more of the repetitive metadata authoring.',
      },
      {
        question: 'Can any coding agent write ObjectStack?',
        answer:
          'Any strong coding agent can work with the format if it has clear docs, examples, rules, tests, and access to the whole current definition. Strict TypeScript, Zod schemas, and the validation gate provide deterministic feedback before the same validated app is either self-hosted on ObjectStack or operated through ObjectOS, which runs the same open runtime.',
      },
    ],
  } satisfies MarketingPage;

export default page;
