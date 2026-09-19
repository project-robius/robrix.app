# robrix.app

The website for [Robrix](https://github.com/project-robius/robrix), a Matrix chat
client written from scratch in Rust.

## The idea

The site runs on one conceit: **light mode is the simulation, dark mode is the
real world, and the theme toggle is the pill.** That isn't a skin. It's wired
into the design tokens — inside the simulation there is no phosphor green, no
glow, and no digital rain. Every component reads the same token names, so a
section written once renders alive in one world and deliberately flat in the
other.

The real world is the default. You have to choose the simulation.

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
├── styles/global.css   the two worlds, as design tokens
├── layouts/Base.astro  head, pre-paint world resolution, header, footer
├── components/
│   ├── Hero.astro      the draggable seam between the two realities
│   ├── Thesis.astro    "There is no Electron.", decoding out of glyph noise
│   ├── Difference.astro  how Robrix differs from a typical Matrix client
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

Renders `public/images/og.png` from SVG via sharp. It substitutes Impact and
Menlo for Anton and JetBrains Mono, so run it on a machine that has them
(any macOS). The cube is sampled from `public/images/robrix-logo.png` and the
rain is seeded, so the output only changes when the script or the logo does.

## Known gaps

- **The dock screenshot is a stand-in.** `public/images/robrix-dock.png` is a
  frame pulled from a 2025 pull-request demo video: 1264 px, light theme, older
  UI, lightness-inverted at render time to sit in the dark world. Replace it
  with a real high-resolution capture of the current build and delete the
  `filter` rule in `Dock.astro`.
- Comparison claims in `DIFFERENCE` are phrased against the *typical* Matrix
  client, deliberately — the ecosystem is large and has not been audited
  exhaustively.

MIT, like Robrix.
