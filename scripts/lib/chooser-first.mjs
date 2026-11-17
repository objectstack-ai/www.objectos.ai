// Chooser-first structure: the code-density rule for `business` / `general`
// posts (maintainer ruling 2026-11-17, #458; AGENTS.md "Chooser-first
// structure"). Read by `scripts/content-lint.mjs`, which reports what this
// returns; `node scripts/content-lint.mjs --self-test` runs only the self-test.
//
// ─── The rule ──────────────────────────────────────────────────────────────
//
// A post whose `date` is on or after CUTOFF and whose `audience` is `business`
// or `general` may have at most MAX_BLOCKS fenced code blocks above its proof
// section, in every locale. A post with more blocks than that and no proof
// section fails too. Earlier posts and `it` / `developer` posts are not checked.
// A title shaped "question: mechanism tail" (a colon or dash separator) is a
// warning only, since no machine can tell a mechanism tail from a fair title.
//
// ─── The proof marker ──────────────────────────────────────────────────────
//
// The proof section is found by a marker, not by its heading text: each locale
// translates "The proof", and a heading's slug follows its text. The marker is
// an MDX comment on its own line, directly above the proof section's heading:
//
//     {/* the-proof */}
//     ## The proof
//
// Why an MDX comment: MDX compiles `{/* … */}` to nothing, so the built page is
// byte-identical with or without it (checked on #458 by building a post with
// and without the marker in all eight locales); it is ASCII, so
// `pnpm gen:zh-hant` (OpenCC) and translators carry it over unchanged; and it
// adds no id, so it cannot collide with a heading slug. The candidates it beat:
// a `{#the-proof}` heading id is a JS expression in MDX and fails the build, and
// an `<a id>` anchor adds an element whose id collides with the English slug
// `the-proof`. The WeChat export (`scripts/lib/wechat-html.mjs`) drops the line.
//
// A marker inside a code fence is code, not a marker. Only the exact spelling
// counts; a near miss reads as "no proof section", and the message names the
// spelling.

export const CUTOFF = '2026-11-23';
export const MAX_BLOCKS = 2;
export const AUDIENCES = new Set(['business', 'general']);
export const PROOF_MARKER = '{/* the-proof */}';

const MARKER_LINE = /^\{\/\*\s*the-proof\s*\*\/\}$/;
const FENCE_OPEN = /^(`{3,}|~{3,})(.*)$/;

// A title's "question: mechanism" seam: an ASCII colon followed by a space, a
// spaced dash (hyphen, en or em), or the CJK full-width colon or doubled dash.
const TITLE_SEAM = /:\s|\s[-–—]\s|：|——/;

/**
 * Walk an MDX body and return the fenced code blocks it opens, in order, and
 * the line of the first proof marker outside any fence (or -1). Fences follow
 * CommonMark: a run of three or more backticks or tildes opens one, and only a
 * line of the same character, at least as long and with nothing after it,
 * closes it. MDX has no indented code blocks, so indentation is ignored (a
 * fence inside a list item is still a fence).
 *
 * @param {string} body
 * @returns {{ fences: number[], marker: number }}
 */
export function scanBody(body) {
  const fences = [];
  let marker = -1;
  let open = null;
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (open) {
      if (line[0] === open[0] && /^(`+|~+)$/.test(line) && line.length >= open.length) open = null;
      continue;
    }
    const fence = FENCE_OPEN.exec(line);
    // A backtick fence's info string may not contain a backtick.
    if (fence && !(fence[1][0] === '`' && fence[2].includes('`'))) {
      open = fence[1];
      fences.push(i);
      continue;
    }
    if (marker === -1 && MARKER_LINE.test(line)) marker = i;
  }
  return { fences, marker };
}

function day(value) {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/**
 * The chooser-first findings for one post.
 *
 * @param {{ data: Record<string, unknown>, body: string }} post
 * @returns {{ severity: 'error' | 'warn', message: string }[]}
 */
export function chooserFirstIssues({ data, body }) {
  const issues = [];
  if (!AUDIENCES.has(data?.audience)) return issues;
  const date = data.date ? day(data.date) : null;
  if (!date || date < CUTOFF) return issues;

  const scope = `a ${data.audience} post dated on or after ${CUTOFF}`;
  const { fences, marker } = scanBody(body);
  if (marker === -1) {
    if (fences.length > MAX_BLOCKS) {
      issues.push({
        severity: 'error',
        message:
          `chooser-first: ${fences.length} fenced code blocks and no proof section; ${scope} ` +
          `keeps at most ${MAX_BLOCKS} above its proof section — put ${PROOF_MARKER} on its ` +
          `own line directly above the proof section's heading and move the rest below it`,
      });
    }
  } else {
    const above = fences.filter((line) => line < marker).length;
    if (above > MAX_BLOCKS) {
      issues.push({
        severity: 'error',
        message:
          `chooser-first: ${above} fenced code blocks above the proof marker ${PROOF_MARKER}; ` +
          `${scope} allows at most ${MAX_BLOCKS} there — move the rest into the proof section`,
      });
    }
  }

  if (typeof data.title === 'string' && TITLE_SEAM.test(data.title)) {
    issues.push({
      severity: 'warn',
      message:
        'chooser-first: the title has a colon or dash seam; if what follows it is a mechanism ' +
        'tail, keep the question only and move the mechanism into description',
    });
  }
  return issues;
}

// ─── Self-test ─────────────────────────────────────────────────────────────

const LOCALE_PROOF_HEADINGS = {
  en: 'The proof',
  'zh-Hans': '证据',
  'zh-Hant': '證據',
  de: 'Der Beweis',
  es: 'La prueba',
  fr: 'La preuve',
  ja: '証拠',
  ko: '증거',
};

/** A fenced block; `fence` picks the fence run. */
const block = (fence = '```') => `${fence}bash\nos verify\n${fence}\n`;

/** A post body: `above` blocks, then (optionally) the marker and the proof heading, then `below` blocks. */
function post({ above, below = 0, marker = true, heading = 'The proof' }) {
  const parts = ['Opening paragraph.\n'];
  for (let i = 0; i < above; i++) parts.push(block());
  parts.push(`${marker ? `${PROOF_MARKER}\n` : ''}## ${heading}\n`);
  for (let i = 0; i < below; i++) parts.push(block());
  return parts.join('\n');
}

const base = { title: 'Who can see this customer record?', date: CUTOFF, audience: 'business' };

/** [label, data, body, expected severities in order] */
function cases() {
  const list = [
    ['under the cap', base, post({ above: 2, below: 6 }), []],
    ['over the cap', base, post({ above: 3, below: 1 }), ['error']],
    ['over the cap, general audience', { ...base, audience: 'general' }, post({ above: 3 }), ['error']],
    ['no proof section, at the cap', base, post({ above: 2, marker: false }), []],
    ['no proof section, over the cap', base, post({ above: 3, marker: false }), ['error']],
    ['dated before the cutoff: ignored', { ...base, date: '2026-11-22' }, post({ above: 9, marker: false }), []],
    ['YAML Date before the cutoff: ignored', { ...base, date: new Date('2026-11-22') }, post({ above: 9 }), []],
    ['YAML Date on the cutoff: checked', { ...base, date: new Date(CUTOFF) }, post({ above: 3 }), ['error']],
    ['developer post: ignored', { ...base, audience: 'developer' }, post({ above: 9, marker: false }), []],
    ['it post: ignored', { ...base, audience: 'it' }, post({ above: 9, marker: false }), []],
    [
      'a marker inside a fence is code',
      base,
      `${block()}${block()}\`\`\`mdx\n${PROOF_MARKER}\n\`\`\`\n${PROOF_MARKER}\n## The proof\n`,
      ['error'],
    ],
    [
      'a longer fence holds a shorter one; tildes count',
      base,
      `\`\`\`\`md\n\`\`\`js\nx\n\`\`\`\n\`\`\`\`\n${block('~~~')}${PROOF_MARKER}\n## The proof\n${block()}`,
      [],
    ],
    ['a near-miss marker is not the marker', base, post({ above: 3 }).replace(PROOF_MARKER, '{/* proof */}'), ['error']],
    ['title with a mechanism tail: warning only', { ...base, title: 'Who can see this record: five fields wide' }, post({ above: 1 }), ['warn']],
    ['title with a dash tail: warning only', { ...base, title: 'Who can see this record — five fields wide' }, post({ above: 1 }), ['warn']],
    ['CJK title with a full-width colon: warning only', { ...base, title: '谁能看到这条记录：五个字段' }, post({ above: 1 }), ['warn']],
    ['hyphenated word is not a seam', { ...base, title: 'Should AI-written apps get a sign-off?' }, post({ above: 1 }), []],
  ];
  // Every locale: the same post, its proof heading translated, behaves the same.
  for (const [locale, heading] of Object.entries(LOCALE_PROOF_HEADINGS)) {
    list.push([`${locale}: under the cap`, base, post({ above: 2, below: 4, heading }), []]);
    list.push([`${locale}: over the cap`, base, post({ above: 3, heading }), ['error']]);
    list.push([`${locale}: heading without the marker`, base, post({ above: 3, heading, marker: false }), ['error']]);
  }
  return list;
}

/** @returns {{ passed: number, failures: string[] }} */
export function selfTest() {
  const failures = [];
  const list = cases();
  for (const [label, data, body, expected] of list) {
    const actual = chooserFirstIssues({ data, body }).map((issue) => issue.severity);
    if (actual.join(',') !== expected.join(',')) {
      failures.push(`${label}: expected [${expected.join(', ')}], got [${actual.join(', ')}]`);
    }
  }
  return { passed: list.length - failures.length, failures };
}
