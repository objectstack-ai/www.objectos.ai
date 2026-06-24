# 无代码 / 低代码 + 内部工具构建器

> 调研 2026-06-24。ObjectStack 楔子见 [README](./README.md)。

**三类三套打法**:
- **消费/SMB 应用构建器**(Bubble, Glide, Softr, Adalo, FlutterFlow):攻不透明可视化配置 + 粗权限 + 锁定。
- **Web/可视化开发**(Webflow, WeWeb):页面/前端优先、几乎不治理业务逻辑;头对头靶子弱(诚实)。
- **内部工具/管理后台**(Retool, Budibase, Appsmith, ToolJet, DronaHQ):它们**治访问治得好**,要攻"逻辑是不透明 JS"+ "AI 是外挂",而非"应用是可审元数据"。

**横贯 14 家最锋利的一刀:diff。** 没有一家产出人审改动产物——AI 改动直接灌进不透明配置/JS。

---

## 消费 / SMB 应用构建器

### Bubble (bubble.io)
- 全栈无代码可视化 Web/移动构建器(UI、可视化工作流、专有 DB、现有 AI 应用生成)。目标:单干创始人/公民开发者/agency/早期创业,非企业 IT。
- 价格:Free → Starter ~$29 → Growth ~$119 → Team ~$349-399/mo → Enterprise;全部按计量 **Workload Units**($0.30/1K WU 超额)——账单可能失控。
- 体量:**$100M A 轮(Insight, 2021.7)**,累计 ~$106M;~$74M ARR(2024);~1M 付费;4.7M+ 应用。
- 治理弱点:逻辑锁在专有点选工作流;**不能导出源码**。隐私规则可达记录/字段级,但默认开放+手动,且 **Data API 能绕过隐私规则**(有数据/Stripe key 泄露记录)。无原生动作级审批/审计。AI Agent(2025.10 GA,基于 Claude Sonnet)生成页/DB/工作流但做不了条件/后端工作流,产物仍灌进同一不透明配置。
- 挖角:"Bubble 把业务逻辑锁进不可导出的可视化配置,而它自己的 API 能绕过自己的隐私规则——ObjectStack 把应用保持为开放可审元数据:AI 写改动、人批小 diff、运行时在你已拥有的 CRM/ERP/DB 上强制对象/记录/字段/动作权限+审批+审计。"
- **文章价值:HIGH**。WU 计费反弹、Data-API-绕过安全帖、不可导出锁定都是公开痛点。

### Glide (glideapps.com)
- 从表格/DB 一句话搭移动/Web 业务应用 + AI agent。目标:公民开发者/SMB/运营(~65% 营收来自 SMB/创业),非企业 IT。
- 价格:Free → Explorer ~$19-25 → Maker ~$49-60 → Business ~$199-249/mo → Enterprise;**2025.11.1 起按用量计费**。
- 体量:**$20M A 轮(Benchmark, 2022.4)**;ARR ~$3.7M(2024)。⚠️**忽略内容农场的"$400M B 轮/$520M 估值"——编造。**
- 治理弱点:不透明可视化配置、无可 diff 定义。权限粗——**Row Owners(记录级,邮箱匹配)+ Roles(页面级),无字段/列级安全**;其官方文档警告可见性条件**不是**安全(隐藏数据仍到客户端)。AI=AI 列 + "Glide Agent" 生成器,但灌进同一不透明配置。导出=一次一张 CSV;应用逻辑不导出。
- 挖角:"Glide 只给行级和页面级安全,没字段级、没审计、没可读 diff——ObjectStack 让 AI 写应用、人审小 diff,运行时在你现有 CRM/ERP 上强制对象/记录/字段/动作权限,自托管、无须迁移。"
- **文章价值:HIGH**。行级安全+不透明配置 vs 字段级运行时治理,对比具体合法;成长型用户正撞这堵墙。

### Softr (softr.io)
- 在外部数据(原 Airtable)上搭客户门户/内部工具/CRM,现称"AI-native"。目标:公民开发者/SMB 运营。
- 价格:Free → Basic ~$49 → Professional ~$139 → Business ~$269/mo → Enterprise。**2025.11 把 Business 用户上限从 2,500 砍到 500、价格不变**——反弹。
- 体量:**$13.5M A 轮(FirstMark, 2022.1)**;~600K 注册、~5,000 付费(2025.2)。
- 治理弱点:逻辑/访问在 UI 配置的 block + 可见性条件(不可 diff/AI 审)。可达页/块/动作/记录级(经用户组),但**字段级权限仍"即将推出"**。它是前端;真数据治理在底层后端。AI Co-Builder 生成 DB/页/角色/工作流,产物仍是不透明配置。不导出代码;只跑在 Softr。
- 挖角:"Softr 把逻辑和权限困在只跑在它服务器、最多到记录级的不透明配置里——ObjectStack 让 AI 把应用写成你审批小 diff 的开放元数据,运行时强制对象/记录/字段/动作权限+审批+审计,自托管、接你现有 CRM/ERP/DB 而非你会撑爆的表格。"
- **文章价值:HIGH**。真痛迹(2025.11 用户上限砍、无字段级权限、不导出代码)。

### Adalo (adalo.com)
- 无代码可视化构建 DB 驱动的原生 iOS/Android+Web 应用,含 AI 生成(Adalo 3.0)。目标:公民开发者/单干/SMB,非企业。
- 价格:扁平月费、无用量计量。Free → 上架 ~$36/mo(Starter)起。
- 体量:**$8M A 轮(Tiger Global, 2021.5)**;称 3M+ 应用。**2021 后无新融资**——安静约 4 年。
- 治理弱点:权限粗且不均——非 User 集合只支持**集合级**权限(无字段级);仅 User 集合有逐字段控制;关系/记录级权限深度封顶 2 且仅 User。逻辑在不透明可视化画布。AI 是**外挂聊天框**,非治理层。**无实质代码/数据导出**。
- 挖角:"你的规则和数据困在 Adalo 不透明画布里、没字段级权限、也带不走——ObjectStack 把应用保持为可审元数据,运行时强制对象/记录/字段/动作权限+审批+审计,接你已拥有的数据库。"
- **文章价值:MEDIUM**。对比合法但用户偏爱好者/SMB,吸引的严肃/企业用户少。

### FlutterFlow (flutterflow.io)
- 低代码可视化构建器,生成真 **Flutter/Dart** 移动/Web/桌面应用;前 Google 工程师 2020 创立。目标:专业/半专业开发者、agency、创业 → 中端开发团队;推向企业(SOC2)。
- 价格:Free → **Basic $39/mo**(可下代码/APK)→ Growth $80 → Business $150/mo → Enterprise。(2025.8.18 重构。)
- 体量:**$25.5M A 轮(2024.1, ~$170M 估值),GV+Gradient 领投**(谷歌的基金);**~$25M ARR(2024.12);1.5M+ 注册**。⚠️**更正:"2025 谷歌收购 FlutterFlow"是 AI/SEO 幻觉(与 Flutter 框架混淆)——Google 是投资方不是收购方。**
- 治理弱点:生成 Dart 可审——但这是陷阱:代码随增长不可维护,且**一旦在 FlutterFlow 外改代码,回到构建器的往返同步就会断**(审代码 or 用构建器,二选一)。规则在不透明 action-flow + 生成代码里。权限是**自己手搓**(Firestore 规则/Supabase RLS);FlutterFlow 自身门控只到页/组件可见性,无中央审计/审批。
- 挖角:"FlutterFlow 逼你二选一——审生成的 Dart 或用构建器——还要自己手搓 Firestore 规则、没中央审计,而 ObjectStack 把应用保持为开放元数据:AI 写、人批小 diff,运行时管对象/记录/字段/动作权限+审批+审计。"
- **文章价值:HIGH**。谷歌背书、~$25M ARR、1.5M+ 开发者、奔向企业——大严肃受众,且"代码 vs 构建器 + 自搓权限"对比扎实。

---

## Web / 可视化开发(头对头弱靶子——诚实)

### Webflow (webflow.com)
- 可视化网页设计 + CMS,把拖拽画布变成生产 HTML/CSS/JS 站,扩向"网站体验平台"加 AI。目标:设计师/营销/agency,渐增中端企业营销团队。
- 价格:Free → Basic ~$15 → CMS/Business ~$23-39 → Ecommerce ~$29-212/mo;Team ~$2,500/mo;Enterprise。
- 体量:**~$213M 营收 2024(+66% YoY)**;**$4B 估值(C 轮 $120M, 2022.3)**;200,000+ 企业。
- 治理弱点:页面优先非对象优先——"业务逻辑"在平台内几乎不存在(交给外部代码/Apps)。权限是站点/工作区角色+发布级,**非记录/字段/动作**。应用不暴露为可审元数据;CMS schema 浅。2025 AI(AI Site Builder)是画布外挂生成器。
- 挖角:"Webflow 做漂亮的宣传站,但一旦需要受治理的业务逻辑——谁能改哪条记录、审批、审计——就无可治理;ObjectStack 给你对象优先的应用:AI 写、人审小 diff,运行时在你已有系统上强制记录/字段/动作权限。"
- **文章价值:LOW–MEDIUM(诚实)**。哲学对比合法,但买家/活儿不同——具名稿吸引错受众。当"页面优先工具为何治不了逻辑"论点里的陪衬。

### WeWeb (weweb.io)
- 低代码可视化**前端**构建器,产标准 Vue.js,连外部后端(Xano/Supabase/REST);可导出、可自托管。目标:前端开发者/技术型无代码 builder/agency。
- 价格:Free → 按席位(2025.2):Essential ~$16-20、Pro ~$42-50/mo;Enterprise。后端(Xano)另算。
- 体量:小——**~$3.2M 营收(2024)**,~38 人。融资少且旧(~$1-3.2M,2021.3 末轮,YC)。
- 治理弱点:前后端拆分意味着 **WeWeb 自身几乎不治理业务逻辑**——auth/权限在**单独**后端,治理被拆到两家。WeWeb 内:不透明可视化工作流/绑定、无原生记录/字段/动作权限模型。低锁定(代码导出)是真优势——但拿锁定换了碎片化 + 自搓治理。
- 挖角:"WeWeb 只搭前端、逼你把治理拼到一个你手接手审的单独 Xano/Supabase 后端;ObjectStack 把应用+对象+权限统一在一个开放元数据层,运行时强制记录/字段/动作访问、审批、审计——没有第二个后端要保护。"
- **文章价值:LOW(诚实)**。小、面向开发者,这些用户**主动选了**前端拆分且看重代码导出(与 ObjectStack 反锁定故事部分重叠)。当一段例子,不做头对头。

---

## 内部工具 / 管理后台构建器(治访问治得好——攻逻辑不透明)

### Retool (retool.com) — 最强、最合法的企业竞品(本批次写)
- 开发者优先的低代码内部工具/管理后台平台——拖组件、用 SQL+JS 连 DB/API。目标:企业 IT、平台/内部工具工程、开发重的创业 → 中端。logo:Amazon、Brex、Coinbase、OpenAI、DoorDash、Stripe。
- 价格:按角色按用户。Team ~$10 builder/$5 user;**Business $50 builder/$15 user**(年付);Enterprise(自托管、审计日志、细粒度 RBAC、SSO、源码控制都在这档)。2025 加 AI 用量计费。
- 体量:**$120M ARR(2025.10)**,从 ~$90M 上升;**$3.2B 估值**;~$141M 总融资。(⚠️别处的 "$200M/$350M" 有误。)
- 核心优势:最佳开发者工效 + 真强的**访问**治理——应用/资源/查询级 RBAC、行级安全、审计日志、SSO、源码控制、自托管,每个应用继承。是它的主场,真实。
- 治理弱点(诚实):它的 RBAC 治**访问,不治逻辑**。业务逻辑在逐应用的 JS 查询、transformer、绑定里——而门控 UI 的常规做法是把 **JS 粘进每个组件的 "Hidden" 属性**。字段/动作级控制**可达但靠手拼**,非声明为可审元数据。AI 无法把 Retool 应用当结构化 diff 审——它是散落各屏的 JS+绑定。"Retool AI"/Agents(2025.5)是建在同一手搭基底上的外挂自动化——agent 受治理,但**应用本身不是 AI 生成且受治理的**。专有;自托管仅 Enterprise;应用不可移植。
- 挖角:"Retool 治理谁能打开应用——但业务逻辑本身是散落在查询和绑定里的手写 JavaScript,没人当 diff 审、AI 也无法当元数据审计;ObjectStack 把应用做成开放可读元数据:AI 写、人批小 diff,运行时(而非粘贴的 JS)强制对象/记录/字段/动作权限+审批+审计。"
- **文章价值:HIGH**。最可信企业竞品、大量受挫高级用户,"访问治理✓ vs 逻辑是不透明 JS❌"的对比真实具体。

### Budibase (budibase.com)
- 开源低代码:搭建/自动化/自托管内部工具、应用、AI agent。目标:SMB→中端的 IT/开发者,要自托管/数据主权/开源。称 200,000+ 团队。
- 价格:OSS 自托管**免费**(到 ~20 用户)。Cloud Premium ~$50/creator + ~$5/终端用户/mo;Enterprise。
- 体量:~28k GitHub stars;2019 创立(贝尔法斯特);**~$9.2M 种子(2022)**,~25 人——比 Retool 小约两个数量级。
- 治理弱点(诚实):就其规模算不错——分层 RBAC + 自定义角色/继承 + 行/列级(3.0 的可视化 RBAC)。但字段/记录/动作治理是**逐组件条件规则 + 角色绑定**(如 `IF Current User.roleId Equals 'admin'`)——手拼,非一条覆盖对象的运行时策略。应用是 JSON,但是屏/组件树,不是 AI 能当治理 source-of-truth 的对象模型+策略。AI Agent 是外挂。
- 挖角:"Budibase 已经信开放+自托管——但它的治理是缝进屏树的逐组件角色绑定,不是覆盖你对象的一条运行时策略;ObjectStack 保留开放+自托管承诺,但把治理做成原生——对象/记录/字段/动作权限+审批+审计由运行时强制,应用核心 AI 写、人审小 diff。"
- **文章价值:MEDIUM**。公平对打(开源/自托管重叠),"逐组件 RBAC vs 运行时策略"区分真实,但基数小。当开源对比章节。

### Appsmith (appsmith.com)
- 开源(Apache 2.0)低代码:管理后台/内部工具/仪表盘,接 25+ DB + 任意 API。目标:创业→中端→企业的开发者/IT;自托管优先。
- 价格:OSS 自托管免费 → Cloud Free(5 用户)→ **Business $15/用户/mo**(自定义角色、审计日志)→ Enterprise 从 $2,500/mo。
- 体量:**~40k GitHub stars**(品类最大);**$51.5M 总融资**($41M B 轮, 2022.6, Insight)。
- 治理弱点:RBAC 在工作区/应用/资源级;**自定义角色+审计日志在 Business 档付费墙**;字段/记录级多靠手搓 JS。应用核心=JS 对象+SQL 串+绑定(即便导出 JSON 也对 AI 审查不透明)。AI="Appy" copilot + "Appsmith Agents"——外挂查询/JS 生成器。
- 挖角:"Appsmith 逼你手写手审 JavaScript、还把字段级治理锁在 Business 档——ObjectStack 让 AI 写应用、人审小 diff,运行时原生强制对象/记录/字段/动作权限,没有不透明 JS 要审计。"
- **文章价值:MEDIUM**。受挫开发者基数大("胶水 JS 太多"、治理分档付费),对比合法,但比 Retool 更小众/偏开发者。

### ToolJet (tooljet.com)
- 开源底座的 "ToolJet AI"——内部工具/仪表盘/工作流/AI agent,接 80+ 数据源、内置 DB。目标:工程团队、创业→企业,要自托管+治理;正改口"AI-native"。
- 价格:OSS 自托管免费 → Cloud Free(2 builder)→ **Team ~$19/builder** → **Business ~$79/builder + $8/终端用户** → Enterprise。
- 体量:**~38k GitHub stars**;**~$6.15M 总融资(种子,无 A 轮)**——含 Microsoft M12 + GitHub Fund + Nexus。
- 治理弱点:三家 OSS 里纸面上最接近行/字段级 RBAC——但仍逐应用、与不透明 JS/Python+查询并存。**ToolJet AI 一句话生成应用,但产物是同样的低代码应用**(UI+查询+JS)——生成时而非治理运行时;无 AI 审 diff + 运行时强制审批闭环。
- 挖角:"ToolJet 的 AI 吐出一个你仍得手动信任和定制的完整低代码应用——ObjectStack 的 AI 把应用写成开放可读元数据,你审小 diff,运行时(而非逐应用配置)强制字段/记录/动作权限、审批、审计。"
- **文章价值:MEDIUM**。"生成 vs 运行时治理"对比因其重 AI 营销而锋利时新;比 Retool 年轻但有势头。

### DronaHQ (dronahq.com)
- 商业(印度系)低代码:内部 Web/移动应用、管理后台、审批流、仪表盘,现加 AI agent。目标:**企业 IT**——财富 500/大型受监管(Boston Scientific、Pfizer India、Colgate、Wipro、Kotak)。自上而下,非 OSS/公民开发。
- 价格:最灵活——**Starter ~$10/用户、Business ~$25/用户/mo**,加用量/任务计费 + 仅开发者许可;Enterprise 加细粒度权限、审计、多 SSO、on-prem。
- 体量:闭源。称 **1M+ 应用用户、2,000+ 应用、30+ 国**;营收 **~$10.6M(2024.10) → ~$15M(2025.7)**;基本自举(~$1M)。⚠️数字多为自报,标"称"。
- 治理弱点:专有闭源配置——**应用完全不可读为开放元数据**(内部工具组里锁定最重;不能自托管源码/Git 化应用)。逻辑在专有可视化配置+JS 式公式+绑定;细粒度/字段权限在 Enterprise 档。AI 是较新的外挂 agent/助手。
- 挖角:"DronaHQ 把你的内部应用锁进一个你读不了、不能自由自托管、AI 也审计不了的专有闭运行时——ObjectStack 是可自托管的开放元数据:AI 写、人审 diff,运行时强制对象/字段/动作治理,接你现有 CRM/ERP/DB 而非把逻辑困在黑盒里。"
- **文章价值:MEDIUM(偏低)**。真企业用户+锁定痛+很合法的开放元数据对比,但闭源且线上开发者声量小(偏印度)。

---

## 后端 / 无代码后端(部分重叠——"管线 vs 受治理应用")

### Xano (xano.com) — 本组治理最强竞品
- 可扩展无代码**后端即服务**——托管 Postgres、自动生成 REST API、可视化 "Function Stack" 逻辑——配单独前端(WeWeb/FlutterFlow)。目标:创业/规模化、agency、开发者,推向企业 + "AI agent 后端"(Xano 2.0)。
- 价格:Free → Starter ~$29 → Pro/Scale ~$99-249/mo → Enterprise(SOC2/HIPAA、自托管)。
- 体量:**~$15.4M 总融资**($5M 2022.11 + **$10M A 轮 2023.10**);营收 ~$6.1M(2025.9)。⚠️**更正:没有 $26M/2021 轮。**
- 治理弱点:diff 轴上最接近的竞品——Function Stack 编译成 **XanoScript**,Xano 2.0 出 **GitHub/GitLab 同步 + "Git 式 Version Diff"**。但权限**原生弱**:"RBAC"=平台/团队席位;数据级安全(行隔离、角色检查)**逐端点手搭**(authID 过滤 + Preconditions),非运行时引擎。AI=外挂助手(DB/SQL/Logic),"增强非替代"。只有后端——无受治理前端应用,故无单一可 diff 的**应用**。
- 挖角:"Xano 给你可扩展后端管线,但你仍要把行级安全手接进每个端点、AI 只是外挂 codegen——ObjectStack 让 AI 写整个业务应用、人批小 diff,运行时自身强制对象/记录/字段/动作权限+审计,治理不是你得记着去搭的东西。"
- **文章价值:MEDIUM**。受挫 builder 基数可观、对比合法,但它有真 Git/diff 故事——头对头须靠"权限非原生 + AI 是助手 + 只有后端没应用"。过度宣称 diff 角度会反噬。

### Backendless (backendless.com)
- 老牌低代码**移动/Web 后端即服务(mBaaS)**——DB、用户管理、Codeless 可视化逻辑+API、推送、实时、文件托管、可选 UI Builder。目标:应用开发者/agency;偏 SMB 但争关键/企业。
- 价格:Free → Cloud "Scale" 从 ~$15/mo → Pro/Managed。所有档无限开发席位。
- 体量:**自举——$0 外部融资**,2012 创立(德州)。~$3.7-3.8M ARR,~34 人(2025.9)。⚠️**更正:"~1M 开发者"不实;官网说"数万用户"。**
- 治理弱点:**注意——权限意外地强**:原生 **3 层 ACL(全局、表级、逐对象/行级)对角色和个人用户**(Permissions API)——原生比 Xano 更细。**所以别攻权限。** 真弱点:逻辑是不透明 "Codeless" 块、**无 Git/版本 diff**、非 AI 可审元数据;**AI 故事极弱**(无显著 AI 原生生成)。
- 挖角:"Backendless 给你带对象级 ACL 的扎实 mBaaS,但逻辑是不透明 Codeless 块、没 diff 可审、几乎没 AI 原生故事——ObjectStack 反过来:AI 把业务应用生成为开放可读元数据、人审小 diff,运行时强制字段/记录/动作权限+审计,你得到治理**和** AI 速度,而非 2012 年式后端上的权限勾选框。"
- **文章价值:MEDIUM-LOW**。小、自举、声量低,且强原生 ACL 钝化权限角度。次要/对比条目;主打 Xano。

---

## 文章优先级排序

| 档 | 平台 | 理由 |
|---|---|---|
| **HIGH(主稿)** | Retool, Bubble, FlutterFlow, Glide, Softr | 大/严肃受挫基数 + 合法具体的治理对比。Retool=可信度锚(治访问但逻辑是不透明 JS);Bubble=锁定+Data-API-绕过;FlutterFlow=代码 vs 构建器+自搓权限;Glide/Softr=无字段级安全+不透明配置。 |
| **MEDIUM** | Adalo, Budibase, Appsmith, ToolJet, DronaHQ, Xano | 真对比但基数小/单轴强(Budibase JSON、Xano diff),需诚实框架。 |
| **LOW(陪衬非头对头)** | Webflow, WeWeb, Backendless | Webflow/WeWeb 页面/前端优先(买家/活儿不同);Backendless 强原生 ACL 钝化楔子。 |
