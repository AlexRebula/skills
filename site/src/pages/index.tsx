import React, { useMemo, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { HomeHeroSection } from '../components/home-hero-section';
import { LandingStatsSection } from '../components/landing-stats-section';
import { PersonaPickerSection } from '../components/persona-picker-section';
import { FlowSection } from '../components/flow-section';
import { OverviewLinkSection } from '../components/overview-link-section';
import { computeLandingStats } from '../data/landing-stats';
import { buildFlowSections, filterFlowSections } from '../data/flow-sections';
import { buildFeatureFlowItems } from '../data/feature-flow-sections';
import skillsData from '../data/skills-landing.json';
import provenanceData from '../data/provenance.json';
import type { ProvenanceMap } from '../data/provenance.types';
import type { SkillsLandingData } from '../data/skills-landing.types';
import type { PersonaKey } from '../data/personas.types';
import { FLOW_STAGES } from '../../sidebars';

const provenanceMap = provenanceData as ProvenanceMap;
const landingData = skillsData as SkillsLandingData;

export default function Home(): ReactNode {
  const { categories } = landingData;
  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);
  const landingStats = computeLandingStats({
    totalSkills,
    totalCategories: categories.length,
    provenanceMap,
  });
  const flowSections = buildFlowSections(FLOW_STAGES, landingData, provenanceMap);

  // Persona filter state (issue #176): local component state only, resets
  // on refresh per this ticket's acceptance criteria - no localStorage/URL
  // param persistence in scope here.
  const [activePersonas, setActivePersonas] = useState<ReadonlySet<PersonaKey>>(new Set());
  const togglePersona = (persona: PersonaKey) => {
    setActivePersonas((prev) => {
      const next = new Set(prev);
      if (next.has(persona)) {
        next.delete(persona);
      } else {
        next.add(persona);
      }
      return next;
    });
  };
  const filteredFlowSections = useMemo(
    () => filterFlowSections(flowSections, activePersonas),
    [flowSections, activePersonas]
  );
  // A plain dark backdrop for every highlight-card slide - see
  // feature-flow-sections.ts's toHighlightCard doc comment for why this is
  // needed regardless of the giselle-mui scrim bug filed upstream.
  const skillCardMediaSrc = useBaseUrl('/img/flow-skill-card-backdrop.svg');
  const featureFlowItems = useMemo(
    () => buildFeatureFlowItems(filteredFlowSections, skillCardMediaSrc),
    [filteredFlowSections, skillCardMediaSrc]
  );
  // FeatureFlowSectionProps.image is required even with renderRightPanel
  // supplying the visible content (giselle-mui#188's known limitation: the
  // internal image-preload/prewarm hooks aren't undefined-safe yet) - this
  // placeholder is never rendered, just needs to resolve.
  const featureFlowImageSrc = useBaseUrl('/img/shape-square.svg');

  return (
    <Layout
      title="Skills"
      description="A practical skill system for engineers who want to use AI without giving up their standards. Install the ones you use, then type a slash command."
    >
      <div>
        <HomeHeroSection totalSkills={totalSkills} categoriesCount={categories.length} />

        <LandingStatsSection items={landingStats} />

        <PersonaPickerSection activePersonas={activePersonas} onTogglePersona={togglePersona} />

        <FlowSection items={featureFlowItems} imageSrc={featureFlowImageSrc} />

        <OverviewLinkSection />
      </div>
    </Layout>
  );
}
