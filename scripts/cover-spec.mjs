#!/usr/bin/env node
// Cover spec gate: a blog cover is read at card size (about 344px wide, a
// 1200-wide canvas drawn at under a third of its size), so it carries a title
// and little else. Every `cover*.svg` of a post dated on or after SPEC_FROM
// must keep to the spec the maintainer ruled on #340 (2026-11-02):
//
//   sizes   at most 2 font sizes
//   title   the largest text (the title) is at least 56px
//   min     no text under 28px
//   runs    at most 8 <text> runs
//   fills   at most 6 distinct fill colours (a gradient counts its stops)
//
//   node scripts/cover-spec.mjs                 (pnpm cover:spec; runs in `pnpm build`)
//   node scripts/cover-spec.mjs --report        every cover, dated or not, one row each; never fails
//   node scripts/cover-spec.mjs --report --verbose   …and every finding under its row
//   node scripts/cover-spec.mjs FILE.svg ...    these files, whatever their post's date
//
// Sizes are in canvas px, as the SVG sets them; every cover is drawn on a
// canvas 1200 to 1600 wide. A finding names the file, the rule, and the
// element (by line) that breaks it.
//
// Existing covers are grandfathered by their post's `date`, not by a list:
// a post first published before SPEC_FROM keeps its cover until the redo
// card replaces it, and `--report` prints what those covers would fail.
// The date is the post's frontmatter `date` (every locale of a post shares
// it); a post directory with no dated .mdx is not checked.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';
import yaml from 'js-yaml';
import { splitFrontmatter } from './lib/frontmatter.mjs';
import { Unsupported, coverInventory } from './lib/cover-inventory.mjs';

// A cover of a post dated on or after SPEC_FROM is held to the spec.
//
// Why 2026-11-17 and not the day this gate merged: the publish queue re-dates
// each queued post to its publish day, and the six posts queued when the gate
// landed (#260 11-04, #283 11-06, #263 11-09, #284 11-11, #280 11-13, #281
// 11-16) carry covers drawn before the spec. The last queued slot is 11-16,
// so the gate starts the day after; no new posts are being written until the
// queue ends (maintainer: 「暂时只发不写新的」).
//
// If a queued post slips past 11-16, either add a dated, named one-line entry
// for its slug to LATE_QUEUE below, or move SPEC_FROM. Do not redraw a cover
// to get it past the gate on its publish day.
export const SPEC_FROM = '2026-11-17';

// Queued posts allowed past SPEC_FROM with a pre-spec cover, one line each:
// { slug, date: the publish date it was re-dated to, reason }. An entry holds
// only while the post carries exactly that date, and an entry that matches no
// post at that date fails the gate, so the list cannot outlive the queue.
export const LATE_QUEUE = [];

export const SPEC = { maxSizes: 2, minTitle: 56, minSize: 28, maxRuns: 8, maxFills: 6 };

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const px = (n) => `${Math.round(n * 10) / 10}px`;
const quote = (s) => `"${s.length > 48 ? `${s.slice(0, 47)}…` : s}"`;
export const isCover = (name) => /^cover.*\.svg$/.test(name) && !name.endsWith('.dark.svg');

/** What one cover measures against each rule, for the --report row. */
export function specSummary(src) {
  const { texts, fills } = coverInventory(src);
  const sizes = [...new Set(texts.flatMap((t) => t.sizes))].sort((a, b) => b - a);
  return {
    runs: texts.length,
    sizes,
    title: sizes[0] ?? 0,
    under: texts.filter((t) => t.sizes.some((s) => s < SPEC.minSize)).length,
    fills: fills.length,
  };
}

/** Every finding the spec raises against one cover's source. */
export function specFindings(src) {
  const { texts, fills } = coverInventory(src);
  const findings = [];
  for (const t of texts) {
    const small = t.sizes.filter((s) => s < SPEC.minSize);
    if (small.length) {
      findings.push({ rule: 'min', line: t.line, message: `<text> ${quote(t.content)} is set at ${small.map(px).join(', ')}; no text may be under ${SPEC.minSize}px` });
    }
  }
  // Sizes in order of first use; the third and later are the offenders.
  const firstAt = new Map();
  for (const t of texts) for (const s of t.sizes) if (!firstAt.has(s)) firstAt.set(s, t);
  if (firstAt.size > SPEC.maxSizes) {
    const all = [...firstAt.keys()];
    for (const s of all.slice(SPEC.maxSizes)) {
      const t = firstAt.get(s);
      findings.push({ rule: 'sizes', line: t.line, message: `<text> ${quote(t.content)} adds a font size, ${px(s)}; the cover uses ${all.length} (${all.map(px).join(', ')}) and at most ${SPEC.maxSizes} are allowed` });
    }
  }
  const largest = texts.reduce((best, t) => (Math.max(...t.sizes) > (best ? Math.max(...best.sizes) : -1) ? t : best), null);
  if (!largest) findings.push({ rule: 'title', line: 1, message: `the cover has no text, so no title of at least ${SPEC.minTitle}px` });
  else if (Math.max(...largest.sizes) < SPEC.minTitle) {
    findings.push({ rule: 'title', line: largest.line, message: `the largest text, <text> ${quote(largest.content)} at ${px(Math.max(...largest.sizes))}, is the title and must be at least ${SPEC.minTitle}px` });
  }
  if (texts.length > SPEC.maxRuns) {
    const t = texts[SPEC.maxRuns];
    findings.push({ rule: 'runs', line: t.line, message: `${texts.length} <text> runs, at most ${SPEC.maxRuns}; run ${SPEC.maxRuns + 1} is ${quote(t.content)}` });
  }
  if (fills.length > SPEC.maxFills) {
    for (const f of fills.slice(SPEC.maxFills)) {
      findings.push({ rule: 'fills', line: f.line, message: `<${f.tag}> adds fill colour ${f.color}; the cover paints ${fills.length} (${fills.map((x) => x.color).join(' ')}) and at most ${SPEC.maxFills} are allowed` });
    }
  }
  return findings.sort((a, b) => a.line - b.line);
}

/** The post's first-publication date (YYYY-MM-DD) from any dated .mdx in its directory. */
async function postDate(dir, entries) {
  const dates = [];
  for (const name of entries.filter((n) => n.endsWith('.mdx'))) {
    const split = splitFrontmatter(await readFile(path.join(dir, name), 'utf8'));
    if (!split.ok) continue;
    const data = yaml.load(split.raw);
    const d = data && typeof data === 'object' ? data.date : undefined;
    if (d instanceof Date) dates.push(d.toISOString().slice(0, 10));
    else if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}/.test(d)) dates.push(d.slice(0, 10));
  }
  return dates.sort()[0];
}

async function covers() {
  const out = [];
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    const names = entries.filter((e) => e.isFile()).map((e) => e.name);
    const found = names.filter(isCover);
    if (found.length) {
      const date = await postDate(dir, names);
      for (const name of found) out.push({ file: path.join(dir, name), date });
    }
    for (const e of entries) if (e.isDirectory()) await walk(path.join(dir, e.name));
  };
  await walk(BLOG);
  return out.sort((a, b) => a.file.localeCompare(b.file));
}

async function main() {
  const args = argv.slice(2);
  const report = args.includes('--report');
  const verbose = args.includes('--verbose');
  const named = args.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));
  const all = named.length ? named.map((file) => ({ file, date: null })) : await covers();
  const slugOf = (file) => path.basename(path.dirname(file));
  const late = (c) => LATE_QUEUE.some((e) => e.slug === slugOf(c.file) && e.date === c.date);
  const checked = named.length || report ? all : all.filter((c) => c.date && c.date >= SPEC_FROM && !late(c));
  const excused = named.length || report ? 0 : all.filter((c) => c.date && c.date >= SPEC_FROM && late(c)).length;
  const grandfathered = all.length - checked.length - excused;
  const staleLate = named.length || report ? [] : LATE_QUEUE.filter((e) => !all.some((c) => slugOf(c.file) === e.slug && c.date === e.date));

  const lines = [], errors = [];
  const byRule = {};
  let failing = 0;
  if (report) {
    lines.push(`spec: runs <= ${SPEC.maxRuns} · sizes <= ${SPEC.maxSizes} · title >= ${SPEC.minTitle}px · runs under ${SPEC.minSize}px = 0 · fills <= ${SPEC.maxFills}`);
    lines.push(['cover', 'date', 'runs', 'sizes (px)', 'title', 'under', 'fills', 'broken'].join('\t'));
  }
  for (const { file, date } of checked) {
    let findings, src;
    try {
      src = await readFile(file, 'utf8');
      findings = specFindings(src);
    } catch (err) {
      if (!(err instanceof Unsupported)) throw err;
      errors.push(`${rel(file)}: ${err.message} (the gate cannot read this cover)`);
      continue;
    }
    if (findings.length) failing++;
    const broken = [...new Set(findings.map((f) => f.rule))];
    for (const r of broken) byRule[r] = (byRule[r] ?? 0) + 1;
    if (report) {
      const m = specSummary(src);
      lines.push([rel(file), date ?? '-', m.runs, m.sizes.map((s) => Math.round(s * 10) / 10).join('/'), m.title, m.under, m.fills, broken.join(',') || 'ok'].join('\t'));
      if (verbose) for (const f of findings) lines.push(`  :${f.line}  [${f.rule}] ${f.message}`);
      continue;
    }
    for (const f of findings) lines.push(`${rel(file)}:${f.line}  [${f.rule}] ${f.message}`);
  }
  const rules = Object.entries(byRule).map(([r, n]) => `${r} ${n}`).join(', ');
  const rulesNote = rules ? ` (covers breaking each rule: ${rules})` : '';
  if (report) {
    for (const l of lines) console.log(l);
    for (const e of errors) console.log(e);
    console.log(`cover-spec --report: ${failing} of ${checked.length} covers break the spec${rulesNote}; ${errors.length} unreadable. Report only: nothing fails.`);
    return;
  }
  for (const l of lines) console.error(l);
  for (const e of errors) console.error(e);
  for (const e of staleLate) console.error(`LATE_QUEUE entry for ${e.slug} (${e.date}) matches no post with a cover dated ${e.date}; remove it`);
  const scope = named.length ? `${checked.length} named cover${checked.length === 1 ? '' : 's'}` : `${checked.length} cover${checked.length === 1 ? '' : 's'} of posts dated on or after ${SPEC_FROM}, ${grandfathered} grandfathered by date${excused ? `, ${excused} excused by LATE_QUEUE` : ''}`;
  if (failing || errors.length || staleLate.length) {
    console.error(`cover-spec: FAIL — ${failing} cover${failing === 1 ? ' breaks' : 's break'} the spec${rulesNote}, ${errors.length} unreadable, ${staleLate.length} stale LATE_QUEUE entr${staleLate.length === 1 ? 'y' : 'ies'} (${scope}). Spec: at most ${SPEC.maxSizes} font sizes, title at least ${SPEC.minTitle}px, nothing under ${SPEC.minSize}px, at most ${SPEC.maxRuns} <text> runs, at most ${SPEC.maxFills} fill colours.`);
    exit(1);
  }
  console.log(`cover-spec: OK — ${scope}`);
}

if (import.meta.url === pathToFileURL(argv[1] ?? '').href) await main();
