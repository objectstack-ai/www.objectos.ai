// The share image of one locale page of a blog post, drawn: the post's title
// in that locale, the cover's art on the cover's own ground, and the ObjectOS
// mark. scripts/og-images.mjs calls `renderShareImage` once per image, in a
// worker process whose fontconfig sees only the bundled faces
// (scripts/lib/og-fonts.mjs).
//
// ─── Why the title is drawn here, not on the cover ─────────────────────────
//
// Cover spec v2 (#430) takes the title off the cover: the page shows it in
// the heading, and a title on the cover printed it twice. A share card has no
// heading, so the share image carries it instead, in the page's own language:
// one cover serves every locale, and each locale page gets its own image.
//
// ─── Layout (1200x630) ──────────────────────────────────────────────────────
//
//   ┌──────────────────────────────────────────────┐
//   │            Title, centred, ≤ 3 lines          │  y 44 …
//   │                                              │
//   │               [ cover art ]                  │  what is left
//   │                                              │
//   │               [■] ObjectOS                   │  … y 594
//   └──────────────────────────────────────────────┘
//
// A stack, centred, not the title-left / art-right split: networks crop the
// card two ways. The 1.91:1 card is the whole image; a square crop (Facebook
// and LinkedIn thumbnails, WhatsApp, Telegram's small preview) keeps the
// centred 630x630, x 285-915. A left title column (x 64-540) loses its first
// 220px there, the start of every line. So the title is set in the centred
// 600px column (x 300-900), the mark under it, and the art takes the height
// the title leaves: a one-line title gets a large picture, a three-line one a
// smaller picture. The art may be wider than the square; a crop only trims
// its sides.
//
// The title takes the largest size from 60 down to 40 at which it fits three
// lines. A title that does not fit three lines at 40 is cut at the last whole
// word (a phrase, in Chinese and Japanese) that leaves room for "…". Chinese
// and Japanese break only between the phrases of scripts/lib/cjk-phrases.mjs,
// the rule the post heading uses, and Korean only at spaces: a word joiner
// (U+2060) sits between the characters of a phrase or word, so Pango finds no
// break inside it.
//
// ─── Ground and art ─────────────────────────────────────────────────────────
//
// The ground is the cover's own background, read off its edge: a v2 cover is
// art on its topic tint (the first full-canvas rect), so its edge is one
// colour. The art is then cut out of that ground (sharp's `trim`) and set on
// the same colour, so it floats with no box around it.
//
// A cover whose edge is not one colour (a gradient, or a raster illustration)
// cannot be cut out that way. It is set whole, as a card with rounded corners,
// on the mean colour of its edge.
//
// Covers drawn before spec v2 still carry a title. They get this same image,
// not the old cover-only crop: one renderer and one URL rule for every post,
// every locale page shows its own title (a translated page used to show the
// English cover's), and a cover redrawn without its title later changes
// nothing here. Their own title stays in the art, a small picture of the
// cover under the page's title.
//
// Either way the title and the wordmark are ink (#151a17) or paper (#fffffb),
// whichever contrasts more with the ground, and the ground is moved toward
// white or black until that contrast is at least 7:1 (WCAG AAA for text).

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cjkPhrases, phraseLanguage } from './cjk-phrases.mjs';
import { contrast } from './cover-colors.mjs';
import { titleFont } from './og-fonts.mjs';
import { OG_IMAGE } from './og-image.mjs';

const { width: W, height: H } = OG_IMAGE;
const INK = { r: 0x15, g: 0x1a, b: 0x17 };
const PAPER = { r: 0xff, g: 0xff, b: 0xfb };
const MIN_CONTRAST = 7;

/** The title column: the centred square's width less 15px each side. */
const TITLE = { width: 600, sizes: [60, 56, 52, 48, 44, 40], maxLines: 3 };
const LINE_HEIGHT = 1.2;
const TOP = 44;
const BOTTOM = 36;
const GAP = 30;
/** The widest the art is drawn: wider than the square, whose crop trims it. */
const ART_MAX_WIDTH = 880;
const BRAND = { mark: 36, size: 28, gap: 12, name: 'ObjectOS' };
/** A card cover's corner radius, in output pixels. */
const CARD_RADIUS = 18;

const WORD_JOINER = '⁠';
const ELLIPSIS = '…';

const hex = ({ r, g, b }) => `#${[r, g, b].map((n) => Math.round(n).toString(16).padStart(2, '0')).join('')}`;
const escapeMarkup = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── Title ──────────────────────────────────────────────────────────────────

/**
 * The title cut into the units a line may end between, each with word joiners
 * between its characters: phrases in Chinese and Japanese, words elsewhere.
 * Spaces stay at the end of the unit before them.
 *
 * @param {string} title
 * @param {string} locale
 */
export function titleUnits(title, locale) {
  const units = phraseLanguage(locale) ? cjkPhrases(title, locale) : title.split(/(?<=\s)/u);
  // Inside a unit no break: a phrase stays whole, and so does a Korean word
  // (Hangul allows a break between any two syllables otherwise).
  const glue = phraseLanguage(locale) || locale === 'ko';
  return units.map((unit) => {
    if (!glue) return unit;
    const body = unit.trimEnd();
    return [...body].join(WORD_JOINER) + unit.slice(body.length);
  });
}

/**
 * A text input for sharp: Pango markup, wrapped at `TITLE.width`.
 * `spacing` is extra space between lines, in pixels.
 */
const textInput = (markup, font, { spacing = 0, align = 'centre', rgba = true } = {}) => ({
  text: { text: markup, font, width: TITLE.width, dpi: 72, wrap: 'word-char', align, spacing, rgba },
});

/**
 * How many lines Pango wraps `text` into. Rendered with 1000px between lines,
 * so the height is about 1000 per line whatever the glyphs' own extents.
 */
async function lineCount(sharp, text, font) {
  const { height } = await sharp(textInput(escapeMarkup(text), font, { spacing: 1000, rgba: false })).metadata();
  return Math.floor(height / 1000) + 1;
}

/**
 * Pick the size and the text (whole, or cut with an ellipsis) the title is set
 * in, and render it.
 *
 * @returns {Promise<{ data: Buffer, width: number, height: number, size: number, text: string, cut: boolean }>}
 */
async function setTitle(sharp, title, locale, color) {
  const units = titleUnits(title.trim(), locale);
  const whole = units.join('');
  let size;
  let text = whole;
  for (const candidate of TITLE.sizes) {
    if ((await lineCount(sharp, whole, titleFont(locale, candidate))) <= TITLE.maxLines) {
      size = candidate;
      break;
    }
  }
  const cut = size === undefined;
  if (cut) {
    size = TITLE.sizes.at(-1);
    const font = titleFont(locale, size);
    const prefix = (n) =>
      units
        .slice(0, n)
        .join('')
        .replace(/[\s⁠,.;:!?，、。；：！？·・—–-]+$/u, '') + ELLIPSIS;
    // The longest prefix of whole units that fits, by bisection: fits(lo) holds,
    // fits(hi) does not.
    let lo = 0;
    let hi = units.length;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if ((await lineCount(sharp, prefix(mid), font)) <= TITLE.maxLines) lo = mid;
      else hi = mid;
    }
    if (lo === 0) throw new Error(`share image: not even the first word of "${title}" fits ${TITLE.maxLines} lines`);
    text = prefix(lo);
  }
  // One line pitch for every face: 1.2 of the size, in Pango units (an
  // absolute `line_height`). The faces' own leading differs (Noto Sans SC's is
  // 1.45, Arimo's 1.15), and a Chinese title would otherwise stand looser
  // than an English one.
  const pitch = Math.round(size * LINE_HEIGHT * 1024);
  const markup = `<span foreground="${hex(color)}" line_height="${pitch}">${escapeMarkup(text)}</span>`;
  const { data, info } = await sharp(textInput(markup, titleFont(locale, size))).png().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, size, text: text.replaceAll(WORD_JOINER, ''), cut };
}

// ─── Brand ──────────────────────────────────────────────────────────────────

/** The ObjectOS mark (public/logo.svg) and the wordmark beside it. */
async function setBrand(sharp, root, color) {
  const logo = readFileSync(path.join(root, 'public', 'logo.svg'));
  const { width: logoWidth } = await sharp(logo).metadata();
  const mark = await sharp(logo, { density: (72 * BRAND.mark) / logoWidth }).resize(BRAND.mark, BRAND.mark).png().toBuffer();
  // The name is rendered alone, so its box is its ink: "ObjectOS" from the cap
  // height to the descender of the j. The cap height is centred on the mark.
  const name = await sharp({
    text: { text: `<span foreground="${hex(color)}">${BRAND.name}</span>`, font: titleFont('en', BRAND.size), dpi: 72, rgba: true },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  const capHeight = Math.round(BRAND.size * 0.716); // Arimo / Arial cap height, 0.716 em
  const width = BRAND.mark + BRAND.gap + name.info.width;
  const height = Math.max(BRAND.mark, Math.round((BRAND.mark - capHeight) / 2) + name.info.height);
  const data = await sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: mark, left: 0, top: 0 },
      { input: name.data, left: BRAND.mark + BRAND.gap, top: Math.round((BRAND.mark - capHeight) / 2) },
    ])
    .png()
    .toBuffer();
  return { data, width, height, markHeight: BRAND.mark };
}

// ─── Cover art ──────────────────────────────────────────────────────────────

/**
 * The cover drawn at 1200px wide (a raster cover as it is), and what its edge
 * says about the ground.
 */
async function readCover(sharp, cover) {
  let image;
  if (cover.endsWith('.svg')) {
    const { width } = await sharp(cover).metadata();
    image = sharp(cover, { density: (72 * 1200) / width });
  } else {
    image = sharp(cover);
  }
  const { data, info } = await image
    .flatten({ background: '#ffffff' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // The outer 4px ring.
  const ring = 4;
  const sum = [0, 0, 0];
  let n = 0;
  const samples = [];
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (y >= ring && y < info.height - ring && x >= ring && x < info.width - ring) continue;
      const i = (y * info.width + x) * 3;
      samples.push(i);
      for (let c = 0; c < 3; c++) sum[c] += data[i + c];
      n++;
    }
  }
  const mean = { r: sum[0] / n, g: sum[1] / n, b: sum[2] / n };
  let spread = 0;
  for (const i of samples) {
    spread = Math.max(spread, Math.abs(data[i] - mean.r), Math.abs(data[i + 1] - mean.g), Math.abs(data[i + 2] - mean.b));
  }
  return { data, info, ground: mean, uniform: spread <= 6 };
}

/**
 * The art to place: cut out of a one-colour ground, or the whole cover as a
 * card.
 */
async function prepareArt(sharp, cover) {
  const read = await readCover(sharp, cover);
  const raw = { raw: { width: read.info.width, height: read.info.height, channels: 3 } };
  if (read.uniform) {
    const { data, info } = await sharp(read.data, raw)
      .trim({ background: hex(read.ground), threshold: 10 })
      .png()
      .toBuffer({ resolveWithObject: true });
    return { data, width: info.width, height: info.height, ground: read.ground, card: false };
  }
  const data = await sharp(read.data, raw).png().toBuffer();
  return { data, width: read.info.width, height: read.info.height, ground: read.ground, card: true };
}

/** A ground the title colour reads on at `MIN_CONTRAST`, and that colour. */
function settleColors(ground) {
  const color = contrast(INK, ground) >= contrast(PAPER, ground) ? INK : PAPER;
  const toward = color === INK ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 };
  let settled = ground;
  for (let t = 0.05; contrast(color, settled) < MIN_CONTRAST && t <= 1; t += 0.05) {
    settled = {
      r: ground.r + (toward.r - ground.r) * t,
      g: ground.g + (toward.g - ground.g) * t,
      b: ground.b + (toward.b - ground.b) * t,
    };
  }
  const round = ({ r, g, b }) => ({ r: Math.round(r), g: Math.round(g), b: Math.round(b) });
  return { ground: round(settled), color };
}

// ─── The image ──────────────────────────────────────────────────────────────

/** @type {{ cover: string, art: Awaited<ReturnType<typeof prepareArt>> } | undefined} */
let lastArt;
/** The brand row in each colour it has been drawn in. */
const brands = new Map();

/**
 * Draw one share image and write it as a JPEG.
 *
 * @param {import('sharp')} sharp
 * @param {{ cover: string, title: string, locale: string, out: string, root: string }} job
 * @returns {Promise<{ bytes: number, size: number, cut: boolean, card: boolean }>}
 */
export async function renderShareImage(sharp, { cover, title, locale, out, root }) {
  // The locales of a post share a cover, and scripts/og-images.mjs hands a
  // worker a post's images one after another: the art is prepared once.
  if (lastArt?.cover !== cover) lastArt = { cover, art: await prepareArt(sharp, cover) };
  const { art } = lastArt;
  const { ground, color } = settleColors(art.ground);
  const titleImage = await setTitle(sharp, title, locale, color);
  const brandKey = `${root}\0${hex(color)}`;
  if (!brands.has(brandKey)) brands.set(brandKey, await setBrand(sharp, root, color));
  const brand = brands.get(brandKey);

  const titleTop = TOP;
  const brandTop = H - BOTTOM - brand.height;
  const artTop = titleTop + titleImage.height + GAP;
  const artBottom = brandTop - GAP;
  const scale = Math.min(ART_MAX_WIDTH / art.width, (artBottom - artTop) / art.height);
  const artWidth = Math.round(art.width * scale);
  const artHeight = Math.round(art.height * scale);
  let artData = await sharp(art.data).resize(artWidth, artHeight, { kernel: 'lanczos3' }).png().toBuffer();
  if (art.card) {
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${artWidth}" height="${artHeight}"><rect width="${artWidth}" height="${artHeight}" rx="${CARD_RADIUS}"/></svg>`
    );
    artData = await sharp(artData).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  }

  const centre = (w) => Math.round((W - w) / 2);
  const info = await sharp({ create: { width: W, height: H, channels: 3, background: ground } })
    .composite([
      { input: artData, left: centre(artWidth), top: Math.round(artTop + (artBottom - artTop - artHeight) / 2) },
      { input: titleImage.data, left: centre(titleImage.width), top: titleTop },
      { input: brand.data, left: centre(brand.width), top: brandTop },
    ])
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(out);
  return { bytes: info.size, size: titleImage.size, cut: titleImage.cut, card: art.card };
}
