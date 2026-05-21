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

});
