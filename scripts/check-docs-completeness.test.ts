import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  checkDocsCompleteness,
  formatReport,
  listSkillsInCategory,
} from './check-docs-completeness';

let root: string;
let skillsRoot: string;
let docsRoot: string;

/** Create skills/<category>/<name>/SKILL.md so the folder counts as a skill. */
function makeSkill(category: string, name: string) {
  const dir = join(skillsRoot, category, name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'SKILL.md'), `# ${name}\n`);
}

/** Create docs/<category>/<name>.md so the skill counts as documented. */
function makeDocsPage(category: string, name: string) {
  const dir = join(docsRoot, category);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${name}.md`), `# ${name}\n`);
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'docs-completeness-'));
  skillsRoot = join(root, 'skills');
  docsRoot = join(root, 'docs');
  mkdirSync(skillsRoot, { recursive: true });
  mkdirSync(docsRoot, { recursive: true });
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('checkDocsCompleteness', () => {
  it('reports zero missing when every skill in the target categories has a docs page', () => {
    makeSkill('engineering', 'tdd');
    makeDocsPage('engineering', 'tdd');
    makeSkill('wiki', 'capture');
    makeDocsPage('wiki', 'capture');

    const report = checkDocsCompleteness(skillsRoot, docsRoot);

    expect(report.totalMissing).toBe(0);
    expect(report.missingByCategory).toEqual({});
    expect(report.totalSkillsChecked).toBe(2);
    expect(formatReport(report)).toMatch(/All 2 skill\(s\).*have a docs page/);
  });

  it('reports a clear per-category list when some skills are missing docs pages', () => {
    makeSkill('engineering', 'tdd');
    makeDocsPage('engineering', 'tdd');
    makeSkill('engineering', 'deslopify'); // no docs page
    makeSkill('wiki', 'capture'); // no docs page
    makeDocsPage('wiki', 'other-skill'); // unrelated docs page, should not count

    const report = checkDocsCompleteness(skillsRoot, docsRoot);

    expect(report.totalMissing).toBe(2);
    expect(report.missingByCategory.engineering).toEqual(['deslopify']);
    expect(report.missingByCategory.wiki).toEqual(['capture']);
    expect(report.missingByCategory.git).toBeUndefined();

    const text = formatReport(report);
    expect(text).toContain('engineering:');
    expect(text).toContain('- deslopify (expected docs/engineering/deslopify.md)');
    expect(text).toContain('wiki:');
    expect(text).toContain('- capture (expected docs/wiki/capture.md)');
  });

  it('ignores deprecated and in-progress categories entirely, even when populated with undocumented skills', () => {
    // A populated target category with full docs, so the only "missing" signal
    // that could appear must come from deprecated/in-progress if they leaked in.
    makeSkill('engineering', 'tdd');
    makeDocsPage('engineering', 'tdd');

    // deprecated and in-progress both contain skills with SKILL.md and no docs page.
    makeSkill('deprecated', 'qa');
    makeSkill('deprecated', 'design-an-interface');
    makeSkill('in-progress', 'loop-me');
    makeSkill('in-progress', 'claude-handoff');

    const report = checkDocsCompleteness(skillsRoot, docsRoot);

    expect(report.totalMissing).toBe(0);
    expect(report.missingByCategory).toEqual({});
    // Only the one engineering skill was ever counted: deprecated/in-progress
    // skills must not contribute to totalSkillsChecked either.
    expect(report.totalSkillsChecked).toBe(1);
    expect(report.missingByCategory.deprecated).toBeUndefined();
    expect(report.missingByCategory['in-progress']).toBeUndefined();

    // Also verify directly that the enumeration helper never looks at these
    // categories, independent of docs-matching logic.
    expect(listSkillsInCategory(skillsRoot, 'deprecated')).toEqual(['design-an-interface', 'qa']);
    // (listSkillsInCategory itself is category-agnostic; the ignoring happens
    // in checkDocsCompleteness by only iterating TARGET_CATEGORIES.)
  });

  it('ignores non-skill entries such as a category-level README.md', () => {
    mkdirSync(join(skillsRoot, 'misc'), { recursive: true });
    writeFileSync(join(skillsRoot, 'misc', 'README.md'), '# misc\n');
    makeSkill('misc', 'setup-pre-commit');
    makeDocsPage('misc', 'setup-pre-commit');

    const skills = listSkillsInCategory(skillsRoot, 'misc');

    expect(skills).toEqual(['setup-pre-commit']);
  });

  it('treats a target category directory that does not exist yet as having zero skills', () => {
    // e.g. docs/git doesn't exist in the real repo yet; the skills-side
    // equivalent should not throw if a target category folder is absent.
    const report = checkDocsCompleteness(skillsRoot, docsRoot);
    expect(report.totalSkillsChecked).toBe(0);
    expect(report.totalMissing).toBe(0);
  });
});
