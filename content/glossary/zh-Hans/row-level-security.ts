import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: '行级安全',
  title: '行级安全（RLS）是什么：定义、工作原理，以及如何证明它真的生效',
  description:
    '行级安全把谓词挂在表本身上，用来限制某个用户能读写哪些行——过滤发生在查询内部，而不是发生在调用它的那段代码里。',
  definition:
    '行级安全（RLS）是一种访问控制机制：它把一个谓词附着在表本身上，以此限制某个用户能够读取或写入哪些行，使这条限制在查询内部生效，而不是由发起查询的应用代码来施加。',
  explanation: [
    '这个概念比任何 AI 平台都老，值得先按它本来的样子讲一遍。PostgreSQL 从 9.5 起就带着它：CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\')) 把一个条件挂在表上，此后每一次 SELECT——来自 ORM、来自报表工具、来自某人凌晨两点开的一个 psql 会话——都带着它。Salesforce 用共享规则和归属层级达到同一个结果。两者买到的是同一个性质，也正是 RLS 值得费这个劲的原因：限制随数据一起走，于是新加的端点、新加的导出路径、新来的调用方会自动继承它，不需要谁记得再补一个 WHERE。写在调用方里的访问控制是一条约定；写在表上的访问控制才是一条边界。',
    'ObjectStack 把同一个构造表达成可编写的元数据。一个权限集带着 rowLevelSecurity 数组，每一条指明对象与操作，然后声明谓词：读侧（SELECT、UPDATE、DELETE）用 using，写侧（INSERT、UPDATE）用 check，写法是受约束的 CEL 表达式，例如 owner_id == current_user.id 或 assigned_to_id in current_user.team_member_ids。引擎把每条谓词下降成一个 ObjectQL 过滤条件并推进查询里，于是那些行根本不会进入进程内存——当下一跳是 AI 模型的上下文窗口时，这一点比平时更要紧，因为「取回之后再过滤掉」的行早已被读过了。适用的策略之间取并集，任一条命中即放行；引用的上下文值解析为 null 或空数组时，那条策略退出而不是放宽；而编译器无法下降的谓词根本不产生过滤条件，此时读路径会替换成一个拒绝哨兵，该对象返回零行。失败方向永远是关闭，不是敞开。',
    '最后这种情形正是安全审阅者该盯住的，因为它从元数据上看不出来：一条读起来像「按范围授权」、行为上却是「一律拒绝」的规则，而编写时点没有任何东西指向那一行。ObjectStack 的答案是一道编译期可执行性关卡——validateRlsPredicateEnforceability 在构建时遍历每一条声明的 using 与 check，把任何永远不会生效的谓词当作错误拒绝掉。这道关卡值得信任的关键在于：它不去建模运行时的行为、也不去做模式匹配，而是拿同一份输入去调用运行时自己的判定过程 isSupportedRlsExpression——编译器判断一条被丢弃的策略究竟是编写错误还是有意跳过时，问的正是同一个函数。于是「被 linter 拒绝」和「被丢弃、无强制」是同一个布尔值，二者不可能漂移开。这就是该向任何平台索要的那件东西。不是问「你们支持行级安全吗」——人人都说支持。要问的是：你们的构建能不能拒绝一条会悄无声息什么都不做的安全规则？',
  ],
  alsoKnownAs: ['RLS', '记录级安全', '行级访问控制', '行级权限'],
  relatedTerms: [
    'permission-model',
    'audit-trail',
    'governed-runtime',
    'declared-vs-enforced',
    'governed-tool-layer',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'objectos-automation-engine',
  ],
  pageSlugs: ['permissions', 'trust-center', 'data-modeling'],
} satisfies GlossaryTerm;

export default term;
