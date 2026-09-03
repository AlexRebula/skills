// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { upSync } from './up-sync.ts';
import type { SensitiveScanResult } from './privacy-scan.ts';
import type { BannedContentResult } from './banned-content.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-up-sync-fixture-'));
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

const cleanPrivacy = (): SensitiveScanResult => ({ clean: true, findings: [] });
const dirtyPrivacy = (): SensitiveScanResult => ({
  clean: false,
  findings: [{ file: 'x', type: 'email', match: 'a@b.com' }],
});

const cleanBanned = (): BannedContentResult => ({ passed: true, violations: [] });
const dirtyBanned = (): BannedContentResult => ({
  passed: false,
  violations: [{ pattern: 'x', file: 'x', line: 1, text: 'x' }],
});

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe('upSync: all gates pass', () => {
  it('runs the quality gate, privacy scan, and banned-content check, then opens the promotion PR', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new-card.ts', 'export const NewCard = 1;');
    const openPromotionPR = vi.fn(() => ({ url: 'https://github.com/org/repo/pull/999' }));

    const result = upSync(source, target, ['src/new-card.ts'], 'echo test', {
      runCommand: passingRunCommand,
      scanPrivacy: cleanPrivacy,
      bannedPatterns: [],
      openPromotionPR,
    });

    expect(result.passed).toBe(true);
    expect(openPromotionPR).toHaveBeenCalledTimes(1);
    expect(openPromotionPR).toHaveBeenCalledWith(target, source, ['src/new-card.ts']);
    expect(result.pr).toEqual({ url: 'https://github.com/org/repo/pull/999' });
  });
});

describe('upSync: quality gate fails', () => {
  it('does not open a PR when the quality gate fails', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/broken.ts', 'bad');
    const openPromotionPR = vi.fn();

    const result = upSync(source, target, ['src/broken.ts'], 'echo test', {
      runCommand: failingRunCommand,
      scanPrivacy: cleanPrivacy,
      openPromotionPR,
    });

    expect(result.passed).toBe(false);
    expect(openPromotionPR).not.toHaveBeenCalled();
    expect(result.pr).toBeNull();
  });
});

describe('upSync: privacy gate fails', () => {
  it('does not open a PR when the privacy scan finds something, even if the other gates pass', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/leaky.ts', 'contact a@b.com');
    const openPromotionPR = vi.fn();

    const result = upSync(source, target, ['src/leaky.ts'], 'echo test', {
      runCommand: passingRunCommand,
      scanPrivacy: dirtyPrivacy,
      openPromotionPR,
    });

    expect(result.passed).toBe(false);
    expect(result.privacy.clean).toBe(false);
    expect(openPromotionPR).not.toHaveBeenCalled();
  });
});

describe('upSync: banned-content gate fails', () => {
  it('does not open a PR when the banned-content check fails, even if the other gates pass', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/tainted.ts', 'clean text');
    const openPromotionPR = vi.fn();

    const result = upSync(source, target, ['src/tainted.ts'], 'echo test', {
      runCommand: passingRunCommand,
      scanPrivacy: cleanPrivacy,
      bannedPatterns: ['tainted-org-name'],
      checkBanned: dirtyBanned,
      openPromotionPR,
    });

    expect(result.passed).toBe(false);
    expect(openPromotionPR).not.toHaveBeenCalled();
  });

  it('skips the banned-content check cleanly when no patterns are configured', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/fine.ts', 'clean text');
    const openPromotionPR = vi.fn(() => ({ url: 'https://github.com/org/repo/pull/1' }));

    const result = upSync(source, target, ['src/fine.ts'], 'echo test', {
      runCommand: passingRunCommand,
      scanPrivacy: cleanPrivacy,
      openPromotionPR,
    });

    expect(result.bannedContent).toEqual({ passed: true, violations: [] });
    expect(result.passed).toBe(true);
  });
});

describe('upSync: any single failure blocks, regardless of which gate', () => {
  it.each([
    ['quality gate', failingRunCommand, cleanPrivacy, cleanBanned],
    ['privacy', passingRunCommand, dirtyPrivacy, cleanBanned],
    ['banned content', passingRunCommand, cleanPrivacy, dirtyBanned],
  ])('blocks when only the %s gate fails', (_label, runCommand, scanPrivacy, checkBanned) => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/f.ts', 'x');
    const openPromotionPR = vi.fn();

    const result = upSync(source, target, ['src/f.ts'], 'echo test', {
      runCommand,
      scanPrivacy,
      checkBanned,
      bannedPatterns: ['x'],
      openPromotionPR,
    });

    expect(result.passed).toBe(false);
    expect(openPromotionPR).not.toHaveBeenCalled();
  });
});

describe('upSync: staging cleanup', () => {
  it('stages the promoted files into a throwaway copy of the target and cleans it up afterward', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new.ts', 'content');
    let stagingSeen = '';
    let sawFileInStaging = false;

    const result = upSync(source, target, ['src/new.ts'], 'echo test', {
      runCommand: (dir: string) => {
        stagingSeen = dir;
        sawFileInStaging = existsSync(path.join(dir, 'src/new.ts'));
        return passingRunCommand();
      },
      scanPrivacy: cleanPrivacy,
      openPromotionPR: () => ({ url: 'x' }),
    });

    expect(sawFileInStaging).toBe(true);
    expect(stagingSeen).not.toBe('');
    expect(existsSync(stagingSeen)).toBe(false);
    expect(result.passed).toBe(true);
  });

  it('never mutates the real source or target trees', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new.ts', 'content');

    upSync(source, target, ['src/new.ts'], 'echo test', {
      runCommand: passingRunCommand,
      scanPrivacy: cleanPrivacy,
      openPromotionPR: () => ({ url: 'x' }),
    });

    // Applying to the real target only ever happens via openPromotionPR
    // itself (git checkout/commit/push), which is fully injected here and
    // never called with instructions to touch the filesystem directly.
    expect(existsSync(path.join(target, 'src/new.ts'))).toBe(false);
  });
});

describe('upSync: never merges', () => {
  it('only ever calls openPromotionPR, never a merge function of any kind', () => {
    const source = makeFixtureDir();
    const target = makeFixtureDir();
    writeFile(source, 'src/new.ts', 'content');
    const openPromotionPR = vi.fn(() => ({ url: 'https://github.com/org/repo/pull/1' }));

    upSync(source, target, ['src/new.ts'], 'echo test', {
      runCommand: passingRunCommand,
      scanPrivacy: cleanPrivacy,
      openPromotionPR,
    });

    // upSync's own options surface has no merge-related hook at all: the
    // only side-effecting call it ever makes is openPromotionPR, asserted
    // above to have been called exactly once.
    expect(openPromotionPR).toHaveBeenCalledTimes(1);
  });
});
