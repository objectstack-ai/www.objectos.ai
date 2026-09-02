import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'agent-developer',
    navLabel: 'Agent developer',
    title: 'Agent Developer Guide: How AI Writes ObjectStack Metadata',
    description:
      'Teach a coding agent the open ObjectStack target format, Strict TypeScript definitions, Zod schemas, validation gate, and whole-context proof needed to generate reviewable applications.',
    eyebrow: 'Agent developer',
    heroTitle: 'Do not teach every developer to hand-write apps. Teach your agent the target format.',
    lead:
      'ObjectStack is the open target format and runtime for AI-written enterprise software, designed for the agent as writer and the human as reviewer. A complete CRM including UI fits under 150k tokens, so an agent can hold the whole app in one context; Strict TypeScript, Zod schemas, and a validation gate catch invalid output before it reaches the runtime.',
    primary: { label: 'Read the docs', href: 'https://docs.objectos.ai' },
    secondary: { label: 'See template patterns', href: '/en/templates/' },
    metrics: [
      { value: '<150k tokens', label: 'A complete CRM including UI — one context window' },
      { value: '<100k tokens', label: 'Objects, workflows, permissions, and business logic' },
      { value: '~50k tokens', label: 'UI metadata for the complete CRM' },
    ],
    artifact: {
      eyebrow: 'Agent instruction',
      title: 'A good rule file makes the target format explicit',
      body:
        'The most important developer artifact is not a tutorial for hand-coding screens. It is a compact, retrievable instruction set that tells the agent what to edit, what not to invent, which schemas must pass, and how to return both a reviewable diff and proof that it considered the whole application.',
      code: `When building an ObjectStack app:
1. Model business objects before UI.
2. Write Strict TypeScript metadata that conforms to the published Zod schemas.
3. Prefer metadata definitions over generated application code.
4. Add conservative permissions and expose AI actions only through approved tools.
5. Run the validation gate before proposing deployment.
6. Return a small diff, reviewer checklist, and whole-context proof.`,
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
            body: 'Give the agent the business process, object names, permission boundaries, workflow states, integration constraints, and the complete current definition. Under 150k tokens for a full CRM including UI, the app can be inspected as a whole instead of reconstructed from fragments.',
            meta: 'Context',
          },
          {
            title: '2. Generate metadata',
            body: 'The agent edits object, view, workflow, action, dashboard, translation, and tool definitions as Strict TypeScript rather than generating app glue code.',
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
