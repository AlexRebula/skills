// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { downSync } from './down-sync.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-down-sync-fixture-'));
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

describe('downSync: no drift', () => {
  it('applies nothing and never runs the gate when there is no incoming drift', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/shared.ts', 'same');
    writeFile(target, 'src/shared.ts', 'same');
    const runCommand = vi.fn(passingRunCommand);

    const result = downSync(source, target, 'echo test', { runCommand });

    expect(result.incoming).toEqual([]);
    expect(result.applied).toEqual([]);
    expect(result.passed).toBe(true);
    expect(runCommand).not.toHaveBeenCalled();
  });
});

describe('downSync: gate passes', () => {
  it('stages incoming files, runs the gate against the staging copy, and applies to the real target on success', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/shared.ts', 'same');
    writeFile(target, 'src/shared.ts', 'same');
    writeFile(source, 'src/new-component.ts', 'export const New = 1;');

    let sawStagedFileDuringGate = false;
    let sawRealTargetUnmodifiedDuringGate = false;
    const runCommand = vi.fn((dir: string) => {
      sawStagedFileDuringGate = existsSync(path.join(dir, 'src/new-component.ts'));
      sawRealTargetUnmodifiedDuringGate = !existsSync(path.join(target, 'src/new-component.ts'));
      return passingRunCommand();
    });

    const result = downSync(source, target, 'echo test', { runCommand });

    expect(result.incoming).toEqual(['src/new-component.ts']);
    expect(runCommand).toHaveBeenCalledTimes(1);
    expect(sawStagedFileDuringGate).toBe(true);
    expect(sawRealTargetUnmodifiedDuringGate).toBe(true);
    expect(result.passed).toBe(true);
    expect(result.applied).toEqual(['src/new-component.ts']);
    expect(readFileSync(path.join(target, 'src/new-component.ts'), 'utf8')).toBe('export const New = 1;');
  });

  it('also applies changed (not just new) files on a passing gate', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/shared.ts', 'v2');
    writeFile(target, 'src/shared.ts', 'v1');

    const result = downSync(source, target, 'echo test', { runCommand: passingRunCommand });

    expect(result.incoming).toEqual(['src/shared.ts']);
    expect(readFileSync(path.join(target, 'src/shared.ts'), 'utf8')).toBe('v2');
  });
});

describe('downSync: gate fails', () => {
  it('does not touch the real target tree when the gate fails', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/broken.ts', 'export const Broken = ;');

    const result = downSync(source, target, 'echo test', { runCommand: failingRunCommand });

    expect(result.incoming).toEqual(['src/broken.ts']);
    expect(result.passed).toBe(false);
    expect(result.applied).toEqual([]);
    expect(existsSync(path.join(target, 'src/broken.ts'))).toBe(false);
  });

  it('never applies any file without the gate passing first, even for a mix of ok and bad files', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/ok.ts', 'fine');
    writeFile(source, 'src/broken.ts', 'export const Broken = ;');

    const result = downSync(source, target, 'echo test', { runCommand: failingRunCommand });

    expect(result.applied).toEqual([]);
    expect(existsSync(path.join(target, 'src/ok.ts'))).toBe(false);
    expect(existsSync(path.join(target, 'src/broken.ts'))).toBe(false);
  });
});

describe('downSync: never commits', () => {
  it('never creates a .git directory in the target, on a passing or a failing gate', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new.ts', 'new');

    downSync(source, target, 'echo test', { runCommand: passingRunCommand });
    expect(existsSync(path.join(target, '.git'))).toBe(false);

    writeFile(source, 'src/another.ts', 'another');
    downSync(source, target, 'echo test', { runCommand: failingRunCommand });
    expect(existsSync(path.join(target, '.git'))).toBe(false);
  });
});
