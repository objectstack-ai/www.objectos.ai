import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'mcp',
    navLabel: '工具与 MCP',
    title: 'ObjectStack MCP 服务器：把业务对象变成受治理的 AI 工具',
    description:
      '@objectstack/mcp 把对象、查询和动作变成受策略约束的工具，供 Claude、Cursor 或任意 MCP 客户端调用——每一次调用都强制执行权限。',
    eyebrow: '工具与 MCP',
    heroTitle: '你的业务对象，成为任意 AI 的受治理工具。',
    lead:
      '多数公司用手写的胶水代码把 AI 接到数据上，绕过了自己建立的所有控制。ObjectStack 运行时则直接从元数据生成受治理工具：无论你的模型是 Claude、Cursor 还是完全本地的模型，它都走和员工一样的权限、审批与审计。ObjectOS 为同一应用增加生产运营体验。',
    primary: { label: '对比版本与定价', href: '/en/pricing/' },
    secondary: { label: '阅读文档', href: 'https://docs.objectos.ai' },
    metrics: [
      { value: '自动接线', label: '查询、schema 和动作工具从你的对象自动注册' },
      { value: '任意客户端', label: 'Claude、Cursor、本地模型或你自己的 Agent 运行时' },
      { value: '用户级作用域', label: '每次工具调用都强制执行行级与字段级规则' },
    ],
    artifact: {
      eyebrow: '几分钟接入',
      title: '把任意 MCP 客户端指向你的运行时。',
      body:
        '在客户端配置里加一条，就把模型接到了你的受治理对象上。此后每一次查询和动作都会按登录用户的权限校验。',
      code: `// 任意 MCP 客户端的配置
{
  "mcpServers": {
    "objectstack": {
      "command": "npx",
      "args": [
        "@objectstack/mcp",
        "--url", "https://runtime.your-company.com"
      ]
    }
  }
}`,
    },
    sections: [
      {
        id: 'tools',
        eyebrow: 'AI 拿到什么',
        title: '天生就懂你业务的工具',
        copy:
          '因为工具派生自定义应用的同一份元数据，AI 看到的是真实的对象、真实的关系、真实的动作——而不是一堆裸数据库表。',
        items: [
          {
            title: '查询业务对象',
            body: '在客户、订单、工单——你的定义所建模的一切——上搜索、过滤、遍历关系，schema 就是上下文。',
          },
          {
            title: '执行已暴露的动作',
            body: '元数据显式暴露的动作才会成为可调用工具：指派工单、启动流程、生成摘要——没有任何隐式暴露。',
          },
          {
            title: '读取 schema',
            body: 'Agent 可以读取对象与字段定义来规划工作，范围以登录用户可见的部分为界。',
          },
        ],
      },
      {
        id: 'governance',
        eyebrow: '与人同规',
        title: '工具调用只是另一次受治理的请求',
        copy:
          'MCP 服务器在运行时内部，而不是旁边——所以没有侧门。每次调用都走和界面点击完全相同的执行路径。',
        items: [
          {
            title: '登录身份',
            body: '工具调用携带用户身份。行级与字段级规则的生效方式，和在界面或 API 请求里一模一样。',
          },
          {
            title: '写操作过审批',
            body: '需要签核的动作在被 AI 调用时同样排队等审批——和人来调用时没有任何区别。',
          },
          {
            title: '每次调用留痕',
            body: '工具调用连同谁、做了什么、什么时候写入审计日志——在审计查看器里与人的操作并排出现，同样的筛选、同样的旧值 → 新值 diff。',
          },
        ],
      },
    ],
    table: {
      columns: ['工具调用', 'AI 发送什么', '运行时校验什么'],
      rows: [
        ['查询记录', '对业务对象的过滤条件', '登录用户的行级与字段级规则'],
        ['执行动作', '具名动作及其参数', '权限、审批要求、参数校验'],
        ['读取 schema', '一次元数据读取', '仅限该用户可见的对象与字段'],
        ['更新记录', '单条记录的字段变更', '字段级权限、校验规则、审计条目'],
      ],
    },
    faqs: [
      {
        question: 'MCP 服务器在开源 ObjectStack 里吗？',
        answer:
          '在——它是开源 ObjectStack AI 故事的核心。@objectstack/mcp 随 ObjectStack 发布，你可以把 Claude、Cursor 或完全本地的模型接到受治理对象上，无需云端订阅。',
      },
      {
        question: '必须把所有东西都暴露给 AI 吗？',
        answer:
          '不必。业务对象自动桥接，系统对象默认排除；动作只有在元数据显式暴露时才成为工具；而且每次调用仍会按调用者的行级与字段级权限过滤。',
      },
    ],
  } satisfies MarketingPage;

export default page;
