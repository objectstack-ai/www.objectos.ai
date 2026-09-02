import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'mcp',
  term: 'MCP (Model Context Protocol)',
  title: 'MCP (Model Context Protocol): What It Standardizes, and What It Leaves to You',
  description:
    'The Model Context Protocol is an open standard for connecting AI applications to tools, data, and prompts through one client–server interface — it standardizes how an agent reaches a tool, not whether the call is allowed.',
  definition:
    'MCP (Model Context Protocol) is an open standard that defines how an AI application connects to external tools, data sources, and prompts over a uniform client–server interface, so that any compliant client can use any compliant server without integration code written for that specific pair.',
  explanation: [
    'The protocol specifies a JSON-RPC exchange between a client and a server. A server advertises tools (callable operations), resources (readable data), and prompts (reusable instruction templates); a client — a chat application, an IDE, or an agent runtime — discovers them when it connects and calls them over stdio or HTTP. It was introduced by Anthropic in late 2024, published as an open specification, and is now implemented by clients and servers from many vendors and open-source projects. The value it captures is combinatorial: N clients and M tools stop requiring N×M bespoke integrations.',
    'A connection standard says nothing about authority, and MCP deliberately does not try to. It describes how a call is framed and transported; it does not decide whose permissions apply to that call, whether the operation needs a signature before it takes effect, or what evidence remains afterwards. Those decisions belong to the system holding the data, which is why an MCP server is never safer than the interface it wraps: a server placed in front of a raw database connection hands the agent the service account reach, not the reach of the person asking.',
    'The clean way to hold the two apart is that MCP standardizes how an agent reaches a tool, while a governed tool layer decides whether the call is allowed and whether it is recorded. Both are needed. Connectivity arriving years before governance is exactly how an agent ends up cheerfully exporting records that the person who asked was never entitled to see — not through malice, but because nothing in the path ever asked who was calling.',
  ],
  alsoKnownAs: ['Model Context Protocol', 'MCP server', 'MCP client'],
  relatedTerms: [
    'governed-tool-layer',
    'ai-agent-runtime',
    'agent-guardrails',
    'governed-runtime',
    'permission-model',
  ],
  articleSlugs: [
    'mcp-governed-tool-layer',
    'ontology-mcp-agent-tools',
    'objectos-action-tools',
    'ai-agent-business-data-security-boundaries',
  ],
  pageSlugs: ['mcp', 'ai'],
} satisfies GlossaryTerm;

export default term;
