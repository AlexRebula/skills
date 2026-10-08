import { describe, expect, it } from 'vitest';
import {
  buildFeatureFlowItems,
  FLOW_STAGE_DESCRIPTIONS,
  FLOW_STAGE_LONG_DESCRIPTIONS,
  FLOW_STAGE_SUMMARIES,
} from './feature-flow-sections';
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
  {
    label: 'Shape it',
    ordered: true,
    skills: [ORIGINAL_SKILL, LINEAGE_SKILL],
    original: [ORIGINAL_SKILL],
    lineage: [LINEAGE_SKILL],
  },
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

  it("uses the stage's drafted longDescription, distinct from the short description", () => {
    const [item] = buildFeatureFlowItems(SECTIONS, MEDIA_SRC);
    expect(item.longDescription).toBe(FLOW_STAGE_LONG_DESCRIPTIONS['Shape it']);
    expect(item.longDescription).not.toBe(item.description);
  });

  it("carries the stage's authored summary onto the item", () => {
    const [item] = buildFeatureFlowItems(SECTIONS, MEDIA_SRC);
    expect(item.summary).toBe(FLOW_STAGE_SUMMARIES['Shape it']);
  });

  it("follows the stage's own order when lineage comes before original, not original-then-lineage", () => {
    const interleaved: FlowStageSection[] = [
      {
        label: 'Shape it',
        ordered: true,
        skills: [LINEAGE_SKILL, ORIGINAL_SKILL],
        original: [ORIGINAL_SKILL],
        lineage: [LINEAGE_SKILL],
      },
    ];
    const [item] = buildFeatureFlowItems(interleaved, MEDIA_SRC);
    expect(item.highlightCards?.map((card) => card.title)).toEqual(['to-spec', 'grilling']);
  });

  it("maps the stage's skills into highlightCards in its own order, no group divider", () => {
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
      ordered: true,
      skills: [],
      original: [],
      lineage: [],
    }));
    for (const item of buildFeatureFlowItems(realSections, MEDIA_SRC)) {
      expect(
        item.description,
        `missing FLOW_STAGE_DESCRIPTIONS entry for "${item.title}"`
      ).not.toBe('');
      expect(
        item.longDescription,
        `missing FLOW_STAGE_LONG_DESCRIPTIONS entry for "${item.title}"`
      ).toBeTruthy();
      expect(item.icon, `missing FLOW_STAGE_ICON_NAMES entry for "${item.title}"`).not.toContain(
        'undefined'
      );
    }
  });

  it('has one single-sentence summary of sane length for every real FLOW_STAGES label', () => {
    const realLabels = FLOW_STAGES.map((item) => (item as { label: string }).label);
    expect(Object.keys(FLOW_STAGE_SUMMARIES).sort()).toEqual([...realLabels].sort());
    for (const label of realLabels) {
      const summary = FLOW_STAGE_SUMMARIES[label];
      expect(summary, `missing FLOW_STAGE_SUMMARIES entry for "${label}"`).toBeTruthy();
      expect(summary.length, `"${label}" summary length`).toBeGreaterThanOrEqual(90);
      expect(summary.length, `"${label}" summary length`).toBeLessThanOrEqual(130);
      expect(summary.match(/[.!?]/g) ?? [], `"${label}" must be one sentence`).toHaveLength(1);
      expect(summary.endsWith('.')).toBe(true);
    }
  });

  it('carries a summary on every real stage item', () => {
    const realLabels = FLOW_STAGES.map((item) => (item as { label: string }).label);
    const realSections: FlowStageSection[] = realLabels.map((label) => ({
      label,
      ordered: true,
      skills: [],
      original: [],
      lineage: [],
    }));
    for (const item of buildFeatureFlowItems(realSections, MEDIA_SRC)) {
      expect(item.summary, `missing summary for "${item.title}"`).toBeTruthy();
    }
  });
});
