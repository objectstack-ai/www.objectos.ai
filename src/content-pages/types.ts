export interface MarketingPageMetric {
  value: string;
  label: string;
}

export interface MarketingPageAction {
  label: string;
  href: string;
}

/**
 * How far a /use-cases/ scenario is from running (#370), a closed set:
 * - `today`: it works on the shipped platform, shown by its linked template
 *   or post;
 * - `integration`: it needs a connection to a system the reader runs (e-mail,
 *   chat, OCR, ERP, quality, IAM, analytics…);
 * - `rule`: the business rule it applies has to be written down first.
 * The tier comes from evidence, never optimism: in doubt, the more
 * conservative one. `MarketingEvidencePage.astro` fails `astro build` on a
 * scenario whose value is missing or not in this list.
 */
export const SCENARIO_READINESS = ['today', 'integration', 'rule'] as const;
export type ScenarioReadiness = (typeof SCENARIO_READINESS)[number];

/**
 * A scenario card on /use-cases/: the item's `body` is the "today" line, and
 * these two lines finish the shape "today → with AI → what a person approves,
 * and how permissions and audit hold". Every card is a summary of one existing
 * scenario post, never a new claim; the links are checked at build time
 * (MarketingEvidencePage.astro): the post must exist, the template must be a
 * catalog entry on /templates/, the guide must be a cluster.
 */
export interface MarketingPageScenario {
  /** Blog post slug the card summarizes; linked in the reader's locale. */
  post: string;
  /** Template name in the /templates/ catalog, where the scenario has one. */
  template?: string;
  /** Cluster slug of a pillar guide that goes deeper, where one exists. */
  guide?: string;
  /** How far the scenario is from running; one of `SCENARIO_READINESS`. */
  readiness: ScenarioReadiness;
  withAi: string;
  approves: string;
}

export interface MarketingPageItem {
  title: string;
  body: string;
  meta?: string;
  /** Optional link target; written as /en/<slug>/ and localized at render time. */
  href?: string;
  /** Optional anchor id, for items other pages link to (the template catalog). */
  id?: string;
  scenario?: MarketingPageScenario;
}

export interface MarketingPageSection {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  items: MarketingPageItem[];
}

export interface MarketingPageTable {
  /**
   * Heading over the table. Absent, the shared "decision surface" heading in
   * `ui.ts` renders; a page whose table is not a decision surface (the
   * side-by-side comparison on /compare/) names its own.
   */
  eyebrow?: string;
  title?: string;
  columns: [string, string, string];
  rows: [string, string, string][];
}

export interface MarketingPageArtifact {
  eyebrow: string;
  title: string;
  body: string;
  code?: string;
  steps?: string[];
}

export interface MarketingPage {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  lead: string;
  primary: MarketingPageAction;
  secondary: MarketingPageAction;
  /**
   * An optional third hero action to an outside site, rendered after the
   * secondary one with the same style and opened in a new tab (/templates/:
   * the zero-install StackBlitz trial, `TRY_IN_BROWSER_URL` in src/lib/home.ts).
   */
  outbound?: MarketingPageAction;
  metrics: MarketingPageMetric[];
  artifact: MarketingPageArtifact;
  sections: MarketingPageSection[];
  table?: MarketingPageTable;
  checklistTitle?: string;
  checklist?: string[];
  faqs: { question: string; answer: string }[];
}
