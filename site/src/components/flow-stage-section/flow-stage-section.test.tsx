import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowStageSectionView } from './flow-stage-section';
import type { FlowStageSection, FlowSkill } from '../../data/flow-sections.types';

const ORIGINAL_SKILL: FlowSkill = {
  category: 'engineering',
  name: 'deslopify',
  description: 'Strip AI tells from prose and code.',
  status: 'original',
  personas: [],
};

const LINEAGE_SKILL: FlowSkill = {
  category: 'productivity',
  name: 'teach',
  description: 'Teach a concept.',
  status: 'upstream',
  personas: [],
};

describe('FlowStageSectionView', () => {
  it('renders the numbered kicker and the stage label as a heading', () => {
    const section: FlowStageSection = { label: 'Build it', original: [ORIGINAL_SKILL], lineage: [] };
    render(<FlowStageSectionView section={section} index={0} />);
    expect(screen.getByText('01 · Build it')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Build it' })).toBeInTheDocument();
  });

  it('renders both sub-lists when the stage has original and lineage skills', () => {
    const section: FlowStageSection = { label: 'Build it', original: [ORIGINAL_SKILL], lineage: [LINEAGE_SKILL] };
    render(<FlowStageSectionView section={section} index={2} />);
    expect(screen.getByText('03 · Build it')).toBeInTheDocument();
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('From Matt Pocock')).toBeInTheDocument();
    // SkillTimeline renders both a desktop and mobile Timeline variant.
    expect(screen.getAllByText('/deslopify').length).toBeGreaterThan(0);
    expect(screen.getAllByText('/teach').length).toBeGreaterThan(0);
  });

  it('renders only the non-empty sub-list when a stage is entirely one kind of skill', () => {
    const section: FlowStageSection = { label: 'Build it', original: [ORIGINAL_SKILL], lineage: [] };
    render(<FlowStageSectionView section={section} index={0} />);
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.queryByText('From Matt Pocock')).not.toBeInTheDocument();
  });
});
