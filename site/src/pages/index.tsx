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
import { CATEGORY_INFO } from '../data/categories';
import type { CategoryKey } from '../data/categories';
import { getProvenanceEntry } from '../data/provenance.utils';
import { computeLandingStats } from '../data/landing-stats';
import skillsData from '../data/skills-landing.json';
import provenanceData from '../data/provenance.json';
import type { ProvenanceMap, ProvenanceStatus } from '../data/provenance.types';
import styles from './index.module.css';

const provenanceMap = provenanceData as ProvenanceMap;

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

export default function Home(): ReactNode {
  const { categories } = skillsData;
  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);
  const landingStats = computeLandingStats({
    totalSkills,
    totalCategories: categories.length,
    provenanceMap,
  });

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

          {categories.map((category, i) => (
            <section key={category.key} className={styles.categorySection}>
              <p className={styles.kicker}>
                {String(i + 1).padStart(2, '0')} · {CATEGORY_INFO[category.key as CategoryKey]?.label ?? category.heading}
              </p>
              <Heading as="h2" className={styles.categoryTitle}>
                {CATEGORY_INFO[category.key as CategoryKey]?.label ?? category.heading}
              </Heading>
              <p className={styles.categoryDescription}>
                <InlineMarkdown text={category.description} />
              </p>

              <dl className={styles.skillList}>
                {category.skills.map((skill) => {
                  const entry = getProvenanceEntry(`${category.key}/${skill.name}`, provenanceMap);
                  const cardConfig = SKILL_CARD_CONFIG[entry?.status ?? 'original'];
                  const diff =
                    entry?.status === 'modified' && entry.diffs && entry.diffs.length > 0
                      ? { upstreamSha: entry.upstreamSha ?? '', files: entry.diffs }
                      : undefined;

                  return (
                    <div key={skill.name} className={styles.skillRow}>
                      <dt>
                        <SkillCard
                          category={category.key}
                          name={skill.name}
                          color={cardConfig.color}
                          label={cardConfig.label}
                          diff={diff}
                        />
                      </dt>
                      <dd className={styles.skillDefinition}>
                        <InlineMarkdown text={skill.description} />
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
