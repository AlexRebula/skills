import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  HARNESS_COMPARISON_CAPTION,
  HARNESS_COMPARISON_TITLE,
  HARNESS_COMPARISON_LINK_TEXT,
} from '../../data/index-page-copy';
import { HarnessComparisonSection } from './harness-comparison-section';

describe('HarnessComparisonSection', () => {
  it('renders the caption and title', () => {
    render(<HarnessComparisonSection />);
    expect(screen.getByText(HARNESS_COMPARISON_CAPTION)).toBeInTheDocument();
    expect(screen.getByText(HARNESS_COMPARISON_TITLE)).toBeInTheDocument();
  });

  it('links to /skills-flows-harnesses', () => {
    render(<HarnessComparisonSection />);
    expect(screen.getByRole('link', { name: HARNESS_COMPARISON_LINK_TEXT })).toHaveAttribute(
      'href',
      '/skills-flows-harnesses'
    );
  });
});
