import type { Locale } from '../lib/i18n';

interface MarketingPageUi {
  pageRailLabel: string;
  loopLabel: string;
  loop: {
    writer: { eyebrow: string; title: string; body: string };
    reviewer: { eyebrow: string; title: string; body: string };
    runtime: { eyebrow: string; title: string; body: string };
  };
  decisionEyebrow: string;
  decisionTitle: string;
  checklistEyebrow: string;
  faqEyebrow: string;
  faqTitle: string;
  nextEyebrow: string;
  nextTitle: string;
}

const EN_UI: MarketingPageUi = {
  pageRailLabel: 'Product pages',
  loopLabel: 'ObjectOS review loop',
  loop: {
    writer: {
      eyebrow: 'AI',
      title: 'Writes metadata',
      body: 'Objects, permissions, workflows, tools',
    },
    reviewer: {
      eyebrow: 'Human',
      title: 'Reviews diff',
      body: 'Business authority, data access, approvals',
    },
    runtime: {
      eyebrow: 'Runtime',
      title: 'Enforces policy',
      body: 'UI, APIs, audit, MCP, actions',
    },
  },
  decisionEyebrow: 'Decision surface',
  decisionTitle: 'What changes, who reviews it, what runs',
  checklistEyebrow: 'Review checklist',
  faqEyebrow: 'FAQ',
  faqTitle: 'Questions this page should answer',
  nextEyebrow: 'Next pages',
  nextTitle: 'Keep building the evaluation packet.',
};

const UI: Partial<Record<Locale, MarketingPageUi>> = {
  en: EN_UI,
};

export const marketingPageUi = (locale: Locale): MarketingPageUi => UI[locale] ?? EN_UI;
