/**
 * down-sync.ts: pulls incoming changes from sourceDir into targetDir,
 * gated by the configured quality-gate command.
 *
 * Diffs the two trees, stages the incoming files (additions plus changes)
 * into a throwaway copy of targetDir via runQualityGate, and only on a
 * passing gate copies them into the real targetDir. A failing gate leaves
 * targetDir completely untouched. Never commits anything, under any
 * outcome: landing in the working tree is as far as this goes.
 */

import { diffTrees, type DiffTreesOptions } from './diff.ts';
import { runQualityGate, overlayFiles, type QualityGateOptions, type RunCommandResult } from './gate.ts';

export interface DownSyncOptions extends QualityGateOptions {
  diffOptions?: DiffTreesOptions;
}

export interface DownSyncResult {
  incoming: string[];
  applied: string[];
  passed: boolean;
  gate: RunCommandResult | null;
}

/**
 * @param sourceDir the "from" tree, e.g. a fresh checkout of production
 * @param targetDir the real working tree changes land in on a passing gate
 * @param command   the user's single configured quality-gate command
 */
export function downSync(
  sourceDir: string,
  targetDir: string,
  command: string,
  options: DownSyncOptions = {}
): DownSyncResult {
  const diff = diffTrees(sourceDir, targetDir, options.diffOptions);
  const incoming = [...diff.onlyInA, ...diff.changed].sort();

  if (incoming.length === 0) {
    return { incoming: [], applied: [], passed: true, gate: null };
  }

  const gate = runQualityGate(sourceDir, targetDir, incoming, command, options);

  if (!gate.passed) {
    return { incoming, applied: [], passed: false, gate };
  }

  overlayFiles(sourceDir, targetDir, incoming);
  return { incoming, applied: incoming, passed: true, gate };
}
