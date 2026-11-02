import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning['zh-Hans'];

// 对比页，含「什么时候不该用它」。每一句事实都取自 objectstack `origin/main`：
// `content/docs/concepts/compare.mdx`（五类、并排表、别人更强的地方）和
// `content/docs/concepts/when-to-use.mdx`（适合、今天不适合、开工前的五个问题）。
// 定位句引自 `src/lib/positioning.ts`。把本站的对比文章归入五类，是本页自己的归类，
// 不是 objectstack 的。中文按来源重新推导，不是英文页的翻译。
const page = {
    slug: 'compare',
    navLabel: '对比',
    title: 'ObjectStack 与其他方案的对比，以及什么时候不该用它',
    description:
      '把 ObjectStack 放到知识本体、语义层与上下文层、运营本体、元数据驱动平台和 AI 代码生成旁边：各自擅长什么、真正的差别在哪、别人在哪些地方更强，以及今天哪些工作负载不适合它。',
    eyebrow: '对比',
    heroTitle: '常被拿来比的五类东西，它一类都不是。',
    lead:
      `2026 年，「本体」这个词指好几种不同的东西，用这个词的产品解决的也是不同的问题。这一页把 ObjectStack 放到读者最可能拿来比较的五类旁边——三类用这个词，两类不用这个词却回答同一个问题——然后说清每一类在哪里更强，以及 ObjectStack 今天在哪些场景不适合。它是什么：${p.t2}`,
    primary: { label: '把你的 Agent 指向 ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: '本体是什么', href: '/en/ontology/' },
    metrics: [
      { value: '5 类', label: '常被拿来比较的东西——三类用「本体」这个词，两类不用这个词却回答同一个问题' },
      { value: '4 处', label: '别的类别更强的地方，本页直说：现有数据资产、推理、算法密集的工作、生态成熟度' },
      { value: '5 种', label: '今天不适合的工作负载，从大企业的核心 ERP 到必须跑在认证平台上的任何东西' },
    ],
    artifact: {
      eyebrow: '适合的场景',
      title: '今天它适合放在哪里',
      body:
        'ObjectStack 面向的是定义归你所有、由 AI 编写、由 Agent 操作的业务应用。今天有五种形状的工作符合这个描述。不适合的场景在对比之后，开工前要回答的五个问题在页末。',
      steps: [
        '新建的业务应用——CRM、工单、审批、运营和内部工具。对象、关系、动作、权限和流程就是这些应用的大部分，也正是本体所声明的东西。',
        '小到一个人或几个人就能定义业务的团队。Agent 来写定义，但总得有人知道它该写什么；需要达成一致的人越少，闭环跑得越快。',
        '要交付许多垂直应用的 ISV。每个垂直行业都是同一个运行时上的一份定义；它们之间不同的是定义，不是底下的栈。',
        '围绕核心 ERP 的长尾部门应用——供应商准入、巡检、内部申请。每一个都变成仓库里的一份类型化定义，而不是一个靠邮件传来传去的文件。',
        '从第一天起就打算交给 Agent 操作的后台。每一个部署都是一个 MCP 服务器，默认开启：对象是工具，作者暴露的动作是工具，权限决定 Agent 可以调用什么。',
      ],
    },
    sections: [
      {
        id: 'categories',
        eyebrow: '五个类别',
        title: '各自是什么、擅长什么、唯一要紧的差别',
        copy:
          '每一条读的是整个类别；具体产品各有差异。每一类点出的那一个差别，决定它是否回答你的问题。',
        items: [
          {
            title: '知识本体',
            body: 'RDF 和 OWL，W3C 用来把一个领域描述为陈述、类、属性和公理的标准，以及建在它们之上的工具，比如 Protégé 编辑器；推理器推断出没人存过的事实，并检查整套描述是否一致。擅长跨组织的共享词汇、整合从未设计成能拼在一起的数据，以及靠推理回答问题。差别：知识本体描述一个领域，没有东西把它当作应用来运行。ObjectStack 的本体没有公理、没有推理器——先校验，再运行。',
            meta: '用这个词',
          },
          {
            title: '架在现有数据之上的语义层与上下文层',
            body: '让住在别处的数据对 Agent 和分析师可读的一层：数据仓库、湖仓和业务数据库之上的业务名称、指标、关系和上下文。到 2026 年下半年，这一类包括 Microsoft Fabric IQ 里的 ontology 项目（预览中）、Databricks Genie 配合 Unity Catalog 的指标视图、Snowflake 语义视图、AWS Context 和 Google Cloud Knowledge Catalog；开源侧则有指标语义层和 Agent 记忆图。擅长在一大片既有数据资产上保持一致的语义，而不搬动数据；以读为主，有些在上面加了规则和动作。差别：记录系统还留在原地。ObjectStack 的本体就是系统——数据库、API、界面和 Agent 工具都从它派生。',
            meta: '用这个词',
          },
          {
            title: '架在现有系统之上的运营本体',
            body: '在从其他系统集成来的数据之上定义对象、链接、动作和权限，并把编辑写回去。Palantir Ontology 是这一类的参照：一个动作类型把对象与链接的编辑连同其校验和副作用打包在一起，写回机制让这些编辑与底层数据保持同步。擅长在许多留在原地的大型系统之上建立一个受治理的对象与动作模型，让人和 Agent 在一个地方做运营决策。差别：它仍然是架在别处系统之上的一层，而且在 Palantir 这里是一个专有平台。ObjectStack 从定义派生数据库结构、API、界面和 MCP 工具，而且是 Apache-2.0。',
            meta: '用这个词',
          },
          {
            title: '元数据驱动的应用平台',
            body: '由元数据生成表、API 和界面的平台——最近的亲戚。Salesforce 的元数据是它们的祖先；开源的同族有 Frappe Framework 与 ERPNext、Odoo、NocoBase、Payload 和 Twenty，其中几家现在也提供 MCP 服务器。擅长在一个经过验证的运行时上快速搭建业务应用，有打包好的应用、模块和集成可以起步。差别：定义住在哪里、为谁而写。在这些平台里，元数据大多是存在平台数据库中、通过它的界面编辑的配置；是代码的地方，也是框架代码。ObjectStack 的定义是你仓库里类型化、声明式的 TypeScript——带版本、当作 diff 审阅、运行前由 os validate 检查，而且是为 AI 来写而设计的。',
            meta: '同一个问题',
          },
          {
            title: 'AI 代码生成',
            body: 'Agent 根据提示写出一个常规代码库：schema、处理函数、组件，以及把它们粘在一起的胶水。它擅长的地方：没有运行时天花板，代码能做的它都能产出。差别：产出仍然是代码。它会长大，各层会彼此漂移，超过某个规模就没有 Agent 能把它整体装下。测试和类型检查器拿代码对照代码自己；没有东西拿它对照一份业务定义，因为根本没有这份定义。ObjectStack 保留定义、把代码搬进运行时，它的门禁在定义写下时就拒掉错的，而不是等它在生产中失败。',
            meta: '同一个问题',
          },
        ],
      },
      {
        id: 'stronger',
        eyebrow: '别人更强的地方',
        title: '四种该选别的东西的情况',
        copy:
          '只列优点的对比是广告。下面四种情况，别的类别一上来就领先，用的是 objectstack 自己的原话。',
        items: [
          {
            title: '既有数据与遗留系统',
            body: '语义层与上下文层、运营本体。当数据已经住在一个数据仓库、一个湖仓和十几个业务系统里时，它们从你所在的地方出发。ObjectStack 的联邦接入还早、默认只读；它不是把一个模型盖在既有资产之上的办法。',
          },
          {
            title: '对异构数据做推理',
            body: '知识本体。推断没人存过的事实、按公理分类、检查一致性、跨组织对齐词汇：这是推理器干的活，而 ObjectStack 没有推理器。',
          },
          {
            title: '算法密集的工作与非常规界面',
            body: '代码。优化器、仿真、画布编辑器、游戏：写代码。ObjectStack 可以把一个算法包成动作，但它的界面是由元数据服务端驱动的，一个不像任何业务应用的界面直接写更容易。',
          },
          {
            title: '生态成熟度与集成',
            body: '元数据平台。Salesforce、Odoo 和 ERPNext 带着多年的生产使用、打包好的应用、应用市场和实施伙伴。ObjectStack 更年轻；要有更多东西自己搭的准备。',
          },
        ],
      },
      {
        id: 'not-a-fit',
        eyebrow: '什么时候不该用它',
        title: '今天不适合的场景',
        copy:
          'ObjectStack 是你自己部署、自己运营的开源软件，面向定义归你所有的业务应用。下面五种工作负载今天在这个范围之外，诚实的答案是绕着它们建，或者选别的东西。',
        items: [
          {
            title: '替换大企业的核心 ERP 或财务系统',
            body: '总账、合并、税务和薪资承载的法规和边角情况，套装系统已经编码进去了。围绕那个核心去建，而不是取而代之。',
          },
          {
            title: '价值在于集成许多既有系统的工作',
            body: 'ObjectStack 可以把一个外部数据库作为数据源联邦接入，但联邦还早、默认只读；写入需要在数据源和对象两边显式开启。当工作主要是让既有系统对 Agent 可读时，架在那些系统之上的一层更合适。',
          },
          {
            title: '数据湖之上的分析',
            body: '分析层在应用自己的对象之上为它的报表和仪表盘定义指标。它不是为查询数据湖而建的。',
          },
          {
            title: '算法密集的领域，比如定价或排程',
            body: '除非把算法包成一个动作。本体声明可以做什么，它不表达一个优化器。把算法写成动作背后的代码，权限、审计和 Agent 访问就像对待其他任何动作一样作用于它。',
          },
          {
            title: '要求认证平台的工作负载',
            body: 'ObjectStack 自身不带任何合规认证。工作负载必须跑在认证平台上的地方，给你的部署做认证是你自己的活。',
          },
        ],
      },
      {
        id: 'in-depth',
        eyebrow: '深入阅读',
        title: '逐个产品的对比',
        copy:
          '上面按类别，这里按产品。每篇都先说对方的强项，再说真正要比的那一件事。标签是该产品在本页归入的类别；标注「英文」的文章只有英文版。',
        items: [
          {
            title: '本体 vs 语义层 vs 知识图谱（英文）',
            body: '语义层定义一个数字意味着什么；知识图谱存储什么与什么相连；只有本体带着动作和权限。附决策表。',
            meta: '知识本体',
            href: '/en/blog/ontology-vs-semantic-layer-vs-knowledge-graph/',
          },
          {
            title: 'Fabric IQ、Palantir、Unity Catalog、Snowflake、Looker 五方对比（英文）',
            body: '2025 年 11 月到 2026 年 8 月，五家厂商各自交付了企业本体或语义层，逐格对比对象、关系、动作、权限和 Agent 接口。',
            meta: '语义层 · 运营本体',
            href: '/en/blog/enterprise-ontology-platform-comparison/',
          },
          {
            title: '开放与封闭企业本体',
            body: '协议开放，定义却留在平台里：五次发布之后，谁拥有业务语义层。',
            meta: '语义层',
            href: '/en/blog/enterprise-ontology-race-open-vs-closed/',
          },
          {
            title: 'Airtable Omni 与受治理 AI 应用平台',
            body: '自然语言加表格式工作区很强。记录系统真正要比的，是 AI 改动权限、字段和流程时，能否在上线前形成可审阅的 diff。',
            meta: '元数据驱动平台',
            href: '/en/blog/airtable-omni-vs-governed-ai-app-platform/',
          },
          {
            title: 'Retool 与受治理 AI 应用平台',
            body: 'Retool 的 RBAC、审计日志、SSO 和自托管很强。要比的是业务权限层：散落在 JavaScript 绑定里的退款、审批和写入，没法当作 diff 审查。',
            meta: '元数据驱动平台',
            href: '/en/blog/retool-vs-ai-native-app-platform/',
          },
          {
            title: 'Power Platform 锁定：Dataverse、Azure 与自托管取舍',
            body: '身份、Teams、Dynamics 和账单在同一个租户里是真实的优势。主权、规模化成本和 AI 改动审查，是要先算清的边界。',
            meta: '元数据驱动平台',
            href: '/en/blog/power-platform-lock-in-dataverse-self-host/',
          },
          {
            title: 'Agentforce 与开放自托管运行时',
            body: 'Agentforce、Copilot Studio 和 ServiceNow 的 Agent 在各自生态内都很强。问题是你的数据、流程和权限是否也在同一个生态里。',
            meta: '元数据驱动平台',
            href: '/en/blog/beyond-agentforce-copilot-open-runtime/',
          },
          {
            title: 'Lovable 上生产安全吗',
            body: '做原型没问题。上生产的问题是谁能审查访问控制：边界必须在服务端可见、可强制、可签字。',
            meta: 'AI 代码生成',
            href: '/en/blog/is-lovable-safe-for-production/',
          },
          {
            title: 'Vibe Coding 技术债',
            body: 'AI 生成的代码能让原型很快上线；问题在几个月后出现：没人完整读过那份实现，也没人能解释里面的业务取舍。',
            meta: 'AI 代码生成',
            href: '/en/blog/vibe-coding-technical-debt-2026/',
          },
        ],
      },
    ],
    table: {
      eyebrow: '并排对比',
      title: '每个类别作为整体，对照四个承诺',
      columns: ['类别', `${p.t3[0]} · ${p.t3[1]} · ${p.t3[2]}`, `${p.t3[3]} · 它就是系统本身`],
      rows: [
        ['知识本体', '否——被推理 · 可能 · 仅查询', '是——开放标准 · 否'],
        ['语义层与上下文层', '否——被查询 · 可能 · 以读为主', '不一定 · 否——是一层'],
        ['运营本体', '仅动作 · 可能 · 是', '多数由厂商持有 · 否——是一层'],
        ['元数据驱动平台', '是 · 不一定 · 常见，经 MCP', '不一定 · 是'],
        ['AI 代码生成', '是 · 是 · 自己搭就有', '是 · 是'],
        ['ObjectStack', '是 · 是——有门禁 · 是——默认开启', '是——Apache-2.0 · 是'],
      ],
    },
    checklistTitle: '开工前的五个问题',
    checklist: [
      '我们有什么——对象及其字段。',
      '它们如何关联——对象之间的查找与主从关联。',
      '可以做什么——用户或 Agent 可以对一条记录采取的动作。',
      '谁可以做——权限集、行级与字段级安全、共享。',
      '什么时候发生什么——记录触发器、定时任务、审批、工作流。',
    ],
    faqs: [
      {
        question: 'ObjectStack 是语义层吗？',
        answer:
          '不是。语义层是架在现有系统之上的一层只读映射：它描述业务，但不运行业务。ObjectStack 的本体就是系统——数据库、API、界面和 Agent 工具都从它派生。联邦接入外部数据源是可以的，默认只读，而且还处于早期。它也不替代数据仓库的语义层；认真做 BI 的公司仍然会想要一个。',
      },
      {
        question: '它是低代码平台吗？',
        answer:
          '元数据驱动的平台是它最近的亲戚，所以家族相似是真实的。差别在定义住在哪里、为谁而写：那些平台里的元数据大多是存在平台数据库中、通过它的界面编辑的配置；ObjectStack 的定义是你仓库里类型化、声明式的 TypeScript——带版本、当作 diff 审阅、运行前由 os validate 检查，而且是为 AI 来写而设计的。',
      },
      {
        question: '为什么不直接让 Agent 写代码？',
        answer:
          '有时候就该这样：代码没有运行时天花板，优化器、仿真、画布编辑器或游戏直接写更容易。但对业务应用来说，产出仍然是代码——它会长大，各层会漂移，超过某个规模就没有 Agent 能整体装下，而且没有东西拿它对照一份业务定义，因为根本没有这份定义。ObjectStack 保留定义、把代码搬进运行时，并在定义写下时就拒掉错的。',
      },
      {
        question: '第一份本体要多久？',
        answer:
          '如果团队答得出上面五个问题，本体是一天的活，因为写的是 Agent。答不出，那还没有工具帮得上忙，这一个也不例外。第一笔投入是回答这五个问题，不是安装任何东西。',
      },
      {
        question: 'ObjectOS 在这张对比里的位置？',
        answer: `它不是第六个类别。${p.t4}${p.e1}`,
      },
    ],
  } satisfies MarketingPage;

export default page;
