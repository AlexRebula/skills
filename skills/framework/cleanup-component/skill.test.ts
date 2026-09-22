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

  it('declares itself LittleBranches\' own opinionated skill, not a neutral org-agnostic one', () => {
    // Reverses an earlier, deliberate decision (fedb84a) to make this skill fully
    // organization-agnostic. That decision is being reversed on purpose: this skill now
    // states plainly that it encodes LittleBranches' own opinions, so a future reader
    // doesn't mistake the LittleBranches-specific rules below for a neutral default.
    expect(SKILL).toMatch(/LittleBranches' own opinionated component-cleanup skill/i);
    expect(SKILL).toMatch(/encodes LittleBranches' own opinionated best practices/i);
  });

  it('disambiguates from migrate-react-subcomponent and structural-only migration skills in general', () => {
    // A structural-only migration skill mechanically moves an already-correctly-named,
    // already-correctly-decomposed component into its own folder; it never inspects
    // handler names, prop-bag naming, or cascading state logic. This skill's entire
    // reason to exist is that it diagnoses both axes instead of assuming one is already
    // done, so it must say so explicitly, not just imply it.
    expect(SKILL).toContain('migrate-react-subcomponent');
    expect(SKILL).toMatch(/structural-only mechanical/i);
    expect(SKILL).toMatch(/already correctly named/i);
  });

  it('states the diagnose-before-fix ordering explicitly', () => {
    // The core behavioural contract: never assume either axis applies or doesn't;
    // check both, independently, then fix only what the diagnosis actually found.
    expect(SKILL).toMatch(/diagnoses before it\s+fixes/i);
    expect(SKILL).toMatch(/never assume/i);
    expect(SKILL).toMatch(/one axis, the other, both, or neither/i);
    expect(SKILL).toMatch(/Apply only the fixes the diagnosis actually found/i);
  });

  it('cites two contrasting cases for the disambiguation, naming no real component', () => {
    // These two contrasting cases are what actually prove the diagnose-both-axes
    // requirement is necessary rather than theoretical: a naming/decomposition-only
    // target and a structural-only target. They stay invented/generic rather than
    // referencing a real component by name — an old, since-fixed regression named a real
    // component ("TimelineTwoColumn") here, which this guards against.
    expect(SKILL).toMatch(/zero structural debt/i);
    expect(SKILL).toMatch(/zero[\s\S]{0,40}naming\/decomposition debt/i);
    expect(SKILL).not.toMatch(/TimelineTwoColumn/);
  });

  it('keeps a single project\'s own extra tooling (DoD scoring, brand tokens, yalc) delegated to that project\'s own caller skill, not absorbed here', () => {
    // This is the reworked core regression guard: an earlier version of this skill
    // absorbed one specific project's (giselle-mui's) own extra enforcement logic
    // directly into its checklist. That's still wrong today, even after this skill
    // started naming LittleBranches and giselle-mui by name in its "Out of scope"
    // section as an example of what stays elsewhere — the terms may appear there, as
    // something explicitly deferred to that project's own caller skill, but must never
    // appear anywhere in the actual diagnostic steps (1-4) as if this skill enforces them.
    const outOfScopeIndex = SKILL.indexOf('## Out of scope');
    expect(outOfScopeIndex).toBeGreaterThan(-1);
    const outOfScopeSection = SKILL.slice(outOfScopeIndex);
    const beforeOutOfScope = SKILL.slice(0, outOfScopeIndex);

    expect(outOfScopeSection).toMatch(/DoD scoring/);
    expect(outOfScopeSection).toMatch(/caller skill/i);

    expect(beforeOutOfScope).not.toMatch(/DoD scoring/);
    expect(beforeOutOfScope).not.toMatch(/brand tokens/);
    expect(beforeOutOfScope).not.toMatch(/yalc/i);
  });

  it('references the specific OSS Quality Standards docs/sections it checks against, including the ones added in this pass', () => {
    // Acceptance criteria require naming the exact docs/sections this skill depends on:
    // a vague "check the standards" instruction would leave the diagnostic pass
    // unverifiable. component-structure.md, typescript-conventions.md, §15.3, and §T.1
    // are all newly required here — a prior version of this skill fetched only two of
    // the four relevant docs and its own checklist stopped short of §15.3 even though it
    // sits in a document already being fetched in full; both gaps are fixed in this pass.
    // component-api-contract.md and documentation-strategy.md were added in a second pass,
    // found only when someone asked directly whether a "one component per file" rule
    // existed anywhere and the answer required checking every doc in the standards repo,
    // not just the ones already being fetched.
    expect(SKILL).toMatch(/§5 Component Structure Rules/);
    expect(SKILL).toMatch(/§6 Component API\s+Contract/);
    expect(SKILL).toContain('naming-conventions.md');
    expect(SKILL).toMatch(/Element-first handler\s+naming/);
    expect(SKILL).toMatch(/Inputs prop-bag naming/);
    expect(SKILL).toContain('component-refactor-conventions.md');
    expect(SKILL).toMatch(/§15\.1/);
    expect(SKILL).toMatch(/Decomposing cascading state-sync logic/);
    expect(SKILL).toMatch(/§15\.2/);
    expect(SKILL).toMatch(/Sequencing one group at a time/);
    expect(SKILL).toContain('component-structure.md');
    expect(SKILL).toContain('typescript-conventions.md');
    expect(SKILL).toContain('component-api-contract.md');
    expect(SKILL).toContain('documentation-strategy.md');
    expect(SKILL).toMatch(/§15\.3/);
    expect(SKILL).toMatch(/§T\.1/);
  });

  it('fetches all six expanded standards docs and explains why a fixed excerpt list goes stale', () => {
    // Root cause of the original gap: the skill's own checklist was a fixed, hand-typed
    // list that never grew when the upstream standards docs did, and whole documents
    // (typescript-conventions.md, then later component-api-contract.md and
    // documentation-strategy.md) were never fetched in the first place. The fix is
    // twofold: fetch every relevant doc, and tell the reader to check the doc's full text
    // rather than treat the named bullets as exhaustive.
    expect(SKILL).toMatch(/fixed excerpt list goes stale/i);
    expect(SKILL).toMatch(/read each document's full text/i);
    expect(SKILL).toMatch(/not a fixed excerpt/i);
    expect(SKILL).toMatch(/floor, not a ceiling/i);
  });

  it('mirrors the --standards-url flag and default-URL convention from review-pr, without inventing a new one', () => {
    // This must be the same flag name and the same public LittleBranches default
    // review-pr already uses, not a lookalike.
    expect(SKILL).toContain('--standards-url');
    expect(SKILL).toContain(
      'https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md',
    );
    expect(SKILL).toMatch(/mirrors `review-pr`'s own `--standards-url` flag/i);
  });

  it('requires running the target repo\'s own quality gate after fixes land', () => {
    expect(SKILL).toMatch(/target repo's own quality gate/i);
  });

  it('requires test coverage for whatever it extracts, per artifact type, including the JSX-bearing utils case', () => {
    // A real run against a live component created .styles.ts/.const.ts/.utils.ts with zero
    // accompanying tests, even though both loaded standards (AGENTS.md §5.4's
    // <name>.styles.test.ts convention and component-refactor-conventions.md §15.1's
    // "independently unit-tested derivation functions" requirement) already say tests are
    // part of the fix, not a separate step. This guards against repeating that gap, and
    // extends it to the newly-added .utils.tsx case.
    expect(SKILL).toMatch(/[Tt]est coverage is part of applying a fix/);
    expect(SKILL).toMatch(/styles\.test\.ts/);
    expect(SKILL).toMatch(/not a separate `<name>\.const\.test\.ts` file/);
    expect(SKILL).toMatch(/utils\.test\.ts/);
    expect(SKILL).toMatch(/utils\.tsx/);
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

  it('gates the full README/roadmap/stories scaffolding suite on the standalone-vs-sub-component test, not a blanket rule', () => {
    // The full library-scaffolding ceremony (README, roadmap, stories) exists to document
    // and preview a reusable published component for other consumers; a single-caller
    // app-local component doesn't need it. This must be an explicit, checkable rule, not
    // left to inference — otherwise every folder-per-component move risks over-scaffolding
    // a one-off page section as if it were a new library component.
    expect(SKILL).toMatch(/§5\.6/);
    expect(SKILL).toMatch(/standalone-vs-sub-component test/i);
    expect(SKILL).toMatch(/exactly one\s+caller/i);
  });

  it('states the real, written README rule correctly: non-obvious setup requirements only, rare, most components need none', () => {
    // Correction found when the README-for-rationale rule below was checked against its
    // claimed source: documentation-strategy.md's actual "Component folder READMEs"
    // section is narrower than and different from what an earlier version of this skill
    // said — it's about setup requirements (a required context provider, a separately
    // installed peer dependency, an accessibility constraint), calls these "rare," and
    // says "most components do not need one." The rationale-extraction rule below is a
    // distinct, separately-justified LittleBranches convention layered on top of this one,
    // not a restatement of it — this test guards against the two being conflated again.
    expect(SKILL).toMatch(/non-obvious setup requirement/i);
    expect(SKILL).toMatch(/"rare"/);
    expect(SKILL).toMatch(/most components do not need one/i);
    expect(SKILL).toContain('documentation-strategy.md');
  });

  it('requires a plain README for a long rationale comment block even on a one-off component, as a second, independent reason to have one', () => {
    // New LittleBranches convention: a multi-paragraph "how did this code get this way"
    // comment block belongs in the component's own README.md, not inline in the source —
    // regardless of whether the component is standalone or single-caller, and regardless
    // of whether it also has a non-obvious setup requirement. This is deliberately scoped
    // narrower than, and doesn't conflict with, the README/roadmap/stories gate above:
    // that gate is about full library-scaffolding ceremony; this rule is about not letting
    // a source file carry a history lecture inline.
    expect(SKILL).toMatch(/long historical or migration-rationale comment block/i);
    expect(SKILL).toMatch(/not the setup-requirement README rule above and not\s+a restatement of it/i);
    expect(SKILL).toMatch(/does not override,\s+the standalone-vs-sub-\s*component gate/i);
    expect(SKILL).toMatch(/still\s+doesn't get to carry a multi-paragraph history lecture inline/i);
  });

  it('requires splitting a second independently-consumed component out of a shared file, matching create-giselle-component\'s own precedent', () => {
    // New LittleBranches convention: one exported, independently-consumed component per
    // file. A private, first-only internal helper sharing the file is fine; a second
    // export some other file imports directly is not. This isn't invented from nothing —
    // create-giselle-component's "Multi-component features" convention already gives every
    // internal sub-component its own subfolder from the moment it's scaffolded, with no
    // exception for internal/unexported pieces; this skill's own wording should say so
    // rather than presenting the rule as if no LittleBranches precedent existed for it.
    expect(SKILL).toMatch(/More than one independently-consumed component exported from one file/i);
    expect(SKILL).toMatch(/imported directly by some \*other\* file/i);
    expect(SKILL).toMatch(/not a private,\s+first-only helper/i);
    expect(SKILL).toContain('create-giselle-component');
    expect(SKILL).toMatch(/no exception for pieces that are internal or unexported/i);
  });

  it('requires .utils.tsx instead of .utils.ts for extracted logic that returns JSX', () => {
    // The written standards only name the .ts extension for utilities, which can't hold
    // JSX. This skill fills that gap directly since no written doc resolves it yet.
    expect(SKILL).toMatch(/utils\.tsx/);
    expect(SKILL).toMatch(/cannot hold JSX/i);
  });

  it('prefers a project\'s own established data-sourcing pattern (e.g. sections-api) over hardcoded demo/list data', () => {
    // component-refactor-conventions.md §15.3 already states this rule and even names
    // LittleBranches' own sections-api pattern as its reference implementation, but this
    // skill's own checklist never checked for it before this pass.
    expect(SKILL).toMatch(/§15\.3/);
    expect(SKILL).toMatch(/sections-api/i);
    expect(SKILL).toMatch(/already-established data-sourcing pattern/i);
  });

  it('extends the data-sourcing check to hardcoded heading/caption/copy text, not only list/demo content, by comparing against sibling components', () => {
    // A real run flagged a hardcoded showcase-content array as a §15.3 violation but missed
    // that the same component (and a sibling PageSection-composing section) also hardcoded
    // their own heading/caption/intro/CTA copy, while a third sibling sourced the identical
    // *kind* of content (title/caption/txtGradient into the same SectionTitle component)
    // from sections-api. The check must compare against sibling shape, not just look for
    // "a big list".
    expect(SKILL).toMatch(/heading\/caption copy/i);
    expect(SKILL).toMatch(/do not scope this check to "the big list of\s+content" alone/i);
    expect(SKILL).toMatch(/comparing the target against every sibling component of a similar shape/i);
    expect(SKILL).toMatch(/regardless of whether the hardcoded\s+value is a whole array or a single heading string/i);
  });

  it('extracts inline Grid/Stack layout-prop object literals (size, rowSpacing, columnSpacing) to .const.ts, generalizing the sx-extraction rule', () => {
    // Same principle as the inline-sx rule: sx isn't the only prop that carries a literal
    // worth naming and extracting. A responsive breakpoint object passed directly to size/
    // rowSpacing/columnSpacing/spacing is the same shape of violation.
    expect(SKILL).toMatch(/Inline configuration-object \(or configuration-call\) literals on any prop other than\s+`sx`/i);
    expect(SKILL).toMatch(/rowSpacing.*columnSpacing/);
    expect(SKILL).toMatch(/Same extraction principle as `sx` above, generalized further/i);
  });

  it('extends the same extraction rule to inline animation/motion config literals (variants, fade(...) calls), not only layout props', () => {
    // A real run also inlined `variants={fade("inUp", { distance: 24 })}` and a sibling
    // component inlined its own `variants={{ initial: {...}, animate: {...} }}` — the same
    // shape of un-extracted configuration literal as the Grid layout props, just on a
    // motion prop instead. The rule generalizes to any prop carrying a hardcoded
    // configuration value, not only layout-shaping ones.
    expect(SKILL).toMatch(/variants=\{fade\("inUp", \{ distance: 24 \}\)\}/);
    expect(SKILL).toMatch(/layout\s+props aren't the only \*other\* category either/i);
  });

  it('requires extracted .const.ts settings to use SCREAMING_SNAKE_CASE, distinct from .styles.ts camelCase, so they can later become caller-overridable props with the constant demoted to a default', () => {
    expect(SKILL).toMatch(/`SCREAMING_SNAKE_CASE`\s+in the component's own\s+`\.const\.ts`, not `camelCase`/i);
    expect(SKILL).toMatch(/every tunable setting for a\s+component is visible in one glance down that one file/i);
    expect(SKILL).toMatch(/can later become a real\s+component prop \(caller-overridable\) with the extracted constant demoted to just its\s+default value, without a rename/i);
  });

  it('requires an extracted plain object/array literal to carry an explicit prop-type annotation, not bare inference, so a shape mismatch is caught at the .const.ts declaration and the file stays self-documenting', () => {
    // Without an explicit annotation, a wrong-shaped literal only fails to typecheck (if at
    // all) at its JSX usage site, not at its own declaration, and a reader of .const.ts
    // alone can't tell which prop's shape a bare-inferred constant is meant to satisfy.
    expect(SKILL).toMatch(/must carry an explicit\s+type annotation\s+naming the exact prop type it configures/i);
    expect(SKILL).toMatch(/GridProps\["rowSpacing"\]/);
    expect(SKILL).toMatch(/importing `GridProps`.*from the same\s+library the prop belongs to/i);
    // A typed function call already carries the guarantee via its own return type, so the
    // annotation requirement is scoped to the plain-literal case only.
    expect(SKILL).toMatch(/already carries\s+this guarantee from the call's own return type/i);
  });

  it('keeps layout/structure out of the data-sourcing rule: Grid/Stack breakpoints stay in .const.ts, never in sections-api', () => {
    // A real run proposed extending the content-data-sourcing rule to layout props too.
    // That's the wrong axis: no sibling component anywhere sources Grid/Stack breakpoints
    // from sections-api, including the component the data-sourcing rule's own precedent
    // check is modeled on. This guards against conflating "content" with "layout" again.
    expect(SKILL).toMatch(/This bullet is about content, not\s+layout/i);
    expect(SKILL).toMatch(/no sibling anywhere in that\s+same codebase sources layout breakpoints from `sections-api`/i);
    expect(SKILL).toMatch(/is a far bigger call than\s+this skill has standing to make unilaterally/i);
  });

  it('broadens the types.ts check to any type the module declares, not only props, per typescript-conventions.md §T.1', () => {
    // The prior checklist only checked for an inline props interface. §T.1 is broader:
    // every declared type owns a companion types file, promoted only on a second consumer
    // per §T.2. A module-local, non-props type (e.g. a shared item-shape interface) was
    // being missed under the narrower, props-only reading.
    expect(SKILL).toMatch(/any type the module declares/i);
    expect(SKILL).toMatch(/§T\.1/);
    expect(SKILL).toMatch(/§T\.2/);
  });

  it('states its own out-of-scope boundaries: no real-component run, single-project extras stay in that project\'s own caller skill', () => {
    expect(SKILL).toMatch(/## Out of scope/);
    expect(SKILL).toMatch(/Running this skill against any real component/i);
    expect(SKILL).toMatch(/own \*extra\* checks beyond the LittleBranches-wide conventions/i);
    expect(SKILL).toMatch(/never the other way around/i);
  });
});
