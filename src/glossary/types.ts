/**
 * A glossary term is authored data, not prose: one file per term per locale
 * under `content/glossary/{locale}/{slug}.ts`, mirroring the marketing-page
 * tree under `content/pages/{locale}/{slug}.ts`.
 *
 * The `definition` field carries the load. It must read correctly when an
 * answer engine lifts it with no surrounding context, so it is a single
 * self-contained sentence that names the term it defines.
 */
export interface GlossaryTerm {
  /** URL slug: /<locale>/glossary/<slug>/ — English kebab-case in every locale. */
  slug: string;
  /** Display name of the term, localized. */
  term: string;
  /** <title> and card heading — front-load the words someone would search. */
  title: string;
  /** Meta description and social summary. */
  description: string;
  /**
   * ONE sentence that survives being quoted with no surrounding context.
   * Name the term inside the sentence; never open with "It is ...".
   */
  definition: string;
  /** The longer explanation, one string per paragraph. */
  explanation: string[];
  /** Synonyms and spellings people search for instead of the headword. */
  alsoKnownAs?: string[];
  /** Slugs of other glossary terms — rendered as cross-links. */
  relatedTerms: string[];
  /** Base slugs of blog posts that use the term (untranslated ones drop out). */
  articleSlugs: string[];
  /** Marketing page slugs that use the term. */
  pageSlugs: string[];
}
