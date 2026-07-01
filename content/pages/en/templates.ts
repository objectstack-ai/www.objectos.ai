import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
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
  } satisfies MarketingPage;

export default page;
