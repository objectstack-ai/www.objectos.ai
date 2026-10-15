#!/usr/bin/env node
// Share images: render each blog post's 1200x630 JPEG `og:image` from its
// cover, after `astro build`, and check that every built page names one that
// exists at the size it declares.
//
//   node scripts/og-images.mjs      (pnpm og:images; runs in `pnpm build`)
//
// What the page names and where the file comes from are one rule, in
// scripts/lib/og-image.mjs: src/layouts/BlogPost.astro writes the URL into
// the head, this script renders the file at that URL. Driven from the built
// HTML, so it renders exactly the images some page names (no archived post's,
// no orphan) and fails on any it cannot account for.
//
// Steps, each a build failure when it finds something:
//   1. Read `og:image`, `twitter:image` and the JSON-LD `image` of every built
//      page. Each URL under /og/ must map back to a post's cover.
//   2. An SVG cover's text is checked against the bundled faces
//      (scripts/lib/og-fonts.mjs). A character no face has would be drawn as
//      an empty box in the share image, where nobody looks after merge, so it
//      is named here instead, with the cover and the line it is in.
//   3. Render, onto white, as JPEG quality 82 with 4:4:4 chroma so the coloured
//      text in the diagrams keeps clean edges:
//      - an SVG cover is a diagram whose text can sit at any edge (two put a
//        caption in the bottom 23px a centre crop would cut), so it is drawn
//        whole, as vectors, at the height of the card (a 16:9 cover becomes
//        1120x630) and widened to 1200 by repeating its edge columns. No SVG
//        cover draws anything in its outer 40px columns, which are background;
//      - a PNG or JPG cover is an illustration with no text, so it is scaled
//        to cover 1200x630 and cropped centred (a 16:9 cover loses 3.4% top and
//        bottom, a 1.6:1 one 8%).
//   4. Every page whose `og:image` is a file of this site (a rendered one, or
//      the default in src/layouts/Base.astro) declares its width and height,
//      and they are the file's own; a file that is not in dist/ fails too.

import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import path from 'node:path';
import { argv, cwd, env, execPath, exit, stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { prepareOgFonts, uncoveredChars } from './lib/og-fonts.mjs';
import { OG_IMAGE, ogImagePath, postCoverFile } from './lib/og-image.mjs';

const ROOT = cwd();
const DIST = path.join(ROOT, 'dist');
const BLOG = path.join(ROOT, 'content', 'blog');
const SITE = 'https://www.objectos.ai';
const VERBOSE = argv.includes('--verbose');

/**
 * Render one share image into dist/. Runs in a worker process (see below).
 *
 * @param {import('sharp')} sharp
 * @param {{ urlPath: string, cover: string }} job
 */
async function renderShareImage(sharp, { urlPath, cover }) {
  let image;
  if (cover.endsWith('.svg')) {
    const { width, height } = await sharp(cover).metadata();
    const scale = Math.min(OG_IMAGE.width / width, OG_IMAGE.height / height);
    const drawn = await sharp(cover, { density: 72 * scale }).png().toBuffer({ resolveWithObject: true });
    const w = Math.min(drawn.info.width, OG_IMAGE.width);
    const h = Math.min(drawn.info.height, OG_IMAGE.height);
    const left = Math.floor((OG_IMAGE.width - w) / 2);
    const top = Math.floor((OG_IMAGE.height - h) / 2);
    image = sharp(drawn.data)
      .extract({ left: 0, top: 0, width: w, height: h })
      .extend({ left, right: OG_IMAGE.width - w - left, top, bottom: OG_IMAGE.height - h - top, extendWith: 'copy' });
  } else {
    image = sharp(cover).resize(OG_IMAGE.width, OG_IMAGE.height, { fit: 'cover', position: 'centre' });
  }
  const out = path.join(DIST, urlPath);
  mkdirSync(path.dirname(out), { recursive: true });
  const info = await sharp(await image.png().toBuffer())
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(out);
  return info.size;
}

// ─── Worker mode ────────────────────────────────────────────────────────────
//
// SVG text is drawn by librsvg, Pango and fontconfig, and drawing several
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
    const bytes = await renderShareImage(sharp, job);
    await new Promise((resolve) => stdout.write(`${JSON.stringify({ urlPath: job.urlPath, bytes })}\n`, resolve));
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

// Every post's cover, by the share-image URL it maps to.
/** @type {Map<string, string>} URL path -> cover file */
const covers = new Map();
for (const mdx of walk(BLOG, (name) => name.endsWith('.mdx'))) {
  const cover = postCoverFile(mdx, ROOT);
  if (cover) covers.set(ogImagePath(cover, ROOT), cover);
}

const jobs = [];
for (const [urlPath, pages] of named) {
  const cover = covers.get(urlPath);
  if (!cover) {
    issues.push(`${urlPath}: named by ${[...pages][0]} (and ${pages.size - 1} more), but no post's cover maps to it`);
    continue;
  }
  jobs.push({ urlPath, cover });
}

// ─── 2. Fonts, and the glyph check ──────────────────────────────────────────

const scratch = mkdtempSync(path.join(tmpdir(), 'og-images-'));
let summary = '';
try {
  const { conf, faces } = await prepareOgFonts(scratch);

  for (const job of jobs) {
    if (!job.cover.endsWith('.svg')) continue;
    for (const gap of uncoveredChars(readFileSync(job.cover, 'utf8'), faces)) {
      issues.push(
        `${path.relative(ROOT, job.cover)}: ${gap.codePoint} "${gap.char}" (in "${gap.text}") is in none of the ` +
          `bundled faces and would render as an empty box; add a face that has it to scripts/lib/og-fonts.mjs`
      );
    }
  }

  // ─── 3. Render ──────────────────────────────────────────────────────────────

  const started = Date.now();
  const workers = Math.max(1, Math.min(3, availableParallelism() - 1, jobs.length));
  const shares = Array.from({ length: workers }, () => []);
  // The SVGs are the slow ones; deal them round-robin so each worker gets its share.
  [...jobs]
    .sort((a, b) => Number(b.cover.endsWith('.svg')) - Number(a.cover.endsWith('.svg')))
    .forEach((job, i) => shares[i % workers].push(job));
  const rendered = new Map();
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
              const { urlPath, bytes } = JSON.parse(line);
              rendered.set(urlPath, bytes);
              if (VERBOSE) console.log(`  ${urlPath} ${bytes} B`);
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
    `✓ share images: ${rendered.size} rendered at ${OG_IMAGE.width}x${OG_IMAGE.height} ` +
    `(${(bytes / 1024 / 1024).toFixed(1)} MB, ${((Date.now() - started) / 1000).toFixed(1)} s, ${workers} workers) ` +
    `for ${declared.length} pages; ${faces.length} bundled font files, no uncovered glyph`;
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

if (issues.length > 0) {
  for (const issue of issues) console.error(`x ${issue}`);
  console.error(`\nShare images failed (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  exit(1);
}
console.log(summary);
