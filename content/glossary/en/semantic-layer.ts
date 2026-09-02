import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'semantic-layer',
  term: 'Semantic layer',
  title: 'Semantic Layer: Definition, and When It Is Enough',
  description:
    'A semantic layer is a governed set of business definitions — metrics, dimensions, and entity names — between raw storage and the tools that query it, so one term resolves to one agreed calculation everywhere.',
  definition:
    'A semantic layer is a governed set of business definitions — metrics, dimensions, and entity names — placed between raw data storage and the tools that query it, so that "active customer" or "net revenue" resolves to one agreed calculation no matter who asks or which tool they ask from.',
  explanation: [
    'The term\'s home is analytics. dbt\'s Semantic Layer, Cube, AtScale, and Looker\'s LookML all solve the same problem: every dashboard, notebook, and spreadsheet had been re-deriving "revenue" in its own SQL, and the numbers stopped agreeing. Defining the metric once, above the warehouse and below the tools, makes the definition the shared artifact instead of the query. Since 2026 the same two words also get used for the business-definition layer under agentic AI — the sense Fabric and Foundry use — which is why the phrase now means two different scopes depending on who is speaking, and why it is worth saying which one you mean.',
    'For a large class of work, a semantic layer is genuinely the right and sufficient tool, and it is worth being plain about that rather than talking past it. If the problem is that finance and sales quote different revenue figures, that self-serve analytics produces contradictory dashboards, or that an AI assistant needs to answer questions over a warehouse consistently, a metrics layer over that warehouse solves it — and adding an application platform underneath would be answering a question nobody asked. A semantic layer is not a weaker ontology; it is a different instrument, and on analytical questions it is the better one.',
    'What it does not carry is the write side. A semantic layer is a read contract: it settles what a number means, not who may change the underlying record, which operations exist at all, whether a change needs approval, or what evidence remains afterwards. ObjectStack sits on the other side of that line — the typed application metadata that defines an object also declares its permissions, its actions, and its approval steps, and the runtime enforces all of them on every call, so the definition governs writes rather than only describing reads. It does not replace a warehouse semantic layer, and a company doing serious BI will still want one.',
  ],
  alsoKnownAs: ['business semantic layer', 'metrics layer', 'headless BI'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'governed-runtime',
  ],
  articleSlugs: [
    'why-ai-agent-pilots-fail-four-layers',
    'enterprise-ontology-race-open-vs-closed',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['analytics', 'data-modeling', 'platform'],
} satisfies GlossaryTerm;

export default term;
