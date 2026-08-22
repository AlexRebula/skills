import type { ProvenanceEntry, ProvenanceMap } from './provenance.types';

/**
 * Shared between ProvenanceBadge and WhatsDifferentButton (two independent,
 * independently-placed components that both need to look up the same
 * skill's entry), per the promotion rule: a helper used by a second module
 * moves to one shared file rather than being redeclared.
 */
export function getProvenanceEntry(slug: string, provenanceMap: ProvenanceMap): ProvenanceEntry | undefined {
  const key = slug.replace(/^\//, '').replace(/\/$/, '');
  return provenanceMap[key];
}
