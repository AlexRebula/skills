import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';

// ----------------------------------------------------------------------
// Scoped to generate-provenance.ts (this session's own new script), not
// all of scripts/: turning this on repo-wide surfaced pre-existing lint
// debt in unrelated legacy scripts (collapse-sessions.ts, sync-plugin-
// version.mjs) that predates this work and hasn't been reviewed here.
// Widening this file's `files` glob to scripts/**/*.ts is the natural
// next step, but should be its own deliberate pass, not a side effect of
// this one. The Docusaurus app itself (site/) has its own eslint.config.mjs.
// ----------------------------------------------------------------------

export default [
  {
    files: [
      'scripts/generate-provenance.ts',
      'scripts/generate-provenance.test.ts',
      'scripts/generate-skill-icons.ts',
    ],
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  sonarjsPlugin.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 2,
      '@typescript-eslint/consistent-type-imports': 1,
      '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      // Shelling out to `git` by name (PATH lookup) is the standard, expected
      // pattern for a dev/CI build script: not attacker-reachable input.
      'sonarjs/no-os-command-from-path': 0,
    },
  },
  {
    files: ['scripts/generate-provenance.test.ts'],
    rules: { 'sonarjs/no-duplicate-string': 0 },
  },
  eslintConfigPrettier,
];
