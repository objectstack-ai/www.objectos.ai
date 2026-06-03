#!/usr/bin/env node
// Generate Traditional-Chinese (zh-Hant, Taiwan / s2twp) blog posts from the
// Simplified (zh-Hans) sources. Auto-convert by default; a hand-written
// zh-Hant file (one WITHOUT the @generated marker) is left untouched so you
// can polish tone/idioms for specific articles.
//
// Runs before `pnpm dev` and `pnpm build`.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import * as OpenCC from 'opencc-js';

const convert = OpenCC.Converter({ from: 'cn', to: 'twp' });

// Pure-ASCII marker so OpenCC never touches it and includes() is reliable.
const MARKER =
  '# @generated zh-Hant from zh-Hans (s2twp) — edit the zh-Hans file; delete this line to hand-maintain.';

const BLOG = path.join(process.cwd(), 'content', 'blog');

const entries = await readdir(BLOG, { withFileTypes: true }).catch(() => []);
const slugs = entries.filter((d) => d.isDirectory()).map((d) => d.name);

let made = 0;
let kept = 0;
for (const slug of slugs) {
  const src = path.join(BLOG, slug, 'index.zh-Hans.mdx');
  const out = path.join(BLOG, slug, 'index.zh-Hant.mdx');
  if (!existsSync(src)) continue;

  // Respect a hand-maintained Traditional override.
  if (existsSync(out)) {
    const current = await readFile(out, 'utf8');
    if (!current.includes(MARKER)) {
      kept++;
      continue;
    }
  }

  const raw = await readFile(src, 'utf8');
  // OpenCC only rewrites Han characters, so YAML keys, slugs, markdown
  // syntax and code stay intact. Convert first, then stamp the marker.
  const converted = convert(raw).replace(/^---\n/, `---\n${MARKER}\n`);
  await writeFile(out, converted, 'utf8');
  made++;
}

console.log(`✓ zh-Hant: generated ${made}, kept ${kept} hand-maintained`);
