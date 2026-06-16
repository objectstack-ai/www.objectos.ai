# Agent Instructions

## Positioning — read this first

- **AI is the first reader.** Today developers rarely hand-write code; an AI coding agent writes it, steered by a human. So every article and doc has two consumers: the **human who chooses and reviews**, and the **AI that writes**. Write for both.
- **Product framing.** ObjectStack is the **target format and runtime for AI-written enterprise software** — a substrate an agent can generate, a human can review as a small diff, and the runtime keeps inside permissions, approval, and audit. Don't position it as "a faster way for humans to build."
- **The wedge is trust, not speed.** Anyone can generate an app now (vibe coding); the bottleneck moved to reviewing, governing, and trusting what the AI wrote. Lead with "AI wrote it — can you review it and sign off?", not "build faster."
- **One sentence:** everyone can make AI generate an app; ObjectStack is where AI-generated software lands and *stays governable* — AI writes it, the human reviews a small diff, the runtime enforces permissions and audit.

## Audience

- Each post declares one audience in frontmatter (`business | it | developer | general`) for the site's taxonomy. The dual-consumer rule above applies regardless of that tag.
- **Human = chooser + reviewer + accountable owner.** Persuade them: why point your agent at ObjectStack, and how the result stays reviewable.
- **Agent = the writer.** Be the most open, complete, consistently-named, retrievable source so models learn ObjectStack and agents generate it correctly (the open-protocol flywheel: open + documented + discussed → learned by models → chosen by agents).
- `developer` content is no longer "how a human hand-writes ObjectStack." It is "how your agent writes ObjectStack correctly, and how you review the diff."

## Writing rules — one article should…

1. **Mint one ownable concept + back it with one number.** Coin a memorable, linkable term (e.g. "comprehension debt", "tax on success", "definition layer vs runtime layer", "the four layers") and ground it in a concrete figure. Named ideas get re-quoted — that is free distribution.
2. **Write the title as a query, not a clever line** — especially in English. Front-load the words a person or a model would actually search.
3. **Answer in the first 100 words.** Put the thesis and the payoff up top (a one-line TL;DR helps). A story may follow, but the extractable claim must come early — humans skim and LLMs extract the top.
4. **Be extractable.** Use standalone claim sentences, data with attribution, and tables / definitions / lists — these are what models lift verbatim and what answer engines cite.
5. **Earn the share with a concrete artifact**: runnable code, a number you computed, a diagram, a before/after, a checklist. Opinion alone does not travel.
6. **Pass the no-marketing test.** The piece must be valuable even if ObjectStack did not exist. Product appears as proof or at the end — never as the point. Technical audiences and dev communities punish ads.
7. **Be intellectually honest.** Steelman the opposing view, and state plainly what ObjectStack does *not* solve. Self-limiting earns trust with the people who decide.
8. **CTA = "point your agent at ObjectStack"** (rule file / MCP / the spec), not only "you run `os start`". The self-serve actor may be an agent, not a person.
9. **Don't ship a template.** When publishing several pieces together, vary openings, structure, proof artifacts, and reused analogies/snippets so the set doesn't read as mass-produced.

## Distribution & format

- **Optimize for GEO and the training corpus first, human SEO second.** Open license (Apache 2.0), public and indexable, complete and consistently named, with many examples — so models learn ObjectStack and agents pick it. Being correctly generatable by an AI decides adoption; the blog is the upper funnel.
- **Keep machine-facing surfaces first-class:** `/llms.txt`, `/rss.xml`, canonical URLs, structured data. Treat `llms.txt` as a curated map for LLM retrieval, not an afterthought.
- **Repurpose each long-form into atomic units** (a social thread, a syndicated copy with `canonical_url` pointing back, a README snippet, the RSS push). With no sales team, content does the distribution work.
- **Localize for reach.** Long-tail search and model coverage in ja/ko/de/es/fr is cheap reach that English-only competitors miss. `zh-Hant` is generated from `zh-Hans` (see Localization); the other languages are authored translations.

## Blog Content

- Blog covers are rendered automatically by `src/layouts/BlogPost.astro` from the frontmatter `cover` field.
- Do not insert the same cover image again in the MDX body. In other words, if frontmatter has `cover: ./cover.png`, `cover: ./cover.jpg`, or `cover: ./cover.svg`, the article body must not contain `![...](./cover.png)`, `![...](./cover.jpg)`, or `![...](./cover.svg)`.
- Body images should add information that the cover does not already provide: architecture diagrams, workflow diagrams, object models, screenshots, or examples that support a specific section.
- Do not repeat the same body image in one article unless the user explicitly asks for repetition.
- Translated locales reuse one English-text cover/diagram (`cover-en.svg`, `*-en.svg`); only the `zh-Hans`/`zh-Hant` pair uses the Chinese-text assets. Keep `title`/`description`/`tags` translated; keep `topic`/`audience`/`date`/`status` unchanged. Keep `description` ≤ 230 characters (one punchy sentence) so it reads cleanly in cards and search snippets.
- When adding or editing published articles, run `pnpm content:lint`, `pnpm check`, and `pnpm build`.
- For visual/content changes, verify at least one affected article and the blog list in the in-app browser. Check ordering, cover rendering, body image duplication, and obvious layout issues.

## Localization

- `zh-Hant` content is generated from `zh-Hans` with `pnpm gen:zh-hant`; do not hand-edit generated Traditional Chinese files unless the user explicitly asks for manual localization.
- When changing Simplified Chinese posts, regenerate Traditional Chinese before building.
