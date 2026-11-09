#!/usr/bin/env node
// Read-only probe of the live site after a production deploy.
//
// `.github/workflows/cloudflare-pages.yml` runs this in its `probe` job, after
// `Build and deploy` has published `dist/` on a push to `main`. CI gates the
// deploy (check, content:lint, build, seo:smoke) but nothing else reads the
// live site afterwards; this is that read. It is deliberately narrow:
//
//   * read-only — plain GETs, no rollback, no redeploy, no cache purge;
//   * not a merge gate — it runs in its own job on `push` only, so a failure
//     marks that run red and opens an issue, and never blocks a merge;
//   * no secret — the issue is opened with the job's own `GITHUB_TOKEN`.
//
// ─── What is probed ────────────────────────────────────────────────────────
//
// Each target must answer HTTP 200 (after redirects) and carry a marker that
// only the right page has. The markers are absolute `https://www.objectos.ai`
// URLs because the build bakes `site` into every canonical link and sitemap
// entry; `--base-url` changes where the probe fetches, never what it expects.
//
//   /                    canonical link = SITE/en/   (the language redirect page)
//   /en/                 canonical link = SITE/en/
//   /zh-Hans/            canonical link = SITE/zh-Hans/
//   /sitemap-index.xml   lists SITE/sitemap-0.xml
//   /sitemap-0.xml       lists the newest post's URL
//   newest post          canonical link = its own URL
//
// ─── How the newest post is derived ────────────────────────────────────────
//
// From the content collection of the checked-out commit, not from the clock or
// the live site: `readNewestPost` in scripts/lib/post-dates.mjs picks the
// first item of `/rss.xml` (equally, the first "Latest Articles" card on
// `/en/blog/`) — English, `status: published`, `date` descending, ties broken
// by slug descending — with the same id derivation the build uses.
// The job checks out the same SHA the deploy job built, so this is a URL that
// deploy must have published. When that commit added a post, its 200 also
// proves the new build is live rather than a stale one.
//
// ─── Usage ─────────────────────────────────────────────────────────────────
//
//   node scripts/post-deploy-probe.mjs [options]
//
//   --base-url URL     where to fetch (default https://www.objectos.ai; env
//                      PROBE_BASE_URL). Point it at a local server of dist/.
//   --attempts N       rounds before giving up (default 6)
//   --interval S       seconds between rounds (default 20): the CDN
//                      propagation window. Only failing targets are retried.
//   --timeout S        per-request timeout in seconds (default 15)
//   --list             print the targets and exit without fetching
//   --open-issue       on failure, open an issue labelled `site` with `gh`
//                      (needs GH_TOKEN and GITHUB_REPOSITORY)
//   --dry-run          with --open-issue: print the issue it would open and
//                      the `gh` command, and do not run `gh`
//
// Exit codes: 0 every target passed; 1 a target still failed after the last
// round; 2 a usage or configuration error (nothing was probed).

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { argv, env, exit } from 'node:process';
import { readNewestPost } from './lib/post-dates.mjs';

const SITE = 'https://www.objectos.ai';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const ISSUE_LABEL = 'site';

const CANONICAL = /<link rel="canonical" href="([^"]*)"/;

/** A target whose page must name `href` as its canonical link. */
function canonicalTarget(path, href = `${SITE}${path}`) {
  return {
    path,
    expect: `canonical link = ${href}`,
    check: (body) => {
      const found = CANONICAL.exec(body)?.[1];
      return found === href ? null : `canonical link is ${found ? found : 'missing'}`;
    },
  };
}

/** A target whose body must contain `needle` verbatim. */
function containsTarget(path, needle, expect) {
  return {
    path,
    expect,
    check: (body) => (body.includes(needle) ? null : `does not contain ${expect.replace(/^lists /, '')}`),
  };
}

/** The probe list for a given newest post path ("/en/blog/<slug>/"). */
export function buildTargets(newestPostPath) {
  return [
    canonicalTarget('/', `${SITE}/en/`),
    canonicalTarget('/en/'),
    canonicalTarget('/zh-Hans/'),
    containsTarget(
      '/sitemap-index.xml',
      `<loc>${SITE}/sitemap-0.xml</loc>`,
      `lists ${SITE}/sitemap-0.xml`
    ),
    containsTarget(
      '/sitemap-0.xml',
      `<loc>${SITE}${newestPostPath}</loc>`,
      `lists ${SITE}${newestPostPath}`
    ),
    canonicalTarget(newestPostPath),
  ];
}

/** Fetch one target once. Never throws; a network error is a result too. */
async function probeOnce(baseUrl, target, timeoutMs) {
  const url = new URL(target.path, baseUrl).toString();
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'cache-control': 'no-cache', 'user-agent': 'objectos-post-deploy-probe' },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const body = await response.text();
    if (response.status !== 200) {
      return { url, status: response.status, problem: `HTTP ${response.status}, expected 200` };
    }
    const problem = target.check(body);
    return { url, status: 200, problem };
  } catch (error) {
    const reason = error?.cause?.code ?? error?.name ?? 'error';
    return { url, status: null, problem: `request failed (${reason}: ${error?.message ?? error})` };
  }
}

/**
 * Probe every target, retrying only the failing ones for `attempts` rounds.
 * Returns the last result per target, in target order.
 */
export async function probe({ baseUrl, targets, attempts, intervalMs, timeoutMs, log = console.log }) {
  const results = new Map();
  let pending = targets;
  for (let round = 1; round <= attempts && pending.length > 0; round += 1) {
    if (round > 1) {
      log(`… ${pending.length} target(s) failing; retrying in ${intervalMs / 1000}s (round ${round}/${attempts})`);
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    const outcomes = await Promise.all(pending.map((target) => probeOnce(baseUrl, target, timeoutMs)));
    pending.forEach((target, index) => results.set(target.path, { ...outcomes[index], round }));
    pending = pending.filter((target) => results.get(target.path).problem);
  }
  return targets.map((target) => ({ ...results.get(target.path), expect: target.expect }));
}

/** Text that goes into a GitHub issue: no angle-bracket shapes, no pipes in cells. */
function cell(text) {
  return String(text).replace(/[<>]/g, '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
}

/** The issue title and body for a failed probe. */
export function renderIssue({ failures, results, baseUrl, newest, attempts, intervalMs, runUrl, sha }) {
  const short = sha ? sha.slice(0, 7) : 'unknown commit';
  const title = `Post-deploy probe failed: ${failures.length} URL(s) on ${new URL(baseUrl).host} (${short})`;
  const lines = [
    `The read-only post-deploy probe could not confirm the live site after the production deploy of ${sha ? `\`${sha}\`` : 'an unknown commit'}.`,
    '',
    `- Deploy run: ${runUrl ?? 'not available (run outside GitHub Actions)'}`,
    `- Probed: ${baseUrl}`,
    `- Retry window: ${attempts} round(s), ${intervalMs / 1000}s apart; only failing URLs were retried.`,
    `- Newest post (from the content collection at this commit): ${newest.path}`,
    '',
    '## Failing URLs',
    '',
    '| URL | Status | Problem | Expected |',
    '|:--|:--|:--|:--|',
    ...failures.map((r) => `| ${cell(r.url)} | ${r.status ?? 'no response'} | ${cell(r.problem)} | ${cell(r.expect)} |`),
    '',
    '## All probed URLs',
    '',
    '| URL | Status | Result | Round |',
    '|:--|:--|:--|--:|',
    ...results.map(
      (r) => `| ${cell(r.url)} | ${r.status ?? 'no response'} | ${r.problem ? 'FAIL' : 'ok'} | ${r.round} |`
    ),
    '',
    '## What this is not',
    '',
    'No rollback was attempted: the deploy stays live as published. This probe is not a merge gate; it only reads the site and reports.',
    'Re-run the `Post-deploy probe` job on the run above to re-check, or reproduce locally with `node scripts/post-deploy-probe.mjs`.',
  ];
  return { title, body: `${lines.join('\n')}\n` };
}

function parseArgs(args) {
  const options = {
    baseUrl: env.PROBE_BASE_URL || SITE,
    attempts: 6,
    intervalSeconds: 20,
    timeoutSeconds: 15,
    list: false,
    openIssue: false,
    dryRun: false,
  };
  const number = (flag, value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) throw new Error(`${flag} needs a non-negative number, got ${value}`);
    return parsed;
  };
  for (let i = 0; i < args.length; i += 1) {
    const flag = args[i];
    const value = () => {
      if (i + 1 >= args.length) throw new Error(`${flag} needs a value`);
      i += 1;
      return args[i];
    };
    switch (flag) {
      case '--base-url': options.baseUrl = value(); break;
      case '--attempts': options.attempts = Math.max(1, Math.floor(number(flag, value()))); break;
      case '--interval': options.intervalSeconds = number(flag, value()); break;
      case '--timeout': options.timeoutSeconds = number(flag, value()); break;
      case '--list': options.list = true; break;
      case '--open-issue': options.openIssue = true; break;
      case '--dry-run': options.dryRun = true; break;
      default: throw new Error(`unknown argument: ${flag}`);
    }
  }
  try {
    options.baseUrl = new URL(options.baseUrl).toString();
  } catch {
    throw new Error(`--base-url is not a URL: ${options.baseUrl}`);
  }
  return options;
}

async function main() {
  let options;
  let newest;
  try {
    options = parseArgs(argv.slice(2));
    newest = readNewestPost(ROOT, 'en');
    if (!newest) throw new Error('content/blog has no published English post to probe');
  } catch (error) {
    console.error(`post-deploy-probe: ${error.message}`);
    return 2;
  }

  const targets = buildTargets(newest.path);
  console.log(`post-deploy-probe: ${targets.length} targets on ${options.baseUrl}`);
  console.log(`newest post: ${newest.path} (date ${newest.date.toISOString().slice(0, 10)}, from content/blog)`);
  if (options.list) {
    for (const target of targets) console.log(`  ${target.path}  — ${target.expect}`);
    return 0;
  }

  const intervalMs = options.intervalSeconds * 1000;
  const results = await probe({
    baseUrl: options.baseUrl,
    targets,
    attempts: options.attempts,
    intervalMs,
    timeoutMs: options.timeoutSeconds * 1000,
  });
  for (const r of results) {
    console.log(`${r.problem ? 'FAIL' : 'ok  '} ${r.status ?? '---'} ${r.url}${r.problem ? `  — ${r.problem}` : ''}`);
  }

  const failures = results.filter((r) => r.problem);
  if (failures.length === 0) {
    console.log(`post-deploy-probe: PASS — ${results.length}/${results.length} targets`);
    return 0;
  }
  console.log(`post-deploy-probe: FAIL — ${failures.length}/${results.length} targets failing after ${options.attempts} round(s)`);

  if (!options.openIssue) return 1;
  const runUrl =
    env.GITHUB_SERVER_URL && env.GITHUB_REPOSITORY && env.GITHUB_RUN_ID
      ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`
      : undefined;
  const { title, body } = renderIssue({
    failures,
    results,
    baseUrl: options.baseUrl,
    newest,
    attempts: options.attempts,
    intervalMs,
    runUrl,
    sha: env.GITHUB_SHA,
  });
  const ghArgs = ['issue', 'create', '--title', title, '--label', ISSUE_LABEL, '--body-file', '-'];
  if (env.GITHUB_REPOSITORY) ghArgs.splice(2, 0, '--repo', env.GITHUB_REPOSITORY);

  if (options.dryRun) {
    console.log(`\n--dry-run: would run: gh ${ghArgs.map((a) => (/\s/.test(a) ? JSON.stringify(a) : a)).join(' ')}`);
    console.log(`--- issue title ---\n${title}\n--- issue body ---\n${body}--- end ---`);
    return 1;
  }
  const gh = spawnSync('gh', ghArgs, { input: body, encoding: 'utf8' });
  if (gh.status === 0) {
    console.log(`post-deploy-probe: opened ${gh.stdout.trim()}`);
  } else {
    // The run is already failing; say why the issue is missing and keep the body
    // in the log so the report is not lost with it.
    console.error(`post-deploy-probe: gh issue create failed (exit ${gh.status}): ${gh.stderr || gh.error?.message}`);
    console.error(`--- issue body ---\n${body}--- end ---`);
  }
  return 1;
}

if (argv[1] && fileURLToPath(import.meta.url) === path.resolve(argv[1])) {
  exit(await main());
}
