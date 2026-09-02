import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'permission-model',
  term: 'Permission model',
  title: 'Permission Model: Definition, How Grants Combine, and What a Reviewer Should Ask',
  description:
    'A permission model is the structure that decides who may do what — which containers hold capabilities, how grants combine, and what access is denied by default — as distinct from the individual rules written inside it.',
  definition:
    'A permission model is the structure a system uses to decide who may do what — which principals exist, which containers hold grantable capability, how multiple grants combine, and what happens when nothing grants access — as distinct from any individual permission expressed within it.',
  explanation: [
    'The distinction between a permission model and a permission is the difference between the rules of chess and a move. Three properties of the model, not of any rule, decide whether it survives a security review. What are the containers — roles, groups, profiles, permission sets — and is there more than one kind doing the same job? How do grants combine when a person holds several: additively, so any grant allows, or with denies that override, so evaluation order and precedence decide the outcome? And what is the default when nothing matches — deny, or allow? Products accumulate overlapping containers over the years, and the resulting question "why can this person see this record" becomes unanswerable without simulating the engine, which is precisely the question an auditor opens with.',
    'ObjectStack collapses that surface deliberately. There is one capability container — the permission set — and it is union-merged and purely additive: no bit inside it is a deny. Positions are a flat distribution group that binds sets to people, business units are the visibility hierarchy, and there is no Profile concept at all. Access is denied by default in the literal sense that every allow bit defaults to false, so an object is unreadable until a definition says otherwise. On top of that one model sit four enforcement layers: object-level CRUD, field-level read and edit, row-level predicates (see row-level security), and per-record sharing for the collaboration exceptions that would otherwise be solved by widening a whole role. Export is its own axis rather than a consequence of read, because reading a record on screen and pulling the whole table down as a CSV are different privileges — a separation Salesforce, Dynamics, NetSuite and SAP all make, and one that a coarse model quietly loses.',
    'Additive-with-no-deny is a real constraint, and it is chosen for reviewability rather than expressiveness. Because grants only ever add, "why can this person see this" is answered by listing the sets that grant it — a finite, readable list — where a deny-capable model requires reasoning about precedence between rules that may have been written years apart by different people. The same property is what lets an AI agent be governed without inventing anything for it: the agent acts as the signed-in user and resolves against that user’s sets, so there is no privileged service identity whose authority has to be reasoned about separately, and reviewing what the agent may do is the same exercise as reviewing what the person may do.',
  ],
  alsoKnownAs: [
    'access control model',
    'authorization model',
    'permission set model',
    'RBAC model',
  ],
  relatedTerms: [
    'row-level-security',
    'approval-workflow',
    'governed-runtime',
    'declared-vs-enforced',
    'agent-guardrails',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'low-code-vs-ai-native-app-platform',
  ],
  pageSlugs: ['permissions', 'trust-center', 'app-ui'],
} satisfies GlossaryTerm;

export default term;
