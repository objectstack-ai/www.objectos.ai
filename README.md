# marketing

## Content publishing

Blog posts default to `status: published`. The writing and confirmation happen
in the conversation before the file lands here, so production builds treat
published posts as ready to index. Use `status: archived` only when a post should
be kept in the repository but removed from public blog routes and sitemaps.

Useful commands:

```sh
pnpm content:lint
pnpm content:lint --published
```

`content:lint` is deterministic and runs during `pnpm build` for published
content.

Feeds are generated at `/rss.xml` for English and `/<locale>/rss.xml` for each
localized blog.
