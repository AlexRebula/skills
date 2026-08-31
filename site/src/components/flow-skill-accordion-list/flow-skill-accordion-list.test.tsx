import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FlowSkillAccordionList } from './flow-skill-accordion-list';
import type { FeatureFlowItem } from '@littlebranches/giselle-mui';

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
});
