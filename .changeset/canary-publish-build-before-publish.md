---
"alexrebula-skills": patch
---

`canary-publish` now builds the package right before versioning, as its own step, and checks the build before publishing. `changeset publish` packs whatever build output is already on disk and never builds, so skipping the quality gate (which may build as a side effect) could ship a stale `dist/` under a new version. The skill checks that names added by the merged work appear in the built type declarations before publishing. After publishing, it downloads the registry tarball and repeats the check. The config gains a `buildCommand` field, read from the package's `build` script when there is one. The completion check notes that a scoped package on a private registry needs its scope mapping for `npm view` and `npm pack`.
