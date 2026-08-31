import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowStageHoverPanel } from './flow-stage-hover-panel';
import type { FeatureFlowItem } from '@littlebranches/giselle-mui';

const ITEM: FeatureFlowItem = {
  id: 'shape-it',
  icon: 'solar:compass-bold-duotone',
  title: 'Shape it',
  description: 'Stress-test the idea and pin down the spec before code gets written.',
};

describe('FlowStageHoverPanel', () => {
  it('renders the stage title and description', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} />);
    expect(screen.getByText('Shape it')).toBeInTheDocument();
    expect(
      screen.getByText('Stress-test the idea and pin down the spec before code gets written.'),
    ).toBeInTheDocument();
  });

  it('shows a hint to click the stage when not expanded', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded={false} />);
    expect(screen.getByText('Click the stage to see its skills.')).toBeInTheDocument();
  });

  it('shows a hint to look below when expanded', () => {
    render(<FlowStageHoverPanel item={ITEM} isExpanded />);
    expect(screen.getByText('Every skill in this stage is listed below.')).toBeInTheDocument();
  });
});
