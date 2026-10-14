import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function verifyPage(html, release) {
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer?.includes(release.tag), 'Footer is missing the current release tag');
  const downloads = new Set();
  for (const [, href, body] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    if (!href.startsWith('https://github.com/project-robius/robrix/releases/')) continue;
    if (href.includes('/tag/')) {
      assert.equal(href, release.url, `Stale release notes link: ${href}`);
    } else if (href.includes('/download/')) {
      const asset = release.assets.find((asset) => asset.url === href);
      assert.ok(asset, `Download does not exist in ${release.tag}: ${href}`);
      assert.ok(body.includes(`${(asset.size / 1_000_000).toFixed(1)} MB`), `Incorrect download size: ${href}`);
      downloads.add(href);
    }
  }
  return downloads;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const release = JSON.parse(readFileSync(new URL('../src/data/release.json', import.meta.url), 'utf8'));
    const dist = new URL('../dist/', import.meta.url);
    const pages = readdirSync(dist, { recursive: true }).filter((file) => file.endsWith('.html'));
    assert.ok(pages.includes('index.html') && pages.includes('download/index.html'), 'Run npm run build first');
    const downloads = new Set();
    for (const page of pages) {
      try {
        for (const href of verifyPage(readFileSync(new URL(page, dist), 'utf8'), release)) downloads.add(href);
      } catch (error) {
        throw new Error(`${page}: ${error.message}`);
      }
    }
    assert.ok(downloads.size > 0, 'No release downloads found in the built site');
    console.log(`Verified ${release.tag} across ${pages.length} pages and ${downloads.size} unique downloads (links and sizes).`);
    const otherAssets = release.assets.filter((asset) => !downloads.has(asset.url));
    if (otherAssets.length) console.log(`Assets not advertised as direct downloads; review for new platforms/formats:\n${otherAssets.map((asset) => `  ${asset.name}`).join('\n')}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
