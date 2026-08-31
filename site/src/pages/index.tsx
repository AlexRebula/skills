import React, { useMemo, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { FeatureFlowSection } from '@littlebranches/giselle-mui';

import { CopyableCommand } from '../components/copyable-command';
import { GitHubStars } from '../components/github-stars';
import { LandingStatsSection } from '../components/landing-stats-section';
import { FlowStageHoverPanel } from '../components/flow-stage-hover-panel';
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
    [flowSections, activePersonas],
  );
  // A plain dark backdrop for every highlight-card slide - see
  // feature-flow-sections.ts's toHighlightCard doc comment for why this is
  // needed regardless of the giselle-mui scrim bug filed upstream.
  const skillCardMediaSrc = useBaseUrl('/img/flow-skill-card-backdrop.svg');
  const featureFlowItems = useMemo(
    () => buildFeatureFlowItems(filteredFlowSections, skillCardMediaSrc),
    [filteredFlowSections, skillCardMediaSrc],
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
      <div className={styles.page}>
        <div className={styles.column}>
          <p className={styles.kicker}>
            {totalSkills} skills · {categories.length} categories · MIT
          </p>
          <Heading as="h1" className={styles.heroTitle}>
            {HERO_TITLE}
          </Heading>
          <p className={styles.heroSubtitle}>
            {HERO_SUBTITLE_PREFIX}{' '}
            <a href={UPSTREAM_REPO_URL} target="_blank" rel="noreferrer">
              {UPSTREAM_REPO_LABEL}
            </a>{' '}
            {HERO_SUBTITLE_SUFFIX}
          </p>

          <PersonaFilterRow activePersonas={activePersonas} onTogglePersona={togglePersona} />

          <div className={styles.callout}>
            <span className={styles.calloutLabel}>{INSTALL_LABEL}</span>
            <CopyableCommand command={`npx skills@latest add ${REPO}`} />
            <p className={styles.calloutNote}>
              {INSTALL_NOTE_PREFIX} <code>/plugin marketplace add {REPO}</code>
            </p>
          </div>

          <div className={styles.metaRow}>
            <GitHubStars repo={REPO} />
          </div>

          <LandingStatsSection items={landingStats} />
        </div>

        {/*
          FeatureFlowSection renders full-width, outside .column's narrow
          (46rem) reading-width constraint - it manages its own real width
          internally via SectionContainer, the same way it's a direct,
          unconstrained child on giselle-mui's other real consumer's home
          page. Nesting it inside .column (as LandingStatsSection above is)
          would just re-narrow it on top of its own width logic.
        */}
        <FeatureFlowSection
          title="The Flow"
          items={featureFlowItems}
          image={{ src: featureFlowImageSrc, alt: '' }}
          renderRightPanel={(activeItem, isActiveExpanded) => (
            <FlowStageHoverPanel item={activeItem} isExpanded={isActiveExpanded} />
          )}
        />

        <div className={styles.column}>
          <p className={styles.overviewLink}>
            {OVERVIEW_LINK_PREFIX} <Link to="/overview">{OVERVIEW_LINK_TEXT}</Link> {OVERVIEW_LINK_DESCRIPTION}
          </p>
        </div>
      </div>
    </Layout>
  );
}
