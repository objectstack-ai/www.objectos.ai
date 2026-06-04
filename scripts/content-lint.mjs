#!/usr/bin/env node
// Deterministic content checks for the blog publishing gate.
//
// Default behavior checks every MDX file. Use `--published` in CI/builds to
// skip archived content and check only indexable content.

import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { cwd, argv, exit } from 'node:process';
import yaml from 'js-yaml';

const ROOT = cwd();
const BLOG = path.join(ROOT, 'content', 'blog');
const args = new Set(argv.slice(2));
const onlyPublished = args.has('--published');
const today = new Date();
today.setHours(23, 59, 59, 999);

const VALID_STATUS = new Set(['published', 'archived']);
const VALID_TOPIC = new Set([
  'ai-agents',
  'app-building',
  'integration-data',
  'automation',
  'modernization',
  'governance',
  'customer-stories',
]);
const VALID_AUDIENCE = new Set(['business', 'it', 'developer', 'general']);
const PLACEHOLDERS = [
  { label: 'Write your article here', pattern: /write your article here/i },
  { label: 'your-domain.com', pattern: /your-domain\.com/i },
  { label: 'TODO', pattern: /\bTODO\b/ },
  { label: 'TBD', pattern: /\bTBD\b/i },
  { label: 'lorem ipsum', pattern: /lorem ipsum/i },
];

function localeFromFile(file) {
  const base = path.basename(file);
  const match = base.match(/^index\.([A-Za-z-]+)\.mdx$/);
  return match?.[1] ?? 'en';
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

function splitFrontmatter(source, file) {
  if (!source.startsWith('---\n')) {
    throw new Error(`${file} does not start with YAML frontmatter`);
  }
  const end = source.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error(`${file} has no closing frontmatter fence`);
  }
  return {
    raw: source.slice(4, end),
    body: source.slice(end + 4).trim(),
  };
}

function words(text) {
  const latin = text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?/g) ?? [];
  const han = text.match(/[\u3400-\u9fff]/g) ?? [];
  const kana = text.match(/[\u3040-\u30ff]/g) ?? [];
  const hangul = text.match(/[\uac00-\ud7af]/g) ?? [];
  return latin.length + Math.ceil((han.length + kana.length + hangul.length) / 2);
}

function localAssetRefs(data, body) {
  const refs = [];
  if (typeof data.cover === 'string' && data.cover.startsWith('./')) {
    refs.push(data.cover);
  }
  const imagePattern = /!\[[^\]]*]\((\.\/[^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const match of body.matchAll(imagePattern)) refs.push(match[1]);
  return refs;
}

function addIssue(issues, file, data, severity, message) {
  issues.push({
    file,
    status: data?.status ?? 'unknown',
    severity,
    message,
  });
}

const files = await walk(BLOG);
const posts = [];
const issues = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const source = await readFile(file, 'utf8');
  let frontmatter;
  let body;
  let data;
  try {
    frontmatter = splitFrontmatter(source, rel);
    body = frontmatter.body;
    data = yaml.load(frontmatter.raw) ?? {};
  } catch (error) {
    addIssue(issues, rel, null, 'error', error.message);
    continue;
  }

  if (onlyPublished && data.status !== 'published') continue;

  const slug = path.basename(path.dirname(file));
  const locale = localeFromFile(file);
  const post = { file: rel, path: file, slug, locale, data, body };
  posts.push(post);

  for (const key of ['title', 'description', 'date', 'status', 'topic', 'audience']) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      addIssue(issues, rel, data, 'error', `Missing required frontmatter field: ${key}`);
    }
  }

  if (!VALID_STATUS.has(data.status)) {
    addIssue(issues, rel, data, 'error', `Invalid status: ${data.status}`);
  }
  if (data.topic && !VALID_TOPIC.has(data.topic)) {
    addIssue(issues, rel, data, 'error', `Invalid topic: ${data.topic}`);
  }
  if (data.audience && !VALID_AUDIENCE.has(data.audience)) {
    addIssue(issues, rel, data, 'error', `Invalid audience: ${data.audience}`);
  }

  if (typeof data.title === 'string') {
    if (data.title.length > 95) {
      addIssue(issues, rel, data, 'warn', `Title is long (${data.title.length} chars)`);
    }
    if (data.title.length < 12) {
      addIssue(issues, rel, data, 'warn', 'Title is very short');
    }
  }

  if (typeof data.description === 'string') {
    if (data.description.length < 55) {
      addIssue(issues, rel, data, 'warn', `Description is short (${data.description.length} chars)`);
    }
    if (data.description.length > 230) {
      addIssue(issues, rel, data, 'warn', `Description is long (${data.description.length} chars)`);
    }
  }

  if (data.date) {
    const date = new Date(data.date);
    if (Number.isNaN(date.getTime())) {
      addIssue(issues, rel, data, 'error', `Invalid date: ${data.date}`);
    } else if (date > today) {
      addIssue(issues, rel, data, 'warn', `Date is in the future: ${data.date}`);
    }
  }

  if (words(body) < 450) {
    addIssue(issues, rel, data, 'warn', `Body looks thin (${words(body)} estimated words)`);
  }

  const renderedContent = `${JSON.stringify(data)}\n${body}`;
  for (const placeholder of PLACEHOLDERS) {
    if (placeholder.pattern.test(renderedContent)) {
      addIssue(issues, rel, data, 'error', `Placeholder text found: ${placeholder.label}`);
    }
  }

  for (const ref of localAssetRefs(data, body)) {
    const target = path.join(path.dirname(file), ref);
    try {
      await access(target);
    } catch {
      addIssue(issues, rel, data, 'error', `Missing local asset: ${ref}`);
    }
  }
}

function duplicateKey(post, key) {
  const value = post.data[key];
  return typeof value === 'string'
    ? `${post.locale}::${value.trim().toLowerCase()}`
    : null;
}

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const post of posts) {
    const value = duplicateKey(post, key);
    if (!value) continue;
    const first = seen.get(value);
    if (first) {
      const severity =
        first.data.status === 'published' && post.data.status === 'published'
          ? 'error'
          : 'warn';
      addIssue(
        issues,
        post.file,
        post.data,
        severity,
        `Duplicate ${key} in ${post.locale}; first seen in ${first.file}`
      );
    } else {
      seen.set(value, post);
    }
  }
}

const blocking = issues.filter(
  (issue) =>
    issue.severity === 'error' &&
    (issue.status === 'published' || issue.status === 'unknown')
);

if (issues.length === 0) {
  console.log(`✓ content lint passed (${posts.length} file${posts.length === 1 ? '' : 's'} checked)`);
  exit(0);
}

for (const issue of issues) {
  const marker =
    issue.severity === 'error' &&
    (issue.status === 'published' || issue.status === 'unknown')
      ? '✗'
      : issue.severity === 'error'
        ? '!'
        : '•';
  console.log(`${marker} ${issue.file}: ${issue.message}`);
}

if (blocking.length > 0) {
  console.error(`\n✗ content lint failed (${blocking.length} blocking issue${blocking.length === 1 ? '' : 's'})`);
  exit(1);
}

console.log(`\n✓ content lint passed (${posts.length} files checked)`);
