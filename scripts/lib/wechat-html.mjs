// Convert an article's MDX source into WeChat-Official-Account-ready HTML.
//
// WeChat's editor strips <style> tags and class attributes — every style must
// be inline. It also disables external hyperlinks in the body, so links are
// turned into footnote references collected at the end.

import { marked } from 'marked';
import { collapseCjkSegmentBreaks, firstChar, lastChar } from './cjk-segment-break.mjs';
import { directQuotes, hasCjkLetter } from './cjk-quotes.mjs';

// --- Inline style palette (tweak here to restyle every export) ---------------
// Accent: indigo #4f46e5. Designed for WeChat (inline styles only; classes and
// <style> tags are stripped by the editor).
const S = {
  section:
    'font-size:16px;line-height:1.9;color:#3f3f3f;letter-spacing:0.034em;word-break:break-word;',
  h1: 'font-size:22px;font-weight:bold;color:#1d1d2c;margin:1.8em 0 0.9em;line-height:1.5;',
  // Tinted block header with accent bar — the main visual anchor.
  h2: 'font-size:19px;font-weight:bold;color:#1d1d2c;margin:2.2em 0 1em;padding:9px 16px;background:#eef0fe;border-left:4px solid #4f46e5;border-radius:6px;line-height:1.6;',
  h3: 'font-size:16px;font-weight:bold;color:#4f46e5;margin:1.8em 0 0.7em;padding-left:11px;border-left:3px solid #4f46e5;line-height:1.5;',
  h4: 'font-size:15px;font-weight:bold;color:#1d1d2c;margin:1.4em 0 0.5em;',
  p: 'margin:0 0 1.35em;',
  // Colored bold makes key phrases pop on scan — standard WeChat treatment.
  strong: 'font-weight:bold;color:#4f46e5;',
  em: 'font-style:italic;color:#1d1d2c;',
  // Card-style callout — used for 金句 / CTA blocks.
  blockquote:
    'margin:1.6em 0;padding:16px 18px;background:#f6f7fc;border-left:4px solid #4f46e5;border-radius:10px;color:#4a4a5c;font-size:15px;line-height:1.8;',
  pre: 'margin:1.4em 0;padding:14px 16px;background:#f6f8fa;border-radius:8px;overflow-x:auto;font-size:13px;line-height:1.6;white-space:pre;',
  codeInPre: 'font-family:Menlo,Consolas,monospace;color:#24292f;background:none;padding:0;',
  codeInline:
    'background:#eef0fe;color:#4f46e5;padding:2px 6px;border-radius:4px;font-size:14px;font-family:Menlo,Consolas,monospace;',
  ul: 'margin:0.4em 0 1.35em;padding-left:1.5em;',
  ol: 'margin:0.4em 0 1.35em;padding-left:1.5em;',
  li: 'margin:0.55em 0;',
  link: 'color:#4f46e5;border-bottom:1px solid #4f46e5;',
  sup: 'color:#4f46e5;font-size:12px;',
  // Short centered rule reads as an intentional section break.
  hr: 'border:none;border-top:2px solid #e6e6ef;width:40px;margin:2.6em auto;',
  img: 'max-width:100%;border-radius:8px;display:block;margin:1.2em auto;',
  refUrl: 'color:#8c8c8c;font-size:13px;word-break:break-all;',
};

// --- CJK prose in marked's tokens --------------------------------------------
// The site fixes two things in CJK prose at build time, but the export renders
// with marked, not Astro, so neither step reaches it. Both are applied here to
// marked's inline tokens, with the same definitions the site uses:
//
//   * a source line break between two CJK characters is removed
//     (`collapseCjkSegmentBreaks`, scripts/lib/cjk-segment-break.mjs), since
//     the WeChat reader, like Chromium and Safari, shows it as a space;
//   * quotation marks are set by their position in their pair (`directQuotes`,
//     scripts/lib/cjk-quotes.mjs). marked leaves ASCII quotes straight; a block
//     holding a CJK letter gets the curly marks the site prints, and a block
//     without one is left as marked renders it, so an English export is
//     unchanged.
//
// Code spans, images, raw HTML and line breaks bound the prose for the first
// (a break next to inline code keeps its space) and are opaque inside it for
// the second (a quotation may wrap inline code). Fenced code is a block token
// with no inline tokens, so neither step ever sees it.

/** Inline tokens whose children are part of the same sentence. */
const INLINE_CONTAINERS = new Set(['strong', 'em', 'del', 'link']);

/** One block's inline content in order: text tokens, and `null` for anything opaque. */
function inlineItems(tokens, items = []) {
  for (const token of tokens) {
    if (token.type === 'text' || token.type === 'escape') items.push(token);
    else if (INLINE_CONTAINERS.has(token.type) && token.tokens) inlineItems(token.tokens, items);
    else items.push(null);
  }
  return items;
}

/** The character just outside item `i` of `values`, looking in direction `step`. */
function neighbourChar(values, i, step) {
  for (let j = i + step; j >= 0 && j < values.length; j += step) {
    if (values[j] === null) return '';
    if (values[j].length > 0) return step < 0 ? lastChar(values[j]) : firstChar(values[j]);
  }
  return '';
}

function fixInlineRun(tokens) {
  const items = inlineItems(tokens);
  // Read from the values as lexed, before any edit, as the rehype step does.
  const values = items.map((item) => (item ? item.text : null));
  const collapsed = values.map((value, i) =>
    value !== null && value.includes('\n')
      ? collapseCjkSegmentBreaks(value, neighbourChar(values, i, -1), neighbourChar(values, i, 1))
      : value
  );
  const prose = collapsed.filter((value) => value !== null).join('');
  const directed = hasCjkLetter(prose) ? directQuotes(collapsed) : collapsed;
  items.forEach((item, i) => {
    if (item) item.text = directed[i];
  });
}

/**
 * marked `walkTokens` callback: fixes each token that holds one block's inline
 * tokens (a paragraph, a heading, a tight list item's text, a table cell). An
 * inline token is visited too and ignored: none of these types is inline,
 * except `text`, which holds inline tokens only at block level.
 */
function fixCjkBlock(token) {
  if (token.type === 'table') {
    for (const cell of [...token.header, ...token.rows.flat()]) fixInlineRun(cell.tokens);
  } else if ((token.type === 'paragraph' || token.type === 'heading' || token.type === 'text') && token.tokens) {
    fixInlineRun(token.tokens);
  }
}

/** Minimal frontmatter splitter — single-line scalars only (title/desc/author). */
function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.+)$/);
    if (mm) data[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: src.slice(m[0].length) };
}

function styleTag(html, tag, style) {
  return html.replace(
    new RegExp(`<${tag}(\\s[^>]*)?>`, 'g'),
    (_, attrs) => `<${tag}${attrs ?? ''} style="${style}">`
  );
}

/**
 * @param {string} source raw .mdx file contents
 * @returns {{ html: string, title?: string, description?: string, author?: string }}
 */
export function toWechatHtml(source) {
  const { data, body } = splitFrontmatter(source);

  // Drop any MDX import/export lines (our posts are plain markdown, but be safe).
  const md = body
    .split('\n')
    .filter((l) => !/^\s*(import|export)\s/.test(l))
    .join('\n')
    .trim();

  let html = marked.parse(md, { mangle: false, headerIds: false, walkTokens: fixCjkBlock });

  // Code: blocks first (so their <code> gets styled), then inline <code>.
  html = html.replace(
    /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
    (_, code) => `<pre style="${S.pre}"><code style="${S.codeInPre}">${code}</code></pre>`
  );
  html = html.replace(/<code>/g, `<code style="${S.codeInline}">`);

  // Links -> footnote references.
  const refs = [];
  html = html.replace(
    /<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g,
    (_, href, text) => {
      refs.push(href);
      return `<span style="${S.link}">${text}</span><sup style="${S.sup}">[${refs.length}]</sup>`;
    }
  );

  // Block/inline element styling.
  for (const [tag, style] of [
    ['h1', S.h1], ['h2', S.h2], ['h3', S.h3], ['h4', S.h4],
    ['p', S.p], ['blockquote', S.blockquote], ['ul', S.ul], ['ol', S.ol],
    ['li', S.li], ['strong', S.strong], ['em', S.em], ['hr', S.hr], ['img', S.img],
  ]) {
    html = styleTag(html, tag, style);
  }

  if (refs.length) {
    html +=
      `<h3 style="${S.h3}">参考链接</h3><ol style="${S.ol}">` +
      refs.map((u) => `<li style="${S.li}"><span style="${S.refUrl}">${u}</span></li>`).join('') +
      `</ol>`;
  }

  return {
    html: `<section style="${S.section}">${html}</section>`,
    title: data.title,
    description: data.description,
    author: data.author,
  };
}
