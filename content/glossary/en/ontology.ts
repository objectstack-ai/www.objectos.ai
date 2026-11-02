import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: 'Ontology',
  title: 'Ontology in Enterprise Software: The Executable Business Ontology, and Who Owns Yours',
  description:
    'An executable business ontology is the definition of a business that a runtime runs — objects and fields, relations, actions, permissions, flows, and agent and tool definitions — validated, not reasoned over.',
  definition:
    'An ontology, in the sense ObjectStack uses, is an executable business ontology: the definition of a business — its objects and fields, relations, actions, permissions, flows, and agent and tool definitions — written as typed metadata that a runtime validates and then runs, so that software and AI agents operate the business through that one definition rather than through raw tables.',
  explanation: [
    'The ontology is the software. In ObjectStack the ontology is not a layer inside a hosted platform: it is the application\'s own definition — objects and fields, relations, actions, permissions, flows, and agent and tool definitions — and the runtime runs it, deriving the database, the REST API, the screens, and the MCP tools from it and enforcing permissions and audit on every call. Four boundaries come with the word. It is executable, not a knowledge-representation ontology: no inheritance, no axioms, no reasoner — the definition is validated, then run. It is not a semantic layer over your existing systems: it is the system, and federating an external datasource is read-only by default and early. Views, dashboards, apps, and translations are projections of the ontology, not part of it. And code does not disappear: it moves into the runtime, as hooks, action bodies, CEL, and constrained JSX.',
    'The word comes from philosophy and arrives in enterprise software through knowledge engineering, where it means a formal model of a domain — its classes, properties, and relationships — that software can reason about. That working sense is narrow and useful: an ontology names the types (customer, work order, device), the properties each type carries, and the links between them, once, for the whole organization, which is what separates it from a database schema. A schema describes how one application stores its rows; an ontology describes what the business means by "customer" in a way that a dozen systems, a reporting tool, and a model can all resolve the same way. Palantir Foundry is what most people picture in 2026, and its modelling quality is genuinely high; Microsoft Fabric IQ and Google\'s enterprise knowledge graph are moving into the same layer.',
    'Most ontology work stops one step short of where the risk begins. A retrieval-grade ontology is a read model: it makes an agent articulate about the business and says nothing about what happens when the agent has to change something. The capability that completes it is the declared, permission-checked write operation — the action — together with the permission and audit rules attached to the same definition. Palantir deserves credit for funnelling writes through governed actions for years; the open question was never whether that design is right.',
    'The open question is who holds the file. In ObjectStack the definition is your business ontology: open, versioned, and yours, in your own repository, not code scattered across a framework and not a graph held inside a vendor\'s system. A definition you can read, diff, and move to another host is a different asset from an equally good definition that lives inside a vendor\'s engine and migrates by rebuild. An ontology does not make an AI agent correct: modelling a business well remains slow, contested, human work that no format shortcuts. What the format decides is narrower — whether the result is small enough for an agent to hold whole, strict enough to reject the agent\'s mistakes at authoring time, and portable enough to survive the platform it was first written on.',
  ],
  alsoKnownAs: ['executable business ontology', 'business ontology', 'enterprise ontology', 'domain ontology'],
  relatedTerms: [
    'ontology-projection',
    'semantic-layer',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'typed-metadata',
    'governed-runtime',
  ],
  articleSlugs: [
    'what-does-the-ontology-is-the-software-mean',
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-platform-comparison',
    'objectos-action-tools',
  ],
  pageSlugs: ['ontology', 'compare', 'data-modeling', 'app-ui', 'permissions', 'mcp', 'agent-developer', 'platform', 'ai'],
} satisfies GlossaryTerm;

export default term;
