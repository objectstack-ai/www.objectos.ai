import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: 'Ontology',
  title: 'Ontology in Enterprise Software: Definition, and Who Owns Yours',
  description:
    'An ontology is a formal model of a business domain — its classes, properties, and relationships — expressed so software and AI agents can reason about the business instead of about raw tables.',
  definition:
    'An ontology, in the enterprise sense, is a formal model of a business domain — the classes of things the business deals with, the properties that describe them, and the relationships that connect them — expressed in a machine-readable form so that software, and now AI agents, can reason about the business rather than about raw tables.',
  explanation: [
    'The word comes from philosophy and arrives in enterprise software through knowledge engineering, but the working definition is narrow and useful: an ontology names the types (customer, work order, device), the properties each type carries, and the links between them, once, for the whole organization. That is what separates it from a database schema. A schema describes how one application stores its rows; an ontology describes what the business means by "customer" in a way that a dozen systems, a reporting tool, and a model can all resolve the same way. Palantir Foundry is what most people picture in 2026, and its modelling quality is genuinely high; Microsoft Fabric IQ and Google\'s enterprise knowledge graph are moving into the same layer.',
    'Most ontology work stops one step short of where the risk begins. A retrieval-grade ontology is a read model: it makes an agent articulate about the business and says nothing about what happens when the agent has to change something. The capability that completes it is the declared, permission-checked write operation — the action — together with the permission and audit rules attached to the same definition. Palantir deserves credit for funnelling writes through governed actions for years; the open question was never whether that design is right.',
    'The open question is who holds the file. In ObjectStack the ontology is not a layer inside a hosted platform: it is the application\'s own typed metadata, and that metadata is your business ontology — an open, versioned definition of your objects, permissions, and flows that you own, not code scattered across a framework. That is the difference the phrase open business ontology is meant to carry. A definition you can read, diff, and move to another host is a different asset from an equally good definition that lives inside a vendor\'s engine and migrates by rebuild.',
    'Being honest about the limits: an ontology does not make an AI agent correct, and modelling a business well remains slow, contested, human work that no format shortcuts. What the format decides is narrower — whether the result is small enough for an agent to read whole, strict enough to reject the agent\'s mistakes at authoring time, and portable enough to survive the platform it was first written on.',
  ],
  alsoKnownAs: ['enterprise ontology', 'business ontology', 'domain ontology'],
  relatedTerms: [
    'semantic-layer',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'typed-metadata',
    'governed-runtime',
  ],
  articleSlugs: [
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'objectos-action-tools',
  ],
  pageSlugs: ['data-modeling', 'platform', 'ai'],
} satisfies GlossaryTerm;

export default term;
