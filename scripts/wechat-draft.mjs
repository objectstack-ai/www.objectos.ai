#!/usr/bin/env node
// Create a WeChat Official Account DRAFT from an article via the official API.
// (Stops at draft — you press the final "发布" in the WeChat backend after review.)
//
// In-body images are handled automatically: every local <img> (e.g. ./pic.webp)
// is uploaded to WeChat and rewritten to an mmbiz URL so the draft renders with
// images intact. webp/svg/gif are converted to PNG (SVG is rasterized) first.
//
// Requires a *verified* service/subscription account. Set credentials in .env:
//   WECHAT_APPID=...
//   WECHAT_APPSECRET=...
// And whitelist this machine's public IP in 微信公众平台 → 开发 → 基本配置 → IP白名单.
//
// Usage:
//   pnpm wechat:draft <slug> --cover ./path/to/cover.jpg
//   pnpm wechat:draft <slug> --locale zh-Hans --cover ./cover.jpg

import { readFile, access } from 'node:fs/promises';
import { argv, exit, cwd, env } from 'node:process';
import path from 'node:path';
import sharp from 'sharp';
import { toWechatHtml } from './lib/wechat-html.mjs';

const API = 'https://api.weixin.qq.com/cgi-bin';

// --- args --------------------------------------------------------------------
const args = argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
}
const locale = flag('locale') ?? 'en';
const coverPath = flag('cover');
const slug = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--locale' && args[i - 1] !== '--cover');

if (!slug) die('Missing slug. Usage: pnpm wechat:draft <slug> --cover ./cover.jpg');
if (!coverPath) die('Missing --cover. WeChat requires a cover image for the draft.');

function die(msg) {
  console.error(`✗ ${msg}`);
  exit(1);
}

// --- load .env ---------------------------------------------------------------
async function loadEnv() {
  try {
    const txt = await readFile(path.join(cwd(), '.env'), 'utf8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] ??= m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no .env — rely on real environment */
  }
}
await loadEnv();

const { WECHAT_APPID, WECHAT_APPSECRET } = env;
if (!WECHAT_APPID || !WECHAT_APPSECRET) {
  die('Set WECHAT_APPID and WECHAT_APPSECRET in .env (copy from .env.example).');
}

// --- API helpers -------------------------------------------------------------
function check(json, what) {
  if (json.errcode) {
    die(`${what} failed: errcode ${json.errcode} — ${json.errmsg}` +
      (json.errcode === 40164 ? '\n  → Add the IP shown above to your account IP whitelist.' : ''));
  }
  return json;
}

async function getToken() {
  const url = `${API}/token?grant_type=client_credential&appid=${WECHAT_APPID}&secret=${WECHAT_APPSECRET}`;
  const json = await (await fetch(url)).json();
  check(json, 'Fetch access_token');
  return json.access_token;
}

async function uploadCover(token, file) {
  const buf = await readFile(file);
  const fd = new FormData();
  fd.append('media', new Blob([buf]), path.basename(file));
  const url = `${API}/material/add_material?access_token=${token}&type=image`;
  const json = await (await fetch(url, { method: 'POST', body: fd })).json();
  check(json, 'Upload cover');
  return json.media_id;
}

// Upload one in-body image and return a WeChat-hosted URL usable in article
// content. Uses cgi-bin/media/uploadimg, which (unlike add_material) does NOT
// count against the media library quota and returns a permanent mmbiz URL.
// WeChat's content uploader only accepts JPG/PNG, so webp/svg/gif are
// rasterized to PNG (SVG is rendered at its intrinsic size) via sharp.
async function uploadContentImage(token, file) {
  const ext = path.extname(file).toLowerCase();
  let buf = await readFile(file);
  let name = path.basename(file);
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    buf = await sharp(buf).png().toBuffer();
    name = path.basename(file, ext) + '.png';
  }
  const fd = new FormData();
  fd.append('media', new Blob([buf]), name);
  const url = `${API}/media/uploadimg?access_token=${token}`;
  const json = await (await fetch(url, { method: 'POST', body: fd })).json();
  check(json, `Upload image ${name}`);
  return json.url;
}

// Find every <img> with a local src, upload it, and swap in the WeChat URL.
// Remote (http/https) and data: sources are left untouched. Uploads are cached
// by resolved path so a repeated image is only sent once.
async function inlineImages(token, html, articleDir) {
  const cache = new Map();
  const matches = [...html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"[^>]*>/g)];
  for (const [, src] of matches) {
    if (/^(https?:|data:)/i.test(src)) continue;
    const file = path.resolve(articleDir, src);
    if (!cache.has(src)) {
      try {
        await access(file);
      } catch {
        die(`Image referenced but not found: ${src}\n  (resolved to ${file})`);
      }
      console.log(`  ↳ uploading image: ${src}…`);
      cache.set(src, await uploadContentImage(token, file));
    }
    html = html.split(`src="${src}"`).join(`src="${cache.get(src)}"`);
  }
  return html;
}

async function addDraft(token, article) {
  const url = `${API}/draft/add?access_token=${token}`;
  const json = await (
    await fetch(url, { method: 'POST', body: JSON.stringify({ articles: [article] }) })
  ).json();
  check(json, 'Create draft');
  return json.media_id;
}

// --- main --------------------------------------------------------------------
const indexName = locale === 'en' ? 'index.mdx' : `index.${locale}.mdx`;
const flatName = locale === 'en' ? `${slug}.mdx` : `${slug}.${locale}.mdx`;
// Prefer folder-per-post layout, fall back to flat files. Track the resolved
// path so relative in-body image references can be resolved against it.
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
if (!srcPath) die(`Not found: content/blog/${slug}/${indexName}`);
const articleDir = path.dirname(srcPath);
const source = await readFile(srcPath, 'utf8');

let { html, title, description, author } = toWechatHtml(source);
if (!title) die('Article frontmatter has no title.');

console.log('• Fetching access_token…');
const token = await getToken();

console.log('• Uploading in-body images…');
html = await inlineImages(token, html, articleDir);

console.log(`• Uploading cover: ${coverPath}…`);
const thumb_media_id = await uploadCover(token, coverPath);

console.log('• Creating draft…');
const draftId = await addDraft(token, {
  title: title.slice(0, 64),
  author: (author ?? '').slice(0, 8),
  digest: (description ?? '').slice(0, 120),
  content: html,
  thumb_media_id,
  need_open_comment: 0,
  only_fans_can_comment: 0,
});

console.log(`\n✓ Draft created (media_id: ${draftId}).`);
console.log('  Open 微信公众平台 → 草稿箱, review it, then press 发布.');
