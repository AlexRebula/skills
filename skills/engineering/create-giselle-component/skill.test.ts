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

});
