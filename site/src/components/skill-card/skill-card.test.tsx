import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillCard } from './skill-card';
import type { FileDiff } from '../../data/provenance.types';

const SKILL_MD_DIFF: FileDiff = {
  file: 'SKILL.md',
  rows: [{ type: 'change', oldLineNumber: 1, oldContent: 'old wording', newLineNumber: 1, newContent: 'new wording' }],
};

describe('SkillCard', () => {
  it('links to the skill doc page', () => {
    render(<SkillCard category="engineering" name="deslopify" color="green" label="AlexRebula Original." />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/engineering/deslopify');
  });

  it('renders the skill name and the given label, for the "original" (green) variant', () => {
    render(<SkillCard category="engineering" name="deslopify" color="green" label="AlexRebula Original." />);
    expect(screen.getByText('/deslopify')).toBeInTheDocument();
    expect(screen.getByText('AlexRebula Original.')).toBeInTheDocument();
  });

  it('renders the skill name and the given label, for the "inherited" (amber) variant', () => {
    render(<SkillCard category="personal" name="caveman" color="amber" label="Inherited from Matt Pocock" />);
    expect(screen.getByText('/caveman')).toBeInTheDocument();
    expect(screen.getByText('Inherited from Matt Pocock')).toBeInTheDocument();
  });

  it('renders the skill name and the given label, for the "upstream" (blue) variant', () => {
    render(<SkillCard category="mentoring" name="teach" color="blue" label="Upstream - Unchanged" />);
    expect(screen.getByText('/teach')).toBeInTheDocument();
    expect(screen.getByText('Upstream - Unchanged')).toBeInTheDocument();
  });

  it('renders the skill name and the given label, for the "modified" (purple) variant', () => {
    render(<SkillCard category="engineering" name="ask-matt" color="purple" label="Modified from Matt Pocock" />);
    expect(screen.getByText('/ask-matt')).toBeInTheDocument();
    expect(screen.getByText('Modified from Matt Pocock')).toBeInTheDocument();
  });

  it('renders a semantically-mapped icon for the skill', () => {
    render(<SkillCard category="personal" name="obsidian-vault" color="green" label="AlexRebula Original." />);
    expect(screen.getByRole('link').querySelector('svg')).toBeInTheDocument();
  });

  it('renders no diff affordance when no diff is given, even for a "modified"-colored card', () => {
    render(<SkillCard category="engineering" name="ask-matt" color="purple" label="Modified from Matt Pocock" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a diff affordance that opens the DiffModal when a diff is given', async () => {
    const user = userEvent.setup();
    render(
      <SkillCard
        category="engineering"
        name="ask-matt"
        color="purple"
        label="Modified from Matt Pocock"
        diff={{ upstreamSha: '5b15a47f2d7150f545fbcacbfe381787fc0230dc', files: [SKILL_MD_DIFF] }}
      />,
    );

    const button = screen.getByRole('button', { name: "See what's different" });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(button);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName(/ask-matt/);
    expect(screen.getByText('old wording')).toBeInTheDocument();
  });

  it('closes the diff modal when its close control is clicked', async () => {
    const user = userEvent.setup();
    render(
      <SkillCard
        category="engineering"
        name="ask-matt"
        color="purple"
        label="Modified from Matt Pocock"
        diff={{ upstreamSha: 'abc1234', files: [SKILL_MD_DIFF] }}
      />,
    );

    await user.click(screen.getByRole('button', { name: "See what's different" }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
