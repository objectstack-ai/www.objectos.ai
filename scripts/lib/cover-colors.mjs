// Colours in blog cover SVGs: reading a CSS/SVG colour literal, and the
// light-to-dark palette that scripts/cover-dark.mjs paints each cover's dark
// variant with.
//
// Two readers. scripts/cover-spec.mjs counts the distinct fill colours a
// cover paints and checks its ground against the post's topic tint, so it
// needs every spelling of one colour (`white`, `#fff`, `#FFFFFF`,
// `rgb(255,255,255)`) to be one colour. scripts/cover-dark.mjs rewrites each
// colour to its dark counterpart.
//
// ─── The dark palette ───────────────────────────────────────────────────────
//
// Two layers, applied in order:
//
//   1. TOKEN_MAP: the site's own light tokens and their dark values, copied
//      from the two `:root` blocks in src/layouts/Base.astro, plus white and
//      the seven topic tints (TOPIC_TINTS). A cover drawn in the site palette
//      lands on exactly the colours the dark page uses, so a cover's ground
//      and its card's topic chip stay one colour in both themes. Keep it in
//      step with Base.astro when a token changes; `topicTintDrift` checks the
//      topic tints (scripts/cover-spec.mjs runs it in `pnpm build`).
//   2. Everything else (the 88 covers hold about 370 distinct literals, far
//      too many to pair by hand) goes through `flipLightness`, which inverts
//      the colour's luminance in the one way that keeps WCAG contrast: a
//      dark label 7:1 on a pale card becomes a pale label 7:1 on a dark card.
//      Hue and chroma are kept (chroma is reduced only as far as the sRGB
//      gamut forces). White lands on the dark page's --surface, and a
//      ground of #f8faf7 next to it.
//
// Not rewritten: drop-shadow `flood-color` and `lighting-color`. A shadow is
// darkness under a card in both themes; flipping it would paint a glow.

/**
 * The topic tints (cover spec v2, #430): one low-saturation ground per topic,
 * and the same-hue ink its topic chip is set in. A cover of a post dated on or
 * after the spec's start paints its ground in `light`; the card's and the
 * post page's topic chip is `ink` on `light` (dark theme: `inkDark` on
 * `dark`). Base.astro declares them as `--topic-<slug>` and
 * `--topic-<slug>-ink`, the same values in the same two `:root` blocks.
 *
 * Chip contrast (12px bold text, WCAG AA asks 4.5): light / dark
 *   integration-data 4.64 / 6.03   governance 5.19 / 6.16   app-building 5.90 / 6.72
 *   ai-agents 5.03 / 6.01          automation 5.03 / 6.04   modernization 5.01 / 6.06
 *   customer-stories 5.01 / 6.04
 * The first three were sampled with the maintainer (#430); the other four
 * share their OKLCH lightness and chroma (ground L 0.946, dark L 0.287) on
 * hues the first three leave free: violet (the brand indigo turned toward
 * magenta), teal (between --green and --brand), olive (between --amber and
 * --green) and apricot (--amber turned warm, 15 degrees clear of --red).
 */
export const TOPIC_TINTS = {
  'integration-data': { light: '#e8ecff', dark: '#272a38', ink: '#3d58f0', inkDark: '#91a3ff' },
  governance: { light: '#e2f0e6', dark: '#222d26', ink: '#06704f', inkDark: '#3fbf8f' },
  'app-building': { light: '#f4eee4', dark: '#2d2921', ink: '#7d5210', inkDark: '#e3a54a' },
  'ai-agents': { light: '#f8e7fa', dark: '#322534', ink: '#8d4998', inkDark: '#d58de0' },
  automation: { light: '#daf2f7', dark: '#1b2e32', ink: '#056f7f', inkDark: '#5bb6c7' },
  modernization: { light: '#edf0d8', dark: '#2b2c19', ink: '#656925', inkDark: '#a9ae6a' },
  'customer-stories': { light: '#fee7e0', dark: '#382520', ink: '#9b4e36', inkDark: '#e79277' },
};

/**
 * Where src/layouts/Base.astro disagrees with TOPIC_TINTS: one message per
 * token that is missing or holds another value, in either `:root` block.
 * @param {string} base The source of src/layouts/Base.astro.
 * @returns {string[]}
 */
export function topicTintDrift(base) {
  const block = (open) => {
    const at = base.indexOf(open);
    return at < 0 ? '' : base.slice(at, base.indexOf('}', at));
  };
  const blocks = { ':root': block(':root {'), ":root[data-theme='dark']": block(":root[data-theme='dark'] {") };
  const issues = [];
  for (const [slug, t] of Object.entries(TOPIC_TINTS)) {
    const want = { ':root': [['', t.light], ['-ink', t.ink]], ":root[data-theme='dark']": [['', t.dark], ['-ink', t.inkDark]] };
    for (const [sel, pairs] of Object.entries(want)) {
      for (const [suffix, value] of pairs) {
        const name = `--topic-${slug}${suffix}`;
        const m = new RegExp(`${name}\\s*:\\s*([^;]+);`).exec(blocks[sel]);
        if (!m) issues.push(`${sel} declares no ${name} (scripts/lib/cover-colors.mjs TOPIC_TINTS has ${value})`);
        else if (canonicalColor(m[1]) !== value) issues.push(`${sel} sets ${name}: ${m[1].trim()}, but scripts/lib/cover-colors.mjs TOPIC_TINTS has ${value}`);
      }
    }
  }
  return issues;
}

/** Light token -> dark token, from src/layouts/Base.astro (`:root` and `:root[data-theme='dark']`). */
export const TOKEN_MAP = new Map([
  ['#f3f7f2', '#101713'], // --bg
  ['#fffffb', '#17201b'], // --surface
  ['#ffffff', '#17201b'], // white panels sit at the dark --surface
  ['#e9efe9', '#202b25'], // --surface-sunk
  ['#151a17', '#f4f7f2'], // --ink
  ['#515b55', '#aab6ad'], // --ink-soft
  ['#626c66', '#8a968d'], // --muted
  ['#dfe7df', '#2a3931'], // --line
  ['#3d58f0', '#91a3ff'], // --brand (the ring)
  ['#eef2ff', '#202849'], // --brand-soft
  ['#68625d', '#a8a29e'], // --status-archived
  // --topic-<slug>: a cover's ground lands on its topic chip's dark ground
  ...Object.values(TOPIC_TINTS).map((t) => [t.light, t.dark]),
]);

const NAMED = {
  white: '#ffffff',
  black: '#000000',
};

/**
 * Parse one colour literal to `{ r, g, b, a }` (0-255, alpha 0-1), or `null`
 * for a value that is not a literal colour (`none`, `url(#g)`, `currentColor`,
 * `transparent`, `inherit`). Throws on a colour spelling it cannot read, so a
 * new spelling fails the build instead of passing through unmapped.
 */
export function parseColor(value) {
  const v = value.trim().toLowerCase();
  if (v === 'none' || v === 'transparent' || v === 'currentcolor' || v === 'inherit' || v.startsWith('url(')) return null;
  if (NAMED[v]) return parseColor(NAMED[v]);
  let m = /^#([0-9a-f]{3,4})$/.exec(v);
  if (m) {
    const [r, g, b, a = 'f'] = m[1].split('');
    return { r: parseInt(r + r, 16), g: parseInt(g + g, 16), b: parseInt(b + b, 16), a: parseInt(a + a, 16) / 255 };
  }
  m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/.exec(v);
  if (m) {
    const n = parseInt(m[1], 16);
    return { r: n >> 16, g: (n >> 8) & 255, b: n & 255, a: m[2] ? parseInt(m[2], 16) / 255 : 1 };
  }
  m = /^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/.exec(v);
  if (m) {
    const alpha = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { r: Math.round(+m[1]), g: Math.round(+m[2]), b: Math.round(+m[3]), a: alpha };
  }
  throw new Error(`colour "${value}" is not a spelling this script reads (hex, rgb(), rgba(), white, black)`);
}

const hex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
/** `#rrggbb`, with the alpha kept as `#rrggbbaa` only when it is not 1. */
export const toHex = ({ r, g, b, a = 1 }) => `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a * 255) : ''}`;

/** One canonical spelling per colour, for counting distinct colours. */
export const canonicalColor = (value) => {
  const c = parseColor(value);
  return c ? toHex(c) : null;
};

// ─── OKLab (Björn Ottosson, 2020) ───────────────────────────────────────────

const toLinear = (c) => {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (x) => 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);

export function toOklab({ r, g, b }) {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

function oklabToLinear({ L, a, b }) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = (rgb) => rgb.every((x) => x >= -1e-6 && x <= 1 + 1e-6);

/** WCAG relative luminance, 0-1. */
export const luminance = ({ r, g, b }) => 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
/** WCAG contrast ratio of two colours. */
export const contrast = (p, q) => {
  const [hi, lo] = [luminance(p), luminance(q)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// The dark page's --surface (#17201b) is where white lands; DARK_K is the
// constant that puts it there (see `flipLightness`).
const DARK_K = 1.05 * (0.0126 + 0.05);

function clipToGamut(L, a, b) {
  let rgb = oklabToLinear({ L, a, b });
  if (inGamut(rgb)) return rgb;
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklabToLinear({ L, a: a * mid, b: b * mid }))) lo = mid; else hi = mid;
  }
  return oklabToLinear({ L, a: a * lo, b: b * lo });
}
const linearLuminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/**
 * The dark counterpart of one colour, inverted so that contrast is kept.
 *
 * WCAG contrast is the ratio of (Y + 0.05) for two luminances Y. The map
 * Y' = DARK_K / (Y + 0.05) - 0.05 turns that ratio upside down and leaves it
 * the same size: two colours 4.6:1 apart in the light cover are 4.6:1 apart
 * in the dark one, the dark one on top. DARK_K sends white (Y 1) to the dark
 * --surface (Y 0.0126). Colours darker than Y 0.0126 would need a Y' above 1,
 * so they all land on white: only near-black against near-black loses
 * separation, and no cover sets text that way.
 *
 * The new colour keeps the old one's OKLCH hue and chroma (chroma reduced by
 * bisection only as far as the sRGB gamut requires), and its OKLab lightness
 * is found by bisection to give the target luminance. Alpha is kept.
 */
export function flipLightness(color) {
  const { a, b } = toOklab(color);
  const target = Math.min(1, Math.max(0, DARK_K / (luminance(color) + 0.05) - 0.05));
  let lo = 0, hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (linearLuminance(clipToGamut(mid, a, b)) < target) lo = mid; else hi = mid;
  }
  const [r, g, bl] = clipToGamut((lo + hi) / 2, a, b).map((x) => fromLinear(Math.min(1, Math.max(0, x))));
  return { r, g, b: bl, a: color.a ?? 1 };
}

/** The dark counterpart of a colour literal, as `#rrggbb[aa]`; `null` for a non-colour. */
export function darkColor(value) {
  const c = parseColor(value);
  if (!c) return null;
  const opaque = toHex({ ...c, a: 1 });
  const pinned = TOKEN_MAP.get(opaque);
  if (pinned) return toHex({ ...parseColor(pinned), a: c.a });
  return toHex(flipLightness(c));
}
