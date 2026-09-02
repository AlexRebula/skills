import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('migrate-react-subcomponent', () => {
  it('disambiguates from every create-*-component sibling explicitly', () => {
    // Easy to reach for interchangeably by name alone — the skill must state the test
    // for which one applies (does the component already exist?), not just gesture at
    // the difference once.
    expect(SKILL).toContain('create-react-component');
    expect(SKILL).toMatch(/does not exist yet/i);
  });

  it('never instructs writing it.todo stubs or driving a TDD loop — this is a move of working code', () => {
    expect(SKILL).not.toMatch(/it\.todo\(/);
    expect(SKILL).not.toMatch(/red-green/i);
  });

  it('is framework-agnostic — no MUI or giselle-specific vocabulary leaked in from its sibling', () => {
    expect(SKILL).not.toMatch(/giselle|oss-quality-standards|SonarQube|cleanup-workflow/i);
  });

  it('names the new folder from the exported symbol, not the old filename', () => {
    // \s+ tolerates a markdown line-wrap landing between the two words.
    expect(SKILL).toMatch(/exported\s+component name/i);
  });

  it('treats a project structure gate as optional, not assumed to exist', () => {
    // Unlike giselle-mui, a generic React project may have no structure-checking
    // script at all — the skill must not hardcode a dependency on one.
    expect(SKILL).toMatch(/if your project has/i);
  });

  it('treats the companion-count heuristic as a proxy, not the rule itself', () => {
    expect(SKILL).toMatch(/heuristic/i);
    expect(SKILL).toMatch(/capital letter/i);
  });

  it('makes the import-path update mechanically verifiable, not a vibe', () => {
    expect(SKILL).toContain('rg -n');
    expect(SKILL).toMatch(/completion criterion/i);
  });
});
