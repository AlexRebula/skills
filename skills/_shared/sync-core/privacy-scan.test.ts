// @vitest-environment node
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { scanForSensitiveContent } from './privacy-scan.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeFixtureDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-privacy-scan-fixture-'));
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

describe('scanForSensitiveContent: email addresses', () => {
  it('flags a real-looking email address', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'README.md', 'Contact jane.doe@personalmail.com for details.');

    const result = scanForSensitiveContent(dir, ['README.md']);

    expect(result.clean).toBe(false);
    expect(result.findings).toContainEqual({
      file: 'README.md',
      type: 'email',
      match: 'jane.doe@personalmail.com',
    });
  });

  it('does not flag placeholder or example addresses on the allowlist', () => {
    const dir = makeFixtureDir();
    writeFile(
      dir,
      'README.md',
      'Use git@github.com to clone, or a placeholder like someone@example.com or user.name@example.org, or a GitHub noreply like id+user@users.noreply.github.com.'
    );

    const result = scanForSensitiveContent(dir, ['README.md']);

    expect(result.clean).toBe(true);
  });
});

describe('scanForSensitiveContent: phone numbers', () => {
  it('flags a US-style phone number', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'notes.md', 'Call me at (415) 555-2671 tomorrow.');

    const result = scanForSensitiveContent(dir, ['notes.md']);

    expect(result.clean).toBe(false);
    expect(result.findings.some((f) => f.type === 'phone')).toBe(true);
  });

  it('flags an international-format phone number', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'notes.md', 'Reach the office on +1 415-555-2671 during business hours.');

    const result = scanForSensitiveContent(dir, ['notes.md']);

    expect(result.findings.some((f) => f.type === 'phone')).toBe(true);
  });
});

describe('scanForSensitiveContent: secret-key shapes', () => {
  it('flags an AWS-style access key id', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'config.txt', 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE');

    const result = scanForSensitiveContent(dir, ['config.txt']);

    expect(result.clean).toBe(false);
    expect(result.findings).toContainEqual({
      file: 'config.txt',
      type: 'secret-key',
      match: 'AKIAIOSFODNN7EXAMPLE',
    });
  });

  it('flags a PEM private key block', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'key.pem', '-----BEGIN RSA PRIVATE KEY-----\nMIIB...\n-----END RSA PRIVATE KEY-----');

    const result = scanForSensitiveContent(dir, ['key.pem']);

    expect(result.clean).toBe(false);
    expect(result.findings.some((f) => f.type === 'secret-key')).toBe(true);
  });

  it('flags a GitHub personal access token', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'config.txt', 'GITHUB_TOKEN=ghp_16C7e42F292c6912E7710c838347Ae178B4a');

    const result = scanForSensitiveContent(dir, ['config.txt']);

    expect(result.findings.some((f) => f.type === 'secret-key')).toBe(true);
  });
});

describe('scanForSensitiveContent: clean content', () => {
  it('reports clean: true with no findings for ordinary code', () => {
    const dir = makeFixtureDir();
    writeFile(dir, 'src/index.ts', 'export function add(a: number, b: number) { return a + b; }');

    const result = scanForSensitiveContent(dir, ['src/index.ts']);

    expect(result).toEqual({ clean: true, findings: [] });
  });
});

describe('scanForSensitiveContent: never modifies content', () => {
  it('leaves the scanned file byte-for-byte unchanged', () => {
    const dir = makeFixtureDir();
    const original = 'Contact leak@personalmail.com now.';
    writeFile(dir, 'leaky.md', original);

    scanForSensitiveContent(dir, ['leaky.md']);

    expect(readFileSync(path.join(dir, 'leaky.md'), 'utf8')).toBe(original);
  });
});

describe('scanForSensitiveContent: unreadable files', () => {
  it('skips a file that does not exist rather than throwing', () => {
    const dir = makeFixtureDir();

    expect(() => scanForSensitiveContent(dir, ['does-not-exist.ts'])).not.toThrow();
    expect(scanForSensitiveContent(dir, ['does-not-exist.ts'])).toEqual({ clean: true, findings: [] });
  });
});
