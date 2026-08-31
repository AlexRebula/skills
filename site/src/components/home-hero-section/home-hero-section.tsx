import React, { type ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionContainer, SectionTitle } from '@littlebranches/giselle-mui';

import { CopyableCommand } from '../copyable-command';
import { GitHubStars } from '../github-stars';
import {
  REPO,
  HERO_TITLE,
  HERO_SUBTITLE_PREFIX,
  HERO_SUBTITLE_SUFFIX,
  UPSTREAM_REPO_URL,
  UPSTREAM_REPO_LABEL,
  INSTALL_LABEL,
  INSTALL_NOTE_PREFIX,
  formatHeroStatsCaption,
} from '../../data/index-page-copy';
import {
  HERO_GRID_SPACING,
  HERO_GRID_SX,
  HERO_LEFT_COLUMN_SIZE,
  HERO_RIGHT_COLUMN_SIZE,
  HERO_LEFT_STACK_SPACING,
  HERO_RIGHT_STACK_SPACING,
  HERO_SUBTITLE_SX,
  HERO_INSTALL_CALLOUT_SX,
  HERO_INSTALL_LABEL_SX,
  HERO_INSTALL_NOTE_SX,
} from './home-hero-section.const';
import type { HomeHeroSectionProps } from './types';

/**
 * Homepage hero — the page's one real `<h1>`. Uses giselle-mui's
 * `SectionTitle` with `titleComponent="h1"` (see giselle-mui's `SectionTitle`
 * doc comment) so this heading carries a genuine `<h1>` tag while keeping the
 * exact same `h2`-sized visual weight as every other `SectionTitle` on the
 * page — previously a hand-built `SectionCaption` + `Typography
 * component="h1" variant="h2"` pair duplicating that styling by hand.
 *
 * Left column: stats caption, title, subtitle (kept as its own sibling
 * `Typography` rather than `SectionTitle`'s `description` slot, which renders
 * at `body1` — smaller than this hero's `h5` subtitle). Right column: the
 * install callout and GitHub star count, unchanged from the page's previous
 * inline markup. The persona filter row (#176) lives in its own
 * `PersonaPickerSection` further down the page, not here.
 */
export function HomeHeroSection({ totalSkills, categoriesCount }: HomeHeroSectionProps): ReactNode {
  return (
    <SectionContainer>
      <Grid container spacing={HERO_GRID_SPACING} sx={HERO_GRID_SX}>
        <Grid size={HERO_LEFT_COLUMN_SIZE}>
          <Stack spacing={HERO_LEFT_STACK_SPACING}>
            <SectionTitle
              caption={formatHeroStatsCaption(totalSkills, categoriesCount)}
              title={HERO_TITLE}
              titleComponent="h1"
            />
            <Typography variant="h5" color="text.secondary" sx={HERO_SUBTITLE_SX}>
              {HERO_SUBTITLE_PREFIX}{' '}
              <a href={UPSTREAM_REPO_URL} target="_blank" rel="noreferrer">
                {UPSTREAM_REPO_LABEL}
              </a>{' '}
              {HERO_SUBTITLE_SUFFIX}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={HERO_RIGHT_COLUMN_SIZE}>
          <Stack spacing={HERO_RIGHT_STACK_SPACING}>
            <Box sx={HERO_INSTALL_CALLOUT_SX}>
              <Typography variant="overline" color="primary.dark" sx={HERO_INSTALL_LABEL_SX}>
                {INSTALL_LABEL}
              </Typography>
              <CopyableCommand command={`npx skills@latest add ${REPO}`} />
              <Typography variant="body2" color="text.secondary" sx={HERO_INSTALL_NOTE_SX}>
                {INSTALL_NOTE_PREFIX} <code>/plugin marketplace add {REPO}</code>
              </Typography>
            </Box>

            <Box>
              <GitHubStars repo={REPO} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
