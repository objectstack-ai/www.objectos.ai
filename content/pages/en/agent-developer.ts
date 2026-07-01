import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'agent-developer',
    navLabel: 'Agent developer',
    title: 'Agent Developer Guide: How AI Writes ObjectStack Metadata',
    description:
      'Give your coding agent the rules, files, metadata patterns, and review checklist it needs to generate ObjectStack applications correctly and keep humans in control.',
    eyebrow: 'Agent developer',
    heroTitle: 'Do not teach every developer to hand-write apps. Teach your agent the target format.',
    lead:
      'ObjectStack is designed for the agent as the writer and the human as the reviewer. The developer workflow is to give the agent rules, examples, tests, and review gates so metadata changes stay small and governable.',
    primary: { label: 'Read the docs', href: 'https://docs.objectos.ai' },
    secondary: { label: 'See template patterns', href: '/en/templates/' },
    metrics: [
      { value: 'Agent first', label: 'Rules and examples are part of the product surface' },
      { value: 'Metadata diff', label: 'Review objects, views, workflows, permissions, tools' },
      { value: 'MCP ready', label: 'Expose governed objects and actions to AI clients' },
    ],
    artifact: {
      eyebrow: 'Agent instruction',
      title: 'A good rule file makes the target format explicit',
      body:
        'The most important developer artifact is not a tutorial for hand-coding screens. It is a compact, retrievable instruction set that tells the agent what to edit, what not to invent, and how to prove the change is reviewable.',
      code: `When building an ObjectStack app:
1. Model business objects before UI.
2. Prefer metadata definitions over generated application code.
3. Add conservative permissions by default.
4. Expose AI actions only through approved tools.
5. Return a small diff and a reviewer checklist.`,
    },
    sections: [
      {
        id: 'workflow',
        eyebrow: 'Workflow',
        title: 'The agent-written development loop',
        copy:
          'The loop is intentionally simple: give the agent context, let it edit metadata, run checks, then review business authority before deployment.',
        items: [
          {
            title: '1. Provide operating context',
            body: 'Give the agent the business process, object names, permission boundaries, workflow states, and integration constraints.',
            meta: 'Context',
          },
          {
            title: '2. Generate metadata',
            body: 'The agent edits object, view, workflow, action, dashboard, translation, and tool definitions rather than app glue code.',
            meta: 'Write',
          },
          {
            title: '3. Run generated checks',
            body: 'Validate schema, permissions, required labels, sample data, object queries, and workflow transitions.',
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
            body: 'Use business names, relationships, validations, indexes, and lifecycle rules that map to real operations.',
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
          'Any strong coding agent can work with the format if it has clear docs, examples, rules, and tests. The site and docs should be written so agents can retrieve and generate the format correctly.',
      },
    ],
  } satisfies MarketingPage;

export default page;
