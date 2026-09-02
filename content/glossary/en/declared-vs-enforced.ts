import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'declared-vs-enforced',
  term: 'Declared vs. enforced',
  title: 'Declared vs. Enforced: When a Setting Is Only a Comment',
  description:
    'Declared vs. enforced names the gap between what a system’s configuration lets you write down and what its runtime actually checks — the gap that turns a permission setting into a comment.',
  definition:
    'Declared vs. enforced names the gap between what a system’s configuration lets you write down and what its runtime actually checks at execution time — a declaration that nothing enforces reads like a guarantee and behaves like a comment.',
  explanation: [
    'Any system with a schema, a policy language, or a settings screen has two distinct sets: the keys you are allowed to declare, and the keys something actually acts on. They start out identical and drift apart quietly. A field marked required that only the browser form honours, so the API accepts it empty. A retention period no job ever reads. A permission flag one code path checks and the export endpoint does not. Each was true when it was written, and each stopped being true without anything failing — which is exactly why the gap survives audits. Nothing is broken, the setting is still there, and the screen still shows it as on.',
    'The gap becomes structurally more dangerous once the configuration is authored by a model rather than by the people who built the runtime. A model learns a configuration format from its examples and documentation, and nothing in that material distinguishes a key the runtime enforces from a key it merely parses: both appear in samples, both validate, both read as authoritative. So an agent will confidently declare a control that does nothing — and, the sharp part, the human reviewing that diff sees a plausible, correct-looking line and approves it. This is the characteristic failure mode of AI-authored configuration: not invalid syntax, which every validator catches, but valid, plausible, inert declarations. The access-control special case has its own name: a paper permission, metadata that reads as a boundary and enforces nothing. A related tell is that a request-level filter and a server-enforced boundary look identical from outside, because both make two test accounts see the right thing.',
    'One question separates the two sets, and it can be asked of any declaration: what fails, where, and how loudly, if I violate this? If the answer is "nothing," the line is documentation rather than a control and should be labelled as such. That leaves two defensible resolutions for any declarable key — enforce it, or remove it. Carrying an unenforced key is the third option and the one that costs real credibility, because everyone downstream reads it as a guarantee: the reviewer approving a change, the auditor sampling controls, and now the agent generating the next application from your examples.',
    'ObjectStack closes the gap at authoring time rather than at run time: the definition surface is schema-validated, and a declaration the runtime would not enforce is rejected at the validation gate instead of shipping as a false guarantee. Where the check itself could silently degrade — a row-level rule whose predicate the engine cannot compile, for instance — the gate calls the runtime’s own decision procedure rather than modelling its behaviour, so "rejected by the linter" and "dropped with no enforcement" are the same boolean and cannot drift into two different answers.',
  ],
  alsoKnownAs: ['declared but not enforced', 'paper permission', 'enforce or remove'],
  relatedTerms: [
    'reviewable-diff',
    'governed-runtime',
    'application-metadata',
    'typed-metadata',
    'permission-model',
    'agent-guardrails',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'is-lovable-safe-for-production',
    'when-ai-agent-deletes-production-database',
  ],
  pageSlugs: ['permissions', 'trust-center', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
