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
}

const zhHans: HomeCopy = {
  title: 'ObjectOS · AI-native 企业应用平台',
  description: 'ObjectOS 是面向企业业务系统的 AI-native 应用平台，连接现有数据、应用、流程与 AI Agent。',
  eyebrow: 'AI-native 企业应用平台',
  hero: ['让 AI 进入', '企业业务系统'],
  heroLead: 'ObjectOS 把现有数据、业务对象、权限和流程连接成统一运行层，让团队与 AI Agent 更快构建并持续改进企业应用。',
  primaryCta: '了解平台能力',
  secondaryCta: '查看构建方法',
  proof: [['连接', '现有系统与数据'], ['构建', '可运行企业应用'], ['治理', 'AI 与业务操作']],
  imageAlt: 'ObjectOS 连接业务数据、应用和 AI Agent 的产品示意图',
  imageNoteTitle: '统一业务对象层',
  imageNote: '正在连接应用、数据与 Agent',
  positioningKicker: '不是另一个需要迁移的平台',
  positioningTitle: ['保留已经有效的系统，', '补上面向 AI 的业务运行层。'],
  positioningCopy: '企业真正需要的不是一次重建，而是一种让旧系统、新应用和 AI 能够共同工作的方式。ObjectOS 从真实业务对象出发，把变化控制在可理解、可治理的范围内。',
  capabilitiesKicker: '平台能力',
  capabilitiesTitle: ['从业务结构出发，', '而不是从空白代码开始'],
  capabilitiesLink: '阅读 AI 与 Agent 文章',
  capabilities: [
    { title: '让 AI 理解你的业务对象', copy: '把客户、订单、设备、工单等业务概念变成统一对象，让 Agent 能准确读取、关联和操作。' },
    { title: '连接现有系统，不必推倒重来', copy: '在已有数据库、ERP、CRM 和自研系统之上增加统一 API、权限与智能能力。' },
    { title: '从需求直接生成可运行应用', copy: '用声明式元数据描述业务，快速生成界面、流程、权限和接口，并持续演进。' },
    { title: '把治理内置到每一次操作', copy: '复用企业身份、权限与审计体系，让 AI Agent 的每一次访问和修改都有边界。' },
  ],
  aiKicker: 'AI 原生能力',
  aiTitle: ['让 AI 不只是聊天，', '而是安全地构建和操作应用'],
  aiCopy: 'ObjectOS 把对象、字段、流程、权限和动作变成 AI 可以读写的声明式元数据。AI Builder 用受控工具生成变更，Agent 在用户权限内查询数据、触发动作，并留下审批与审计记录。',
  aiItems: [
    { title: 'AI Builder', copy: '用自然语言生成对象、字段、视图、流程和权限，变更先进入审批队列。' },
    { title: 'AI Agent', copy: '基于业务对象查询、分析、生成建议和触发动作，继承登录用户的权限边界。' },
    { title: 'Tools / MCP', copy: '把对象、动作和查询暴露成受控工具，供 IDE、桌面 Agent 或自定义 Agent 调用。' },
  ],
  aiLink: '查看 AI 安全模型',
  workflowKicker: '工作方式',
  workflowTitle: ['把复杂业务压缩成', 'AI 可以可靠处理的结构'],
  workflowCopy: 'ObjectOS 用统一元数据描述对象、关系、权限和动作。Agent 不需要猜测散落在代码里的业务规则，而是在清晰边界内完成工作。',
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
  closingCopy: '连接一个现有系统，定义关键业务对象，让第一个 AI-native 应用真正运行起来。',
  closingCta: '了解如何连接现有系统',
};

const en: HomeCopy = {
  title: 'ObjectOS · AI-native Enterprise Application Platform',
  description: 'ObjectOS connects existing data, applications, workflows, and AI agents through one governed business object layer.',
  eyebrow: 'AI-native enterprise application platform',
  hero: ['Bring AI into', 'business systems'],
  heroLead: 'ObjectOS connects existing data, business objects, permissions, and workflows into one operating layer so teams and AI agents can build and improve enterprise applications faster.',
  primaryCta: 'Explore the platform',
  secondaryCta: 'See how apps are built',
  proof: [['Connect', 'Existing systems and data'], ['Build', 'Production-ready apps'], ['Govern', 'AI and business actions']],
  imageAlt: 'ObjectOS connecting business data, applications, and AI agents',
  imageNoteTitle: 'Unified business object layer',
  imageNote: 'Connecting applications, data, and agents',
  positioningKicker: 'Not another platform that requires migration',
  positioningTitle: ['Keep the systems that work.', 'Add an operating layer built for AI.'],
  positioningCopy: 'Enterprises do not need another rebuild. They need a way for legacy systems, new applications, and AI to work together. ObjectOS starts with real business objects and keeps change understandable and governed.',
  capabilitiesKicker: 'Platform capabilities',
  capabilitiesTitle: ['Start with business structure,', 'not a blank codebase'],
  capabilitiesLink: 'Read about AI and agents',
  capabilities: [
    { title: 'Give AI a model of your business', copy: 'Turn customers, orders, equipment, and cases into unified objects agents can read, relate, and act on.' },
    { title: 'Connect systems without replacing them', copy: 'Add unified APIs, permissions, and intelligence on top of databases, ERP, CRM, and custom systems.' },
    { title: 'Generate working applications from intent', copy: 'Describe the business in declarative metadata, then generate interfaces, workflows, permissions, and APIs.' },
    { title: 'Govern every action by default', copy: 'Reuse enterprise identity, permissions, and audit controls so every agent action has a clear boundary.' },
  ],
  aiKicker: 'AI-native capabilities',
  aiTitle: ['Make AI more than chat.', 'Let it build and operate applications safely.'],
  aiCopy: 'ObjectOS turns objects, fields, workflows, permissions, and actions into declarative metadata that AI can read and change through governed tools. AI Builder proposes structural changes, while agents query data and trigger actions within user permissions.',
  aiItems: [
    { title: 'AI Builder', copy: 'Generate objects, fields, views, workflows, and permissions from natural language, with structural changes routed for approval.' },
    { title: 'AI Agent', copy: 'Query business objects, analyze context, draft recommendations, and trigger actions while inheriting the signed-in user permissions.' },
    { title: 'Tools / MCP', copy: 'Expose objects, actions, and queries as controlled tools for IDEs, desktop agents, and custom agent runtimes.' },
  ],
  aiLink: 'View the AI security model',
  workflowKicker: 'How it works',
  workflowTitle: ['Compress complex operations into', 'a structure AI can handle reliably'],
  workflowCopy: 'ObjectOS describes objects, relationships, permissions, and actions in unified metadata. Agents work inside explicit boundaries instead of guessing rules scattered across code.',
  existingSystems: 'Your existing systems',
  systemLabels: ['CRM', 'ERP', 'Database', 'Custom apps'],
  connectModel: 'Connect and model',
  objectLayer: 'Objects · Permissions · Workflows · API · Audit',
  secureExecution: 'Execute safely',
  outcomes: 'Continuous value',
  outcomeLabels: ['Business apps', 'AI agents', 'Automation'],
  solutionsKicker: 'Application templates',
  solutionsTitle: ['Start from working templates,', 'not from a blank system'],
  solutionLink: 'View template source',
  solutions: [
    { title: 'Helpdesk template', copy: 'An AI-first customer support template for tickets, SLA, summaries, suggested replies, and knowledge retrieval.' },
    { title: 'Contracts template', copy: 'Manage the contract lifecycle with metadata extraction, approval, renewal reminders, and audit trails.' },
    { title: 'Procurement template', copy: 'Run purchase requests, suppliers, POs, receiving, and three-way matching as a governed application.' },
  ],
  securityKicker: 'Security and governance',
  securityTitle: ['Keep data in your network.', 'Let AI work inside permissions.'],
  securityCopy: 'ObjectOS runs as a self-hosted runtime on your infrastructure. Business records, identities, audit logs, and files remain under your control; AI agents access objects through governed tools and inherit the permissions of the signed-in user.',
  securityItems: [
    { title: 'Data residency', copy: 'Connect your databases and storage. Unless you configure an external service, ObjectOS does not phone home, check a license server, or collect telemetry.' },
    { title: 'User-scoped AI', copy: 'Agents act as signed-in users and obey object, record, and field permissions, so they cannot see data the user cannot see.' },
    { title: 'Approval and audit', copy: 'Structural changes go through a human approval queue; reads, writes, tool calls, and permission changes can be written to audit logs.' },
    { title: 'Offline ready', copy: 'Run in a VPC, on local servers, or in air-gapped networks with local models, internal identity, and your own secrets management.' },
  ],
  securityLink: 'Explore security and governance',
  insightsKicker: 'Latest insights',
  insightsTitle: 'Practical thinking on AI-native software',
  insightsLink: 'Browse all articles',
  closingKicker: 'Next step',
  closingTitle: 'Start with the business data you know best.',
  closingCopy: 'Connect one existing system, define its key business objects, and put the first AI-native application into real use.',
  closingCta: 'Learn how to connect existing systems',
};

const ja: HomeCopy = {
  ...en,
  title: 'ObjectOS · AI-native エンタープライズアプリ基盤',
  description: 'ObjectOS は既存データ、アプリ、業務フロー、AI エージェントを統合された業務オブジェクト層でつなぎます。',
  eyebrow: 'AI-native エンタープライズアプリ基盤',
  hero: ['AI を企業の', '業務システムへ'],
  heroLead: 'ObjectOS は既存データ、業務オブジェクト、権限、フローを一つの実行基盤につなぎ、チームと AI エージェントによる業務アプリ構築を加速します。',
  primaryCta: 'プラットフォームを見る',
  secondaryCta: '構築方法を見る',
  proof: [['接続', '既存システムとデータ'], ['構築', '実運用できるアプリ'], ['統制', 'AI と業務操作']],
  imageAlt: '業務データ、アプリ、AI エージェントを接続する ObjectOS',
  imageNoteTitle: '統一業務オブジェクト層',
  imageNote: 'アプリ、データ、エージェントを接続中',
  positioningKicker: '移行を前提としないプラットフォーム',
  positioningTitle: ['今あるシステムを活かし、', 'AI 向けの業務実行層を追加する。'],
  positioningCopy: '必要なのは再構築ではなく、既存システム、新しいアプリ、AI が共に働く仕組みです。ObjectOS は実際の業務オブジェクトから始め、変更を理解可能で統制された範囲に保ちます。',
  capabilitiesKicker: 'プラットフォーム機能',
  capabilitiesTitle: ['白紙のコードではなく、', '業務構造から始める'],
  capabilitiesLink: 'AI とエージェントの記事',
  capabilities: [
    { title: 'AI に業務オブジェクトを理解させる', copy: '顧客、注文、設備、案件を、エージェントが読み取り、関連付け、操作できる統一オブジェクトにします。' },
    { title: '既存システムを置き換えずに接続', copy: 'データベース、ERP、CRM、自社システムの上に統一 API、権限、インテリジェンスを追加します。' },
    { title: '要件から動くアプリを生成', copy: '宣言的メタデータで業務を記述し、画面、フロー、権限、API を生成します。' },
    { title: 'すべての操作を標準で統制', copy: '企業の ID、権限、監査を再利用し、エージェントの操作に明確な境界を設けます。' },
  ],
  aiKicker: 'AI-native 機能',
  aiTitle: ['AI をチャットに留めず、', '安全にアプリを構築・操作する力へ'],
  aiCopy: 'ObjectOS はオブジェクト、項目、フロー、権限、アクションを、AI が読み書きできる宣言的メタデータにします。AI Builder は管理されたツールで変更を提案し、Agent はユーザー権限内でデータ検索やアクション実行を行います。',
  aiItems: [
    { title: 'AI Builder', copy: '自然言語からオブジェクト、項目、ビュー、フロー、権限を生成し、構造変更は承認キューへ送ります。' },
    { title: 'AI Agent', copy: '業務オブジェクトを検索・分析し、提案を作成し、ログインユーザーの権限内でアクションを実行します。' },
    { title: 'Tools / MCP', copy: 'オブジェクト、アクション、クエリを管理されたツールとして IDE、デスクトップ Agent、独自 Agent に公開します。' },
  ],
  aiLink: 'AI セキュリティモデルを見る',
  workflowKicker: '仕組み',
  workflowTitle: ['複雑な業務を、AI が確実に扱える', '構造へ圧縮する'],
  workflowCopy: 'ObjectOS はオブジェクト、関係、権限、アクションを統一メタデータで記述します。エージェントはコードに散在するルールを推測せず、明確な境界内で動きます。',
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
  closingCopy: '既存システムを一つ接続し、主要な業務オブジェクトを定義して、最初の AI-native アプリを実運用へ。',
  closingCta: '既存システムとの接続方法',
};

const de: HomeCopy = {
  ...en,
  title: 'ObjectOS · AI-native Plattform für Unternehmensanwendungen',
  description: 'ObjectOS verbindet bestehende Daten, Anwendungen, Prozesse und AI Agents über eine einheitliche, kontrollierte Geschäftsobjektschicht.',
  eyebrow: 'AI-native Plattform für Unternehmensanwendungen',
  hero: ['AI direkt in', 'Geschäftssysteme bringen'],
  heroLead: 'ObjectOS verbindet bestehende Daten, Geschäftsobjekte, Berechtigungen und Prozesse zu einer Betriebsschicht, auf der Teams und AI Agents schneller Unternehmensanwendungen bauen.',
  primaryCta: 'Plattform entdecken',
  secondaryCta: 'Anwendungsaufbau ansehen',
  proof: [['Verbinden', 'Systeme und Daten'], ['Erstellen', 'Produktive Anwendungen'], ['Steuern', 'AI und Geschäftsaktionen']],
  imageAlt: 'ObjectOS verbindet Geschäftsdaten, Anwendungen und AI Agents',
  imageNoteTitle: 'Einheitliche Geschäftsobjektschicht',
  imageNote: 'Verbindet Anwendungen, Daten und Agents',
  positioningKicker: 'Keine weitere Plattform mit Migrationszwang',
  positioningTitle: ['Bewährte Systeme behalten.', 'Eine Betriebsschicht für AI ergänzen.'],
  positioningCopy: 'Unternehmen brauchen keinen weiteren Neuaufbau. Sie brauchen eine Arbeitsweise, in der Altsysteme, neue Anwendungen und AI zusammenspielen. ObjectOS beginnt bei realen Geschäftsobjekten und hält Änderungen verständlich und kontrollierbar.',
  capabilitiesKicker: 'Plattformfunktionen',
  capabilitiesTitle: ['Mit der Geschäftsstruktur beginnen,', 'nicht mit einer leeren Codebasis'],
  capabilitiesLink: 'Artikel zu AI und Agents',
  capabilities: [
    { title: 'AI versteht Ihre Geschäftsobjekte', copy: 'Kunden, Aufträge, Anlagen und Fälle werden zu einheitlichen Objekten, die Agents lesen, verknüpfen und bearbeiten können.' },
    { title: 'Systeme verbinden, ohne sie zu ersetzen', copy: 'Ergänzen Sie Datenbanken, ERP, CRM und eigene Systeme um einheitliche APIs, Rechte und Intelligenz.' },
    { title: 'Lauffähige Anwendungen aus Anforderungen', copy: 'Beschreiben Sie das Geschäft deklarativ und generieren Sie Oberflächen, Prozesse, Rechte und APIs.' },
    { title: 'Jede Aktion standardmäßig kontrollieren', copy: 'Nutzen Sie Identitäten, Berechtigungen und Audits, damit jede Agent-Aktion klare Grenzen hat.' },
  ],
  aiKicker: 'AI-native Fähigkeiten',
  aiTitle: ['AI soll mehr sein als Chat.', 'Sie soll Anwendungen sicher bauen und bedienen.'],
  aiCopy: 'ObjectOS macht Objekte, Felder, Prozesse, Berechtigungen und Aktionen zu deklarativen Metadaten, die AI über kontrollierte Tools lesen und ändern kann. AI Builder schlägt Strukturänderungen vor, Agents fragen Daten ab und lösen Aktionen innerhalb der Nutzerrechte aus.',
  aiItems: [
    { title: 'AI Builder', copy: 'Generiert Objekte, Felder, Views, Workflows und Berechtigungen aus natürlicher Sprache; Strukturänderungen laufen in die Freigabe.' },
    { title: 'AI Agent', copy: 'Fragt Geschäftsobjekte ab, analysiert Kontext, erstellt Vorschläge und löst Aktionen mit den Rechten des angemeldeten Nutzers aus.' },
    { title: 'Tools / MCP', copy: 'Stellt Objekte, Aktionen und Abfragen als kontrollierte Tools für IDEs, Desktop-Agents und eigene Agent-Runtimes bereit.' },
  ],
  aiLink: 'AI-Sicherheitsmodell ansehen',
  workflowKicker: 'Funktionsweise',
  workflowTitle: ['Komplexe Abläufe in eine Struktur bringen,', 'die AI zuverlässig verarbeiten kann'],
  workflowCopy: 'ObjectOS beschreibt Objekte, Beziehungen, Rechte und Aktionen in einheitlichen Metadaten. Agents arbeiten innerhalb klarer Grenzen, statt Regeln im Code zu erraten.',
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
  closingCopy: 'Verbinden Sie ein bestehendes System, definieren Sie zentrale Geschäftsobjekte und bringen Sie die erste AI-native Anwendung in Betrieb.',
  closingCta: 'Bestehende Systeme verbinden',
};

const es: HomeCopy = {
  ...en,
  title: 'ObjectOS · Plataforma AI-native para aplicaciones empresariales',
  description: 'ObjectOS conecta datos, aplicaciones, procesos y agentes de AI existentes mediante una capa unificada de objetos de negocio.',
  eyebrow: 'Plataforma AI-native para aplicaciones empresariales',
  hero: ['Lleva la AI a', 'los sistemas de negocio'],
  heroLead: 'ObjectOS conecta datos, objetos de negocio, permisos y procesos existentes en una sola capa operativa para que equipos y agentes de AI creen aplicaciones empresariales más rápido.',
  primaryCta: 'Explorar la plataforma',
  secondaryCta: 'Ver cómo se construye',
  proof: [['Conectar', 'Sistemas y datos existentes'], ['Crear', 'Aplicaciones operativas'], ['Gobernar', 'AI y acciones de negocio']],
  imageAlt: 'ObjectOS conectando datos, aplicaciones y agentes de AI',
  imageNoteTitle: 'Capa unificada de objetos de negocio',
  imageNote: 'Conectando aplicaciones, datos y agentes',
  positioningKicker: 'No es otra plataforma que exige migrar',
  positioningTitle: ['Conserva los sistemas que funcionan.', 'Añade una capa operativa para AI.'],
  positioningCopy: 'Las empresas no necesitan reconstruirlo todo. Necesitan que sistemas heredados, nuevas aplicaciones y AI trabajen juntos. ObjectOS parte de objetos de negocio reales y mantiene el cambio comprensible y gobernado.',
  capabilitiesKicker: 'Capacidades de la plataforma',
  capabilitiesTitle: ['Empieza por la estructura del negocio,', 'no por código en blanco'],
  capabilitiesLink: 'Artículos sobre AI y agentes',
  capabilities: [
    { title: 'Haz que la AI entienda tu negocio', copy: 'Convierte clientes, pedidos, equipos y casos en objetos unificados que los agentes pueden leer, relacionar y modificar.' },
    { title: 'Conecta sistemas sin reemplazarlos', copy: 'Añade API, permisos e inteligencia unificados sobre bases de datos, ERP, CRM y sistemas propios.' },
    { title: 'Genera aplicaciones desde requisitos', copy: 'Describe el negocio con metadatos declarativos y genera interfaces, procesos, permisos y API.' },
    { title: 'Gobierna cada acción por defecto', copy: 'Reutiliza identidad, permisos y auditoría empresarial para definir límites claros a cada agente.' },
  ],
  aiKicker: 'Capacidades AI-native',
  aiTitle: ['Que la AI no sea solo chat.', 'Que construya y opere aplicaciones con seguridad.'],
  aiCopy: 'ObjectOS convierte objetos, campos, procesos, permisos y acciones en metadatos declarativos que la AI puede leer y cambiar mediante herramientas gobernadas. AI Builder propone cambios estructurales y los agentes consultan datos o ejecutan acciones dentro de los permisos del usuario.',
  aiItems: [
    { title: 'AI Builder', copy: 'Genera objetos, campos, vistas, flujos y permisos desde lenguaje natural, con cambios estructurales enviados a aprobación.' },
    { title: 'AI Agent', copy: 'Consulta objetos de negocio, analiza contexto, redacta recomendaciones y ejecuta acciones heredando permisos del usuario conectado.' },
    { title: 'Tools / MCP', copy: 'Expone objetos, acciones y consultas como herramientas controladas para IDE, agentes de escritorio y runtimes propios.' },
  ],
  aiLink: 'Ver el modelo de seguridad AI',
  workflowKicker: 'Cómo funciona',
  workflowTitle: ['Convierte operaciones complejas en', 'una estructura fiable para la AI'],
  workflowCopy: 'ObjectOS describe objetos, relaciones, permisos y acciones mediante metadatos unificados. Los agentes trabajan dentro de límites explícitos sin adivinar reglas dispersas en el código.',
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
  closingCopy: 'Conecta un sistema existente, define sus objetos clave y pon en marcha la primera aplicación AI-native.',
  closingCta: 'Cómo conectar sistemas existentes',
};

const fr: HomeCopy = {
  ...en,
  title: 'ObjectOS · Plateforme AI-native pour applications métier',
  description: 'ObjectOS connecte données, applications, processus et agents AI existants via une couche unifiée et gouvernée d’objets métier.',
  eyebrow: 'Plateforme AI-native pour applications métier',
  hero: ['Faites entrer l’AI dans', 'les systèmes métier'],
  heroLead: 'ObjectOS relie données, objets métier, permissions et processus existants dans une couche opérationnelle unique afin que les équipes et agents AI créent plus vite.',
  primaryCta: 'Découvrir la plateforme',
  secondaryCta: 'Voir la méthode de création',
  proof: [['Connecter', 'Systèmes et données'], ['Créer', 'Applications opérationnelles'], ['Gouverner', 'AI et actions métier']],
  imageAlt: 'ObjectOS connectant données métier, applications et agents AI',
  imageNoteTitle: 'Couche unifiée d’objets métier',
  imageNote: 'Connexion des applications, données et agents',
  positioningKicker: 'Pas une plateforme de plus qui impose une migration',
  positioningTitle: ['Conservez les systèmes efficaces.', 'Ajoutez une couche opérationnelle conçue pour l’AI.'],
  positioningCopy: 'Les entreprises n’ont pas besoin d’une nouvelle reconstruction. Elles ont besoin de faire travailler ensemble systèmes existants, nouvelles applications et AI. ObjectOS part des objets métier réels et garde chaque changement compréhensible et gouverné.',
  capabilitiesKicker: 'Capacités de la plateforme',
  capabilitiesTitle: ['Partez de la structure métier,', 'pas d’une base de code vide'],
  capabilitiesLink: 'Articles sur l’AI et les agents',
  capabilities: [
    { title: 'Donnez à l’AI un modèle du métier', copy: 'Transformez clients, commandes, équipements et dossiers en objets unifiés que les agents peuvent lire et modifier.' },
    { title: 'Connectez sans remplacer', copy: 'Ajoutez API, permissions et intelligence unifiées aux bases de données, ERP, CRM et systèmes internes.' },
    { title: 'Générez des applications opérationnelles', copy: 'Décrivez le métier avec des métadonnées déclaratives et générez interfaces, processus, permissions et API.' },
    { title: 'Gouvernez chaque action par défaut', copy: 'Réutilisez identités, permissions et audits afin que chaque action d’agent respecte des limites claires.' },
  ],
  aiKicker: 'Capacités AI-native',
  aiTitle: ['L’AI ne doit pas rester un chat.', 'Elle doit créer et opérer les applications en sécurité.'],
  aiCopy: 'ObjectOS transforme objets, champs, processus, permissions et actions en métadonnées déclaratives que l’AI peut lire et modifier via des outils gouvernés. AI Builder propose des changements structurants, tandis que les agents consultent les données et déclenchent des actions dans les permissions utilisateur.',
  aiItems: [
    { title: 'AI Builder', copy: 'Génère objets, champs, vues, workflows et permissions en langage naturel, avec validation des changements structurants.' },
    { title: 'AI Agent', copy: 'Interroge les objets métier, analyse le contexte, rédige des recommandations et déclenche des actions avec les permissions de l’utilisateur.' },
    { title: 'Tools / MCP', copy: 'Expose objets, actions et requêtes comme outils contrôlés pour IDE, agents desktop et runtimes personnalisés.' },
  ],
  aiLink: 'Voir le modèle de sécurité AI',
  workflowKicker: 'Fonctionnement',
  workflowTitle: ['Transformez des opérations complexes en', 'une structure fiable pour l’AI'],
  workflowCopy: 'ObjectOS décrit objets, relations, permissions et actions dans des métadonnées unifiées. Les agents travaillent dans des limites explicites sans deviner les règles dispersées dans le code.',
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
  closingCopy: 'Connectez un système existant, définissez ses objets clés et mettez en production votre première application AI-native.',
  closingCta: 'Connecter les systèmes existants',
};

const ko: HomeCopy = {
  ...en,
  title: 'ObjectOS · AI-native 엔터프라이즈 애플리케이션 플랫폼',
  description: 'ObjectOS는 기존 데이터, 애플리케이션, 프로세스와 AI 에이전트를 하나의 관리 가능한 비즈니스 객체 계층으로 연결합니다.',
  eyebrow: 'AI-native 엔터프라이즈 애플리케이션 플랫폼',
  hero: ['AI를 기업', '업무 시스템으로'],
  heroLead: 'ObjectOS는 기존 데이터, 비즈니스 객체, 권한과 프로세스를 하나의 운영 계층으로 연결해 팀과 AI 에이전트가 기업 애플리케이션을 더 빠르게 구축하도록 합니다.',
  primaryCta: '플랫폼 살펴보기',
  secondaryCta: '구축 방식 보기',
  proof: [['연결', '기존 시스템과 데이터'], ['구축', '실행 가능한 애플리케이션'], ['거버넌스', 'AI와 업무 작업']],
  imageAlt: '비즈니스 데이터, 애플리케이션과 AI 에이전트를 연결하는 ObjectOS',
  imageNoteTitle: '통합 비즈니스 객체 계층',
  imageNote: '애플리케이션, 데이터와 에이전트 연결 중',
  positioningKicker: '마이그레이션을 요구하는 또 다른 플랫폼이 아닙니다',
  positioningTitle: ['이미 잘 작동하는 시스템은 유지하고,', 'AI를 위한 업무 운영 계층을 더하세요.'],
  positioningCopy: '기업에 필요한 것은 또 한 번의 재구축이 아니라 기존 시스템, 새로운 애플리케이션과 AI가 함께 일하는 방식입니다. ObjectOS는 실제 비즈니스 객체에서 시작해 변화를 이해 가능하고 통제 가능한 범위에 둡니다.',
  capabilitiesKicker: '플랫폼 기능',
  capabilitiesTitle: ['빈 코드가 아니라,', '업무 구조에서 시작합니다'],
  capabilitiesLink: 'AI와 에이전트 글 읽기',
  capabilities: [
    { title: 'AI가 비즈니스 객체를 이해하도록', copy: '고객, 주문, 장비와 케이스를 에이전트가 읽고 연결하고 작업할 수 있는 통합 객체로 만듭니다.' },
    { title: '교체 없이 기존 시스템 연결', copy: '데이터베이스, ERP, CRM과 자체 시스템 위에 통합 API, 권한과 지능을 추가합니다.' },
    { title: '요구사항에서 실행 가능한 앱 생성', copy: '선언형 메타데이터로 업무를 설명하고 화면, 프로세스, 권한과 API를 생성합니다.' },
    { title: '모든 작업에 거버넌스 내장', copy: '기업 ID, 권한과 감사 체계를 재사용해 모든 에이전트 작업에 명확한 경계를 둡니다.' },
  ],
  aiKicker: 'AI-native 기능',
  aiTitle: ['AI를 채팅에 머물게 하지 말고,', '애플리케이션을 안전하게 만들고 운영하게 하세요'],
  aiCopy: 'ObjectOS는 객체, 필드, 프로세스, 권한과 작업을 AI가 관리되는 도구로 읽고 변경할 수 있는 선언형 메타데이터로 만듭니다. AI Builder는 구조 변경을 제안하고, Agent는 사용자 권한 안에서 데이터를 조회하고 작업을 실행합니다.',
  aiItems: [
    { title: 'AI Builder', copy: '자연어로 객체, 필드, 뷰, 워크플로와 권한을 생성하고 구조 변경은 승인 대기열로 보냅니다.' },
    { title: 'AI Agent', copy: '비즈니스 객체를 조회하고 맥락을 분석하며 제안을 만들고 로그인 사용자 권한 안에서 작업을 실행합니다.' },
    { title: 'Tools / MCP', copy: '객체, 작업과 쿼리를 IDE, 데스크톱 Agent, 사용자 정의 Agent 런타임을 위한 제어된 도구로 노출합니다.' },
  ],
  aiLink: 'AI 보안 모델 보기',
  workflowKicker: '작동 방식',
  workflowTitle: ['복잡한 업무를 AI가 안정적으로 처리할', '구조로 압축합니다'],
  workflowCopy: 'ObjectOS는 객체, 관계, 권한과 작업을 통합 메타데이터로 설명합니다. 에이전트는 코드 곳곳의 규칙을 추측하지 않고 명확한 경계 안에서 작업합니다.',
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
  closingCopy: '기존 시스템 하나를 연결하고 핵심 비즈니스 객체를 정의해 첫 AI-native 애플리케이션을 실제로 운영하세요.',
  closingCta: '기존 시스템 연결 방법',
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
