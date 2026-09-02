import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'definition-layer',
  term: '定义层',
  title: '定义层与运行时层：各自装什么，以及为什么定义层会走向中立',
  description:
    '定义层装的是一家企业自己的声明——有哪些对象、谁能做什么、哪一步要审批——以自己持有的版本化文件存在，位于执行它们的运行时层之上，也在任何单一厂商之外。',
  definition:
    '定义层是软件栈中承载一家企业自身声明的那一层——有哪些对象、它们如何关联、谁可以对它们做什么、哪些步骤必须走审批——这些声明以该组织自己持有的版本化文件存在，位于执行它们的运行时层之上，也在任何一家恰好为其提供了引擎的厂商之外。',
  explanation: [
    '两层，两件不同的事。定义层回答的是「关于这家企业，什么是成立的」：一个商机有金额和客户，销售可以编辑它但永远不能删除，折扣超过三成要走财务。运行时层回答的是「周二下午高负载时这些怎么被执行」：存储、查询规划、会话处理、缓存、每次请求上的权限检查、以及事后那条审计记录。前者只属于这一家公司，业务变了它就变；后者是通用基础设施，工程演进了它才变。',
    '一层最后落在哪一侧，不是审美问题，这个实验业界已经做过好几遍了。数据库厂商杀得你死我活，而 SQL 这门语言本身始终是公开的。容器运行时打了一仗，最后收敛到同一个开放镜像格式上。微软开放了 Language Server Protocol，于是所有编辑器都采纳了它。OpenTelemetry 把可观测性的数据模型交给了一个中立基金会。这个模式反复出现，是因为一层被许多相互独立的参与方依赖之后，就无法继续私有于其中一方——否则它恰好会重新制造出当初让所有人想要这一层的那种碎片化。',
    'AI 抬高了「业务定义落在这条线的哪一侧」的赌注，因为它成倍增加了读这一层的人。应用要读定义。决定自己能调用哪个工具的 Agent 要读，复盘发生了什么的审计系统要读，为下个季度提改动的编码助手要读，财务团队没打招呼就买回来的那个分析工具也要读。如果这些声明住在某一家厂商的控制台里，上面每一个读者都需要那家厂商的配合——而 Agent 连工单都提不了，它根本读不到。',
    '中立不是免费的，这笔交换应该摆出来而不是默认掉。被好几方依赖的一层，演进速度必然慢于一家公司的内部格式；兼容性变成每次改动的约束，大家能达成一致的那个版本，总是落后于某一家厂商本可以直接发布的版本。中立本身也并不自动值钱：一个公开发布、却只有一个商业引擎能执行的定义格式，等于「可移植的文件 + 被锁住的系统」。这个主张的强度，永远只等于两半里较弱的那一半——一份你能读懂并带走的定义，加上一个你确实能自己运维的运行时层。',
  ],
  alsoKnownAs: ['定义层与运行时层', '运行时层', '业务定义层'],
  relatedTerms: [
    'application-definition-vs-runtime',
    'metadata-driven-development',
    'typed-metadata',
    'application-metadata',
    'governed-runtime',
    'ontology',
    'semantic-layer',
    'approval-workflow',
  ],
  articleSlugs: [
    'ai-ontology-open-protocol',
    'enterprise-ontology-race-open-vs-closed',
    'why-ai-agent-pilots-fail-four-layers',
  ],
  pageSlugs: ['platform', 'forward-deployed-engineers', 'product-tour'],
} satisfies GlossaryTerm;

export default term;
