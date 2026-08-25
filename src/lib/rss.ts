import { getPostsInLocale } from './posts';
import { blogPath, htmlLang, postPath, rssPath, ui, type Locale } from './i18n';
import { termLabel } from './terms';

const xmlEscape = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const absoluteUrl = (site: URL | string | undefined, path: string): string => {
  const base = site ? site.toString() : 'https://www.objectos.ai/';
  return new URL(path, base).toString();
};

export async function renderRss(
  locale: Locale,
  site: URL | string | undefined,
  feedPath = rssPath(locale)
): Promise<string> {
  const t = ui[locale];
  const posts = await getPostsInLocale(locale);
  const channelUrl = absoluteUrl(site, blogPath(locale));
  const feedUrl = absoluteUrl(site, feedPath);
  // `lastBuildDate` is "when the channel's content last changed", so a revision
  // counts even though it does not reorder the feed. `posts` is sorted by
  // `date`, so posts[0] is not necessarily the most recently *revised* post.
  const lastBuildDate =
    posts
      .map(({ entry }) => entry.data.updated ?? entry.data.date)
      .reduce<Date | null>((max, d) => (!max || d > max ? d : max), null) ?? new Date();

  const items = posts
    .map(({ slug, entry }) => {
      const data = entry.data;
      const url = absoluteUrl(site, postPath(locale, slug));
      const categories = [
        data.topic,
        data.audience,
        ...(data.solutions ?? []),
        ...(data.industries ?? []),
        ...data.tags,
      ];

      return [
        '<item>',
        `<title>${xmlEscape(data.title)}</title>`,
        `<link>${xmlEscape(url)}</link>`,
        `<guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        // RSS 2.0 `pubDate` means *first publication* and readers dedupe on
        // it — moving it on a typo fix re-notifies every subscriber. It stays
        // on `date`. RSS 2.0 has no revision element, so the revision is
        // reported with Atom's `<updated>` (namespace already declared below).
        `<pubDate>${data.date.toUTCString()}</pubDate>`,
        ...(data.updated
          ? [`<atom:updated>${data.updated.toISOString()}</atom:updated>`]
          : []),
        `<dc:creator>${xmlEscape(data.author)}</dc:creator>`,
        `<description>${xmlEscape(data.description)}</description>`,
        ...categories.map((category) =>
          `<category>${xmlEscape(termLabel(category, locale))}</category>`
        ),
        '</item>',
      ].join('');
    })
    .join('');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    `<title>${xmlEscape(`${t.articlesTitle} · ${t.siteName}`)}</title>`,
    `<link>${xmlEscape(channelUrl)}</link>`,
    `<atom:link href="${xmlEscape(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `<description>${xmlEscape(t.articlesLead(posts.length))}</description>`,
    `<language>${xmlEscape(htmlLang(locale))}</language>`,
    `<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>`,
    '<generator>Astro</generator>',
    items,
    '</channel>',
    '</rss>',
  ].join('');
}
