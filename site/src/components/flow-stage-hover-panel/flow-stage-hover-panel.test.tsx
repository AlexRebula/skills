import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowStageHoverPanel } from './flow-stage-hover-panel';
import type { FeatureFlowItem } from '@littlebranches/giselle-mui';
import type { ProvenanceMap } from '../../data/provenance.types';

const ITEM: FeatureFlowItem = {
  id: 'shape-it',
  icon: 'solar:compass-bold-duotone',
  title: 'Shape it',
  description: 'Stress-test the idea and pin down the spec before code gets written.',
  highlightCards: [
    { title: 'grilling', description: 'Grill a plan or decision relentlessly.', href: '/thinking-tools/grilling' },
    { title: 'to-spec', description: 'Turn a rough idea into a written spec.', href: '/engineering/to-spec' },
  ],
};

const PROVENANCE_FIXTURE: ProvenanceMap = {
  'thinking-tools/grilling': { status: 'upstream' },
  'engineering/to-spec': { status: 'original' },
};

describe('FlowStageHoverPanel', () => {
  it('renders the stage title and description', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} />);
    expect(screen.getByText('Shape it')).toBeInTheDocument();
    expect(
      screen.getByText('Stress-test the idea and pin down the spec before code gets written.'),
    ).toBeInTheDocument();
  });

  it('lists every skill, prefixed with "/", with its own description, whether or not the stage is expanded', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} />);
    expect(screen.getByText('/grilling')).toBeInTheDocument();
    expect(screen.getByText('Grill a plan or decision relentlessly.')).toBeInTheDocument();
    expect(screen.getByText('/to-spec')).toBeInTheDocument();
    expect(screen.getByText('Turn a rough idea into a written spec.')).toBeInTheDocument();
  });

  it("links each skill to its own doc page via the card's href", () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} />);
    expect(screen.getByRole('link', { name: '/grilling' })).toHaveAttribute('href', '/thinking-tools/grilling');
  });

  it('renders nothing extra when a stage has no highlightCards', () => {
    render(<FlowStageHoverPanel item={{ ...ITEM, highlightCards: undefined }} isExpanded={false} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('shows a hint to select the stage when not expanded', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} />);
    expect(screen.getByText('Select this stage to browse each skill in more depth.')).toBeInTheDocument();
  });

  it('shows a hint to look below when expanded', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded />);
    expect(screen.getByText('Browse each skill in more depth below.')).toBeInTheDocument();
  });

  it("renders each skill's provenance icon below its description, whether or not the stage is expanded", () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} provenanceMap={PROVENANCE_FIXTURE} />);
    const grillingItem = screen.getByText('/grilling').closest('li');
    expect(grillingItem).not.toBeNull();
    const icon = screen.getByRole('button', { name: 'Originally written by Matt Pocock' });
    expect(grillingItem).toContainElement(icon);
    expect(screen.getByRole('button', { name: 'AlexRebula original' })).toBeInTheDocument();
  });

  it('renders no badge for a skill missing from the provenance map, rather than a broken button', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} provenanceMap={{}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
