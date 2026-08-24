import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProvenanceButton } from './provenance-button';
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
      {
        file: 'agents/openai.yaml',
        rows: [{ type: 'add', oldLineNumber: null, oldContent: null, newLineNumber: 1, newContent: 'new: true' }],
      },
    ],
  },
  'org/create-giselle-component': { status: 'original' },
  'personal/caveman': {
    status: 'inherited',
    upstreamSha: '221ffca96736afefdc08ca7cf0b3965e9ea83f41',
    upstreamUrl: 'https://github.com/mattpocock/skills/tree/221ffca96736afefdc08ca7cf0b3965e9ea83f41/skills/productivity/caveman',
  },
};

describe('ProvenanceButton', () => {
  it('renders nothing for an unknown slug', () => {
    const { container } = render(<ProvenanceButton slug="/unknown/skill" provenanceMap={FIXTURE} />);
    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    ['/productivity/teach', 'Upstream - Unchanged'],
    ['/org/create-giselle-component', 'AlexRebula Original.'],
    ['/personal/caveman', 'Inherited from Matt Pocock'],
  ])('renders the skill at %s as a disabled, non-clickable button labeled %s, no tooltip', (slug, label) => {
    render(<ProvenanceButton slug={slug} provenanceMap={FIXTURE} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders the modified skill as an enabled button that opens the diff modal on click', async () => {
    const user = userEvent.setup();
    render(<ProvenanceButton slug="/engineering/ask-matt" provenanceMap={FIXTURE} />);

    const button = screen.getByRole('button', { name: "See what's different" });
    expect(button).toHaveAttribute('aria-disabled', 'false');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName(/ask-matt/);
    expect(screen.getByText('old wording')).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('passes every file from diffs, not just SKILL.md, through to the modal', async () => {
    const user = userEvent.setup();
    render(<ProvenanceButton slug="/engineering/ask-matt" provenanceMap={FIXTURE} />);
    await user.click(screen.getByRole('button', { name: "See what's different" }));
    expect(screen.getByRole('tab', { name: /agents\/openai\.yaml/ })).toBeInTheDocument();
  });

  it('renders a decorative icon that does not affect the button\'s accessible name', () => {
    render(<ProvenanceButton slug="/productivity/teach" provenanceMap={FIXTURE} />);
    const button = screen.getByRole('button', { name: 'Upstream - Unchanged' });
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
