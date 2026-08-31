import React, { useMemo, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FeatureFlowSection,
  SectionCaption,
  SectionContainer,
  SectionTitle,
  channelAlpha,
} from '@littlebranches/giselle-mui';

import { CopyableCommand } from '../components/copyable-command';
import { GitHubStars } from '../components/github-stars';
import { LandingStatsSection } from '../components/landing-stats-section';
import { FlowStageHoverPanel } from '../components/flow-stage-hover-panel';
import { FlowSkillAccordionList } from '../components/flow-skill-accordion-list';
import { PersonaFilterRow } from '../components/persona-filter-row';
import { computeLandingStats } from '../data/landing-stats';
import { buildFlowSections, filterFlowSections } from '../data/flow-sections';
import { buildFeatureFlowItems } from '../data/feature-flow-sections';
import skillsData from '../data/skills-landing.json';
import provenanceData from '../data/provenance.json';
import type { ProvenanceMap } from '../data/provenance.types';
import type { SkillsLandingData } from '../data/skills-landing.types';
import type { PersonaKey } from '../data/personas.types';
import { FLOW_STAGES } from '../../sidebars';
import {
  REPO,
  HERO_TITLE,
  HERO_SUBTITLE_PREFIX,
  HERO_SUBTITLE_SUFFIX,
  UPSTREAM_REPO_URL,
  UPSTREAM_REPO_LABEL,
  INSTALL_LABEL,
  INSTALL_NOTE_PREFIX,
  OVERVIEW_LINK_PREFIX,
  OVERVIEW_LINK_TEXT,
  OVERVIEW_LINK_DESCRIPTION,
  PERSONA_HERO_TITLE,
  PERSONA_HERO_DESCRIPTION,
  PERSONA_HERO_CAPTION
} from '../data/index-page-copy';
import styles from './index.module.css';

const provenanceMap = provenanceData as ProvenanceMap;
const landingData = skillsData as SkillsLandingData;

export default function Home(): ReactNode {
  const { categories } = landingData;
  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);
  const landingStats = computeLandingStats({
    totalSkills,
    totalCategories: categories.length,
    provenanceMap,
  });
  const flowSections = buildFlowSections(FLOW_STAGES, landingData, provenanceMap);

  // Persona filter state (issue #176): local component state only, resets
  // on refresh per this ticket's acceptance criteria - no localStorage/URL
  // param persistence in scope here.
  const [activePersonas, setActivePersonas] = useState<ReadonlySet<PersonaKey>>(new Set());
  const togglePersona = (persona: PersonaKey) => {
    setActivePersonas((prev) => {
      const next = new Set(prev);
      if (next.has(persona)) {
        next.delete(persona);
      } else {
        next.add(persona);
      }
      return next;
    });
  };
  const filteredFlowSections = useMemo(
    () => filterFlowSections(flowSections, activePersonas),
    [flowSections, activePersonas]
  );
  // A plain dark backdrop for every highlight-card slide - see
  // feature-flow-sections.ts's toHighlightCard doc comment for why this is
  // needed regardless of the giselle-mui scrim bug filed upstream.
  const skillCardMediaSrc = useBaseUrl('/img/flow-skill-card-backdrop.svg');
  const featureFlowItems = useMemo(
    () => buildFeatureFlowItems(filteredFlowSections, skillCardMediaSrc),
    [filteredFlowSections, skillCardMediaSrc]
  );
  // FeatureFlowSectionProps.image is required even with renderRightPanel
  // supplying the visible content (giselle-mui#188's known limitation: the
  // internal image-preload/prewarm hooks aren't undefined-safe yet) - this
  // placeholder is never rendered, just needs to resolve.
  const featureFlowImageSrc = useBaseUrl('/img/shape-square.svg');

  return (
    <Layout
      title="Skills"
      description="A practical skill system for engineers who want to use AI without giving up their standards. Install the ones you use, then type a slash command."
    >
      <div>
        {/*
          SectionContainer (giselle-mui) - full-width <section>, content
          capped at maxWidth="lg" (1200px, responsive at every breakpoint
          below that too) - the same container FeatureFlowSection and
          LandingStatsSection already use internally, for genuine width
          parity instead of a hand-rolled CSS max-width that has to be kept
          in sync by hand. LandingStatsSection and FeatureFlowSection below
          are deliberately NOT wrapped in one of these themselves - they
          already provide their own internally; doing it again here would
          just double-nest containers.
        */}
        <SectionContainer>
          <Grid container spacing={{ xs: 5, md: 4 }} sx={{ alignItems: 'center' }}>

            <Box>
                  <SectionCaption
                    title={`${totalSkills} skills · ${categories.length} categories · MIT`}
                    sx={{ display: 'block', mb: 1.5 }}
                  />
                  <Typography component="h1" variant="h2">
                    {HERO_TITLE}
                  </Typography>
                </Box>
            <Grid size={{ xs: 12, md: 6 }}>
              
              <Stack spacing={3}>
              
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 400 }}>
                  {HERO_SUBTITLE_PREFIX}{' '}
                  <a href={UPSTREAM_REPO_URL} target="_blank" rel="noreferrer">
                    {UPSTREAM_REPO_LABEL}
                  </a>{' '}
                  {HERO_SUBTITLE_SUFFIX}
                </Typography>

              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Box
                  sx={{
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                    bgcolor: channelAlpha('var(--mui-palette-primary-mainChannel)', 0.08),
                    borderRadius: '0 6px 6px 0',
                    p: { xs: 2, md: 2.5 },
                  }}
                >
                  <Typography
                    variant="overline"
                    color="primary.dark"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {INSTALL_LABEL}
                  </Typography>
                  <CopyableCommand command={`npx skills@latest add ${REPO}`} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
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

        <LandingStatsSection items={landingStats} />

        <SectionContainer>

           <SectionTitle
            caption={PERSONA_HERO_CAPTION}
            title={PERSONA_HERO_TITLE}
            description={PERSONA_HERO_DESCRIPTION}
            sx={{ mb: { xs: 3, md: 4 } }}
          />

          <PersonaFilterRow activePersonas={activePersonas} onTogglePersona={togglePersona} />

        </SectionContainer>

        <FeatureFlowSection
          title="The Flow"
          items={featureFlowItems}
          image={{ src: featureFlowImageSrc, alt: '' }}
          renderRightPanel={(activeItem, isActiveExpanded) => (
            <FlowStageHoverPanel item={activeItem} isExpanded={isActiveExpanded} />
          )}
          renderHighlightPanel={(item) => <FlowSkillAccordionList item={item} />}
          // The right panel carries real, variable-length content here (a
          // per-skill list), not a single image - it needs more room than
          // the default 7/5 split gives an image column, and less of a gap
          // than the default (image-column) spacing assumes.
          descriptionGridSize={{ xs: 12, md: 6, lg: 5 }}
          imageGridSize={{ xs: 12, md: 6, lg: 7 }}
          columnSpacing={{ xs: 0, md: 4 }}
          // A neutral grey tint (giselle-mui#feature/render-highlight-panel's
          // detailPanelColor, not a primary-tinted background) - the accordion
          // (FlowSkillAccordionList) is themed to sit on top of it, with its
          // own collapsed/expanded states inverted to read against grey
          // instead of a plain page background.
          detailPanelColor="grey"
        />

        <SectionContainer>
          <p className={styles.overviewLink}>
            {OVERVIEW_LINK_PREFIX} <Link to="/overview">{OVERVIEW_LINK_TEXT}</Link>{' '}
            {OVERVIEW_LINK_DESCRIPTION}
          </p>
        </SectionContainer>
      </div>
    </Layout>
  );
}
