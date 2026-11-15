import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'approval-workflow',
  term: 'Genehmigungsworkflow',
  title: 'Genehmigungsworkflow: Definition, Routing und wo die Frist tatsächlich liegt',
  description:
    'Ein Genehmigungsworkflow hält eine beantragte Änderung zurück, bis eine verantwortliche Person ausdrücklich entscheidet – nach Rolle statt nach Namen geroutet, die Entscheidung protokolliert, bevor die Änderung weiterläuft.',
  definition:
    'Ein Genehmigungsworkflow ist ein Geschäftsprozess, in dem eine beantragte Änderung in einem ausstehenden Zustand gehalten wird, bis eine Person mit Entscheidungsbefugnis eine ausdrückliche Genehmigung oder Ablehnung festhält, sodass die Änderung erst wirksam wird, nachdem jemand Verantwortliches dafür unterschrieben hat.',
  explanation: [
    'Genehmigungsworkflows sind weit älter als Workflow-Software – Bestellanforderungen, Change Advisory Boards, Kreditausschüsse und die Freigabe von Arzneimittelstudien folgen alle demselben Muster. Drei Eigenschaften unterscheiden einen echten Genehmigungsworkflow von einer Benachrichtigung, die nur so aussieht. Die Änderung muss tatsächlich blockiert sein, solange die Anfrage aussteht, statt weiterzulaufen, während eine E-Mail ungelesen liegt. Die Entscheidung muss einer Person zuzuordnen sein, die im Moment der Entscheidung die Befugnis innehatte, nicht einem Sammelpostfach. Und das Routing muss gegen die Organisation aufgelöst werden statt gegen Namen, denn eine Kette, die an bestimmte Personen verdrahtet ist, bricht bei der nächsten Umstrukturierung unbemerkt und leitet an jemanden weiter, der das Unternehmen längst verlassen hat. Ein Prozess, der keine dieser Eigenschaften erfüllt, ist eine Benachrichtigung mit Verzögerung.',
    'In ObjectStack ist eine Genehmigung kein separates System, sondern ein dauerhafter Knoten innerhalb eines Flows: Der Lauf erreicht den Genehmigungsknoten, eröffnet eine Anfrage, pausiert und setzt über seine ausgehende Approve- oder Reject-Kante fort, sobald eine Entscheidung festgehalten ist. Genehmigende werden als Benutzer, Rolle, Team oder als die Vorgesetztenhierarchie des Antragstellers deklariert und zum Zeitpunkt der Anfrage gegen die aktuelle Identität aufgelöst – eine Position wird zu der Person expandiert, die sie gerade innehat. Jeder Schritt legt sein eigenes Verhalten fest, sodass ein Knoten nach „die erste Antwort gewinnt“ entscheiden kann und der nächste „einstimmig“; lockRecord hält den Datensatz fest, damit niemand am Prüfer vorbei editiert; maxRevisions begrenzt die Rücksendeschleife, damit eine Anfrage nicht endlos um „bitte überarbeiten“ kreist; und onEmptyApprovers legt fest, was passiert, wenn die Liste der Genehmigenden niemanden ergibt – standardmäßig greift ein Administrator ein, statt den Datensatz stillschweigend durchzuwinken. Die Entscheidung wird ins Audit-Log geschrieben, bevor der Lauf weitergeht, sodass es keinen Pfad gibt, der eine Genehmigung ohne festgehaltene Entscheidung passiert. Was ein Genehmigungsknoten trägt, ist eine geschäftliche Entscheidung, etwa ein Rabatt, eine Erstattung oder ein Einkauf. Änderungen, die eine AI an der App selbst vornimmt, nehmen einen anderen Weg zu einem Menschen: Im Open-Source-ObjectStack ist die Änderung eines Coding-Agents Metadaten in einem Git-Diff, den jemand prüft, und in ObjectOS Cloud wird eine Änderung des AI Builders an einer laufenden App, die bereits Datensätze enthält, als Entwurf gespeichert, den ein Mensch veröffentlicht – und genau das macht von Agents geschriebene Software zu etwas, das ein Mensch abzeichnen kann, statt es hinterher zu entdecken.',
    'Die Frage, die man jeder Genehmigungs-Engine stellen sollte, lautet: Wo liegt ihre Frist? Die ehrliche Antwort fällt hier schmal aus. Ein Warteknoten in einem Flow hat überhaupt kein Timeout: Zwei Schlüssel behaupteten früher etwas anderes, und beide wurden zurückgezogen, statt als Versprechen stehen zu bleiben, das die Runtime nicht hält. Eskalation gibt es nur am Genehmigungsknoten, als SLA pro Knoten statt als globaler Timer-Dienst. Setzen Sie timeoutHours, findet ein Sweep Anfragen, die länger als diese Stundenzahl ab Erstellung ausstehen, und eskaliert jede davon höchstens ein einziges Mal, mit der konfigurierten Aktion – notify, reassign, auto_approve oder auto_reject –, wobei escalateTo einen Benutzer oder eine Position benennt, die zu ihren aktuellen Inhabern expandiert wird; die Audit-Zeile der Eskalation wird zuerst geschrieben, damit ein abgestürzter oder wiederholter Sweep nicht doppelt auslöst. Die Konsequenz für das Design sollte man klar aussprechen: Muss ein Schritt zeitlich begrenzt sein, modellieren Sie ihn als Genehmigung mit SLA oder steuern Sie die Frist von außerhalb des Flows. Ein schlichter Warteknoten wartet geduldig, korrekt und für immer.',
  ],
  alsoKnownAs: [
    'Freigabeprozess',
    'Genehmigungsprozess',
    'Freigabe-Workflow',
    'Freigabekette',
    'mehrstufige Genehmigung',
  ],
  relatedTerms: [
    'audit-trail',
    'permission-model',
    'governed-runtime',
    'reviewable-diff',
    'declared-vs-enforced',
  ],
  articleSlugs: [
    'automation-pause-resume-approvals',
    'objectos-automation-engine',
    'ai-wrote-your-app-dare-to-merge',
  ],
  pageSlugs: ['approvals', 'automation', 'permissions'],
} satisfies GlossaryTerm;

export default term;
