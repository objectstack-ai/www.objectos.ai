import type { ContactPage } from '../../../src/content-pages/types';
import {
  LEGAL_CONTACT,
  PRIVACY_CONTACT,
  SALES_CONTACT,
  SECURITY_CONTACT,
  SUPPORT_CONTACT,
} from '../../../src/lib/contact';

// /contact/ (#397): the site's public addresses, grouped by purpose. Every
// address is a constant in src/lib/contact.ts and already appears elsewhere on
// the site; the company name and mailing address are quoted from
// src/lib/legal.ts by the template. No response time is promised here: the
// pages that state one (the security page, the refund policy) keep it.
const page = {
  kind: 'contact',
  slug: 'contact',
  navLabel: 'Contact us',
  title: 'Contact ObjectOS: Sales, Support and Security',
  description:
    'Who to email at ObjectStack AI, the company behind ObjectOS: sales and demos, support and billing, security reports, privacy requests and legal notices.',
  eyebrow: 'Contact us',
  heroTitle: 'Write to the team that handles your request.',
  lead: 'Each address below goes to the people who handle that kind of request. Pick the one that matches yours.',
  groups: [
    {
      id: 'sales',
      title: 'Sales and demos',
      body: 'Ask about ObjectOS Enterprise licensing, volume pricing, or a demo for your team.',
      email: SALES_CONTACT,
    },
    {
      id: 'support',
      title: 'Support',
      body: 'Questions about your account, billing, a refund or a cancellation; include your order number if you have one.',
      email: SUPPORT_CONTACT,
    },
    {
      id: 'security',
      title: 'Security reports',
      body: 'Report a suspected vulnerability in ObjectOS or this site, following the disclosure policy.',
      email: SECURITY_CONTACT,
      links: [
        { label: 'Disclosure policy', href: '/en/security/#disclosure' },
        { label: 'security.txt', href: '/.well-known/security.txt' },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      body: 'Privacy questions, requests about your personal data, or a data processing addendum.',
      email: PRIVACY_CONTACT,
    },
    {
      id: 'legal',
      title: 'Legal',
      body: 'Legal notices and questions about the Terms of Service.',
      email: LEGAL_CONTACT,
    },
  ],
  company: {
    title: 'Company and mailing address',
    nameLabel: 'Company',
    addressLabel: 'Mailing address',
  },
} satisfies ContactPage;

export default page;
