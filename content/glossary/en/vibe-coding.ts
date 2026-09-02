import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'vibe-coding',
  term: 'Vibe coding',
  title: 'Vibe Coding: Definition, Origin, and What It Costs Later',
  description:
    'Vibe coding is building software by prompting an AI in natural language and shipping what it produces without reading it — the term Andrej Karpathy coined in February 2025, and the debt it leaves behind.',
  definition:
    'Vibe coding is the practice of building software by describing what you want to an AI model in natural language and accepting the code it produces without reading or understanding it — a term Andrej Karpathy coined in February 2025 for giving in to the vibes until you "forget that the code even exists."',
  explanation: [
    'The term is not this site’s, and it is not a general synonym for AI-assisted programming. Karpathy introduced it in February 2025 for a specific mode he was describing approvingly, on throwaway weekend projects: talk to the model, accept the diff, run it, and never open the file. The defining property is not that an AI wrote the code — it is that nobody read it. An engineer who reviews, tests, and understands every generated line is using AI to write code; she is not vibe coding. Collins Dictionary named the term its word of the year in 2025, which is a fair measure of how completely the practice escaped the weekend-project context it was coined for.',
    'Vibe coding works better than its critics expect, and that is the difficulty. The first version genuinely runs — forms submit, tests pass, CI is green — because self-consistency is precisely what a code model is good at. What green CI does not prove is that the system does only what it is allowed to do, and that gap stays invisible for as long as nothing needs to change. The cost arrives at the first modification, when the question is no longer "can it be built?" but "if I change this, what else moves?" — and there is no author to ask, because the author was a stateless session that ended months ago. That accumulated inability to explain your own running software is comprehension debt.',
    'None of this is an argument for going back to typing implementation by hand; that race is over on cost. It is an argument about the shape of what the AI hands back. A prompt that returns eight thousand lines of implementation and a prompt that returns forty lines of typed application definition involve the same amount of vibe on the way in — but only one of them comes back as something a person can still read, review, and be accountable for. ObjectStack is built for the second shape: the AI still writes it, and the artifact stays small enough that "nobody read it" stops being the default outcome.',
  ],
  alsoKnownAs: ['vibecoding', 'vibe-coded app', 'AI-generated code nobody read'],
  relatedTerms: [
    'comprehension-debt',
    'reviewable-diff',
    'declared-vs-enforced',
    'metadata-driven-development',
    'application-metadata',
  ],
  articleSlugs: [
    'vibe-coding-technical-debt-2026',
    'ai-wrote-your-app-dare-to-merge',
    'is-lovable-safe-for-production',
  ],
  pageSlugs: ['platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
