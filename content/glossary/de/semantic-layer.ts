import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'semantic-layer',
  term: 'Semantic Layer',
  title: 'Semantic Layer (semantische Schicht): Definition – und wann er ausreicht',
  description:
    'Ein Semantic Layer ist ein kontrollierter Satz von Geschäftsdefinitionen – Kennzahlen, Dimensionen, Entitätsnamen – zwischen Rohdatenspeicher und Abfragewerkzeugen, damit ein Begriff überall dieselbe Berechnung ergibt.',
  definition:
    'Ein Semantic Layer ist ein kontrollierter Satz von Geschäftsdefinitionen – Kennzahlen, Dimensionen und Entitätsnamen –, der zwischen dem Rohdatenspeicher und den Werkzeugen liegt, die ihn abfragen, sodass „aktiver Kunde“ oder „Nettoumsatz“ zu genau einer vereinbarten Berechnung aufgelöst wird, egal wer fragt und aus welchem Werkzeug.',
  explanation: [
    'Zu Hause ist der Begriff in der Analytik. Der Semantic Layer von dbt, Cube, AtScale und LookML von Looker lösen alle dasselbe Problem: Jedes Dashboard, jedes Notebook und jede Tabellenkalkulation hatte „Umsatz“ in eigenem SQL neu hergeleitet, und die Zahlen stimmten nicht mehr überein. Wird die Kennzahl einmal definiert – oberhalb des Warehouse und unterhalb der Werkzeuge –, ist die Definition das gemeinsame Artefakt statt der Abfrage. Seit 2026 werden dieselben zwei Wörter auch für die Schicht der Geschäftsdefinitionen unter agentischer AI verwendet – in dem Sinne, in dem Fabric und Foundry sie gebrauchen –, weshalb der Ausdruck heute je nach Sprecher zwei verschiedene Reichweiten hat und es sich lohnt zu sagen, welche man meint.',
    'Für eine große Klasse von Aufgaben ist ein Semantic Layer tatsächlich das richtige und ausreichende Werkzeug, und das sollte man klar sagen, statt daran vorbeizureden. Wenn das Problem darin besteht, dass Finance und Vertrieb unterschiedliche Umsatzzahlen nennen, dass Self-Service-Analytik widersprüchliche Dashboards hervorbringt oder dass ein AI-Assistent Fragen über einem Warehouse konsistent beantworten soll, dann löst ein Metrik-Layer über diesem Warehouse das – und eine Anwendungsplattform darunterzulegen hieße, eine Frage zu beantworten, die niemand gestellt hat. Ein Semantic Layer ist keine schwächere Ontologie; er ist ein anderes Instrument, und bei analytischen Fragen ist er das bessere.',
    'Was er nicht abdeckt, ist die Schreibseite. Ein Semantic Layer ist ein Lesevertrag: Er legt fest, was eine Zahl bedeutet, nicht aber, wer den zugrunde liegenden Datensatz ändern darf, welche Operationen es überhaupt gibt, ob eine Änderung eine Genehmigung braucht oder welche Nachweise danach bleiben. ObjectStack steht auf der anderen Seite dieser Linie – dieselben typisierten Anwendungsmetadaten, die ein Objekt definieren, deklarieren auch seine Berechtigungen, seine Aktionen und seine Genehmigungsschritte, und die Runtime setzt sie alle bei jedem Aufruf durch, sodass die Definition Schreibvorgänge steuert, statt nur Lesevorgänge zu beschreiben. Einen Semantic Layer über dem Warehouse ersetzt es nicht, und ein Unternehmen, das ernsthaft BI betreibt, wird weiterhin einen haben wollen.',
  ],
  alsoKnownAs: ['semantische Schicht', 'semantische Geschäftsschicht', 'Metrik-Layer', 'headless BI'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'governed-runtime',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'why-ai-agent-pilots-fail-four-layers',
    'enterprise-ontology-race-open-vs-closed',
    'context-bottleneck-read-half',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['analytics', 'data-modeling', 'platform'],
} satisfies GlossaryTerm;

export default term;
