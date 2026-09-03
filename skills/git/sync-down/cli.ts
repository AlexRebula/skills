#!/usr/bin/env node
/**
 * sync-down CLI: pulls incoming changes from the configured source repo
 * into the configured target repo (bootstrapping config interactively on
 * first run), gated by the configured quality-gate command. Never commits.
 *
 * Usage: node skills/git/sync-down/cli.ts [projectRoot]
 */

import path from 'path';
import { fileURLToPath } from 'url';

import { bootstrapConfig } from '../../_shared/sync-core/config.ts';
import { downSync, type DownSyncResult } from '../../_shared/sync-core/down-sync.ts';

const __filename = fileURLToPath(import.meta.url);

export function printReport(sourceDir: string, targetDir: string, result: DownSyncResult): void {
  console.log(`Down-syncing:\n  from: ${sourceDir}\n  into: ${targetDir}\n`);

  if (result.incoming.length === 0) {
    console.log('No incoming drift. Nothing to sync.');
    return;
  }

  console.log(`Incoming: ${result.incoming.length}`);
  for (const p of result.incoming) console.log(`  - ${p}`);

  if (!result.passed) {
    console.log('\nQuality gate FAILED. Working tree left untouched.');
    if (result.gate?.output) console.log(result.gate.output);
    return;
  }

  console.log(`\nQuality gate passed. Applied ${result.applied.length} file(s) to the working tree.`);
  console.log('Nothing committed: review with `git status`/`git diff` and commit yourself when ready.');
}

async function main() {
  const projectRoot = process.argv[2] ?? process.cwd();
  const config = await bootstrapConfig(projectRoot);
  const result = downSync(config.repoA, config.repoB, config.qualityGateCommand);
  printReport(config.repoA, config.repoB, result);
  if (!result.passed) process.exitCode = 1;
}

if (path.resolve(process.argv[1] ?? '') === __filename) {
  main();
}
