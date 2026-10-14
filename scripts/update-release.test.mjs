import assert from 'node:assert/strict';
import test from 'node:test';

import { snapshotRelease } from './update-release.mjs';
const base = 'https://github.com/project-robius/robrix/releases';
const tag = 'v1.0.0-beta.3';
const asset = (name) => ({ name, size: 74022698, state: 'uploaded', browser_download_url: `${base}/download/${tag}/${name}` });
const release = {
  tag_name: tag, draft: false, published_at: '2026-10-12T22:45:50Z',
  html_url: `${base}/tag/${tag}`, assets: [asset('z.dmg'), asset('a.apk')],
};

test('creates a deterministic snapshot from an explicit published prerelease', () => {
  const snapshot = snapshotRelease(release, tag);
  assert.equal(snapshot.tag, tag);
  assert.equal(snapshot.publishedAt, release.published_at);
  assert.equal(snapshot.url, release.html_url);
  assert.deepEqual(snapshot.assets.map((a) => a.name), ['a.apk', 'z.dmg']);
  assert.deepEqual(snapshot, snapshotRelease({ ...release, assets: [...release.assets].reverse() }, tag));
  assert.equal(snapshot.assets[0].size, 74022698);
  assert.equal(snapshot.assets[0].url, release.assets[1].browser_download_url);
});

test('rejects drafts, wrong tags, invalid dates, and empty releases', () => {
  for (const change of [{ draft: true }, { tag_name: 'v1.0.0-beta.2' }, { published_at: null }, { published_at: 'invalid' }, { assets: [] }]) {
    assert.throws(() => snapshotRelease({ ...release, ...change }, tag));
  }
});

test('rejects unfinished, empty, duplicated, or misdirected assets', () => {
  for (const assets of [
    [{ ...release.assets[0], state: 'new' }],
    [{ ...release.assets[0], size: 0 }],
    [release.assets[0], release.assets[0]],
    [{ ...release.assets[0], browser_download_url: `${base}/download/v1.0.0-beta.2/z.dmg` }],
  ]) assert.throws(() => snapshotRelease({ ...release, assets }, tag));
});
