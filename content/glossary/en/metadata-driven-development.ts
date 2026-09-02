import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'metadata-driven-development',
  term: 'Metadata-driven development',
  title: 'Metadata-Driven Development: Definition, and What Changes When AI Writes the App',
  description:
    'Metadata-driven development declares an application — objects, permissions, workflows, actions, APIs — as typed metadata a runtime executes directly, and when an AI agent is the author, that declaration is what makes the result reviewable.',
  definition:
    'Metadata-driven development builds an application by declaring its objects, fields, permissions, workflows, actions, and APIs as typed metadata that a runtime executes directly, instead of writing the code that implements them — a distinction that becomes decisive once an AI agent is doing the writing, because the declaration is small enough for a human to review and the runtime, not the generated code, is what enforces the rules.',
  explanation: [
    'The idea is not new, and pretending otherwise is the fastest way to be misread. Enterprise platforms have been describing applications as declarations rather than code since the mid-2000s, and the vocabulary comes from that lineage: objects instead of tables, permission sets instead of authorization middleware, flows instead of job scripts. What that generation established is worth keeping — a field added to a definition appears in the API, the list view, the detail form, the export, and the permission model at once, because all of them are derived from the same declaration rather than kept in sync by hand.',
    'What has changed is who writes the declaration. When a human authored it through a point-and-click console, the payoff was speed and consistency, and the format could afford to be a proprietary XML dialect nobody read directly. When an AI agent authors it, the format itself becomes the constraint that decides whether the output is trustworthy: a complete business application expressed as metadata is a few thousand lines rather than a few hundred thousand, so an agent can hold the whole system in one context window instead of sampling a codebase it cannot see the edges of, and the human reviewing the change reads a diff of declarations — which fields moved, which permission changed, which step now requires approval — rather than auditing a generated controller, template, migration, and test.',
    'Stated bare, the term collapses into the low-code reading and loses the argument, so it is worth being precise about the difference. A drag-and-drop builder optimizes for a person who does not want to write code; metadata-driven development in this sense optimizes for a reviewer who did not write the code and must sign off on it anyway. Those produce different formats. The first can hide the definition behind a UI, because the UI is the interface. The second cannot: the definition has to be a readable, version-controlled, diffable file, because a diff is the review surface and an agent — not a form — is the thing writing it.',
    'It is a poor fit for some work, and saying so is not modesty. Problems whose essence is an algorithm — a pricing optimizer, a routing engine, a parser — do not get smaller or safer by being declared; they get written as code and called from the definition. The honest failure mode of the approach is an expressiveness ceiling: when the declaration surface cannot express a requirement, teams reach for an escape hatch, and enough escape-hatch code puts the system back where it started, with logic living somewhere the runtime does not govern and the reviewer does not see.',
  ],
  alsoKnownAs: [
    'metadata driven development',
    'metadata-driven architecture',
    'declarative application development',
  ],
  relatedTerms: [
    'application-metadata',
    'typed-metadata',
    'application-definition-vs-runtime',
    'definition-layer',
    'governed-runtime',
    'vibe-coding',
    'comprehension-debt',
    'reviewable-diff',
  ],
  articleSlugs: [
    'metadata-not-code-generation',
    'business-app-in-16k-tokens',
    'low-code-vs-ai-native-app-platform',
  ],
  pageSlugs: ['platform', 'product-tour', 'data-modeling'],
} satisfies GlossaryTerm;

export default term;
