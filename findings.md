# Release update findings

- All current release references are in src/data/site.ts; pages and shared footer import it.
- RELEASE duplicates version/tag/base; LINKS.latestRelease is independently hardcoded. File sizes are manually maintained.
- GitHub API confirms v1.0.0-beta.3 was published 2026-10-12T22:45:50Z with 15 assets. The site advertises 12 direct binaries and TestFlight; IPA and two tarballs are ancillary assets.
- Highlights: navigation history, swipe back, animated timeline images/stickers, in-app Matrix links, image viewer redesign, tighter message formatting.
- Release source: https://github.com/project-robius/robrix/releases/tag/v1.0.0-beta.3
- Tagged README confirms animated images/GIFs are complete; audio/video remain pending. Other roadmap rows retain their order.
- Build/type check pass. Generated pages have 12 correct published downloads; IPA and two AUR tarballs remain ancillary. Release notes continue to recommend TestFlight.
- Existing optional src/icons path produces an Astro warning; packaged icons build correctly.
- GitHub Pages deployment is triggered by a push to main; these local changes have not been deployed.
