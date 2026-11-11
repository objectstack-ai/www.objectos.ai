#!/usr/bin/env node
// The README comparison gate `src/lib/positioning.ts` promises.
//
// `CANONICAL` in that module claims to be the objectstack README's T1–T4 with
// the Markdown rendered away. This script holds it to that: it derives the
// four strings from a pinned snapshot of the README — the file at the release
// tag named below, byte for byte — by the rendering rules the module's header
// declares, parses `CANONICAL` from the module's text, and exits 1 on any
// difference, naming the README lines. `pnpm build` runs it first, so a README
// that moved on without this site fails the build instead of shipping a quote
// the source no longer contains (which is what happened between cli@18.1.0 and
// cli@18.2.0: objectstack #26148 replaced T4 and www kept rendering the old
// one for a week).
//
// Pinning: the snapshot is `git show '<TAG>:README.md'` from the objectstack
// repository, and its git blob hash is pinned here too, so a hand edit to the
// snapshot fails as loudly as a drift in the module. To move to a newer tag:
// re-copy the file, update TAG / COMMIT / BLOB and the line numbers below if
// they moved, then copy the new words into `CANONICAL`.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SNAPSHOT = `${ROOT}scripts/positioning/README.objectstack.md`;
const MODULE = `${ROOT}src/lib/positioning.ts`;

/** The README release this site quotes: the latest `@objectstack/cli` tag. */
const TAG = '@objectstack/cli@18.2.0';
const COMMIT = '27f38ada498162835c2f1d56e6edabe18910b4ed';
/** `git rev-parse '<TAG>:README.md'` — the blob hash of the pinned file. */
const BLOB = '77c89c0fb4f473b643f6b37cc22e21d0efcc8a42';

/** Where each string lives in the README (1-based, inclusive). */
const LINES = {
  t1: [7, 7],
  t2: [9, 10],
  t3: [14, 14],
  t4: [27, 31],
};

const failures = [];
const fail = (message) => failures.push(message);

// --- the snapshot --------------------------------------------------------

const snapshotBytes = readFileSync(SNAPSHOT);
const blob = createHash('sha1')
  .update(`blob ${snapshotBytes.length}\0`)
  .update(snapshotBytes)
  .digest('hex');
if (blob !== BLOB) {
  fail(
    `${SNAPSHOT} is not the README at ${TAG}: blob ${blob}, pinned ${BLOB}. ` +
      `Re-copy it with \`git show '${TAG}:README.md'\` or re-pin BLOB with the new tag.`
  );
}
const readme = snapshotBytes.toString('utf8').split('\n');
const lines = ([from, to]) => readme.slice(from - 1, to);

/** The README's Markdown rendered away, by the rules positioning.ts declares. */
const render = (text) =>
  text
    // A parenthetical that is only a same-document anchor link has no target off the README.
    .replace(/ \(\[[^\]]+\]\(#[^)]+\)\)/g, '')
    // Inline links keep their text.
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Code spans and bold keep their text.
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');

/** T1: the blockquoted heading. */
const readmeT1 = (() => {
  const [line] = lines(LINES.t1);
  const m = /^> ## (.+)$/.exec(line ?? '');
  if (!m) fail(`README line ${LINES.t1[0]} is not a blockquoted heading: ${JSON.stringify(line)}`);
  return m ? render(m[1]) : null;
})();

/** T2: the blockquoted paragraph, wrapped over two lines, rejoined with one space. */
const readmeT2 = (() => {
  const parts = lines(LINES.t2).map((line) => {
    const m = /^> (.+)$/.exec(line);
    if (!m) fail(`README line in ${LINES.t2.join('–')} is not blockquoted prose: ${JSON.stringify(line)}`);
    return m ? m[1] : '';
  });
  return render(parts.join(' '));
})();

/** T3: the four code-span promises on the licence line, before "Apache-2.0". */
const readmeT3 = (() => {
  const [line] = lines(LINES.t3);
  const items = [...(line ?? '').matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  if (items.length !== 4 || !/Apache-2\.0\s*$/.test(line ?? '')) {
    fail(`README line ${LINES.t3[0]} is not the four-promise licence line: ${JSON.stringify(line)}`);
    return null;
  }
  return items;
})();

/** T4: the three-edition sentence, from "To run it," on line 27 to the end of line 31. */
const readmeT4 = (() => {
  const text = lines(LINES.t4).join(' ');
  const start = text.indexOf('To run it,');
  if (start < 0) {
    fail(`README lines ${LINES.t4.join('–')} do not contain "To run it,": ${JSON.stringify(text)}`);
    return null;
  }
  return render(text.slice(start)).trim();
})();

// --- the module -------------------------------------------------------------

const moduleText = readFileSync(MODULE, 'utf8');
const block = /export const CANONICAL = \{\n([\s\S]*?)\n\} as const;/.exec(moduleText);
if (!block) fail(`${MODULE}: cannot find \`export const CANONICAL = { … } as const;\``);
const body = block ? block[1] : '';

/** One `key: 'string'` / `key: "string"` line; the literal must hold no escapes. */
const stringKey = (key) => {
  const m = new RegExp(`^\\s*${key}: (?:'([^'\\\\]*)'|"([^"\\\\]*)"),?\\s*$`, 'm').exec(body);
  if (!m) {
    fail(`${MODULE}: CANONICAL.${key} is not one \`${key}: '…'\` line (the shape this gate parses)`);
    return null;
  }
  return m[1] ?? m[2];
};
const moduleT1 = stringKey('t1');
const moduleT2 = stringKey('t2');
const moduleT4 = stringKey('t4');
const moduleT3 = (() => {
  const m = /^\s*t3: \[(.*)\],?\s*$/m.exec(body);
  if (!m) {
    fail(`${MODULE}: CANONICAL.t3 is not one \`t3: ['…', …]\` line (the shape this gate parses)`);
    return null;
  }
  return [...m[1].matchAll(/'([^'\\]*)'|"([^"\\]*)"/g)].map((x) => x[1] ?? x[2]);
})();

// --- compare ------------------------------------------------------------------

const compare = (name, readmeValue, moduleValue) => {
  if (readmeValue == null || moduleValue == null) return;
  const same =
    Array.isArray(readmeValue)
      ? readmeValue.length === moduleValue.length && readmeValue.every((v, i) => v === moduleValue[i])
      : readmeValue === moduleValue;
  if (same) return;
  const [from, to] = LINES[name];
  const where = from === to ? `line ${from}` : `lines ${from}–${to}`;
  fail(
    `CANONICAL.${name} differs from the README (${TAG}, ${where}):\n` +
      `  README:      ${JSON.stringify(readmeValue)}\n` +
      `  positioning: ${JSON.stringify(moduleValue)}`
  );
};
compare('t1', readmeT1, moduleT1);
compare('t2', readmeT2, moduleT2);
compare('t3', readmeT3, moduleT3);
compare('t4', readmeT4, moduleT4);

if (failures.length > 0) {
  console.error(`check-positioning: FAIL (${failures.length} issue${failures.length === 1 ? '' : 's'})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}
console.log(
  `check-positioning: PASS — CANONICAL T1–T4 equal the objectstack README at ${TAG} ` +
    `(commit ${COMMIT.slice(0, 10)}, lines ${LINES.t1[0]}, ${LINES.t2.join('–')}, ${LINES.t3[0]}, ${LINES.t4.join('–')})`
);
