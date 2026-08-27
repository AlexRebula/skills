import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillSubList } from './skill-sub-list';
import type { FlowSkill } from '../../data/flow-sections.types';

const SKILL: FlowSkill = {
  category: 'engineering',
  name: 'deslopify',
  description: 'Strip AI tells from prose and code.',
  status: 'original',
  personas: [],
};

describe('SkillSubList', () => {
  it('renders nothing when there are no skills', () => {
    const { container } = render(<SkillSubList heading="Original" skills={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the heading and every skill when non-empty', () => {
    render(<SkillSubList heading="Original" skills={[SKILL]} />);
    expect(screen.getByText('Original')).toBeInTheDocument();
    // SkillTimeline renders both a desktop and mobile Timeline variant.
    expect(screen.getAllByText('/deslopify').length).toBeGreaterThan(0);
  });
});
