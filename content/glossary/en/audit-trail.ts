import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'audit-trail',
  term: 'Audit trail',
  title: 'Audit Trail: Definition, What Makes One Admissible, and Who Writes It',
  description:
    'An audit trail is an append-only record of who did what, to which data, and when — written by the system that executed the action rather than by the actor, so history can be attributed after the fact.',
  definition:
    'An audit trail is a chronological, append-only record of who did what to which data and when, written by the system that executed the actions rather than by the parties performing them, so that history can be reconstructed and attributed after the fact.',
  explanation: [
    'The term comes from accounting, where an audit trail is the paper path from a figure on a summary statement back to the source documents behind it, and the properties that made it worth keeping on paper are unchanged in software. Entries are appended and never edited, so a later dispute reads the same record as the original. Each entry names the acting principal rather than only the account or the process, so an action can be attributed to someone who can answer for it. And crucially the record is written by the system that performed the work, not by the party who wanted it performed — a log an actor writes about itself is a narration, and it is exactly as trustworthy as the actor. That last property is the one that decides whether an AI agent can be governed at all: if the agent authors the record of what it did, asking the agent whether anything went wrong is not a control.',
    'ObjectStack records this as sys_audit_log, an append-only platform object rather than a log file. Every field is read-only and the API exposes only get and list, so there is no write path through a form or an endpoint; rows are written by internal hooks as the action executes. Each row carries the action, the object and record it touched, the acting user, and the before and after values, so "who changed that discount" resolves to a diff rather than to a timestamp. A write that is not authenticated as a person still lands attributable: the service principal is stamped on the actor column as svc:name rather than leaving a null. Retention is declared rather than incidental — the object is classed as a compliance ledger under ADR-0057, retained hot for 90 days and then archived rather than deleted, with a seven-year keep on the archive copy.',
    'One design rule is worth borrowing whether or not you use this platform: a compliance screen must never show a column it does not populate. A blank cell reads as "captured, and nothing happened" rather than "not captured", which is the more dangerous of the two misreadings, so audit actions with no writer and columns with no writer have been removed from the ledger rather than left standing as evidence of a capture that never occurred. The other rule is that there is one ledger, not two: agent actions and human actions are recorded by the same runtime in the same place, with the same filters and the same diffs. That is what makes reviewing the AI the same job as reviewing people — and it holds only because the runtime writes the row, not the agent.',
  ],
  alsoKnownAs: ['audit log', 'audit history', 'activity log', 'compliance ledger'],
  relatedTerms: ['approval-workflow', 'row-level-security', 'governed-runtime'],
  articleSlugs: [
    'eu-ai-act-runtime-audit',
    'when-ai-agent-deletes-production-database',
    'objectos-agent-permission-boundaries',
  ],
  pageSlugs: ['permissions', 'trust-center', 'ai'],
} satisfies GlossaryTerm;

export default term;
