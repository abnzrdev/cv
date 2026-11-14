const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, statSync } = require('node:fs');
const { resolve, dirname } = require('node:path');

test('introduction exposes a static text equivalent to assistive technology', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /<p class="introduction"><span class="sr-only">I'm a 3rd-year KBTU student[\s\S]*?Speech Technology\.<\/span>/);
});

for (const file of ['index.html', 'now/index.html']) {
  test(`${file} has valid local assets and anchors`, () => {
    const html = readFileSync(file, 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'duplicate IDs');
    for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^(https?:|data:|mailto:)/.test(url)) continue;
      const [path, hash] = url.split('#');
      let target = path ? resolve(dirname(file), path) : resolve(file);
      if (statSync(target).isDirectory()) target = resolve(target, 'index.html');
      assert.ok(statSync(target).size > 0, `empty asset: ${url}`);
      if (hash) assert.ok(readFileSync(target, 'utf8').includes(`id="${hash}"`), `missing anchor: ${url}`);
    }
  });
}
