import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { checkFlowStagesCoverage, formatReport, listRealSkills } from './check-flow-stages';
import { FLOW_STAGES, ROUTER_SKILL } from '../site/sidebars';

describe('FLOW_STAGES data integrity (issue #155)', () => {
  it('exhaustively and non-redundantly covers every real skill docs page', () => {
    const docsRoot = join(__dirname, '..', 'docs');
    const report = checkFlowStagesCoverage(docsRoot, FLOW_STAGES, ROUTER_SKILL);

    expect(report.duplicates, 'no skill should appear in more than one stage').toEqual([]);
    expect(report.stale, 'no stage entry should point at a nonexistent docs page').toEqual([]);
    expect(
      report.missing,
      'every real skill must be in some stage, or be the documented router exception',
    ).toEqual([]);
  });

  it("FLOW_STAGES's total count plus the router skill matches the site's real skill count exactly", () => {
    const docsRoot = join(__dirname, '..', 'docs');
    const report = checkFlowStagesCoverage(docsRoot, FLOW_STAGES, ROUTER_SKILL);
    const flowStagesCount = report.realSkills.length - report.missing.length - 1; // -1 for router

    expect(report.realSkills.length).toBeGreaterThan(0);
    expect(flowStagesCount + 1).toBe(report.realSkills.length);
  });
});

describe('checkFlowStagesCoverage (unit, fixture-based)', () => {
  let docsRoot: string;

  beforeEach(() => {
    docsRoot = mkdtempSync(join(tmpdir(), 'flow-stages-fixture-'));
    mkdirSync(join(docsRoot, 'engineering'));
    mkdirSync(join(docsRoot, 'wiki'));
    writeFileSync(join(docsRoot, 'engineering', 'tdd.md'), '# tdd');
    writeFileSync(join(docsRoot, 'engineering', 'ask-matt.md'), '# ask-matt');
    writeFileSync(join(docsRoot, 'wiki', 'ingest.md'), '# ingest');
  });

  afterEach(() => {
    rmSync(docsRoot, { recursive: true, force: true });
  });

  it('lists every real skill across categories', () => {
    expect(listRealSkills(docsRoot)).toEqual(['engineering/ask-matt', 'engineering/tdd', 'wiki/ingest']);
  });

  it('reports zero duplicates/stale/missing when the fixture is exactly covered', () => {
    const flowStages = [
      { type: 'category', label: 'Build it', items: [{ type: 'doc', id: 'engineering/tdd' }] },
      { type: 'category', label: 'Run the wiki', items: [{ type: 'doc', id: 'wiki/ingest' }] },
    ];
    const report = checkFlowStagesCoverage(docsRoot, flowStages, {
      category: 'engineering',
      name: 'ask-matt',
    });

    expect(report.duplicates).toEqual([]);
    expect(report.stale).toEqual([]);
    expect(report.missing).toEqual([]);
  });

  it('flags a skill listed in two stages as a duplicate', () => {
    const flowStages = [
      { type: 'category', label: 'A', items: [{ type: 'doc', id: 'engineering/tdd' }] },
      { type: 'category', label: 'B', items: [{ type: 'doc', id: 'engineering/tdd' }] },
      { type: 'category', label: 'C', items: [{ type: 'doc', id: 'wiki/ingest' }] },
    ];
    const report = checkFlowStagesCoverage(docsRoot, flowStages, {
      category: 'engineering',
      name: 'ask-matt',
    });

    expect(report.duplicates).toEqual(['engineering/tdd']);
  });

  it('flags a stage entry with no matching docs page as stale', () => {
    const flowStages = [
      {
        type: 'category',
        label: 'A',
        items: [
          { type: 'doc', id: 'engineering/tdd' },
          { type: 'doc', id: 'engineering/deleted-skill' },
        ],
      },
      { type: 'category', label: 'B', items: [{ type: 'doc', id: 'wiki/ingest' }] },
    ];
    const report = checkFlowStagesCoverage(docsRoot, flowStages, {
      category: 'engineering',
      name: 'ask-matt',
    });

    expect(report.stale).toEqual(['engineering/deleted-skill']);
  });

  it('flags a real skill covered by no stage and not the router as missing', () => {
    const flowStages = [{ type: 'category', label: 'A', items: [{ type: 'doc', id: 'engineering/tdd' }] }];
    const report = checkFlowStagesCoverage(docsRoot, flowStages, {
      category: 'engineering',
      name: 'ask-matt',
    });

    expect(report.missing).toEqual(['wiki/ingest']);
  });

  it('formatReport summarises a clean report in one line', () => {
    const report = checkFlowStagesCoverage(
      docsRoot,
      [
        { type: 'category', label: 'A', items: [{ type: 'doc', id: 'engineering/tdd' }] },
        { type: 'category', label: 'B', items: [{ type: 'doc', id: 'wiki/ingest' }] },
      ],
      { category: 'engineering', name: 'ask-matt' },
    );

    expect(formatReport(report)).toBe('FLOW_STAGES exhaustively and non-redundantly covers all 3 skill(s).');
  });

  it('formatReport lists every offending category when the report is dirty', () => {
    const report = checkFlowStagesCoverage(
      docsRoot,
      [{ type: 'category', label: 'A', items: [{ type: 'doc', id: 'engineering/tdd' }] }],
      { category: 'engineering', name: 'ask-matt' },
    );

    const output = formatReport(report);
    expect(output).toContain('Real docs page missing from every stage');
    expect(output).toContain('wiki/ingest');
  });
});
