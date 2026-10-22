# Release update plan

## Beta.4 update — October 22, 2026

- [x] Identify latest published release and read saved workflow.
- [x] Review beta.4 release notes and asset inventory.
- [x] Fetch pinned metadata with the existing updater.
- [x] Review tagged README; update feature, platform, and stale current references.
- [x] Update reusable notes and examples for beta.4.
- [x] Run tests, type checking, build, generated-page verification, and GitHub metadata comparison.

Completed: five tests pass; Astro check reports zero errors/warnings/hints;
build succeeds; all five pages and twelve download links/sizes verify. No beta.3
references remain in src/public; test fixtures and historical notes are retained.

Preserve the pre-existing untracked design document. No deployment requested.

## Beta.3 update history

Goal: update every current release reference to beta.3 and make future updates fast and repeatable.

- [x] Inspect site structure and verify beta.3 metadata and asset inventory.
- [x] Centralize fetched release metadata and add a repeatable update command.
- [x] Update beta.3 feature copy and reconcile the roadmap against the tagged README.
- [x] Save a release maintenance guide and link it from README.
- [x] Complete final verification and read-only review.

Completed: five tests pass; Astro check reports zero errors/warnings/hints;
build succeeds; all five generated pages and twelve downloads verify;
GitHub --check matches fifteen assets; read-only review returned no findings.
The source update is local and has not been committed or deployed.

Preserve the pre-existing untracked docs/plans/2026-09-20-welcoming-matrix-design.md.

Errors: GitHub web fetch returned a cache miss; GitHub API works. Tagged README fetch hit a sandbox network error; retry with escalation.

Updater initially hit the same sandbox network restriction; approved npm run release:update now fetches metadata successfully. Expected red-phase tests failed before their implementations were added, then passed.
