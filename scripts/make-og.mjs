/**
 * Generates public/images/og.png — the link-preview card.
 *
 * Rendered from SVG via sharp rather than screenshotted, so it is reproducible
 * on any machine with the fonts named below. Run: node scripts/make-og.mjs
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const W = 1200;
const H = 630;

// Impact stands in for Anton, and Menlo for JetBrains Mono — both ship with macOS
// and are close enough in weight and width for a 1200x630 card. sharp on macOS
// only sees system fonts, so the site's own font files are not an option here.
// Single quotes inside the stacks: these land in XML attributes that are
// themselves double-quoted, and a nested double quote breaks the parse.
const DISPLAY = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
const MONO = "Menlo, 'DejaVu Sans Mono', monospace";
const BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const PHOS = '#00ff41';
const ACCENT = '#ff5865';
const HEAD = '#dcffe4';

/* Seeded, so the rain falls the same way on every run and the PNG only changes
   when the design does. */
const mulberry32 = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const random = mulberry32(0x0b12c5);
const between = (lo, hi) => lo + random() * (hi - lo);

// the hero's glyph set, so the card rains the same alphabet the site does
const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789:.=*+-<>';
const glyph = () => {
  const g = GLYPHS[(random() * GLYPHS.length) | 0];
  return g === '<' ? '&lt;' : g === '>' ? '&gt;' : g;
};

/* One grid for everything that is made of code. The rain and the cube share it,
   so the cube reads as the rain lit up rather than as a picture laid over it. */
const CELL_W = 13;
const CELL_H = 15;
const COLS = Math.ceil(W / CELL_W);
const ROWS = Math.ceil(H / CELL_H);
const FIRST_COL = 0;

/* ---- the cube ---- */
const CUBE = { col: 57, row: 6, cols: 33, rows: 29 };

/* The logo's three faces become three brightnesses of phosphor, top lit hardest,
   so the mark keeps its volume with one colour. The Y between them stays dark. */
const FACE_LIGHT = { top: 0.95, left: 0.6, right: 0.4 };

const logo = await sharp(new URL('../public/images/robrix-logo.png', import.meta.url).pathname)
  .resize(CUBE.cols, CUBE.rows, { fit: 'fill' })
  .ensureAlpha()
  .raw()
  .toBuffer();

const faceAt = (c, r) => {
  const [red, green, blue, alpha] = logo.subarray((r * CUBE.cols + c) * 4);
  if (alpha < 140 || Math.min(red, green, blue) > 215) return null;
  if (green >= red && green >= blue) return 'top';
  return blue >= red ? 'left' : 'right';
};

const cubeCells = Array.from({ length: CUBE.cols * CUBE.rows }, (_, i) => {
  const [c, r] = [i % CUBE.cols, Math.floor(i / CUBE.cols)];
  return { col: CUBE.col + c, row: CUBE.row + r, face: faceAt(c, r) };
}).filter((cell) => cell.face);

const cubeKeys = new Set(cubeCells.map((cell) => `${cell.col},${cell.row}`));
const cubeRowsIn = (col) => cubeCells.filter((cell) => cell.col === col).map((cell) => cell.row);

/* ---- the rain ---- */
/* A streak is a bright head with a trail decaying up the card behind it, as in
   the hero. */
const streak = (col, headRow, length, peak) =>
  Array.from({ length }, (_, i) => ({ col, row: headRow - i, light: i === 0 ? 1 : peak * (1 - i / length) ** 1.25, head: i === 0 }));

/* Over the cube, a streak lands exactly on its top edge and another leaves from
   its underside, so the rain appears to pour through the mark and light it. */
const columnStreaks = (col) => {
  const rows = cubeRowsIn(col);
  if (rows.length) {
    const [top, bottom] = [Math.min(...rows), Math.max(...rows)];
    return [
      ...(random() < 0.7 ? streak(col, top - 1, Math.round(between(4, top)), 0.75) : []),
      ...(random() < 0.55 ? streak(col, bottom + Math.round(between(3, 8)), Math.round(between(3, 7)), 0.7) : []),
    ];
  }
  return Array.from({ length: random() < 0.78 ? (random() < 0.4 ? 2 : 1) : 0 }, () =>
    streak(col, Math.round(between(2, ROWS + 6)), Math.round(between(9, 26)), between(0.4, 0.8)),
  ).flat();
};

const rainCells = Array.from({ length: COLS - FIRST_COL }, (_, i) => columnStreaks(FIRST_COL + i))
  .flat()
  .filter((cell) => cell.row >= 0 && cell.row < ROWS && !cubeKeys.has(`${cell.col},${cell.row}`));

/* ---- drawing ---- */
const cellX = (col) => col * CELL_W + CELL_W / 2;
const cellY = (row) => row * CELL_H + CELL_H - 3;
const glyphAt = (cell, opacity) =>
  `<text x="${cellX(cell.col)}" y="${cellY(cell.row)}" fill-opacity="${opacity.toFixed(2)}">${glyph()}</text>`;

const rain = rainCells.filter((cell) => !cell.head).map((cell) => glyphAt(cell, cell.light)).join('');
const rainHeads = rainCells.filter((cell) => cell.head).map((cell) => glyphAt(cell, 0.8)).join('');

// a few cells in the cube flare white, the way a cell does when it turns over
const lit = cubeCells.map((cell) => ({ ...cell, flare: random() < 0.04 }));
const cubeSlab = lit
  .map(
    (cell) =>
      `<rect x="${cell.col * CELL_W}" y="${cell.row * CELL_H}" width="${CELL_W}" height="${CELL_H}" fill-opacity="${(FACE_LIGHT[cell.face] * 0.16).toFixed(3)}"/>`,
  )
  .join('');
const cubeGlyphs = lit
  .filter((cell) => !cell.flare)
  .map((cell) => glyphAt(cell, FACE_LIGHT[cell.face] * between(0.62, 1)))
  .join('');
const cubeFlares = lit.filter((cell) => cell.flare).map((cell) => glyphAt(cell, 1)).join('');

const CUBE_CX = (CUBE.col + CUBE.cols / 2) * CELL_W;
const CUBE_CY = (CUBE.row + CUBE.rows / 2) * CELL_H;
const TEXT_X = 72;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Keep the copy legible over the rain. -->
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#07090a" stop-opacity="0.9"/>
      <stop offset="62%" stop-color="#07090a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#07090a" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="halo" cx="${CUBE_CX}" cy="${CUBE_CY}" r="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${PHOS}" stop-opacity="0.2"/>
      <stop offset="55%" stop-color="${PHOS}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${PHOS}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="warmth" cx="1200" cy="480" r="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="1" fill="#caffda" fill-opacity="0.035"/>
    </pattern>
    <filter id="bloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <filter id="glow" x="-10%" y="-40%" width="120%" height="180%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="#07090a"/>
  <rect width="${W}" height="${H}" fill="url(#halo)"/>
  <rect width="${W}" height="${H}" fill="url(#warmth)"/>

  <g font-family="${MONO}" font-size="13" text-anchor="middle">
    <g fill="${PHOS}">${rain}</g>
    <g fill="${HEAD}">${rainHeads}</g>
  </g>
  <rect x="0" y="0" width="780" height="${H}" fill="url(#scrim)"/>

  <!-- the cube: a bloom pass under the sharp pass, so it glows like a lit tube -->
  <g font-family="${MONO}" font-size="13" font-weight="bold" text-anchor="middle">
    <g fill="${PHOS}" filter="url(#bloom)">${cubeSlab}${cubeGlyphs}</g>
    <g fill="${PHOS}">${cubeSlab}${cubeGlyphs}</g>
    <g fill="${HEAD}">${cubeFlares}</g>
  </g>

  <rect width="${W}" height="${H}" fill="url(#scan)"/>
  <rect x="${TEXT_X}" y="92" width="44" height="3" fill="${ACCENT}"/>
  <rect x="0" y="628" width="264" height="2" fill="${ACCENT}"/>

  <text x="${TEXT_X}" y="265" font-family="${DISPLAY}" font-size="168" letter-spacing="2" fill="#ffffff">ROBRIX</text>

  <text x="${TEXT_X}" y="337" font-family="${MONO}" font-size="32" font-weight="bold" letter-spacing="-0.6" fill="${PHOS}">MAKE ROOM FOR</text>
  <text x="${TEXT_X}" y="380" font-family="${MONO}" font-size="32" font-weight="bold" letter-spacing="-0.6" fill="${PHOS}">YOUR CONVERSATIONS.</text>

  <text x="${TEXT_X}" y="442" font-family="${BODY}" font-size="25" fill="#b4beb9">A native Matrix client built in Rust.</text>
  <text x="${TEXT_X}" y="478" font-family="${BODY}" font-size="25" fill="#b4beb9">Rooms and threads, arranged your way.</text>

  <rect x="${TEXT_X}" y="549" width="12" height="3" fill="${ACCENT}"/>
  <text x="${TEXT_X + 28}" y="557" font-family="${MONO}" font-size="22" letter-spacing="2" fill="#e8ecea">robrix.app</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('../public/images/og.png', import.meta.url).pathname);

// Reuse the same code-built brand mark in the animated homepage hero.
const codeMark = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="560" viewBox="676 30 560 560">
  <defs>
    <filter id="bloom" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>
  <g font-family="${MONO}" font-size="13" font-weight="bold" text-anchor="middle">
    <g fill="${PHOS}" filter="url(#bloom)">${cubeSlab}${cubeGlyphs}</g>
    <g fill="${PHOS}">${cubeSlab}${cubeGlyphs}</g>
    <g fill="${HEAD}">${cubeFlares}</g>
  </g>
</svg>`;
await writeFile(new URL('../public/images/robrix-code.svg', import.meta.url), codeMark);
console.log('wrote public/images/og.png and public/images/robrix-code.svg');
