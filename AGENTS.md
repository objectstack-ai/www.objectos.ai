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

## Publishing cadence

**Target: two posts per week. Never more than one post going live in a day.**

Measured justification — an audit of the English corpus at `676ef13` found 38 posts
spread across nine dates:

| Date | Posts |
|:--|--:|
| 2026-06-05 | 14 |
| 2026-06-16 | 9 |
| 2026-06-24 | 5 |
| 2026-06-03 / 06-04 | 3 each |
| 05-30 · 06-12 · 07-22 · 07-23 | 1 each |

28 of 38 posts landed on three days, and then the site published nothing for 33 days.
That shape costs on four counts: fourteen structurally similar posts in one day is the
pattern Google's scaled-content-abuse policy describes (and writing rule 9 above
forbids it independently); crawl frequency follows observed publishing rhythm, so a
dump-then-silence site gets crawled like a dead one; publishing 14 posts at once makes
any ranking movement unattributable to any topic; and posts published simultaneously
cannot link to each other, so internal links never compound.

- **Two slots a week** (e.g. Tuesday and Thursday), one post per slot.
- **An agent's `date` is its planned slot.** A post an agent writes carries the slot date
  it will occupy, never stacks onto a day another post holds, and merges on that day.
- **Merge time is publish time.** The site is a static build deployed on push to `main`
  (`.github/workflows/cloudflare-pages.yml`), so a merged post is live within one CI
  run. Cadence is therefore enforced **at the merge**: write and review a post whenever
  it is ready, approve it, and merge it on its slot day. Do not batch-merge a backlog.
  A stand-down or a "merge everything" instruction does not override the cadence — the
  seat raises the conflict instead of merging through it, which is how the #128 cluster
  happened.
- **A queue of approved posts is the healthy state**, not a backlog to flush. Several
  finished posts waiting is a reason to keep the cadence, not to spend it in one day.
- **Forward-only.** Never rewrite the `date` of an already-published post to simulate a
  drip. Those posts really were published then; changing `date` falsifies the record,
  breaks any external reference, and fixes nothing — the crawl history already happened.
  The one exception is not an author's or the seat's call: rewriting `date` takes a
  maintainer ruling recorded on the card (precedent: #128, 2026-09-02 — a cluster of six
  posts that all landed on one day, spread backward by maintainer instruction).

### `date` vs `updated` — two different facts

`date` is the **first-publication** date and is immutable. `updated` (optional) records a
later substantive revision.

- Refreshing a published article sets `updated`. It never touches `date`.
- `updated` must be **≥** `date`. Both the collection schema (`src/content.config.ts`)
  and `pnpm content:lint` reject a violation as a **blocking error**, not a warning.
- What `updated` changes: it renders as a separate "Updated …" line on the article, and
  becomes `dateModified` in the BlogPosting JSON-LD (with `date` as `datePublished`),
  `article:modified_time`, and `<atom:updated>` on the RSS item. A post with no `updated`
  still emits `dateModified` — equal to `datePublished`, which is what schema.org means
  by a document that has never been revised.
- **Sort order and RSS `pubDate` deliberately stay on `date`.** A revision must not
  reorder the blog or re-notify every feed subscriber; "recently revised" is not
  "recently published". The channel's `lastBuildDate` does account for revisions, since
  that element means "when the channel's content last changed".
- Set `updated` for a **substantive** revision — new sections, corrected claims,
  refreshed numbers. Not for a typo fix.

### Scheduled publishing — considered and deferred (2026-08-25)

`status` stays `published | archived`. A `scheduled` status (or a `publish_at` date the
build filters on) was considered and **deliberately not implemented**, for one
disqualifying reason:

**Nothing would ever publish it.** The deploy workflow runs only on `push` to `main`, on
`pull_request`, and on manual `workflow_dispatch`. There is no scheduled rebuild. A
build-time filter on a future date would hold a post until the next *unrelated* push to
`main` — a day later, a week later, or never. That is precisely the "silently invisible
forever" failure a scheduled state exists to prevent, and shipping the filter without
the rebuild would be worse than not having it: authors would mark posts scheduled, merge
them, and watch nothing happen.

Doing it properly is three coupled parts, not one field:

1. a `schedule:` cron in the deploy workflow (a daily rebuild, and the deploy cost that
   comes with it);
2. the filter itself — schema, `content-lint`, `STATUS_COLOR`, the `noindex` rule, and
   the `status` strings in all eight locales; and
3. **a report of what is being held.** A scheduled post must be listed by
   `pnpm content:lint` with its release date, so a post that never goes live fails a
   gate instead of living only in someone's memory.

At two posts a week, holding a merge for a day or two is not a real cost, and the queue
is already visible as open PRs. Revisit when the cadence is actually running and
merge-day scheduling is measurably in the way; land part 1 before part 2.

## Working in this repo with agents

- **At most five agent worktrees run concurrently on this repo** (maintainer, 2026-09-02).
- **Browser-verify every content or visual PR before it merges** at 1366×625, 1440×750,
  1512×830, 1920×945, 390×844 and 360×800; scroll lazy images into view before judging and
  **look at** the screenshots. Render each new SVG at native size — a `fill` presentation
  attribute loses to a stylesheet class, so dark-on-dark text passes every gate.
- **A visual defect is work, not a note** (maintainer, 2026-08-26).
- **Merge time is publish time.** Never batch-merge posts; `date` is rewritten only by an
  explicit maintainer ruling recorded on the card.

## Localization

- `zh-Hant` content is generated from `zh-Hans` with `pnpm gen:zh-hant`; do not hand-edit generated Traditional Chinese files unless the user explicitly asks for manual localization.
- When changing Simplified Chinese posts, regenerate Traditional Chinese before building.
