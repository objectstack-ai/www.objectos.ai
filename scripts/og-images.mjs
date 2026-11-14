#!/usr/bin/env node
// Share images: draw the 1200x630 JPEG `og:image` of each locale page of a
// blog post, after `astro build`, and check that every built page names one
// that exists at the size it declares.
//
//   node scripts/og-images.mjs              (pnpm og:images; runs in `pnpm build`)
//   node scripts/og-images.mjs --no-cache   (draw every image again)
//
// What the page names and where the file comes from are one rule, in
// scripts/lib/og-image.mjs: src/layouts/BlogPost.astro writes the URL into
// the head, this script renders the file at that URL. Driven from the built
// HTML, so it renders exactly the images some page names (no archived post's,
// no orphan) and fails on any it cannot account for.
//
// Steps, each a build failure when it finds something:
//   1. Read `og:image`, `twitter:image` and the JSON-LD `image` of every built
//      page. Each URL under /og/ must map back to a post's locale file.
//   2. Every title and every SVG cover's text is checked against the bundled
//      faces (scripts/lib/og-fonts.mjs). A character no face has would be
//      drawn as an empty box in the share image, where nobody looks after
//      merge, so it is named here instead, with the file and the text it is in.
//   3. Draw each image (scripts/lib/og-composite.mjs: the title in the page's
//      language, the cover's art on its ground, the ObjectOS mark), or copy it
//      from the cache. The URL's hash covers everything the image is drawn
//      from, so the cache is keyed by it: node_modules/.cache/og-images/
//      <hash>.jpg. A build draws only the pages whose title, cover or renderer
//      changed, and entries no page names any more are deleted.
//   4. Every page whose `og:image` is a file of this site (a rendered one, or
//      the default in src/layouts/Base.astro) declares its width and height,
//      and they are the file's own; a file that is not in dist/ fails too.

import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import path from 'node:path';
import { argv, cwd, env, execPath, exit, pid, stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { renderShareImage } from './lib/og-composite.mjs';
import { prepareOgFonts, uncoveredChars, uncoveredText } from './lib/og-fonts.mjs';
import { OG_IMAGE, postShareImage } from './lib/og-image.mjs';

const ROOT = cwd();
const DIST = path.join(ROOT, 'dist');
const BLOG = path.join(ROOT, 'content', 'blog');
const SITE = 'https://www.objectos.ai';
const VERBOSE = argv.includes('--verbose');
const CACHE = argv.includes('--no-cache') ? null : path.join(ROOT, 'node_modules', '.cache', 'og-images');

// ─── Worker mode ────────────────────────────────────────────────────────────
//
// SVG and title text is drawn by librsvg, Pango and fontconfig, and drawing several
// SVGs at once on libvips' threads in one process crashed it: a SIGSEGV or a
// bare "svgload: SVG rendering failed" in 4 of 6 runs, also after a first
// render had set the shared state up. One image at a time per process never
// failed. So the renders are spread over a few worker processes, each with
// its own fontconfig, each drawing one image at a time.
if (argv.includes('--render-worker')) {
  let input = '';
  for await (const chunk of stdin) input += chunk;
  const sharp = (await import('sharp')).default;
  sharp.concurrency(1);
  for (const job of JSON.parse(input)) {
    const out = path.join(DIST, job.urlPath);
    mkdirSync(path.dirname(out), { recursive: true });
    const result = await renderShareImage(sharp, { ...job, out, root: ROOT });
    // Into the cache by rename, so an interrupted copy never leaves a torn file
    // under a name the next build trusts.
    if (job.cache) {
      copyFileSync(out, `${job.cache}.${pid}.tmp`);
      renameSync(`${job.cache}.${pid}.tmp`, job.cache);
    }
    await new Promise((resolve) => stdout.write(`${JSON.stringify({ urlPath: job.urlPath, ...result })}\n`, resolve));
  }
  exit(0);
}

const issues = [];

const walk = (dir, keep) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, keep);
    return entry.isFile() && keep(entry.name) ? [full] : [];
  });

// ─── 1. The share images the built pages name ───────────────────────────────

try {
  statSync(DIST);
} catch {
  console.error('x dist/ does not exist: run `astro build` first');
  exit(1);
}

const attr = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];
/** @type {Map<string, Set<string>>} URL path -> pages naming it */
const named = new Map();
/** @type {{ page: string, path: string, width?: string, height?: string }[]} */
const declared = [];
const htmlFiles = walk(DIST, (name) => name.endsWith('.html'));
for (const file of htmlFiles) {
  const page = path.relative(DIST, file).split(path.sep).join('/');
  const html = readFileSync(file, 'utf8');
  const head = html.slice(0, Math.max(0, html.indexOf('</head>')));
  const metas = head.match(/<meta\b[^>]*>/g) ?? [];
  const meta = (key, value) => {
    const tag = metas.find((t) => attr(t, key) === value);
    return tag ? attr(tag, 'content') : undefined;
  };
  const urls = [meta('property', 'og:image'), meta('name', 'twitter:image')];
  for (const [, url] of head.matchAll(/"image":"([^"]+)"/g)) urls.push(url);
  for (const url of urls) {
    if (!url?.startsWith(`${SITE}/og/`)) continue;
    const urlPath = url.slice(SITE.length);
    if (!named.has(urlPath)) named.set(urlPath, new Set());
    named.get(urlPath).add(page);
  }
  // Every share image this site serves, the rendered ones and the default
  // (src/layouts/Base.astro), is checked against the size the page declares.
  const og = meta('property', 'og:image');
  if (og?.startsWith(`${SITE}/`)) {
    declared.push({
      page,
      path: og.slice(SITE.length),
      width: meta('property', 'og:image:width'),
      height: meta('property', 'og:image:height'),
    });
  }
}

// Every locale file of every post with a cover, by the share-image URL it maps to.
/** @type {Map<string, NonNullable<ReturnType<typeof postShareImage>>>} */
const images = new Map();
for (const mdx of walk(BLOG, (name) => name.endsWith('.mdx'))) {
  const image = postShareImage(mdx, ROOT);
  if (image) images.set(image.urlPath, image);
}

const jobs = [];
for (const [urlPath, pages] of named) {
  const image = images.get(urlPath);
  if (!image) {
    issues.push(`${urlPath}: named by ${[...pages][0]} (and ${pages.size - 1} more), but no post's locale file maps to it`);
    continue;
  }
  jobs.push(image);
}

// ─── 2. Fonts, and the glyph check ──────────────────────────────────────────

const scratch = mkdtempSync(path.join(tmpdir(), 'og-images-'));
let summary = '';
try {
  const { conf, faces } = await prepareOgFonts(scratch);

  const checkedCovers = new Set();
  for (const job of jobs) {
    // One finding per title: a script no face has (Hangul, say) would
    // otherwise name every character of it.
    const gaps = uncoveredText(job.title, faces);
    if (gaps.length > 0) {
      const shown = gaps.slice(0, 8).map((gap) => `${gap.codePoint} "${gap.char}"`).join(', ');
      issues.push(
        `${job.source}: the title "${job.title}" has ${gaps.length} character${gaps.length === 1 ? '' : 's'} in none of ` +
          `the bundled faces (${shown}${gaps.length > 8 ? ', …' : ''}), which would render as empty boxes in the share ` +
          `image; add a face that has them to scripts/lib/og-fonts.mjs`
      );
    }
    if (!job.cover.endsWith('.svg') || checkedCovers.has(job.cover)) continue;
    checkedCovers.add(job.cover);
    for (const gap of uncoveredChars(readFileSync(job.cover, 'utf8'), faces)) {
      issues.push(
        `${path.relative(ROOT, job.cover)}: ${gap.codePoint} "${gap.char}" (in "${gap.text}") is in none of the ` +
          `bundled faces and would render as an empty box; add a face that has it to scripts/lib/og-fonts.mjs`
      );
    }
  }

  // ─── 3. Render ──────────────────────────────────────────────────────────────

  const started = Date.now();
  // From the cache, the images whose hash a previous build drew.
  let cached = 0;
  const toDraw = [];
  if (CACHE) mkdirSync(CACHE, { recursive: true });
  for (const job of jobs) {
    const hit = CACHE && path.join(CACHE, `${job.hash}.jpg`);
    if (hit && existsSync(hit)) {
      const out = path.join(DIST, job.urlPath);
      mkdirSync(path.dirname(out), { recursive: true });
      copyFileSync(hit, out);
      cached++;
    } else {
      toDraw.push({ ...job, cache: hit || undefined });
    }
  }
  const workers = toDraw.length === 0 ? 0 : Math.max(1, Math.min(3, availableParallelism() - 1, toDraw.length));
  const shares = Array.from({ length: workers }, () => []);
  // The images of one cover go to one worker, one after another, so it draws
  // the cover once for all its locales; the largest groups are dealt first,
  // each to the worker with the fewest images so far.
  const byCover = new Map();
  for (const job of toDraw) byCover.set(job.cover, [...(byCover.get(job.cover) ?? []), job]);
  for (const group of [...byCover.values()].sort((a, b) => b.length - a.length)) {
    shares.reduce((least, share) => (share.length < least.length ? share : least)).push(...group);
  }
  const rendered = new Map();
  let titlesCut = 0;
  await Promise.all(
    shares.map(
      (share) =>
        new Promise((resolve) => {
          // fontconfig reads its configuration once, at first use: the worker
          // gets the bundled fonts.conf in its environment before it starts.
          const child = spawn(execPath, [fileURLToPath(import.meta.url), '--render-worker'], {
            cwd: ROOT,
            env: { ...env, FONTCONFIG_FILE: conf },
            stdio: ['pipe', 'pipe', 'inherit'],
          });
          let out = '';
          child.stdout.on('data', (chunk) => (out += chunk));
          child.on('close', (code, signal) => {
            for (const line of out.split('\n').filter(Boolean)) {
              const { urlPath, bytes, size, cut, card } = JSON.parse(line);
              rendered.set(urlPath, bytes);
              if (cut) titlesCut++;
              if (VERBOSE) console.log(`  ${urlPath} ${bytes} B, title ${size}px${cut ? ' cut' : ''}${card ? ', card' : ''}`);
            }
            if (code !== 0) {
              const lost = share.filter((job) => !rendered.has(job.urlPath)).map((job) => job.urlPath);
              issues.push(`a render worker exited with ${signal ?? `code ${code}`}; not rendered: ${lost.join(', ')}`);
            }
            resolve();
          });
          child.stdin.end(JSON.stringify(share));
        })
    )
  );
  const bytes = [...rendered.values()].reduce((sum, n) => sum + n, 0);

  // Entries no page names any more: a changed title, cover or renderer.
  if (CACHE) {
    const live = new Set(jobs.map((job) => `${job.hash}.jpg`));
    for (const name of readdirSync(CACHE)) if (!live.has(name)) rmSync(path.join(CACHE, name), { force: true });
  }

  // ─── 4. The size each page declares is the file's ──────────────────────────

  const sharp = (await import('sharp')).default;
  const sizes = new Map();
  for (const { page, path: urlPath, width, height } of declared) {
    if (!sizes.has(urlPath)) {
      try {
        const { width: w, height: h } = await sharp(path.join(DIST, urlPath)).metadata();
        sizes.set(urlPath, { w, h });
      } catch {
        sizes.set(urlPath, null);
        issues.push(`${page}: og:image ${urlPath} is not a file in dist/`);
      }
    }
    const size = sizes.get(urlPath);
    if (!size) continue;
    if (width !== String(size.w) || height !== String(size.h)) {
      issues.push(
        `${page}: og:image ${urlPath} is ${size.w}x${size.h}, but og:image:width/height say ${width ?? '(none)'}x${height ?? '(none)'}`
      );
    }
  }

  summary =
    `✓ share images: ${jobs.length} at ${OG_IMAGE.width}x${OG_IMAGE.height} for ${declared.length} pages, ` +
    `${rendered.size} drawn (${(bytes / 1024 / 1024).toFixed(1)} MB, ${((Date.now() - started) / 1000).toFixed(1)} s, ` +
    `${workers} workers; ${titlesCut} titles cut to 3 lines) and ${cached} from the cache; ` +
    `${faces.length} bundled font files, no uncovered glyph`;
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

if (issues.length > 0) {
  for (const issue of issues) console.error(`x ${issue}`);
  console.error(`\nShare images failed (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  exit(1);
}
console.log(summary);
