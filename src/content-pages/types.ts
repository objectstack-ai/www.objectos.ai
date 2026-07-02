export interface MarketingPageMetric {
  value: string;
  label: string;
}

export interface MarketingPageAction {
  label: string;
  href: string;
}

export interface MarketingPageItem {
  title: string;
  body: string;
  meta?: string;
  /** Optional link target; written as /en/<slug>/ and localized at render time. */
  href?: string;
}

export interface MarketingPageSection {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  items: MarketingPageItem[];
}

export interface MarketingPageTable {
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
