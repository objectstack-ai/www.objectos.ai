import { s2t } from './zhconvert';
import type { Locale } from './i18n';

export interface SecurityCopy {
  title: string;
  description: string;
  eyebrow: string;
  hero: [string, string];
  lead: string;
  metrics: { value: string; label: string }[];
  residencyTitle: string;
  residencyLead: string;
  residencyColumns: [string, string, string];
  residencyRows: { data: string; location: string; leaves: string }[];
  aiTitle: string;
  aiLead: string;
  aiSteps: { title: string; copy: string }[];
  permissionTitle: string;
  permissionLead: string;
  permissionLayers: { title: string; copy: string }[];
  deploymentTitle: string;
  deploymentLead: string;
  deployments: { title: string; copy: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  ctaKicker: string;
  ctaTitle: string;
  ctaCopy: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const zhHans: SecurityCopy = {
  title: '安全与治理 · ObjectOS',
  description: '了解 ObjectOS 如何让 AI Agent 安全接触业务数据，并在自托管环境中保护权限边界、审批和审计证据。',
  eyebrow: '安全与治理',
  hero: ['让 AI Agent 安全接触', '真实业务数据'],
  lead: 'ObjectOS 是 ObjectStack 应用的商业生产平台。它不把 AI 挡在业务系统外面，而是让 Agent 在明确的身份、权限、工具、审批和审计边界内工作。数据仍在你的基础设施中，AI 的每一步都受 ObjectStack 运行时约束。',
  metrics: [
    { value: 'Agent', label: '继承用户身份' },
    { value: 'Tool', label: '受控工具访问' },
    { value: 'Audit', label: '全程审批审计' },
  ],
  residencyTitle: '数据驻留',
  residencyLead: 'ObjectOS 不要求你把业务数据搬到我们的云上。ObjectStack 运行时连接你的数据库、存储和身份系统，数据驻留边界由你的部署方式决定。',
  residencyColumns: ['数据类别', '存放位置', '是否离开网络'],
  residencyRows: [
    { data: '业务记录', location: '你的数据库', leaves: '否' },
    { data: '用户账号、会话、OAuth token', location: '你的数据库', leaves: '否' },
    { data: '审计日志', location: '你的数据库', leaves: '否' },
    { data: '上传文件', location: '本地磁盘、S3 或 R2', leaves: '否' },
    { data: '密钥与设置', location: '你的密钥管理器或加密设置存储', leaves: '否' },
    { data: 'AI 请求内容', location: '由你选择的模型提供方或本地模型处理', leaves: '仅在你配置外部模型时' },
  ],
  aiTitle: 'AI Agent 安全模型',
  aiLead: 'ObjectOS 不把模型当作超级管理员。AI 先理解业务对象，再通过声明式工具查询、分析或触发动作；工具输入经过校验，写操作进入审批队列，并受同一套权限系统约束。',
  aiSteps: [
    { title: '以用户身份行动', copy: 'Agent 代表某个登录用户执行任务，而不是使用不受限制的后台账号。用户看不到的记录，Agent 也看不到。' },
    { title: '通过工具访问对象', copy: 'Agent 调用 query、action、metadata 等结构化工具，不直接拥有数据库连接，也不会把整张表塞进提示词。' },
    { title: '变更先入队', copy: '会修改元数据或关键状态的工具调用先进入待审批队列，审批人看到 diff 后再决定是否应用。' },
    { title: '全程可审计', copy: '对话、工具调用、读取、写入、批准、拒绝和权限变更都可以写入审计日志，方便安全复盘和合规取证。' },
  ],
  permissionTitle: '权限与审计',
  permissionLead: '权限模型沿用企业软件成熟词汇：身份、角色、权限集、记录访问和字段安全。简单应用可以只用权限集，复杂 CRM 或多租户应用可以逐层加上更细边界。',
  permissionLayers: [
    { title: '身份', copy: '认证用户、组织、成员关系、会话和 API key 都在你的项目数据库中。' },
    { title: '权限集', copy: '授予应用访问、对象 CRUD、字段读写、系统能力和集成能力。' },
    { title: '记录访问', copy: '通过所有权、组织作用域、共享规则或显式共享决定用户能触达哪些行。' },
    { title: '字段安全', copy: '即使用户能看到记录，敏感字段也可以隐藏或设为只读，并在 API、ObjectQL 和 Console 中统一生效。' },
    { title: '审计日志', copy: '记录 CRUD、权限授予、会话撤销、AI 工具调用和审批结果；审计行不可变，只能归档。' },
  ],
  deploymentTitle: '部署边界',
  deploymentLead: 'ObjectOS 可在企业内网中运营 ObjectStack：一个 Node.js 运行时、你的数据库、你的密钥和你的入口层。需要更严格边界时，也可以使用文件制品和离线镜像。',
  deployments: [
    { title: 'VPC / 私有网络', copy: '运行在你的云账号或私有网络中，只开放必要的入站 HTTP/HTTPS 和数据库连接。' },
    { title: '本地服务器', copy: '用 Docker、systemd 或自有平台运行，连接本地数据库、对象存储和身份系统。' },
    { title: '隔离网络', copy: '使用离线容器镜像和本地 objectstack.json 制品，不配置云控制面，也不需要公共互联网。' },
    { title: '本地模型', copy: '可将 AI 服务指向 Ollama、vLLM 或内部模型端点，避免业务上下文发往外部模型提供方。' },
  ],
  faqTitle: '安全评审常见问题',
  faqs: [
    { question: 'ObjectOS 会回传数据吗？', answer: '不会。除非你显式配置 OIDC、邮件、AI 提供方、Webhook 或外部存储等集成，否则 ObjectOS 不回传、不查 license server，也不收集遥测。' },
    { question: 'AI 请求会发什么给模型厂商？', answer: '只会发送模型完成任务所需的对话上下文、工具定义和必要工具输出。你可以选择外部模型，也可以配置本地模型，让这些内容留在边界内。' },
    { question: '如何限制 Agent 写入？', answer: '可以使用只读数据源、对象级权限、字段级权限、动作权限和审批队列。Agent 无法绕过运行时权限，也无法静默应用结构性变更。' },
    { question: '谁负责 TLS、数据库加密和密钥管理？', answer: '这些属于你的部署责任。ObjectStack 运行时提供权限执行、审计、API key 哈希存储和设置加密；TLS、数据库静态加密、备份和密钥注入由你的基础设施负责。' },
    { question: '它适合合规行业吗？', answer: 'ObjectOS 提供访问控制、审计、数据驻留和隔离部署这些技术原语。具体认证取决于你的运行中部署，而不是单个二进制。' },
  ],
  ctaKicker: '下一步',
  ctaTitle: '让 AI 接近业务，但不要让它越过边界。',
  ctaCopy: '先确认 Agent 如何识别用户、访问对象、触发动作、进入审批和留下审计，再把它接到真实业务数据上。',
  ctaPrimary: '阅读安全文档',
  ctaSecondary: '查看安全边界博客',
};

const en: SecurityCopy = {
  title: 'Security and Governance · ObjectOS',
  description: 'Learn how ObjectOS gives AI agents governed access to business data while protecting permissions, approvals, and audit evidence in self-hosted environments.',
  eyebrow: 'Security and governance',
  hero: ['Give AI agents governed access', 'to real business data.'],
  lead: 'ObjectOS is the commercial production platform for ObjectStack applications. It lets agents read, analyze, and move work forward inside explicit boundaries for identity, permissions, tools, approvals, and audit. Data stays on your infrastructure, and every AI action is constrained by the ObjectStack runtime.',
  metrics: [
    { value: 'Agent', label: 'inherits user identity' },
    { value: 'Tool', label: 'governed access path' },
    { value: 'Audit', label: 'approval and evidence' },
  ],
  residencyTitle: 'Data residency',
  residencyLead: 'ObjectOS does not require moving business data into our cloud. The ObjectStack runtime connects to your databases, storage, and identity systems, so residency follows your deployment boundary.',
  residencyColumns: ['Data', 'Location', 'Leaves boundary?'],
  residencyRows: [
    { data: 'Business records', location: 'Your database', leaves: 'No' },
    { data: 'Users, sessions, OAuth tokens', location: 'Your database', leaves: 'No' },
    { data: 'Audit logs', location: 'Your database', leaves: 'No' },
    { data: 'Uploaded files', location: 'Local disk, S3, or R2', leaves: 'No' },
    { data: 'Secrets and settings', location: 'Your secret manager or encrypted settings store', leaves: 'No' },
    { data: 'AI request context', location: 'Your chosen model provider or local model', leaves: 'Only if you configure an external model' },
  ],
  aiTitle: 'AI agent safety model',
  aiLead: 'ObjectOS does not treat the model as an administrator. Agents work through business objects and use declarative tools to query, analyze, or trigger actions. Tool input is validated, mutating work goes through approval, and every call is checked against the same permission system.',
  aiSteps: [
    { title: 'Acts as a user', copy: 'An agent represents a signed-in user, not an unrestricted service account. If the user cannot see a record, the agent cannot see it either.' },
    { title: 'Uses governed tools', copy: 'Agents call structured query, action, and metadata tools instead of holding raw database credentials or dumping whole tables into prompts.' },
    { title: 'Queues changes', copy: 'Tools that modify metadata or sensitive state enter a pending-action queue so reviewers can inspect the diff before applying it.' },
    { title: 'Leaves evidence', copy: 'Conversations, tool calls, reads, writes, approvals, rejections, and permission changes can be written to audit logs.' },
  ],
  permissionTitle: 'Permissions and audit',
  permissionLead: 'The access model uses enterprise software vocabulary: identity, roles, permission sets, record access, and field security. Simple apps can start with permission sets; regulated, CRM, or multi-tenant apps can add finer boundaries later.',
  permissionLayers: [
    { title: 'Identity', copy: 'Users, organizations, memberships, sessions, and API keys live in your project database.' },
    { title: 'Permission sets', copy: 'Grant app access, object CRUD, field read/write, system capabilities, and integration capabilities.' },
    { title: 'Record access', copy: 'Ownership, organization scope, sharing rules, and explicit shares decide which rows a user can touch.' },
    { title: 'Field security', copy: 'Sensitive fields can be hidden or read-only even when the record is visible, consistently across API, ObjectQL, and Console.' },
    { title: 'Audit logs', copy: 'Record CRUD, permission grants, session revocation, AI tool calls, and approval decisions; audit rows are immutable and can only be archived.' },
  ],
  deploymentTitle: 'Deployment boundary',
  deploymentLead: 'ObjectOS can operate ObjectStack inside an enterprise network: one Node.js runtime, your database, your secrets, and your ingress. Stricter environments can use file-backed artifacts and offline images.',
  deployments: [
    { title: 'VPC / private network', copy: 'Run in your cloud account or private network with only required HTTP/HTTPS and database connectivity.' },
    { title: 'Local servers', copy: 'Run with Docker, systemd, or your own platform while connecting local databases, object storage, and identity.' },
    { title: 'Air-gapped', copy: 'Use offline container images and a local objectstack.json artifact with no cloud control plane or public internet requirement.' },
    { title: 'Local models', copy: 'Point AI services at Ollama, vLLM, or internal model endpoints to keep business context inside your boundary.' },
  ],
  faqTitle: 'Security review FAQ',
  faqs: [
    { question: 'Does ObjectOS send telemetry?', answer: 'No. Unless you explicitly configure integrations such as OIDC, email, AI providers, webhooks, or external storage, ObjectOS does not send telemetry, contact a license server, or transmit data back to ObjectStack.' },
    { question: 'What goes to a model provider?', answer: 'Only the context required for the model task: conversation context, tool definitions, and necessary tool output. You can use an external model or configure a local model endpoint.' },
    { question: 'How do we limit agent writes?', answer: 'Use read-only data sources, object permissions, field permissions, action permissions, and approval queues. Agents cannot bypass runtime permissions or silently apply structural changes.' },
    { question: 'Who owns TLS, database encryption, and secrets?', answer: 'Those are deployment responsibilities. The ObjectStack runtime provides authorization, audit, API key hashing, and settings encryption; your infrastructure owns TLS, at-rest database encryption, backups, and secret injection.' },
    { question: 'Is it suitable for regulated environments?', answer: 'ObjectOS provides the technical primitives: access control, audit, data residency, and isolated deployment. Certification depends on your running deployment, not a binary alone.' },
  ],
  ctaKicker: 'Next step',
  ctaTitle: 'Let agents work with business data without crossing the boundary.',
  ctaCopy: 'Confirm how agents identify users, access objects, trigger actions, enter approval, and leave audit evidence before connecting them to production data.',
  ctaPrimary: 'Read the security docs',
  ctaSecondary: 'Read how to connect existing systems',
};

const ja: SecurityCopy = {
  ...en,
  title: 'セキュリティとガバナンス · ObjectOS',
  description: 'セルフホスト環境で ObjectOS がデータ所在地、権限、AI エージェント操作、監査証跡をどう守るか。',
  eyebrow: 'セキュリティとガバナンス',
  hero: ['データは自社ネットワーク内に。', 'AI は権限の内側で動く。'],
  lead: 'ObjectOS は ObjectStack アプリの商用プロダクションプラットフォームで、ObjectStack ランタイムを自社インフラに展開できます。業務データ、ID、監査ログ、ファイル、シークレットは自社管理のままです。',
  metrics: [
    { value: '0', label: '既定の外部テレメトリ' },
    { value: '5 層', label: 'ID からフィールドまでの権限モデル' },
    { value: 'HITL', label: 'AI 変更の人による承認' },
  ],
  residencyTitle: 'データ所在地',
  residencyLead: 'ObjectOS は業務データを当社クラウドへ移すことを求めません。ObjectStack ランタイムは自社のデータベース、ストレージ、ID 基盤へ接続します。',
  residencyColumns: ['データ', '保存場所', '外部へ出るか'],
  aiTitle: 'AI エージェントの安全モデル',
  aiLead: 'ObjectOS はモデルを管理者として扱いません。AI は宣言的なツールを使い、入力は検証され、変更は承認を通り、同じ権限システムで制約されます。',
  permissionTitle: '権限と監査',
  permissionLead: 'ID、ロール、権限セット、レコードアクセス、フィールドセキュリティという企業ソフトウェアの語彙でアクセスを管理します。',
  deploymentTitle: 'デプロイ境界',
  deploymentLead: '基本形は 1 つの Node.js ランタイム、自社データベース、自社シークレット、自社 ingress。より厳しい環境ではファイル制品とオフラインイメージを使えます。',
  faqTitle: 'セキュリティレビュー FAQ',
  ctaKicker: '次のステップ',
  ctaTitle: '試験導入の後ではなく、最初にセキュリティレビューを置く。',
  ctaCopy: 'AI エージェントを実データへ接続する前に、データ所在地、権限、監査証跡、デプロイ境界を確認します。',
  ctaPrimary: 'セキュリティ文書を読む',
  ctaSecondary: '既存システム接続の記事を読む',
};

const de: SecurityCopy = {
  ...en,
  title: 'Sicherheit und Governance · ObjectOS',
  description: 'Wie ObjectOS Datenresidenz, Berechtigungen, AI-Agent-Aktionen und Audit-Nachweise in selbst gehosteten Umgebungen schützt.',
  eyebrow: 'Sicherheit und Governance',
  hero: ['Daten bleiben in Ihrem Netzwerk.', 'AI arbeitet innerhalb von Berechtigungen.'],
  lead: 'ObjectOS ist die kommerzielle Produktionsplattform für ObjectStack-Apps und kann die ObjectStack Runtime in Ihrer Infrastruktur betreiben. Geschäftsdaten, Identitäten, Audit-Logs, Dateien und Secrets bleiben unter Ihrer Kontrolle.',
  residencyTitle: 'Datenresidenz',
  residencyLead: 'ObjectOS verlangt nicht, Geschäftsdaten in unsere Cloud zu verschieben. Die ObjectStack Runtime verbindet sich mit Ihren Datenbanken, Speichern und Identitätssystemen.',
  residencyColumns: ['Daten', 'Speicherort', 'Verlässt es das Netzwerk?'],
  aiTitle: 'Sicherheitsmodell für AI Agents',
  aiLead: 'ObjectOS behandelt das Modell nicht als Administrator. AI arbeitet über deklarative Tools, Eingaben werden validiert, Änderungen werden freigegeben und alle Aufrufe folgen demselben Berechtigungssystem.',
  permissionTitle: 'Berechtigungen und Audit',
  permissionLead: 'Das Modell nutzt die vertraute Sprache von Unternehmenssoftware: Identität, Rollen, Berechtigungssätze, Datensatz-Zugriff und Feldsicherheit.',
  deploymentTitle: 'Deployment-Grenze',
  deploymentLead: 'Die Standardform ist netzwerkfreundlich: eine Node.js Runtime, Ihre Datenbank, Ihre Secrets und Ihr Ingress. Strengere Umgebungen können file-backed Artefakte und Offline-Images nutzen.',
  faqTitle: 'FAQ für Sicherheitsreviews',
  ctaKicker: 'Nächster Schritt',
  ctaTitle: 'Sicherheitsreview zuerst, nicht nach dem Pilot.',
  ctaCopy: 'Bestätigen Sie Datenresidenz, Berechtigungen, Audit-Nachweise und Deployment-Form, bevor AI Agents echte Geschäftsdaten berühren.',
  ctaPrimary: 'Sicherheitsdokumentation lesen',
  ctaSecondary: 'Artikel zum Verbinden bestehender Systeme lesen',
};

const es: SecurityCopy = {
  ...en,
  title: 'Seguridad y gobierno · ObjectOS',
  description: 'Cómo ObjectOS protege residencia de datos, permisos, acciones de agentes de AI y evidencia de auditoría en entornos autohospedados.',
  eyebrow: 'Seguridad y gobierno',
  hero: ['Los datos permanecen en tu red.', 'La AI trabaja dentro de permisos.'],
  lead: 'ObjectOS es la plataforma comercial de producción para apps ObjectStack y puede operar el runtime de ObjectStack en tu infraestructura. Registros de negocio, identidades, auditoría, archivos y secretos siguen bajo tu control.',
  residencyTitle: 'Residencia de datos',
  residencyLead: 'ObjectOS no exige mover datos de negocio a nuestra nube. El runtime de ObjectStack se conecta a tus bases de datos, almacenamiento e identidad.',
  residencyColumns: ['Datos', 'Ubicación', '¿Sale de la red?'],
  aiTitle: 'Modelo de seguridad para agentes de AI',
  aiLead: 'ObjectOS no trata al modelo como administrador. La AI usa herramientas declarativas, las entradas se validan, los cambios pasan por aprobación y cada llamada respeta el mismo sistema de permisos.',
  permissionTitle: 'Permisos y auditoría',
  permissionLead: 'El modelo usa vocabulario de software empresarial: identidad, roles, conjuntos de permisos, acceso a registros y seguridad de campos.',
  deploymentTitle: 'Límite de despliegue',
  deploymentLead: 'La forma predeterminada es amigable para redes empresariales: un runtime Node.js, tu base de datos, tus secretos y tu entrada. Entornos más estrictos pueden usar artefactos locales e imágenes offline.',
  faqTitle: 'FAQ de revisión de seguridad',
  ctaKicker: 'Siguiente paso',
  ctaTitle: 'Pon la revisión de seguridad primero, no después del piloto.',
  ctaCopy: 'Confirma residencia de datos, permisos, auditoría y despliegue antes de conectar agentes de AI a datos reales.',
  ctaPrimary: 'Leer documentación de seguridad',
  ctaSecondary: 'Leer cómo conectar sistemas existentes',
};

const fr: SecurityCopy = {
  ...en,
  title: 'Sécurité et gouvernance · ObjectOS',
  description: 'Comment ObjectOS protège résidence des données, permissions, actions des agents AI et preuves d’audit dans les environnements auto-hébergés.',
  eyebrow: 'Sécurité et gouvernance',
  hero: ['Les données restent dans votre réseau.', 'L’AI agit dans les permissions.'],
  lead: 'ObjectOS est la plateforme commerciale de production pour les applications ObjectStack et peut exploiter le runtime ObjectStack dans votre infrastructure. Données métier, identités, journaux d’audit, fichiers et secrets restent sous votre contrôle.',
  residencyTitle: 'Résidence des données',
  residencyLead: 'ObjectOS n’exige pas de déplacer vos données métier dans notre cloud. Le runtime ObjectStack se connecte à vos bases de données, stockages et systèmes d’identité.',
  residencyColumns: ['Données', 'Emplacement', 'Sort du réseau ?'],
  aiTitle: 'Modèle de sécurité des agents AI',
  aiLead: 'ObjectOS ne traite pas le modèle comme un administrateur. L’AI passe par des outils déclaratifs, les entrées sont validées, les changements sont approuvés et chaque appel respecte le même système de permissions.',
  permissionTitle: 'Permissions et audit',
  permissionLead: 'Le modèle utilise le vocabulaire du logiciel d’entreprise : identité, rôles, ensembles de permissions, accès aux enregistrements et sécurité des champs.',
  deploymentTitle: 'Frontière de déploiement',
  deploymentLead: 'La forme par défaut convient au réseau d’entreprise : un runtime Node.js, votre base, vos secrets et votre ingress. Les environnements stricts peuvent utiliser des artefacts locaux et des images offline.',
  faqTitle: 'FAQ de revue sécurité',
  ctaKicker: 'Étape suivante',
  ctaTitle: 'Placez la revue sécurité avant le pilote.',
  ctaCopy: 'Validez résidence des données, permissions, preuves d’audit et déploiement avant de connecter des agents AI aux données réelles.',
  ctaPrimary: 'Lire la documentation sécurité',
  ctaSecondary: 'Lire comment connecter les systèmes existants',
};

const ko: SecurityCopy = {
  ...en,
  title: '보안 및 거버넌스 · ObjectOS',
  description: '셀프 호스팅 환경에서 ObjectOS가 데이터 레지던시, 권한, AI 에이전트 작업, 감사 증거를 보호하는 방식.',
  eyebrow: '보안 및 거버넌스',
  hero: ['데이터는 네트워크 안에 유지하고,', 'AI는 권한 경계 안에서 작동합니다'],
  lead: 'ObjectOS는 ObjectStack 앱을 위한 상용 프로덕션 플랫폼이며, ObjectStack 런타임을 사용자의 인프라에서 운영할 수 있습니다. 비즈니스 기록, ID, 감사 로그, 파일과 시크릿은 사용자가 통제합니다.',
  residencyTitle: '데이터 레지던시',
  residencyLead: 'ObjectOS는 비즈니스 데이터를 당사 클라우드로 옮기라고 요구하지 않습니다. ObjectStack 런타임은 사용자의 데이터베이스, 스토리지, ID 시스템에 연결됩니다.',
  residencyColumns: ['데이터', '위치', '네트워크 이탈 여부'],
  aiTitle: 'AI 에이전트 안전 모델',
  aiLead: 'ObjectOS는 모델을 관리자로 취급하지 않습니다. AI는 선언형 도구를 사용하고 입력은 검증되며 변경은 승인 절차를 거치고 모든 호출은 동일한 권한 시스템의 제약을 받습니다.',
  permissionTitle: '권한 및 감사',
  permissionLead: '접근 모델은 엔터프라이즈 소프트웨어의 언어인 ID, 역할, 권한 세트, 레코드 접근, 필드 보안을 사용합니다.',
  deploymentTitle: '배포 경계',
  deploymentLead: '기본 형태는 하나의 Node.js 런타임, 사용자의 데이터베이스, 시크릿, ingress입니다. 더 엄격한 환경은 파일 기반 아티팩트와 오프라인 이미지를 사용할 수 있습니다.',
  faqTitle: '보안 검토 FAQ',
  ctaKicker: '다음 단계',
  ctaTitle: '파일럿 이후가 아니라 처음부터 보안 검토를 시작하세요.',
  ctaCopy: 'AI 에이전트를 실제 비즈니스 데이터에 연결하기 전에 데이터 레지던시, 권한, 감사 증거, 배포 형태를 확인하세요.',
  ctaPrimary: '보안 문서 읽기',
  ctaSecondary: '기존 시스템 연결 글 읽기',
};

const toHant = (value: unknown): unknown => {
  if (typeof value === 'string') return s2t(value);
  if (Array.isArray(value)) return value.map(toHant);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, toHant(item)]));
  }
  return value;
};

export const securityCopy: Record<Locale, SecurityCopy> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': toHant(zhHans) as SecurityCopy,
  ja,
  de,
  es,
  fr,
  ko,
};
