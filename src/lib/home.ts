import { s2t } from './zhconvert';
import type { Locale } from './i18n';
import { positioning } from './positioning';

// What ObjectStack and ObjectOS are is stated once, in `./positioning` (the
// objectstack README's canonical lines, T1–T4, and the edition clause E1), and
// every locale's title, hero, lead, edition paragraph and proof chips below
// read from it. The eyebrow is `descriptor`, the three editions' short name,
// sentence-cased (the CSS uppercases it anyway). The hero lead is T2 alone and
// the edition paragraph — in the editions-and-comparison block since #411, the
// one place E1 appears on the page — is E1 verbatim; the check at the bottom
// of this file holds every locale to both. The meta `description` is
// T2 plus the edition sentence the security lead carries ("ObjectOS comes in
// three editions, …"), not T4: with T4 it ran 362 characters in en and a
// search snippet cut it off before the word ObjectOS (seat ruling on #335,
// the same call docs.objectos.ai made in objectos #299).
const sentenceCase = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
// The media note under the hero image is titled with T2's first sentence —
// "One executable business ontology" in each locale — read from positioning
// rather than spelled here, so it cannot drift from the canonical line.
const t2Lead = (t2: string): string => t2.split(/(?<=[.。])\s*/)[0].replace(/[.。]$/, '');

interface HomeCopy {
  title: string;
  description: string;
  eyebrow: string;
  hero: [string, string];
  /**
   * The line under the H1, in a business reader's words (#392): what AI
   * writes, what runs it, and what the reader gets — less to write, governed,
   * in their own environment. It is the lane's wording, not a canonical line,
   * so it is not read from `./positioning`; it must stay consistent with T2
   * (AI writes the definition, the runtime runs and governs it) and E1 (the
   * self-managed editions). No speed multiple here or anywhere on the page:
   * the advantage is stated as size and governability (AGENTS.md, "the wedge
   * is trust, not speed").
   */
  heroCategory: string;
  /**
   * "Five questions, answered first": the block directly under the hero. Five
   * question → answer rows a first-time business reader asks, each answer
   * within what the page's own sections, /ai/, /connect-existing-systems/ and
   * the trust center already state: the in-product AI's record changes wait
   * for the user's confirmation (not every agent's), and running in the
   * reader's environment with their own model is the self-hosted editions.
   */
  answersKicker: string;
  answersTitle: string;
  answers: { question: string; answer: string }[];
  /**
   * "Why there is less to write": two lanes (AI writes code / AI writes the
   * business definition), three steps each, then three size rows and one
   * sentence on what stays in the definition and what the runtime derives.
   * The first size row is a typical order of magnitude, the one the post
   * `business-app-in-16k-tokens` uses; the other two are measured, and
   * `lessMethod` says at which commits and over which files:
   *   hotcrm 94f8d04, `src/sales`, non-test `.ts`, without `translations/`
   *   and `data/`: 159 files, 28,456 lines (11 objects, 21 flow files, 4
   *   dashboards); objectstack e61af972, `examples/app-crm/src`: 30 files,
   *   2,189 lines.
   * Sizes only: no speed multiple and no build-time figure.
   */
  lessKicker: string;
  lessTitle: [string, string];
  lessLanes: [{ label: string; steps: [string, string, string] }, { label: string; steps: [string, string, string] }];
  lessSizeTitle: string;
  lessSizes: [
    { label: string; value: string; note: string },
    { label: string; value: string; note: string },
    { label: string; value: string; note: string },
  ];
  lessMethod: string;
  lessClosing: string;
  /** The block's link to the post that makes the argument. */
  lessLink: string;
  /** The first screen's one paragraph: T2, nothing else (the CTA row follows it). */
  heroLead: string;
  /**
   * The edition paragraph: E1 verbatim, asserted below for every locale. It
   * opens the editions-and-comparison block (#411), the one place E1 is on
   * the page; it sat under the hero's CTA row before that.
   */
  editionsCopy: string;
  primaryCta: string;
  secondaryCta: string;
  /**
   * Copy around the overview video. The video and channel URLs are identical
   * in every locale; only the wording around them is translated. The English
   * strings deliberately match the docs site's wording verbatim ("ObjectStack
   * in 90 Seconds", "More videos on YouTube") so the two sites do not diverge.
   * The `YouTube` CTA label itself is a brand name and is not translated — it
   * lives in the component, not here.
   */
  videoCaption: string;
  videoPlayLabel: string;
  videoMoreLink: string;
  /**
   * The words drawn on the video poster besides the title (see
   * `VideoEmbed.astro`): an eyebrow and a sub-line. Both quote the objectstack
   * README rather than the canonical lines in `./positioning`: the eyebrow is
   * its licence sentence ("the open stack — protocol … and the production
   * runtime, Apache-2.0"), the sub-line's tail is its size line ("Apps small
   * enough for AI to hold whole."), in the wording each locale's AI
   * paragraph gave that line before #411 retired the paragraph. The sub-line used to end "one context window":
   * that was the title of the proof chip that carried the 150k-token figure,
   * both retired by ruling Q5 on #209, and the README no longer says it; so
   * no token figure and no context-window framing here. The eyebrow's parts
   * are separated by " · ", which is where `VideoEmbed` lets it wrap. The
   * nouns use each locale's vocabulary from `./positioning`.
   */
  videoPosterEyebrow: string;
  videoPosterNote: string;
  proof: [string, string][];
  imageAlt: string;
  imageNoteTitle: string;
  imageNote: string;
  /**
   * Block 4, "how it connects to what you run" (#411): the positioning title
   * and copy, the definition-layer diagram (`existingSystems` …
   * `outcomeLabels`), the two capability cards below and the run recording,
   * merged into one section. The positioning copy is the page's one
   * statement of the mechanism; the diagram carries no body text of its own.
   */
  connectKicker: string;
  positioningTitle: [string, string];
  positioningCopy: string;
  /** The text link under the positioning copy, to the /[lang]/ontology/ pillar. */
  positioningLink: string;
  /**
   * Four cards: the business model (→ /data-modeling/), then the three ways
   * in that /connect-existing-systems/ describes, each linking its section
   * there: federation (live reads, read-only by default), one-way sync into
   * a read-only object, and write-back through a declared action and a
   * connector. No two-way sync, and nothing that page does not say.
   */
  capabilities: { title: string; copy: string }[];
  /**
   * Block 3, "AI in the product" (#411): three cards in business terms —
   * Ask with its source line, AI record edits that wait for the user's
   * confirmation, and the Builder — under one note that carries the
   * Enterprise preview label (#410). Only shipped behaviour: no accuracy
   * figure, no risk-based approval, no undo (cloud's external lines).
   */
  aiKicker: string;
  aiTitle: [string, string];
  aiNote: string;
  aiItems: { title: string; copy: string }[];
  /** The block's one developer link, to /[lang]/mcp/: MCP is not a card. */
  aiDeveloperLink: string;
  existingSystems: string;
  systemLabels: [string, string, string, string];
  connectModel: string;
  objectLayer: string;
  secureExecution: string;
  outcomes: string;
  outcomeLabels: [string, string, string];
  /**
   * "How business teams use it" (#359): three scenario cards that link into
   * /[lang]/use-cases/, in the order service, finance & procurement, sales
   * (MarketingHome.astro pairs them with the page's section ids by index).
   * Each card summarizes that section's scenario posts; nothing else.
   */
  useCasesKicker: string;
  useCasesTitle: [string, string];
  /** The section's link to the whole /use-cases/ page. */
  useCasesLink: string;
  /** The link line at the foot of each card. */
  useCaseCardLink: string;
  /** The secondary link under the cards, to the /templates/ catalog. */
  useCasesTemplatesLink: string;
  useCases: { title: string; copy: string }[];
  securityKicker: string;
  securityTitle: [string, string];
  securityCopy: string;
  securityItems: { title: string; copy: string }[];
  securityLink: string;
  insightsKicker: string;
  insightsTitle: string;
  insightsLink: string;
  closingKicker: string;
  closingTitle: string;
  closingCopy: string;
  /**
   * The closing row's first button, to ObjectOS Cloud sign-up
   * (`CLOUD_SIGNUP_URL`); then `closingUseCasesCta`, to /[lang]/use-cases/,
   * and `ui[locale].contactUs`, to /contact/ (#397). A business reader's
   * three next steps (#411); the developer path is one text link under them,
   * `closingDeveloperLink`, to /[lang]/agent-developer/.
   */
  closingCta: string;
  closingUseCasesCta: string;
  closingDeveloperLink: string;
  /** Block 6, editions and comparison (#411): E1 (`editionsCopy`), a pricing link, then the three comparison cards. */
  compareKicker: string;
  compareTitle: [string, string];
  /** The link under E1, to /[lang]/pricing/. */
  editionsPricingLink: string;
  compareLink: string;
  comparisons: { title: string; copy: string }[];
}

const zhHans: HomeCopy = {
  title: `ObjectOS · ${positioning['zh-Hans'].t1}`,
  description: `${positioning['zh-Hans'].t2}ObjectOS 有三个版本：${positioning['zh-Hans'].descriptor}。`,
  eyebrow: positioning['zh-Hans'].descriptor,
  hero: positioning['zh-Hans'].t1Hero,
  heroCategory: 'AI 只写业务定义，平台直接运行：写得少、管得住、装在你自己的环境。',
  heroLead: positioning['zh-Hans'].t2,
  answersKicker: '先说结论',
  answersTitle: '你最关心的五个问题，先给答案',
  answers: [
    { question: '新系统多久能做出来？', answer: 'AI 只写业务定义，平台直接运行；要写的内容少一到两个数量级。' },
    { question: '现有的系统要不要换？', answer: '不用换。接进来，AI 就能读懂现有的数据。' },
    { question: '员工要重新学吗？', answer: '不用。在常用的 AI 助手里直接问、直接办。' },
    { question: 'AI 会不会乱来？', answer: '以使用者本人的权限工作；产品内 AI 改数据先由本人确认，流程里的审批交给审批人。' },
    { question: '系统和数据在谁手里？', answer: '在你手里：可以装在你自己的环境，私有部署时模型由你选，内核 ObjectStack 开源。' },
  ],
  lessKicker: '为什么写得少',
  lessTitle: ['AI 只写业务定义，', '其余交给平台运行'],
  lessLanes: [
    { label: '通常的做法', steps: ['AI 写代码', '每个应用多出一堆新代码', '问题上线后才暴露'] },
    { label: 'ObjectOS 的做法', steps: ['AI 写业务定义', '平台直接运行', '边写边校验'] },
  ],
  lessSizeTitle: '同样是 CRM，要写多少',
  lessSizes: [
    { label: '传统手写的 CRM 代码库', value: '30 万–100 万+ 行', note: '典型量级，不是实测值' },
    { label: 'HotCRM 销售模块（开源）', value: '约 2.8 万行', note: '159 个文件、28,456 行：11 个对象、21 个流程文件、4 个仪表盘' },
    { label: '随运行时附带的参考 CRM', value: '2,189 行', note: '30 个文件：objectstack 仓库里的 examples/app-crm' },
  ],
  lessMethod: '后两行是实测值：HotCRM 取 hotcrm 提交 94f8d04 中 src/sales 下的非测试 .ts 文件，不含 translations/ 与 data/；参考 CRM 取 objectstack 提交 e61af972 中的 examples/app-crm/src。',
  lessClosing: '决定留在定义里；数据表、增删改查 API、列表页与详情页、权限检查、审计写入这些管道，由运行时推导出来。',
  lessLink: '阅读完整论证',
  editionsCopy: positioning['zh-Hans'].e1,
  primaryCta: '开始使用',
  secondaryCta: '了解工作原理',
  videoCaption: 'ObjectStack 90 秒总览',
  videoPlayLabel: '播放视频：ObjectStack 90 秒总览',
  videoMoreLink: '在 YouTube 上观看更多视频',
  videoPosterEyebrow: '开放协议与运行时 · APACHE-2.0',
  videoPosterNote: '数据模型 · 界面 · 流程 · 权限——小到 AI 能一次读全。',
  proof: [
    [positioning['zh-Hans'].t3[0], '运行时运行它'],
    [positioning['zh-Hans'].t3[1], 'AI 编写它'],
    [positioning['zh-Hans'].t3[2], 'Agent 操作它'],
    [positioning['zh-Hans'].t3[3], '普通的 ObjectStack 元数据；导出到开源运行时尚在计划中'],
  ],
  imageAlt: 'ObjectOS 连接业务数据、应用和 AI Agent 的产品示意图',
  imageNoteTitle: t2Lead(positioning['zh-Hans'].t2),
  imageNote: '正在连接应用、数据与 Agent',
  connectKicker: '它怎么接进你现有的系统',
  positioningTitle: ['你不迁移，', '你连接。'],
  positioningLink: '什么是可执行的业务本体',
  positioningCopy: '企业 AI 不需要又一次重建，也不需要更多不可审的生成代码。它需要一份 Agent 能写、人能审、运行时能治理的定义，把旧系统、新应用和 AI Agent 接在一起。你的对象与字段、关系、动作、权限、流程，以及 Agent 与工具定义，就是这份定义——你的业务本体：开放、带版本、归你所有，而不是锁在别人平台里的资产。',
  capabilities: [
    { title: '给 Agent 一个业务模型', copy: '把客户、订单、设备、工单和审批建模成对象，让 Agent 能准确读取、关联和操作。' },
    { title: '联邦接入：实时读取，先只读', copy: '把已经在跑的数据库或 OData 服务声明为外部数据源，把它的表绑定成对象。数据留在源头，每次读取都实时转发过去。联邦默认只读、尚在早期：写入要在数据源和对象两处有意开启。' },
    { title: '单向同步：拷贝成只读对象', copy: '由作业把数据单向拷贝进一个普通对象。成员能读、能做报表，但不能改：拉取是它唯一的写入方，每次运行都留下记录。' },
    { title: '通过声明的动作写回，没有双向同步', copy: '需要改动源系统时，由一个声明的动作通过连接器、用连接器自己的凭据调用它。本地副本不被编辑，下一次拉取把变化带回来；不自动写回，也不做冲突合并。' },
  ],
  aiKicker: '产品里的 AI',
  aiTitle: ['用自然语言提问、改数据、搭应用，', '来源看得见，改动由你确认。'],
  aiNote: '内置于 ObjectOS Cloud 与 ObjectOS 企业版（私有部署），后者为预览版。AI 以使用者本人的权限工作，看到的不会超过这个人本来能看到的。',
  aiItems: [
    { title: '问数：每个数字都标明来源', copy: '用自然语言问业务问题。每个答案都标明数字从哪来——哪个对象、哪些筛选条件、统计了什么、怎么分组——并附上背后记录的链接。它只读取提问者本人有权看到的数据。' },
    { title: 'AI 改数据，先等你确认', copy: '让 AI 新建或修改一条记录时，它先提出修改，并列出新旧值。你确认之前什么都不会保存，确认后以你本人的权限执行。产品内 AI 一次只改一条记录，不能删除记录，也不能批量修改。' },
    { title: 'AI 搭建应用', copy: '描述你要的应用或改动。内置 Builder 起草对象、字段、视图和流程；对已上线且已有记录的应用所做的变更会存为草稿，由人来发布。' },
  ],
  aiDeveloperLink: '开发者：通过 MCP 接入你自己的 Agent',
  existingSystems: '你的现有系统',
  systemLabels: ['CRM', 'ERP', '数据库', '自研系统'],
  connectModel: '连接与建模',
  objectLayer: '对象 · 权限 · 流程 · API · 审计',
  secureExecution: '安全执行',
  outcomes: '持续产生价值',
  outcomeLabels: ['业务应用', 'AI Agent', '自动化'],
  useCasesKicker: '业务团队怎么用',
  useCasesTitle: ['AI 为每个团队接手什么，', '哪些仍由人来确认'],
  useCasesLink: '查看全部使用场景',
  useCaseCardLink: '查看场景',
  useCasesTemplatesLink: '或者从应用模板开始',
  useCases: [
    { title: '客服', copy: 'AI 给工单分类、匹配知识库、起草带引用的回复；发出什么由客服确认，退款、赔偿类回复可由流程中的审批节点交主管审批后再发出。' },
    { title: '财务与采购', copy: 'AI 按政策和预算核对报销；接入供应商与交付数据后，可在采购审批前提示供应商风险；财务与采购看着证据审批。' },
    { title: '销售', copy: '销售用自然语言更新 CRM，AI 为下一次客户会议做准备；每条记录变更建议都等销售本人确认。' },
  ],
  securityKicker: '安全与治理',
  securityTitle: ['数据留在你的网络里，', 'AI 在权限边界内工作'],
  securityCopy: 'ObjectOS 企业版可以把 ObjectStack 应用部署并运营在你的基础设施中。业务数据、身份、审计日志和文件仍由你控制；AI Agent 通过受控工具访问对象，并继承登录用户已有的权限。',
  securityItems: [
    { title: '数据驻留', copy: '连接你的数据库和存储；业务记录、身份、审计日志和文件都留在那里。' },
    { title: '人和 AI 同一套权限', copy: 'Agent 以登录用户身份执行，遵守对象级、记录级和字段级权限，看不到用户本来无权看到的数据。ObjectOS 企业版还可以按组织架构控制记录的可见范围：本部门、本部门及下级部门，或本人及下属的记录。' },
    { title: '审批与审计', copy: 'AI 对已上线且已有记录的应用所做的变更存为草稿，由人来发布；流程中的审批节点把业务决定交给审批人。记录的读取、写入和权限变更都能写入审计日志；界面内 AI 每次工具调用的审计属于 ObjectOS 企业版的 AI 治理。' },
    { title: '部署在你的基础设施上', copy: 'ObjectOS 企业版在你的网络内运行：一个 Node.js 运行时，加上你的数据库、密钥和入口层。可以部署在 VPC 中，用 Docker 或自有平台运行在本地服务器上，也可以配合离线隔离许可证、用离线容器镜像运行在隔离网络中，接入本地模型和内部身份系统。' },
  ],
  securityLink: '了解安全与治理',
  insightsKicker: '最新洞察',
  insightsTitle: 'AI 编写软件的实践思考',
  insightsLink: '浏览全部文章',
  closingKicker: '下一步',
  closingTitle: '看看 AI 能为你的团队接手什么。',
  closingCopy: '在 ObjectOS Cloud 上免费开始，无需安装；看看客服、财务和销售团队怎么用；或者联系我们，聊聊部署在你自己的基础设施上。',
  closingCta: '免费开始',
  closingUseCasesCta: '查看使用场景',
  closingDeveloperLink: '开发者：把你的 Agent 指向 ObjectStack',
  compareKicker: '版本与对比',
  compareTitle: ['选择合适的版本，', '再看它和熟悉的工具有何不同'],
  editionsPricingLink: '比较版本与定价',
  compareLink: '阅读对比',
  comparisons: [
    { title: 'vs Airtable', copy: '真实数据库、服务端逻辑和运行时治理，不是表格式工作区。' },
    { title: 'vs Retool', copy: '业务逻辑是可审阅元数据，不是散落在屏幕里的 JavaScript。' },
    { title: 'vs Lovable & Bolt', copy: 'Agent 生成带 schema 和权限的受治理元数据，不是一次性代码库。' },
  ],
};

const en: HomeCopy = {
  title: `ObjectOS · ${positioning.en.t1}`,
  description: `${positioning.en.t2} ObjectOS comes in three editions, ${positioning.en.descriptor}.`,
  eyebrow: sentenceCase(positioning.en.descriptor),
  hero: positioning.en.t1Hero,
  heroCategory: 'AI writes only the business definition and the platform runs it: less to write, governed by default, deployed in your environment.',
  heroLead: positioning.en.t2,
  answersKicker: 'The short version',
  answersTitle: 'Your five questions, answered first',
  answers: [
    { question: 'How fast can we get a new system?', answer: 'AI writes only the business definition and the platform runs it; one to two orders of magnitude less to write.' },
    { question: 'Do we have to replace what we run?', answer: 'No. Connect it, and AI can read your existing data.' },
    { question: 'Do employees need retraining?', answer: 'No. They ask and act in the AI assistant they already use.' },
    { question: 'Will AI go off the rails?', answer: 'It works with the user’s own permissions; record changes by the in-product AI wait for that person’s confirmation, and approval steps in a flow go to the approver.' },
    { question: 'Who holds the system and the data?', answer: 'You do: it can run in your own environment, with the model you choose when you self-host, on an open-source core.' },
  ],
  lessKicker: 'Why there is less to write',
  lessTitle: ['AI writes only the business definition.', 'The platform runs the rest.'],
  lessLanes: [
    { label: 'The usual path', steps: ['AI writes code', 'A pile of new code for every app', 'Problems surface after go-live'] },
    { label: 'The ObjectOS path', steps: ['AI writes the business definition', 'The platform runs it', 'Validated as it is written'] },
  ],
  lessSizeTitle: 'A CRM, by how much has to be written',
  lessSizes: [
    { label: 'A traditional hand-written CRM codebase', value: '300k–1M+ lines', note: 'A typical order of magnitude, not a measurement' },
    { label: 'HotCRM sales module (open source)', value: 'about 28,000 lines', note: '159 files, 28,456 lines: 11 objects, 21 flow files, 4 dashboards' },
    { label: 'The reference CRM bundled with the runtime', value: '2,189 lines', note: '30 files: examples/app-crm in the objectstack repository' },
  ],
  lessMethod: 'The last two rows are measured: HotCRM at hotcrm commit 94f8d04, the non-test .ts files under src/sales, excluding translations/ and data/; the reference CRM at objectstack commit e61af972, examples/app-crm/src.',
  lessClosing: 'The decisions stay in the definition. The plumbing — tables, the CRUD API, list and detail pages, permission checks, audit writes — is derived by the runtime.',
  lessLink: 'Read the full argument',
  editionsCopy: positioning.en.e1,
  primaryCta: 'Get started',
  secondaryCta: 'See how it works',
  videoCaption: 'ObjectStack in 90 Seconds',
  videoPlayLabel: 'Play the video: ObjectStack in 90 Seconds',
  videoMoreLink: 'More videos on YouTube',
  videoPosterEyebrow: 'OPEN PROTOCOL & RUNTIME · APACHE-2.0',
  videoPosterNote: 'Data model · UI · workflows · permissions — small enough for AI to hold whole.',
  proof: [
    [positioning.en.t3[0], 'The runtime runs it'],
    [positioning.en.t3[1], 'AI writes it'],
    [positioning.en.t3[2], 'Agents operate it'],
    [positioning.en.t3[3], 'Ordinary ObjectStack metadata; export to the open runtime is planned'],
  ],
  imageAlt: 'ObjectOS connecting business data, applications, and AI agents',
  imageNoteTitle: t2Lead(positioning.en.t2),
  imageNote: 'Connecting applications, data, and agents',
  connectKicker: 'How it connects to what you run',
  positioningTitle: ['You don’t migrate.', 'You connect.'],
  positioningLink: 'What an executable business ontology is',
  positioningCopy: 'Enterprise AI does not need another rebuild project or another pile of generated code. It needs one definition agents can write, humans can review, and a runtime can govern across legacy systems, new applications, and AI agents. Your objects and fields, relations, actions, permissions, flows, and agent and tool definitions are that definition — your business ontology: open, versioned, and yours, not an asset locked inside someone else’s platform.',
  capabilities: [
    { title: 'Give agents a business model', copy: 'Model customers, orders, equipment, cases, and approvals as objects agents can read, relate, and act on.' },
    { title: 'Federate it — live reads, read-only first', copy: 'Declare a database or OData service you already run as an external datasource and bind its tables as objects. The data stays in the source and every read is forwarded to it, live. Federation is read-only by default and early: writes are enabled deliberately, on both the datasource and the object.' },
    { title: 'Sync it in one way — into a read-only object', copy: 'A job copies the rows one way into an ordinary object. Members can read it and report on it but not edit it: the pull is its only writer, and every run leaves a record.' },
    { title: 'Write back through a declared action — no two-way sync', copy: 'When something must change in the source system, a declared action calls it through a connector, with the connector’s own credentials. The local copy is not edited and the next pull brings the change home; there is no automatic write-back and no conflict merging.' },
  ],
  aiKicker: 'AI in the product',
  aiTitle: ['Ask, change, and build in plain language.', 'You see the source and confirm the change.'],
  aiNote: 'Built into ObjectOS Cloud and Enterprise (a preview on Enterprise). The AI works with the permissions of the person using it, so it never sees more than they can.',
  aiItems: [
    { title: 'Ask: every number shows its source', copy: 'Ask about your business in plain language. Each answer says where its numbers come from — the object, the filters, what was measured, and how it was grouped — and links to the records behind it. It reads only what the person asking is allowed to see.' },
    { title: 'AI edits wait for you', copy: 'When you ask the AI to add or change a record, it proposes the change and shows the old and new values. Nothing is saved until you confirm, and then it runs with your permissions. The in-product AI changes one record at a time; it cannot delete records or edit them in bulk.' },
    { title: 'AI builds the app', copy: 'Describe the app or the change you need. The built-in Builder drafts the objects, fields, views, and workflows; a change to a live app that already holds records is saved as a draft until a person publishes it.' },
  ],
  aiDeveloperLink: 'Developers: connect your own agent over MCP',
  existingSystems: 'Your existing systems',
  systemLabels: ['CRM', 'ERP', 'Databases', 'Custom systems'],
  connectModel: 'Model objects',
  objectLayer: 'Objects · Permissions · Workflows · API · Audit',
  secureExecution: 'Govern execution',
  outcomes: 'What runs on top',
  outcomeLabels: ['Business apps', 'AI agents', 'Automation'],
  useCasesKicker: 'How business teams use it',
  useCasesTitle: ['What AI takes on for each team,', 'and what a person still approves'],
  useCasesLink: 'All use cases',
  useCaseCardLink: 'See the scenario',
  useCasesTemplatesLink: 'Or start from an app template',
  useCases: [
    { title: 'Customer service', copy: 'AI classifies each ticket, matches knowledge articles and drafts replies with citations; agents confirm what is sent, and a flow approval step can hold refund or compensation replies for a manager’s sign-off.' },
    { title: 'Finance & procurement', copy: 'AI checks expense claims against policy and budget and, with supplier and delivery data connected, flags supplier risk before a purchase is approved; finance and procurement approve with the evidence in front of them.' },
    { title: 'Sales', copy: 'Reps update the CRM in plain language and AI preps the next account meeting; every suggested record change waits for the rep to confirm it.' },
  ],
  securityKicker: 'Security and governance',
  securityTitle: ['Keep data in your network.', 'Let AI work inside permissions.'],
  securityCopy: 'ObjectOS Enterprise can deploy and operate ObjectStack apps on your infrastructure. Business records, identities, audit logs, and files stay under your control; AI agents access objects through governed tools and inherit the signed-in user’s permissions.',
  securityItems: [
    { title: 'Data residency', copy: 'Connect your databases and storage; records, identities, audit logs, and files stay there.' },
    { title: 'Permissions for people and AI', copy: 'Agents act as signed-in users and obey object, record, and field permissions, so they cannot see data the user cannot see. On Enterprise, record visibility can also follow your organization’s hierarchy: a person’s own unit, their unit and the units below it, or their own records and those of their reports.' },
    { title: 'Approval and audit', copy: 'AI changes to a live app that holds records wait as a draft until a person publishes them, and flow approval steps put business decisions in front of an approver. Record reads and writes and permission changes can be audited; per-call audit of the in-app AI’s tool calls is part of AI governance on Enterprise.' },
    { title: 'Runs on your infrastructure', copy: 'ObjectOS Enterprise runs inside your network as one Node.js runtime with your database, secrets, and ingress: in a VPC, on local servers with Docker or your own platform, or air-gapped with an air-gap license, offline container images, local models, and internal identity.' },
  ],
  securityLink: 'Explore security and governance',
  insightsKicker: 'Latest insights',
  insightsTitle: 'Practical thinking on AI-written software',
  insightsLink: 'Browse all articles',
  closingKicker: 'Next step',
  closingTitle: 'See what AI can take on for your team.',
  closingCopy: 'Start free on ObjectOS Cloud with nothing to install, read how service, finance, and sales teams use it, or talk to us about running it on your own infrastructure.',
  closingCta: 'Start free',
  closingUseCasesCta: 'See the use cases',
  closingDeveloperLink: 'Developers: point your agent at ObjectStack',
  compareKicker: 'Editions and comparison',
  compareTitle: ['Choose an edition.', 'See how it compares.'],
  editionsPricingLink: 'Compare editions and pricing',
  compareLink: 'Read the comparison',
  comparisons: [
    { title: 'vs Airtable', copy: 'A real database with server-side logic and runtime governance — not a spreadsheet-style workspace.' },
    { title: 'vs Retool', copy: 'Business logic is reviewable metadata — not JavaScript scattered across screens.' },
    { title: 'vs Lovable & Bolt', copy: 'Agents generate governed metadata with schema and permissions — not a one-off codebase.' },
  ],
};

const ja: HomeCopy = {
  ...en,
  title: `ObjectOS · ${positioning.ja.t1}`,
  description: `${positioning.ja.t2}ObjectOS には ${positioning.ja.descriptor} の 3 つのエディションがあります。`,
  eyebrow: positioning.ja.descriptor,
  hero: positioning.ja.t1Hero,
  heroCategory: 'AI が書くのは業務定義だけ、プラットフォームがそれを実行します。書く量は少なく、統制が効き、自社の環境で動きます。',
  heroLead: positioning.ja.t2,
  answersKicker: 'まず結論から',
  answersTitle: '気になる 5 つの質問に、先に答えます',
  answers: [
    { question: '新しいシステムはどれくらいで作れますか？', answer: 'AI が書くのは業務定義だけで、プラットフォームがそれを実行します。書く量は 1〜2 桁少なくなります。' },
    { question: '今のシステムは入れ替えが必要ですか？', answer: 'いいえ。接続すれば、AI が既存のデータを読めるようになります。' },
    { question: '従業員は覚え直す必要がありますか？', answer: 'いいえ。普段使っている AI アシスタントで、そのまま質問し、作業できます。' },
    { question: 'AI が勝手なことをしませんか？', answer: 'AI は使う人本人の権限で動きます。製品内 AI によるデータ変更は本人の確認を待ち、フローの承認は承認者に回ります。' },
    { question: 'システムとデータは誰の手元にありますか？', answer: 'あなたの手元です。自社の環境で動かせ、自社運用ではモデルを自分で選べ、コアの ObjectStack はオープンソースです。' },
  ],
  lessKicker: 'なぜ書く量が少ないのか',
  lessTitle: ['AI が書くのは業務定義だけ。', '残りはプラットフォームが動かす。'],
  lessLanes: [
    { label: 'よくあるやり方', steps: ['AI がコードを書く', 'アプリごとに新しいコードの山', '問題は本番稼働後に表面化'] },
    { label: 'ObjectOS のやり方', steps: ['AI が業務定義を書く', 'プラットフォームが実行する', '書くそばから検証される'] },
  ],
  lessSizeTitle: '同じ CRM で、書く量を比べる',
  lessSizes: [
    { label: '従来の手書き CRM コードベース', value: '30 万〜100 万行超', note: '典型的な規模感であり、実測値ではありません' },
    { label: 'HotCRM の営業モジュール（オープンソース）', value: '約 28,000 行', note: '159 ファイル、28,456 行：オブジェクト 11、フローファイル 21、ダッシュボード 4' },
    { label: 'ランタイム同梱のリファレンス CRM', value: '2,189 行', note: '30 ファイル：objectstack リポジトリの examples/app-crm' },
  ],
  lessMethod: '下の 2 行は実測値です。HotCRM は hotcrm のコミット 94f8d04 における src/sales 配下のテスト以外の .ts ファイル（translations/ と data/ を除く）、リファレンス CRM は objectstack のコミット e61af972 における examples/app-crm/src です。',
  lessClosing: '意思決定は定義に残ります。テーブル、CRUD API、一覧と詳細の画面、権限チェック、監査ログの書き込みといった配管は、ランタイムが導出します。',
  lessLink: '根拠を読む',
  editionsCopy: positioning.ja.e1,
  primaryCta: 'はじめる',
  secondaryCta: '仕組みを見る',
  videoCaption: 'ObjectStack を 90 秒で',
  videoPlayLabel: '動画を再生：ObjectStack を 90 秒で',
  videoMoreLink: 'YouTube でほかの動画を見る',
  videoPosterEyebrow: 'オープンプロトコル & ランタイム · APACHE-2.0',
  videoPosterNote: 'データモデル · UI · ワークフロー · 権限 — AI が一度に把握できる小ささに収まる。',
  proof: [
    [positioning.ja.t3[0], 'ランタイムが動かす'],
    [positioning.ja.t3[1], 'AI が書く'],
    [positioning.ja.t3[2], 'エージェントが操作する'],
    [positioning.ja.t3[3], '通常の ObjectStack メタデータ。オープンソースランタイムへのエクスポートは計画中'],
  ],
  imageAlt: '業務データ、アプリ、AI エージェントを接続する ObjectOS',
  imageNoteTitle: t2Lead(positioning.ja.t2),
  imageNote: 'アプリ、データ、エージェントを接続中',
  connectKicker: '既存システムとのつながり方',
  positioningTitle: ['移行しない。', '接続する。'],
  positioningLink: '実行可能なビジネスオントロジーとは',
  positioningCopy: 'エンタープライズ AI に必要なのは、また一つの再構築プロジェクトでも、レビュー不能な生成コードの山でもありません。エージェントが書き、人がレビューでき、ランタイムが統制する、ひとつの定義です。オブジェクトとフィールド、リレーション、アクション、権限、フロー、そしてエージェントとツールの定義がその定義 — あなたのビジネスオントロジーです。オープンで、バージョン管理され、あなたのもの。誰かのプラットフォームに閉じ込められた資産ではありません。',
  capabilities: [
    { title: 'エージェントに業務モデルを渡す', copy: '顧客、注文、設備、ケース、承認を、エージェントが読み、関連付け、操作できるオブジェクトとしてモデル化します。' },
    { title: 'フェデレーション — ライブで読み取り、まずは読み取り専用', copy: 'すでに稼働中のデータベースや OData サービスを外部データソースとして宣言し、そのテーブルをオブジェクトにバインドします。データは元の場所に残り、読み取りは毎回ライブで転送されます。フェデレーションは既定で読み取り専用で、まだ初期段階です。書き込みはデータソースとオブジェクトの両方で意図的に有効化します。' },
    { title: '一方向の同期 — 読み取り専用オブジェクトへ', copy: 'ジョブがデータを一方向にコピーし、通常のオブジェクトにします。メンバーは読み取りやレポート作成はできますが、編集はできません。書き込むのはプルだけで、実行のたびに記録が残ります。' },
    { title: '宣言されたアクションで書き戻す — 双方向同期はなし', copy: '元のシステムを変更する必要があるときは、宣言されたアクションがコネクター経由で、コネクター自身の資格情報を使って呼び出します。ローカルのコピーは編集されず、次のプルが変更を持ち帰ります。自動の書き戻しも競合のマージもありません。' },
  ],
  aiKicker: '製品に組み込まれた AI',
  aiTitle: ['質問も、データ変更も、アプリ作りも普段の言葉で。', '出典が見え、変更はあなたが確定します。'],
  aiNote: 'ObjectOS Cloud と Enterprise に組み込まれています（Enterprise ではプレビュー）。AI は使う人本人の権限で動くため、その人が見られる範囲を超えて見ることはありません。',
  aiItems: [
    { title: '質問：すべての数字に出典', copy: '業務について普段の言葉で質問できます。回答ごとに数字の出どころ——対象のオブジェクト、絞り込み条件、集計した値、グループ化の方法——を示し、元のレコードへのリンクを添えます。読み取るのは質問者本人が閲覧を許可されたデータだけです。' },
    { title: 'AI の変更はあなたの確認待ち', copy: 'AI にレコードの追加や変更を頼むと、まず変更案を出し、変更前と変更後の値を示します。あなたが確定するまで何も保存されず、確定後はあなたの権限で実行されます。製品内 AI が変更するのは一度に 1 件だけで、レコードの削除や一括編集はできません。' },
    { title: 'AI がアプリを作る', copy: '必要なアプリや変更を説明してください。組み込みの Builder がオブジェクト、項目、ビュー、ワークフローの下書きを作ります。レコードのある稼働中アプリへの変更は、人が公開するまで下書きとして保存されます。' },
  ],
  aiDeveloperLink: '開発者の方：MCP で自分のエージェントを接続',
  existingSystems: '既存システム',
  systemLabels: ['CRM', 'ERP', 'データベース', '自社システム'],
  connectModel: '接続とモデリング',
  objectLayer: 'オブジェクト · 権限 · フロー · API · 監査',
  secureExecution: '安全に実行',
  outcomes: '継続的な価値',
  outcomeLabels: ['業務アプリ', 'AI エージェント', '自動化'],
  useCasesKicker: 'ビジネスチームでの使い方',
  useCasesTitle: ['チームごとに AI が担うこと、', 'そして人が承認すること'],
  useCasesLink: 'すべてのユースケース',
  useCaseCardLink: 'シナリオを見る',
  useCasesTemplatesLink: 'アプリテンプレートから始める',
  useCases: [
    { title: 'カスタマーサービス', copy: 'AI がチケットを分類し、ナレッジ記事を照合し、引用付きの返信案を作成します。送信内容は担当者が確認し、返金や補償の返信はフローの承認ステップでマネージャーの承認を経てから送信できます。' },
    { title: '財務・購買', copy: 'AI が経費精算をポリシーと予算に照らして確認し、サプライヤーと納入のデータを接続すれば、購買承認の前にサプライヤーのリスクを示します。財務と購買は根拠を見たうえで承認します。' },
    { title: '営業', copy: '営業担当は自然言語で CRM を更新し、AI が次の商談を準備します。レコード変更の提案は、すべて本人の確認を待ちます。' },
  ],
  securityKicker: 'セキュリティとガバナンス',
  securityTitle: ['データは自社ネットワーク内に。', 'AI は権限の内側で動く。'],
  securityCopy: 'ObjectOS Enterprise は ObjectStack アプリを自社インフラへデプロイし、運用できます。業務データ、ID、監査ログ、ファイルは自社管理のまま。AI エージェントは管理されたツール経由でオブジェクトにアクセスし、ログインユーザーの権限を継承します。',
  securityItems: [
    { title: 'データ所在地', copy: '自社のデータベースとストレージに接続します。業務レコード、ID、監査ログ、ファイルはそこに留まります。' },
    { title: '人にも AI にも同じ権限', copy: 'エージェントはログインユーザーとして動作し、オブジェクト、レコード、フィールドの権限に従うため、ユーザーが見られないデータは見られません。Enterprise では、組織階層に沿ってレコードの閲覧範囲を設定することもできます。自部門、自部門と配下の部門、または本人と部下のレコードです。' },
    { title: '承認と監査', copy: 'レコードのある稼働中アプリへの AI の変更は、人が公開するまで下書きとして待機し、フローの承認ステップが業務上の判断を承認者に回します。レコードの読み取り・書き込みと権限変更は監査ログに記録でき、製品内 AI のツール呼び出しごとの監査は Enterprise の AI ガバナンスに含まれます。' },
    { title: '自社インフラで運用', copy: 'ObjectOS Enterprise は自社ネットワーク内で、1 つの Node.js ランタイムと自社のデータベース、シークレット、イングレスで動作します。VPC、Docker や自社プラットフォームを使うローカルサーバー、オフラインのコンテナイメージとローカルモデル、社内 ID を使う隔離ネットワークで運用できます。' },
  ],
  securityLink: 'セキュリティとガバナンスを見る',
  insightsKicker: '最新インサイト',
  insightsTitle: 'AI が書くソフトウェアの実践知',
  insightsLink: 'すべての記事',
  closingKicker: '次のステップ',
  closingTitle: 'AI がチームの何を引き受けられるか、確かめてください。',
  closingCopy: 'インストール不要の ObjectOS Cloud で無料で始める、カスタマーサービス・財務・営業チームでの使い方を見る、または自社インフラでの運用についてご相談ください。',
  closingCta: '無料で始める',
  closingUseCasesCta: 'ユースケースを見る',
  closingDeveloperLink: '開発者の方：エージェントを ObjectStack に向ける',
  compareKicker: 'エディションと比較',
  compareTitle: ['エディションを選び、', 'ほかのツールとの違いを知る'],
  editionsPricingLink: 'エディションと料金を比較',
  compareLink: '比較を読む',
  comparisons: [
    { title: 'vs Airtable', copy: '本物のデータベース、サーバーサイドロジック、ランタイムガバナンス。表計算型ワークスペースではありません。' },
    { title: 'vs Retool', copy: '業務ロジックはレビュー可能なメタデータ。画面に散らばる JavaScript ではありません。' },
    { title: 'vs Lovable & Bolt', copy: 'エージェントはスキーマと権限を持つ統制メタデータを生成します。使い捨てコードベースではありません。' },
  ],
};

const de: HomeCopy = {
  ...en,
  title: `ObjectOS · ${positioning.de.t1}`,
  description: `${positioning.de.t2} ObjectOS gibt es in drei Editionen, ${positioning.de.descriptor}.`,
  eyebrow: sentenceCase(positioning.de.descriptor),
  hero: positioning.de.t1Hero,
  heroCategory: 'AI schreibt nur die Geschäftsdefinition, die Plattform führt sie aus: weniger zu schreiben, von Haus aus kontrolliert, in Ihrer Umgebung betrieben.',
  heroLead: positioning.de.t2,
  answersKicker: 'Das Wichtigste zuerst',
  answersTitle: 'Ihre fünf Fragen, zuerst beantwortet',
  answers: [
    { question: 'Wie schnell steht ein neues System?', answer: 'AI schreibt nur die Geschäftsdefinition, die Plattform führt sie aus; es ist ein bis zwei Größenordnungen weniger zu schreiben.' },
    { question: 'Müssen wir bestehende Systeme ablösen?', answer: 'Nein. Binden Sie sie an, und AI kann Ihre vorhandenen Daten lesen.' },
    { question: 'Müssen Mitarbeitende umlernen?', answer: 'Nein. Sie fragen und handeln im AI-Assistenten, den sie bereits nutzen.' },
    { question: 'Macht die AI, was sie will?', answer: 'Sie arbeitet mit den Rechten der Person, die sie nutzt; Datenänderungen der In-App-AI warten auf deren Bestätigung, und Freigabeschritte im Flow gehen an die zuständige Person.' },
    { question: 'Wer hält System und Daten in der Hand?', answer: 'Sie: Es kann in Ihrer eigenen Umgebung laufen, im Eigenbetrieb mit dem Modell Ihrer Wahl, auf einem Open-Source-Kern.' },
  ],
  lessKicker: 'Warum weniger zu schreiben ist',
  lessTitle: ['AI schreibt nur die Geschäftsdefinition.', 'Den Rest führt die Plattform aus.'],
  lessLanes: [
    { label: 'Der übliche Weg', steps: ['AI schreibt Code', 'Ein Stapel neuer Code pro Anwendung', 'Probleme zeigen sich nach dem Go-live'] },
    { label: 'Der ObjectOS-Weg', steps: ['AI schreibt die Geschäftsdefinition', 'Die Plattform führt sie aus', 'Beim Schreiben validiert'] },
  ],
  lessSizeTitle: 'Ein CRM, gemessen daran, wie viel zu schreiben ist',
  lessSizes: [
    { label: 'Eine herkömmliche, handgeschriebene CRM-Codebasis', value: '300k–1M+ Zeilen', note: 'Eine typische Größenordnung, keine Messung' },
    { label: 'HotCRM, Vertriebsmodul (Open Source)', value: 'rund 28.000 Zeilen', note: '159 Dateien, 28.456 Zeilen: 11 Objekte, 21 Flow-Dateien, 4 Dashboards' },
    { label: 'Das mit der Runtime gelieferte Referenz-CRM', value: '2.189 Zeilen', note: '30 Dateien: examples/app-crm im objectstack-Repository' },
  ],
  lessMethod: 'Die beiden letzten Zeilen sind gemessen: HotCRM am hotcrm-Commit 94f8d04, die .ts-Dateien unter src/sales ohne Tests, ohne translations/ und data/; das Referenz-CRM am objectstack-Commit e61af972, examples/app-crm/src.',
  lessClosing: 'Die Entscheidungen bleiben in der Definition. Die Infrastruktur dahinter — Tabellen, die CRUD-API, Listen- und Detailseiten, Rechteprüfungen, Audit-Einträge — leitet die Runtime ab.',
  lessLink: 'Die Begründung lesen',
  editionsCopy: positioning.de.e1,
  primaryCta: 'Loslegen',
  secondaryCta: 'So funktioniert es',
  videoCaption: 'ObjectStack in 90 Sekunden',
  videoPlayLabel: 'Video abspielen: ObjectStack in 90 Sekunden',
  videoMoreLink: 'Mehr Videos auf YouTube',
  videoPosterEyebrow: 'OFFENES PROTOKOLL & RUNTIME · APACHE-2.0',
  videoPosterNote: 'Datenmodell · UI · Workflows · Berechtigungen — klein genug, dass AI das Ganze erfasst.',
  proof: [
    [positioning.de.t3[0], 'Die Runtime führt sie aus'],
    [positioning.de.t3[1], 'AI schreibt sie'],
    [positioning.de.t3[2], 'Agents bedienen sie'],
    [positioning.de.t3[3], 'Gewöhnliche ObjectStack-Metadaten; Export in die offene Runtime geplant'],
  ],
  imageAlt: 'ObjectOS verbindet Geschäftsdaten, Anwendungen und AI Agents',
  imageNoteTitle: t2Lead(positioning.de.t2),
  imageNote: 'Verbindet Anwendungen, Daten und Agents',
  connectKicker: 'So fügt es sich in Ihre Systeme ein',
  positioningTitle: ['Sie migrieren nicht.', 'Sie verbinden.'],
  positioningLink: 'Was eine ausführbare Geschäftsontologie ist',
  positioningCopy: 'Enterprise AI braucht kein weiteres Neuaufbauprojekt und keinen weiteren Stapel generierten Codes. Sie braucht eine Definition, die Agents schreiben, Menschen prüfen und eine Runtime über Legacy-Systeme, neue Anwendungen und AI Agents hinweg kontrolliert. Ihre Objekte und Felder, Beziehungen, Aktionen, Berechtigungen, Flows sowie Agent- und Tool-Definitionen sind diese Definition — Ihre Geschäftsontologie: offen, versioniert und in Ihrem Besitz, kein Asset in der Plattform eines anderen.',
  capabilities: [
    { title: 'Agents ein Geschäftsmodell geben', copy: 'Modellieren Sie Kunden, Aufträge, Anlagen, Fälle und Freigaben als Objekte, die Agents lesen, verknüpfen und bearbeiten können.' },
    { title: 'Föderieren — live lesen, zuerst nur lesend', copy: 'Deklarieren Sie eine Datenbank oder einen OData-Dienst, den Sie bereits betreiben, als externe Datasource und binden Sie die Tabellen als Objekte. Die Daten bleiben in der Quelle, jeder Lesezugriff wird live dorthin weitergeleitet. Föderation ist standardmäßig nur lesend und noch früh: Schreibzugriff wird bewusst freigegeben, an der Datasource und am Objekt.' },
    { title: 'Einweg-Sync — in ein schreibgeschütztes Objekt', copy: 'Ein Job kopiert die Zeilen in eine Richtung in ein gewöhnliches Objekt. Mitglieder können es lesen und auswerten, aber nicht bearbeiten: Der Pull ist der einzige Schreiber, und jeder Lauf hinterlässt einen Eintrag.' },
    { title: 'Zurückschreiben über eine deklarierte Aktion — kein Zwei-Wege-Sync', copy: 'Muss sich im Quellsystem etwas ändern, ruft eine deklarierte Aktion es über einen Connector auf, mit den Zugangsdaten des Connectors. Die lokale Kopie wird nicht bearbeitet, der nächste Pull holt die Änderung zurück; es gibt kein automatisches Zurückschreiben und kein Zusammenführen von Konflikten.' },
  ],
  aiKicker: 'AI im Produkt',
  aiTitle: ['Fragen, ändern und bauen in Alltagssprache.', 'Sie sehen die Quelle und bestätigen die Änderung.'],
  aiNote: 'In ObjectOS Cloud und Enterprise integriert (auf Enterprise als Vorschau). Die AI arbeitet mit den Rechten der Person, die sie nutzt, und sieht nie mehr als diese.',
  aiItems: [
    { title: 'Fragen: Jede Zahl nennt ihre Quelle', copy: 'Stellen Sie Fragen zu Ihrem Geschäft in Alltagssprache. Jede Antwort sagt, woher ihre Zahlen stammen – Objekt, Filter, was gemessen und wie gruppiert wurde – und verlinkt die zugrunde liegenden Datensätze. Sie liest nur, was die fragende Person sehen darf.' },
    { title: 'AI-Änderungen warten auf Sie', copy: 'Bitten Sie die AI, einen Datensatz anzulegen oder zu ändern, schlägt sie die Änderung vor und zeigt alten und neuen Wert. Nichts wird gespeichert, bevor Sie bestätigen; danach läuft die Änderung mit Ihren Rechten. Die In-App-AI ändert jeweils einen Datensatz; sie kann keine Datensätze löschen und keine Massenänderungen vornehmen.' },
    { title: 'AI baut die App', copy: 'Beschreiben Sie die App oder die Änderung, die Sie brauchen. Der integrierte Builder entwirft Objekte, Felder, Views und Workflows; eine Änderung an einer live laufenden App mit Datensätzen wartet als Entwurf, bis ein Mensch sie veröffentlicht.' },
  ],
  aiDeveloperLink: 'Für Entwickler: eigenen Agent über MCP anbinden',
  existingSystems: 'Bestehende Systeme',
  systemLabels: ['CRM', 'ERP', 'Datenbank', 'Eigene Systeme'],
  connectModel: 'Verbinden und modellieren',
  objectLayer: 'Objekte · Rechte · Prozesse · API · Audit',
  secureExecution: 'Sicher ausführen',
  outcomes: 'Kontinuierlicher Nutzen',
  outcomeLabels: ['Geschäftsanwendungen', 'AI Agents', 'Automatisierung'],
  useCasesKicker: 'So nutzen es Fachteams',
  useCasesTitle: ['Was AI für jedes Team übernimmt,', 'und was ein Mensch weiterhin freigibt'],
  useCasesLink: 'Alle Anwendungsfälle',
  useCaseCardLink: 'Szenario ansehen',
  useCasesTemplatesLink: 'Oder mit einer Anwendungsvorlage starten',
  useCases: [
    { title: 'Kundenservice', copy: 'AI klassifiziert jedes Ticket, findet passende Wissensartikel und entwirft Antworten mit Quellen; das Team bestätigt, was verschickt wird, und ein Freigabeschritt im Flow kann Erstattungs- oder Kulanzantworten bis zur Freigabe der Leitung zurückhalten.' },
    { title: 'Finanzen & Einkauf', copy: 'AI prüft Spesenabrechnungen gegen Richtlinie und Budget und zeigt, sobald Lieferanten- und Lieferdaten angebunden sind, das Lieferantenrisiko vor der Einkaufsfreigabe; Finanzen und Einkauf geben mit den Belegen vor Augen frei.' },
    { title: 'Vertrieb', copy: 'Der Vertrieb pflegt das CRM in natürlicher Sprache, und AI bereitet den nächsten Kundentermin vor; jede vorgeschlagene Änderung wartet auf die Bestätigung des Verkäufers.' },
  ],
  securityKicker: 'Sicherheit und Governance',
  securityTitle: ['Daten bleiben in Ihrem Netzwerk.', 'AI arbeitet innerhalb von Berechtigungen.'],
  securityCopy: 'ObjectOS Enterprise kann ObjectStack-Apps in Ihrer Infrastruktur bereitstellen und betreiben. Geschäftsdaten, Identitäten, Audit-Logs und Dateien bleiben unter Ihrer Kontrolle; AI Agents greifen über kontrollierte Tools auf Objekte zu und erben die Rechte des angemeldeten Nutzers.',
  securityItems: [
    { title: 'Datenresidenz', copy: 'Verbinden Sie Ihre Datenbanken und Speicher; Datensätze, Identitäten, Audit-Logs und Dateien bleiben dort.' },
    { title: 'Gleiche Rechte für Menschen und AI', copy: 'Agents handeln als angemeldete Nutzer und beachten Objekt-, Datensatz- und Feldrechte, sehen also keine Daten, die der Nutzer nicht sehen darf. Auf Enterprise kann die Sichtbarkeit von Datensätzen zusätzlich Ihrer Organisationshierarchie folgen: die eigene Einheit, die eigene Einheit samt untergeordneten Einheiten oder die eigenen Datensätze und die der direkt Unterstellten.' },
    { title: 'Freigabe und Audit', copy: 'AI-Änderungen an einer live laufenden App mit Datensätzen warten als Entwurf, bis ein Mensch sie veröffentlicht, und Freigabeschritte in Flows legen Geschäftsentscheidungen einer zuständigen Person vor. Lese- und Schreibzugriffe auf Datensätze sowie Rechteänderungen können protokolliert werden; das Audit jedes Tool-Aufrufs der In-App-AI gehört auf Enterprise zur AI-Governance.' },
    { title: 'Läuft in Ihrer Infrastruktur', copy: 'ObjectOS Enterprise läuft in Ihrem Netzwerk als eine Node.js Runtime mit Ihrer Datenbank, Ihren Secrets und Ihrem Ingress: in einer VPC, auf lokalen Servern mit Docker oder Ihrer eigenen Plattform oder in isolierten Netzen mit Offline-Container-Images, lokalen Modellen und interner Identität.' },
  ],
  securityLink: 'Sicherheit und Governance ansehen',
  insightsKicker: 'Aktuelle Einblicke',
  insightsTitle: 'Praxiswissen zu AI-geschriebener Software',
  insightsLink: 'Alle Artikel',
  closingKicker: 'Nächster Schritt',
  closingTitle: 'Sehen Sie, was AI für Ihr Team übernehmen kann.',
  closingCopy: 'Starten Sie kostenlos mit ObjectOS Cloud, ganz ohne Installation, lesen Sie, wie Service-, Finanz- und Vertriebsteams es nutzen, oder sprechen Sie mit uns über den Betrieb in Ihrer eigenen Infrastruktur.',
  closingCta: 'Kostenlos starten',
  closingUseCasesCta: 'Anwendungsfälle ansehen',
  closingDeveloperLink: 'Für Entwickler: Richten Sie Ihren Agent auf ObjectStack',
  compareKicker: 'Editionen und Vergleich',
  compareTitle: ['Die passende Edition wählen.', 'Den Unterschied sehen.'],
  editionsPricingLink: 'Editionen und Preise vergleichen',
  compareLink: 'Vergleich lesen',
  comparisons: [
    { title: 'vs Airtable', copy: 'Eine echte Datenbank mit Server-Logik und Runtime-Governance — kein Tabellen-Workspace.' },
    { title: 'vs Retool', copy: 'Geschäftslogik ist prüfbare Metadaten — kein über Screens verstreutes JavaScript.' },
    { title: 'vs Lovable & Bolt', copy: 'Agents generieren kontrollierte Metadaten mit Schema und Rechten — keine einmalige Codebasis.' },
  ],
};

const es: HomeCopy = {
  ...en,
  title: `ObjectOS · ${positioning.es.t1}`,
  description: `${positioning.es.t2} ObjectOS se ofrece en tres ediciones, ${positioning.es.descriptor}.`,
  eyebrow: sentenceCase(positioning.es.descriptor),
  hero: positioning.es.t1Hero,
  heroCategory: 'La AI solo escribe la definición de negocio y la plataforma la ejecuta: menos que escribir, gobernada por defecto, desplegada en tu entorno.',
  heroLead: positioning.es.t2,
  answersKicker: 'En pocas palabras',
  answersTitle: 'Tus cinco preguntas, respondidas primero',
  answers: [
    { question: '¿Cuánto se tarda en tener un sistema nuevo?', answer: 'La AI solo escribe la definición de negocio y la plataforma la ejecuta; hay que escribir entre uno y dos órdenes de magnitud menos.' },
    { question: '¿Hay que sustituir lo que ya usamos?', answer: 'No. Conéctalo y la AI podrá leer tus datos actuales.' },
    { question: '¿Los empleados tienen que volver a formarse?', answer: 'No. Preguntan y actúan en el asistente de AI que ya usan.' },
    { question: '¿La AI hará lo que quiera?', answer: 'Trabaja con los permisos de quien la usa; los cambios de datos de la AI integrada esperan la confirmación de esa persona, y las aprobaciones del flujo van al aprobador.' },
    { question: '¿Quién tiene el sistema y los datos?', answer: 'Tú: puede funcionar en tu propio entorno, con el modelo que elijas cuando lo alojas tú, sobre un núcleo de código abierto.' },
  ],
  lessKicker: 'Por qué hay menos que escribir',
  lessTitle: ['La AI solo escribe la definición de negocio.', 'La plataforma ejecuta el resto.'],
  lessLanes: [
    { label: 'El camino habitual', steps: ['La AI escribe código', 'Un montón de código nuevo por aplicación', 'Los problemas aparecen tras la puesta en marcha'] },
    { label: 'El camino de ObjectOS', steps: ['La AI escribe la definición de negocio', 'La plataforma la ejecuta', 'Validada mientras se escribe'] },
  ],
  lessSizeTitle: 'Un CRM, según cuánto hay que escribir',
  lessSizes: [
    { label: 'Una base de código CRM tradicional escrita a mano', value: '300k–1M+ líneas', note: 'Un orden de magnitud típico, no una medición' },
    { label: 'Módulo de ventas de HotCRM (código abierto)', value: 'unas 28.000 líneas', note: '159 archivos, 28.456 líneas: 11 objetos, 21 archivos de flujo, 4 dashboards' },
    { label: 'El CRM de referencia incluido con el runtime', value: '2.189 líneas', note: '30 archivos: examples/app-crm en el repositorio objectstack' },
  ],
  lessMethod: 'Las dos últimas filas están medidas: HotCRM en el commit 94f8d04 de hotcrm, los archivos .ts de src/sales que no son tests, sin translations/ ni data/; el CRM de referencia en el commit e61af972 de objectstack, examples/app-crm/src.',
  lessClosing: 'Las decisiones se quedan en la definición. La fontanería — tablas, la API CRUD, páginas de lista y de detalle, comprobaciones de permisos, escrituras de auditoría — la deriva el runtime.',
  lessLink: 'Lee el argumento completo',
  editionsCopy: positioning.es.e1,
  primaryCta: 'Empezar',
  secondaryCta: 'Cómo funciona',
  videoCaption: 'ObjectStack en 90 segundos',
  videoPlayLabel: 'Reproducir el vídeo: ObjectStack en 90 segundos',
  videoMoreLink: 'Más vídeos en YouTube',
  videoPosterEyebrow: 'PROTOCOLO Y RUNTIME ABIERTOS · APACHE-2.0',
  videoPosterNote: 'Modelo de datos · UI · workflows · permisos — tan pequeño que la AI lo abarca entero.',
  proof: [
    [positioning.es.t3[0], 'El runtime la ejecuta'],
    [positioning.es.t3[1], 'La AI la escribe'],
    [positioning.es.t3[2], 'Los agentes la operan'],
    [positioning.es.t3[3], 'Metadatos ordinarios de ObjectStack; la exportación al runtime abierto está prevista'],
  ],
  imageAlt: 'ObjectOS conectando datos, aplicaciones y agentes de AI',
  imageNoteTitle: t2Lead(positioning.es.t2),
  imageNote: 'Conectando aplicaciones, datos y agentes',
  connectKicker: 'Cómo se conecta con lo que ya usas',
  positioningTitle: ['No migras.', 'Conectas.'],
  positioningLink: 'Qué es una ontología de negocio ejecutable',
  positioningCopy: 'La AI empresarial no necesita otro proyecto de reconstrucción ni otra pila de código generado. Necesita una definición que los agentes puedan escribir, las personas revisar y un runtime gobernar entre sistemas heredados, nuevas aplicaciones y agentes de AI. Tus objetos y campos, relaciones, acciones, permisos, flujos y definiciones de agentes y herramientas son esa definición — tu ontología de negocio: abierta, versionada y tuya, no un activo encerrado en la plataforma de otro.',
  capabilities: [
    { title: 'Da a los agentes un modelo de negocio', copy: 'Modela clientes, pedidos, equipos, casos y aprobaciones como objetos que los agentes pueden leer, relacionar y modificar.' },
    { title: 'Federar — lecturas en vivo, primero en solo lectura', copy: 'Declara una base de datos o un servicio OData que ya usas como datasource externa y enlaza sus tablas como objetos. Los datos se quedan en el origen y cada lectura se reenvía allí, en vivo. La federación es de solo lectura por defecto y aún temprana: las escrituras se habilitan deliberadamente, en la datasource y en el objeto.' },
    { title: 'Sincronizar en un solo sentido — a un objeto de solo lectura', copy: 'Un job copia las filas en un solo sentido a un objeto ordinario. Los miembros pueden leerlo y hacer informes, pero no editarlo: el pull es su único escritor y cada ejecución deja un registro.' },
    { title: 'Escribir de vuelta mediante una acción declarada — sin sincronización bidireccional', copy: 'Cuando algo debe cambiar en el sistema de origen, una acción declarada lo llama a través de un conector, con las credenciales del propio conector. La copia local no se edita y el siguiente pull trae el cambio; no hay escritura de vuelta automática ni fusión de conflictos.' },
  ],
  aiKicker: 'AI en el producto',
  aiTitle: ['Pregunta, cambia y construye en lenguaje natural.', 'Ves la fuente y confirmas el cambio.'],
  aiNote: 'Integrada en ObjectOS Cloud y Enterprise (en vista previa en Enterprise). La AI trabaja con los permisos de quien la usa, así que nunca ve más que esa persona.',
  aiItems: [
    { title: 'Preguntar: cada número muestra su fuente', copy: 'Pregunta sobre tu negocio en lenguaje natural. Cada respuesta indica de dónde salen sus números —el objeto, los filtros, qué se midió y cómo se agrupó— y enlaza los registros que hay detrás. Solo lee lo que quien pregunta tiene permiso para ver.' },
    { title: 'Los cambios de la AI te esperan', copy: 'Cuando pides a la AI que cree o cambie un registro, propone el cambio y muestra el valor anterior y el nuevo. No se guarda nada hasta que confirmas, y entonces se ejecuta con tus permisos. La AI integrada cambia un registro cada vez; no puede eliminar registros ni editarlos en bloque.' },
    { title: 'La AI construye la app', copy: 'Describe la app o el cambio que necesitas. El Builder integrado prepara los objetos, campos, vistas y workflows; un cambio en una app en producción que ya tiene registros se guarda como borrador hasta que una persona lo publica.' },
  ],
  aiDeveloperLink: 'Desarrolladores: conecta tu propio agente por MCP',
  existingSystems: 'Sistemas existentes',
  systemLabels: ['CRM', 'ERP', 'Base de datos', 'Sistemas propios'],
  connectModel: 'Conectar y modelar',
  objectLayer: 'Objetos · Permisos · Procesos · API · Auditoría',
  secureExecution: 'Ejecución segura',
  outcomes: 'Valor continuo',
  outcomeLabels: ['Apps de negocio', 'Agentes de AI', 'Automatización'],
  useCasesKicker: 'Cómo lo usan los equipos de negocio',
  useCasesTitle: ['Qué asume la AI en cada equipo,', 'y qué sigue aprobando una persona'],
  useCasesLink: 'Todos los casos de uso',
  useCaseCardLink: 'Ver el escenario',
  useCasesTemplatesLink: 'O empieza con una plantilla de aplicación',
  useCases: [
    { title: 'Atención al cliente', copy: 'La AI clasifica cada ticket, busca artículos de conocimiento y redacta respuestas con citas; el agente confirma qué se envía, y un paso de aprobación del flujo puede retener las respuestas de reembolso o compensación hasta que un responsable las apruebe.' },
    { title: 'Finanzas y compras', copy: 'La AI revisa los gastos frente a la política y el presupuesto y, con los datos de proveedores y entregas conectados, señala el riesgo del proveedor antes de aprobar la compra; finanzas y compras aprueban con la evidencia delante.' },
    { title: 'Ventas', copy: 'Los comerciales actualizan el CRM en lenguaje natural y la AI prepara la próxima reunión con el cliente; cada cambio sugerido espera la confirmación del comercial.' },
  ],
  securityKicker: 'Seguridad y gobierno',
  securityTitle: ['Los datos permanecen en tu red.', 'La AI trabaja dentro de permisos.'],
  securityCopy: 'ObjectOS Enterprise puede desplegar y operar apps ObjectStack en tu infraestructura. Registros de negocio, identidades, auditoría y archivos siguen bajo tu control; los agentes de AI acceden a objetos mediante herramientas gobernadas y heredan los permisos del usuario conectado.',
  securityItems: [
    { title: 'Residencia de datos', copy: 'Conecta tus bases de datos y almacenamiento; registros, identidades, auditoría y archivos se quedan ahí.' },
    { title: 'Los mismos permisos para personas y AI', copy: 'Los agentes actúan como usuarios conectados y respetan permisos de objeto, registro y campo, así que no ven datos que el usuario no puede ver. En Enterprise, la visibilidad de los registros también puede seguir la jerarquía de tu organización: la propia unidad, la unidad y las que dependen de ella, o los registros propios y los de sus subordinados.' },
    { title: 'Aprobación y auditoría', copy: 'Los cambios de la AI en una app en producción con registros esperan como borrador hasta que una persona los publica, y los pasos de aprobación de los flujos llevan las decisiones de negocio a un aprobador. Las lecturas y escrituras de registros y los cambios de permisos pueden auditarse; la auditoría de cada llamada a herramientas de la AI integrada forma parte del gobierno de AI en Enterprise.' },
    { title: 'Funciona en tu infraestructura', copy: 'ObjectOS Enterprise funciona dentro de tu red como un runtime Node.js con tu base de datos, tus secretos y tu entrada: en una VPC, en servidores locales con Docker o tu propia plataforma, o en redes aisladas con imágenes de contenedor offline, modelos locales e identidad interna.' },
  ],
  securityLink: 'Ver seguridad y gobierno',
  insightsKicker: 'Últimos análisis',
  insightsTitle: 'Ideas prácticas sobre software escrito por AI',
  insightsLink: 'Ver todos los artículos',
  closingKicker: 'Siguiente paso',
  closingTitle: 'Descubre qué puede asumir la AI en tu equipo.',
  closingCopy: 'Empieza gratis en ObjectOS Cloud sin instalar nada, lee cómo lo usan los equipos de servicio, finanzas y ventas, o habla con nosotros sobre ejecutarlo en tu propia infraestructura.',
  closingCta: 'Empieza gratis',
  closingUseCasesCta: 'Ver los casos de uso',
  closingDeveloperLink: 'Desarrolladores: apunta tu agente a ObjectStack',
  compareKicker: 'Ediciones y comparativa',
  compareTitle: ['Elige una edición.', 'Mira en qué se diferencia.'],
  editionsPricingLink: 'Comparar ediciones y precios',
  compareLink: 'Leer la comparación',
  comparisons: [
    { title: 'vs Airtable', copy: 'Una base de datos real con lógica de servidor y gobierno en runtime — no un workspace tipo hoja de cálculo.' },
    { title: 'vs Retool', copy: 'La lógica de negocio es metadato revisable — no JavaScript disperso por pantallas.' },
    { title: 'vs Lovable & Bolt', copy: 'Los agentes generan metadatos gobernados con esquema y permisos — no una base de código de una sola vez.' },
  ],
};

const fr: HomeCopy = {
  ...en,
  title: `ObjectOS · ${positioning.fr.t1}`,
  description: `${positioning.fr.t2} ObjectOS existe en trois éditions, ${positioning.fr.descriptor}.`,
  eyebrow: sentenceCase(positioning.fr.descriptor),
  hero: positioning.fr.t1Hero,
  heroCategory: 'L’AI n’écrit que la définition métier et la plateforme l’exécute : moins à écrire, gouvernée par défaut, déployée dans votre environnement.',
  heroLead: positioning.fr.t2,
  answersKicker: 'En bref',
  answersTitle: 'Vos cinq questions, les réponses d’abord',
  answers: [
    { question: 'En combien de temps obtient-on un nouveau système ?', answer: 'L’AI n’écrit que la définition métier et la plateforme l’exécute ; il y a un à deux ordres de grandeur de moins à écrire.' },
    { question: 'Faut-il remplacer l’existant ?', answer: 'Non. Connectez-le, et l’AI peut lire vos données existantes.' },
    { question: 'Faut-il reformer les équipes ?', answer: 'Non. Elles interrogent et agissent dans l’assistant AI qu’elles utilisent déjà.' },
    { question: 'L’AI peut-elle faire n’importe quoi ?', answer: 'Elle travaille avec les permissions de la personne qui l’utilise ; les modifications de données de l’AI intégrée attendent la confirmation de cette personne, et les validations du flow reviennent au valideur.' },
    { question: 'Qui détient le système et les données ?', answer: 'Vous : il peut fonctionner dans votre propre environnement, avec le modèle de votre choix en auto-hébergement, sur un cœur open source.' },
  ],
  lessKicker: 'Pourquoi il y a moins à écrire',
  lessTitle: ['L’AI n’écrit que la définition métier.', 'La plateforme exécute le reste.'],
  lessLanes: [
    { label: 'La voie habituelle', steps: ['L’AI écrit du code', 'Une pile de code neuf par application', 'Les problèmes apparaissent après la mise en production'] },
    { label: 'La voie ObjectOS', steps: ['L’AI écrit la définition métier', 'La plateforme l’exécute', 'Validée au moment de l’écriture'] },
  ],
  lessSizeTitle: 'Un CRM, selon ce qu’il faut écrire',
  lessSizes: [
    { label: 'Une base de code CRM classique écrite à la main', value: '300k–1M+ lignes', note: 'Un ordre de grandeur typique, pas une mesure' },
    { label: 'Module ventes de HotCRM (open source)', value: 'environ 28 000 lignes', note: '159 fichiers, 28 456 lignes : 11 objets, 21 fichiers de flux, 4 tableaux de bord' },
    { label: 'Le CRM de référence fourni avec le runtime', value: '2 189 lignes', note: '30 fichiers : examples/app-crm dans le dépôt objectstack' },
  ],
  lessMethod: 'Les deux dernières lignes sont mesurées : HotCRM au commit 94f8d04 de hotcrm, les fichiers .ts de src/sales hors tests, sans translations/ ni data/ ; le CRM de référence au commit e61af972 d’objectstack, examples/app-crm/src.',
  lessClosing: 'Les décisions restent dans la définition. La plomberie — tables, API CRUD, pages de liste et de détail, contrôles de permissions, écritures d’audit — est dérivée par le runtime.',
  lessLink: 'Lire l’argument complet',
  editionsCopy: positioning.fr.e1,
  primaryCta: 'Commencer',
  secondaryCta: 'Voir comment ça marche',
  videoCaption: 'ObjectStack en 90 secondes',
  videoPlayLabel: 'Lire la vidéo : ObjectStack en 90 secondes',
  videoMoreLink: 'Plus de vidéos sur YouTube',
  videoPosterEyebrow: 'PROTOCOLE ET RUNTIME OUVERTS · APACHE-2.0',
  videoPosterNote: 'Modèle de données · UI · workflows · permissions — si petit que l’AI le tient entier.',
  proof: [
    [positioning.fr.t3[0], 'Le runtime l’exécute'],
    [positioning.fr.t3[1], 'L’AI l’écrit'],
    [positioning.fr.t3[2], 'Les agents l’opèrent'],
    [positioning.fr.t3[3], 'Des métadonnées ObjectStack ordinaires ; l’export vers le runtime ouvert est prévu'],
  ],
  imageAlt: 'ObjectOS connectant données métier, applications et agents AI',
  imageNoteTitle: t2Lead(positioning.fr.t2),
  imageNote: 'Connexion des applications, données et agents',
  connectKicker: 'Comment il se branche sur l’existant',
  positioningTitle: ['Vous ne migrez pas.', 'Vous connectez.'],
  positioningLink: 'Ce qu’est une ontologie métier exécutable',
  positioningCopy: 'L’AI en entreprise n’a pas besoin d’un nouveau chantier de reconstruction ni d’une nouvelle pile de code généré. Elle a besoin d’une définition que les agents peuvent écrire, que les humains peuvent relire, et qu’un runtime gouverne à travers systèmes existants, nouvelles applications et agents AI. Vos objets et champs, relations, actions, permissions, flux, et définitions d’agents et d’outils sont cette définition — votre ontologie métier : ouverte, versionnée et à vous, pas un actif enfermé dans la plateforme d’un autre.',
  capabilities: [
    { title: 'Donnez aux agents un modèle métier', copy: 'Modélisez clients, commandes, équipements, dossiers et validations comme des objets que les agents peuvent lire, relier et modifier.' },
    { title: 'Fédérer — lecture en direct, en lecture seule d’abord', copy: 'Déclarez une base ou un service OData que vous exploitez déjà comme datasource externe et liez ses tables en objets. Les données restent à la source et chaque lecture lui est transmise, en direct. La fédération est en lecture seule par défaut, et encore récente : l’écriture s’active délibérément, sur la datasource et sur l’objet.' },
    { title: 'Synchroniser à sens unique — vers un objet en lecture seule', copy: 'Un job copie les lignes à sens unique dans un objet ordinaire. Les membres peuvent le lire et en tirer des rapports, mais pas le modifier : le pull est son seul rédacteur, et chaque exécution laisse une trace.' },
    { title: 'Écrire en retour par une action déclarée — pas de synchronisation bidirectionnelle', copy: 'Quand quelque chose doit changer dans le système source, une action déclarée l’appelle via un connecteur, avec les identifiants du connecteur. La copie locale n’est pas modifiée et le pull suivant rapporte le changement ; il n’y a ni écriture en retour automatique ni fusion de conflits.' },
  ],
  aiKicker: 'L’AI dans le produit',
  aiTitle: ['Interroger, modifier et construire en langage courant.', 'Vous voyez la source et confirmez le changement.'],
  aiNote: 'Intégrée à ObjectOS Cloud et Enterprise (en préversion sur Enterprise). L’AI travaille avec les permissions de la personne qui l’utilise et ne voit jamais plus qu’elle.',
  aiItems: [
    { title: 'Interroger : chaque chiffre cite sa source', copy: 'Posez vos questions métier en langage courant. Chaque réponse indique d’où viennent ses chiffres — l’objet, les filtres, ce qui a été mesuré et comment c’est regroupé — et renvoie vers les enregistrements concernés. Elle ne lit que ce que la personne qui pose la question a le droit de voir.' },
    { title: 'Les modifications de l’AI vous attendent', copy: 'Quand vous demandez à l’AI de créer ou de modifier un enregistrement, elle propose la modification et affiche l’ancienne et la nouvelle valeur. Rien n’est enregistré avant votre confirmation, puis la modification s’exécute avec vos permissions. L’AI intégrée modifie un enregistrement à la fois ; elle ne peut ni supprimer d’enregistrements ni les modifier en masse.' },
    { title: 'L’AI construit l’application', copy: 'Décrivez l’application ou la modification voulue. Le Builder intégré prépare les objets, champs, vues et workflows ; une modification d’une application en production qui contient des enregistrements attend en brouillon qu’une personne la publie.' },
  ],
  aiDeveloperLink: 'Développeurs : connectez votre propre agent via MCP',
  existingSystems: 'Systèmes existants',
  systemLabels: ['CRM', 'ERP', 'Base de données', 'Systèmes internes'],
  connectModel: 'Connecter et modéliser',
  objectLayer: 'Objets · Permissions · Processus · API · Audit',
  secureExecution: 'Exécuter en sécurité',
  outcomes: 'Valeur continue',
  outcomeLabels: ['Applications métier', 'Agents AI', 'Automatisation'],
  useCasesKicker: 'Comment les équipes métier l’utilisent',
  useCasesTitle: ['Ce que l’AI prend en charge pour chaque équipe,', 'et ce qu’une personne approuve encore'],
  useCasesLink: 'Tous les cas d’usage',
  useCaseCardLink: 'Voir le scénario',
  useCasesTemplatesLink: 'Ou partir d’un modèle d’application',
  useCases: [
    { title: 'Service client', copy: 'L’AI classe chaque ticket, retrouve les articles de connaissance et rédige des réponses sourcées ; l’agent confirme ce qui part, et une étape de validation du flow peut retenir les réponses de remboursement ou de compensation jusqu’à l’accord d’un responsable.' },
    { title: 'Finance et achats', copy: 'L’AI vérifie les notes de frais au regard de la politique et du budget et, une fois les données fournisseurs et livraisons connectées, signale le risque fournisseur avant l’approbation de l’achat ; finance et achats approuvent avec les preuves sous les yeux.' },
    { title: 'Ventes', copy: 'Les commerciaux mettent à jour le CRM en langage naturel, et l’AI prépare le prochain rendez-vous client ; chaque modification proposée attend leur confirmation.' },
  ],
  securityKicker: 'Sécurité et gouvernance',
  securityTitle: ['Les données restent dans votre réseau.', 'L’AI agit dans les permissions.'],
  securityCopy: 'ObjectOS Enterprise peut déployer et exploiter des applications ObjectStack sur votre infrastructure. Données métier, identités, journaux d’audit et fichiers restent sous votre contrôle ; les agents AI accèdent aux objets via des outils gouvernés et héritent des permissions de l’utilisateur connecté.',
  securityItems: [
    { title: 'Résidence des données', copy: 'Connectez vos bases de données et stockages ; enregistrements, identités, journaux d’audit et fichiers y restent.' },
    { title: 'Mêmes permissions pour les personnes et l’AI', copy: 'Les agents agissent comme l’utilisateur connecté et respectent les permissions d’objet, d’enregistrement et de champ : ils ne voient pas ce que l’utilisateur ne peut pas voir. Sur Enterprise, la visibilité des enregistrements peut aussi suivre la hiérarchie de votre organisation : sa propre unité, son unité et celles qui en dépendent, ou ses propres enregistrements et ceux de ses subordonnés.' },
    { title: 'Approbation et audit', copy: 'Les modifications de l’AI sur une application en production qui contient des enregistrements attendent en brouillon qu’une personne les publie, et les étapes de validation des flows soumettent les décisions métier à un valideur. Lectures et écritures d’enregistrements et changements de droits peuvent être audités ; l’audit de chaque appel d’outil de l’AI intégrée fait partie de la gouvernance AI sur Enterprise.' },
    { title: 'Fonctionne sur votre infrastructure', copy: 'ObjectOS Enterprise fonctionne dans votre réseau comme un runtime Node.js avec votre base, vos secrets et votre ingress : dans un VPC, sur des serveurs locaux avec Docker ou votre propre plateforme, ou en réseau isolé avec des images de conteneur offline, des modèles locaux et une identité interne.' },
  ],
  securityLink: 'Voir sécurité et gouvernance',
  insightsKicker: 'Dernières analyses',
  insightsTitle: 'Réflexions pratiques sur les logiciels écrits par l’AI',
  insightsLink: 'Voir tous les articles',
  closingKicker: 'Étape suivante',
  closingTitle: 'Voyez ce que l’AI peut prendre en charge pour votre équipe.',
  closingCopy: 'Commencez gratuitement sur ObjectOS Cloud sans rien installer, découvrez comment les équipes service, finance et ventes l’utilisent, ou parlez-nous d’un déploiement sur votre propre infrastructure.',
  closingCta: 'Commencer gratuitement',
  closingUseCasesCta: 'Voir les cas d’usage',
  closingDeveloperLink: 'Développeurs : pointez votre agent vers ObjectStack',
  compareKicker: 'Éditions et comparatif',
  compareTitle: ['Choisissez une édition.', 'Voyez ce qui change.'],
  editionsPricingLink: 'Comparer les éditions et les tarifs',
  compareLink: 'Lire le comparatif',
  comparisons: [
    { title: 'vs Airtable', copy: 'Une vraie base de données avec logique serveur et gouvernance au runtime — pas un workspace de type tableur.' },
    { title: 'vs Retool', copy: 'La logique métier est une métadonnée relisible — pas du JavaScript éparpillé entre les écrans.' },
    { title: 'vs Lovable & Bolt', copy: 'Les agents génèrent des métadonnées gouvernées avec schéma et permissions — pas une base de code jetable.' },
  ],
};

const ko: HomeCopy = {
  ...en,
  title: `ObjectOS · ${positioning.ko.t1}`,
  description: `${positioning.ko.t2} ObjectOS는 ${positioning.ko.descriptor}의 세 가지 에디션으로 제공됩니다.`,
  eyebrow: positioning.ko.descriptor,
  hero: positioning.ko.t1Hero,
  heroCategory: 'AI는 업무 정의만 작성하고 플랫폼이 그대로 실행합니다. 쓸 것은 적고, 기본으로 통제되며, 자체 환경에 배포됩니다.',
  heroLead: positioning.ko.t2,
  answersKicker: '결론부터',
  answersTitle: '가장 궁금한 다섯 가지 질문, 답부터 드립니다',
  answers: [
    { question: '새 시스템은 얼마나 빨리 만들 수 있나요?', answer: 'AI는 업무 정의만 작성하고 플랫폼이 그대로 실행합니다. 작성할 분량이 한두 자릿수만큼 적습니다.' },
    { question: '기존 시스템을 바꿔야 하나요?', answer: '아니요. 연결하면 AI가 기존 데이터를 읽을 수 있습니다.' },
    { question: '직원들이 새로 배워야 하나요?', answer: '아니요. 평소 쓰는 AI 어시스턴트에서 바로 묻고 바로 처리합니다.' },
    { question: 'AI가 제멋대로 움직이지 않나요?', answer: 'AI는 사용하는 사람 본인의 권한으로 동작합니다. 제품 내 AI의 데이터 변경은 본인의 확인을 기다리고, 플로의 승인은 승인자에게 갑니다.' },
    { question: '시스템과 데이터는 누가 쥐고 있나요?', answer: '여러분입니다. 자체 환경에서 운영할 수 있고, 자체 운영 시 모델을 직접 고르며, 코어인 ObjectStack은 오픈소스입니다.' },
  ],
  lessKicker: '작성할 것이 적은 이유',
  lessTitle: ['AI는 업무 정의만 작성하고,', '나머지는 플랫폼이 실행합니다'],
  lessLanes: [
    { label: '흔한 방식', steps: ['AI가 코드를 작성', '앱마다 새 코드 더미', '문제는 운영 시작 후에 드러남'] },
    { label: 'ObjectOS 방식', steps: ['AI가 업무 정의를 작성', '플랫폼이 그대로 실행', '작성하는 동안 검증'] },
  ],
  lessSizeTitle: '같은 CRM, 작성해야 하는 분량',
  lessSizes: [
    { label: '손으로 작성한 전통적인 CRM 코드베이스', value: '30만~100만 줄 이상', note: '일반적인 규모이며 실측값이 아닙니다' },
    { label: 'HotCRM 영업 모듈(오픈소스)', value: '약 28,000줄', note: '159개 파일, 28,456줄: 객체 11개, 플로 파일 21개, 대시보드 4개' },
    { label: '런타임에 포함된 레퍼런스 CRM', value: '2,189줄', note: '30개 파일: objectstack 저장소의 examples/app-crm' },
  ],
  lessMethod: '아래 두 행은 실측값입니다. HotCRM은 hotcrm 커밋 94f8d04의 src/sales 아래 테스트가 아닌 .ts 파일(translations/와 data/ 제외), 레퍼런스 CRM은 objectstack 커밋 e61af972의 examples/app-crm/src입니다.',
  lessClosing: '결정은 정의에 남습니다. 테이블, CRUD API, 목록·상세 페이지, 권한 검사, 감사 기록 같은 배관은 런타임이 도출합니다.',
  lessLink: '전체 근거 읽기',
  editionsCopy: positioning.ko.e1,
  primaryCta: '시작하기',
  secondaryCta: '작동 방식 보기',
  videoCaption: 'ObjectStack 90초 살펴보기',
  videoPlayLabel: '동영상 재생: ObjectStack 90초 살펴보기',
  videoMoreLink: 'YouTube에서 더 많은 영상 보기',
  videoPosterEyebrow: '오픈 프로토콜 & 런타임 · APACHE-2.0',
  videoPosterNote: '데이터 모델 · UI · 워크플로 · 권한 — AI가 한 번에 담을 만큼 작습니다.',
  proof: [
    [positioning.ko.t3[0], '런타임이 실행합니다'],
    [positioning.ko.t3[1], 'AI가 작성합니다'],
    [positioning.ko.t3[2], '에이전트가 운영합니다'],
    [positioning.ko.t3[3], '일반적인 ObjectStack 메타데이터. 오픈 런타임으로 내보내기는 계획 중'],
  ],
  imageAlt: '비즈니스 데이터, 애플리케이션과 AI 에이전트를 연결하는 ObjectOS',
  imageNoteTitle: t2Lead(positioning.ko.t2),
  imageNote: '애플리케이션, 데이터와 에이전트 연결 중',
  connectKicker: '기존 시스템과 연결되는 방식',
  positioningTitle: ['마이그레이션하지 말고,', '연결하세요.'],
  positioningLink: '실행 가능한 비즈니스 온톨로지란',
  positioningCopy: '엔터프라이즈 AI에 필요한 것은 또 하나의 재구축 프로젝트도, 검토하기 어려운 생성 코드 더미도 아닙니다. 에이전트가 작성하고 사람이 검토하며 런타임이 기존 시스템, 새 애플리케이션, AI 에이전트 전반에서 거버넌스를 유지하는 하나의 정의입니다. 객체와 필드, 관계, 작업, 권한, 플로, 그리고 에이전트와 도구 정의가 그 정의 — 당신의 비즈니스 온톨로지입니다. 열려 있고, 버전 관리되며, 당신의 것이지, 남의 플랫폼에 갇힌 자산이 아닙니다.',
  capabilities: [
    { title: '에이전트에 비즈니스 모델 제공', copy: '고객, 주문, 장비, 케이스, 승인을 에이전트가 읽고 연결하고 작업할 수 있는 객체로 모델링합니다.' },
    { title: '연합 — 실시간 읽기, 우선 읽기 전용으로', copy: '이미 운영 중인 데이터베이스나 OData 서비스를 외부 데이터소스로 선언하고 그 테이블을 객체로 바인딩합니다. 데이터는 원본에 남고 읽기는 매번 실시간으로 원본에 전달됩니다. 연합은 기본적으로 읽기 전용이며 아직 초기 단계입니다. 쓰기는 데이터소스와 객체 양쪽에서 의도적으로 활성화합니다.' },
    { title: '단방향 동기화 — 읽기 전용 객체로', copy: '작업이 데이터를 한 방향으로 복사해 일반 객체로 만듭니다. 구성원은 읽고 보고서를 만들 수 있지만 편집할 수는 없습니다. 쓰는 것은 풀뿐이며 실행할 때마다 기록이 남습니다.' },
    { title: '선언된 액션으로 되쓰기 — 양방향 동기화 없음', copy: '원본 시스템을 바꿔야 할 때는 선언된 액션이 커넥터를 통해 커넥터 자체의 자격 증명으로 원본을 호출합니다. 로컬 사본은 편집되지 않고 다음 풀이 변경을 가져옵니다. 자동 되쓰기도 충돌 병합도 없습니다.' },
  ],
  aiKicker: '제품 속 AI',
  aiTitle: ['평소 말로 묻고, 데이터를 바꾸고, 앱을 만듭니다.', '출처가 보이고, 변경은 직접 확정합니다.'],
  aiNote: 'ObjectOS Cloud와 Enterprise에 내장되어 있습니다(Enterprise에서는 프리뷰). AI는 사용하는 사람 본인의 권한으로 동작하므로 그 사람이 볼 수 있는 범위를 넘어서 보지 않습니다.',
  aiItems: [
    { title: '질문: 모든 숫자에 출처 표시', copy: '비즈니스에 대해 평소 말로 질문하세요. 답변마다 숫자의 출처, 즉 어떤 객체에서 어떤 필터로 무엇을 집계해 어떻게 그룹화했는지 밝히고, 근거가 된 레코드 링크를 붙입니다. 질문한 사람이 볼 수 있는 데이터만 읽습니다.' },
    { title: 'AI의 변경은 확인을 기다립니다', copy: 'AI에게 레코드 추가나 변경을 요청하면 먼저 변경안을 제시하고 이전 값과 새 값을 보여 줍니다. 사용자가 확정하기 전에는 아무것도 저장되지 않으며, 확정하면 사용자 본인의 권한으로 실행됩니다. 제품 내 AI는 한 번에 레코드 하나만 변경하며, 레코드를 삭제하거나 일괄 편집할 수 없습니다.' },
    { title: 'AI가 앱을 만듭니다', copy: '필요한 앱이나 변경을 설명하세요. 내장 Builder가 객체, 필드, 뷰, 워크플로의 초안을 만들고, 레코드가 있는 운영 중인 앱에 대한 변경은 사람이 게시할 때까지 초안으로 저장됩니다.' },
  ],
  aiDeveloperLink: '개발자: MCP로 자체 에이전트 연결하기',
  existingSystems: '기존 시스템',
  systemLabels: ['CRM', 'ERP', '데이터베이스', '자체 시스템'],
  connectModel: '연결 및 모델링',
  objectLayer: '객체 · 권한 · 프로세스 · API · 감사',
  secureExecution: '안전한 실행',
  outcomes: '지속적인 가치',
  outcomeLabels: ['업무 앱', 'AI 에이전트', '자동화'],
  useCasesKicker: '비즈니스 팀의 활용 방식',
  useCasesTitle: ['팀마다 AI가 맡는 일,', '그리고 사람이 승인하는 일'],
  useCasesLink: '모든 활용 사례',
  useCaseCardLink: '시나리오 보기',
  useCasesTemplatesLink: '또는 애플리케이션 템플릿에서 시작하기',
  useCases: [
    { title: '고객 서비스', copy: 'AI가 티켓을 분류하고 지식 문서를 찾아 출처가 달린 답변 초안을 씁니다. 무엇을 보낼지는 상담원이 확인하고, 환불·보상 답변은 플로의 승인 단계에서 관리자 승인을 거친 뒤 보내도록 할 수 있습니다.' },
    { title: '재무·구매', copy: 'AI가 경비 청구를 정책과 예산에 비추어 확인하고, 공급업체·납품 데이터를 연결하면 구매 승인 전에 공급업체 리스크를 보여 줍니다. 재무와 구매는 근거를 보고 승인합니다.' },
    { title: '영업', copy: '영업 담당자는 자연어로 CRM을 업데이트하고 AI가 다음 고객 미팅을 준비합니다. 제안된 레코드 변경은 모두 담당자의 확인을 기다립니다.' },
  ],
  securityKicker: '보안 및 거버넌스',
  securityTitle: ['데이터는 네트워크 안에 유지하고,', 'AI는 권한 경계 안에서 작동합니다'],
  securityCopy: 'ObjectOS Enterprise는 사용자의 인프라에 ObjectStack 앱을 배포하고 운영할 수 있습니다. 비즈니스 기록, ID, 감사 로그와 파일은 사용자가 통제하며, AI 에이전트는 관리되는 도구로 객체에 접근하고 로그인한 사용자의 권한을 상속합니다.',
  securityItems: [
    { title: '데이터 레지던시', copy: '사용자의 데이터베이스와 스토리지를 연결합니다. 비즈니스 기록, ID, 감사 로그, 파일은 그곳에 남습니다.' },
    { title: '사람과 AI에 같은 권한', copy: '에이전트는 로그인한 사용자로 동작하며 객체, 레코드, 필드 권한을 따르므로 사용자가 볼 수 없는 데이터는 볼 수 없습니다. Enterprise에서는 조직 계층에 따라 레코드 공개 범위를 정할 수도 있습니다. 본인 부서, 본인 부서와 하위 부서, 또는 본인과 부하 직원의 레코드입니다.' },
    { title: '승인 및 감사', copy: '레코드가 있는 운영 중인 앱에 대한 AI 변경은 사람이 게시할 때까지 초안으로 대기하고, 플로의 승인 단계가 업무 결정을 승인자에게 보냅니다. 레코드 읽기·쓰기와 권한 변경은 감사 로그에 기록할 수 있으며, 제품 내 AI의 도구 호출별 감사는 Enterprise의 AI 거버넌스에 포함됩니다.' },
    { title: '자체 인프라에서 운영', copy: 'ObjectOS Enterprise는 네트워크 안에서 Node.js 런타임 하나와 사용자의 데이터베이스, 시크릿, 인그레스로 실행됩니다. VPC, Docker나 자체 플랫폼을 쓰는 로컬 서버, 오프라인 컨테이너 이미지와 로컬 모델, 내부 ID를 쓰는 폐쇄망에서 운영할 수 있습니다.' },
  ],
  securityLink: '보안 및 거버넌스 보기',
  insightsKicker: '최신 인사이트',
  insightsTitle: 'AI가 작성한 소프트웨어에 대한 실무적 관점',
  insightsLink: '모든 글 보기',
  closingKicker: '다음 단계',
  closingTitle: 'AI가 팀의 어떤 일을 맡을 수 있는지 확인하세요.',
  closingCopy: '설치가 필요 없는 ObjectOS Cloud에서 무료로 시작하거나, 고객 서비스·재무·영업 팀의 활용 방식을 보거나, 자체 인프라 운영에 대해 문의하세요.',
  closingCta: '무료로 시작하기',
  closingUseCasesCta: '활용 사례 보기',
  closingDeveloperLink: '개발자: 에이전트를 ObjectStack에 연결하기',
  compareKicker: '에디션과 비교',
  compareTitle: ['맞는 에디션을 고르고,', '익숙한 도구와 비교해 보세요'],
  editionsPricingLink: '에디션과 가격 비교',
  compareLink: '비교 보기',
  comparisons: [
    { title: 'vs Airtable', copy: '스프레드시트형 워크스페이스가 아니라 서버 로직과 런타임 거버넌스를 갖춘 진짜 데이터베이스.' },
    { title: 'vs Retool', copy: '화면에 흩어진 JavaScript가 아니라 검토 가능한 비즈니스 로직 메타데이터.' },
    { title: 'vs Lovable & Bolt', copy: '일회용 코드베이스가 아니라 스키마와 권한을 갖춘 거버넌스 메타데이터를 에이전트가 생성합니다.' },
  ],
};

const toHant = (value: unknown): unknown => {
  if (typeof value === 'string') return s2t(value);
  if (Array.isArray(value)) return value.map(toHant);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, toHant(item)]));
  }
  return value;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': toHant(zhHans) as HomeCopy,
  ja,
  de,
  es,
  fr,
  ko,
};

// The edition paragraph is E1 verbatim in every locale, and the hero lead is
// T2 alone — the contract the hero split made (www #335). #411 moved E1 from
// under the hero's CTA row to the editions-and-comparison block; its words did
// not change, and this check moved with it. A later hand edit to either, in
// any locale, fails `astro build` here instead of shipping a paraphrase;
// zh-Hant is covered too, since both sides derive it from zh-Hans the same way.
for (const [locale, copy] of Object.entries(homeCopy) as [Locale, HomeCopy][]) {
  if (copy.editionsCopy !== positioning[locale].e1) {
    throw new Error(
      `homeCopy[${locale}].editionsCopy is not E1 verbatim: "${copy.editionsCopy}" vs "${positioning[locale].e1}"`
    );
  }
  if (copy.heroLead !== positioning[locale].t2) {
    throw new Error(`homeCopy[${locale}].heroLead is not T2: "${copy.heroLead}" vs "${positioning[locale].t2}"`);
  }
}
