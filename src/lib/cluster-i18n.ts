import type { Cluster, ClusterFaq } from './clusters';
import type { Locale } from './i18n';
import { s2t } from './zhconvert';

export interface ClusterCopy {
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  definition: string;
  whyNow: string[];
  capabilities: string[];
  useCases: string[];
  faq: ClusterFaq[];
}

export interface ClusterLabels {
  allArticles: string;
  capabilities: string;
  clusterSignals: string;
  explore: string;
  faq: string;
  heroRail: string[];
  readingPath: string;
  relatedArticles: string;
  useCases: string;
  whyNow: string;
}

type TemplateLocale = Exclude<Locale, 'en' | 'zh-Hant'>;
type NameMap = Record<TemplateLocale, { title: string; shortTitle: string }>;
type TextTemplates = {
  labels: ClusterLabels;
  description: (name: string) => string;
  eyebrow: string;
  lead: (name: string) => string;
  definition: (name: string) => string;
  whyNow: (name: string) => string[];
  capabilities: (name: string) => string[];
  useCases: (name: string) => string[];
  faq: (name: string) => ClusterFaq[];
};

const NAMES: Record<string, NameMap> = {
  'ai-native-app-platform': {
    'zh-Hans': { title: 'AI-native 应用平台', shortTitle: 'AI-native 应用平台' },
    ja: { title: 'AI-native アプリプラットフォーム', shortTitle: 'AI-native アプリ' },
    de: { title: 'AI-native App-Plattform', shortTitle: 'AI-native App-Plattform' },
    es: { title: 'Plataforma de aplicaciones AI-native', shortTitle: 'Plataforma AI-native' },
    fr: { title: 'Plateforme applicative AI-native', shortTitle: 'Plateforme AI-native' },
    ko: { title: 'AI-native 앱 플랫폼', shortTitle: 'AI-native 앱 플랫폼' },
  },
  'legacy-system-modernization': {
    'zh-Hans': { title: '用 AI 做遗留系统现代化', shortTitle: '遗留系统现代化' },
    ja: { title: 'AI によるレガシーシステム近代化', shortTitle: 'レガシー近代化' },
    de: { title: 'Legacy-System-Modernisierung mit AI', shortTitle: 'Legacy-Modernisierung' },
    es: { title: 'Modernización de sistemas heredados con AI', shortTitle: 'Modernización legacy' },
    fr: { title: 'Modernisation des systèmes hérités avec AI', shortTitle: 'Modernisation legacy' },
    ko: { title: 'AI 기반 레거시 시스템 현대화', shortTitle: '레거시 현대화' },
  },
  'self-hosted-ai': {
    'zh-Hans': { title: '企业应用的自托管 AI', shortTitle: '自托管 AI' },
    ja: { title: '企業アプリケーション向けセルフホスト AI', shortTitle: 'セルフホスト AI' },
    de: { title: 'Self-Hosted AI für Unternehmensanwendungen', shortTitle: 'Self-Hosted AI' },
    es: { title: 'AI autoalojada para aplicaciones empresariales', shortTitle: 'AI autoalojada' },
    fr: { title: 'AI auto-hébergée pour les applications d’entreprise', shortTitle: 'AI auto-hébergée' },
    ko: { title: '엔터프라이즈 애플리케이션을 위한 셀프 호스팅 AI', shortTitle: '셀프 호스팅 AI' },
  },
  'crm-case-management-ai': {
    'zh-Hans': { title: 'CRM 与案件管理 AI', shortTitle: 'CRM 与案件管理' },
    ja: { title: 'CRM とケース管理の AI', shortTitle: 'CRM とケース管理' },
    de: { title: 'CRM- und Case-Management-AI', shortTitle: 'CRM und Case Management' },
    es: { title: 'AI para CRM y gestión de casos', shortTitle: 'CRM y casos' },
    fr: { title: 'AI pour CRM et gestion des dossiers', shortTitle: 'CRM et dossiers' },
    ko: { title: 'CRM 및 케이스 관리 AI', shortTitle: 'CRM 및 케이스 관리' },
  },
  'manufacturing-ai': {
    'zh-Hans': { title: '制造业 AI 与老系统连接', shortTitle: '制造业 AI' },
    ja: { title: 'レガシーシステム上の製造業 AI', shortTitle: '製造業 AI' },
    de: { title: 'Manufacturing AI auf Legacy-Systemen', shortTitle: 'Manufacturing AI' },
    es: { title: 'AI industrial sobre sistemas heredados', shortTitle: 'AI industrial' },
    fr: { title: 'AI industrielle sur systèmes hérités', shortTitle: 'AI industrielle' },
    ko: { title: '레거시 시스템 위의 제조 AI', shortTitle: '제조 AI' },
  },
};

const TEMPLATES: Record<TemplateLocale, TextTemplates> = {
  'zh-Hans': {
    eyebrow: '主题页',
    labels: {
      allArticles: '全部文章',
      capabilities: '平台需要具备什么',
      clusterSignals: '主题信号',
      explore: '继续浏览这个主题',
      faq: '常见问题',
      heroRail: ['业务对象层', '受控 Agent', '现有系统', '可审计流程'],
      readingPath: '阅读路径',
      relatedArticles: '相关文章',
      useCases: '典型场景',
      whyNow: '为什么现在重要',
    },
    description: (name) =>
      `了解 ${name} 如何连接现有业务系统、建模业务对象，并让 AI 在权限、审批和审计边界内工作。`,
    lead: (name) =>
      `${name} 的核心不是再做一个演示页面，而是把真实业务对象、权限、流程、API 和 Agent 工具组织成一个可治理的运行层。`,
    definition: (name) =>
      `${name} 把客户、工单、订单、设备、合同和审批等业务记录变成 AI 可以理解和调用的结构化对象。ObjectOS 让 AI 使用明确的工具和权限边界，而不是直接绕过系统访问数据。`,
    whyNow: (name) => [
      `${name} 让企业 AI 面向真实业务记录，而不是一次性的导出文件。`,
      '应用生成之后还需要权限、审计、审批和持续演进能力。',
      '企业需要在不替换核心系统的前提下，把 AI 放进实际流程。',
    ],
    capabilities: () => [
      '把客户、订单、案件、设备、合同和审批建模成业务对象。',
      '从同一份业务规格生成页面、流程、API 和 Agent 工具。',
      '让用户和 AI Agent 在同一套权限、审批和审计边界内执行动作。',
      '连接现有 CRM、ERP、数据库和自研系统，而不是强制迁移。',
    ],
    useCases: () => [
      '围绕维修、服务、审批或内部运营需求生成可运行应用。',
      '给 CRM、ERP、工单和制造系统增加 AI 查询、总结和异常分析能力。',
      '让 Agent 通过受控工具操作业务对象，而不是拿管理员权限直连数据库。',
    ],
    faq: (name) => [
      {
        question: `${name} 解决什么问题？`,
        answer:
          '它解决的是 AI 如何理解并安全操作企业业务系统的问题：对象、权限、流程、API、审批和审计都必须被显式建模。',
      },
      {
        question: '这和低代码有什么不同？',
        answer:
          '低代码主要加速表单和流程搭建。ObjectOS 更关注底层业务对象、权限治理、系统集成、Agent 工具和长期演进。',
      },
      {
        question: '是否需要先替换现有系统？',
        answer:
          '通常不需要。更稳妥的路径是先连接现有系统，把关键记录建模为业务对象，再逐步叠加 AI、流程和新应用。',
      },
    ],
  },
  ja: {
    eyebrow: 'ピラーガイド',
    labels: {
      allArticles: 'すべての記事',
      capabilities: '必要なプラットフォーム機能',
      clusterSignals: 'クラスタの要点',
      explore: 'このクラスタを探索',
      faq: 'FAQ',
      heroRail: ['ビジネスオブジェクト層', '統制されたエージェント', '既存システム', '監査可能なワークフロー'],
      readingPath: '読書パス',
      relatedArticles: '関連記事',
      useCases: 'ユースケース',
      whyNow: 'なぜ今重要か',
    },
    description: (name) =>
      `${name} が既存システム、ビジネスオブジェクト、権限、ワークフロー、AI エージェントをどのようにつなぐかを解説します。`,
    lead: (name) =>
      `${name} は単なるページ生成ではありません。実データ、権限、API、ワークフロー、エージェントツールを統制された実行基盤にまとめます。`,
    definition: (name) =>
      `${name} は顧客、ケース、注文、設備、契約、承認をビジネスオブジェクトとして表現し、AI が明示的な権限とツールを通じて安全に扱えるようにします。`,
    whyNow: (name) => [
      `${name} は AI をエクスポートされたデータではなく実際の業務記録につなぎます。`,
      '生成されたアプリには、公開後も権限、監査、承認、変更管理が必要です。',
      '企業は中核システムを置き換えずに、AI を実運用へ入れる必要があります。',
    ],
    capabilities: () => [
      '顧客、注文、ケース、設備、契約、承認をビジネスオブジェクトとしてモデル化します。',
      '同じ業務仕様から画面、ワークフロー、API、エージェントツールを生成します。',
      'ユーザーと AI エージェントを同じ権限、承認、監査境界の中で動かします。',
      'CRM、ERP、データベース、独自システムを移行なしで接続します。',
    ],
    useCases: () => [
      '修理、サービス、承認、社内業務の要件から実行可能なアプリを作ります。',
      'CRM、ERP、チケット、製造データに AI 検索、要約、例外分析を追加します。',
      'エージェントに管理者権限ではなく、制御された業務ツールを与えます。',
    ],
    faq: (name) => [
      {
        question: `${name} は何を解決しますか？`,
        answer:
          'AI が企業の業務システムを理解し、安全に操作するために、オブジェクト、権限、ワークフロー、API、承認、監査を明示的にします。',
      },
      {
        question: 'ローコードとの違いは何ですか？',
        answer:
          'ローコードは主に画面やワークフローの作成を速くします。ObjectOS は業務オブジェクト、ガバナンス、連携、エージェントツール、継続的な変更に焦点を当てます。',
      },
      {
        question: '既存システムの置き換えが必要ですか？',
        answer:
          '通常は不要です。まず既存システムに接続し、重要な記録をビジネスオブジェクトとしてモデル化してから AI と新しいワークフローを追加します。',
      },
    ],
  },
  de: {
    eyebrow: 'Pillar Guide',
    labels: {
      allArticles: 'Alle Artikel',
      capabilities: 'Was die Plattform leisten muss',
      clusterSignals: 'Cluster-Signale',
      explore: 'Cluster erkunden',
      faq: 'FAQ',
      heroRail: ['Business-Object-Layer', 'Governed Agents', 'Bestehende Systeme', 'Auditierbare Workflows'],
      readingPath: 'Lesepfad',
      relatedArticles: 'Verwandte Artikel',
      useCases: 'Anwendungsfälle',
      whyNow: 'Warum jetzt',
    },
    description: (name) =>
      `Erfahren Sie, wie ${name} bestehende Systeme, Business Objects, Berechtigungen, Workflows und AI Agents verbindet.`,
    lead: (name) =>
      `${name} ist mehr als ein schneller Page Builder. Es ist eine kontrollierte Laufzeit für Business Objects, Berechtigungen, APIs, Workflows und Agent Tools.`,
    definition: (name) =>
      `${name} modelliert Kunden, Fälle, Aufträge, Geräte, Verträge und Freigaben als Business Objects, damit AI sie über explizite Tools und Berechtigungen sicher nutzen kann.`,
    whyNow: (name) => [
      `${name} verbindet AI mit echten Geschäftsdatensätzen statt mit einmaligen Exporten.`,
      'Generierte Anwendungen brauchen nach dem Start Berechtigungen, Audit, Freigaben und Änderbarkeit.',
      'Unternehmen müssen AI in operative Prozesse bringen, ohne Kernsysteme sofort zu ersetzen.',
    ],
    capabilities: () => [
      'Kunden, Aufträge, Fälle, Geräte, Verträge und Freigaben als Business Objects modellieren.',
      'Screens, Workflows, APIs und Agent Tools aus derselben Geschäftsspezifikation erzeugen.',
      'Nutzer und AI Agents in denselben Berechtigungs-, Freigabe- und Audit-Grenzen ausführen.',
      'CRM, ERP, Datenbanken und eigene Systeme verbinden, ohne eine Migration zu erzwingen.',
    ],
    useCases: () => [
      'Aus Service-, Reparatur-, Freigabe- oder Operations-Anforderungen laufende Anwendungen bauen.',
      'AI-Suche, Zusammenfassungen und Ausnahmeanalysen auf CRM-, ERP-, Ticket- und Produktionsdaten legen.',
      'Agents mit kontrollierten Tools arbeiten lassen, nicht mit Administratorzugang zur Datenbank.',
    ],
    faq: (name) => [
      {
        question: `Welches Problem löst ${name}?`,
        answer:
          'Es klärt, wie AI Unternehmenssoftware versteht und sicher bedient: Objekte, Berechtigungen, Workflows, APIs, Freigaben und Audit müssen explizit modelliert sein.',
      },
      {
        question: 'Worin liegt der Unterschied zu Low-Code?',
        answer:
          'Low-Code beschleunigt vor allem Formulare und Workflows. ObjectOS fokussiert Business Objects, Governance, Integrationen, Agent Tools und langfristige Veränderbarkeit.',
      },
      {
        question: 'Müssen bestehende Systeme ersetzt werden?',
        answer:
          'Meist nicht. Der sichere Weg ist, bestehende Systeme zu verbinden, wichtige Datensätze als Business Objects zu modellieren und dann AI sowie neue Workflows zu ergänzen.',
      },
    ],
  },
  es: {
    eyebrow: 'Guía pilar',
    labels: {
      allArticles: 'Todos los artículos',
      capabilities: 'Qué necesita la plataforma',
      clusterSignals: 'Señales del clúster',
      explore: 'Explorar el clúster',
      faq: 'Preguntas frecuentes',
      heroRail: ['Capa de objetos de negocio', 'Agentes gobernados', 'Sistemas existentes', 'Workflows auditables'],
      readingPath: 'Ruta de lectura',
      relatedArticles: 'Artículos relacionados',
      useCases: 'Casos de uso',
      whyNow: 'Por qué importa ahora',
    },
    description: (name) =>
      `Aprende cómo ${name} conecta sistemas existentes, objetos de negocio, permisos, workflows y agentes AI.`,
    lead: (name) =>
      `${name} no es solo una forma rápida de crear pantallas. Es un runtime gobernado para objetos de negocio, permisos, APIs, workflows y herramientas de agentes.`,
    definition: (name) =>
      `${name} modela clientes, casos, órdenes, equipos, contratos y aprobaciones como objetos de negocio para que AI pueda usarlos mediante herramientas y permisos explícitos.`,
    whyNow: (name) => [
      `${name} conecta AI con registros reales de negocio, no solo con exportaciones puntuales.`,
      'Las aplicaciones generadas necesitan permisos, auditoría, aprobaciones y evolución después del primer lanzamiento.',
      'Las empresas necesitan llevar AI a procesos reales sin reemplazar de inmediato sus sistemas centrales.',
    ],
    capabilities: () => [
      'Modelar clientes, órdenes, casos, equipos, contratos y aprobaciones como objetos de negocio.',
      'Generar pantallas, workflows, APIs y herramientas de agente desde la misma especificación.',
      'Ejecutar usuarios y agentes AI dentro de los mismos límites de permisos, aprobación y auditoría.',
      'Conectar CRM, ERP, bases de datos y sistemas propios sin forzar una migración.',
    ],
    useCases: () => [
      'Crear aplicaciones operativas a partir de requisitos de servicio, reparación, aprobación u operaciones internas.',
      'Agregar búsqueda, resúmenes y análisis de excepciones con AI sobre CRM, ERP, tickets y datos industriales.',
      'Dar a los agentes herramientas controladas en lugar de acceso de administrador a la base de datos.',
    ],
    faq: (name) => [
      {
        question: `¿Qué problema resuelve ${name}?`,
        answer:
          'Resuelve cómo AI entiende y opera software empresarial de forma segura: objetos, permisos, workflows, APIs, aprobaciones y auditoría deben estar modelados explícitamente.',
      },
      {
        question: '¿En qué se diferencia de low-code?',
        answer:
          'Low-code acelera formularios y workflows. ObjectOS se centra en objetos de negocio, gobierno, integraciones, herramientas para agentes y evolución a largo plazo.',
      },
      {
        question: '¿Hay que reemplazar los sistemas existentes?',
        answer:
          'Normalmente no. El camino más seguro es conectar sistemas existentes, modelar los registros clave como objetos de negocio y añadir AI y nuevos workflows por etapas.',
      },
    ],
  },
  fr: {
    eyebrow: 'Guide pilier',
    labels: {
      allArticles: 'Tous les articles',
      capabilities: 'Ce que la plateforme doit fournir',
      clusterSignals: 'Signaux du cluster',
      explore: 'Explorer le cluster',
      faq: 'FAQ',
      heroRail: ['Couche objets métier', 'Agents gouvernés', 'Systèmes existants', 'Workflows auditables'],
      readingPath: 'Parcours de lecture',
      relatedArticles: 'Articles liés',
      useCases: 'Cas d’usage',
      whyNow: 'Pourquoi maintenant',
    },
    description: (name) =>
      `Découvrez comment ${name} connecte les systèmes existants, les objets métier, les permissions, les workflows et les agents AI.`,
    lead: (name) =>
      `${name} n’est pas seulement un moyen de créer des écrans plus vite. C’est un runtime gouverné pour les objets métier, permissions, APIs, workflows et outils d’agents.`,
    definition: (name) =>
      `${name} modélise clients, dossiers, commandes, équipements, contrats et approbations comme objets métier afin que l’AI les utilise via des outils et permissions explicites.`,
    whyNow: (name) => [
      `${name} connecte l’AI aux vrais enregistrements métier, pas seulement à des exports ponctuels.`,
      'Les applications générées ont besoin de permissions, audit, approbations et évolution après la première version.',
      'Les entreprises doivent intégrer l’AI dans les processus réels sans remplacer immédiatement les systèmes centraux.',
    ],
    capabilities: () => [
      'Modéliser clients, commandes, dossiers, équipements, contrats et approbations comme objets métier.',
      'Générer écrans, workflows, APIs et outils d’agents depuis la même spécification métier.',
      'Faire fonctionner utilisateurs et agents AI dans les mêmes limites de permissions, approbation et audit.',
      'Connecter CRM, ERP, bases de données et systèmes internes sans migration forcée.',
    ],
    useCases: () => [
      'Créer des applications opérationnelles à partir de besoins de service, réparation, approbation ou opérations internes.',
      'Ajouter recherche AI, synthèses et analyse d’exceptions sur CRM, ERP, tickets et données industrielles.',
      'Donner aux agents des outils contrôlés plutôt qu’un accès administrateur à la base de données.',
    ],
    faq: (name) => [
      {
        question: `Quel problème résout ${name} ?`,
        answer:
          'Il explique comment l’AI comprend et opère les systèmes d’entreprise en sécurité : objets, permissions, workflows, APIs, approbations et audit doivent être explicitement modélisés.',
      },
      {
        question: 'Quelle différence avec le low-code ?',
        answer:
          'Le low-code accélère surtout les formulaires et workflows. ObjectOS se concentre sur les objets métier, la gouvernance, les intégrations, les outils d’agents et l’évolution à long terme.',
      },
      {
        question: 'Faut-il remplacer les systèmes existants ?',
        answer:
          'Généralement non. Le chemin le plus sûr consiste à connecter les systèmes existants, modéliser les enregistrements clés comme objets métier, puis ajouter AI et workflows par étapes.',
      },
    ],
  },
  ko: {
    eyebrow: '필러 가이드',
    labels: {
      allArticles: '전체 글',
      capabilities: '플랫폼에 필요한 것',
      clusterSignals: '클러스터 신호',
      explore: '클러스터 탐색',
      faq: 'FAQ',
      heroRail: ['비즈니스 객체 계층', '거버넌스된 에이전트', '기존 시스템', '감사 가능한 워크플로'],
      readingPath: '읽기 경로',
      relatedArticles: '관련 글',
      useCases: '사용 사례',
      whyNow: '지금 중요한 이유',
    },
    description: (name) =>
      `${name}이 기존 시스템, 비즈니스 객체, 권한, 워크플로, AI 에이전트를 어떻게 연결하는지 설명합니다.`,
    lead: (name) =>
      `${name}은 화면을 빠르게 만드는 도구가 아니라 비즈니스 객체, 권한, API, 워크플로, 에이전트 도구를 위한 거버넌스된 런타임입니다.`,
    definition: (name) =>
      `${name}은 고객, 케이스, 주문, 장비, 계약, 승인 같은 기록을 비즈니스 객체로 모델링해 AI가 명시적인 도구와 권한 안에서 안전하게 사용할 수 있게 합니다.`,
    whyNow: (name) => [
      `${name}은 AI를 일회성 내보내기가 아니라 실제 비즈니스 기록에 연결합니다.`,
      '생성된 앱은 출시 이후에도 권한, 감사, 승인, 변경 관리가 필요합니다.',
      '기업은 핵심 시스템을 즉시 교체하지 않고도 실제 프로세스에 AI를 넣어야 합니다.',
    ],
    capabilities: () => [
      '고객, 주문, 케이스, 장비, 계약, 승인을 비즈니스 객체로 모델링합니다.',
      '같은 비즈니스 명세에서 화면, 워크플로, API, 에이전트 도구를 생성합니다.',
      '사용자와 AI 에이전트를 동일한 권한, 승인, 감사 경계 안에서 실행합니다.',
      'CRM, ERP, 데이터베이스, 자체 시스템을 강제 마이그레이션 없이 연결합니다.',
    ],
    useCases: () => [
      '수리, 서비스, 승인, 내부 운영 요구사항에서 실행 가능한 애플리케이션을 만듭니다.',
      'CRM, ERP, 티켓, 제조 데이터에 AI 검색, 요약, 예외 분석을 추가합니다.',
      '에이전트에게 데이터베이스 관리자 권한 대신 통제된 비즈니스 도구를 제공합니다.',
    ],
    faq: (name) => [
      {
        question: `${name}은 어떤 문제를 해결하나요?`,
        answer:
          'AI가 엔터프라이즈 시스템을 이해하고 안전하게 조작하기 위해 객체, 권한, 워크플로, API, 승인, 감사를 명시적으로 모델링합니다.',
      },
      {
        question: '로우코드와 무엇이 다른가요?',
        answer:
          '로우코드는 주로 폼과 워크플로 생성을 빠르게 합니다. ObjectOS는 비즈니스 객체, 거버넌스, 통합, 에이전트 도구, 장기적인 변화 대응에 초점을 둡니다.',
      },
      {
        question: '기존 시스템을 교체해야 하나요?',
        answer:
          '대부분 필요하지 않습니다. 기존 시스템을 연결하고 핵심 기록을 비즈니스 객체로 모델링한 뒤 AI와 새 워크플로를 단계적으로 추가하는 것이 더 안전합니다.',
      },
    ],
  },
};

const copyToHant = (copy: ClusterCopy): ClusterCopy => ({
  title: s2t(copy.title),
  shortTitle: s2t(copy.shortTitle),
  description: s2t(copy.description),
  eyebrow: s2t(copy.eyebrow),
  lead: s2t(copy.lead),
  definition: s2t(copy.definition),
  whyNow: copy.whyNow.map(s2t),
  capabilities: copy.capabilities.map(s2t),
  useCases: copy.useCases.map(s2t),
  faq: copy.faq.map((item) => ({
    question: s2t(item.question),
    answer: s2t(item.answer),
  })),
});

const labelsToHant = (labels: ClusterLabels): ClusterLabels => ({
  allArticles: s2t(labels.allArticles),
  capabilities: s2t(labels.capabilities),
  clusterSignals: s2t(labels.clusterSignals),
  explore: s2t(labels.explore),
  faq: s2t(labels.faq),
  heroRail: labels.heroRail.map(s2t),
  readingPath: s2t(labels.readingPath),
  relatedArticles: s2t(labels.relatedArticles),
  useCases: s2t(labels.useCases),
  whyNow: s2t(labels.whyNow),
});

export function clusterCopy(cluster: Cluster, locale: Locale): ClusterCopy {
  if (locale === 'en') return cluster;
  if (locale === 'zh-Hant') return copyToHant(clusterCopy(cluster, 'zh-Hans'));

  const template = TEMPLATES[locale];
  const name = NAMES[cluster.slug]?.[locale] ?? {
    title: cluster.title,
    shortTitle: cluster.shortTitle,
  };
  return {
    title: name.title,
    shortTitle: name.shortTitle,
    description: template.description(name.title),
    eyebrow: template.eyebrow,
    lead: template.lead(name.title),
    definition: template.definition(name.title),
    whyNow: template.whyNow(name.title),
    capabilities: template.capabilities(name.title),
    useCases: template.useCases(name.title),
    faq: template.faq(name.title),
  };
}

export function clusterLabels(locale: Locale): ClusterLabels {
  if (locale === 'en') {
    return {
      allArticles: 'All articles',
      capabilities: 'What the platform needs',
      clusterSignals: 'Cluster signals',
      explore: 'Explore the cluster',
      faq: 'FAQ',
      heroRail: ['Object layer', 'Governed agents', 'Existing systems', 'Audit-ready workflows'],
      readingPath: 'Reading path',
      relatedArticles: 'Related articles',
      useCases: 'Use cases',
      whyNow: 'Why it matters now',
    };
  }
  if (locale === 'zh-Hant') return labelsToHant(clusterLabels('zh-Hans'));
  return TEMPLATES[locale].labels;
}
