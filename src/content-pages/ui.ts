import type { Locale } from '../lib/i18n';
import { s2t } from '../lib/zhconvert';

interface MarketingPageUi {
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

const ZH_HANS_UI: MarketingPageUi = {
  loopLabel: 'ObjectOS 审阅闭环',
  loop: {
    writer: {
      eyebrow: 'AI',
      title: '编写元数据',
      body: '对象、权限、流程、工具',
    },
    reviewer: {
      eyebrow: '人',
      title: '审阅 diff',
      body: '业务权限、数据访问、审批',
    },
    runtime: {
      eyebrow: '运行时',
      title: '执行策略',
      body: 'UI、API、审计、MCP、动作',
    },
  },
  decisionEyebrow: '决策面',
  decisionTitle: '改什么、谁来审、跑什么',
  checklistEyebrow: '评审清单',
  faqEyebrow: 'FAQ',
  faqTitle: '这一页应该回答的问题',
  nextEyebrow: '下一步',
  nextTitle: '继续完善你的评估材料。',
};

// Traditional UI is derived from Simplified — never hand-kept.
const toHant = (s: MarketingPageUi): MarketingPageUi => ({
  loopLabel: s2t(s.loopLabel),
  loop: {
    writer: { eyebrow: s2t(s.loop.writer.eyebrow), title: s2t(s.loop.writer.title), body: s2t(s.loop.writer.body) },
    reviewer: { eyebrow: s2t(s.loop.reviewer.eyebrow), title: s2t(s.loop.reviewer.title), body: s2t(s.loop.reviewer.body) },
    runtime: { eyebrow: s2t(s.loop.runtime.eyebrow), title: s2t(s.loop.runtime.title), body: s2t(s.loop.runtime.body) },
  },
  decisionEyebrow: s2t(s.decisionEyebrow),
  decisionTitle: s2t(s.decisionTitle),
  checklistEyebrow: s2t(s.checklistEyebrow),
  faqEyebrow: s2t(s.faqEyebrow),
  faqTitle: s2t(s.faqTitle),
  nextEyebrow: s2t(s.nextEyebrow),
  nextTitle: s2t(s.nextTitle),
});

const UI: Partial<Record<Locale, MarketingPageUi>> = {
  en: EN_UI,
  'zh-Hans': ZH_HANS_UI,
  'zh-Hant': toHant(ZH_HANS_UI),
};

export const marketingPageUi = (locale: Locale): MarketingPageUi => UI[locale] ?? EN_UI;
