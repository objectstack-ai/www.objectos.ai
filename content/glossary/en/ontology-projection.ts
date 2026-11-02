import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology-projection',
  term: 'Ontology projection',
  title: 'Ontology Projection: Views, Dashboards, Apps, and Translations Derived from the Ontology',
  description:
    'An ontology projection is a view, dashboard, app, or translation derived from an executable business ontology — authored as metadata and validated by the same gate, but not part of the ontology, so the core changes and the projections follow.',
  definition:
    'An ontology projection is a view, dashboard, app, or translation derived from an executable business ontology — authored as metadata and validated by the same gate, but not part of the ontology itself, so that changing the core changes the projection while removing a projection leaves the business it showed unchanged.',
  explanation: [
    'The ontology is the definition of the business the runtime runs: objects and fields, relations, actions, permissions, flows, and agent and tool definitions. Everything a person looks at is a projection of it. A list view projects an object\'s fields and permissions onto a grid; a dashboard projects queries over objects onto charts; an app groups objects, views, and actions into a navigable product; a translation projects every label into a locale. The projection is real metadata — authored, typed, validated, and reviewed like the rest — but it describes how the business is shown, not what the business is.',
    'The test for telling core from projection is what happens when you delete it. Remove a kanban view and the cases, their owners, and who may edit them are exactly as they were; remove the permission that scoped the kanban and the business has changed. That is why the distinction bounds what an agent must hold to reason about a business: the core, not every screen. It also decides what a reviewer reads: a diff that touches only projections changes presentation, and a diff that touches the core changes authority.',
    'Two things are not projections, though they are often mistaken for them. Actions are part of the ontology: they define what may be done to a record and under which conditions, and an agent calls them as tools. Permissions are part of the ontology: a view is shaped by them; it does not define them. Code is not a projection either — hooks, action bodies, CEL expressions, and constrained JSX run inside the runtime, under the same permission and audit fence as everything derived from the ontology.',
  ],
  alsoKnownAs: ['projection', 'view projection', 'projection of the ontology'],
  relatedTerms: [
    'ontology',
    'application-metadata',
    'typed-metadata',
    'definition-layer',
    'reviewable-diff',
    'object-type-and-action-type',
  ],
  articleSlugs: ['what-does-the-ontology-is-the-software-mean'],
  pageSlugs: ['app-ui'],
} satisfies GlossaryTerm;

export default term;
