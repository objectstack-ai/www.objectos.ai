import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'comprehension-debt',
  term: 'Comprehension debt',
  title: 'Comprehension Debt: Why AI-Written Code Gets Hard to Change',
  description:
    'Comprehension debt is the gap between the software an organization runs and the software anyone in it can still explain — why AI-generated code gets expensive at the first change, not on delivery day.',
  definition:
    'Comprehension debt is the widening gap between the software an organization runs and the software anyone in it can still explain — a liability that accrues whenever working code ships faster than the understanding of it, and that comes due at the first change nobody dares to make.',
  explanation: [
    'Ordinary technical debt is a debt of code quality: the code is messy, the shortcuts are known, and — decisively — the author is usually still reachable. However bad the code, there is a human brain behind it that can answer "why was this handled this way?" AI-generated code removes that last backstop. Its author is a stateless model session that ceased to exist the moment generation ended, and it left no durable record of the judgments and trade-offs it made along the way. What the team is holding is an implementation that runs, but that no one can explain and no one is left to ask. This site has used "comprehension debt" since 2026 to name that specific difference — not the messiness of the code, but the absence of anyone who can account for it.',
    'The debt carries interest, which is why teams meet it in month seven rather than month one. The first change is made by an AI that never comprehended the existing code, so it adds a block alongside it. The second change faces the old code plus last time’s uncomprehended addition, and adds another. Each layer rests on an uncomprehended layer, and comprehension cost rises faster than a team’s intuition tracks — a curve that stays flat and reassuring for months, then steepens under one perfectly ordinary request. In one published account, a retail finance team that stood up an expense system in two days spent three weeks on a single tax-rate change in month seven, and caught, only in pre-launch review, an unrelated reconciliation edit the AI had made while it was in there.',
    'The condition is measurable without any particular tooling, because the symptoms are behavioural. Three or more of these and a team is already accruing it: there is code in production nobody can explain; the first instinct on a change is "will this break something else?" rather than making the change; every change begins by feeding the whole module back to an AI to re-read it; pull requests are too large for anyone to review line by line, so the only check left is whether the tests passed; and the honest estimate for changing the system has crept above the estimate for rewriting it.',
    'Nothing in the mechanism is specific to one vendor’s tool — it follows from generating implementation faster than an organization can absorb it, and it applies to any codegen tool a team adopts. That leaves two levers: slow the generation down, or shrink the artifact. ObjectStack takes the second. Have the AI generate typed application metadata instead of an implementation, and the durable thing is a definition a person can still read in month seven, while the implementation everyone depends on is one audited runtime rather than a fresh unread pile per application.',
  ],
  alsoKnownAs: ['AI technical debt', 'unread-code debt'],
  relatedTerms: [
    'vibe-coding',
    'reviewable-diff',
    'metadata-driven-development',
    'application-metadata',
  ],
  articleSlugs: ['vibe-coding-technical-debt-2026', 'ai-wrote-your-app-dare-to-merge'],
  pageSlugs: ['platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
