/**
 * gate.ts: quality-gate runner.
 *
 * Stages a given list of files (read from sourceDir) into a throwaway copy
 * of targetDir, then runs the caller's single configured command string
 * against that staged copy. Never mutates sourceDir or the real targetDir.
 * The command is whatever the user configured (`.sync-config.json`'s
 * qualityGateCommand), not a hardcoded, toolchain-specific pipeline.
 */

import { mkdtempSync, mkdirSync, copyFileSync, rmSync, cpSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { execSync } from 'child_process';

export interface RunCommandResult {
  passed: boolean;
  output?: string;
}

export type RunCommandFn = (dir: string, command: string) => RunCommandResult;

export interface QualityGateOptions {
  runCommand?: RunCommandFn;
  makeStagingDir?: (targetDir: string) => string;
}

/** Copies the given relative paths from sourceDir into targetDir. */
export function overlayFiles(sourceDir: string, targetDir: string, relPaths: string[]): void {
  for (const relPath of relPaths) {
    const from = path.join(sourceDir, relPath);
    const to = path.join(targetDir, relPath);
    mkdirSync(path.dirname(to), { recursive: true });
    copyFileSync(from, to);
  }
}

function defaultMakeStagingDir(targetDir: string): string {
  const staging = mkdtempSync(path.join(tmpdir(), 'sync-core-gate-staging-'));
  // Full copy, including real dependencies (e.g. node_modules), so the gate
  // command doesn't need a fresh install; staging is thrown away after.
  cpSync(targetDir, staging, { recursive: true, dereference: false });
  return staging;
}

function defaultRunCommand(dir: string, command: string): RunCommandResult {
  try {
    const output = execSync(command, { cwd: dir, stdio: 'pipe' }).toString();
    return { passed: true, output };
  } catch (error) {
    const err = error as { stdout?: Buffer; stderr?: Buffer; message?: string };
    const output = [err.stdout?.toString(), err.stderr?.toString()].filter(Boolean).join('\n') || err.message;
    return { passed: false, output };
  }
}

/**
 * Stages `relPaths` (read from sourceDir) into a throwaway copy of
 * targetDir, then runs `command` in that copy. Real subprocess execution
 * by default; tests inject a fake `runCommand`. Never mutates sourceDir or
 * the real targetDir.
 */
export function runQualityGate(
  sourceDir: string,
  targetDir: string,
  relPaths: string[],
  command: string,
  options: QualityGateOptions = {}
): RunCommandResult {
  const runCommand = options.runCommand ?? defaultRunCommand;
  const makeStagingDir = options.makeStagingDir ?? defaultMakeStagingDir;

  const stagingDir = makeStagingDir(targetDir);
  try {
    overlayFiles(sourceDir, stagingDir, relPaths);
    return runCommand(stagingDir, command);
  } finally {
    rmSync(stagingDir, { recursive: true, force: true });
  }
}
