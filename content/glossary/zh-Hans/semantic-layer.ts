import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'semantic-layer',
  term: '语义层',
  title: '语义层是什么：定义，以及什么时候它就够用了',
  description:
    '语义层是一组受治理的业务定义——指标、维度、实体名称——夹在原始数据存储和查询工具之间，让同一个词在任何人、任何工具口中都解析成同一个算法。',
  definition:
    '语义层是一组受治理的业务定义——指标、维度和实体名称——放在原始数据存储与查询它的工具之间，使得「活跃客户」或「净收入」无论谁来问、从哪个工具问，都解析成同一个约定好的算法。',
  explanation: [
    '这个词的老家是分析领域。dbt Semantic Layer、Cube、AtScale、Looker 的 LookML 解决的是同一个问题：每个看板、notebook 和表格都在用自己的 SQL 重新推导一遍「收入」，于是数字对不上了。把指标定义一次，放在数仓之上、工具之下，共享的东西就从查询变成了定义本身。2026 年起，同样这两个字也被用来指代 agentic AI 底下的那层业务定义——Fabric 和 Foundry 说的就是这个意思——所以现在这个词的范围取决于说话的人是谁，值得先讲清你说的是哪一个。',
    '对相当大的一类工作来说，语义层确实是对的、而且够用的工具，这一点应该直说，而不是绕开。如果问题是财务和销售报出来的收入数字不一样、自助分析产出互相矛盾的看板、或者一个 AI 助手需要在数仓上稳定地回答问题，那么数仓之上的一层指标层就解决了它——在下面再垫一个应用平台，是在回答没人问过的问题。语义层不是一个弱化版的本体，它是另一种乐器；在分析类问题上，它是更好的那一件。',
    '它没有承载的是写的那一半。语义层是一份读契约：它敲定一个数字是什么意思，但不管谁有权改动底下的记录、系统里到底存在哪些操作、某次变更要不要走审批、以及事后留下什么证据。ObjectStack 站在这条线的另一侧——定义一个对象的类型化应用元数据，同时声明它的权限、它的动作和它的审批环节，运行时在每一次调用上强制执行全部三者，于是定义治理的是写，而不只是描述读。它不替代数仓上的语义层，认真做 BI 的公司仍然需要一个。',
  ],
  alsoKnownAs: ['业务语义层', '指标层', 'headless BI'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'governed-runtime',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'why-ai-agent-pilots-fail-four-layers',
    'enterprise-ontology-race-open-vs-closed',
    'context-bottleneck-read-half',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['analytics', 'data-modeling', 'platform'],
} satisfies GlossaryTerm;

export default term;
