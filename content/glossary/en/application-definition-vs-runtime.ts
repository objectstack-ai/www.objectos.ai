import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'application-definition-vs-runtime',
  term: 'Application definition vs. runtime',
  title: 'Application Definition vs. Runtime: Where the Line Falls and Why It Matters',
  description:
    'Application definition vs. runtime separates what an application is — a typed, versioned declaration — from the engine that executes it, which is what makes the definition portable and the engine replaceable.',
  definition:
    'Application definition vs. runtime is the architectural split between what an application is — a typed, version-controlled declaration of its objects, fields, relationships, permissions, workflows, actions, and APIs — and what runs it: an engine that reads that declaration on every request and derives the database, the API, the interface, and the permission and audit enforcement from it, so that the definition stays portable and the engine stays replaceable.',
  explanation: [
    'The split is easiest to see by looking at where it is absent. In a generated application, the definition and the runtime are the same artifact: a generator turns a specification into controllers, forms, and migrations, and from that moment the specification is a historical document. Nothing reads it again. Change the generated code and the specification is wrong; change the specification and the code is unaffected. In a system that keeps the split, the declaration is the live source — the engine consults it on every request, so there is no gap in which the two can disagree, and no separate act of regeneration to remember.',
    'The consequence people actually care about is lock-in, and it has two halves that are often confused. An open definition format with one proprietary engine that can execute it is not portable, however readable the files are; you can take your declarations elsewhere and nothing there will run them. An open engine with an undocumented internal format is not portable either; you can host it yourself right up until you want to read what it is hosting. Portability requires both halves — a definition you can read and diff without running anything, and at least one runtime you can operate yourself.',
    'The strongest argument against the split is worth stating plainly: an integrated system that owns both halves can be better engineered. It can change the format and the engine together, ship features that need both, and avoid the compatibility surface a stable declaration format imposes. That argument holds for a single product with a single vendor. It stops holding once several parties depend on the same declarations — the application, the agents that call it, the auditors who read what happened, and tooling from vendors who will never coordinate a release with each other.',
    'The practical test is two questions, and both are answerable in an afternoon. Can you read the whole application without running it — open a file, see what an object is, who may edit it, and which step requires approval? And could a second, independently built runtime execute those same files? Answering yes to the first and no to the second is the common case, and it is worth naming honestly rather than counting as a pass.',
  ],
  alsoKnownAs: [
    'definition vs runtime',
    'declaration versus execution',
    'separating application definition from application runtime',
  ],
  relatedTerms: [
    'definition-layer',
    'metadata-driven-development',
    'typed-metadata',
    'application-metadata',
    'governed-runtime',
    'ai-agent-runtime',
    'semantic-layer',
    'declared-vs-enforced',
  ],
  articleSlugs: [
    'ai-ontology-open-protocol',
    'metadata-not-code-generation',
    'self-hosted-ai-app-platform',
  ],
  pageSlugs: ['platform', 'product-tour', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
