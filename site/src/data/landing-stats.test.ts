import { describe, expect, it } from 'vitest';
import { computeLandingStats } from './landing-stats';
import type { ProvenanceMap } from './provenance.types';

const PROVENANCE_MAP: ProvenanceMap = {
  'engineering/deslopify': { status: 'original' },
  'engineering/tdd': { status: 'upstream', upstreamSha: 'abc123' },
  'git/create-pr': { status: 'modified', upstreamSha: 'def456' },
  'personal/caveman': { status: 'inherited', upstreamSha: 'ghi789' },
  'org/audit-giselle-tests': { status: 'original' },
};

describe('computeLandingStats', () => {
  it('carries the given totals through unchanged', () => {
    const items = computeLandingStats({
      totalSkills: 76,
      totalCategories: 10,
      provenanceMap: PROVENANCE_MAP,
    });
    expect(items.find((i) => i.label === 'Skills')?.value).toBe(76);
    expect(items.find((i) => i.label === 'Categories')?.value).toBe(10);
  });

  it('counts "original" entries from the provenance map', () => {
    const items = computeLandingStats({
      totalSkills: 76,
      totalCategories: 10,
      provenanceMap: PROVENANCE_MAP,
    });
    expect(items.find((i) => i.label === 'AlexRebula original')?.value).toBe(2);
  });

  it('counts "modified" entries from the provenance map', () => {
    const items = computeLandingStats({
      totalSkills: 76,
      totalCategories: 10,
      provenanceMap: PROVENANCE_MAP,
    });
    expect(items.find((i) => i.label === 'Diverged from upstream')?.value).toBe(1);
  });

  it('returns exactly four stat tiles with distinct labels', () => {
    const items = computeLandingStats({
      totalSkills: 0,
      totalCategories: 0,
      provenanceMap: {},
    });
    expect(items).toHaveLength(4);
    expect(new Set(items.map((i) => i.label)).size).toBe(4);
  });
});
