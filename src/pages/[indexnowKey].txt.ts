import type { APIRoute, GetStaticPaths } from 'astro';
import { INDEXNOW_KEY } from '../../scripts/lib/indexnow.mjs';

// The IndexNow key file, `/<key>.txt`, whose whole body is the key (#456).
// The key itself lives only in scripts/lib/indexnow.mjs; this route builds the
// one static file from it. A non-HTML endpoint, so the sitemap never lists it
// (scripts/seo-smoke.mjs asserts both facts on the built file).
export const getStaticPaths: GetStaticPaths = () => [{ params: { indexnowKey: INDEXNOW_KEY } }];

export const GET: APIRoute = () =>
  new Response(INDEXNOW_KEY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
