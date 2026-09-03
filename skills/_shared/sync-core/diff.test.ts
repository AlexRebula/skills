// @vitest-environment node
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, statSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { diffTrees, DEFAULT_IGNORE } from './diff.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-diff-fixture-'));
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
});

describe('diffTrees: added and removed files', () => {
  it('reports a file present in B but not A as onlyInB', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/existing.ts', 'shared');
    writeFile(b, 'src/existing.ts', 'shared');
    writeFile(b, 'src/new-file.ts', 'new');

    const result = diffTrees(a, b);

    expect(result.onlyInB).toEqual(['src/new-file.ts']);
    expect(result.onlyInA).toEqual([]);
    expect(result.changed).toEqual([]);
  });

  it('reports a file present in A but not B as onlyInA', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/existing.ts', 'shared');
    writeFile(a, 'src/gone.ts', 'gone');
    writeFile(b, 'src/existing.ts', 'shared');

    const result = diffTrees(a, b);

    expect(result.onlyInA).toEqual(['src/gone.ts']);
    expect(result.onlyInB).toEqual([]);
  });
});

describe('diffTrees: changed files', () => {
  it('reports a file present in both trees with different content as changed', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/component.ts', 'export const A = 1;');
    writeFile(b, 'src/component.ts', 'export const A = 2;');

    const result = diffTrees(a, b);

    expect(result.changed).toEqual(['src/component.ts']);
    expect(result.onlyInA).toEqual([]);
    expect(result.onlyInB).toEqual([]);
  });

  it('does not report a file with byte-identical content in both trees', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/component.ts', 'export const A = 1;');
    writeFile(b, 'src/component.ts', 'export const A = 1;');

    const result = diffTrees(a, b);

    expect(result.changed).toEqual([]);
    expect(result.onlyInA).toEqual([]);
    expect(result.onlyInB).toEqual([]);
  });
});

describe('diffTrees: nested directories', () => {
  it('walks nested subdirectories on both sides and reports relative paths', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/components/card/card.ts', 'card v1');
    writeFile(b, 'src/components/card/card.ts', 'card v2');
    writeFile(b, 'src/components/card/card.styles.ts', 'styles');

    const result = diffTrees(a, b);

    expect(result.changed).toEqual(['src/components/card/card.ts']);
    expect(result.onlyInB).toEqual(['src/components/card/card.styles.ts']);
  });
});

describe('diffTrees: ignored paths', () => {
  it('ignores node_modules, .git, dist, build, and coverage by default', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'node_modules/pkg/index.js', 'a');
    writeFile(b, 'node_modules/pkg/index.js', 'b');
    writeFile(a, '.git/HEAD', 'ref: refs/heads/main');
    writeFile(b, 'dist/index.js', 'built');
    writeFile(b, 'build/index.js', 'built');
    writeFile(a, 'coverage/lcov-report/index.html', '<html></html>');
    writeFile(a, 'src/real.ts', 'x');
    writeFile(b, 'src/real.ts', 'x');

    const result = diffTrees(a, b);

    expect(result.onlyInA).toEqual([]);
    expect(result.onlyInB).toEqual([]);
    expect(result.changed).toEqual([]);
  });

  it('accepts an extra ignore list on top of the defaults', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/real.ts', 'x');
    writeFile(b, 'src/real.ts', 'x');
    writeFile(b, 'tmp/scratch.txt', 'scratch data');

    const result = diffTrees(a, b, { ignore: [...DEFAULT_IGNORE, 'tmp'] });

    expect(result.onlyInB).toEqual([]);
  });
});

describe('diffTrees: never mutates either tree', () => {
  it('leaves both trees byte-for-byte unchanged after diffing', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'src/only-a.ts', 'only in a');
    writeFile(b, 'src/only-b.ts', 'only in b');
    writeFile(a, 'src/shared.ts', 'v1');
    writeFile(b, 'src/shared.ts', 'v2');

    diffTrees(a, b);

    expect(readFileSync(path.join(a, 'src/only-a.ts'), 'utf8')).toBe('only in a');
    expect(readFileSync(path.join(b, 'src/only-b.ts'), 'utf8')).toBe('only in b');
    expect(readFileSync(path.join(a, 'src/shared.ts'), 'utf8')).toBe('v1');
    expect(readFileSync(path.join(b, 'src/shared.ts'), 'utf8')).toBe('v2');
    expect(statSync(a).isDirectory()).toBe(true);
    expect(statSync(b).isDirectory()).toBe(true);
  });
});

describe('diffTrees: no git dependency', () => {
  it('works on plain directories with no .git present anywhere', () => {
    const a = makeFixtureDir();
    const b = makeFixtureDir();
    writeFile(a, 'plain.txt', 'hello');
    writeFile(b, 'plain.txt', 'hello world');

    const result = diffTrees(a, b);

    expect(result.changed).toEqual(['plain.txt']);
  });
});
