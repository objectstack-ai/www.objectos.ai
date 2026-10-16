import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning['zh-Hans'];

// 定位句的支柱页。下面每一句事实都取自 objectstack `origin/main`：
// `content/docs/concepts/ontology.mdx`（这个词的权威定义）、`README.md`
// （「What we mean by ontology」到「You own it」）和 `content/docs/concepts/compare.mdx`。
// 定位句本身引自 `src/lib/positioning.ts`，从不转述。中文按来源重新推导，不是英文页的翻译。
const page = {
    slug: 'ontology',
    navLabel: '本体',
    title: '什么是可执行的业务本体？ObjectStack 的定义',
    description:
      `${p.t1}${p.t2}这句话的意思：由运行时执行的六类核心、不属于本体的四种投影、关于这个词的四道护栏，以及四个承诺各自靠什么兑现。`,
    eyebrow: '本体',
    heroTitle: p.t1,
    lead:
      `${p.t2}这一页说清这个词在这里指什么。本体是你的业务里那份由运行时直接执行的定义：以类型化元数据写在你的仓库里，编译成一个工件，然后运行——数据库、API、界面和 Agent 工具都从它派生，定义本身在每一次调用时被强制执行。同时写给做选择的人和写定义的 Agent。`,
    primary: { label: '把你的 Agent 指向 ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: '看它与其他方案的对比', href: '/en/compare/' },
    metrics: [
      { value: '6 类', label: '核心由六类东西构成：对象与字段、关系、动作、权限、流程、Agent 与工具定义' },
      { value: '4 种投影', label: '视图、仪表盘、应用和翻译——同样用元数据编写、过同一道门禁，但不是本体的一部分' },
      { value: '4 道闸门', label: '类型化、校验、审阅、治理——横在 Agent 与你的用户之间' },
    ],
    artifact: {
      eyebrow: '运行时如何执行它',
      title: '一份定义进去，其余全部派生。',
      body:
        '本体以类型化元数据写在 objectstack.config.ts 里，编译成 objectstack.json 工件。运行时从这个工件派生可更换驱动之上的数据库结构、生成的 REST 与实时 API、Console 的服务端驱动界面，以及一个 MCP 服务器——并在每一次调用时强制执行这份定义。RBAC、行级与字段级安全、共享和审计，对一次 REST 请求、一次 Console 点击和一次 Agent 工具调用一视同仁。运行时不做任何推理：跑的就是被校验过的东西。',
      code: `objectstack.config.ts      # 本体：你用类型化元数据写下的定义
        │  编译
        ▼
objectstack.json           # 运行时加载的工件
        │  派生
        ▼
数据库结构 · REST 与实时 API · 服务端驱动界面 · MCP 服务器
        │  每一次调用都强制执行
        ▼
RBAC · 行级与字段级安全 · 共享 · 审计`,
    },
    sections: [
      {
        id: 'core',
        eyebrow: '核心',
        title: '六类东西，一份定义',
        copy:
          '本体是一份定义，开放、带版本。它以普通 TypeScript 的形式住在你的仓库里，可以当作一个 diff 来审阅，规范与许可证都是 Apache-2.0——而不是一张锁在厂商系统里、只能通过那家厂商的控制台触达的图。其余一切都由运行时从它派生。',
        items: [
          {
            title: '对象与字段',
            body: '业务里的实体及其类型化属性——校验、公式、默认值、文件。',
            meta: '指南',
            href: '/en/data-modeling/',
          },
          {
            title: '关系',
            body: '对象之间的查找与主从关联。',
          },
          {
            title: '动作',
            body: '用户或 Agent 可以对一条记录发起的操作，以及它们显示的条件。',
          },
          {
            title: '权限',
            body: '谁可以读取、创建、编辑和删除什么——RBAC、行级与字段级安全、共享。',
            meta: '指南',
            href: '/en/permissions/',
          },
          {
            title: '流程',
            body: '业务过程——DAG 流程、记录触发器、定时任务、审批、工作流。',
            meta: '指南',
            href: '/en/automation/',
          },
          {
            title: 'Agent 与工具定义',
            body: '应用自带的 AI Agent、它们可以调用的工具，以及塑造它们的技能。',
            meta: '指南',
            href: '/en/mcp/',
          },
        ],
      },
      {
        id: 'projections',
        eyebrow: '投影',
        title: '视图、仪表盘、应用和翻译是它的投影',
        copy:
          '投影同样用元数据编写、由同一道门禁校验，但它们不是本体的一部分。改动核心，投影跟着变；删掉一个投影，它所展示的业务不变。这个区分划定了 Agent 为了推理业务必须装下的范围：是核心，而不是每一个屏幕。',
        items: [
          {
            title: '视图',
            body: '把一个对象的字段和权限投影到一张网格上。',
            meta: '投影',
          },
          {
            title: '仪表盘',
            body: '把对象上的查询投影到图表上。',
            meta: '投影',
          },
          {
            title: '应用',
            body: '把对象、视图和动作组合成一个可导航的产品。',
            meta: '投影',
          },
          {
            title: '翻译',
            body: '把每一个标签投影到一种语言。',
            meta: '投影',
          },
        ],
      },
      {
        id: 'not',
        eyebrow: '它不是什么',
        title: '关于这个词的四道护栏',
        copy:
          '「本体」这个词涵盖好几种不同的东西，还有两种思维习惯随它一起出现。四者在这里都不成立；ObjectStack 与它们的逐项对比在对比页。',
        items: [
          {
            title: '不是知识本体',
            body: 'OWL、RDF 和知识图谱描述一个领域，带有类继承和公理，并由推理引擎推理。ObjectStack 没有对象继承、没有公理、没有推理器：定义先被校验——由 Zod schema 和 os validate——然后被运行。abstract 这个键正是因此从规范中移除。',
          },
          {
            title: '不是业界所说的语义层',
            body: '语义层是架在现有系统之上的一层只读映射：它描述业务，但不运行业务。ObjectStack 的本体就是系统——数据库、API、界面和 Agent 工具都从它派生。联邦接入外部数据源是可以的，默认只读，而且还处于早期。',
          },
          {
            title: '不是哲学意义上的形式本体',
            body: '它不对「什么东西普遍存在」做任何断言。它是一家企业的一个应用，定义得精确到足以运行。',
          },
          {
            title: '不是「代码消失了」',
            body: '代码搬进了运行时。钩子、动作体，以及公式、谓词和策略里的 CEL 表达式，都在运行时的权限与审计围栏内运行；页面里的受限 JSX 被解析成服务端驱动的界面树，从不当作代码执行。没有一样散落在一个本体随后还得去描述的代码库里。',
          },
        ],
      },
      {
        id: 'promises',
        eyebrow: '四个承诺',
        title: '每个承诺都点名兑现它的机制',
        copy:
          '定位句后面的四个词不是形容词。每一个都由运行时、工具链或许可证里某个具体的东西兑现，这里把那个东西逐一列出。',
        items: [
          {
            title: p.t3[0],
            body: '定义就是在跑的那个东西。运行时从编译后的工件派生数据库、REST 与实时 API、Console 界面和 MCP 服务器，并在每一次调用时强制执行权限与审计——REST 请求、Console 点击和 Agent 工具调用一视同仁。',
            meta: '指南',
            href: '/en/platform/',
          },
          {
            title: p.t3[1],
            body: '脚手架安装 AI 技能包并写入一份 AGENTS.md，编码 Agent 一开始就带着协议的规则。Strict TypeScript 和 Zod 在编辑器里拒掉形状错误；os validate 拒掉类型检查能过、运行时却会静默失败的元数据——悬空绑定、错误的 CEL 谓词、缺失的安全姿态——并以定位到位置、可据以修正的文字返回，Agent 自己读、自己改。你审批一个小而可读的 diff。',
            meta: '指南',
            href: '/en/agent-developer/',
          },
          {
            title: p.t3[2],
            body: '跑起来的应用就是一个 MCP 服务器，默认开启：每个对象是一个工具，每个暴露出来的动作是一个工具，权限决定 Agent 可以调用什么，审计记录它做了什么。Agent 通过与人相同的类型化、权限感知的表面操作应用——从不是裸 SQL 或抓取界面。',
            meta: '指南',
            href: '/en/mcp/',
          },
          {
            title: p.t3[3],
            body: '定义以普通 TypeScript 的形式住在你的仓库里，在你的版本控制里带版本、可以当作 diff 审阅——不是一张锁在厂商系统里的图。ObjectStack 仓库里的一切都是开放栈——协议、微内核、SDK、CLI 和生产运行时——Apache-2.0，没有 open-core 的星号；脚手架生成的项目开箱即可容器化自托管。',
            meta: '源码',
            href: 'https://github.com/objectstack-ai/objectstack',
          },
        ],
      },
    ],
    table: {
      columns: ['你声明', '运行时派生', '运行时强制执行'],
      rows: [
        ['对象、字段、关系', '可更换驱动之上的数据库结构；生成的 REST 与实时 API', '字段上声明的校验、公式与默认值'],
        ['动作', '带权限检查的按钮与服务端操作；每个暴露的动作同时是一个 MCP 工具', '动作显示的条件，以及谁可以发起它'],
        ['权限', '无需生成——它本身就是围栏', 'RBAC、行级与字段级安全、共享和审计，对 REST 请求、Console 点击和 Agent 工具调用一视同仁'],
        ['流程', 'DAG 流程、记录触发器、定时任务、带队列的审批', '多级审批链与完整的审计轨迹'],
        ['Agent 与工具定义', '应用对外提供的 MCP 服务器，默认开启', '权限决定 Agent 可以调用什么；审计记录它做了什么'],
        ['视图、仪表盘、应用、翻译', 'Console 的服务端驱动界面', '视图投影的是对象的字段和权限——删掉它，业务不变'],
      ],
    },
    faqs: [
      {
        question: '它和 Palantir 那种本体是一回事吗？',
        answer:
          '词汇相近，住的地方不同。运营本体在从其他系统集成来的数据之上定义对象、链接、动作和权限，并把编辑写回去；Palantir Ontology 是这一类的参照。它仍然是架在别处系统之上的一层，而且在 Palantir 这里是一个专有平台。ObjectStack 从定义本身派生数据库结构、API、界面和 MCP 工具，而且是 Apache-2.0。',
      },
      {
        question: '有了本体，是不是就没人写代码了？',
        answer:
          '不是。代码不会消失——它搬进了运行时。钩子、动作体，以及公式、谓词和策略里的 CEL 表达式，在运行时的权限与审计围栏内运行；页面里的受限 JSX 被解析成服务端驱动的界面树，而不是被执行。变化在于：没有一样散落在一个本体随后还得去描述的代码库里。',
      },
      {
        question: '为什么大小这么重要？',
        answer:
          '因为闭环的两半都依赖它。写定义的 Agent 和操作应用的 Agent 都需要把整件东西装下：小到 AI 能一次读全的应用，才能被整体阅读、整体推理、整体重构。自带的示例 CRM——对象、视图、一个仪表盘、一条线索转化流程、权限集、动作、翻译——小到 Agent 可以端到端加载，回答得出「改这里会弄坏什么」。',
      },
      {
        question: 'ObjectOS 在哪里？',
        answer: `${p.t4}${p.e1}`,
      },
    ],
  } satisfies MarketingPage;

export default page;
