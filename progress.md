# Release update progress

## Beta.4 — October 22, 2026

- Read saved release guide and existing scripts; working tree starts clean except for the pre-existing design document.
- Confirmed beta.4 is the newest published release; read its highlights and full asset inventory.
- Reusing the metadata updater and built-page verifier; no new automation needed.
- Reviewed the tagged README: roadmap unchanged. Updated feature copy and iOS note, plus current release examples in README and release guide. Kept historical records and fixed test fixtures unchanged.
- Existing updater refreshed all fifteen assets; all twelve advertised downloads resolve against the new snapshot with sizes derived from bytes.
- Verification passed: five tests, Astro check (zero errors/warnings/hints), build, all five generated page footers and twelve unique download links/sizes, and GitHub --check matching all fifteen assets. Existing optional src/icons warning remains unchanged.
- Reviewed diff and searched src/public for beta.3 references: none remain. Changes are local, uncommitted, and undeployed; pre-existing design document untouched.

## Beta.3 history

- Bootstrapped requested Superpowers instructions; read planning, brainstorming, and TDD skills.
- Inspected source and fetched beta.3 release data from the GitHub API.
- Existing workspace contains an untracked design document; leave it intact.
- Added explicit-tag metadata updater, saved release snapshot, and derived release facts/download sizes in shared site data.
- Updated beta.3 features and corrected GIF roadmap status. Clarified TestFlight distribution.
- Added built-page verifier and README-linked docs/release-updates.md with commands, review checklist, pitfalls, and deployment information.
- Five tests pass, covering release validation and stale links/wrong sizes. Type checking and build pass; generated output verifies all five pages and twelve downloads. Online --check matches all fifteen GitHub assets.
- Running final checks after the new verifier/tests and requested a read-only review using the requesting-code-review skill.
- Final checks passed: five tests; Astro check zero errors/warnings/hints; five-page build; twelve unique download URLs and sizes verified; git diff --check clean. No beta.2 references remain in src/public.
- Read-only review returned no findings. Existing optional icons-directory build warning is documented. Changes remain local, uncommitted, and undeployed.
