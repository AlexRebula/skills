import { describe, expect, it } from 'vitest';
import { buildFeatureFlowItems, FLOW_STAGE_DESCRIPTIONS } from './feature-flow-sections';
import { FLOW_STAGES } from '../../sidebars';
import type { FlowSkill, FlowStageSection } from './flow-sections.types';

const ORIGINAL_SKILL: FlowSkill = {
  category: 'thinking-tools',
  name: 'grilling',
  description: 'Grill a plan or decision relentlessly.',
  status: 'original',
  personas: [],
};

const LINEAGE_SKILL: FlowSkill = {
  category: 'engineering',
  name: 'to-spec',
  description: 'Turn a rough idea into a written spec.',
  status: 'modified',
  personas: [],
};

const SECTIONS: FlowStageSection[] = [
  { label: 'Shape it', original: [ORIGINAL_SKILL], lineage: [LINEAGE_SKILL] },
];

const MEDIA_SRC = '/img/flow-skill-card-backdrop.svg';

describe('buildFeatureFlowItems', () => {
  it('maps one FeatureFlowItem per stage, with the stage label as title', () => {
    const [item] = buildFeatureFlowItems(SECTIONS, MEDIA_SRC);
    expect(item.title).toBe('Shape it');
    expect(item.id).toBe('shape-it');
  });

  it("uses the stage's drafted description", () => {
    const [item] = buildFeatureFlowItems(SECTIONS, MEDIA_SRC);
    expect(item.description).toBe(FLOW_STAGE_DESCRIPTIONS['Shape it']);
  });

  it('flattens original then lineage skills into highlightCards, in that order, no group divider', () => {
    const [item] = buildFeatureFlowItems(SECTIONS, MEDIA_SRC);
    expect(item.highlightCards).toEqual([
      {
        title: 'grilling',
        description: 'Grill a plan or decision relentlessly.',
        href: '/thinking-tools/grilling',
        media: MEDIA_SRC,
      },
      {
        title: 'to-spec',
        description: 'Turn a rough idea into a written spec.',
        href: '/engineering/to-spec',
        media: MEDIA_SRC,
      },
    ]);
  });

  it('assigns a resolvable solar icon to every stage', () => {
    for (const item of buildFeatureFlowItems(SECTIONS, MEDIA_SRC)) {
      expect(item.icon).toMatch(/^solar:[a-z0-9-]+-bold-duotone$/);
    }
  });

  it('has an icon and description drafted for every real FLOW_STAGES label, not just this test fixture', () => {
    const realLabels = FLOW_STAGES.map((item) => (item as { label: string }).label);
    const realSections: FlowStageSection[] = realLabels.map((label) => ({
      label,
      original: [],
      lineage: [],
    }));
    for (const item of buildFeatureFlowItems(realSections, MEDIA_SRC)) {
      expect(item.description, `missing FLOW_STAGE_DESCRIPTIONS entry for "${item.title}"`).not.toBe('');
      expect(item.icon, `missing FLOW_STAGE_ICON_NAMES entry for "${item.title}"`).not.toContain('undefined');
    }
  });
});
