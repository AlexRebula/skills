#!/usr/bin/env node
/**
 * smart-gate-core
 *
 * Shared smart-gate core module for LittleBranches quality gates.
 * Canonical source (real TypeScript): LittleBranches/oss-quality-standards/scripts/smart-gate-core.ts
 *
 * If you're reading this as `smart-gate-core.js` in a consumer repo:
 * this is a compiled build, not the source. Do not edit this copy
 * directly; it will be silently overwritten by the next sync. Edit
 * smart-gate-core.ts in oss-quality-standards instead, then run from
 * there:
 *
 *   node scripts/sync-smart-gate.js ../giselle-mui ../giselle-sections-sdk
 *
 * Exports:
 *   FULL_FILE_THRESHOLD         — max changed files before targeted tests fall back to full suite
 *   DEFAULT_BUILD_TRIGGER       — RegExp[] triggering the tsup build step
 *   DEFAULT_STORY_TRIGGER       — RegExp[] triggering the Storybook build step
 *   DEFAULT_TEST_SKIP_ONLY      — RegExp[] where changes carry no bearing on tests
 *   resolveChangedFiles(dir)    — resolve diff since last pushed commit
 *   evaluateTriggers(files, opts) — determine which heavy steps should run
 *   resolveTargetedTests(files, dir) — map changed files to co-located .test.ts files
 */
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
// ── Constants ─────────────────────────────────────────────────────────────
/** Maximum changed files before targeted tests fall back to the full suite. */
export const FULL_FILE_THRESHOLD = 25;
/** File patterns that trigger the tsup build step. */
export const DEFAULT_BUILD_TRIGGER = [
    /^src\//,
    /^tsup\.config\.ts$/,
    /^tsconfig\.json$/,
    /^package\.json$/,
];
/** File patterns that trigger the Storybook build step. */
export const DEFAULT_STORY_TRIGGER = [/\.stories\.(ts|tsx)$/, /^\.storybook\//, /^src\//];
/**
 * File patterns where changes carry no bearing on tests.
 * If ALL changed files match only these patterns, the test step is skipped.
 */
export const DEFAULT_TEST_SKIP_ONLY = [
    /^\.storybook\//,
    /^\.github\//,
    /^docs\//,
    /^README/,
    /\.md$/,
    /\.mdx$/,
    /^scripts\//,
    /^\.githooks\//,
];
/**
 * Resolve the list of files changed since the last pushed commit.
 *
 * Tries three strategies in order:
 *   1. Diff against upstream tracking branch — most precise for pre-push.
 *   2. Diff against merge-base with main/master — covers squash/rebase workflows.
 *   3. Fallback — returns null; caller must run the full gate.
 *
 * @param appDir  Absolute path to the repo root.
 */
export function resolveChangedFiles(appDir) {
    // 1. Upstream tracking branch.
    try {
        const upstream = execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', {
            cwd: appDir,
            stdio: ['ignore', 'pipe', 'ignore'],
        })
            .toString()
            .trim();
        const output = execSync(`git diff --name-only "${upstream}"...HEAD`, {
            cwd: appDir,
            stdio: ['ignore', 'pipe', 'ignore'],
        })
            .toString()
            .trim();
        return { files: output ? output.split('\n').filter(Boolean) : [], basis: 'upstream' };
    }
    catch {
        // No upstream configured — fall through.
    }
    // 2. Merge-base against default branch.
    for (const branch of ['main', 'master']) {
        try {
            const base = execSync(`git merge-base HEAD ${branch}`, {
                cwd: appDir,
                stdio: ['ignore', 'pipe', 'ignore'],
            })
                .toString()
                .trim();
            const output = execSync(`git diff --name-only ${base} HEAD`, {
                cwd: appDir,
                stdio: ['ignore', 'pipe', 'ignore'],
            })
                .toString()
                .trim();
            return { files: output ? output.split('\n').filter(Boolean) : [], basis: 'merge-base' };
        }
        catch {
            // Branch not found — try next.
        }
    }
    // 3. Fallback — ambiguous diff; caller must run the full gate.
    return { files: null, basis: 'fallback' };
}
/**
 * Evaluate which heavy gate steps should run given the changed file list.
 *
 * @param files  Changed files from resolveChangedFiles, or null on failure.
 */
export function evaluateTriggers(files, opts = {}) {
    const { buildTrigger = DEFAULT_BUILD_TRIGGER, storyTrigger = DEFAULT_STORY_TRIGGER, testSkipOnly = DEFAULT_TEST_SKIP_ONLY, threshold = FULL_FILE_THRESHOLD, includeStorybook = false, } = opts;
    if (!files)
        return { tests: 'all', build: true, storybook: includeStorybook };
    if (files.length === 0)
        return { tests: 'none', build: false, storybook: false };
    const anyBuild = files.some((f) => buildTrigger.some((p) => p.test(f)));
    const anyStory = files.some((f) => storyTrigger.some((p) => p.test(f)));
    const onlyNonTest = files.every((f) => testSkipOnly.some((p) => p.test(f)));
    const anySrc = files.some((f) => f.startsWith('src/'));
    let tests;
    if (onlyNonTest) {
        tests = 'none';
    }
    else if (files.length > threshold) {
        tests = 'all';
    }
    else if (!anySrc) {
        // No src/ files changed — resolveTargetedTests would return [].
        // Fall back to the full suite to avoid running zero tests.
        tests = 'all';
    }
    else {
        tests = 'targeted';
    }
    return { tests, build: anyBuild, storybook: includeStorybook && anyStory };
}
// ── Targeted test resolution ──────────────────────────────────────────────
/**
 * Given the list of changed files, return the co-located .test.ts files to run.
 * Returns an empty array when no co-located tests are found
 * (caller must treat this as a signal to run the full suite).
 *
 * Resolution rules:
 *   - foo.tsx / foo.ts / foo.js → foo.test.ts
 *   - foo.styles.ts → foo.styles.test.ts + foo.test.ts
 *   - foo.utils.ts  → foo.utils.test.ts  + foo.test.ts
 *   - foo.test.ts   → itself (if it exists on disk)
 *
 * @param changedFiles  Changed files relative to appDir.
 * @param appDir        Absolute path to the repo root.
 */
export function resolveTargetedTests(changedFiles, appDir) {
    const testFiles = new Set();
    for (const f of changedFiles) {
        if (!f.startsWith('src/'))
            continue;
        const dir = path.dirname(f);
        const base = path.basename(f);
        const stem = base.replace(/\.(tsx?|js)$/, '');
        // The file is itself a test file.
        if (base.endsWith('.test.ts')) {
            if (existsSync(path.resolve(appDir, f)))
                testFiles.add(f);
            continue;
        }
        // foo.tsx / foo.ts → foo.test.ts
        const direct = path.join(dir, `${stem}.test.ts`);
        if (existsSync(path.resolve(appDir, direct)))
            testFiles.add(direct);
        // foo.styles.ts → foo.styles.test.ts + foo.test.ts
        if (stem.endsWith('.styles')) {
            const stylesTest = path.join(dir, `${stem}.test.ts`);
            if (existsSync(path.resolve(appDir, stylesTest)))
                testFiles.add(stylesTest);
            const componentStem = stem.replace(/\.styles$/, '');
            const componentTest = path.join(dir, `${componentStem}.test.ts`);
            if (existsSync(path.resolve(appDir, componentTest)))
                testFiles.add(componentTest);
        }
        // foo.utils.ts → foo.test.ts (util changes can affect the parent component's tests too)
        if (stem.endsWith('.utils')) {
            const componentStem = stem.replace(/\.utils$/, '');
            const componentTest = path.join(dir, `${componentStem}.test.ts`);
            if (existsSync(path.resolve(appDir, componentTest)))
                testFiles.add(componentTest);
        }
    }
    return [...testFiles];
}
