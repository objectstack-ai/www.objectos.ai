import type { APIRoute } from 'astro';
import { renderRss } from '../lib/rss';

export const GET: APIRoute = async ({ site }) =>
  new Response(await renderRss('en', site, '/rss.xml'), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
