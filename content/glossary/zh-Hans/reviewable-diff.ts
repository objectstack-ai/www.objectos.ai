import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'reviewable-diff',
  term: '可评审 diff',
  title: '可评审 diff 是什么：AI 生成的代码要怎么评审',
  description:
    '可评审 diff 指担责的那个人能逐行读完、并按业务口径判断对错的改动——它决定了 AI 写出来的东西能不能带着一个签名被合并。',
  definition:
    '可评审 diff 是这样一种改动：它足够小、表达的层次足够高，以至于为它担责的那个人能逐行读完，并按业务口径判断它对不对——正是这个属性决定了 AI 写的软件是带着一个签名被合并，还是仅仅凭着"CI 全绿"被合并。',
  explanation: [
    '可评审是产物的属性，不是对评审者是否尽责的度量。一个工程师让 agent"做个客服退款应用"，半小时后拿到一个写着 +8,142 −0 的 PR，她只剩两个坏选项：假装自己审过并点下合并，或者真的去读八千行她没写过的代码——读到那个份上，还不如自己写。测试过了并不能补上这道缺口：绿色的 CI 证明的是代码对它自己自洽，不是代码只做了它被允许做的事；而且测试是同一个 agent 写的，它自然会测"能查到退款"，不会去测"该不该查到别人的退款"。',
    '定义的 diff 之所以比生成实现的 diff 可评审，差别是结构性的，而不是程度上的。体量只是第一层：同一个行为改动——客服不再能删除退款、金额超过 500 需要财务审批——在定义里是十几行声明，在实现里是散落在控制器、模板、迁移脚本和测试里的几百行。第二层是词汇：这十几行是用"谁可以做什么"的语言写的，于是有业务权限批准这项改动的那个人，恰好也是读得懂它的那个人；评审的问题从"我读得完吗"变成了"这条权限对不对、这个审批阈值合不合理"。第三层最容易被忽略，是影响半径：一份定义只能改动它所声明的东西，所以 agent 顺手改掉的那段对账逻辑，从一条权限声明根本够不着。实现的 diff 没有这种边界——里面任何一行都可能碰到任何东西。',
    '有两条限制属于定义本身，不该塞进脚注。第一，不是所有东西都能收敛成声明：一套全新的实时算法、一条独一无二的渲染管线，交回来的仍然是需要有人逐行读的代码，硬塞进元数据只会让评审更糟。第二，可评审转移了信任，而不是消除了信任——你不再逐个评审每个生成的应用，但你把这份保证押在了一个运行时上，它必须被认真审计一次并持续维护。审一次胜过审一千次，但它仍然是一笔交易，就该被当作交易说清楚。',
    'ObjectStack 做的是这笔交易里"定义的 diff"那一侧：agent 交回来的是带类型的应用元数据，而所有人依赖的强制执行住在一个共享的开放运行时里，不随每个应用重新生成一遍。检验方法本身没变，也适用于任何声称做到这一点的工具——去看你的 agent 开出的下一个 PR，问一句：那个必须为它负责的人，读得完全部吗？',
  ],
  alsoKnownAs: ['reviewable diff', '评审 AI 生成的代码', '小 diff', '可评审的元数据改动'],
  relatedTerms: [
    'comprehension-debt',
    'vibe-coding',
    'declared-vs-enforced',
    'application-metadata',
    'governed-runtime',
    'typed-metadata',
  ],
  articleSlugs: [
    'ai-wrote-your-app-dare-to-merge',
    'give-your-agent-rules-for-governable-apps',
    'conversational-app-iteration',
  ],
  pageSlugs: ['agent-developer', 'platform'],
} satisfies GlossaryTerm;

export default term;
