import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: 'Row-Level Security',
  title: 'Row-Level Security (RLS): Definition, Funktionsweise und wie man nachweist, dass sie greift',
  description:
    'Row-Level Security begrenzt, welche Zeilen einer Tabelle ein Benutzer lesen oder schreiben darf, indem sie ein Prädikat an die Tabelle selbst bindet – der Filter läuft in der Abfrage, nicht im aufrufenden Code.',
  definition:
    'Row-Level Security (RLS) ist ein Mechanismus der Zugriffskontrolle, der festlegt, welche Zeilen einer Tabelle ein bestimmter Benutzer lesen oder schreiben darf, indem er ein Prädikat an die Tabelle selbst bindet, sodass die Einschränkung innerhalb der Abfrage greift und nicht im Anwendungscode, der die Abfrage absetzt.',
  explanation: [
    'Die Idee ist älter als jede AI-Plattform, und es lohnt sich, sie in ihrer ursprünglichen Form zu beschreiben. PostgreSQL liefert sie seit Version 9.5 aus: CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\')) hängt eine Bedingung an die Tabelle, und jedes folgende SELECT – aus dem ORM, aus einem Reporting-Tool, aus einer psql-Sitzung, die jemand um zwei Uhr nachts geöffnet hat – trägt sie mit. Salesforce erreicht dasselbe Ergebnis über Sharing Rules und eine Eigentümerhierarchie. Beide erkaufen sich damit die Eigenschaft, die RLS die Mühe wert macht: Die Einschränkung wandert mit den Daten, sodass ein neuer Endpunkt, ein neuer Exportpfad oder ein neuer Aufrufer sie erbt, ohne dass jemand daran denken muss, eine WHERE-Klausel zu ergänzen. Zugriffskontrolle, die im Aufrufer lebt, ist eine Konvention; Zugriffskontrolle, die in der Tabelle lebt, ist eine Grenze.',
    'ObjectStack drückt dasselbe Konstrukt als Metadaten aus, die sich direkt verfassen lassen. Ein Berechtigungsset enthält ein Array rowLevelSecurity, dessen Einträge ein Objekt und eine Operation benennen und dann ein Prädikat deklarieren: using für die Leseseite (SELECT, UPDATE, DELETE), check für die Schreibseite (INSERT, UPDATE), formuliert als eingeschränkter CEL-Ausdruck wie owner_id == current_user.id oder assigned_to_id in current_user.team_member_ids. Die Engine übersetzt jedes Prädikat in einen ObjectQL-Filter und schiebt ihn in die Abfrage, sodass die Zeilen nie in den Prozessspeicher gelangen – was mehr als sonst zählt, wenn der nächste Schritt das Kontextfenster eines AI-Modells ist, denn eine Zeile, die erst nach dem Abruf herausgefiltert wird, ist bereits gelesen worden. Zutreffende Richtlinien werden mit ODER verknüpft, sodass ein Benutzer zugelassen wird, sobald er unter irgendeine Richtlinie fällt; eine Richtlinie, deren Kontextwert zu null oder einem leeren Array aufgelöst wird, fällt weg, statt den Zugriff zu erweitern; und ein Prädikat, das der Compiler nicht übersetzen kann, erzeugt überhaupt keinen Filter – dann setzt der Lesepfad einen Deny-Sentinel ein, und das Objekt liefert keine einzige Zeile. Die Fehlerrichtung ist geschlossen, niemals offen.',
    'Genau diesen letzten Fall sollte ein Security-Reviewer hinterfragen, denn in den Metadaten ist er unsichtbar: eine Regel, die sich wie ein eingegrenzter Zugriff liest und sich wie eine pauschale Verweigerung verhält, ohne dass beim Verfassen irgendetwas auf die verantwortliche Zeile zeigt. Die Antwort von ObjectStack ist eine Durchsetzbarkeitsprüfung zur Kompilierzeit – validateRlsPredicateEnforceability prüft beim Build jedes deklarierte using und check und weist jedes Prädikat, das niemals durchgesetzt würde, als Fehler zurück. Vertrauenswürdig wird diese Prüfung dadurch, dass sie die Runtime weder nachbildet noch per Mustererkennung errät: Sie ruft das Entscheidungsverfahren der Runtime selbst, isSupportedRlsExpression, mit derselben Eingabe auf, die auch der Compiler heranzieht, sodass „vom Linter abgelehnt“ und „ohne Durchsetzung verworfen“ derselbe boolesche Wert sind und nicht auseinanderdriften können. Genau dieses Artefakt sollten Sie von jeder Plattform verlangen. Nicht „Unterstützen Sie Row-Level Security?“ – darauf sagt jeder Ja. Fragen Sie, ob der Build eine Sicherheitsregel zurückweisen kann, die stillschweigend nichts bewirken würde.',
  ],
  alsoKnownAs: [
    'RLS',
    'Sicherheit auf Zeilenebene',
    'Zugriffskontrolle auf Zeilenebene',
    'Sicherheit auf Datensatzebene',
    'Zeilenfilterung',
  ],
  relatedTerms: [
    'permission-model',
    'audit-trail',
    'governed-runtime',
    'declared-vs-enforced',
    'governed-tool-layer',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'objectos-automation-engine',
  ],
  pageSlugs: ['permissions', 'trust-center', 'data-modeling'],
} satisfies GlossaryTerm;

export default term;
