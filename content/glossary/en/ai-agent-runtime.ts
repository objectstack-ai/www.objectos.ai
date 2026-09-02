import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ai-agent-runtime',
  term: 'AI agent runtime',
  title: 'AI Agent Runtime: Definition, and How It Differs From a Governed Runtime',
  description:
    'An AI agent runtime executes the agent loop — model calls, tool invocation, state between steps — while the business system it acts on decides what each call is allowed to do. Two layers, one contested name.',
  definition:
    'An AI agent runtime is the execution environment that runs an agent loop — calling the model, invoking tools, carrying state and memory between steps, and handling retries, timeouts, and concurrency — so that an agent runs as a supervised program rather than as a single prompt.',
  explanation: [
    'Two different things are sold under this name, and the difference decides who is accountable when a call goes wrong. One is agent-side: a framework or hosted service that executes the loop — a graph runner, an agent SDK, a workflow engine with model steps in it. The other is system-side: the runtime of the business application the agent acts on, which resolves the acting identity and decides whether a given read or write is permitted at all. Reading any vendor claim about an "agent runtime" starts with asking which of the two is meant, because the two answer different questions and neither substitutes for the other.',
    'What an agent runtime genuinely owns is real and difficult: keeping a long-running loop durable across steps, retrying a failed step without duplicating a write, bounding concurrency and token spend, pausing for a human and resuming cleanly, discovering tools (often over MCP), and leaving a trace of what the agent attempted and why. An agent that loses its state halfway through a task, or silently repeats a side effect on retry, is a production problem that no permission model will fix.',
    'What it cannot own is authority over the data. An agent runtime sits outside the system holding the records, so its enforcement reaches only as far as which tools it offers — not to what any particular caller may see through them. A row-level rule depends on the acting identity evaluated against the record, a decision only the system of record can make. That is why an agent runtime and a governed runtime are complementary rather than competing: the first decides what the agent attempts, the second decides what actually happens. When one vendor supplies both, the question worth asking is which component performed the permission check on the last call.',
  ],
  alsoKnownAs: ['agent execution environment', 'agentic runtime', 'agent orchestration layer'],
  relatedTerms: [
    'governed-runtime',
    'governed-tool-layer',
    'agent-guardrails',
    'mcp',
    'application-definition-vs-runtime',
  ],
  articleSlugs: [
    'why-ai-agent-pilots-fail-four-layers',
    'ai-agent-workbench',
    'enterprise-agent-true-cost',
  ],
  pageSlugs: ['ai', 'agent-developer', 'mcp'],
} satisfies GlossaryTerm;

export default term;
