import { describe, expect, it } from 'vitest';
import { buildFlowSections, filterFlowSections } from './flow-sections';
import type { ProvenanceMap } from './provenance.types';
import type { SkillsLandingData } from './skills-landing.types';
import type { FlowStageSection } from './flow-sections.types';

// Whether LANDING/PROVENANCE_MAP/FLOW_STAGES_FIXTURE below belong in a
// separate fixtures file rather than inline in this test file is an open
// question, deliberately left unresolved (issue #156 rework item 8) - not a
// blocker for this ticket.
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

  it('finds a doc item nested inside a sub-category, not just top-level flat items (issue #156 rework item 6)', () => {
    // Before this fix, the flat-only walker silently dropped anything
    // nested under a further `items` array with no error or test coverage.
    const flowStages = [
      {
        type: 'category',
        label: 'Build it',
        items: [
          {
            type: 'category',
            label: 'Nested group',
            items: [{ type: 'doc', id: 'engineering/tdd', label: 'tdd' }],
          },
        ],
      },
    ];
    const sections = buildFlowSections(flowStages, LANDING, PROVENANCE_MAP);
    expect(sections[0]?.original.map((s) => s.name)).toEqual(['tdd']);
  });

  it('resolves each skill\'s personas from its full category membership (issue #176)', () => {
    const sections = buildFlowSections(FLOW_STAGES_FIXTURE, LANDING, PROVENANCE_MAP);
    const tdd = sections.find((s) => s.label === 'Build it')?.original[0];
    expect(tdd?.personas).toEqual(['software-engineering']);
  });

  it('resolves a misc-only skill to no persona', () => {
    const landing: SkillsLandingData = {
      categories: [
        {
          key: 'misc',
          heading: 'Misc',
          description: 'Misc skills.',
          skills: [{ name: 'grab-bag', description: 'A misc skill.', categories: ['misc'] }],
        },
      ],
    };
    const flowStages = [{ type: 'category', label: 'Misc', items: [{ type: 'doc', id: 'misc/grab-bag', label: 'grab-bag' }] }];
    const sections = buildFlowSections(flowStages, landing, {});
    expect(sections[0]?.original[0]?.personas).toEqual([]);
  });

  it('unions personas across a skill that belongs to multiple categories', () => {
    const landing: SkillsLandingData = {
      categories: [
        {
          key: 'git',
          heading: 'Git',
          description: 'Git skills.',
          skills: [{ name: 'commit-wip', description: 'Commit WIP.', categories: ['git', 'daily-workflow'] }],
        },
      ],
    };
    const flowStages = [{ type: 'category', label: 'Ship it', items: [{ type: 'doc', id: 'git/commit-wip', label: 'commit-wip' }] }];
    const sections = buildFlowSections(flowStages, landing, {});
    expect(sections[0]?.original[0]?.personas).toEqual(['software-engineering', 'running-the-practice']);
  });
});

describe('filterFlowSections', () => {
  const SECTIONS: FlowStageSection[] = [
    {
      label: 'Build it',
      original: [
        { category: 'engineering', name: 'tdd', description: 'TDD.', status: 'original', personas: ['software-engineering'] },
      ],
      lineage: [],
    },
    {
      label: 'Teach it',
      original: [
        { category: 'mentoring', name: 'teach', description: 'Teach.', status: 'original', personas: ['teaching-mentoring'] },
      ],
      lineage: [],
    },
    {
      label: 'Misc stage',
      original: [{ category: 'misc', name: 'grab-bag', description: 'Grab bag.', status: 'original', personas: [] }],
      lineage: [],
    },
  ];

  it('returns every section unchanged when no persona is active', () => {
    expect(filterFlowSections(SECTIONS, new Set())).toEqual(SECTIONS);
  });

  it('keeps only skills whose personas intersect the active set', () => {
    const filtered = filterFlowSections(SECTIONS, new Set(['software-engineering']));
    expect(filtered.map((s) => s.label)).toEqual(['Build it', 'Misc stage']);
  });

  it('unions matches across multiple active personas', () => {
    const filtered = filterFlowSections(SECTIONS, new Set(['software-engineering', 'teaching-mentoring']));
    expect(filtered.map((s) => s.label)).toEqual(['Build it', 'Teach it', 'Misc stage']);
  });

  it('always keeps a misc (no-persona) skill regardless of the active filter', () => {
    const filtered = filterFlowSections(SECTIONS, new Set(['personal-knowledge-work']));
    expect(filtered.map((s) => s.label)).toEqual(['Misc stage']);
  });

  it('drops a stage entirely when none of its skills match, rather than rendering it empty', () => {
    const filtered = filterFlowSections(SECTIONS, new Set(['personal-knowledge-work']));
    expect(filtered.find((s) => s.label === 'Build it')).toBeUndefined();
    expect(filtered.find((s) => s.label === 'Teach it')).toBeUndefined();
  });
});
