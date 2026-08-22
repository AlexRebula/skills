import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';

// ----------------------------------------------------------------------
// Mirrors the plugin set in rm/presentation/alexrebula/eslint.config.mjs,
// plus two additions that repo's config doesn't have: jsx-a11y (static
// accessibility checks: the exact class of bug that shipped here once
// already, a missing aria-live) and sonarjs (SonarSource's own JS/TS rule
// engine, run locally, the closest available equivalent to a SonarQube
// server scan without provisioning a SonarCloud/SonarQube account+token).
// ----------------------------------------------------------------------

export default [
  { ignores: ['build/**', '.docusaurus/**', 'node_modules/**'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: 'detect' } },
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  reactPlugin.configs.flat.recommended,
  jsxA11yPlugin.flatConfigs.recommended,
  sonarjsPlugin.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      // Disabled for the same reason rm/presentation/alexrebula disables them:
      // these are React Compiler-oriented heuristics that flag long-standing,
      // correct patterns (e.g. resetting a shared regex's lastIndex) as errors.
      'react-hooks/refs': 0,
      'react-hooks/immutability': 0,
      'react-hooks/set-state-in-effect': 0,
      'react-hooks/incompatible-library': 0,
      'react-hooks/preserve-manual-memoization': 0,
      ...importPlugin.configs.recommended.rules,
      'import/no-unresolved': 0, // TS + Docusaurus's own module aliases (@theme, @docusaurus/*) confuse this resolver
      'import/no-named-as-default': 0, // same false-positive on `import clsx from 'clsx'` rm/presentation/alexrebula disables
      'import/newline-after-import': 2,
      'react/react-in-jsx-scope': 0, // new JSX transform
      'react/prop-types': 0, // TypeScript covers this
      'react/self-closing-comp': 2,
      'react/jsx-boolean-value': 2,
      '@typescript-eslint/no-explicit-any': 2,
      '@typescript-eslint/consistent-type-imports': 1,
      '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      // MUI Store / oss-quality-standards quality bar: ban React.FC here too,
      // even though this isn't a component library, for consistency.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'TSTypeReference[typeName.name="FC"], TSTypeReference > TSQualifiedName[right.name="FC"], TSTypeReference[typeName.name="FunctionComponent"], TSTypeReference > TSQualifiedName[right.name="FunctionComponent"]',
          message: 'Use plain function declarations instead of React.FC / React.FunctionComponent.',
        },
      ],
    },
  },
  // Test files: relax a few rules that fight normal testing patterns.
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'sonarjs/no-duplicate-string': 0,
    },
  },
  eslintConfigPrettier,
];
