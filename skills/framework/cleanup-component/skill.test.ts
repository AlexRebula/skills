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

  it('disambiguates from migrate-react-subcomponent and structural-only migration skills in general', () => {
    // A structural-only migration skill mechanically moves an already-correctly-named,
    // already-correctly-decomposed component into its own folder; it never inspects
    // handler names, prop-bag naming, or cascading state logic. This skill's entire
    // reason to exist is that it diagnoses both axes instead of assuming one is already
    // done, so it must say so explicitly, not just imply it. This skill is generic and
    // org-agnostic: it must not name any specific organization's own structural-migration
    // skill (e.g. an org-scoped variant of migrate-react-subcomponent) by name.
    expect(SKILL).toContain('migrate-react-subcomponent');
    expect(SKILL).toMatch(/structural-only mechanical/i);
    expect(SKILL).toMatch(/already correctly named/i);
    expect(SKILL).not.toMatch(/giselle/i);
  });

  it('states the diagnose-before-fix ordering explicitly', () => {
    // The core behavioural contract: never assume either axis applies or doesn't;
    // check both, independently, then fix only what the diagnosis actually found.
    expect(SKILL).toMatch(/diagnoses before it fixes/i);
    expect(SKILL).toMatch(/never assume/i);
    expect(SKILL).toMatch(/one axis, the other, both, or neither/i);
    expect(SKILL).toMatch(/Apply only the fixes the diagnosis actually found/i);
  });

  it('cites two fully generic contrasting cases for the disambiguation, naming no real project', () => {
    // These two contrasting cases are what actually prove the diagnose-both-axes
    // requirement is necessary rather than theoretical: a naming/decomposition-only
    // target and a structural-only target. Both must be entirely invented/generic —
    // this is a public skill for any React component in any project, so it must not
    // reference any specific real component, repo, or organization at all, not even a
    // de-identified paraphrase of one.
    expect(SKILL).toMatch(/zero structural debt/i);
    expect(SKILL).toMatch(/zero[\s\S]{0,40}naming\/decomposition debt/i);
    expect(SKILL).not.toMatch(/giselle/i);
    expect(SKILL).not.toMatch(/TimelineTwoColumn/);
  });

  it('never references any specific organization, private repo, or delegates to an org-specific skill', () => {
    // This is the core regression this test guards against: an earlier version of this
    // skill named a specific organization ("Giselle"), two of that organization's private
    // repos, and delegated back into an org-specific sibling skill for a conditional
    // extra phase. All of that is architecturally wrong for a skill meant to be generic
    // and installable by anyone: an org that wants extra org-specific behavior should
    // build that into their OWN org-scoped caller skill (which calls this one), never the
    // other way around. This skill itself must stay completely silent on any organization.
    expect(SKILL).not.toMatch(/giselle/i);
    expect(SKILL).not.toMatch(/migrate-giselle-subcomponent/);
    expect(SKILL).not.toMatch(/create-giselle-component/);
    expect(SKILL).not.toMatch(/DoD scoring/);
    expect(SKILL).not.toMatch(/brand tokens/);
    expect(SKILL).not.toMatch(/yalc/i);
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

  it('requires test coverage for whatever it extracts, per artifact type, discovered from the target repo', () => {
    // A real run against a live component created .styles.ts/.const.ts/.utils.ts with zero
    // accompanying tests, even though both loaded standards (AGENTS.md §5.4's
    // <name>.styles.test.ts convention and component-refactor-conventions.md §15.1's
    // "independently unit-tested derivation functions" requirement) already say tests are
    // part of the fix, not a separate step. This guards against repeating that gap.
    expect(SKILL).toMatch(/[Tt]est coverage is part of applying a fix/);
    expect(SKILL).toMatch(/styles\.test\.ts/);
    expect(SKILL).toMatch(/not a separate `<name>\.const\.test\.ts` file/);
    expect(SKILL).toMatch(/utils\.test\.ts/);
    expect(SKILL).toMatch(/find this target repo's own existing test framework and pattern/i);
    expect(SKILL).toMatch(/independently unit-tested/i);
  });

  it('performs the folder-per-component move itself when no delegate skill covers a standalone target', () => {
    // A real run found the diagnosis correctly flagged "not living in its own
    // folder-per-component" but the skill then left the violation unfixed, reasoning
    // (incorrectly) from local flat-file precedent instead of the actual standard — since
    // this repo's own structural-migration skill is scoped to internal-only sub-components
    // and explicitly excludes standalone/exported ones, nothing covered the case. This
    // guards against repeating that gap: the skill must say explicitly that it performs the
    // move itself when no delegate skill's own stated scope actually covers the target.
    expect(SKILL).toMatch(/perform the move yourself unless a[\s\S]{0,20}delegate skill/i);
    expect(SKILL).toMatch(/exclude a standalone or independently-exported component/i);
    expect(SKILL).toMatch(/do not[\s\S]{0,5}delegate to a skill whose own documented scope excludes it/i);
    expect(SKILL).toContain('index.ts');
    expect(SKILL).toMatch(/Update every import site across the repo/i);
  });

  it('gates README/roadmap/stories scaffolding on the standalone-vs-sub-component test, not a blanket rule', () => {
    // The full library-scaffolding ceremony (README, roadmap, stories) exists to document
    // and preview a reusable published component for other consumers; a single-caller
    // app-local component doesn't need it. This must be an explicit, checkable rule, not
    // left to inference — otherwise every folder-per-component move risks over-scaffolding
    // a one-off page section as if it were a new library component.
    expect(SKILL).toMatch(/§5\.6/);
    expect(SKILL).toMatch(/standalone-vs-sub-component test/i);
    expect(SKILL).toMatch(/exactly one caller/i);
    expect(SKILL).not.toMatch(/giselle/i);
  });

  it('states its own out-of-scope boundaries: no real-component run, no organization awareness', () => {
    expect(SKILL).toMatch(/## Out of scope/);
    expect(SKILL).toMatch(/Running this skill against any real component/i);
    expect(SKILL).toMatch(/any specific organization's own repos/i);
    expect(SKILL).toMatch(/never[\s\S]{0,10}the other way around/i);
  });
});
