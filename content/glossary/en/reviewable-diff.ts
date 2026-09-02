import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'reviewable-diff',
  term: 'Reviewable diff',
  title: 'Reviewable Diff: How to Review AI-Generated Code',
  description:
    'A reviewable diff is a change the accountable person can read every line of and judge on business terms — the property that decides whether AI-generated code can be merged with a signature behind it.',
  definition:
    'A reviewable diff is a change small enough, and expressed at a high enough level, that the person accountable for it can read every line and judge on business terms whether it is right — the property that decides whether AI-written software gets merged with a signature behind it or on faith in green CI.',
  explanation: [
    'Reviewability is a property of the artifact, not a measure of the reviewer’s diligence. An engineer who asks an agent for a customer-refund app and gets back a pull request reading "+8,142 −0" has two bad options: claim to have reviewed it, or genuinely read eight thousand lines she did not write, at which point she may as well have written them. Passing tests do not close that gap. Green CI proves the code is self-consistent; it does not prove the code does only what it is permitted to do — and the tests came from the same agent, so they check that a refund can be looked up, not whether one user should be able to look up someone else’s.',
    'A diff of definitions is reviewable in a way a diff of generated implementation is not, and the difference is structural rather than a matter of degree. Size is only the first part of it: the same behavioural change — support staff may no longer delete refunds, anything above 500 needs finance approval — is a dozen declared lines instead of several hundred spread across a controller, a template, a migration, and a test. Vocabulary is the second: those lines are written in the language of who may do what, so the person with the business authority to approve the change is also the person able to read it, and the review question shifts from "can I finish reading this?" to "is this permission right, and is this approval threshold reasonable?" Blast radius is the third and the one most often missed: a definition can only change what it declares, so the reconciliation logic an agent quietly edited while it was in there is not reachable from a permission declaration at all. An implementation diff carries no such bound — any line in it can touch anything.',
    'Two limits belong in the definition, not in a footnote. Not everything reduces to a declaration: a novel real-time algorithm or a one-off rendering pipeline still arrives as code somebody has to read line by line, and forcing it into metadata makes the review worse rather than better. And reviewability moves trust rather than removing it — instead of reviewing each generated application, you have staked the guarantee on a runtime that must be seriously audited once and maintained continuously. Reviewing once beats reviewing a thousand times, but it is a trade, and it should be named as one.',
    'ObjectStack is built for the diff-of-definitions side of that trade: what the agent hands back is typed application metadata, and the enforcement everyone is relying on lives in one shared, open runtime instead of being regenerated per application. The practical test of any such setup is unchanged, and worth applying to any tool that claims it — look at the next pull request your agent opens, and ask whether the person who has to answer for it could read all of it.',
  ],
  alsoKnownAs: ['review AI-generated code', 'small diff', 'reviewable metadata diff'],
  relatedTerms: [
    'comprehension-debt',
    'vibe-coding',
    'declared-vs-enforced',
    'application-metadata',
    'governed-runtime',
    'typed-metadata',
  ],
  articleSlugs: [
    'ai-wrote-your-app-dare-to-merge',
    'give-your-agent-rules-for-governable-apps',
    'conversational-app-iteration',
  ],
  pageSlugs: ['agent-developer', 'platform'],
} satisfies GlossaryTerm;

export default term;
