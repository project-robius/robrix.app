import assert from 'node:assert/strict';
import test from 'node:test';

import { verifyPage } from './verify-release.mjs';
const url = 'https://github.com/project-robius/robrix/releases/download/v1.0.0-beta.3/Robrix.dmg';
const release = { tag: 'v1.0.0-beta.3', url: 'https://github.com/project-robius/robrix/releases/tag/v1.0.0-beta.3', assets: [{ name: 'Robrix.dmg', url, size: 74022698 }] };
const html = `<footer>${release.tag}</footer><a href="${release.url}">Notes</a><a href="${url}"><span>74.0 MB</span></a>`;

test('accepts current release links and published download sizes', () => {
  assert.deepEqual([...verifyPage(html, release)], [url]);
});

test('rejects stale footer versions, stale release links, unknown downloads, and wrong sizes', () => {
  for (const broken of [
    html.replace(`<footer>${release.tag}</footer>`, '<footer>v1.0.0-beta.2</footer>'),
    html.replace(release.url, release.url.replace('beta.3', 'beta.2')),
    html.replace(url, url.replace('beta.3', 'beta.2')),
    html.replace(url, url.replace('Robrix.dmg', 'missing.dmg')),
    html.replace('74.0 MB', '70.4 MB'),
  ]) assert.throws(() => verifyPage(broken, release));
});
