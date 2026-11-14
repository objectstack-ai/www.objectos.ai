import type { MarketingPage } from '../../../src/content-pages/types';

// 每张卡对应一篇已有的场景文章，按业务团队分组（#359 裁决，2026-11-04）。
// 卡片只概括文章已写的内容；文章、模板与专题链接在构建时校验。
// `readiness`（#370）按证据定档：只有链接的模板或文章演示了在已发布平台上运行，
// 才标 `today`；拿不准时取更保守的一档。与英文版逐卡同档。
const page = {
    slug: 'use-cases',
    navLabel: '使用场景',
    title: 'ObjectOS 使用场景：销售、客服、财务与采购、人事、法务与合规、项目',
    description:
      '按业务团队整理的 AI 场景：现在的工作怎么做，AI 在 ObjectOS 应用里接手什么，哪些动作仍要由人确认。',
    eyebrow: '使用场景',
    heroTitle: 'AI 为你的团队做什么，哪些仍由人来确认。',
    lead:
      '在下面找到你的团队。每张卡用三行概括一篇博客上的完整场景：现在的工作怎么做；业务对象、规则和工具定义好之后，AI 接手什么；哪些动作仍由人决定——权限与审计由运行时强制执行，而不是靠提示词。',
    primary: { label: '浏览应用模板', href: '/en/templates/' },
    secondary: { label: '了解审批怎么运作', href: '/en/approvals/' },
    metrics: [
      { value: '6 个团队', label: '销售、客服、财务与采购、人事、法务与合规、项目' },
      { value: '10 个场景', label: '每个都在博客上有完整文章，八种语言' },
      { value: '7 个模板', label: '其中七个场景有可 fork 的起步应用' },
    ],
    artifact: {
      eyebrow: '怎么读一张卡',
      title: '三行，每个场景都一样',
      body:
        '卡片刻意写得短。每张卡背后的完整文章写明对象、规则和第一版怎么搭；有模板的场景，模板就是你可以安装或 fork 的应用。',
      steps: [
        '现在：工作卡在哪里，为什么一张表单或一个队列不够。',
        '有了 AI：把工作建模之后，应用能做什么——读取、分类、起草、核对、提出建议。',
        '由人确认：哪些仍是人的决定，运行时在它周围强制执行什么。',
        'Agent 以登录用户身份执行，不超出该用户的权限；它读取和改动的记录都写入审计日志，在 Enterprise 版中，界面内 AI 的每一次工具调用也会被审计。',
      ],
    },
    sections: [
      {
        id: 'sales',
        eyebrow: '销售',
        title: '从对话里更新 CRM',
        copy: '销售推进发生在会议、邮件和笔记里。记录应该跟着这些发生，而不是等销售事后再填。',
        items: [
          {
            title: 'AI 销售助理',
            body: '销售在事情办完之后才去填 CRM 字段，真正的上下文留在会议、邮件、笔记和跟进承诺里。',
            scenario: {
              post: 'ai-sales-assistant',
              readiness: 'integration',
              guide: 'crm-case-management-ai',
              withAi: '销售用语音或文字更新进展。AI 整理会议纪要、识别下一步动作、提示商机风险、建议阶段变更，并为下一次客户会议做准备。',
              approves: '每条 CRM 变更建议由销售本人确认，面向客户的承诺需要确认。风险规则和审批边界由主管设定。',
            },
          },
        ],
      },
      {
        id: 'service',
        eyebrow: '客服',
        title: '在排队之前读懂客户的问题',
        copy: '客服工作充满语言、判断和重复决策：适合让 AI 起草，由人决定发出什么。',
        items: [
          {
            title: 'AI 工单中枢',
            body: '一封长邮件或一段不满的对话变成一条记录，然后等人去读、分类、查资料、回复和升级。',
            scenario: {
              post: 'ai-ticket-hub',
              readiness: 'integration',
              template: 'helpdesk',
              withAi: 'AI 识别问题类型、紧急程度和客户情绪，匹配知识库，起草带引用的回复，并按 SLA 给工单排序。',
              approves: '回复草稿、分派和工单更新由客服确认。退款、补偿和合同承诺类回复可设为须主管审批后才能发出；升级任务只在权限校验通过后创建。',
            },
          },
        ],
      },
      {
        id: 'finance-procurement',
        eyebrow: '财务与采购',
        title: '带着证据判断每一笔支出',
        copy: '识别发票是最容易的一步。决定需要政策、预算、历史记录，以及一条说得清理由的审批链。',
        items: [
          {
            title: 'AI 报销审核',
            body: 'OCR 能把字段填上，但报销是否合规、是否在预算内、是否与项目相关、有没有重复，财务仍要人工判断。',
            scenario: {
              post: 'ai-expense-audit',
              readiness: 'integration',
              withAi: 'AI 提取票据信息，核对政策、预算、项目和重复发票，排出今天优先要审的报销单，并给出每条发现依据的政策条款。',
              approves: 'AI 只给建议；付款审批走清晰的授权链，高风险报销转财务复核，复核人的修正会被记录。',
            },
          },
          {
            title: 'AI 采购风险',
            body: '供应商风险分散在多个系统里：资质快到期、交付变慢、报价异常、合同缺口、质量退货。',
            scenario: {
              post: 'ai-procurement-risk',
              readiness: 'integration',
              template: 'procurement',
              withAi: '下单之前，AI 核对资质和交付表现，把报价与历史对比，列出质量和合同问题，并建议替代方案。',
              approves: 'AI 不替你做采购决定：采购在看到风险说明之后再审批，复核结果回流到供应商管理。',
            },
          },
        ],
      },
      {
        id: 'hr',
        eyebrow: '人事与员工服务',
        title: '让员工直接问，再走对的流程',
        copy: '员工不会按系统分类思考。服务中心应该先理解请求，再安全地分派下去。',
        items: [
          {
            title: 'AI 员工服务中心',
            body: '员工要开 VPN、领电脑、请假或问一条政策，门户却要他们先在人事、IT、行政、财务里找到对的表单。',
            scenario: {
              post: 'ai-employee-service-center',
              readiness: 'rule',
              template: 'hr',
              withAi: 'AI 把一句话拆成对应的服务请求，预填员工信息，用知识库回答政策问题，并把履约任务分派给对的团队。',
              approves: '请求只能经由受治理的服务目录创建；访问权限、设备和报销都在权限与审批之后，进度在同一段对话里跟踪。',
            },
          },
        ],
      },
      {
        id: 'legal-compliance',
        eyebrow: '法务与合规',
        title: '先标出风险，再由负责人签字',
        copy: '合同和制度都是密集的文本。AI 可以先读、先起草发现；责任仍在法务和控制负责人身上。',
        items: [
          {
            title: 'AI 合同审查',
            body: '合同台账有人管，审查却没有：风险留在附件和批注里，审批人看到的上下文太少。',
            scenario: {
              post: 'ai-contract-risk',
              readiness: 'rule',
              template: 'contracts',
              withAi: 'AI 提取签约方、金额、期限和非标准条款，与标准模板对比，把偏离变成风险记录。',
              approves: '每条发现由法务确认或修改，最终意见归法务。高风险发现进入审批，已签署的义务变成跟进任务。',
            },
          },
          {
            title: 'AI 内控检查',
            body: '合规团队要手工把制度条文和散落在 IAM、合同、采购、日志、流程系统和表格里的证据对上。',
            scenario: {
              post: 'ai-compliance-control',
              readiness: 'integration',
              template: 'compliance',
              withAi: 'AI 把制度拆成控制项，匹配证据，解释为什么某个缺口是高风险，并建议整改任务。',
              approves: '高风险发现和证据要求由责任人确认；整改及其确认都留在审计历史里。',
            },
          },
        ],
      },
      {
        id: 'projects',
        eyebrow: '项目',
        title: '在进度更新里看到延期，而不是等到错过日期',
        copy: '项目风险很少自己报到。它早在里程碑滑期之前，就以零散的只言片语出现。',
        items: [
          {
            title: 'AI 项目管理助手',
            body: '风险藏在会议纪要、任务更新、周报、变更请求和资源沟通里，直到里程碑滑期才被看见。',
            scenario: {
              post: 'ai-project-risk-assistant',
              readiness: 'rule',
              template: 'project',
              withAi: 'AI 把纪要关联到任务和里程碑，识别阻塞、依赖和资源冲突，创建带建议动作的风险记录，并回答项目健康度问题。',
              approves: 'AI 负责发现和解释；承诺仍由人决定。经理把接受的风险转成行动计划；可以设规则让范围变更先做影响评估。',
            },
          },
        ],
      },
      {
        id: 'across-teams',
        eyebrow: '跨团队通用',
        title: '任何团队都能复用的两种模式',
        copy: '它们不属于某一个团队：一个内容工作流，一个通用的 Agent 工作台，同样守着「建议」与「执行」之间那条线。',
        items: [
          {
            title: 'AI 内容工作台',
            body: 'AI 也许能让一篇草稿写得更快，但选题、素材、评审意见、发布排期和复盘仍然散落各处。',
            scenario: {
              post: 'ai-content-workbench',
              readiness: 'integration',
              template: 'content',
              withAi: 'AI 把素材聚成选题，写出带受众和论据的简报，标出缺少支撑的说法，并在发布后总结表现。',
              approves: '草稿发布前流转到品牌、产品、法务或客户成功评审；评审意见和审批都是结构化记录。',
            },
          },
          {
            title: 'AI Agent 工作台',
            body: '助手回答了问题，用户却还得打开业务系统去建任务、发起审批、更新记录、留下审计痕迹。',
            scenario: {
              post: 'ai-agent-workbench',
              readiness: 'rule',
              withAi: 'Agent 把目标变成一份看得见的执行计划，再调用受治理的工具：查询记录、创建任务、发起审批、生成报告。',
              approves: '查询数据前先校验用户权限，创建任务前先请求确认，高风险动作停在流程审批节点等人决定，它读取和改动的记录都写入审计日志。',
            },
          },
        ],
      },
    ],
    table: {
      eyebrow: '共同的边界',
      title: 'AI 可以自己做什么，什么要等人确认',
      columns: ['动作类型', '场景里的例子', '会发生什么'],
      rows: [
        ['自动执行', '摘要、分类、起草、内部提醒、风险提示、报表', 'AI 直接完成，结果可见并被记录'],
        ['需要确认', '创建任务、更新状态、分派、业务记录变更', '使用应用的人确认之后才写入'],
        ['需要审批', '面向客户的承诺、资金动作、合同条款、权限变更、数据导出、审计关闭', '由审批人决定；未经审批，运行时不会执行'],
      ],
    },
    faqs: [
      {
        question: '这些是客户案例吗？',
        answer:
          '不是。每张卡概括博客上的一篇场景文章：一个团队的工作如何在 ObjectOS 应用里建模并受治理。它们都不是某个具名客户的报告。',
      },
      {
        question: '必须从模板开始吗？',
        answer:
          '不必。其中七个场景有对应模板，可以安装或 fork；其余场景从一段对工作的描述开始。两条路得到的是同一种应用：可以由人审阅的对象、权限、流程和 Agent 工具。',
      },
      {
        question: '谁来决定 AI 可以自己做什么？',
        answer:
          '你的团队，在应用的定义里决定：哪些动作自动执行，哪些需要确认，哪些需要审批。运行时对人和 Agent 同等强制执行这条边界；Agent 以登录用户身份执行，没有特权 AI 身份。',
      },
    ],
  } satisfies MarketingPage;

export default page;
