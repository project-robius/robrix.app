# Repeatable release update implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the site to beta.3 and make future release updates a short, verified workflow.

**Architecture:** Save GitHub release metadata in src/data/release.json and derive the version, release links, date, and download sizes from it in src/data/site.ts. A small Node command fetches an explicitly named release through gh; missing advertised assets fail the site build. Feature and roadmap copy remains an editorial review against the tagged README and release notes.

**Tech Stack:** Astro, TypeScript, Node built-ins, GitHub CLI.

### Task 1: Repeatable metadata update

- Add scripts/update-release.mjs and focused Node tests for input validation and snapshot generation.
- Add npm run release:update -- <tag> and a read-only --check mode.
- Fetch the exact release once and save tag, publication date, URL, and asset names, bytes, URLs.
- Reject drafts, wrong tags, missing publication dates, and incomplete asset uploads before writing.

### Task 2: Shared release facts and current copy

- Modify src/data/site.ts to derive RELEASE and LINKS.latestRelease from the snapshot.
- Resolve advertised downloads against published assets; derive decimal MB sizes.
- Add navigation history and in-app links; update images, formatting, and swipe gesture descriptions.
- Keep roadmap items scoped to unfinished work in the tagged README.

### Task 3: Documentation and verification

- Save docs/release-updates.md with commands, sources, pitfalls, and checks; link it from README.md.
- Run focused tests, npm run check, and npm run build.
- Inspect every generated HTML page for the current version and stale download URLs, and compare download URLs with the published asset list.
- Run the updater again to confirm idempotence and --check to compare against GitHub without writing.
