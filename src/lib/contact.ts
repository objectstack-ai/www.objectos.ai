import { LOCALES, type Locale } from './i18n';
import { SECURITY_CONTACT } from './security';

/**
 * The /contact/ page, per locale (#397). Every "contact" CTA on the site reads
 * this constant — the Enterprise pricing card, the footer's "Contact us" entry
 * and the home page's closing CTA — so the landing can later change (a booking
 * link, say) on one page instead of on every button. Same pattern as
 * `CLOUD_SIGNUP_URL` in `positioning.ts`.
 *
 * The path is `marketingPagePath(locale, 'contact')`; it is spelled out here
 * because the contact page's own content files import this module, and the
 * marketing registry imports those files. `src/pages/[lang]/[cluster].astro`
 * fails the build if the two ever differ.
 */
export const CONTACT_URL: Record<Locale, string> = Object.fromEntries(
  LOCALES.map((locale) => [locale, `/${locale}/contact/`])
) as Record<Locale, string>;

/**
 * The public addresses, by purpose. Each one is already named elsewhere on the
 * site; /contact/ gathers them and adds none:
 * - sales@: the Enterprise "contact sales" address, the one the public licence
 *   page (docs.objectos.ai/docs/resources/license) names for Enterprise and
 *   OEM terms;
 * - support@: accounts, billing, refunds and cancellations (the Refund Policy);
 * - security@: `SECURITY_CONTACT`, kept in `security.ts` with security.txt;
 * - privacy@: privacy requests and data processing addenda (the Privacy Policy);
 * - legal@: legal notices and questions about the Terms.
 */
export const SALES_CONTACT = 'sales@objectstack.ai';
export const SUPPORT_CONTACT = 'support@objectstack.ai';
export const PRIVACY_CONTACT = 'privacy@objectstack.ai';
export const LEGAL_CONTACT = 'legal@objectstack.ai';
export { SECURITY_CONTACT };
