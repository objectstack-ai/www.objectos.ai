// The dark variant of a post's SVG cover, for the templates that draw covers
// (ArticleCard, the BlogPost hero, the home and cluster article cards).
//
// scripts/cover-dark.mjs writes `cover*.dark.svg` beside every light SVG
// cover before `astro build` (and `pnpm dev`); this module imports them all,
// so each one is emitted as a hashed asset like the light cover. A cover with
// no variant (a raster cover, one whose ground is already dark, or a dev
// server started with `astro dev` alone) gets `undefined`, and the template
// draws the one image as before.
//
// How the templates use it: both images are rendered with loading="lazy"
// and the pair carries the classes `cover-light` / `cover-dark`; each
// template's CSS hides the one that does not match `:root[data-theme]`. A
// lazy image that is display:none never reaches the viewport, so the browser
// never fetches it: one cover is downloaded per theme. The theme attribute is
// set before first paint from the saved choice or prefers-color-scheme
// (src/layouts/Base.astro), so it covers both.
import path from 'node:path';
import { postCoverFile } from '../../scripts/lib/og-image.mjs';

const DARK = import.meta.glob<ImageMetadata>('/content/blog/**/*.dark.svg', { eager: true, import: 'default' });

/** The dark variant of the cover named by the post at `filePath`, if one was generated. */
export function darkCover(filePath: string | undefined, cover: ImageMetadata | undefined): ImageMetadata | undefined {
  if (!filePath || cover?.format !== 'svg') return undefined;
  const light = postCoverFile(filePath);
  if (!light) return undefined;
  const key = `/${path.relative(process.cwd(), light).split(path.sep).join('/')}`.replace(/\.svg$/, '.dark.svg');
  return DARK[key];
}
