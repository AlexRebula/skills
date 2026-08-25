import type { StatCardItem } from '@littlebranches/giselle-mui';

export interface LandingStatsSectionProps {
  /** Pre-computed stat tiles — see `computeLandingStats` in `data/landing-stats.ts`. */
  items: StatCardItem[];
}
