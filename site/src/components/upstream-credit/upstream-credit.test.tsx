import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UpstreamCredit } from './upstream-credit';
import type { ProvenanceMap } from '../../data/provenance.types';

const FIXTURE: ProvenanceMap = {
  'productivity/teach': {
    status: 'upstream',
    upstreamUrl: 'https://github.com/mattpocock/skills/tree/5b15a47/skills/productivity/teach',
  },
  'engineering/ask-matt': {
    status: 'modified',
    upstreamUrl: 'https://github.com/mattpocock/skills/tree/5b15a47/skills/engineering/ask-matt',
  },
  'personal/caveman': {
    status: 'inherited',
    upstreamUrl: 'https://github.com/mattpocock/skills/tree/221ffca/skills/productivity/caveman',
  },
  'org/create-giselle-component': { status: 'original' },
};

describe('UpstreamCredit', () => {
  it('credits Matt Pocock for an unchanged upstream skill, linking to its upstreamUrl', () => {
    render(<UpstreamCredit slug="/productivity/teach" provenanceMap={FIXTURE} />);
    const link = screen.getByRole('link', { name: /originally written by matt pocock/i });
    expect(link).toHaveAttribute('href', FIXTURE['productivity/teach'].upstreamUrl);
  });

  it('credits Matt Pocock for an inherited skill the same way as upstream, linking to its upstreamUrl', () => {
    render(<UpstreamCredit slug="/personal/caveman" provenanceMap={FIXTURE} />);
    const link = screen.getByRole('link', { name: /originally written by matt pocock/i });
    expect(link).toHaveAttribute('href', FIXTURE['personal/caveman'].upstreamUrl);
  });

  it('uses different wording for a modified skill, linking to its upstreamUrl', () => {
    render(<UpstreamCredit slug="/engineering/ask-matt" provenanceMap={FIXTURE} />);
    const link = screen.getByRole('link', { name: /based on matt pocock's original, modified here/i });
    expect(link).toHaveAttribute('href', FIXTURE['engineering/ask-matt'].upstreamUrl);
  });

  it('renders nothing for an original skill', () => {
    const { container } = render(<UpstreamCredit slug="/org/create-giselle-component" provenanceMap={FIXTURE} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for an unknown slug', () => {
    const { container } = render(<UpstreamCredit slug="/unknown/skill" provenanceMap={FIXTURE} />);
    expect(container).toBeEmptyDOMElement();
  });
});
