import type { Locale } from './i18n';

export interface ClusterFaq {
  question: string;
  answer: string;
}

export interface Cluster {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  definition: string;
  whyNow: string[];
  capabilities: string[];
  useCases: string[];
  faq: ClusterFaq[];
  articleSlugs: string[];
  relatedTerms: string[];
}

export const CLUSTERS: Cluster[] = [
  {
    // The slug and URL keep the category name people search for — the home
    // page and llms.txt link this page in every locale — but the copy defines
    // the product by the ontology, not by the category.
    slug: 'ai-native-app-platform',
    title: 'What Is an AI-Native App Platform? One Executable Business Ontology',
    shortTitle: 'Executable business ontology',
    description:
      'An AI-native app platform, defined the way ObjectStack defines it: one executable business ontology that AI writes, an open runtime runs, agents operate, and you own — how that differs from low-code and from AI code generation, and where ObjectOS fits.',
    eyebrow: 'Pillar guide',
    lead:
      'People search for an AI-native app platform and mean a place where AI-written business software can land and stay governable. ObjectStack’s answer is not a page builder with a chat box. It is one executable business ontology — objects and fields, relations, actions, permissions, flows, and agent and tool definitions — and the open runtime that runs it; the screens are projections of that definition, not the product.',
    definition:
      'An executable business ontology is the definition of a business that a runtime runs. AI writes it as typed metadata in your repository; the ObjectStack runtime derives the database, REST API, screens, and MCP tools from it and enforces permissions and audit on every call; agents operate it under the same permissions as people; and you own the files, Apache-2.0. ObjectOS runs the same loop hosted or self-managed, with in-app AI, approvals, and operations on top.',
    whyNow: [
      'Anyone can make an AI generate an app now; the bottleneck moved to reviewing, governing, and trusting what the AI wrote.',
      'Generated apps need permissions, audit trails, and lifecycle control after the first version ships — rules a runtime enforces, not rules a prompt remembers.',
      'A business keeps changing its rules, integrations, and operating model; a definition an agent can hold whole stays changeable, a generated codebase does not.',
    ],
    capabilities: [
      'Executable: objects and fields, relations, actions, permissions, flows, and agent and tool definitions as typed metadata the runtime validates and runs — validated, not reasoned over.',
      'AI-writable: a coding agent writes the definition; Strict TypeScript, Zod schemas, and os validate reject what would fail at runtime; a person reviews a small diff instead of generated glue.',
      'Agent-operable: every object and exposed action doubles as a governed MCP tool, called under the signed-in user’s permissions, approvals, and audit.',
      'You own it: the definition lives in your repository under Apache-2.0, and a database you already run federates in place — read-only by default, and early.',
    ],
    useCases: [
      'Turn a repair, service, approval, or internal operations requirement into a running application your agent writes and your team reviews.',
      'Replace fragile low-code prototypes with an ontology the runtime governs and an agent can refactor whole.',
      'Expose business objects to AI agents without handing them direct database or administrator access.',
    ],
    faq: [
      {
        question: 'What is an AI-native app platform?',
        answer:
          'In ObjectStack’s terms, an executable business ontology plus the runtime that runs it: the business is defined once — objects and fields, relations, actions, permissions, flows, and agent and tool definitions — AI writes that definition, the runtime derives and enforces everything else, agents operate it, and you own it. Views, dashboards, apps, and translations are projections of the ontology, not part of it.',
      },
      {
        question: 'How is it different from low-code?',
        answer:
          'Low-code platforms are the closest relatives: metadata generates tables, APIs, and UI there too. The difference is where the definition lives and who it is written for. Low-code keeps metadata as configuration in the vendor’s database, edited through its UI by a person; ObjectStack keeps it as typed, declarative TypeScript in your repository — versioned and reviewed as a diff, checked by os validate before it runs, and shaped for an AI to write.',
      },
      {
        question: 'Where does the code go?',
        answer:
          'Code does not disappear; it moves into the runtime. Hooks, action bodies, CEL expressions, and constrained JSX run inside the same permission and audit fence as everything derived from the ontology. What goes away is the generated codebase a definition would otherwise have to describe — and that no agent could hold whole.',
      },
    ],
    articleSlugs: [
      'what-does-the-ontology-is-the-software-mean',
      'from-requirement-to-app',
      'low-code-vs-ai-native-app-platform',
      'extend-existing-systems-with-ai',
      'self-hosted-ai-app-platform',
      'ai-agent-business-data-security-boundaries',
    ],
    relatedTerms: ['app-building', 'integration-data', 'governance'],
  },
  {
    slug: 'legacy-system-modernization',
    title: 'Legacy System Modernization with AI',
    shortTitle: 'Legacy modernization',
    description:
      'A practical guide to modernizing legacy business systems with AI by connecting existing databases, modeling business objects, and avoiding risky migrations.',
    eyebrow: 'Modernization cluster',
    lead:
      'Legacy modernization does not always start with a rebuild. For many teams, the lower-risk path is to connect existing systems read-only first, model the records that matter, and add AI-native workflows on top.',
    definition:
      'AI-assisted modernization keeps the system of record in place while creating a governed object layer for AI, APIs, workflows, dashboards, and new applications. The old system remains operational and keeps writing its rows; the new layer federates them — read-only by default, and early — and makes its data and processes understandable.',
    whyNow: [
      'Many core systems still run the business but are too brittle for frequent change.',
      'AI creates pressure to expose old data safely without opening direct database access.',
      'Modernization budgets work better when teams can prove value before migration decisions.',
    ],
    capabilities: [
      'Connect an existing database as a read-only datasource first — federation is read-only by default, and early — and model the tables that matter as objects without moving a record.',
      'Describe legacy tables as business objects that agents, workflows, and users can understand.',
      'Add new screens, reports, and automations around the old system while preserving the source of truth.',
      'Route AI actions through permissions, approvals, and audit logs rather than ad hoc scripts.',
    ],
    useCases: [
      'Add AI search and analysis over CRM, ERP, ticket, or order data.',
      'Build a modern workflow around a legacy system without rewriting the entire application.',
      'Create a gradual replacement path by modeling one domain at a time.',
    ],
    faq: [
      {
        question: 'Can AI modernization avoid a full migration?',
        answer:
          'Often, yes. A governed object layer can connect to the existing system of record — read-only by default, with writes enabled deliberately per object — expose business concepts, and let teams add AI workflows without moving every process to a new platform immediately. Federation is early: expect the read path to be the mature one.',
      },
      {
        question: 'What should be modernized first?',
        answer:
          'Start with high-value, well-understood records such as customers, cases, work orders, orders, or reports. The best first step is usually a workflow where users already know the pain and the data already exists.',
      },
      {
        question: 'What is the risk of connecting AI to legacy systems?',
        answer:
          'The risk is letting AI bypass identity, permissions, and audit. The safer design is to make AI operate through a runtime that respects user scope, approvals, and system boundaries.',
      },
    ],
    articleSlugs: [
      'extend-existing-systems-with-ai',
      'manufacturing-legacy-systems-ai',
      'low-code-vs-ai-native-app-platform',
      'ai-agent-business-data-security-boundaries',
    ],
    relatedTerms: ['integration-data', 'modernization', 'manufacturing'],
  },
  {
    slug: 'self-hosted-ai',
    title: 'Self-Hosted AI for Enterprise Applications',
    shortTitle: 'Self-hosted AI',
    description:
      'Understand when enterprise AI should be self-hosted, which runtime components matter most, and how permissions, approvals, tools, and audit logs stay under control.',
    eyebrow: 'Governance cluster',
    lead:
      'Self-hosted AI is not only about where the model runs. Once AI reads business data and calls tools, the application runtime that controls objects, permissions, approvals, and audit evidence becomes the critical control point.',
    definition:
      'A self-hosted AI application platform lets enterprises run the governed business runtime in their own infrastructure. The model can be local or external, but data access, tools, workflow execution, and audit policy stay under enterprise control. Two things answer to that description here: the free, Apache-2.0 ObjectStack framework, and licensed self-managed ObjectOS — ObjectOS Enterprise, from its single-node entry option Business Self-Managed up — which adds the in-product AI on top of it.',
    whyNow: [
      'AI agents increasingly need access to sensitive customer, operational, and financial records.',
      'Regulated teams need evidence of who accessed what, which action ran, and which approval was required.',
      'Security teams need a clear place to enforce identity, network, key, and logging policies.',
    ],
    capabilities: [
      'Run the business object layer, tool registry, approvals, and audit logs in controlled infrastructure — free on the open-source ObjectStack framework, or licensed as self-managed ObjectOS when you want the in-product AI Builder and Ask on your own infrastructure.',
      'Connect external or local models through explicit policy rather than hardwired assumptions.',
      'Keep files, records, logs, and credentials aligned with existing enterprise controls.',
      'Give agents scoped tools instead of unrestricted administrator credentials.',
    ],
    useCases: [
      'Deploy AI workflows around sensitive CRM, contract, HR, or operational data.',
      'Let AI agents assist users without bypassing role-based access control.',
      'Support regulated environments that need audit evidence and infrastructure control.',
    ],
    faq: [
      {
        question: 'Does self-hosted AI require a local model?',
        answer:
          'Not always. The first thing to control is often the application runtime: business objects, tools, approvals, permissions, and audit logs. Models may be local or external depending on policy.',
      },
      {
        question: 'Why does the runtime matter more than the chat interface?',
        answer:
          'The runtime decides which records can be read, which tools can run, which actions need approval, and what evidence is retained. A chat interface alone cannot enforce those rules reliably.',
      },
      {
        question: 'How should agents access business data in a self-hosted setup?',
        answer:
          'Agents should act on behalf of a user or governed service identity, inherit permission scope, call explicit tools, and write audit logs for every material action.',
      },
      {
        question: 'Is self-hosting free, and what does ObjectOS add?',
        answer:
          'Free self-hosting is the open-source ObjectStack framework (Apache-2.0): the protocol, kernel, CLI, production runtime, Console UI, and MCP server, with no feature gate between development and production — bring your own AI over MCP. Self-managed ObjectOS is ObjectOS Enterprise, licensed: its single-node entry option, Business Self-Managed, brings the in-product AI Builder and Ask, AI governance, and bring-your-own-model to one node; beyond that, Enterprise adds clustering, air-gapped operation, SCIM, compliance attestations, and SLA support. On either edition you can export your ontology and run it on the open-source runtime. To start: npm create objectstack@latest, point your coding agent at the generated project and its AGENTS.md, then npx os dev --ui.',
      },
    ],
    articleSlugs: [
      'self-hosted-ai-app-platform',
      'ai-agent-business-data-security-boundaries',
      'extend-existing-systems-with-ai',
    ],
    relatedTerms: ['governance', 'ai-agents', 'integration-data'],
  },
  {
    slug: 'crm-case-management-ai',
    title: 'CRM and Case Management AI',
    shortTitle: 'CRM and case management',
    description:
      'See how AI can understand customers, opportunities, cases, and service workflows when CRM and case management data are modeled as governed business objects.',
    eyebrow: 'Solution cluster',
    lead:
      'CRM and case management are natural starting points for enterprise AI because they are close to revenue, service quality, and customer trust. The useful first step is not autonomous selling; it is governed understanding.',
    definition:
      'AI for CRM and case management works best when accounts, contacts, opportunities, activities, cases, tasks, and approvals are represented as business objects. Agents can then answer questions, suggest actions, and operate workflows inside user permissions.',
    whyNow: [
      'Customer and case data is often scattered across CRM, support, contracts, notes, and spreadsheets.',
      'Managers need better visibility without exporting data into one-off reports.',
      'Teams want AI assistance without allowing automation to contact customers or change cases outside approved boundaries.',
    ],
    capabilities: [
      'Model customers, opportunities, cases, activities, ownership, and status transitions.',
      'Let AI answer business questions while respecting account ownership and record permissions.',
      'Route risky actions such as status changes, refunds, or escalations through approvals.',
      'Build dashboards and workflows from the same object model used by agents.',
    ],
    useCases: [
      'Summarize account history and identify stalled opportunities.',
      'Find risky or aging cases and recommend next actions for service teams.',
      'Generate internal CRM or case management applications from a structured requirement.',
    ],
    faq: [
      {
        question: 'Why start enterprise AI with CRM?',
        answer:
          'CRM is close to revenue and already contains customers, opportunities, contacts, and activity history. AI can create value quickly by helping teams understand what happened and what needs attention.',
      },
      {
        question: 'Should AI automatically contact customers?',
        answer:
          'Usually not as a first step. A better starting point is internal understanding, summaries, risk detection, and manager review before automating outbound communication.',
      },
      {
        question: 'How does case management change with AI?',
        answer:
          'AI can help classify, summarize, prioritize, and recommend case actions, but the case lifecycle still needs permissions, escalation rules, approvals, and audit logs.',
      },
    ],
    articleSlugs: [
      'crm-ai-understands-customers',
      'low-code-vs-ai-native-app-platform',
      'from-requirement-to-app',
      'ai-agent-business-data-security-boundaries',
    ],
    relatedTerms: ['crm', 'case-management', 'app-building'],
  },
  {
    slug: 'manufacturing-ai',
    title: 'Manufacturing AI on Legacy Systems',
    shortTitle: 'Manufacturing AI',
    description:
      'A practical manufacturing AI guide for connecting ERP, MES, work orders, reports, and operational data without replacing the systems that already run production.',
    eyebrow: 'Industry cluster',
    lead:
      'Manufacturing AI becomes practical when it connects to the systems already running production. The first wins usually come from reports, work orders, exception analysis, and governed operational workflows.',
    definition:
      'Manufacturing AI connects ERP, MES, WMS, work order, quality, and equipment data through a business object layer. AI can then analyze exceptions, assist planning, and support workflows without replacing every legacy platform.',
    whyNow: [
      'Manufacturing data is valuable but often split across old systems and spreadsheets.',
      'Production teams need practical AI entry points that do not interrupt core operations.',
      'Work orders, reports, and exceptions offer clear value before larger transformation programs.',
    ],
    capabilities: [
      'Connect production, inventory, equipment, quality, and work order data as business objects — federated read-only by default from the databases that already run production.',
      'Use AI to explain report changes, spot exceptions, and summarize operational context.',
      'Build case-style workflows for maintenance, quality issues, and supply chain follow-up.',
      'Keep source systems stable while adding modern dashboards, workflows, and agent assistance.',
    ],
    useCases: [
      'Analyze production reports and explain the drivers behind variance.',
      'Summarize work orders, maintenance history, and equipment downtime.',
      'Coordinate exception workflows across ERP, MES, warehouse, and service records.',
    ],
    faq: [
      {
        question: 'Where should manufacturing teams start with AI?',
        answer:
          'Start with reports and work orders. They are familiar, high-value, and connected to real operational decisions without requiring immediate ERP or MES replacement.',
      },
      {
        question: 'Does manufacturing AI require replacing ERP or MES?',
        answer:
          'No. A practical first architecture connects the existing databases as read-only datasources — federation is read-only by default, and early — and models the relevant records as business objects so AI can read and analyze without taking over the source systems.',
      },
      {
        question: 'What makes manufacturing AI difficult?',
        answer:
          'The data is usually fragmented across ERP, MES, WMS, quality systems, equipment records, and spreadsheets. AI needs a governed object layer to understand and act across those boundaries.',
      },
    ],
    articleSlugs: [
      'manufacturing-legacy-systems-ai',
      'extend-existing-systems-with-ai',
      'from-requirement-to-app',
      'ai-agent-business-data-security-boundaries',
    ],
    relatedTerms: ['manufacturing', 'integration-data', 'case-management'],
  },
];

const BY_SLUG = new Map(CLUSTERS.map((cluster) => [cluster.slug, cluster]));

export function clusterBySlug(slug: string): Cluster | undefined {
  return BY_SLUG.get(slug);
}

export function clusterPath(locale: Locale, slug: string): string {
  return `/${locale}/${slug}/`;
}
