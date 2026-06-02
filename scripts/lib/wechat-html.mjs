// Convert an article's MDX source into WeChat-Official-Account-ready HTML.
//
// WeChat's editor strips <style> tags and class attributes — every style must
// be inline. It also disables external hyperlinks in the body, so links are
// turned into footnote references collected at the end.

import { marked } from 'marked';

// --- Inline style palette (tweak here to restyle every export) ---------------
const S = {
  section:
    'font-size:15px;line-height:1.75;color:#3f3f3f;letter-spacing:0.02em;word-break:break-word;',
  h1: 'font-size:22px;font-weight:bold;color:#1f2328;margin:1.6em 0 0.8em;line-height:1.4;',
  h2: 'font-size:20px;font-weight:bold;color:#1f2328;margin:1.6em 0 0.8em;padding-left:10px;border-left:4px solid #2563eb;line-height:1.4;',
  h3: 'font-size:17px;font-weight:bold;color:#1f2328;margin:1.4em 0 0.6em;line-height:1.4;',
  h4: 'font-size:15px;font-weight:bold;color:#1f2328;margin:1.2em 0 0.5em;',
  p: 'margin:0 0 1em;',
  strong: 'font-weight:bold;color:#1f2328;',
  em: 'font-style:italic;',
  blockquote:
    'margin:1em 0;padding:0.6em 1em;background:#f7f8fa;border-left:3px solid #d0d7de;color:#57606a;',
  pre: 'margin:1em 0;padding:14px 16px;background:#f6f8fa;border-radius:6px;overflow-x:auto;font-size:13px;line-height:1.5;white-space:pre;',
  codeInPre: 'font-family:Menlo,Consolas,monospace;color:#24292f;background:none;padding:0;',
  codeInline:
    'background:#f2f3f5;color:#c7254e;padding:2px 5px;border-radius:3px;font-size:13px;font-family:Menlo,Consolas,monospace;',
  ul: 'margin:0 0 1em;padding-left:1.4em;',
  ol: 'margin:0 0 1em;padding-left:1.4em;',
  li: 'margin:0.3em 0;',
  link: 'color:#2563eb;border-bottom:1px solid #2563eb;',
  sup: 'color:#2563eb;font-size:12px;',
  hr: 'border:none;border-top:1px solid #e5e7eb;margin:1.6em 0;',
  img: 'max-width:100%;border-radius:6px;display:block;margin:1em auto;',
  refUrl: 'color:#8c8c8c;font-size:13px;word-break:break-all;',
};

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

  let html = marked.parse(md, { mangle: false, headerIds: false });

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
