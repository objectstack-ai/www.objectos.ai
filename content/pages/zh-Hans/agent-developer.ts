import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'agent-developer',
    navLabel: 'Agent 开发指南',
    title: 'Agent 开发指南：AI 如何编写 ObjectStack 元数据',
    description:
      '给你的编码 Agent 规则、文件、元数据模式与评审清单，让它正确生成 ObjectStack 应用，并让人保持掌控。',
    eyebrow: 'Agent 开发指南',
    heroTitle: '别教每个开发者手写应用。教你的 Agent 目标格式。',
    lead:
      'ObjectStack 的设计前提是：Agent 是作者，人是审阅者。开发者的工作流是给 Agent 规则、示例、测试与评审闸门，让元数据变更保持小巧、保持可治理。',
    primary: { label: '阅读文档', href: 'https://docs.objectos.ai' },
    secondary: { label: '查看模板模式', href: '/en/templates/' },
    metrics: [
      { value: 'Agent 优先', label: '规则与示例是产品表面的一部分' },
      { value: '元数据 diff', label: '审阅对象、视图、流程、权限、工具' },
      { value: 'MCP 就绪', label: '把受治理的对象与动作暴露给 AI 客户端' },
    ],
    artifact: {
      eyebrow: 'Agent 指令',
      title: '一份好的规则文件把目标格式写得明明白白',
      body:
        '最重要的开发者产物不是一篇手写界面的教程，而是一份紧凑、可检索的指令集：告诉 Agent 该改什么、不该发明什么、以及如何证明这次变更是可审阅的。',
      code: `When building an ObjectStack app:
1. Model business objects before UI.
2. Prefer metadata definitions over generated application code.
3. Add conservative permissions by default.
4. Expose AI actions only through approved tools.
5. Return a small diff and a reviewer checklist.`,
    },
    sections: [
      {
        id: 'workflow',
        eyebrow: '工作流',
        title: 'Agent 编写的开发闭环',
        copy:
          '闭环刻意保持简单：给 Agent 上下文，让它编辑元数据，跑检查，然后在部署前由人审阅业务权限。',
        items: [
          {
            title: '1. 提供运营上下文',
            body: '把业务流程、对象命名、权限边界、流程状态与集成约束交给 Agent。',
            meta: '上下文',
          },
          {
            title: '2. 生成元数据',
            body: 'Agent 编辑对象、视图、流程、动作、仪表盘、翻译与工具定义，而不是应用胶水代码。',
            meta: '编写',
          },
          {
            title: '3. 运行生成的检查',
            body: '校验 schema、权限、必填标签、示例数据、对象查询与流程流转。',
            meta: '验证',
          },
          {
            title: '4. 审阅权限',
            body: '人审的是权限变化：数据访问、写权、审批绕行、导出与 AI 工具暴露。',
            meta: '批准',
          },
        ],
      },
      {
        id: 'patterns',
        eyebrow: '模式',
        title: 'Agent 应该生成什么',
        copy:
          '最好的生成式变更用清晰的业务概念命名，并让运行时权力保持显式。',
        items: [
          {
            title: '对象与字段',
            body: '使用业务命名、关系、校验、索引与生命周期规则，与真实运营一一对应。',
          },
          {
            title: '视图与动作',
            body: '从对象模型生成列表、表单、看板、仪表盘与动作元数据，而不是一次性界面。',
          },
          {
            title: '流程与审批',
            body: '把流转与审批闸门显式定义出来，运行时才能对人和 Agent 一体执行。',
          },
          {
            title: 'Agent 工具',
            body: '只通过 MCP 暴露有边界的对象查询与动作，带策略检查和便于审计的命名。',
          },
        ],
      },
    ],
    table: {
      columns: ['旧的开发表面', 'Agent 编写的 ObjectStack 表面', '评审者要问的'],
      rows: [
        ['控制器代码', '对象动作元数据', '谁能调用这个动作？'],
        ['自定义鉴权检查', '对象、行级与字段级权限', '数据权限发生了什么变化？'],
        ['手搭的界面', '视图与表单元数据', '这个界面支撑哪条流程？'],
        ['临时拼的 AI 提示词', '策略感知的工具契约', '模型能读什么、能改什么？'],
      ],
    },
    checklistTitle: 'Agent 编写的 ObjectStack diff 评审清单',
    checklist: [
      '这份 diff 改的是业务权限，还是只有呈现？',
      '对象与字段命名是否稳定且贴合领域？',
      '读、写、导出与工具的默认值是否保守？',
      '敏感动作的审批闸门是否显式？',
      '测试或示例数据能否演示这条流程？',
      '未来的 Agent 能否检索并复用同一个模式？',
    ],
    faqs: [
      {
        question: '开发者还需要懂 ObjectStack 吗？',
        answer:
          '需要，但主要任务变了。人负责设计边界、审阅 diff、写测试、维护示例；重复性的元数据编写更多交给 Agent。',
      },
      {
        question: '任何编码 Agent 都能写 ObjectStack 吗？',
        answer:
          '只要有清晰的文档、示例、规则与测试，任何强力编码 Agent 都能驾驭这个格式。站点与文档的写法本身就应让 Agent 能正确检索并生成。',
      },
    ],
  } satisfies MarketingPage;

export default page;
