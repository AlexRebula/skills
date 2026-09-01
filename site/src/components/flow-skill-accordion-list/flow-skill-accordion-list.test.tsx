import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FlowSkillAccordionList } from './flow-skill-accordion-list';
import type { FeatureFlowItem } from '@littlebranches/giselle-mui';
import type { ProvenanceMap } from '../../data/provenance.types';

const ITEM: FeatureFlowItem = {
  id: 'shape-it',
  icon: 'solar:compass-bold-duotone',
  title: 'Shape it',
  description: 'Stress-test the idea and pin down the spec before code gets written.',
  highlightCards: [
    {
      title: 'grilling',
      description: 'Grill a plan or decision relentlessly.',
      href: '/thinking-tools/grilling',
    },
    {
      title: 'to-spec',
      description: 'Turn a rough idea into a written spec.',
      href: '/engineering/to-spec',
    },
  ],
};

const PROVENANCE_FIXTURE: ProvenanceMap = {
  'thinking-tools/grilling': { status: 'upstream' },
  'engineering/to-spec': { status: 'original' },
};

describe('FlowSkillAccordionList', () => {
  it('renders one accordion per highlight card, titled with a leading "/"', () => {
    render(<FlowSkillAccordionList item={ITEM} skillSummaries={{}} />);
    expect(screen.getByText('/grilling')).toBeInTheDocument();
    expect(screen.getByText('/to-spec')).toBeInTheDocument();
  });

  it("falls back to the skill's own short description and links to its doc page when it has no doc-page summary (the expand/collapse transition itself is giselle-mui Accordion's own tested concern, not re-tested here)", () => {
    const { container } = render(<FlowSkillAccordionList item={ITEM} skillSummaries={{}} />);
    expect(screen.getByText('Grill a plan or decision relentlessly.')).toBeInTheDocument();
    expect(container.querySelector('a[href="/thinking-tools/grilling"]')).toHaveTextContent(
      'Learn more'
    );
  });

  it('renders nothing when the item has no highlightCards', () => {
    const { container } = render(
      <FlowSkillAccordionList item={{ ...ITEM, highlightCards: undefined }} skillSummaries={{}} />
    );
    expect(container.querySelectorAll('[class*="accordion"]')).toHaveLength(0);
  });

  it('only expands one accordion at a time - opening a second closes the first', () => {
    render(<FlowSkillAccordionList item={ITEM} skillSummaries={{}} />);
    const grillingButton = screen.getByRole('button', { name: '/grilling' });
    const toSpecButton = screen.getByRole('button', { name: '/to-spec' });

    fireEvent.click(grillingButton);
    expect(grillingButton).toHaveAttribute('aria-expanded', 'true');
    expect(toSpecButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toSpecButton);
    expect(grillingButton).toHaveAttribute('aria-expanded', 'false');
    expect(toSpecButton).toHaveAttribute('aria-expanded', 'true');
  });

  it("uses the skill's own doc-page summary as separate paragraphs, each through InlineMarkdown, when one is provided", () => {
    const item: FeatureFlowItem = {
      ...ITEM,
      highlightCards: [
        {
          title: 'grilling',
          description: 'Grill a plan or decision relentlessly.',
          href: '/thinking-tools/grilling',
        },
      ],
    };
    const skillSummaries = {
      'thinking-tools/grilling': ['First **bold** paragraph.', 'Second paragraph with `code`.'],
    };
    render(<FlowSkillAccordionList item={item} skillSummaries={skillSummaries} />);

    expect(screen.getByText('bold', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('code', { selector: 'code' })).toBeInTheDocument();
    // the short description never renders once a doc-page summary exists
    expect(screen.queryByText('Grill a plan or decision relentlessly.')).not.toBeInTheDocument();
  });

  it("renders each card's provenance badge already, before it's expanded", () => {
    render(<FlowSkillAccordionList item={ITEM} skillSummaries={{}} provenanceMap={PROVENANCE_FIXTURE} />);
    expect(screen.getByRole('button', { name: 'Originally written by Matt Pocock' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AlexRebula original' })).toBeInTheDocument();
  });

  it('clicking a provenance badge does not also toggle the accordion it sits in', () => {
    render(<FlowSkillAccordionList item={ITEM} skillSummaries={{}} provenanceMap={PROVENANCE_FIXTURE} />);
    const badge = screen.getByRole('button', { name: 'Originally written by Matt Pocock' });
    const toggle = screen.getByRole('button', { name: '/grilling' });

    fireEvent.click(badge);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('never nests the provenance badge inside the accordion toggle button (invalid HTML, hydration error)', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<FlowSkillAccordionList item={ITEM} skillSummaries={{}} provenanceMap={PROVENANCE_FIXTURE} />);

    const badge = screen.getByRole('button', { name: 'Originally written by Matt Pocock' });
    const toggle = screen.getByRole('button', { name: '/grilling' });
    expect(toggle).not.toContainElement(badge);
    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining('cannot be a descendant'));

    errorSpy.mockRestore();
  });
});
