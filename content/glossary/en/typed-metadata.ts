import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'typed-metadata',
  term: 'Typed metadata',
  title: 'Typed Metadata: Definition, and Why a Schema Beats a Config File',
  description:
    'Typed metadata is application metadata constrained by a published schema, so a misspelled permission or an unknown field type is rejected when the definition is written rather than discovered after it ships.',
  definition:
    'Typed metadata is application metadata whose keys and values are constrained by a published schema, so that an unknown field type, a misspelled permission, or a workflow step pointing at an object that does not exist is rejected at a validation gate when the definition is written, instead of being discovered in production after it runs.',
  explanation: [
    'The distinction is between a configuration file and a contract. A YAML or JSON config file accepts whatever you put in it; the program that reads it decides at run time which keys it happens to recognize, and quietly ignores the rest. That default is where declared-but-unenforced settings come from: someone writes `requireApproval: ture`, nothing complains, and the approval that was declared never runs. Typed metadata inverts the default. The schema is published, every key has a type, and a key nobody recognizes is an error rather than a shrug — so what the file says and what the system does cannot drift apart without something failing loudly first.',
    'Typing does more than reject typos, because a schema is readable by tooling as well as by validators. The same declaration drives editor completion while the definition is written, a validation gate in continuous integration, and the generated documentation a reader consults later. One published contract, three consumers — which is why the schema is worth maintaining as a first-class artifact rather than as validation logic scattered through whatever reads the file.',
    'The argument gets sharper when an agent is the author. A model asked to add an approval rule fails in a characteristic way: it produces something plausible and adjacent — a real-looking key that this schema does not define, a permission value borrowed from a different platform it saw more often in training. Untyped configuration absorbs that silently and ships it. A schema rejects it at the point of authorship, where the agent can read the error and correct it in the same loop, and the schema also steers generation before the mistake happens, because a published type is exactly the kind of constraint a model can follow.',
    'What typing does not do is worth stating, because overselling it is how validation becomes a substitute for review. A schema constrains shape, not intent. A permission set can be perfectly valid and still grant the wrong people access to salary data; a workflow can type-check and still route approvals to someone who left the company. Typed metadata moves an entire class of error from production to the validation gate and makes the rest smaller and more readable — it does not decide whether the declaration is correct, and nothing in the toolchain replaces the person who signs off.',
  ],
  alsoKnownAs: [
    'schema-validated metadata',
    'typed application definition',
    'strongly typed metadata',
  ],
  relatedTerms: [
    'application-metadata',
    'metadata-driven-development',
    'application-definition-vs-runtime',
    'definition-layer',
  ],
  articleSlugs: [
    'business-app-in-16k-tokens',
    'give-your-agent-rules-for-governable-apps',
    'metadata-not-code-generation',
  ],
  pageSlugs: ['data-modeling', 'platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
