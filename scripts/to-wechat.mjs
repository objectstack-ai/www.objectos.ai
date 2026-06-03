#!/usr/bin/env node
// Convert an article to WeChat-ready HTML and open it in the browser.
//
// Usage:
//   pnpm wechat extend-existing-systems-with-ai
//   pnpm wechat extend-existing-systems-with-ai --locale zh-Hans
//   pnpm wechat <slug> --no-open       # just write the file
//
// Workflow: the file opens in your browser; select all (⌘A), copy (⌘C),
// then paste into the WeChat editor — inline styles are preserved.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { argv, exit, cwd } from 'node:process';
import { execFile } from 'node:child_process';
import path from 'node:path';
import { toWechatHtml } from './lib/wechat-html.mjs';

const args = argv.slice(2);
const noOpen = args.includes('--no-open');
const localeIdx = args.indexOf('--locale');
const locale = localeIdx !== -1 ? args[localeIdx + 1] : 'en';

// First positional arg that isn't a flag or a flag's value.
let slug;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--locale') { i++; continue; }
  if (args[i].startsWith('--')) continue;
  slug = args[i];
  break;
}

if (!slug) {
  console.error('✗ Missing slug.\n  Usage: pnpm wechat <slug> [--locale zh-Hans]');
  exit(1);
}

const indexName = locale === 'en' ? 'index.mdx' : `index.${locale}.mdx`;
const flatName = locale === 'en' ? `${slug}.mdx` : `${slug}.${locale}.mdx`;
// Prefer folder-per-post layout, fall back to flat files.
const candidates = [
  path.join(cwd(), 'content', 'blog', slug, indexName),
  path.join(cwd(), 'content', 'blog', flatName),
];
let srcPath;
for (const c of candidates) {
  try {
    await access(c);
    srcPath = c;
    break;
  } catch {
    /* try next */
  }
}
if (!srcPath) {
  console.error(`✗ Not found: content/blog/${slug}/${indexName}`);
  exit(1);
}

const source = await readFile(srcPath, 'utf8');
const { html, title } = toWechatHtml(source);

// Wrap in a WeChat-width page for previewing/copying in the browser.
const page = `<!doctype html>
<html lang="zh">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title ?? slug} · 公众号预览</title></head>
<body style="margin:0;background:#ebedf0;">
  <div style="max-width:677px;margin:0 auto;background:#fff;padding:20px 16px 60px;">
    ${html}
  </div>
</body>
</html>`;

const outDir = path.join(cwd(), 'build', 'wechat');
await mkdir(outDir, { recursive: true });
const outName = locale === 'en' ? `${slug}.html` : `${slug}.${locale}.html`;
const outPath = path.join(outDir, outName);
await writeFile(outPath, page, 'utf8');

console.log(`✓ Wrote build/wechat/${outName}`);
if (!noOpen) {
  execFile('open', [outPath], (err) => {
    if (err) console.log(`  Open it manually: ${outPath}`);
    else console.log('  Opened in browser — select all (⌘A), copy (⌘C), paste into WeChat.');
  });
} else {
  console.log(`  ${outPath}`);
}
