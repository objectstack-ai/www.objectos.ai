// The one place an MDX file's YAML frontmatter fence is split off its body.
//
// Two readers need this split and each used to carry its own copy of it:
//
//   * `scripts/content-lint.mjs` — the publishing gate, which parses every
//     `.mdx` under `content/` and reports what it finds against its own file
//     list.
//   * `scripts/lib/post-dates.mjs` — the blog's URL -> `lastmod` map, read by
//     `astro.config.mjs` (before Astro exists, so the content collection API is
//     not available) and by `scripts/seo-smoke.mjs`.
//
// The copies were identical, which is exactly why they were dangerous: the
// frontmatter fence is the kind of parsing detail where a divergence is silent.
// One script starts accepting a file the other rejects, and no gate can see the
// disagreement — both are green about different trees.
//
// ─── Why this reports instead of throwing ──────────────────────────────────
//
// The split is shared; the *wording* deliberately is not. `content-lint.mjs`
// collects a message per file into a report whose format four gates and a
// `--dist` mode read, so its strings are part of its output contract.
// `post-dates.mjs` throws instead, because a bad frontmatter there fails a build
// that cannot produce a correct sitemap. Neither wording can move to the other.
//
// So this helper answers *what* went wrong and never throws, and each caller
// keeps saying it its own way. That is the split that can be shared without
// making one caller's error text a hidden dependency of the other's.
//
// ─── What it deliberately does not do ──────────────────────────────────────
//
// No YAML parsing, no trimming, no normalization — it returns the two raw
// slices and nothing else. `content-lint.mjs` trims the body it renders word
// counts from; `post-dates.mjs` hands `raw` to `js-yaml` and rejects a
// non-mapping result. Those are caller policies, and folding either one in here
// would change the other caller's behaviour.
//
// Two other scripts split a frontmatter fence with a *different*, deliberately
// weaker parser and are NOT consolidated here — see the note at the bottom of
// this file.

/**
 * @typedef {object} FrontmatterSplit
 * @property {true} ok
 * @property {string} raw The YAML between the fences, fences excluded.
 * @property {string} body Everything after the closing fence, verbatim.
 *
 * @typedef {object} FrontmatterFailure
 * @property {false} ok
 * @property {'no-opening-fence' | 'no-closing-fence'} reason
 */

/**
 * Split an MDX source into its YAML frontmatter block and its body.
 *
 * A source must open with a `---` fence on its own first line and close with a
 * line beginning `---`. Both conditions are strict on purpose: a file with a
 * BOM or CRLF line endings does not open with `---\n` and is rejected rather
 * than silently half-parsed.
 *
 * @param {string} source Raw `.mdx` file contents.
 * @returns {FrontmatterSplit | FrontmatterFailure}
 */
export function splitFrontmatter(source) {
  if (!source.startsWith('---\n')) {
    return { ok: false, reason: 'no-opening-fence' };
  }
  const end = source.indexOf('\n---', 4);
  if (end === -1) {
    return { ok: false, reason: 'no-closing-fence' };
  }
  return { ok: true, raw: source.slice(4, end), body: source.slice(end + 4) };
}

// ─── The two splitters that stayed where they are ──────────────────────────
//
// `scripts/gen-zh-hant.mjs` and `scripts/lib/wechat-html.mjs` also split a
// frontmatter fence, and both do it differently on purpose:
//
//   * both match `/^---\n[\s\S]*?\n---\n/` and fall back to "no frontmatter,
//     all body" instead of failing, because neither is a gate — the generator
//     must still rewrite a body it cannot read a head from, and the WeChat
//     exporter must still produce HTML;
//   * `wechat-html.mjs` does not use `js-yaml` at all, reading single-line
//     scalars with a regex because it only ever wants `title`/`description`/
//     `author`.
//
// Routing either through this helper would change behaviour — a tolerated file
// would start failing — which is a different change with its own acceptance,
// not a consolidation. They are recorded here so the next reader finds the
// difference documented instead of discovering it.
