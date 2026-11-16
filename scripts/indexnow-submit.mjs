#!/usr/bin/env node
// Push the URLs one production deploy added, changed or removed to IndexNow.
//
// `.github/workflows/cloudflare-pages.yml` runs this in its `indexnow` job,
// after `Build and deploy` has published `dist/` on a push to `main` (#456).
// Like the `probe` job it is not a merge gate: it runs in its own job on
// `push` only, so a failure marks that run red and never blocks a merge or the
// required check `Build and deploy`. The key is public (scripts/lib/indexnow.mjs).
//
// ─── Which URLs count as "changed in this deploy" ──────────────────────────
//
// IndexNow asks for changed URLs only, never the whole sitemap on every push.
// The set is the union of two sources, each of which can be missing:
//
//   1. Sitemap diff — the baseline is the live sitemap, snapshotted by the
//      deploy job immediately BEFORE `wrangler pages deploy` (`--snapshot`);
//      the new side is the `dist/` sitemap that deploy published. Yields:
//        added    a <loc> only in the new sitemap (a new post, page, locale)
//        removed  a <loc> only in the baseline (deleted, redirected, or now
//                 noindexed) — submitted so engines recrawl and drop it
//        revised  a <loc> in both whose <lastmod> moved. Only blog posts carry
//                 lastmod (`updated ?? date`, scripts/lib/post-dates.mjs), so
//                 a post counts as revised exactly when AGENTS.md's `updated`
//                 rule says it was substantively revised; a typo fix is not.
//   2. Git diff `--git-base..--git-head` (github.event.before..github.sha),
//      for the page classes with no lastmod: marketing pages, glossary terms
//      and translated cluster pages, whose content files map one-to-one to a
//      URL. Kept only if that URL is in the new sitemap, so a noindexed
//      locale fallback is never submitted. If the baseline is unavailable,
//      changed blog-post files are mapped the same way as a fallback.
//
// Not covered, on purpose: a change under `src/` (a layout, a component, the
// English cluster copy) touches many URLs at once without changing what any
// one page is about; resubmitting hundreds of URLs for a CSS fix is the noise
// IndexNow asks sites not to send. Those pages are still found via the sitemap.
//
// ─── Usage ─────────────────────────────────────────────────────────────────
//
//   node scripts/indexnow-submit.mjs [options]
//
//   --snapshot DIR   fetch the live sitemap index and its sitemaps into DIR,
//                    then exit (the deploy job's pre-deploy baseline)
//   --prev SRC       baseline sitemaps: a directory holding sitemap-index.xml
//                    or a base URL (default https://www.objectos.ai — the live
//                    site, which is the right baseline for a LOCAL dry run)
//   --next SRC       this deploy's sitemaps (default dist/)
//   --git-base REF   git diff base; all-zeros or unknown = git source skipped
//   --git-head REF   git diff head (default HEAD)
//   --dry-run        print the URL list and the payload size; do not POST
//   --timeout S      per-request timeout in seconds (default 20)
//
// Exit codes: 0 submitted (200/202) or nothing to submit; 1 the submission
// failed, the key file is not served, or neither source was available;
// 2 a usage error.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXNOW_HOST, INDEXNOW_KEY, INDEXNOW_KEY_LOCATION } from './lib/indexnow.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = `https://${INDEXNOW_HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10_000; // the protocol's per-request maximum
const USER_AGENT = 'objectos-site-indexnow/1.0';

// ─── CLI ───────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { prev: SITE, next: path.join(ROOT, 'dist'), gitHead: 'HEAD', timeout: 20 };
  const valued = { '--snapshot': 'snapshot', '--prev': 'prev', '--next': 'next', '--git-base': 'gitBase', '--git-head': 'gitHead', '--timeout': 'timeout' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') opts.dryRun = true;
    else if (arg in valued) {
      const value = argv[++i];
      if (value === undefined || value.startsWith('--')) usage(`${arg} needs a value`);
      opts[valued[arg]] = value;
    } else usage(`unknown option ${arg}`);
  }
  opts.timeout = Number(opts.timeout);
  if (!(opts.timeout > 0)) usage('--timeout must be a positive number of seconds');
  return opts;
}

function usage(message) {
  console.error(`indexnow-submit: ${message}\nSee the header of scripts/indexnow-submit.mjs for options.`);
  process.exit(2);
}

// ─── Sitemaps ──────────────────────────────────────────────────────────────

const isUrl = (src) => /^https?:\/\//.test(src);

async function fetchText(url, timeout) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(timeout * 1000) });
  if (!res.ok) throw new Error(`GET ${url} answered ${res.status}`);
  return res.text();
}

const locsOf = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(([, loc]) => loc);

/** The child sitemap file names an index lists, e.g. ["sitemap-0.xml"]. */
function childNames(indexXml) {
  const names = locsOf(indexXml).map((loc) => new URL(loc).pathname.replace(/^\//, ''));
  if (names.length === 0) throw new Error('sitemap-index.xml lists no sitemaps');
  for (const name of names) {
    if (!/^[\w.-]+\.xml$/.test(name)) throw new Error(`unexpected sitemap path in index: ${name}`);
  }
  return names;
}

/**
 * Read `sitemap-index.xml` and every sitemap it lists from a directory or a
 * base URL. Returns the raw files (for `--snapshot`) keyed by file name.
 */
async function readSitemapFiles(src, timeout) {
  const read = isUrl(src)
    ? (name) => fetchText(new URL(name, src.endsWith('/') ? src : `${src}/`).toString(), timeout)
    : async (name) => {
        const file = path.join(src, name);
        if (!existsSync(file)) throw new Error(`${file} does not exist`);
        return readFileSync(file, 'utf8');
      };
  const files = new Map([['sitemap-index.xml', await read('sitemap-index.xml')]]);
  for (const name of childNames(files.get('sitemap-index.xml'))) files.set(name, await read(name));
  return files;
}

/** Map of <loc> -> <lastmod> ('' when absent) across every child sitemap. */
function entriesOf(files) {
  const entries = new Map();
  for (const [name, xml] of files) {
    if (name === 'sitemap-index.xml') continue;
    for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = body.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
      if (!loc) continue;
      entries.set(loc, body.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1] ?? '');
    }
  }
  if (entries.size === 0) throw new Error('the sitemaps list no <url> entries');
  return entries;
}

// ─── Git ───────────────────────────────────────────────────────────────────

function git(args) {
  const run = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  return run.status === 0 ? run.stdout : null;
}

/** Files changed between two commits, or null when the range is unusable. */
function changedFiles(base, head) {
  if (!base) return { files: null, reason: 'no --git-base given' };
  if (/^0+$/.test(base)) return { files: null, reason: `--git-base is all zeros (first push of a ref)` };
  for (const ref of [base, head]) {
    if (git(['cat-file', '-e', `${ref}^{commit}`]) === null) {
      return { files: null, reason: `commit ${ref} is not in this checkout (shallow clone or force-push)` };
    }
  }
  // Only the two trees are needed, never the history between them, so this
  // works in a depth-1 checkout once both commits are fetched. --no-renames:
  // a rename is reported as delete + add, so both paths are mapped.
  const out = git(['diff', '--name-only', '--no-renames', base, head, '--', 'content']);
  if (out === null) return { files: null, reason: `git diff ${base} ${head} failed` };
  return { files: out.split('\n').filter(Boolean), reason: null };
}

/**
 * URL paths a content file feeds. zh-Hant is generated from zh-Hans
 * (scripts/gen-zh-hant.mjs and the runtime converter), so a zh-Hans change
 * also names the zh-Hant URL. The caller keeps only paths in the sitemap.
 */
function pathsForFile(file, { includePosts }) {
  const withHant = (locale, rest) =>
    locale === 'zh-Hans' ? [`/${locale}/${rest}`, `/zh-Hant/${rest}`] : [`/${locale}/${rest}`];
  let m;
  if ((m = file.match(/^content\/pages\/([^/]+)\/([\w-]+)\.ts$/))) return withHant(m[1], `${m[2]}/`);
  if ((m = file.match(/^content\/clusters\/([^/]+)\/([\w-]+)\.ts$/))) return withHant(m[1], `${m[2]}/`);
  if ((m = file.match(/^content\/glossary\/([^/]+)\/([\w-]+)\.ts$/))) return withHant(m[1], `glossary/${m[2]}/`);
  if (includePosts && (m = file.match(/^content\/blog\/([\w-]+)\/index(?:\.([\w-]+))?\.mdx$/))) {
    return withHant(m[2] ?? 'en', `blog/${m[1]}/`);
  }
  return [];
}

// ─── Submission ────────────────────────────────────────────────────────────

async function keyIsServed(timeout) {
  try {
    const body = await fetchText(INDEXNOW_KEY_LOCATION, timeout);
    return body.trim() === INDEXNOW_KEY ? { ok: true } : { ok: false, why: 'body is not the key' };
  } catch (error) {
    return { ok: false, why: error.message };
  }
}

async function post(urlList, timeout) {
  const body = JSON.stringify({ host: INDEXNOW_HOST, key: INDEXNOW_KEY, keyLocation: INDEXNOW_KEY_LOCATION, urlList });
  for (let attempt = 1; ; attempt += 1) {
    let status;
    let text = '';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'User-Agent': USER_AGENT },
        body,
        signal: AbortSignal.timeout(timeout * 1000),
      });
      status = res.status;
      text = (await res.text()).slice(0, 500);
    } catch (error) {
      text = error.message;
    }
    // 200 = accepted; 202 = accepted, key validation pending.
    if (status === 200 || status === 202) return { ok: true, status };
    const retryable = status === undefined || status === 429 || status >= 500;
    if (!retryable || attempt === 3) return { ok: false, status, text };
    console.log(`  attempt ${attempt} got ${status ?? 'a network error'}; retrying in ${attempt * 10}s`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 10_000));
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────

const opts = parseArgs(process.argv.slice(2));

if (opts.snapshot) {
  const files = await readSitemapFiles(SITE, opts.timeout).catch((error) => {
    console.error(`indexnow-submit: could not snapshot the live sitemaps: ${error.message}`);
    process.exit(1);
  });
  mkdirSync(opts.snapshot, { recursive: true });
  for (const [name, xml] of files) writeFileSync(path.join(opts.snapshot, name), xml);
  console.log(`Snapshot of ${SITE}: ${[...files.keys()].join(', ')} (${entriesOf(files).size} URLs) -> ${opts.snapshot}`);
  process.exit(0);
}

const next = entriesOf(await readSitemapFiles(opts.next, opts.timeout).catch((error) => {
  console.error(`indexnow-submit: cannot read this deploy's sitemaps from ${opts.next}: ${error.message}`);
  process.exit(1);
}));

let prev = null;
let prevWhy = null;
try {
  prev = entriesOf(await readSitemapFiles(opts.prev, opts.timeout));
} catch (error) {
  prevWhy = error.message;
}

const { files: gitFiles, reason: gitWhy } = changedFiles(opts.gitBase, opts.gitHead);

console.log(`IndexNow submission for ${INDEXNOW_HOST}${opts.dryRun ? ' (dry run)' : ''}`);
console.log(`  new sitemap:  ${opts.next} (${next.size} URLs)`);
console.log(`  baseline:     ${prev ? `${opts.prev} (${prev.size} URLs)` : `UNAVAILABLE — ${prevWhy}`}`);
console.log(`  git range:    ${gitFiles ? `${opts.gitBase}..${opts.gitHead} (${gitFiles.length} content files changed)` : `UNAVAILABLE — ${gitWhy}`}`);

if (!prev && !gitFiles) {
  console.error('indexnow-submit: neither the sitemap baseline nor the git range is available, so the changed set is unknown. Submitting nothing.');
  process.exit(1);
}

/** @type {Map<string, string>} url -> why it is submitted */
const reasons = new Map();
const add = (url, why) => { if (!reasons.has(url)) reasons.set(url, why); };

if (prev) {
  for (const [loc, lastmod] of next) {
    if (!prev.has(loc)) add(loc, 'added');
    else if (prev.get(loc) !== lastmod) add(loc, `revised (lastmod ${prev.get(loc) || 'none'} -> ${lastmod || 'none'})`);
  }
  for (const loc of prev.keys()) if (!next.has(loc)) add(loc, 'removed');
}
if (gitFiles) {
  for (const file of gitFiles) {
    for (const urlPath of pathsForFile(file, { includePosts: !prev })) {
      const url = `${SITE}${urlPath}`;
      if (next.has(url)) add(url, `content changed (${file})`);
    }
  }
}

const urlList = [...reasons.keys()].sort();
const counts = {};
for (const why of reasons.values()) {
  const kind = why.split(' ')[0] === 'content' ? 'content-changed' : why.split(' ')[0];
  counts[kind] = (counts[kind] ?? 0) + 1;
}
console.log(`\n${urlList.length} URL(s) to submit${urlList.length ? ` — ${Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(', ')}` : ''}:`);
for (const url of urlList) console.log(`  ${url}  [${reasons.get(url)}]`);

if (urlList.length === 0) {
  console.log('\nNothing changed for IndexNow in this deploy; no request sent.');
  process.exit(0);
}

const batches = [];
for (let i = 0; i < urlList.length; i += BATCH) batches.push(urlList.slice(i, i + BATCH));

const key = await keyIsServed(opts.timeout);
if (opts.dryRun) {
  console.log(`\nDry run: would POST ${batches.length} request(s) to ${ENDPOINT}`);
  console.log(`  body: {"host":"${INDEXNOW_HOST}","key":"${INDEXNOW_KEY}","keyLocation":"${INDEXNOW_KEY_LOCATION}","urlList":[…${urlList.length}]}`);
  console.log(`  key file live: ${key.ok ? 'yes' : `NO — ${key.why} (a real run would stop here)`}`);
  process.exit(0);
}

// A 202 means "accepted, key not yet validated": the engine checks the key
// later and silently drops the batch if it fails. Checking first turns that
// silent drop into a red job.
if (!key.ok) {
  console.error(`\nindexnow-submit: ${INDEXNOW_KEY_LOCATION} is not served correctly (${key.why}); not submitting.`);
  process.exit(1);
}

let failed = false;
for (const [i, batch] of batches.entries()) {
  const result = await post(batch, opts.timeout);
  if (result.ok) console.log(`\nBatch ${i + 1}/${batches.length}: ${batch.length} URL(s) accepted (HTTP ${result.status}).`);
  else {
    failed = true;
    console.error(`\nBatch ${i + 1}/${batches.length}: rejected (HTTP ${result.status ?? 'no response'}): ${result.text}`);
  }
}
process.exit(failed ? 1 : 0);
