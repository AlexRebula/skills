#!/usr/bin/env node
/**
 * sync-status CLI: reports drift between the two repos configured in
 * .sync-config.json (bootstrapping that config interactively on first run).
 * Read-only: never writes to either configured repo.
 *
 * Usage: node skills/git/sync-status/cli.ts [projectRoot]
 */

import path from 'path';
import { fileURLToPath } from 'url';

import { bootstrapConfig } from '../../_shared/sync-core/config.ts';
import { diffTrees, type DiffTreesResult } from '../../_shared/sync-core/diff.ts';

const __filename = fileURLToPath(import.meta.url);

export function printReport(repoA: string, repoB: string, result: DiffTreesResult): void {
  console.log(`Comparing:\n  A: ${repoA}\n  B: ${repoB}\n`);

  console.log(`Only in A (missing from B): ${result.onlyInA.length}`);
  for (const p of result.onlyInA) console.log(`  - ${p}`);

  console.log(`\nOnly in B (new in B, not in A): ${result.onlyInB.length}`);
  for (const p of result.onlyInB) console.log(`  + ${p}`);

  console.log(`\nChanged (present in both, content differs): ${result.changed.length}`);
  for (const p of result.changed) console.log(`  ~ ${p}`);

  const total = result.onlyInA.length + result.onlyInB.length + result.changed.length;
  console.log(`\nTotal drift: ${total} file(s). Report only, nothing applied.`);
}

async function main() {
  const projectRoot = process.argv[2] ?? process.cwd();
  const config = await bootstrapConfig(projectRoot);
  const result = diffTrees(config.repoA, config.repoB);
  printReport(config.repoA, config.repoB, result);
}

if (path.resolve(process.argv[1] ?? '') === __filename) {
  main();
}
