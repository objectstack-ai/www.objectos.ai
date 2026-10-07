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
 */

const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]/u;
const HAN_ONLY = /^\p{Script=Han}+$/u;
const HIRAGANA_ONLY = /^[\p{Script=Hiragana}ー]+$/u;
const KATAKANA_ONLY = /^[\p{Script=Katakana}ー・]+$/u;
const SPACE = /^\s+$/u;
/** Punctuation that must not open a line (kinsoku): it joins the phrase before it. */
const CLOSING = /^[、。，．,.!！?？:：;；」』）)】〕〉》”’…—%％·・〜~-]+$/u;
/** Punctuation that must not close a line: the next segment joins it. */
const OPENING = /^[「『（(【〔〈《“‘]+$/u;
/** One-character Chinese words that belong to the word before them: particles
 *  and suffixes (的, 工程师, 数据库, 工作台) and measure words (另一次).
 *  Checked against every zh heading the site renders. */
const ZH_SUFFIX = new Set([...'的了着过们地得吗呢吧啊之性化者权时里上下中内外前后间式型级端师员家商人台面个次种份套步张条位项库话版']);

const segmenters = new Map<string, Intl.Segmenter>();
const segmenter = (lang: string): Intl.Segmenter => {
  let s = segmenters.get(lang);
  if (!s) {
    s = new Intl.Segmenter(lang, { granularity: 'word' });
    segmenters.set(lang, s);
  }
  return s;
};

/** The language whose phrase rules apply to `locale`, or null for a spaced script. */
export const phraseLanguage = (locale: string): 'zh' | 'ja' | null =>
  locale.startsWith('zh') ? 'zh' : locale === 'ja' ? 'ja' : null;

/**
 * `text` cut into keep-together phrases. A text with no CJK character, or a
 * locale with spaces between words, comes back as one piece.
 */
export function cjkPhrases(text: string, locale: string): string[] {
  const lang = phraseLanguage(locale);
  if (!lang || !CJK.test(text)) return [text];
  const segs = [...segmenter(lang).segment(text)].map((s) => s.segment);
  const phrases: string[] = [];
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
    let attach: boolean;
    if (!phrases.length) attach = false;
    else if (opens) attach = false;
    else if (SPACE.test(seg) || CLOSING.test(seg) || straightQuote || OPENING.test(prev) || prevOpened) attach = true;
    else if (SPACE.test(prev)) attach = false;
    else if (lang === 'ja') {
      attach =
        HIRAGANA_ONLY.test(seg) ||
        (KATAKANA_ONLY.test(seg) && KATAKANA_ONLY.test(prev)) ||
        (seg.length === 1 && HAN_ONLY.test(seg) && (HAN_ONLY.test(prev) || KATAKANA_ONLY.test(prev)));
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

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * `text` as HTML with a `<wbr>` between two phrases wherever the break touches
 * a CJK character (a break at a space needs none). Render it with
 * `<Fragment set:html={...} />` inside a heading that sets
 * `word-break: keep-all`. Spaced scripts come back escaped and unchanged.
 */
export function phraseHtml(text: string, locale: string): string {
  const parts = cjkPhrases(text, locale);
  let html = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i > 0) {
      const before = parts[i - 1].slice(-1);
      const after = part.charAt(0);
      if (!SPACE.test(before) && !SPACE.test(after) && (CJK.test(before) || CJK.test(after))) html += '<wbr>';
    }
    html += escapeHtml(part);
  }
  return html;
}
