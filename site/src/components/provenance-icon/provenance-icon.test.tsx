import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProvenanceIcon } from './provenance-icon';
import type { ProvenanceMap } from '../../data/provenance.types';

const FIXTURE: ProvenanceMap = {
  'productivity/teach': { status: 'upstream' },
  'engineering/ask-matt': {
    status: 'modified',
    upstreamSha: '5b15a47f2d7150f545fbcacbfe381787fc0230dc',
    diffs: [
      {
        file: 'SKILL.md',
        rows: [{ type: 'change', oldLineNumber: 1, oldContent: 'old wording', newLineNumber: 1, newContent: 'new wording' }],
      },
    ],
  },
  'org/create-giselle-component': { status: 'original' },
  'personal/caveman': { status: 'inherited' },
};

describe('ProvenanceIcon', () => {
  it('renders nothing for an unknown slug', () => {
    const { container } = render(<ProvenanceIcon slug="/unknown/skill" provenanceMap={FIXTURE} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows only an icon at rest, no visible explanation text', () => {
    render(<ProvenanceIcon slug="/productivity/teach" provenanceMap={FIXTURE} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/mattpocock/)).not.toBeInTheDocument();
  });

  it('reveals the explanation, naming mattpocock/skills, on focus', async () => {
    const user = userEvent.setup();
    render(<ProvenanceIcon slug="/productivity/teach" provenanceMap={FIXTURE} />);
    await user.tab();
    expect(screen.getByText(/mattpocock\/skills/)).toBeInTheDocument();
  });

  it('hides the explanation again once focus leaves the icon entirely', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProvenanceIcon slug="/productivity/teach" provenanceMap={FIXTURE} />
        <button type="button">elsewhere</button>
      </>,
    );
    await user.tab();
    expect(screen.getByText(/mattpocock\/skills/)).toBeInTheDocument();
    await user.tab();
    expect(screen.queryByText(/mattpocock\/skills/)).not.toBeInTheDocument();
  });

  it('shows a "See what changed" trigger only for a modified skill, never for the other three statuses', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ProvenanceIcon slug="/engineering/ask-matt" provenanceMap={FIXTURE} />);
    await user.tab();
    expect(screen.getByRole('button', { name: 'See what changed' })).toBeInTheDocument();

    rerender(<ProvenanceIcon slug="/productivity/teach" provenanceMap={FIXTURE} />);
    await user.tab();
    expect(screen.queryByRole('button', { name: 'See what changed' })).not.toBeInTheDocument();
  });

  it('opens the real diff modal from the "See what changed" trigger, not from clicking the icon itself', async () => {
    const user = userEvent.setup();
    render(<ProvenanceIcon slug="/engineering/ask-matt" provenanceMap={FIXTURE} />);

    await user.click(screen.getByRole('button', { name: 'Based on Matt Pocock\'s original, modified here' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'See what changed' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName(/ask-matt/);
    expect(screen.getByText('old wording')).toBeInTheDocument();
  });

  it.each([
    ['/org/create-giselle-component', 'AlexRebula original'],
    ['/productivity/teach', 'Originally written by Matt Pocock'],
    ['/personal/caveman', 'Originally written by Matt Pocock'],
  ])('labels the icon at %s as %s', async (slug, label) => {
    const user = userEvent.setup();
    render(<ProvenanceIcon slug={slug} provenanceMap={FIXTURE} />);
    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    await user.tab();
    expect(screen.queryByRole('button', { name: 'See what changed' })).not.toBeInTheDocument();
  });
});
