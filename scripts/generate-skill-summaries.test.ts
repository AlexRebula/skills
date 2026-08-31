import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { extractWhatItDoesParagraphs, generateSkillSummaries } from './generate-skill-summaries';

describe('extractWhatItDoesParagraphs', () => {
  it('returns each paragraph of the "What it does" section, in order', () => {
    const doc = [
      '## What it does',
      '',
      'First paragraph about the skill.',
      '',
      'Second paragraph with more depth.',
      '',
      '## When to reach for it',
      '',
      'Not part of the summary.',
      '',
    ].join('\n');

    expect(extractWhatItDoesParagraphs(doc)).toEqual([
      'First paragraph about the skill.',
      'Second paragraph with more depth.',
    ]);
  });

  it('filters out table rows and list items, keeping only prose paragraphs', () => {
    const doc = [
      '## What it does',
      '',
      'A real paragraph.',
      '',
      '| Column | Column |',
      '| --- | --- |',
      '| a | b |',
      '',
      '- a list item',
      '',
      '## When to reach for it',
      '',
    ].join('\n');

    expect(extractWhatItDoesParagraphs(doc)).toEqual(['A real paragraph.']);
  });

  it('throws when the doc page has no "What it does" heading at all', () => {
    const doc = '## When to reach for it\n\nSomething else.\n';
    expect(() => extractWhatItDoesParagraphs(doc)).toThrow();
  });
});

describe('generateSkillSummaries', () => {
  let root: string;
  let skillsRoot: string;
  let docsRoot: string;

  function makeSkill(category: string, name: string) {
    const dir = join(skillsRoot, category, name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'SKILL.md'), `# ${name}\n`);
  }

  function makeDocsPage(category: string, name: string, body: string) {
    const dir = join(docsRoot, category);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${name}.md`), body);
  }

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'skill-summaries-'));
    skillsRoot = join(root, 'skills');
    docsRoot = join(root, 'docs');
    mkdirSync(skillsRoot, { recursive: true });
    mkdirSync(docsRoot, { recursive: true });
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('keys each summary by "category/name", matching FeatureFlowHighlightCard href shape', () => {
    makeSkill('engineering', 'tdd');
    makeDocsPage('engineering', 'tdd', '## What it does\n\nBuilds features test-first.\n');

    const { summaries, missing } = generateSkillSummaries(skillsRoot, docsRoot);

    expect(missing).toEqual([]);
    expect(summaries['engineering/tdd']).toEqual(['Builds features test-first.']);
  });

  it('reports a skill whose docs page has no "What it does" section as missing, rather than throwing', () => {
    makeSkill('engineering', 'tdd');
    makeDocsPage('engineering', 'tdd', '## When to reach for it\n\nNo summary heading here.\n');

    const { summaries, missing } = generateSkillSummaries(skillsRoot, docsRoot);

    expect(missing).toEqual(['engineering/tdd']);
    expect(summaries['engineering/tdd']).toBeUndefined();
  });

  it('silently skips a skill with no docs page at all (check-docs-completeness.ts already reports that gap)', () => {
    makeSkill('engineering', 'tdd'); // no matching docs page

    const { summaries, missing } = generateSkillSummaries(skillsRoot, docsRoot);

    expect(missing).toEqual([]);
    expect(summaries).toEqual({});
  });
});
