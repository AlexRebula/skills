import { describe, expect, it } from 'vitest';
import {
  buildLineDiff,
  buildUpstreamUrl,
  deriveStatus,
  extractHeadings,
  extractSections,
  parseHistoryLog,
  parseNumstat,
  summarizeChange,
  toSkillFolderPath,
} from './generate-provenance';

describe('deriveStatus', () => {
  it('classifies a path with no upstream counterpart, never in upstream history, as "original"', () => {
    expect(
      deriveStatus({ existsUpstream: false, unchangedVsUpstream: false, existedUpstreamHistorically: false }),
    ).toBe('original');
  });

  it('classifies a path with no current upstream counterpart, but present in upstream history, as "inherited"', () => {
    expect(
      deriveStatus({ existsUpstream: false, unchangedVsUpstream: false, existedUpstreamHistorically: true }),
    ).toBe('inherited');
  });

  it('classifies an upstream path with no diff as "upstream"', () => {
    expect(
      deriveStatus({ existsUpstream: true, unchangedVsUpstream: true, existedUpstreamHistorically: false }),
    ).toBe('upstream');
  });

  it('classifies an upstream path with a diff as "modified"', () => {
    expect(
      deriveStatus({ existsUpstream: true, unchangedVsUpstream: false, existedUpstreamHistorically: false }),
    ).toBe('modified');
  });

  it('ignores the diff and history flags when the path currently exists upstream', () => {
    // Existence takes priority regardless of what the other flags say.
    expect(
      deriveStatus({ existsUpstream: true, unchangedVsUpstream: true, existedUpstreamHistorically: true }),
    ).toBe('upstream');
  });
});

describe('parseHistoryLog', () => {
  it('parses (commit, path) pairs from `git log --pretty=format:%H --name-only` output, most recent first', () => {
    const output = [
      '7d3ada9716a9ee08d6c6f775d8a78ef889e1798f',
      'skills/productivity/caveman/SKILL.md',
      '',
      '221ffca96736afefdc08ca7cf0b3965e9ea83f41',
      'skills/productivity/caveman/SKILL.md',
      '',
    ].join('\n');

    expect(parseHistoryLog(output)).toEqual([
      { sha: '7d3ada9716a9ee08d6c6f775d8a78ef889e1798f', path: 'skills/productivity/caveman/SKILL.md' },
      { sha: '221ffca96736afefdc08ca7cf0b3965e9ea83f41', path: 'skills/productivity/caveman/SKILL.md' },
    ]);
  });

  it('returns an empty array for empty output (name never appeared in upstream history)', () => {
    expect(parseHistoryLog('')).toEqual([]);
  });

  it('associates multiple paths in one commit with that same commit (e.g. a category move)', () => {
    const output = ['abc123def456abc123def456abc123def456abc1', 'skills/misc/foo/SKILL.md', 'skills/productivity/foo/SKILL.md'].join(
      '\n',
    );

    expect(parseHistoryLog(output)).toEqual([
      { sha: 'abc123def456abc123def456abc123def456abc1', path: 'skills/misc/foo/SKILL.md' },
      { sha: 'abc123def456abc123def456abc123def456abc1', path: 'skills/productivity/foo/SKILL.md' },
    ]);
  });
});

describe('buildUpstreamUrl', () => {
  it('builds a tree URL pinned to the exact upstream commit', () => {
    expect(buildUpstreamUrl('skills/productivity/teach', 'abc1234')).toBe(
      'https://github.com/mattpocock/skills/tree/abc1234/skills/productivity/teach',
    );
  });
});

describe('toSkillFolderPath', () => {
  it('strips the trailing /SKILL.md to get the containing skill folder', () => {
    expect(toSkillFolderPath('skills/personal/obsidian-vault/SKILL.md')).toBe('skills/personal/obsidian-vault');
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

describe('buildLineDiff', () => {
  it('reports a pure addition as a row with only a new side', () => {
    expect(buildLineDiff('a\n', 'a\nb\n')).toEqual([
      { type: 'context', oldLineNumber: 1, oldContent: 'a', newLineNumber: 1, newContent: 'a' },
      { type: 'add', oldLineNumber: null, oldContent: null, newLineNumber: 2, newContent: 'b' },
    ]);
  });

  it('reports a pure removal as a row with only an old side', () => {
    expect(buildLineDiff('a\nb\n', 'a\n')).toEqual([
      { type: 'context', oldLineNumber: 1, oldContent: 'a', newLineNumber: 1, newContent: 'a' },
      { type: 'remove', oldLineNumber: 2, oldContent: 'b', newLineNumber: null, newContent: null },
    ]);
  });

  it('pairs a same-position wording change onto one "change" row, not stacked remove-then-add rows', () => {
    expect(buildLineDiff('a\nfoo\n', 'a\nbar\n')).toEqual([
      { type: 'context', oldLineNumber: 1, oldContent: 'a', newLineNumber: 1, newContent: 'a' },
      { type: 'change', oldLineNumber: 2, oldContent: 'foo', newLineNumber: 2, newContent: 'bar' },
    ]);
  });

  it('reports every line as context, unpaired, when the file is fully unchanged', () => {
    expect(buildLineDiff('a\nb\n', 'a\nb\n')).toEqual([
      { type: 'context', oldLineNumber: 1, oldContent: 'a', newLineNumber: 1, newContent: 'a' },
      { type: 'context', oldLineNumber: 2, oldContent: 'b', newLineNumber: 2, newContent: 'b' },
    ]);
  });

  it('leaves the longer side unpaired when a replaced block has more lines on one side than the other', () => {
    expect(buildLineDiff('one\n', 'uno\ndos\n')).toEqual([
      { type: 'change', oldLineNumber: 1, oldContent: 'one', newLineNumber: 1, newContent: 'uno' },
      { type: 'add', oldLineNumber: null, oldContent: null, newLineNumber: 2, newContent: 'dos' },
    ]);
  });

  it('diffs a wholly new file (empty old side) as every line added, not silently empty', () => {
    expect(buildLineDiff('', 'a\nb\n')).toEqual([
      { type: 'add', oldLineNumber: null, oldContent: null, newLineNumber: 1, newContent: 'a' },
      { type: 'add', oldLineNumber: null, oldContent: null, newLineNumber: 2, newContent: 'b' },
    ]);
  });

  it('diffs a wholly deleted file (empty new side) as every line removed, not silently empty', () => {
    expect(buildLineDiff('a\nb\n', '')).toEqual([
      { type: 'remove', oldLineNumber: 1, oldContent: 'a', newLineNumber: null, newContent: null },
      { type: 'remove', oldLineNumber: 2, oldContent: 'b', newLineNumber: null, newContent: null },
    ]);
  });
});
