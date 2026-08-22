import React, { type ReactNode } from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ProvenanceButton } from '@site/src/components/provenance-button';
import styles from './styles.module.css';

type Props = WrapperProps<typeof ContentType>;

// Injects the same provenance button used on the landing page above every
// skill doc page's content too, so the treatment is consistent wherever a
// skill is shown: the mapping lives in generate-provenance.ts's build-time
// output, not in the 77 source markdown files.
export default function ContentWrapper(props: Props): ReactNode {
  const { metadata } = useDoc();

  return (
    <>
      <div className={styles.badgeWrapper}>
        <ProvenanceButton slug={metadata.permalink} />
      </div>
      <Content {...props} />
    </>
  );
}
