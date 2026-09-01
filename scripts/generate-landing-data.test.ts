import { describe, expect, it } from 'vitest';
import {
  collectSkillCategories,
  extractDescription,
  extractSection,
  extractSkills,
} from './generate-landing-data';

describe('extractSection', () => {
  it('extracts the body between one heading and the next', () => {
    const readme = [
      '## Git',
      '',
      'Git skills.',
      '',
      '- **[foo](./skills/git/foo/SKILL.md)**: does foo.',
      '',
      '## Misc',
      '',
      'Misc skills.',
    ].join('\n');

    expect(extractSection(readme, 'Git')).toContain('- **[foo](./skills/git/foo/SKILL.md)**: does foo.');
    expect(extractSection(readme, 'Git')).not.toContain('Misc skills.');
  });

  it('throws when the heading is not present', () => {
    expect(() => extractSection('## Git\n', 'Wiki')).toThrow(/Could not find/);
  });
});

describe('extractDescription', () => {
  it('returns the first non-empty, non-list, non-heading line', () => {
    const section = '\n\nGit skills for the full lifecycle.\n\n- **[foo]**: bar\n';
    expect(extractDescription(section)).toBe('Git skills for the full lifecycle.');
  });

  it('throws when no description paragraph is found', () => {
    expect(() => extractDescription('\n- **[foo]**: bar\n')).toThrow(/Could not find a category description/);
  });
});

describe('extractSkills', () => {
  it('parses name and description from a category section', () => {
    const section = '- **[foo](./skills/git/foo/SKILL.md)**: does foo.\n- **[bar](./skills/git/bar/SKILL.md)**: does bar.\n';
    expect(extractSkills(section)).toEqual([
      { name: 'foo', description: 'does foo.' },
      { name: 'bar', description: 'does bar.' },
    ]);
  });

  it('matches a bullet even when its link points to a different category folder than the section it is found in', () => {
    // A skill physically living under skills/git/ can be honestly
    // cross-listed under a different category's README section (its own
    // real link, not a broken one) — category attribution comes from the
    // section, not the link's path segment. See the function's doc comment.
    const section = '- **[commit-wip](./skills/git/commit-wip/SKILL.md)**: sweeps repos for uncommitted work.\n';
    expect(extractSkills(section)).toEqual([
      { name: 'commit-wip', description: 'sweeps repos for uncommitted work.' },
    ]);
  });
});

describe('collectSkillCategories', () => {
  it('assigns a single category to a skill found in only one bucket', () => {
    const result = collectSkillCategories([
      { key: 'git', skills: [{ name: 'foo', description: 'does foo.' }] },
      { key: 'misc', skills: [{ name: 'bar', description: 'does bar.' }] },
    ]);

    expect(result.get('foo')).toEqual(['git']);
    expect(result.get('bar')).toEqual(['misc']);
  });

  it('merges a skill found in more than one bucket into a single multi-value entry', () => {
    // The many-to-many case: one skill (by name) listed under two different
    // category buckets should end up with both categories recorded, not
    // just whichever bucket happened to be processed last.
    const result = collectSkillCategories([
      { key: 'git', skills: [{ name: 'triage', description: 'triage issues.' }] },
      { key: 'engineering', skills: [{ name: 'triage', description: 'triage issues.' }] },
      { key: 'misc', skills: [{ name: 'other', description: 'something else.' }] },
    ]);

    expect(result.get('triage')).toEqual(['git', 'engineering']);
    expect(result.get('other')).toEqual(['misc']);
  });

  it('does not duplicate a category if the same skill/category pair somehow appears twice', () => {
    const result = collectSkillCategories([
      { key: 'git', skills: [{ name: 'foo', description: 'a' }, { name: 'foo', description: 'a' }] },
    ]);

    expect(result.get('foo')).toEqual(['git']);
  });

  it('returns an empty map for no categories', () => {
    expect(collectSkillCategories([]).size).toBe(0);
  });
});
