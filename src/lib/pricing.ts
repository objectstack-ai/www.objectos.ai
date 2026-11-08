import { s2t } from './zhconvert';
import type { Locale } from './i18n';
import { CLOUD_SIGNUP_URL, positioning } from './positioning';
import { CONTACT_URL } from './contact';

export interface PricingPlan {
  name: string;
  price: string; // headline: "Free", "$0", "$20", or "Contact sales" where there is no public price
  cadence?: string; // "self-hosted", "forever", "per seat / month", "contact sales"
  billedNote?: string; // "billed annually"
  altPrice?: string; // "$24 billed monthly"
  tagline: string;
  features: string[];
  cta: string;
  /**
   * A URL, or a function of the page's locale for a target that has one per
   * locale (/contact/). The non-zh locales share the English copy object, so a
   * per-locale target cannot be baked into the copy; `planHref` resolves it.
   */
  ctaHref: string | ((locale: Locale) => string);
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

// CTA targets. The Free and Team buttons open the ObjectOS Cloud sign-up page;
// Enterprise opens the locale's /contact/ page (#397), which names sales@ —
// the address the public licence page (docs.objectos.ai/docs/resources/license)
// names for "contact sales" on Enterprise and OEM terms — beside support@, the
// billing and refunds address. Enterprise shows no price and no buy button: it
// is sold by contract only (cloud#3844 D9, cloud#3583).
const GET_STARTED = CLOUD_SIGNUP_URL;
const CONTACT = (locale: Locale): string => CONTACT_URL[locale];
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
  description: `Straightforward pricing for ${positioning.en.descriptor}. Pay for AI seats only; viewers and non-AI users are free.`,
  intro:
    'Start on the free plan and upgrade when you need more. Paid plans are billed per AI seat: you pay for the people who use AI, while viewers and non-AI users stay free. Prefer to run it yourself? ObjectOS Community is the open-source runtime and Console, self-hosted and free under Apache-2.0: bring your own AI through MCP, author metadata as source files, and review changes as diffs. ObjectStack is the open protocol it runs. ObjectOS Cloud and Enterprise add hosting or a licensed private deployment, the in-app AI Build and Ask experience, and commercial support; single sign-on with your own identity provider is open source and free. On Cloud, one organization has one environment and many apps; complex apps use source-level development (os dev + Git) and package install.',
  billingNote:
    'Prices are in USD per AI seat. The headline price is billed annually (about two months free); monthly billing is also available. Cancel anytime. Exact quotas are shown in the app and at checkout. ObjectOS Cloud is Free and Team. ObjectOS Enterprise is one edition, a private deployment on your own infrastructure, and has no public price: it is licensed per AI user per year, with a 25-user minimum, by contract with invoice payment — contact sales.',
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
        'Weekly in-app AI allowance',
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
        'Approvals',
        'Scheduled flows',
        '20 GB storage',
      ],
      cta: 'Get started',
      ctaHref: GET_STARTED,
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Contact sales',
      tagline: 'For organizations that run ObjectOS on their own infrastructure, including air-gapped, with AI governance and hierarchy-based record access.',
      features: [
        'One edition: a private deployment on your own infrastructure, including air-gapped',
        'Every feature included; bring your own model or key',
        'Licensed per AI user, 25-user minimum, by contract',
        'SCIM 2.0 provisioning, enabled by default',
        'High availability (HA): in development, not yet offered',
        'Priority and SLA support by contract',
      ],
      cta: 'Contact sales',
      ctaHref: CONTACT,
    },
  ],
  morNote:
    'Payments and billing are securely handled by our reseller and Merchant of Record, Paddle.com. Applicable sales tax or VAT is calculated at checkout.',
  refundsLabel: 'See our refund and cancellation policy',
};

const pricingZhHans: PricingCopy = {
  title: '定价',
  description: `${positioning['zh-Hans'].descriptor} 的定价：按 AI 席位计费，只为使用 AI 的人付费，查看者与非 AI 用户免费。`,
  intro:
    '从 Free（免费方案）开始，需要更多时再升级。付费套餐按 AI 席位计费——只为真正使用 AI 的人付费；查看者与非 AI 用户免费。想自己运行？ObjectOS Community（开源自托管）是开源的运行时与 Console，自托管、免费，采用 Apache-2.0：经 MCP 自带 AI，以源码方式编写元数据并审阅 diff。ObjectStack 是它运行的开放协议。ObjectOS Cloud（托管版）与 Enterprise（自管版）在此之上增加托管或带许可的私有部署、产品内 AI Build 与 Ask，以及商业支持；对接你自己身份提供商的单点登录是开源能力，免费提供。在 Cloud 上，一个组织对应一个环境、多个应用；复杂应用使用源码级开发（os dev + Git）和包安装。',
  billingNote:
    '价格以美元计，按 AI 席位计费。标价为年付价（约省两个月）；也可选择月付。可随时取消。具体配额在应用内和结账时显示。ObjectOS Cloud 包含 Free（免费）与 Team（团队）两个方案。ObjectOS Enterprise 只有一个版本，即部署在你自己基础设施上的私有部署，不公开报价：按 AI 用户数年付，最低 25 人起，通过合同购买、开票付款——请联系销售。',
  plans: [
    {
      name: 'Community',
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
      name: 'Free',
      price: '$0',
      cadence: '永久免费',
      tagline: '用于在 ObjectOS Cloud 上评估和小型个人项目。',
      features: [
        '查看者与非 AI 用户免费',
        'AI 经 MCP — 自带模型；每环境每分钟 20 次、每天 1,000 次请求',
        '界面内 AI:每周额度',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
    },
    {
      name: 'Team',
      price: '$20',
      cadence: '每 AI 席 / 月',
      billedNote: '按年付',
      altPrice: '月付 $24',
      tagline: '面向共同搭建与共享应用的团队。',
      features: [
        '界面内 AI:搭建应用 + 数据查询',
        'AI 额度',
        '审批',
        '定时流程',
        '20 GB 存储',
      ],
      cta: '开始使用',
      ctaHref: GET_STARTED,
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '联系销售',
      tagline: '面向在自己基础设施上运行 ObjectOS 的组织，含离线隔离部署，提供 AI 治理与按组织架构控制记录可见范围。',
      features: [
        '只有一个版本：部署在你自己基础设施上的私有部署，含离线隔离（air-gap）',
        '功能全部包含；自带模型或密钥',
        '按 AI 用户数授权，最低 25 人起，通过合同购买',
        '默认开启的 SCIM 2.0',
        '高可用（HA）：开发中，暂不提供',
        '优先支持与 SLA 支持按合同提供',
      ],
      cta: '联系销售',
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

/** A plan's CTA target on a page in `locale`. */
export const planHref = (plan: PricingPlan, locale: Locale): string =>
  typeof plan.ctaHref === 'function' ? plan.ctaHref(locale) : plan.ctaHref;

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
