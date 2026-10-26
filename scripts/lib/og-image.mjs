// The share image of a blog post: a 1200x630 JPEG cut from its cover at build
// time, named by `og:image`, `twitter:image` and `BlogPosting.image`.
//
// Why a separate image at all: 209 posts (41 of them English) have an SVG
// cover, and X, LinkedIn, Facebook and Slack draw no card for an SVG
// `og:image`; the 80 PNG covers are 1.5-1.9 MB at 1672x941, and the share card
// crops them to 1.91:1 anyway. So every post with a cover gets one raster at
// the size the networks ask for, whatever format its cover is.
//
// Two readers, one rule. src/layouts/BlogPost.astro names the image in the
// page head; scripts/og-images.mjs renders it into dist/ after `astro build`
// and then checks that every page's head names a file it rendered, at the size
// the head declares. Both derive the URL from `ogImagePath` below, so the page
// and the file cannot be computed two ways.
//
// The URL carries a hash of the cover's bytes (and of OG_RENDER_REVISION), so
// an edited cover gets a new URL: the networks cache a share image by URL, for
// days, and a re-scrape of the post then fetches the new one.

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';
import { splitFrontmatter } from './frontmatter.mjs';

/** The share image's size: the 1.91:1 card X, LinkedIn and Facebook all lay out. */
export const OG_IMAGE = { width: 1200, height: 630 };

/**
 * Part of every share image's URL hash. Bump it when the rendering itself
 * changes (crop, fonts, encoder settings) so the networks fetch the new files.
 */
export const OG_RENDER_REVISION = '1';

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
  const split = splitFrontmatter(readFileSync(file, 'utf8'));
  if (!split.ok) throw new Error(`${mdxFile}: cannot read its frontmatter (${split.reason})`);
  const data = yaml.load(split.raw);
  const cover = data && typeof data === 'object' ? data.cover : undefined;
  if (cover === undefined || cover === null) return undefined;
  if (typeof cover !== 'string') throw new Error(`${mdxFile}: \`cover\` is not a path`);
  const coverFile = path.resolve(path.dirname(file), cover);
  if (!existsSync(coverFile)) throw new Error(`${mdxFile}: cover ${cover} does not exist`);
  return coverFile;
}

/**
 * The URL path of the share image rendered from a cover under content/blog:
 * `ai-agent-workbench/cover.png` -> `/og/blog/ai-agent-workbench/cover.<hash>.jpg`.
 *
 * @param {string} coverFile Absolute path of the cover.
 * @param {string} [root] Project root; the working directory by default.
 */
export function ogImagePath(coverFile, root = cwd()) {
  const relative = path.relative(path.join(root, 'content', 'blog'), coverFile).split(path.sep).join('/');
  if (relative.startsWith('../') || path.isAbsolute(relative)) {
    throw new Error(`${coverFile}: a blog cover must live under content/blog/`);
  }
  const hash = createHash('sha256')
    .update(readFileSync(coverFile))
    .update(`og-render-${OG_RENDER_REVISION}`)
    .digest('hex')
    .slice(0, 10);
  return `/og/blog/${relative.replace(/\.[^./]+$/, '')}.${hash}.jpg`;
}
