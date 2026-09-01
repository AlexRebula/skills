import React, { type ReactNode } from 'react';
import { SectionContainer, SectionTitle } from '@littlebranches/giselle-mui';
import { PersonaFilterRow } from '../persona-filter-row';
import {
  PERSONA_PICKER_CAPTION,
  PERSONA_PICKER_TITLE,
  PERSONA_PICKER_DESCRIPTION,
} from '../../data/index-page-copy';
import { PERSONA_PICKER_TITLE_SX } from './persona-picker-section.const';
import type { PersonaPickerSectionProps } from './types';

/**
 * "Choose your category" landing-page section — lets a visitor filter the
 * Flow section below by persona (issue #176). Lives between the stats
 * section and the Flow section, matching `LandingStatsSection`'s own
 * `SectionContainer` + `SectionTitle` shape.
 */
export function PersonaPickerSection({
  activePersonas,
  onTogglePersona,
}: PersonaPickerSectionProps): ReactNode {
  return (
    <SectionContainer>
      <SectionTitle
        caption={PERSONA_PICKER_CAPTION}
        title={PERSONA_PICKER_TITLE}
        description={PERSONA_PICKER_DESCRIPTION}
        sx={PERSONA_PICKER_TITLE_SX}
      />
      <PersonaFilterRow activePersonas={activePersonas} onTogglePersona={onTogglePersona} />
    </SectionContainer>
  );
}
