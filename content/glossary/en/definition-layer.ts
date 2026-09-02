import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'definition-layer',
  term: 'Definition layer',
  title: 'Definition Layer vs. Runtime Layer: What Belongs in Each, and Why One Goes Neutral',
  description:
    'The definition layer holds a business’s own declarations — objects, relationships, permissions, approvals — as versioned files it owns, sitting above the runtime layer that executes them and outside any one vendor.',
  definition:
    'The definition layer is the tier of a software stack that holds a business’s own declarations — which objects exist, how they relate, who may do what to them, and which steps require approval — as versioned files the organization owns, sitting above the runtime layer that executes those declarations and outside any single vendor that happens to ship an engine for them.',
  explanation: [
    'Two layers, two different jobs. The definition layer answers what is true about this business: an opportunity has an amount and an account, a sales rep may edit one but never delete it, a discount above thirty percent goes to finance. The runtime layer answers how that gets executed on a Tuesday afternoon under load: storage, query planning, session handling, caching, the permission check on each request, the audit record afterwards. The first is specific to one company and changes when the business changes. The second is generic infrastructure and changes when the engineering does.',
    'Where a layer ends up sitting is not a matter of taste, and the industry has run the experiment several times. Database vendors competed ferociously while SQL, the language itself, stayed public. Container runtimes fought and converged on one open image format. Microsoft opened the Language Server Protocol and every editor adopted it. OpenTelemetry moved observability’s data model to a neutral foundation. The pattern repeats because a layer that many independent parties depend on cannot stay private to one of them without producing exactly the fragmentation that made everyone want the layer in the first place.',
    'AI raises the stakes on which side of that line the business definition falls, because it multiplies the parties reading it. The application reads the definition. So does the agent deciding which tool it may call, the audit system reconciling what happened, the coding assistant proposing next quarter’s change, and whatever analytics tool the finance team bought without asking. If those declarations live inside one vendor’s console, every one of those readers needs that vendor’s cooperation — and the agent, which cannot fill in a support ticket, simply cannot read them at all.',
    'Neutrality is not free, and the trade should be stated rather than assumed. A layer that several parties depend on moves slower than one company’s internal format; compatibility becomes a constraint on every change, and the version everyone agrees on lags the version one vendor could have shipped. Neutrality is also worth nothing on its own: an openly published definition format that only one commercial engine can execute is a portable file and a captive system. The claim is only ever as strong as the weaker of the two halves — a definition you can read and take with you, and a runtime layer you can actually operate yourself.',
  ],
  alsoKnownAs: [
    'definition layer vs runtime layer',
    'runtime layer',
    'business definition layer',
  ],
  relatedTerms: [
    'application-definition-vs-runtime',
    'metadata-driven-development',
    'typed-metadata',
    'application-metadata',
    'governed-runtime',
    'ontology',
    'semantic-layer',
    'approval-workflow',
  ],
  articleSlugs: [
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'why-ai-agent-pilots-fail-four-layers',
  ],
  pageSlugs: ['platform', 'forward-deployed-engineers', 'product-tour'],
} satisfies GlossaryTerm;

export default term;
