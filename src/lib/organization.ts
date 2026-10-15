// The one Organization node every page's JSON-LD names.
//
// `@id` lets the separate nodes that mention the company — the Organization
// itself in `Base.astro`, the `publisher` of the WebSite, of the home page's
// SoftwareApplication and of every BlogPosting — resolve to one entity
// instead of four look-alikes a consumer has to guess are the same. It is a
// fragment on the site root (`astro.config.mjs` `site`), the conventional
// shape for an entity id that is not itself a page.
//
// `sameAs` lists profiles that identify this organization and that really
// exist. Only the GitHub organization qualifies today: it is the owner of the
// public `objectstack-ai/objectstack` and `objectstack-ai/www.objectos.ai`
// repositories (GitHub reports the owner as an Organization at this URL). Do
// not add a social account here unless it is live and run by the company — a
// `sameAs` to a profile someone else holds merges two entities in every
// knowledge graph that reads it.
export const ORGANIZATION_ID = 'https://www.objectos.ai/#organization';

export const ORGANIZATION_SAME_AS: string[] = ['https://github.com/objectstack-ai'];
