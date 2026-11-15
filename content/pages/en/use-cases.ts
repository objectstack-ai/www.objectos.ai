import type { MarketingPage } from '../../../src/content-pages/types';

// One card per existing scenario post, grouped by business team (ruling on
// #359, 2026-11-04). Each card summarizes its post and claims nothing the post
// does not say; the post, template and guide links are checked at build time.
// `readiness` (#370) is taken from evidence, not optimism: `today` only where
// the linked template or post shows the scenario running on the shipped
// platform; in doubt, the more conservative tier. zh-Hans carries the same tiers.
const page = {
    slug: 'use-cases',
    navLabel: 'Use cases',
    title: 'ObjectOS Use Cases by Team: Sales, Service, Finance, HR, Legal, Projects',
    description:
      'AI scenarios grouped by business team: how the work runs today, what AI takes on in an ObjectOS app, and which actions still wait for a person to approve.',
    eyebrow: 'Use cases',
    heroTitle: 'What AI does for your team, and what a person still approves.',
    lead:
      'Find your team below. Each card gives three lines from a scenario written up in full on the blog: how the work runs today, what AI takes on once the business objects, rules and tools are defined, and which actions stay with a person — with permissions and audit enforced by the runtime, not by the prompt.',
    primary: { label: 'Browse the templates', href: '/en/templates/' },
    secondary: { label: 'How approvals work', href: '/en/approvals/' },
    metrics: [
      { value: '6 teams', label: 'Sales, service, finance & procurement, HR, legal & compliance, projects' },
      { value: '10 scenarios', label: 'Each written up in full on the blog, in eight languages' },
      { value: '7 templates', label: 'Forkable starters behind seven of the scenarios' },
    ],
    artifact: {
      eyebrow: 'How to read a card',
      title: 'Three lines, the same in every scenario',
      body:
        'The cards are short on purpose. The full write-up behind each one shows the objects, the rules and the first build; the template, where there is one, is the app you can install or fork.',
      steps: [
        'Today: where the work stalls now, and why a form or a queue is not enough.',
        'With AI: what the app does once the work is modelled — read, classify, draft, check, propose.',
        'A person approves: what stays a human decision, and what the runtime enforces around it.',
        'Agents act as the signed-in user, inside that user’s permissions; the records they read and change are audited, and on Enterprise so is each tool call the in-app AI makes.',
      ],
    },
    sections: [
      {
        id: 'sales',
        eyebrow: 'Sales',
        title: 'Keep the CRM current from the conversation',
        copy: 'The selling happens in meetings, emails and notes. The record should follow from them, not wait for a rep to type it in.',
        items: [
          {
            title: 'AI sales assistant',
            body: 'Reps fill in CRM fields after the selling is done, while the real context sits in meetings, emails, notes and follow-up promises.',
            scenario: {
              post: 'ai-sales-assistant',
              readiness: 'integration',
              guide: 'crm-case-management-ai',
              withAi: 'Reps update by voice or text. AI summarizes meetings, picks out next steps, surfaces deal risk, suggests stage changes and preps the next account meeting.',
              approves: 'The rep confirms each suggested CRM change, and customer-facing commitments need confirmation. Managers set the risk rules and approval boundaries.',
            },
          },
        ],
      },
      {
        id: 'service',
        eyebrow: 'Customer service',
        title: 'Read the customer’s problem before it waits in a queue',
        copy: 'Support work is language, judgment and repeated decisions: a good fit for AI that drafts and a person who decides what is sent.',
        items: [
          {
            title: 'AI ticket hub',
            body: 'A long email or a frustrated chat becomes a record that waits for someone to read, classify, search, reply and escalate.',
            scenario: {
              post: 'ai-ticket-hub',
              readiness: 'integration',
              template: 'helpdesk',
              withAi: 'AI classifies each issue, detects urgency and sentiment, matches knowledge articles, drafts replies with citations and ranks cases by SLA.',
              approves: 'Agents confirm drafts, routing and case updates. Refund, compensation and contract-promise replies can be set to wait for a manager’s approval; escalations are created only after permission checks.',
            },
          },
        ],
      },
      {
        id: 'finance-procurement',
        eyebrow: 'Finance & procurement',
        title: 'Judge spend with the evidence in front of you',
        copy: 'Recognising an invoice is the easy part. The decision needs policy, budget, history and an approval chain that can explain itself.',
        items: [
          {
            title: 'AI expense audit',
            body: 'OCR fills in the fields, but finance still judges by hand whether a claim is in policy, in budget, project-related and not a duplicate.',
            scenario: {
              post: 'ai-expense-audit',
              readiness: 'integration',
              withAi: 'AI extracts receipt data, checks policy, budget, project and duplicate invoices, ranks the claims to review first and cites the policy line behind each finding.',
              approves: 'AI recommends; payment approval follows a clear authority chain, high-risk claims route to finance review, and reviewer corrections are recorded.',
            },
          },
          {
            title: 'AI procurement risk',
            body: 'Supplier risk is spread across systems: expiring certificates, slipping delivery, unusual pricing, contract gaps and quality returns.',
            scenario: {
              post: 'ai-procurement-risk',
              readiness: 'integration',
              template: 'procurement',
              withAi: 'Before an order is placed, AI checks qualifications and delivery, compares the quote with history, surfaces quality and contract issues and suggests alternatives.',
              approves: 'AI does not make the buying decision: procurement approves with the risk explanation in front of it, and review outcomes feed back into supplier governance.',
            },
          },
        ],
      },
      {
        id: 'hr',
        eyebrow: 'HR & employee services',
        title: 'Let employees ask, then run the right process',
        copy: 'Employees do not think in system categories. The service center should understand the request first and then route it safely.',
        items: [
          {
            title: 'AI employee service center',
            body: 'Employees need a VPN, a laptop, leave or a policy answer, and the portal makes them find the right HR, IT, admin or finance form first.',
            scenario: {
              post: 'ai-employee-service-center',
              readiness: 'rule',
              template: 'hr',
              withAi: 'AI splits one message into the right service requests, pre-fills the employee’s context, answers policy questions from the knowledge base and routes fulfilment tasks.',
              approves: 'Requests are created only through a governed service catalog; access, devices and reimbursements stay behind permissions and approvals, tracked in the same conversation.',
            },
          },
        ],
      },
      {
        id: 'legal-compliance',
        eyebrow: 'Legal & compliance',
        title: 'Flag the risk first; the responsible owner signs',
        copy: 'Contracts and policies are dense text. AI can read them first and draft findings; responsibility stays with legal and the control owners.',
        items: [
          {
            title: 'AI contract review',
            body: 'The contract register is managed but the review is not: risk stays in attachments and comments, and approvers see too little context.',
            scenario: {
              post: 'ai-contract-risk',
              readiness: 'rule',
              template: 'contracts',
              withAi: 'AI extracts parties, amounts, terms and non-standard clauses, compares them with the standard template and turns deviations into risk records.',
              approves: 'Legal confirms or edits every finding and owns the final opinion. High-risk findings go to approval, and signed obligations become follow-up tasks.',
            },
          },
          {
            title: 'AI compliance and internal controls',
            body: 'Compliance teams align policy text with evidence scattered across IAM, contracts, procurement, logs, workflows and spreadsheets — by hand.',
            scenario: {
              post: 'ai-compliance-control',
              readiness: 'integration',
              template: 'compliance',
              withAi: 'AI parses policies into controls, matches evidence, explains why a gap is high risk and suggests remediation tasks.',
              approves: 'Responsible owners confirm high-risk findings and evidence requirements; remediation and its confirmation stay in the audit history.',
            },
          },
        ],
      },
      {
        id: 'projects',
        eyebrow: 'Projects',
        title: 'See the delay in the status update, not the missed date',
        copy: 'Project risk rarely announces itself. It shows up as small comments long before a milestone slips.',
        items: [
          {
            title: 'AI project management assistant',
            body: 'Risk hides in meeting notes, task updates, weekly reports, change requests and resource conversations until a milestone slips.',
            scenario: {
              post: 'ai-project-risk-assistant',
              readiness: 'rule',
              template: 'project',
              withAi: 'AI links notes to tasks and milestones, detects blockers, dependency and resource conflicts, creates risk records with suggested actions and answers health questions.',
              approves: 'AI detects and explains; commitments stay human decisions. Managers turn accepted risks into action plans; a rule can hold scope changes until their impact is assessed.',
            },
          },
        ],
      },
      {
        id: 'across-teams',
        eyebrow: 'Across teams',
        title: 'Two patterns any team can reuse',
        copy: 'Not a team of their own: a content workflow and a general agent workbench, both under the same line between suggesting and doing.',
        items: [
          {
            title: 'AI content workbench',
            body: 'AI may speed up one draft, but ideas, sources, review comments, the publishing calendar and retrospectives stay scattered.',
            scenario: {
              post: 'ai-content-workbench',
              readiness: 'integration',
              template: 'content',
              withAi: 'AI clusters source material into topics, writes briefs with audience and evidence, highlights claims that lack support and summarizes performance after publishing.',
              approves: 'Drafts route to brand, product, legal or customer-success review before publishing, and review comments and approvals are structured records.',
            },
          },
          {
            title: 'AI agent workbench',
            body: 'An assistant answers the question, then the user still opens the business system to create tasks, start approvals, update records and leave an audit trail.',
            scenario: {
              post: 'ai-agent-workbench',
              readiness: 'rule',
              withAi: 'The agent turns a goal into a visible plan and calls governed tools: it queries records, creates tasks, starts approvals and generates reports.',
              approves: 'It checks the user’s access before querying data, asks before creating tasks, holds high-risk actions at a flow approval step, and the records it reads and changes are audited.',
            },
          },
        ],
      },
    ],
    table: {
      eyebrow: 'The common line',
      title: 'What AI may do alone, and what waits for a person',
      columns: ['Kind of action', 'Examples from the scenarios', 'What happens'],
      rows: [
        ['Runs on its own', 'Summaries, classification, drafts, internal reminders, risk flags, reporting', 'AI does it; the result is visible and recorded'],
        ['Asks for confirmation', 'Creating tasks, status updates, routing, operational record changes', 'The person using the app confirms before anything is written'],
        ['Needs approval', 'Customer-facing commitments, money movement, contract terms, access changes, data export, audit closure', 'An approver decides; the runtime does not run it otherwise'],
      ],
    },
    faqs: [
      {
        question: 'Are these customer stories?',
        answer:
          'No. Each card summarizes a scenario written up on the blog: how a team’s work can be modelled and governed in an ObjectOS app. None of them reports on a named customer.',
      },
      {
        question: 'Do we have to start from a template?',
        answer:
          'No. Seven of the scenarios have a matching template you can install or fork; the others start from a description of the work. Either way the result is the same kind of app: objects, permissions, workflows and agent tools a person can review.',
      },
      {
        question: 'Who decides what AI may do on its own?',
        answer:
          'Your team does, in the app’s definition: which actions run on their own, which ask for confirmation and which need approval. The runtime enforces that line for people and agents alike, and agents act as the signed-in user, never as a privileged AI identity.',
      },
    ],
  } satisfies MarketingPage;

export default page;
