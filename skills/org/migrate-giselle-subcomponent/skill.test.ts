import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('migrate-giselle-subcomponent', () => {
  it('disambiguates from create-giselle-component explicitly', () => {
    // The two skills solve opposite problems (existing code vs. brand-new code) and
    // are easy to reach for interchangeably by name alone — the skill must state the
    // test for which one applies, not just gesture at the difference.
    expect(SKILL).toContain('create-giselle-component');
    expect(SKILL).toMatch(/does not exist yet/i);
  });

  it('never instructs writing it.todo stubs — this is a move of working code', () => {
    // The two-phase scaffold pattern (AGENTS.md §5.5) belongs to create-giselle-component
    // only. A migration skill that reached for it.todo would be rebuilding a component
    // that already works, which is exactly the failure mode this skill exists to avoid.
    // (The skill DOES mention "it.todo" once, by name, precisely to say it doesn't apply
    // here — that's the disambiguation this test wants, not a violation of it.)
    expect(SKILL).not.toMatch(/it\.todo\(/); // an actual stub call, not just the term
    expect(SKILL).toMatch(/never new implementation.*it\.todo/is);
  });

  it('names the new folder from the exported symbol, not the old filename', () => {
    // The one case this skill exists to handle correctly (not as a special exception):
    // a flat file whose name doesn't match its own export.
    expect(SKILL).toMatch(/kebab-case of the exported component name/i);
  });

  it('warns about check-structure.js recursion depth for nested sub-components', () => {
    // A domain registered one level up never reaches a sub-component's own internal
    // flat helpers — this is a real, source-only detail that isn't written down anywhere
    // else, and skipping it silently under-fixes the gate.
    expect(SKILL).toContain('PARENT_DIRS_TO_CHECK');
    expect(SKILL).toMatch(/one level deep/i);
  });

  it('requires the ratchet baseline to be seeded before the gate is extended', () => {
    // Registering a new domain surfaces every existing violation in it at once —
    // without seeding KNOWN_VIOLATIONS first, the gate fix itself fails the build.
    expect(SKILL).toContain('KNOWN_VIOLATIONS');
  });

  it('references the Scenario A Definition of Done as the source of truth', () => {
    expect(SKILL).toMatch(/Scenario A/);
    expect(SKILL).toMatch(/DoD n\/12/);
  });

  it('treats the companion-count heuristic as a proxy, not the rule itself', () => {
    // A constants/hooks file with zero companions can rank as a false-positive
    // "violation" under the heuristic alone — the skill must say to verify the real
    // export shape before trusting the ranking.
    expect(SKILL).toMatch(/heuristic/i);
    expect(SKILL).toMatch(/capital letter/i);
  });
});
