# Updating the website for a Robrix release

Use this workflow each time a release ships. Fetch metadata once, review the
actual changes, and verify the generated pages. The site stays pinned to an
explicit release so builds work offline and do not silently switch versions.

## Fast path

Run from the repository root with Node 22.23.4+ and dependencies installed, plus a
working GitHub CLI (`gh auth status`). Replace the example tag with the requested
release, including its leading `v`.

```sh
npm run release:update -- v1.0.0-beta.4
gh release view v1.0.0-beta.4 --repo project-robius/robrix
```

Review the release notes and the **README at that tag**, then adjust feature and
roadmap copy in `src/data/site.ts`. The tagged README is at:
`https://github.com/project-robius/robrix/blob/v1.0.0-beta.4/README.md`.

```sh
npm test
npm run check
npm run build
npm run release:verify
npm run release:update -- v1.0.0-beta.4 --check
git diff --check
git status --short
git diff
```

The final `--check` fetches metadata again and compares it with the saved snapshot
without writing. It catches assets replaced or added while you were editing.
Re-running the update for an unchanged release produces identical content.
Review new files as well as tracked diffs before committing.

## What updates automatically

- `scripts/update-release.mjs` queries the exact GitHub release with `gh api` and
  saves a sorted snapshot in `src/data/release.json`: tag, UTC publication time,
  release URL, asset filenames, sizes in bytes, and download URLs. Drafts, empty
  releases, invalid metadata, and unfinished uploads fail before writing.
- `src/data/site.ts` derives `RELEASE.version`, tag, date, date label, base URL,
  and `LINKS.latestRelease` from the snapshot. Do not edit those values separately.
- `PLATFORMS` resolves its filename templates against the snapshot. Every
  advertised file must exist or the build fails. Sizes use decimal MB
  (`bytes / 1_000_000`, one decimal place), matching the label.
- The homepage version, download heading and SEO/social descriptions, shared
  footer on every page, release-notes link, and download CTAs use shared data.
- `npm run release:verify` checks every built HTML page's footer, release-note
  links, direct download links, and displayed sizes. It lists unadvertised assets
  so new platforms or formats receive editorial review.

No application binaries need to be downloaded. One API response provides the
complete filename/size inventory; avoid checking each large binary individually.

## What needs an editorial check

1. Read the highlights and installation notes on the exact release page.
   Compare against the previous release; summarize user-visible changes in
   `FEATURES` and, when relevant, `SIGNATURE`, platform notes, and install steps.
   Replace `HIGHLIGHTS` (the "Highlights from this release" block on the download
   page) with a short summary of the new release's own highlights; it is not
   cumulative.
2. Compare `ROADMAP` with the tagged README's unchecked feature tracker, preserving
   priority order. Check release notes when the tracker lags. Remove only the
   shipped part of an item: animated GIFs shipped in beta.3, while audio/video
   messages remain unfinished.
3. Compare the full asset inventory with `PLATFORMS`. Update filename templates,
   architectures, distro versions, or download columns if packaging changes.
   Missing assets must be resolved explicitly; never substitute an older binary.
4. Confirm iOS distribution instructions and `LINKS.testflight` against the
   release notes. An uploaded IPA does not by itself replace the TestFlight link.
5. Search for literals outside the shared data. Use `rg` against the **previous**
   tag/version in `src`, `public`, and `scripts`. Review hits instead of blindly
   replacing historical migration notes. Check `README.md` for outdated workflow
   instructions, and inspect generated pages with `release:verify`.
6. If presentation links, screenshots, support requirements, or metadata claims
   changed in the release, update the corresponding facts/assets. Existing
   historical talks and an older demo screenshot do not become newer by changing
   a version label. The preview-card artwork is version-neutral; regenerate it
   only when artwork or its text changes.

App features and website features are separate. For example, beta.4 adds manual
light/dark switching in the app, while automatic system-theme switching is still
planned. The website's existing System theme option does not imply the app has it.
Keep old release tags in historical records, migration notes, and test fixtures;
update current metadata and runnable documentation examples.

For a visual spot check, run `npm run dev` and inspect `/`, `/download`,
`/presentations`, `/privacy`, and `/404` (or preview `/404.html`). On download,
check all five platform cards, release notes, TestFlight, and the highlighted
platform on desktop and mobile. Keep the current design unless the task calls
for a redesign.

Deployment uses `.github/workflows/deploy.yml`: a push to `main` builds the site
and deploys it to GitHub Pages at `https://robrix.app`. After the normal review
and commit/push workflow, wait for that deployment to succeed and confirm the
live homepage and download page show the selected tag. Local verification does
not publish the website. Keep unrelated workspace changes out of the release
commit.

## Pitfalls and troubleshooting

- After updating Astro or other dependencies, check their Node requirements
  against `package.json` and `.github/workflows/deploy.yml`. Keep the workflow
  pinned to a supported patch version: `node-version: 22` selected cached
  22.23.3 in run 39767759900, which failed because Astro required 22.23.4.
  Validate with the exact CI Node version before committing dependency updates.
- Do not rely on GitHub's `/releases/latest` to choose what the site pins:
  prerelease filtering and the repository's release flags can make it point to an
  unintended release. Always pass the requested tag, and review a newer release
  before choosing it. The one deliberate use is `LINKS.latestRelease`, the
  "Release notes" links on the download page, which float so they never point at
  an old tag. Once a newer release ships they show its notes, while the version,
  downloads, sizes and `HIGHLIGHTS` stay pinned until the site is updated.
- Filename casing matters: macOS uses `Robrix_…`, Android uses `Robrix-…`, and
  most other assets use `robrix-…`. Arch omits the prerelease hyphen, e.g.
  `1.0.0-beta.3` becomes `1.0.0beta.3`.
- Use `published_at` in UTC rather than the local date or `created_at`. Beta.3
  was published October 12 UTC even though it was already October 13 in China.
- The updater needs network access; normal builds do not. In a sandbox, retry
  a network denial using the environment's approval mechanism. For auth/rate-limit
  problems, check `gh auth status`; do not work around failures with guessed data.
- `release:verify` inspects `dist`; rebuild after any content or metadata change.
  Its asset check establishes that URLs match GitHub's published inventory, not
  that an installer runs correctly. Existing historical version notes are valid.
- The current Astro config names an optional `src/icons` directory that does not
  exist. A build may warn about it; packaged Iconify icons still render. This is
  unrelated to release metadata.

## Beta.4 record

Verified release: [v1.0.0-beta.4](https://github.com/project-robius/robrix/releases/tag/v1.0.0-beta.4),
published `2026-10-21T10:30:22Z`. The existing updater handles all fifteen assets
with the same filename templates: twelve direct downloads, one IPA, and two AUR
tarballs. TestFlight and the five unfinished roadmap items are unchanged from
the tagged README. No new automation or filename changes were necessary.

Updated feature copy for instant, persistent light/dark theme switching,
Android folding/resizing/split-screen continuity, timeline position retention
on rotation and theme changes, and touch scrolling in dialogs. The iOS download
note records the iOS 27 text-input crash fix. Automatic app system-theme switching
is still planned. The expired conference announcement already hides itself after
the event; no new recording or schedule was supplied by this release.

## Beta.3 record

Verified release: [v1.0.0-beta.3](https://github.com/project-robius/robrix/releases/tag/v1.0.0-beta.3),
published `2026-10-12T22:45:50Z`. Fifteen assets: twelve advertised desktop/Android
downloads, one IPA, and two tarballs for community AUR packaging. iOS/iPadOS
continues through TestFlight, as directed by the release notes.

Updated navigation history, swipe back, in-app Matrix links, animated image and
sticker playback, image viewer controls, and message formatting. Removed GIFs
from the unfinished audio/video roadmap item. The snapshot and shared data make
the next version change mechanical; feature accuracy still requires reading the
new release.
