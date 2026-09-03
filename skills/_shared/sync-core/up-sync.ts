/**
 * up-sync.ts: promotes a chosen file list from sourceDir into targetDir via
 * a reviewed PR, gated by the configured quality-gate command, the
 * built-in privacy scan, and (if configured) the banned-content check.
 *
 * Opens a real PR via the user's own authenticated `gh` session only if
 * every configured gate passes; a single failing gate blocks the PR
 * entirely and leaves targetDir untouched. Even on a pass, the promotion
 * itself happens in a throwaway clone, never targetDir's own working
 * directory: its checked-out branch and any uncommitted changes are left
 * exactly as they were. Never merges anything: opening the PR is as far
 * as this goes.
 */

import { mkdtempSync, cpSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { execFileSync } from 'child_process';

import { runQualityGate, overlayFiles, type QualityGateOptions, type RunCommandResult } from './gate.ts';
import { scanForSensitiveContent, type SensitiveScanResult } from './privacy-scan.ts';
import { checkBannedContent, type BannedContentResult } from './banned-content.ts';

export interface PromotionPRResult {
  url: string;
}

/**
 * Performs the branch/commit/push/PR sequence in a throwaway clone of
 * targetDir, never touching the user's real checkout (its working
 * directory, current branch, and any uncommitted changes are left exactly
 * as they were). Requires targetDir to have `origin` configured, same as
 * a normal `git push` from that repo would.
 */
function defaultOpenPromotionPR(targetDir: string, sourceDir: string, files: string[]): PromotionPRResult {
  const clone = mkdtempSync(path.join(tmpdir(), 'sync-core-promotion-clone-'));
  try {
    cpSync(targetDir, clone, { recursive: true, dereference: false });

    const branch = `promote/sync-up-${Date.now()}`;
    execFileSync('git', ['checkout', '-b', branch], { cwd: clone });
    overlayFiles(sourceDir, clone, files);
    execFileSync('git', ['add', ...files], { cwd: clone });
    execFileSync('git', ['commit', '-m', `chore: promote ${files.length} file(s) via sync-up`], {
      cwd: clone,
    });
    execFileSync('git', ['push', '-u', 'origin', branch], { cwd: clone });
    const output = execFileSync(
      'gh',
      [
        'pr',
        'create',
        '--title',
        `chore: promote ${files.length} file(s) via sync-up`,
        '--body',
        'Promoted via sync-up. Quality gate, privacy scan, and banned-content check all passed before this PR was opened.',
      ],
      { cwd: clone }
    );
    return { url: output.toString().trim() };
  } finally {
    rmSync(clone, { recursive: true, force: true });
  }
}

export interface UpSyncOptions extends QualityGateOptions {
  scanPrivacy?: (sourceDir: string, files: string[]) => SensitiveScanResult;
  bannedPatterns?: string[];
  checkBanned?: (sourceDir: string, files: string[], patterns: string[]) => BannedContentResult;
  openPromotionPR?: (targetDir: string, sourceDir: string, files: string[]) => PromotionPRResult;
}

export interface UpSyncResult {
  passed: boolean;
  gate: RunCommandResult;
  privacy: SensitiveScanResult;
  bannedContent: BannedContentResult;
  pr: PromotionPRResult | null;
}

/**
 * @param sourceDir the working tree the promoted files come from
 * @param targetDir a real checkout of the repo the promotion PR opens against
 * @param files     relative paths, already chosen, ready to promote
 * @param command   the user's single configured quality-gate command
 */
export function upSync(
  sourceDir: string,
  targetDir: string,
  files: string[],
  command: string,
  options: UpSyncOptions = {}
): UpSyncResult {
  const scanPrivacy = options.scanPrivacy ?? scanForSensitiveContent;
  const checkBanned = options.checkBanned ?? checkBannedContent;
  const bannedPatterns = options.bannedPatterns ?? [];
  const openPromotionPR = options.openPromotionPR ?? defaultOpenPromotionPR;

  const privacy = scanPrivacy(sourceDir, files);
  const bannedContent = checkBanned(sourceDir, files, bannedPatterns);
  const gate = runQualityGate(sourceDir, targetDir, files, command, options);

  const passed = gate.passed && privacy.clean && bannedContent.passed;
  if (!passed) {
    return { passed: false, gate, privacy, bannedContent, pr: null };
  }

  const pr = openPromotionPR(targetDir, sourceDir, files);
  return { passed: true, gate, privacy, bannedContent, pr };
}
