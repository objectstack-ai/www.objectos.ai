import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'governed-runtime',
  term: 'Governed runtime',
  title: 'Governed Runtime: Definition and Why AI Agents Need One',
  description:
    'A governed runtime enforces identity, permissions, approvals, and audit on every read, write, and tool call — so an AI agent operates inside the same boundary as the person it acts for.',
  definition:
    'A governed runtime is an application runtime that enforces identity, permissions, approvals, and audit logging on every read, write, and tool call, so that an AI agent and the person it acts for are held to exactly the same rules.',
  explanation: [
    'Most AI integrations put the rules in the wrong place. A prompt that says "never modify closed opportunities" is a suggestion; a service account with database credentials has no rules at all. A governed runtime moves the boundary underneath the model: the agent calls a tool, the runtime resolves the acting identity, applies row- and field-level permissions, routes anything material through an approval, and writes an audit record — whether the caller was a browser session, an API client, or an MCP tool call.',
    'This is why "self-hosted AI" is usually a question about the runtime rather than the model. Where the weights run matters less than which component decides what the agent may read, which action it may execute, and what evidence remains afterwards. A chat interface cannot enforce those decisions reliably; the layer that owns the data access path can.',
    'The practical test is a single question: if the agent were replaced tomorrow by an intern with the same login, would anything about the safety of the system change? In a governed runtime the answer is no, because the enforcement never depended on the caller being well-behaved.',
  ],
  alsoKnownAs: ['governed application runtime', 'policy-enforcing runtime'],
  relatedTerms: ['application-metadata'],
  articleSlugs: [
    'ai-agent-business-data-security-boundaries',
    'when-ai-agent-deletes-production-database',
    'self-hosted-ai-app-platform',
  ],
  pageSlugs: ['permissions', 'trust-center', 'mcp'],
} satisfies GlossaryTerm;

export default term;
