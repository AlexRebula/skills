import type { PersonaKey } from '../../data/personas.types';

export interface PersonaPickerSectionProps {
  /** Currently active personas (multi-select union semantics, issue #176) — passed through to `PersonaFilterRow`. */
  activePersonas: ReadonlySet<PersonaKey>;
  /** Called with the persona to toggle when its filter chip is clicked. */
  onTogglePersona: (persona: PersonaKey) => void;
}
