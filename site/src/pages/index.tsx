import React, { useEffect, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import InlineMarkdown from '../components/InlineMarkdown';
import skillsData from '../data/skills-landing.json';
import styles from './index.module.css';

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

function CopyableCommand({ command }: { command: string }): ReactNode {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(command).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  }

  return (
    <div className={styles.commandRow}>
      <code>{command}</code>
      <button type="button" className={styles.copyButton} onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function GitHubStars(): ReactNode {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Rate-limited or offline: fall back to a plain link, no count shown.
      });
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      className={styles.starBadge}
      target="_blank"
      rel="noreferrer"
    >
      {stars ? `★ ${stars.toLocaleString()} stars` : 'View on GitHub'}
    </a>
  );
}

export default function Home(): ReactNode {
  const { categories } = skillsData;
  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <Layout
      title="Skills"
      description="A practical skill system for engineers who want to use AI without giving up their standards. Install the ones you use, then type a slash command."
    >
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <Heading as="h1" className={styles.heroTitle}>
                Skills for real engineers
              </Heading>
              <p className={styles.heroSubtitle}>
                A practical skill system for engineers who want to use AI without giving up their
                standards. Install the ones you use, then type a slash command. This is a fork of{' '}
                <a href="https://github.com/mattpocock/skills">mattpocock/skills</a> extended with
                framework scaffolding, the full git and PR lifecycle, and daily engineering
                workflows.
              </p>
              <div className={styles.metaRow}>
                <GitHubStars />
              </div>
            </div>

            <div>
              <div className={styles.installCard}>
                <Heading as="h3">Install the skills</Heading>
                <p>
                  Pick the skills you use. The installer writes editable files into your project.
                </p>
                <CopyableCommand command={`npx skills@latest add ${REPO}`} />
              </div>

              <div className={styles.installCard}>
                <Heading as="h3">Install as a Claude Code plugin</Heading>
                <p>A read-only, always-current bundle you don't fork or edit by hand.</p>
                <CopyableCommand command={`/plugin marketplace add ${REPO}`} />
                <div style={{ marginTop: '0.5rem' }}>
                  <CopyableCommand command="/plugin install alexrebula-skills@AlexRebula" />
                </div>
              </div>

              <p className={styles.agentsNote}>
                Works with Claude Code directly, and with Cursor, Codex, and any other
                Agent-Skills-standard harness via the <code>skills.sh</code> installer.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.summaryBar}>
          <div className={styles.summaryItem}>
            <strong>{totalSkills}</strong>
            <span>skills</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>{categories.length}</strong>
            <span>categories</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>MIT</strong>
            <span>license</span>
          </div>
        </div>

        {categories.map((category, i) => (
          <section key={category.key} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIndex}>{String(i + 1).padStart(2, '0')}</span>
              <Heading as="h2" className={styles.categoryTitle}>
                {CATEGORY_LABELS[category.key] ?? category.heading}
              </Heading>
            </div>
            <p className={styles.categoryDescription}>
              <InlineMarkdown text={category.description} />
            </p>
            <div className={styles.skillGrid}>
              {category.skills.map((skill) => (
                <Link
                  key={skill.name}
                  to={`/${category.key}/${skill.name}`}
                  className={styles.skillCard}
                >
                  <span className={styles.skillCommand}>/{skill.name}</span>
                  <span className={styles.skillDescription}>
                    <InlineMarkdown text={skill.description} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
