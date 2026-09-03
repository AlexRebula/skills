import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('sync-down', () => {
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

  it('is explicit that this skill never commits anything', () => {
    expect(SKILL).toMatch(/never commit/i);
  });

  it('is explicit that a failing gate leaves the working tree untouched', () => {
    expect(SKILL).toMatch(/untouched/i);
  });
});
