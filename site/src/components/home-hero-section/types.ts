import type { PersonaKey } from '../../data/personas.types';

export interface HomeHeroSectionProps {
  /** Total skill count across all categories - feeds the hero's stats caption. */
  totalSkills: number;
  /** Total category count - feeds the hero's stats caption. */
  categoriesCount: number;
  /** Currently active persona filters (issue #176) - passed through to `PersonaFilterRow`. */
  activePersonas: ReadonlySet<PersonaKey>;
  /** Called with the persona to toggle when its filter chip is clicked. */
  onTogglePersona: (persona: PersonaKey) => void;
}
