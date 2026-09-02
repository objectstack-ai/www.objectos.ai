import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'object-type-and-action-type',
  term: 'Object type / action type',
  title: 'Object Type and Action Type: Definition, and Why the Action Half Matters',
  description:
    'Object type and action type are the two halves of an ontology\'s vocabulary — one declares a class of business entity, the other a permitted, permission-checked operation that changes it.',
  definition:
    'Object type and action type are the two halves of an ontology\'s vocabulary: an object type declares a class of business entity together with its properties and its links to other types, while an action type declares a permitted, permission-checked operation that changes those objects — so that writing is defined as explicitly as reading.',
  explanation: [
    'The pair is Palantir Foundry\'s vocabulary and has spread with it. An object type is a class — Customer, Work Order, Device — carrying typed properties and link types to other object types; it is what an ontology is usually assumed to consist of. An action type is the other half: a named write operation with typed parameters, validation rules, and the permissions required to invoke it, so that a caller never touches the database and can only run the operations the ontology exposes. Foundry has funnelled writes through governed actions for years and pointed that architecture at LLMs, and the design deserves the credit it gets.',
    'The action half is the one that usually goes missing, and its absence has a recognisable failure mode. An ontology built only from object types is a read model, so when an agent finally has to convert the lead or issue the refund, someone writes a tool for it — beside the business logic rather than from it. That opens a second write path: the same operation now has two routes into the data, only one of which checks permissions, runs validation, requires approval, and writes an audit record. It does not stay merely incomplete, it drifts, because every later change to the real path is made by someone who has no idea the second one exists.',
    'ObjectStack has both halves under plainer names, and the vocabulary difference is worth stating rather than glossing: it does not use the words "object type" and "action type". An object is declared in a typed metadata file with its fields, relationships, and sharing model; an Action is declared alongside it with typed parameters, visibility and disabled predicates, a confirmation prompt, the capabilities required to invoke it, and an execution target. Because both are metadata the runtime reads directly, every object and every exposed action doubles as a governed MCP tool — so the button a person clicks and the tool an agent calls are the same declaration, not two implementations that agree until they do not.',
  ],
  alsoKnownAs: ['object type', 'action type', 'ontology object type', 'ontology action'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'application-metadata',
    'governed-runtime',
    'mcp',
    'governed-tool-layer',
  ],
  articleSlugs: [
    'objectos-action-tools',
    'mcp-governed-tool-layer',
    'ontology-mcp-agent-tools',
    'enterprise-ontology-platform-comparison',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['data-modeling', 'automation', 'mcp'],
} satisfies GlossaryTerm;

export default term;
