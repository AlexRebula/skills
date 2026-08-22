#!/usr/bin/env node
/**
 * setup-hooks.js
 *
 * Configures git to use the version-controlled `.githooks/` directory.
 * Runs automatically after `npm install` (postinstall). Adapted from the
 * identical script in the giselle-mui repo.
 *
 * Safe to run on CI (no-ops when not inside a git repo or when
 * `git config` is not writable).
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// ── Locate the git root ────────────────────────────────────────────────────
let gitRoot;
try {
  gitRoot = execSync('git rev-parse --show-toplevel', {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim();
} catch {
  // Not inside a git repo (e.g. CI checkout without git): skip silently.
  process.exit(0);
}

// ── Verify .githooks/ exists in the repo ──────────────────────────────────
const hooksDir = path.join(gitRoot, '.githooks');
if (!fs.existsSync(hooksDir)) {
  console.warn('⚠  .githooks/ directory not found at repo root, skipping hook setup.');
  process.exit(0);
}

// ── Make all hook files executable ────────────────────────────────────────
try {
  for (const file of fs.readdirSync(hooksDir)) {
    fs.chmodSync(path.join(hooksDir, file), 0o755);
  }
} catch {
  // Ignore: some environments (Docker, CI) don't allow chmod.
}

// ── Configure git to use .githooks/ ───────────────────────────────────────
try {
  const current = execSync('git config core.hooksPath', {
    cwd: gitRoot,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim();

  if (current === '.githooks') {
    console.log('✓ git core.hooksPath already set to .githooks');
    process.exit(0);
  }
} catch {
  // Not yet set: proceed to configure.
}

try {
  execSync('git config core.hooksPath .githooks', {
    cwd: gitRoot,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  console.log('✓ git core.hooksPath set to .githooks (hooks are now version-controlled)');
} catch (err) {
  console.warn('⚠  Could not set git core.hooksPath:', err.message);
}
