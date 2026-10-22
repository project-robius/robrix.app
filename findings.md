# Release update findings

## Beta.4 — October 22, 2026

- Latest release is v1.0.0-beta.4, published 2026-10-21T10:30:22Z.
- Fifteen assets retain the same filenames/templates and supported platforms as beta.3; TestFlight remains the recommended iOS distribution.
- Highlights: persistent dark/light app themes with instant switching in Settings → Appearance; Android folding/split-screen/configuration changes preserve context; phone rotation and theme switches preserve timeline position; improved modal layout/touch scrolling; iOS 27 text-input crash fix.
- Release source: https://github.com/project-robius/robrix/releases/tag/v1.0.0-beta.4
- Automatic system-theme switching is still coming soon; do not confuse the app's theme support with the website's existing System option.
- GitHub web cache missed; API release fetch succeeded. Tagged README fetch requires network escalation after sandbox failure.
- Tagged beta.4 README confirms the same five unfinished roadmap items; no packaging or TestFlight changes. Historical privacy-policy date and migration versions should remain intact.
- The past conference announcement already hides after its end date. This release supplies no new talk recording; avoid inventing replacement presentation links.
- Reusing the saved command needed no script changes. Build verifier confirms beta.4 on all five page footers and twelve downloads; metadata comparison matches all fifteen live GitHub assets.

## Beta.3 history

- All current release references are in src/data/site.ts; pages and shared footer import it.
- RELEASE duplicates version/tag/base; LINKS.latestRelease is independently hardcoded. File sizes are manually maintained.
- GitHub API confirms v1.0.0-beta.3 was published 2026-10-12T22:45:50Z with 15 assets. The site advertises 12 direct binaries and TestFlight; IPA and two tarballs are ancillary assets.
- Highlights: navigation history, swipe back, animated timeline images/stickers, in-app Matrix links, image viewer redesign, tighter message formatting.
- Release source: https://github.com/project-robius/robrix/releases/tag/v1.0.0-beta.3
- Tagged README confirms animated images/GIFs are complete; audio/video remain pending. Other roadmap rows retain their order.
- Build/type check pass. Generated pages have 12 correct published downloads; IPA and two AUR tarballs remain ancillary. Release notes continue to recommend TestFlight.
- Existing optional src/icons path produces an Astro warning; packaged icons build correctly.
- GitHub Pages deployment is triggered by a push to main; these local changes have not been deployed.
