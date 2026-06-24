import { s2t } from './zhconvert';
import type { Locale } from './i18n';

export interface PricingPlan {
  name: string;
  price: string; // headline number: "$0", "$20", "$45", "Custom"
  cadence?: string; // "per seat / month", "forever", "contact sales"
  billedNote?: string; // "billed annually"
  altPrice?: string; // "$24 billed monthly"
  tagline: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
}

export interface PricingCopy {
  title: string;
  description: string;
  intro: string;
  /** Optional limited-time promotional banner shown above the plans. */
  promo?: string;
  billingNote: string;
  plans: PricingPlan[];
  morNote: string;
  refundsLabel: string;
}

// CTA targets. Plan CTAs point at the docs "get started" surface; enterprise
// opens an email. Repoint these at the app signup URL once it is live.
const GET_STARTED = 'https://docs.objectos.ai';
const CONTACT = 'mailto:support@objectstack.ai';

// Prices/quotas mirror the product's source of truth:
// cloud `packages/service-cloud/src/plan-entitlements.ts` (PLAN_PRICING +
// PLAN_MATRIX) and the in-app SDUI pricing page; see ADR-0023. Per-seat,
// Airtable-aligned:
// the headline is the annual-billed price; monthly is shown as the alt price.
const pricingEn: PricingCopy = {
  title: 'Pricing',
  description:
    'Simple, per-seat pricing for ObjectOS — the AI-native platform for building governed business applications. Start free, upgrade when you are ready.',
  intro:
    'Start on the free plan and upgrade when you need more. Paid plans are billed per seat — you pay for the people who build. Every plan includes AI online development. Prefer to run it yourself? The open-source Community Edition is free, forever.',
  promo: 'Founding customer offer: 50% off your first year. Limited time.',
  billingNote:
    'Prices are in USD, per seat. The headline price is billed annually (about two months free); monthly billing is also available. Cancel anytime. Exact quotas are shown in the app and at checkout.',
  plans: [
    {
      name: 'Free',
      price: '$0',
      cadence: 'forever',
      tagline: 'For evaluating and small personal projects.',
      features: [
        '1 environment',
        '3 users',
        'AI online development',
        '7-day audit retention',
      ],
      cta: 'Get started',
      ctaHref: GET_STARTED,
    },
    {
      name: 'Team',
      price: '$20',
      cadence: 'per seat / month',
      billedNote: 'billed annually',
      altPrice: '$24 billed monthly',
      tagline: 'For teams building and sharing apps together.',
      features: [
        '2 environments',
        'Custom domains',
        'AI app building + data Q&A',
        '30-day audit retention',
      ],
      cta: 'Get started',
      ctaHref: GET_STARTED,
      highlight: true,
    },
    {
      name: 'Business',
      price: '$45',
      cadence: 'per seat / month',
      billedNote: 'billed annually',
      altPrice: '$54 billed monthly',
      tagline: 'For organizations that need SSO and scale.',
      features: [
        '4 environments',
        'SSO / SAML',
        'Custom domains',
        '1-year audit retention',
      ],
      cta: 'Get started',
      ctaHref: GET_STARTED,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      cadence: 'contact sales',
      tagline: 'For larger orgs with custom security and contracts.',
      features: [
        'Volume seat pricing',
        'SSO + advanced admin controls',
        'Priority support',
        'Custom contract & invoicing',
      ],
      cta: 'Contact us',
      ctaHref: CONTACT,
    },
  ],
  morNote:
    'Payments and billing are securely handled by our reseller and Merchant of Record, Paddle.com. Applicable sales tax or VAT is calculated at checkout.',
  refundsLabel: 'See our refund and cancellation policy',
};

const pricingZhHans: PricingCopy = {
  title: '定价',
  description:
    'ObjectOS 按席位定价，简单透明——面向构建受治理业务应用的 AI-native 平台。免费起步，准备好再升级。',
  intro:
    '从免费版开始，需要更多时再升级。付费套餐按席位计费——为真正参与搭建的人付费。每个套餐都包含 AI 在线开发。想自己部署？开源社区版永久免费。',
  promo: '早鸟优惠：首年五折，限时开放。',
  billingNote:
    '价格以美元计，按席位计费。标价为年付价（约省两个月）；也可选择月付。可随时取消。具体配额在应用内和结账时显示。',
  plans: [
    {
      name: '免费版',
      price: '$0',
      cadence: '永久免费',
      tagline: '用于评估和小型个人项目。',
      features: [
        '1 个环境',
        '3 个用户',
        'AI 在线开发',
        '7 天审计留存',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
    },
    {
      name: '团队版',
      price: '$20',
      cadence: '每席 / 月',
      billedNote: '按年付',
      altPrice: '月付 $24',
      tagline: '面向共同搭建与共享应用的团队。',
      features: [
        '2 个环境',
        '自定义域名',
        'AI 搭建 + 数据问询',
        '30 天审计留存',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
      highlight: true,
    },
    {
      name: '商业版',
      price: '$45',
      cadence: '每席 / 月',
      billedNote: '按年付',
      altPrice: '月付 $54',
      tagline: '面向需要 SSO 和规模化的组织。',
      features: [
        '4 个环境',
        'SSO / SAML',
        '自定义域名',
        '1 年审计留存',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
    },
    {
      name: '企业版',
      price: '定制',
      cadence: '联系销售',
      tagline: '面向有定制安全与合同需求的大型组织。',
      features: [
        '席位批量定价',
        'SSO + 高级管理控制',
        '优先支持',
        '定制合同与开票',
      ],
      cta: '联系我们',
      ctaHref: CONTACT,
    },
  ],
  morNote:
    '支付与计费由我们的经销商及 Merchant of Record（销售记录商）Paddle.com 安全处理。适用的销售税或增值税在结账时计算。',
  refundsLabel: '查看我们的退款与取消政策',
};

const toHant = (p: PricingCopy): PricingCopy => ({
  title: s2t(p.title),
  description: s2t(p.description),
  intro: s2t(p.intro),
  promo: p.promo ? s2t(p.promo) : undefined,
  billingNote: s2t(p.billingNote),
  plans: p.plans.map((plan) => ({
    ...plan,
    name: s2t(plan.name),
    price: s2t(plan.price),
    cadence: plan.cadence ? s2t(plan.cadence) : undefined,
    billedNote: plan.billedNote ? s2t(plan.billedNote) : undefined,
    altPrice: plan.altPrice ? s2t(plan.altPrice) : undefined,
    tagline: s2t(plan.tagline),
    features: plan.features.map(s2t),
    cta: s2t(plan.cta),
  })),
  morNote: s2t(p.morNote),
  refundsLabel: s2t(p.refundsLabel),
});

export const pricingCopy: Record<Locale, PricingCopy> = {
  en: pricingEn,
  'zh-Hans': pricingZhHans,
  'zh-Hant': toHant(pricingZhHans),
  ja: pricingEn,
  de: pricingEn,
  es: pricingEn,
  fr: pricingEn,
  ko: pricingEn,
};
