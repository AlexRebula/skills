import React, { type ReactNode } from 'react';

/**
 * The four provenance-status glyphs, shared between `ProvenanceButton` (the
 * doc-page, full-text badge) and `ProvenanceIcon` (the homepage, icon-only
 * indicator) so the same status always reads as the same shape everywhere -
 * per the promotion rule (a helper needed by a second module moves to one
 * shared file rather than being redeclared), the same rule provenance.utils.ts
 * already follows for `getProvenanceEntry`.
 */

export interface ProvenanceGlyphProps {
  /** Sizing lives at the call site (doc-page badge vs. homepage icon need different dimensions), never hardcoded here. */
  className?: string;
}

const COMMON_PROPS = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Two small nodes forking down into one: upstream/modified both have a real relationship to a single upstream source. */
export function ForkIcon({ className }: ProvenanceGlyphProps): ReactNode {
  return (
    <svg {...COMMON_PROPS} className={className}>
      <circle cx="4" cy="3" r="1.4" />
      <circle cx="12" cy="3" r="1.4" />
      <circle cx="8" cy="13" r="1.4" />
      <path d="M4 4.4V6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4.4" />
      <path d="M8 8v3.2" />
    </svg>
  );
}

/**
 * A four-point sparkle: "new" without borrowing any specific object metaphor.
 * Replaces a bare "+" (unclear on its own what's being added to what).
 */
export function SparkleIcon({ className }: ProvenanceGlyphProps): ReactNode {
  return (
    <svg {...COMMON_PROPS} className={className}>
      <path d="M8 1.5 9.1 6 13.5 8 9.1 10 8 14.5 6.9 10 2.5 8 6.9 6Z" />
    </svg>
  );
}

/** A clock face: had a real relationship to upstream once, in the past - not a current one. */
export function HistoryIcon({ className }: ProvenanceGlyphProps): ReactNode {
  return (
    <svg {...COMMON_PROPS} className={className}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}
