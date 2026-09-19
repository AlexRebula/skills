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
 *   "check"               : "node scripts/quality-gate.js --fix"
 *   "check:verify"        : "node scripts/quality-gate.js --verify"
 *   "check:verify:smart"  : "node scripts/quality-gate.js --verify --smart"
 *   "check:verify:full"   : "node scripts/quality-gate.js --verify --full"
 *
 * Called automatically by:
 *   - .githooks/pre-push        (before every push — smart mode)
 *   - .github/workflows/site-quality.yml  (CI — always full gate)
 *
 * Checks performed (in order):
 *   1. Provenance script lint — eslint on scripts/generate-provenance.ts (always runs — fast)
 *   2. Root tests — vitest run (smart: skipped when every changed file is
 *      site-only or a root docs file with no bearing on root tests)
 *   3. Site typecheck — tsc (smart: skipped when nothing site-relevant changed)
 *   4. Site lint — eslint, --fix in --fix mode (smart: same as above)
 *   5. Site stylelint, --fix in --fix mode (smart: same as above)
 *   6. Site tests — vitest run (smart: same as above)
 *   7. Site build — docusaurus build (smart: same as above; this is the
 *      step that used to be CI-only, see the companion incident above)
 *
 * Flags:
 *   --fix          Auto-fix eslint/stylelint issues in site/ before checking
 *   --verify       Read-only mode (default for pre-push and CI)
 *   --smart        Smart mode: skip untriggered site checks when not CI
 *   --full         Force full gate regardless of changed files (overrides --smart)
 *   --log-metrics  Append per-run timing data to scripts/gate-timing.log
 *
 * Smart mode rules:
 *   - CI (process.env.CI=true) always runs the full gate regardless of --smart.
 *   - If diff resolution fails, falls back to the full gate.
 *   - The five site checks (typecheck/lint/stylelint/tests/build) are
 *     gated together as one group — see SITE_TRIGGER below — rather than
 *     independently, since none of them is expensive enough on its own to
 *     be worth a separate trigger, and the group is what most PRs either
 *     entirely need or entirely don't.
 *   - Root tests are skipped only when every changed file is under site/
 *     or is a root-level doc file with no bearing on root tests (see
 *     ROOT_TEST_SKIP_ONLY) — anything under skills/ or scripts/ always
 *     triggers them, since those are exactly what the root suite covers.
 *
 * Yalc dependency-resolution leniency (local only, never in CI):
 *   The five site checks (typecheck/lint/stylelint/tests/build) all resolve
 *   modules and can fail because of an unrelated, in-progress breaking
 *   change in a yalc-linked dependency (e.g. giselle-mui-poc) rather than a
 *   real regression in this repo. When one of those steps fails locally and
 *   its output implicates a package currently linked via site/yalc.lock,
 *   the gate warns instead of blocking the push. CI always treats the same
 *   failure as blocking. See LittleBranches/wiki#929 and #855 for the
 *   incident and design that motivated this.
 */

import { appendFileSync } from 'fs';
import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  resolveChangedFiles,
  evaluateTriggers,
  loadYalcLinkedPackages,
  isLikelyYalcFailure,
} from './smart-gate-core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const siteDir = path.join(repoRoot, 'site');

// Package names currently linked via yalc under site/ — used to recognize a
// dependency-resolution failure in a site check that isn't this repo's own regression.
const yalcLinkedPackages = loadYalcLinkedPackages([siteDir]);

// ── Flags ──────────────────────────────────────────────────────────────────

const FIX_MODE = process.argv.includes('--fix');
const SMART_FLAG = process.argv.includes('--smart') && !process.argv.includes('--full');
const LOG_METRICS = process.argv.includes('--log-metrics');

// CI always runs the full gate — smart mode is for local pre-push only.
const IS_CI = process.env['CI'] === 'true';
const RUN_SMART = SMART_FLAG && !IS_CI;

// Anything under skills/ or scripts/generate-*.ts feeds the site's own
// generated data (skills-landing.json, provenance.json, etc.), so it counts
// as a site-relevant change even though it isn't under site/ itself.
const SITE_TRIGGER = [
  /^site\//,
  /^skills\//,
  /^scripts\/generate-/,
  /^scripts\/check-docs-completeness\.ts$/,
  /^package\.json$/,
];

// Root tests cover scripts/**, skills/** (skill.test.ts files), and the
// installed .claude/.agents skill copies — anything except a pure site-only
// or root-doc-only change.
const ROOT_TEST_SKIP_ONLY = [/^site\//, /^\.github\//, /^README\.md$/, /^CHANGELOG\.md$/];

// ── Telemetry ─────────────────────────────────────────────────────────────

const telemetry = {
  repo: 'AlexRebula/skills',
  mode: RUN_SMART ? 'smart' : 'full',
  startTime: Date.now(),
  basis: 'full',
  changedFileCount: 0,
  steps:
    /** @type {Array<{name:string,status:string,duration?:number,result?:string,reason?:string}>} */ ([]),
  result: 'unknown',
};

const failures = [];

/** @param {string} label @param {string} cmd @param {{ cwd?: string, fatal?: boolean }} [opts] */
function run(label, cmd, { cwd = repoRoot, fatal = false } = {}) {
  const start = Date.now();
  console.log(`\n→ ${label}…`);
  try {
    execSync(cmd, { cwd, stdio: 'inherit' });
    const duration = Date.now() - start;
    console.log(`✓ ${label} passed (${duration}ms)`);
    telemetry.steps.push({ name: label, status: 'executed', duration, result: 'pass' });
    return true;
  } catch {
    const duration = Date.now() - start;
    console.error(`\n❌  ${label} failed (${duration}ms)`);
    telemetry.steps.push({ name: label, status: 'executed', duration, result: 'fail' });
    if (fatal) process.exit(1);
    return false;
  }
}

/** @param {string} label @param {string} reason */
function skip(label, reason) {
  console.log(`\n⏭  ${label} — skipped: ${reason}`);
  telemetry.steps.push({ name: label, status: 'skipped', reason });
}

/**
 * Like `run`, but tees the child process's combined output to the console
 * live (same experience as `run`) while also buffering it, so a failure can
 * be checked against `yalcLinkedPackages`. Used only for the five site
 * checks, where an unresolved import from a yalc-linked package is a
 * plausible cause of failure.
 *
 * @param {string} label @param {string} cmd @param {{ cwd?: string, fatal?: boolean }} [opts]
 * @returns {Promise<boolean>}
 */
function runCheckedForYalc(label, cmd, { cwd = repoRoot, fatal = false } = {}) {
  return new Promise((resolve) => {
    const start = Date.now();
    console.log(`\n→ ${label}…`);
    const child = spawn(cmd, { cwd, shell: true });
    let output = '';
    const tee = (stream) => (chunk) => {
      stream.write(chunk);
      output += chunk.toString();
    };
    child.stdout.on('data', tee(process.stdout));
    child.stderr.on('data', tee(process.stderr));
    child.on('close', (code) => {
      const duration = Date.now() - start;
      if (code === 0) {
        console.log(`✓ ${label} passed (${duration}ms)`);
        telemetry.steps.push({ name: label, status: 'executed', duration, result: 'pass' });
        resolve(true);
        return;
      }
      if (!IS_CI && isLikelyYalcFailure(output, yalcLinkedPackages)) {
        console.warn(
          `\n⚠  ${label} failed, but the output implicates a yalc-linked package — ` +
            `treating this as an unrelated dependency issue, not a regression. Not blocking this push.`
        );
        telemetry.steps.push({ name: label, status: 'executed', duration, result: 'yalc-warning' });
        resolve(true);
        return;
      }
      console.error(`\n❌  ${label} failed (${duration}ms)`);
      telemetry.steps.push({ name: label, status: 'executed', duration, result: 'fail' });
      if (fatal) process.exit(1);
      resolve(false);
    });
  });
}

// ── Resolve diff ───────────────────────────────────────────────────────────

let runSite = true;
let runRootTests = true;

if (RUN_SMART) {
  const { files, basis } = resolveChangedFiles(repoRoot);
  telemetry.basis = basis;

  if (basis === 'fallback') {
    console.warn('\n⚠  Smart mode: diff resolution failed — running full gate as fallback');
    telemetry.mode = 'smart→full-fallback';
  } else {
    telemetry.changedFileCount = files?.length ?? 0;

    if (files && files.length === 0) {
      runSite = false;
      runRootTests = false;
    } else if (files) {
      const { build } = evaluateTriggers(files, { buildTrigger: SITE_TRIGGER });
      runSite = build;
      runRootTests = !files.every((f) => ROOT_TEST_SKIP_ONLY.some((p) => p.test(f)));
    }
  }
}

// ── Header ─────────────────────────────────────────────────────────────────

console.log('');
console.log('══════════════════════════════════════════════════════════');
console.log(' Quality gate — AlexRebula/skills');
if (FIX_MODE) {
  console.log(' Mode: auto-fix + verify');
} else if (RUN_SMART) {
  console.log(
    ` Mode: smart pre-push (basis: ${telemetry.basis}, ${telemetry.changedFileCount} file(s) changed)`
  );
} else {
  console.log(' Mode: verify only (use --fix to auto-fix)');
}
if (IS_CI) console.log(' CI: full gate enforced');
console.log('══════════════════════════════════════════════════════════');

// 1. Provenance script lint — always runs, fast, no compilation.
if (!run('Provenance script lint', 'npm run lint:provenance-script')) {
  failures.push('Provenance script lint — fix eslint errors above');
}

// 2. Root tests — smart: skipped when only site/ or root docs changed.
if (RUN_SMART && !runRootTests) {
  skip('Root tests (vitest)', 'no changes outside site/ or root docs');
} else if (!run('Root tests (vitest)', 'npm test')) {
  failures.push('Root tests — fix failing tests above');
}

// 3-7. Site checks — smart: skipped as a group when nothing site-relevant changed.
if (RUN_SMART && !runSite) {
  skip('Site data generation', 'no site-relevant changes');
  skip('Site typecheck (tsc)', 'no site-relevant changes');
  skip('Site ESLint', 'no site-relevant changes');
  skip('Site stylelint', 'no site-relevant changes');
  skip('Site tests (vitest)', 'no site-relevant changes');
  skip('Site build (docusaurus build)', 'no site-relevant changes');
} else {
  // typecheck/lint/stylelint/test all import generated data files
  // (solar-icons.json, provenance.json, skills-landing.json,
  // skill-summaries.json) that `npm run check`'s own `precheck` hook
  // normally creates first. Calling the sub-scripts directly here skips
  // that hook, so generate explicitly — a fresh CI checkout has none of
  // these files on disk yet.
  run('Site data generation', 'npm run precheck', { cwd: siteDir, fatal: true });

  if (!(await runCheckedForYalc('Site typecheck (tsc)', 'npm run typecheck', { cwd: siteDir }))) {
    failures.push('Site typecheck — fix type errors above');
  }

  if (FIX_MODE) {
    run('Site ESLint auto-fix', 'npm run lint:fix', { cwd: siteDir });
  }
  if (!(await runCheckedForYalc('Site ESLint', 'npm run lint', { cwd: siteDir }))) {
    failures.push('Site ESLint — run `npm run lint:fix` in site/ to auto-fix, then fix the rest');
  }

  if (FIX_MODE) {
    run('Site stylelint auto-fix', 'npm run stylelint:fix', { cwd: siteDir });
  }
  if (!(await runCheckedForYalc('Site stylelint', 'npm run stylelint', { cwd: siteDir }))) {
    failures.push(
      'Site stylelint — run `npm run stylelint:fix` in site/ to auto-fix, then fix the rest'
    );
  }

  if (!(await runCheckedForYalc('Site tests (vitest)', 'npm run test', { cwd: siteDir }))) {
    failures.push('Site tests — fix failing tests above');
  }

  if (
    !(await runCheckedForYalc('Site build (docusaurus build)', 'npm run build', { cwd: siteDir }))
  ) {
    failures.push(
      'Site build — the docs site failed to compile; fix build errors above (often a missing dependency for a yalc-linked package — see npm run build output for "Module not found")'
    );
  }
}

// ── Telemetry ─────────────────────────────────────────────────────────────

const totalDuration = Date.now() - telemetry.startTime;
telemetry.totalDuration = totalDuration;
telemetry.result = failures.length === 0 ? 'pass' : 'fail';

const executedSteps = telemetry.steps.filter((s) => s.status === 'executed');
const skippedSteps = telemetry.steps.filter((s) => s.status === 'skipped');

if (RUN_SMART || LOG_METRICS) {
  console.log('\n── Timing ─────────────────────────────────────────────────');
  console.log(`   Mode:  ${telemetry.mode}  basis: ${telemetry.basis}`);
  if (telemetry.changedFileCount > 0) {
    console.log(`   Files: ${telemetry.changedFileCount} changed`);
  }
  console.log(`   Steps: ${executedSteps.length} executed, ${skippedSteps.length} skipped`);
  for (const s of telemetry.steps) {
    if (s.status === 'executed') {
      const icon = s.result === 'pass' ? '✓' : '✗';
      console.log(`     ${icon}  ${s.name} (${s.duration}ms)`);
    } else {
      console.log(`     ⏭  ${s.name} [skipped: ${s.reason}]`);
    }
  }
  console.log(`   Total: ${totalDuration}ms`);
}

if (LOG_METRICS) {
  const logPath = path.resolve(__dirname, 'gate-timing.log');
  try {
    appendFileSync(
      logPath,
      JSON.stringify({ ...telemetry, timestamp: new Date().toISOString() }) + '\n'
    );
  } catch {
    // Non-fatal: a log write failure must never block a push.
  }
}

// ── Summary ────────────────────────────────────────────────────────────────

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
