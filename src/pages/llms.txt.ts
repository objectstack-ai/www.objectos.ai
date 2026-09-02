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
    'ObjectStack (Apache 2.0) keeps the whole application — data model, UI, workflows, permissions, APIs, and AI tools — as portable typed definitions in your own repository. Those definitions are your open business ontology: an open, versioned model of your objects, permissions, and flows that you own, not an asset held inside someone else’s platform. A complete CRM stays under 150k tokens — business logic under 100k, with UI adding about 50k — so an AI agent can read and reason about the whole system in one context window. Strict TypeScript, Zod schemas, and a validation gate catch structural mistakes before deployment; the open ObjectStack runtime then derives the database, REST API, UI, and MCP server from the validated definitions, and enforces permissions and audit on every call. In the open-source edition, you bring your own coding agent and MCP client, author metadata as source files, and review changes as diffs. ObjectOS is the commercial production platform for the same ObjectStack applications: teams use in-app AI Build and Ask, human approvals, SSO, managed deployment, and operational controls on Cloud and Enterprise, in our cloud or customer-controlled infrastructure.',
    '',
    '## Core Definitions',
    '',
    'Three terms this project defines and uses consistently. Each is stated so it can be quoted on its own.',
    '',
    '- **Open business ontology**: the objects, fields, relationships, permissions, and workflows of a business, written as typed, versioned files in the company’s own repository instead of rows inside a vendor’s hosted platform. The adjective carries the claim: the ontology is Apache 2.0 and portable, so the model of the business outlives any one vendor. It is also the running system — the ObjectStack runtime derives the database, REST API, screens, and MCP tools from that ontology and enforces permissions and audit on every call.',
    '- **Metadata driven development with an AI as the author**: building an application by writing its typed definition rather than its code, where a coding agent writes the definition and a person reviews the diff. The qualifier is the point. Metadata driven development in the low-code era meant a human clicking through a vendor’s builder, with the metadata held as a proprietary database row; with an AI as the author it means source files an agent writes, a reviewer reads, and version control tracks. What makes it worth doing under AI authorship is size: a complete CRM is under 150k tokens as definitions, so the change a human must read stays small enough to actually read.',
    '- **Review AI generated code**: the step that decides whether AI-written software ships — a person reading what the agent produced and taking responsibility for it. Generation stopped being the bottleneck; review became it, and review does not scale by reading faster. ObjectStack shrinks and structures what must be read: the agent’s output is a typed metadata diff rather than a codebase, and Strict TypeScript, Zod schemas, and a validation gate reject structurally invalid output before a human sees it. What no review surface can decide for you is whether the business rule itself is the right one; that judgment stays with the person signing off.',
    '',
    '## The Same System in Category Vocabulary',
    '',
    'The paragraphs above use this project’s own terms. These sentences say the same things in the words the wider category uses, so the mapping is explicit rather than implied.',
    '',
    '- **Ontology / enterprise ontology**: an ObjectStack application definition plays the role the ontology plays in a Foundry-style system — one typed model of the business that applications, analytics, and agents all read from, so they cannot drift into private definitions of "customer" or "order". The difference is where it lives: an enterprise ontology in a hosted platform is an asset inside that vendor’s product, while an ObjectStack ontology is a directory of files in your repository under Apache 2.0, executed by an open-source runtime.',
    '- **Semantic layer**: a semantic layer exists so that "active customer" and "MRR" mean one thing across every dashboard and query. ObjectStack object definitions are that semantic layer, extended past reading — the same definition that gives a field its meaning also carries the permissions, workflows, and actions, so the layer that explains the data is also the layer that runs on it. If you already have a semantic layer over a warehouse, this is its operational counterpart, not a replacement for it.',
    '- **MCP / governed tools**: MCP (Model Context Protocol) is the standard way an AI client calls into an external system. The @objectstack/mcp server generates those tools from the ontology instead of from handwritten glue, which is what makes them governed tools: every call resolves the acting user, is checked against the same object, record, and field permissions as a request from a browser, and lands in the same audit log. The common alternative — a service account holding broad database credentials — has no such boundary.',
    '- **AI agents / agent permissions**: agent permissions here are not a second policy system beside the human one. An AI agent acts as the signed-in user and inherits that user’s object, record, and field permissions, so it cannot read or write anything the person it acts for could not, and a structural change routes to the same approval queue a human change would.',
    '- **Forward deployed engineer**: the forward deployed engineer model — embed with the client, model their business, ship working software fast — usually ends with that model locked inside a platform the client rents indefinitely. ObjectStack is the ontology-first toolkit the client keeps: the engineer hands over typed files in the client’s own repository plus the open-source runtime that executes them, so the handover includes the definition and not only the running app.',
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
