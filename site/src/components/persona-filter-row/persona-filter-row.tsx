import React, { type ReactNode } from 'react';
import { GiselleThemeProvider, SelectableLabel } from '@littlebranches/giselle-mui';
import { PERSONA_INFO } from '../../data/personas';
import { PERSONAS } from '../../data/personas.types';
import type { PersonaFilterRowProps } from './types';
import styles from './persona-filter-row.module.css';

/**
 * Persona toggle-chip row rendered beneath the homepage hero (issue #176).
 * One `SelectableLabel` (#175) per declared persona (#174's four fixed
 * groups), multi-select with union semantics: several chips can be active
 * at once. No "clear all" control per this ticket's acceptance criteria -
 * chips toggle off individually.
 *
 * Scoped in its own `GiselleThemeProvider` rather than depending on the
 * site-wide one mounted in `src/theme/Root.tsx`, matching the pattern
 * `LandingStatsSection` and `SkillTimeline` already established for a
 * giselle-mui-consuming leaf component: it keeps this component mountable
 * (and testable) on its own, without requiring every consumer to know it
 * needs a theme ancestor.
 */
export function PersonaFilterRow({ activePersonas, onTogglePersona }: PersonaFilterRowProps): ReactNode {
  return (
    <GiselleThemeProvider defaultMode="system">
      <div className={styles.filterRow} role="group" aria-label="Filter skills by persona">
        {PERSONAS.map((persona) => (
          <SelectableLabel
            key={persona}
            label={PERSONA_INFO[persona].label}
            selected={activePersonas.has(persona)}
            onSelectedChange={() => onTogglePersona(persona)}
          />
        ))}
      </div>
    </GiselleThemeProvider>
  );
}
