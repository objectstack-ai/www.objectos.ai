import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, localeSeg, type Locale } from '../../lib/i18n';
import { renderRss } from '../../lib/rss';

export const getStaticPaths: GetStaticPaths = () =>
  LOCALES.map((locale) => ({
    params: { lang: localeSeg(locale) },
    props: { locale },
  }));

export const GET: APIRoute = async ({ props, site }) => {
  const locale = props.locale as Locale;
  return new Response(await renderRss(locale, site), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
