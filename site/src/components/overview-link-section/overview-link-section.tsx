import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { SectionContainer } from '@littlebranches/giselle-mui';
import {
  OVERVIEW_LINK_PREFIX,
  OVERVIEW_LINK_TEXT,
  OVERVIEW_LINK_DESCRIPTION,
  OVERVIEW_LINK_HREF,
} from '../../data/index-page-copy';
import styles from './overview-link-section.module.css';

/**
 * Closing footnote after "The Flow" section, pointing to the /overview page
 * for the full detail. Deliberately has no heading/SectionTitle - it reads
 * as a footnote, not a titled section.
 */
export function OverviewLinkSection(): ReactNode {
  return (
    <SectionContainer>
      <p className={styles.link}>
        {OVERVIEW_LINK_PREFIX} <Link to={OVERVIEW_LINK_HREF}>{OVERVIEW_LINK_TEXT}</Link>{' '}
        {OVERVIEW_LINK_DESCRIPTION}
      </p>
    </SectionContainer>
  );
}
