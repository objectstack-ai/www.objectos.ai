import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'governed-tool-layer',
  term: 'Governed tool layer',
  title: 'Governed Tool Layer: Definition, and What It Adds on Top of MCP',
  description:
    'A governed tool layer sits between an AI agent and a business system, turning every callable operation into a controlled action that carries the caller identity, checks permissions, routes approvals, and leaves an audit record.',
  definition:
    'A governed tool layer is the layer between an AI agent and a business system in which the agent calls controlled actions rather than raw interfaces, so that every call carries the initiating user identity, is checked against that user permissions, pauses for approval when the action requires one, and lands in an audit ledger.',
  explanation: [
    'The layer exists because the fastest way to connect an agent to a system — wrapping an existing interface as a tool — usually wraps something built for a trusted backend caller. Such an interface assumes authorization already happened somewhere upstream, so it verifies nothing itself. Exposed directly to an agent, it queries with the service reach rather than the reach of the person asking, attributes writes to the service rather than to anyone accountable, and records the calls in no business audit ledger at all. Wrapping a raw interface as a tool can quietly issue the agent a superuser pass.',
    'Four properties are what "governed" has to mean concretely. Identity propagates: the call executes as the person who initiated it, and it keeps doing so when one agent calls another — privilege escalation tends to appear on the second hop, not the first. Enforcement lives in the runtime, not in the prompt, so an over-permission call is stopped rather than discouraged. Approval is a property of the action itself, so a material operation suspends for a signature no matter which caller reached it. And every call lands in one ledger, so the question of who saw what has an answer afterwards. A fifth property is what makes the first four survive scale: the tools should be derived from the definitions of the business objects, because hand-written identity checks do not hold across dozens of servers and hundreds of tools.',
    'ObjectStack generates this layer from metadata. An action becomes an agent-callable tool only when its own definition opts in — the ai.exposed flag defaults to false, so an action that says nothing is not exposed — and an exposed action is dispatched through the same permission gate and the same action executor as the REST route rather than down a parallel path. The honest limit applies to any implementation, this one included: a governed tool layer bounds the blast radius, not the judgment. It prevents an agent from doing what it has no right to do; it does not prevent a within-permission action that should never have been taken. That gap belongs to evaluation, approval thresholds, and process design.',
  ],
  alsoKnownAs: ['governed tools', 'controlled action layer', 'policy-enforcing tool layer'],
  relatedTerms: [
    'mcp',
    'governed-runtime',
    'agent-guardrails',
    'ai-agent-runtime',
    'approval-workflow',
    'audit-trail',
  ],
  articleSlugs: [
    'mcp-governed-tool-layer',
    'objectos-action-tools',
    'objectos-agent-permission-boundaries',
  ],
  pageSlugs: ['mcp', 'permissions', 'approvals'],
} satisfies GlossaryTerm;

export default term;
