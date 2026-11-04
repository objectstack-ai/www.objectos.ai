#!/usr/bin/env node
// Dark cover variants: beside every light `cover*.svg` under content/blog,
// write `cover*.dark.svg`, the same drawing with each colour swapped for its
// dark counterpart (scripts/lib/cover-colors.mjs: the site's token pairs,
// then OKLCH lightness mirroring for every other colour).
//
//   node scripts/cover-dark.mjs [--verbose]     (pnpm cover:dark; runs in `pnpm build` and `pnpm dev`)
//
// The variants are build output, not source: .gitignore keeps them out of the
// repo and this script rewrites them from the light covers on every build, so
// a cover edit cannot leave a stale dark copy behind. The templates
// (src/lib/cover-variant.ts) render both images, lazy, and show one by the
// page's `data-theme`; the hidden one is never fetched.
//
// What is rewritten: `fill`, `stroke`, `stop-color` and `color`, as
// attributes, in `style` attributes and in `<style>` blocks. A drop shadow's
// `flood-color` is left alone (a shadow stays dark in both themes). The root
// gets the dark counterpart of black as its `fill` when it sets none, because
// a text that names no fill inherits black, which would vanish on the dark
// ground. A colour this script cannot read fails it, naming the file.
//
// Skipped: a cover whose ground (the first shape covering the canvas) is
// already dark, OKLab L under 0.5. It needs no dark variant, and mirroring
// would turn it into a light one. Its thumbnails keep the --cover-filter.
//
// Checked: every text's contrast against the shape under it. The dark variant
// may not drop a text below the smaller of its light contrast and 3:1 (2%
// slack for 8-bit rounding); a drop fails the build with the text and both
// ratios (--verbose prints them all). The palette keeps contrast by
// construction, so a failure means a new colour spelling or a token pair in
// scripts/lib/cover-colors.mjs that does not.
import { readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';
import { contrast, darkColor, parseColor, toOklab } from './lib/cover-colors.mjs';
import { coverInventory } from './lib/cover-inventory.mjs';
import { checkSvg, parseXml } from './svg-text-fit.mjs';
import { isCover } from './cover-spec.mjs';

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const VERBOSE = argv.includes('--verbose');
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
// A dark variant may not take a text under this contrast unless the light
// cover already had it lower (then it may not go lower than that), less
// SLACK: rounding each colour to 8-bit sRGB moves a ratio by up to 1.2%
// (measured over the 1,670 texts of the 86 light covers).
const MIN_CONTRAST = 3;
const SLACK = 0.02;

export const darkPath = (file) => file.replace(/\.svg$/, '.dark.svg');

const COLOR_TOKEN = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|\b(?:white|black)\b/g;
const KNOWN_WORDS = /^(?:none|currentcolor|transparent|inherit)$/i;

function mapValue(value, where) {
  const out = value.replace(COLOR_TOKEN, (token) => darkColor(token));
  const rest = out.replace(/url\([^)]*\)/g, '').replace(COLOR_TOKEN, '').trim();
  if (rest && !KNOWN_WORDS.test(rest)) throw new Error(`${where}: colour value "${value}" is not one this script reads`);
  return out;
}

/** The dark variant of one cover's source. */
export function darkSvg(src, where = 'svg') {
  const PROP = '(?<![\\w-])(fill|stroke|stop-color|color)';
  const css = (text) =>
    text.replace(new RegExp(`${PROP}(\\s*:\\s*)([^;}"'<]+)`, 'g'), (_m, prop, sep, value) => `${prop}${sep}${mapValue(value, where)}`);
  // Only inside markup, never in a text node: a <style> block's CSS, a style=""
  // attribute's CSS, and presentation attributes (preceded by whitespace, in a tag).
  let out = src.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g, (_m, open, body, close) => `${open}${css(body)}${close}`);
  out = out.replace(/<[a-zA-Z][^<>]*>/g, (tag) =>
    tag
      .replace(/(\sstyle\s*=\s*)("([^"]*)"|'([^']*)')/g, (_m, sep, quoted, dq, sq) => `${sep}${quoted[0]}${css(dq ?? sq)}${quoted[0]}`)
      .replace(new RegExp(`(?<=\\s)${PROP.slice('(?<![\\w-])'.length)}(\\s*=\\s*)("([^"]*)"|'([^']*)')`, 'g'), (_m, prop, sep, quoted, dq, sq) => {
        const q = quoted[0];
        return `${prop}${sep}${q}${mapValue(dq ?? sq, where)}${q}`;
      }));
  const root = /<svg\b[^>]*>/.exec(out);
  if (!root) throw new Error(`${where}: no <svg> root`);
  if (!/\sfill\s*=/.test(root[0])) {
    out = out.slice(0, root.index) + root[0].replace(/^<svg\b/, `<svg fill="${darkColor('black')}"`) + out.slice(root.index + root[0].length);
  }
  return out;
}

// Paint server id -> its stop colours, for reading a gradient host's colour.
function gradients(src) {
  const map = new Map();
  const walk = (node) => {
    for (const c of node.children ?? []) {
      if (!c.name) continue;
      if (/Gradient$/.test(c.name) && c.attrs.id) {
        const stops = c.children.filter((s) => s.name === 'stop')
          .map((s) => /(?:^|;)\s*stop-color\s*:\s*([^;]+)/.exec(s.attrs.style ?? '')?.[1] ?? s.attrs['stop-color'] ?? 'black');
        map.set(c.attrs.id, stops);
      }
      walk(c);
    }
  };
  walk(parseXml(src));
  return map;
}

const colorsOf = (fill, grads) => {
  if (!fill) return [];
  const ref = /^url\(\s*['"]?#([^'")\s]+)/.exec(fill);
  const list = ref ? grads.get(ref[1]) ?? [] : [fill];
  return list.map((v) => parseColor(v)).filter(Boolean);
};

/**
 * Each text's contrast against the shape under it (svg-text-fit's host), the
 * worst over a gradient host's stops. A text on the bare canvas is measured
 * against `canvasColor`, the ground the page draws behind the image.
 */
export function textContrasts(src, canvasColor) {
  const grads = gradients(src);
  const { texts } = checkSvg(src);
  return texts.map((t) => {
    const fg = colorsOf(t.fill, grads)[0];
    const bgs = t.host.tag === 'canvas' ? [parseColor(canvasColor)] : colorsOf(t.host.fill, grads);
    const ratio = fg && bgs.length ? Math.min(...bgs.map((bg) => contrast(fg, bg))) : null;
    return { line: t.line, content: t.content, ratio };
  });
}

async function lightCovers(dir) {
  const out = [], stale = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await lightCovers(p);
      out.push(...sub.out); stale.push(...sub.stale);
    } else if (isCover(entry.name)) out.push(p);
    else if (/^cover.*\.dark\.svg$/.test(entry.name)) stale.push(p);
  }
  return { out, stale };
}

async function main() {
  const { out: covers, stale } = await lightCovers(BLOG);
  const kept = new Set();
  const failures = [];
  let written = 0, unchanged = 0, skipped = 0, texts = 0;
  for (const file of covers) {
    const src = await readFile(file, 'utf8');
    const { ground } = coverInventory(src);
    if (ground && toOklab(parseColor(ground)).L < 0.5) {
      skipped++;
      if (VERBOSE) console.log(`${rel(file)}  ground ${ground} is already dark: no variant`);
      continue;
    }
    const dark = darkSvg(src, rel(file));
    const target = darkPath(file);
    kept.add(target);
    // Light text on the canvas is measured on the light page's --surface-sunk
    // (the card's ground), dark on the dark one.
    const before = textContrasts(src, '#e9efe9');
    const after = textContrasts(dark, '#202b25');
    for (let i = 0; i < before.length; i++) {
      const [b, a] = [before[i], after[i]];
      if (b.ratio === null || a.ratio === null) continue;
      texts++;
      const floor = Math.min(b.ratio, MIN_CONTRAST);
      if (VERBOSE) console.log(`${rel(file)}:${b.line}  "${b.content.slice(0, 40)}"  ${b.ratio.toFixed(2)}:1 -> ${a.ratio.toFixed(2)}:1`);
      if (a.ratio < floor * (1 - SLACK)) {
        failures.push(`${rel(target)}:${a.line}  "${a.content}" contrast ${a.ratio.toFixed(2)}:1 against the shape under it, down from ${b.ratio.toFixed(2)}:1 in ${rel(file)}; the dark variant may not go under ${floor.toFixed(2)}:1`);
      }
    }
    const banner = `<!-- Generated by scripts/cover-dark.mjs from ${path.basename(file)}; do not edit. -->\n`;
    const content = banner + dark;
    let current = null;
    try { current = await readFile(target, 'utf8'); } catch { /* not yet written */ }
    if (current === content) { unchanged++; continue; }
    await writeFile(target, content);
    written++;
  }
  let removed = 0;
  for (const file of stale) {
    if (kept.has(file)) continue;
    await unlink(file);
    removed++;
  }
  if (failures.length) {
    for (const f of failures) console.error(f);
    console.error(`cover-dark: FAIL — ${failures.length} text${failures.length === 1 ? '' : 's'} lose contrast in the dark variant`);
    exit(1);
  }
  console.log(`cover-dark: OK — ${kept.size} dark variants (${written} written, ${unchanged} unchanged, ${removed} stale removed); ${skipped} cover${skipped === 1 ? '' : 's'} already dark, skipped; ${texts} texts keep their contrast`);
}

if (import.meta.url === pathToFileURL(argv[1] ?? '').href) await main();
