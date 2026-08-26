import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'application-metadata',
  term: 'Application metadata',
  title: 'Application Metadata: Definition, Example, and Why AI Needs It',
  description:
    'Application metadata is the typed definition of a business application — objects, fields, permissions, workflows, and APIs — kept as source files a runtime executes directly instead of as generated code.',
  definition:
    'Application metadata is the structured, typed definition of a business application — its objects, fields, relationships, views, permissions, workflows, actions, and APIs — stored as source files that a runtime reads and executes directly, rather than as generated application code.',
  explanation: [
    'The distinction that matters is not "config versus code" but what happens at run time. Generated code is a one-way export: once the generator has produced a controller, a form, and a migration, those artifacts drift apart and the original intent is gone. Metadata stays the live source. Change the permission rule in the definition file and the API, the UI, the audit log, and the agent tool all change with it, because all four are derived from that one declaration on every request.',
    'That property is what makes metadata the right target format for AI. A complete CRM expressed as metadata fits in roughly 150k tokens, so a coding agent can hold the whole system in one context window instead of guessing at a codebase it can only sample. And because the definitions are typed and schema-validated, a wrong field name or an unknown permission value fails at the validation gate rather than shipping as a runtime surprise.',
    'It is also what makes AI-written software reviewable. When an agent adds an approval step, the diff is a handful of readable lines in a definition file — not four hundred lines across a controller, a template, a migration, and a test. A reviewer with business authority but no interest in framework internals can read that diff, understand what changed about who may do what, and sign off.',
  ],
  alsoKnownAs: ['app metadata', 'metadata-driven application definition'],
  relatedTerms: ['governed-runtime'],
  articleSlugs: [
    'natural-language-to-app-metadata',
    'business-app-in-16k-tokens',
    'low-code-vs-ai-native-app-platform',
  ],
  pageSlugs: ['data-modeling', 'platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
