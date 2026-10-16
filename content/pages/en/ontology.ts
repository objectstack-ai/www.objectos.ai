import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning.en;

// The pillar for the positioning line. Every factual sentence below is taken
// from objectstack `origin/main`: `content/docs/concepts/ontology.mdx` (the
// authority on the word), `README.md` ("What we mean by ontology" through "You
// own it") and `content/docs/concepts/compare.mdx`. The positioning itself is
// quoted from `src/lib/positioning.ts`, never paraphrased.
const page = {
    slug: 'ontology',
    navLabel: 'Ontology',
    title: 'What Is an Executable Business Ontology? ObjectStack’s Definition',
    description:
      `${p.t1} ${p.t2} What that means: a six-kind core the runtime executes, four projections that are not part of it, four guardrails on the word, and the mechanism behind each of the four promises.`,
    eyebrow: 'Ontology',
    heroTitle: p.t1,
    lead:
      `${p.t2} This page is what the word means here. The ontology is the definition of your business that the runtime executes: authored as typed metadata in your repository, compiled into one artifact, and run — the database, API, UI and agent tools are derived from it, and the definition is enforced on every call. Written for the person who chooses and for the agent that writes.`,
    primary: { label: 'Point your agent at ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: 'See how it compares', href: '/en/compare/' },
    metrics: [
      { value: '6 kinds', label: 'of thing in the core: objects and fields, relations, actions, permissions, flows, and agent and tool definitions' },
      { value: '4 projections', label: 'Views, dashboards, apps and translations — authored in metadata and validated by the same gate, but not part of the ontology' },
      { value: '4 gates', label: 'Typed, validated, reviewed, governed — between the agent and your users' },
    ],
    artifact: {
      eyebrow: 'How the runtime executes it',
      title: 'One definition in. Everything else is derived.',
      body:
        'The ontology is authored as typed metadata in objectstack.config.ts and compiled into the objectstack.json artifact. From that artifact the runtime derives the database schema on an interchangeable driver, a generated REST and realtime API, server-driven UI for the Console, and an MCP server — and it enforces the definition on every call. RBAC, row-level and field-level security, sharing and audit apply to a REST request, a Console click and an agent’s tool call alike. Nothing is reasoned over at runtime: what runs is what was validated.',
      code: `objectstack.config.ts      # the ontology, authored as typed metadata
        │  compiled
        ▼
objectstack.json           # the artifact the runtime loads
        │  derives
        ▼
database schema · REST and realtime API · server-driven UI · MCP server
        │  enforces, on every call
        ▼
RBAC · row-level and field-level security · sharing · audit`,
    },
    sections: [
      {
        id: 'core',
        eyebrow: 'The core',
        title: 'Six kinds of thing, one definition',
        copy:
          'The ontology is one definition, open and versioned. It lives in your repository as ordinary TypeScript, is reviewable as a diff, and is specified and licensed Apache-2.0 — not a graph held inside a vendor’s system and reachable only through that vendor’s console. The runtime derives everything else from it.',
        items: [
          {
            title: 'Objects and fields',
            body: 'The entities of the business and their typed attributes — validation, formulas, defaults, files.',
            meta: 'Guide',
            href: '/en/data-modeling/',
          },
          {
            title: 'Relations',
            body: 'Lookups and master-detail links between objects.',
          },
          {
            title: 'Actions',
            body: 'The operations a user or an agent may invoke on a record, and the conditions under which they show.',
          },
          {
            title: 'Permissions',
            body: 'Who may read, create, edit and delete what — RBAC, row-level and field-level security, sharing.',
            meta: 'Guide',
            href: '/en/permissions/',
          },
          {
            title: 'Flows',
            body: 'The business processes — DAG flows, record triggers, scheduled jobs, approvals, workflows.',
            meta: 'Guide',
            href: '/en/automation/',
          },
          {
            title: 'Agent and tool definitions',
            body: 'The AI agents the app ships with, the tools they may call, and the skills that shape them.',
            meta: 'Guide',
            href: '/en/mcp/',
          },
        ],
      },
      {
        id: 'projections',
        eyebrow: 'Projections',
        title: 'Views, dashboards, apps and translations project it',
        copy:
          'Projections are authored in metadata too, validated by the same gate, but they are not part of the ontology. Change the core and the projections follow; remove a projection and the business it showed is unchanged. The distinction bounds what an agent must hold to reason about the business: the core, not every screen.',
        items: [
          {
            title: 'A view',
            body: 'Projects an object’s fields and permissions onto a grid.',
            meta: 'Projection',
          },
          {
            title: 'A dashboard',
            body: 'Projects queries over objects onto charts.',
            meta: 'Projection',
          },
          {
            title: 'An app',
            body: 'Groups objects, views and actions into a navigable product.',
            meta: 'Projection',
          },
          {
            title: 'A translation',
            body: 'Projects every label into a locale.',
            meta: 'Projection',
          },
        ],
      },
      {
        id: 'not',
        eyebrow: 'What it is not',
        title: 'Four guardrails on the word',
        copy:
          'The word ontology covers several different kinds of thing, and two habits of thought travel with it. None of the four applies here; what ObjectStack is weighed against, side by side, is on the comparison page.',
        items: [
          {
            title: 'Not a knowledge ontology',
            body: 'OWL, RDF and knowledge graphs describe a domain, carry class inheritance and axioms, and are reasoned over by an inference engine. ObjectStack has no object inheritance, no axioms and no reasoner: the definition is validated — by Zod schemas and os validate — and then run. The abstract key was removed from the spec for exactly that reason.',
          },
          {
            title: 'Not the industry’s semantic layer',
            body: 'A semantic layer is a read-only mapping over existing systems: it describes the business but does not run it. ObjectStack’s ontology is the system — the database, API, UI and agent tools are derived from it. Federating an external datasource is possible, read-only by default and early.',
          },
          {
            title: 'Not a formal ontology in the philosophical sense',
            body: 'It makes no claim about what exists in general. It is one business’s application, defined precisely enough to run.',
          },
          {
            title: 'Not code that disappears',
            body: 'Code moves into the runtime. Hooks, action bodies, and the CEL expressions in formulas, predicates and policies run inside the runtime’s permission and audit fence; constrained JSX in pages is parsed into a server-driven UI tree, never executed as code. None of it is scattered across a codebase the ontology would then have to describe.',
          },
        ],
      },
      {
        id: 'promises',
        eyebrow: 'The four promises',
        title: 'Each promise names the mechanism that keeps it',
        copy:
          'The four words after the positioning line are not adjectives. Each one is kept by something specific in the runtime, the toolchain or the licence, and each is listed here with that thing.',
        items: [
          {
            title: p.t3[0],
            body: 'The definition is the thing that runs. From the compiled artifact the runtime derives the database, the REST and realtime API, the Console UI and the MCP server, and enforces permissions and audit on every call — a REST request, a Console click and an agent’s tool call alike.',
            meta: 'Guide',
            href: '/en/platform/',
          },
          {
            title: p.t3[1],
            body: 'The scaffolder installs the AI skills bundle and writes an AGENTS.md, so a coding agent starts with the protocol’s rules loaded. Strict TypeScript and Zod reject shape errors in the editor; os validate rejects metadata that type-checks but would fail silently at runtime — dangling bindings, bad CEL predicates, a missing security posture — as located, corrective text the agent reads and fixes itself. You approve a small, readable diff.',
            meta: 'Guide',
            href: '/en/agent-developer/',
          },
          {
            title: p.t3[2],
            body: 'The running app is an MCP server, on by default: every object is a tool, every exposed action is a tool, permissions decide what an agent may call, and audit records what it did. An agent operates the app through the same typed, permission-aware surface as a human — never raw SQL or scraped UI.',
            meta: 'Guide',
            href: '/en/mcp/',
          },
          {
            title: p.t3[3],
            body: 'The definition lives in your repository as ordinary TypeScript, versioned in your VCS and reviewable as a diff — not a graph held inside a vendor’s system. Everything in the ObjectStack repository is the open stack — protocol, microkernel, SDK, CLI and the production runtime — Apache-2.0 with no open-core asterisks, and the scaffolded project is container-ready for self-hosting.',
            meta: 'Source',
            href: 'https://github.com/objectstack-ai/objectstack',
          },
        ],
      },
    ],
    table: {
      columns: ['You declare', 'The runtime derives', 'The runtime enforces'],
      rows: [
        ['Objects, fields, relations', 'The database schema on an interchangeable driver; a generated REST and realtime API', 'Validation, formulas and defaults, as declared on the field'],
        ['Actions', 'Permission-checked buttons and server operations; every exposed action doubles as an MCP tool', 'The conditions under which an action shows, and who may invoke it'],
        ['Permissions', 'Nothing to generate — the fence itself', 'RBAC, row-level and field-level security, sharing and audit, on a REST request, a Console click and an agent’s tool call alike'],
        ['Flows', 'DAG flows, record triggers, scheduled jobs, approvals with queues', 'Multi-step approval chains with a full audit trail'],
        ['Agent and tool definitions', 'The MCP server the app serves, on by default', 'Permissions decide what an agent may call; audit records what it did'],
        ['Views, dashboards, apps, translations', 'Server-driven UI for the Console', 'A view projects an object’s fields and its permissions — remove it and the business is unchanged'],
      ],
    },
    faqs: [
      {
        question: 'Is this the same thing as a Palantir-style ontology?',
        answer:
          'Close in vocabulary, different in where it lives. An operational ontology defines objects, links, actions and permissions over data integrated from other systems, with edits written back; the Palantir Ontology is the reference. It is still a layer over systems that live elsewhere and, in Palantir’s case, a proprietary platform. ObjectStack derives the database schema, API, UI and MCP tools from the definition itself, and it is Apache-2.0.',
      },
      {
        question: 'Does an ontology mean nobody writes code any more?',
        answer:
          'No. Code does not disappear — it moves into the runtime. Hooks, action bodies and the CEL expressions in formulas, predicates and policies run inside the runtime’s permission and audit fence; constrained JSX in pages is parsed into a server-driven UI tree rather than executed. What changes is that none of it is scattered across a codebase the ontology would then have to describe.',
      },
      {
        question: 'Why does size matter so much?',
        answer:
          'Because both halves of the loop depend on it. An agent writing the definition and an agent operating the app both need to hold the whole thing: apps small enough for AI to hold whole can be read whole, reasoned about whole and refactored whole. The bundled example CRM — objects, views, a dashboard, a lead-conversion flow, permission sets, actions, translations — is small enough for an agent to load end to end and answer what breaks if this changes.',
      },
      {
        question: 'Where does ObjectOS come in?',
        answer: `${p.t4} ${p.e1}`,
      },
    ],
  } satisfies MarketingPage;

export default page;
