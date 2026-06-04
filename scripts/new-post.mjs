#!/usr/bin/env node
// Scaffold a new article in content/blog/.
//
// Usage:
//   pnpm new "My Article Title"
//   pnpm new "My Article Title" --slug custom-slug
//   pnpm new "标题" --slug my-slug --locale zh-Hans
//
// Locale defaults to "en" (file: <slug>.mdx). Any other locale produces
// <slug>.<locale>.mdx so it groups with its translation on the dashboard.

import { writeFile, access, mkdir } from 'node:fs/promises';
import { argv, exit, cwd } from 'node:process';
import path from 'node:path';

const args = argv.slice(2);

function takeFlag(name) {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return undefined;
  const value = args[i + 1];
  args.splice(i, 2);
  return value;
}

const slugFlag = takeFlag('slug');
const locale = takeFlag('locale') ?? 'en';
const title = args.filter((a) => !a.startsWith('--')).join(' ').trim();

if (!title) {
  console.error('✗ Missing title.\n  Usage: pnpm new "My Article Title" [--slug my-slug] [--locale zh-Hans]');
  exit(1);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const slug = slugFlag ?? slugify(title);
if (!slug) {
  console.error('✗ Could not derive a slug from the title (non-ASCII?). Pass one explicitly:\n  pnpm new "标题" --slug my-slug');
  exit(1);
}

const today = new Date().toISOString().slice(0, 10);
// Folder-per-post: content/blog/<slug>/index[.locale].mdx — co-locate images here.
const dir = path.join(cwd(), 'content', 'blog', slug);
const fileName = locale === 'en' ? 'index.mdx' : `index.${locale}.mdx`;
const filePath = path.join(dir, fileName);

const frontmatter = `---
title: ${title}
description: ""
author: ObjectStack Team
date: ${today}
status: published
# Topic (main axis): ai-agents | app-building | integration-data | automation | modernization | governance | customer-stories
topic: ai-agents
# Audience: business | it | developer | general
audience: business
# Solutions (optional, 0..n): crm | portals | onboarding | case-management | field-service | supply-chain | hr
solutions: []
# Industries (optional, 0..n): financial-services | insurance | healthcare | manufacturing | retail | public-sector | telecom-media | energy-utilities
industries: []
# Tags — freeform long-tail, e.g. [降本增效, 趋势观点]
tags: []
# cover: ./cover.png   # drop an image in this folder and Astro will optimize it
# canonical_url: https://your-domain.com/blog/${slug}
# channels:
#   - platform: own-blog
#     url: https://your-domain.com/blog/${slug}
#     published_at: ${today}
---

Write your article here.
`;

try {
  await access(filePath);
  console.error(`✗ File already exists: content/blog/${slug}/${fileName}`);
  exit(1);
} catch {
  // does not exist — good
}

await mkdir(dir, { recursive: true });
await writeFile(filePath, frontmatter, 'utf8');
console.log(`✓ Created content/blog/${slug}/${fileName}`);
console.log(`  Preview at http://localhost:4321/${locale}/blog/${slug}/`);
