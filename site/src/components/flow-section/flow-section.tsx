import React, { type ReactNode } from 'react';
import { FeatureFlowSection } from '@littlebranches/giselle-mui';
import { FlowStageHoverPanel } from '../flow-stage-hover-panel';
import { FlowSkillAccordionList } from '../flow-skill-accordion-list';
import { FLOW_SECTION_TITLE } from '../../data/index-page-copy';
import {
  FLOW_COLUMN_SPACING,
  FLOW_DESCRIPTION_GRID_SIZE,
  FLOW_DETAIL_PANEL_COLOR,
  FLOW_IMAGE_GRID_SIZE,
} from './flow-section.const';
import type { FlowSectionProps } from './types';

/**
 * "The Flow" landing-page section: every flow stage as a `FeatureFlowSection`
 * row, with `FlowStageHoverPanel` standing in for the default image column
 * (`renderRightPanel`) and `FlowSkillAccordionList` standing in for the
 * default highlight carousel (`renderHighlightPanel`) once a stage is
 * expanded — see those two components' own doc comments for why.
 *
 * IMPORTANT: `FeatureFlowSection` already renders its own full-width
 * `SectionContainer` and its own internal heading (via giselle-mui's
 * `SectionTitle`, used internally by its description column) - this is
 * deliberately NOT wrapped in an extra outer `SectionContainer`/`SectionTitle`
 * here. Wrapping it again would double-nest containers and produce two
 * headings; this is a confirmed exception to how every other homepage
 * section is composed.
 */
export function FlowSection({ items, imageSrc }: FlowSectionProps): ReactNode {
  return (
    <FeatureFlowSection
      title={FLOW_SECTION_TITLE}
      items={items}
      image={{ src: imageSrc, alt: '' }}
      renderRightPanel={(activeItem, isActiveExpanded) => (
        <FlowStageHoverPanel item={activeItem} isExpanded={isActiveExpanded} />
      )}
      renderHighlightPanel={(item) => <FlowSkillAccordionList item={item} />}
      descriptionGridSize={FLOW_DESCRIPTION_GRID_SIZE}
      imageGridSize={FLOW_IMAGE_GRID_SIZE}
      columnSpacing={FLOW_COLUMN_SPACING}
      detailPanelColor={FLOW_DETAIL_PANEL_COLOR}
    />
  );
}
