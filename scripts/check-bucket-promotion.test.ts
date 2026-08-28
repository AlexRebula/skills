import { describe, expect, it } from 'vitest';
import {
  checkBucketPromotion,
  findPluginJsonViolations,
  findReadmeViolations,
  formatReport,
} from './check-bucket-promotion';

function pluginJson(skills: string[]): string {
  return JSON.stringify({ skills }, null, 2);
}

function readmeEntry(category: string, name: string): string {
  return `- **[${name}](./skills/${category}/${name}/SKILL.md)**: does ${name} things.`;
}

describe('findPluginJsonViolations', () => {
  it('reports zero violations when the skills array only lists promoted-bucket entries', () => {
    const text = pluginJson(['./skills/engineering/tdd', './skills/git/create-pr']);
    expect(findPluginJsonViolations(text)).toEqual([]);
  });

  it('flags an entry from each of the four non-promoted buckets', () => {
    const text = pluginJson([
      './skills/engineering/tdd',
      './skills/misc/git-guardrails-claude-code',
      './skills/personal/caveman',
      './skills/in-progress/loop-me',
      './skills/deprecated/qa',
    ]);

    const violations = findPluginJsonViolations(text);

    expect(violations).toEqual([
      { category: 'misc', skill: 'git-guardrails-claude-code' },
      { category: 'personal', skill: 'caveman' },
      { category: 'in-progress', skill: 'loop-me' },
      { category: 'deprecated', skill: 'qa' },
    ]);
  });
});

describe('findReadmeViolations', () => {
  it('does not flag misc or personal entries: they are required by generate-landing-data.ts', () => {
    const readme = [readmeEntry('misc', 'setup-pre-commit'), readmeEntry('personal', 'caveman')].join('\n');

    expect(findReadmeViolations(readme)).toEqual([]);
  });

  it('flags in-progress and deprecated entries', () => {
    const readme = [
      readmeEntry('in-progress', 'loop-me'),
      readmeEntry('deprecated', 'qa'),
      readmeEntry('engineering', 'tdd'), // unaffected, promoted bucket
    ].join('\n');

    const violations = findReadmeViolations(readme);

    expect(violations).toEqual([
      { category: 'in-progress', skill: 'loop-me' },
      { category: 'deprecated', skill: 'qa' },
    ]);
  });

  it('ignores incidental prose mentions of the bucket name outside a skill-list entry', () => {
    const readme = 'Skills in `in-progress/` and `deprecated/` are not promoted in the plugin.';
    expect(findReadmeViolations(readme)).toEqual([]);
  });
});

describe('checkBucketPromotion / formatReport', () => {
  it('reports a clean pass when both files are clean', () => {
    const report = checkBucketPromotion(
      pluginJson(['./skills/engineering/tdd']),
      readmeEntry('misc', 'setup-pre-commit'),
    );

    expect(report.pluginJsonViolations).toEqual([]);
    expect(report.readmeViolations).toEqual([]);
    expect(formatReport(report)).toBe('No bucket-promotion violations found in plugin.json or README.md.');
  });

  it('reports a combined, per-file breakdown when both files have violations', () => {
    const report = checkBucketPromotion(
      pluginJson(['./skills/misc/git-guardrails-claude-code']),
      readmeEntry('deprecated', 'qa'),
    );

    const text = formatReport(report);

    expect(text).toContain('2 bucket-promotion violation(s) found:');
    expect(text).toContain('plugin.json:');
    expect(text).toContain(
      '- git-guardrails-claude-code (./skills/misc/git-guardrails-claude-code) should not be in the shipped skill set',
    );
    expect(text).toContain('README.md:');
    expect(text).toContain('- qa (./skills/deprecated/qa) should not be documented there');
  });

  it('reports the real repo README.md/plugin.json as clean against the corrected rule', async () => {
    const { readFileSync } = await import('node:fs');
    const { join, dirname } = await import('node:path');
    const { fileURLToPath } = await import('node:url');
    const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

    const report = checkBucketPromotion(
      readFileSync(join(repoRoot, '.claude-plugin/plugin.json'), 'utf-8'),
      readFileSync(join(repoRoot, 'README.md'), 'utf-8'),
    );

    expect(formatReport(report)).toBe('No bucket-promotion violations found in plugin.json or README.md.');
  });
});
