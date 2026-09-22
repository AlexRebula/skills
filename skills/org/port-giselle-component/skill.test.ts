import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('port-giselle-component', () => {
  it('disambiguates from create-giselle-component explicitly', () => {
    // Both skills produce a landed component in giselle-mui, so it's easy to reach for
    // the wrong one by name alone — the skill must state the test for which
    // one applies (real, passing tests already exist vs. still stubs), not just gesture at
    // the difference.
    expect(SKILL).toContain('create-giselle-component');
    expect(SKILL).toMatch(/not.*exist yet/is);
  });

  it('disambiguates from migrate-giselle-subcomponent explicitly', () => {
    // migrate-giselle-subcomponent also moves already-working code, but never crosses a
    // repo boundary — that's the one real distinction between the two skills, and it has
    // to be stated, not assumed obvious.
    expect(SKILL).toContain('migrate-giselle-subcomponent');
    expect(SKILL).toMatch(/repo boundary|different repo entirely/i);
  });

  it('states the guardrail as a mechanical check, not a judgment call', () => {
    // The whole point of this skill over a plain doc convention is that "is this really
    // cheap to move" is verified (tests pass with import-path edits only), not eyeballed.
    // A skill that only described the guardrail without an enforceable stop condition
    // would be exactly the loophole this was designed to avoid.
    expect(SKILL).toMatch(/zero behavioral changes/i);
    expect(SKILL).toMatch(/stop.*hand off to `create-giselle-component`/is);
  });

  it('describes the real two-phase-scaffold gate mechanism, not the file-existence misconception', () => {
    // create-giselle-component's own docs describe Phase 1's gate as "the .tsx file must
    // not exist yet." The actual quality-gate test checks test-file it.todo presence
    // against an exempt-list baseline, not file existence. A port-mode skill built on the
    // wrong mental model of the gate would design the wrong bypass — this must name the
    // real mechanism explicitly.
    expect(SKILL).toContain('two-phase-scaffold-exempt.json');
    expect(SKILL).toMatch(/it\.todo.*test\.todo|test\.todo.*it\.todo/is);
  });

  it('never proposes changing two-phase-scaffold.test.ts itself', () => {
    // The gate already has a documented graduation path (the exempt list). Modifying the
    // gate's own logic would be a much larger, riskier change than this skill needs — and
    // was explicitly out of scope in the design discussion that produced this skill.
    expect(SKILL).toMatch(/no change to `?two-phase-scaffold\.test\.ts`? itself, ever/i);
  });

  it('requires the source to already have real tests and an origin-repo cleanup-component pass before proceeding', () => {
    // Without this precondition, "port mode" degrades into "copy unfinished code and skip
    // TDD" — the two conditions that keep it from being a general TDD-skipping loophole.
    expect(SKILL).toMatch(/real, non-stub|real \(non-stub\)/i);
    expect(SKILL).toContain('cleanup-component');
    expect(SKILL).toMatch(/stop here and hand off to `create-giselle-component`/i);
  });

  it('cites real oss-quality-standards section numbers, not placeholder ones', () => {
    // Every section reference here was checked against the actual AGENTS.md index rather
    // than assumed — §6 (API Contract), §9 (Accessibility), §10 (Testing) are the ones a
    // reconnaissance/test-porting pass actually depends on.
    expect(SKILL).toMatch(/§6/);
    expect(SKILL).toMatch(/§9/);
    expect(SKILL).toMatch(/§10/);
  });

  it('flags where oss-quality-standards has a real gap instead of citing a rule that does not exist', () => {
    // §6 has no explicit cross-library-version-drift detection rule, and §8 has no
    // provenance-documentation rule. Claiming either exists would be a fabricated citation;
    // the skill must say plainly that these are its own conventions filling a gap.
    expect(SKILL).toMatch(/no explicit rule/i);
    expect(SKILL).toMatch(/this skill's own\s+convention/i);
  });
});
