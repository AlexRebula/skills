// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { printReport } from './cli.ts';
import { downSync } from '../../_shared/sync-core/down-sync.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-down-cli-fixture-'));
  tempDirs.push(dir);
  return dir;
}

function writeFile(rootDir: string, relPath: string, contents = '') {
  const fullPath = path.join(rootDir, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
  vi.restoreAllMocks();
});

describe('sync-down printReport', () => {
  it('reports no drift clearly when nothing is incoming', () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport('/source', '/target', { incoming: [], applied: [], passed: true, gate: null });

    expect(lines.join('\n')).toContain('No incoming drift');
  });

  it('reports every incoming file and confirms nothing is committed on a passing gate', () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport('/source', '/target', {
      incoming: ['src/a.ts', 'src/b.ts'],
      applied: ['src/a.ts', 'src/b.ts'],
      passed: true,
      gate: { passed: true, output: 'ok' },
    });
    const output = lines.join('\n');

    expect(output).toContain('src/a.ts');
    expect(output).toContain('src/b.ts');
    expect(output).toContain('Quality gate passed');
    expect(output).toContain('Nothing committed');
  });

  it('reports gate failure and that the working tree was left untouched', () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport('/source', '/target', {
      incoming: ['src/broken.ts'],
      applied: [],
      passed: false,
      gate: { passed: false, output: 'lint failed' },
    });
    const output = lines.join('\n');

    expect(output).toContain('FAILED');
    expect(output).toContain('left untouched');
    expect(output).toContain('lint failed');
  });
});

describe('sync-down against two real directories with a real configured gate command', () => {
  it('pulls incoming changes into the target when the real gate command passes', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new-file.ts', 'export const New = 1;');

    const result = downSync(source, target, 'true');

    expect(result.passed).toBe(true);
    expect(result.applied).toEqual(['src/new-file.ts']);
    expect(readFileSync(path.join(target, 'src/new-file.ts'), 'utf8')).toBe('export const New = 1;');
  });

  it('leaves the target untouched when the real gate command fails', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new-file.ts', 'export const New = 1;');

    const result = downSync(source, target, 'false');

    expect(result.passed).toBe(false);
    expect(result.applied).toEqual([]);
    expect(existsSync(path.join(target, 'src/new-file.ts'))).toBe(false);
  });
});
