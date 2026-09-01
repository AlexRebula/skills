import React, { useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import { SkillIcon } from '../skill-icon';
import { DiffModal } from '../diff-modal';
import type { SkillCardProps } from './types';
import styles from './skill-card.module.css';

/**
 * The landing-page summary card for every skill, one color per provenance
 * status: "original" (never existed upstream), "inherited" (existed upstream
 * once, since removed there), "upstream" (unchanged from upstream), and
 * "modified" (changed from upstream — the only status with a `diff` to show).
 * Visual shape is hand-ported into this site's plain CSS Modules from
 * giselle-mui's stat-card design (a MUI component this site otherwise has no
 * dependency on), not its literal implementation: the same gradient card,
 * background shape illustration, and typography, with the trend indicator
 * and sparkline chart removed (there's no numeric metric to show here) and a
 * semantically-matched icon in their place.
 *
 * The name/icon/label block is its own inner `<Link>` rather than the whole
 * card being one, so a "modified" card's diff button can sit alongside it as
 * a sibling `<button>` instead of nesting interactive content inside the
 * anchor (invalid HTML, and unreachable via keyboard in some browsers).
 */
export function SkillCard({ category, name, color, label, diff }: SkillCardProps): ReactNode {
  const shapeUrl = useBaseUrl('/img/shape-square.svg');
  const [diffOpen, setDiffOpen] = useState(false);
  const hasDiff = !!diff && diff.files.length > 0;

  return (
    <div className={clsx(styles.card, styles[color])}>
      <Link to={`/${category}/${name}`} className={styles.cardLink}>
        <span className={styles.iconBox}>
          <SkillIcon category={category} name={name} />
        </span>
        <span className={styles.label}>{label}</span>
        <span className={styles.name}>/{name}</span>
      </Link>
      {hasDiff && (
        <button
          type="button"
          className={styles.diffButton}
          aria-expanded={diffOpen}
          onClick={() => setDiffOpen((v) => !v)}
        >
          See what&apos;s different
        </button>
      )}
      <span
        className={styles.shape}
        style={{ WebkitMaskImage: `url(${shapeUrl})`, maskImage: `url(${shapeUrl})` }}
        aria-hidden="true"
      />
      {diffOpen && hasDiff && diff && (
        <DiffModal skillName={name} upstreamSha={diff.upstreamSha} files={diff.files} onClose={() => setDiffOpen(false)} />
      )}
    </div>
  );
}
