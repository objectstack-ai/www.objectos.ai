import type { APIRoute } from 'astro';
import { getPostsInLocale } from '../lib/posts';
import {
  blogPath,
  homePath,
  postPath,
  privacyPath,
  pricingPath,
  securityPath,
  termsPath,
  LOCALES,
  type Locale,
} from '../lib/i18n';
import { CLUSTERS, clusterPath } from '../lib/clusters';
import { clusterCopy } from '../lib/cluster-i18n';
import { getMarketingPages, marketingPagePath } from '../content-pages/registry';
import {
  getGlossaryTerms,
  glossaryIndexPath,
  glossaryTermPath,
} from '../glossary/registry';
import { glossaryUi } from '../glossary/ui';

const absoluteUrl = (site: URL | string | undefined, path: string): string => {
  const base = site ? site.toString() : 'https://www.objectos.ai/';
  return new URL(path, base).toString();
};

async function postLines(locale: Locale, site: URL | undefined): Promise<string[]> {
  const posts = await getPostsInLocale(locale);
  return posts.map(
    ({ slug, entry }) =>
      `- [${entry.data.title}](${absoluteUrl(site, postPath(locale, slug))}): ${entry.data.description}`
  );
}

/**
 * Definitions are the highest-value payload this file can carry: a glossary
 * entry is a self-contained sentence an answer engine can lift verbatim. Each
 * line is `term -> URL -> one-sentence definition`, preceded by the index.
 */
function glossaryLines(locale: Locale, site: URL | undefined): string[] {
  const ui = glossaryUi(locale);
  return [
    `- [${ui.indexTitle}](${absoluteUrl(site, glossaryIndexPath(locale))}): ${ui.indexLead}`,
    ...getGlossaryTerms(locale).map(
      (term) =>
        `- [${term.term}](${absoluteUrl(site, glossaryTermPath(locale, term.slug))}): ${term.definition}`
    ),
  ];
}

export const GET: APIRoute = async ({ site }) => {
  const englishPosts = await postLines('en', site);
  const chinesePosts = await postLines('zh-Hans', site);
  const lines = [
    '# ObjectOS',
    '',
    '> ObjectStack is the open target format and runtime for AI-written enterprise software; ObjectOS is the commercial production platform where teams build, review, deploy, and operate ObjectStack applications.',
    '',
    'ObjectStack (Apache 2.0) keeps the whole application — data model, UI, workflows, permissions, APIs, and AI tools — as portable typed definitions in your own repository. A complete CRM stays under 150k tokens — business logic under 100k, with UI adding about 50k — so an AI agent can read and reason about the whole system in one context window. Strict TypeScript, Zod schemas, and a validation gate catch structural mistakes before deployment; the open ObjectStack runtime then derives the database, REST API, UI, and MCP server from the validated definitions, and enforces permissions and audit on every call. In the open-source edition, you bring your own coding agent and MCP client, author metadata as source files, and review changes as diffs. ObjectOS is the commercial production platform for the same ObjectStack applications: teams use in-app AI Build and Ask, human approvals, SSO, managed deployment, and operational controls on Cloud and Enterprise, in our cloud or customer-controlled infrastructure.',
    '',
    '## Primary Pages',
    '',
    `- [Home](${absoluteUrl(site, homePath('en'))}): Commercial production platform for building, reviewing, deploying, and operating ObjectStack applications.`,
    ...getMarketingPages('en').map(
      (page) => `- [${page.navLabel}](${absoluteUrl(site, marketingPagePath('en', page.slug))}): ${page.description}`
    ),
    `- [Security](${absoluteUrl(site, securityPath('en'))}): Data residency, permissions, approvals, audit logs, and self-hosted deployment boundaries.`,
    `- [Pricing](${absoluteUrl(site, pricingPath('en'))}): Open-source ObjectStack and ObjectOS Cloud and Enterprise plans.`,
    `- [Glossary](${absoluteUrl(site, glossaryIndexPath('en'))}): One-sentence definitions of the vocabulary this site uses, each linked to the pages and articles that apply it.`,
    `- [Articles](${absoluteUrl(site, blogPath('en'))}): Practical writing on AI-native software, enterprise AI agents, integration, modernization, and governance.`,
    `- [Documentation](https://docs.objectos.ai/): Product and developer documentation.`,
    '',
    '## Glossary',
    '',
    ...glossaryLines('en', site),
    '',
    '## Simplified Chinese Glossary',
    '',
    ...glossaryLines('zh-Hans', site),
    '',
    '## Topic Cluster Pages',
    '',
    ...LOCALES.flatMap((locale) =>
      CLUSTERS.map((cluster) => {
        const copy = clusterCopy(cluster, locale);
        return `- [${copy.title}](${absoluteUrl(site, clusterPath(locale, cluster.slug))}): ${copy.description}`;
      })
    ),
    '',
    '## English Articles',
    '',
    ...englishPosts,
    '',
    '## Simplified Chinese Articles',
    '',
    ...chinesePosts,
    '',
    '## Policies',
    '',
    `- [Terms](${absoluteUrl(site, termsPath('en'))})`,
    `- [Privacy](${absoluteUrl(site, privacyPath('en'))})`,
    '',
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
