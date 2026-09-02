import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'knowledge-graph',
  term: 'Knowledge graph',
  title: 'Knowledge Graph: Definition, and How It Differs from an Ontology',
  description:
    'A knowledge graph represents an organization\'s information as nodes and typed edges, so questions about how things connect are answered by traversing relationships instead of joining tables.',
  definition:
    'A knowledge graph represents an organization\'s information as nodes and typed edges — the entities it cares about and the labelled relationships between them — so that questions about how things connect can be answered by traversing those relationships rather than by joining tables.',
  explanation: [
    'The cleanest way to hold the distinction the category keeps blurring: the ontology is the schema, the knowledge graph is the populated instance data conforming to it. An ontology says a work order attaches to a device and a device belongs to a customer; the knowledge graph holds the several million actual work orders, devices, and customers, and the edges between them. In practice a graph is stored either as RDF triples with an OWL ontology over them, or as a property graph in an engine like Neo4j, and plenty of production graphs run with an ontology that was never written down — which is exactly how two teams end up with incompatible definitions of "customer" in the same graph.',
    'On connection-shaped questions a knowledge graph is the right tool and nothing else comes close. Fraud rings, beneficial-ownership chains, supply-chain dependency, impact analysis across a network, entity resolution across a dozen source systems, and any question of the form "what is four hops from here" are native to a graph and awkward-to-impossible in a relational join. If that is the problem, the answer is a graph database, and no application platform substitutes for one.',
    'The limit it shares with the semantic layer is the same one: a knowledge graph is overwhelmingly a read structure. It records that these things are connected; it does not declare who may change them, which operations are permitted, or what audit record a change leaves. ObjectStack approaches the connections from the other end — relationships are declared as typed fields on objects inside the application\'s own metadata, so the graph of the business falls out of the definition the application already runs on, rather than being a second store to keep in sync, and because that definition is a file in your repository it is an open business ontology rather than a graph inside someone else\'s platform. That is a claim about ownership and governance, not about graph analytics: ObjectStack is not a graph database and does not try to win deep multi-hop traversal.',
  ],
  alsoKnownAs: ['enterprise knowledge graph', 'semantic graph', 'entity graph'],
  relatedTerms: [
    'ontology',
    'semantic-layer',
    'object-type-and-action-type',
    'application-metadata',
    'typed-metadata',
  ],
  articleSlugs: [
    'enterprise-ontology-race-open-vs-closed',
    'ai-ontology-open-protocol',
    'crm-ai-understands-customers',
  ],
  pageSlugs: ['data-modeling', 'analytics'],
} satisfies GlossaryTerm;

export default term;
