import { s2t } from './zhconvert';
import type { Locale } from './i18n';

interface HomeCopy {
  title: string;
  description: string;
  eyebrow: string;
  hero: [string, string];
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  proof: [string, string][];
  imageAlt: string;
  imageNoteTitle: string;
  imageNote: string;
  positioningKicker: string;
  positioningTitle: [string, string];
  positioningCopy: string;
  capabilitiesKicker: string;
  capabilitiesTitle: [string, string];
  capabilitiesLink: string;
  capabilities: { title: string; copy: string }[];
  aiKicker: string;
  aiTitle: [string, string];
  aiCopy: string;
  aiItems: { title: string; copy: string }[];
  aiLink: string;
  workflowKicker: string;
  workflowTitle: [string, string];
  workflowCopy: string;
  existingSystems: string;
  systemLabels: [string, string, string, string];
  connectModel: string;
  objectLayer: string;
  secureExecution: string;
  outcomes: string;
  outcomeLabels: [string, string, string];
  solutionsKicker: string;
  solutionsTitle: [string, string];
  solutionLink: string;
  solutions: { title: string; copy: string }[];
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
  closingCta: string;
  compareKicker: string;
  compareTitle: [string, string];
  compareLink: string;
  comparisons: { title: string; copy: string }[];
}

const zhHans: HomeCopy = {
  title: 'ObjectOS · AI 写应用的受治理运行时',
  description: 'ObjectOS 是 AI 所写业务应用的开源目标格式和运行时。你的 Agent 编写紧凑的 ObjectStack 元数据；对典型 CRUD/流程应用，AI 实际要写的内容常可接近传统代码量的 1%。人审阅小 diff，运行时在你控制的数据库上执行权限、审批和审计。',
  eyebrow: 'AI 写应用的受治理运行时',
  hero: ['AI 写应用。', 'ObjectOS 让它可治理。'],
  heroLead: '把编码 Agent 指向 ObjectStack。它把模型、界面、流程、权限和工具写成紧凑元数据，而不是整套代码。对很多 CRUD/流程应用，AI 要写的内容可接近 1%，迭代有机会接近百倍；人只审小 diff，运行时执行治理。',
  primaryCta: '开始使用',
  secondaryCta: '了解工作原理',
  proof: [['开源协议', 'Apache 2.0，可自托管'], ['约 1% 代码面', '写元数据，不写整套应用'], ['接近百倍迭代', '小 diff + 受治理运行时']],
  imageAlt: 'ObjectOS 连接业务数据、应用和 AI Agent 的产品示意图',
  imageNoteTitle: '统一业务对象层',
  imageNote: '正在连接应用、数据与 Agent',
  positioningKicker: '面向 AI 所写企业软件',
  positioningTitle: ['保留已经有效的系统，', '补上 Agent 可治理运行时。'],
  positioningCopy: '企业 AI 不需要又一次重建，也不需要更多不可审的生成代码。它需要一种 Agent 能写、人能审、运行时能治理的紧凑目标格式，把旧系统、新应用和 AI Agent 接在一起。',
  capabilitiesKicker: '平台能力',
  capabilitiesTitle: ['从业务结构出发，', '而不是从空白代码开始'],
  capabilitiesLink: '阅读 AI 与 Agent 文章',
  capabilities: [
    { title: '给 Agent 一个业务模型', copy: '把客户、订单、设备、工单和审批建模成对象，让 Agent 能准确读取、关联和操作。' },
    { title: '连接现有系统，不必替换', copy: '在已有数据库、ERP、CRM 和自研系统之上增加 API、权限、流程和智能能力。' },
    { title: '生成元数据，而不是整套代码', copy: '对典型 CRUD 和流程型软件，Agent 编写紧凑的 ObjectStack 定义，ObjectOS 提供表、API、界面、工具、权限和审计。要生成的代码更少，要审的代码也更少。' },
    { title: '在运行时执行治理', copy: '复用企业身份、权限、审批队列和审计日志，让每一次 Agent 操作都有明确边界。' },
  ],
  aiKicker: 'AI 构建与 Agent 运行',
  aiTitle: ['让 Agent 生成软件，', '让人保留审阅权。'],
  aiCopy: 'ObjectOS 把对象、字段、流程、权限和动作变成 Agent 可读写的声明式元数据，并通过受治理工具访问。开源版采用自带 AI（BYO-AI）：你的编码 Agent 以源码方式编写元数据，通常只是生成整套应用代码的一小部分；你审阅 diff，任意 MCP 客户端即可问询数据。对 CRUD 和流程型场景，运行时承担重复的 99%，因此元数据级变更可以接近百倍迭代，同时仍然可审计、可治理。界面内 Build 与 Ask 助手在云端与企业版提供。',
  aiItems: [
    { title: 'AI Builder', copy: '云端与企业版：用自然语言描述变更。内置 Builder 生成对象、字段、视图、流程和权限，结构性变更进入审批。开源版中，你自己的编码 Agent 编写同样紧凑的元数据 diff，而不是生成整套应用代码。' },
    { title: 'AI Ask', copy: '云端与企业版：在产品内问询数据、分析业务上下文，并在登录用户权限内触发已批准动作。开源版则通过 MCP 用你自己的 AI 问询同样的对象。' },
    { title: 'Tools / MCP', copy: '各版本通用：@objectstack/mcp 把对象、查询和动作暴露为受策略约束的工具，供 Claude、Cursor、任意 MCP 客户端或本地模型调用。' },
  ],
  aiLink: '查看 AI 安全模型',
  workflowKicker: '工作方式',
  workflowTitle: ['把业务运营变成', 'Agent 能使用的结构'],
  workflowCopy: 'ObjectOS 用统一元数据描述对象、关系、权限、流程和动作。Agent 修改紧凑的定义层，而不是反复生成应用代码，所以业务迭代可以更快、更容易审阅，也始终处在治理边界内。',
  existingSystems: '你的现有系统',
  systemLabels: ['CRM', 'ERP', '数据库', '自研系统'],
  connectModel: '连接与建模',
  objectLayer: '对象 · 权限 · 流程 · API · 审计',
  secureExecution: '安全执行',
  outcomes: '持续产生价值',
  outcomeLabels: ['业务应用', 'AI Agent', '自动化'],
  solutionsKicker: '应用模板',
  solutionsTitle: ['从可运行模板开始，', '而不是从空白系统开始'],
  solutionLink: '查看模板源码',
  solutions: [
    { title: 'Helpdesk 模板', copy: '面向客户支持的 AI-first 模板，覆盖工单、SLA、摘要、建议回复和知识库召回。' },
    { title: 'Contracts 模板', copy: '覆盖合同生命周期管理，支持元数据提取、审批、续约提醒和审计追踪。' },
    { title: 'Procurement 模板', copy: '覆盖采购请求、供应商、PO、收货和三单匹配，把审批流变成可运行应用。' },
  ],
  securityKicker: '安全与治理',
  securityTitle: ['数据留在你的网络里，', 'AI 在权限边界内工作'],
  securityCopy: 'ObjectOS 作为自托管运行时部署在你的基础设施中。业务数据、身份、审计日志和文件仍由你控制；AI Agent 通过受控工具访问对象，并继承登录用户已有的权限。',
  securityItems: [
    { title: '数据不出网', copy: '连接你的数据库和存储；除非你显式配置外部服务，否则 ObjectOS 不回传、不查 license server、也不收集遥测。' },
    { title: '继承用户权限', copy: 'Agent 以登录用户身份执行，遵守对象级、记录级和字段级权限，看不到用户本来无权看到的数据。' },
    { title: '审批与审计', copy: '结构性变更进入人机协作审批队列；读取、写入、工具调用和权限变更都能写入审计日志。' },
    { title: '支持离线部署', copy: '可在 VPC、本地服务器或隔离网络中运行，并可接入本地模型、内部身份系统和自有密钥管理。' },
  ],
  securityLink: '了解安全与治理',
  insightsKicker: '最新洞察',
  insightsTitle: '关于 AI-native 软件的实践思考',
  insightsLink: '浏览全部文章',
  closingKicker: '下一步',
  closingTitle: '从你最熟悉的一套业务数据开始。',
  closingCopy: '连接一个现有系统，定义关键业务对象，让 Agent 用一个小元数据 diff 发布第一个受治理的 AI 所写应用。',
  closingCta: '了解如何连接现有系统',
  compareKicker: '对比',
  compareTitle: ['和你熟悉的工具', '不是一回事'],
  compareLink: '阅读对比',
  comparisons: [
    { title: 'vs Airtable', copy: '真实数据库、服务端逻辑和运行时治理，不是表格式工作区。' },
    { title: 'vs Retool', copy: '业务逻辑是可审阅元数据，不是散落在屏幕里的 JavaScript。' },
    { title: 'vs Lovable & Bolt', copy: 'Agent 生成带 schema 和权限的受治理元数据，不是一次性代码库。' },
  ],
};

const en: HomeCopy = {
  title: 'ObjectOS · Governed runtime for AI-written apps',
  description: 'ObjectOS is the open-source target format and runtime for AI-written business applications. Your agent writes compact ObjectStack metadata, often around 1% of a traditional CRUD/workflow codebase; humans review a small diff, and the runtime enforces permissions, approvals, and audit on a database you control.',
  eyebrow: 'Governed runtime for AI-written apps',
  hero: ['AI writes the app.', 'ObjectOS keeps it governable.'],
  heroLead: 'Point your coding agent at ObjectStack. It writes models, UI, workflows, permissions, and tools as compact metadata, not a full codebase. In many CRUD/workflow apps, code moves toward 1%, iteration toward 100x, and people review small governed diffs.',
  primaryCta: 'Get started',
  secondaryCta: 'See how it works',
  proof: [['Open protocol', 'Apache 2.0, self-hostable'], ['~1% code surface', 'Metadata instead of app code'], ['~100x iteration', 'Small diffs, governed runtime']],
  imageAlt: 'ObjectOS connecting business data, applications, and AI agents',
  imageNoteTitle: 'Unified business object layer',
  imageNote: 'Connecting applications, data, and agents',
  positioningKicker: 'For AI-written enterprise software',
  positioningTitle: ['Keep the systems that work.', 'Add a governed runtime for agents.'],
  positioningCopy: 'Enterprise AI does not need another rebuild project or another pile of generated code. It needs a compact target format agents can write, humans can review, and a runtime that keeps each change governed across legacy systems, new applications, and AI agents.',
  capabilitiesKicker: 'Platform capabilities',
  capabilitiesTitle: ['Start with the business model,', 'not a blank codebase'],
  capabilitiesLink: 'Read about AI and agents',
  capabilities: [
    { title: 'Give agents a business model', copy: 'Model customers, orders, equipment, cases, and approvals as objects agents can read, relate, and act on.' },
    { title: 'Extend systems without replacing them', copy: 'Add APIs, permissions, workflows, and intelligence on top of databases, ERP, CRM, and custom systems.' },
    { title: 'Generate metadata, not app code', copy: 'For typical CRUD and workflow software, agents write the compact ObjectStack definition while ObjectOS supplies tables, APIs, UI, tools, permissions, and audit. Less code to generate, less code to review.' },
    { title: 'Enforce governance at runtime', copy: 'Reuse enterprise identity, permissions, approval queues, and audit logs so every agent action has a defined boundary.' },
  ],
  aiKicker: 'AI build and agent operations',
  aiTitle: ['Let agents create the software.', 'Keep people in the review loop.'],
  aiCopy: 'ObjectOS turns objects, fields, workflows, permissions, and actions into declarative metadata that agents can read and update through governed tools. In the open-source edition, you bring your own AI: a coding agent writes metadata as source files, often a tiny fraction of a generated app codebase; you review the diff, and any MCP client can query your data. For CRUD and workflow surfaces, the runtime supplies the repeated 99%, so metadata-only changes can move at two-orders-of-magnitude iteration speed. The in-app Build and Ask assistants run on Cloud and Enterprise.',
  aiItems: [
    { title: 'AI Builder', copy: 'Cloud & Enterprise: describe a change in natural language. The in-app Builder generates objects, fields, views, workflows, and permissions, then routes structural changes for approval. In open source, your coding agent writes the same compact metadata diff instead of a full app codebase.' },
    { title: 'AI Ask', copy: 'Cloud & Enterprise: ask questions inside the product, analyze business context, and trigger approved actions within the signed-in user’s permissions. In open source, query the same objects through MCP with your own AI.' },
    { title: 'Tools / MCP', copy: 'All editions: @objectstack/mcp exposes objects, queries, and actions as policy-aware tools for Claude, Cursor, any MCP client, or a local model.' },
  ],
  aiLink: 'View the AI security model',
  workflowKicker: 'How it works',
  workflowTitle: ['Turn business operations into', 'a structure agents can use'],
  workflowCopy: 'ObjectOS describes objects, relationships, permissions, workflows, and actions in unified metadata. Agents change a compact definition layer instead of regenerating application code, so business iterations stay fast, reviewable, and governed.',
  existingSystems: 'Your existing systems',
  systemLabels: ['CRM', 'ERP', 'Databases', 'Custom systems'],
  connectModel: 'Model objects',
  objectLayer: 'Objects · Permissions · Workflows · API · Audit',
  secureExecution: 'Govern execution',
  outcomes: 'What runs on top',
  outcomeLabels: ['Business apps', 'AI agents', 'Automation'],
  solutionsKicker: 'Application templates',
  solutionsTitle: ['Start with working templates,', 'not a blank canvas'],
  solutionLink: 'View template source',
  solutions: [
    { title: 'Helpdesk template', copy: 'An AI-first customer support template for tickets, SLA, summaries, suggested replies, and knowledge retrieval.' },
    { title: 'Contracts template', copy: 'Manage the contract lifecycle with metadata extraction, approval, renewal reminders, and audit trails.' },
    { title: 'Procurement template', copy: 'Run purchase requests, suppliers, POs, receiving, and three-way matching as a governed application.' },
  ],
  securityKicker: 'Security and governance',
  securityTitle: ['Keep data in your network.', 'Let AI work inside permissions.'],
  securityCopy: 'ObjectOS runs as a self-hosted runtime on your infrastructure. Business records, identities, audit logs, and files stay under your control; AI agents access objects through governed tools and inherit the signed-in user’s permissions.',
  securityItems: [
    { title: 'Data residency', copy: 'Connect your databases and storage. Unless you configure an external service, ObjectOS does not send telemetry, contact a license server, or transmit data back to ObjectStack.' },
    { title: 'User-scoped AI', copy: 'Agents act as signed-in users and obey object, record, and field permissions, so they cannot see data the user cannot see.' },
    { title: 'Approval and audit', copy: 'Structural changes go through a human approval queue. Reads, writes, tool calls, and permission changes can be written to audit logs.' },
    { title: 'Offline ready', copy: 'Run in a VPC, on local servers, or in air-gapped networks with local models, internal identity, and your own secrets management.' },
  ],
  securityLink: 'Explore security and governance',
  insightsKicker: 'Latest insights',
  insightsTitle: 'Practical thinking on AI-native software',
  insightsLink: 'Browse all articles',
  closingKicker: 'Next step',
  closingTitle: 'Start with the business data you know best.',
  closingCopy: 'Connect one existing system, define its key business objects, and let your agent ship the first governed AI-written application as a small metadata diff.',
  closingCta: 'Learn how to connect existing systems',
  compareKicker: 'How it compares',
  compareTitle: ['Different from', 'the tools you know'],
  compareLink: 'Read the comparison',
  comparisons: [
    { title: 'vs Airtable', copy: 'A real database with server-side logic and runtime governance — not a spreadsheet-style workspace.' },
    { title: 'vs Retool', copy: 'Business logic is reviewable metadata — not JavaScript scattered across screens.' },
    { title: 'vs Lovable & Bolt', copy: 'Agents generate governed metadata with schema and permissions — not a one-off codebase.' },
  ],
};

const ja: HomeCopy = {
  ...en,
  title: 'ObjectOS · AI が書くアプリのガバナンス実行基盤',
  description: 'ObjectOS は AI が書く業務アプリのためのオープンソースのターゲット形式とランタイムです。エージェントはコンパクトな ObjectStack メタデータを書き、CRUD/ワークフロー型アプリでは従来コード量の約1%に近づくことがあります。人は小さな diff をレビューし、ランタイムが権限、承認、監査を実行します。',
  eyebrow: 'AI が書くアプリのガバナンス実行基盤',
  hero: ['AI がアプリを書く。', 'ObjectOS が統制する。'],
  heroLead: 'コーディングエージェントを ObjectStack に向けます。モデル、UI、ワークフロー、権限、ツールをフルコードではなくコンパクトなメタデータとして書きます。多くの CRUD/ワークフロー型アプリでは、書く面は約1%、反復は100倍級に近づきます。人は小さな diff をレビューし、ランタイムが統制します。',
  primaryCta: 'はじめる',
  secondaryCta: '仕組みを見る',
  proof: [['オープンプロトコル', 'Apache 2.0・セルフホスト可'], ['約1%のコード面', 'アプリコードではなくメタデータ'], ['100倍級の反復', '小さな diff と統制ランタイム']],
  imageAlt: '業務データ、アプリ、AI エージェントを接続する ObjectOS',
  imageNoteTitle: '統一業務オブジェクト層',
  imageNote: 'アプリ、データ、エージェントを接続中',
  positioningKicker: 'AI が書くエンタープライズソフトウェアへ',
  positioningTitle: ['今あるシステムを活かし、', 'エージェント用の統制ランタイムを加える。'],
  positioningCopy: 'エンタープライズ AI に必要なのは、また一つの再構築プロジェクトでも、レビュー不能な生成コードの山でもありません。エージェントが書き、人がレビューでき、ランタイムが統制するコンパクトなターゲット形式です。',
  capabilitiesKicker: 'プラットフォーム機能',
  capabilitiesTitle: ['白紙のコードではなく、', '業務構造から始める'],
  capabilitiesLink: 'AI とエージェントの記事',
  capabilities: [
    { title: 'エージェントに業務モデルを渡す', copy: '顧客、注文、設備、ケース、承認を、エージェントが読み、関連付け、操作できるオブジェクトとしてモデル化します。' },
    { title: '既存システムを置き換えずに拡張', copy: 'データベース、ERP、CRM、自社システムの上に API、権限、ワークフロー、インテリジェンスを追加します。' },
    { title: 'コードではなくメタデータを生成', copy: '典型的な CRUD/ワークフロー型ソフトウェアでは、エージェントはコンパクトな ObjectStack 定義を書き、ObjectOS がテーブル、API、UI、ツール、権限、監査を提供します。生成するコードもレビューするコードも少なくなります。' },
    { title: 'ランタイムでガバナンスを実行', copy: '企業 ID、権限、承認キュー、監査ログを再利用し、すべてのエージェント操作に明確な境界を設けます。' },
  ],
  aiKicker: 'AI 構築とエージェント運用',
  aiTitle: ['エージェントにソフトウェアを作らせる。', '人はレビューの輪に残る。'],
  aiCopy: 'ObjectOS はオブジェクト、項目、ワークフロー、権限、アクションを、エージェントが統制されたツールで読み書きできる宣言的メタデータにします。オープンソース版は BYO-AI：自分のコーディングエージェントがメタデータをソースファイルとして書きます。多くの場合、それは生成アプリコードのごく一部です。人は diff をレビューし、任意の MCP クライアントがデータを問い合わせられます。CRUD/ワークフロー領域では、反復的な 99% をランタイムが担うため、メタデータだけの変更は二桁違いの反復速度に近づけます。製品内の Build／Ask アシスタントは Cloud／Enterprise で提供します。',
  aiItems: [
    { title: 'AI Builder', copy: 'Cloud／Enterprise：自然言語で変更を説明します。製品内 Builder がオブジェクト、項目、ビュー、ワークフロー、権限を生成し、構造変更を承認へ送ります。オープンソースでは、自分のコーディングエージェントがフルコードではなく同じコンパクトなメタデータ diff を書きます。' },
    { title: 'AI Ask', copy: 'Cloud／Enterprise：製品内で質問し、業務コンテキストを分析し、ログインユーザーの権限内で承認済みアクションを実行します。オープンソースでは、同じオブジェクトを MCP 経由で自分の AI から問い合わせます。' },
    { title: 'Tools / MCP', copy: '全エディション共通：@objectstack/mcp がオブジェクト、クエリ、アクションをポリシー対応ツールとして Claude、Cursor、任意の MCP クライアント、ローカルモデルに公開します。' },
  ],
  aiLink: 'AI セキュリティモデルを見る',
  workflowKicker: '仕組み',
  workflowTitle: ['業務オペレーションを、', 'エージェントが使える構造へ'],
  workflowCopy: 'ObjectOS はオブジェクト、関係、権限、ワークフロー、アクションを統一メタデータで記述します。エージェントはアプリケーションコードを作り直すのではなく、コンパクトな定義層を変更するため、業務反復は速く、レビューしやすく、統制されたまま進みます。',
  existingSystems: '既存システム',
  systemLabels: ['CRM', 'ERP', 'データベース', '自社システム'],
  connectModel: '接続とモデリング',
  objectLayer: 'オブジェクト · 権限 · フロー · API · 監査',
  secureExecution: '安全に実行',
  outcomes: '継続的な価値',
  outcomeLabels: ['業務アプリ', 'AI エージェント', '自動化'],
  solutionsKicker: 'アプリテンプレート',
  solutionsTitle: ['動くテンプレートから始め、', '白紙のシステムから始めない'],
  solutionLink: 'テンプレートのソースを見る',
  solutions: [
    { title: 'Helpdesk テンプレート', copy: 'チケット、SLA、要約、返信提案、ナレッジ検索を備えた AI-first の顧客サポートテンプレートです。' },
    { title: 'Contracts テンプレート', copy: '契約ライフサイクルを管理し、メタデータ抽出、承認、更新リマインダー、監査に対応します。' },
    { title: 'Procurement テンプレート', copy: '購買依頼、サプライヤー、PO、受領、三点照合を管理されたアプリとして実行します。' },
  ],
  securityKicker: 'セキュリティとガバナンス',
  securityTitle: ['データは自社ネットワーク内に。', 'AI は権限の内側で動く。'],
  securityCopy: 'ObjectOS は自社インフラ上で動くセルフホスト型ランタイムです。業務データ、ID、監査ログ、ファイルは自社管理のまま。AI エージェントは管理されたツール経由でオブジェクトにアクセスし、ログインユーザーの権限を継承します。',
  securityItems: [
    { title: 'データ所在地', copy: '自社のデータベースとストレージに接続します。外部サービスを明示的に設定しない限り、ObjectOS は外部送信、ライセンス確認、テレメトリ収集を行いません。' },
    { title: 'ユーザー権限で動く AI', copy: 'エージェントはログインユーザーとして動作し、オブジェクト、レコード、フィールドの権限に従います。' },
    { title: '承認と監査', copy: '構造的な変更は人の承認キューに入り、読み取り、書き込み、ツール呼び出し、権限変更は監査ログに記録できます。' },
    { title: 'オフライン対応', copy: 'VPC、ローカルサーバー、隔離ネットワークで動作し、ローカルモデル、社内 ID、独自のシークレット管理に接続できます。' },
  ],
  securityLink: 'セキュリティとガバナンスを見る',
  insightsKicker: '最新インサイト',
  insightsTitle: 'AI-native ソフトウェアの実践知',
  insightsLink: 'すべての記事',
  closingKicker: '次のステップ',
  closingTitle: '最もよく知る業務データから始めましょう。',
  closingCopy: '既存システムを一つ接続し、主要な業務オブジェクトを定義して、最初のガバナンス付き AI-written アプリを小さなメタデータ diff として出荷します。',
  closingCta: '既存システムとの接続方法',
  compareKicker: '比較',
  compareTitle: ['よくあるツールとは', '別物です'],
  compareLink: '比較を読む',
  comparisons: [
    { title: 'vs Airtable', copy: '本物のデータベース、サーバーサイドロジック、ランタイムガバナンス。表計算型ワークスペースではありません。' },
    { title: 'vs Retool', copy: '業務ロジックはレビュー可能なメタデータ。画面に散らばる JavaScript ではありません。' },
    { title: 'vs Lovable & Bolt', copy: 'エージェントはスキーマと権限を持つ統制メタデータを生成します。使い捨てコードベースではありません。' },
  ],
};

const de: HomeCopy = {
  ...en,
  title: 'ObjectOS · Kontrollierte Runtime für AI-geschriebene Apps',
  description: 'ObjectOS ist das quelloffene Zielformat und die Runtime für von AI geschriebene Business-Anwendungen. Ihr Agent schreibt kompakte ObjectStack-Metadaten, bei CRUD- und Workflow-Apps oft nahe 1 % eines traditionellen Codebestands; Menschen prüfen einen kleinen Diff, und die Runtime erzwingt Rechte, Freigaben und Audit auf einer Datenbank unter Ihrer Kontrolle.',
  eyebrow: 'Kontrollierte Runtime für AI-geschriebene Apps',
  hero: ['AI schreibt die App.', 'ObjectOS hält sie kontrollierbar.'],
  heroLead: 'Richten Sie Ihren Coding-Agent auf ObjectStack. Er schreibt Modell, UI, Workflows, Rechte und Agent-Tools als kompakte Metadaten statt als Codebasis. Bei vielen CRUD-/Workflow-Apps bewegt sich die Schreibfläche Richtung 1 % und Iteration Richtung 100x; Menschen prüfen kleine Diffs, die Runtime erzwingt Governance.',
  primaryCta: 'Loslegen',
  secondaryCta: 'So funktioniert es',
  proof: [['Offenes Protokoll', 'Apache 2.0, selbst hostbar'], ['~1 % Codeumfang', 'Metadaten statt App-Code'], ['~100x Iteration', 'Kleine Diffs, kontrollierte Runtime']],
  imageAlt: 'ObjectOS verbindet Geschäftsdaten, Anwendungen und AI Agents',
  imageNoteTitle: 'Einheitliche Geschäftsobjektschicht',
  imageNote: 'Verbindet Anwendungen, Daten und Agents',
  positioningKicker: 'Für AI-geschriebene Unternehmenssoftware',
  positioningTitle: ['Bewährte Systeme behalten.', 'Eine kontrollierte Runtime für Agents ergänzen.'],
  positioningCopy: 'Enterprise AI braucht kein weiteres Neuaufbauprojekt und keinen weiteren Stapel generierten Codes. Sie braucht ein kompaktes Zielformat, das Agents schreiben, Menschen prüfen und eine Runtime kontrolliert über Legacy-Systeme, neue Anwendungen und AI Agents hinweg.',
  capabilitiesKicker: 'Plattformfunktionen',
  capabilitiesTitle: ['Mit der Geschäftsstruktur beginnen,', 'nicht mit einer leeren Codebasis'],
  capabilitiesLink: 'Artikel zu AI und Agents',
  capabilities: [
    { title: 'Agents ein Geschäftsmodell geben', copy: 'Modellieren Sie Kunden, Aufträge, Anlagen, Fälle und Freigaben als Objekte, die Agents lesen, verknüpfen und bearbeiten können.' },
    { title: 'Systeme erweitern, ohne sie zu ersetzen', copy: 'Ergänzen Sie Datenbanken, ERP, CRM und eigene Systeme um APIs, Rechte, Workflows und Intelligenz.' },
    { title: 'Metadaten statt App-Code generieren', copy: 'Für typische CRUD- und Workflow-Software schreiben Agents die kompakte ObjectStack-Definition, während ObjectOS Tabellen, APIs, UI, Tools, Rechte und Audit liefert. Weniger Code zu generieren, weniger Code zu prüfen.' },
    { title: 'Governance zur Laufzeit erzwingen', copy: 'Nutzen Sie Unternehmensidentität, Berechtigungen, Freigabeschlangen und Audit-Logs, damit jede Agent-Aktion klare Grenzen hat.' },
  ],
  aiKicker: 'AI-Build und Agent-Betrieb',
  aiTitle: ['Agents erstellen die Software.', 'Menschen bleiben in der Prüfung.'],
  aiCopy: 'ObjectOS macht Objekte, Felder, Workflows, Berechtigungen und Aktionen zu deklarativen Metadaten, die Agents über kontrollierte Tools lesen und ändern. In der Open-Source-Edition bringen Sie Ihre eigene AI mit: Ein Coding-Agent schreibt Metadaten als Quelldateien, oft nur einen winzigen Bruchteil einer generierten App-Codebasis; Sie prüfen den Diff, und jeder MCP-Client kann Ihre Daten abfragen. Bei CRUD- und Workflow-Oberflächen liefert die Runtime die wiederkehrenden 99 %, sodass reine Metadatenänderungen Iterationsgeschwindigkeit in zwei Größenordnungen erreichen können. Die In-App-Assistenten Build und Ask laufen auf Cloud und Enterprise.',
  aiItems: [
    { title: 'AI Builder', copy: 'Cloud & Enterprise: Beschreiben Sie eine Änderung in natürlicher Sprache. Der In-App-Builder generiert Objekte, Felder, Views, Workflows und Berechtigungen und schickt Strukturänderungen zur Freigabe. In Open Source schreibt Ihr Coding-Agent denselben kompakten Metadaten-Diff statt einer vollständigen App-Codebasis.' },
    { title: 'AI Ask', copy: 'Cloud & Enterprise: Stellen Sie Fragen im Produkt, analysieren Sie Geschäftskontext und lösen Sie freigegebene Aktionen innerhalb der Rechte des angemeldeten Nutzers aus. In Open Source fragen Sie dieselben Objekte über MCP mit Ihrer eigenen AI ab.' },
    { title: 'Tools / MCP', copy: 'Alle Editionen: @objectstack/mcp stellt Objekte, Abfragen und Aktionen als policy-bewusste Tools für Claude, Cursor, jeden MCP-Client oder ein lokales Modell bereit.' },
  ],
  aiLink: 'AI-Sicherheitsmodell ansehen',
  workflowKicker: 'Funktionsweise',
  workflowTitle: ['Geschäftsabläufe in eine Struktur verwandeln,', 'die Agents nutzen können'],
  workflowCopy: 'ObjectOS beschreibt Objekte, Beziehungen, Rechte, Workflows und Aktionen in einheitlichen Metadaten. Agents ändern eine kompakte Definitionsschicht, statt Anwendungscode neu zu generieren, sodass Business-Iterationen schnell, prüfbar und kontrolliert bleiben.',
  existingSystems: 'Bestehende Systeme',
  systemLabels: ['CRM', 'ERP', 'Datenbank', 'Eigene Systeme'],
  connectModel: 'Verbinden und modellieren',
  objectLayer: 'Objekte · Rechte · Prozesse · API · Audit',
  secureExecution: 'Sicher ausführen',
  outcomes: 'Kontinuierlicher Nutzen',
  outcomeLabels: ['Geschäftsanwendungen', 'AI Agents', 'Automatisierung'],
  solutionsKicker: 'Anwendungsvorlagen',
  solutionsTitle: ['Mit lauffähigen Vorlagen starten,', 'nicht mit einem leeren System'],
  solutionLink: 'Quellcode ansehen',
  solutions: [
    { title: 'Helpdesk-Vorlage', copy: 'AI-first Kundenservice mit Tickets, SLA, Zusammenfassungen, Antwortvorschlägen und Wissensabruf.' },
    { title: 'Contracts-Vorlage', copy: 'Vertragslebenszyklus mit Metadatenextraktion, Freigabe, Verlängerungserinnerungen und Audit-Trails.' },
    { title: 'Procurement-Vorlage', copy: 'Einkaufsanfragen, Lieferanten, Bestellungen, Wareneingang und Three-way Matching als kontrollierte Anwendung.' },
  ],
  securityKicker: 'Sicherheit und Governance',
  securityTitle: ['Daten bleiben in Ihrem Netzwerk.', 'AI arbeitet innerhalb von Berechtigungen.'],
  securityCopy: 'ObjectOS läuft als selbst gehostete Runtime auf Ihrer Infrastruktur. Geschäftsdaten, Identitäten, Audit-Logs und Dateien bleiben unter Ihrer Kontrolle; AI Agents greifen über kontrollierte Tools auf Objekte zu und erben die Rechte des angemeldeten Nutzers.',
  securityItems: [
    { title: 'Datenresidenz', copy: 'Verbinden Sie Ihre Datenbanken und Speicher. Ohne explizit konfigurierte externe Dienste ruft ObjectOS nicht nach Hause, prüft keinen Lizenzserver und sammelt keine Telemetrie.' },
    { title: 'AI mit Nutzerrechten', copy: 'Agents handeln als angemeldete Nutzer und beachten Objekt-, Datensatz- und Feldrechte.' },
    { title: 'Freigabe und Audit', copy: 'Strukturelle Änderungen laufen durch eine menschliche Freigabe; Lesezugriffe, Schreibzugriffe, Tool-Aufrufe und Rechteänderungen können protokolliert werden.' },
    { title: 'Offline bereit', copy: 'Betrieb in VPCs, auf lokalen Servern oder in isolierten Netzen mit lokalen Modellen, interner Identität und eigenem Secret Management.' },
  ],
  securityLink: 'Sicherheit und Governance ansehen',
  insightsKicker: 'Aktuelle Einblicke',
  insightsTitle: 'Praxiswissen zu AI-nativer Software',
  insightsLink: 'Alle Artikel',
  closingKicker: 'Nächster Schritt',
  closingTitle: 'Beginnen Sie mit den Geschäftsdaten, die Sie am besten kennen.',
  closingCopy: 'Verbinden Sie ein bestehendes System, definieren Sie zentrale Geschäftsobjekte und lassen Sie Ihren Agent die erste kontrollierte AI-geschriebene Anwendung als kleinen Metadaten-Diff ausliefern.',
  closingCta: 'Bestehende Systeme verbinden',
  compareKicker: 'Im Vergleich',
  compareTitle: ['Anders als die Tools,', 'die Sie kennen'],
  compareLink: 'Vergleich lesen',
  comparisons: [
    { title: 'vs Airtable', copy: 'Eine echte Datenbank mit Server-Logik und Runtime-Governance — kein Tabellen-Workspace.' },
    { title: 'vs Retool', copy: 'Geschäftslogik ist prüfbare Metadaten — kein über Screens verstreutes JavaScript.' },
    { title: 'vs Lovable & Bolt', copy: 'Agents generieren kontrollierte Metadaten mit Schema und Rechten — keine einmalige Codebasis.' },
  ],
};

const es: HomeCopy = {
  ...en,
  title: 'ObjectOS · Runtime gobernado para apps escritas por AI',
  description: 'ObjectOS es el formato objetivo y runtime open source para aplicaciones de negocio escritas por AI. Tu agente escribe metadatos ObjectStack compactos, a menudo cerca del 1 % de una base de código CRUD/workflow tradicional; las personas revisan un diff pequeño y el runtime aplica permisos, aprobaciones y auditoría sobre una base de datos que controlas.',
  eyebrow: 'Runtime gobernado para apps escritas por AI',
  hero: ['La AI escribe la app.', 'ObjectOS la mantiene gobernada.'],
  heroLead: 'Apunta tu agente de código a ObjectStack. Escribe modelo, UI, workflows, permisos y herramientas como metadatos compactos, no como una base de código completa. En muchas apps CRUD/workflow, el código se acerca al 1 % y la iteración a 100x; las personas revisan diffs pequeños gobernados.',
  primaryCta: 'Empezar',
  secondaryCta: 'Cómo funciona',
  proof: [['Protocolo abierto', 'Apache 2.0, autohospedable'], ['~1 % de código', 'Metadatos, no código de app'], ['~100x iteración', 'Diffs pequeños, runtime gobernado']],
  imageAlt: 'ObjectOS conectando datos, aplicaciones y agentes de AI',
  imageNoteTitle: 'Capa unificada de objetos de negocio',
  imageNote: 'Conectando aplicaciones, datos y agentes',
  positioningKicker: 'Para software empresarial escrito por AI',
  positioningTitle: ['Conserva los sistemas que funcionan.', 'Añade un runtime gobernado para agentes.'],
  positioningCopy: 'La AI empresarial no necesita otro proyecto de reconstrucción ni otra pila de código generado. Necesita un formato objetivo compacto que los agentes puedan escribir, las personas revisar y un runtime pueda gobernar entre sistemas heredados, nuevas aplicaciones y agentes de AI.',
  capabilitiesKicker: 'Capacidades de la plataforma',
  capabilitiesTitle: ['Empieza por la estructura del negocio,', 'no por código en blanco'],
  capabilitiesLink: 'Artículos sobre AI y agentes',
  capabilities: [
    { title: 'Da a los agentes un modelo de negocio', copy: 'Modela clientes, pedidos, equipos, casos y aprobaciones como objetos que los agentes pueden leer, relacionar y modificar.' },
    { title: 'Extiende sistemas sin reemplazarlos', copy: 'Añade API, permisos, workflows e inteligencia sobre bases de datos, ERP, CRM y sistemas propios.' },
    { title: 'Genera metadatos, no código de app', copy: 'Para software CRUD y de workflow típico, los agentes escriben la definición compacta de ObjectStack mientras ObjectOS aporta tablas, API, UI, herramientas, permisos y auditoría. Menos código que generar, menos código que revisar.' },
    { title: 'Aplica gobierno en runtime', copy: 'Reutiliza identidad empresarial, permisos, colas de aprobación y auditoría para que cada acción de agente tenga límites definidos.' },
  ],
  aiKicker: 'Construcción AI y operación con agentes',
  aiTitle: ['Deja que los agentes creen el software.', 'Mantén a las personas en la revisión.'],
  aiCopy: 'ObjectOS convierte objetos, campos, workflows, permisos y acciones en metadatos declarativos que los agentes pueden leer y actualizar mediante herramientas gobernadas. En la edición open source, traes tu propia AI: un agente de código escribe metadatos como archivos fuente, a menudo una fracción mínima de una base de código generada; tú revisas el diff y cualquier cliente MCP puede consultar tus datos. En superficies CRUD y de workflow, el runtime aporta el 99 % repetido, por lo que los cambios solo de metadatos pueden moverse a velocidad de iteración de dos órdenes de magnitud. Los asistentes integrados Build y Ask se ejecutan en Cloud y Enterprise.',
  aiItems: [
    { title: 'AI Builder', copy: 'Cloud y Enterprise: describe un cambio en lenguaje natural. El Builder integrado genera objetos, campos, vistas, workflows y permisos, y envía los cambios estructurales a aprobación. En open source, tu agente de código escribe el mismo diff compacto de metadatos en lugar de una base de código completa.' },
    { title: 'AI Ask', copy: 'Cloud y Enterprise: haz preguntas dentro del producto, analiza contexto de negocio y ejecuta acciones aprobadas dentro de los permisos del usuario conectado. En open source, consulta los mismos objetos mediante MCP con tu propia AI.' },
    { title: 'Tools / MCP', copy: 'Todas las ediciones: @objectstack/mcp expone objetos, consultas y acciones como herramientas conscientes de políticas para Claude, Cursor, cualquier cliente MCP o un modelo local.' },
  ],
  aiLink: 'Ver el modelo de seguridad AI',
  workflowKicker: 'Cómo funciona',
  workflowTitle: ['Convierte operaciones de negocio en', 'una estructura que los agentes puedan usar'],
  workflowCopy: 'ObjectOS describe objetos, relaciones, permisos, workflows y acciones mediante metadatos unificados. Los agentes cambian una capa de definición compacta en lugar de regenerar código de aplicación, así que las iteraciones de negocio siguen siendo rápidas, revisables y gobernadas.',
  existingSystems: 'Sistemas existentes',
  systemLabels: ['CRM', 'ERP', 'Base de datos', 'Sistemas propios'],
  connectModel: 'Conectar y modelar',
  objectLayer: 'Objetos · Permisos · Procesos · API · Auditoría',
  secureExecution: 'Ejecución segura',
  outcomes: 'Valor continuo',
  outcomeLabels: ['Apps de negocio', 'Agentes de AI', 'Automatización'],
  solutionsKicker: 'Plantillas de aplicaciones',
  solutionsTitle: ['Empieza con plantillas operativas,', 'no con un sistema en blanco'],
  solutionLink: 'Ver código fuente',
  solutions: [
    { title: 'Plantilla Helpdesk', copy: 'Soporte al cliente AI-first con tickets, SLA, resúmenes, respuestas sugeridas y recuperación de conocimiento.' },
    { title: 'Plantilla Contracts', copy: 'Ciclo de vida contractual con extracción de metadatos, aprobación, recordatorios de renovación y auditoría.' },
    { title: 'Plantilla Procurement', copy: 'Solicitudes de compra, proveedores, PO, recepción y conciliación de tres vías como aplicación gobernada.' },
  ],
  securityKicker: 'Seguridad y gobierno',
  securityTitle: ['Los datos permanecen en tu red.', 'La AI trabaja dentro de permisos.'],
  securityCopy: 'ObjectOS se ejecuta como runtime autohospedado en tu infraestructura. Registros de negocio, identidades, auditoría y archivos siguen bajo tu control; los agentes de AI acceden a objetos mediante herramientas gobernadas y heredan los permisos del usuario conectado.',
  securityItems: [
    { title: 'Residencia de datos', copy: 'Conecta tus bases de datos y almacenamiento. Si no configuras servicios externos, ObjectOS no llama a casa, no consulta un servidor de licencias ni recopila telemetría.' },
    { title: 'AI con permisos de usuario', copy: 'Los agentes actúan como usuarios conectados y respetan permisos de objeto, registro y campo.' },
    { title: 'Aprobación y auditoría', copy: 'Los cambios estructurales pasan por una cola de aprobación humana; lecturas, escrituras, llamadas a herramientas y cambios de permisos pueden auditarse.' },
    { title: 'Listo para operar sin conexión', copy: 'Ejecuta en VPC, servidores locales o redes aisladas con modelos locales, identidad interna y tu propia gestión de secretos.' },
  ],
  securityLink: 'Ver seguridad y gobierno',
  insightsKicker: 'Últimos análisis',
  insightsTitle: 'Ideas prácticas sobre software AI-native',
  insightsLink: 'Ver todos los artículos',
  closingKicker: 'Siguiente paso',
  closingTitle: 'Empieza con los datos de negocio que mejor conoces.',
  closingCopy: 'Conecta un sistema existente, define sus objetos clave y deja que tu agente entregue la primera aplicación escrita por AI y gobernada como un diff pequeño de metadatos.',
  closingCta: 'Cómo conectar sistemas existentes',
  compareKicker: 'Comparativa',
  compareTitle: ['Distinto de las', 'herramientas que conoces'],
  compareLink: 'Leer la comparación',
  comparisons: [
    { title: 'vs Airtable', copy: 'Una base de datos real con lógica de servidor y gobierno en runtime — no un workspace tipo hoja de cálculo.' },
    { title: 'vs Retool', copy: 'La lógica de negocio es metadato revisable — no JavaScript disperso por pantallas.' },
    { title: 'vs Lovable & Bolt', copy: 'Los agentes generan metadatos gobernados con esquema y permisos — no una base de código de una sola vez.' },
  ],
};

const fr: HomeCopy = {
  ...en,
  title: 'ObjectOS · Runtime gouverné pour applications écrites par l’AI',
  description: 'ObjectOS est le format cible et le runtime open source pour les applications métier écrites par l’AI. Votre agent écrit des métadonnées ObjectStack compactes, souvent proches de 1 % d’une base de code CRUD/workflow traditionnelle ; les humains relisent un petit diff et le runtime applique permissions, validations et audit sur une base de données que vous contrôlez.',
  eyebrow: 'Runtime gouverné pour applications écrites par l’AI',
  hero: ['L’AI écrit l’application.', 'ObjectOS la garde gouvernable.'],
  heroLead: 'Pointez votre agent de code vers ObjectStack. Il écrit modèle, UI, workflows, permissions et outils sous forme de métadonnées compactes, pas comme une base de code complète. Pour de nombreuses apps CRUD/workflow, le code approche 1 %, l’itération 100x, et les humains relisent de petits diffs gouvernés.',
  primaryCta: 'Commencer',
  secondaryCta: 'Voir comment ça marche',
  proof: [['Protocole ouvert', 'Apache 2.0, auto-hébergeable'], ['~1 % de code', 'Métadonnées, pas code applicatif'], ['~100x itération', 'Petits diffs, runtime gouverné']],
  imageAlt: 'ObjectOS connectant données métier, applications et agents AI',
  imageNoteTitle: 'Couche unifiée d’objets métier',
  imageNote: 'Connexion des applications, données et agents',
  positioningKicker: 'Pour le logiciel d’entreprise écrit par l’AI',
  positioningTitle: ['Conservez les systèmes efficaces.', 'Ajoutez un runtime gouverné pour agents.'],
  positioningCopy: 'L’AI en entreprise n’a pas besoin d’un nouveau chantier de reconstruction ni d’une nouvelle pile de code généré. Elle a besoin d’un format cible compact que les agents peuvent écrire, que les humains peuvent relire, et qu’un runtime gouverne à travers systèmes existants, nouvelles applications et agents AI.',
  capabilitiesKicker: 'Capacités de la plateforme',
  capabilitiesTitle: ['Partez de la structure métier,', 'pas d’une base de code vide'],
  capabilitiesLink: 'Articles sur l’AI et les agents',
  capabilities: [
    { title: 'Donnez aux agents un modèle métier', copy: 'Modélisez clients, commandes, équipements, dossiers et validations comme des objets que les agents peuvent lire, relier et modifier.' },
    { title: 'Étendez sans remplacer', copy: 'Ajoutez API, permissions, workflows et intelligence aux bases de données, ERP, CRM et systèmes internes.' },
    { title: 'Générez des métadonnées, pas du code applicatif', copy: 'Pour les logiciels CRUD et workflow typiques, les agents écrivent la définition ObjectStack compacte tandis qu’ObjectOS fournit tables, API, UI, outils, permissions et audit. Moins de code à générer, moins de code à relire.' },
    { title: 'Appliquez la gouvernance au runtime', copy: 'Réutilisez identité d’entreprise, permissions, files de validation et journaux d’audit afin que chaque action d’agent ait des limites définies.' },
  ],
  aiKicker: 'Construction AI et opérations d’agents',
  aiTitle: ['Laissez les agents créer le logiciel.', 'Gardez les humains dans la boucle de revue.'],
  aiCopy: 'ObjectOS transforme objets, champs, workflows, permissions et actions en métadonnées déclaratives que les agents peuvent lire et mettre à jour via des outils gouvernés. Dans l’édition open source, vous apportez votre propre AI : un agent de code écrit les métadonnées comme fichiers source, souvent une fraction minuscule d’une base de code générée ; vous relisez le diff, et n’importe quel client MCP peut interroger vos données. Pour les surfaces CRUD et workflow, le runtime fournit les 99 % répétitifs, si bien que les changements uniquement en métadonnées peuvent atteindre une vitesse d’itération de deux ordres de grandeur. Les assistants intégrés Build et Ask fonctionnent sur Cloud et Enterprise.',
  aiItems: [
    { title: 'AI Builder', copy: 'Cloud et Enterprise : décrivez un changement en langage naturel. Le Builder intégré génère objets, champs, vues, workflows et permissions, puis envoie les changements structurants en validation. En open source, votre agent de code écrit le même diff compact de métadonnées au lieu d’une base de code complète.' },
    { title: 'AI Ask', copy: 'Cloud et Enterprise : posez des questions dans le produit, analysez le contexte métier et déclenchez des actions approuvées dans les permissions de l’utilisateur connecté. En open source, interrogez les mêmes objets via MCP avec votre propre AI.' },
    { title: 'Tools / MCP', copy: 'Toutes éditions : @objectstack/mcp expose objets, requêtes et actions comme outils sensibles aux politiques pour Claude, Cursor, tout client MCP ou un modèle local.' },
  ],
  aiLink: 'Voir le modèle de sécurité AI',
  workflowKicker: 'Fonctionnement',
  workflowTitle: ['Transformez les opérations métier en', 'une structure utilisable par les agents'],
  workflowCopy: 'ObjectOS décrit objets, relations, permissions, workflows et actions dans des métadonnées unifiées. Les agents modifient une couche de définition compacte au lieu de régénérer du code applicatif, ce qui garde les itérations métier rapides, relisibles et gouvernées.',
  existingSystems: 'Systèmes existants',
  systemLabels: ['CRM', 'ERP', 'Base de données', 'Systèmes internes'],
  connectModel: 'Connecter et modéliser',
  objectLayer: 'Objets · Permissions · Processus · API · Audit',
  secureExecution: 'Exécuter en sécurité',
  outcomes: 'Valeur continue',
  outcomeLabels: ['Applications métier', 'Agents AI', 'Automatisation'],
  solutionsKicker: 'Modèles d’applications',
  solutionsTitle: ['Partez de modèles opérationnels,', 'pas d’un système vide'],
  solutionLink: 'Voir le code source',
  solutions: [
    { title: 'Modèle Helpdesk', copy: 'Support client AI-first avec tickets, SLA, résumés, réponses suggérées et recherche dans la base de connaissances.' },
    { title: 'Modèle Contracts', copy: 'Cycle de vie contractuel avec extraction de métadonnées, validation, rappels de renouvellement et audit.' },
    { title: 'Modèle Procurement', copy: 'Demandes d’achat, fournisseurs, PO, réception et rapprochement à trois pièces dans une application gouvernée.' },
  ],
  securityKicker: 'Sécurité et gouvernance',
  securityTitle: ['Les données restent dans votre réseau.', 'L’AI agit dans les permissions.'],
  securityCopy: 'ObjectOS s’exécute comme runtime auto-hébergé sur votre infrastructure. Données métier, identités, journaux d’audit et fichiers restent sous votre contrôle ; les agents AI accèdent aux objets via des outils gouvernés et héritent des permissions de l’utilisateur connecté.',
  securityItems: [
    { title: 'Résidence des données', copy: 'Connectez vos bases de données et stockages. Sans service externe configuré, ObjectOS ne rappelle pas, ne vérifie pas de serveur de licence et ne collecte pas de télémétrie.' },
    { title: 'AI portée par l’utilisateur', copy: 'Les agents agissent comme l’utilisateur connecté et respectent les permissions d’objet, d’enregistrement et de champ.' },
    { title: 'Approbation et audit', copy: 'Les changements structurants passent par une file de validation humaine ; lectures, écritures, appels d’outils et changements de droits peuvent être audités.' },
    { title: 'Prêt pour l’isolement', copy: 'Exécutez en VPC, sur serveurs locaux ou en réseau isolé avec modèles locaux, identité interne et votre gestion des secrets.' },
  ],
  securityLink: 'Voir sécurité et gouvernance',
  insightsKicker: 'Dernières analyses',
  insightsTitle: 'Réflexions pratiques sur les logiciels AI-native',
  insightsLink: 'Voir tous les articles',
  closingKicker: 'Étape suivante',
  closingTitle: 'Commencez par les données métier que vous connaissez le mieux.',
  closingCopy: 'Connectez un système existant, définissez ses objets clés et laissez votre agent livrer la première application gouvernée écrite par l’AI sous forme de petit diff de métadonnées.',
  closingCta: 'Connecter les systèmes existants',
  compareKicker: 'Comparatif',
  compareTitle: ['Différent des outils', 'que vous connaissez'],
  compareLink: 'Lire le comparatif',
  comparisons: [
    { title: 'vs Airtable', copy: 'Une vraie base de données avec logique serveur et gouvernance au runtime — pas un workspace de type tableur.' },
    { title: 'vs Retool', copy: 'La logique métier est une métadonnée relisible — pas du JavaScript éparpillé entre les écrans.' },
    { title: 'vs Lovable & Bolt', copy: 'Les agents génèrent des métadonnées gouvernées avec schéma et permissions — pas une base de code jetable.' },
  ],
};

const ko: HomeCopy = {
  ...en,
  title: 'ObjectOS · AI가 작성한 앱을 위한 거버넌스 런타임',
  description: 'ObjectOS는 AI가 작성한 비즈니스 애플리케이션을 위한 오픈소스 대상 형식이자 런타임입니다. 에이전트는 압축된 ObjectStack 메타데이터를 작성하며, 일반적인 CRUD/워크플로 앱에서는 기존 코드베이스의 약 1%에 가까워질 수 있습니다. 사람은 작은 diff를 검토하고 런타임은 당신이 제어하는 데이터베이스 위에서 권한, 승인, 감사를 강제합니다.',
  eyebrow: 'AI가 작성한 앱을 위한 거버넌스 런타임',
  hero: ['AI가 앱을 작성합니다.', 'ObjectOS가 거버넌스를 유지합니다.'],
  heroLead: '코딩 에이전트를 ObjectStack에 연결하세요. 모델, UI, 워크플로, 권한, 도구를 전체 코드베이스가 아니라 압축된 메타데이터로 작성합니다. 많은 CRUD/워크플로 앱에서 코드는 약 1%, 반복은 100배에 가까워질 수 있습니다. 사람은 작은 거버넌스 diff를 검토합니다.',
  primaryCta: '시작하기',
  secondaryCta: '작동 방식 보기',
  proof: [['오픈 프로토콜', 'Apache 2.0, 셀프 호스팅'], ['~1% 코드 표면', '앱 코드 대신 메타데이터'], ['~100x 반복', '작은 diff, 거버넌스 런타임']],
  imageAlt: '비즈니스 데이터, 애플리케이션과 AI 에이전트를 연결하는 ObjectOS',
  imageNoteTitle: '통합 비즈니스 객체 계층',
  imageNote: '애플리케이션, 데이터와 에이전트 연결 중',
  positioningKicker: 'AI가 작성한 엔터프라이즈 소프트웨어를 위해',
  positioningTitle: ['이미 잘 작동하는 시스템은 유지하고,', '에이전트를 위한 거버넌스 런타임을 더하세요.'],
  positioningCopy: '엔터프라이즈 AI에 필요한 것은 또 하나의 재구축 프로젝트도, 검토하기 어려운 생성 코드 더미도 아닙니다. 에이전트가 작성하고 사람이 검토하며 런타임이 기존 시스템, 새 애플리케이션, AI 에이전트 전반에서 거버넌스를 유지하는 압축된 대상 형식입니다.',
  capabilitiesKicker: '플랫폼 기능',
  capabilitiesTitle: ['빈 코드가 아니라,', '업무 구조에서 시작합니다'],
  capabilitiesLink: 'AI와 에이전트 글 읽기',
  capabilities: [
    { title: '에이전트에 비즈니스 모델 제공', copy: '고객, 주문, 장비, 케이스, 승인을 에이전트가 읽고 연결하고 작업할 수 있는 객체로 모델링합니다.' },
    { title: '교체 없이 기존 시스템 확장', copy: '데이터베이스, ERP, CRM과 자체 시스템 위에 API, 권한, 워크플로와 지능을 추가합니다.' },
    { title: '앱 코드가 아니라 메타데이터 생성', copy: '일반적인 CRUD 및 워크플로 소프트웨어에서는 에이전트가 압축된 ObjectStack 정의를 작성하고 ObjectOS가 테이블, API, UI, 도구, 권한, 감사를 제공합니다. 생성할 코드도, 검토할 코드도 줄어듭니다.' },
    { title: '런타임에서 거버넌스 강제', copy: '기업 ID, 권한, 승인 대기열, 감사 로그를 재사용해 모든 에이전트 작업에 정의된 경계를 둡니다.' },
  ],
  aiKicker: 'AI 빌드와 에이전트 운영',
  aiTitle: ['에이전트가 소프트웨어를 만들게 하세요.', '사람은 검토 루프 안에 남습니다.'],
  aiCopy: 'ObjectOS는 객체, 필드, 워크플로, 권한, 작업을 에이전트가 거버넌스 도구로 읽고 업데이트할 수 있는 선언형 메타데이터로 만듭니다. 오픈소스 에디션에서는 당신의 AI를 가져옵니다. 코딩 에이전트가 메타데이터를 소스 파일로 작성하며, 이는 생성된 앱 코드베이스의 아주 작은 일부인 경우가 많습니다. 당신은 diff를 검토하고 모든 MCP 클라이언트가 데이터를 조회할 수 있습니다. CRUD 및 워크플로 표면에서는 반복되는 99%를 런타임이 제공하므로 메타데이터만 바꾸는 변경은 두 자릿수 차원의 반복 속도에 도달할 수 있습니다. 제품 내 Build와 Ask 어시스턴트는 Cloud와 Enterprise에서 실행됩니다.',
  aiItems: [
    { title: 'AI Builder', copy: 'Cloud · Enterprise: 자연어로 변경을 설명하세요. 제품 내 Builder가 객체, 필드, 뷰, 워크플로, 권한을 생성하고 구조 변경을 승인으로 보냅니다. 오픈소스에서는 코딩 에이전트가 전체 앱 코드베이스 대신 같은 압축 메타데이터 diff를 작성합니다.' },
    { title: 'AI Ask', copy: 'Cloud · Enterprise: 제품 안에서 질문하고 비즈니스 맥락을 분석하며 로그인 사용자 권한 안에서 승인된 작업을 실행합니다. 오픈소스에서는 같은 객체를 MCP로 당신의 AI에서 조회합니다.' },
    { title: 'Tools / MCP', copy: '모든 에디션: @objectstack/mcp가 객체, 쿼리, 작업을 정책 인식 도구로 Claude, Cursor, 모든 MCP 클라이언트 또는 로컬 모델에 노출합니다.' },
  ],
  aiLink: 'AI 보안 모델 보기',
  workflowKicker: '작동 방식',
  workflowTitle: ['비즈니스 운영을', '에이전트가 사용할 수 있는 구조로'],
  workflowCopy: 'ObjectOS는 객체, 관계, 권한, 워크플로와 작업을 통합 메타데이터로 설명합니다. 에이전트는 애플리케이션 코드를 다시 생성하는 대신 압축된 정의 계층을 변경하므로 비즈니스 반복은 빠르고 검토 가능하며 거버넌스 안에 머뭅니다.',
  existingSystems: '기존 시스템',
  systemLabels: ['CRM', 'ERP', '데이터베이스', '자체 시스템'],
  connectModel: '연결 및 모델링',
  objectLayer: '객체 · 권한 · 프로세스 · API · 감사',
  secureExecution: '안전한 실행',
  outcomes: '지속적인 가치',
  outcomeLabels: ['업무 앱', 'AI 에이전트', '자동화'],
  solutionsKicker: '애플리케이션 템플릿',
  solutionsTitle: ['빈 시스템이 아니라,', '실행 가능한 템플릿에서 시작하세요'],
  solutionLink: '템플릿 소스 보기',
  solutions: [
    { title: 'Helpdesk 템플릿', copy: '티켓, SLA, 요약, 추천 답변과 지식 검색을 포함한 AI-first 고객 지원 템플릿입니다.' },
    { title: 'Contracts 템플릿', copy: '메타데이터 추출, 승인, 갱신 알림과 감사 추적을 포함한 계약 라이프사이클 템플릿입니다.' },
    { title: 'Procurement 템플릿', copy: '구매 요청, 공급업체, PO, 입고와 3-way match를 관리되는 애플리케이션으로 실행합니다.' },
  ],
  securityKicker: '보안 및 거버넌스',
  securityTitle: ['데이터는 네트워크 안에 유지하고,', 'AI는 권한 경계 안에서 작동합니다'],
  securityCopy: 'ObjectOS는 사용자의 인프라에서 실행되는 셀프 호스팅 런타임입니다. 비즈니스 기록, ID, 감사 로그와 파일은 사용자가 통제하며, AI 에이전트는 관리되는 도구로 객체에 접근하고 로그인한 사용자의 권한을 상속합니다.',
  securityItems: [
    { title: '데이터 레지던시', copy: '사용자의 데이터베이스와 스토리지를 연결합니다. 외부 서비스를 명시적으로 구성하지 않으면 ObjectOS는 콜백, 라이선스 서버 확인, 텔레메트리 수집을 하지 않습니다.' },
    { title: '사용자 범위 AI', copy: '에이전트는 로그인한 사용자로 동작하며 객체, 레코드, 필드 권한을 따릅니다.' },
    { title: '승인 및 감사', copy: '구조적 변경은 사람의 승인 대기열을 거치고 읽기, 쓰기, 도구 호출과 권한 변경은 감사 로그에 기록할 수 있습니다.' },
    { title: '오프라인 준비', copy: 'VPC, 로컬 서버, 격리 네트워크에서 로컬 모델, 내부 ID, 자체 시크릿 관리와 함께 실행할 수 있습니다.' },
  ],
  securityLink: '보안 및 거버넌스 보기',
  insightsKicker: '최신 인사이트',
  insightsTitle: 'AI-native 소프트웨어에 대한 실무적 관점',
  insightsLink: '모든 글 보기',
  closingKicker: '다음 단계',
  closingTitle: '가장 잘 아는 비즈니스 데이터에서 시작하세요.',
  closingCopy: '기존 시스템 하나를 연결하고 핵심 비즈니스 객체를 정의해 에이전트가 첫 거버넌스 AI 작성 애플리케이션을 작은 메타데이터 diff로 배포하게 하세요.',
  closingCta: '기존 시스템 연결 방법',
  compareKicker: '비교',
  compareTitle: ['익숙한 도구들과는', '다릅니다'],
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
