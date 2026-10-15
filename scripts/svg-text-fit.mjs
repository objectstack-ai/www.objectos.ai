#!/usr/bin/env node
// Blog SVG text-fit gate: fails when a <text> box crosses the edge of the
// filled shape painted under its centre, or runs under a filled shape painted
// over it.
//
//   node scripts/svg-text-fit.mjs [--verbose] [file.svg ...]      (pnpm svg:lint)
//
// No file arguments: every .svg under content/blog. --verbose prints each text
// box's clearance to its shape, which is how a fix is measured before and after.
// Runs in `pnpm build`, so CI's Build step fails on a finding.
//
// What is measured. For every <text> the gate lays the line out the way a
// browser does (CSS cascade, inheritance, text-anchor, letter-spacing, tspans,
// transforms) and takes the box a browser reports for it: the advance width
// across, the font's ascent and descent up and down. Then two rules:
//   1. The shape under the text is the last filled rect, circle, ellipse,
//      polygon or path painted before it whose fill holds the box's centre
//      (none: the canvas). The box may not run past that shape's bounding box
//      by more than TOLERANCE px on any side.
//   2. A filled shape painted after the text may not cover more than TOLERANCE
//      px of the box in both directions: a card drawn over the end of a line
//      hides it just as surely as a card that is too narrow.
//
// Why font metrics and not a browser. CI (.github/workflows/cloudflare-pages.yml)
// installs no browser and the repo depends on no browser driver, and a gate that
// measured whatever font the machine happened to have would pass on one machine
// and fail on another. Widths therefore come from a fixed table of Arial advances
// (scripts/lib/svg-text-metrics.mjs, from the metric-compatible Liberation
// faces): Arial is what the blog font stacks ("-apple-system, ... sans-serif",
// "Inter, Arial, sans-serif", "ui-monospace, Menlo, monospace") fall back to,
// and the faces readers get on macOS and Windows are as wide or wider. So a
// failure is an overflow on every machine, and a pass is a floor, not a
// guarantee: leave a fix some room. Not modelled: kerning (which only narrows
// text, so the gate errs strict) and glyphs outside the table, which are charged
// a full em (1.25em for emoji). Checked against headless Chromium rendering the
// same files with Liberation Sans/Mono: over 2,232 boxes the gate was never more
// than 2px narrower than Chromium (which rounds boxes out to whole pixels) and
// at most 3.9px wider (kerning, and the em charge), and both found the same
// crossings.
//
// The allowlist below is for a text that crosses an edge on purpose — a caption
// centred on the whole diagram that spans two regions, a label set across a
// boundary. Each entry names the file, the rule ('edge' or 'covered'), the
// text's full content and why it is deliberate. An entry that no longer matches
// a finding fails the gate, so the list cannot outlive the art it excuses.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';
import {
  UNITS_PER_EM, ASCENT, DESCENT, SANS_CODEPOINTS, SANS_WIDTHS, MONO_CODEPOINTS, MONO_WIDTHS,
} from './lib/svg-text-metrics.mjs';

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
// px a box may run past its shape before the gate fails: anti-aliasing and the
// kerning the table does not model, not a design allowance.
const TOLERANCE = 2;

const ALLOW = [
  {
    file: 'content/blog/objectos-agent-permission-boundaries/security-pipeline-en.svg',
    rule: 'edge',
    text: 'The build rejects a row-level rule that would compile to nothing — the failure that reads as an authorization and behaves as a blanket refusal.',
    reason: 'footnote centred on the whole pipeline card; it runs across the dashed context-window band by design',
  },
];

// --- font metrics ----------------------------------------------------------

const decode = (s) => s.split(' ').map((n) => parseInt(n, 36));
const sansCodepoints = decode(SANS_CODEPOINTS);
const SANS = Object.fromEntries(
  Object.entries(SANS_WIDTHS).map(([face, list]) => {
    const widths = decode(list);
    return [face, new Map(sansCodepoints.map((cp, i) => [cp, widths[i]]))];
  }),
);
const monoWidths = decode(MONO_WIDTHS);
const MONO = new Map(decode(MONO_CODEPOINTS).map((cp, i) => [cp, monoWidths[i]]));
const EMOJI = /\p{Extended_Pictographic}/u;

const isMono = (family) => /mono|courier|consolas|menlo/i.test(family);
const sansFace = (weight, style) => {
  const bold = weight >= 600;
  const italic = /italic|oblique/.test(style);
  return bold ? (italic ? 'boldItalic' : 'bold') : italic ? 'italic' : 'regular';
};

// Advance of one character in em. Glyphs the faces do not cover come from a
// fallback font the gate cannot know, so they are charged generously.
function advanceEm(ch, style) {
  const cp = ch.codePointAt(0);
  const table = isMono(style.fontFamily) ? MONO : SANS[sansFace(style.fontWeight, style.fontStyle)];
  const units = table.get(cp);
  if (units !== undefined) return units / UNITS_PER_EM;
  if (cp === 0xfe0f || cp === 0x200d) return 0; // emoji presentation selector, joiner
  if (EMOJI.test(ch)) return 1.25;
  return 1; // CJK, fullwidth forms, symbols the faces lack
}

// --- XML -------------------------------------------------------------------

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const decodeEntities = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] !== '#') return ENTITIES[e] ?? m;
    return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
  });

class Unsupported extends Error {}

function parseXml(src) {
  const lineStarts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') lineStarts.push(i + 1);
  const lineAt = (offset) => {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= offset) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  };
  const TOKEN = /<!--[\s\S]*?-->|<!\[CDATA\[([\s\S]*?)\]\]>|<\?[\s\S]*?\?>|<!DOCTYPE[^>]*>|<\/([^\s>]+)\s*>|<([^\s/>!?]+)((?:\s+[^\s=/>]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|[^<]+/gy;
  const doc = { name: '#document', children: [] };
  const stack = [doc];
  let m;
  while (TOKEN.lastIndex < src.length) {
    const at = TOKEN.lastIndex;
    if (!(m = TOKEN.exec(src))) throw new Unsupported(`unparseable markup at line ${lineAt(at)}`);
    const parent = stack[stack.length - 1];
    if (m[1] !== undefined) parent.children.push({ text: m[1] });
    else if (m[2] !== undefined) {
      if (stack.length === 1 || parent.name !== m[2]) throw new Unsupported(`unexpected </${m[2]}> at line ${lineAt(at)}`);
      stack.pop();
    } else if (m[3] !== undefined) {
      const attrs = {};
      for (const a of m[4].matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) attrs[a[1]] = decodeEntities(a[2] ?? a[3]);
      const node = { name: m[3], attrs, children: [], parent, line: lineAt(at) };
      parent.children.push(node);
      if (!m[5]) stack.push(node);
    } else if (m[0][0] !== '<') parent.children.push({ text: decodeEntities(m[0]) });
  }
  if (stack.length !== 1) throw new Unsupported(`unclosed <${stack[stack.length - 1].name}>`);
  const svg = doc.children.find((n) => n.name === 'svg');
  if (!svg) throw new Unsupported('no <svg> root');
  svg.parent = null;
  return svg;
}

// --- CSS -------------------------------------------------------------------

const PROPS = new Set([
  'fill', 'fill-opacity', 'fill-rule', 'opacity', 'display', 'visibility', 'font-family', 'font-size',
  'font-weight', 'font-style', 'text-anchor', 'letter-spacing',
]);
const INHERITED = new Set([
  'fill', 'fill-opacity', 'fill-rule', 'visibility', 'font-family', 'font-size', 'font-weight', 'font-style',
  'text-anchor', 'letter-spacing',
]);
// Properties that would move or reshape text in ways this gate does not model.
const UNMODELLED = new Set(['font', 'transform', 'font-stretch', 'font-variant', 'word-spacing', 'text-length', 'writing-mode', 'direction']);

function parseDecls(text, where) {
  const out = {};
  for (const decl of text.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim().toLowerCase();
    const value = decl.slice(i + 1).trim();
    if (/!important/i.test(value)) throw new Unsupported(`!important in ${where}`);
    if (UNMODELLED.has(prop)) throw new Unsupported(`CSS property "${prop}" in ${where} is not modelled`);
    if (PROPS.has(prop)) out[prop] = value;
  }
  return out;
}

function parseSelector(sel) {
  const parts = [];
  let combinator = ' ';
  for (const token of sel.replace(/\s*>\s*/g, ' > ').trim().split(/\s+/)) {
    if (token === '>') { combinator = '>'; continue; }
    const m = token.match(/^([a-zA-Z][\w-]*|\*)?((?:[.#][\w-]+)*)$/);
    if (!m) throw new Unsupported(`CSS selector "${sel}" is not modelled`);
    parts.push({
      combinator,
      tag: m[1] && m[1] !== '*' ? m[1] : null,
      classes: [...m[2].matchAll(/\.([\w-]+)/g)].map((c) => c[1]),
      ids: [...m[2].matchAll(/#([\w-]+)/g)].map((c) => c[1]),
    });
    combinator = ' ';
  }
  const spec = parts.reduce((s, p) => s + p.ids.length * 10000 + p.classes.length * 100 + (p.tag ? 1 : 0), 0);
  return { parts, spec };
}

function parseCss(css) {
  const rules = [];
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  if (/@/.test(clean)) throw new Unsupported('CSS at-rules are not modelled');
  for (const m of clean.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const decls = parseDecls(m[2], `rule "${m[1].trim()}"`);
    for (const sel of m[1].split(',')) {
      if (sel.trim()) rules.push({ ...parseSelector(sel.trim()), decls, order: rules.length });
    }
  }
  return rules;
}

const classesOf = (el) => (el.attrs.class ?? '').split(/\s+/).filter(Boolean);
const compoundMatches = (el, p) =>
  (!p.tag || p.tag === el.name) && p.ids.every((id) => el.attrs.id === id) && p.classes.every((c) => classesOf(el).includes(c));

function selectorMatches(el, parts, i = parts.length - 1) {
  if (!compoundMatches(el, parts[i])) return false;
  if (i === 0) return true;
  if (parts[i].combinator === '>') return el.parent ? selectorMatches(el.parent, parts, i - 1) : false;
  for (let a = el.parent; a; a = a.parent) if (selectorMatches(a, parts, i - 1)) return true;
  return false;
}

// --- geometry --------------------------------------------------------------

const IDENTITY = [1, 0, 0, 1, 0, 0];
const multiply = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
const apply = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
function invert(m) {
  const det = m[0] * m[3] - m[1] * m[2];
  if (!det) return null;
  return [m[3] / det, -m[1] / det, -m[2] / det, m[0] / det, (m[2] * m[5] - m[3] * m[4]) / det, (m[1] * m[4] - m[0] * m[5]) / det];
}
const numbers = (s) => (s.match(/[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) ?? []).map(Number);

function parseTransform(text) {
  let m = IDENTITY;
  for (const [, fn, args] of (text ?? '').matchAll(/(\w+)\s*\(([^)]*)\)/g)) {
    const a = numbers(args);
    const rad = ((a[0] ?? 0) * Math.PI) / 180;
    let t;
    if (fn === 'translate') t = [1, 0, 0, 1, a[0] ?? 0, a[1] ?? 0];
    else if (fn === 'scale') t = [a[0], 0, 0, a[1] ?? a[0], 0, 0];
    else if (fn === 'rotate') {
      const [cos, sin, cx, cy] = [Math.cos(rad), Math.sin(rad), a[1] ?? 0, a[2] ?? 0];
      t = multiply(multiply([1, 0, 0, 1, cx, cy], [cos, sin, -sin, cos, 0, 0]), [1, 0, 0, 1, -cx, -cy]);
    } else if (fn === 'skewX') t = [1, 0, Math.tan(rad), 1, 0, 0];
    else if (fn === 'skewY') t = [1, Math.tan(rad), 0, 1, 0, 0];
    else if (fn === 'matrix') t = a.slice(0, 6);
    else throw new Unsupported(`transform ${fn}() is not modelled`);
    m = multiply(m, t);
  }
  return m;
}

const boxOf = (points) => {
  const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
};
const corners = (b) => [[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]];
const toRoot = (m, b) => boxOf(corners(b).map((p) => apply(m, p)));

// Path data flattened to polygons: curves and arcs are sampled, which is
// plenty for "does the fill contain this point" and "where are its edges".
function flattenPath(d) {
  const tokens = d.match(/[a-df-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) ?? [];
  const subpaths = [];
  let i = 0, cmd = null, cur = [0, 0], start = [0, 0], poly = null, lastCtrl = null, lastCmd = '';
  const num = () => Number(tokens[i++]);
  const STEPS = 16;
  const push = (p) => { if (!poly) { poly = [cur]; subpaths.push(poly); } poly.push(p); cur = p; };
  while (i < tokens.length) {
    if (/[a-z]/i.test(tokens[i])) cmd = tokens[i++];
    else if (!cmd) throw new Unsupported(`path data "${d.slice(0, 30)}…" has a number with no command`);
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    const pt = (x, y) => (rel ? [cur[0] + x, cur[1] + y] : [x, y]);
    if (C === 'M') {
      cur = pt(num(), num()); start = cur; poly = [cur]; subpaths.push(poly);
      cmd = rel ? 'l' : 'L';
    } else if (C === 'L') push(pt(num(), num()));
    else if (C === 'H') { const x = num(); push([rel ? cur[0] + x : x, cur[1]]); }
    else if (C === 'V') { const y = num(); push([cur[0], rel ? cur[1] + y : y]); }
    else if (C === 'Z') { push(start); poly = null; cur = start; cmd = null; }
    else if (C === 'C' || C === 'S' || C === 'Q' || C === 'T') {
      const p0 = cur;
      let c1, c2, end;
      const reflect = () => (lastCtrl && /[CSQT]/.test(lastCmd) ? [2 * p0[0] - lastCtrl[0], 2 * p0[1] - lastCtrl[1]] : p0);
      if (C === 'C') { c1 = pt(num(), num()); c2 = pt(num(), num()); end = pt(num(), num()); }
      else if (C === 'S') { c1 = reflect(); c2 = pt(num(), num()); end = pt(num(), num()); }
      else if (C === 'Q') { c1 = pt(num(), num()); end = pt(num(), num()); c2 = null; }
      else { c1 = reflect(); end = pt(num(), num()); c2 = null; }
      for (let s = 1; s <= STEPS; s++) {
        const t = s / STEPS, u = 1 - t;
        const p = c2
          ? [u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * end[0],
            u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * end[1]]
          : [u * u * p0[0] + 2 * u * t * c1[0] + t * t * end[0], u * u * p0[1] + 2 * u * t * c1[1] + t * t * end[1]];
        push(p);
      }
      lastCtrl = c2 ?? c1; lastCmd = C;
      continue;
    } else if (C === 'A') {
      let [rx, ry, rot, large, sweep] = [Math.abs(num()), Math.abs(num()), num(), num(), num()];
      const end = pt(num(), num());
      const p0 = cur;
      if (!rx || !ry) { push(end); } else {
        // SVG implementation notes F.6.5: endpoint to centre parameterisation.
        const phi = (rot * Math.PI) / 180, cos = Math.cos(phi), sin = Math.sin(phi);
        const dx = (p0[0] - end[0]) / 2, dy = (p0[1] - end[1]) / 2;
        const x1 = cos * dx + sin * dy, y1 = -sin * dx + cos * dy;
        const lambda = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry);
        if (lambda > 1) { rx *= Math.sqrt(lambda); ry *= Math.sqrt(lambda); }
        const sign = large === sweep ? -1 : 1;
        const k = sign * Math.sqrt(Math.max(0, (rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) / (rx * rx * y1 * y1 + ry * ry * x1 * x1)));
        const cxp = (k * rx * y1) / ry, cyp = (-k * ry * x1) / rx;
        const cx = cos * cxp - sin * cyp + (p0[0] + end[0]) / 2, cy = sin * cxp + cos * cyp + (p0[1] + end[1]) / 2;
        const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
        const t1 = ang(1, 0, (x1 - cxp) / rx, (y1 - cyp) / ry);
        let dt = ang((x1 - cxp) / rx, (y1 - cyp) / ry, (-x1 - cxp) / rx, (-y1 - cyp) / ry);
        if (!sweep && dt > 0) dt -= 2 * Math.PI;
        if (sweep && dt < 0) dt += 2 * Math.PI;
        for (let s = 1; s <= STEPS; s++) {
          const t = t1 + (dt * s) / STEPS;
          push([cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin, cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos]);
        }
        cur = end;
      }
    } else throw new Unsupported(`path command ${cmd} is not modelled`);
    lastCtrl = null; lastCmd = C;
  }
  return subpaths.filter((p) => p.length > 1);
}

function inPolygons(polys, [x, y], evenOdd) {
  let winding = 0, crossings = 0;
  for (const poly of polys) {
    for (let k = 0; k < poly.length; k++) {
      const [ax, ay] = poly[k], [bx, by] = poly[(k + 1) % poly.length];
      if ((ay <= y) !== (by <= y)) {
        const xi = ax + ((y - ay) * (bx - ax)) / (by - ay);
        if (xi > x) { crossings++; winding += by > ay ? 1 : -1; }
      }
    }
  }
  return evenOdd ? crossings % 2 === 1 : winding !== 0;
}

const len = (v, ref) => (v === undefined ? 0 : /%$/.test(v) ? (parseFloat(v) / 100) * ref : parseFloat(v) || 0);

// Local geometry of a painted shape: its bounding box and a point test.
function shapeGeometry(el, canvas) {
  const a = el.attrs;
  const W = canvas.x1 - canvas.x0, H = canvas.y1 - canvas.y0;
  if (el.name === 'rect') {
    const x = len(a.x, W), y = len(a.y, H), w = len(a.width, W), h = len(a.height, H);
    if (w <= 0 || h <= 0) return null;
    let rx = a.rx !== undefined ? len(a.rx, W) : a.ry !== undefined ? len(a.ry, H) : 0;
    let ry = a.ry !== undefined ? len(a.ry, H) : rx;
    rx = Math.min(rx, w / 2); ry = Math.min(ry, h / 2);
    return {
      box: { x0: x, y0: y, x1: x + w, y1: y + h },
      contains: ([px, py]) => {
        if (px < x || px > x + w || py < y || py > y + h) return false;
        if (!rx || !ry) return true;
        const qx = px < x + rx ? x + rx : px > x + w - rx ? x + w - rx : px;
        const qy = py < y + ry ? y + ry : py > y + h - ry ? y + h - ry : py;
        return ((px - qx) / rx) ** 2 + ((py - qy) / ry) ** 2 <= 1;
      },
    };
  }
  if (el.name === 'circle' || el.name === 'ellipse') {
    const cx = len(a.cx, W), cy = len(a.cy, H);
    const rx = el.name === 'circle' ? len(a.r, W) : len(a.rx, W);
    const ry = el.name === 'circle' ? rx : len(a.ry, H);
    if (rx <= 0 || ry <= 0) return null;
    return {
      box: { x0: cx - rx, y0: cy - ry, x1: cx + rx, y1: cy + ry },
      contains: ([px, py]) => ((px - cx) / rx) ** 2 + ((py - cy) / ry) ** 2 <= 1,
    };
  }
  const polys = el.name === 'path'
    ? flattenPath(a.d ?? '')
    : [numbers(a.points ?? '').reduce((pts, n, k, all) => (k % 2 ? pts : [...pts, [n, all[k + 1]]]), [])];
  const points = polys.flat();
  if (points.length < 3) return null;
  return { box: boxOf(points), contains: (p, evenOdd) => inPolygons(polys, p, evenOdd), polygonal: true };
}

// --- the walk --------------------------------------------------------------

const NOT_RENDERED = new Set(['defs', 'marker', 'clipPath', 'mask', 'pattern', 'symbol', 'linearGradient', 'radialGradient', 'filter', 'title', 'desc', 'metadata', 'style', 'script']);
const SHAPES = new Set(['rect', 'circle', 'ellipse', 'polygon', 'path']);
const UNSUPPORTED_ELEMENTS = new Set(['use', 'svg', 'image', 'foreignObject', 'textPath', 'switch']);

function computeStyle(el, rules, parentStyle) {
  const specified = {};
  for (const prop of PROPS) if (el.attrs[prop] !== undefined) specified[prop] = el.attrs[prop].trim();
  const matching = rules.filter((r) => selectorMatches(el, r.parts)).sort((p, q) => p.spec - q.spec || p.order - q.order);
  for (const r of matching) Object.assign(specified, r.decls);
  if (el.attrs.style) Object.assign(specified, parseDecls(el.attrs.style, `style attribute at line ${el.line}`));
  for (const [prop, value] of Object.entries(specified)) if (value === 'inherit') delete specified[prop];

  const parent = parentStyle ?? { fill: 'black', 'fill-opacity': '1', 'fill-rule': 'nonzero', visibility: 'visible', 'font-family': 'serif', fontSize: 16, fontWeight: 400, 'font-style': 'normal', 'text-anchor': 'start', letterSpacing: 0 };
  const style = {};
  for (const prop of INHERITED) style[prop] = specified[prop] ?? parent[prop];
  style.display = specified.display ?? 'inline';
  style.opacity = specified.opacity ?? '1';

  const size = specified['font-size'];
  if (size === undefined) style.fontSize = parent.fontSize;
  else if (/em$/.test(size)) style.fontSize = parseFloat(size) * parent.fontSize;
  else if (/%$/.test(size)) style.fontSize = (parseFloat(size) / 100) * parent.fontSize;
  else if (/^[\d.]+(px)?$/.test(size)) style.fontSize = parseFloat(size);
  else throw new Unsupported(`font-size "${size}" at line ${el.line} is not modelled`);

  const weight = specified['font-weight'];
  if (weight === undefined) style.fontWeight = parent.fontWeight;
  else if (weight === 'normal') style.fontWeight = 400;
  else if (weight === 'bold') style.fontWeight = 700;
  else if (weight === 'bolder') style.fontWeight = parent.fontWeight >= 600 ? 900 : 700;
  else if (weight === 'lighter') style.fontWeight = parent.fontWeight >= 600 ? 400 : 100;
  else style.fontWeight = Number(weight);

  const spacing = specified['letter-spacing'];
  if (spacing === undefined) style.letterSpacing = parent.letterSpacing;
  else if (spacing === 'normal') style.letterSpacing = 0;
  else if (/em$/.test(spacing)) style.letterSpacing = parseFloat(spacing) * style.fontSize;
  else style.letterSpacing = parseFloat(spacing) || 0;

  style.fontFamily = style['font-family'];
  style.fontStyle = style['font-style'];
  return style;
}

const filled = (style) =>
  style.fill !== 'none' && style.fill !== 'transparent' && Number(style['fill-opacity']) > 0 && Number(style.opacity) > 0;

// Lays one <text> out into chunks (a chunk starts at the text and at every
// tspan with its own x or y) and returns the box a browser reports for it.
function layoutText(text, rules, textStyle) {
  const runs = [];
  const visit = (node, style) => {
    for (const child of node.children) {
      if (child.text !== undefined) { runs.push({ text: child.text, style }); continue; }
      if (UNSUPPORTED_ELEMENTS.has(child.name)) throw new Unsupported(`<${child.name}> inside <text> at line ${text.line}`);
      if (child.name !== 'tspan' && child.name !== 'a') continue;
      const s = computeStyle(child, rules, style);
      if (s.display === 'none') continue;
      for (const k of ['x', 'y', 'dx', 'dy']) if (numbers(child.attrs[k] ?? '').length > 1) throw new Unsupported(`per-glyph ${k} list at line ${child.line}`);
      runs.push({ move: child.attrs, style: s });
      visit(child, s);
    }
  };
  for (const k of ['x', 'y', 'dx', 'dy']) if (numbers(text.attrs[k] ?? '').length > 1) throw new Unsupported(`per-glyph ${k} list at line ${text.line}`);
  visit(text, textStyle);

  // White space: collapsed and trimmed across the whole element, as browsers
  // do for the default xml:space; preserved (newlines as spaces) otherwise.
  const preserve = text.attrs['xml:space'] === 'preserve';
  const chars = [];
  let pendingMove = null;
  for (const run of runs) {
    if (run.move) { pendingMove = { ...(pendingMove ?? {}), ...run.move, style: run.style }; continue; }
    for (const ch of run.text.replace(/[\t\n\r]/g, ' ')) {
      if (!preserve && ch === ' ' && (chars.length === 0 || chars[chars.length - 1].ch === ' ')) continue;
      chars.push({ ch, style: run.style, move: pendingMove });
      pendingMove = null;
    }
  }
  while (!preserve && chars.length && chars[chars.length - 1].ch === ' ') chars.pop();
  if (!chars.length) return null;

  const chunks = [];
  let penX = parseFloat(text.attrs.x) || 0, penY = parseFloat(text.attrs.y) || 0;
  penX += parseFloat(text.attrs.dx) || 0; penY += parseFloat(text.attrs.dy) || 0;
  let chunk = null;
  for (const c of chars) {
    const mv = c.move;
    const starts = !chunk || (mv && (mv.x !== undefined || mv.y !== undefined));
    if (mv?.x !== undefined) penX = parseFloat(mv.x);
    if (mv?.y !== undefined) penY = parseFloat(mv.y);
    if (mv) { penX += parseFloat(mv.dx) || 0; penY += parseFloat(mv.dy) || 0; }
    if (starts) {
      chunk = { start: penX, end: penX, anchor: (chunk ? mv.style : textStyle)['text-anchor'], y0: Infinity, y1: -Infinity };
      chunks.push(chunk);
    }
    const s = c.style;
    penX += advanceEm(c.ch, s) * s.fontSize + s.letterSpacing;
    chunk.end = penX;
    const face = isMono(s.fontFamily) ? 'mono' : 'sans';
    chunk.y0 = Math.min(chunk.y0, penY - ASCENT[face] * s.fontSize);
    chunk.y1 = Math.max(chunk.y1, penY + DESCENT[face] * s.fontSize);
  }
  let box = null;
  for (const ch of chunks) {
    const width = ch.end - ch.start;
    const shift = ch.anchor === 'middle' ? width / 2 : ch.anchor === 'end' ? width : 0;
    const b = { x0: ch.start - shift, x1: ch.end - shift, y0: ch.y0, y1: ch.y1 };
    box = box ? { x0: Math.min(box.x0, b.x0), y0: Math.min(box.y0, b.y0), x1: Math.max(box.x1, b.x1), y1: Math.max(box.y1, b.y1) } : b;
  }
  return { box, content: chars.map((c) => c.ch).join('') };
}

export function checkSvg(src) {
  const svg = parseXml(src);
  const vb = numbers(svg.attrs.viewBox ?? '');
  const canvas = vb.length === 4
    ? { x0: vb[0], y0: vb[1], x1: vb[0] + vb[2], y1: vb[1] + vb[3] }
    : { x0: 0, y0: 0, x1: parseFloat(svg.attrs.width) || 300, y1: parseFloat(svg.attrs.height) || 150 };
  const css = [];
  const collectCss = (node) => {
    for (const c of node.children ?? []) {
      if (c.name === 'style') css.push(c.children.map((t) => t.text ?? '').join(''));
      else if (c.children) collectCss(c);
    }
  };
  collectCss(svg);
  const rules = parseCss(css.join('\n'));

  // Every filled shape and every text, in paint order. The canvas is the
  // shape under a text that sits on nothing else.
  const painted = [{ tag: 'canvas', line: svg.line, box: canvas, contains: () => true, inverse: IDENTITY, order: -1 }];
  const texts = [];
  let order = 0;
  const walk = (el, parentStyle, parentCtm) => {
    if (NOT_RENDERED.has(el.name)) return;
    if (el !== svg && UNSUPPORTED_ELEMENTS.has(el.name)) throw new Unsupported(`<${el.name}> at line ${el.line} is not modelled`);
    const style = computeStyle(el, rules, parentStyle);
    if (style.display === 'none' || Number(style.opacity) === 0) return;
    const ctm = el === svg ? IDENTITY : multiply(parentCtm, parseTransform(el.attrs.transform));
    if (el.name === 'text') {
      if (style.visibility === 'hidden') return;
      const laid = layoutText(el, rules, style);
      if (laid) texts.push({ line: el.line, content: laid.content, box: toRoot(ctm, laid.box), order: order++ });
      return;
    }
    if (SHAPES.has(el.name)) {
      if (style.visibility === 'hidden' || !filled(style)) return;
      const geo = shapeGeometry(el, canvas);
      const inverse = invert(ctm);
      if (geo && inverse) {
        painted.push({ tag: el.name, line: el.line, box: toRoot(ctm, geo.box), contains: geo.contains, inverse, evenOdd: style['fill-rule'] === 'evenodd', order: order++ });
      }
      return;
    }
    for (const child of el.children) if (child.name) walk(child, style, ctm);
  };
  walk(svg, null, IDENTITY);

  const inFill = (shape, point) => shape.contains(apply(shape.inverse, point), shape.evenOdd);
  return texts.map((t) => {
    // Rule 1, the shape under the text: the last one painted before it whose
    // fill holds the box's centre. The box must stay inside its bounds.
    const centre = [(t.box.x0 + t.box.x1) / 2, (t.box.y0 + t.box.y1) / 2];
    const host = painted.filter((s) => s.order < t.order).reverse().find((s) => inFill(s, centre));
    const h = host.box;
    const over = { left: h.x0 - t.box.x0, right: t.box.x1 - h.x1, top: h.y0 - t.box.y0, bottom: t.box.y1 - h.y1 };
    // Rule 2, a shape painted over the text: the part of the box its fill
    // covers, sampled on a 1px grid, must not exceed the tolerance both ways.
    const covers = [];
    for (const s of painted) {
      if (s.order < t.order) continue;
      const x0 = Math.max(t.box.x0, s.box.x0), x1 = Math.min(t.box.x1, s.box.x1);
      const y0 = Math.max(t.box.y0, s.box.y0), y1 = Math.min(t.box.y1, s.box.y1);
      if (x1 - x0 <= TOLERANCE || y1 - y0 <= TOLERANCE) continue;
      let cx0 = Infinity, cx1 = -Infinity, cy0 = Infinity, cy1 = -Infinity;
      for (let y = y0 + 0.5; y < y1; y++) {
        for (let x = x0 + 0.5; x < x1; x++) {
          if (!inFill(s, [x, y])) continue;
          cx0 = Math.min(cx0, x); cx1 = Math.max(cx1, x); cy0 = Math.min(cy0, y); cy1 = Math.max(cy1, y);
        }
      }
      const w = cx1 - cx0 + 1, hgt = cy1 - cy0 + 1;
      if (w > TOLERANCE && hgt > TOLERANCE) covers.push({ shape: s, w, h: hgt });
    }
    return { ...t, host, over, worst: Math.max(...Object.values(over)), covers };
  });
}

// --- CLI -------------------------------------------------------------------

async function svgFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await svgFiles(p)));
    else if (entry.name.endsWith('.svg')) out.push(p);
  }
  return out.sort();
}

async function main() {
  const args = argv.slice(2);
  const verbose = args.includes('--verbose');
  const named = args.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));
  const files = named.length ? named : await svgFiles(BLOG);
  const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
  const fmt = (n) => n.toFixed(1);

  let boxes = 0, allowed = 0;
  const crossings = [], errors = [];
  const usedAllow = new Set();
  for (const file of files) {
    let results;
    try {
      results = checkSvg(await readFile(file, 'utf8'));
    } catch (err) {
      if (!(err instanceof Unsupported)) throw err;
      errors.push(`${rel(file)}: ${err.message}`);
      continue;
    }
    boxes += results.length;
    for (const r of results) {
      const where = `${rel(file)}:${r.line}`;
      const hostName = r.host.tag === 'canvas' ? 'the canvas' : `the ${r.host.tag} at line ${r.host.line}`;
      if (verbose) {
        const clear = Object.entries(r.over).map(([side, v]) => `${side} ${fmt(-v)}`).join(', ');
        console.log(`${where}  "${r.content}"  width ${fmt(r.box.x1 - r.box.x0)}px  clearance to ${hostName}: ${clear}`);
      }
      const findings = [];
      if (r.worst > TOLERANCE) {
        const sides = Object.entries(r.over).filter(([, v]) => v > TOLERANCE).map(([side, v]) => `${fmt(v)}px past the ${side} edge`).join(' and ');
        findings.push({ rule: 'edge', message: `runs ${sides} of ${hostName}` });
      }
      for (const c of r.covers) {
        findings.push({ rule: 'covered', message: `is covered ${fmt(c.w)}×${fmt(c.h)}px by the ${c.shape.tag} at line ${c.shape.line}, painted after it` });
      }
      for (const f of findings) {
        const entry = ALLOW.findIndex((a) => a.file === rel(file) && a.text === r.content && a.rule === f.rule);
        if (entry >= 0) { usedAllow.add(entry); allowed++; continue; }
        crossings.push(`${where}  "${r.content}" ${f.message}`);
      }
    }
  }
  const scanned = new Set(files.map(rel));
  const stale = ALLOW.filter((a, i) => scanned.has(a.file) && !usedAllow.has(i));

  for (const c of crossings) console.error(c);
  for (const a of stale) console.error(`${a.file}  allowlist entry "${a.text.slice(0, 60)}…" no longer matches a crossing; remove it`);
  for (const e of errors) console.error(`${e} (the gate cannot measure this file)`);
  const summary = `${files.length} SVG${files.length === 1 ? '' : 's'}, ${boxes} text boxes, tolerance ${TOLERANCE}px, ${allowed} allowlisted`;
  if (crossings.length || stale.length || errors.length) {
    const what = [
      crossings.length && `${crossings.length} text box${crossings.length === 1 ? '' : 'es'} crossing the shape under ${crossings.length === 1 ? 'it' : 'them'} or running under a shape painted over ${crossings.length === 1 ? 'it' : 'them'}`,
      stale.length && `${stale.length} stale allowlist entr${stale.length === 1 ? 'y' : 'ies'}`,
      errors.length && `${errors.length} unmeasurable file${errors.length === 1 ? '' : 's'}`,
    ].filter(Boolean).join('; ');
    console.error(`svg-text-fit: FAIL — ${what} (${summary})`);
    exit(1);
  }
  console.log(`svg-text-fit: OK — no text box crosses the shape under it or runs under a shape painted over it (${summary})`);
}

if (import.meta.url === pathToFileURL(argv[1] ?? '').href) await main();
