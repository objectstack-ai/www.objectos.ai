// The share image of a blog post's locale page: a 1200x630 JPEG drawn at
// build time from the post's title in that locale and its cover
// (scripts/lib/og-composite.mjs), named by `og:image`, `twitter:image` and
// `BlogPosting.image`.
//
// Why a separate image at all: X, LinkedIn, Facebook and Slack draw no card
// for an SVG `og:image`, the PNG covers are 1.5-1.9 MB at 1672x941, and a
// cover under spec v2 (#430) carries no title, which a share card has nowhere
// else to show. So every locale page of a post with a cover gets one raster
// at the size the networks ask for, with its own title on it.
//
// Two readers, one rule. src/layouts/BlogPost.astro names the image in the
// page head; scripts/og-images.mjs renders it into dist/ after `astro build`
// and then checks that every page's head names a file it rendered, at the size
// the head declares. Both derive the URL from `postShareImage` below, so the
// page and the file cannot be computed two ways.
//
// One image per (post, locale), not per cover file: under spec v2 every
// locale of a post points at one `cover.svg`, and each still gets its own
// titled image.
//
// The URL carries a hash of everything the image is drawn from: the title,
// the locale, the cover's bytes, the renderer and its fonts module, the logo
// and OG_RENDER_REVISION. An edited title or cover therefore gets a new URL:
// the networks cache a share image by URL, for days, and a re-scrape of the
// post then fetches the new one. The same hash names the rendered file in
// scripts/og-images.mjs's cache, so an unchanged page is never drawn twice.

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';
import { splitFrontmatter } from './frontmatter.mjs';

/** The share image's size: the 1.91:1 card X, LinkedIn and Facebook all lay out. */
export const OG_IMAGE = { width: 1200, height: 630 };

/**
 * Part of every share image's URL hash. Bump it when the rendering changes in
 * a way the hashed files below do not show: a font package upgrade, a sharp
 * or libvips upgrade that draws differently.
 */
export const OG_RENDER_REVISION = '2';

/**
 * The files the drawing depends on, relative to the project root. Their bytes
 * are part of the hash, so a layout change re-renders every image and gives
 * it a new URL without anyone remembering to bump the revision.
 */
const RENDER_INPUTS = ['scripts/lib/og-composite.mjs', 'scripts/lib/og-fonts.mjs', 'public/logo.svg'];

/** The locale of a post source from its file name: index.mdx is English. */
const localeOf = (file) => /(?:^|[\\/])index(?:\.([A-Za-z]{2}(?:-[A-Za-z]{2,4})?))?\.mdx$/.exec(file)?.[1] ?? 'en';

function frontmatter(file, label) {
  const split = splitFrontmatter(readFileSync(file, 'utf8'));
  if (!split.ok) throw new Error(`${label}: cannot read its frontmatter (${split.reason})`);
  const data = yaml.load(split.raw);
  return data && typeof data === 'object' ? data : {};
}

function coverOf(file, data, label) {
  const cover = data.cover;
  if (cover === undefined || cover === null) return undefined;
  if (typeof cover !== 'string') throw new Error(`${label}: \`cover\` is not a path`);
  const coverFile = path.resolve(path.dirname(file), cover);
  if (!existsSync(coverFile)) throw new Error(`${label}: cover ${cover} does not exist`);
  return coverFile;
}

/**
 * The cover file a post's frontmatter names, as an absolute path, or
 * `undefined` for a post with no cover. Throws when the named file is missing,
 * which `astro build` would already have refused.
 *
 * @param {string} mdxFile The post's `.mdx`, absolute or relative to `root`.
 * @param {string} [root] Project root (the directory holding `content/`); the
 *   working directory by default, which is where `astro build` runs.
 */
export function postCoverFile(mdxFile, root = cwd()) {
  const file = path.resolve(root, mdxFile);
  return coverOf(file, frontmatter(file, mdxFile), mdxFile);
}

const renderInputsHash = new Map();
function renderInputs(root) {
  if (!renderInputsHash.has(root)) {
    const hash = createHash('sha256');
    for (const input of RENDER_INPUTS) hash.update(input).update('\0').update(readFileSync(path.join(root, input)));
    renderInputsHash.set(root, hash.digest('hex'));
  }
  return renderInputsHash.get(root);
}

/**
 * The share image of one locale page of a post, or `undefined` for a post with
 * no cover:
 * `ai-agent-workbench/index.de.mdx` -> `/og/blog/ai-agent-workbench/de.<hash>.jpg`.
 *
 * @param {string} mdxFile The post's `.mdx`, absolute or relative to `root`.
 * @param {string} [root] Project root; the working directory by default.
 * @returns {{ urlPath: string, hash: string, cover: string, title: string, locale: string, source: string } | undefined}
 */
export function postShareImage(mdxFile, root = cwd()) {
  const file = path.resolve(root, mdxFile);
  const source = path.relative(root, file).split(path.sep).join('/');
  const data = frontmatter(file, source);
  const cover = coverOf(file, data, source);
  if (!cover) return undefined;
  const post = path.relative(path.join(root, 'content', 'blog'), path.dirname(file)).split(path.sep).join('/');
  if (post.startsWith('..') || path.isAbsolute(post)) throw new Error(`${source}: a blog post must live under content/blog/`);
  if (typeof data.title !== 'string' || data.title.trim() === '') throw new Error(`${source}: \`title\` is not a string`);
  const locale = localeOf(file);
  const hash = createHash('sha256')
    .update(`og-render-${OG_RENDER_REVISION}\0${renderInputs(root)}\0${locale}\0${data.title}\0`)
    .update(readFileSync(cover))
    .digest('hex')
    .slice(0, 12);
  return { urlPath: `/og/blog/${post}/${locale}.${hash}.jpg`, hash, cover, title: data.title, locale, source };
}
