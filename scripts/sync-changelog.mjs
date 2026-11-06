#!/usr/bin/env node
// Regenerates src/lib/changelog-data.ts, the release snapshot that
// /[lang]/changelog/ renders.
//
//   node scripts/sync-changelog.mjs [objectstackDir]
//
// objectstackDir is a local checkout of objectstack-ai/objectstack (or set
// OBJECTSTACK_DIR). Check out the commit to publish (normally origin/main)
// first: the snapshot names the checkout's HEAD as its source, so the release
// pages must be clean there.
//
// ─── Where the release notes live ──────────────────────────────────────────
//
// objectstack's RELEASE_NOTES.md is frozen. The current notes are one page
// per release under content/docs/releases/, in the order that directory's
// meta.json gives (newest first): a page per major for v9-v16 (v12.mdx), and
// a directory per line from v17 on (v17/17-7.mdx), whose own meta.json orders
// its pages. The overview pages (index.mdx at each level) and
// implementation-status are not releases.
//
// The objectstack docs app serves content/docs under /docs with the default
// locale unprefixed (apps/docs/lib/source.ts `baseUrl: '/docs'`,
// apps/docs/lib/i18n.ts `hideLocale: 'default-locale'`, English only), on
// objectstack.ai; docs.objectos.ai links the same pages there
// (content/docs/resources/changelog.mdx). So v17/17-7.mdx is
// https://objectstack.ai/docs/releases/v17/17-7.
//
// ─── What is read, and what is never made up ───────────────────────────────
//
// * version: the page's frontmatter `title` (v12.0.0 -> 12.0.0).
// * date: only a date the docs state. The pages state it in five forms (see
//   PAGE_DATES); a page that states none is looked up in the overview pages,
//   which list releases as "18.3.0, released 2026-11-03". A month-only
//   statement ("Released July 2026") stays a month. A release no page dates
//   gets `date: null`, and the page shows it undated. Two statements that
//   disagree stop the sync. `dateSource` names the docs page each date came
//   from.
// * highlights: the bold lead of each top-level bullet of the page's
//   "## Highlights" section (its first one, where a page has one per minor);
//   a page with no such section gives its "### " headings under its first
//   "## New ..." section instead. Lightly trimmed only: trailing punctuation,
//   a leading warning sign, list numbering and a trailing reference
//   parenthetical such as "(#2578)" or "(14.0.0, ADR-0090 D3)" are removed,
//   and Markdown links keep their text. Inline code keeps its backticks; the
//   page renders them as code.
//
// The site build never runs this and never reads the network: the generated
// file is committed, and re-running the sync is how it is refreshed.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { argv, env, exit } from 'node:process';
import yaml from 'js-yaml';
import { splitFrontmatter } from './lib/frontmatter.mjs';

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'src', 'lib', 'changelog-data.ts');
const DOCS_BASE = 'https://objectstack.ai/docs/';
const RELEASES = 'content/docs/releases';
const NOT_RELEASES = new Set(['index', 'implementation-status']);
const MAX_HIGHLIGHTS = 4;
const MIN_HIGHLIGHTS = 3;

const fail = (message) => {
  console.error(`sync-changelog: ${message}`);
  exit(1);
};

const source = argv[2] ?? env.OBJECTSTACK_DIR;
if (!source) fail('usage: node scripts/sync-changelog.mjs <objectstack checkout> (or set OBJECTSTACK_DIR)');
const dir = path.resolve(source);
const releasesDir = path.join(dir, RELEASES);
if (!existsSync(path.join(releasesDir, 'meta.json'))) fail(`${releasesDir}/meta.json not found; is ${dir} an objectstack checkout?`);

const git = (...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' }).trim();
const commit = git('rev-parse', 'HEAD');
const commitDate = git('log', '-1', '--format=%cI', 'HEAD');
if (git('status', '--porcelain', '--', RELEASES)) {
  fail(`${RELEASES} has uncommitted changes in ${dir}; the snapshot must be one commit's pages`);
}

const readMeta = (rel) => JSON.parse(readFileSync(path.join(releasesDir, rel, 'meta.json'), 'utf8')).pages;

// The release pages, newest first, as paths relative to content/docs/releases.
const pages = [];
for (const entry of readMeta('.')) {
  if (NOT_RELEASES.has(entry)) continue;
  const asDir = path.join(releasesDir, entry);
  if (existsSync(asDir) && statSync(asDir).isDirectory()) {
    for (const page of readMeta(entry)) if (!NOT_RELEASES.has(page)) pages.push(`${entry}/${page}`);
  } else {
    pages.push(entry);
  }
}

function readPage(rel) {
  const file = path.join(releasesDir, `${rel}.mdx`);
  if (!existsSync(file)) fail(`meta.json lists ${rel}, but ${RELEASES}/${rel}.mdx does not exist`);
  const split = splitFrontmatter(readFileSync(file, 'utf8'));
  if (!split.ok) fail(`${rel}.mdx: ${split.reason}`);
  const data = yaml.load(split.raw);
  if (!data || typeof data !== 'object') fail(`${rel}.mdx: frontmatter is not a mapping`);
  return { data, body: split.body };
}

// Prose with blockquote markers dropped and every run of whitespace one space,
// so a statement wrapped across lines (or inside a callout) still matches.
const flatten = (text) => text.replace(/^[ \t]*>[ \t]?/gm, '').replace(/\s+/g, ' ');
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ISO = '(\\d{4}-\\d{2}-\\d{2})';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function monthDate(text) {
  const m = new RegExp(`^(${MONTHS.join('|')})(?: (\\d{1,2}),)? (\\d{4})$`).exec(text);
  if (!m) return null;
  const month = String(MONTHS.indexOf(m[1]) + 1).padStart(2, '0');
  return m[2] ? `${m[3]}-${month}-${m[2].padStart(2, '0')}` : `${m[3]}-${month}`;
}

// The forms a release page states its own date in. Each is anchored on the
// page's own version or on a slot only that page's release fills, so a date
// the page gives for another release is never taken for this one.
const PAGE_DATES = [
  // v9, v12-v14: "**Released June 10, 2026.**", "**Released July 2026.**"
  (flat) => {
    const m = new RegExp(`\\*\\*Released ((?:${MONTHS.join('|')})(?: \\d{1,2},)? \\d{4})\\b`).exec(flat);
    return m && monthDate(m[1]);
  },
  // 17.1-17.7: "17.1.0 was published to the `latest` tag on **2026-08-20**"
  (flat, v) => new RegExp(`${escape(v)} was published to the \`latest\` tag on \\*\\*${ISO}\\*\\*`).exec(flat)?.[1],
  // v16: "16.0.0 is released.** It was published on 2026-07-21"
  (flat, v) => new RegExp(`${escape(v)} is released\\.\\*\\* It was published on ${ISO}`).exec(flat)?.[1],
  // 17.0, 18.0: the frontmatter description, "The v17 major cut, published 2026-08-14: ..."
  (_flat, _v, { description }) => new RegExp(`\\bpublished ${ISO}\\b`).exec(description ?? '')?.[1],
  // 18.1, 18.2: the release-facts table, "| Published | `@objectstack/cli@18.1.0` at 2026-10-24 09:06 UTC; ..."
  (_flat, _v, _data, body) => new RegExp(`^\\| Published \\|[^\\n]*?${ISO}`, 'm').exec(body)?.[1],
];

// The overview pages: "18.3.0, released 2026-11-03", "17.6.0 — published 2026-10-02".
const overviews = ['index', ...new Set(pages.filter((p) => p.includes('/')).map((p) => `${p.split('/')[0]}/index`))]
  .filter((rel) => existsSync(path.join(releasesDir, `${rel}.mdx`)))
  .map((rel) => ({ rel, flat: flatten(readPage(rel).body) }));

function findDate(rel, version, data, body) {
  const flat = flatten(body);
  const own = PAGE_DATES.map((read) => read(flat, version, data, body)).find(Boolean);
  const stated = overviews.flatMap(({ rel: overview, flat: text }) =>
    [...text.matchAll(new RegExp(`${escape(version)}\`?,? (?:— |- )?(?:released|published) (?:on )?${ISO}`, 'g'))].map((m) => ({
      date: m[1],
      overview,
    }))
  );
  for (const { date, overview } of stated) {
    const other = own ?? stated[0].date;
    if (date !== other && !other.startsWith(date) && !date.startsWith(other)) {
      fail(`${version}: ${own ? `${rel}.mdx` : stated[0].overview + '.mdx'} dates it ${other}, ${overview}.mdx dates it ${date}`);
    }
  }
  if (own) return { date: own, dateSource: `${RELEASES}/${rel}.mdx` };
  if (stated.length) return { date: stated[0].date, dateSource: `${RELEASES}/${stated[0].overview}.mdx` };
  return { date: null, dateSource: null };
}

function trim(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/^⚠️?\s*/u, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/\s*\[#[^\]]+\]$/, '')
    .replace(/\s*\((?=[^()]*(?:#\d|ADR-|\b\d+\.\d+\.\d+\b|\bP\d))[^()]*\)$/, '')
    .replace(/[\s.:;,—-]+$/, '')
    .trim();
}

// The H2 sections of a page body, fenced code excluded.
function sections(body) {
  const out = [];
  let fenced = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (!fenced && /^## /.test(line)) out.push({ heading: line.slice(3).trim(), lines: [] });
    else if (out.length) out.at(-1).lines.push(fenced ? '' : line);
  }
  return out;
}

function highlightsOf(rel, body) {
  const all = sections(body);
  const highlights = all.find((s) => /^Highlights\b/.test(s.heading));
  let items;
  if (highlights) {
    // Top-level bullets, each joined across its wrapped lines.
    const bullets = [];
    for (const line of highlights.lines) {
      if (/^[-*] /.test(line)) bullets.push(line.slice(2));
      else if (bullets.length && /^\s+\S/.test(line)) bullets[bullets.length - 1] += ` ${line.trim()}`;
      else if (line.trim() && !/^\s/.test(line)) bullets.push(null);
    }
    items = bullets
      .filter(Boolean)
      .map((text) => text.replace(/^⚠️?\s*/u, ''))
      .map((text) => /^\*\*(.+?)\*\*/.exec(text)?.[1] ?? null)
      .filter(Boolean);
  } else {
    const fresh = all.find((s) => /^New\b/.test(s.heading) && !/Console/.test(s.heading));
    items = (fresh?.lines ?? []).filter((line) => /^### /.test(line)).map((line) => line.slice(4));
  }
  const picked = items.map(trim).filter((text) => text.length >= 12).slice(0, MAX_HIGHLIGHTS);
  if (picked.length < MIN_HIGHLIGHTS) {
    fail(`${rel}.mdx: found ${picked.length} highlight(s), need ${MIN_HIGHLIGHTS}; the page has no "## Highlights" bullets or "## New ..." headings to take them from`);
  }
  return picked;
}

const releases = pages.map((rel) => {
  const { data, body } = readPage(rel);
  const version = String(data.title ?? '').replace(/^v/, '');
  if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`${rel}.mdx: title "${data.title}" is not a release version`);
  return {
    version,
    ...findDate(rel, version, data, body),
    highlights: highlightsOf(rel, body),
    url: `${DOCS_BASE}releases/${rel}`,
  };
});

const header = `// GENERATED by scripts/sync-changelog.mjs from objectstack-ai/objectstack
// ${RELEASES}/ — do not edit by hand; re-run the sync to refresh it.
import type { ChangelogSnapshot } from './changelog';

export const changelogSnapshot: ChangelogSnapshot = `;
writeFileSync(OUT, `${header}${JSON.stringify({ source: { repo: 'objectstack-ai/objectstack', commit, commitDate }, releases }, null, 2)};\n`);

const undated = releases.filter((r) => !r.date).map((r) => r.version);
console.log(`sync-changelog: ${releases.length} releases from ${commit.slice(0, 10)} -> ${path.relative(ROOT, OUT)}`);
if (undated.length) console.log(`sync-changelog: no release date stated in the docs for ${undated.join(', ')}; shown undated`);
