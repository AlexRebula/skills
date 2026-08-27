import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SkillIcon } from './skill-icon';

describe('SkillIcon', () => {
  it('renders an icon at the default size', () => {
    const { container } = render(<SkillIcon category="engineering" name="deslopify" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '30');
    expect(svg).toHaveAttribute('height', '30');
  });

  it('renders at a custom size when given one', () => {
    const { container } = render(<SkillIcon category="engineering" name="deslopify" size={20} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });
});
