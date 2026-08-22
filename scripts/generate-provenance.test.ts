import { describe, expect, it } from 'vitest';
import {
  buildUpstreamUrl,
  deriveStatus,
  extractHeadings,
  extractSections,
  parseNumstat,
  summarizeChange,
} from './generate-provenance';

describe('deriveStatus', () => {
  it('classifies a path with no upstream counterpart as "original"', () => {
    expect(deriveStatus(false, false)).toBe('original');
  });

  it('classifies an upstream path with no diff as "upstream"', () => {
    expect(deriveStatus(true, true)).toBe('upstream');
  });

  it('classifies an upstream path with a diff as "modified"', () => {
    expect(deriveStatus(true, false)).toBe('modified');
  });

  it('ignores the diff flag when the path does not exist upstream', () => {
    // A path that doesn't exist upstream can't have been "unchanged" from it:
    // existence takes priority regardless of what the diff flag says.
    expect(deriveStatus(false, true)).toBe('original');
  });
});

describe('buildUpstreamUrl', () => {
  it('builds a tree URL pinned to the exact upstream commit', () => {
    expect(buildUpstreamUrl('skills/productivity/teach', 'abc1234')).toBe(
      'https://github.com/mattpocock/skills/tree/abc1234/skills/productivity/teach',
    );
  });
});

describe('parseNumstat', () => {
  const SKILL_PATH = 'skills/engineering/ask-matt';

  it('parses added/removed line counts and strips the skill-folder prefix from each path', () => {
    const output = '12\t4\tskills/engineering/ask-matt/SKILL.md\n3\t0\tskills/engineering/ask-matt/agents/openai.yaml\n';
    expect(parseNumstat(output, SKILL_PATH)).toEqual([
      { file: 'SKILL.md', added: 12, removed: 4 },
      { file: 'agents/openai.yaml', added: 3, removed: 0 },
    ]);
  });

  it('treats binary-file "-" markers as zero rather than NaN', () => {
    const output = '-\t-\tskills/engineering/ask-matt/assets/diagram.png\n';
    expect(parseNumstat(output, SKILL_PATH)).toEqual([
      { file: 'assets/diagram.png', added: 0, removed: 0 },
    ]);
  });

  it('returns an empty array for empty output', () => {
    expect(parseNumstat('', SKILL_PATH)).toEqual([]);
  });
});

describe('extractHeadings', () => {
  it('extracts level-2 headings only, in document order', () => {
    const md = '# Title\n\n## What it does\n\nsome text\n\n### Not a level-2 heading\n\n## When to reach for it\n';
    expect(extractHeadings(md)).toEqual(['What it does', 'When to reach for it']);
  });

  it('returns an empty array when there are no level-2 headings', () => {
    expect(extractHeadings('# Title\n\nJust a paragraph.\n')).toEqual([]);
  });
});

describe('extractSections', () => {
  it('splits into heading/body pairs plus a leading "the introduction" pseudo-section', () => {
    const md = '# Title\n\nIntro text.\n\n## What it does\n\nBody one.\n\n## When to reach for it\n\nBody two.\n';
    expect(extractSections(md)).toEqual([
      { heading: 'the introduction', body: '# Title\n\nIntro text.\n\n' },
      { heading: 'What it does', body: '\nBody one.\n\n' },
      { heading: 'When to reach for it', body: '\nBody two.\n\n' },
    ]);
  });
});

describe('summarizeChange', () => {
  it('reports an added section', () => {
    const oldMd = '## What it does\n';
    const newMd = '## What it does\n\n## Review step\n';
    expect(summarizeChange(oldMd, newMd)).toBe("Adds 'Review step'.");
  });

  it('reports a removed section', () => {
    const oldMd = '## What it does\n\n## Legacy notes\n';
    const newMd = '## What it does\n';
    expect(summarizeChange(oldMd, newMd)).toBe("Removes 'Legacy notes'.");
  });

  it('reports both additions and removals together', () => {
    const oldMd = '## What it does\n\n## Legacy notes\n';
    const newMd = '## What it does\n\n## Review step\n';
    expect(summarizeChange(oldMd, newMd)).toBe("Adds 'Review step'; removes 'Legacy notes'.");
  });

  it('joins three or more additions with a serial comma', () => {
    const oldMd = '## What it does\n';
    const newMd = '## What it does\n\n## A\n\n## B\n\n## C\n';
    expect(summarizeChange(oldMd, newMd)).toBe("Adds 'A', 'B', and 'C'.");
  });

  it('reports wording changed within a section whose heading did not change (the case that used to return null)', () => {
    const oldMd = '## What it does\n\nOld wording.\n';
    const newMd = '## What it does\n\nNew wording.\n';
    expect(summarizeChange(oldMd, newMd)).toBe("Changes wording in 'What it does'.");
  });

  it('reports a changed introduction (text before the first heading)', () => {
    const oldMd = '# Old Title\n\n## What it does\n\nSame body.\n';
    const newMd = '# New Title\n\n## What it does\n\nSame body.\n';
    expect(summarizeChange(oldMd, newMd)).toBe('Changes wording in the introduction.');
  });

  it('combines an addition with a wording change elsewhere', () => {
    const oldMd = '## What it does\n\nOld wording.\n';
    const newMd = '## What it does\n\nNew wording.\n\n## Review step\n';
    expect(summarizeChange(oldMd, newMd)).toBe("Adds 'Review step'; changes wording in 'What it does'.");
  });

  it('returns null when nothing at the section level actually differs', () => {
    const oldMd = '## What it does\n\nSame wording.\n';
    const newMd = '## What it does\n\nSame wording.\n';
    expect(summarizeChange(oldMd, newMd)).toBeNull();
  });
});
