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
    render(<FlowSkillAccordionList item={ITEM} />);
    expect(screen.getByText('/grilling')).toBeInTheDocument();
    expect(screen.getByText('/to-spec')).toBeInTheDocument();
  });

  it("gives each accordion its skill's description and a link to its own doc page (the expand/collapse transition itself is giselle-mui Accordion's own tested concern, not re-tested here)", () => {
    const { container } = render(<FlowSkillAccordionList item={ITEM} />);
    expect(screen.getByText('Grill a plan or decision relentlessly.')).toBeInTheDocument();
    expect(container.querySelector('a[href="/thinking-tools/grilling"]')).toHaveTextContent(
      'Learn more'
    );
  });

  it('renders nothing when the item has no highlightCards', () => {
    const { container } = render(
      <FlowSkillAccordionList item={{ ...ITEM, highlightCards: undefined }} />
    );
    expect(container.querySelectorAll('[class*="accordion"]')).toHaveLength(0);
  });

  it('only expands one accordion at a time - opening a second closes the first', () => {
    render(<FlowSkillAccordionList item={ITEM} />);
    const grillingButton = screen.getByRole('button', { name: '/grilling' });
    const toSpecButton = screen.getByRole('button', { name: '/to-spec' });

    fireEvent.click(grillingButton);
    expect(grillingButton).toHaveAttribute('aria-expanded', 'true');
    expect(toSpecButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toSpecButton);
    expect(grillingButton).toHaveAttribute('aria-expanded', 'false');
    expect(toSpecButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders a multi-paragraph description as separate paragraphs, each through InlineMarkdown', () => {
    const item: FeatureFlowItem = {
      ...ITEM,
      highlightCards: [
        {
          title: 'grilling',
          description: 'First **bold** paragraph.\n\nSecond paragraph with `code`.',
          href: '/thinking-tools/grilling',
        },
      ],
    };
    render(<FlowSkillAccordionList item={item} />);

    expect(screen.getByText('bold', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('code', { selector: 'code' })).toBeInTheDocument();
  });
});
