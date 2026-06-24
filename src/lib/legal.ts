import { s2t } from './zhconvert';
import type { Locale } from './i18n';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalPageCopy {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const company =
  'ObjectStack AI LLC, 30 N Gould St, Ste R, Sheridan, Wyoming 82801, United States';

const termsEn: LegalPageCopy = {
  title: 'Terms of Service and License',
  description:
    'Terms governing ObjectOS websites, open-source software, accounts, APIs, and current or future cloud services.',
  updated: 'Effective and last updated: June 4, 2026',
  intro:
    'These Terms of Service and License ("Terms") form a binding agreement between you and ObjectStack AI LLC ("ObjectStack AI", "we", "us", or "our"). They govern your access to and use of ObjectOS websites, documentation, accounts, APIs, downloads, support, and any hosted, managed, or cloud-based ObjectOS offering we make available now or in the future (collectively, the "Services").',
  sections: [
    {
      heading: '1. Acceptance and authority',
      paragraphs: [
        'By accessing or using the Services, creating an account, placing an order, or clicking to accept these Terms, you agree to be bound by them. If you use the Services for an organization, you represent that you have authority to bind that organization, and "you" includes that organization.',
        'If you do not agree to these Terms, do not use the Services. You must be legally capable of entering into a contract and at least 18 years old.',
      ],
    },
    {
      heading: '2. Scope and order of precedence',
      paragraphs: [
        'These Terms apply to our public websites, documentation, account systems, APIs, support, and Cloud Services. A separate order form, enterprise agreement, data processing addendum, service-level agreement, or other written agreement signed by us may apply to particular Services.',
        'If documents conflict, the following order controls: the signed enterprise agreement or order form, the data processing addendum for personal-data matters, any service-level agreement, these Terms, and then referenced policies.',
      ],
    },
    {
      heading: '3. Open-source and self-hosted ObjectOS',
      paragraphs: [
        'ObjectOS source code identified as open source is licensed under the Apache License 2.0 or another license stated in the applicable repository or file. These Terms do not replace or restrict rights granted by an applicable open-source license.',
        'Self-hosted deployments run in infrastructure you control. You are responsible for deployment, configuration, security, users, permissions, integrations, backups, availability, regulatory compliance, and all data processed by your deployment. Unless a separate support agreement states otherwise, self-hosted software is provided without hosted operations, monitoring, backup, or recovery by ObjectStack AI.',
      ],
    },
    {
      heading: '4. Accounts and administrators',
      paragraphs: [
        'You must provide accurate account information, protect credentials and API keys, use appropriate access controls, and promptly notify us of suspected compromise. You are responsible for activity under your accounts except to the extent caused by our breach of these Terms.',
        'Organization administrators may manage users, access Customer Data, configure integrations, and control the organization account. If an administrator acts for your employer or another organization, that organization controls the account.',
      ],
    },
    {
      heading: '5. Cloud Services and orders',
      paragraphs: [
        'Cloud Services may include hosted runtimes, managed control planes, storage, databases, AI features, integrations, observability, support, or other services described in an order or product page. Features, limits, regions, and availability may vary by plan.',
        'An order becomes binding when accepted by us. You may use Cloud Services only within purchased quantities, usage limits, and documentation. We may introduce, modify, or discontinue features, but will use commercially reasonable efforts to avoid materially reducing paid core functionality during a current subscription term.',
      ],
    },
    {
      heading: '6. Fees, subscriptions, and taxes',
      paragraphs: [
        'Prices, billing intervals, included usage, overages, and payment terms are stated at purchase or in an order. Unless stated otherwise, subscriptions renew automatically for successive periods until canceled before renewal, and fees are non-refundable except where required by law or expressly stated in an agreement.',
        'You authorize us and our payment processors to charge applicable fees. You are responsible for taxes, duties, and similar governmental assessments other than taxes on our net income. Late amounts may result in interest, collection costs, suspension, or termination.',
      ],
    },
    {
      heading: '7. Customer Data and your responsibilities',
      paragraphs: [
        '"Customer Data" means data, content, code, prompts, files, records, and other material submitted to or processed through Cloud Services by you or your users. As between the parties, you retain all rights in Customer Data.',
        'You grant us a limited, non-exclusive right to host, copy, transmit, process, display, and otherwise use Customer Data only as necessary to provide, secure, support, and improve the Services; comply with law; and follow your documented instructions. You are responsible for the legality, quality, accuracy, and necessary notices, consents, and permissions for Customer Data.',
      ],
    },
    {
      heading: '8. AI and automated features',
      paragraphs: [
        'Services may allow you to connect or use AI models and automated agents. Outputs may be inaccurate, incomplete, offensive, or non-unique. You must evaluate outputs and use human review appropriate to the risk before relying on them or using them to make decisions or take actions.',
        'You must not use AI features as the sole basis for decisions that produce legal or similarly significant effects on individuals unless permitted by applicable law and supported by appropriate safeguards. Third-party model providers may have separate terms and data practices.',
      ],
    },
    {
      heading: '9. Acceptable use',
      paragraphs: [
        'You may not use the Services to violate law, infringe rights, compromise security, distribute malware, facilitate unauthorized access, disrupt systems, evade usage limits, reverse engineer non-open-source components except where law permits, or provide regulated or high-risk services without appropriate safeguards.',
      ],
      bullets: [
        'Do not upload or process data you lack the right to use.',
        'Do not probe, scan, or test vulnerabilities without written authorization.',
        'Do not use the Services for unlawful surveillance, discrimination, fraud, abuse, or exploitation.',
        'Do not submit protected health information, payment-card data, government identifiers, or similarly regulated sensitive data unless an applicable written agreement expressly authorizes it.',
        'Do not resell or sublicense Cloud Services except under an authorized partner or reseller agreement.',
      ],
    },
    {
      heading: '10. Third-party services and integrations',
      paragraphs: [
        'The Services may interoperate with third-party products, models, hosting providers, data sources, or integrations. Your use of third-party services is governed by their terms and privacy practices. We are not responsible for third-party services, and enabling an integration authorizes the exchange of data necessary for it to operate.',
      ],
    },
    {
      heading: '11. Security, availability, and beta features',
      paragraphs: [
        'We will maintain commercially reasonable administrative, technical, and organizational safeguards for Cloud Services. No system is completely secure or uninterrupted. You remain responsible for appropriate configurations, permissions, endpoint security, backups, and business-continuity planning.',
        'Preview, beta, evaluation, and free features may be changed or discontinued at any time, may be less reliable, and are provided without service levels or warranties to the maximum extent permitted by law.',
      ],
    },
    {
      heading: '12. Intellectual property, trademarks, and feedback',
      paragraphs: [
        'Except for Customer Data and open-source components, we and our licensors own the Services, documentation, designs, technology, and related intellectual property. ObjectOS, ObjectStack, associated logos, and product branding are trademarks of ObjectStack AI LLC. No trademark rights are granted except as expressly authorized.',
        'If you provide feedback, you grant us a worldwide, perpetual, irrevocable, royalty-free right to use it without restriction or obligation.',
      ],
    },
    {
      heading: '13. Confidentiality',
      paragraphs: [
        'Each party may receive non-public information identified as confidential or that reasonably should be understood as confidential. The receiving party will protect it using reasonable care and use it only to perform or exercise rights under the agreement. These obligations do not apply to information that is public without breach, independently developed, rightfully received without restriction, or required to be disclosed by law.',
      ],
    },
    {
      heading: '14. Suspension and termination',
      paragraphs: [
        'You may stop using free Services at any time and may cancel subscriptions as described at purchase. We may suspend access when reasonably necessary to prevent harm, address security risks, comply with law, respond to non-payment, or address a material breach. Where practicable, we will provide notice and an opportunity to cure.',
        'Either party may terminate for an uncured material breach after 30 days written notice, or immediately for insolvency where permitted by law. Upon termination, your right to use Cloud Services ends. We will make Customer Data available for export or deletion as stated in the applicable order, documentation, or data processing addendum.',
      ],
    },
    {
      heading: '15. Disclaimers',
      paragraphs: [
        'TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES, OPEN-SOURCE SOFTWARE, AND ALL RELATED MATERIALS ARE PROVIDED "AS IS" AND "AS AVAILABLE." WE DISCLAIM ALL EXPRESS, IMPLIED, AND STATUTORY WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.',
        'WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, COMPLETELY SECURE, OR SUITABLE FOR ANY PARTICULAR REGULATED, SAFETY-CRITICAL, OR HIGH-RISK USE.',
      ],
    },
    {
      heading: '16. Limitation of liability',
      paragraphs: [
        'TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, GOODWILL, OR DATA, EVEN IF ADVISED OF THE POSSIBILITY.',
        'EXCEPT FOR PAYMENT OBLIGATIONS, INFRINGEMENT OR MISAPPROPRIATION OF THE OTHER PARTY’S INTELLECTUAL PROPERTY, BREACH OF CONFIDENTIALITY, INDEMNIFICATION OBLIGATIONS, OR LIABILITY THAT CANNOT LEGALLY BE LIMITED, EACH PARTY’S AGGREGATE LIABILITY ARISING OUT OF THE SERVICES WILL NOT EXCEED THE AMOUNTS PAID OR PAYABLE BY YOU FOR THE AFFECTED SERVICES DURING THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY. FOR FREE SERVICES, OUR AGGREGATE LIABILITY WILL NOT EXCEED USD 100.',
      ],
    },
    {
      heading: '17. Indemnification',
      paragraphs: [
        'You will defend and indemnify ObjectStack AI LLC and its affiliates, officers, employees, and agents against third-party claims arising from Customer Data, your unlawful or unauthorized use of the Services, or your breach of these Terms. We will notify you of a claim and provide reasonable cooperation. You may not settle a claim in a way that admits our fault or imposes obligations on us without our written consent.',
      ],
    },
    {
      heading: '18. Export controls and sanctions',
      paragraphs: [
        'You must comply with applicable export-control, import, and sanctions laws. You represent that you are not prohibited from receiving the Services and will not use them for prohibited end uses or provide them to prohibited persons, entities, or territories.',
      ],
    },
    {
      heading: '19. Governing law and disputes',
      paragraphs: [
        'Unless a signed agreement states otherwise, these Terms are governed by the laws of the State of Wyoming, without regard to conflict-of-law rules. The state and federal courts located in or serving Sheridan County, Wyoming have exclusive jurisdiction, and each party consents to venue there.',
        'Before filing a claim, each party will give written notice and attempt in good faith to resolve the dispute for at least 30 days. Nothing prevents either party from seeking urgent injunctive relief.',
      ],
    },
    {
      heading: '20. Changes and general terms',
      paragraphs: [
        'We may update these Terms. If a change materially affects your use of paid Cloud Services, we will provide reasonable advance notice through the Services, email, or another appropriate channel. Continued use after the effective date constitutes acceptance where permitted by law.',
        'Neither party may assign the agreement without the other party’s consent, except to an affiliate or in connection with a merger, reorganization, or sale of substantially all relevant assets. If any provision is unenforceable, the remainder remains effective. Failure to enforce a provision is not a waiver. These Terms and incorporated agreements are the entire agreement regarding their subject matter.',
        'The parties are independent contractors. These Terms do not create a partnership, franchise, joint venture, agency, fiduciary, or employment relationship, and there are no third-party beneficiaries. Neither party is liable for delay or failure caused by events beyond its reasonable control, except payment obligations.',
      ],
    },
    {
      heading: '21. Company information and contact',
      paragraphs: [
        `${company}. Federal Employer Identification Number (EIN): 37-2224437.`,
        'Legal notices and questions about these Terms may be sent to legal@objectstack.ai and to the mailing address above.',
      ],
    },
  ],
};

const termsZhHans: LegalPageCopy = {
  title: '服务条款与许可协议',
  description: '适用于 ObjectOS 网站、开源软件、账号、API 以及当前或未来云服务的条款。',
  updated: '生效及最近更新：2026 年 6 月 4 日',
  intro:
    '本服务条款与许可协议（以下简称“本条款”）是你与 ObjectStack AI LLC（以下简称“ObjectStack AI”或“我们”）之间具有约束力的协议。本条款适用于你访问和使用 ObjectOS 网站、文档、账号、API、下载、支持，以及我们当前或未来提供的任何托管、代管或云端 ObjectOS 服务（统称“服务”）。',
  sections: [
    {
      heading: '1. 接受条款与授权',
      paragraphs: [
        '当你访问或使用服务、创建账号、提交订单或点击接受本条款时，即表示你同意受本条款约束。如果你代表组织使用服务，你声明自己有权约束该组织，本条款中的“你”也包括该组织。',
        '如果你不同意本条款，请勿使用服务。你必须具备订立合同的法律能力，且年满 18 周岁。',
      ],
    },
    {
      heading: '2. 适用范围与文件优先级',
      paragraphs: [
        '本条款适用于公开网站、文档、账号系统、API、支持和云服务。特定服务可能另行适用由我们签署的订单、企业协议、数据处理附录、服务等级协议或其他书面协议。',
        '文件发生冲突时，优先顺序为：已签署的企业协议或订单、涉及个人数据事项的数据处理附录、服务等级协议、本条款，以及被引用的政策。',
      ],
    },
    {
      heading: '3. 开源与自托管 ObjectOS',
      paragraphs: [
        '标识为开源的 ObjectOS 源代码适用 Apache License 2.0，或相关仓库或文件中明确列出的其他许可证。本条款不会替代或限制适用开源许可证授予的权利。',
        '自托管部署运行在你控制的基础设施中。你负责部署、配置、安全、用户、权限、集成、备份、可用性、监管合规以及部署所处理的全部数据。除非另有支持协议，自托管软件不包含由 ObjectStack AI 提供的托管运维、监控、备份或恢复。',
      ],
    },
    {
      heading: '4. 账号与管理员',
      paragraphs: [
        '你必须提供准确的账号信息，保护凭证和 API 密钥，采用适当的访问控制，并及时通知我们任何疑似泄露。除由我们违反本条款直接导致的情况外，你应对账号下的活动负责。',
        '组织管理员可以管理用户、访问客户数据、配置集成并控制组织账号。如果管理员代表你的雇主或其他组织行事，该组织控制相应账号。',
      ],
    },
    {
      heading: '5. 云服务与订单',
      paragraphs: [
        '云服务可能包括托管运行时、代管控制平面、存储、数据库、AI 功能、集成、可观测性、支持或订单及产品页面中描述的其他服务。不同套餐的功能、限额、区域和可用性可能不同。',
        '订单经我们接受后生效。你只能在已购买数量、使用限额和文档范围内使用云服务。我们可能新增、修改或停止功能，但会采取商业上合理的措施，避免在当前付费订阅期内实质降低核心功能。',
      ],
    },
    {
      heading: '6. 费用、订阅与税费',
      paragraphs: [
        '价格、计费周期、包含用量、超额费用和付款条件以购买页面或订单为准。除非另有说明，订阅会连续自动续期，直至你在续期前取消；除法律要求或协议明确约定外，费用不予退还。',
        '你授权我们及支付处理商收取适用费用。除针对我们净收入征收的税外，你负责相关税费、关税及类似政府收费。逾期款项可能产生利息、催收费用，并可能导致暂停或终止服务。',
      ],
    },
    {
      heading: '7. 客户数据与责任',
      paragraphs: [
        '“客户数据”是指你或你的用户提交到云服务或通过云服务处理的数据、内容、代码、提示词、文件、记录及其他材料。双方之间，客户数据的全部权利由你保留。',
        '你授予我们有限、非独占的权利，仅在提供、保护、支持和改进服务，遵守法律以及执行你有记录的指示所必需的范围内托管、复制、传输、处理、展示和使用客户数据。你负责客户数据的合法性、质量、准确性，以及取得必要的通知、同意和授权。',
      ],
    },
    {
      heading: '8. AI 与自动化功能',
      paragraphs: [
        '服务可能允许你连接或使用 AI 模型与自动化 Agent。输出可能不准确、不完整、令人不适或与他人输出相同。在依赖输出或据此作出决定、执行操作之前，你必须进行与风险相适应的评估和人工审核。',
        '除非适用法律允许并具备适当保障，否则你不得将 AI 功能作为对个人产生法律或类似重大影响决定的唯一依据。第三方模型提供商可能适用其自身条款与数据处理规则。',
      ],
    },
    {
      heading: '9. 可接受使用',
      paragraphs: [
        '你不得利用服务违法、侵犯权利、破坏安全、传播恶意软件、协助未授权访问、干扰系统、规避使用限额，或在没有适当保障的情况下提供受监管或高风险服务。除法律允许外，不得对非开源组件进行逆向工程。',
      ],
      bullets: [
        '不得上传或处理你无权使用的数据。',
        '未经书面授权，不得探测、扫描或测试漏洞。',
        '不得利用服务实施非法监控、歧视、欺诈、虐待或剥削。',
        '除非适用书面协议明确授权，不得提交受保护健康信息、支付卡数据、政府身份标识或类似受监管敏感数据。',
        '除非获得合作伙伴或经销商协议授权，不得转售或再许可云服务。',
      ],
    },
    {
      heading: '10. 第三方服务与集成',
      paragraphs: [
        '服务可能与第三方产品、模型、托管商、数据源或集成进行互操作。你对第三方服务的使用适用其自身条款与隐私规则。我们不对第三方服务负责；启用集成即表示你授权交换其运行所需的数据。',
      ],
    },
    {
      heading: '11. 安全、可用性与测试功能',
      paragraphs: [
        '我们会为云服务维护商业上合理的管理、技术和组织安全措施。任何系统都无法保证绝对安全或不中断。你仍需负责适当的配置、权限、终端安全、备份和业务连续性计划。',
        '预览版、Beta、评估版和免费功能可能随时变更或停止，可靠性可能较低，并在法律允许的最大范围内不提供服务等级或保证。',
      ],
    },
    {
      heading: '12. 知识产权、商标与反馈',
      paragraphs: [
        '除客户数据与开源组件外，服务、文档、设计、技术及相关知识产权归我们和许可方所有。ObjectOS、ObjectStack、相关 Logo 和产品品牌是 ObjectStack AI LLC 的商标。除明确授权外，不授予任何商标权。',
        '如果你提供反馈，即授予我们全球性、永久、不可撤销、免版税的权利，可不受限制或义务地使用该反馈。',
      ],
    },
    {
      heading: '13. 保密',
      paragraphs: [
        '双方可能接收被标识为保密或按合理判断应属保密的非公开信息。接收方将以合理谨慎程度保护该信息，并仅为履行协议或行使协议权利而使用。对非因违约而公开、独立开发、从无保密义务来源合法取得或依法必须披露的信息，不适用本条。',
      ],
    },
    {
      heading: '14. 暂停与终止',
      paragraphs: [
        '你可以随时停止使用免费服务，并按购买时说明取消订阅。为防止损害、处理安全风险、遵守法律、应对未付款或重大违约，我们可以在合理必要时暂停访问。在可行情况下，我们会提前通知并提供补救机会。',
        '任一方可在书面通知重大违约且 30 日内未补救后终止协议；法律允许时，也可因破产立即终止。终止后，你使用云服务的权利结束。我们将依据适用订单、文档或数据处理附录提供客户数据导出或删除安排。',
      ],
    },
    {
      heading: '15. 免责声明',
      paragraphs: [
        '在法律允许的最大范围内，服务、开源软件及所有相关材料均按“现状”和“可用状态”提供。我们否认所有明示、默示和法定保证，包括适销性、特定用途适用性、所有权、不侵权以及基于交易过程或行业惯例产生的保证。',
        '我们不保证服务不会中断、没有错误、绝对安全，或适用于任何特定受监管、安全关键或高风险用途。',
      ],
    },
    {
      heading: '16. 责任限制',
      paragraphs: [
        '在法律允许的最大范围内，任何一方均不对间接、附带、特殊、后果性、示范性或惩罚性损害，或利润、收入、商誉或数据损失负责，即使已被告知可能发生。',
        '除付款义务、侵犯或盗用对方知识产权、违反保密义务、赔偿义务或法律不能限制的责任外，任一方因服务产生的累计责任不超过责任事件发生前 12 个月内你就受影响服务已支付或应支付的金额。对于免费服务，我们的累计责任不超过 100 美元。',
      ],
    },
    {
      heading: '17. 赔偿',
      paragraphs: [
        '对于因客户数据、你对服务的违法或未授权使用、或你违反本条款而产生的第三方索赔，你将为 ObjectStack AI LLC 及其关联方、高管、员工和代理人提供抗辩与赔偿。我们会通知你并提供合理协助。未经我们书面同意，你不得以承认我们过错或对我们施加义务的方式和解。',
      ],
    },
    {
      heading: '18. 出口管制与制裁',
      paragraphs: [
        '你必须遵守适用的出口管制、进口和制裁法律。你声明自己不被禁止接收服务，并且不会将服务用于受禁止的最终用途，或提供给受禁止的个人、实体或地区。',
      ],
    },
    {
      heading: '19. 适用法律与争议',
      paragraphs: [
        '除非已签署协议另有约定，本条款适用美国怀俄明州法律，不考虑法律冲突规则。位于或管辖怀俄明州 Sheridan County 的州法院和联邦法院拥有专属管辖权，双方同意接受该地审判。',
        '提起诉讼前，双方应书面通知并至少进行 30 日善意协商。任何一方仍可寻求紧急禁令救济。',
      ],
    },
    {
      heading: '20. 条款变更与一般约定',
      paragraphs: [
        '我们可能更新本条款。如果变更对你使用付费云服务产生重大影响，我们会通过服务、电子邮件或其他适当渠道合理提前通知。在法律允许的情况下，生效日期后继续使用即表示接受。',
        '未经对方同意，任何一方不得转让协议，但可向关联方，或在合并、重组、出售绝大部分相关资产时转让。如果任何条款不可执行，其余部分仍然有效。未执行某项条款不构成放弃。本条款及纳入的协议构成双方就相关事项的完整协议。',
        '双方均为独立缔约方。本条款不构成合伙、特许经营、合资、代理、信义或雇佣关系，也不存在第三方受益人。除付款义务外，任何一方均不对超出其合理控制范围的事件所导致的延迟或未履行负责。',
      ],
    },
    {
      heading: '21. 公司信息与联系方式',
      paragraphs: [
        'ObjectStack AI LLC，30 N Gould St, Ste R, Sheridan, Wyoming 82801, United States。联邦雇主识别号（EIN）：37-2224437。',
        '法律通知及与本条款有关的问题可发送至 legal@objectstack.ai，并邮寄至上述地址。',
      ],
    },
  ],
};

const privacyEn: LegalPageCopy = {
  title: 'Privacy Policy',
  description:
    'How ObjectStack AI LLC collects, uses, shares, and protects personal information across ObjectOS websites and cloud services.',
  updated: 'Effective and last updated: June 4, 2026',
  intro:
    'This Privacy Policy explains how ObjectStack AI LLC ("ObjectStack AI", "we", "us", or "our") handles personal information when you visit our websites, communicate with us, create an account, or use current or future hosted, managed, or cloud-based ObjectOS services ("Cloud Services"). It also explains the important distinction between Cloud Services and self-hosted ObjectOS deployments.',
  sections: [
    {
      heading: '1. Scope',
      paragraphs: [
        'This policy applies to www.objectos.ai, docs.objectos.ai, related websites that link to it, account and support interactions, and Cloud Services we operate. It does not apply to third-party websites, products, or services, or to self-hosted ObjectOS deployments that we do not operate.',
      ],
    },
    {
      heading: '2. Our role: controller and processor',
      paragraphs: [
        'We act as a data controller or business for personal information used to operate our websites, manage accounts, bill customers, communicate, secure our Services, and run our business.',
        'When a customer uses Cloud Services to process personal information contained in Customer Data, the customer generally acts as controller or business and ObjectStack AI acts as processor or service provider on the customer’s instructions. Those activities may be governed by a data processing addendum. Users should direct requests about Customer Data to the relevant customer organization.',
      ],
    },
    {
      heading: '3. Self-hosted ObjectOS',
      paragraphs: [
        'A self-hosted ObjectOS deployment runs in infrastructure controlled by the customer. Unless the customer separately enables a connection to our Cloud Services or sends information to us for support, we do not receive or process the application records, prompts, files, credentials, or other data inside that deployment. The operator of the deployment is responsible for its privacy practices.',
      ],
    },
    {
      heading: '4. Personal information we collect',
      paragraphs: [
        'Depending on how you interact with us, we may collect the following categories of personal information.',
      ],
      bullets: [
        'Account and identity information, such as name, email address, organization, role, username, authentication identifiers, and account preferences.',
        'Commercial and billing information, such as plan, orders, invoices, transaction status, billing contact, and limited payment details received from payment processors.',
        'Usage and device information, such as IP address, browser, device, operating system, requested URLs, timestamps, referrer, cookie identifiers, feature usage, logs, and diagnostic events.',
        'Communications and support information, such as messages, feedback, survey responses, support tickets, call or meeting details, and files you choose to provide.',
        'Customer Data processed through Cloud Services, including content, records, code, prompts, files, and metadata submitted by customers and their users.',
        'Information from integrations and third parties, such as identity providers, partners, public sources, or services you authorize to connect.',
      ],
    },
    {
      heading: '5. How we collect information',
      paragraphs: [
        'We collect information directly from you, automatically when you use our websites or Cloud Services, from your organization or account administrator, from services you connect, and from vendors and partners that help us operate our business.',
      ],
    },
    {
      heading: '6. How we use personal information',
      paragraphs: [
        'We use personal information for the purposes below and as otherwise disclosed at collection.',
      ],
      bullets: [
        'Provide, operate, maintain, personalize, and support websites and Cloud Services.',
        'Create and secure accounts; authenticate users; enforce permissions; prevent fraud, abuse, and security incidents.',
        'Process orders, payments, subscriptions, usage, invoices, and taxes.',
        'Respond to inquiries, provide support, send service notices, and manage customer relationships.',
        'Monitor performance, troubleshoot, conduct analytics, and improve products and user experience.',
        'Develop new features, including AI-assisted features, using safeguards appropriate to the data and applicable agreements.',
        'Comply with law, enforce agreements, protect rights and safety, and establish or defend legal claims.',
        'Send marketing communications where permitted; you may opt out at any time.',
      ],
    },
    {
      heading: '7. Legal bases for processing',
      paragraphs: [
        'Where applicable law requires a legal basis, we process personal information to perform a contract; pursue legitimate interests such as operating, securing, and improving the Services; comply with legal obligations; protect vital interests; or based on consent. You may withdraw consent where processing depends on consent, without affecting prior processing.',
      ],
    },
    {
      heading: '8. AI features and model providers',
      paragraphs: [
        'If you enable AI features or connect a model provider, prompts, context, Customer Data, and outputs may be sent to the selected provider as necessary to perform the request. We will describe available controls and providers in product documentation or agreements. You are responsible for deciding what data to submit and configuring features consistently with your obligations.',
        'We do not use Customer Data from paid Cloud Services to train general-purpose models unless the customer affirmatively agrees or a separate agreement expressly permits it.',
      ],
    },
    {
      heading: '9. Cookies and similar technologies',
      paragraphs: [
        'We may use cookies, local storage, pixels, and similar technologies for authentication, preferences, security, functionality, analytics, and, where used, marketing. You can control cookies through browser settings and any consent tools we provide. Blocking some technologies may affect functionality.',
      ],
    },
    {
      heading: '10. How we share personal information',
      paragraphs: [
        'We do not sell personal information for money. We may share personal information as described below.',
      ],
      bullets: [
        'With service providers and subprocessors that provide hosting, infrastructure, analytics, communications, support, security, payment processing, and professional services.',
        'With integrations and third parties at your direction or when you enable a connection.',
        'With your organization, administrators, and authorized users.',
        'With authorities or other parties when reasonably necessary to comply with law, protect rights and safety, investigate abuse, or enforce agreements.',
        'In connection with a merger, financing, acquisition, reorganization, bankruptcy, or sale of assets, subject to appropriate protections.',
        'With consent or as otherwise disclosed when information is collected.',
      ],
    },
    {
      heading: '11. Data processing addendum and subprocessors',
      paragraphs: [
        'Customers that require a data processing addendum may contact privacy@objectstack.ai. For Customer Data processed on behalf of customers, we will use subprocessors under written obligations designed to protect the data and will remain responsible as required by the applicable agreement and law. We may publish or provide a current subprocessor list before relevant Cloud Services become generally available.',
      ],
    },
    {
      heading: '12. International data transfers',
      paragraphs: [
        'We and our providers may process information in the United States and other countries that may have different data-protection laws. Where required, we use recognized transfer mechanisms and safeguards, such as the European Commission’s Standard Contractual Clauses, the UK International Data Transfer Addendum, or another lawful mechanism.',
      ],
    },
    {
      heading: '13. Data retention',
      paragraphs: [
        'We retain personal information only as long as reasonably necessary for the purposes described in this policy, including providing Services, maintaining security and business records, complying with law, resolving disputes, and enforcing agreements. Retention depends on the type of information, account status, contract terms, sensitivity, legal requirements, and technical constraints.',
        'Customer Data retention and deletion for Cloud Services will be described in applicable documentation, orders, or data processing addenda. Backup copies may persist for a limited period before being overwritten or deleted.',
      ],
    },
    {
      heading: '14. Security',
      paragraphs: [
        'We use commercially reasonable administrative, technical, and organizational safeguards designed to protect personal information. No method of transmission or storage is completely secure. Customers and users are responsible for protecting credentials, configuring permissions, and promptly reporting suspected unauthorized access.',
      ],
    },
    {
      heading: '15. Your privacy rights',
      paragraphs: [
        'Depending on your location, you may have rights to request access, correction, deletion, restriction, objection, portability, or withdrawal of consent, and to appeal a denied request. You may also have rights concerning targeted advertising, sale or sharing, or certain automated decisions. We do not discriminate against you for exercising applicable rights.',
        'To exercise rights for information controlled by ObjectStack AI, contact privacy@objectstack.ai. We may verify your identity and authority. If your request concerns Customer Data controlled by an ObjectOS customer, contact that customer first.',
      ],
    },
    {
      heading: '16. California and other U.S. state notices',
      paragraphs: [
        'Residents of California and certain other U.S. states may have rights to know, access, correct, delete, and obtain a copy of personal information; limit certain uses of sensitive personal information; and opt out of certain sale, sharing, targeted advertising, or profiling. We do not sell personal information for money. If our practices constitute sharing or targeted advertising under applicable law, we will provide required opt-out methods.',
      ],
    },
    {
      heading: '17. Children',
      paragraphs: [
        'Our Services are intended for business users and are not directed to children under 13. We do not knowingly collect personal information from children under 13. Cloud Services must not be used to process children’s personal information without all legally required authorization, notices, and safeguards.',
      ],
    },
    {
      heading: '18. Marketing communications',
      paragraphs: [
        'You may opt out of marketing emails by using the unsubscribe link or contacting us. We may still send transactional, security, legal, and service-related messages.',
      ],
    },
    {
      heading: '19. Changes to this policy',
      paragraphs: [
        'We may update this policy as our Services and legal obligations evolve. We will post the updated version and change the effective date. For material changes, we will provide additional notice where required.',
      ],
    },
    {
      heading: '20. Contact and complaints',
      paragraphs: [
        `${company}. Federal Employer Identification Number (EIN): 37-2224437.`,
        'For privacy requests, questions, or complaints, contact privacy@objectstack.ai or write to the address above. Depending on your location, you may also have the right to complain to your local data-protection authority or attorney general.',
      ],
    },
  ],
};

const privacyZhHans: LegalPageCopy = {
  title: '隐私政策',
  description: 'ObjectStack AI LLC 如何在 ObjectOS 网站与云服务中收集、使用、共享和保护个人信息。',
  updated: '生效及最近更新：2026 年 6 月 4 日',
  intro:
    '本隐私政策说明 ObjectStack AI LLC（以下简称“ObjectStack AI”或“我们”）在你访问网站、与我们沟通、创建账号或使用当前或未来托管、代管或云端 ObjectOS 服务（以下简称“云服务”）时如何处理个人信息，并说明云服务与自托管 ObjectOS 部署之间的重要区别。',
  sections: [
    {
      heading: '1. 适用范围',
      paragraphs: [
        '本政策适用于 www.objectos.ai、docs.objectos.ai、链接到本政策的相关网站、账号与支持互动，以及我们运营的云服务。本政策不适用于第三方网站、产品或服务，也不适用于并非由我们运营的自托管 ObjectOS 部署。',
      ],
    },
    {
      heading: '2. 我们的角色：控制者与处理者',
      paragraphs: [
        '对于用于运营网站、管理账号、向客户计费、沟通、保护服务和经营业务的个人信息，我们作为数据控制者或业务方。',
        '当客户使用云服务处理客户数据中的个人信息时，客户通常作为控制者或业务方，ObjectStack AI 按照客户指示作为处理者或服务提供商。相关处理可能适用数据处理附录。用户如需就客户数据提出请求，应联系相应客户组织。',
      ],
    },
    {
      heading: '3. 自托管 ObjectOS',
      paragraphs: [
        '自托管 ObjectOS 部署运行在客户控制的基础设施中。除非客户另行启用与云服务的连接，或为获得支持主动向我们发送信息，否则我们不会接收或处理该部署中的应用记录、提示词、文件、凭证或其他数据。部署运营方负责其隐私实践。',
      ],
    },
    {
      heading: '4. 我们收集的个人信息',
      paragraphs: ['根据你与我们互动的方式，我们可能收集以下类别的个人信息。'],
      bullets: [
        '账号与身份信息，例如姓名、电子邮件、组织、职位、用户名、身份验证标识和账号偏好。',
        '商业与账单信息，例如套餐、订单、发票、交易状态、账单联系人，以及支付处理商提供的有限支付信息。',
        '使用与设备信息，例如 IP 地址、浏览器、设备、操作系统、请求 URL、时间戳、来源页面、Cookie 标识、功能使用、日志和诊断事件。',
        '沟通与支持信息，例如消息、反馈、问卷回复、支持工单、通话或会议信息，以及你选择提供的文件。',
        '通过云服务处理的客户数据，包括客户及其用户提交的内容、记录、代码、提示词、文件和元数据。',
        '来自集成与第三方的信息，例如身份提供商、合作伙伴、公开来源或你授权连接的服务。',
      ],
    },
    {
      heading: '5. 信息来源',
      paragraphs: [
        '我们直接从你处收集信息，也可能在你使用网站或云服务时自动收集，从你的组织或账号管理员、你连接的服务，以及协助我们运营业务的供应商和合作伙伴处获取信息。',
      ],
    },
    {
      heading: '6. 我们如何使用个人信息',
      paragraphs: ['我们出于以下目的以及收集时另行披露的目的使用个人信息。'],
      bullets: [
        '提供、运营、维护、个性化和支持网站及云服务。',
        '创建和保护账号、验证用户、执行权限，以及防止欺诈、滥用和安全事件。',
        '处理订单、付款、订阅、用量、发票和税费。',
        '回复咨询、提供支持、发送服务通知并管理客户关系。',
        '监控性能、排查问题、进行分析并改进产品和用户体验。',
        '采用与数据和适用协议相匹配的保障措施开发新功能，包括 AI 辅助功能。',
        '遵守法律、执行协议、保护权利与安全，以及提出或抗辩法律主张。',
        '在法律允许时发送营销信息；你可以随时退订。',
      ],
    },
    {
      heading: '7. 处理的法律依据',
      paragraphs: [
        '在适用法律要求法律依据时，我们基于履行合同、运营和保护及改进服务等合法利益、遵守法律义务、保护重大利益或取得同意来处理个人信息。如果处理基于同意，你可以撤回同意，但不影响撤回前处理的合法性。',
      ],
    },
    {
      heading: '8. AI 功能与模型提供商',
      paragraphs: [
        '如果你启用 AI 功能或连接模型提供商，为完成请求，提示词、上下文、客户数据和输出可能会发送给所选提供商。我们会在产品文档或协议中说明可用控制项与提供商。你负责决定提交哪些数据，并以符合自身义务的方式配置功能。',
        '除非客户明确同意或单独协议明确允许，我们不会使用付费云服务中的客户数据训练通用模型。',
      ],
    },
    {
      heading: '9. Cookie 与类似技术',
      paragraphs: [
        '我们可能使用 Cookie、本地存储、像素和类似技术进行身份验证、偏好设置、安全保护、功能实现、分析，以及在采用时进行营销。你可以通过浏览器设置和我们提供的同意工具控制 Cookie。禁用某些技术可能影响功能。',
      ],
    },
    {
      heading: '10. 我们如何共享个人信息',
      paragraphs: ['我们不会以金钱为对价出售个人信息。我们可能按以下方式共享个人信息。'],
      bullets: [
        '与提供托管、基础设施、分析、通信、支持、安全、支付处理和专业服务的服务提供商及子处理者共享。',
        '在你的指示下，或当你启用连接时，与集成及第三方共享。',
        '与你的组织、管理员和授权用户共享。',
        '在合理必要时与主管机关或其他方共享，以遵守法律、保护权利与安全、调查滥用或执行协议。',
        '在合并、融资、收购、重组、破产或资产出售过程中，在采取适当保护的前提下共享。',
        '在取得同意或收集信息时另行披露的情况下共享。',
      ],
    },
    {
      heading: '11. 数据处理附录与子处理者',
      paragraphs: [
        '需要数据处理附录的客户可联系 privacy@objectstack.ai。对于我们代表客户处理的客户数据，我们会通过书面义务约束子处理者，并依适用协议与法律承担相应责任。在相关云服务正式提供前，我们可能发布或提供最新子处理者名单。',
      ],
    },
    {
      heading: '12. 跨境数据传输',
      paragraphs: [
        '我们及服务提供商可能在美国和其他数据保护法律不同的国家处理信息。在法律要求时，我们采用被认可的传输机制和保障措施，例如欧盟委员会标准合同条款、英国国际数据传输附录或其他合法机制。',
      ],
    },
    {
      heading: '13. 数据保留',
      paragraphs: [
        '我们仅在实现本政策所述目的的合理必要期间保留个人信息，包括提供服务、维护安全和业务记录、遵守法律、解决争议和执行协议。保留期限取决于信息类型、账号状态、合同约定、敏感程度、法律要求和技术限制。',
        '云服务客户数据的保留与删除将由适用文档、订单或数据处理附录说明。备份副本可能在被覆盖或删除前继续保留有限时间。',
      ],
    },
    {
      heading: '14. 安全',
      paragraphs: [
        '我们采用商业上合理的管理、技术和组织保障措施保护个人信息。但任何传输或存储方式都无法保证绝对安全。客户与用户负责保护凭证、配置权限并及时报告疑似未授权访问。',
      ],
    },
    {
      heading: '15. 你的隐私权利',
      paragraphs: [
        '根据所在地，你可能有权请求访问、更正、删除、限制处理、反对处理、数据可携带、撤回同意或对被拒绝的请求提出申诉。你也可能对定向广告、出售或共享、某些自动化决定享有权利。我们不会因你行使适用权利而歧视你。',
        '如需就 ObjectStack AI 控制的信息行使权利，请联系 privacy@objectstack.ai。我们可能验证你的身份和权限。如果请求涉及由 ObjectOS 客户控制的客户数据，请先联系该客户。',
      ],
    },
    {
      heading: '16. 加利福尼亚州及美国其他州通知',
      paragraphs: [
        '加利福尼亚州及美国某些其他州居民可能有权知情、访问、更正、删除和获取个人信息副本，限制对敏感个人信息的某些使用，并有权选择退出某些出售、共享、定向广告或画像活动。我们不会以金钱为对价出售个人信息。如果我们的实践根据适用法律构成共享或定向广告，我们会提供法律要求的退出方式。',
      ],
    },
    {
      heading: '17. 儿童',
      paragraphs: [
        '我们的服务面向商业用户，不面向 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人信息。未经法律要求的全部授权、通知和保障，不得利用云服务处理儿童个人信息。',
      ],
    },
    {
      heading: '18. 营销通信',
      paragraphs: [
        '你可以通过邮件中的退订链接或联系我们退出营销邮件。我们仍可能发送交易、安全、法律和服务相关消息。',
      ],
    },
    {
      heading: '19. 政策变更',
      paragraphs: [
        '随着服务和法律义务的发展，我们可能更新本政策。我们会发布更新版本并修改生效日期。对于重大变更，我们会在法律要求时提供额外通知。',
      ],
    },
    {
      heading: '20. 联系与投诉',
      paragraphs: [
        'ObjectStack AI LLC，30 N Gould St, Ste R, Sheridan, Wyoming 82801, United States。联邦雇主识别号（EIN）：37-2224437。',
        '如需提出隐私请求、问题或投诉，请联系 privacy@objectstack.ai 或邮寄至上述地址。根据所在地，你也可能有权向当地数据保护机构或总检察长投诉。',
      ],
    },
  ],
};

const refundsEn: LegalPageCopy = {
  title: 'Refund and Cancellation Policy',
  description:
    'How refunds, cancellations, and billing disputes work for ObjectOS subscriptions and AI usage credits, processed through our Merchant of Record.',
  updated: 'Effective and last updated: June 24, 2026',
  intro:
    'This Refund and Cancellation Policy explains when and how you can cancel an ObjectOS subscription and request a refund. It applies to paid Cloud Services purchased from ObjectStack AI LLC ("ObjectStack AI", "we", "us", or "our"). Our order process and payments are handled by our authorized reseller and Merchant of Record, Paddle.com, which appears on your receipt and statement.',
  sections: [
    {
      heading: '1. Merchant of Record',
      paragraphs: [
        'Paddle.com acts as the reseller and Merchant of Record for purchases of our paid Cloud Services. Paddle handles checkout, payment processing, billing, invoicing, and applicable sales tax or VAT. Approved refunds are issued through Paddle to your original payment method.',
      ],
    },
    {
      heading: '2. Free plan first',
      paragraphs: [
        'Our free plan lets you evaluate the platform at no cost and with no payment, so you can confirm it fits your needs before purchasing. We encourage you to use it before subscribing to a paid plan.',
      ],
    },
    {
      heading: '3. 14-day money-back guarantee',
      paragraphs: [
        'If you are not satisfied with a new paid subscription, you may request a full refund within 14 days of the initial purchase. This applies to the first payment of a new subscription. To request it, contact support@objectstack.ai with your order or receipt details.',
      ],
    },
    {
      heading: '4. Subscription renewals',
      paragraphs: [
        'Paid subscriptions renew automatically at the end of each billing period until canceled. Renewal charges are generally non-refundable. To avoid a renewal charge, cancel before the renewal date. If a renewal is charged in error, or you cancel immediately after an unintended renewal, contact us and we will review the request in good faith.',
      ],
    },
    {
      heading: '5. AI usage credits and consumed usage',
      paragraphs: [
        'One-time AI usage credits (top-ups) and any usage already consumed are non-refundable once delivered or used, because they draw on third-party model costs we incur on your behalf. An unused, never-activated credit pack purchased in error may be refunded within 14 days at our discretion.',
      ],
    },
    {
      heading: '6. Cancellation',
      paragraphs: [
        'You can cancel a subscription at any time from your account or by contacting support@objectstack.ai. Cancellation stops future renewals. Your plan stays active until the end of the current paid period and then does not renew. We do not provide pro-rated refunds for the unused portion of a period except where required by law or expressly stated here.',
      ],
    },
    {
      heading: '7. How to request a refund',
      paragraphs: [
        'Email support@objectstack.ai from the address associated with your account, or reply to your Paddle receipt, including your order number and the reason for the request. We aim to respond within 5 business days. Approved refunds are returned to the original payment method through Paddle; the time to appear depends on your bank or card issuer.',
      ],
    },
    {
      heading: '8. Statutory consumer rights',
      paragraphs: [
        'Consumers in the EU, UK, and other regions may have a statutory right to withdraw from a purchase within a set period. For digital services and content, that right may end once performance begins with your prior consent and acknowledgement that you lose the right of withdrawal. Nothing in this policy limits non-waivable rights you have under applicable consumer law.',
      ],
    },
    {
      heading: '9. Billing problems and chargebacks',
      paragraphs: [
        'If you see an unexpected charge, please contact us first — most issues are resolved quickly. Initiating a chargeback or dispute without contacting us may result in suspension of the affected account while the dispute is investigated.',
      ],
    },
    {
      heading: '10. Changes and contact',
      paragraphs: [
        'We may update this policy; the effective date above reflects the latest version. Questions about refunds, cancellations, or billing can be sent to support@objectstack.ai.',
        `${company}. Federal Employer Identification Number (EIN): 37-2224437.`,
      ],
    },
  ],
};

const refundsZhHans: LegalPageCopy = {
  title: '退款与取消政策',
  description: 'ObjectOS 订阅与 AI 用量额度的退款、取消和账单争议如何处理（经由我们的 Merchant of Record 办理）。',
  updated: '生效及最近更新：2026 年 6 月 24 日',
  intro:
    '本退款与取消政策说明你在何时、如何取消 ObjectOS 订阅并申请退款。本政策适用于向 ObjectStack AI LLC（以下简称“ObjectStack AI”或“我们”）购买的付费云服务。我们的下单流程与支付由我们授权的经销商及 Merchant of Record（销售记录商）Paddle.com 办理，其名称会出现在你的收据和账单上。',
  sections: [
    {
      heading: '1. Merchant of Record（销售记录商）',
      paragraphs: [
        '对于我们付费云服务的购买，Paddle.com 作为经销商和 Merchant of Record。Paddle 负责结账、支付处理、计费、开具发票以及适用的销售税或增值税。已批准的退款将通过 Paddle 退回到你的原始支付方式。',
      ],
    },
    {
      heading: '2. 先用免费版',
      paragraphs: [
        '我们的免费版可让你零成本、无需付款地评估平台，在购买前确认它是否符合你的需求。建议你在订阅付费套餐前先行试用。',
      ],
    },
    {
      heading: '3. 14 天退款保证',
      paragraphs: [
        '如果你对新购买的付费订阅不满意，可在首次购买后的 14 天内申请全额退款。本条适用于新订阅的首笔付款。如需申请，请联系 support@objectstack.ai 并提供订单或收据信息。',
      ],
    },
    {
      heading: '4. 订阅续期',
      paragraphs: [
        '付费订阅会在每个计费周期结束时自动续期，直至取消。续期费用通常不予退还。如需避免续期扣费，请在续期日期前取消。如续期为误扣，或你在非本意的续期后立即取消，请联系我们，我们会本着善意审核你的申请。',
      ],
    },
    {
      heading: '5. AI 用量额度与已消耗用量',
      paragraphs: [
        '一次性的 AI 用量额度（充值包）以及任何已消耗的用量，在交付或使用后不予退还，因为它们对应我们代你向第三方模型支付的成本。对于误购、从未激活的额度包，我们可酌情在 14 天内退款。',
      ],
    },
    {
      heading: '6. 取消',
      paragraphs: [
        '你可以随时在账户中取消订阅，或联系 support@objectstack.ai 取消。取消会停止后续续期。你的套餐在当前已付费周期结束前保持有效，之后不再续期。除法律要求或本政策明确说明外，我们不对周期内未使用部分按比例退款。',
      ],
    },
    {
      heading: '7. 如何申请退款',
      paragraphs: [
        '请使用与账户关联的邮箱发送邮件至 support@objectstack.ai，或直接回复你的 Paddle 收据，注明订单号和申请原因。我们力争在 5 个工作日内回复。已批准的退款将通过 Paddle 退回原始支付方式；到账时间取决于你的银行或发卡机构。',
      ],
    },
    {
      heading: '8. 法定消费者权利',
      paragraphs: [
        '欧盟、英国及其他地区的消费者可能享有在一定期限内撤销购买的法定权利。对于数字服务和内容，一旦在你事先同意并确认放弃撤销权后开始履约，该权利可能终止。本政策不限制你依适用消费者法律享有的不可放弃权利。',
      ],
    },
    {
      heading: '9. 账单问题与拒付',
      paragraphs: [
        '如发现意外扣费，请先联系我们——多数问题都能很快解决。在未联系我们的情况下发起拒付或争议，可能导致相关账户在争议调查期间被暂停。',
      ],
    },
    {
      heading: '10. 变更与联系方式',
      paragraphs: [
        '我们可能更新本政策；上方生效日期反映最新版本。有关退款、取消或账单的问题可发送至 support@objectstack.ai。',
        'ObjectStack AI LLC，30 N Gould St, Ste R, Sheridan, Wyoming 82801, United States。联邦雇主识别号（EIN）：37-2224437。',
      ],
    },
  ],
};

const toHant = (page: LegalPageCopy): LegalPageCopy => ({
  title: s2t(page.title),
  description: s2t(page.description),
  updated: s2t(page.updated),
  intro: s2t(page.intro),
  sections: page.sections.map((section) => ({
    heading: s2t(section.heading),
    paragraphs: section.paragraphs.map(s2t),
    bullets: section.bullets?.map(s2t),
  })),
});

export const termsCopy: Record<Locale, LegalPageCopy> = {
  en: termsEn,
  'zh-Hans': termsZhHans,
  'zh-Hant': toHant(termsZhHans),
  ja: termsEn,
  de: termsEn,
  es: termsEn,
  fr: termsEn,
  ko: termsEn,
};

export const privacyCopy: Record<Locale, LegalPageCopy> = {
  en: privacyEn,
  'zh-Hans': privacyZhHans,
  'zh-Hant': toHant(privacyZhHans),
  ja: privacyEn,
  de: privacyEn,
  es: privacyEn,
  fr: privacyEn,
  ko: privacyEn,
};

export const refundsCopy: Record<Locale, LegalPageCopy> = {
  en: refundsEn,
  'zh-Hans': refundsZhHans,
  'zh-Hant': toHant(refundsZhHans),
  ja: refundsEn,
  de: refundsEn,
  es: refundsEn,
  fr: refundsEn,
  ko: refundsEn,
};
