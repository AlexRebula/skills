import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import { CopyableCommand } from '../components/copyable-command';
import { GitHubStars } from '../components/github-stars';
import { LandingStatsSection } from '../components/landing-stats-section';
import { FlowStageSectionView } from '../components/flow-stage-section';
import { computeLandingStats } from '../data/landing-stats';
import { buildFlowSections } from '../data/flow-sections';
import skillsData from '../data/skills-landing.json';
import provenanceData from '../data/provenance.json';
import type { ProvenanceMap } from '../data/provenance.types';
import type { SkillsLandingData } from '../data/skills-landing.types';
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

          {flowSections.map((section, i) => (
            <FlowStageSectionView key={section.label} section={section} index={i} />
          ))}

          <p className={styles.overviewLink}>
            {OVERVIEW_LINK_PREFIX} <Link to="/overview">{OVERVIEW_LINK_TEXT}</Link> {OVERVIEW_LINK_DESCRIPTION}
          </p>
        </div>
      </div>
    </Layout>
  );
}
