import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { SectionContainer, SectionTitle } from '@littlebranches/giselle-mui';
import {
  HARNESS_COMPARISON_CAPTION,
  HARNESS_COMPARISON_TITLE,
  HARNESS_COMPARISON_BODY,
  HARNESS_COMPARISON_LINK_TEXT,
  HARNESS_COMPARISON_LINK_HREF,
} from '../../data/index-page-copy';
import { HARNESS_COMPARISON_TITLE_SX } from './harness-comparison-section.const';
import styles from './harness-comparison-section.module.css';

/**
 * Short teaser between `LandingStatsSection` ("This fork, at a glance") and
 * `PersonaPickerSection` ("Flows tailored to you"), pointing to the full
 * skills/flows/harness positioning page rather than reproducing its
 * comparison table here — a dense table fits the docs page, not this
 * card-driven landing page. Matches `LandingStatsSection`'s own
 * `SectionContainer` + `SectionTitle` shape.
 */
export function HarnessComparisonSection(): ReactNode {
  return (
    <SectionContainer maxWidth="lg">
      <SectionTitle
        caption={HARNESS_COMPARISON_CAPTION}
        title={HARNESS_COMPARISON_TITLE}
        sx={HARNESS_COMPARISON_TITLE_SX}
      />
      <p className={styles.body}>
        {HARNESS_COMPARISON_BODY}{' '}
        <Link to={HARNESS_COMPARISON_LINK_HREF}>{HARNESS_COMPARISON_LINK_TEXT}</Link>.
      </p>
    </SectionContainer>
  );
}
