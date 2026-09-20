import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('to-tickets', () => {
  it('requires a "Context for whoever picks this up" section in both ticket templates', () => {
    // A bare "Parent: #N" reference was already proven insufficient once
    // (a real batch of four frontier tickets needed this retrofitted by hand
    // after a fresh session couldn't pick them up cold) — must not regress.
    const occurrences = SKILL.match(/Context for whoever picks this up/g) ?? [];
    expect(occurrences.length).toBeGreaterThanOrEqual(2); // local-ticket-template + issue-template
  });

  it('cites the real incident as the reason this section is required', () => {
    // The requirement needs its own justification inline, not just an assertion,
    // so a future editor understands why removing it would be a regression.
    expect(SKILL).toMatch(/retrofit.*by hand|by hand.*retrofit/is);
  });

  it('states that a native sub-issue link is not a substitute for inline context', () => {
    expect(SKILL).toMatch(/not a substitute for.*context|context.*not a substitute/is);
  });

  it('instructs writing every ticket for a fresh session with no memory of this conversation', () => {
    expect(SKILL).toMatch(/no memory of/i);
  });
});
