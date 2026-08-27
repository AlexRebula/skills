import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillTimeline } from './skill-timeline';
import type { FlowSkill } from '../../data/flow-sections.types';

const ORIGINAL_SKILL: FlowSkill = {
  category: 'engineering',
  name: 'deslopify',
  description: 'Strip AI tells from prose and code.',
  status: 'original',
};

const MODIFIED_SKILL: FlowSkill = {
  category: 'engineering',
  name: 'ask-matt',
  description: 'Router over the whole skill set.',
  status: 'modified',
  diff: { upstreamSha: 'abc123', files: [{ file: 'SKILL.md', rows: [] }] },
};

describe('SkillTimeline', () => {
  it('renders nothing when there are no skills', () => {
    const { container } = render(<SkillTimeline skills={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders both a desktop (two-column) and a mobile (compact) Timeline for the same skills', () => {
    const { container } = render(<SkillTimeline skills={[ORIGINAL_SKILL]} />);
    // Both variants mount simultaneously (CSS toggles visibility between
    // them). Both wrapper elements should be present in the DOM.
    expect(container.querySelector('[class*="desktopOnly"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="mobileOnly"]')).toBeInTheDocument();
    expect(screen.getAllByText('/deslopify').length).toBeGreaterThanOrEqual(2);
  });

  it('renders every skill title', () => {
    render(<SkillTimeline skills={[ORIGINAL_SKILL, MODIFIED_SKILL]} />);
    expect(screen.getAllByText('/deslopify').length).toBeGreaterThan(0);
    expect(screen.getAllByText('/ask-matt').length).toBeGreaterThan(0);
  });
});
