import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'templates',
    navLabel: 'Templates',
    title: 'ObjectStack Templates for Governed AI Applications',
    description:
      'Start from the eight forkable ObjectStack templates — todo, contracts, procurement, compliance, helpdesk, content, hr, and project — instead of asking AI to generate a full app codebase.',
    eyebrow: 'Templates',
    heroTitle: 'Start with an operating model, not a blank app.',
    lead:
      'Templates give coding agents a concrete target: object models, views, permissions, workflows, actions, and AI tools that can be copied, reviewed, adapted, and run in ObjectOS.',
    primary: { label: 'Open template source', href: 'https://github.com/objectstack-ai/templates' },
    secondary: { label: 'See the product tour', href: '/en/product-tour/' },
    metrics: [
      { value: '8 templates', label: 'todo, contracts, procurement, compliance, helpdesk, content, hr, project' },
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
        title: 'What ships in the default catalog',
        copy:
          'Eight forkable starters, each a real, shaped app: install it from the Marketplace in one click, or clone it with the CLI to get a TypeScript codebase to extend. Apache-2.0 — fork without asking. Your agent can fork one, change the metadata, and open a diff for review.',
        items: [
          {
            title: 'todo',
            body: 'Forkable starter for any “things to do, grouped somehow” tool.',
            meta: 'Tasks & projects',
          },
          {
            title: 'contracts',
            body: 'Forkable starter for approvals + document AI.',
            meta: 'CLM with AI clause extraction',
          },
          {
            title: 'procurement',
            body: 'Forkable starter for approval chains + receiving.',
            meta: 'Vendors, POs, 3-way match',
          },
          {
            title: 'compliance',
            body: 'Forkable starter for evidence collection workflows.',
            meta: 'SOC 2 / ISO 27001 controls',
          },
          {
            title: 'helpdesk',
            body: 'Forkable starter for tickets + SLAs + AI co-pilot.',
            meta: 'AI-first customer support',
          },
          {
            title: 'content',
            body: 'Forkable starter for lifecycle + metrics.',
            meta: 'Editorial calendar + channel ROI',
          },
          {
            title: 'hr',
            body: 'Forkable starter for people-centric apps.',
            meta: 'Directory, org chart, time-off',
          },
          {
            title: 'project',
            body: 'Forkable starter for PM tools.',
            meta: 'Project / task / milestone tracking',
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
      columns: ['Path', 'What you do', 'What you get'],
      rows: [
        ['Install from the Marketplace', 'Open Marketplace, search for the template, click Install, refresh', 'The app in your nav — records, views, flows, permissions, all live'],
        ['Fork as a codebase', 'pnpm dlx @objectstack/cli create my-app --template todo', 'A self-contained pnpm package: *.object.ts, *.view.ts, *.flow.ts files you can edit, lint, test, commit'],
        ['Publish your fork', 'pnpm build, then os package publish', 'Your marketplace — customers installing your fork get your brand and your modifications'],
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
