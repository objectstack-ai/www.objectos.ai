import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'knowledge-graph',
  term: 'Wissensgraph',
  title: 'Wissensgraph (Knowledge Graph): Definition und Unterschied zur Ontologie',
  description:
    'Ein Wissensgraph bildet die Informationen einer Organisation als Knoten und typisierte Kanten ab, sodass Fragen danach, wie Dinge zusammenhängen, durch Traversieren von Beziehungen statt durch Tabellen-Joins beantwortet werden.',
  definition:
    'Ein Wissensgraph bildet die Informationen einer Organisation als Knoten und typisierte Kanten ab – die Entitäten, auf die es ihr ankommt, und die beschrifteten Beziehungen zwischen ihnen –, sodass sich Fragen danach, wie Dinge zusammenhängen, durch das Traversieren dieser Beziehungen beantworten lassen statt durch das Joinen von Tabellen.',
  explanation: [
    'Die klarste Art, die Unterscheidung festzuhalten, die die Branche immer wieder verwischt: Die Ontologie ist das Schema, der Wissensgraph ist der Bestand an Instanzdaten, der dieses Schema befüllt. Eine Ontologie sagt, dass ein Arbeitsauftrag an einem Gerät hängt und ein Gerät zu einem Kunden gehört; der Wissensgraph enthält die mehreren Millionen tatsächlichen Arbeitsaufträge, Geräte und Kunden und die Kanten zwischen ihnen. In der Praxis wird ein Graph entweder als RDF-Tripel mit einer OWL-Ontologie darüber gespeichert oder als Property Graph in einer Engine wie Neo4j, und viele produktive Graphen laufen mit einer Ontologie, die nie aufgeschrieben wurde – genau so landen zwei Teams bei unvereinbaren Definitionen von „Kunde“ im selben Graphen.',
    'Bei Fragen, die von Verbindungen handeln, ist ein Wissensgraph das richtige Werkzeug, und nichts anderes kommt ihm nahe. Betrugsringe, Ketten wirtschaftlicher Eigentümerschaft, Abhängigkeiten in Lieferketten, Auswirkungsanalysen über ein Netzwerk hinweg, Entity Resolution über ein Dutzend Quellsysteme und jede Frage der Form „Was liegt vier Hops von hier entfernt?“ sind in einem Graphen nativ und in einem relationalen Join umständlich bis unmöglich. Wenn das das Problem ist, lautet die Antwort Graphdatenbank, und keine Anwendungsplattform ersetzt eine solche.',
    'Die Grenze, die er mit dem Semantic Layer teilt, ist dieselbe: Ein Wissensgraph ist ganz überwiegend eine Lesestruktur. Er hält fest, dass diese Dinge verbunden sind; er deklariert nicht, wer sie ändern darf, welche Operationen zulässig sind oder welchen Audit-Eintrag eine Änderung hinterlässt. ObjectStack nähert sich den Verbindungen vom anderen Ende – Beziehungen werden als typisierte Felder an Objekten in den eigenen Metadaten der Anwendung deklariert, sodass der Graph des Unternehmens aus der Definition hervorgeht, auf der die Anwendung ohnehin läuft, statt ein zweiter Speicher zu sein, der synchron gehalten werden muss; und weil diese Definition eine Datei in Ihrem Repository ist, ist sie eine offene Geschäftsontologie statt eines Graphen in der Plattform eines anderen. Das ist eine Aussage über Eigentum und Governance, nicht über Graph-Analytik: ObjectStack ist keine Graphdatenbank und versucht nicht, bei tiefen Multi-Hop-Traversierungen zu gewinnen.',
  ],
  alsoKnownAs: [
    'Knowledge Graph',
    'Unternehmens-Wissensgraph',
    'Enterprise Knowledge Graph',
    'semantischer Graph',
    'Entitätsgraph',
  ],
  relatedTerms: [
    'ontology',
    'semantic-layer',
    'object-type-and-action-type',
    'application-metadata',
    'typed-metadata',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-race-open-vs-closed',
    'ai-ontology-open-protocol',
    'crm-ai-understands-customers',
  ],
  pageSlugs: ['data-modeling', 'analytics'],
} satisfies GlossaryTerm;

export default term;
