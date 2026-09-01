/**
 * Skills renamed since forking from upstream (mattpocock/skills), keyed by
 * their current local name, valued by the single name they were renamed
 * from. generate-provenance.ts matches a skill to its upstream lineage by
 * folder name alone, which otherwise breaks silently the moment a name
 * changes: see AlexRebula/skills#194.
 */
export const SKILL_RENAMES: Record<string, string> = {
  'ask-alex': 'ask-matt',
  'setup-engineering-skills': 'setup-matt-pocock-skills',
};
