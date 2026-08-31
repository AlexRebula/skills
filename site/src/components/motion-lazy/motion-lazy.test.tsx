import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionLazy } from './motion-lazy';

describe('MotionLazy', () => {
  it('renders its children', () => {
    render(
      <MotionLazy>
        <p>content</p>
      </MotionLazy>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
