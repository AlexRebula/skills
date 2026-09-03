import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('sync-up', () => {
  it('states the git/gh authentication prerequisite', () => {
    expect(SKILL).toMatch(/authenticated.*`?git`?\/`?gh`?/i);
  });

  it('states the Node version prerequisite for native TypeScript execution, with no build step', () => {
    expect(SKILL).toMatch(/Node\.js/);
    expect(SKILL).toMatch(/no build step/i);
    expect(SKILL).toMatch(/no.*ts-node/i);
  });

  it('shows the MIT-style AS IS / NO WARRANTY disclaimer', () => {
    expect(SKILL).toMatch(/AS IS/);
    expect(SKILL).toMatch(/WITHOUT WARRANTY/i);
    expect(SKILL).toMatch(/NOT LIABLE/i);
  });

  it('is explicit that this skill never merges the PR it opens', () => {
    expect(SKILL).toMatch(/never merge/i);
  });

  it('is explicit that a failing gate blocks the promotion and leaves the target untouched', () => {
    expect(SKILL).toMatch(/untouched/i);
  });

  it('includes a generic worked example of the banned-content file, naming the real filename', () => {
    expect(SKILL).toContain('.banned-patterns.local');
    expect(SKILL).toMatch(/worked example/i);
    expect(SKILL).toMatch(/not real banned terms/i);
  });

  it('states the privacy scan is always on and needs no configuration', () => {
    expect(SKILL).toMatch(/always on/i);
  });
});
