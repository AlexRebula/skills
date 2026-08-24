import React, { type ReactNode } from 'react';
import defaultProvenance from '../../data/provenance.json';
import { getProvenanceEntry } from '../../data/provenance.utils';
import type { ProvenanceMap, ProvenanceStatus } from '../../data/provenance.types';
import type { UpstreamCreditProps } from './types';
import styles from './upstream-credit.module.css';

/**
 * Only these three statuses have real Matt Pocock lineage to credit.
 * "original" is deliberately absent: there's nothing of his to credit there.
 */
const WORDING: Partial<Record<ProvenanceStatus, string>> = {
  upstream: 'Originally written by Matt Pocock',
  inherited: 'Originally written by Matt Pocock',
  modified: "Based on Matt Pocock's original, modified here",
};

/**
 * A minimal, doc-page-only credit line for any skill with real upstream
 * lineage, linking to the exact upstream source (generate-provenance.ts's
 * upstreamUrl, already computed but otherwise unused in the UI). Deliberately
 * not shown on the landing page: with 78 skills listed there, a repeated
 * disclaimer per row would work against "inobtrusive", and the existing
 * status label already signals lineage at that dense a view.
 */
export function UpstreamCredit({ slug, provenanceMap = defaultProvenance as ProvenanceMap }: UpstreamCreditProps): ReactNode {
  const entry = getProvenanceEntry(slug, provenanceMap);
  if (!entry) return null;

  const wording = WORDING[entry.status];
  if (!wording || !entry.upstreamUrl) return null;

  return (
    <p className={styles.credit}>
      <a href={entry.upstreamUrl} target="_blank" rel="noreferrer">
        {wording}
      </a>
    </p>
  );
}
