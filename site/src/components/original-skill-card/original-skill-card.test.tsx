import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OriginalSkillCard } from './original-skill-card';

describe('OriginalSkillCard', () => {
  it('links to the skill doc page', () => {
    render(<OriginalSkillCard category="engineering" name="deslopify" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/engineering/deslopify');
  });

  it('renders the skill name and the "AlexRebula Original." label', () => {
    render(<OriginalSkillCard category="engineering" name="deslopify" />);
    expect(screen.getByText('/deslopify')).toBeInTheDocument();
    expect(screen.getByText('AlexRebula Original.')).toBeInTheDocument();
  });

  it('renders a semantically-mapped icon for the skill', () => {
    render(<OriginalSkillCard category="personal" name="obsidian-vault" />);
    expect(screen.getByRole('link').querySelector('svg')).toBeInTheDocument();
  });
});
