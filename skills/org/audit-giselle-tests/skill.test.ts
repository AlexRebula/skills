import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('audit-giselle-tests', () => {

  // ── Bucket A — correct scaffold pattern ──────────────────────────────────
  it('Bucket A pattern uses it.todo stubs, not describe.skip', () => {
    // The two-phase scaffold standard (AGENTS.md §5.5) uses it.todo, not describe.skip.
    // An audit skill that corrects tests must recognise the right pattern.
    expect(SKILL).toContain('it.todo');
    expect(SKILL).not.toContain('describe.skip');
  });

  // ── Fix pattern — correct theme wrapper ──────────────────────────────────
  it('fix pattern uses GiselleThemeProvider, not ThemeProvider + createTheme()', () => {
    // giselle-mui uses CSS variables mode — plain createTheme() does not populate
    // theme.vars.* and causes render crashes. GiselleThemeProvider is the only
    // correct wrapper (matches create-giselle-component §10 rule).
    expect(SKILL).toContain('GiselleThemeProvider');
    expect(SKILL).not.toContain('createTheme()');
  });

  // ── Two-phase scaffold awareness ─────────────────────────────────────────
  it('references the two-phase scaffold quality gate so auditors know what compliant looks like', () => {
    // Auditors need to know §5.5 / two-phase-scaffold is enforced at CI level.
    // Without this, they may classify correctly-formed it.todo files as needing "fixes".
    expect(SKILL).toMatch(/§5\.5|two-phase scaffold/i);
  });

});
