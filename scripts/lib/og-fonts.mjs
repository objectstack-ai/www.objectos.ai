// The fonts `scripts/og-images.mjs` rasterizes SVG cover text with, and the
// check that every character a cover draws is in one of them.
//
// ─── Why the fonts are bundled, not taken from the machine ─────────────────
//
// sharp renders SVG through librsvg, Pango and fontconfig, and fontconfig
// answers with whatever fonts the machine has. The covers ask for
// `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, `Inter, Arial,
// sans-serif` and `ui-monospace, Menlo, monospace`: macOS and Windows faces
// that no Linux build machine has. CI builds on GitHub's ubuntu-latest image,
// which ships no CJK font, so the Chinese covers (58 zh-Hans and zh-Hant posts)
// would rasterize as rows of empty boxes ("tofu"), and the share image is
// exactly the place nobody looks at after merge. So the rasterizer sees this
// set and nothing from the system: the same glyphs on a laptop and on CI, and
// a gate that knows what they are.
//
// ─── Why WOFF2 is decoded first ─────────────────────────────────────────────
//
// The faces come from Fontsource packages (SIL OFL 1.1), which ship WOFF2 and
// WOFF only. The FreeType inside sharp's prebuilt libvips reads neither:
// rendering a Chinese cover against the WOFF2 files, and a symbol line
// against the WOFF files, drew every glyph as a box. `wawoff2` (Google's
// woff2 decoder, compiled to WebAssembly) turns each file back into the
// TrueType font it was made from, in a temporary directory that a generated
// fonts.conf points fontconfig at.
//
// ─── The faces ──────────────────────────────────────────────────────────────
//
//   Arimo                 sans-serif. Metric-compatible with Arial, which is
//                         the face `scripts/svg-text-fit.mjs` measures every
//                         cover with, so a line that fits its box under
//                         `pnpm svg:lint` has the same width in the share
//                         image. (Inter or a San Francisco look-alike would be
//                         wider, and could overflow a box the gate passed.)
//   Cousine               monospace, metric-compatible with Courier New /
//                         Liberation Mono, the gate's monospace table.
//   Noto Sans SC          Chinese. The zh-Hans and zh-Hant posts share one
//                         Simplified-Chinese cover per post (AGENTS.md); the
//                         other locales use the English cover.
//   Noto Sans Symbols 2   ✓ ✗ ⛔ and the other dingbats in the diagrams.
//   Noto Sans Math        the arrows and operators the others lack (↶ ⊘).
//   Noto Emoji            the emoji (💥 🤔), in monochrome: the COLRv1
//                         colour emoji font decodes, but cairo draws nothing
//                         for it.
//
// Every family a cover names resolves to the sans-serif or monospace chain
// below, and both chains end in every face, so "some bundled face has the
// glyph" is exactly "fontconfig can draw it". That is the predicate
// `uncoveredChars` checks, against each face's own cmap.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

/**
 * The bundled faces, in fallback order. `files` picks the slices to load: the
 * Latin faces only need their Latin slices, the CJK face needs all of them.
 */
export const OG_FACES = [
  { family: 'Arimo', pkg: '@fontsource-variable/arimo', files: /^arimo-latin(-ext)?-wght-normal\.woff2$/ },
  { family: 'Cousine', pkg: '@fontsource/cousine', files: /^cousine-latin(-ext)?-(400|700)-normal\.woff2$/ },
  { family: 'Noto Sans SC', pkg: '@fontsource-variable/noto-sans-sc', files: /^noto-sans-sc-.*-wght-normal\.woff2$/ },
  { family: 'Noto Sans Symbols 2', pkg: '@fontsource/noto-sans-symbols-2', files: /^noto-sans-symbols-2-.*-400-normal\.woff2$/ },
  { family: 'Noto Sans Math', pkg: '@fontsource/noto-sans-math', files: /^noto-sans-math-.*-400-normal\.woff2$/ },
  { family: 'Noto Emoji', pkg: '@fontsource-variable/noto-emoji', files: /^noto-emoji-.*-wght-normal\.woff2$/ },
];

// The families the covers name, mapped to the chain they belong to. Anything
// else falls through to sans-serif (the `append_last` rule in fonts.conf).
const SANS_NAMES = ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'ui-sans-serif', 'Inter', 'Arial', 'Helvetica', 'Helvetica Neue'];
const MONO_NAMES = ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'];
// The symbol faces come before the CJK face: Noto Sans SC also has ✓ and the
// arrows, but as full-width CJK glyphs, which sit badly in a Latin line; a
// Chinese line reads fine with the Latin-proportioned ones.
const SANS_CHAIN = ['Arimo', 'Noto Sans Symbols 2', 'Noto Sans Math', 'Noto Sans SC', 'Noto Emoji'];
const MONO_CHAIN = ['Cousine', 'Noto Sans Symbols 2', 'Noto Sans Math', 'Noto Sans SC', 'Noto Emoji', 'Arimo'];

const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function fontsConf(fontDir, cacheDir) {
  const prefer = (chain) => chain.map((f) => `<family>${xml(f)}</family>`).join('');
  const aliases = (names, generic) =>
    names
      .filter((name) => name !== generic)
      .map((name) => `  <alias binding="same"><family>${xml(name)}</family><prefer><family>${generic}</family></prefer></alias>`)
      .join('\n');
  return `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<!-- Generated by scripts/lib/og-fonts.mjs. Only the bundled faces; no system fonts. -->
<fontconfig>
  <dir>${xml(fontDir)}</dir>
  <cachedir>${xml(cacheDir)}</cachedir>
  <match target="pattern"><edit name="family" mode="append_last"><string>sans-serif</string></edit></match>
${aliases(SANS_NAMES, 'sans-serif')}
${aliases(MONO_NAMES, 'monospace')}
  <alias binding="same"><family>serif</family><prefer><family>sans-serif</family></prefer></alias>
  <alias binding="same"><family>sans-serif</family><prefer>${prefer(SANS_CHAIN)}</prefer></alias>
  <alias binding="same"><family>monospace</family><prefer>${prefer(MONO_CHAIN)}</prefer></alias>
</fontconfig>
`;
}

/**
 * Decode the bundled faces into `dir` and write the fonts.conf that points
 * fontconfig at them. Must run, and `FONTCONFIG_FILE` must be set to the
 * returned path, before sharp first renders text in the process: fontconfig
 * reads its configuration once.
 *
 * @param {string} dir An empty scratch directory.
 * @returns {Promise<{ conf: string, faces: { family: string, file: string, cmap: Cmap }[] }>}
 */
export async function prepareOgFonts(dir) {
  const decompress = require('wawoff2/decompress.js');
  const fontDir = path.join(dir, 'fonts');
  const cacheDir = path.join(dir, 'cache');
  mkdirSync(fontDir, { recursive: true });
  mkdirSync(cacheDir, { recursive: true });
  const faces = [];
  for (const face of OG_FACES) {
    const filesDir = path.join(path.dirname(require.resolve(`${face.pkg}/package.json`)), 'files');
    const picked = readdirSync(filesDir).filter((name) => face.files.test(name)).sort();
    if (picked.length === 0) {
      throw new Error(`og-fonts: ${face.pkg} has no file matching ${face.files} (did the package layout change?)`);
    }
    for (const name of picked) {
      const ttf = Buffer.from(await decompress(readFileSync(path.join(filesDir, name))));
      const file = path.join(fontDir, name.replace(/\.woff2$/, '.ttf'));
      writeFileSync(file, ttf);
      faces.push({ family: face.family, file, cmap: readCmap(ttf, name) });
    }
  }
  const conf = path.join(dir, 'fonts.conf');
  writeFileSync(conf, fontsConf(fontDir, cacheDir));
  return { conf, faces };
}

// ─── cmap ───────────────────────────────────────────────────────────────────
//
// Which code points a font maps to a glyph, read from its `cmap` table: the
// Unicode subtables in format 4 (BMP segments) and 12 (full-range groups).
// A code point that maps to glyph 0 (.notdef) is not covered; that glyph is
// the box.

/** @typedef {{ has(cp: number): boolean }} Cmap */

/**
 * @param {Buffer} font A TrueType/OpenType file.
 * @param {string} name For error messages.
 * @returns {Cmap}
 */
export function readCmap(font, name) {
  const numTables = font.readUInt16BE(4);
  let cmap = -1;
  for (let i = 0; i < numTables; i++) {
    const rec = 12 + i * 16;
    if (font.toString('latin1', rec, rec + 4) === 'cmap') cmap = font.readUInt32BE(rec + 8);
  }
  if (cmap < 0) throw new Error(`og-fonts: ${name} has no cmap table`);
  /** @type {((cp: number) => boolean)[]} */
  const lookups = [];
  const seen = new Set();
  const records = font.readUInt16BE(cmap + 2);
  for (let i = 0; i < records; i++) {
    const rec = cmap + 4 + i * 8;
    const platform = font.readUInt16BE(rec);
    const encoding = font.readUInt16BE(rec + 2);
    const unicode = platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10));
    const offset = cmap + font.readUInt32BE(rec + 4);
    if (!unicode || seen.has(offset)) continue;
    seen.add(offset);
    const format = font.readUInt16BE(offset);
    if (format === 4) lookups.push(format4(font, offset));
    else if (format === 12) lookups.push(format12(font, offset));
  }
  if (lookups.length === 0) throw new Error(`og-fonts: ${name} has no Unicode cmap subtable in format 4 or 12`);
  return { has: (cp) => lookups.some((lookup) => lookup(cp)) };
}

function format4(font, at) {
  const segCount = font.readUInt16BE(at + 6) / 2;
  const ends = at + 14;
  const starts = ends + segCount * 2 + 2;
  const deltas = starts + segCount * 2;
  const rangeOffsets = deltas + segCount * 2;
  return (cp) => {
    if (cp > 0xffff) return false;
    for (let s = 0; s < segCount; s++) {
      if (cp > font.readUInt16BE(ends + s * 2)) continue;
      const start = font.readUInt16BE(starts + s * 2);
      if (cp < start) return false;
      const delta = font.readUInt16BE(deltas + s * 2);
      const roAt = rangeOffsets + s * 2;
      const ro = font.readUInt16BE(roAt);
      if (ro === 0) return ((cp + delta) & 0xffff) !== 0;
      const glyph = font.readUInt16BE(roAt + ro + (cp - start) * 2);
      return glyph !== 0 && ((glyph + delta) & 0xffff) !== 0;
    }
    return false;
  };
}

function format12(font, at) {
  const groups = font.readUInt32BE(at + 12);
  return (cp) => {
    for (let g = 0; g < groups; g++) {
      const rec = at + 16 + g * 12;
      const start = font.readUInt32BE(rec);
      const end = font.readUInt32BE(rec + 4);
      if (cp >= start && cp <= end) return font.readUInt32BE(rec + 8) + (cp - start) !== 0;
    }
    return false;
  };
}

// ─── What a cover draws ─────────────────────────────────────────────────────

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decodeXml = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === '#'
      ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
      : ENTITIES[e] ?? m
  );

// Not drawn, so not looked up: ASCII whitespace, and the default-ignorable
// code points a shaper consumes (variation selectors, zero-width joiners,
// the BOM).
const NOT_DRAWN = /[\t\n\r ­​-‏⁠-⁤︀-️﻿]/u;

/**
 * The characters an SVG's `<text>` elements draw (tspans included), with the
 * comments, styles and the unrendered `title`/`desc`/`metadata` dropped.
 *
 * @param {string} svg
 * @returns {Map<number, string>} code point -> the first text it appears in
 */
export function svgTextChars(svg) {
  const source = svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(style|script|title|desc|metadata)\b[\s\S]*?<\/\1\s*>/g, '');
  const chars = new Map();
  for (const [, inner] of source.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text\s*>/g)) {
    const text = decodeXml(inner.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]*>/g, ''));
    for (const ch of text) {
      if (NOT_DRAWN.test(ch)) continue;
      const cp = ch.codePointAt(0);
      if (!chars.has(cp)) chars.set(cp, text.trim().replace(/\s+/g, ' '));
    }
  }
  return chars;
}

/**
 * The characters of an SVG that no bundled face can draw.
 *
 * @param {string} svg
 * @param {{ cmap: Cmap }[]} faces
 * @returns {{ char: string, codePoint: string, text: string }[]}
 */
export function uncoveredChars(svg, faces) {
  const missing = [];
  for (const [cp, text] of svgTextChars(svg)) {
    if (faces.some((face) => face.cmap.has(cp))) continue;
    missing.push({ char: String.fromCodePoint(cp), codePoint: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`, text });
  }
  return missing;
}
