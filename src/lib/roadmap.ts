import { s2t } from './zhconvert';
import type { Locale } from './i18n';
import roadmapData from './roadmap-data.json';

/**
 * The /[lang]/roadmap/ page: the ObjectOS Enterprise roadmap, in the wording
 * the maintainer approved for publication.
 *
 * The roadmap is not authored here. Its single source is `ROADMAP.md` in the
 * private objectstack-ai/cloud repository; only rows the maintainer marks
 * External = yes may appear on a public surface, and only in their External
 * wording (cloud#3835 item 4, cloud#3887). The site never reads that
 * repository: `scripts/roadmap-export.mjs` there writes `roadmap-data.json`,
 * and the file is committed here unchanged, so the build reads a snapshot and
 * never the network. To change the page, change the table in cloud, re-run the
 * export into this file, and land it in a PR. ⛔ Do not edit
 * `roadmap-data.json` by hand: the next export overwrites it, and a hand edit
 * is wording the maintainer never approved.
 *
 * Each item has a bucket (now = shipped, next = in development, later =
 * planned), the table's tier, and its wording in English and Simplified
 * Chinese. The page does not show the tier: tiers 1 and 2 are quarters, and a
 * quarter on a public page reads as a date promise the roadmap does not make.
 * Traditional Chinese is derived from the Simplified wording with `s2t`, like
 * every other zh-Hant string on the site.
 */
export type RoadmapBucket = 'now' | 'next' | 'later';

export const ROADMAP_BUCKETS: readonly RoadmapBucket[] = ['now', 'next', 'later'];

export interface RoadmapItem {
  bucket: RoadmapBucket;
  tier: number | null;
  wording: { en: string; 'zh-Hans': string };
}

export interface RoadmapSnapshot {
  schema: 1;
  items: RoadmapItem[];
}

/**
 * The committed export, checked when the module loads: a file of another
 * schema, an unknown bucket or an empty wording fails the build instead of
 * rendering a wrong page. The export already refuses these; this guards a
 * hand edit or a future schema the page does not know.
 */
function checked(data: unknown): RoadmapSnapshot {
  const fail = (why: string): never => {
    throw new Error(`src/lib/roadmap-data.json: ${why} (re-run the export in objectstack-ai/cloud)`);
  };
  const snapshot = data as Partial<RoadmapSnapshot>;
  if (snapshot?.schema !== 1) fail(`schema ${JSON.stringify(snapshot?.schema)} is not 1`);
  if (!Array.isArray(snapshot.items)) fail('items is not an array');
  snapshot.items!.forEach((item, i) => {
    const keys = Object.keys(item ?? {}).sort().join(',');
    if (keys !== 'bucket,tier,wording') fail(`item ${i} has keys ${keys}, not bucket, tier, wording`);
    if (!ROADMAP_BUCKETS.includes(item.bucket)) fail(`item ${i} has bucket ${JSON.stringify(item.bucket)}`);
    if (item.tier !== null && !Number.isInteger(item.tier)) fail(`item ${i} has tier ${JSON.stringify(item.tier)}`);
    const wordingKeys = Object.keys(item.wording ?? {}).sort().join(',');
    if (wordingKeys !== 'en,zh-Hans') fail(`item ${i} wording has keys ${wordingKeys}, not en, zh-Hans`);
    if (!item.wording.en.trim() || !item.wording['zh-Hans'].trim()) fail(`item ${i} has an empty wording`);
  });
  return snapshot as RoadmapSnapshot;
}

export const roadmapSnapshot: RoadmapSnapshot = checked(roadmapData);

export interface RoadmapBucketCopy {
  heading: string;
  /** What the bucket means for a reader: whether its items can be used today. */
  note: string;
  /** A short status shown on each item of the bucket. */
  status: string;
}

export interface RoadmapCopy {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  buckets: Record<RoadmapBucket, RoadmapBucketCopy>;
  /** The whole roadmap has no published item. */
  empty: string;
  /** One bucket has no published item. */
  bucketEmpty: string;
}

const en: RoadmapCopy = {
  title: 'Roadmap · ObjectOS Enterprise',
  description:
    'The ObjectOS Enterprise roadmap: what ships now, what is in development next, and what is planned later, in the wording approved for publication.',
  eyebrow: 'ObjectOS Enterprise',
  heading: 'Roadmap',
  lead: 'Now is what ships today. Next is in development and not available yet. Later is planned. An item appears here only once its wording is approved for publication, and nothing under Next or Later is promised until it ships.',
  buckets: {
    now: {
      heading: 'Now',
      note: 'Shipped and available. A preview is labelled as one.',
      status: 'Available',
    },
    next: {
      heading: 'Next',
      note: 'In development. Not available yet, and not promised until it ships.',
      status: 'In development',
    },
    later: {
      heading: 'Later',
      note: 'Planned. Not available, and not promised until it ships.',
      status: 'Planned',
    },
  },
  empty: 'Nothing is on the public roadmap yet.',
  bucketEmpty: 'Nothing published here yet.',
};

const zhHans: RoadmapCopy = {
  title: '路线图 · ObjectOS 企业版',
  description: 'ObjectOS 企业版路线图：现在已经提供什么、接下来在开发什么、以后计划做什么，只用批准对外发布的说法。',
  eyebrow: 'ObjectOS 企业版',
  heading: '路线图',
  lead: '「现在」是已经交付的能力；「接下来」正在开发，尚不可用；「以后」是计划中的工作。条目的说法经批准对外发布后才会出现在这里；「接下来」和「以后」中的条目在交付前都不构成承诺。',
  buckets: {
    now: {
      heading: '现在',
      note: '已交付，可以使用。预览功能标有「预览」。',
      status: '已提供',
    },
    next: {
      heading: '接下来',
      note: '开发中，尚不可用，交付前不承诺。',
      status: '开发中',
    },
    later: {
      heading: '以后',
      note: '计划中，尚不可用，交付前不承诺。',
      status: '计划中',
    },
  },
  empty: '公开路线图暂无条目。',
  bucketEmpty: '暂无公开条目。',
};

const toHant = (copy: RoadmapCopy): RoadmapCopy => ({
  title: s2t(copy.title),
  description: s2t(copy.description),
  eyebrow: s2t(copy.eyebrow),
  heading: s2t(copy.heading),
  lead: s2t(copy.lead),
  buckets: Object.fromEntries(
    ROADMAP_BUCKETS.map((bucket) => {
      const b = copy.buckets[bucket];
      return [bucket, { heading: s2t(b.heading), note: s2t(b.note), status: s2t(b.status) }];
    })
  ) as Record<RoadmapBucket, RoadmapBucketCopy>,
  empty: s2t(copy.empty),
  bucketEmpty: s2t(copy.bucketEmpty),
});

// ja/de/es/fr/ko hold the English object itself, so `sourceLocaleByIdentity`
// makes them fallbacks: noindexed, canonical to /en/roadmap/, and out of
// hreflang (src/lib/fallback.ts). The wording exists in English and Chinese only.
export const roadmapCopy: Record<Locale, RoadmapCopy> = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': toHant(zhHans),
  ja: en,
  de: en,
  es: en,
  fr: en,
  ko: en,
};

/** An item's wording in the language a page's copy is written in. */
export const itemWording = (item: RoadmapItem, contentLocale: Locale): string =>
  contentLocale === 'zh-Hans'
    ? item.wording['zh-Hans']
    : contentLocale === 'zh-Hant'
      ? s2t(item.wording['zh-Hans'])
      : item.wording.en;

/** The items of one bucket, in the table's order. */
export const itemsIn = (snapshot: RoadmapSnapshot, bucket: RoadmapBucket): RoadmapItem[] =>
  snapshot.items.filter((item) => item.bucket === bucket);
