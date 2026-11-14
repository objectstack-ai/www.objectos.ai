import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning['zh-Hans'];

// 英文版 `content/pages/en/connect-existing-systems.ts` 的译文（#419）。每一句已发布
// 的事实与英文版同源：objectstack `@objectstack/cli@18.4.0`（181ad7d4）的文档与
// ADR-0015 / ADR-0153，以及在该版本脚手架上实测的同步与写回闭环。「开发中」一节
// 只依据公开的 ADR-0153 与 objectstack#31763 的版本划分：不写日期、不放截图、
// 不写数字，也不进对比表。
const page = {
    slug: 'connect-existing-systems',
    navLabel: '对接现有系统',
    title: '对接现有系统：联邦接入、单向同步，还是通过动作写回',
    description:
      '对接已经在跑的系统有三条路：联邦接入、实时读取；单向同步成只读对象；通过声明的动作改动源系统。本页讲怎么选。',
    eyebrow: '对接现有系统',
    heroTitle: '保留在跑的系统：实时读取、同步进来，或者对它执行动作。',
    lead:
      '大部分业务早就跑在某个数据库、ERP 或工单系统里，没有人会去重写它。把它纳入同一份定义有三条路：联邦接入，数据留在原处，每次读取都是实时的；单向同步，由作业把数据单向拷贝成一个普通对象，成员能读、不能改；通过声明的动作改动源系统，写入发往源头，下一次拉取再把变化带回来。本页讲怎么选——写给做决定的人，也写给编写绑定的 Agent。',
    primary: { label: '让你的 Agent 用上 ObjectStack', href: '/en/agent-developer/' },
    secondary: { label: '阅读「Pulling a mapping」', href: 'https://objectstack.ai/docs/automation/jobs#pulling-a-mapping' },
    metrics: [
      { value: '3 条路', label: '联邦接入、实时读取；单向同步；或通过声明的动作改动源系统' },
      { value: '403', label: '通过数据 API 编辑、新建或删除同步行，一律得到这个答复——拉取是它唯一的写入方' },
      { value: '1 条运行记录', label: '每次拉取在 sys_sync_run 上留一条：读取、新建、更新、拒收的行数，以及到达的位置' },
    ],
    artifact: {
      eyebrow: '完整的绑定',
      title: '映射决定什么落到哪里，作业决定什么时候。',
      body:
        '这是同步的一半，取自在当前版本脚手架上实际运行的配置：一个现有 SQLite 数据库里的联邦表，每 20 秒拷贝进一个标记为 synced 的本地对象。第一次运行拷贝了 25 行；源头改了一行、新增一行之后，下一次运行从上一次提交的位置读了 4 行，更新 3 行、新建 1 行。源键映射到 id，水位字段只增不减。',
      code: `// 副本：一个普通对象，对成员只读。
export const OrderCopy = ObjectSchema.create({
  name: 'app_order_copy',
  managedBy: 'synced',
  sharingModel: 'public_read',  // 拉取来的行没有个人所有者
  fields: { order_no: Field.text(), status: Field.text(), /* … */ },
});

// 什么落到哪里：从联邦对象分窗口读取。
export const OrdersPull = defineMapping({
  name: 'orders_pull',
  targetObject: 'app_order_copy',
  mode: 'upsert',
  upsertKey: ['order_no'],
  fieldMapping: [{ source: 'id', target: 'order_no' }, /* … */],
  datasourceSource: {
    object: 'app_legacy_order',  // external.columnMap: { order_no: 'id' }
    watermark: { field: 'updated_at', start: '2020-01-01T00:00:00.000Z' },
  },
});

// 什么时候：每次运行都从上次提交的位置接着读。
export const OrdersPullJob = defineJob({
  name: 'orders_pull_job',
  schedule: { type: 'interval', intervalMs: 20000 },
  pull: { mapping: 'orders_pull' },
});`,
    },
    sections: [
      {
        id: 'three-ways',
        eyebrow: '三条路',
        title: '实时读、拷贝进来，还是执行动作',
        copy:
          '要问的不是买哪个连接器，而是拷贝会不会出错。当拷贝会出错时用联邦：数据是按请求现算的、不允许落地的，或者变化快到同步跟不上。当拷贝只是更方便时就同步进来：报表、和自己的对象关联、对数据提问、源系统又慢又脆弱。需要改动源系统里的东西时，用动作。',
        items: [
          {
            title: '联邦接入',
            body: '把源数据库或 OData 服务声明为外部数据源，把它的表绑定成对象。数据留在源头，每次读取都实时转发过去。默认只读。',
            meta: '数据留在原处',
          },
          {
            title: '单向同步',
            body: '由作业把映射的来源——REST 或 OpenAPI 连接器，或者一个联邦对象——拉进一个标记为 managedBy: \'synced\' 的普通对象。成员像读任何对象一样读它，但不能编辑。每次运行都留下记录。',
            meta: '数据被拷贝',
          },
          {
            title: '通过动作写回',
            body: '一个声明的动作通过连接器、用连接器自己的凭据调用源系统。本地副本不被编辑，下一次拉取把变化带回来。没有双向同步。',
            meta: '改动源系统',
          },
          {
            title: '旧系统现代化，一次一个领域',
            body: '支柱指南：记录系统留在原处，新的流程、界面和 Agent 在它周围逐步长出来。',
            meta: '指南',
            href: '/en/legacy-system-modernization/',
          },
        ],
      },
      {
        id: 'federation',
        eyebrow: '联邦接入',
        title: '数据留在原处，实时读取',
        copy:
          '联邦读取一个平台并不拥有的成熟数据库，走的是和原生对象相同的查询引擎、REST 接口和权限检查。ObjectStack 从不对它执行 DDL。',
        items: [
          {
            title: '能接什么',
            body: '内置 SQL 驱动接 Postgres、MySQL 和 SQLite，Oracle 与 SQL Server 仅用于联邦；内置 OData 驱动接 SAP S/4HANA、Dynamics 365 等 OData v4 与 v2 服务。',
          },
          {
            title: '默认只读',
            body: '写入需要两处同时开启：数据源上的 allowWrites 和对象上的 writable。任何一处关闭，新增、修改、删除都会被拒绝，返回 403 EXTERNAL_WRITE_FORBIDDEN。',
          },
          {
            title: '报表直接汇总远程表',
            body: '基于联邦对象的仪表盘和报表，会通过驱动自己的表解析，汇总到正确的远程表和列上。',
          },
          {
            title: '设计上的边界',
            body: '不支持跨数据源关联。经插件驱动（包括 OData）读取时，命中行数超过行数上限——默认 1,000，最多 10,000——的读取会被拒绝，而不是只返回一部分；按父记录权限限定范围的读取也会被拒绝。源系统宕机时返回 503，绝不返回空列表。',
          },
        ],
      },
      {
        id: 'sync-in',
        eyebrow: '单向同步',
        title: '把数据拷贝成成员能读、不能改的对象',
        copy:
          '同步声明在目标上。一个 upsert 模式的映射说明数据从哪来、拉来的行如何匹配已存的行；一个 pull 指向该映射的作业说明什么时候拉。拷贝进来之后它就是普通对象：每种查询运算、报表和权限规则都适用，读取不会碰到源头。',
        items: [
          {
            title: '两种来源',
            body: 'connectorSource 读取 REST 或 OpenAPI 连接器，每次运行读一个响应。datasourceSource 按水位字段分窗口读取联邦对象，每次运行都从上一次提交的位置接着读。',
          },
          {
            title: '除了拉取，谁都不能写',
            body: '同步对象不开放新建、导入、编辑或删除。通过数据 API 编辑、新建或删除都会被拒绝，返回 403——管理员也一样——userActions 也打不开写操作。CSV 导出仍然可用。',
          },
          {
            title: '每次运行都有记录',
            body: '每次拉取在 sys_sync_run 留一行：映射、驱动它的作业运行、读取/新建/更新/拒收的行数、从哪里开始读、提交到哪个位置，以及结束状态。记录保留 30 天，持有各映射读取位置的那一行除外。',
          },
          {
            title: '权限从零配置',
            body: '源系统的权限不会随数据一起过来。拉取来的行没有个人所有者，所以对象的共享模型和授权要在本地编写；os validate 建议用 public_read，或者用 private 加一条授予读取权限的共享规则。',
          },
        ],
      },
      {
        id: 'write-back',
        eyebrow: '写回',
        title: '通过声明的动作改动源系统，下一次拉取把变化带回来',
        copy:
          '对源数据的改动在源头完成。执行改动的动作是声明式元数据：在源码里，它以 diff 的形式交到人手上；在 ObjectOS Cloud 上，对已上线且已有记录的应用所做的变更会存为草稿，由人来发布。它和其他动作走同一个动作入口，并用连接器自己的凭据调用源系统——Agent 从不拿到数据库账号。',
        items: [
          {
            title: '声明的动作调用源系统',
            body: '一个 type 为 flow 的动作启动流程，流程里的 connector_action 节点把改动发往源系统。实测：动作向源系统发出了 PATCH /tickets/T-2，此时本地那一行仍是 open。',
          },
          {
            title: '下一次拉取完成对账',
            body: '到了下一次定时拉取，作业重新读取源头，本地那一行变成了 closed。副本只在拉取写入时才改变，源头始终是记录系统。',
          },
          {
            title: '没有双向同步',
            body: '不自动写回、不做冲突合并、不在副本上叠加编辑层。被拒绝的编辑会明确告诉用户：请通过声明的动作改动源头。',
          },
        ],
      },
      {
        id: 'in-development',
        status: 'in-development',
        eyebrow: '开发中',
        title: '尚未包含在当前版本中',
        copy:
          '基于同一个同步内核开发。各项依据公开的设计记录 ADR-0153 描述，两项 Enterprise 能力依据 objectstack#31763 上的版本划分。',
        items: [
          {
            title: '标记源头的删除',
            body: '源头已经没有的行会被标记为「源头已删除」，行回来时标记清除；拉取从不物理删除任何行。deletePolicy 和 deletedField 两个键已经声明，目前还不改变任何行为。',
            meta: '开发中',
          },
          {
            title: '每一行的来源信息',
            body: '每个同步行上的平台列：写入它的映射、它在源头的键、最近一次被拉取写入的时间，以及对应的运行。_sync_ 前缀已经为它们预留。',
            meta: '开发中',
          },
          {
            title: '连接器拉取的分页',
            body: '声明分页约定——页码、游标或偏移——让连接器拉取读完每一页，而不是只读一个响应。',
            meta: '开发中',
          },
          {
            title: 'Studio 同步向导',
            body: '在数据源页面创建同步对象、映射和拉取作业，并设置共享模型、频率，查看运行历史；目前拉取作业在代码里声明。',
            meta: '开发中',
          },
          {
            title: '数据仓库驱动',
            body: 'Snowflake 和 BigQuery 作为插件驱动包，让数据仓库的表用自己的方言成为拉取来源。',
            meta: '开发中',
          },
          {
            title: '同步指南',
            body: '一份指南和配套的 Agent 技能，讲清三条路的选择规则、写回的答案，以及映射与作业的写法。',
            meta: '开发中',
          },
          {
            title: '记录级血缘',
            body: '逐条记录地说明每条数据从哪来、又流向了哪里。',
            meta: '开发中 · Enterprise',
          },
          {
            title: '基于标签的访问控制',
            body: '由数据上的标签决定访问，并对数据的使用目的加以限制。',
            meta: '开发中 · Enterprise',
          },
        ],
      },
    ],
    table: {
      eyebrow: '决策表',
      title: '联邦还是同步，逐项对比',
      columns: ['问题', '联邦接入', '单向同步'],
      rows: [
        ['实时还是拷贝？', '实时：每次读取都发往源系统', '按作业的频率拷贝；每次运行从上次提交的位置接着读'],
        ['关联与报表', '报表直接汇总远程表；不支持跨数据源关联', '数据在平台自己的数据库里，筛选、汇总和报表都在本地运行'],
        ['大批量读取', '经插件驱动（包括 OData）读取时，超过行数上限（默认 1,000，最多 10,000）会被拒绝', '内置 SQL 来源分窗口读取，没有行数上限'],
        ['Agent 对数据提问', '每个问题都是一次实时查询，受源系统速度与上限约束', '问题查询本地副本，不触碰源系统'],
        ['权限', '在 ObjectStack 里设置在对象上，和任何对象一样', '在本地从零配置：源系统的权限不会随数据过来'],
        ['写回', '默认关闭；数据源和对象两处都开启才能写', '成员不能编辑副本；声明的动作改动源头，下一次拉取把变化带回来'],
        ['源系统宕机时', '读取返回 503，绝不返回空列表', '副本照常可用；下一次运行补上'],
      ],
    },
    checklistTitle: '让 Agent 写绑定之前，先决定',
    checklist: [
      '拷贝会不会出错——现算的、不能落地的、要求实时的，就用联邦。',
      '谁能读副本：编写它的共享模型和授权，源头什么都不会带过来。',
      '哪一列映射到 id，哪个水位字段只增不减。',
      '哪些动作可以改动源头，谁可以执行它们。',
      '拉取作业在哪个部署上运行，并且该部署开启了包内定时任务。',
    ],
    faqs: [
      {
        question: '这是双向同步吗？',
        answer:
          '不是。同步是单向的：拉取是同步对象唯一的写入方。对源头的改动通过调用源系统的声明式动作完成，下一次拉取把变化带回来。没有冲突合并，也没有编辑叠加层。',
      },
      {
        question: '源系统的权限会随数据一起过来吗？',
        answer:
          '不会。同步对象的权限在本地从零配置。它的行没有个人所有者，按所有者限定的共享模型会让所有成员都看不到：请编写 public_read，或者 private 加一条授予读取权限的共享规则，再把对象授权给应当看到它的角色。',
      },
      {
        question: '副本里的值错了，能直接改吗？',
        answer:
          '不能通过数据 API 改：编辑、新建或删除同步行都会被拒绝，返回 403 PERMISSION_DENIED，管理员也一样，提示信息会让你通过声明的动作改动源头。本地编辑会被下一次拉取悄无声息地保留或覆盖，这正是这类对象拒绝它的原因。',
      },
      {
        question: 'ObjectStack 会在数据落地前做转换或关联吗？',
        answer:
          '不会。这里不做数据管道与加工：跨来源的关联、清洗和汇总是数据仓库或 ETL 厂商的工作，它们是合作伙伴，ObjectStack 把结果同步进来。映射里的逐字段 transform 一次只转换一个值，不会长成管道。',
      },
      {
        question: '拉取作业需要什么才能运行？',
        answer:
          '一个只有一个来源、upsert 模式且带 upsertKey 的映射，目标是声明为 managedBy: \'synced\' 的对象；再加一个 pull 指向它、在代码里声明的作业。os validate 会拒绝指向不存在的映射或没有来源的映射的 pull。部署只有在设置 OS_AUTOMATION_SCHEDULED_WORK_ENABLED=true 之后才运行包内声明的作业，默认关闭。',
      },
      {
        question: 'ObjectOS 在其中是什么角色？',
        answer: `联邦接入、单向同步和连接器动作都属于开源的 ObjectStack 运行时，Apache-2.0。${p.t4}${p.e1}`,
      },
    ],
  } satisfies MarketingPage;

export default page;
