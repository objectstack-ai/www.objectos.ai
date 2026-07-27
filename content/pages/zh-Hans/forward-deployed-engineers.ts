import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'forward-deployed-engineers',
    navLabel: '面向 FDE',
    title: 'FDE(前沿部署工程师)工具箱：本体优先的开源技术栈',
    description:
      '被验证有效的 FDE 打法是本体优先：先为客户建模业务，再交付受治理的应用。ObjectStack 与 ObjectOS 为前沿部署工程师提供这套工具——开放格式、受治理运行时，以及一份归客户所有的本体。',
    eyebrow: '面向前沿部署工程师',
    heroTitle: '像最强的 FDE 团队那样交付，并交出他们从不交出的东西：本体。',
    lead:
      '前沿部署模式已经胜出：嵌入客户现场、建模业务、快速交付能用的软件。它的弱点在交接——本体被锁在客户要永远租用的平台里。ObjectStack 把本体变成客户仓库里的类型化开放文件；ObjectOS 让它受治理地运行，在云端或客户自己的环境。',
    primary: { label: '从开源框架开始', href: 'https://github.com/objectstack-ai/objectstack' },
    secondary: { label: '阅读 FDE 专文', href: '/en/blog/forward-deployed-engineer-tools/' },
    metrics: [
      { value: '16k token', label: '一个完整 CRM——小到客户能整体审完' },
      { value: '本体优先', label: '先建模名词与动词，再谈任何界面' },
      { value: '客户所有', label: '定义放在客户仓库里，Apache-2.0' },
    ],
    artifact: {
      eyebrow: '交付物',
      title: '交接才是产品：一份放在客户仓库里的本体',
      body:
        '前沿部署项目终会结束。留下什么决定它值多少：类型化的对象、权限和流程，客户自己的团队——以及他们的 AI 智能体——不依赖你也能读懂、运行、持续修改。',
      code: `client-repo/
├── objectstack.config.ts   # 应用清单
├── src/objects/            # 客户的名词——类型化、可校验
├── src/flows/              # 客户的动词——审批与自动化
├── src/permissions/        # 谁能看到什么、做什么
└── dist/objectstack.json   # 一个制品，任何 ObjectStack 运行时可运行`,
    },
    sections: [
      {
        id: 'playbook',
        eyebrow: '打法',
        title: '本体优先——被验证有效的那套方法',
        copy:
          '有效的 FDE 方法在任何 AI 应用交付之前先构建业务本体——通用模型给通用答案，价值在客户自己的名词和动词里。',
        items: [
          {
            title: '1. 发现',
            body: '嵌入业务现场，捕捉真正支撑业务运转的对象、关系、权限与审批路径。',
            meta: '嵌入',
          },
          {
            title: '2. 建模',
            body: '用你的编码智能体把发现变成类型化元数据——对象、流程、权限,紧凑且经校验的定义。',
            meta: '编写',
          },
          {
            title: '3. 交付',
            body: '运行时从定义派生数据库、REST API、管理 Console 和 MCP 工具。当周即可在真实流程上演示。',
            meta: '运行',
          },
          {
            title: '4. 治理与离场',
            body: '权限、审批、审计由运行时强制执行——你撤场之后，系统仍在治理边界内。',
            meta: '交接',
          },
        ],
      },
      {
        id: 'why-open',
        eyebrow: '为什么开放',
        title: '客户留下本体，你留下客户。',
        copy:
          '开放的定义改变了前沿部署业务的经济学：整个项目不依赖转售任何平台席位。',
        items: [
          {
            title: '没有席位要卖',
            body: '框架是 Apache-2.0。你的报价是工程能力,而不是客户日后会怨恨的 license 加价。',
          },
          {
            title: '安全评审直接读 diff',
            body: '权限与审计就是元数据。客户安全团队审的是 2000 行可读定义,不是一个黑盒平台边界。',
          },
          {
            title: '任何 AI,都在治理内',
            body: '应用天生就是 MCP 服务器——客户的 Claude、Cursor 或本地模型在用户权限内操作它。',
          },
          {
            title: '模式可复利',
            body: '每个项目都沉淀可复用的类型化模式——对象、流程、权限集——你的智能体带着它们服务下一个客户。',
          },
        ],
      },
    ],
    table: {
      columns: ['项目关注点', '封闭平台(如 Foundry)', 'ObjectStack / ObjectOS'],
      rows: [
        ['本体在哪里', '锁在供应商平台内', '客户仓库里的类型化文件(Apache-2.0)'],
        ['客户为什么付费', '平台席位,无限期', '运营服务(ObjectOS)——或零 license 自托管'],
        ['之后谁来维护', '供应商培训的专家', '任意编码智能体 + 人工评审'],
        ['AI 接入', '仅平台自带助手', '开放 MCP——Claude、Cursor、本地模型'],
        ['安全评审', '信任平台边界', '直接读 diff——权限与审计就是元数据'],
      ],
    },
    checklistTitle: 'FDE 项目检查清单',
    checklist: [
      '先把客户的名词和动词建模成对象与流程,再谈任何界面。',
      '让整个定义保持上下文体量,智能体才能整体推理、整体重构。',
      '权限默认从严;每一次权限变更都要在 diff 里显式可见。',
      '交接的是仓库、编译制品和评审清单——不是你租户里的一个账号。',
      '保持 MCP 开启,让客户自己的 AI 在其权限内操作应用。',
    ],
    faqs: [
      {
        question: '这是 Palantir Foundry 的替代品吗?',
        answer:
          '就"本体优先的应用工作流"——为业务建模并在其上交付受治理应用——而言,重叠是真实的,而且这里的定义层是开放的而非专有的。Foundry 在超大规模数据联邦与分析管道上仍更强;很多客户需要的只是应用层。',
      },
      {
        question: '服务客户必须用 ObjectOS 吗?',
        answer:
          '不必须。开源 ObjectStack 运行时可零 license 自托管,Console 与治理齐全。ObjectOS 是面向希望"平台被托管运营"的客户的商业产品——浏览器内 AI Builder、云端或企业版部署与支持。',
      },
    ],
  } satisfies MarketingPage;

export default page;
