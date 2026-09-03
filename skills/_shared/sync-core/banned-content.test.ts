// @vitest-environment node
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { loadBannedPatterns, checkBannedContent, BANNED_PATTERNS_FILENAME } from './banned-content.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-banned-content-fixture-'));
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

describe('loadBannedPatterns', () => {
  it('returns an empty list when no local pattern file exists', () => {
    const dir = makeFixtureDir();

    expect(loadBannedPatterns(dir)).toEqual([]);
  });

  it('loads one pattern per line', () => {
    const dir = makeFixtureDir();
    writeFile(dir, BANNED_PATTERNS_FILENAME, 'internal-codename\nAcme-Corp-Confidential\n');

    expect(loadBannedPatterns(dir)).toEqual(['internal-codename', 'Acme-Corp-Confidential']);
  });

  it('skips blank lines and #-comment lines', () => {
    const dir = makeFixtureDir();
    writeFile(
      dir,
      BANNED_PATTERNS_FILENAME,
      '# One pattern per line\n\ninternal-codename\n  \n# another comment\nsecond-pattern\n'
    );

    expect(loadBannedPatterns(dir)).toEqual(['internal-codename', 'second-pattern']);
  });
});

describe('checkBannedContent: no patterns', () => {
  it('passes cleanly with no violations when the pattern list is empty', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'README.md', 'anything at all');

    const result = checkBannedContent(dir, ['README.md'], []);

    expect(result).toEqual({ passed: true, violations: [] });
  });
});

describe('checkBannedContent: with patterns', () => {
  it('flags a file containing a banned pattern, with file, line, and matched text', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'README.md', 'first line\nmentions internal-codename here\nlast line');

    const result = checkBannedContent(dir, ['README.md'], ['internal-codename']);

    expect(result.passed).toBe(false);
    expect(result.violations).toEqual([
      { pattern: 'internal-codename', file: 'README.md', line: 2, text: 'mentions internal-codename here' },
    ]);
  });

  it('passes cleanly when no configured pattern appears anywhere', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'README.md', 'nothing sensitive here');

    const result = checkBannedContent(dir, ['README.md'], ['internal-codename']);

    expect(result).toEqual({ passed: true, violations: [] });
  });

  it('checks every configured pattern against every given file', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'a.md', 'contains pattern-one');
    writeFile(dir, 'b.md', 'contains pattern-two');

    const result = checkBannedContent(dir, ['a.md', 'b.md'], ['pattern-one', 'pattern-two']);

    expect(result.passed).toBe(false);
    expect(result.violations).toHaveLength(2);
  });
});

describe('checkBannedContent: unreadable files', () => {
  it('skips a file that does not exist rather than throwing', () => {
    const dir = makeFixtureDir();

    expect(() => checkBannedContent(dir, ['does-not-exist.md'], ['x'])).not.toThrow();
    expect(checkBannedContent(dir, ['does-not-exist.md'], ['x'])).toEqual({ passed: true, violations: [] });
  });
});

describe('checkBannedContent: never modifies content', () => {
  it('leaves the scanned file byte-for-byte unchanged', () => {
    const dir = makeFixtureDir();
    const original = 'mentions internal-codename here';
    writeFile(dir, 'README.md', original);

    checkBannedContent(dir, ['README.md'], ['internal-codename']);

    expect(readFileSync(path.join(dir, 'README.md'), 'utf8')).toBe(original);
  });
});
