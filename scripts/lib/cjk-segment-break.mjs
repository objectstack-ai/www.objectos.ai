// A source line break between two CJK characters must not reach a reader as a
// space.
//
// Markdown keeps a soft line break in a paragraph as a newline in the text, and
// the HTML carries it through as a segment break. CSS Text 3 says a segment
// break between two East Asian wide characters is removed, but Chromium and
// Safari do not implement that yet: they render it as a space. A hard-wrapped
// zh-Hans source therefore shows a stray space mid-sentence (「已经在运转，数据
// 也已经在那里。」), in zh-Hans and in the zh-Hant generated from it. An audit of
// the built site found 202 of them in four posts and their zh-Hant copies.
//
// Two consumers share the definitions in this file, so they cannot disagree:
//
//   * `rehypeCjkSegmentBreaks`, the build-time fix, wired into
//     `markdown.rehypePlugins` in astro.config.mjs (MDX inherits it). It removes
//     the break in the rendered tree, so a hard-wrapped source stays legal and
//     the fix protects every future post in every CJK locale, not only the four
//     posts reflowed by hand.
//   * `pnpm content:lint --dist`, the guard, which reads the BUILT HTML with its
//     own scanner and fails on any segment break left between two of these
//     characters in prose. It catches the plugin not running, and a producer the
//     plugin never sees (an .astro template, a new render path).
//
// What is removed is exactly the CSS Text 3 rule (§4.1.3, segment break
// transformation), not a Chinese-specific heuristic:
//
//   * Both neighbours must be East Asian Width Fullwidth, Wide or Halfwidth.
//     Ambiguous characters do not count — `——`, `…`, `“ ”` and `·` sit in
//     Latin text too, and the posts set ` —— ` with a space on both sides, so
//     a break after `——` is that space.
//   * Neither neighbour may be Hangul. Korean separates words with spaces, so a
//     line break between two Hangul words is a real word space.
//   * A break between CJK and Latin (`支持\nAI`) stays a space: that is the
//     spacing these posts use between the two scripts anyway.
//
// Code is never touched: `pre`, `code`, `kbd` and `samp` are opaque. Their text
// is neither edited nor used as the neighbour of a break outside them, so a
// break next to inline code keeps its space.

/**
 * Code point ranges whose East Asian Width is Wide, Fullwidth or Halfwidth.
 * Hangul inside them is excluded by `isCjkWide`, not by the ranges.
 */
const WIDE_RANGES = [
  [0x2e80, 0x303e], // CJK radicals, Kangxi radicals, ideographic description, CJK symbols and punctuation (U+303F is narrow)
  [0x3041, 0x33ff], // kana, bopomofo, kanbun, CJK strokes, enclosed CJK, CJK compatibility
  [0x3400, 0x4dbf], // CJK unified ideographs extension A (U+4DC0..U+4DFF hexagrams are narrow)
  [0x4e00, 0x9fff], // CJK unified ideographs
  [0xf900, 0xfaff], // CJK compatibility ideographs
  [0xfe10, 0xfe19], // vertical forms
  [0xfe30, 0xfe6f], // CJK compatibility forms, small form variants
  [0xff01, 0xffee], // fullwidth and halfwidth forms (，。：（）！？ and halfwidth kana)
  [0x16fe0, 0x18aff], // ideographic symbols, Tangut
  [0x1b000, 0x1b2ff], // kana supplement and extensions, Nushu
  [0x20000, 0x3fffd], // CJK unified ideographs extensions B and later
];

const HANGUL = /\p{Script=Hangul}/u;

/** True when the CSS segment-break rule removes a break next to `ch`. */
export function isCjkWide(ch) {
  if (!ch) return false;
  const cp = ch.codePointAt(0);
  let inRange = false;
  for (const [lo, hi] of WIDE_RANGES) {
    if (cp < lo) break;
    if (cp <= hi) {
      inRange = true;
      break;
    }
  }
  return inRange && !HANGUL.test(ch);
}

/**
 * One segment break with the collapsible spaces and tabs around it. CSS removes
 * those spaces before it transforms the break, so the run is one unit.
 */
export const SEGMENT_BREAK = /[ \t]*\n[ \t\n]*/g;

/**
 * Phrasing elements that do not interrupt the prose around them: a break just
 * outside `<strong>…</strong>` still sits between the character inside and the
 * one outside. Any element not listed here (and not opaque) bounds the prose.
 */
export const TRANSPARENT_ELEMENTS = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'data', 'del', 'dfn', 'em', 'i', 'ins',
  'mark', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var',
]);

/** Elements whose text is not prose: never edited, never a neighbour. */
export const OPAQUE_ELEMENTS = new Set([
  'code', 'kbd', 'pre', 'samp', 'script', 'style', 'textarea', 'title', 'math', 'svg',
]);

export function lastChar(text) {
  if (!text) return '';
  const low = text.charCodeAt(text.length - 1);
  if (low >= 0xdc00 && low <= 0xdfff && text.length > 1) {
    const high = text.charCodeAt(text.length - 2);
    if (high >= 0xd800 && high <= 0xdbff) return text.slice(-2);
  }
  return text.slice(-1);
}

export function firstChar(text) {
  if (!text) return '';
  return String.fromCodePoint(text.codePointAt(0));
}

/**
 * Removes every segment break in `value` whose neighbours are both CJK wide.
 * `before`/`after` are the characters just outside `value` (empty at a
 * boundary), used when a break sits at its very start or end.
 */
export function collapseCjkSegmentBreaks(value, before = '', after = '') {
  return value.replace(SEGMENT_BREAK, (run, offset) => {
    const prev = offset > 0 ? lastChar(value.slice(0, offset)) : before;
    const end = offset + run.length;
    const next = end < value.length ? firstChar(value.slice(end)) : after;
    return isCjkWide(prev) && isCjkWide(next) ? '' : run;
  });
}

/**
 * Text nodes of a hast tree in document order, with `null` wherever the prose
 * is interrupted (a block, a line break, an image, code, raw HTML, an MDX
 * component or expression — anything whose rendering is not plain inline text).
 */
function flatten(node, items) {
  for (const child of node.children ?? []) {
    if (child.type === 'text') {
      items.push(child);
    } else if (child.type === 'element') {
      const name = child.tagName.toLowerCase();
      if (OPAQUE_ELEMENTS.has(name)) {
        items.push(null);
      } else if (TRANSPARENT_ELEMENTS.has(name)) {
        flatten(child, items);
      } else {
        items.push(null);
        flatten(child, items);
        items.push(null);
      }
    } else {
      items.push(null);
      if (child.children) {
        flatten(child, items);
        items.push(null);
      }
    }
  }
}

/** The character just outside item `i`, looking in direction `step`. */
function neighbour(values, i, step) {
  for (let j = i + step; j >= 0 && j < values.length; j += step) {
    const value = values[j];
    if (value === null) return '';
    if (value.length > 0) return step < 0 ? lastChar(value) : firstChar(value);
  }
  return '';
}

/** Rehype plugin: drop segment breaks between two CJK wide characters in prose. */
export function rehypeCjkSegmentBreaks() {
  return (tree) => {
    const items = [];
    flatten(tree, items);
    // Neighbours are read from the values as parsed, before any edit, so the
    // result does not depend on the order the nodes are visited in.
    const values = items.map((item) => (item ? item.value : null));
    items.forEach((item, i) => {
      if (!item || !item.value.includes('\n')) return;
      item.value = collapseCjkSegmentBreaks(
        values[i],
        neighbour(values, i, -1),
        neighbour(values, i, 1)
      );
    });
  };
}
