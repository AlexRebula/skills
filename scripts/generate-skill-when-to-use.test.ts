import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { extractWhenToUse, generateSkillWhenToUse } from './generate-skill-when-to-use';

function doc(...sectionLines: string[]): string {
  return [
    '## What it does',
    '',
    'Not part of it.',
    '',
    '## When to reach for it',
    '',
    ...sectionLines,
    '',
    '## Where it fits',
    '',
    'Not part of it either.',
    '',
  ].join('\n');
}

describe('extractWhenToUse', () => {
  it('returns the first sentence of the "When to reach for it" section', () => {
    expect(extractWhenToUse(doc('Run it at the start of the day. It sweeps every repo.'))).toBe(
      'Run it at the start of the day.',
    );
  });

  it('keeps inline markdown (code spans, links, emphasis) exactly as written', () => {
    const sentence =
      'Type `/research`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it **on its own** when `AGENTS.md` needs reading.';
    expect(extractWhenToUse(doc(`${sentence} Then it writes the findings up.`))).toBe(sentence);
  });

  it('joins a hard-wrapped first sentence back onto one line', () => {
    expect(
      extractWhenToUse(doc('`create-pr` calls this automatically, so you don\'t normally invoke it', 'directly. Run it by hand otherwise.')),
    ).toBe("`create-pr` calls this automatically, so you don't normally invoke it directly.");
  });

  it('ends a sentence whose full stop sits inside a closing quote', () => {
    expect(extractWhenToUse(doc('Ask for it with "sync up," or "open a promotion PR." Run it once you have built something.'))).toBe(
      'Ask for it with "sync up," or "open a promotion PR."',
    );
  });

  it('skips a leading usage-signature line, table, or list to reach the first prose paragraph', () => {
    const section = doc(
      '`/query-issues <owner>/<repo> <label>`',
      '',
      '| Your situation | Where to go |',
      '| --- | --- |',
      '| a | b |',
      '',
      '- a list item.',
      '',
      'Run it at the start of a session. Or any time.',
    );
    expect(extractWhenToUse(section)).toBe('Run it at the start of a session.');
  });

  it('falls back to the first situation cell of a "Your situation" table when the section has no prose', () => {
    const section = doc(
      '| Your situation | Where to go |',
      '| --- | --- |',
      '| You have a draft `theme` override that needs re-authoring | `port-mui-theme-override` |',
      '| You are building from scratch | [create-react-component](./create-react-component.md) |',
    );
    expect(extractWhenToUse(section)).toBe('You have a draft `theme` override that needs re-authoring');
  });

  it('throws when the section exists but holds nothing usable', () => {
    expect(() => extractWhenToUse(doc('- only a list item'))).toThrow();
  });

  it('returns undefined when the doc has no "When to reach for it" section', () => {
    const noSection = '## What it does\n\nSomething.\n\n## Where it fits\n\nElsewhere.\n';
    expect(extractWhenToUse(noSection)).toBeUndefined();
  });
});

describe('generateSkillWhenToUse', () => {
  let root: string;
  let skillsRoot: string;
  let docsRoot: string;

  function makeSkill(category: string, name: string, docBody?: string) {
    const dir = join(skillsRoot, category, name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'SKILL.md'), `# ${name}\n`);
    if (docBody === undefined) return;
    mkdirSync(join(docsRoot, category), { recursive: true });
    writeFileSync(join(docsRoot, category, `${name}.md`), docBody);
  }

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'skill-when-to-use-'));
    skillsRoot = join(root, 'skills');
    docsRoot = join(root, 'docs');
    mkdirSync(skillsRoot, { recursive: true });
    mkdirSync(docsRoot, { recursive: true });
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('keys each whenToUse by "category/name", the same keys as skill-summaries.json', () => {
    makeSkill('engineering', 'tdd', doc('Type `/tdd` when building test-first. More.'));

    const { whenToUse, unusable } = generateSkillWhenToUse(skillsRoot, docsRoot);

    expect(unusable).toEqual([]);
    expect(whenToUse).toEqual({ 'engineering/tdd': 'Type `/tdd` when building test-first.' });
  });

  it('leaves out a skill whose docs page has no "When to reach for it" section, rather than an empty string', () => {
    makeSkill('engineering', 'tdd', '## What it does\n\nBuilds features test-first.\n');
    makeSkill('wiki', 'ingest'); // no docs page at all

    const { whenToUse, unusable } = generateSkillWhenToUse(skillsRoot, docsRoot);

    expect(unusable).toEqual([]);
    expect(whenToUse).toEqual({});
  });

  it('reports a section with nothing usable in it as unusable, rather than throwing', () => {
    makeSkill('engineering', 'tdd', doc('- only a list item'));

    const { whenToUse, unusable } = generateSkillWhenToUse(skillsRoot, docsRoot);

    expect(unusable).toEqual(['engineering/tdd']);
    expect(whenToUse).toEqual({});
  });
});
