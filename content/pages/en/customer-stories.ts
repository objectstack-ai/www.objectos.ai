import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
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
  } satisfies MarketingPage;

export default page;
