/**
 * Generates public/images/og.png — the link-preview card.
 *
 * Rendered from SVG via sharp rather than screenshotted, so it is reproducible
 * on any machine with the fonts named below. Run: node scripts/make-og.mjs
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;

// Impact stands in for Anton, and Menlo for JetBrains Mono — both ship with macOS
// and are close enough in weight and width for a 1200x630 card.
// Single quotes inside the stacks: these land in XML attributes that are
// themselves double-quoted, and a nested double quote breaks the parse.
const DISPLAY = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
const MONO = "Menlo, 'DejaVu Sans Mono', monospace";
const BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="seam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff2233" stop-opacity="0.1"/>
      <stop offset="26%" stop-color="#ff2233"/>
      <stop offset="76%" stop-color="#00ff41"/>
      <stop offset="100%" stop-color="#00ff41" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="simfade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e8edf2"/>
      <stop offset="100%" stop-color="#d5dee7"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#07090a"/>

  <!-- a slice of the simulation, so the card carries the site's split -->
  <rect x="0" y="0" width="150" height="${H}" fill="url(#simfade)"/>
  <rect x="148" y="0" width="3" height="${H}" fill="url(#seam)"/>

  <!-- faint technical grid on the real side -->
  <g stroke="#8a9691" stroke-opacity="0.07" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${151 + i * 88}" y1="0" x2="${151 + i * 88}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="151" y1="${i * 88}" x2="${W}" y2="${i * 88}"/>`).join('')}
  </g>

  <!-- blue pill, in the sliver -->
  <rect x="46" y="290" width="58" height="29" rx="15" fill="#3e7bc4"/>

  <!-- red pill, in the real -->
  <rect x="206" y="106" width="58" height="29" rx="15" fill="#ff2233"/>

  <text x="284" y="129" font-family="${MONO}" font-size="19" letter-spacing="3.4" fill="#ff2233">RED PILL · THE REAL</text>

  <text x="206" y="256" font-family="${DISPLAY}" font-size="118" letter-spacing="1" fill="#ffffff">ROBRIX</text>

  <text x="206" y="330" font-family="${MONO}" font-size="46" font-weight="bold" letter-spacing="-1" fill="#00ff41">THERE IS NO ELECTRON.</text>

  <text x="206" y="396" font-family="${BODY}" font-size="26" fill="#a8b3ad">A Matrix chat client written from scratch in Rust.</text>
  <text x="206" y="434" font-family="${BODY}" font-size="26" fill="#a8b3ad">Dockable tabs. Six platforms. One codebase.</text>

  <!-- chips -->
  ${['macOS', 'Linux', 'Windows', 'Android', 'iOS'].reduce((acc, label) => {
    const x = 206 + acc.offset;
    const w = label.length * 12 + 26;
    acc.offset += w + 10;
    acc.out += `<rect x="${x}" y="482" width="${w}" height="38" rx="4" fill="none" stroke="#2b3439"/>
      <text x="${x + w / 2}" y="507" text-anchor="middle" font-family="${MONO}" font-size="16" letter-spacing="1.4" fill="#8a9691">${label.toUpperCase()}</text>`;
    return acc;
  }, { out: '', offset: 0 }).out}

  <text x="${W - 46}" y="${H - 44}" text-anchor="end" font-family="${MONO}" font-size="19" letter-spacing="2.4" fill="#737f79">robrix.app</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('../public/images/og.png', import.meta.url).pathname);

console.log('wrote public/images/og.png');
