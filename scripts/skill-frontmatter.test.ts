import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { collectFrontmatterField, readFrontmatter } from './skill-frontmatter';
import { generateSkillTaglines, TAGLINE_WORDS } from './generate-skill-taglines';
import { generateSkillOutcomes, OUTCOME_MAX_LENGTH } from './generate-skill-outcomes';

describe('readFrontmatter', () => {
  it('reads each double-quoted value from the block at the top of a page', () => {
    const doc = [
      '---',
      'tagline: "Red, green, refactor"',
      'outcome: "A feature built one slice at a time: tested."',
      '---',
      '',
      '## What it does',
      '',
    ].join('\n');

    expect(readFrontmatter(doc)).toEqual({
      tagline: 'Red, green, refactor',
      outcome: 'A feature built one slice at a time: tested.',
    });
  });

  it('keeps an apostrophe and an escaped quote as written', () => {
    const doc = '---\ntagline: "Re-explain what didn\'t \\"land\\""\n---\n';
    expect(readFrontmatter(doc).tagline).toBe('Re-explain what didn\'t "land"');
  });

  it('is empty for a page with no frontmatter', () => {
    expect(readFrontmatter('## What it does\n\nText.\n')).toEqual({});
  });

  it('throws on a value that is not double-quoted, so a page never ships half-parsed', () => {
    expect(() => readFrontmatter('---\ntagline: Red, green\n---\n')).toThrow(/double-quoted/);
  });
});

describe('the per-skill frontmatter generators', () => {
  let root: string;
  let skillsRoot: string;
  let docsRoot: string;

  function makeSkill(category: string, name: string, frontmatter: Record<string, string>) {
    mkdirSync(join(skillsRoot, category, name), { recursive: true });
    writeFileSync(join(skillsRoot, category, name, 'SKILL.md'), `# ${name}\n`);
    mkdirSync(join(docsRoot, category), { recursive: true });
    const block = Object.entries(frontmatter)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');
    const head = block ? `---\n${block}\n---\n\n` : '';
    writeFileSync(join(docsRoot, category, `${name}.md`), `${head}## What it does\n\nText.\n`);
  }

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'skill-frontmatter-'));
    skillsRoot = join(root, 'skills');
    docsRoot = join(root, 'docs');
    mkdirSync(skillsRoot, { recursive: true });
    mkdirSync(docsRoot, { recursive: true });
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('keys each value by "category/name", like every other per-skill data file', () => {
    makeSkill('engineering', 'tdd', { tagline: 'Red, green, refactor' });
    const { values, problems } = collectFrontmatterField(
      skillsRoot,
      docsRoot,
      'tagline',
      () => null
    );
    expect(problems).toEqual([]);
    expect(values).toEqual({ 'engineering/tdd': 'Red, green, refactor' });
  });

  it('reports a page that has no tagline, or one outside 3 to 5 words', () => {
    makeSkill('engineering', 'tdd', { tagline: 'Red, green, refactor' });
    makeSkill('engineering', 'grill-me', {});
    makeSkill('engineering', 'to-spec', { tagline: 'Spec' });
    makeSkill('engineering', 'to-tickets', { tagline: 'One two three four five six' });

    const { values, problems } = generateSkillTaglines(skillsRoot, docsRoot);

    expect(values).toEqual({ 'engineering/tdd': 'Red, green, refactor' });
    expect(problems.map((problem) => problem.split(':')[0]).sort()).toEqual([
      'engineering/grill-me',
      'engineering/to-spec',
      'engineering/to-tickets',
    ]);
    expect(TAGLINE_WORDS).toEqual({ min: 3, max: 5 });
  });

  it('reports a page that has no outcome, or one too long for the line above the belt', () => {
    makeSkill('engineering', 'tdd', { outcome: 'A feature built one slice at a time.' });
    makeSkill('engineering', 'grill-me', {});
    makeSkill('engineering', 'to-spec', { outcome: 'x'.repeat(OUTCOME_MAX_LENGTH + 1) });

    const { values, problems } = generateSkillOutcomes(skillsRoot, docsRoot);

    expect(values).toEqual({ 'engineering/tdd': 'A feature built one slice at a time.' });
    expect(problems.map((problem) => problem.split(':')[0]).sort()).toEqual([
      'engineering/grill-me',
      'engineering/to-spec',
    ]);
  });
});
