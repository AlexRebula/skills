// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { runQualityGate, overlayFiles } from './gate.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-gate-fixture-'));
  tempDirs.push(dir);
  return dir;
}

function writeFile(rootDir: string, relPath: string, contents = '') {
  const fullPath = path.join(rootDir, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}

function passingRunCommand() {
  return { passed: true, output: 'ok' };
}

function failingRunCommand() {
  return { passed: false, output: 'boom' };
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe('overlayFiles', () => {
  it('copies the given relative paths from source into target, creating subdirectories as needed', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/nested/file.ts', 'content');

    overlayFiles(source, target, ['src/nested/file.ts']);

    expect(readFileSync(path.join(target, 'src/nested/file.ts'), 'utf8')).toBe('content');
  });
});

describe('runQualityGate: staging', () => {
  it('stages the given files into a throwaway copy of targetDir before running the command', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new-file.ts', 'export const New = 1;');

    let sawStagedFile = false;
    const runCommand = vi.fn((dir: string) => {
      sawStagedFile = existsSync(path.join(dir, 'src/new-file.ts'));
      return passingRunCommand();
    });

    runQualityGate(source, target, ['src/new-file.ts'], 'echo test', { runCommand });

    expect(sawStagedFile).toBe(true);
  });

  it('never mutates the real source or target trees', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new-file.ts', 'export const New = 1;');
    writeFile(target, 'src/existing.ts', 'unchanged');

    runQualityGate(source, target, ['src/new-file.ts'], 'echo test', { runCommand: passingRunCommand });

    expect(existsSync(path.join(target, 'src/new-file.ts'))).toBe(false);
    expect(readFileSync(path.join(target, 'src/existing.ts'), 'utf8')).toBe('unchanged');
    expect(readFileSync(path.join(source, 'src/new-file.ts'), 'utf8')).toBe('export const New = 1;');
  });

  it('removes the staging directory after the command runs, pass or fail', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/file.ts', 'x');

    let stagingDirSeen = '';
    const runCommand = vi.fn((dir: string) => {
      stagingDirSeen = dir;
      return failingRunCommand();
    });

    runQualityGate(source, target, ['src/file.ts'], 'echo test', { runCommand });

    expect(stagingDirSeen).not.toBe('');
    expect(existsSync(stagingDirSeen)).toBe(false);
  });
});

describe('runQualityGate: command invocation', () => {
  it('passes the exact configured command string through to runCommand, unmodified', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/file.ts', 'x');
    const runCommand = vi.fn(passingRunCommand);

    runQualityGate(source, target, ['src/file.ts'], 'npm run my-custom-check', { runCommand });

    expect(runCommand).toHaveBeenCalledWith(expect.any(String), 'npm run my-custom-check');
  });

  it('returns passed: true and the command output when the command succeeds', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/file.ts', 'x');

    const result = runQualityGate(source, target, ['src/file.ts'], 'echo test', {
      runCommand: passingRunCommand,
    });

    expect(result).toEqual({ passed: true, output: 'ok' });
  });

  it('returns passed: false and the command output when the command fails', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/file.ts', 'x');

    const result = runQualityGate(source, target, ['src/file.ts'], 'echo test', {
      runCommand: failingRunCommand,
    });

    expect(result).toEqual({ passed: false, output: 'boom' });
  });
});

describe('runQualityGate: no files', () => {
  it('still runs the command against an unmodified staged copy when relPaths is empty', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(target, 'src/existing.ts', 'existing');
    const runCommand = vi.fn(passingRunCommand);

    const result = runQualityGate(source, target, [], 'echo test', { runCommand });

    expect(runCommand).toHaveBeenCalledTimes(1);
    expect(result.passed).toBe(true);
  });
});
