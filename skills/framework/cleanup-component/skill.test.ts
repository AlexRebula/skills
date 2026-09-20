import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('cleanup-component', () => {
  it('states both trigger phrasings', () => {
    // The ticket requires both phrasings to work interchangeably: a skill that only
    // documented one would silently fail to trigger on the other.
    expect(SKILL).toMatch(/cleanup component X/);
    expect(SKILL).toMatch(/refactor component X/);
  });

  it('disambiguates from migrate-giselle-subcomponent and migrate-react-subcomponent as structural-only', () => {
    // Both sibling skills mechanically move an already-correctly-named,
    // already-correctly-decomposed component into its own folder; they never inspect
    // handler names, prop-bag naming, or cascading state logic. This skill's entire
    // reason to exist is that it diagnoses both axes instead of assuming one is already
    // done, so it must say so explicitly, not just imply it.
    expect(SKILL).toContain('migrate-giselle-subcomponent');
    expect(SKILL).toContain('migrate-react-subcomponent');
    expect(SKILL).toMatch(/structural-only mechanical moves/i);
    expect(SKILL).toMatch(/already correctly named/i);
  });

  it('states the diagnose-before-fix ordering explicitly', () => {
    // The core behavioural contract: never assume either axis applies or doesn't;
    // check both, independently, then fix only what the diagnosis actually found.
    expect(SKILL).toMatch(/diagnoses before it fixes/i);
    expect(SKILL).toMatch(/never assume/i);
    expect(SKILL).toMatch(/one axis, the other, both, or neither/i);
    expect(SKILL).toMatch(/Apply only the fixes the diagnosis actually found/i);
  });

  it('cites both real-world validation cases for the disambiguation', () => {
    // These two contrasting cases are what actually prove the diagnose-both-axes
    // requirement is necessary rather than theoretical: a naming/decomposition-only
    // target and a structural-only target, confirmed during the spec's grilling session.
    // The second case is deliberately de-identified (no private repo/file name) per this
    // repo's own public-repository rule against naming private projects in skill content;
    // giselle-mui-poc is an org repo and is named directly under that rule's own carve-out.
    expect(SKILL).toContain('TimelineTwoColumn');
    expect(SKILL).toContain('giselle-mui-poc#223');
    expect(SKILL).toMatch(/zero structural debt/i);
    expect(SKILL).toMatch(/private consumer app's home-page component/i);
    expect(SKILL).toMatch(/zero\s*\n?\s*naming\/decomposition debt/i);
  });

  it('names the conditional org-layer trigger repos and states every other target skips it', () => {
    // The delegation to migrate-giselle-subcomponent's Giselle-specific phase must be
    // conditional on the target's repo, not run unconditionally: running Giselle-only
    // tooling (DoD scoring, brand tokens, taxonomy, yalc-validate) against a non-Giselle
    // consumer app has nothing to check against.
    expect(SKILL).toContain('giselle-mui');
    expect(SKILL).toContain('giselle-mui-poc');
    expect(SKILL).toMatch(/if, and only if, the target's repo is `giselle-mui` or `giselle-mui-poc`/i);
    expect(SKILL).toMatch(/every other target repo skips that phase entirely/i);
    expect(SKILL).toMatch(/DoD scoring/);
    expect(SKILL).toMatch(/brand tokens/);
    expect(SKILL).toMatch(/taxonomy/);
    expect(SKILL).toMatch(/yalc-validate/);
  });

  it('references the specific OSS Quality Standards doc/section names by name', () => {
    // Acceptance criteria require naming the exact docs/sections this skill depends on:
    // a vague "check the standards" instruction would leave the diagnostic pass
    // unverifiable against what actually shipped in wiki#944/#945.
    expect(SKILL).toMatch(/§5 Component Structure Rules/);
    expect(SKILL).toMatch(/§6 Component API Contract/);
    expect(SKILL).toContain('naming-conventions.md');
    expect(SKILL).toMatch(/Element-first handler naming/);
    expect(SKILL).toMatch(/Inputs prop-bag naming/);
    expect(SKILL).toContain('component-refactor-conventions.md');
    expect(SKILL).toMatch(/§15\.1/);
    expect(SKILL).toMatch(/Decomposing cascading state-sync logic/);
    expect(SKILL).toMatch(/§15\.2/);
    expect(SKILL).toMatch(/Sequencing one group at a time/);
  });

  it('mirrors the --standards-url flag and default-URL convention from review-pr, without inventing a new one', () => {
    // The ticket explicitly warns not to invent a new flag/URL convention: this must be
    // the same flag name and the same public LittleBranches default review-pr already
    // uses, not a lookalike.
    expect(SKILL).toContain('--standards-url');
    expect(SKILL).toContain(
      'https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md',
    );
    expect(SKILL).toMatch(/mirrors `review-pr`'s own `--standards-url` flag/i);
  });

  it('requires running the target repo\'s own quality gate after fixes land', () => {
    expect(SKILL).toMatch(/target repo's own quality gate/i);
  });

  it('states running against a real component and wiring caller skills are both out of scope', () => {
    // wiki#947's Definition of Done explicitly excludes both: this skill's own scope
    // note should match, so a future reader doesn't assume either was silently done.
    expect(SKILL).toMatch(/## Out of scope/);
    expect(SKILL).toMatch(/four caller skills/i);
    expect(SKILL).toMatch(/Running this skill against any real component/i);
  });
});
