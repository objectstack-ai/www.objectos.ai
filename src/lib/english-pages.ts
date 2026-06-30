export interface EnglishPageMetric {
  value: string;
  label: string;
}

export interface EnglishPageAction {
  label: string;
  href: string;
}

export interface EnglishPageItem {
  title: string;
  body: string;
  meta?: string;
}

export interface EnglishPageSection {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  items: EnglishPageItem[];
}

export interface EnglishPageTable {
  columns: [string, string, string];
  rows: [string, string, string][];
}

export interface EnglishPageArtifact {
  eyebrow: string;
  title: string;
  body: string;
  code?: string;
  steps?: string[];
}

export interface EnglishPage {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  lead: string;
  primary: EnglishPageAction;
  secondary: EnglishPageAction;
  metrics: EnglishPageMetric[];
  artifact: EnglishPageArtifact;
  sections: EnglishPageSection[];
  table?: EnglishPageTable;
  checklistTitle?: string;
  checklist?: string[];
  faqs: { question: string; answer: string }[];
}

export const englishPagePath = (slug: string): string => `/en/${slug}/`;

export const ENGLISH_PAGES: EnglishPage[] = [
  {
    slug: 'product-tour',
    navLabel: 'Product tour',
    title: 'ObjectOS Product Tour: From Prompt to Governed App',
    description:
      'See how ObjectOS turns a business request into reviewable ObjectStack metadata, then runs the app with permissions, approvals, audit, APIs, UI, and AI tools.',
    eyebrow: 'Product tour',
    heroTitle: 'From one request to a governed application.',
    lead:
      'ObjectOS is not another code generator. It is the target format and runtime where AI-written enterprise software lands: the agent writes compact metadata, a person reviews the diff, and the runtime supplies the repeatable application surfaces.',
    primary: { label: 'Point your agent at ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: 'Review the trust model', href: '/en/trust-center/' },
    metrics: [
      { value: '5 steps', label: 'Requirement, metadata, review, runtime, governed AI' },
      { value: '~1%', label: 'Review-surface heuristic for CRUD/workflow apps' },
      { value: '100x', label: 'Iteration ambition when changes stay metadata-sized' },
    ],
    artifact: {
      eyebrow: 'Review surface',
      title: 'The diff is the product boundary.',
      body:
        'Instead of asking a reviewer to audit a generated application codebase, ObjectStack asks the agent to change the business definition layer: objects, fields, views, permissions, workflows, actions, APIs, and tools.',
      code: `defineObject('Case', {
  fields: {
    customer: relation('Customer'),
    priority: picklist(['low', 'normal', 'urgent']),
    summary: text({ ai: 'summarize customer issue' }),
    status: picklist(['new', 'triage', 'waiting', 'resolved']),
  },
  permissions: {
    support: can(['read', 'update']),
    aiAgent: can(['read', 'suggest'], { approval: 'write' }),
  },
});`,
    },
    sections: [
      {
        id: 'flow',
        eyebrow: 'How it works',
        title: 'The governed build loop',
        copy:
          'The product loop is designed around the two readers that matter: the AI that writes the system and the human who must understand and approve it.',
        items: [
          {
            title: '1. Describe the business change',
            body: 'Start with a real operating request: a case queue, approval chain, procurement flow, customer portal, or workflow that already has owners and rules.',
            meta: 'Human intent',
          },
          {
            title: '2. Agent writes metadata',
            body: 'The coding agent edits ObjectStack definitions instead of generating controllers, screens, migrations, APIs, and permission glue by hand.',
            meta: 'AI writes',
          },
          {
            title: '3. Reviewer signs off',
            body: 'The reviewer checks a compact diff: field names, relationships, permissions, transitions, workflow rules, and tool exposure.',
            meta: 'Human review',
          },
          {
            title: '4. Runtime supplies surfaces',
            body: 'ObjectOS turns metadata into tables, views, forms, ObjectQL, APIs, audit trails, MCP tools, and admin surfaces.',
            meta: 'Runtime layer',
          },
          {
            title: '5. Agents operate inside policy',
            body: 'AI can query and act through governed tools that inherit identity, record rules, field rules, approvals, and audit logging.',
            meta: 'Governed AI',
          },
        ],
      },
      {
        id: 'connect',
        eyebrow: 'Existing systems',
        title: 'Add an object layer without replacing systems of record',
        copy:
          'Most enterprise software value is already trapped in databases, ERP, CRM, ticketing, files, and custom systems. ObjectOS gives agents an explicit object model over that estate.',
        items: [
          {
            title: 'Connect databases and APIs',
            body: 'Map existing records into business objects, relationships, calculated fields, and actions without forcing a rip-and-replace migration.',
          },
          {
            title: 'Keep authority explicit',
            body: 'Each object says who can read, write, approve, export, automate, or expose it as a tool. That authority remains visible in review.',
          },
          {
            title: 'Ship new surfaces on top',
            body: 'The same definition can back internal apps, dashboards, portals, workflows, APIs, reports, and AI agent tools.',
          },
        ],
      },
    ],
    table: {
      columns: ['Layer', 'AI writes', 'ObjectOS supplies'],
      rows: [
        ['Data model', 'Objects, fields, relationships, validations', 'Tables, migrations, ObjectQL, generated APIs'],
        ['Experience', 'Views, forms, dashboards, actions', 'Rendered UI, navigation, status states, access checks'],
        ['Governance', 'Roles, row rules, field rules, approvals', 'Runtime enforcement, audit log, user-scoped tools'],
        ['AI surface', 'Agent tools, skills, prompts, action contracts', 'MCP exposure, policy checks, execution records'],
      ],
    },
    checklistTitle: 'A reviewer should be able to answer',
    checklist: [
      'What business objects changed?',
      'Which people, roles, and agents gained authority?',
      'Which actions need approval before execution?',
      'Which data can leave the runtime, if any?',
      'What will appear in audit logs after the change?',
    ],
    faqs: [
      {
        question: 'Is ObjectOS a low-code builder?',
        answer:
          'No. Low-code usually optimizes human screen building. ObjectOS is a target format and runtime for AI-written business software, where metadata stays reviewable and runtime governance stays enforced.',
      },
      {
        question: 'Is the 1% claim a benchmark?',
        answer:
          'It is a review-surface heuristic for typical CRUD and workflow apps. The exact ratio depends on the domain, but the key point is that the agent edits metadata while ObjectOS supplies repeated application mechanics.',
      },
    ],
  },
  {
    slug: 'trust-center',
    navLabel: 'Trust center',
    title: 'ObjectOS Trust Center for Governed AI Applications',
    description:
      'Review the ObjectOS trust model: data residency, self-hosted deployment, identity, permissions, approvals, audit logs, AI tool boundaries, and enterprise security review materials.',
    eyebrow: 'Trust center',
    heroTitle: 'AI can write software. The harder question is whether you can approve it.',
    lead:
      'ObjectOS is designed for the procurement, security, and IT review that happens after a demo works. It keeps business data under customer control and makes agent authority explicit in metadata and runtime enforcement.',
    primary: { label: 'Read the security model', href: '/en/security/' },
    secondary: { label: 'See deployment paths', href: '/en/pricing/' },
    metrics: [
      { value: 'Self-hosted', label: 'Run in your VPC, servers, or isolated network' },
      { value: 'User scoped', label: 'Agents inherit the signed-in user permissions' },
      { value: 'Auditable', label: 'Reads, writes, tool calls, approvals, and schema changes' },
    ],
    artifact: {
      eyebrow: 'Security review packet',
      title: 'What a reviewer should receive before sign-off',
      body:
        'A governed AI app should arrive with an architecture boundary, object authority map, approval policy, audit plan, integration list, model routing, and rollback plan. ObjectStack metadata is structured so those materials can be generated from the same source definitions.',
      steps: [
        'Deployment boundary: where runtime, database, files, identity, and models run.',
        'Authority map: object, record, field, workflow, action, and AI tool permissions.',
        'Audit plan: what is logged for people, agents, APIs, and approvals.',
        'Change plan: how metadata changes are reviewed, promoted, and rolled back.',
      ],
    },
    sections: [
      {
        id: 'boundaries',
        eyebrow: 'Boundaries',
        title: 'Keep sensitive business data inside controlled infrastructure',
        copy:
          'ObjectOS can run as a self-hosted runtime. Unless you configure external providers, business records, prompts, files, audit logs, and credentials stay in infrastructure you control.',
        items: [
          {
            title: 'Data residency',
            body: 'Connect customer-controlled databases and storage. ObjectOS does not require application records to be copied into a vendor workspace.',
          },
          {
            title: 'No required telemetry',
            body: 'The open-source runtime does not need a license callback or product telemetry channel to operate.',
          },
          {
            title: 'Model choice',
            body: 'Use cloud models, private endpoints, or local models based on the sensitivity of the workflow and deployment.',
          },
        ],
      },
      {
        id: 'authority',
        eyebrow: 'Authority',
        title: 'AI acts through governed tools, not raw database access',
        copy:
          'The runtime evaluates identity, roles, row rules, field rules, approval policy, and action contracts before an AI tool can read or write data.',
        items: [
          {
            title: 'Signed-in user inheritance',
            body: 'AI sees what the user can see and acts only within the user authority unless an explicitly approved service role is configured.',
          },
          {
            title: 'Approval before sensitive writes',
            body: 'High-risk actions such as refunds, contract changes, escalations, exports, and permission updates can require human approval.',
          },
          {
            title: 'Field-level controls',
            body: 'Sensitive fields can be hidden, read-only, masked, or excluded from AI tool exposure even when the record itself is visible.',
          },
        ],
      },
    ],
    table: {
      columns: ['Review area', 'Available now', 'Enterprise packet'],
      rows: [
        ['Deployment', 'Self-hosted open-source runtime', 'VPC, private network, air-gapped deployment notes'],
        ['Identity', 'Project identity and permission metadata', 'SSO, SCIM, admin roles, session policy mapping'],
        ['AI governance', 'MCP tools, object permissions, approvals', 'Model routing policy and prompt/data boundary report'],
        ['Audit', 'Runtime audit design and metadata review', 'Exportable audit retention and investigation workflow'],
      ],
    },
    checklistTitle: 'Security review checklist',
    checklist: [
      'Where does each class of business data live?',
      'Which model endpoints can receive prompts or retrieved records?',
      'Which objects, fields, and actions are exposed to AI tools?',
      'Which writes require human approval?',
      'How are user actions and agent actions distinguished in audit?',
      'How is a bad metadata change rolled back?',
    ],
    faqs: [
      {
        question: 'Does ObjectOS train models on customer data?',
        answer:
          'Self-hosted deployments are controlled by the customer. Cloud or Enterprise data usage should be governed by the relevant commercial agreement; the product direction is to keep customer data out of general model training unless a customer explicitly agrees.',
      },
      {
        question: 'Can ObjectOS run without internet access?',
        answer:
          'The runtime is designed for self-hosted and isolated deployment patterns. The exact operating model depends on package mirrors, model routing, identity, and customer infrastructure.',
      },
    ],
  },
  {
    slug: 'templates',
    navLabel: 'Templates',
    title: 'ObjectStack Templates for Governed AI Applications',
    description:
      'Start from reviewable ObjectStack templates for helpdesk, contracts, procurement, CRM, manufacturing, and employee service workflows instead of asking AI to generate a full app codebase.',
    eyebrow: 'Templates',
    heroTitle: 'Start with an operating model, not a blank app.',
    lead:
      'Templates give coding agents a concrete target: object models, views, permissions, workflows, actions, and AI tools that can be copied, reviewed, adapted, and run in ObjectOS.',
    primary: { label: 'Open template source', href: 'https://github.com/objectstack-ai/templates' },
    secondary: { label: 'See the product tour', href: '/en/product-tour/' },
    metrics: [
      { value: '6 starters', label: 'Support, contracts, procurement, CRM, manufacturing, employee service' },
      { value: 'One layer', label: 'Objects, UI, workflows, APIs, and AI tools from the same definition' },
      { value: 'Reviewable', label: 'Each template changes as metadata diffs' },
    ],
    artifact: {
      eyebrow: 'Template anatomy',
      title: 'Every template should be readable as a business system',
      body:
        'A useful AI app template is more than screens. It names the objects, authorities, workflow transitions, approvals, reports, and agent tools that make the business process governable.',
      steps: [
        'Object model: records, relationships, states, and validations.',
        'Authority model: who can read, write, approve, export, or delegate.',
        'Workflow model: transitions, SLA timers, escalation rules, and approvals.',
        'Agent tools: the safe reads and actions exposed through MCP or in-app AI.',
      ],
    },
    sections: [
      {
        id: 'catalog',
        eyebrow: 'Catalog',
        title: 'Starter applications for common enterprise workflows',
        copy:
          'These are reference templates, not locked products. Your agent can fork one, change the metadata, and open a diff for review.',
        items: [
          {
            title: 'Helpdesk',
            body: 'Tickets, customers, SLAs, queues, summaries, suggested replies, knowledge retrieval, escalation approvals.',
            meta: 'Support operations',
          },
          {
            title: 'Contracts',
            body: 'Counterparties, obligations, renewals, clause extraction, approval stages, redlines, audit trail.',
            meta: 'Legal operations',
          },
          {
            title: 'Procurement',
            body: 'Suppliers, requests, POs, receiving, three-way match, budget checks, exception approval.',
            meta: 'Spend control',
          },
          {
            title: 'CRM case management',
            body: 'Accounts, opportunities, cases, activities, ownership, risk signals, user-scoped AI summaries.',
            meta: 'Revenue and service',
          },
          {
            title: 'Manufacturing service',
            body: 'Assets, work orders, parts, maintenance history, downtime reports, field-service recommendations.',
            meta: 'Operations',
          },
          {
            title: 'Employee service',
            body: 'Requests, policies, approvals, routing, employee data boundaries, internal knowledge retrieval.',
            meta: 'Internal apps',
          },
        ],
      },
      {
        id: 'why',
        eyebrow: 'Why templates matter',
        title: 'Templates reduce both generation time and review risk',
        copy:
          'The safest path for AI-built software is not a blank prompt. It is a known operating model where the reviewer can recognize the objects and rules.',
        items: [
          {
            title: 'Agents inherit naming patterns',
            body: 'Object, field, workflow, and permission names stay consistent, making follow-up changes easier for both humans and models.',
          },
          {
            title: 'Reviewers get a familiar baseline',
            body: 'A template gives IT and business owners a known diff to compare against instead of a novel codebase.',
          },
          {
            title: 'Teams keep ownership',
            body: 'Templates live as source metadata in your repo and can be adapted without waiting for a vendor roadmap.',
          },
        ],
      },
    ],
    table: {
      columns: ['Template', 'Objects included', 'Agent-safe actions'],
      rows: [
        ['Helpdesk', 'Ticket, Customer, SLA, Knowledge Article', 'Summarize, classify, suggest reply, escalate for approval'],
        ['Contracts', 'Contract, Counterparty, Clause, Obligation', 'Extract metadata, flag risk, draft renewal task'],
        ['Procurement', 'Supplier, Purchase Request, PO, Receipt', 'Check policy, prepare approval, match exception'],
        ['CRM', 'Account, Contact, Opportunity, Case', 'Summarize account, identify risk, propose next step'],
      ],
    },
    checklistTitle: 'Template review checklist',
    checklist: [
      'Can a reviewer understand the object model in five minutes?',
      'Are high-risk actions separated from suggestions?',
      'Are default permissions conservative?',
      'Are audit events named clearly?',
      'Can the template run with sample data before touching production?',
    ],
    faqs: [
      {
        question: 'Are templates production systems?',
        answer:
          'They are starting points. A production deployment should review object names, permissions, workflows, model routing, sample data, integration boundaries, and audit policy.',
      },
      {
        question: 'Can my agent modify a template?',
        answer:
          'Yes. That is the point: the template gives the agent a strong target format and gives the reviewer a small metadata diff.',
      },
    ],
  },
  {
    slug: 'agent-developer',
    navLabel: 'Agent developer',
    title: 'Agent Developer Guide: How AI Writes ObjectStack Metadata',
    description:
      'Give your coding agent the rules, files, metadata patterns, and review checklist it needs to generate ObjectStack applications correctly and keep humans in control.',
    eyebrow: 'Agent developer',
    heroTitle: 'Do not teach every developer to hand-write apps. Teach your agent the target format.',
    lead:
      'ObjectStack is designed for the agent as the writer and the human as the reviewer. The developer workflow is to give the agent rules, examples, tests, and review gates so metadata changes stay small and governable.',
    primary: { label: 'Read the docs', href: 'https://docs.objectos.ai' },
    secondary: { label: 'See template patterns', href: '/en/templates/' },
    metrics: [
      { value: 'Agent first', label: 'Rules and examples are part of the product surface' },
      { value: 'Metadata diff', label: 'Review objects, views, workflows, permissions, tools' },
      { value: 'MCP ready', label: 'Expose governed objects and actions to AI clients' },
    ],
    artifact: {
      eyebrow: 'Agent instruction',
      title: 'A good rule file makes the target format explicit',
      body:
        'The most important developer artifact is not a tutorial for hand-coding screens. It is a compact, retrievable instruction set that tells the agent what to edit, what not to invent, and how to prove the change is reviewable.',
      code: `When building an ObjectStack app:
1. Model business objects before UI.
2. Prefer metadata definitions over generated application code.
3. Add conservative permissions by default.
4. Expose AI actions only through approved tools.
5. Return a small diff and a reviewer checklist.`,
    },
    sections: [
      {
        id: 'workflow',
        eyebrow: 'Workflow',
        title: 'The agent-written development loop',
        copy:
          'The loop is intentionally simple: give the agent context, let it edit metadata, run checks, then review business authority before deployment.',
        items: [
          {
            title: '1. Provide operating context',
            body: 'Give the agent the business process, object names, permission boundaries, workflow states, and integration constraints.',
            meta: 'Context',
          },
          {
            title: '2. Generate metadata',
            body: 'The agent edits object, view, workflow, action, dashboard, translation, and tool definitions rather than app glue code.',
            meta: 'Write',
          },
          {
            title: '3. Run generated checks',
            body: 'Validate schema, permissions, required labels, sample data, object queries, and workflow transitions.',
            meta: 'Verify',
          },
          {
            title: '4. Review authority',
            body: 'Humans review what authority changed: data access, write power, approval bypasses, exports, and AI tool exposure.',
            meta: 'Approve',
          },
        ],
      },
      {
        id: 'patterns',
        eyebrow: 'Patterns',
        title: 'What the agent should generate',
        copy:
          'The best generated change names business concepts clearly and keeps runtime power explicit.',
        items: [
          {
            title: 'Objects and fields',
            body: 'Use business names, relationships, validations, indexes, and lifecycle rules that map to real operations.',
          },
          {
            title: 'Views and actions',
            body: 'Generate list, form, kanban, dashboard, and action metadata from the object model, not one-off screens.',
          },
          {
            title: 'Workflows and approvals',
            body: 'Define transitions and approval gates explicitly so the runtime can enforce them for people and agents.',
          },
          {
            title: 'Agent tools',
            body: 'Expose only bounded object queries and actions through MCP, with policy checks and audit-friendly names.',
          },
        ],
      },
    ],
    table: {
      columns: ['Old developer surface', 'Agent-written ObjectStack surface', 'Reviewer question'],
      rows: [
        ['Controller code', 'Object action metadata', 'Who can invoke this action?'],
        ['Custom auth checks', 'Object, row, and field permissions', 'What data authority changed?'],
        ['Hand-built screens', 'View and form metadata', 'Which workflow does this screen support?'],
        ['Ad hoc AI prompt', 'Policy-aware tool contract', 'What can the model read or mutate?'],
      ],
    },
    checklistTitle: 'Diff review checklist for agent-written ObjectStack',
    checklist: [
      'Does the diff change business authority or only presentation?',
      'Are object and field names stable and domain-specific?',
      'Are defaults conservative for reads, writes, exports, and tools?',
      'Are approval gates explicit for sensitive actions?',
      'Can tests or sample data demonstrate the workflow?',
      'Can a future agent retrieve and reuse the same pattern?',
    ],
    faqs: [
      {
        question: 'Should developers still understand ObjectStack?',
        answer:
          'Yes, but the primary developer task changes. Humans design boundaries, review diffs, write tests, and curate examples; agents do more of the repetitive metadata authoring.',
      },
      {
        question: 'Can any coding agent write ObjectStack?',
        answer:
          'Any strong coding agent can work with the format if it has clear docs, examples, rules, and tests. The site and docs should be written so agents can retrieve and generate the format correctly.',
      },
    ],
  },
  {
    slug: 'customer-stories',
    navLabel: 'Reference stories',
    title: 'Reference Stories for Governed AI Applications',
    description:
      'Explore realistic ObjectOS reference deployments for support, procurement, CRM, manufacturing, and internal service without pretending early examples are public customer case studies.',
    eyebrow: 'Reference stories',
    heroTitle: 'Proof should be concrete before it is promotional.',
    lead:
      'These are reference stories: realistic deployment patterns that show the business problem, the object model, the metadata review surface, and the governance boundary. They are written to help teams evaluate where ObjectOS fits before public customer case studies exist.',
    primary: { label: 'Start from templates', href: '/en/templates/' },
    secondary: { label: 'Review trust model', href: '/en/trust-center/' },
    metrics: [
      { value: '5 patterns', label: 'Support, procurement, CRM, manufacturing, employee service' },
      { value: 'No fake logos', label: 'Scenario proof without invented customer claims' },
      { value: 'Review first', label: 'Each story names the diff a human must approve' },
    ],
    artifact: {
      eyebrow: 'Story format',
      title: 'A useful story names the business authority that changed',
      body:
        'For AI-written software, the important evidence is not only time saved. It is whether the system made authority reviewable: who can see data, who can change state, what an agent can suggest, and what needs approval.',
      steps: [
        'Problem: the existing workflow and why AI alone is not enough.',
        'Object model: the records, relationships, states, and ownership rules.',
        'Agent role: suggestions, summaries, classification, or approved actions.',
        'Governance: permissions, approvals, audit, rollback, and deployment boundary.',
      ],
    },
    sections: [
      {
        id: 'stories',
        eyebrow: 'Reference patterns',
        title: 'Where ObjectOS usually fits first',
        copy:
          'The strongest first deployments are close to real records and repeated decisions, but still bounded enough for a human owner to review.',
        items: [
          {
            title: 'B2B support desk',
            body: 'A support team connects tickets, customers, SLAs, account history, and knowledge articles. AI summarizes context and drafts replies, but escalations and status changes follow approval policy.',
            meta: 'Helpdesk',
          },
          {
            title: 'Procurement exception review',
            body: 'A finance operations team models suppliers, requests, POs, receipts, invoices, and policy exceptions. AI prepares evidence; budget overrides need human approval.',
            meta: 'Procurement',
          },
          {
            title: 'CRM risk workspace',
            body: 'Revenue operations connects accounts, opportunities, cases, product usage, and renewal risk. AI explains stalled deals and suggests next steps without contacting customers automatically.',
            meta: 'CRM',
          },
          {
            title: 'Manufacturing service layer',
            body: 'Operations maps equipment, parts, work orders, inspections, downtime, and field notes. AI helps triage maintenance patterns while write authority stays role-scoped.',
            meta: 'Manufacturing',
          },
          {
            title: 'Employee service center',
            body: 'Internal operations connects policies, requests, approvals, employee records, and routing queues. AI answers and drafts actions within employee-data boundaries.',
            meta: 'Internal service',
          },
        ],
      },
      {
        id: 'evidence',
        eyebrow: 'Evidence',
        title: 'What to measure in a governed AI app pilot',
        copy:
          'Speed matters, but trust is the wedge. A good pilot measures review surface, approval latency, audit completeness, and how often agents stay inside policy.',
        items: [
          {
            title: 'Review surface',
            body: 'How many metadata lines changed, how many authority rules changed, and how quickly a business owner understood the diff.',
          },
          {
            title: 'Governed action rate',
            body: 'How often the agent produced useful suggestions or approved actions without crossing permission or approval boundaries.',
          },
          {
            title: 'Operational reuse',
            body: 'How many new views, reports, workflows, tools, or templates reused the same object model.',
          },
        ],
      },
    ],
    table: {
      columns: ['Scenario', 'First object model', 'Human sign-off focus'],
      rows: [
        ['Support desk', 'Ticket, Customer, SLA, Article', 'Reply suggestions, escalation approvals, customer data visibility'],
        ['Procurement', 'Request, Supplier, PO, Invoice', 'Budget overrides, supplier risk, payment-impacting writes'],
        ['CRM workspace', 'Account, Opportunity, Case, Activity', 'Customer contact policy, field visibility, sales-stage changes'],
        ['Manufacturing', 'Asset, Work Order, Part, Inspection', 'Safety notes, maintenance state, inventory-impacting actions'],
      ],
    },
    checklistTitle: 'Pilot selection checklist',
    checklist: [
      'The workflow has a clear business owner.',
      'The records already exist in a system of record.',
      'The first agent actions can be suggestions, summaries, or approvals.',
      'The permission model is understandable to reviewers.',
      'The success metric includes governance, not only speed.',
    ],
    faqs: [
      {
        question: 'Are these public customer case studies?',
        answer:
          'No. They are reference stories that show how ObjectOS should be evaluated. Public customer stories should only be published when a customer approves the claim.',
      },
      {
        question: 'Why publish reference stories?',
        answer:
          'They make the product concrete without inventing proof. Buyers and agents both need examples of objects, workflows, permissions, and review boundaries.',
      },
    ],
  },
];

export const getEnglishPage = (slug: string): EnglishPage | undefined =>
  ENGLISH_PAGES.find((page) => page.slug === slug);
