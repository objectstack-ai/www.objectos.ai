// Quotation marks in CJK prose must point the right way.
//
// Astro's default smartypants (remark-smartypants over retext-smartypants)
// curls an ASCII quote by looking at the characters around it: after a letter
// it is a closing mark, after a space or punctuation an opening one. Chinese
// and Japanese put no space before a quotation, so the opening mark of a pair
// that follows a character comes out closing: 「大多数”给你的业务加上 AI”的说辞」.
// It also reads the whole document as one string, so a heading or table cell
// that starts with a quote takes its direction from the last letter of the
// block before it; that is the Korean case, where words are spaced
// («”다른 AI에게 검토를 맡기면 되지”가 …» as an h2). An audit of the built site
// found 299 such pairs in 16 zh-Hans posts, the same in their zh-Hant copies,
// and 13 headings and table cells in six ko posts.
//
// The rule here does not guess from neighbours. Within one block of prose (a
// paragraph, a heading, a table cell) double quotation marks come in pairs, so
// a mark's direction is its position in the pair: the first opens, the next
// closes. A mark the author already typed curly counts the same way, so a
// source that mixes `"` and `“ ”` still pairs. Single marks pair the same way,
// except an apostrophe, which is not part of a pair (see `isApostrophe`).
//
// Two consumers share these definitions, so they cannot disagree:
//
//   * `remarkCjkQuotes`, the build-time fix, wired into
//     `markdown.remarkPlugins` in astro.config.mjs (MDX inherits it). It runs
//     after smartypants and only on zh-Hans, zh-Hant, ja and ko files, chosen
//     by file name, so an English, German, Spanish or French page is not
//     touched at all. Every future post in those locales is covered, however
//     its quotes were typed.
//   * `pnpm content:lint --dist`, the guard, which reads the BUILT HTML of
//     every zh, ja and ko page with its own scanner and fails on a mark whose
//     direction disagrees with its position, or a pair left open. It catches
//     the step not running, and CJK prose reaching a page by another road.
//
// The WeChat export (scripts/lib/wechat-html.mjs) renders with marked, which
// does not curl quotes at all, and uses `directQuotes` on its own tokens.
//
// Code is never touched: inline code, images and other non-prose inlines are
// opaque. They sit in the sentence (a quote can wrap inline code), but their
// text is neither edited nor read.
//
// The marks stay “ ” and ‘ ’. AGENTS.md records no zh quotation style, and the
// sources already type “ ” (354 pairs in zh-Hans) far more than 「」 (23), so
// the author's choice of mark is kept and only the direction is corrected;
// a source that types 「」 is left exactly as written.

import { OPAQUE_ELEMENTS } from './cjk-segment-break.mjs';

/** Locales whose prose puts no space before a quotation, or whose files this step owns. */
export const CJK_QUOTE_LOCALES = new Set(['zh-Hans', 'zh-Hant', 'ja', 'ko']);

/**
 * The CJK locale of a content file from its name, or null. A translation is
 * `index.<locale>.mdx` (or flat `<slug>.<locale>.mdx`); the English original
 * carries no locale and is never matched.
 */
export function cjkLocaleOfPath(file) {
  const m = /\.([A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?)\.mdx?$/.exec(String(file ?? ''));
  return m && CJK_QUOTE_LOCALES.has(m[1]) ? m[1] : null;
}

export const DOUBLE_QUOTES = new Set(['"', '“', '”']);
export const SINGLE_QUOTES = new Set(["'", '‘', '’']);

/**
 * Stands for an opaque inline (inline code, an image) in a block's text. It
 * counts as a word character, so `` `x`'s `` keeps its apostrophe.
 */
export const OPAQUE_INLINE = '\uFFFC';

const WORD_BEFORE = /^[\p{Script=Latin}\p{Nd}\uFFFC]$/u;
const LETTER_AFTER = /^\p{Script=Latin}/u;
// `'26`, `'90s`: the century is elided, so the mark is an apostrophe. Only
// when the year ends there (a space, the end, or sentence punctuation): a
// quotation that opens on a number, `'40~60% 절약'`, is still a quotation.
const DECADE_AFTER = /^\d\ds?(?=$|\s|[,，、;；:：)）!！?？]|[.。](?!\d))/u;

/**
 * True when a single mark is an apostrophe rather than a quotation mark: it
 * follows a Latin letter or digit and either a letter follows (`don't`) or no
 * single quotation is open (`users'`), or it elides a century (`Next '26,`). An
 * apostrophe is always ’ and never opens or closes a pair. The test needs only
 * the character before and the text after, because ’ is also what a closing
 * mark looks like: getting a possessive wrong for a closing mark is invisible.
 */
export function isApostrophe(before, after, singleOpen) {
  if (WORD_BEFORE.test(before) && (LETTER_AFTER.test(after) || !singleOpen)) return true;
  return DECADE_AFTER.test(after);
}

function lastCharOf(text) {
  const chars = Array.from(text.slice(-2));
  return chars[chars.length - 1] ?? '';
}

/**
 * Directs every quotation mark in one block of prose. `segments` is the
 * block's text in document order: a string is prose, `null` an opaque inline.
 * Returns the segments with each double and single mark set by its position
 * in its pair; nothing else changes, and `null` stays `null`.
 */
export function directQuotes(segments) {
  const full = segments.map((s) => (s === null ? OPAQUE_INLINE : s)).join('');
  let doubleOpen = false;
  let singleOpen = false;
  let at = 0;
  return segments.map((segment) => {
    if (segment === null) {
      at += OPAQUE_INLINE.length;
      return null;
    }
    let out = '';
    for (const ch of segment) {
      if (DOUBLE_QUOTES.has(ch)) {
        out += doubleOpen ? '”' : '“';
        doubleOpen = !doubleOpen;
      } else if (SINGLE_QUOTES.has(ch)) {
        const before = lastCharOf(full.slice(Math.max(0, at - 2), at));
        if (isApostrophe(before, full.slice(at + 1, at + 6), singleOpen)) {
          out += '’';
        } else {
          out += singleOpen ? '’' : '‘';
          singleOpen = !singleOpen;
        }
      } else {
        out += ch;
      }
      at += ch.length;
    }
    return out;
  });
}

/** True when the text holds a CJK ideograph, kana or Hangul syllable. */
export function hasCjkLetter(text) {
  return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(text);
}

// ─── remark ──────────────────────────────────────────────────────────────

/** mdast nodes that hold one block of prose: quotation pairs never span two. */
const BLOCKS = new Set(['paragraph', 'heading', 'tableCell']);

/** Inline mdast nodes whose children are part of the same sentence. */
const CONTAINERS = new Set(['emphasis', 'strong', 'delete', 'link', 'linkReference']);

/**
 * The block's inline content in order: text nodes, `null` for an opaque
 * inline (inline code, an image, raw HTML, an MDX expression), and a line
 * break as the string it stands for.
 */
function collect(node, items) {
  for (const child of node.children ?? []) {
    if (child.type === 'text') {
      items.push(child);
    } else if (child.type === 'break') {
      items.push('\n');
    } else if (CONTAINERS.has(child.type)) {
      collect(child, items);
    } else if (
      child.type === 'mdxJsxTextElement' &&
      !OPAQUE_ELEMENTS.has(String(child.name ?? '').toLowerCase())
    ) {
      collect(child, items);
    } else {
      items.push(null);
    }
  }
}

function directBlocks(node) {
  for (const child of node.children ?? []) {
    if (!BLOCKS.has(child.type)) {
      directBlocks(child);
      continue;
    }
    const items = [];
    collect(child, items);
    const directed = directQuotes(
      items.map((item) => (item === null ? null : typeof item === 'string' ? item : item.value))
    );
    items.forEach((item, i) => {
      if (item !== null && typeof item !== 'string') item.value = directed[i];
    });
  }
}

/**
 * Remark plugin: set every quotation mark in a zh-Hans, zh-Hant, ja or ko
 * file by its position in its pair. Any other file is returned untouched.
 */
export function remarkCjkQuotes() {
  return (tree, file) => {
    if (!cjkLocaleOfPath(file?.path ?? file?.history?.[0])) return;
    directBlocks(tree);
  };
}
