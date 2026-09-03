#!/usr/bin/env node
/**
 * sync-up CLI: promotes a chosen file list from the configured working
 * repo into the configured target repo via a reviewed PR (bootstrapping
 * config interactively on first run), gated by the quality-gate command,
 * the built-in privacy scan, and (if configured) the banned-content check.
 * Never merges.
 *
 * Usage: node skills/git/sync-up/cli.ts <file1> [file2 ...]
 */

import path from 'path';
import { fileURLToPath } from 'url';

import { bootstrapConfig, ensureGitignoreEntry } from '../../_shared/sync-core/config.ts';
import { loadBannedPatterns, BANNED_PATTERNS_FILENAME } from '../../_shared/sync-core/banned-content.ts';
import { upSync, type UpSyncResult } from '../../_shared/sync-core/up-sync.ts';

const __filename = fileURLToPath(import.meta.url);

export function printReport(
  sourceDir: string,
  targetDir: string,
  files: string[],
  result: UpSyncResult
): void {
  console.log(`Promoting:\n  from: ${sourceDir}\n  into: ${targetDir}\n`);

  console.log(`Files: ${files.length}`);
  for (const f of files) console.log(`  - ${f}`);

  console.log(`\nQuality gate: ${result.gate.passed ? 'PASS' : 'FAIL'}`);

  const privacySummary = result.privacy.clean ? 'CLEAN' : `FOUND ${result.privacy.findings.length} issue(s)`;
  console.log(`Privacy scan: ${privacySummary}`);
  for (const f of result.privacy.findings) console.log(`  - ${f.type} in ${f.file}: ${f.match}`);

  const bannedSummary = result.bannedContent.passed
    ? 'PASS'
    : `FOUND ${result.bannedContent.violations.length} violation(s)`;
  console.log(`Banned-content check: ${bannedSummary}`);
  for (const v of result.bannedContent.violations) console.log(`  - "${v.pattern}" in ${v.file}:${v.line}`);

  if (!result.passed) {
    console.log('\nOne or more gates failed. No PR opened, target repo left untouched.');
    return;
  }

  console.log(`\nAll gates passed. Promotion PR opened: ${result.pr?.url}`);
  console.log('Nothing merged: review and merge the PR yourself when ready.');
}

async function main() {
  const projectRoot = process.cwd();
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error('Usage: node skills/git/sync-up/cli.ts <file1> [file2 ...]');
    process.exit(1);
  }

  const config = await bootstrapConfig(projectRoot);
  const bannedPatterns = loadBannedPatterns(projectRoot);
  if (bannedPatterns.length > 0) {
    ensureGitignoreEntry(projectRoot, BANNED_PATTERNS_FILENAME);
  }

  // Promotes FROM the working repo (repoB) TO the target repo (repoA):
  // the reverse direction of sync-down, which pulls repoA into repoB.
  const result = upSync(config.repoB, config.repoA, files, config.qualityGateCommand, { bannedPatterns });
  printReport(config.repoB, config.repoA, files, result);
  if (!result.passed) process.exitCode = 1;
}

if (path.resolve(process.argv[1] ?? '') === __filename) {
  main();
}
