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
    expect(SKILL).toContain('component-configuration-conventions.md');
    expect(SKILL).toMatch(/§16 Component Configuration Conventions/);
  });

  it('fetches all seven expanded standards docs and explains why a fixed excerpt list goes stale', () => {
    // Root cause of the original gap: the skill's own checklist was a fixed, hand-typed
    // list that never grew when the upstream standards docs did, and whole documents
    // (typescript-conventions.md, then later component-api-contract.md and
    // documentation-strategy.md, then later still component-configuration-conventions.md)
    // were never fetched in the first place. The fix is twofold: fetch every relevant doc,
    // and tell the reader to check the doc's full text rather than treat the named bullets
    // as exhaustive.
    expect(SKILL).toMatch(/fixed excerpt list goes stale/i);
    expect(SKILL).toMatch(/read each document's full text/i);
    expect(SKILL).toMatch(/not a fixed excerpt/i);
    expect(SKILL).toMatch(/floor, not a ceiling/i);
    expect(SKILL).toMatch(/Fetch all seven of the following/i);
    expect(SKILL).toMatch(/not the full content of the seven documents/i);
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

  it('requires splitting a second independently-consumed component out of a shared file into its own subfolder, unconditionally, now pointing at the upstreamed AGENTS.md §5.6 instead of restating a flat-file fallback that no longer exists', () => {
    // New LittleBranches convention: one exported, independently-consumed component per
    // file. A private, first-only internal helper sharing the file is fine; a second
    // export some other file imports directly is not. wiki#973 upstreamed the "every
    // sub-component gets its own subfolder, unconditionally, no flat-file fallback" rule
    // into AGENTS.md §5.6 / component-structure.md: this bullet used to offer a "lighter
    // flat-file split" option for a non-standalone second export, which the upstreamed
    // rule now forecloses; the bullet points at §5.6 instead of restating (and
    // contradicting) it.
    expect(SKILL).toMatch(/More than one independently-consumed component exported from one file/i);
    expect(SKILL).toMatch(/imported directly by some \*other\* file/i);
    expect(SKILL).toMatch(/not a private,\s+first-only helper/i);
    expect(SKILL).toMatch(/its own\s+named\s+subfolder, always, regardless of how small/i);
    expect(SKILL).toMatch(/§5\.6,\s+Standalone vs\. sub-component test/);
    expect(SKILL).toMatch(/no flat-file\s+fallback for a sub-component/i);
    expect(SKILL).toMatch(/read that section's own text rather than a\s+restatement here/i);
    // The old conditional "lighter flat-file split" escape hatch is gone now that the
    // upstreamed rule forecloses it: guard against it silently creeping back in.
    expect(SKILL).not.toMatch(/lighter flat-file split/i);
    expect(SKILL).not.toMatch(/or into its own flat\s+sibling file \(still separate from the primary export\)/i);
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

  it('extends the data-sourcing check to hardcoded heading/caption/copy text, not only list/demo content, by comparing against sibling components, now pointing at the upstreamed AGENTS.md §15.3', () => {
    // Originally this skill's own checklist carried the sibling-comparison method in full
    // prose (a real run flagged a hardcoded showcase-content array as a violation but missed
    // that a sibling section also hardcoded its own heading/caption copy, detected only by
    // comparing against sibling shape). wiki#973 upstreamed that exact method into AGENTS.md
    // §15.3 / component-refactor-conventions.md, so this skill's own bullet is thinned down
    // to a pointer rather than restating the method in full.
    expect(SKILL).toMatch(/heading\/caption copy/i);
    expect(SKILL).toMatch(/comparing the target against\s+every sibling component of a similar shape/i);
    expect(SKILL).toMatch(/applying equally to a single hardcoded\s+heading\/caption string as to a whole content array/i);
    expect(SKILL).toMatch(/AGENTS\.md\s+§15\.3,\s+Extracting demo and fixture data to a dedicated module/);
    expect(SKILL).toMatch(/read that section's own text rather than a\s+restatement here/i);
    // The old in-skill anecdote/rationale prose this rule used to restate is gone now that
    // it lives upstream: guard against it silently creeping back in.
    expect(SKILL).not.toMatch(/do not scope this check to "the big list of\s+content" alone/i);
    expect(SKILL).not.toMatch(/PageSection/);
  });

  it('extracts inline Grid/Stack layout-prop object literals (size, rowSpacing, columnSpacing) to .const.ts, now pointing at the upstreamed AGENTS.md §16.1 instead of restating it', () => {
    // wiki#975 upstreamed this exact rule (a Grid/layout literal on size/rowSpacing/
    // columnSpacing/spacing must be extracted to <name>.const.ts) into AGENTS.md §16.1 /
    // component-configuration-conventions.md. This skill's own bullet now points there
    // instead of restating the full rule and its rationale in its own prose.
    expect(SKILL).toMatch(/rowSpacing[\s\S]*columnSpacing/);
    expect(SKILL).toMatch(/§16\.1 Grid\/layout/);
    expect(SKILL).toMatch(/AGENTS\.md\s+§16, Component Configuration Conventions/);
    expect(SKILL).toMatch(/component-configuration-conventions\.md/);
    // The old full restatement of this rule's own reasoning is gone now that it lives
    // upstream: guard against it silently creeping back in.
    expect(SKILL).not.toMatch(/Same extraction principle as `sx`\s+above, generalized fully/i);
  });

  it('extends the same extraction rule to inline animation/motion config literals (variants, animate, transition), now pointing at the upstreamed AGENTS.md §16.2 instead of restating it', () => {
    // wiki#975 upstreamed the motion-config extraction rule (variants always extracted;
    // animate/transition extracted at two-or-more keys; the 1-key/2-key threshold this
    // skill's own checklist never even stated) into AGENTS.md §16.2 /
    // component-configuration-conventions.md. This skill's own bullet now points there
    // instead of restating (and under-specifying) the rule itself.
    expect(SKILL).toMatch(/variants.*animate.*transition/);
    expect(SKILL).toMatch(/§16\.2 motion/);
    expect(SKILL).toMatch(/component-configuration-conventions\.md/);
    // The old, now-superseded exact example text is gone: guard against it creeping back
    // as a restatement instead of a pointer.
    expect(SKILL).not.toMatch(/variants=\{fade\("inUp", \{ distance: 24 \}\)\}/);
  });

  it('flags an sx array combining already-named exports as still needing extraction, keeping only the unavoidable cast at the JSX call site', () => {
    // A real run left `sx={[fooSx, barSx(1)] as SxProps<Theme>}` inline even though both
    // array elements were already named exports — the array-combining itself is still
    // inline composition logic. Verified directly against a real component: removing the
    // `as SxProps<Theme>` cast breaks the build (component={m.div} narrows the sx prop
    // type to reject arrays), and neither a wrapper function nor a pre-typed variable
    // avoids needing the cast — only moving the combining logic into .styles.ts while
    // keeping the cast at the JSX site actually works.
    expect(SKILL).toMatch(/This includes an array\s+that combines already-named `sx` exports/i);
    expect(SKILL).toMatch(/even when every individual element is\s+already a named export, the array-combining itself is still inline composition logic/i);
    expect(SKILL).toMatch(/that\s+part of the escape hatch can't move into `\.styles\.ts`, since the typing gap is on the\s+consuming prop, not on where the value is built/i);
  });

  it('holds `style={{ ... }}` on a motion/component={m.*} element to the same extraction standard as `sx`, now pointing at the upstreamed AGENTS.md §16.2 instead of restating the MotionValue-factory pattern', () => {
    // wiki#975 upstreamed this skill's own MotionValue-factory pattern into AGENTS.md
    // §16.2 / component-configuration-conventions.md. The bullet now points there instead
    // of restating the factory example in the skill's own prose.
    expect(SKILL).toMatch(/`style={{ \.\.\. }}` on a `motion\.\*` element/i);
    expect(SKILL).toMatch(/zero-tolerance extraction standard as\s+`sx`/i);
    expect(SKILL).toMatch(/`MotionValue`-factory\s+pattern for a dynamic style value/i);
    expect(SKILL).toMatch(/§16\.2,\s+Motion configuration extraction/);
    expect(SKILL).toMatch(/component-configuration-conventions\.md/);
    // The old full factory-example restatement is gone now that it lives upstream: guard
    // against it silently creeping back in.
    expect(SKILL).not.toMatch(/fooTrackXStyle/);
  });

  it('extends the extraction rule further to a single hardcoded scalar/enum-token prop value, now pointing at the upstreamed AGENTS.md §16.3 instead of restating it', () => {
    // wiki#975 upstreamed this exact rule, including this skill's own `titleComponent="h3"`
    // example, into AGENTS.md §16.3 / component-configuration-conventions.md. The bullet
    // keeps the one example that still identifies the rule at a glance but points to the
    // upstream doc for the full rationale instead of restating it.
    expect(SKILL).toMatch(/single hardcoded scalar\/enum-token prop value/i);
    expect(SKILL).toMatch(/titleComponent="h3" titleVariant="h3"/);
    expect(SKILL).toMatch(/§16\.3\s+scalar\/enum/);
    expect(SKILL).toMatch(/content-vs-configuration\s+boundary/i);
    expect(SKILL).toMatch(/a component-reference prop like `component={m\.div}` is exempt/i);
    // The old second (Button) example and the full "never about children" restatement are
    // gone now that the rule lives upstream: guard against them creeping back in.
    expect(SKILL).not.toMatch(/size="large" color="inherit" variant="outlined"/);
  });

  it('requires extracted .const.ts settings to use SCREAMING_SNAKE_CASE, now pointing at the upstreamed AGENTS.md §16 instead of restating the caller-overridable-prop rationale', () => {
    // wiki#975 upstreamed this skill's own SCREAMING_SNAKE_CASE-naming and
    // caller-overridable-prop rationale into component-configuration-conventions.md. The
    // bullet now names both concerns and points to the doc instead of restating the full
    // reasoning.
    expect(SKILL).toMatch(/`SCREAMING_SNAKE_CASE` naming\s+convention/i);
    expect(SKILL).toMatch(/caller-overridable-prop rationale/i);
    expect(SKILL).toMatch(/component-configuration-conventions\.md/);
    // The old, fully-restated rationale prose is gone now that it lives upstream: guard
    // against it silently creeping back in.
    expect(SKILL).not.toMatch(/every tunable setting for a\s+component is visible in one glance down that one file/i);
  });

  it('requires every extracted configuration constant to carry an explicit prop-type annotation, now pointing at the upstreamed AGENTS.md §16 shared requirement instead of restating the three reasons', () => {
    // wiki#975 upstreamed this skill's own explicit-typing requirement, including its
    // three reasons and its fade(...)/GridProps examples, into
    // component-configuration-conventions.md's shared "explicit-typing requirement"
    // section. The bullet now points there instead of restating the reasoning and examples.
    expect(SKILL).toMatch(/the shared\s+explicit-typing requirement/i);
    expect(SKILL).toMatch(/component-configuration-conventions\.md/);
    // The old, fully-restated three-reasons rationale and examples are gone now that they
    // live upstream: guard against them silently creeping back in. The negative match below
    // deliberately avoids hardcoding the old example's vendor-specific constant name (slated
    // for its own rename elsewhere): it matches on the generic _ENTRANCE_VARIANTS/fade(...)
    // shape instead, so no vendor-specific identifier needs to live in this skill's own test
    // file.
    expect(SKILL).not.toMatch(/GridProps\["rowSpacing"\]/);
    expect(SKILL).not.toMatch(/_ENTRANCE_VARIANTS: Variants = fade\("inUp", \{ distance: 24 \}\)/);
    expect(SKILL).not.toMatch(/shouldn't have to go trace a third-party\s+function's own declaration file/i);
  });

  it('keeps layout/configuration out of the data-sourcing rule: content moves to a data layer, configuration stays in .const.ts, now pointing back at the §16 bullet instead of restating the boundary', () => {
    // The old bullet restated the content-vs-layout boundary with a full anecdote (no
    // sibling sources Grid/Stack breakpoints from sections-api). That boundary is now
    // stated once, at the top of the §16 bullet's own replacement text
    // (component-configuration-conventions.md's own "what counts as configuration, not
    // content" section states it upstream too): the data-sourcing bullet just points back
    // to it instead of re-arguing it.
    expect(SKILL).toMatch(/This bullet is about content, not\s+layout\/configuration/i);
    expect(SKILL).toMatch(/see the\s+Grid\/motion\/scalar bullet above \(§16\) for that axis/i);
    // The old anecdotal restatement is gone now that the boundary is stated once: guard
    // against it silently creeping back in.
    expect(SKILL).not.toMatch(/no sibling anywhere in that\s+same codebase sources layout breakpoints from `sections-api`/i);
    expect(SKILL).not.toMatch(/is a far bigger call than\s+this skill has standing to make unilaterally/i);
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
