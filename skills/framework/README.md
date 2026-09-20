# Framework

Framework-specific component-authoring skills, at different stages of a component's life: scaffolding a new one from scratch (`create-*`), restructuring an existing one (`migrate-react-subcomponent`), or diagnosing and fixing debt on any existing one (`cleanup-component`). See `skills/org/` for the LittleBranches-specific counterparts to the `create`/`migrate` pair.

- **[cleanup-component](./cleanup-component/SKILL.md)**: Diagnose and fix a component's structural debt (OSS §5/§6) and naming/decomposition debt (naming-conventions.md, component-refactor-conventions.md) independently, applying only the fixes it actually needs; never assumes either axis applies.
- **[create-angular-component](./create-angular-component/SKILL.md)**: Scaffold and TDD a new Angular 17+ standalone component. Uses signal-based inputs/outputs and Angular Testing Library.
- **[create-react-component](./create-react-component/SKILL.md)**: Scaffold and TDD a new React component from scratch. Framework-agnostic scaffold rules: types first, it.todo stubs, README, roadmap, then a strict red-green-refactor TDD loop.
- **[create-vue-component](./create-vue-component/SKILL.md)**: Scaffold and TDD a new Vue 3 single-file component. Uses Composition API with `<script setup>`, defineProps with TypeScript generics, and @testing-library/vue.
- **[migrate-react-subcomponent](./migrate-react-subcomponent/SKILL.md)**: Migrate an existing, already-implemented flat sub-component into its own subfolder — a mechanical move of working code, not a scaffold-from-scratch rebuild.
- **[port-mui-theme-override](./port-mui-theme-override/SKILL.md)**: Independently re-author a draft MUI theme override into a clean, spec-compliant one that copies no literal source values, using a three-source method (functional target, official MUI docs, live computed-style verification).
