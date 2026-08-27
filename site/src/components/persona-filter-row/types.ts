import type { PersonaKey } from '../../data/personas.types';

export interface PersonaFilterRowProps {
  /** Currently active personas (multi-select union semantics, issue #176). */
  activePersonas: ReadonlySet<PersonaKey>;
  /** Called with the persona to toggle when its chip is clicked. */
  onTogglePersona: (persona: PersonaKey) => void;
}
