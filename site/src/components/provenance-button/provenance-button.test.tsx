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
    diffStat: [
      { file: 'SKILL.md', added: 8, removed: 4 },
      { file: 'agents/openai.yaml', added: 2, removed: 0 },
    ],
    changeSummary: "Adds 'Review step'.",
  },
  'productivity/handoff': {
    status: 'modified',
    diffStat: [{ file: 'SKILL.md', added: 1, removed: 1 }],
    // No changeSummary: wording-only change, no heading touched.
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

  it('renders the modified skill as an enabled button that reveals the diff popover on click', async () => {
    const user = userEvent.setup();
    render(<ProvenanceButton slug="/engineering/ask-matt" provenanceMap={FIXTURE} />);

    const button = screen.getByRole('button', { name: "See what's different" });
    expect(button).toHaveAttribute('aria-disabled', 'false');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Changed vs Upstream')).not.toBeInTheDocument();

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Changed vs Upstream')).toBeInTheDocument();
    expect(screen.getByText('+10')).toBeInTheDocument(); // 8 + 2
    expect(screen.getByText('-4')).toBeInTheDocument(); // 4 + 0
    expect(screen.getByText("Adds 'Review step'.")).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByText('Changed vs Upstream')).not.toBeInTheDocument();
  });

  it('omits the summary line entirely when no heading-level change was derivable, rather than showing filler text', async () => {
    const user = userEvent.setup();
    render(<ProvenanceButton slug="/productivity/handoff" provenanceMap={FIXTURE} />);
    await user.click(screen.getByRole('button', { name: "See what's different" }));
    expect(screen.getByText('Changed vs Upstream')).toBeInTheDocument();
    expect(screen.queryByText(/wording/i)).not.toBeInTheDocument();
  });

  it('renders a decorative icon that does not affect the button\'s accessible name', () => {
    render(<ProvenanceButton slug="/productivity/teach" provenanceMap={FIXTURE} />);
    const button = screen.getByRole('button', { name: 'Upstream - Unchanged' });
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
