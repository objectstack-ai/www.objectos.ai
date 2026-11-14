// The cover kit's parts library (cover spec v2, #430; the style page is
// docs/cover-style.md). Every part is a function that returns SVG markup, so
// a cover is a list of parts: `svg(parts, { topic, aria })` wraps them on the
// topic's ground with the arrowhead markers they use.
//
// The rules the parts encode, which the gate (scripts/cover-spec.mjs) cannot
// all see:
//
//   ground   the post's topic tint (scripts/lib/cover-colors.mjs TOPIC_TINTS), the
//            same colour as the card's topic chip; `svg()` paints it
//   hero     ONE solid saturated shape, brand indigo or green, about 22-35% of the
//            art box, with an offset same-hue tint behind it for depth (`tile`,
//            `door`, `layerBand`). Tiles may tilt 2-3 degrees; structural shapes
//            (wall, door, layer band) never do
//   art      line art in ink (grey for "unchanged"), stroke 9, round caps and
//            joins, corner radii about 22-44, curved connectors where meaning allows
//   faces    minimal (dot eyes, a smile arc), only on a person or an agent, only
//            where people are the subject
//   red      status only: a thin refused path ending in a stop bar (`stopBar`)
//   labels   none by default; at most one code token of at most 8 characters (`label`)
//   canvas   1200x675; the art box is about x 150-1050, y 100-575
//   overlap  no line crosses a filled shape, a white detail or another line unless
//            the crossing is the meaning; an arrowhead stops >= 10px short of any
//            stroke; no connector runs under an object
//
// Fill colours count against the gate's maxFills (6, ground and white
// included); strokes do not, so a status shape is drawn as an outline.
import { TOPIC_TINTS } from '../lib/cover-colors.mjs';

// ─── Palette (site tokens; scripts/cover-dark.mjs paints the dark variant) ───
export const C = {
  ink: '#151a17', // --ink
  grey: '#626c66', // --muted: projections that stay unchanged
  brand: '#3d58f0', // --brand: hero
  brandTint: '#b9c3fa', // offset tile behind an indigo hero
  green: '#087f5b', // --green: hero / passing / created
  greenTint: '#a9d8c4', // offset tile behind a green hero
  red: '#bd4b4b', // --red: refused (status)
  amber: '#93600f', // --amber: skipped (status)
  white: '#ffffff', // detail on a hero (maps to the dark surface in dark mode)
};

/** The light ground of each topic: the cover's first rect, and its chip's background. */
export const GROUNDS = Object.fromEntries(Object.entries(TOPIC_TINTS).map(([slug, t]) => [slug, t.light]));

export const STROKE = 9;
export const WIDTH = 1200;
export const HEIGHT = 675;
/** The art box: keep every part inside it, with even margins. */
export const ART = { x0: 150, x1: 1050, y0: 100, y1: 575 };
const MONO = 'ui-monospace,Menlo,Consolas,monospace';

// ─── Primitives ──────────────────────────────────────────────────────────────
/** A stroked path with round caps and joins. */
export const line = (d, color = C.ink, w = STROKE, extra = '') =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;
/** A stroked path ending in an arrowhead (`svg()` emits the marker for its colour). */
export const arrow = (d, color = C.ink, w = STROKE, extra = '') => line(d, color, w, ` marker-end="url(#a-${color.slice(1)})"${extra}`);
/** Dotted connector (round dots) for an indirect path, e.g. a write-back: pass as `extra`. */
export const DOTTED = ' stroke-dasharray="2 20"';
/** Dashed outline, e.g. a dry run that stores nothing: pass as `extra`. */
export const DASHED = ' stroke-dasharray="22 16"';
/** Bars of a small chart: a thick stroke with flat ends (the one part without round caps). */
export const bars = (d, color = C.ink, w = 22) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}"/>`;
/** A filled rounded rectangle. */
export const fill = (x, y, w, h, color, rx = 40) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${color}"/>`;
/** An outlined rounded rectangle (a card or box in the line art). `w` and `extra` restyle the stroke. */
export const box = (x, y, w, h, color = C.ink, rx = 40, { w: sw = STROKE, extra = '' } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${color}" stroke-width="${sw}"${extra}/>`;
/** An outlined circle (a status badge, a head in a log row). */
export const ring = (cx, cy, r, color = C.ink, w = STROKE) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${w}"/>`;
/** A filled circle (a pupil, a node). */
export const dot = (cx, cy, r, color = C.ink) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
/** Offset same-hue tint behind a hero, for depth. Keep the offset clear of neighbours. */
export const offsetTint = (x, y, w, h, tint, rx = 44, dx = 22, dy = 22) => fill(x + dx, y + dy, w, h, tint, rx);
/** A hero tile: offset tint + solid hero, optionally tilted (tiles only), with inner detail on top. */
export function tile(x, y, w, h, { color = C.brand, tint = C.brandTint, deg = 0, rx = 44, inner = '' } = {}) {
  const body = `${offsetTint(x, y, w, h, tint, rx)}${fill(x, y, w, h, color, rx)}${[inner].flat().join('')}`;
  return deg ? `<g transform="rotate(${deg} ${x + w / 2} ${y + h / 2})">${body}</g>` : body;
}
/** A refused path's stop bar: vertical across a horizontal path, or horizontal across a vertical one. */
export const stopBar = (x, y, across = 'vertical') => line(across === 'vertical' ? `M${x} ${y - 18}v36` : `M${x - 18} ${y}h36`, C.red, 12);
/** A chevron inside a slot showing passage: `dir` is 'right' or 'up'. */
export const slotChevron = (cx, cy, color, dir = 'right', s = 1) =>
  dir === 'right' ? line(`M${cx - 6 * s} ${cy - 13 * s}l${13 * s} ${13 * s} ${-13 * s} ${13 * s}`, color, 9) : line(`M${cx - 14 * s} ${cy + 7 * s}l${14 * s} ${-14 * s} ${14 * s} ${14 * s}`, color, 9);

// ─── Figures ─────────────────────────────────────────────────────────────────
/** Minimal friendly face: two dot eyes and a small smile arc. */
export function face(cx, cy, s = 1, color = C.ink) {
  return `<g fill="${color}"><circle cx="${cx - 14 * s}" cy="${cy - 4 * s}" r="${6.5 * s}"/><circle cx="${cx + 14 * s}" cy="${cy - 4 * s}" r="${6.5 * s}"/></g>${line(`M${cx - 13 * s} ${cy + 12 * s}q${13 * s} ${12 * s} ${26 * s} 0`, color, 6 * s)}`;
}
/** A person: round head and shoulders arc. `withFace` adds the minimal face. */
export function person(cx, headY, { color = C.ink, s = 1, withFace = false, w = STROKE } = {}) {
  return `<g fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"><circle cx="${cx}" cy="${headY}" r="${46 * s}"/><path d="M${cx - 76 * s} ${headY + 140 * s}a${76 * s} ${70 * s} 0 0 1 ${152 * s} 0"/></g>${withFace ? face(cx, headY + 2 * s, s, color) : ''}`;
}
/** An AI agent: rounded robot head with antenna, shoulders arc; dot eyes, or the full face. */
export function agent(cx, headY, { color = C.ink, s = 1, withFace = false, w = STROKE } = {}) {
  const hw = 52 * s, hh = 42 * s;
  const eyes = withFace ? face(cx, headY + 2 * s, s, color) : `<g fill="${color}"><circle cx="${cx - 18 * s}" cy="${headY}" r="${8 * s}"/><circle cx="${cx + 18 * s}" cy="${headY}" r="${8 * s}"/></g>`;
  return `<g fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><rect x="${cx - hw}" y="${headY - hh}" width="${2 * hw}" height="${2 * hh}" rx="${26 * s}"/><path d="M${cx} ${headY - hh}v${-20 * s}"/><path d="M${cx - 76 * s} ${headY + 140 * s}a${76 * s} ${70 * s} 0 0 1 ${152 * s} 0"/></g><circle cx="${cx}" cy="${headY - hh - 30 * s}" r="${10 * s}" fill="${color}"/>${eyes}`;
}
/** A database cylinder (outline) with `bands` inner arcs. */
export function cylinder(cx, top, w, h, { color = C.ink, bands = 1 } = {}) {
  const rx = w / 2, ry = Math.round(w * 0.12);
  const mids = Array.from({ length: bands }, (_, i) => `<path d="M${cx - rx} ${top + (h * (i + 1)) / (bands + 1)}a${rx} ${ry} 0 0 0 ${w} 0"/>`).join('');
  return `<g fill="none" stroke="${color}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}"/><path d="M${cx - rx} ${top}v${h}a${rx} ${ry} 0 0 0 ${w} 0v${-h}"/>${mids}</g>`;
}
/** A wall (structural, never tilted) painted whole; draw it before whatever sits in front of it. */
export const wall = (x, y, h, w = 40) => fill(x, y, w, h, C.ink, w / 2);
/** A door hero (structural, never tilted) with white slots; the tint is inset so it never covers the wall. */
export function door(x, y, w, h, slotsY, { color = C.brand, tint = C.brandTint, slotW = 200, chevron = C.green } = {}) {
  const sx = x + (w - slotW) / 2;
  return [
    fill(x + 22, y + 18, w, h - 18, tint, 44),
    fill(x, y, w, h, color, 44),
    ...slotsY.map((sy) => fill(sx, sy - 25, slotW, 50, C.white, 25)),
    ...slotsY.map((sy) => slotChevron(x + w / 2, sy, chevron, 'right')),
  ].join('');
}
/** A layer band hero (structural, never tilted) with white slots where things pass up through it. */
export function layerBand(x, y, w, h, slotsX, { color = C.brand, tint = C.brandTint, slotW = 60, chevron = C.ink } = {}) {
  const sh = h - 28;
  return [
    fill(x, y + 16, w, h, tint, h / 2),
    fill(x, y, w, h, color, h / 2),
    ...slotsX.map((sx) => fill(sx - slotW / 2, y + 14, slotW, sh, C.white, slotW / 2)),
    ...slotsX.map((sx) => slotChevron(sx, y + h / 2, chevron, 'up', 1.2)),
  ].join('');
}
/** The one optional label: a code token (at most 8 characters), 56px monospace bold. */
export const label = (x, y, text, color, anchor = 'start') =>
  `<text x="${x}" y="${y}"${anchor === 'start' ? '' : ` text-anchor="${anchor}"`} font-family="${MONO}" font-size="56" font-weight="700" fill="${color}">${text}</text>`;

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * Wrap a cover's parts into a complete SVG document: the root with its
 * aria-label, the arrowhead markers the parts use, the topic's ground, then
 * the parts in order (later parts paint over earlier ones).
 * @param {(string | string[])[]} parts
 * @param {{ topic?: string, ground?: string, aria: string }} opts `topic` picks the ground; `ground` overrides it.
 */
export function svg(parts, { topic, ground = topic ? GROUNDS[topic] : undefined, aria }) {
  if (!ground) throw new Error(`no ground: "${topic}" is not a topic (${Object.keys(GROUNDS).join(', ')})`);
  const flat = parts.flat(Infinity).filter(Boolean);
  const body = flat.join('');
  const colours = [...new Set((body.match(/url\(#a-([0-9a-f]{6})\)/g) ?? []).map((m) => m.slice(7, 13)))];
  const o = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="${escapeAttr(aria)}">`];
  if (colours.length) {
    o.push('  <defs>');
    for (const h of colours) {
      o.push(`    <marker id="a-${h}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.6" markerHeight="3.6" orient="auto"><path d="M1 1.2Q1 0 2.2 0.6L9 4.2Q10 5 9 5.8L2.2 9.4Q1 10 1 8.8z" fill="#${h}"/></marker>`);
    }
    o.push('  </defs>');
  }
  o.push(`  <rect width="${WIDTH}" height="${HEIGHT}" fill="${ground}"/>`);
  for (const p of flat) o.push(`  ${p}`);
  o.push('</svg>', '');
  return o.join('\n');
}
