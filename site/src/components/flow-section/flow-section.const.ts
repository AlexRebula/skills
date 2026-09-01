import type { FeatureFlowGridSize, FeatureFlowSectionProps } from '@littlebranches/giselle-mui';

// The right panel carries real, variable-length content here (a per-skill
// list), not a single image - it needs more room than the default 7/5 split
// gives an image column, and less of a gap than the default (image-column)
// spacing assumes.
export const FLOW_DESCRIPTION_GRID_SIZE: FeatureFlowGridSize = { xs: 12, md: 6, lg: 5 };

// See `FLOW_DESCRIPTION_GRID_SIZE` above - the two sizes are chosen together.
export const FLOW_IMAGE_GRID_SIZE: FeatureFlowGridSize = { xs: 12, md: 6, lg: 7 };

// See `FLOW_DESCRIPTION_GRID_SIZE` above - less of a gap than the default
// (image-column) spacing assumes.
export const FLOW_COLUMN_SPACING: NonNullable<FeatureFlowSectionProps['columnSpacing']> = {
  xs: 0,
  md: 4,
};

// giselle-mui#feature/render-highlight-panel's detailPanelColor.
export const FLOW_DETAIL_PANEL_COLOR: NonNullable<FeatureFlowSectionProps['detailPanelColor']> =
  'info';
