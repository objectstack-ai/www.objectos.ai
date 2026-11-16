import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'ontology',
  term: 'Ontologie',
  title: 'Ontologie in Unternehmenssoftware: die ausführbare Geschäftsontologie – und wem Ihre gehört',
  description:
    'Eine ausführbare Geschäftsontologie ist die Definition eines Unternehmens, die eine Runtime ausführt – Objekte, Felder, Beziehungen, Aktionen, Berechtigungen, Flows, Agents und Tools –, validiert statt per Inferenz ausgewertet.',
  definition:
    'Eine Ontologie im Sinne von ObjectStack ist eine ausführbare Geschäftsontologie: die Definition eines Unternehmens – seiner Objekte und Felder, Beziehungen, Aktionen, Berechtigungen, Flows sowie Agent- und Tool-Definitionen –, geschrieben als typisierte Metadaten, die eine Runtime validiert und dann ausführt, sodass Software und AI-Agents das Unternehmen über diese eine Definition bedienen statt über rohe Tabellen.',
  explanation: [
    'Die Ontologie ist die Software. In ObjectStack ist die Ontologie keine Schicht innerhalb einer gehosteten Plattform: Sie ist die eigene Definition der Anwendung – Objekte und Felder, Beziehungen, Aktionen, Berechtigungen, Flows sowie Agent- und Tool-Definitionen –, und die Runtime führt sie aus, leitet daraus die Datenbank, die REST-API, die Oberflächen und die MCP-Tools ab und setzt bei jedem Aufruf Berechtigungen und Audit durch. Mit dem Wort gehen vier Abgrenzungen einher. Sie ist ausführbar, keine Ontologie der Wissensrepräsentation: keine Vererbung, keine Axiome, kein Reasoner – die Definition wird validiert und dann ausgeführt. Sie ist kein Semantic Layer über Ihren bestehenden Systemen: Sie ist das System, und die Föderation einer externen Datenquelle ist standardmäßig schreibgeschützt und steht noch am Anfang. Ansichten, Dashboards, Apps und Übersetzungen sind Projektionen der Ontologie, nicht Teil von ihr. Und Code verschwindet nicht: Er wandert in die Runtime, als Hooks, Aktionsrümpfe, CEL und eingeschränktes JSX.',
    'Das Wort stammt aus der Philosophie und gelangt über das Knowledge Engineering in die Unternehmenssoftware, wo es ein formales Modell einer Domäne bezeichnet – ihrer Klassen, Eigenschaften und Beziehungen –, über das Software Schlüsse ziehen kann. Dieser Arbeitsbegriff ist eng und nützlich: Eine Ontologie benennt die Typen (Kunde, Arbeitsauftrag, Gerät), die Eigenschaften jedes Typs und die Verknüpfungen zwischen ihnen, einmal, für die gesamte Organisation – und genau das unterscheidet sie von einem Datenbankschema. Ein Schema beschreibt, wie eine einzelne Anwendung ihre Zeilen speichert; eine Ontologie beschreibt, was das Unternehmen mit „Kunde“ meint, und zwar so, dass ein Dutzend Systeme, ein Reporting-Tool und ein Modell den Begriff alle gleich auflösen. Palantir Foundry ist das, woran die meisten 2026 denken, und seine Modellierungsqualität ist tatsächlich hoch; Microsoft Fabric IQ und der Enterprise Knowledge Graph von Google bewegen sich in dieselbe Schicht.',
    'Die meiste Ontologie-Arbeit endet einen Schritt vor der Stelle, an der das Risiko beginnt. Eine Ontologie, die nur für den Abruf taugt, ist ein Lesemodell: Sie macht einen Agent auskunftsfähig über das Unternehmen und sagt nichts darüber, was passiert, wenn der Agent etwas ändern muss. Was sie vervollständigt, ist die deklarierte, berechtigungsgeprüfte Schreiboperation – die Aktion – zusammen mit den Berechtigungs- und Audit-Regeln, die an derselben Definition hängen. Palantir gebührt Anerkennung dafür, Schreibvorgänge seit Jahren durch kontrollierte Aktionen zu leiten; die offene Frage war nie, ob dieses Design richtig ist.',
    'Die offene Frage ist, wer die Datei in der Hand hält. In ObjectStack ist die Definition Ihre Geschäftsontologie: offen, versioniert und Ihr Eigentum, in Ihrem eigenen Repository – kein über ein Framework verstreuter Code und kein Graph im System eines Anbieters. Eine Definition, die Sie lesen, diffen und auf einen anderen Host umziehen können, ist ein anderes Asset als eine ebenso gute Definition, die in der Engine eines Anbieters lebt und nur per Neuaufbau migriert. Eine Ontologie macht einen AI-Agent nicht korrekt: Ein Unternehmen gut zu modellieren bleibt langsame, umstrittene menschliche Arbeit, die kein Format abkürzt. Was das Format entscheidet, ist enger gefasst – ob das Ergebnis klein genug ist, dass ein Agent es als Ganzes erfassen kann, streng genug, um die Fehler des Agents schon beim Verfassen zurückzuweisen, und portabel genug, um die Plattform zu überdauern, auf der es zuerst geschrieben wurde.',
  ],
  alsoKnownAs: [
    'ausführbare Geschäftsontologie',
    'Geschäftsontologie',
    'Unternehmensontologie',
    'Domänenontologie',
  ],
  relatedTerms: [
    'ontology-projection',
    'semantic-layer',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'typed-metadata',
    'governed-runtime',
  ],
  articleSlugs: [
    'what-does-the-ontology-is-the-software-mean',
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'enterprise-ontology-platform-comparison',
    'objectos-action-tools',
  ],
  pageSlugs: ['ontology', 'compare', 'data-modeling', 'app-ui', 'permissions', 'mcp', 'agent-developer', 'platform', 'ai'],
} satisfies GlossaryTerm;

export default term;
