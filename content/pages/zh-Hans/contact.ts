import type { ContactPage } from '../../../src/content-pages/types';
import {
  LEGAL_CONTACT,
  PRIVACY_CONTACT,
  SALES_CONTACT,
  SECURITY_CONTACT,
  SUPPORT_CONTACT,
} from '../../../src/lib/contact';

// /contact/（#397）：站点已公开的联系地址，按用途分组。地址全部取自
// src/lib/contact.ts 的常量，且都已在站内别处出现；公司名称与邮寄地址由模板
// 引自 src/lib/legal.ts。本页不承诺回复时限：已写明时限的页面（安全页、退款
// 政策）各自保留。
const page = {
  kind: 'contact',
  slug: 'contact',
  navLabel: '联系我们',
  title: '联系 ObjectOS：销售、支持、安全、隐私与法务',
  description:
    'ObjectOS 背后的公司 ObjectStack AI 的联系邮箱：销售与演示咨询，账户、账单与退款支持，安全漏洞报告，隐私请求，以及法律通知。',
  eyebrow: '联系我们',
  heroTitle: '把问题发给负责处理它的团队。',
  lead: '下面每个邮箱都由处理对应事务的同事负责。选与你的问题相符的那一个即可。',
  groups: [
    {
      id: 'sales',
      title: '销售与演示',
      body: '咨询 ObjectOS Enterprise 授权、批量定价，或为你的团队预约演示。',
      email: SALES_CONTACT,
    },
    {
      id: 'support',
      title: '技术支持',
      body: '账户、账单、退款或取消订阅的问题；如有订单号，请一并附上。',
      email: SUPPORT_CONTACT,
    },
    {
      id: 'security',
      title: '安全报告',
      body: '按照披露政策，报告 ObjectOS 或本站中疑似存在的安全漏洞。',
      email: SECURITY_CONTACT,
      links: [
        { label: '披露政策', href: '/en/security/#disclosure' },
        { label: 'security.txt', href: '/.well-known/security.txt' },
      ],
    },
    {
      id: 'privacy',
      title: '隐私',
      body: '隐私问题、与你的个人数据有关的请求，或数据处理附录（DPA）。',
      email: PRIVACY_CONTACT,
    },
    {
      id: 'legal',
      title: '法务',
      body: '法律通知，以及与服务条款有关的问题。',
      email: LEGAL_CONTACT,
    },
  ],
  company: {
    title: '公司信息与邮寄地址',
    nameLabel: '公司',
    addressLabel: '邮寄地址',
  },
} satisfies ContactPage;

export default page;
