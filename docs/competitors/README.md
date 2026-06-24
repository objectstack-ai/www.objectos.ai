# ObjectStack 竞品研究档案 (Competitive Research)

> 调研日期:2026-06-24。这是内部参考档案(不进 `content/blog/`、不进 sitemap)。
> 数字尽量多源核实;无法核实者标注"未核实/自报"。发布任何对外文章前,先看本目录的"防翻车护栏"。

## 这是什么

对约 50 个低代码 / 零代码 / AI 在线开发 / 多维表格 / 企业 aPaaS / Agent 平台的系统评估,全部用同一把尺子衡量——**ObjectStack 的治理楔子**:

> AI 写 → 人审一个小 diff → 运行时强制 **对象 / 记录 / 字段 / 动作** 级权限 + 审批 + 审计;应用核心是**可读、可私有化、可迁移的开放元数据**,而不是不透明代码或封闭黑盒;**连接现有系统**(CRM/ERP/DB)而非强制迁移。

一句话定位:**人人都能让 AI 生成 App;ObjectStack 是 AI 生成的软件"落地后仍然可治理"的地方。**

## 目录

- [ai-app-builders.md](./ai-app-builders.md) — AI 应用生成 / vibe coding / AI IDE(Lovable, v0, Bolt, Replit, Cursor, Windsurf, Base44, Riff, Create.xyz, Tempo, Famous.ai, a0.dev, Subframe)
- [nocode-lowcode-internal-tools.md](./nocode-lowcode-internal-tools.md) — 无代码/低代码 + 内部工具(Bubble, Glide, Softr, Adalo, FlutterFlow, Webflow, WeWeb, Retool, Budibase, Appsmith, ToolJet, DronaHQ, Xano, Backendless)
- [database-workspace.md](./database-workspace.md) — 多维表格 / 工作区(Airtable, Notion, SmartSuite, Baserow, NocoDB, Teable, Grist, Rows, Coda, APITable/Vika, Stackby, Knack, Ninox)
- [enterprise-apaas-agents.md](./enterprise-apaas-agents.md) — 企业 aPaaS / 本体 / 企业 Agent(Palantir, Salesforce Agentforce, Power Platform, ServiceNow, Pega, OutSystems, Mendix, Appian, Glean, Sierra, Zoho Creator, Quickbase, Builder.ai)
- [china-market.md](./china-market.md) — 中国市场(飞书多维表格, 钉钉宜搭, 明道云, 简道云, 腾讯微搭, 轻流, 得帆, ClickPaaS, 织信, 氚云, 维格表, 黑帕云, 速融云 + 国产 AI 编程 agent)

每个平台用统一的 8 字段简报:是什么 / 目标用户 / 价格 / 体量 / 核心优势 / 治理弱点 / 挖角话术 / 文章价值。

## 贯穿全局的一条结论

**没有任何一家做到"AI 改动 = 上线前可审阅的小 diff + 审批 + 运行时强制权限/审计"的闭环。** 它们最好的也只是事后 `undo` / 版本历史,而不是上线前的人审 diff。这对 Airtable Omni、Notion Agents、Retool AI、SmartSuite Field Agents、各家"一句话生成应用"全部成立——这是 ObjectStack 唯一最干净、最可防御的差异点。

次级差异化(按对手分段使用):
- **开放可读元数据** vs 不透明代码(vibe coding)/ 封闭配置(低代码)/ 专有 blob(Pega `.mpr`、Mendix `.mpr`)。
- **连接而非迁移**(connect-don't-migrate)vs 数据孤岛(多维表格类几乎全是孤岛)。
- **可自托管 + 信创** vs 仅云(Airtable/Notion/Power Platform/ServiceNow 都不能私有化)。
- **不对成功征税**(自托管运行时)vs 按动作/按席位/按消耗叠加计费(Agentforce、AIP、Now Assist、Copilot Studio credits)。

## 文章优先级(英文旗舰)

| 档 | 对手 | 角度 | 状态 |
|---|---|---|---|
| **S** | Airtable / Omni | "diff vs undo":Omni 靠 undo 上线、不能私有化、字段权限粗 | 已有概念稿,缺治理对决 → **本批次第 1 篇** |
| **S** | Retool | "治访问 ≠ 治逻辑":逻辑是散落 JS,没人当 diff 审 | 全新,ICP 最重合 → **本批次第 2 篇** |
| **S** | Lovable | "生产可用吗?":CVE-2025-48757 + 170+ 应用泄露 PII | 全新 → **本批次第 3 篇** |
| **S** | Replit Agent | "当 AI 删了生产库":运行时护栏 | 全新 → **本批次第 4 篇** |
| **S** | Microsoft Power Platform | "Azure-only + Dataverse 人质 + 2026.1 涨价" | 全新 → **本批次第 5 篇** |
| **S★** | Salesforce Agentforce | 三层计费 TCO 拆解(~$900/天) | 已有 [beyond-agentforce] + [enterprise-agent-true-cost],TCO 角度待写 |
| **S★** | Palantir AIP | "对成功征税":token 计费 + 150% 净留存 + AI 替你写本体 | 已有 ontology 两篇,AIP 成本角度待写 |
| **A** | Bubble / FlutterFlow / Bolt / Base44 / ServiceNow / Mendix / Pega / SmartSuite / Notion | 各有一个"冒烟的枪",见各文件 | 全新 |
| **B** | 开源 Airtable 替代(Teable/Grist/NocoDB/Baserow)、开源 Retool(Budibase/Appsmith/ToolJet)做组合稿 | 全新 |

> 本批次实际产出:Airtable、Retool、Lovable、Replit、Power Platform 五篇英文 + 八语言。其余为后续路线图。

## 中文专版优先级

中国市场用一把不同的尺子:**私有化 / 信创 / 数据主权 / 避免巨头生态锁定**。这是英文对手吃不到的增量战场。

High:飞书多维表格、钉钉宜搭(避开"不能私有化")、明道云、简道云、腾讯微搭、轻流、得帆、ClickPaaS、维格表/APITable。详见 [china-market.md](./china-market.md)。

## 防翻车护栏(发布前必读)

1. **别说"它们没权限/不安全"** —— Retool、Replit(SOC2)、v0/Vercel、Cursor/Windsurf、Budibase/Appsmith/ToolJet/Backendless、SmartSuite、Grist、Ninox、明道云、简道云、得帆 **都有真 RBAC + 审计**。统一攻击面是:AI 改动无可审 diff + 治理高度(字段/动作级运行时强制)+ 开放可读元数据。
2. **别用"锁定/带不走"打能导出代码的** —— Tempo、Create.xyz、Famous.ai、FlutterFlow(部分)、Cursor/Windsurf。改打"不透明代码你得永远自己维护 + 无运行时治理"。
3. **别用"不能私有化"打** —— 钉钉宜搭、得帆、织信、明道云、Appian、Mendix(运行时可多云移植)、Budibase/Appsmith、Grist、Teable、Baserow、NocoDB。
4. **Notion** 别说它没结构,要打"连一列都无法单独隐藏"。
5. **Cursor / Windsurf** 不要做 "vs" 稿(它们是 AI IDE、产物是你自己仓库里的透明代码,正面对打=稻草人)。
6. **Builder.ai** 必须纠正"AI 其实是 700 个印度工程师"谣言(基本不实;真正搞垮它的是财务造假),否则自损公信力。

## 关键数字更正(易被内容农场带偏)

- **Glide**:只有 $20M A 轮(Benchmark, 2022)+ ~$3.7M ARR;"$400M B 轮/$520M 估值"系编造。
- **FlutterFlow**:**未被谷歌收购**;Google(GV/Gradient)是投资方;$25.5M A 轮 @ ~$170M(2024.1),~$25M ARR。
- **Retool**:总融资 ~$141M @ $3.2B;$120M ARR(2025.10)。
- **Xano**:总融资 ~$15.4M(非 $26M/2021)。
- **Backendless**:完全自举($0 外部融资)。
- **轻流** 才是腾讯系(非奥哲/氚云;氚云/云枢绑定阿里/钉钉)。
- **黑帕云** 已于 2022 关停(字节系投资,先收人后关停)。
- **Airtable** 估值:2021 年 $11.7B;二级市场 2025 末已被砍到约 $4B。
- **Builder.ai**:2025.5 破产(Chapter 7),SDNY/FBI 调查;"700 工程师"是谣言,真因是财务造假。
- **Rows**:被 Superhuman 收购,**2026.5.31 关停**。
- **Coda**:现属 Superhuman(原 Grammarly)。
