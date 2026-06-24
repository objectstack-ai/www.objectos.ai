# 多维表格 / 工作区(database-spreadsheet hybrids + workspace)

> 调研 2026-06-24。ObjectStack 楔子见 [README](./README.md)。这是 ObjectStack UX 上最可比的一组(它明确做"Airtable 式 AI 构建器")。

**共同结构性缺口(= ObjectStack 楔子)**:每家都有**生成式** AI(Omni / Field Agents / Notion Agents / Kuma / NocoAI),但**没有一家把 AI 改动做成"受记录/字段/动作权限治理的人审 diff + 审批 + 防篡改审计"**——最好的也只是事后 undo/版本历史。且多数是**数据孤岛**(自带存储、行数上限),靠 API/Zapier 连 ERP/CRM,而非把治理覆盖到现有 record-of-truth。

**权限深度现实核对**(别一概说"只有库/表共享"):Rows/Notion/Coda/Stackby/APITable 确实粗;但 **Airtable**(字段/记录,部分靠视图)、**SmartSuite**(到记录/字段)、**Grist**(行+列)、**Teable**(Business 档 Authority Matrix)、**Ninox**(字段+脚本条件)、**Knack**(角色/页面)各有真权限。攻击面统一到**组织级统一治理 + AI 可审 diff + record-of-truth 连接性**。

---

## Airtable — HIGH(本批次写)

- **是什么**:关系型表格/电子表格混合,2025.6 "再创立"重塑为 "AI-native 应用平台",由 agent(Omni)一句话搭应用。
- **目标用户**:起于 SMB/团队自下而上,现强推企业。称 80% 财富 100、500,000+ 组织。2025 重塑、HyperDB、Enterprise Hub、ProductCentral 都是上探"record-of-truth"。
- **价格**:Free($0,≤5 编辑、1,000 记录/base);Team $20/编辑/mo(5 万记录/base);Business $45/编辑/mo(12.5 万);Enterprise Scale(50 万+)。**2025.6.24 起 AI 并入所有档(无按席位 AI 费)**,按月 AI credits(Free 500、Team 15k、Business 20k、Enterprise 25k/付费用户),超额包 ~$40/mo/20k。
- **体量**:Sacra 估 ~$478M ARR(2024,+27%)。末轮 F(2021)@ **$11.7B**;累计 $1.4B。二级市场 2025 末传估值砍到 ~$4B。2025.10 收购 DeepSky 补 AI 人才。
- **AI 详情**:
  - **Omni / Cobuilder**:对话式搭应用 agent,一句话生成表/字段/AI 界面元素/自动化/表单。CEO Howie Liu 框架:Airtable 是"经生产验证的零件箱",Omni 来组装,明确对立"vibe coding"(Cursor/Bolt)的一次性代码——这更接近元数据组装,是真优势。
  - **Field Agents**:嵌入 base 的 AI agent 逐行跑业务(抽取/搜索/生图/反馈综合);活动"受治理、可审计"。
  - **HyperDB**(2025.5 GA):存储层达 **1 亿行**,连 Snowflake/Databricks/Salesforce——要做企业 record-of-truth/共享数据前端。注意:默认同步**每 24h 一次**(非实时),除非走 API。
  - **可审性**:Omni 先给 *plan*、事后给步骤 *checklist*,可 **undo**(在出回滚到版本);但据其 Omni 文档,**无上线前 diff、无审批工作流、无文档化的元数据级审计**(AI 具体改了什么)。
  - 治理:Enterprise Hub、审计日志、组织单元/超管角色、EKM/DLP、2025"高级权限控制"。
- **治理弱点 vs ObjectStack**:权限真实但多为 base/工作区/表级(角色),字段/记录级偏粗、部分靠视图,非每对象/字段/动作的一等运行时模型。决定性缺口:Omni *搭/重写应用*时,是 **undo 不是审过的 diff + 上线前审批**,且无 AI 元数据改动审计——正是 ObjectStack 楔子。还有:**不提供自托管/on-prem(官方明确不做)**;闭源专有=锁定;你把数据**迁入** Airtable(HyperDB 连/同步,但应用和治理在 Airtable 云)。
- **挖角**:"Omni 组装可信零件,但它把改动以 *undo* 而非'审过的 diff + 记录/字段/动作级审批和审计'推上你的在线应用——而且你永远无法在自己的基础设施里运行它;ObjectStack 两者都给。"
- **文章价值:HIGH**。最可比、ObjectStack 明确的参照系;对比合法(确实无自托管+无上线前 AI diff)。最强角度:**"Airtable Omni 搭了应用——但谁批准了 AI 改了什么?用 diff 而非 undo 来治理 AI 生成的企业应用。"**

## Notion — MEDIUM

- **是什么**:一体化工作区(文档+wiki+轻量数据库),2025 转向"agent 化",嵌入跨工作区+连接工具自主行动的 AI agent。
- **目标用户**:重个人/prosumer+团队自下而上;经 Enterprise 档/企业搜索/管理合规推企业,但 DNA 和主体用量是自下而上的知识工作,非受监管 record-of-truth。
- **价格**:Free;Plus $10/用户/mo;Business $18/用户/mo;Enterprise。**2026 关键变化:Notion AI 不再是 $8/席位附加,而是并入 Business/Enterprise**(Free/Plus 不能再买)。**Custom Agents** 用 **Notion Credits($10/1,000 credits)**,Business/Enterprise 附加;2026.5.4 起计费。
- **体量**:Sacra 估 ~$500M ARR(2025.9);其他称 ~$600M run-rate、年末 >50% ARR 来自 AI 客户。~$11B 估值(2025 二级)。1 亿总用户、~4M 付费。
- **AI 详情**:Notion AI(写作/问答/总结,内置 Claude Sonnet 4、GPT-5);**Notion 3.0(2025.9.18)"Agents"**(个人 agent 跑多步、长时);**Custom Agents(2026.2.24 GA "3.3")**:完全自主、定任务+触发器 24/7 跑(称内部 2,800 个 agent);**AI Connectors**(Slack/Drive/GitHub,尊重源应用权限);治理:Enterprise 管理控制、**MCP Governance**(管理员批准哪些 AI 应用/MCP 客户端可连、活动入审计日志)。
- **治理弱点 vs ObjectStack**:两大结构缺口。(a) **权限止于页/库行级**:支持行(页)级权限,但**无法限制单独的列/属性——能看到页就看到所有字段**;无字段/动作级运行时强制。(b) 是**文档/wiki 模型,非真对象/关系数据模型**——数据库轻量,无法建模真企业对象或坐在 ERP/CRM 上当 record-of-truth(Connectors 只读外部,不让 Notion 成为受治理前端)。Agent 改文档/库时有活动迹但**无上线前可审 diff + 审批**。无自托管;云only;专有 block 模型锁定。
- **挖角**:"Notion 连给同事隐藏一列都做不到,更别说字段/动作级权限或给你一个可批准的'agent 改了什么'的 diff——它是外挂了 agent 的 wiki,不是受治理的 record-of-truth。"
- **文章价值:MEDIUM**。受挫用户偏知识管理非应用构建,UX 邻接度低于 Airtable;但 agent 治理 + 列权限缺口真实、搜索相关(3.0/3.3 热度)。最佳角度:**"Notion 3.0 agent 24/7 跑遍你的工作区——但 Notion 连一列都限制不了,也没人批准 agent 改了什么。agent 化工作区的治理缺口。"**

---

## SmartSuite — HIGH

- "work platform" 融项目/工作管理 + 灵活无代码数据库(Airtable 式)+ 文档 + 自动化,现绕 **GRC** 重塑攻企业。目标:中端→企业(明攻金融机构/受监管;客户 Apple Bank、Credit One、BCBS、UCLA)。
- 价格(按席位):Free;Team ~$10;Professional ~$28-30;Enterprise ~$45/用户/mo;Signature 定制。
- 体量:**$38M 总融资(2025.2.20)**=创始人种子(~$25M 自资)+ **$13M A 轮(Canapi 领投)**;**50,000+ 用户、5,000+ 企业、100+ 国;2024 增长 ~300%**。创始人曾建 Archer(GRC),$200M 卖给 EMC。
- 核心优势:三家里最成熟治理——权限真达 工作区→方案→表→**记录→字段**,角色/团队 RBAC、按字段值的动态记录权限、字段可见度到"Nobody"。
- 治理弱点:权限强,但 **AI 是外挂非治理原生**。"AI Field Agents"/"AI Assist" 跑 LLM 填字段/总结/分类(结果入字段、记活动史),但**无"AI 搭应用、人审 diff"闭环**;AI 不在可审/受审的改动下创作 schema/权限。自动化可视但**不暴露为开放可移植机读元数据**——应用核心专有。**规模上限:记录按*方案*封顶(跨表合计):Team 5K、Pro 100K、Enterprise 400K**。连 ERP/CRM 靠集成,但本质是自有数据存储,非治理层。
- 挖角:"SmartSuite 把治理*和*数据锁进 40 万记录上限的专有壳里——ObjectStack 在开放可移植、接你真 ERP/CRM 的元数据上强制同样的记录/字段/动作权限,每次 AI 改动作为人审 diff 发布,而非不透明的 field agent。"
- **文章价值:HIGH**。最直接的竞品(明攻 GRC/企业信任),记录上限+专有核心限制具体合法。

## Baserow — MEDIUM
- 开源、可自托管无代码数据库 + 应用/自动化(Airtable 替代);**2.0(2025)** 改口 "AI 驱动数据协作平台",攻受监管/安全敏感行业。目标:SMB→中端团队/开发者。
- 价格:Free(云 3,000 行/2GB/工作区);Premium ~$10、Advanced ~$20/用户/mo;Enterprise。**RBAC、字段级权限、SSO 要 Advanced/Enterprise**。
- 体量:**€5M 种子(Inkef, 2022.7)**;~150,000 活跃 SaaS 用户(2025,2.3×);~5.1k stars;GDPR/HIPAA/SOC2 Type II。
- 治理弱点:细粒度权限**付费墙**(免费/Premium 仅工作区级)。AI("Kuma" + 一句话建库/工作流)是生成便利、**非受治理改动管线**(无 AI 输出 diff/审计闭环)。**Baserow 自管 PostgreSQL、不能连现有数据库**——必须**导入**,结构上是**数据孤岛**。
- 挖角:"Baserow 逼你把数据复制进它自己的 Postgres 孤岛、外挂 AI 还没有可审 diff 或动作级审计——ObjectStack 在数据原处(ERP/CRM)治理,把每次 AI 编辑变成人批、全审计的改动。"
- **文章价值:MEDIUM**。对比合法(孤岛架构、付费墙治理、不成熟 AI 信任),但更偏 OSS/自托管而非企业 AI 治理买家。

## NocoDB — MEDIUM
- 开源、可自托管:把**现有 SQL 数据库**(或自有存储)变成 Airtable 式表格/应用 UI,自动生成 REST API。目标:开发者/技术运营;SMB→中端。
- 价格:Free/自托管 $0(无限用户/行);Cloud Plus ~$12、Business ~$25/编辑/mo("付 9 个封顶");Enterprise。
- 体量:**$10.5M(2022.10,OSS Capital+Decibel)**;**~63k stars**(三家最多);天使含 Naval、Mullenweg 等。
- 核心优势:三家里**唯一连现有/生产 SQL 库**而非强制导入——真"在真 record-of-truth 上的 UI/治理层"。自托管无限行/用户;有审计日志(谁何时做了什么)。
- 治理弱点:权限**更粗**——base/表/视图 + 工作区共享,无真逐字段/记录引擎。**自动化是代码(JS 脚本)**——正是 ObjectStack 要避开的不透明代码问题。AI("NocoAI":填/转字段、一句话建 base;自带 LLM key)又是生成式非受治理(无 diff 审批闭环)。
- 挖角:"NocoDB 给你数据库上的表格,但只有 base/表级共享、自动化是你要逐行读的 JavaScript——ObjectStack 加上记录/字段/动作级强制,把 AI 改动作为开放元数据上的可审 diff 发布,既'坐在你真数据上'又没有不透明代码和粗权限的税。"
- **文章价值:MEDIUM**。连真 DB 架构是 ObjectStack 最近的哲学表亲,权限粒度+代码 vs 元数据+AI 治理对比锋利合法;但开发者/OSS 受众不如 SmartSuite 那样治理焦虑。

## Teable — HIGH
- 开源、基于 PostgreSQL 原生的无代码数据库 + 表格 UI;自称 "AI Database Agent"(一句话搭)。目标:个人→团队→SMB/中端,推"企业级"(私有部署、ISO 27001/9001)。
- 价格:Free($0,1,000 行/space);Pro $10/席位/mo(25 万行);Business $20/席位/mo(100 万行 + Authority Matrix + SSO);Enterprise。
- 体量:~21,000 stars;融资:天使轮 Baidu Ventures + 2 家,**金额未披露**(当种子级,勿引美元数字)。
- 核心优势:真 Postgres 后端→无行数上限 + 规模 SQL 兼容("没有 1,200 行墙");原生 AI 字段 + 一句话搭;可自托管(AGPL-3.0)。
- 治理弱点:三家里最接近的竞品。权限**确实**达记录/字段/动作(Business 档 Authority Matrix)+ 审计史最长 3 年——非仅共享。但:(a) AI agent 一句话生成是**黑盒**——无证据有上线前可审 diff,"undo"/变更史是唯一安全网,非上线前人审;(b) 治理在最高付费档;(c) 仍是独立数据库/应用工具、非 ERP/CRM 连接的 record-of-truth(原生连接器有限,有变孤岛风险);(d) 元数据"开放"仅在 Postgres/SQL 意义上,无 ObjectStack 那样的"开放对象协议"抽象。
- 挖角:"Teable 的 AI 在黑盒里搭你的应用、你靠翻历史才知道改了什么;ObjectStack 在任何东西上线前,给人看一个小可审 diff,并在运行时强制字段/动作权限。"
- **文章价值:HIGH**。唯一可信地同时宣称 AI 数据库+企业权限+规模的,头对头合法,"可审 diff vs 黑盒生成 / record-of-truth vs 孤岛"对比锋利、正中 ObjectStack 想要的买家。

## Grist — HIGH
- 开源(Apache 2.0)电子表格-数据库混合,Python 公式 + 独特的细粒度访问规则;可自托管。目标:技术型个人/团队/研究/**政府公共部门**(Enterprise 50 用户起)。
- 价格:Free;Pro $8/用户/mo;Team/Business 更高;Enterprise(50 用户起)。社区版自托管免费。
- 体量:**自举,"从未融资"**;~$1M/yr 营收;2024–25 从 1,000→15,000 MAU。**重大公共部门案例:grist.gouv(法国 DINUM+ANCT)2026.1 达 20,000 MAU(10× YoY),15 部委、全部 100 个省**;2025 Clever Cloud 合作(HDS/SecNumCloud 主权)。
- 核心优势:业界最佳的**行级 AND 列级访问控制**(单文档内)+ 真 Python 公式 + 强开源/数据主权——受合规敏感/政府青睐。
- 治理弱点:数据层治理三家最强(行+列),有审计日志流。弱点:(a) 权限是**文档范围**、非组织级统一对象/动作模型——逐文档由技术用户写访问规则表达式,不易跨数百应用规模化;(b) AI Assistant 一句话改公式/记录(有 undo),但**非可审 diff + 审批闸门**;(c) 仍是电子表格-文档工具、非 ERP/CRM 集成 record-of-truth;(d) 商业背书薄(自举、~$1M 营收)=企业采购风险。
- 挖角:"Grist 在单文档里给你漂亮的行/列规则,但治理止于文档边界、它的 AI 改公式没有审批闸门——ObjectStack 在组织级治理对象、字段、记录和 AI 生成的改动,每个 diff 上线前都有人审。"
- **文章价值:HIGH**。Grist 的行/列访问控制是 ObjectStack 楔子最可信的对手,具名稿("细粒度电子表格规则 vs 运行时对象/动作治理 + 可审 AI diff")合法且吸引其安全意识用户。

## Rows — LOW/MEDIUM(已被收购/关停)
- AI 电子表格 + 内置实时集成 + "AI Analyst";是智能电子表格/报表工具,非真应用构建器/数据库。目标:个人/SMB 分析/营销。
- 体量:累计融资 ~$40M(B 轮 2024.5);2.2M+ 终身用户。**2026.2.24 被 Superhuman(原 Grammarly)收购(估 $50–70M);独立产品关停,仅运营到 2026.5.31**,并入 Superhuman/Coda 套件。
- 治理弱点:每条轴都最弱。权限仅工作区/表级共享;是电子表格非数据库/应用平台(10 万行/表硬顶);AI Analyst 是分析黑盒;**且产品将死(2026.5.31 落日)**——任何严肃买家直接出局。
- 挖角:"Rows 2026.5.31 关停,且本就只是个没记录/字段权限、10 万行封顶的智能电子表格——ObjectStack 是受治理、可自托管、跑你业务运营的 record-of-truth。"
- **文章价值:LOW–MEDIUM**。直接头对头弱(非真竞品且将关停);但"无家可归的 Rows 用户去哪儿"迁移落地页(Medium)可捡 2026 流量。

## Coda — HIGH(作为靶子)
- "文档遇见数据库"工作区,现重塑为 "agent workspace"。目标:个人→团队→中端知识工作者;非企业 record-of-truth。
- 价格:Free;Pro **$10/Doc Maker/mo**;Team **$30/Doc Maker/mo**;Enterprise。**现属 Superhuman**(Grammarly 2024 末收购 Coda → 2025.7 收 Superhuman 邮箱 → 2025.10.29 母公司改名 "Superhuman" → 2026 初收 Rows)。合并体 ~$700M ARR/~40M 日活。
- 治理弱点:权限是**文档/文件夹/页级 + 表锁定**,非运行时记录/字段/动作 RBAC。自动化是文档内公式/触发逻辑。**Coda AI 是黑盒**——其官方说会"幻觉""需人工细审",**无 AI 改动的可审 diff/审计**。规模 ~500K 行/文档(HyperTable 后,仍文档绑定)。是生产力文档工具,非建模企业对象/治理 ERP/CRM 的系统。
- 挖角:"Coda 的 AI 把你的文档当黑盒重写、权限止于页;ObjectStack 把应用写成开放可审元数据,运行时强制字段/记录/动作级权限和审计——受监管团队才真能发布 AI 搭的软件。"
- **文章价值:HIGH**。具名头对头合法时新——Coda 混乱的归属剧(Grammarly→Superhuman)+ 文档绑定权限上限,吸引在问"Coda 还算严肃平台吗"的受挫中端用户。

## APITable / Vika(维格表) — MEDIUM
- 开源、API 优先的 Airtable 替代;中国系(国内 Vika,海外 APITable),现转 "AITable.ai" AI 数据库角度。目标:开发者/SMB/团队;国内经 Vika。
- 体量:**~$10M 总融资 @ ~$75M 估值(2021)**(高瓴/IDG/五源);**~15.4k stars**。2021 后无新融资;ARR 数字矛盾,**当未知**。
- 治理弱点:**开源项目基本停更**——实质功能提交 2024.5 后枯竭,2025 仅零星 Docker 修复。权限是 space/datasheet/视图级共享,非记录/字段/动作 RBAC。AI(AITable.ai)是外挂自带 LLM 聊天/分析,无可审 diff/审计。是 Airtable 式数据存储(带连接器的孤岛)。**对买家头条担忧是维护/弃坑风险。**
- 挖角:"一个 2024 起就几乎没发新功能的开源克隆,治理不了 AI 生成的企业应用——ObjectStack 给你同样的开放、可自托管、拥有数据的承诺,但运行时强制字段/记录级权限、审批、审计,且在持续开发。"
- **文章价值:MEDIUM**。"开源但停更"对比合法、打动自托管/主权人群,但西方足迹小、流量上限低于 Coda/Airtable。

## Stackby — LOW–MEDIUM
- 低价电子表格-数据库混合,招牌是 **API 列**(拉 50+ 业务服务实时数据)。目标:SMB/营销/预算敏感团队。
- 体量:**自举,$0 外部融资**;~$3.2M 营收/~5,000 付费(2024.10)。
- 治理弱点:权限是工作区/stack/表级共享 + 基础角色,非记录/字段/动作 RBAC。AI 是"AI field agents"(自带 LLM key),黑盒无可审 diff。**~50K 行/stack 硬顶**。是连接器网格孤岛——只*读* CRM/营销 API,不建模受治理企业对象或写回。
- 挖角:"Stackby 是带表级共享、5 万行封顶的廉价连接器网格——一旦 AI 应用需要字段级权限、审批、真 ERP/CRM 对象上的审计,你就用不下去了;ObjectStack 正是为此而造。"
- **文章价值:LOW–MEDIUM**。对比合法但不对等(廉价 SMB 工具,像欺负小个子),最多 roundup 一行。

## Knack — HIGH
- 无代码:搭数据库驱动、需登录的 Web 应用(内部工具+面向客户门户)带用户角色;2025.11 出 AI 应用构建器(Knack 2.0,一句话生成表/字段/连接/角色/页)。目标:SMB/中端;成员门户/客户应用/内部运营;有医疗(Knack Health)推向受监管中端。
- 价格:按记录/存储、**所有档无限用户**(招牌)。Starter ~$49-59、Pro ~$99、Corporate ~$249-250/mo。
- 体量:~**$11.5M ARR(2024)**,**自举**(~$2.5M),~88 人(2026)。
- 核心优势:电子表格类无代码里**最佳的认证用户/角色模型**——真登录页、多角色、"用户只见自己关联记录",加真企业合规:**SOC 2 Type II、HIPAA+BAA、AES-256/TLS、审计日志、AWS GovCloud**(Knack Health)。无限用户定价使大型面向客户应用便宜。
- 治理弱点:权限是**页/角色驱动,非一等对象/字段/动作权限矩阵**——靠"角色能看哪些页/视图"+ "限自己记录"强制,字段级靠逐角色拼视图、非声明式字段规则;无独立于 UI 的记录/字段/动作模型。自动化是 GUI 配置非开放元数据。关键:**AI 构建器无可审 diff、无 AI 生成内容的人审审批**——2025.11 发布讲一句话到"生产就绪应用",零提 diff/变更审查/AI 编辑审计。规模上限真实(~150 万记录工程上限)。连 ERP/CRM 仅经 REST/500+ 连接器/Zapier——是**应用+数据孤岛**。
- 挖角:"Knack 给你 AI 搭的应用真登录——但 AI 重写应用时你得到一个成品黑盒、权限活在页面布局里;ObjectStack 让人批准确切的 diff,在运行时按对象/记录/字段/动作级强制权限,基于你能读、能自托管的开放元数据。"
- **文章价值:High**。Knack 受众已在意角色/登录、现又有 AI 构建器——正是 ObjectStack 主场,头对头("Knack 的 AI 搭了应用;谁审它改了什么?")合法共鸣,不稻草人(Knack 合规真,使"AI 治理缺口"成公平之战)。

## Ninox — MEDIUM-HIGH
- 德国低代码数据库/业务应用,自有脚本(Ninox Script);2025 重塑 "Ninox 4 / AI-native",内置一句话搭。目标:SMB/中下端,重 **EU/DACH**(医疗/专业服务/SMB 运营)。
- 价格:**按用户**:Starter ~€11、Professional ~€22/用户/mo;Enterprise(5 席起)。永久免费档。
- 体量:~**$6.7M 营收(2024)**;**~€8M 增长轮(2022)**,柏林。
- 核心优势:**真细粒度多级权限**(数据库→表→**字段级** + 脚本条件 `Creatable if`/`userRole()`)——比 Airtable/Knack 深;加 **EU 数据驻留、ISO 27001/9001、SOC 1、GDPR** + **自托管/on-prem 私有云**。"EU GDPR + 我要自己托管"的最强答案。
- 治理弱点:Ninox *能*达记录/字段/动作——所以楔子是**不透明性与可审性,非粒度**。逻辑是散落字段/触发/按钮的**命令式 Ninox Script**,更接近不透明生成代码而非开放声明式元数据,难一眼审"谁能做什么"。新 **AI 构建器是构建侧黑盒**:2025 营销讲"描述它、Ninox 来搭",**无可审 diff/审批/AI 改动审计**。无文档化的变更审计/审批工作流。规模 SMB 级。连出靠 REST+Zapier/Make,仍是你**迁入**的独立数据库。
- 挖角:"Ninox 能锁一个字段——但它的逻辑是手写 Ninox Script、新 AI 只是给你一个搭好的应用、没 diff 可审;ObjectStack 把整个应用保持为开放可读元数据,让人把每次 AI 改动当小 diff 批准,运行时强制对象/记录/字段/动作权限+审计——和 Ninox 一样可自托管,但治理是设计自带的。"
- **文章价值:Medium-High**。对 EU/自托管/治理意识买家(Ninox 核心基)合法锋利,2025 AI 转向使"AI-native 低代码,但审计迹在哪?"时新;略低于 Knack 仅因 EU/德语受众窄了英文搜索漏斗。

---

## 文章优先级排序

- **HIGH(主稿)**:Airtable(本批次)、SmartSuite、Teable、Grist、Coda、Knack。
- **MEDIUM**:Notion(riding 3.0/3.3 流量)、NocoDB、Baserow、Ninox、APITable。
- **组合稿**:"开源 Airtable 替代品(Teable/Grist/NocoDB/Baserow)——开源许可 ≠ 可治理"。
- **迁移落地页**:Rows(2026.5 关停)。
