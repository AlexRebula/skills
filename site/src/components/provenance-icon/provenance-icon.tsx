import React, { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
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
  // Third-person throughout, naming the fork by name rather than "your"/
  // "you" - this reads on the public site to a visitor deciding whether to
  // install a skill, not to the maintainer writing it. Matches the title
  // PROVENANCE_BADGE_LABEL already uses for this exact status elsewhere.
  original: {
    title: 'AlexRebula original',
    body: "Built specifically for this fork, not from Matt Pocock's skills repo (mattpocock/skills).",
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoverId = useId();

  const entry = getProvenanceEntry(slug, provenanceMap);
  if (!entry) return null;

  const files = entry.status === 'modified' ? entry.diffs : undefined;
  const hasDiff = !!files && files.length > 0;
  const Icon = ICON[entry.status];
  const copy = COPY[entry.status];

  function cancelScheduledClose() {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  // Every re-entry (mouse or focus) cancels any close still pending from an
  // earlier exit - without this, moving the mouse from the trigger toward
  // the popover (crossing the few pixels of gap between them, which is not
  // itself part of either element) fires a real mouseleave, then mouseenter
  // again once the pointer lands on the popover. The mouseenter reopens it
  // synchronously, but the *first* mouseleave's own deferred close (below)
  // was never told that happened, and closes the just-reopened popover out
  // from under the pointer moments later - reported directly, and
  // reproducible on every attempt to reach a button inside the popover by
  // mouse.
  function openPopover() {
    cancelScheduledClose();
    setOpen(true);
  }

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
    cancelScheduledClose();
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      if (wrapperRef.current && !wrapperRef.current.contains(document.activeElement)) {
        setOpen(false);
      }
    }, 0);
  }

  // Escape is the standard way to dismiss any open popover/disclosure
  // without tabbing away from it - and closing must hand focus back to the
  // trigger explicitly: once the popover unmounts, whatever inside it had
  // focus (the "See what changed" button, if that's where the user was)
  // disappears from the DOM, and focus would otherwise silently fall back
  // to <body> instead of staying somewhere meaningful.
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      cancelScheduledClose();
      // Focusing the trigger fires this component's own onFocus handler
      // synchronously (openPopover, since the trigger is inside wrapperRef),
      // queuing a setOpen(true) - called first so the setOpen(false) right
      // after it is the *last* call in this same batch, which is the one
      // that wins. Reversing this order would silently reopen what Escape
      // just closed.
      triggerRef.current?.focus();
      setOpen(false);
    }
  }

  return (
    <span
      ref={wrapperRef}
      className={clsx(styles.wrapper, className)}
      onMouseEnter={openPopover}
      onMouseLeave={scheduleClose}
      onFocus={openPopover}
      onBlur={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={copy.title}
        // Not a toggle: a click always fires its own focus first (setting
        // open via onFocus above), so toggling here would immediately flip
        // it back closed on the very click meant to open it. Hover and
        // focus already open it; this only has to handle the touch case,
        // where the click is the only signal at all.
        onClick={openPopover}
        // Escape lives on the two real buttons, not the wrapper span: a
        // span with a key handler but no interactive role/tabIndex fails
        // jsx-a11y/no-static-element-interactions, and rightly so - a
        // listener has to sit on something a keyboard user can actually be
        // focused on when they press the key, and that's always one of
        // these two buttons, never the wrapper itself.
        onKeyDown={handleKeyDown}
      >
        <Icon className={clsx(styles.icon, styles[entry.status])} />
      </button>
      {open && (
        // No role="tooltip" here: per the WAI-ARIA authoring practices, a
        // tooltip must never contain focusable content, and this one holds
        // a real button for "modified" skills. Left with no special role,
        // this is a plain disclosure region - aria-controls/aria-expanded
        // on the trigger above is what makes the relationship accessible,
        // not a role on this element.
        <div id={popoverId} className={styles.popover}>
          <p className={styles.popoverTitle}>{copy.title}</p>
          <p className={styles.popoverBody}>{copy.body}</p>
          {hasDiff && (
            <button
              type="button"
              className={styles.diffTrigger}
              onClick={() => setDiffOpen(true)}
              onKeyDown={handleKeyDown}
            >
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
