import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonaFilterRow } from './persona-filter-row';
import { PERSONA_INFO } from '../../data/personas';
import { PERSONAS } from '../../data/personas.types';

describe('PersonaFilterRow', () => {
  it('renders one chip per declared persona (4 total)', () => {
    render(<PersonaFilterRow activePersonas={new Set()} onTogglePersona={vi.fn()} />);
    for (const persona of PERSONAS) {
      expect(screen.getByText(PERSONA_INFO[persona].label)).toBeInTheDocument();
    }
    expect(PERSONAS).toHaveLength(4);
  });

  it('marks a chip as pressed when its persona is active', () => {
    render(
      <PersonaFilterRow activePersonas={new Set(['software-engineering'])} onTogglePersona={vi.fn()} />,
    );
    const chip = screen.getByText(PERSONA_INFO['software-engineering'].label).closest('[aria-pressed]');
    expect(chip).toHaveAttribute('aria-pressed', 'true');
  });

  it('marks a chip as not pressed when its persona is inactive', () => {
    render(<PersonaFilterRow activePersonas={new Set()} onTogglePersona={vi.fn()} />);
    const chip = screen.getByText(PERSONA_INFO['software-engineering'].label).closest('[aria-pressed]');
    expect(chip).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onTogglePersona with the clicked persona', async () => {
    const user = userEvent.setup();
    const onTogglePersona = vi.fn();
    render(<PersonaFilterRow activePersonas={new Set()} onTogglePersona={onTogglePersona} />);
    await user.click(screen.getByText(PERSONA_INFO['teaching-mentoring'].label));
    expect(onTogglePersona).toHaveBeenCalledWith('teaching-mentoring');
  });
});
