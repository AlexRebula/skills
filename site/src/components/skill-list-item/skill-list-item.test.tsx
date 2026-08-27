import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillListItem } from './skill-list-item';
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

describe('SkillListItem', () => {
  it('renders the skill card with the badge label/color for its provenance status', () => {
    render(<SkillListItem skill={ORIGINAL_SKILL} />);
    expect(screen.getByText('/deslopify')).toBeInTheDocument();
    expect(screen.getByText('AlexRebula Original.')).toBeInTheDocument();
  });

  it('renders the skill description', () => {
    render(<SkillListItem skill={ORIGINAL_SKILL} />);
    expect(screen.getByText('Strip AI tells from prose and code.')).toBeInTheDocument();
  });

  it('passes the diff through to the card for a modified skill', () => {
    render(<SkillListItem skill={MODIFIED_SKILL} />);
    expect(screen.getByText('Modified from Matt Pocock')).toBeInTheDocument();
  });
});
