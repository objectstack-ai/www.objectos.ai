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
    slug: 'ai-native-app-platform',
    title: 'AI-Native App Platform',
    shortTitle: 'AI-native app platform',
    description:
      'Learn what an AI-native app platform is, how it differs from low-code, and how ObjectOS connects business objects, permissions, workflows, APIs, and AI agents.',
    eyebrow: 'Pillar guide',
    lead:
      'An AI-native app platform is built around business objects, permissions, workflows, APIs, and agent tools from the start. It is not a page builder with a chat box; it is a governed runtime for AI-written business software.',
    definition:
      'An AI-native app platform turns requirements into structured application metadata: objects, fields, relationships, views, permissions, workflows, actions, APIs, and tools that agents can call. The platform gives AI a model of the business system instead of asking it to generate disconnected code.',
    whyNow: [
      'Enterprise AI needs access to real business records, not exported snapshots.',
      'Generated apps need permissions, audit trails, and lifecycle control after the first version ships.',
      'Business teams need systems that keep evolving as rules, integrations, and operating models change.',
    ],
    capabilities: [
      'Object modeling for customers, orders, cases, devices, contracts, approvals, and other business records.',
      'Metadata-driven screens, workflows, APIs, and agent tools generated from the same business specification.',
      'Permission-aware execution so users and AI agents operate inside the same governance boundary.',
      'Integration with existing systems so the platform can extend what already runs instead of forcing a migration.',
    ],
    useCases: [
      'Turn a repair, service, approval, or internal operations requirement into a running application.',
      'Replace fragile low-code prototypes with governed applications that can survive complexity.',
      'Expose business objects to AI agents without handing them direct database or administrator access.',
    ],
    faq: [
      {
        question: 'What is an AI-native app platform?',
        answer:
          'An AI-native app platform is an application runtime designed so AI can help model, generate, operate, and evolve business software. It treats objects, permissions, workflows, APIs, and agent tools as first-class metadata.',
      },
      {
        question: 'How is an AI-native app platform different from low-code?',
        answer:
          'Low-code usually accelerates forms, pages, and workflows. An AI-native app platform focuses on the operating layer underneath them: business objects, governance, integrations, generated APIs, agent tools, and long-term change.',
      },
      {
        question: 'Does AI-native mean the AI writes all the code?',
        answer:
          'No. The important shift is that AI works with structured application metadata and a governed runtime. Code may still exist, but the business model, permissions, and tools remain explicit and inspectable.',
      },
    ],
    articleSlugs: [
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
      'Legacy modernization does not always start with a rebuild. For many teams, the lower-risk path is to connect existing systems, model the records that matter, and add AI-native workflows on top.',
    definition:
      'AI-assisted modernization keeps the system of record in place while creating a governed object layer for AI, APIs, workflows, dashboards, and new applications. The old system remains operational; the new layer makes its data and processes understandable.',
    whyNow: [
      'Many core systems still run the business but are too brittle for frequent change.',
      'AI creates pressure to expose old data safely without opening direct database access.',
      'Modernization budgets work better when teams can prove value before migration decisions.',
    ],
    capabilities: [
      'Connect to existing databases and applications without moving every record first.',
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
          'Often, yes. A governed object layer can connect to the existing system of record, expose business concepts, and let teams add AI workflows without moving every process to a new platform immediately.',
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
      'A self-hosted AI application platform lets enterprises run the governed business runtime in their own infrastructure. The model can be local or external, but data access, tools, workflow execution, and audit policy stay under enterprise control.',
    whyNow: [
      'AI agents increasingly need access to sensitive customer, operational, and financial records.',
      'Regulated teams need evidence of who accessed what, which action ran, and which approval was required.',
      'Security teams need a clear place to enforce identity, network, key, and logging policies.',
    ],
    capabilities: [
      'Run the business object layer, tool registry, approvals, and audit logs in controlled infrastructure.',
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
      'Connect production, inventory, equipment, quality, and work order data as business objects.',
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
          'No. A practical first architecture connects existing systems and models the relevant records as business objects so AI can assist without taking over the source systems.',
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
