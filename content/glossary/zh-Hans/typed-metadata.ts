import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'typed-metadata',
  term: '类型化元数据',
  title: '类型化元数据是什么：定义，以及一份 schema 凭什么胜过一个配置文件',
  description:
    '类型化元数据是受已发布 schema 约束的应用元数据：写错的权限值、不存在的字段类型，会在定义写下的那一刻被拒绝，而不是等上线之后才被发现。',
  definition:
    '类型化元数据是这样一种应用元数据：它的每个键和值都受一份已发布的 schema 约束，因此一个不存在的字段类型、一个拼错的权限值、或者一个指向根本不存在的对象的流程步骤，会在定义被写下时就在校验关卡被拒绝，而不是等它上线运行之后才被发现。',
  explanation: [
    '这里的区别，是配置文件和契约的区别。一个 YAML 或 JSON 配置文件，你往里写什么它就收什么；读它的程序在运行时自己决定认哪些键，剩下的默默忽略。这个默认行为正是「声明了但没生效」的来源：有人写下 `requireApproval: ture`，没有任何东西报错，而那条被声明出来的审批从来没有跑过。类型化元数据把这个默认反了过来：schema 是公开发布的，每个键都有类型，一个没人认识的键是错误而不是耸耸肩——于是文件说的和系统做的，不可能在没有任何东西先大声失败的情况下悄悄走散。',
    '类型带来的不止是挡住拼写错误，因为 schema 不只给校验器读，也给工具链读。同一份声明可以在写定义时驱动编辑器补全，在持续集成里充当校验关卡，还能生成读者事后要查的文档。一份公开契约，三个消费者——这也是为什么 schema 值得当成一等产物来维护，而不是散落在各处读文件的代码里的校验逻辑。',
    '当作者是 Agent 时，这个论证会更锋利。一个被要求「加一条审批规则」的模型，失败方式有明显特征：它产出的是看起来合理、且很接近的东西——一个像模像样、但这份 schema 并没有定义的键；一个从它在训练数据里见得更多的另一个平台借来的权限值。没有类型的配置会默默把它吞下去然后上线。而 schema 会在编写的那一刻拒绝它，Agent 在同一个循环里就能读到错误并改正；更进一步，公开的类型本身就在错误发生之前引导生成——因为「已发布的类型」恰好是模型最能遵守的那种约束。',
    '类型做不到什么同样要说清楚，因为把它吹过头，正是「用校验替代审阅」的开始。schema 约束的是形状，不是意图。一个权限集可以完全合法，同时把薪资数据开放给了错误的人；一个流程可以通过类型检查，同时把审批路由给了一个已经离职的人。类型化元数据把一整类错误从生产环境挪到了校验关卡，并让剩下的部分更小、更好读——但它不判断这份声明对不对，工具链里也没有任何东西能替代那个签字的人。',
  ],
  alsoKnownAs: ['schema 校验的元数据', '类型化应用定义', '强类型元数据'],
  relatedTerms: [
    'application-metadata',
    'metadata-driven-development',
    'application-definition-vs-runtime',
    'definition-layer',
  ],
  articleSlugs: [
    'business-app-in-16k-tokens',
    'give-your-agent-rules-for-governable-apps',
    'metadata-not-code-generation',
  ],
  pageSlugs: ['data-modeling', 'platform', 'agent-developer'],
} satisfies GlossaryTerm;

export default term;
