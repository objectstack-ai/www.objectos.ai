#!/usr/bin/env node
// Create a WeChat Official Account DRAFT from an article via the official API.
// (Stops at draft — you press the final "发布" in the WeChat backend after review.)
//
// Requires a *verified* service/subscription account. Set credentials in .env:
//   WECHAT_APPID=...
//   WECHAT_APPSECRET=...
// And whitelist this machine's public IP in 微信公众平台 → 开发 → 基本配置 → IP白名单.
//
// Usage:
//   pnpm wechat:draft <slug> --cover ./path/to/cover.jpg
//   pnpm wechat:draft <slug> --locale zh-Hans --cover ./cover.jpg

import { readFile } from 'node:fs/promises';
import { argv, exit, cwd, env } from 'node:process';
import path from 'node:path';
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
const source = await readFile(
  path.join(cwd(), 'content', 'blog', slug, indexName),
  'utf8'
)
  .catch(() => readFile(path.join(cwd(), 'content', 'blog', flatName), 'utf8'))
  .catch(() => die(`Not found: content/blog/${slug}/${indexName}`));

const { html, title, description, author } = toWechatHtml(source);
if (!title) die('Article frontmatter has no title.');

console.log('• Fetching access_token…');
const token = await getToken();

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
