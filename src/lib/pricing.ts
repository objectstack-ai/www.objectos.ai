import { s2t } from './zhconvert';
import type { Locale } from './i18n';
import { positioning } from './positioning';

export interface PricingPlan {
  name: string;
  price: string; // headline number: "Free", "$0", "$20", "Custom"
  cadence?: string; // "self-hosted", "forever", "per seat / month", "contact sales"
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
// The Enterprise contact is sales@, the address the public licence page
// (docs.objectos.ai/docs/resources/license) names for "contact sales" on
// Enterprise, the Runtime Subscription and OEM terms; support@ is the
// billing and refunds address the refund policy names.
const GET_STARTED = 'https://docs.objectos.ai';
const CONTACT = 'mailto:sales@objectstack.ai';
// ObjectOS Community has no checkout: its button goes to the objectstack
// deployment docs (the runtime image and `os start` live in that repository).
const COMMUNITY = 'https://objectstack.ai/docs/deployment';

// Prices/quotas mirror the product's source of truth:
// cloud `packages/service-cloud/src/plan-entitlements.ts` (PLAN_PRICING +
// PLAN_MATRIX) and the in-app SDUI pricing page; see ADR-0023. Per-seat,
// Airtable-aligned:
// the headline is the annual-billed price; monthly is shown as the alt price.
const pricingEn: PricingCopy = {
  title: 'Pricing',
  description: `Straightforward pricing for ObjectOS, ${positioning.en.descriptor}. Pay for AI seats only; viewers and non-AI users are free.`,
  intro:
    'Start on the free plan and upgrade when you need more. Paid plans are billed per AI seat: you pay for the people who use AI, while viewers and non-AI users stay free. Prefer to run it yourself? ObjectOS Community is the open-source runtime and Console, self-hosted and free under Apache-2.0: bring your own AI through MCP, author metadata as source files, and review changes as diffs. ObjectStack is the open protocol it runs. ObjectOS Cloud and Enterprise add hosting and multi-environment operations, the in-app AI Build and Ask experience, SSO, and commercial support.',
  billingNote:
    'Prices are in USD per AI seat. The headline price is billed annually (about two months free); monthly billing is also available. Cancel anytime. Exact quotas are shown in the app and at checkout. ObjectOS Cloud is Free and Team. Business (SSO and AI governance on Cloud, $45 per AI seat per month billed annually, $54 monthly) and Business Self-Managed (a single-node license for 10–25 AI seats at $540 per AI seat per year, bring your own model or key) are contract options under ObjectOS Enterprise — contact sales. Beyond a single node, Enterprise is priced by volume, with offline and invoice payment.',
  plans: [
    {
      name: 'Community',
      price: 'Free',
      cadence: 'self-hosted',
      tagline: 'The open-source runtime and Console, on your own infrastructure.',
      features: [
        'Apache-2.0, free forever — no seats, no license key',
        'Runtime, Console, permissions and sharing, audit',
        'AI through MCP — bring your own model',
        'Every protocol capability of ObjectStack',
        'Docker image or npm create objectstack@latest; community support',
      ],
      cta: 'Run it yourself',
      ctaHref: COMMUNITY,
    },
    {
      name: 'Free',
      price: '$0',
      cadence: 'forever',
      tagline: 'For evaluating and small personal projects on ObjectOS Cloud.',
      features: [
        'Free viewers and non-AI users',
        'AI through MCP — bring your own model; 20 requests / min and 1,000 / day per environment',
        'Daily in-app AI trial',
        '7-day audit retention',
      ],
      cta: 'Get started',
      ctaHref: GET_STARTED,
    },
    {
      name: 'Team',
      price: '$20',
      cadence: 'per AI seat / month',
      billedNote: 'billed annually',
      altPrice: '$24 billed monthly',
      tagline: 'For teams building and sharing apps together.',
      features: [
        'In-app AI Builder and Ask',
        'Bundled AI credits',
        'Custom domains',
        'Row and field-level permissions',
        '30-day audit retention',
      ],
      cta: 'Get started',
      ctaHref: GET_STARTED,
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      cadence: 'contact sales',
      tagline: 'For organizations that need SSO and AI governance, or ObjectOS on their own infrastructure — from a single node to air-gapped clusters.',
      features: [
        'Self-managed on your own infrastructure, including air-gapped',
        'Business — SSO and AI governance on Cloud, by contract: $45 / AI seat / mo billed annually, $54 monthly',
        'Business Self-Managed — single-node entry: 10–25 AI seats, $540 / AI seat / yr, bring your own model',
        'Volume AI-seat pricing',
        'SCIM, compliance attestations',
        'Clustering / HA / multi-node',
        'SLA + dedicated support',
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
  description: `ObjectOS 是${positioning['zh-Hans'].descriptor}，按 AI 席位定价：只为使用 AI 的人付费，查看者与非 AI 用户免费。`,
  intro:
    '从免费版开始，需要更多时再升级。付费套餐按 AI 席位计费——只为真正使用 AI 的人付费；查看者与非 AI 用户免费。想自己运行？ObjectOS 社区版是开源的运行时与 Console，自托管、免费，采用 Apache-2.0：经 MCP 自带 AI，以源码方式编写元数据并审阅 diff。ObjectStack 是它运行的开放协议。ObjectOS 云端版与企业版在此之上增加托管与多环境运维、产品内 AI Build 与 Ask、SSO 和商业支持。',
  billingNote:
    '价格以美元计，按 AI 席位计费。标价为年付价（约省两个月）；也可选择月付。可随时取消。具体配额在应用内和结账时显示。ObjectOS 云端版包含免费版与团队版。商业版（云端上的 SSO 与 AI 治理，每 AI 席每月 $45 按年付，月付 $54）与商业版自管（Business Self-Managed，单节点许可，10–25 个 AI 席位，每 AI 席每年 $540，自带模型或密钥）是 ObjectOS 企业版下的合同选项——请联系销售。单节点以上的企业版按量定价，支持线下与发票付款。',
  plans: [
    {
      name: '社区版',
      price: '免费',
      cadence: '自托管',
      tagline: '开源的运行时与 Console，部署在你自己的基础设施上。',
      features: [
        'Apache-2.0，永久免费——无席位、无许可证密钥',
        '运行时、Console、权限与共享、审计',
        'AI 经 MCP — 自带模型',
        'ObjectStack 协议的全部能力',
        'Docker 镜像或 npm create objectstack@latest；社区支持',
      ],
      cta: '自己运行',
      ctaHref: COMMUNITY,
    },
    {
      name: '免费版',
      price: '$0',
      cadence: '永久免费',
      tagline: '用于在 ObjectOS 云端评估和小型个人项目。',
      features: [
        '查看者与非 AI 用户免费',
        'AI 经 MCP — 自带模型；每环境每分钟 20 次、每天 1,000 次请求',
        '界面内 AI:每日试用',
        '7 天审计留存',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
    },
    {
      name: '团队版',
      price: '$20',
      cadence: '每 AI 席 / 月',
      billedNote: '按年付',
      altPrice: '月付 $24',
      tagline: '面向共同搭建与共享应用的团队。',
      features: [
        '界面内 AI:搭建应用 + 数据问询',
        'AI 额度',
        '自定义域名',
        '行/字段级权限',
        '30 天审计留存',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
      highlight: true,
    },
    {
      name: '企业版',
      price: '定制',
      cadence: '联系销售',
      tagline: '面向需要 SSO 与 AI 治理、或在自己基础设施上运行 ObjectOS 的组织——从单节点到离线隔离集群。',
      features: [
        '自管部署在你自己的基础设施上，含离线隔离（air-gap）',
        '商业版——云端上的 SSO 与 AI 治理，按合同：每 AI 席每月 $45 按年付，月付 $54',
        '商业版自管——单节点入门选项：10–25 个 AI 席位、每 AI 席每年 $540、自带模型',
        'AI 席位批量定价',
        'SCIM、合规鉴证',
        '集群 / HA / 多节点',
        'SLA + 专属支持',
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
