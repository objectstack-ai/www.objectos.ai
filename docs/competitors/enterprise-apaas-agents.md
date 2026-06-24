# 企业 aPaaS / 本体 / 企业 Agent 平台

> 调研 2026-06-24。ObjectStack 楔子见 [README](./README.md)。

**横贯全组的对比**:AI 生产力被当作**计量消耗**卖,跑在**专有运行时**上;AI 生成的改动落成**不透明平台配置**而非你拥有的开放元数据上的可审 diff。三联攻击面:*开放元数据 · 你的运行时 · 不对成功征税*。

---

## 第一梯队(旗舰)

### Palantir Foundry + AIP + Ontology — HIGH(新角度)
- **是什么**:端到端数据/AI OS:Foundry(数据集成 + 专有 "Ontology" 对象/动作语义层)+ AIP(在 Ontology 上行动的 LLM/agent 层)。
- **目标用户**:大企业 + 政府。买家=CIO/CDO/COO,七位数合同;经 5 天 bootcamp 落地再扩张。
- **价格**:不透明、谈判式;消耗 + use-case 许可。英国 G-Cloud 露形(~£66k/yr/server core;use-case 许可从 ~£250k 起)。AIP 加**按 token 消耗**(Palantir 现发 "AIP Token Usage" 数据集追踪 LLM 花费)。
- **体量**:**2026 Q1(2026.5.4 报):营收 $1.633B、+85% YoY**(上市以来最快),~$6.5B run-rate。美国商业 $595M(+133%)。**净留存 150%+**,1,007 商业客户(+31%),RPO $4.45B(+134%)。FY2025 ~$4.47B。市值 ~$312B(2026.6),低于 2025.12 的 ~$424B 峰。⚠️客户数发布前核对 8-K。
- **核心优势**:Ontology 作为统一**运营**层(把数据绑到现实对象+动作/决策)+ Forward-Deployed-Engineer 交付机器,能搞定纯软件厂商搞不定的复杂政府/大组织部署。
- **治理/开放性弱点**:Ontology 仅能导出为**专有 JSON,非 RDF/OWL/SHACL**——你无法把语义层搬走别处跑。**不能有意义地自托管**(连 Apollo on-prem 也在 Palantir 控制面/许可内)。真陷阱是**迁入** Foundry:逻辑/管线重建为 Foundry 原语 + 几乎没有非 Palantir 的 Foundry 人才 = 多年切换成本。新 "AI FDE" agent 现在**替你搭和维护 ontology**——把治理层的依赖做得更深。150%+ 净留存 + token 计量 AIP = 教科书式"对成功征税"。
- **挖角**:"用 Palantir,你是在租自己的运营模型——编码你业务如何运转的 ontology 被锁在 Palantir 运行时里的专有 JSON 中、按 token 和 use-case 计量;ObjectStack 给你同样的对象/动作语义层,但作为开放、可自托管、跑在你已拥有系统上的元数据,所以成功让你更独立,而非更贵更依赖。"
- **文章价值:HIGH(需新角度,封闭本体已覆盖)**。最佳未挖角度:**(A)"对成功征税"**——AIP token 计费 + 已发布的 Token Usage 数据集 + 150% 净留存 + G-Cloud 每核/每 use-case 数字给出*真实数字*(最可防御,打成本敏感买家);**(B)"租你自己的人"**——AI-FDE 现在替你写 ontology,厂商 AI 写的模型归谁?**(C)"迁入才是锁定"**——拆建+人才缺口,反驳其"connect, don't migrate" 营销。**建议主打 (A),(B) 当治理收尾。**

### Salesforce Lightning Platform + Agentforce — HIGH(新角度)
- **是什么**:专有低代码平台(自定义对象、Flow、**Apex** + LWC)外挂 **Agentforce**(现 "Agentforce 360")自主 agent 层。
- **目标用户**:大企业+中端;150,000+ 装机。Agentforce 压倒性卖进存量(Q4 FY26 Agentforce+Data360 订单 60%+ 来自存量扩张)。
- **价格**:**18 个月内三次以上改价**(定价动荡信号):原 **$2/对话**(弃)→ **Flex Credits**($500/100k credits;标准动作 ≈20 credits ≈ **$0.10/动作**)→ **按用户许可**(Agentforce add-on **$125/用户/mo**;**Agentforce 1 Edition $550/用户/mo**)经新 AELA 协议。Data Cloud/Data 360 另算(消耗 credits)。底层平台席位 $165–$330+/用户/mo。
- **体量**:**FY2026(2026.1.31 止):营收 $41.5B、+10%;RPO $72.4B、+14%;$50B 回购。** **Agentforce ARR ~$800M(+169%)**;Agentforce+Data360 ~$2.9B(+200%+)。**29,000+ 累计 Agentforce 交易。** 软肋:2025 年中仅 ~8,000/150,000+ 客户(~8%)采用——价格是主因;付费 << 成交。
- **核心优势**:全球最深企业 CRM 数据 + 工作流引力;agent 原生作用于一方数据 + SaaS 最大分发机器。
- **治理/开放性弱点**:应用是 **Apex(专有)+ Lightning**;**无自托管/on-prem**——运行时是它的。应用逻辑=org 内平台元数据/Flow,非你拥有的可审 diff。即便 Classic→Lightning 迁移也 $50K–$150K(Salesforce 内部移动)。Agentforce 是**按成功征税**(按对话、现按动作)。实地数学:**5 agent × ~70 对话/天 ≈ ~$900/天**;交易按 **60–70% 承诺转化**定价 vs **~25–40% 实际**;承诺用不完作废。三层叠加计量(席位 + 按动作 agent + Data Cloud 消耗)。
- **挖角**:"用 Salesforce 你付三层叠加计量——席位、按动作 Agentforce、Data Cloud 消耗——只为在一个你永远无法自托管或完全审计的封闭 Apex 运行时里跑 agent;ObjectStack 让运行时归你、应用是你像代码一样审的开放元数据、接你现有 CRM,而非每次 agent 干活就征你的税。"
- **文章价值:HIGH(需新角度,Agentforce 已覆盖)**。**★ 最佳:"三层税"**——叠 席位+按动作 credits+Data Cloud credits 的严谨 TCO 拆解,锚定 **~$900/天 5 agent** 数学 + **25–40% vs 60–70% 转化缺口**。无人干净建模过*合并*栈;时新(AELA 改价后 + FY26 实绩);正中"运行时归你/不对成功征税"。

### Microsoft Power Platform(Power Apps + Power Automate + Copilot Studio) — HIGH(新角度,本批次写)
- **是什么**:低代码套件(Power Apps)、自动化(Power Automate)、AI agent(Copilot Studio),建在 Dataverse 上,接进 M365/Azure。
- **目标用户**:中端→大企业,卖进 M365/Dynamics 存量。关键动态:LOB "公民开发者"搭、**中央 IT 拥有治理 + 许可**且是预算持有方,被要求控制蔓延。
- **价格**:叠加计量。Power Apps Premium $20/用户/mo(2,000+ 席 ~$12)。**便宜的 $5 per-app SKU 2026.1.2 对新客停售**——新客被引向 $20 Premium 或 PAYG $10/活跃用户/应用/mo。Power Automate Premium $15/用户/mo;RPA bot $150/mo。**Copilot Studio:2025.9.1 起改 Copilot Credits**——PAYG $0.01/credit 或包(25,000/$200/mo)。credits 叠得快:生成式回答=2、agent 动作=5、**RAG grounding=10/消息**、高级推理至 100;超额 125% 停用。Dataverse 超额 ~$40/GB/mo。
- **体量**:**5600 万月活 Power Platform 用户(+27% YoY)**(Q3 FY2025);**1M+ 自定义 agent;80%+ 财富 500** 有活跃 Copilot Studio/Agent Builder agent。Microsoft AI run-rate 超 $37B(+123%)(注:Power Platform 未单列)。
- **核心优势**:分发+集成引力:已在租户里(Teams/SharePoint/Office/Dynamics,一个 Entra 身份,一张发票);Copilot 借同一装机进数亿席位。
- **治理/开放性弱点**:**完全不能自托管**(仅 Azure SaaS)——对主权/气隙/受监管买家是硬否决,正是你楔子的反面。**Dataverse 锁定**:solution 导出带元数据但**不带你表里的数据**;你迁*入* Dataverse 并付 $40/GB 留着。Copilot 生成的应用变成不透明 managed-solution 配置——无 git 式 diff 可治理。Copilot=按消息征税(1–200+ credits/消息,不可预测)。许可复杂度爆炸(按用户/应用/流/bot/GB/credits;高级连接器 500 用户应用再加 $30K+/yr)。
- **挖角**:"用 Power Platform,你的应用、数据、agent 全活在你永远无法自托管的微软专有 Dataverse 运行时里——每个成功的 agent 都按消息计量;ObjectStack 把同样 AI 搭的应用保持为你拥有的运行时上的开放可审元数据,接你已有的 CRM/ERP 而非迁进一个你出不来的库。"
- **文章价值:HIGH(避开 Copilot Studio,已覆盖)**。**★ 最佳:"仅 Azure、不能自托管 + Dataverse 数据人质"**——主权/退出成本故事 1:1 映射你的开放可自托管协议 + "connect, don't migrate"。**第二(时新新闻钩):"Power Apps 的税刚涨了"**——2026.1.2 停售 $5 档 + $40/GB Dataverse + $30K/yr 连接器意外。Copilot credit 定价只当佐证。

---

## 第二梯队(强力头对头)

### ServiceNow(App Engine + Now Assist) — HIGH
- 主导级企业工作流平台;App Engine=Now Platform 上的低代码;Now Assist=嵌入式 GenAI/agent 层。目标:大企业(85%+ 财富 500)。
- 价格:按命名用户、销售报价(ITSM ~$70–$200/用户/mo)。**2025 转变**:Now Assist 锁在 Pro Plus/Enterprise Plus 后、**30–60% 涨幅**,加新**消耗模型**("Assist Packs",事件总结=1 assist;**建应用=20 assists**)。自主 agent 要顶级 "Prime"。5–10% 年续费涨。
- 体量:**FY2025:订阅营收 $12.88B(+21%);RPO $28.2B(+26.5%);~8,400 客户;~98% 续约。** **Now Assist 超 $600M ACV(3× YoY),2026 目标 $1B。**
- 治理弱点:**不能自托管**(纯多租户 SaaS)。封闭运行时 + 严重锁定——迁*出*报价 **$150K–$500K**、15–25 个集成要重建。Now Assist=消耗税且要全档升级(无法只为一个用例买)。AI 改动=不透明平台配置,非可审 diff。
- 挖角:"用 ServiceNow 你租一个黑盒运行时,每个 AI 动作是计量税、每次续费涨 5–10%;ObjectStack 给你同样 AI 搭的应用、作为你真拥有且能自托管的运行时上的开放可审元数据,AI 生产力不会变成消耗账单。"
- **文章价值:HIGH**。最贵、最黏的在位者。新角度:2025 Now Assist 消耗转向 + "Pro Plus 档税"、续费爆炸/强制 AI 升级、$150K–$500K 退出锁定。

### Pega — HIGH
- 企业 BPM/案件管理 + 决策平台,重 AI 层(Pega GenAI、Blueprint)。目标:大型受监管(银行/保险/电信/政府)。
- 价格:转**按案件消耗**("work executed",明确对立 token 计量)。**GenAI Blueprint 免费**引流。真 TCO 不透明,数十万到数百万/yr。
- 体量:**FY2025 总 ACV ~$1.61B(+17%)**;Pega Cloud ACV ~$900M+。FY2026 指引 ~$2B。**注:Gartner 2025 LCAP MQ 从 Leader(2024)降到 Visionaries。**
- 核心优势:建模极复杂、长周期、受监管案件/决策无人能及;金融深度嵌入。
- 治理弱点:**冒烟的枪:GenAI Blueprint 导出物被加密、密钥只有 Pega Platform 知道、只能由 Pega 在导入时解密。** AI 生成产物 by design 不透明、不可携带。专有规则引擎;迁出"基本永久";运行时 AI 用 Pega 专有语义层(生产中不能换 LLM)。自托管部分(client-managed cloud)但引擎/AI 层/Blueprint 产物无论在哪跑都专有。
- 挖角:"用 Pega,连你 AI 刚设计的应用都被加密、只有 Pega 能打开——你的规则和运行时是七位数合同的人质;ObjectStack 把同样的企业应用生成为开放可读元数据,你能自己托管、带着走。"
- **文章价值:HIGH**。组里最强的*意识形态*陪衬——大型受监管、出名的锁定/成本、一个字面上加密的 AI 生成应用事实。角度:"保持可治理的 AI 生成软件 vs Pega 替你保管钥匙的 AI 生成软件"。

### OutSystems — HIGH
- 企业低代码,把可视化模型编译成 .NET/JS(老 O11 + 云原生 ODC);围绕 **Mentor**(agent 式全 SDLC AI"数字工人")重塑。目标:大企业+中上端;中央 IT/专业开发者。
- 价格:仅报价。按 **Application Objects (AOs)** + 终端用户数 + 附加。ODC 入门 ~$36,300/yr;真企业六位数。
- 体量:**超 €500M 营收(~$540M, 2025.5)**;估值 $9.5B;PE *支持*(非 PE 拥有)。Gartner LCAP Leader(2025)。
- 治理弱点:应用 source-of-truth 是 Service Studio 里的**专有可视化模型**,非可读可 diff 元数据。"标准代码、无锁定"有真星号:从业者报告生成代码**不能干净移植**——离开=大重建。自托管部分(O11 on-prem;ODC Self-hosted 跑 Test/Prod 但控制面+Dev 在 OutSystems 云)。Mentor 生成*进*专有模型、加深锁定。
- 挖角:"OutSystems 的'无锁定'到你想离开时才露馅——你的应用是专有可视化模型、要整体重建才能逃;ObjectStack 把同样的应用作为开放可读元数据交付,你能 diff、能治理、能在自己运行时上跑、不要 OutSystems。"
- **文章价值:HIGH**。新角度:"编译的代码你仍带不走"(营销 vs 迁移现实)、AO/按用户成本蔓延、"AI 生成进一个你读不了的模型"。

### Mendix(西门子) — HIGH(治理/可审性角度)
- 企业模型驱动低代码,西门子所有;应用存为专有二进制 `.mpr` 模型、跑在 Mendix Runtime;推 **Maia**(AI 辅助开发)。目标:大企业+中端;IT+专业开发者,有西门子工业/OT 基础。
- 价格:按应用+按命名应用用户。Free;Standard 从 €900/mo(单应用)/€2,100/mo(无限应用);Premium 联系。
- 体量:FY2024 营收 ~$169.8M;西门子 100% 所有(2018 收购 ~$730M)。4,000+ 企业、300,000+ 开发者。**Gartner LCAP Leader 连续 9 年(2025)**,愿景完整度最远。
- 治理弱点:**全组最锋利的单一开放性对比:应用活在专有二进制 `.mpr`、你连 diff 都做不了**(Git 合并差、手改会损坏)。应用需 Mendix Runtime;"无锁定"靠数据导出+SDK、非应用独立运行。*诚实细节:运行时多云可移植是真的*——所以攻**模型开放性/治理**,别攻"不能自托管"。
- 挖角:"Mendix 把你的应用逻辑锁进一个你连 Git 都 diff 不了的二进制 `.mpr`;ObjectStack 把同样的应用保持为开放人类可读元数据,AI 生成的软件保持可审、可移植,而非困在只有 Studio Pro 能打开的 blob 里。"
- **文章价值:HIGH(治理/可审性)**。"二进制 `.mpr`、你 diff 不了自己的应用"具体、正中楔子。成本角度比 OutSystems 弱。框架打模型开放性、非托管。

### Appian — MEDIUM
- 企业流程自动化/低代码("the process company"),统一工作流/BPM、RPA、IDP、流程挖掘、嵌入式 AI agent。目标:大企业+中上端、受监管流程重(FS/保险/政府/生命科学)。
- 价格:订阅,**按用户 AND 按应用**。历史锚:Standard ~$75/用户/mo、~100 用户起(~$90K+/yr)。AI/高吞吐经 Autoscale(消耗计量)。
- 体量:**FY2025:营收 $726.9M(+18%);云订阅 $437.4M(+19%);首个全年 GAAP 净利 ~$1.2M。** Gartner LCAP Leader(连续 3 年)。
- 治理弱点:**诚实处理:Appian 是在位者里更开放的**——支持 SaaS、客户管理云、AND 自管/on-prem(容器化 K8s)。所以"不能自托管"不适用。真楔子=**开放协议/本体 vs 可自托管但专有**:即便自管,你仍跑 Appian 专有引擎+封闭应用模型,锁在 Appian 认证开发者 + 按应用定价。AI 吞吐消耗计量(Autoscale),比 ServiceNow 温和。
- 挖角:"Appian 让你自托管——但你托管的仍是 Appian 的专有引擎和封闭应用模型,锁在 Appian 认证开发者和按应用定价;ObjectStack 让应用本身是开放协议上的开放可读元数据,自托管意味着真正的所有权和可移植,而非在你服务器上跑别人的黑盒。"
- **文章价值:MEDIUM**。比 ServiceNow 小 ~18 倍;其部署灵活 + "可治理 AI" 话术钝化偷懒攻击线("不能自托管/AI 不透明"会不实且反噬)。诚实角度:"可自托管的专有栈 vs 开放协议"。当三方稿里的微妙对比。

---

## 第三梯队(警世/相邻/低契合)

### Builder.ai — 已破产(警世故事) ⚠️
**对前提的关键纠正**:"AI 其实是 ~700 个印度人工工程师"的爆款故事**基本是谣言**(Gergely Orosz / The Pragmatic Engineer 采访前员工)。"Natasha" *是*真的基于 LLM 的 codegen(~15 工程师);"700"把另一个外包承包网络混为一谈,说法源自 X 上匿名加密账号。**真正搞垮公司的是会计造假/营收 round-tripping,不是假机器人。** 讲治理的品牌必须带头纠偏,否则自损公信力。
- 体量→崩盘:峰值 **$250M D 轮(2023.5,卡塔尔主权基金领投),~$1.5B 估值,>$450M 募集**(微软、软银 DeepCore、IFC、Insight)。崩:2025.2 CEO 被免 → 2025.3 Bloomberg 报营收虚增、~25% 重述 → 2025.5 债主 Viola Credit 扣 ~$37M → **2025.5.20 资不抵债(~1,000 岗)→ 2025.6.2 Chapter 7**。**SDNY/DOJ 电信+证券欺诈调查;FBI 大陪审团传票(2025.8,延续到 2026)。** 营收据称虚增 ~300%(告诉投资人 2024 ~$220M,实际 ~$50–55M);核心指控:与 VerSe Innovation round-tripping(~$60M 对开发票)。
- 治理弱点——完美陪衬:每条你治理的轴都是黑盒:来源不透明(无法审 AI vs 人 vs 外包);**无客户拥有的运行时——倒闭时客户据报丢了应用/数据**(催生"AI/软件托管"讨论);不可验证的宣称烧到了微软/QIA/软银。
- 战略用法:"人人都能看到 Builder.ai 生成应用。没人能看到它生成了什么、谁真在搭、背后的生意是否真实。这就是 AI 戏剧 与 可治理 AI 软件 的区别。" 落到"运行时归客户"——厂商倒闭也带不走你的软件。
- **文章价值:HIGH**。品类*的*参照警世故事;干净的 $1.5B→破产弧线、活跃 SDNY/FBI 调查,加谣言-vs-真相反转让 ObjectStack 当懂行的逆向者。最新角度:**"Builder.ai 的谣言 vs 真正搞垮它的——两者都指向同一缺失:治理。"**

### Glean — MEDIUM
- 企业 AI 搜索 + "Work AI" 助手/agent,把 SaaS 索引成权限感知知识图谱。目标:大企业/F500;IT/CIO/知识管理。
- 价格:按席位定制(~$50/用户/mo,~100 席起;生成式/agent ~+$15/席;大部署 $240K+)。
- 体量:**估值 $7.2B**(F 轮, 2025.6);**ARR $200M**(Fortune, 2025.12;Glean 称 $300M+)。
- 治理弱点:*相邻品类*——读取并作用于你数据的层,**不是应用运行时**。封闭厂商托管;不透明专有图谱(非你能 fork/自托管的开放本体);治*访问*,不治*生成的软件*。
- 用法:当 **"and" 非 "or"**:"Glean 是读层;ObjectStack 是 AI 生成应用保持为你拥有的可检查元数据的开放、可自托管运行时。"
- **文章价值:MEDIUM**。"vs Glean" 有把 ObjectStack 归错类的风险。新框架:"企业 AI 缺失的层——助手告诉 AI 公司知道什么,没人治理 AI 据此搭出来的软件。"

### Sierra — MEDIUM
- AI 原生面向客户 agent 平台(支持/销售/服务,聊天+语音)。2024 由 Bret Taylor(前 Salesforce 联席 CEO、OpenAI 董事会主席)+ Clay Bavor 创立。目标:大企业 CX/支持;称 ~40% 财富 50。
- 价格:**按结果**(按解决的对话付);无公开费率。
- 体量:**估值 $15.8B**(E 轮, 2026.5,从 2025.9 的 $10B 升);**ARR $150M+**(进入第三年)。客户:SoFi、Ramp、Chime、Nubank、Cigna、Rivian。
- 治理弱点:陪衬非同侪:封闭仅云(无自托管;跑在 Sierra "Agent OS");**按结果黑盒**——你信*Sierra*对"解决"的定义/计量,无可检查产物;窄 CX 面,非通用应用平台。
- 用法:"Sierra 证明企业愿为 AI agent 付费——但你租的是其'解决'你无法审计、运行时你永远不拥有的 agent;ObjectStack 给你同样杠杆、作为你自托管基础设施上的开放元数据。"
- **文章价值:MEDIUM**。相邻,但高知名度挂钩(Taylor + $15.8B + 按结果)。新角度:"按结果定价是信任 IOU"——一个为自己成功计量的黑盒 agent 正是治理缺口。

### Zoho Creator — LOW–MEDIUM
- Zoho 生态内低/零代码;Deluge 脚本 + 内置 "Zia" AI。目标:SMB/中端公民开发者,价格敏感、常已在 Zoho 套件。
- 价格:便宜透明:Standard ~$8、Professional ~$20、Enterprise ~$25/用户/mo;免费档。AI/Zia 捆绑。
- 体量:私有;Zoho Corp FY2024 营收估 ~$1.4–1.5B、850,000+ 付费(整套件)。自举盈利。
- 治理弱点:封闭专有 SaaS 运行时;逻辑在 **Deluge**(专有不可移植)。无企业自托管。AI 是 Zoho 托管/套件捆绑。**与你企业治理楔子契合弱**——Zoho 买家不为可审 AI 生成企业软件失眠。
- 挖角:"Zoho Creator 便宜,是因为你在租 Zoho 云里的空间、用 Zoho 私有语言写;团队表单够用,但审计员问'谁能读和治理跑你业务的 AI'时就致命。"
- **文章价值:LOW–MEDIUM**。不同量级/买家;头对头像欺负小个子。重叠薄。

### Quickbase — MEDIUM
- 低代码运营/"工作管理"应用,自称 "AI 运营平台"。目标:中端运营/无桌面重(建筑/制造/现场)。IT 治理的公民开发。
- 价格:按用户报价、席位起步:Team $35/用户/mo(20 起,~$8,400/yr);Business $55/用户/mo(40 起,~$26,400/yr);Enterprise。
- 体量:**PE 拥有(Vista Equity,2019 多数股 ~$1B)。** 末次公开营收 ~$200M(2022);**12,000+ 组织。** 2025 推 "Pave"(全栈 AI 应用构建器)+ 扩 IT 治理(ALM)。
- 治理弱点:封闭专有云、**不能自托管**。应用逻辑不开放/不可移植;无开放本体/可导出元数据标准。"Pave" 跑在封闭平台内。**"治理"=封闭平台*内*的管理控制**,非你倡导的开放/可审/可移植治理。PE 所有=定价/路线图风险。
- 挖角:"Quickbase 卖你'治理',却不让你托管它或读应用——你的运营骨干活在它云里、作为你导不出的产物;ObjectStack 把同样的运营应用作为你自托管的开放元数据交付,治理意味着钥匙在你手里、不在厂商手里。"
- **文章价值:MEDIUM**。比 Zoho 更近你的定位(明以治理+IT 控制竞争),对比合法——但中端、且不以"AI 外挂"出名,缺 Pega 那种戏剧性。角度:"治理是谁的?封闭云'控制' vs 可自托管开放元数据治理。"

---

## 文章优先级排序

- **旗舰主稿(HIGH,新角度,合法对比)**:Palantir AIP("对成功征税")、Salesforce/Agentforce("三层税" TCO)、Power Platform(本批次,"仅 Azure + Dataverse 人质")、Pega("加密的 Blueprint")、ServiceNow(Now Assist 消耗转向 + 退出锁定)。
- **强力次要**:OutSystems("编译代码你仍带不走")+ Mendix("二进制 `.mpr` 你 diff 不了")最好合成一篇"高控低代码 leader vs 开放 AI-native";Builder.ai 是常青、有新闻钩的警世故事(**必须**纠正"700 工程师"谣言)。
- **诚实框架/小心**:Appian(别打"不能自托管",它能;打开放协议 vs 可自托管专有);Glean/Sierra(相邻品类,框架成"市场是真的、所有权/治理未解决");Zoho(最弱契合)。
- **两条发布前核对**:(1) Palantir 客户数核对 8-K;(2) 微软不单列 Power Platform 营收——$37B 是 AI 段 run-rate、非 Power Platform 数字。
