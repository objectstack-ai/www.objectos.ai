#!/usr/bin/env node
// Write a blog post's cover from a short spec, then check it against the
// cover spec (scripts/cover-spec.mjs). Cover spec v2, #430; the style page
// is docs/cover-style.md and the parts are in ./parts.mjs.
//
//   node scripts/covers/cover.mjs scripts/covers/specs/SLUG.mjs
//       writes content/blog/SLUG/cover.svg, the one cover every locale uses
//   node scripts/covers/cover.mjs SPEC.mjs --out FILE.svg
//       writes FILE.svg instead (a draft, or a post that is not on this branch)
//   node scripts/covers/cover.mjs --all --out-dir DIR
//       renders every spec in scripts/covers/specs/ into DIR
//
// A spec is a small ES module named after the post's slug:
//
//   export const aria = 'One neutral English sentence: what the picture shows.';
//   export const topic = 'governance';      // optional: else the post's frontmatter topic
//   export default ({ C, person, tile, arrow }) => [ ...parts ];
//
// The default export receives every export of ./parts.mjs and returns a list
// of parts (nested lists are flattened). The ground is the topic's tint;
// `svg()` paints it. The page renders the cover with the post's localized
// title as its alt text, so the aria-label is a short neutral description,
// not a title.
//
// Exit 1 when the written cover breaks the spec, or when the post (dated on
// or after SPEC_FROM) keeps another cover file or a locale off ./cover.svg.
import { mkdirSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';
import * as parts from './parts.mjs';
import { SHARED_COVER, SPEC_FROM, readPost, sharedFindings, specFindings } from '../cover-spec.mjs';

const ROOT = cwd();
const SPECS = path.join(path.dirname(new URL(import.meta.url).pathname), 'specs');
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');

/** Load a spec module and render it to SVG; `topic` falls back to the post's. */
export async function render(specFile, { topic: postTopic } = {}) {
  const spec = await import(pathToFileURL(path.resolve(specFile)).href);
  if (typeof spec.default !== 'function') throw new Error(`${specFile}: the default export must be a function (parts) => [...]`);
  if (typeof spec.aria !== 'string' || !spec.aria.trim()) throw new Error(`${specFile}: export a short neutral \`aria\` description`);
  if (spec.topic && postTopic && spec.topic !== postTopic) throw new Error(`${specFile}: topic "${spec.topic}" disagrees with the post's frontmatter topic "${postTopic}"`);
  const topic = postTopic ?? spec.topic;
  if (!topic) throw new Error(`${specFile}: no topic (export \`topic\`, or write the cover into a post folder whose .mdx has one)`);
  return { topic, svg: parts.svg(spec.default(parts), { topic, aria: spec.aria }) };
}

const slugOf = (specFile) => path.basename(specFile).replace(/\.m?js$/, '');

async function main() {
  const args = argv.slice(2);
  const opt = (name) => {
    const i = args.indexOf(name);
    return i < 0 ? undefined : args[i + 1];
  };
  const out = opt('--out');
  const outDir = opt('--out-dir');
  const files = args.includes('--all')
    ? readdirSync(SPECS).filter((f) => f.endsWith('.mjs')).sort().map((f) => path.join(SPECS, f))
    : args.filter((a, i) => !a.startsWith('--') && !['--out', '--out-dir'].includes(args[i - 1]));
  if (!files.length || (out && files.length > 1)) {
    console.error('usage: node scripts/covers/cover.mjs SPEC.mjs [--out FILE.svg] | --all --out-dir DIR');
    exit(2);
  }
  let failed = 0;
  for (const specFile of files) {
    const slug = slugOf(specFile);
    let target, post = null;
    if (out) target = path.resolve(out);
    else if (outDir) target = path.resolve(outDir, `${slug}.svg`);
    else {
      const dir = path.join(ROOT, 'content', 'blog', slug);
      if (!existsSync(dir)) {
        console.error(`${rel(specFile)}: no post folder content/blog/${slug}/ on this branch; pass --out FILE.svg to render it elsewhere`);
        failed++;
        continue;
      }
      target = path.join(dir, SHARED_COVER);
      post = await readPost(dir, readdirSync(dir));
    }
    const { topic, svg } = await render(specFile, { topic: post?.topic });
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, svg);
    const findings = specFindings(svg, { topic });
    const shared = post ? sharedFindings(post) : [];
    const blocking = findings.length || (shared.length && post.date >= SPEC_FROM);
    if (blocking) failed++;
    console.log(`${rel(target)}: ${topic}, ${findings.length ? `${findings.length} finding(s)` : 'keeps to the spec'}`);
    for (const f of findings) console.log(`  :${f.line}  [${f.rule}] ${f.message}`);
    for (const m of shared) console.log(`  [shared] ${m}`);
  }
  if (failed) exit(1);
}

if (import.meta.url === pathToFileURL(argv[1] ?? '').href) await main();
