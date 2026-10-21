import type { MarketingPage } from '../../../src/content-pages/types';
import { positioning } from '../../../src/lib/positioning';

const p = positioning['zh-Hans'];

const page = {
    slug: 'trust-center',
    navLabel: '信任中心',
    title: 'ObjectOS 信任中心：受治理 AI 应用的安全评审',
    description:
      '审阅 ObjectOS 信任模型：数据驻留、自托管部署、身份、权限、审批、审计日志、AI 工具边界与企业安全评审材料。',
    eyebrow: '信任中心',
    heroTitle: 'AI 能写软件。更难的问题是：你敢不敢批准它。',
    lead:
      `ObjectOS 为演示成功之后的采购、安全与 IT 评审而设计。${p.e1}无论哪个版本，Agent 的权限都在元数据与运行时执行中保持显式。`,
    primary: { label: '阅读安全模型', href: '/en/security/' },
    secondary: { label: '查看部署路径', href: '/en/pricing/' },
    metrics: [
      { value: '两种版本', label: '托管在 ObjectOS Cloud，或以 ObjectOS Enterprise 自管部署在你自己的基础设施上' },
      { value: '用户级', label: 'Agent 继承登录用户的权限' },
      { value: '可审计', label: '读、写、工具调用、审批与 schema 变更' },
    ],
    artifact: {
      eyebrow: '安全评审材料包',
      title: '签核之前，评审者应该拿到什么',
      body:
        '一个受治理的 AI 应用应当带着架构边界、对象权限图、审批策略、审计计划、集成清单、模型路由与回滚方案一起到达。ObjectStack 元数据的结构化设计，让这些材料可以从同一份源定义生成。',
      steps: [
        '部署边界：运行时、数据库、文件、身份与模型分别跑在哪里。',
        '权限图：对象、记录、字段、流程、动作与 AI 工具的权限。',
        '审计计划：对人、Agent、API 与审批分别记录什么。',
        '变更计划：元数据变更如何评审、晋级与回滚。',
      ],
    },
    sections: [
      {
        id: 'boundaries',
        eyebrow: '边界',
        title: '敏感业务数据留在受控基础设施内',
        copy:
          '在 ObjectOS 企业版中——从其单节点入门选项商业版自管（Business Self-Managed）起——运行时、业务数据、用户身份、审计日志、文件与密钥都在你自己的基础设施内；除非你显式配置外部服务，它们都留在这个边界内。ObjectOS Cloud 由我们运营。',
        items: [
          {
            title: '数据驻留',
            body: '在 ObjectOS 企业版中，连接你自己的数据库与存储：业务记录、身份、审计日志与文件都存放在那里，而不是供应商的工作区。',
          },
          {
            title: '许可证校验',
            body: '自管部署的 ObjectOS 在线校验许可证（企业版离线许可证可离线校验）。开源 ObjectStack 运行时没有遥测、不查许可证、也不检查更新。',
          },
          {
            title: '模型可选',
            body: '按工作流与部署的敏感程度选用云端模型、私有端点或本地模型。',
          },
        ],
      },
      {
        id: 'authority',
        eyebrow: '权限',
        title: 'AI 通过受治理的工具行动，而不是裸数据库访问',
        copy:
          '在 AI 工具读写数据之前，运行时会先评估身份、角色、行级规则、字段规则、审批策略与动作契约。',
        items: [
          {
            title: '继承登录用户',
            body: 'AI 看到的就是用户能看到的，行动也不越出用户权限——除非显式配置了经批准的服务角色。',
          },
          {
            title: '敏感写入先审批',
            body: '退款、合同变更、升级、导出、权限更新这类高风险动作，都可以要求人工批准。',
          },
          {
            title: '字段级控制',
            body: '敏感字段可以隐藏、只读、脱敏，或从 AI 工具暴露中排除——即便记录本身可见。',
          },
        ],
      },
    ],
    table: {
      columns: ['评审领域', '现已可用', '企业版材料包'],
      rows: [
        ['部署', '自托管开源 ObjectStack 运行时', 'VPC、私有网络、隔离部署说明'],
        ['身份', '项目身份与权限元数据；SSO / SAML 从 ObjectOS 商业版起', 'SCIM 与身份生命周期、管理员角色、会话策略映射'],
        ['AI 治理', 'MCP 工具、对象权限、审批', '模型路由策略与提示词/数据边界报告'],
        ['审计', '运行时审计设计与元数据评审', '可导出的审计留存与调查工作流'],
      ],
    },
    checklistTitle: '安全评审清单',
    checklist: [
      '每类业务数据分别存放在哪里？',
      '哪些模型端点会收到提示词或检索出的记录？',
      '哪些对象、字段与动作暴露给了 AI 工具？',
      '哪些写入需要人工批准？',
      '审计中如何区分用户动作与 Agent 动作？',
      '一次糟糕的元数据变更如何回滚？',
    ],
    faqs: [
      {
        question: 'ObjectOS 会用客户数据训练模型吗？',
        answer:
          '如果你启用 AI 功能或连接模型提供商，为完成请求，提示词、上下文、客户数据和输出可能会发送给所选提供商。除非客户明确同意或单独协议明确允许，我们不会使用付费云服务中的客户数据训练通用模型。以隐私政策为准。',
      },
      {
        question: 'ObjectOS 能在无互联网环境运行吗？',
        answer:
          '能。ObjectOS 企业版可在自托管或隔离环境中运营 ObjectStack 运行时。具体方式取决于包镜像、模型路由、身份系统与客户基础设施。',
      },
    ],
  } satisfies MarketingPage;

export default page;
