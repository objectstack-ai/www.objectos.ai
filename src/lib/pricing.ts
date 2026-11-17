import { s2t } from './zhconvert';
import type { Locale } from './i18n';
import { CLOUD_SIGNUP_URL } from './positioning';
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
  /** A secondary text link under the CTA, e.g. the free Developer Edition. */
  secondaryLink?: { label: string; href: string };
  highlight?: boolean;
}

/**
 * One cell of the edition comparison. `mark` draws ✓ (`yes`) or — (`no`)
 * with a spoken label, or the grey "In development" chip (`dev`); `text` is the qualifier beside it, or the whole cell
 * when there is no mark.
 */
export interface ComparisonCell {
  mark?: 'yes' | 'no' | 'dev';
  text?: string;
}

/**
 * One row of the Community | ObjectOS Enterprise comparison. `id` is stable
 * across locales, so a row the maintainer re-rules (wording, or which column
 * holds it) is found by id in both copies.
 */
export interface ComparisonRow {
  id: string;
  feature: string;
  /** A marketing page slug the feature name links to, resolved per locale. */
  link?: string;
  community: ComparisonCell;
  enterprise: ComparisonCell;
}

/** A roadmap row: an Enterprise feature that has not shipped, no date. */
export interface RoadmapRow {
  id: string;
  feature: string;
  status: 'soon' | 'dev';
}

/** A run of rows under an optional sub-heading row. */
export interface ComparisonGroup {
  heading?: string;
  rows: ComparisonRow[];
}

/**
 * The comparison table under the Self-hosted cards, in the maintainer's
 * short wording and order (2026-11-17: price, then what both editions have,
 * then what Enterprise adds; one line per row, ✓ / — or a few words). Every
 * shipped row is sourced from the docs edition matrix and licensing pages
 * (docs.objectos.ai/docs/editions/compare, /docs/editions/license,
 * /docs/deploy/licensing, /docs/deploy/air-gapped, /docs/configure/mcp,
 * /docs/configure/permissions/hierarchy-visibility, /docs/operate/audit-logs).
 * Building apps is the `ai-build` row: the agent writes metadata in the
 * repository and os verify checks it. Building through MCP (`mcp-build`) is
 * in development for both editions (maintainer, 2026-11-17); today the MCP
 * build tools are Cloud-only. Customer-managed keys cover secrets only
 * (/docs/deploy/licensing). Single sign-on is not on the table or the cards
 * (maintainer, 2026-11-17): Enterprise turns SCIM on by default, so the row
 * is SCIM only, and Community's — means "not on by default and supported".
 * Multiple organizations on one deployment: an open-source plugin you
 * integrate yourself on Community, licensed and supported on Enterprise
 * (maintainer, 2026-11-17). `roadmap` holds what has not shipped: "Coming soon",
 * Enterprise features in the product but not yet in the docs, and "In
 * development", roadmap items (two of them are the ones the
 * connect-existing-systems page lists); all are published with no date
 * (maintainer, 2026-11-17), and none says external MCP calls are in the AI
 * audit today. The two "Connect existing systems" rows link to that page.
 */
export interface PricingComparison {
  title: string;
  featureHeader: string;
  communityHeader: string;
  enterpriseHeader: string;
  /** Spoken labels for the ✓ and — marks; the visible status chips. */
  yesLabel: string;
  noLabel: string;
  soonLabel: string;
  devLabel: string;
  groups: ComparisonGroup[];
  /**
   * The second, smaller table under the main one, with an Enterprise column
   * only: what has not shipped, each "Coming soon" or "In development".
   */
  roadmap: { title: string; rows: RoadmapRow[] };
  footer: string;
  footerLinkLabel: string;
  footerHref: string;
}

/** One deployment tab of the pricing page: its own intro, plans and billing note. */
export interface PricingTab {
  /** The switch label: "ObjectOS Cloud", "Self-hosted". */
  label: string;
  intro: string;
  billingNote: string;
  plans: PricingPlan[];
  /** The edition comparison under the cards (Self-hosted only). */
  comparison?: PricingComparison;
}

export interface PricingCopy {
  title: string;
  description: string;
  /** Optional limited-time promotional banner shown above the plans. */
  promo?: string;
  /** Accessible name of the Cloud / Self-hosted switch. */
  switchLabel: string;
  /**
   * The two tabs, both rendered into the static page. `cloud` is the default;
   * `selfHosted` opens at `#self-hosted` (src/components/Pricing.astro).
   */
  tabs: { cloud: PricingTab; selfHosted: PricingTab };
  morNote: string;
  refundsLabel: string;
}

// CTA targets. The Free and Team buttons open the ObjectOS Cloud sign-up page;
// Enterprise opens the locale's /contact/ page (#397), which names sales@ —
// the address the public licence page (docs.objectos.ai/docs/editions/license)
// names for "contact sales" on Enterprise and OEM terms — beside support@, the
// billing and refunds address. Enterprise shows no price and no buy button: it
// is sold by contract only (cloud#3844 D9, cloud#3583).
const GET_STARTED = CLOUD_SIGNUP_URL;
const CONTACT = (locale: Locale): string => CONTACT_URL[locale];
// ObjectOS Community has no checkout: its button goes to the objectstack
// deployment docs (the runtime image and `os start` live in that repository).
const COMMUNITY = 'https://objectstack.ai/docs/deployment';
const COMPARE_DOCS = 'https://docs.objectos.ai/docs/editions/compare';
// www and the Cloud have no Developer Edition sign-up page of their own; the
// docs section says who can open one and how.
const DEVELOPER_EDITION = 'https://docs.objectos.ai/docs/editions/compare#developer-edition';

const yes = (text?: string): ComparisonCell => ({ mark: 'yes', text });
const no = (text?: string): ComparisonCell => ({ mark: 'no', text });
const text = (t: string): ComparisonCell => ({ text: t });
const dev: ComparisonCell = { mark: 'dev' };

// Prices/quotas mirror the product's source of truth:
// cloud `packages/service-cloud/src/plan-entitlements.ts` (PLAN_PRICING +
// PLAN_MATRIX) and the in-app SDUI pricing page; see ADR-0023. Per-seat,
// Airtable-aligned:
// the headline is the annual-billed price; monthly is shown as the alt price.
const pricingEn: PricingCopy = {
  title: 'Pricing',
  description:
    "ObjectOS pricing: Community is free and open source, Cloud is free or billed per AI seat, and Enterprise is licensed per AI user. People who don't use the in-app AI are free.",
  switchLabel: 'Deployment',
  tabs: {
    cloud: {
      label: 'ObjectOS Cloud',
      intro:
        "ObjectOS Cloud is ObjectOS hosted for you: sign up and build in the browser, with nothing to install. Start free; on Team you pay per AI seat, and everyone who doesn't use the in-app AI is free.",
      billingNote:
        'Prices in USD. Annual billing saves about two months; cancel anytime, and your data stays. Cloud has no Enterprise plan — for a private deployment, see Self-hosted.',
      plans: [
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
      ],
    },
    selfHosted: {
      label: 'Self-hosted',
      intro:
        'Run ObjectOS on your own servers. ObjectOS Community is open source and free; ObjectOS Enterprise is the licensed edition, sold by annual contract.',
      billingNote:
        "Enterprise is priced per AI user, with a 25-user minimum, billed annually by invoice; there is no public price. People who don't use the in-app AI are free; an agent that connects over MCP with its own API key counts as one AI user. No per-node fees; perpetual licenses are available; if a subscription ends, it falls back to Community with your data intact.",
      plans: [
        {
          name: 'Community',
          price: 'Free',
          cadence: 'self-hosted',
          tagline: 'The open-source edition: build, run and self-host your apps for free.',
          features: [
            'Apache-2.0, free forever, no license key',
            'Build apps and ask your data with your own AI',
            'Community support',
          ],
          cta: 'Run it yourself',
          ctaHref: COMMUNITY,
        },
        {
          name: 'ObjectOS Enterprise',
          price: 'Contact sales',
          tagline: 'For organizations that want the in-app AI and enterprise controls on their own infrastructure.',
          features: [
            'Everything in Community, plus the in-app AI (preview) and AI governance',
            'SCIM provisioning on by default, with our support; a SCIM console is coming soon',
            'Standard support; priority and SLA by contract',
          ],
          cta: 'Contact sales',
          ctaHref: CONTACT,
          secondaryLink: { label: 'Try the free Developer Edition', href: DEVELOPER_EDITION },
        },
      ],
      comparison: {
        title: 'Community and ObjectOS Enterprise compared',
        featureHeader: 'Feature',
        communityHeader: 'Community',
        enterpriseHeader: 'ObjectOS Enterprise',
        yesLabel: 'Included',
        noLabel: 'Not included',
        soonLabel: 'Coming soon',
        devLabel: 'In development',
        groups: [
          {
            rows: [
              {
                id: 'price',
                feature: 'Price',
                community: text('Free (Apache-2.0)'),
                enterprise: text('Per AI user, yearly, 25 minimum'),
              },
            ],
          },
          {
            heading: 'In both editions',
            rows: [
              {
                id: 'data-modeling',
                feature: 'Data modeling: objects, fields, relationships, formulas, validation',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'app-ui',
                feature: 'App UI: views, forms, pages, buttons',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'dashboards-reports',
                feature: 'Dashboards and reports',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'packages',
                feature: 'Packages, templates and marketplace',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'integration',
                feature: 'REST API, webhooks, email and notifications',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'localization',
                feature: 'Multiple languages',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'ai-build',
                feature: 'Build apps with your own AI: metadata in your repo, checked by os verify',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'mcp-build',
                feature: 'Build apps with your own AI through MCP',
                community: dev,
                enterprise: dev,
              },
              {
                id: 'mcp-ask',
                feature: 'Ask your data with your own AI over MCP',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'record-security',
                feature: 'Record- and field-level security',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'audit',
                feature: 'Audit log and field history',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'automation',
                feature: 'Approvals and scheduled flows',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'federation',
                feature: 'Connect an existing database (read-only by default)',
                link: 'connect-existing-systems',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'sync-in',
                feature: 'One-way sync from external systems',
                link: 'connect-existing-systems',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'offline',
                feature: 'Offline operation',
                community: yes(),
                enterprise: yes('(air-gap license, by contract)'),
              },
              {
                id: 'high-availability',
                feature: 'High availability',
                community: text('One node + backup and restore'),
                enterprise: text('One node + backup and restore'),
              },
              {
                id: 'support',
                feature: 'Support',
                community: text('Community'),
                enterprise: text('Standard; priority and SLA by contract'),
              },
            ],
          },
          {
            heading: 'Enterprise adds',
            rows: [
              {
                id: 'in-app-ai',
                feature: 'In-app AI Builder and Ask',
                community: no(),
                enterprise: yes('(preview)'),
              },
              {
                id: 'ai-governance',
                feature: 'AI governance: call audit, permission checks, field masking',
                community: no(),
                enterprise: yes(),
              },
              {
                id: 'hierarchy-security',
                feature: 'Visibility by org hierarchy',
                community: no(),
                enterprise: yes(),
              },
              {
                id: 'scim',
                feature: 'SCIM provisioning on by default, with our support',
                community: no(),
                enterprise: yes(),
              },
              {
                id: 'multi-org',
                feature: 'Multiple organizations on one deployment',
                community: text('Open-source plugin, integrate it yourself'),
                enterprise: text('Licensed and supported'),
              },
              {
                id: 'customer-managed-keys',
                feature: 'Customer-managed keys for secrets',
                community: no(),
                enterprise: yes(),
              },
            ],
          },
        ],
        roadmap: {
          title: 'Enterprise roadmap',
          rows: [
            { id: 'audit-export', feature: 'Audit export and SIEM streaming', status: 'soon' },
            { id: 'access-policy-console', feature: 'Access-policy console', status: 'soon' },
            { id: 'ai-tracing-reports', feature: 'AI call tracing and governance reports', status: 'soon' },
            { id: 'ai-usage-inventory', feature: 'AI usage inventory', status: 'soon' },
            { id: 'ai-write-approval', feature: 'AI writes approved by risk', status: 'soon' },
            { id: 'scim-console', feature: 'SCIM console', status: 'soon' },
            { id: 'data-markings', feature: 'Data markings and purpose limits', status: 'dev' },
            { id: 'record-lineage', feature: 'Record-level lineage', status: 'dev' },
            { id: 'ai-workforce-console', feature: 'AI workforce console', status: 'dev' },
            { id: 'external-ai-approval', feature: "A person approves an external AI's irreversible actions", status: 'dev' },
            { id: 'multiple-replicas', feature: 'Multiple replicas', status: 'dev' },
          ],
        },
        footer: 'The full matrix is in the docs:',
        footerLinkLabel: 'Compare editions',
        footerHref: COMPARE_DOCS,
      },
    },
  },
  morNote:
    'Payments and billing are securely handled by our reseller and Merchant of Record, Paddle.com. Applicable sales tax or VAT is calculated at checkout.',
  refundsLabel: 'See our refund and cancellation policy',
};

const pricingZhHans: PricingCopy = {
  title: '定价',
  description:
    'ObjectOS 定价：Community 开源免费；Cloud 有免费方案，付费方案按 AI 席位计费；ObjectOS 企业版按 AI 用户数授权。不使用产品内 AI 的人免费。',
  switchLabel: '部署方式',
  tabs: {
    cloud: {
      label: 'ObjectOS Cloud',
      intro:
        'ObjectOS Cloud 是我们为你托管的 ObjectOS：注册后直接在浏览器里搭建，无需安装。从免费方案开始；Team 方案按 AI 席位计费，不使用产品内 AI 的人免费。',
      billingNote:
        '价格以美元计。年付约省两个月；可随时取消，数据保留。Cloud 没有企业版方案——需要私有部署，请看「私有部署」页签。',
      plans: [
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
      ],
    },
    selfHosted: {
      label: '私有部署',
      intro:
        '在你自己的服务器上运行 ObjectOS。ObjectOS Community 开源免费；ObjectOS 企业版（私有部署）是需要许可的版本，按年度合同销售。',
      billingNote:
        'ObjectOS 企业版按 AI 用户数计价，最低 25 人，按年开票付款，不公开报价。不使用产品内 AI 的人免费；以自己的 API 密钥经 MCP 接入的 Agent 计为一个 AI 用户。不按节点收费；可买永久许可证；订阅到期回落为 Community，数据照常可用。',
      plans: [
        {
          name: 'Community',
          price: '免费',
          cadence: '自托管',
          tagline: '开源版本：免费搭建、运行并自托管你的应用。',
          features: ['Apache-2.0，永久免费，无需许可证密钥', '用你自己的 AI 搭建应用、经 MCP 问数据', '社区支持'],
          cta: '自己运行',
          ctaHref: COMMUNITY,
        },
        {
          name: 'ObjectOS 企业版',
          price: '联系销售',
          tagline: '面向要在自己基础设施上使用产品内 AI 与企业级管控的组织。',
          features: [
            'Community 的全部能力，另加产品内 AI（预览版）与 AI 治理',
            'SCIM 用户同步默认开启，享官方支持；SCIM 管理台即将发布',
            '标准支持；优先支持与 SLA 按合同提供',
          ],
          cta: '联系销售',
          ctaHref: CONTACT,
          secondaryLink: { label: '免费试用开发者版', href: DEVELOPER_EDITION },
        },
      ],
      comparison: {
        title: 'Community 与 ObjectOS 企业版对比',
        featureHeader: '功能',
        communityHeader: 'Community',
        enterpriseHeader: 'ObjectOS 企业版',
        yesLabel: '包含',
        noLabel: '不包含',
        soonLabel: '即将发布',
        devLabel: '开发中',
        groups: [
          {
            rows: [
              {
                id: 'price',
                feature: '价格',
                community: text('免费（Apache-2.0）'),
                enterprise: text('按 AI 用户年付，25 人起'),
              },
            ],
          },
          {
            heading: '两个版本都有',
            rows: [
              {
                id: 'data-modeling',
                feature: '数据建模：对象、字段、关系、公式、校验',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'app-ui',
                feature: '应用界面：视图、表单、页面、按钮',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'dashboards-reports',
                feature: '仪表盘与报表',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'packages',
                feature: '应用包、模板与市场',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'integration',
                feature: 'REST API、Webhook、邮件与通知',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'localization',
                feature: '多语言',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'ai-build',
                feature: '用你自己的 AI 搭建应用：在代码仓库里写元数据，os verify 校验',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'mcp-build',
                feature: '用你自己的 AI 经 MCP 搭建应用',
                community: dev,
                enterprise: dev,
              },
              {
                id: 'mcp-ask',
                feature: '用你自己的 AI 经 MCP 问数据',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'record-security',
                feature: '记录级、字段级安全',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'audit',
                feature: '审计日志与字段历史',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'automation',
                feature: '审批与定时流程',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'federation',
                feature: '直连现有数据库（默认只读）',
                link: 'connect-existing-systems',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'sync-in',
                feature: '外部系统单向同步',
                link: 'connect-existing-systems',
                community: yes(),
                enterprise: yes(),
              },
              {
                id: 'offline',
                feature: '离线运行',
                community: yes(),
                enterprise: yes('（离线许可，按合同）'),
              },
              {
                id: 'high-availability',
                feature: '高可用',
                community: text('单节点 + 备份恢复'),
                enterprise: text('单节点 + 备份恢复'),
              },
              {
                id: 'support',
                feature: '支持',
                community: text('社区'),
                enterprise: text('标准；优先与 SLA 按合同'),
              },
            ],
          },
          {
            heading: '企业版增加',
            rows: [
              {
                id: 'in-app-ai',
                feature: '产品内 AI Builder 与问数据',
                community: no(),
                enterprise: yes('（预览）'),
              },
              {
                id: 'ai-governance',
                feature: 'AI 治理：调用审计、权限校验、敏感字段脱敏',
                community: no(),
                enterprise: yes(),
              },
              {
                id: 'hierarchy-security',
                feature: '按组织架构控制可见范围',
                community: no(),
                enterprise: yes(),
              },
              {
                id: 'scim',
                feature: 'SCIM 用户同步默认开启，享官方支持',
                community: no(),
                enterprise: yes(),
              },
              {
                id: 'multi-org',
                feature: '多组织（一个部署跑多个组织）',
                community: text('开源插件，需自行集成'),
                enterprise: text('授权并提供支持'),
              },
              {
                id: 'customer-managed-keys',
                feature: '客户自管密钥（用于机密信息）',
                community: no(),
                enterprise: yes(),
              },
            ],
          },
        ],
        roadmap: {
          title: '企业版路线',
          rows: [
            { id: 'audit-export', feature: '审计导出与 SIEM 推送', status: 'soon' },
            { id: 'access-policy-console', feature: '访问策略控制台', status: 'soon' },
            { id: 'ai-tracing-reports', feature: 'AI 调用追踪与治理报告', status: 'soon' },
            { id: 'ai-usage-inventory', feature: 'AI 用量清单', status: 'soon' },
            { id: 'ai-write-approval', feature: 'AI 写入按风险审批', status: 'soon' },
            { id: 'scim-console', feature: 'SCIM 管理台', status: 'soon' },
            { id: 'data-markings', feature: '数据密级标签与用途限制', status: 'dev' },
            { id: 'record-lineage', feature: '记录级血缘', status: 'dev' },
            { id: 'ai-workforce-console', feature: 'AI 员工控制台', status: 'dev' },
            { id: 'external-ai-approval', feature: '外部 AI 不可逆操作须真人批准', status: 'dev' },
            { id: 'multiple-replicas', feature: '多副本', status: 'dev' },
          ],
        },
        footer: '完整对照表见文档：',
        footerLinkLabel: '版本对比',
        footerHref: COMPARE_DOCS,
      },
    },
  },
  morNote:
    '支付与计费由我们的经销商及 Merchant of Record（销售记录商）Paddle.com 安全处理。适用的销售税或增值税在结账时计算。',
  refundsLabel: '查看我们的退款与取消政策',
};

const planToHant = (plan: PricingPlan): PricingPlan => ({
  ...plan,
  name: s2t(plan.name),
  price: s2t(plan.price),
  cadence: plan.cadence ? s2t(plan.cadence) : undefined,
  billedNote: plan.billedNote ? s2t(plan.billedNote) : undefined,
  altPrice: plan.altPrice ? s2t(plan.altPrice) : undefined,
  tagline: s2t(plan.tagline),
  features: plan.features.map(s2t),
  cta: s2t(plan.cta),
  secondaryLink: plan.secondaryLink
    ? { label: s2t(plan.secondaryLink.label), href: plan.secondaryLink.href }
    : undefined,
});

const cellToHant = (cell: ComparisonCell): ComparisonCell => ({
  ...cell,
  text: cell.text ? s2t(cell.text) : undefined,
});

const rowToHant = (row: ComparisonRow): ComparisonRow => ({
  ...row,
  feature: s2t(row.feature),
  community: cellToHant(row.community),
  enterprise: cellToHant(row.enterprise),
});

const groupToHant = (g: ComparisonGroup): ComparisonGroup => ({
  heading: g.heading ? s2t(g.heading) : undefined,
  rows: g.rows.map(rowToHant),
});

const comparisonToHant = (c: PricingComparison): PricingComparison => ({
  title: s2t(c.title),
  featureHeader: s2t(c.featureHeader),
  communityHeader: s2t(c.communityHeader),
  enterpriseHeader: s2t(c.enterpriseHeader),
  yesLabel: s2t(c.yesLabel),
  noLabel: s2t(c.noLabel),
  soonLabel: s2t(c.soonLabel),
  devLabel: s2t(c.devLabel),
  groups: c.groups.map(groupToHant),
  roadmap: {
    title: s2t(c.roadmap.title),
    rows: c.roadmap.rows.map((r) => ({ ...r, feature: s2t(r.feature) })),
  },
  footer: s2t(c.footer),
  footerLinkLabel: s2t(c.footerLinkLabel),
  footerHref: c.footerHref,
});

const tabToHant = (tab: PricingTab): PricingTab => ({
  label: s2t(tab.label),
  intro: s2t(tab.intro),
  billingNote: s2t(tab.billingNote),
  plans: tab.plans.map(planToHant),
  comparison: tab.comparison ? comparisonToHant(tab.comparison) : undefined,
});

const toHant = (p: PricingCopy): PricingCopy => ({
  title: s2t(p.title),
  description: s2t(p.description),
  promo: p.promo ? s2t(p.promo) : undefined,
  switchLabel: s2t(p.switchLabel),
  tabs: { cloud: tabToHant(p.tabs.cloud), selfHosted: tabToHant(p.tabs.selfHosted) },
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
