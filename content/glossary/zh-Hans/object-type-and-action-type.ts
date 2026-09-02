import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'object-type-and-action-type',
  term: '对象类型 / 动作类型',
  title: '对象类型与动作类型：定义，以及为什么动作那一半更要紧',
  description:
    '对象类型和动作类型是本体词汇的两半——前者声明一类业务实体，后者声明一个被允许的、做权限校验的写操作，用来改动这些实体。',
  definition:
    '对象类型（object type）和动作类型（action type）是本体词汇的两半：对象类型声明一类业务实体，连同它的属性和它指向其他类型的连接；动作类型则声明一个被允许的、做权限校验的写操作，用来改动这些对象——让「写」和「读」一样被明确定义。',
  explanation: [
    '这一对词来自 Palantir Foundry，并随它扩散开来。对象类型就是一个类——客户、工单、设备——带着类型化的属性和指向其他对象类型的链接类型；人们默认「本体」就是由它构成的。动作类型是另一半：一个具名的写操作，带类型化参数、校验规则和调用所需的权限，于是调用方永远碰不到数据库，只能运行本体暴露出来的那些操作。Foundry 多年来一直把写操作收拢进受治理的 Action，并把这套架构对准了 LLM，这个设计值得它得到的所有认可。',
    '通常缺席的正是动作那一半，而它的缺席有一个可辨认的失败形态。只由对象类型搭起来的本体是一个读模型，所以当 Agent 终于要「转化这条线索」或「发起这笔退款」时，就会有人给它另写一个工具——写在业务逻辑旁边，而不是从业务逻辑里长出来。这就打开了第二条写路径：同一个操作现在有两条进入数据的通道，只有其中一条会校验权限、跑校验规则、要求审批、写审计记录。它不会仅仅停留在「不完整」，它会漂移——因为之后对真实路径做的每一次改动，都出自一个根本不知道第二条路径存在的人之手。',
    'ObjectStack 两半都有，只是名字更朴素；这个词汇差异值得说明而不是含糊过去：它并不使用「对象类型」「动作类型」这两个词。对象是在一份类型化元数据文件里声明的，带上它的字段、关系和共享模型；Action 与之并列声明，带类型化参数、可见性与禁用判定、确认提示、调用所需的能力，以及一个执行目标。因为两者都是运行时直接读取的元数据，每一个对象、每一个被暴露的 Action 同时就是一个受治理的 MCP 工具——于是人点的那个按钮和 Agent 调的那个工具是同一份声明，而不是两份实现「在出事之前一直吻合」。',
  ],
  alsoKnownAs: ['对象类型', '动作类型', '本体对象类型', '本体动作'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'application-metadata',
    'governed-runtime',
    'mcp',
    'governed-tool-layer',
  ],
  articleSlugs: [
    'objectos-action-tools',
    'mcp-governed-tool-layer',
    'ontology-mcp-agent-tools',
    'enterprise-ontology-platform-comparison',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['data-modeling', 'automation', 'mcp'],
} satisfies GlossaryTerm;

export default term;
