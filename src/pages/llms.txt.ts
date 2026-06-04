import type { APIRoute } from 'astro';
import { getPostsInLocale } from '../lib/posts';
import {
  blogPath,
  homePath,
  postPath,
  privacyPath,
  securityPath,
  termsPath,
  LOCALES,
  type Locale,
} from '../lib/i18n';
import { CLUSTERS, clusterPath } from '../lib/clusters';
import { clusterCopy } from '../lib/cluster-i18n';

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

export const GET: APIRoute = async ({ site }) => {
  const englishPosts = await postLines('en', site);
  const chinesePosts = await postLines('zh-Hans', site);
  const lines = [
    '# ObjectOS',
    '',
    '> ObjectOS is an AI-native enterprise application platform for connecting existing data, applications, workflows, and AI agents through a governed business object layer.',
    '',
    'ObjectOS helps teams model business objects, generate application structure, connect existing systems, and let AI agents operate inside enterprise permission boundaries.',
    '',
    '## Primary Pages',
    '',
    `- [Home](${absoluteUrl(site, homePath('en'))}): AI-native enterprise application platform overview.`,
    `- [Security](${absoluteUrl(site, securityPath('en'))}): Data residency, permissions, approvals, audit logs, and self-hosted deployment boundaries.`,
    `- [Articles](${absoluteUrl(site, blogPath('en'))}): Practical writing on AI-native software, enterprise AI agents, integration, modernization, and governance.`,
    `- [Documentation](https://docs.objectos.ai/): Product and developer documentation.`,
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
