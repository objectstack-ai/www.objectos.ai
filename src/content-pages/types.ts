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
  metrics: MarketingPageMetric[];
  artifact: MarketingPageArtifact;
  sections: MarketingPageSection[];
  table?: MarketingPageTable;
  checklistTitle?: string;
  checklist?: string[];
  faqs: { question: string; answer: string }[];
}

/**
 * One address on /contact/ (#397): the purpose, one plain sentence on when to
 * use it, and the mailbox. `email` is always one of the constants in
 * `src/lib/contact.ts`, never typed into the content file, so the page cannot
 * name an address the rest of the site does not.
 */
export interface ContactPageGroup {
  id: string;
  title: string;
  body: string;
  email: string;
  /** Further reading for this purpose; `/en/<route>/` is localized at render time. */
  links?: MarketingPageAction[];
}

/**
 * The /contact/ page (#397). It lives in the marketing tree — same registry,
 * same locale fallback, hreflang, canonical and sitemap rules as the evidence
 * pages — but it is a short page of its own shape, so `kind` tells the two
 * apart: `getMarketingPages` returns evidence pages only, `getContactPage` this
 * one. The company name and mailing address are not content: the page quotes
 * them from `src/lib/legal.ts`; only their labels are here.
 */
export interface ContactPage {
  kind: 'contact';
  slug: 'contact';
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  lead: string;
  groups: ContactPageGroup[];
  company: { title: string; nameLabel: string; addressLabel: string };
}

/** Everything a `content/pages/<locale>/<slug>.ts` module may export. */
export type RegisteredPage = MarketingPage | ContactPage;

export const isContactPage = (page: RegisteredPage): page is ContactPage =>
  'kind' in page && page.kind === 'contact';
