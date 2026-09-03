import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GiselleThemeProvider } from '@littlebranches/giselle-mui';
import { PersonaPickerSection } from './persona-picker-section';
import { PERSONA_INFO } from '../../data/personas';
import {
  PERSONA_PICKER_CAPTION,
  PERSONA_PICKER_TITLE,
  PERSONA_PICKER_DESCRIPTION,
  PERSONA_PICKER_ROUTER_PREFIX,
} from '../../data/index-page-copy';

// The component doesn't wrap in its own GiselleThemeProvider (relies on the
// app-wide one mounted in theme/Root.tsx) - tests provide one directly,
// matching LandingStatsSection's/HomeHeroSection's own test setup.
function renderWithTheme(ui: React.ReactElement) {
  return render(<GiselleThemeProvider>{ui}</GiselleThemeProvider>);
}

describe('PersonaPickerSection', () => {
  it('renders the section caption, title, and description', () => {
    renderWithTheme(<PersonaPickerSection activePersonas={new Set()} onTogglePersona={vi.fn()} />);

    expect(screen.getByText(PERSONA_PICKER_CAPTION)).toBeInTheDocument();
    expect(screen.getByText(PERSONA_PICKER_TITLE)).toBeInTheDocument();
    expect(screen.getByText(PERSONA_PICKER_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders the title as an h2, not a page h1', () => {
    renderWithTheme(<PersonaPickerSection activePersonas={new Set()} onTogglePersona={vi.fn()} />);

    expect(
      screen.getByRole('heading', { level: 2, name: PERSONA_PICKER_TITLE })
    ).toBeInTheDocument();
  });

  it('renders the /ask-alex router note', () => {
    renderWithTheme(<PersonaPickerSection activePersonas={new Set()} onTogglePersona={vi.fn()} />);

    expect(screen.getByText(PERSONA_PICKER_ROUTER_PREFIX, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('/ask-alex')).toBeInTheDocument();
  });

  it('renders the persona filter row and forwards toggle clicks', async () => {
    const user = userEvent.setup();
    const onTogglePersona = vi.fn();
    renderWithTheme(
      <PersonaPickerSection activePersonas={new Set()} onTogglePersona={onTogglePersona} />
    );

    const chipLabel = PERSONA_INFO['teaching-mentoring'].label;
    expect(screen.getByText(chipLabel)).toBeInTheDocument();
    await user.click(screen.getByText(chipLabel));
    expect(onTogglePersona).toHaveBeenCalledWith('teaching-mentoring');
  });
});
