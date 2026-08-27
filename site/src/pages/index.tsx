import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import { InlineMarkdown } from '../components/inline-markdown';
import { CopyableCommand } from '../components/copyable-command';
import { GitHubStars } from '../components/github-stars';
import { SkillCard } from '../components/skill-card';
import type { SkillCardColor } from '../components/skill-card';
import { LandingStatsSection } from '../components/landing-stats-section';
import { computeLandingStats } from '../data/landing-stats';
import { buildFlowSections } from '../data/flow-sections';
import type { FlowSkill, FlowStageSection } from '../data/flow-sections';
import skillsData from '../data/skills-landing.json';
import provenanceData from '../data/provenance.json';
import type { ProvenanceMap, ProvenanceStatus } from '../data/provenance.types';
import type { SkillsLandingData } from '../data/skills-landing.types';
import { FLOW_STAGES } from '../../sidebars';
import styles from './index.module.css';

const provenanceMap = provenanceData as ProvenanceMap;
const landingData = skillsData as SkillsLandingData;

const REPO = 'AlexRebula/skills';

// Every provenance status renders as a SkillCard on the landing page, one
// color/label per status; "modified" is the only one that ever gets a real
// diff to show (see the diff lookup in the render loop below).
const SKILL_CARD_CONFIG: Record<ProvenanceStatus, { color: SkillCardColor; label: string }> = {
  original: { color: 'green', label: 'AlexRebula Original.' },
  inherited: { color: 'amber', label: 'Inherited from Matt Pocock' },
  upstream: { color: 'blue', label: 'Upstream - Unchanged' },
  modified: { color: 'purple', label: 'Modified from Matt Pocock' },
};

/** One skill's card + description, the row shape shared by both of a stage's sub-lists. */
function SkillListItem({ skill }: { skill: FlowSkill }): ReactNode {
  const cardConfig = SKILL_CARD_CONFIG[skill.status];
  return (
    <div className={styles.skillRow}>
      <dt>
        <SkillCard
          category={skill.category}
          name={skill.name}
          color={cardConfig.color}
          label={cardConfig.label}
          diff={skill.diff}
        />
      </dt>
      <dd className={styles.skillDefinition}>
        <InlineMarkdown text={skill.description} />
      </dd>
    </div>
  );
}

/**
 * One of a stage's two sub-lists ("Original" or the Matt-lineage group).
 * Renders nothing when empty, so a stage made up entirely of one kind of
 * skill doesn't show a dangling empty heading (issue #156).
 */
function SkillSubList({ heading, skills }: { heading: string; skills: FlowSkill[] }): ReactNode {
  if (skills.length === 0) return null;
  return (
    <div className={styles.subList}>
      <p className={styles.subListHeading}>{heading}</p>
      <dl className={styles.skillList}>
        {skills.map((skill) => (
          <SkillListItem key={`${skill.category}/${skill.name}`} skill={skill} />
        ))}
      </dl>
    </div>
  );
}

/**
 * One flow-stage section: title/order come from FLOW_STAGES (site/sidebars.ts),
 * not the old category buckets. Split into "Original" (mine) first, then
 * everything with real Matt Pocock lineage - upstream/modified/inherited
 * together - per #156's grilled decision; this is a physical re-sort, not
 * just a color cue on top of #145's four-color SkillCard design.
 */
function FlowStageSectionView({ section, index }: { section: FlowStageSection; index: number }): ReactNode {
  return (
    <section className={styles.categorySection}>
      <p className={styles.kicker}>
        {String(index + 1).padStart(2, '0')} · {section.label}
      </p>
      <Heading as="h2" className={styles.categoryTitle}>
        {section.label}
      </Heading>
      <SkillSubList heading="Original" skills={section.original} />
      <SkillSubList heading="From Matt Pocock" skills={section.lineage} />
    </section>
  );
}

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
            Skills for real engineers
          </Heading>
          <p className={styles.heroSubtitle}>
            A practical skill system for engineers who want to use AI without giving up their
            standards. Install the ones you use, then type a slash command. This is a fork of{' '}
            <a href="https://github.com/mattpocock/skills" target="_blank" rel="noreferrer">
              mattpocock/skills
            </a>{' '}
            extended with framework scaffolding, the full git and PR lifecycle, and daily
            engineering workflows.
          </p>

          <div className={styles.callout}>
            <span className={styles.calloutLabel}>Install</span>
            <CopyableCommand command={`npx skills@latest add ${REPO}`} />
            <p className={styles.calloutNote}>
              Or as a read-only Claude Code plugin: <code>/plugin marketplace add {REPO}</code>
            </p>
          </div>

          <div className={styles.metaRow}>
            <GitHubStars repo={REPO} />
          </div>

          <p className={styles.overviewLink}>
            New here? <Link to="/overview">Read the Flow</Link> — a walkthrough of all{' '}
            {totalSkills} skills in the order a real day actually uses them.
          </p>

          <LandingStatsSection items={landingStats} />

          {flowSections.map((section, i) => (
            <FlowStageSectionView key={section.label} section={section} index={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
