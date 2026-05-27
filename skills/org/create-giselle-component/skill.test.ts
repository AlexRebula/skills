import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('create-giselle-component', () => {

  // ── §10 Testing — test helper ────────────────────────────────────────────
  it('uses GiselleThemeProvider as the test wrapper, not createTheme()', () => {
    expect(SKILL).toContain('GiselleThemeProvider');
  });

  // ── §9 Accessibility ─────────────────────────────────────────────────────
  it('states WCAG 2.2 AA as the accessibility target (§9.1)', () => {
    expect(SKILL).toContain('WCAG 2.2');
  });

  it('requires aria-label on icon-only buttons (§9.3)', () => {
    expect(SKILL).toContain('aria-label');
  });

  it('requires prefers-reduced-motion for animations (§9.6)', () => {
    expect(SKILL).toContain('prefers-reduced-motion');
  });

  // ── §6.12 Input security ─────────────────────────────────────────────────
  it('warns about javascript: scheme in URL props for inputs/ layer (§6.12)', () => {
    expect(SKILL).toContain('javascript:');
  });

  it('requires password fields to use type="password" (§6.12)', () => {
    expect(SKILL).toContain('type="password"');
  });

  // ── §6 API contract gaps ─────────────────────────────────────────────────
  it('prohibits bare <Box> with semantic meaning (§6.6)', () => {
    expect(SKILL).toContain('bare');
    expect(SKILL).toContain('<Box>');
  });

  it('requires shouldForwardProp on styled components (§6.7)', () => {
    expect(SKILL).toContain('shouldForwardProp');
  });

  it('covers icon slot conventions — aria-hidden on decorative icons (§6.10)', () => {
    expect(SKILL).toContain('aria-hidden');
  });

  // ── §11 Definition of Done — missing checklist items ────────────────────
  it('DoD checklist includes no console.log / commented-out code check (§11)', () => {
    expect(SKILL).toMatch(/console\.log|commented.out/i);
  });

  it('DoD checklist includes no undisclosed dependencies check (§11)', () => {
    expect(SKILL).toContain('dependencies');
  });

  // ── §2.2 Commit conventions ──────────────────────────────────────────────
  it('references Conventional Commits format for component commits (§2.2)', () => {
    expect(SKILL).toMatch(/feature\(|fix\(|chore\(/);
  });

  // ── Batch invocation mode ────────────────────────────────────────────────
  it('supports batch invocation — skip questions when answers are pre-supplied', () => {
    expect(SKILL).toMatch(/pre.suppli|answers.*provided|already.*answer|batch/i);
  });

  // ── Branch + PR per component ────────────────────────────────────────────
  it('instructs agent to create a branch and open a PR after implementation', () => {
    expect(SKILL).toMatch(/branch|pull request|PR/i);
  });

  // ── §5.5 Two-phase scaffold enforcement ─────────────────────────────────
  it('explicitly names the two-phase scaffold rule or references AGENTS.md §5.5', () => {
    expect(SKILL).toMatch(/§5\.5|two-phase scaffold/i);
  });

  it('links scaffold it.todo requirement to quality-gate enforcement', () => {
    // The quality-gate test (two-phase-scaffold.test.ts) catches violations automatically.
    // The skill must tell the agent this so it knows the rule has teeth.
    expect(SKILL).toMatch(/two-phase-scaffold\.test|two-phase-scaffold-legacy/i);
  });

});
