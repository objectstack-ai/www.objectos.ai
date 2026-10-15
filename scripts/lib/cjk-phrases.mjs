/**
 * Keep-together phrases for CJK headings.
 *
 * Chinese and Japanese have no spaces, so a browser may break a heading
 * between any two characters: measured on the marketing template it split
 * 「可投 / 入生产」, 「开 / 放」, 「ソフトウェ / ア」 and 「環 / 境」 across lines.
 * `word-break: keep-all` stops that, but leaves the heading no break
 * opportunity at all; this module supplies them. It cuts a heading into
 * phrases, and the caller renders a `<wbr>` between two phrases (the form
 * BudouX emits), so a line can end only where a phrase does.
 *
 * Why not `word-break: auto-phrase`: it is Chromium-only and Japanese-only,
 * so it fixes neither Chinese nor any other engine. A `<wbr>` with
 * `keep-all` behaves the same in every engine.
 *
 * Phrases are built from the ICU word segmenter (`Intl.Segmenter`, dictionary
 * based for both languages), whose words are too small on their own. Japanese
 * attaches particles, okurigana and auxiliaries to the word before them (作|ら|
 * せる would otherwise break as 作 / らせる), and katakana splits are rejoined
 * (ラン|タイム). A Chinese one-character word is merged with a neighbour: a
 * suffix such as 的 or 库 joins the word before it, a character last in its
 * clause does too (落下来), and any other joins the word after it (可投入,
 * 谁来审).
 * A phrase can still be wider than the line; `overflow-wrap: anywhere` on the
 * heading is the last resort for that.
 *
 * The output joins back to exactly the input; nothing is ever added to or
 * removed from the copy.
 *
 * Two consumers share these definitions, so they cannot disagree:
 *
 *   * `phraseHtml`, for headings an .astro template renders (the marketing
 *     template, home, security, the glossary index, blog cards, the post
 *     title, cluster pages). Each such heading sets `word-break: keep-all`.
 *   * `rehypeCjkHeadingPhrases`, wired into `markdown.rehypePlugins` in
 *     astro.config.mjs (MDX inherits it), for the h1-h6 a post's own body
 *     authors. It runs only on a zh or ja source file and only inside
 *     headings; code (`code`, `kbd`, `samp`, `pre`) is never entered, and a
 *     <wbr> is only ever added beside text, never inside an opaque element.
 */

import { OPAQUE_ELEMENTS, TRANSPARENT_ELEMENTS } from './cjk-segment-break.mjs';

const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]/u;
const HAN_ONLY = /^\p{Script=Han}+$/u;
const HIRAGANA_ONLY = /^[\p{Script=Hiragana}ー]+$/u;
const KATAKANA_ONLY = /^[\p{Script=Katakana}ー・]+$/u;
const SPACE = /^\s+$/u;
/** A kanji stem with its okurigana (働き, 書き): a one-kanji suffix after it
 *  belongs to it (働き方, 書き手). */
const STEM_OKURIGANA = /\p{Script=Han}\p{Script=Hiragana}+$/u;
/** Punctuation that must not open a line (kinsoku): it joins the phrase before it. */
const CLOSING = /^[、。，．,.!！?？:：;；」』）)】〕〉》”’…—%％·・〜~-]+$/u;
/** Punctuation that must not close a line: the next segment joins it. */
const OPENING = /^[「『（(【〔〈《“‘]+$/u;
/** One-character Chinese words that belong to the word before them: particles
 *  and suffixes (的, 工程师, 数据库, 工作台) and measure words (另一次).
 *  Checked against every zh heading the site renders. */
const ZH_SUFFIX = new Set([...'的了着过们地得吗呢吧啊之性化者权时里上下中内外前后间式型级端师员家商人台面个次种份套步张条位项库话版']);

const segmenters = new Map();
const segmenter = (lang) => {
  let s = segmenters.get(lang);
  if (!s) {
    s = new Intl.Segmenter(lang, { granularity: 'word' });
    segmenters.set(lang, s);
  }
  return s;
};

/** The language whose phrase rules apply to `locale`, or null for a spaced script. */
export const phraseLanguage = (locale) =>
  locale.startsWith('zh') ? 'zh' : locale === 'ja' ? 'ja' : null;

/**
 * `text` cut into keep-together phrases. A text with no CJK character, or a
 * locale with spaces between words, comes back as one piece.
 */
export function cjkPhrases(text, locale) {
  const lang = phraseLanguage(locale);
  if (!lang || !CJK.test(text)) return [text];
  const segs = [...segmenter(lang).segment(text)].map((s) => s.segment);
  const phrases = [];
  let glueNext = false;
  // A straight double quote opens or closes by parity: "同意" in the copy.
  let quotes = 0;
  let prevOpened = false;
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    const prev = i > 0 ? segs[i - 1] : '';
    const last = phrases.length ? phrases[phrases.length - 1] : '';
    const straightQuote = seg === '"';
    const opens = straightQuote && quotes % 2 === 0;
    if (straightQuote) quotes++;
    let attach;
    if (!phrases.length) attach = false;
    else if (opens) attach = false;
    else if (SPACE.test(seg) || CLOSING.test(seg) || straightQuote || OPENING.test(prev) || prevOpened) attach = true;
    else if (SPACE.test(prev)) attach = false;
    else if (lang === 'ja') {
      attach =
        HIRAGANA_ONLY.test(seg) ||
        (KATAKANA_ONLY.test(seg) && KATAKANA_ONLY.test(prev)) ||
        (seg.length === 1 &&
          HAN_ONLY.test(seg) &&
          (HAN_ONLY.test(prev) || KATAKANA_ONLY.test(prev) || STEM_OKURIGANA.test(prev)));
    } else {
      const single = seg.length === 1 && HAN_ONLY.test(seg);
      const next = i + 1 < segs.length ? segs[i + 1] : '';
      const suffix = single && ZH_SUFFIX.has(seg) && HAN_ONLY.test(prev);
      // A one-character word last in its clause (落下来, 运行时。) has no word
      // after it to join, so it joins the one before.
      const tail = single && HAN_ONLY.test(prev) && !HAN_ONLY.test(next);
      attach = (glueNext && HAN_ONLY.test(seg)) || suffix || tail;
    }
    // The next word joins this one when this is a Chinese one-character word
    // that is not itself a suffix: 可 + 投入, 谁 + 来 + 审, 让 + 人. Set on
    // every segment, so a space or a punctuation mark clears it.
    glueNext = lang === 'zh' && seg.length === 1 && HAN_ONLY.test(seg) && !ZH_SUFFIX.has(seg);
    prevOpened = opens;
    if (attach) phrases[phrases.length - 1] = last + seg;
    else phrases.push(seg);
  }
  return phrases;
}

/**
 * The offsets in `text` that take a <wbr>: every phrase boundary that touches
 * a CJK character on either side (a break at a space needs none).
 */
export function wbrOffsets(text, locale) {
  const parts = cjkPhrases(text, locale);
  const offsets = [];
  let at = 0;
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      const before = parts[i - 1].slice(-1);
      const after = parts[i].charAt(0);
      if (!SPACE.test(before) && !SPACE.test(after) && (CJK.test(before) || CJK.test(after))) offsets.push(at);
    }
    at += parts[i].length;
  }
  return offsets;
}

/** Astro's own text escaping (html-escaper), so a text with no <wbr> renders
 *  byte for byte as `{text}` would. */
const escapeHtml = (s) =>
  s.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c]);

/**
 * `text` as HTML with a <wbr> at each of its `wbrOffsets`. Render it with
 * `set:html` on a heading that sets `word-break: keep-all`. A text that needs
 * no <wbr> (any spaced script) comes back exactly as Astro would escape it.
 */
export function phraseHtml(text, locale) {
  let html = '';
  let from = 0;
  for (const at of wbrOffsets(text, locale)) {
    html += escapeHtml(text.slice(from, at)) + '<wbr>';
    from = at;
  }
  return html + escapeHtml(text.slice(from));
}

/** The locale of a post source from its file name: index.zh-Hans.mdx, index.mdx (en). */
export function localeOfPath(path) {
  const m = /(?:^|[\\/])index(?:\.([A-Za-z]{2}(?:-[A-Za-z]{2,4})?))?\.mdx?$/.exec(path ?? '');
  return m ? (m[1] ?? 'en') : null;
}

const HEADING = /^h[1-6]$/;

/**
 * Text nodes of a heading in document order, each with its parent, and `null`
 * wherever the run is interrupted: an opaque element (code is never entered),
 * any element that is not inline text, an MDX node.
 */
function headingRuns(node, items) {
  for (const child of node.children ?? []) {
    if (child.type === 'text') {
      items.push({ node: child, parent: node });
    } else if (child.type === 'element' && TRANSPARENT_ELEMENTS.has(child.tagName.toLowerCase())) {
      headingRuns(child, items);
    } else {
      items.push(null);
    }
  }
}

const wbr = () => ({ type: 'element', tagName: 'wbr', properties: {}, children: [] });

/** Insert a <wbr> into a run of text nodes at each offset of its joined text. */
function insertWbr(run, offsets) {
  if (!offsets.length) return;
  let start = 0;
  for (const { node, parent } of run) {
    const end = start + node.value.length;
    const local = offsets.filter((at) => at >= start && at < end).map((at) => at - start);
    start = end;
    if (!local.length) continue;
    const pieces = [];
    let from = 0;
    for (const at of local) {
      if (at > from) pieces.push({ type: 'text', value: node.value.slice(from, at) });
      pieces.push(wbr());
      from = at;
    }
    pieces.push({ type: 'text', value: node.value.slice(from) });
    const index = parent.children.indexOf(node);
    parent.children.splice(index, 1, ...pieces);
  }
}

/**
 * Rehype plugin: in a zh or ja post, a <wbr> between the phrases of each
 * heading the body authors (the post's own h1-h6), so it can break only there
 * (BlogPost.astro sets `word-break: keep-all` on them). Any other file, any
 * element that is not a heading, and anything inside code is left as parsed.
 */
export function rehypeCjkHeadingPhrases() {
  return (tree, file) => {
    const locale = localeOfPath(file?.path ?? file?.history?.[0]);
    if (!locale || !phraseLanguage(locale)) return;
    const headings = [];
    const find = (node) => {
      for (const child of node.children ?? []) {
        if (child.type !== 'element') continue;
        if (OPAQUE_ELEMENTS.has(child.tagName.toLowerCase())) continue;
        if (HEADING.test(child.tagName.toLowerCase())) headings.push(child);
        else find(child);
      }
    };
    find(tree);
    for (const heading of headings) {
      const items = [];
      headingRuns(heading, items);
      let run = [];
      for (const item of [...items, null]) {
        if (item) {
          run.push(item);
          continue;
        }
        if (run.length) insertWbr(run, wbrOffsets(run.map((r) => r.node.value).join(''), locale));
        run = [];
      }
    }
  };
}
