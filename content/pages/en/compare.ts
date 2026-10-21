import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning.en;

// The comparison and the "when not to use it" page. Every factual sentence is
// taken from objectstack `origin/main`: `content/docs/concepts/compare.mdx`
// (the five categories, the side-by-side table, where the others are stronger)
// and `content/docs/concepts/when-to-use.mdx` (a good fit, not a fit today, the
// five questions). The positioning is quoted from `src/lib/positioning.ts`.
// The mapping of this site's own comparison posts onto the five categories is
// this page's, not objectstack's.
const page = {
    slug: 'compare',
    navLabel: 'How it compares',
    title: 'How ObjectStack Compares, and When Not to Use It',
    description:
      'ObjectStack beside knowledge ontologies, semantic and context layers, operational ontologies, metadata-driven platforms and AI code generation: what each is good at, the one difference that matters, where the others are stronger, and the workloads that are not a fit today.',
    eyebrow: 'How it compares',
    heroTitle: 'Five things it is weighed against. It is none of them.',
    lead:
      `The word ontology covers several different kinds of thing in 2026, and the products that use it solve different problems. This page sets ObjectStack beside the five a reader is most likely to weigh it against — three that use the word and two that answer the same question without it — then says where each of them is stronger and where ObjectStack is not a fit today. What it is instead: ${p.t2}`,
    primary: { label: 'Point your agent at ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: 'What the ontology is', href: '/en/ontology/' },
    metrics: [
      { value: '5 kinds', label: 'of thing it is weighed against — three that use the word ontology, and two that answer the same question without it' },
      { value: '4 places', label: 'where another category is stronger, stated on this page: existing data estates, reasoning, algorithm-heavy work, ecosystem maturity' },
      { value: '5 workloads', label: 'that are not a fit today, from the core ERP of a large enterprise to anything that must run on a certified platform' },
    ],
    artifact: {
      eyebrow: 'A good fit',
      title: 'Where it fits today',
      body:
        'ObjectStack is for business applications whose definition you want to own, that AI writes and agents operate. Five shapes of work fit that today. The section on what is not a fit follows the comparison, and the five questions to answer before you start are at the end.',
      steps: [
        'New business applications — CRM, ticketing, approvals, operations and internal tools. Objects, relations, actions, permissions and flows are most of what these apps are, and they are exactly what the ontology declares.',
        'Teams small enough that one person, or a few, can define the business. An agent writes the definition; someone still has to know what it should say. The fewer people who must agree on it, the faster the loop runs.',
        'ISVs shipping many vertical apps. Each vertical is a definition on the same runtime; what differs between them is the definition, not the stack underneath it.',
        'The long tail of departmental apps around a core ERP — vendor onboarding, inspections, internal requests. Each one becomes a typed definition in a repository instead of a file that gets emailed around.',
        'Back offices meant to be operated by agents from day one. Every deployment is an MCP server, on by default: objects are tools, the actions an author exposes are tools, and permissions decide what an agent may call.',
      ],
    },
    sections: [
      {
        id: 'categories',
        eyebrow: 'Five categories',
        title: 'What each is, what it is good at, the one difference',
        copy:
          'Each entry reads a category as a whole; individual products vary. The one difference named for each is the one that decides whether it answers your question.',
        items: [
          {
            title: 'Knowledge ontologies',
            body: 'RDF and OWL, the W3C standards for describing a domain as statements, classes, properties and axioms, and the tools built on them, such as the Protégé editor; a reasoner infers facts nobody stored and checks that the whole description is consistent. Good at shared vocabularies across organisations, integrating data that was never designed to fit together, and answering questions by inference. The difference: a knowledge ontology describes a domain; nothing runs it as an application. ObjectStack’s ontology has no axioms and no reasoner — it is validated, then run.',
            meta: 'Uses the word',
          },
          {
            title: 'Semantic and context layers over existing data',
            body: 'A layer that makes data living elsewhere legible to agents and analysts: business names, metrics, relationships and context over warehouses, lakehouses and operational databases. As of late 2026 the category includes the ontology item in Microsoft Fabric IQ (in preview), Databricks Genie with Unity Catalog metric views, Snowflake semantic views, AWS Context and Google Cloud Knowledge Catalog; in open source, metric semantic layers and agent memory graphs. Good at consistent meaning over a large existing estate without moving the data; read-mostly, some add rules and actions on top. The difference: the system of record stays where it was. ObjectStack’s ontology is the system — the database, API, UI and agent tools are derived from it.',
            meta: 'Uses the word',
          },
          {
            title: 'Operational ontologies over existing systems',
            body: 'Objects, links, actions and permissions defined over data integrated from other systems, with edits written back. The Palantir Ontology is the reference: an action type packages edits to objects and links with its validation and side effects, and writeback keeps those edits in sync with the underlying data. Good at one governed model of objects and actions across many large systems that stay where they are. The difference: it is still a layer over systems that live elsewhere and, in Palantir’s case, a proprietary platform. ObjectStack derives the database schema, API, UI and MCP tools from the definition, and it is Apache-2.0.',
            meta: 'Uses the word',
          },
          {
            title: 'Metadata-driven application platforms',
            body: 'Platforms where metadata generates tables, APIs and UI — the closest relatives. Salesforce’s metadata is the ancestor; open-source cousins include Frappe Framework with ERPNext, Odoo, NocoBase, Payload and Twenty, and several now offer MCP servers. Good at building business applications quickly on a proven runtime, with packaged apps, modules and integrations to start from. The difference: where the definition lives, and who it is written for. In most of these platforms metadata is configuration stored in the platform’s database and edited through its UI; where it is code, it is framework code. ObjectStack’s definition is typed, declarative TypeScript in your repository — versioned and reviewed as a diff, checked by os validate before it runs, and shaped for an AI to write.',
            meta: 'Same question',
          },
          {
            title: 'AI code generation',
            body: 'An agent writes a conventional codebase from a prompt: a schema, handlers, components, the glue between them. What it is good at: it has no runtime ceiling — anything code can do, it can produce. The difference: the output is still code. It grows, its layers drift apart, and past a certain size no agent can hold it whole. Tests and type-checkers check the code against itself; nothing checks it against a definition of the business, because there is none. ObjectStack keeps the definition and moves the code into the runtime, and its gate rejects a wrong definition when it is written, not when it fails in production.',
            meta: 'Same question',
          },
        ],
      },
      {
        id: 'stronger',
        eyebrow: 'Where the others are stronger',
        title: 'Four cases to choose something else',
        copy:
          'A comparison that only lists wins is an advertisement. These are the four cases where another category starts ahead, in objectstack’s own words.',
        items: [
          {
            title: 'Existing data and legacy systems',
            body: 'Semantic and context layers, operational ontologies. When the data already lives in a warehouse, a lakehouse and a dozen operational systems, these start where you are. ObjectStack’s federation is early and read-only by default; it is not a way to put one model over an existing estate.',
          },
          {
            title: 'Reasoning over heterogeneous data',
            body: 'Knowledge ontologies. Inferring facts nobody stored, classifying by axioms, checking consistency, aligning vocabularies across organisations: a reasoner does this, and ObjectStack has none.',
          },
          {
            title: 'Algorithm-heavy work and unusual interfaces',
            body: 'Code. An optimiser, a simulation, a canvas editor, a game: write code. ObjectStack can wrap an algorithm as an action, but its interface is server-driven from metadata, and an interface unlike any business app is easier to build directly.',
          },
          {
            title: 'Ecosystem maturity and integrations',
            body: 'The metadata platforms. Salesforce, Odoo and ERPNext bring years of production use, packaged applications, app marketplaces and implementation partners. ObjectStack is younger; expect to build more of it yourself.',
          },
        ],
      },
      {
        id: 'not-a-fit',
        eyebrow: 'When not to use it',
        title: 'Not a fit today',
        copy:
          'ObjectStack is open-source software you deploy and operate for business applications whose definition you want to own. These five workloads are outside that today, and the honest answer is to build around them or choose something else.',
        items: [
          {
            title: 'Replacing the core ERP or finance system of a large enterprise',
            body: 'A general ledger, consolidation, tax and payroll carry regulation and edge cases that packaged systems already encode. Build around that core, not instead of it.',
          },
          {
            title: 'Workloads whose value is integrating many existing systems',
            body: 'ObjectStack can federate an external database as a datasource, but federation is early and read-only by default; writes need an explicit opt-in on both the datasource and the object. When the job is mostly making existing systems legible to agents, a layer over those systems fits better.',
          },
          {
            title: 'Analytics over data lakes',
            body: 'The analytics layer defines metrics over the app’s own objects for its reports and dashboards. It is not built to query a lake.',
          },
          {
            title: 'Algorithm-heavy domains, such as pricing or scheduling',
            body: 'Unless the algorithm is wrapped as an action. The ontology declares what can be done; it does not express an optimiser. Write the algorithm as code behind an action, and permissions, audit and agent access apply to it like any other action.',
          },
          {
            title: 'Workloads that require a certified platform',
            body: 'ObjectStack carries no compliance certification of its own. Where a workload must run on a certified platform, certifying your deployment is work you own.',
          },
        ],
      },
      {
        id: 'in-depth',
        eyebrow: 'In depth',
        title: 'The comparisons, one product at a time',
        copy:
          'Category by category above; product by product here. Each post states the other side’s strengths first, then the one thing to compare. The label is the category the product falls under on this page.',
        items: [
          {
            title: 'Ontology vs semantic layer vs knowledge graph',
            body: 'A semantic layer defines what a number means; a knowledge graph stores what connects to what; only an ontology carries actions and permissions. With a decision table.',
            meta: 'Knowledge ontologies',
            href: '/en/blog/ontology-vs-semantic-layer-vs-knowledge-graph/',
          },
          {
            title: 'Fabric IQ vs Palantir vs Unity Catalog vs Snowflake vs Looker',
            body: 'Five vendors shipped an enterprise ontology or semantic layer between November 2025 and August 2026, compared cell by cell on objects, relationships, actions, permissions and agent interfaces.',
            meta: 'Semantic layers · operational ontologies',
            href: '/en/blog/enterprise-ontology-platform-comparison/',
          },
          {
            title: 'Open vs closed enterprise ontologies',
            body: 'The protocol is open and the definition stays inside the platform: who owns the business semantic layer after the five launches.',
            meta: 'Semantic layers',
            href: '/en/blog/enterprise-ontology-race-open-vs-closed/',
          },
          {
            title: 'Airtable Omni vs governed AI app platforms',
            body: 'Natural language over a table workspace is strong. The question for a system of record is whether an AI change to permissions, fields and flows becomes a reviewable diff before it ships.',
            meta: 'Metadata-driven platforms',
            href: '/en/blog/airtable-omni-vs-governed-ai-app-platform/',
          },
          {
            title: 'Retool vs governed AI app platforms',
            body: 'Retool’s RBAC, audit log, SSO and self-hosting are strong. The layer to compare is business authority: refunds, approvals and writes scattered across JavaScript bindings cannot be reviewed as a diff.',
            meta: 'Metadata-driven platforms',
            href: '/en/blog/retool-vs-ai-native-app-platform/',
          },
          {
            title: 'Power Platform lock-in: Dataverse, Azure and the self-host tradeoff',
            body: 'Identity, Teams, Dynamics and billing in one tenant is a real advantage. Sovereignty, cost at scale and AI-change review are the boundaries to price in first.',
            meta: 'Metadata-driven platforms',
            href: '/en/blog/power-platform-lock-in-dataverse-self-host/',
          },
          {
            title: 'Agentforce vs an open self-hosted runtime',
            body: 'Agentforce, Copilot Studio and ServiceNow agents are strong inside their ecosystems. The question is whether your data, processes and permissions are in the same one.',
            meta: 'Metadata-driven platforms',
            href: '/en/blog/beyond-agentforce-copilot-open-runtime/',
          },
          {
            title: 'Is Lovable safe for production?',
            body: 'Fine for prototypes. For production the question is who can review access control: the boundary has to be visible, enforced and signed off on the server.',
            meta: 'AI code generation',
            href: '/en/blog/is-lovable-safe-for-production/',
          },
          {
            title: 'Vibe coding technical debt',
            body: 'AI-generated code ships a prototype fast; the problem arrives months later when nobody has read the implementation whole and nobody can explain the business trade-offs in it.',
            meta: 'AI code generation',
            href: '/en/blog/vibe-coding-technical-debt-2026/',
          },
        ],
      },
    ],
    table: {
      eyebrow: 'Side by side',
      title: 'Each category as a whole, against the four promises',
      columns: ['Category', `${p.t3[0]} · ${p.t3[1]} · ${p.t3[2]}`, `${p.t3[3]} · Is the system itself`],
      rows: [
        ['Knowledge ontologies', 'No — reasoned over · Possible · Query only', 'Yes — open standards · No'],
        ['Semantic and context layers', 'No — queried · Possible · Read-mostly', 'Varies · No — a layer'],
        ['Operational ontologies', 'Actions only · Possible · Yes', 'Mostly vendor-held · No — a layer'],
        ['Metadata-driven platforms', 'Yes · Varies · Often, via MCP', 'Varies · Yes'],
        ['AI code generation', 'Yes · Yes · If you build it', 'Yes · Yes'],
        ['ObjectStack', 'Yes · Yes — gated · Yes — by default', 'Yes — Apache-2.0 · Yes'],
      ],
    },
    checklistTitle: 'Five questions before you start',
    checklist: [
      'What we have — the objects and their fields.',
      'How it relates — the lookups and master-detail links between them.',
      'What can be done — the actions a user or an agent may take on a record.',
      'Who may do it — permission sets, row-level and field-level security, sharing.',
      'What happens when — record triggers, scheduled jobs, approvals, workflows.',
    ],
    faqs: [
      {
        question: 'Is ObjectStack a semantic layer?',
        answer:
          'No. A semantic layer is a read-only mapping over existing systems: it describes the business but does not run it. ObjectStack’s ontology is the system — the database, API, UI and agent tools are derived from it. Federating an external datasource is possible, read-only by default and early. ObjectStack does not replace a warehouse semantic layer either; a company doing serious BI will still want one.',
      },
      {
        question: 'Is it a low-code platform?',
        answer:
          'The metadata-driven platforms are its closest relatives, so the family resemblance is real. The difference is where the definition lives and who it is written for: in most of those platforms metadata is configuration stored in the platform’s database and edited through its UI, while ObjectStack’s definition is typed, declarative TypeScript in your repository — versioned and reviewed as a diff, checked by os validate before it runs, and shaped for an AI to write.',
      },
      {
        question: 'Why not just let the agent write the code?',
        answer:
          'Sometimes you should: code has no runtime ceiling, and an optimiser, a simulation, a canvas editor or a game is easier to build directly. For a business application the output is still code — it grows, its layers drift apart, past a certain size no agent can hold it whole, and nothing checks it against a definition of the business because there is none. ObjectStack keeps the definition, moves the code into the runtime, and rejects a wrong definition when it is written.',
      },
      {
        question: 'How long does the first ontology take?',
        answer:
          'If the team can answer the five questions above, the ontology is a day’s work, because an agent does the writing. If it cannot, no tool helps yet, this one included. The first investment is answering those five questions, not installing anything.',
      },
      {
        question: 'Where does ObjectOS sit in this comparison?',
        answer: `It is not a sixth category. ${p.t4} ${p.e1}`,
      },
    ],
  } satisfies MarketingPage;

export default page;
