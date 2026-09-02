import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'approval-workflow',
  term: 'Approval workflow',
  title: 'Approval Workflow: Definition, Routing, and Where the Deadline Actually Lives',
  description:
    'An approval workflow holds a proposed change in a pending state until an accountable person records an explicit decision — routed by role rather than by name, with the decision written down before the change proceeds.',
  definition:
    'An approval workflow is a business process in which a proposed change is held in a pending state until a person with the authority to decide records an explicit approval or rejection, so the change takes effect only after someone accountable has signed for it.',
  explanation: [
    'Approval workflows long predate workflow software — purchase requisitions, change advisory boards, credit committees and drug-trial sign-off all encode the same pattern. Three properties separate a real one from a notification that merely looks like one. The change must actually be blocked while the request is pending, rather than proceeding while an email sits unread. The decision must be attributable to a person who held the authority at the moment they decided, not to a shared mailbox. And routing must resolve against the organization rather than against names, because a chain wired to specific people is a chain that quietly breaks at the next reorganization and re-routes to someone who left. A process that satisfies none of these is a notification with a delay.',
    'In ObjectStack an approval is not a separate system but a durable node inside a flow: the run reaches the approval node, opens a request, suspends, and resumes down its approve or reject out-edge once a decision is recorded. Approvers are declared as a user, a role, a team, or the requester’s manager hierarchy, and resolve against live identity at request time — a position expands to whoever currently holds it. The step sets its own behavior, so one node can be "first response wins" and the next "unanimous"; lockRecord holds the record still so nobody edits past the reviewer; maxRevisions bounds the send-back loop so a request cannot orbit "please revise" forever; and onEmptyApprovers decides what happens when the slate resolves to nobody, defaulting to admin rescue rather than silently waving the record through. The decision is written to the audit ledger before the run advances, so no path exists that moves past an approval without a recorded decision. This is also the queue that AI-proposed structural changes land in — the diff itself becomes the request — which is what makes agent-written software something a person can sign for rather than discover afterwards.',
    'The question worth asking of any approval engine is where its deadline lives, and here the honest answer is narrow. A wait node in a flow has no timeout at all: two keys once claimed otherwise, and both were retired rather than left standing as a promise the runtime does not keep. Escalation exists only on the approval node, as a per-node SLA rather than a global timer service. Set timeoutHours and a sweep finds requests still pending past that many hours from creation and escalates each at most once ever, taking the configured action — notify, reassign, auto_approve or auto_reject — with escalateTo naming a user or a position expanded to its current holders, and the escalation audit row written first so a crashed or repeated sweep cannot double-fire. The design consequence is worth stating plainly: if a step must be time-bounded, model it as an approval with an SLA or drive the deadline from outside the flow. A plain wait will wait patiently, correctly, and forever.',
  ],
  alsoKnownAs: [
    'approval process',
    'sign-off workflow',
    'approval chain',
    'multi-step approval',
  ],
  relatedTerms: ['audit-trail', 'permission-model', 'governed-runtime'],
  articleSlugs: [
    'automation-pause-resume-approvals',
    'objectos-automation-engine',
    'ai-wrote-your-app-dare-to-merge',
  ],
  pageSlugs: ['approvals', 'automation', 'permissions'],
} satisfies GlossaryTerm;

export default term;
