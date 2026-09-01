import { channelAlpha } from '@littlebranches/giselle-mui';

/** Spacing for the hero's two-column `Grid container`. */
export const HERO_GRID_SPACING = { xs: 5, md: 7 };

/** `sx` for the hero's `Grid container` - vertically centers both columns. */
export const HERO_GRID_SX = { alignItems: 'center' };

/** `size` for the hero's left (copy) column - 7/12 at `md` and up. */
export const HERO_LEFT_COLUMN_SIZE = { xs: 12, md: 6 };

/** `size` for the hero's right (install/stars) column - 5/12 at `md` and up. */
export const HERO_RIGHT_COLUMN_SIZE = { xs: 12, md: 6 };

/** Spacing for the left column's `Stack` (title, subtitle, persona filter row). */
export const HERO_LEFT_STACK_SPACING = 3;

/** Spacing for the right column's `Stack` (install callout, GitHub stars). */
export const HERO_RIGHT_STACK_SPACING = 3;

/** `sx` for the hero subtitle `Typography` - overrides the `h5` variant's default bold weight. */
export const HERO_SUBTITLE_SX = { fontWeight: 400 };

/** `sx` for the install callout `Box` - a left-accented, primary-tinted panel. */
export const HERO_INSTALL_CALLOUT_SX = {
  borderLeft: '3px solid',
  borderColor: 'primary.main',
  bgcolor: channelAlpha('var(--mui-palette-primary-mainChannel)', 0.08),
  borderRadius: '0 6px 6px 0',
  p: { xs: 2, md: 2.5 },
};

/** `sx` for the install callout's "Install" overline label. */
export const HERO_INSTALL_LABEL_SX = { display: 'block', mb: 1 };

/** `sx` for the install callout's plugin-marketplace note. */
export const HERO_INSTALL_NOTE_SX = { mt: 1 };
