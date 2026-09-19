import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
// @ts-expect-error — smart-gate-core.js is a synced build artifact (see its
// own header comment); it has no .d.ts, so import it untyped from JS.
import { loadYalcLinkedPackages, isLikelyYalcFailure } from './smart-gate-core.js';

let root: string;

function writeYalcLock(packages: Record<string, unknown>) {
  writeFileSync(join(root, 'yalc.lock'), JSON.stringify({ version: 'v1', packages }));
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'yalc-lock-'));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('loadYalcLinkedPackages', () => {
  it('returns the package names listed in yalc.lock', () => {
    writeYalcLock({ '@littlebranches/giselle-mui': { signature: 'abc', file: true } });
    expect(loadYalcLinkedPackages([root])).toEqual(['@littlebranches/giselle-mui']);
  });

  it('returns an empty array when no yalc.lock exists', () => {
    expect(loadYalcLinkedPackages([root])).toEqual([]);
  });

  it('returns an empty array for a directory that does not exist', () => {
    expect(loadYalcLinkedPackages([join(root, 'nonexistent')])).toEqual([]);
  });

  it('ignores a malformed yalc.lock rather than throwing', () => {
    writeFileSync(join(root, 'yalc.lock'), 'not valid json');
    expect(() => loadYalcLinkedPackages([root])).not.toThrow();
    expect(loadYalcLinkedPackages([root])).toEqual([]);
  });

  it('merges package names across multiple directories', () => {
    const otherRoot = mkdtempSync(join(tmpdir(), 'yalc-lock-other-'));
    try {
      writeYalcLock({ '@littlebranches/giselle-mui': { file: true } });
      writeFileSync(
        join(otherRoot, 'yalc.lock'),
        JSON.stringify({ version: 'v1', packages: { '@littlebranches/giselle-ui': { file: true } } }),
      );
      expect(loadYalcLinkedPackages([root, otherRoot]).sort()).toEqual([
        '@littlebranches/giselle-mui',
        '@littlebranches/giselle-ui',
      ]);
    } finally {
      rmSync(otherRoot, { recursive: true, force: true });
    }
  });
});

describe('isLikelyYalcFailure', () => {
  it('matches when the output mentions a yalc-linked package name', () => {
    const output =
      'src/theme/Root.tsx(2,32): error TS2305: Module \'"@littlebranches/giselle-mui"\' has no exported member \'Foo\'.';
    expect(isLikelyYalcFailure(output, ['@littlebranches/giselle-mui'])).toBe(true);
  });

  it('does not match unrelated failure output', () => {
    const output = 'TypeError: Cannot read properties of undefined (reading \'foo\')';
    expect(isLikelyYalcFailure(output, ['@littlebranches/giselle-mui'])).toBe(false);
  });

  it('returns false when there are no yalc-linked packages', () => {
    expect(isLikelyYalcFailure('anything at all', [])).toBe(false);
  });

  it('returns false for empty output', () => {
    expect(isLikelyYalcFailure('', ['@littlebranches/giselle-mui'])).toBe(false);
  });

  it('is not fooled by exact bundler wording alone — the package name still has to be present', () => {
    const output = 'Error: Could not resolve "react-hook-form" imported by "some-other-package"';
    expect(isLikelyYalcFailure(output, ['@littlebranches/giselle-mui'])).toBe(false);
  });
});
