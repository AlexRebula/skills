#!/usr/bin/env node
/**
 * quality-gate.js
 *
 * Runs all quality checks for this repo (root skills library + docs site).
 * Adapted from the org-wide canonical quality-gate.js
 * (oss-quality-standards/scripts/quality-gate.js) to this repo's actual
 * shape: there is no single tsup/Storybook build here, but there is a
 * Docusaurus site under site/ whose build was previously never run outside
 * CI. See raw/incidents/2026-09-16--edited-installed-skill-copy-not-canonical-repo.md
 * (companion incident) for why: a broken site build went undetected locally
 * across two commits before anyone ran `npm run build` by hand.
 *
 * npm scripts to add in package.json:
 *   "check"        : "node scripts/quality-gate.js --fix"
 *   "check:verify" : "node scripts/quality-gate.js --verify"
 *
 * Called automatically by:
 *   - .githooks/pre-push        (before every push)
 *   - .github/workflows/site-quality.yml  (CI)
 *
 * Checks performed (in order):
 *   1. Provenance script lint — eslint on scripts/generate-provenance.ts
 *   2. Root tests — vitest run
 *   3. Site typecheck — tsc
 *   4. Site lint — eslint (--fix in --fix mode)
 *   5. Site stylelint (--fix in --fix mode)
 *   6. Site tests — vitest run
 *   7. Site build — docusaurus build (previously CI-only; the gap this
 *      script exists to close)
 *
 * Flags:
 *   --fix      Auto-fix eslint/stylelint issues in site/ before checking
 *   --verify   Read-only mode (default for pre-push and CI)
 *
 * Exit codes: 0 = all passed, 1 = at least one check failed.
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIX_MODE = process.argv.includes('--fix');

const repoRoot = path.resolve(__dirname, '..');
const siteDir = path.join(repoRoot, 'site');

function run(label, cmd, { cwd = repoRoot, fatal = false } = {}) {
  console.log(`\n→ ${label}…`);
  try {
    execSync(cmd, { cwd, stdio: 'inherit' });
    console.log(`✓ ${label} passed`);
    return true;
  } catch {
    console.error(`\n❌  ${label} failed`);
    if (fatal) process.exit(1);
    return false;
  }
}

console.log('');
console.log('══════════════════════════════════════════════════════════');
console.log(' Quality gate — AlexRebula/skills');
if (FIX_MODE) console.log(' Mode: auto-fix + verify');
else console.log(' Mode: verify only (use --fix to auto-fix)');
console.log('══════════════════════════════════════════════════════════');

const failures = [];

// 1. Provenance script lint
if (!run('Provenance script lint', 'npm run lint:provenance-script')) {
  failures.push('Provenance script lint — fix eslint errors above');
}

// 2. Root tests
if (!run('Root tests (vitest)', 'npm test')) {
  failures.push('Root tests — fix failing tests above');
}

// 3. Site typecheck
if (!run('Site typecheck (tsc)', 'npm run typecheck', { cwd: siteDir })) {
  failures.push('Site typecheck — fix type errors above');
}

// 4. Site lint
if (FIX_MODE) {
  run('Site ESLint auto-fix', 'npm run lint:fix', { cwd: siteDir });
}
if (!run('Site ESLint', 'npm run lint', { cwd: siteDir })) {
  failures.push('Site ESLint — run `npm run lint:fix` in site/ to auto-fix, then fix the rest');
}

// 5. Site stylelint
if (FIX_MODE) {
  run('Site stylelint auto-fix', 'npm run stylelint:fix', { cwd: siteDir });
}
if (!run('Site stylelint', 'npm run stylelint', { cwd: siteDir })) {
  failures.push('Site stylelint — run `npm run stylelint:fix` in site/ to auto-fix, then fix the rest');
}

// 6. Site tests
if (!run('Site tests (vitest)', 'npm run test', { cwd: siteDir })) {
  failures.push('Site tests — fix failing tests above');
}

// 7. Site build — the check this script exists to add locally.
if (!run('Site build (docusaurus build)', 'npm run build', { cwd: siteDir })) {
  failures.push(
    'Site build — the docs site failed to compile; fix build errors above (often a missing dependency for a yalc-linked package — see npm run build output for "Module not found")',
  );
}

console.log('');
console.log('══════════════════════════════════════════════════════════');

if (failures.length === 0) {
  console.log(' ✅  All checks passed');
  console.log('══════════════════════════════════════════════════════════');
  process.exit(0);
} else {
  console.error(` ❌  ${failures.length} check(s) failed:\n`);
  for (const f of failures) {
    console.error(`   • ${f}`);
  }
  console.log('══════════════════════════════════════════════════════════');
  process.exit(1);
}
