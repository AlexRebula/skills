import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  OVERVIEW_LINK_PREFIX,
  OVERVIEW_LINK_TEXT,
  OVERVIEW_LINK_DESCRIPTION,
} from '../../data/index-page-copy';
import { OverviewLinkSection } from './overview-link-section';

describe('OverviewLinkSection', () => {
  it('renders the prefix, link text, and description', () => {
    render(<OverviewLinkSection />);
    expect(screen.getByText(OVERVIEW_LINK_PREFIX, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(OVERVIEW_LINK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(OVERVIEW_LINK_DESCRIPTION, { exact: false })).toBeInTheDocument();
  });

  it('links to /overview', () => {
    render(<OverviewLinkSection />);
    expect(screen.getByRole('link', { name: OVERVIEW_LINK_TEXT })).toHaveAttribute(
      'href',
      '/overview'
    );
  });
});
