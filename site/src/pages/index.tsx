import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import { InlineMarkdown } from '../components/inline-markdown';
import { CopyableCommand } from '../components/copyable-command';
import { GitHubStars } from '../components/github-stars';
import { ProvenanceButton } from '../components/provenance-button';
import { OriginalSkillCard } from '../components/original-skill-card';
import { getProvenanceEntry } from '../data/provenance.utils';
import skillsData from '../data/skills-landing.json';
import provenanceData from '../data/provenance.json';
import type { ProvenanceMap } from '../data/provenance.types';
import styles from './index.module.css';

const provenanceMap = provenanceData as ProvenanceMap;

const REPO = 'AlexRebula/skills';

const CATEGORY_LABELS: Record<string, string> = {
  engineering: 'Engineering',
  productivity: 'Productivity',
  git: 'Git',
  framework: 'Framework',
  org: 'Organisation',
  personal: 'Personal',
  misc: 'Misc',
};

export default function Home(): ReactNode {
  const { categories } = skillsData;
  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

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

          {categories.map((category, i) => (
            <section key={category.key} className={styles.categorySection}>
              <p className={styles.kicker}>
                {String(i + 1).padStart(2, '0')} · {CATEGORY_LABELS[category.key] ?? category.heading}
              </p>
              <Heading as="h2" className={styles.categoryTitle}>
                {CATEGORY_LABELS[category.key] ?? category.heading}
              </Heading>
              <p className={styles.categoryDescription}>
                <InlineMarkdown text={category.description} />
              </p>

              <dl className={styles.skillList}>
                {category.skills.map((skill) => {
                  const isOriginal =
                    getProvenanceEntry(`${category.key}/${skill.name}`, provenanceMap)?.status ===
                    'original';

                  return (
                    <div
                      key={skill.name}
                      className={clsx(styles.skillRow, isOriginal && styles.skillRowOriginal)}
                    >
                      <dt className={isOriginal ? undefined : styles.skillTerm}>
                        {isOriginal ? (
                          <OriginalSkillCard category={category.key} name={skill.name} />
                        ) : (
                          <Link to={`/${category.key}/${skill.name}`}>/{skill.name}</Link>
                        )}
                      </dt>
                      <dd className={styles.skillDefinition}>
                        <InlineMarkdown text={skill.description} />
                        {!isOriginal && (
                          <ProvenanceButton slug={`/${category.key}/${skill.name}`} compact />
                        )}
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
