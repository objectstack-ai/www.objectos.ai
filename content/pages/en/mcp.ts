import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'mcp',
    navLabel: 'Tools & MCP',
    title: 'ObjectStack MCP Server: Your Business Objects as Governed AI Tools',
    description:
      'The @objectstack/mcp server turns objects, queries, and actions into policy-checked tools for Claude, Cursor, or any MCP client — with permissions enforced on every call.',
    eyebrow: 'Tools & MCP',
    heroTitle: 'Your business objects, as governed tools for any AI.',
    lead:
      'Most companies wire AI to their data with handwritten glue that bypasses every control they have. ObjectOS generates the tools from metadata instead: whatever your model — Claude, Cursor, or something fully local — it works through the same permissions, approvals, and audit as your people.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'Read the docs', href: 'https://docs.objectos.ai' },
    metrics: [
      { value: 'Generated', label: 'Tools come from metadata — no handwritten glue to drift' },
      { value: 'Any client', label: 'Claude, Cursor, local models, or your own agent runtime' },
      { value: 'User-scoped', label: 'Row and field rules enforced on every tool call' },
    ],
    artifact: {
      eyebrow: 'Connect in minutes',
      title: 'Point any MCP client at your runtime.',
      body:
        'One entry in your client configuration connects the model to your governed objects. From there, every query and action is checked against the signed-in user’s permissions.',
      code: `// Any MCP client configuration
{
  "mcpServers": {
    "objectstack": {
      "command": "npx",
      "args": [
        "@objectstack/mcp",
        "--url", "https://runtime.your-company.com"
      ]
    }
  }
}`,
    },
    sections: [
      {
        id: 'tools',
        eyebrow: 'What the AI gets',
        title: 'Tools that already know your business',
        copy:
          'Because tools are generated from the same metadata that defines the application, the AI sees real objects, real relationships, and real actions — not a raw database dump.',
        items: [
          {
            title: 'Query business objects',
            body: 'Search, filter, and traverse relationships over customers, orders, cases — whatever your definitions model — with the schema as context.',
          },
          {
            title: 'Run exposed actions',
            body: 'Actions that metadata explicitly exposes become callable tools: assign a case, start a flow, generate a summary — nothing implicit.',
          },
          {
            title: 'Inspect the schema',
            body: 'Agents can read object and field definitions to plan work, scoped to what the signed-in user is allowed to see.',
          },
        ],
      },
      {
        id: 'governance',
        eyebrow: 'Same rules as people',
        title: 'A tool call is just another governed request',
        copy:
          'The MCP server sits inside the runtime, not beside it — so there is no side door. Every call goes through the same enforcement path as a click in the UI.',
        items: [
          {
            title: 'Signed-in identity',
            body: 'Tool calls carry the user’s identity. Row-level and field-level rules apply exactly as they would in a screen or API request.',
          },
          {
            title: 'Approval-gated writes',
            body: 'Actions that require sign-off queue for approval when called by an AI, the same as when called by a person.',
          },
          {
            title: 'Every call audited',
            body: 'Tool invocations land in the audit log with who, what, and when — reviewable next to human activity.',
          },
        ],
      },
    ],
    table: {
      columns: ['Tool call', 'What the AI sends', 'What the runtime checks'],
      rows: [
        ['Query records', 'Filters over business objects', 'Row and field rules for the signed-in user'],
        ['Run an action', 'A named action with parameters', 'Permission, approval requirement, parameter validation'],
        ['Inspect schema', 'A metadata read', 'Only objects and fields the user may see'],
        ['Update a record', 'Field changes on one record', 'Field-level rights, validations, audit entry'],
      ],
    },
    faqs: [
      {
        question: 'Is the MCP server in the open-source edition?',
        answer:
          'Yes — it is the core of the open-source AI story. @objectstack/mcp ships with the platform, so you can connect Claude, Cursor, or a fully local model to your governed objects without a cloud subscription.',
      },
      {
        question: 'Do we have to expose everything to the AI?',
        answer:
          'No. Tool exposure is explicit in metadata: you choose which objects and actions become tools, and permissions still filter what each user’s session can reach.',
      },
    ],
  } satisfies MarketingPage;

export default page;
