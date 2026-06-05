# Agent Instructions

## Blog Content

- Blog covers are rendered automatically by `src/layouts/BlogPost.astro` from the frontmatter `cover` field.
- Do not insert the same cover image again in the MDX body. In other words, if frontmatter has `cover: ./cover.png`, `cover: ./cover.jpg`, or `cover: ./cover.svg`, the article body must not contain `![...](./cover.png)`, `![...](./cover.jpg)`, or `![...](./cover.svg)`.
- Body images should add information that the cover does not already provide: architecture diagrams, workflow diagrams, object models, screenshots, or examples that support a specific section.
- Do not repeat the same body image in one article unless the user explicitly asks for repetition.
- When adding or editing published articles, run `pnpm content:lint`, `pnpm check`, and `pnpm build`.
- For visual/content changes, verify at least one affected article and the blog list in the in-app browser. Check ordering, cover rendering, body image duplication, and obvious layout issues.

## Localization

- `zh-Hant` content is generated from `zh-Hans` with `pnpm gen:zh-hant`; do not hand-edit generated Traditional Chinese files unless the user explicitly asks for manual localization.
- When changing Simplified Chinese posts, regenerate Traditional Chinese before building.
