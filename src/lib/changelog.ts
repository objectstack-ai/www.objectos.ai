import { s2t } from './zhconvert';
import type { Locale } from './i18n';

/**
 * The /[lang]/changelog/ page: ObjectStack's release history, read from the
 * per-release pages in objectstack-ai/objectstack `content/docs/releases/`.
 *
 * The releases are not authored here. `scripts/sync-changelog.mjs` reads them
 * from a local objectstack checkout and writes `changelog-data.ts`, which is
 * committed: the build reads that snapshot and never the network. Each
 * release carries the date its notes state (or none), up to four highlights
 * taken from its notes' own "Highlights" bullets or "New ..." headings, and
 * the URL of its full notes on objectstack.ai/docs. The script's header has
 * the rules.
 */
export interface ChangelogRelease {
  /** The page's own version, e.g. `18.3.0`; a v9-v16 page is its major's `.0.0`. */
  version: string;
  /**
   * The release date as the docs state it: `YYYY-MM-DD`, or `YYYY-MM` where
   * they give only a month. `null` when no docs page states one.
   */
  date: string | null;
  /** The docs page the date was read from, relative to the objectstack repo. */
  dateSource: string | null;
  /** In the notes' own words, inline code in backticks. English only. */
  highlights: string[];
  /** The full release notes on objectstack.ai. */
  url: string;
}

export interface ChangelogSnapshot {
  source: { repo: string; commit: string; commitDate: string };
  /** Newest first, in the order the release notes' navigation lists them. */
  releases: ChangelogRelease[];
}

export interface ChangelogCopy {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  /** Says the highlights are the notes' English text; empty in English. */
  languageNote: string;
  /** The snapshot line; `{date}` marks where the snapshot's date goes. */
  snapshot: string;
  fullNotes: string;
  undated: string;
  allNotes: string;
}

const en: ChangelogCopy = {
  title: 'Changelog · ObjectOS',
  description:
    'Every ObjectStack platform release, newest first: the date its release notes state, highlights in their own words, and a link to the full notes.',
  eyebrow: 'Release history',
  heading: 'Changelog',
  lead: 'ObjectStack is the runtime and Console every ObjectOS edition runs on, and all of its packages ship under one version number. Each release below shows the date its notes state and up to four highlights quoted from those notes; the full notes carry the breaking changes and the upgrade checklist.',
  languageNote: '',
  snapshot: 'Snapshot of the release notes as of {date}',
  fullNotes: 'Full release notes',
  undated: 'Date not stated in the notes',
  allNotes: 'All release notes',
};

const zhHans: ChangelogCopy = {
  title: '更新日志 · ObjectOS',
  description: 'ObjectStack 平台的每个版本，从新到旧：发布说明写明的日期、摘自原文的要点，以及完整说明的链接。',
  eyebrow: '发布历史',
  heading: '更新日志',
  lead: 'ObjectStack 是所有 ObjectOS 版本共同运行的运行时与控制台，它的全部包使用同一个版本号发布。下面每个版本列出其发布说明写明的日期，以及摘自该说明的最多四条要点；破坏性变更与升级清单见完整说明。',
  languageNote: '发布说明只有英文版，要点保留英文原文，未作翻译。',
  snapshot: '发布说明快照日期：{date}',
  fullNotes: '完整发布说明（英文）',
  undated: '发布说明未写明日期',
  allNotes: '全部发布说明（英文）',
};

const toHant = (copy: ChangelogCopy): ChangelogCopy =>
  Object.fromEntries(Object.entries(copy).map(([key, value]) => [key, s2t(value)])) as unknown as ChangelogCopy;

// ja/de/es/fr/ko hold the English object itself, so `sourceLocaleByIdentity`
// makes them fallbacks: noindexed, canonical to /en/changelog/, and out of
// hreflang (src/lib/fallback.ts).
export const changelogCopy: Record<Locale, ChangelogCopy> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': toHant(zhHans),
  ja: en,
  de: en,
  es: en,
  fr: en,
  ko: en,
};

/** A highlight split into text and inline-code runs, at its backticks. */
export const codeRuns = (text: string): { code: boolean; text: string }[] =>
  text
    .split('`')
    .map((part, i) => ({ code: i % 2 === 1, text: part }))
    .filter((run) => run.text);

/** A docs date (`YYYY-MM-DD` or `YYYY-MM`) for display in the page's locale. */
export const formatReleaseDate = (locale: Locale, date: string): string =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    ...(date.length > 7 ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  }).format(new Date(`${date.length > 7 ? date : `${date}-01`}T00:00:00Z`));
