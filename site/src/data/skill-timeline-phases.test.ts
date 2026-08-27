import { describe, expect, it } from 'vitest';
import { buildSkillTimelinePhases } from './skill-timeline-phases';
import type { FlowSkill } from './flow-sections.types';

const SKILLS: FlowSkill[] = [
  { category: 'engineering', name: 'tdd', description: 'Test-driven development.', status: 'original' },
  {
    category: 'engineering',
    name: 'ask-matt',
    description: 'Router over the whole skill set.',
    status: 'modified',
    diff: { upstreamSha: 'abc123', files: [{ file: 'SKILL.md', rows: [] }] },
  },
  { category: 'wiki', name: 'ingest', description: 'Ingest a source.', status: 'inherited' },
];

describe('buildSkillTimelinePhases', () => {
  it('assigns sequential numeric keys in array order', () => {
    const phases = buildSkillTimelinePhases(SKILLS);
    expect(phases.map((p) => p.key)).toEqual([0, 1, 2]);
  });

  it('alternates side starting from left', () => {
    const phases = buildSkillTimelinePhases(SKILLS);
    expect(phases.map((p) => p.side)).toEqual(['left', 'right', 'left']);
  });

  it('repurposes the date slot to show the category, not a real date', () => {
    const phases = buildSkillTimelinePhases(SKILLS);
    expect(phases[0]?.date).toBe('engineering');
    expect(phases[2]?.date).toBe('wiki');
  });

  it('formats the title as /name', () => {
    const phases = buildSkillTimelinePhases(SKILLS);
    expect(phases[0]?.title).toBe('/tdd');
  });

  it('maps provenance status to the Timeline color palette', () => {
    const phases = buildSkillTimelinePhases(SKILLS);
    expect(phases[0]?.color).toBe('success'); // original
    expect(phases[1]?.color).toBe('secondary'); // modified
    expect(phases[2]?.color).toBe('warning'); // inherited
  });

  it('flags hasDiff only for a modified skill with real diffs', () => {
    const phases = buildSkillTimelinePhases(SKILLS);
    expect(phases[0]?.hasDiff).toBe(false);
    expect(phases[1]?.hasDiff).toBe(true);
    expect(phases[2]?.hasDiff).toBe(false);
  });

  it('returns an empty array for no skills', () => {
    expect(buildSkillTimelinePhases([])).toEqual([]);
  });
});
