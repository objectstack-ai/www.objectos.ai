import type { AuthoredClusterCopy } from '../../../src/lib/cluster-i18n';

// Authored German copy of the English cluster in src/lib/clusters.ts (#427).
// The title front-loads the query German readers search for.
const page: AuthoredClusterCopy = {
  slug: 'legacy-system-modernization',
  title: 'KI-gestützte Legacy-Modernisierung',
  shortTitle: 'Legacy-Modernisierung',
  description:
    'KI-gestützte Legacy-Modernisierung in der Praxis: bestehende Datenbanken anbinden, Business Objects modellieren und riskante Migrationen vermeiden.',
  eyebrow: 'Modernisierungsleitfaden',
  lead:
    'Legacy-Modernisierung beginnt nicht immer mit einer Neuentwicklung. Für viele Teams ist der risikoärmere Weg, bestehende Systeme zuerst nur lesend anzubinden, die wichtigen Datensätze zu modellieren und darauf KI-native Workflows aufzusetzen.',
  definition:
    'KI-gestützte Modernisierung lässt das führende System an seinem Platz und schafft eine kontrollierte Objektschicht für KI, APIs, Workflows, Dashboards und neue Anwendungen. Das Altsystem bleibt in Betrieb und schreibt weiter seine Zeilen; die neue Schicht föderiert sie – standardmäßig nur lesend und noch früh – und macht seine Daten und Prozesse verständlich.',
  whyNow: [
    'Viele Kernsysteme tragen noch immer das Geschäft, sind aber zu fragil für häufige Änderungen.',
    'KI erhöht den Druck, alte Daten sicher bereitzustellen, ohne direkten Datenbankzugriff zu öffnen.',
    'Modernisierungsbudgets wirken besser, wenn Teams den Nutzen belegen können, bevor über eine Migration entschieden wird.',
  ],
  capabilities: [
    'Eine bestehende Datenbank zuerst als nur lesende Datasource anbinden – Föderation ist standardmäßig nur lesend und noch früh – und die wichtigen Tabellen als Objekte modellieren, ohne einen einzigen Datensatz zu verschieben.',
    'Legacy-Tabellen als Business Objects beschreiben, die Agents, Workflows und Nutzer verstehen.',
    'Neue Masken, Berichte und Automatisierungen rund um das Altsystem ergänzen, das die Quelle der Wahrheit bleibt.',
    'KI-Aktionen über Berechtigungen, Freigaben und Audit-Logs leiten statt über improvisierte Skripte.',
  ],
  useCases: [
    'KI-Suche und -Analyse über CRM-, ERP-, Ticket- oder Auftragsdaten legen.',
    'Einen modernen Workflow um ein Altsystem bauen, ohne die gesamte Anwendung neu zu schreiben.',
    'Einen schrittweisen Ablösepfad schaffen, indem jeweils eine Domäne modelliert wird.',
  ],
  faq: [
    {
      question: 'Kann KI-gestützte Modernisierung eine vollständige Migration vermeiden?',
      answer:
        'Oft ja. Eine kontrollierte Objektschicht kann sich mit dem bestehenden führenden System verbinden – standardmäßig nur lesend, Schreibzugriff wird bewusst pro Objekt freigegeben –, Geschäftsbegriffe bereitstellen und Teams KI-Workflows ergänzen lassen, ohne jeden Prozess sofort auf eine neue Plattform zu verlagern. Die Föderation ist noch früh: Rechnen Sie damit, dass der Lesepfad der ausgereifte ist.',
    },
    {
      question: 'Was sollte zuerst modernisiert werden?',
      answer:
        'Beginnen Sie mit wertvollen, gut verstandenen Datensätzen wie Kunden, Fällen, Arbeitsaufträgen, Bestellungen oder Berichten. Der beste erste Schritt ist meist ein Workflow, dessen Schmerzpunkt die Nutzer bereits kennen und dessen Daten bereits vorhanden sind.',
    },
    {
      question: 'Welches Risiko birgt es, KI mit Altsystemen zu verbinden?',
      answer:
        'Das Risiko besteht darin, dass KI Identität, Berechtigungen und Audit umgeht. Sicherer ist ein Design, in dem KI über eine Runtime arbeitet, die den Zugriffsbereich des Nutzers, Freigaben und Systemgrenzen respektiert.',
    },
  ],
};

export default page;
