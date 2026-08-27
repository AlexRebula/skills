import { describe, expect, it } from 'vitest';
import { buildFlowSections } from './flow-sections';
import type { ProvenanceMap } from './provenance.types';
import type { SkillsLandingData } from './skills-landing.types';

const LANDING: SkillsLandingData = {
  categories: [
    {
      key: 'engineering',
      heading: 'Engineering',
      description: 'Engineering skills.',
      skills: [
        { name: 'tdd', description: 'Test-driven development.', categories: ['engineering'] },
        { name: 'ask-matt', description: 'Router over the whole skill set.', categories: ['engineering'] },
      ],
    },
    {
      key: 'wiki',
      heading: 'Wiki',
      description: 'Wiki skills.',
      skills: [{ name: 'ingest', description: 'Ingest a source.', categories: ['wiki'] }],
    },
  ],
};

const PROVENANCE_MAP: ProvenanceMap = {
  'engineering/tdd': { status: 'original' },
  'engineering/ask-matt': {
    status: 'modified',
    upstreamSha: 'abc123',
    diffs: [{ file: 'SKILL.md', rows: [] }],
  },
  'wiki/ingest': { status: 'inherited', upstreamSha: 'def456' },
};

const FLOW_STAGES_FIXTURE = [
  {
    type: 'category',
    label: 'Build it',
    items: [
      { type: 'doc', id: 'engineering/tdd', label: 'tdd' },
      { type: 'doc', id: 'engineering/ask-matt', label: 'ask-matt' },
    ],
  },
  {
    type: 'category',
    label: 'Run the wiki',
    items: [{ type: 'doc', id: 'wiki/ingest', label: 'ingest' }],
  },
];

describe('buildFlowSections', () => {
  it('produces one section per stage, labeled and ordered exactly as FLOW_STAGES', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    expect(sections.map((s) => s.label)).toEqual(['Build it', 'Run the wiki']);
  });

  it('splits a stage into original first, then Matt-lineage (upstream/modified/inherited)', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const buildIt = sections.find((s) => s.label === 'Build it');
    expect(buildIt?.original.map((s) => s.name)).toEqual(['tdd']);
    expect(buildIt?.lineage.map((s) => s.name)).toEqual(['ask-matt']);
  });

  it('places an "inherited" skill in the lineage sub-list, not original', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const runTheWiki = sections.find((s) => s.label === 'Run the wiki');
    expect(runTheWiki?.original).toEqual([]);
    expect(runTheWiki?.lineage.map((s) => s.name)).toEqual(['ingest']);
  });

  it('carries the skill description through from the landing data', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const tdd = sections.find((s) => s.label === 'Build it')?.original[0];
    expect(tdd?.description).toBe('Test-driven development.');
  });

  it('carries the provenance status through onto each skill', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const askMatt = sections.find((s) => s.label === 'Build it')?.lineage[0];
    expect(askMatt?.status).toBe('modified');
  });

  it('attaches a diff for a "modified" skill with real diffs', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const askMatt = sections.find((s) => s.label === 'Build it')?.lineage[0];
    expect(askMatt?.diff).toEqual({ upstreamSha: 'abc123', files: [{ file: 'SKILL.md', rows: [] }] });
  });

  it('omits diff for a non-modified skill', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const tdd = sections.find((s) => s.label === 'Build it')?.original[0];
    expect(tdd?.diff).toBeUndefined();
  });

  it('defaults a skill with no provenance entry to "original"', () => {
    const flowStages = [
      { type: 'category', label: 'Build it', items: [{ type: 'doc', id: 'engineering/tdd', label: 'tdd' }] },
    ];
    const sections = buildFlowSections(flowStages, LANDING, {});
    expect(sections[0]?.original.map((s) => s.name)).toEqual(['tdd']);
  });

  it('skips a FLOW_STAGES entry with no matching landing-data skill', () => {
    const flowStages = [
      {
        type: 'category',
        label: 'Build it',
        items: [{ type: 'doc', id: 'engineering/nonexistent', label: 'nonexistent' }],
      },
    ];
    const sections = buildFlowSections(flowStages, LANDING, PROVENANCE_MAP);
    expect(sections[0]?.original).toEqual([]);
    expect(sections[0]?.lineage).toEqual([]);
  });
});
