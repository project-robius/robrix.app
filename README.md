# robrix.app

The website for [Robrix](https://github.com/project-robius/robrix), a Matrix chat
client written from scratch in Rust.

## The idea

The site keeps a Matrix-inspired visual language: green code rain, phosphor
highlights, monospace details, and decoding text. The story is about Robrix's
flexible workspace and the open-source community behind it.

The full-width hero pairs the product name with a cube made of glowing glyphs.
Rain pauses when the hero is off screen or the tab is hidden. A visible pause
control and a static rendering for reduced-motion preferences keep it comfortable.

Dark mode is the default. The theme selector offers Dark, Light, and System;
both page themes use green accents, and the hero stays a dark code-rain canvas.
Existing saved light preferences are preserved.

## Running it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
npm run check    # astro type check
```

Node 20.3+ required.

## Layout

```
src/
├── data/site.ts        every fact on the site — release files, features,
│                       platforms, talks. Bump RELEASE when a version ships.
├── styles/global.css   light and dark design tokens
├── layouts/Base.astro  head, pre-paint theme resolution, header, footer
├── components/
│   ├── Hero.astro      the code-rain hero and glyph cube
│   ├── Thesis.astro    "Built in Rust.", decoding out of glyph noise
│   ├── ThemeToggle.astro  persistent light/dark/system preference
│   ├── Dock.astro      the signature dockable-tabs feature
│   └── ...
└── pages/
    ├── index.astro
    ├── download.astro  every release artifact, with platform detection
    └── presentations.astro
```

## Updating for a new release

1. Edit `RELEASE` in `src/data/site.ts` (version, tag, date).
2. Check the file names in `PLATFORMS` still match the release assets, and
   update the sizes.
3. `npm run build`, then confirm the download links resolve.

## Regenerating the link-preview card

```sh
node scripts/make-og.mjs
```

Renders `public/images/og.png` from SVG via sharp and exports the matching
`public/images/robrix-code.svg` mark for the homepage. It substitutes Impact and
Menlo for Anton and JetBrains Mono, so run it on a machine that has them
(any macOS). The cube is sampled from `public/images/robrix-logo.png` and the
rain is seeded, so the output only changes when the script or the logo does.

## Known gaps

- **The dock screenshot is from an older demo.** `public/images/robrix-dock.png`
  is a frame from a 2025 pull-request video, shown in its original light theme.
  Replace it with a high-resolution capture of the current build when available.

MIT, like Robrix.
