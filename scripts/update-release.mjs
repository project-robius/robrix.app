import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const releases = 'https://github.com/project-robius/robrix/releases';
const destination = new URL('../src/data/release.json', import.meta.url);

export function snapshotRelease(release, tag) {
  assert.match(tag, /^v\d+\.\d+\.\d+(?:-[\w.-]+)?$/, 'Pass an explicit version tag, e.g. v1.0.0-beta.3');
  assert.equal(release.tag_name, tag, 'GitHub returned a different release');
  assert.equal(release.draft, false, 'Draft releases cannot be published on the site');
  assert.ok(typeof release.published_at === 'string' && Number.isFinite(Date.parse(release.published_at)), 'Release must have a publication date');
  assert.equal(release.html_url, `${releases}/tag/${tag}`);
  assert.ok(release.assets?.length > 0, 'Release has no uploaded assets');
  const names = new Set();
  const assets = release.assets.map((asset) => {
    assert.ok(typeof asset.name === 'string' && asset.name.length > 0 && !names.has(asset.name), 'Missing or duplicate asset name');
    names.add(asset.name);
    assert.equal(asset.state, 'uploaded', `Asset is not ready: ${asset.name}`);
    assert.ok(Number.isSafeInteger(asset.size) && asset.size > 0, `Empty or invalid asset: ${asset.name}`);
    assert.equal(asset.browser_download_url, `${releases}/download/${tag}/${asset.name}`, `Unexpected download URL: ${asset.name}`);
    return { name: asset.name, size: asset.size, url: asset.browser_download_url };
  }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  return { tag, publishedAt: release.published_at, url: release.html_url, assets };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    const check = args.includes('--check');
    const tags = args.filter((arg) => arg !== '--check');
    assert.equal(tags.length, 1, 'Usage: npm run release:update -- <tag> [--check]');
    const [tag] = tags;
    assert.match(tag, /^v\d+\.\d+\.\d+(?:-[\w.-]+)?$/, 'An explicit version tag is required');
    // Use gh authentication and fetch metadata only; never download app binaries.
    const release = JSON.parse(execFileSync('gh', ['api', `repos/project-robius/robrix/releases/tags/${tag}`], { encoding: 'utf8' }));
    const snapshot = snapshotRelease(release, tag);
    const content = `${JSON.stringify(snapshot, null, 2)}\n`;
    if (check) {
      assert.deepEqual(JSON.parse(readFileSync(destination, 'utf8')), snapshot, 'Saved release differs from GitHub; run the update command without --check');
      console.log(`Verified ${tag}: ${snapshot.assets.length} published assets match GitHub.`);
    } else {
      writeFileSync(destination, content);
      console.log(`Updated src/data/release.json to ${tag} (${snapshot.assets.length} assets).`);
      console.log(`Review feature copy and roadmap against ${snapshot.url}, then run npm run check and npm run build.`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
