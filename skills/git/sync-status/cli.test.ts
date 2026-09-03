// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { printReport } from './cli.ts';
import { diffTrees } from '../../_shared/sync-core/diff.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-status-cli-fixture-'));
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

describe('sync-status printReport: against two real directories', () => {
  it('produces a readable report naming every added, removed, and changed file', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/removed.ts', 'gone from b');
    writeFile(a, 'src/shared.ts', 'v1');
    writeFile(b, 'src/shared.ts', 'v2');
    writeFile(b, 'src/added.ts', 'new in b');

    const result = diffTrees(a, b);
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport(a, b, result);
    const output = lines.join('\n');

    expect(output).toContain(a);
    expect(output).toContain(b);
    expect(output).toContain('src/removed.ts');
    expect(output).toContain('src/added.ts');
    expect(output).toContain('src/shared.ts');
    expect(output).toContain('Total drift: 3 file(s)');
    expect(output).toContain('nothing applied');
  });

  it('reports zero drift clearly when the two trees match', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/same.ts', 'identical');
    writeFile(b, 'src/same.ts', 'identical');

    const result = diffTrees(a, b);
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport(a, b, result);

    expect(lines.join('\n')).toContain('Total drift: 0 file(s)');
  });
});
