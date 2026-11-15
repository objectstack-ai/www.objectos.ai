#!/usr/bin/env node
// Cover spec gate, v2 (#430, ruled by the maintainer 2026-11-14; it replaces
// the cover part of the #340 ruling, "the title is at least 56px"). A blog
// cover carries no title: the title lives in the page, and the cover is one
// mechanism picture in line art on the post's topic tint, read at card size
// (about 344px wide). The style page is docs/cover-style.md. Every
// `cover*.svg` of a post dated on or after SPEC_FROM must keep to:
//
//   runs    at most 1 <text> run (a cover with no text passes)
//   chars   at most 8 characters in that run (a code token such as dryRun)
//   sizes   at most 1 font size
//   min     no text under 28px
//   fills   at most 6 distinct fill colours, ground and white included
//           (a gradient counts its stops; strokes are not counted)
//   ground  the ground (the first rect covering the canvas) is the post's
//           topic tint, light value (scripts/lib/cover-colors.mjs TOPIC_TINTS)
//
// and every such post has one cover for all its locales (there is no text to
// translate; the page's <img alt> carries the localized title):
//
//   shared  every locale's frontmatter `cover` is ./cover.svg, and the folder
//           holds no other cover file (no cover-en.svg, no cover.png)
//
// `pnpm build` also fails when src/layouts/Base.astro and TOPIC_TINTS
// disagree on a topic tint (`topicTintDrift`).
//
//   node scripts/cover-spec.mjs                 (pnpm cover:spec; runs in `pnpm build`)
//   node scripts/cover-spec.mjs --report        every cover, dated or not, one row each; never fails
//   node scripts/cover-spec.mjs --report --verbose   …and every finding under its row
//   node scripts/cover-spec.mjs FILE.svg ...    these files, whatever their post's date
//   node scripts/cover-spec.mjs --topic=SLUG FILE.svg ...   …with this topic's ground
//
// A named file's topic is read from the .mdx files beside it (index.mdx
// first); with none, `--topic` supplies it, and without either the ground rule
// is skipped and the summary says so. The `shared` rule runs for a named file
// whose folder holds .mdx files.
//
// Sizes are in canvas px, as the SVG sets them; every cover is drawn on a
// canvas 1200 to 1600 wide. A finding names the file, the rule, and the
// element (by line) that breaks it.
//
// Existing covers are grandfathered by their post's `date`, not by a list:
// a post first published before SPEC_FROM keeps its cover (and its
// cover/cover-en pair) until the redo card replaces it, and `--report` prints
// what those covers would fail. The date is the post's frontmatter `date`
// (every locale of a post shares it); a post directory with no dated .mdx is
// not checked.
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';
import yaml from 'js-yaml';
import { splitFrontmatter } from './lib/frontmatter.mjs';
import { Unsupported, coverInventory } from './lib/cover-inventory.mjs';
import { TOPIC_TINTS, topicTintDrift } from './lib/cover-colors.mjs';

// A cover of a post dated on or after SPEC_FROM is held to the spec.
//
// Why 2026-11-17 and not the day this gate merged: the publish queue re-dates
// each queued post to its publish day, and the six posts queued when the gate
// landed (#260 11-04, #283 11-06, #263 11-09, #284 11-11, #280 11-13, #281
// 11-16) carry covers drawn before the spec. The last queued slot is 11-16,
// so the gate starts the day after; no new posts are being written until the
// queue ends (maintainer: 「暂时只发不写新的」). v2 (#430) keeps the date: the
// first post under it is the 11-18 slot.
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

// maxFills is measured, not guessed: the six final sample covers the
// maintainer approved on #430 paint 4 to 6 fill colours each (the most is the
// anonymous-form cover: ground, ink, the indigo hero and its offset tint,
// white slots, green fields). Strokes are not counted: line art is ink, and
// red appears only as a stroke (a refused path and its stop bar).
export const SPEC = { maxRuns: 1, maxChars: 8, maxSizes: 1, minSize: 28, maxFills: 6 };

/** The one cover file a post dated on or after SPEC_FROM uses, in every locale. */
export const SHARED_COVER = 'cover.svg';

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const BASE = path.join(ROOT, 'src', 'layouts', 'Base.astro');
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const px = (n) => `${Math.round(n * 10) / 10}px`;
const quote = (s) => `"${s.length > 48 ? `${s.slice(0, 47)}…` : s}"`;
export const isCover = (name) => /^cover.*\.svg$/.test(name) && !name.endsWith('.dark.svg');
/** Any cover file a post folder could hold: SVG or raster, light (dark variants are build output). */
const isCoverFile = (name) => /^cover.*\.(svg|png|jpe?g|webp|avif|gif)$/i.test(name) && !/\.dark\.svg$/.test(name);
const chars = (s) => [...s].length;

/** What one cover measures against each rule, for the --report row. */
export function specSummary(src, { topic } = {}) {
  const { texts, fills, ground } = coverInventory(src);
  const sizes = [...new Set(texts.flatMap((t) => t.sizes))].sort((a, b) => b - a);
  return {
    runs: texts.length,
    chars: Math.max(0, ...texts.map((t) => chars(t.content))),
    sizes,
    under: texts.filter((t) => t.sizes.some((s) => s < SPEC.minSize)).length,
    fills: fills.length,
    ground: ground ?? '-',
    groundOk: topic ? ground === TOPIC_TINTS[topic]?.light : null,
  };
}

/**
 * Every finding the spec raises against one cover's source.
 * @param {string} src
 * @param {{ topic?: string }} [opts] The post's topic; without one the ground rule is skipped.
 */
export function specFindings(src, { topic } = {}) {
  const { texts, fills, ground } = coverInventory(src);
  const findings = [];
  for (const t of texts) {
    const small = t.sizes.filter((s) => s < SPEC.minSize);
    if (small.length) {
      findings.push({ rule: 'min', line: t.line, message: `<text> ${quote(t.content)} is set at ${small.map(px).join(', ')}; no text may be under ${SPEC.minSize}px` });
    }
    if (chars(t.content) > SPEC.maxChars) {
      findings.push({ rule: 'chars', line: t.line, message: `<text> ${quote(t.content)} has ${chars(t.content)} characters; a cover label is at most ${SPEC.maxChars} (a code token, never a title or a sentence)` });
    }
  }
  // Sizes in order of first use; the ones past maxSizes are the offenders.
  const firstAt = new Map();
  for (const t of texts) for (const s of t.sizes) if (!firstAt.has(s)) firstAt.set(s, t);
  if (firstAt.size > SPEC.maxSizes) {
    const all = [...firstAt.keys()];
    for (const s of all.slice(SPEC.maxSizes)) {
      const t = firstAt.get(s);
      findings.push({ rule: 'sizes', line: t.line, message: `<text> ${quote(t.content)} adds a font size, ${px(s)}; the cover uses ${all.length} (${all.map(px).join(', ')}) and at most ${SPEC.maxSizes} is allowed` });
    }
  }
  if (texts.length > SPEC.maxRuns) {
    const t = texts[SPEC.maxRuns];
    findings.push({ rule: 'runs', line: t.line, message: `${texts.length} <text> runs, at most ${SPEC.maxRuns}; run ${SPEC.maxRuns + 1} is ${quote(t.content)} (no title on the cover: the title lives in the page)` });
  }
  if (fills.length > SPEC.maxFills) {
    for (const f of fills.slice(SPEC.maxFills)) {
      findings.push({ rule: 'fills', line: f.line, message: `<${f.tag}> adds fill colour ${f.color}; the cover paints ${fills.length} (${fills.map((x) => x.color).join(' ')}) and at most ${SPEC.maxFills} are allowed` });
    }
  }
  if (topic) {
    const tint = TOPIC_TINTS[topic]?.light;
    if (!tint) findings.push({ rule: 'ground', line: 1, message: `the post's topic "${topic}" has no tint in scripts/lib/cover-colors.mjs TOPIC_TINTS` });
    else if (!ground) findings.push({ rule: 'ground', line: 1, message: `the cover has no ground (a first rect covering the canvas); paint ${topic}'s tint ${tint}` });
    else if (ground !== tint) {
      const line = fills.find((f) => f.color === ground)?.line ?? 1;
      findings.push({ rule: 'ground', line, message: `the ground is ${ground}; a ${topic} cover is drawn on its topic tint ${tint}` });
    }
  }
  return findings.sort((a, b) => a.line - b.line);
}

/** The frontmatter of every .mdx in a post folder, as { name, data }. */
async function frontmatters(dir, names) {
  const out = [];
  for (const name of names.filter((n) => n.endsWith('.mdx')).sort((a, b) => (a === 'index.mdx' ? -1 : b === 'index.mdx' ? 1 : a.localeCompare(b)))) {
    const split = splitFrontmatter(await readFile(path.join(dir, name), 'utf8'));
    if (!split.ok) continue;
    const data = yaml.load(split.raw);
    if (data && typeof data === 'object') out.push({ name, data });
  }
  return out;
}

const dateOf = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : typeof d === 'string' && /^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10) : undefined);

/** A post folder: its date (the earliest), its topic (index.mdx first), and its locales' `cover` values. */
export async function readPost(dir, names) {
  const fms = await frontmatters(dir, names);
  return {
    dir,
    names,
    date: fms.map((f) => dateOf(f.data.date)).filter(Boolean).sort()[0],
    topic: fms.map((f) => f.data.topic).find((t) => typeof t === 'string'),
    locales: fms.map((f) => ({ name: f.name, cover: f.data.cover })),
  };
}

/** The `shared` rule: one cover.svg for every locale, and no other cover file in the folder. */
export function sharedFindings(post) {
  const findings = [];
  for (const { name, cover } of post.locales) {
    if (cover === undefined || cover === null) continue;
    const file = typeof cover === 'string' ? path.posix.normalize(cover.replace(/^\.\//, '')) : String(cover);
    if (file !== SHARED_COVER) findings.push(`${name} sets \`cover: ${cover}\`; every locale uses ./${SHARED_COVER} (the cover has no text to translate)`);
  }
  for (const name of post.names.filter(isCoverFile)) {
    if (name !== SHARED_COVER) findings.push(`${name} is a second cover file; a post has one ./${SHARED_COVER} for all locales (remove it)`);
  }
  return findings;
}

async function posts() {
  const out = [];
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    const names = entries.filter((e) => e.isFile()).map((e) => e.name);
    if (names.some(isCover) || names.some((n) => n.endsWith('.mdx'))) out.push(await readPost(dir, names));
    for (const e of entries) if (e.isDirectory()) await walk(path.join(dir, e.name));
  };
  await walk(BLOG);
  return out.sort((a, b) => a.dir.localeCompare(b.dir));
}

async function main() {
  const args = argv.slice(2);
  const report = args.includes('--report');
  const verbose = args.includes('--verbose');
  const topicArg = args.find((a) => a.startsWith('--topic='))?.slice('--topic='.length);
  if (topicArg && !TOPIC_TINTS[topicArg]) {
    console.error(`cover-spec: --topic=${topicArg} is not a topic (${Object.keys(TOPIC_TINTS).join(', ')})`);
    exit(2);
  }
  const named = args.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));

  // Each cover to check, with its post (null for a named file outside any post folder).
  let all;
  const every = named.length ? [] : await posts();
  if (named.length) {
    all = [];
    for (const file of named) {
      const dir = path.dirname(file);
      const names = (await readdir(dir, { withFileTypes: true })).filter((e) => e.isFile()).map((e) => e.name);
      const post = names.some((n) => n.endsWith('.mdx')) ? await readPost(dir, names) : null;
      all.push({ file, date: null, post, topic: post?.topic ?? topicArg });
    }
  } else {
    all = every.flatMap((post) => post.names.filter(isCover).sort().map((name) => ({ file: path.join(post.dir, name), date: post.date, post, topic: post.topic })));
  }
  const slugOf = (file) => path.basename(path.dirname(file));
  const late = (c) => LATE_QUEUE.some((e) => e.slug === slugOf(c.file) && e.date === c.date);
  const inScope = (c) => c.date && c.date >= SPEC_FROM && !late(c);
  const checked = named.length || report ? all : all.filter(inScope);
  const excused = named.length || report ? 0 : all.filter((c) => c.date && c.date >= SPEC_FROM && late(c)).length;
  const grandfathered = all.length - checked.length - excused;
  const staleLate = named.length || report ? [] : LATE_QUEUE.filter((e) => !all.some((c) => slugOf(c.file) === e.slug && c.date === e.date));
  const noTopic = checked.filter((c) => !c.topic).length;

  // The `shared` rule, once per post folder: named files' folders, or every post in scope.
  const sharedPosts = named.length
    ? [...new Map(all.filter((c) => c.post).map((c) => [c.post.dir, c.post])).values()]
    : report ? [] : every.filter((p) => p.date && p.date >= SPEC_FROM && !LATE_QUEUE.some((e) => e.slug === path.basename(p.dir) && e.date === p.date));
  const shared = sharedPosts.flatMap((p) => sharedFindings(p).map((m) => `${rel(p.dir)}/  [shared] ${m}`));

  // Run from outside the site (a named file from elsewhere) there is no Base.astro to compare.
  const drift = report || !existsSync(BASE) ? [] : topicTintDrift(await readFile(BASE, 'utf8')).map((m) => `${rel(BASE)}: ${m}`);

  const lines = [], errors = [];
  const byRule = {};
  let failing = 0;
  if (report) {
    lines.push(`spec v2: runs <= ${SPEC.maxRuns} · chars <= ${SPEC.maxChars} · sizes <= ${SPEC.maxSizes} · runs under ${SPEC.minSize}px = 0 · fills <= ${SPEC.maxFills} · ground = topic tint`);
    lines.push(['cover', 'date', 'topic', 'runs', 'chars', 'sizes (px)', 'under', 'fills', 'ground', 'broken'].join('\t'));
  }
  for (const { file, date, topic } of checked) {
    let findings, src;
    try {
      src = await readFile(file, 'utf8');
      findings = specFindings(src, { topic });
    } catch (err) {
      if (!(err instanceof Unsupported)) throw err;
      errors.push(`${rel(file)}: ${err.message} (the gate cannot read this cover)`);
      continue;
    }
    if (findings.length) failing++;
    const broken = [...new Set(findings.map((f) => f.rule))];
    for (const r of broken) byRule[r] = (byRule[r] ?? 0) + 1;
    if (report) {
      const m = specSummary(src, { topic });
      const ground = m.groundOk === null ? m.ground : `${m.ground}${m.groundOk ? '' : ' (not the tint)'}`;
      lines.push([rel(file), date ?? '-', topic ?? '-', m.runs, m.chars, m.sizes.map((s) => Math.round(s * 10) / 10).join('/'), m.under, m.fills, ground, broken.join(',') || 'ok'].join('\t'));
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
    const withCover = every.filter((p) => p.names.some(isCoverFile));
    const pairs = withCover.filter((p) => sharedFindings(p).length).length;
    console.log(`cover-spec --report: ${failing} of ${checked.length} covers break spec v2${rulesNote}; ${errors.length} unreadable; ${pairs} of ${withCover.length} post folders break [shared] (more than one cover file, or a locale not on ./${SHARED_COVER}). Report only: nothing fails.`);
    return;
  }
  for (const l of [...lines, ...shared, ...drift]) console.error(l);
  for (const e of errors) console.error(e);
  for (const e of staleLate) console.error(`LATE_QUEUE entry for ${e.slug} (${e.date}) matches no post with a cover dated ${e.date}; remove it`);
  const scope = named.length
    ? `${checked.length} named cover${checked.length === 1 ? '' : 's'}${noTopic ? `, ${noTopic} with no topic (ground rule skipped; pass --topic=SLUG)` : ''}`
    : `${checked.length} cover${checked.length === 1 ? '' : 's'} of posts dated on or after ${SPEC_FROM}, ${grandfathered} grandfathered by date${excused ? `, ${excused} excused by LATE_QUEUE` : ''}`;
  if (failing || errors.length || staleLate.length || shared.length || drift.length) {
    console.error(`cover-spec: FAIL — ${failing} cover${failing === 1 ? ' breaks' : 's break'} the spec${rulesNote}, ${shared.length} shared-cover finding${shared.length === 1 ? '' : 's'}, ${drift.length} topic-tint drift, ${errors.length} unreadable, ${staleLate.length} stale LATE_QUEUE entr${staleLate.length === 1 ? 'y' : 'ies'} (${scope}). Spec v2: no title; at most ${SPEC.maxRuns} <text> run of at most ${SPEC.maxChars} characters, ${SPEC.maxSizes} font size, nothing under ${SPEC.minSize}px, at most ${SPEC.maxFills} fill colours, the ground is the topic tint, one ./${SHARED_COVER} for all locales. See docs/cover-style.md.`);
    exit(1);
  }
  console.log(`cover-spec: OK — ${scope}`);
}

if (import.meta.url === pathToFileURL(argv[1] ?? '').href) await main();
