// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { printReport } from './cli.ts';
import { upSync } from '../../_shared/sync-core/up-sync.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-up-cli-fixture-'));
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

describe('sync-up printReport', () => {
  it('reports every gate result and the PR url on a full pass', () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport('/source', '/target', ['src/a.ts'], {
      passed: true,
      gate: { passed: true, output: 'ok' },
      privacy: { clean: true, findings: [] },
      bannedContent: { passed: true, violations: [] },
      pr: { url: 'https://github.com/org/repo/pull/1' },
    });
    const output = lines.join('\n');

    expect(output).toContain('src/a.ts');
    expect(output).toContain('Quality gate: PASS');
    expect(output).toContain('Privacy scan: CLEAN');
    expect(output).toContain('Banned-content check: PASS');
    expect(output).toContain('https://github.com/org/repo/pull/1');
    expect(output).toContain('Nothing merged');
  });

  it('reports which gate failed and that nothing was opened or touched', () => {
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: string) => {
      lines.push(line);
    });

    printReport('/source', '/target', ['src/leaky.ts'], {
      passed: false,
      gate: { passed: true, output: 'ok' },
      privacy: { clean: false, findings: [{ file: 'src/leaky.ts', type: 'email', match: 'a@b.com' }] },
      bannedContent: { passed: true, violations: [] },
      pr: null,
    });
    const output = lines.join('\n');

    expect(output).toContain('FOUND 1 issue(s)');
    expect(output).toContain('a@b.com');
    expect(output).toContain('No PR opened');
    expect(output).toContain('untouched');
  });
});

describe('sync-up against two real directories with a real configured gate command', () => {
  it('promotes and opens a PR (faked) when every gate passes for real', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new-component.ts', 'export const New = 1;');
    const openPromotionPR = vi.fn(() => ({ url: 'https://github.com/org/repo/pull/42' }));

    const result = upSync(source, target, ['src/new-component.ts'], 'true', { openPromotionPR });

    expect(result.passed).toBe(true);
    expect(result.gate.passed).toBe(true);
    expect(result.privacy.clean).toBe(true);
    expect(openPromotionPR).toHaveBeenCalledWith(target, source, ['src/new-component.ts']);
    expect(result.pr).toEqual({ url: 'https://github.com/org/repo/pull/42' });
  });

  it('blocks the promotion for real when the privacy scan finds a real email address', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/leaky.ts', 'Contact jane.doe@personalmail.com for access.');
    const openPromotionPR = vi.fn();

    const result = upSync(source, target, ['src/leaky.ts'], 'true', { openPromotionPR });

    expect(result.passed).toBe(false);
    expect(result.privacy.clean).toBe(false);
    expect(openPromotionPR).not.toHaveBeenCalled();
  });

  it('blocks the promotion for real when the real gate command fails', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/broken.ts', 'export const Broken = 1;');
    const openPromotionPR = vi.fn();

    const result = upSync(source, target, ['src/broken.ts'], 'false', { openPromotionPR });

    expect(result.passed).toBe(false);
    expect(openPromotionPR).not.toHaveBeenCalled();
  });
});
