// The site's IndexNow key — the one place in the repository it is written.
//
// IndexNow (https://www.indexnow.org) lets a site push "these URLs changed" to
// the participating engines (Bing, Yandex, Seznam, Naver, …) instead of waiting
// for a crawl; Bing's index is what ChatGPT search and Copilot read, which is
// the GEO-first priority in AGENTS.md › Distribution & format (#456).
//
// The key is a PUBLIC value, not a secret: the protocol proves ownership by
// fetching `KEY_LOCATION` from this host and comparing its body to the key in
// the submission. Anyone can read it; it only lets a submitter name URLs on
// this host, which is all IndexNow ever does.
//
// Readers (keep them reading from here, never a copy):
//   * src/pages/[indexnowKey].txt.ts  — serves `/<key>.txt`, body = key
//   * scripts/indexnow-submit.mjs     — the post-deploy submission
//   * scripts/seo-smoke.mjs           — asserts the built key file
//
// Rotating the key: replace the value below and deploy. The old `/<old>.txt`
// stops being served with the same deploy, which is what revokes it.

/** 8–128 characters of `[a-zA-Z0-9-]`, per the IndexNow protocol. */
export const INDEXNOW_KEY = '11c1e9eafb79b16a886ece6edfc36830';

/** The production host submitted URLs belong to. */
export const INDEXNOW_HOST = 'www.objectos.ai';

/** Where the engines fetch the key to verify a submission. */
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

if (!/^[a-zA-Z0-9-]{8,128}$/.test(INDEXNOW_KEY)) {
  throw new Error(`INDEXNOW_KEY must be 8-128 chars of [a-zA-Z0-9-], got "${INDEXNOW_KEY}"`);
}
