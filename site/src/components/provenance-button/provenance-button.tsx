import React, { useState, type MouseEvent, type ReactNode } from 'react';
import clsx from 'clsx';
import defaultProvenance from '../../data/provenance.json';
import { getProvenanceEntry } from '../../data/provenance.utils';
import type { ProvenanceMap, ProvenanceStatus } from '../../data/provenance.types';
import { PROVENANCE_BADGE_LABEL } from '../../data/provenance-display';
import { DiffModal } from '../diff-modal';
import type { ProvenanceButtonProps } from './types';
import styles from './provenance-button.module.css';

/** The doc slug's last path segment, e.g. "/engineering/ask-matt" -> "ask-matt". */
function skillNameFromSlug(slug: string): string {
  return slug.replace(/\/$/, '').split('/').pop() ?? slug;
}

// This button's own label, built on the shared badge label map: three of
// the four statuses (original/upstream/inherited) show the exact same badge
// text SkillCard shows elsewhere on the page. "modified" is the deliberate
// exception - a clickable CTA ("see the diff") rather than a static badge,
// so it overrides the shared label rather than reusing it.
const LABEL: Record<keyof typeof PROVENANCE_BADGE_LABEL, string> = {
  ...PROVENANCE_BADGE_LABEL,
  modified: "See what's different",
};

/** Two small nodes forking down into one: upstream/modified both have a real relationship to a single upstream source. */
function ForkIcon(): ReactNode {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4" cy="3" r="1.4" />
      <circle cx="12" cy="3" r="1.4" />
      <circle cx="8" cy="13" r="1.4" />
      <path d="M4 4.4V6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4.4" />
      <path d="M8 8v3.2" />
    </svg>
  );
}

/** A plus in a circle: original has nothing to fork from, it's a new addition, not a relationship to upstream. */
function NewIcon(): ReactNode {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 5.3v5.4M5.3 8h5.4" />
    </svg>
  );
}

const ICON: Record<ProvenanceStatus, () => ReactNode> = {
  upstream: ForkIcon,
  modified: ForkIcon,
  original: NewIcon,
  // Inherited has a real (historical) upstream relationship too, just not a
  // current one, so it gets the fork icon rather than the "new" one.
  inherited: ForkIcon,
};

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 0;

function appendRipple(prev: Ripple[], next: Ripple): Ripple[] {
  return [...prev, next];
}

function removeRipple(prev: Ripple[], id: number): Ripple[] {
  return prev.filter((r) => r.id !== id);
}

/** A small, self-contained stand-in for MUI's TouchRipple: expanding circle from the click point, then fades out. */
function useRipple(): { ripples: Ripple[]; addRipple: (e: MouseEvent<HTMLElement>) => void } {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function addRipple(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = rippleId++;
    const ripple: Ripple = { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size };
    setRipples((prev) => appendRipple(prev, ripple));
    setTimeout(() => setRipples((prev) => removeRipple(prev, id)), 550);
  }

  return { ripples, addRipple };
}

/**
 * The provenance label AND the "what's different" trigger, merged into one
 * control: an outlined button colored per status (secondary/info/primary,
 * matching the badge colors this replaced), clickable only when modified.
 * No tooltip: the label text itself states the status plainly.
 *
 * - modified: enabled, opens the full-screen DiffModal (side-by-side, tabbed
 *   per changed file) with the real line-level diff generate-provenance.ts
 *   computed at build time.
 * - upstream / original / inherited: aria-disabled, same status color, no
 *   click behavior.
 */
export function ProvenanceButton({
  slug,
  provenanceMap = defaultProvenance as ProvenanceMap,
  compact = false,
}: ProvenanceButtonProps): ReactNode {
  const [open, setOpen] = useState(false);
  const { ripples, addRipple } = useRipple();
  const entry = getProvenanceEntry(slug, provenanceMap);
  if (!entry) return null;

  const files = entry.status === 'modified' ? entry.diffs : undefined;
  const hasDiff = !!files && files.length > 0;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!hasDiff) return;
    addRipple(e);
    setOpen((v) => !v);
  }

  const Icon = ICON[entry.status];

  return (
    <span className={styles.anchor}>
      <button
        type="button"
        className={clsx(styles.button, styles[entry.status], compact && styles.compact)}
        aria-disabled={!hasDiff}
        aria-expanded={hasDiff ? open : undefined}
        onClick={handleClick}
      >
        {hasDiff && (
          <span className={styles.rippleLayer} aria-hidden="true">
            {ripples.map((r) => (
              <span
                key={r.id}
                className={styles.ripple}
                style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
              />
            ))}
          </span>
        )}
        <Icon />
        {LABEL[entry.status]}
      </button>
      {open && hasDiff && (
        <DiffModal
          skillName={skillNameFromSlug(slug)}
          upstreamSha={entry.upstreamSha ?? ''}
          files={files}
          onClose={() => setOpen(false)}
        />
      )}
    </span>
  );
}
