#!/usr/bin/env node
// Regenerates scripts/lib/svg-text-metrics.mjs, the advance-width table that
// scripts/svg-text-fit.mjs measures blog SVG text with.
//
//   node scripts/gen-svg-text-metrics.mjs [fontDir]
//
// The source faces are Liberation Sans and Liberation Mono (SIL OFL), which are
// metric-compatible with Arial and Courier New: every glyph has the same
// advance width. Arial is what the blog SVGs' font stacks resolve to wherever
// the named system faces are missing, so it is the one width every reader's
// browser can fall back to. Only advance widths are copied (units per em 2048).
// fontDir defaults to the Debian/Ubuntu fonts-liberation path.
//
// Run it only to add characters to CHARSET below. The gate itself never reads a
// font file, which is what lets it run in CI without a browser or fonts.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { argv } from 'node:process';

const FONT_DIR = argv[2] ?? '/usr/share/fonts/truetype/liberation';
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), 'lib', 'svg-text-metrics.mjs');

const FACES = {
  regular: 'LiberationSans-Regular.ttf',
  bold: 'LiberationSans-Bold.ttf',
  italic: 'LiberationSans-Italic.ttf',
  boldItalic: 'LiberationSans-BoldItalic.ttf',
};
const MONO = 'LiberationMono-Regular.ttf';

// Printable ASCII, Latin-1, Latin Extended-A, general punctuation, arrows,
// common mathematical operators, geometric shapes and dingbats. A character
// the face does not cover is left out, and the gate charges it a full em.
const ranges = [
  [0x20, 0x7e], [0xa0, 0xff], [0x100, 0x17f], [0x2010, 0x205e], [0x20ac, 0x20ac],
  [0x2122, 0x2122], [0x2190, 0x21ff], [0x2200, 0x22ff], [0x2460, 0x2473],
  [0x25a0, 0x25ff], [0x2700, 0x27bf],
];
const CHARSET = ranges.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => a + i));

function readFont(file) {
  const buf = readFileSync(path.join(FONT_DIR, file));
  const tables = {};
  for (let i = 0, n = buf.readUInt16BE(4); i < n; i++) {
    const rec = 12 + i * 16;
    tables[buf.toString('latin1', rec, rec + 4)] = buf.readUInt32BE(rec + 8);
  }
  const unitsPerEm = buf.readUInt16BE(tables.head + 18);
  const numHMetrics = buf.readUInt16BE(tables.hhea + 34);
  const ascender = buf.readInt16BE(tables.hhea + 4);
  const descender = buf.readInt16BE(tables.hhea + 6);
  const advance = (gid) => buf.readUInt16BE(tables.hmtx + 4 * Math.min(gid, numHMetrics - 1));

  // cmap: prefer the format 12 (full Unicode) subtable, else format 4 (BMP).
  const cmap = tables.cmap;
  const subtables = [];
  for (let i = 0, n = buf.readUInt16BE(cmap + 2); i < n; i++) {
    const rec = cmap + 4 + i * 8;
    const offset = cmap + buf.readUInt32BE(rec + 4);
    subtables.push({ platform: buf.readUInt16BE(rec), encoding: buf.readUInt16BE(rec + 2), offset, format: buf.readUInt16BE(offset) });
  }
  const unicode = subtables.filter((s) => s.platform === 3 || s.platform === 0);
  const f12 = unicode.find((s) => s.format === 12);
  const f4 = unicode.find((s) => s.format === 4);
  let glyph;
  if (f12) {
    const groups = buf.readUInt32BE(f12.offset + 12);
    glyph = (cp) => {
      for (let g = 0; g < groups; g++) {
        const at = f12.offset + 16 + g * 12;
        const start = buf.readUInt32BE(at), end = buf.readUInt32BE(at + 4);
        if (cp >= start && cp <= end) return buf.readUInt32BE(at + 8) + (cp - start);
      }
      return 0;
    };
  } else {
    const o = f4.offset;
    const segX2 = buf.readUInt16BE(o + 6);
    const ends = o + 14, starts = ends + segX2 + 2, deltas = starts + segX2, rangeOffsets = deltas + segX2;
    glyph = (cp) => {
      if (cp > 0xffff) return 0;
      for (let s = 0; s < segX2; s += 2) {
        if (cp > buf.readUInt16BE(ends + s)) continue;
        const start = buf.readUInt16BE(starts + s);
        if (cp < start) return 0;
        const delta = buf.readInt16BE(deltas + s), ro = buf.readUInt16BE(rangeOffsets + s);
        if (ro === 0) return (cp + delta) & 0xffff;
        const g = buf.readUInt16BE(rangeOffsets + s + ro + 2 * (cp - start));
        return g === 0 ? 0 : (g + delta) & 0xffff;
      }
      return 0;
    };
  }
  return { unitsPerEm, ascender, descender, width: (cp) => { const g = glyph(cp); return g ? advance(g) : null; } };
}

const sans = Object.fromEntries(Object.entries(FACES).map(([k, f]) => [k, readFont(f)]));
const mono = readFont(MONO);
const units = sans.regular.unitsPerEm;
if (Object.values(sans).some((f) => f.unitsPerEm !== units) || mono.unitsPerEm !== units) throw new Error('faces disagree on unitsPerEm');

const covered = CHARSET.filter((cp) => Object.values(sans).every((f) => f.width(cp) !== null));
const monoCovered = CHARSET.filter((cp) => mono.width(cp) !== null);

// Characters are written as code points so the table holds no raw control or
// invisible bytes; numbers are base 36 to keep the file small.
const enc = (list) => list.map((n) => n.toString(36)).join(' ');
const body = `// GENERATED by scripts/gen-svg-text-metrics.mjs from Liberation Sans and
// Liberation Mono (SIL OFL; metric-compatible with Arial and Courier New).
// Advance widths only, in font units. Do not edit by hand: rerun the generator.
export const UNITS_PER_EM = ${units};
// hhea ascender and descender, in em: the box a browser reports for a line of text.
export const ASCENT = { sans: ${sans.regular.ascender / units}, mono: ${mono.ascender / units} };
export const DESCENT = { sans: ${-sans.regular.descender / units}, mono: ${-mono.descender / units} };
// Code points each face covers, base 36, in the order of its width list.
export const SANS_CODEPOINTS = '${enc(covered)}';
export const SANS_WIDTHS = {
${Object.entries(sans).map(([k, f]) => `  ${k}: '${enc(covered.map((cp) => f.width(cp)))}',`).join('\n')}
};
export const MONO_CODEPOINTS = '${enc(monoCovered)}';
export const MONO_WIDTHS = '${enc(monoCovered.map((cp) => mono.width(cp)))}';
`;
writeFileSync(OUT, body);
console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${covered.length} sans code points, ${monoCovered.length} mono code points`);
