import { describe, expect, it } from 'vitest';
import { PERSONA_INFO, personasForCategories } from './personas';
import { PERSONAS } from './personas.types';
import { TARGET_CATEGORIES } from './categories';

describe('PERSONA_INFO', () => {
  it('has a label for every declared persona', () => {
    for (const persona of PERSONAS) {
      expect(PERSONA_INFO[persona].label).toBeTruthy();
    }
  });
});

describe('personasForCategories', () => {
  it('resolves every one of the 10 categories to its declared persona group', () => {
    expect(personasForCategories(['engineering'])).toEqual(['software-engineering']);
    expect(personasForCategories(['framework'])).toEqual(['software-engineering']);
    expect(personasForCategories(['git'])).toEqual(['software-engineering']);
    expect(personasForCategories(['mentoring'])).toEqual(['teaching-mentoring']);
    expect(personasForCategories(['daily-workflow'])).toEqual(['running-the-practice']);
    expect(personasForCategories(['org'])).toEqual(['running-the-practice']);
    expect(personasForCategories(['thinking-tools'])).toEqual(['running-the-practice']);
    expect(personasForCategories(['wiki'])).toEqual(['personal-knowledge-work']);
    expect(personasForCategories(['personal'])).toEqual(['personal-knowledge-work']);
  });

  it('covers all 10 TARGET_CATEGORIES with no gaps', () => {
    for (const category of TARGET_CATEGORIES) {
      // Every category resolves without throwing; misc resolves to [].
      expect(() => personasForCategories([category])).not.toThrow();
    }
  });

  it('resolves a misc-only skill to no persona', () => {
    expect(personasForCategories(['misc'])).toEqual([]);
  });

  it('unions personas across a skill with multiple categories', () => {
    // e.g. commit-wip: git (software-engineering) + daily-workflow (running-the-practice)
    expect(personasForCategories(['git', 'daily-workflow'])).toEqual([
      'software-engineering',
      'running-the-practice',
    ]);
  });

  it('deduplicates when two categories share the same persona', () => {
    expect(personasForCategories(['engineering', 'git'])).toEqual(['software-engineering']);
  });

  it('ignores an unrecognized category rather than throwing', () => {
    expect(personasForCategories(['not-a-real-category'])).toEqual([]);
  });

  it('returns an empty array for no categories', () => {
    expect(personasForCategories([])).toEqual([]);
  });
});
