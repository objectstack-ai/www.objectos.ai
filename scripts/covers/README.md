# Cover kit

Blog covers under cover spec v2 (#430) are assembled from parts, not drawn by
hand. The rules and the six approved samples are on the style page,
[docs/cover-style.md](../../docs/cover-style.md); the gate is
`scripts/cover-spec.mjs`, which runs in `pnpm build`.

| File | What it is |
|:--|:--|
| `parts.mjs` | The parts library: palette `C`, topic `GROUNDS`, primitives (`line`, `arrow`, `fill`, `box`, `ring`, `dot`, `bars`), the hero parts (`tile`, `offsetTint`, `door`, `layerBand`), figures (`person`, `agent`, `face`, `cylinder`, `wall`), status (`stopBar`, `slotChevron`), the one optional `label`, and `svg()`, which wraps parts on the topic's ground. |
| `cover.mjs` | The CLI: renders a spec into a post's `cover.svg` and checks it against the gate. |
| `specs/SLUG.mjs` | One spec per post, named after its slug. The first six are the approved samples; `cover.mjs` reproduces their covers byte for byte. |

## Make a cover

1. Write `scripts/covers/specs/SLUG.mjs`, starting from the sample closest to
   your mechanism:

   ```js
   // One line: the mechanism, and which shape is the hero.
   export const aria = 'A person and an AI agent open the same record; each opening adds a row to a green audit log.';
   export default ({ C, person, agent, box, arrow, tile }) => [
     person(282, 132, { s: 0.92, withFace: true }),
     agent(918, 140, { s: 0.92, withFace: true }),
     box(498, 104, 204, 196, C.ink, 44),
     arrow('M600 320V350'),
     tile(190, 380, 820, 180, { color: C.green, tint: C.greenTint, deg: -2 }),
   ];
   ```

   The default export receives every export of `parts.mjs` and returns a list
   of parts, painted in order. The topic, and so the ground, comes from the
   post's frontmatter; export `topic` only to render outside a post folder.
   `aria` is one short, neutral English sentence: the page sets the post's
   localized title as the image's alt text, so nothing reads the aria-label
   as a title.

2. Render it into the post:

   ```sh
   node scripts/covers/cover.mjs scripts/covers/specs/SLUG.mjs
   ```

   This writes `content/blog/SLUG/cover.svg`, the one cover every locale uses
   (`cover: ./cover.svg` in every `index*.mdx`; no `cover-en.svg`), and prints
   any gate finding. Exit 1 means a finding.

3. Look at it at native size and at card size (about 344px wide), light and
   dark (`pnpm cover:dark` writes the dark variant). The gate cannot see
   overlapping strokes or an off-centre art box; the checklist on the style
   page can.

Commit the spec with the post, so the cover can be regenerated.

## Other modes

```sh
node scripts/covers/cover.mjs SPEC.mjs --out /tmp/draft.svg   # render anywhere (needs `topic` in the spec)
node scripts/covers/cover.mjs --all --out-dir /tmp/covers     # every spec, e.g. to compare after a parts change
node scripts/cover-spec.mjs content/blog/SLUG/cover.svg       # the gate alone, on named files
```

A small PNG for review:

```sh
node -e "require('sharp')('/tmp/draft.svg',{density:144}).resize({width:480}).png().toFile('/tmp/draft.png')"
```

## Changing a part

A part change re-renders every cover that uses it the next time its spec is
run. Render `--all` into a scratch folder before and after, and compare: the
six samples must stay byte-identical unless the change is meant to redraw
them.
