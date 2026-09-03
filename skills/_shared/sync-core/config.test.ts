// @vitest-environment node
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { bootstrapConfig, readConfig, DISCLAIMER, CONFIG_FILENAME } from './config.ts';

// ----------------------------------------------------------------------

const tempDirs: string[] = [];

function makeProjectDir() {
  const dir = mkdtempSync(path.join(tmpdir(), 'sync-core-config-fixture-'));
  tempDirs.push(dir);
  return dir;
}

function fakePrompt(answers: string[]): (question: string) => Promise<string> {
  const queue = [...answers];
  return async () => {
    const next = queue.shift();
    if (next === undefined) throw new Error('fakePrompt: ran out of queued answers');
    return next;
  };
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe('readConfig', () => {
  it('returns null when no config file exists', () => {
    const project = makeProjectDir();
    expect(readConfig(project)).toBeNull();
  });

  it('returns the parsed config when a file exists', () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/a', repoB: '/b', qualityGateCommand: 'npm run check' })
    );

    expect(readConfig(project)).toEqual({ repoA: '/a', repoB: '/b', qualityGateCommand: 'npm run check' });
  });
});

describe('bootstrapConfig: first run', () => {
  it('creates .sync-config.json from the prompted repo paths and gate command when missing', async () => {
    const project = makeProjectDir();
    const prompt = fakePrompt(['/path/to/playground', '/path/to/production', 'npm run check']);

    const config = await bootstrapConfig(project, { prompt, onDisclaimer: vi.fn() });

    expect(config).toEqual({
      repoA: '/path/to/playground',
      repoB: '/path/to/production',
      qualityGateCommand: 'npm run check',
    });
    const written = JSON.parse(readFileSync(path.join(project, CONFIG_FILENAME), 'utf8'));
    expect(written).toEqual(config);
  });

  it('trims whitespace from prompted answers', async () => {
    const project = makeProjectDir();
    const prompt = fakePrompt(['  /a  ', '  /b  ', '  npm run check  ']);

    const config = await bootstrapConfig(project, { prompt, onDisclaimer: vi.fn() });

    expect(config).toEqual({ repoA: '/a', repoB: '/b', qualityGateCommand: 'npm run check' });
  });

  it('shows the disclaimer exactly once during first-run bootstrap', async () => {
    const project = makeProjectDir();
    const onDisclaimer = vi.fn();
    const prompt = fakePrompt(['/a', '/b', 'npm run check']);

    await bootstrapConfig(project, { prompt, onDisclaimer });

    expect(onDisclaimer).toHaveBeenCalledTimes(1);
    expect(onDisclaimer).toHaveBeenCalledWith(DISCLAIMER);
  });

  it('adds a gitignore entry for the config file on creation', async () => {
    const project = makeProjectDir();
    const prompt = fakePrompt(['/a', '/b', 'npm run check']);

    await bootstrapConfig(project, { prompt, onDisclaimer: vi.fn() });

    const gitignore = readFileSync(path.join(project, '.gitignore'), 'utf8');
    expect(gitignore.split('\n')).toContain(CONFIG_FILENAME);
  });

  it('appends the gitignore entry without clobbering existing entries', async () => {
    const project = makeProjectDir();
    writeFileSync(path.join(project, '.gitignore'), 'node_modules\ndist\n');
    const prompt = fakePrompt(['/a', '/b', 'npm run check']);

    await bootstrapConfig(project, { prompt, onDisclaimer: vi.fn() });

    const gitignore = readFileSync(path.join(project, '.gitignore'), 'utf8');
    const lines = gitignore.split('\n');
    expect(lines).toContain('node_modules');
    expect(lines).toContain('dist');
    expect(lines).toContain(CONFIG_FILENAME);
  });
});

describe('bootstrapConfig: existing, complete config', () => {
  it('returns the existing config without prompting or overwriting it', async () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/existing/a', repoB: '/existing/b', qualityGateCommand: 'npm run check' })
    );
    const prompt = vi.fn();

    const config = await bootstrapConfig(project, { prompt, onDisclaimer: vi.fn() });

    expect(config).toEqual({ repoA: '/existing/a', repoB: '/existing/b', qualityGateCommand: 'npm run check' });
    expect(prompt).not.toHaveBeenCalled();
  });

  it('does not show the disclaimer again when config already exists', async () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/existing/a', repoB: '/existing/b', qualityGateCommand: 'npm run check' })
    );
    const onDisclaimer = vi.fn();

    await bootstrapConfig(project, { prompt: vi.fn(), onDisclaimer });

    expect(onDisclaimer).not.toHaveBeenCalled();
  });

  it('still verifies the .gitignore entry when config already exists but the entry is missing', async () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/existing/a', repoB: '/existing/b', qualityGateCommand: 'npm run check' })
    );

    await bootstrapConfig(project, { prompt: vi.fn(), onDisclaimer: vi.fn() });

    const gitignore = readFileSync(path.join(project, '.gitignore'), 'utf8');
    expect(gitignore.split('\n')).toContain(CONFIG_FILENAME);
  });

  it('does not duplicate the .gitignore entry when config already exists and the entry is already present', async () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/existing/a', repoB: '/existing/b', qualityGateCommand: 'npm run check' })
    );
    writeFileSync(path.join(project, '.gitignore'), `node_modules\n${CONFIG_FILENAME}\n`);

    await bootstrapConfig(project, { prompt: vi.fn(), onDisclaimer: vi.fn() });

    const gitignore = readFileSync(path.join(project, '.gitignore'), 'utf8');
    const occurrences = gitignore.split('\n').filter((line) => line === CONFIG_FILENAME).length;
    expect(occurrences).toBe(1);
  });
});

describe('bootstrapConfig: existing config missing qualityGateCommand', () => {
  it('backfills qualityGateCommand by prompting for just that one field, without re-asking for repo paths', async () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/existing/a', repoB: '/existing/b' })
    );
    const prompt = fakePrompt(['npm run check']);

    const config = await bootstrapConfig(project, { prompt, onDisclaimer: vi.fn() });

    expect(config).toEqual({ repoA: '/existing/a', repoB: '/existing/b', qualityGateCommand: 'npm run check' });
    const written = JSON.parse(readFileSync(path.join(project, CONFIG_FILENAME), 'utf8'));
    expect(written).toEqual(config);
  });

  it('does not show the disclaimer again for a backfill on an existing config', async () => {
    const project = makeProjectDir();
    writeFileSync(
      path.join(project, CONFIG_FILENAME),
      JSON.stringify({ repoA: '/existing/a', repoB: '/existing/b' })
    );
    const onDisclaimer = vi.fn();

    await bootstrapConfig(project, { prompt: fakePrompt(['npm run check']), onDisclaimer });

    expect(onDisclaimer).not.toHaveBeenCalled();
  });
});

describe('DISCLAIMER', () => {
  it('states there is no warranty and no liability, matching the MIT AS-IS clause', () => {
    expect(DISCLAIMER).toMatch(/as is/i);
    expect(DISCLAIMER).toMatch(/without warranty/i);
    expect(DISCLAIMER).toMatch(/liable/i);
  });
});
