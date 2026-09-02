import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'vibe-coding',
  term: '氛围编程（Vibe Coding）',
  title: '氛围编程（Vibe Coding）是什么：定义、出处，以及后面要还的账',
  description:
    '氛围编程指用自然语言向 AI 描述需求、不读它生成的代码就直接上线——这个词由 Andrej Karpathy 于 2025 年 2 月提出，它留下的账在第一次改动时才结。',
  definition:
    '氛围编程（vibe coding）是这样一种做法：用自然语言把想要的东西描述给 AI 模型，然后不读、也不真正理解它生成的代码就直接采用——这个词由 Andrej Karpathy 在 2025 年 2 月提出，用来形容「完全交给感觉，直到忘记代码的存在」。',
  explanation: [
    '这个词不是本站造的，也不是「用 AI 辅助写代码」的泛称。Karpathy 在 2025 年 2 月提出它时是带着赞许的，指的是一种很具体的模式，场景是随手写完就丢的周末项目：跟模型说话、接受它给的改动、跑起来，从不打开那个文件。它的定义性特征不是「代码由 AI 写」，而是「没有人读过」。一个逐行评审、测试、真正读懂了每一行生成代码的工程师，是在用 AI 写代码，而不是在氛围编程。柯林斯词典把它评为 2025 年年度词汇——这足以说明，这种做法早已远远溢出了它被造出来时那个周末项目的语境。',
    '氛围编程比批评者预期的更好用，难办的正是这一点。第一版是真的能跑——表单能提交、测试能过、CI 全绿——因为「自洽」恰恰是代码模型最擅长的事。绿色的 CI 证明不了的是：这套系统只做了它被允许做的事。而只要没有什么需要改，这道缺口就一直看不见。代价出现在第一次修改：问题不再是「能不能做出来」，而是「我改了这里，还有什么会跟着动」——而且找不到作者可问，因为作者是一次无状态的会话，几个月前就结束了。这种「对自己正在运行的系统失去解释能力」的累积，就是理解债。',
    '这些都不是在论证人应该退回去手写实现——那场比赛在成本上已经结束了。它论证的是 AI 交回来的东西是什么形状。一个返回八千行实现的提示词，和一个返回四十行带类型应用定义的提示词，输入端的「氛围」是一样多的——但只有其中一个，交回来的东西人还读得动、审得了、担得起责。ObjectStack 就是为第二种形状做的：代码仍然由 AI 写，而产物小到「没人读过」不再是默认结局。',
  ],
  alsoKnownAs: ['vibe coding', '氛围写码', '没人读过的 AI 生成代码'],
  relatedTerms: [
    'comprehension-debt',
    'reviewable-diff',
    'declared-vs-enforced',
    'metadata-driven-development',
    'application-metadata',
  ],
  articleSlugs: [
    'vibe-coding-technical-debt-2026',
    'ai-wrote-your-app-dare-to-merge',
    'is-lovable-safe-for-production',
  ],
  pageSlugs: ['platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
