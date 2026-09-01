import React, { useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import defaultProvenance from '../../data/provenance.json';
import { getProvenanceEntry } from '../../data/provenance.utils';
import type { ProvenanceMap, ProvenanceStatus } from '../../data/provenance.types';
import { ForkIcon, SparkleIcon, HistoryIcon } from '../provenance-glyphs';
import { DiffModal } from '../diff-modal';
import type { ProvenanceIconProps } from './types';
import styles from './provenance-icon.module.css';

/** The doc slug's last path segment, e.g. "/engineering/ask-matt" -> "ask-matt". */
function skillNameFromSlug(slug: string): string {
  return slug.replace(/\/$/, '').split('/').pop() ?? slug;
}

interface Copy {
  title: string;
  body: string;
}

// Always names Matt Pocock/mattpocock-skills explicitly, even for "original"
// (by saying what it *isn't*) - the whole point of this component is to fix
// a bare status word ("modified", "upstream") reading as meaningless without
// that context. Mirrors UpstreamCredit's existing wording where a skill
// shares that status, rather than inventing a second, divergent phrasing.
const COPY: Record<ProvenanceStatus, Copy> = {
  original: {
    title: 'Your own addition',
    body: "Not from Matt Pocock's skills repo (mattpocock/skills) - built for this fork.",
  },
  upstream: {
    title: 'Originally written by Matt Pocock',
    body: 'Unchanged from mattpocock/skills.',
  },
  modified: {
    title: "Based on Matt Pocock's original, modified here",
    body: 'Started as a skill from mattpocock/skills, since edited in this fork.',
  },
  inherited: {
    title: 'Originally written by Matt Pocock',
    body: 'Existed in mattpocock/skills once; removed there since.',
  },
};

const ICON: Record<ProvenanceStatus, (props: { className?: string }) => ReactNode> = {
  original: SparkleIcon,
  upstream: ForkIcon,
  modified: ForkIcon,
  inherited: HistoryIcon,
};

/**
 * Icon-only provenance indicator for the dense homepage Flow views (the
 * hover-panel skill list, the skill accordion) - `ProvenanceButton` shows the
 * same information as an always-visible text badge, which is the right call
 * on a doc page with room to spare, but read as visual noise repeated once
 * per row across dozens of skills. This trades that always-visible text for
 * a small icon, with the same explanation available on hover/focus instead
 * of permanently on screen.
 */
export function ProvenanceIcon({ slug, provenanceMap = defaultProvenance as ProvenanceMap, className }: ProvenanceIconProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [diffOpen, setDiffOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const entry = getProvenanceEntry(slug, provenanceMap);
  if (!entry) return null;

  const files = entry.status === 'modified' ? entry.diffs : undefined;
  const hasDiff = !!files && files.length > 0;
  const Icon = ICON[entry.status];
  const copy = COPY[entry.status];

  // Closing is deferred and re-checked against document.activeElement,
  // rather than closing synchronously the instant the mouse leaves or focus
  // moves off the trigger. A synchronous close on mouseleave unmounts the
  // popover (and the "See what changed" button inside it) before a click
  // already in flight toward that button - mousemove/mouseleave land before
  // mousedown/focus/click in the browser's own event order - ever reaches
  // it, so the click silently does nothing. Deferring lets that click's own
  // focus land first; the check then finds focus still inside the wrapper
  // and leaves the popover open. relatedTarget isn't used for the same
  // check on blur: jsdom (and some real browsers) don't reliably populate
  // it, which would otherwise close on every blur regardless of where focus
  // actually landed.
  function scheduleClose() {
    setTimeout(() => {
      if (wrapperRef.current && !wrapperRef.current.contains(document.activeElement)) {
        setOpen(false);
      }
    }, 0);
  }

  return (
    <span
      ref={wrapperRef}
      className={clsx(styles.wrapper, className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={scheduleClose}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-label={copy.title}
        // Not a toggle: a click always fires its own focus first (setting
        // open=true via onFocus below), so toggling here would immediately
        // flip it back closed on the very click meant to open it. Hover and
        // focus already open it; this only has to handle the touch case,
        // where the click is the only signal at all.
        onClick={() => setOpen(true)}
      >
        <Icon className={clsx(styles.icon, styles[entry.status])} />
      </button>
      {open && (
        <div className={styles.popover} role="tooltip">
          <p className={styles.popoverTitle}>{copy.title}</p>
          <p className={styles.popoverBody}>{copy.body}</p>
          {hasDiff && (
            <button type="button" className={styles.diffTrigger} onClick={() => setDiffOpen(true)}>
              See what changed
            </button>
          )}
        </div>
      )}
      {diffOpen && hasDiff && files && (
        <DiffModal
          skillName={skillNameFromSlug(slug)}
          upstreamSha={entry.upstreamSha ?? ''}
          files={files}
          onClose={() => setDiffOpen(false)}
        />
      )}
    </span>
  );
}
