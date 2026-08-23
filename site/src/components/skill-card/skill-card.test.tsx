import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillCard } from './skill-card';

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

  it('renders a semantically-mapped icon for the skill', () => {
    render(<SkillCard category="personal" name="obsidian-vault" color="green" label="AlexRebula Original." />);
    expect(screen.getByRole('link').querySelector('svg')).toBeInTheDocument();
  });
});
