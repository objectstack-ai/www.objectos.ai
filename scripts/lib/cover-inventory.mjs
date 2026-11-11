// What a blog cover SVG draws, as the cover spec counts it: its text runs
// (each `<text>` with the font sizes and fill colours its characters are set
// in), the fill colours of everything it paints, and its ground (the fill of
// the first shape that covers the canvas).
//
// Read through the same parser and CSS cascade as scripts/svg-text-fit.mjs, so
// a size set by a class in a `<style>` block counts exactly as a browser
// applies it. Readers: scripts/cover-spec.mjs (the spec gate) and
// scripts/cover-dark.mjs (which skips a cover whose ground is already dark).

import { canonicalColor } from './cover-colors.mjs';
import { NOT_RENDERED, Unsupported, computeStyle, numbers, parseCss, parseXml } from '../svg-text-fit.mjs';

export { Unsupported };

const SHAPES = new Set(['rect', 'circle', 'ellipse', 'polygon', 'polyline', 'path']);

const textOf = (node) => (node.text !== undefined ? node.text : (node.children ?? []).map(textOf).join(''));

/**
 * @param {string} src SVG source.
 * @returns {{
 *   texts: { line: number, content: string, sizes: number[], fills: string[] }[],
 *   fills: { color: string, line: number, tag: string }[],
 *   ground: string | null,
 *   canvas: { width: number, height: number },
 * }}
 *   `fills` lists each distinct fill colour once, with the first element that
 *   paints it (a gradient fill counts as each of its stop colours).
 */
export function coverInventory(src) {
  const svg = parseXml(src);
  const vb = numbers(svg.attrs.viewBox ?? '');
  const canvas = vb.length === 4
    ? { width: vb[2], height: vb[3] }
    : { width: parseFloat(svg.attrs.width) || 300, height: parseFloat(svg.attrs.height) || 150 };
  const css = [];
  const byId = new Map();
  const index = (node) => {
    for (const c of node.children ?? []) {
      if (!c.name) continue;
      if (c.name === 'style') css.push(c.children.map((t) => t.text ?? '').join(''));
      if (c.attrs.id) byId.set(c.attrs.id, c);
      index(c);
    }
  };
  index(svg);
  const rules = parseCss(css.join('\n'));

  // A gradient's stop colours, following href to the gradient it inherits from.
  const stopColors = (id, seen = new Set()) => {
    const g = byId.get(id);
    if (!g || seen.has(id)) throw new Unsupported(`fill references a missing paint server #${id}`);
    if (!/Gradient$/.test(g.name)) throw new Unsupported(`fill references a <${g.name}> (#${id}), which is not modelled`);
    seen.add(id);
    const stops = g.children.filter((c) => c.name === 'stop');
    if (!stops.length) {
      const href = (g.attrs.href ?? g.attrs['xlink:href'] ?? '').replace(/^#/, '');
      return href ? stopColors(href, seen) : [];
    }
    return stops.map((s) => {
      const inline = /(?:^|;)\s*stop-color\s*:\s*([^;]+)/.exec(s.attrs.style ?? '')?.[1];
      return canonicalColor(inline ?? s.attrs['stop-color'] ?? 'black');
    }).filter(Boolean);
  };
  const paintColors = (fill) => {
    const ref = /^url\(\s*['"]?#([^'")\s]+)['"]?\s*\)/.exec(fill);
    if (ref) return stopColors(ref[1]);
    const c = canonicalColor(fill);
    return c ? [c] : [];
  };

  const texts = [];
  const fills = new Map();
  let ground = null;
  const addFill = (fill, el) => {
    for (const color of paintColors(fill)) if (!fills.has(color)) fills.set(color, { color, line: el.line, tag: el.name });
  };
  const paints = (style) => style.fill !== 'none' && Number(style['fill-opacity']) > 0 && Number(style.opacity) > 0;

  const walkText = (text, node, style, run) => {
    for (const child of node.children) {
      if (child.text !== undefined) {
        if (child.text.trim()) { run.sizes.add(style.fontSize); run.fills.add(style.fill); addFill(style.fill, text); }
        continue;
      }
      if (child.name !== 'tspan' && child.name !== 'a') continue;
      const s = computeStyle(child, rules, style);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      walkText(text, child, s, run);
    }
  };
  const walk = (el, parentStyle) => {
    if (NOT_RENDERED.has(el.name)) return;
    const style = computeStyle(el, rules, parentStyle);
    if (style.display === 'none' || Number(style.opacity) === 0) return;
    if (el.name === 'text') {
      if (style.visibility === 'hidden') return;
      const run = { sizes: new Set(), fills: new Set() };
      walkText(el, el, style, run);
      const content = textOf(el).replace(/\s+/g, ' ').trim();
      if (content) texts.push({ line: el.line, content, sizes: [...run.sizes], fills: [...run.fills] });
      return;
    }
    if (SHAPES.has(el.name)) {
      if (style.visibility === 'hidden' || !paints(style)) return;
      addFill(style.fill, el);
      if (ground === null && el.name === 'rect' && !el.attrs.transform) {
        const w = el.attrs.width ?? '', h = el.attrs.height ?? '';
        const full = (v, ref) => v.trim() === '100%' || parseFloat(v) >= ref;
        if (full(w, canvas.width) && full(h, canvas.height) && !(parseFloat(el.attrs.x) > 0) && !(parseFloat(el.attrs.y) > 0)) {
          ground = paintColors(style.fill)[0] ?? null;
        }
      }
      return;
    }
    for (const child of el.children) if (child.name) walk(child, style);
  };
  walk(svg, null);
  return { texts, fills: [...fills.values()], ground, canvas };
}
