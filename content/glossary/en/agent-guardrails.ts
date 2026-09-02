import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'agent-guardrails',
  term: 'Agent guardrails',
  title: 'Agent Guardrails: Definition, and Which Ones an Agent Can Ignore',
  description:
    'Agent guardrails are the constraints on what an AI agent may do — prompt rules, output filters, permission checks, approval gates, audit — and the distinction that decides their worth is which of them the agent can ignore.',
  definition:
    'Agent guardrails are the constraints placed on what an AI agent may do — from prompt instructions and output filters to runtime permission checks, approval gates, and audit logging — and they divide into the ones an agent can ignore and the ones it cannot.',
  explanation: [
    'Two families travel under one word. Advisory guardrails act on the model: system-prompt rules, tool descriptions written to discourage a call, output validators, refusal training. They move the probability of a bad action. Enforced guardrails act on the system: the identity a call executes under, row- and field-level permission checks, an approval that suspends the action until a person signs it, an audit record written whether or not anyone is watching. They move what is possible at all. Treating the two as interchangeable is how a deployment ships with "guardrails" that consist entirely of a paragraph in a prompt.',
    'One question separates them: if the agent decided to do the forbidden thing, could it? Where the answer depends on the model cooperating, the guardrail is advisory. "Never modify closed opportunities" in a system prompt is a suggestion that a long context, an unusual phrasing, or a confident user can talk past; the same rule expressed as a field-level permission is a fact the caller cannot argue with. Advisory guardrails still earn their place — they lower the rate of attempts and produce better behaviour on ambiguous requests — but they should never be the only thing standing between an agent and a destructive write.',
    'Neither family answers whether an action was the right one. A support agent that legitimately holds refund permission can issue a refund that should never have been issued, and an enforced guardrail will allow it precisely because the action was within permission. That gap is closed by evaluation, approval thresholds on high-impact actions, and designing for reversibility — not by more constraints on the tool surface. A guardrail inventory worth reviewing therefore records, for every rule, which family it belongs to and what observably happens when it is violated.',
  ],
  alsoKnownAs: ['AI guardrails', 'agent safety controls', 'agent constraints'],
  relatedTerms: [
    'governed-runtime',
    'governed-tool-layer',
    'ai-agent-runtime',
    'declared-vs-enforced',
    'row-level-security',
    'approval-workflow',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'when-ai-agent-deletes-production-database',
  ],
  pageSlugs: ['permissions', 'approvals', 'trust-center'],
} satisfies GlossaryTerm;

export default term;
