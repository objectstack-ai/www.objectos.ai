import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning.en;

// The organisation-level page a chairman, GM or CIO is forwarded (#369;
// placement ruled 2026-11-05: a marketing page, fifth under Why ObjectOS).
// /use-cases/ answers "what can my team do"; this page answers "how do we
// adopt AI as an organisation, safely, and where do we start". Every product
// claim below restates a shipped mechanism page — /data-modeling/,
// /permissions/, /approvals/, /trust-center/ — and links it; what ObjectStack
// is (t2) and the export clause (e1) are quoted from `src/lib/positioning.ts`.
// No rollback claim and no "auto-closed within authority" metric: neither has
// a shipped mechanism behind it. The expense rule is generic, not a customer's.
const page = {
    slug: 'enterprise-ai-adoption',
    navLabel: 'AI adoption',
    title: 'Enterprise AI Adoption: How AI Lands in a Company, and Where to Start',
    description:
      'For the executive who was forwarded this link: why AI pilots stall on unwritten rules, unreachable systems and missing trails, one expense rule in three states, and a three-step pilot.',
    eyebrow: 'Enterprise AI adoption',
    heroTitle: 'How AI actually lands in a company: write the rules down first.',
    lead:
      'When an AI pilot stalls inside a company, the cause is often not the model but the organisation around it: the rules live in people’s heads, the systems that hold the data are out of the AI’s reach, and when it acts there is no trail anyone can check. Close those three gaps in one process and AI can take on real work there, inside the authority you give it. Below: one ordinary expense rule written three ways, a three-step pilot, and what this approach does not solve.',
    primary: { label: 'See one rule in three states', href: '#three-states' },
    secondary: { label: 'Use cases by team', href: '/en/use-cases/' },
    metrics: [
      { value: 'Rules in heads', label: 'The policy exists as experience and exceptions, not as something written down that a system can check.' },
      { value: 'Out of reach', label: 'The records AI needs sit in ERP, CRM and spreadsheets it cannot read safely.' },
      { value: 'No trail', label: 'When AI acts, nobody can show who allowed it, what it changed, and on whose authority.' },
    ],
    artifact: {
      eyebrow: 'The idea',
      title: 'The more clearly the rules are written, the further AI can be trusted to act.',
      body:
        'AI can only stay inside a rule that it can read and that a runtime can check. Take one ordinary travel-expense rule. As a paragraph in a policy document, an assistant can quote it, but nobody can hold the assistant to it. Written into the ontology — an object, its fields, a validation and an approval step — the same rule is enforced on every write, for people and agents alike, and each request and decision is recorded. The rule is a generic example, not a customer’s.',
      code: `// (a) The policy, as written today: travel policy, section 4
//   4.1 Every travel claim carries a receipt.
//   4.2 A claim may not exceed the approved trip budget.
//   4.3 Claims over 5,000 need the department head's approval.
//   4.4 Auditors read claims; they do not change them.

// (b) The same rule, written into the ontology
export const TravelClaim = ObjectSchema.create({
  name: 'travel_claim',
  label: 'Travel claim',
  fields: {
    amount: Field.currency({ label: 'Amount', required: true }),
    trip_budget: Field.currency({ label: 'Trip budget' }),
    receipt: Field.file({ label: 'Receipt', required: true }), // 4.1
  },
  validations: [{                                            // 4.2
    name: 'within_trip_budget',
    type: 'script',
    condition: 'record.amount > record.trip_budget',
    message: 'Policy 4.2: the claim exceeds the trip budget.',
  }],
});

// 4.3: an approval step in the claim's flow (see /approvals/),
//      started when 'amount > 5000'
{ id: 'head_review', type: 'approval', config: {
    approvers: [{ type: 'role', value: 'department_head' }],
    lockRecord: true,
} }

// 4.4: the auditor's permission set (see /permissions/)
travel_claim: { allowRead: true, allowCreate: false,
                allowEdit: false, allowDelete: false }

// (c) The runtime enforcing it
// claim 6,200, budget 5,000 → refused: policy 4.2
// claim 6,200, budget 8,000 → saved; record locked until
//                             the department head decides
// the auditor edits a claim → refused: read-only (4.4)
// audit log: claim created by the AI assistant as the
//            signed-in employee; head_review approved
//            by the department head`,
    },
    sections: [
      {
        id: 'three-states',
        eyebrow: 'One rule, three states',
        title: 'The same expense rule as a paragraph, as an ontology, and as a running system',
        copy:
          'Each state does a different job. The paragraph tells people what the rule is. The ontology tells the system. The runtime holds everyone to it — people and agents — and keeps the record.',
        items: [
          {
            meta: '(a) The policy text',
            title: 'Four sentences in a document',
            body: 'Receipts, the trip budget, approval above a threshold, auditors read only. An AI assistant can quote them, but nothing stops it, or anyone else, from filing a claim that breaks them.',
          },
          {
            meta: '(b) The ontology',
            title: 'An object a reviewer can read',
            href: '/en/data-modeling/',
            body: 'The same four sentences as a claim object with typed fields, a validation next to the field it protects, an approval step and a read-only permission set — a small definition, not logic spread across screens.',
          },
          {
            meta: '(c) The runtime',
            title: 'Refused, routed, recorded',
            href: '/en/approvals/',
            body: 'An over-budget claim is refused on every write path: the form, the API, an import or an AI tool call. A claim over the threshold waits for the department head with the record locked. Every request and decision is audited.',
          },
          {
            meta: 'The AI, under the same rule',
            title: 'The assistant is the employee, not a superuser',
            href: '/en/permissions/',
            body: 'The assistant that filed the claim acted as the signed-in employee, inside that employee’s permissions. The auditor’s edit is refused the same way. The records the assistant reads and changes appear in the same audit log as people’s actions; on Enterprise, AI governance also audits each tool call the in-app AI makes.',
          },
        ],
      },
      {
        id: 'systems',
        eyebrow: 'Where AI connects',
        title: 'Start from the systems you already run',
        copy:
          'AI is only as useful as the records it can reach. The lower-risk path usually starts by reading what the existing systems already hold, not by replacing them.',
        items: [
          {
            title: 'Connect before you migrate',
            href: '/en/legacy-system-modernization/',
            body: 'An existing ERP or CRM database can be mounted as governed objects without moving a record, so AI reads it through the same permissions as everything else. The legacy modernization guide walks through it.',
          },
          {
            title: 'Read-only by default, and early',
            href: '/en/data-modeling/',
            body: 'Federation is read-only by default; writes back to the source system are enabled deliberately, per object. It is also early: expect the read path to be the mature one, and plan a first pilot around reading.',
          },
          {
            title: 'Agents go through governed tools',
            href: '/en/trust-center/',
            body: 'Whether the agent is your own, connected over MCP, or the AI inside ObjectOS, it acts through governed tools as the signed-in user, not through raw database access. The trust center sets out what every AI action passes.',
          },
        ],
      },
      {
        id: 'pilot',
        eyebrow: 'A three-step pilot',
        title: 'Pick one process, write it down, measure three numbers',
        copy:
          'A first pilot should be small enough to finish and concrete enough to judge. Nothing below depends on your industry.',
        items: [
          {
            meta: 'Step 1',
            title: 'Pick one process with written rules',
            body: 'Choose a process whose policy already exists on paper and has a business owner: expense claims, purchase requests, service tickets. If nobody can write the rule down, it is not ready for a pilot.',
          },
          {
            meta: 'Step 2',
            title: 'Write it into the ontology',
            href: '/en/agent-developer/',
            body: 'Turn the policy into objects, fields, validations, approval steps and permissions. Your coding agent can draft the definition; the process owner reviews it as a small diff, clause by clause against the policy.',
          },
          {
            meta: 'Step 3',
            title: 'Measure three numbers',
            href: '/en/customer-stories/#evidence',
            body: 'Hours saved, cycle time from request to decision, and error rate, each against a baseline taken before the pilot starts. The reference stories page lists what else a governed pilot should measure.',
          },
        ],
      },
      {
        id: 'limits',
        eyebrow: 'What it does not solve',
        title: 'Three things that writing the rules down will not fix',
        copy:
          'This approach moves written policy into a system that enforces it. It does nothing for the parts of the work that are not written, and that is better said before a pilot than after.',
        items: [
          {
            title: 'Policy nobody has written',
            body: 'If the rule lives only in one manager’s judgement, there is nothing to model yet. Writing it down is the organisation’s work, and it often takes longer than the build.',
          },
          {
            title: 'Judgement nobody can state',
            body: 'Some decisions rest on experience nobody has put into words: a supplier relationship, a customer’s history. AI can prepare those cases; a person should still decide them.',
          },
          {
            title: 'Integrations that do not exist yet',
            body: 'A system with no database or API you can reach stays out of reach. Federation is early, and writing back to a source system is a deliberate step, not the default.',
          },
        ],
      },
    ],
    checklistTitle: 'Before a pilot starts, confirm',
    checklist: [
      'The process has a written policy and a named business owner.',
      'The records it needs can be read, from a system you run or by import.',
      'Every action AI may take is listed, and the ones that need a person’s approval are marked.',
      'A baseline exists for hours, cycle time and error rate.',
      'Everyone agrees what the pilot will not cover.',
    ],
    faqs: [
      {
        question: 'What is ObjectStack, in one sentence?',
        answer: p.t2,
      },
      {
        question: 'Does the AI act on its own?',
        answer:
          'Only inside the authority you give it. An agent acts as the signed-in user, inside that user’s permissions; a business decision that needs approval waits for a person at a flow approval step; and the records it reads and changes land in the same audit log as people’s actions. Per-call audit of the in-app AI’s tool calls is part of AI governance on Enterprise.',
      },
      {
        question: 'Can we take the ontology with us?',
        answer: p.e1,
      },
    ],
  } satisfies MarketingPage;

export default page;
