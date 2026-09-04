/**
 * Every fact on this site comes from the Robrix repository, its README, or the
 * v1.0.0-alpha.2 release. Keep it that way — no invented benchmarks, no fake
 * testimonials. When a new release ships, RELEASE is the only thing to bump.
 */

export const SITE = {
  name: 'Robrix',
  domain: 'robrix.app',
  url: 'https://robrix.app',
  tagline: 'A fast, powerful Matrix chat client written from scratch in Rust.',
  description:
    'Robrix is a native Matrix chat client written from scratch in Rust. Dockable tabs let you keep every room open at once. No Electron, no web engine, no JavaScript — on macOS, Linux, Windows, Android and iOS.',
} as const;

export const LINKS = {
  github: 'https://github.com/project-robius/robrix',
  releases: 'https://github.com/project-robius/robrix/releases',
  latestRelease: 'https://github.com/project-robius/robrix/releases/tag/v1.0.0-alpha.2',
  issues: 'https://github.com/project-robius/robrix/issues',
  license: 'https://github.com/project-robius/robrix/blob/main/LICENSE-MIT',
  matrixRoom: 'https://matrix.to/#/#robius-robrix:matrix.org',
  matrixGeneral: 'https://matrix.to/#/#robius:matrix.org',
  robius: 'https://github.com/project-robius',
  makepad: 'https://github.com/makepad/makepad',
  matrixSdk: 'https://github.com/matrix-org/matrix-rust-sdk',
  matrixOrg: 'https://matrix.org',
  rust: 'https://www.rust-lang.org',
  testflight: 'https://testflight.apple.com/join/cQPRgdVY',
} as const;

export const REPO = {
  stars: 481,
  forks: 65,
  license: 'MIT',
} as const;

export const RELEASE = {
  version: '1.0.0-alpha.2',
  tag: 'v1.0.0-alpha.2',
  date: '2026-08-13',
  dateLabel: 'August 2026',
  base: 'https://github.com/project-robius/robrix/releases/download/v1.0.0-alpha.2',
} as const;

const dl = (file: string) => `${RELEASE.base}/${file}`;

export type DownloadFile = {
  label: string;
  detail: string;
  file?: string;
  href: string;
  size?: string;
  primary?: boolean;
};

export type Platform = {
  id: string;
  name: string;
  icon: string;
  /** matched against navigator.userAgent / platform to pre-select a tab */
  detect: string[];
  status: 'stable' | 'preview';
  note?: string;
  install?: string[];
  files: DownloadFile[];
};

export const PLATFORMS: Platform[] = [
  {
    id: 'macos',
    name: 'macOS',
    icon: 'tabler:brand-apple',
    detect: ['mac'],
    status: 'stable',
    install: ['Open the .dmg and drag Robrix to your Applications folder.'],
    files: [
      {
        label: 'Apple Silicon',
        detail: 'M1 and later',
        file: `Robrix_${RELEASE.version}_aarch64.dmg`,
        href: dl(`Robrix_${RELEASE.version}_aarch64.dmg`),
        size: '68.5 MB',
        primary: true,
      },
      {
        label: 'Intel',
        detail: 'x86_64',
        file: `Robrix_${RELEASE.version}_x64.dmg`,
        href: dl(`Robrix_${RELEASE.version}_x64.dmg`),
        size: '71.4 MB',
      },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'tabler:brand-windows',
    detect: ['win'],
    status: 'stable',
    note: 'Windows 10 and 11.',
    install: ['Download and run the installer.'],
    files: [
      {
        label: 'Installer',
        detail: 'x86_64',
        file: `robrix-${RELEASE.version}-windows-x86_64-release.exe`,
        href: dl(`robrix-${RELEASE.version}-windows-x86_64-release.exe`),
        size: '52.8 MB',
        primary: true,
      },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'tabler:device-desktop',
    detect: ['linux', 'x11'],
    status: 'stable',
    note: 'Pick the build that matches your distro and CPU architecture.',
    install: [
      'Debian/Ubuntu: open the .deb in your Software Center, or run sudo apt install ./<file>.deb',
      'Arch: sudo pacman -U <file>.pkg.tar.zst',
      'AppImage: chmod +x the file and run it.',
    ],
    files: [
      {
        label: 'Ubuntu 24.04+',
        detail: 'x86_64 · .deb',
        file: `robrix-${RELEASE.version}-ubuntu-24.04-x86_64-release.deb`,
        href: dl(`robrix-${RELEASE.version}-ubuntu-24.04-x86_64-release.deb`),
        size: '68.8 MB',
        primary: true,
      },
      {
        label: 'Ubuntu 24.04+',
        detail: 'aarch64 · .deb',
        file: `robrix-${RELEASE.version}-ubuntu-24.04-arm-aarch64-release.deb`,
        href: dl(`robrix-${RELEASE.version}-ubuntu-24.04-arm-aarch64-release.deb`),
        size: '66.6 MB',
      },
      {
        label: 'Ubuntu 22.04',
        detail: 'x86_64 · .deb',
        file: `robrix-${RELEASE.version}-ubuntu-22.04-x86_64-release.deb`,
        href: dl(`robrix-${RELEASE.version}-ubuntu-22.04-x86_64-release.deb`),
        size: '68.8 MB',
      },
      {
        label: 'Ubuntu 22.04',
        detail: 'aarch64 · .deb',
        file: `robrix-${RELEASE.version}-ubuntu-22.04-arm-aarch64-release.deb`,
        href: dl(`robrix-${RELEASE.version}-ubuntu-22.04-arm-aarch64-release.deb`),
        size: '66.5 MB',
      },
      {
        label: 'Arch Linux',
        detail: 'x86_64 · pkg.tar.zst',
        file: `robrix-1.0.0alpha.2-1-x86_64.pkg.tar.zst`,
        href: dl(`robrix-1.0.0alpha.2-1-x86_64.pkg.tar.zst`),
        size: '64.8 MB',
      },
      {
        label: 'AppImage',
        detail: 'x86_64 · any distro',
        file: `robrix-${RELEASE.version}-x86_64.AppImage`,
        href: dl(`robrix-${RELEASE.version}-x86_64.AppImage`),
        size: '69.1 MB',
      },
      {
        label: 'AppImage',
        detail: 'aarch64 · any distro',
        file: `robrix-${RELEASE.version}-aarch64.AppImage`,
        href: dl(`robrix-${RELEASE.version}-aarch64.AppImage`),
        size: '66.9 MB',
      },
    ],
  },
  {
    id: 'ios',
    name: 'iOS & iPadOS',
    icon: 'tabler:device-mobile',
    detect: ['iphone', 'ipad', 'ipod'],
    status: 'stable',
    note: 'Distributed through TestFlight while Robrix is in alpha.',
    files: [
      {
        label: 'TestFlight beta',
        detail: 'iPhone and iPad',
        href: LINKS.testflight,
        primary: true,
      },
    ],
  },
  {
    id: 'android',
    name: 'Android',
    icon: 'tabler:brand-android',
    detect: ['android'],
    status: 'stable',
    note: 'Android 8 (API 26) and up. Google Play listing is in progress.',
    install: ['Sideload the APK — you will need to allow installing from unknown sources.'],
    files: [
      {
        label: 'APK',
        detail: 'aarch64',
        file: `Robrix-${RELEASE.version}-android-aarch64-release.apk`,
        href: dl(`Robrix-${RELEASE.version}-android-aarch64-release.apk`),
        size: '66.9 MB',
        primary: true,
      },
    ],
  },
];

/**
 * How the download cards pack on wide screens. Linux carries seven builds and
 * everything else carries one or two, so it gets a column to itself and the
 * short cards pair up beside it. Ids refer to PLATFORMS above.
 */
export const DOWNLOAD_COLUMNS: string[][] = [
  ['macos', 'ios'],
  ['windows', 'android'],
  ['linux'],
];

/**
 * Build targets, straight from the README support table. `download` points at
 * the matching card on the download page; OpenHarmony has no build yet.
 */
export const TARGETS = [
  { name: 'macOS', host: 'macOS', icon: 'tabler:brand-apple', status: 'ready' as const, download: 'macos' },
  { name: 'Linux', host: 'Linux', icon: 'tabler:device-desktop', status: 'ready' as const, download: 'linux' },
  { name: 'Windows', host: 'Windows', icon: 'tabler:brand-windows', status: 'ready' as const, download: 'windows' },
  { name: 'Android', host: 'any OS', icon: 'tabler:brand-android', status: 'ready' as const, download: 'android' },
  { name: 'iOS & iPadOS', host: 'macOS', icon: 'tabler:device-mobile', status: 'ready' as const, download: 'ios' },
  { name: 'OpenHarmony', host: 'any OS', icon: 'tabler:devices', status: 'wip' as const, download: null },
];

/**
 * The same crate, aimed at three different targets. Commands are verbatim from
 * the repository README — if the build instructions change, change them here.
 */
export const BUILDS = [
  {
    target: 'Desktop',
    detail: 'macOS · Linux · Windows',
    command: 'cargo run --release',
  },
  {
    target: 'Android',
    detail: 'API 26 and up',
    command: 'cargo makepad android run -p robrix --release',
  },
  {
    target: 'iOS & iPadOS',
    detail: 'simulator or device',
    command: 'cargo makepad apple ios --org=rs.robius --app=robrix run-sim -p robrix --release',
  },
];

/**
 * The argument the hero makes, in numbers. Bar length reads as the magnitude of
 * the value beside it — how big the renderer, how much memory, how many rooms —
 * so it means the same thing on both sides of the seam.
 */
export const CONTRAST = {
  sim: [
    { k: 'Renderer size', v: 'Chromium', bar: 100 },
    { k: 'Memory', v: 'Hundreds of MB', bar: 86 },
    { k: 'Rooms on screen', v: 'One', bar: 12 },
  ],
  real: [
    { k: 'Renderer size', v: 'Makepad', bar: 18 },
    { k: 'Memory', v: 'Native footprint', bar: 16 },
    { k: 'Rooms on screen', v: 'All of them', bar: 100 },
  ],
};

/**
 * Differences from the common pattern among widely-used Matrix clients. Phrased
 * as "typical", never "every client" — the ecosystem is large and we haven't
 * audited all of it. Each Robrix column entry is something the client does today.
 */
export const DIFFERENCE = [
  {
    axis: 'Rooms on screen',
    typical: 'One at a time',
    robrix: 'As many as you can fit',
    note: 'Dock a second room beside the first, then a third below it.',
  },
  {
    axis: 'Threads',
    typical: 'A side panel on one room',
    robrix: 'Their own dockable pane',
    note: 'A thread can sit beside its room, or across the window from it.',
  },
  {
    axis: 'Layout',
    typical: 'Fixed by the app',
    robrix: 'Split, stack, drag — and it persists',
    note: 'Robrix restores your arrangement on the next launch.',
  },
  {
    axis: 'On the desktop',
    typical: 'A web app in a native shell',
    robrix: 'Native code, rendered on the GPU',
    note: 'No Chromium process, no DOM, no JavaScript bridge.',
  },
  {
    axis: 'On mobile',
    typical: 'A separate codebase per platform',
    robrix: 'The same Rust as the desktop',
    note: 'iOS and Android build from the source that builds macOS.',
  },
  {
    axis: 'Loading older messages',
    typical: 'The timeline jumps',
    robrix: 'The timeline holds position',
    note: 'Images and previews fill in around where you are reading.',
  },
];

export type Feature = { title: string; body: string; icon: string };

export const SIGNATURE: Feature[] = [
  {
    title: 'Dockable tabs',
    body: 'Split, stack and drag rooms and threads into any layout you like — the same way your IDE or your browser works. Robrix remembers it between launches.',
    icon: 'tabler:layout-columns',
  },
  {
    title: 'A timeline that stays put',
    body: 'Scroll position never jumps while messages, images and previews load in around it. This is deliberate, and it took real work.',
    icon: 'tabler:arrow-autofit-height',
  },
  {
    title: 'Native sliding sync',
    body: 'Log in fast and get your full rooms list without the long first-sync wait. Requires a homeserver with native sliding sync, like Element X needs.',
    icon: 'tabler:refresh',
  },
];

export const FEATURES: Feature[] = [
  {
    title: 'End-to-end encryption',
    body: 'Device verification in one click from Account Settings, encrypted media, and a send button that tells you whether the room is encrypted.',
    icon: 'tabler:shield-lock',
  },
  {
    title: 'Threads and replies',
    body: 'Threaded replies, replies into a new thread, and reply previews that expand, collapse and render full rich text.',
    icon: 'tabler:message-2-share',
  },
  {
    title: 'Mentions that keep up',
    body: 'Autocomplete for users, rooms and @room stays fast even in huge rooms, with a proper pop-up. Slash commands share the same UI.',
    icon: 'tabler:at',
  },
  {
    title: 'Files and media',
    body: 'Upload, download and share attachments, including encrypted media, with captions. PNG, JPEG, GIF, WebP, BMP, ICO, QOI and SVG.',
    icon: 'tabler:paperclip',
  },
  {
    title: 'Works offline',
    body: 'A persistent event cache means your history is there before the network is. Everything reconciles when you reconnect.',
    icon: 'tabler:cloud-off',
  },
  {
    title: 'Spaces, DMs and invites',
    body: 'Dedicated views for spaces and direct messages, keyword filters over the rooms list, accept and reject invites, and knock to join.',
    icon: 'tabler:layout-grid',
  },
  {
    title: 'Real text input',
    body: 'Single and multi-line inputs that behave the way you expect, with full keyboard navigation, selection shortcuts and CJK IME support.',
    icon: 'tabler:keyboard',
  },
  {
    title: 'Scrolling that feels right',
    body: 'Kinetic movement, correct acceleration and bounce on touch and trackpad — tuned to match the native apps on each platform.',
    icon: 'tabler:hand-move',
  },
  {
    title: 'Zoom the whole UI',
    body: 'Smoothly scale the entire interface up or down on every platform with the shortcuts you already use.',
    icon: 'tabler:zoom-in',
  },
];

export const ROADMAP = [
  'Audio, video and GIF message events',
  'Search messages within a room',
  'Room browser and public room search',
  'Room settings and info screen',
  'Room members pane',
  'Moderation: ban, kick and friends',
  'Collapsible runs of small events',
];

export const STACK = [
  {
    name: 'Rust',
    role: 'The whole thing',
    body: 'Every line, top to bottom. Memory safety and native speed without a garbage collector in the render path.',
    href: LINKS.rust,
    icon: 'tabler:brand-rust',
  },
  {
    name: 'Makepad',
    role: 'UI toolkit',
    body: 'A GPU-rendered, shader-driven UI toolkit for Rust. Robrix is its flagship app, and the team contributes to it heavily.',
    href: LINKS.makepad,
    icon: 'tabler:app-window',
  },
  {
    name: 'matrix-rust-sdk',
    role: 'Protocol',
    body: 'The official Rust implementation of Matrix, including the encryption stack and the sliding sync client.',
    href: LINKS.matrixSdk,
    icon: 'tabler:network',
  },
  {
    name: 'Project Robius',
    role: 'App framework',
    body: 'The multi-platform Rust app-dev framework Robrix is built on, and the reason one codebase reaches six targets.',
    href: LINKS.robius,
    icon: 'tabler:box',
  },
];

export type Talk = {
  title: string;
  event: string;
  date: string;
  youtube: string;
  bilibili?: string;
  slides?: { label: string; href: string }[];
  body: string;
};

export const TALKS: Talk[] = [
  {
    title: 'A complex, multi-platform app in Rust for secure chat using Matrix',
    event: 'Rust China Conf 2025',
    date: '2025',
    youtube: 'kB-JdmG5kE4',
    bilibili: 'https://www.bilibili.com/video/BV1XJnjzKEZQ',
    slides: [
      {
        label: 'PDF (13 MB)',
        href: 'https://github.com/project-robius/files/blob/6e34bb5a650a42e0e33e47dfb987424fbf58ab8a/GOSIM%20China%202025/Robrix%20Taslk%20GOSIM%20China%20Hangzhou%202025.pdf',
      },
    ],
    body: 'The most recent deep dive: how Robrix is architected, what it takes to run one Rust codebase across desktop and mobile, and where the hard parts were.',
  },
  {
    title: 'A pure Rust multi-platform app for chat and beyond',
    event: 'GOSIM China 2024',
    date: 'October 2024',
    youtube: 'DO5C7aITVyU',
    bilibili: 'https://www.bilibili.com/video/BV1BxUUYcEy5/',
    slides: [
      {
        label: 'PDF (6 MB)',
        href: 'https://github.com/project-robius/files/blob/main/GOSIM%20China%202024/Robrix%20Talk%20GOSIM%20China%20October%2017%2C%202024.pdf',
      },
    ],
    body: 'Robrix as more than a chat client — the case for Rust as a serious application language, and what Project Robius is building toward.',
  },
  {
    title: 'An interview about Robrix on Matrix Live',
    event: 'Matrix Live',
    date: '2024',
    youtube: 'O_bChwDHE3U',
    body: 'The Matrix.org team talks to the Robrix developers about building a native client, sliding sync, and life outside the web stack.',
  },
  {
    title: 'A Matrix chat client and more',
    event: 'GOSIM Europe 2024',
    date: 'May 2024',
    youtube: 'P8RGF942A5g',
    bilibili: 'https://www.bilibili.com/video/BV1oS411N7k6/',
    slides: [
      {
        label: 'PDF (16 MB)',
        href: 'https://github.com/project-robius/files/blob/3ac0a9d2e9f3c78ea51b4875abe02d288fa3685f/RustNL%202024%20and%20GOSIM%20Europe%202024/Robrix%20Talk%20GOSIM%20Europe%20May%206%2C%202024.pdf',
      },
    ],
    body: 'An introduction to Robrix and the Matrix ecosystem it plugs into, from the first public showing of the client.',
  },
  {
    title: 'Project Robius status update and demo',
    event: 'RustNL 2024',
    date: 'May 2024',
    youtube: 'Dg4hlfettn8',
    body: 'The first status update on Project Robius, with a live demo of the cross-platform story that Robrix proves out.',
  },
];

export const NAV = [
  { label: 'The difference', href: '/#difference' },
  { label: 'Features', href: '/#features' },
  { label: 'Platforms', href: '/#platforms' },
  { label: 'Download', href: '/download' },
  { label: 'Talks', href: '/presentations' },
];
