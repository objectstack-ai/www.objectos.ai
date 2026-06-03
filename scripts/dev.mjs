#!/usr/bin/env node
// Self-healing dev launcher — guarantees ONE clean Astro dev server.
//
// Wired as `pnpm dev` (see package.json), which is what the preview panel
// runs via .claude/launch.json. So every time you start the panel it:
//   1. frees port 4321 — kills any leftover/zombie dev server
//   2. clears Astro's dev content store (.astro) — so a moved or renamed
//      post never leaves a stale, empty article list
//   3. starts a single clean `astro dev`
//
// This removes the two root causes of "the panel shows no articles":
// multiple competing instances, and a stale content cache.

import { execSync, spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Honor the port the preview panel assigns via PORT (autoPort); else 4321.
const PORT = process.env.PORT || '4321';
const root = fileURLToPath(new URL('..', import.meta.url));

// 1) Free the port (macOS/Linux). No-op elsewhere or if nothing is bound.
try {
  const pids = execSync(`lsof -ti tcp:${PORT}`, { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);
  for (const pid of pids) {
    try {
      process.kill(Number(pid), 'SIGKILL');
    } catch {
      /* already gone */
    }
  }
  if (pids.length) {
    console.log(`✓ freed port ${PORT} (cleared ${pids.length} stale dev server${pids.length > 1 ? 's' : ''})`);
  }
} catch {
  /* nothing on the port, or lsof not available */
}

// 2) Clear the dev content store so content is always re-synced fresh.
try {
  rmSync(new URL('../.astro', import.meta.url), { recursive: true, force: true });
} catch {
  /* nothing to clear */
}

// 2.5) Refresh auto-generated Traditional-Chinese posts from Simplified.
try {
  execSync('node scripts/gen-zh-hant.mjs', { stdio: 'inherit', cwd: root });
} catch {
  /* non-fatal — keep the dev server starting even if generation hiccups */
}

// 3) Start one clean dev server (port/host come from astro.config.mjs).
const child = spawn(`${root}node_modules/.bin/astro`, ['dev', '--port', String(PORT)], {
  stdio: 'inherit',
  cwd: root,
});
child.on('exit', (code) => process.exit(code ?? 0));
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => child.kill(sig));
}
