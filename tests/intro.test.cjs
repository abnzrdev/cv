const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

test('reduced motion shows the complete introduction without scheduling animation', () => {
  let scheduled = false;
  const heading = { textContent: "Hey, I'm Abenezer." };
  const skip = { hidden: false, addEventListener() {} };
  const document = {
    querySelector: selector => selector === '#skip-intro' ? skip : heading,
    querySelectorAll: () => [],
    documentElement: { classList: { add() {}, remove() {} } },
  };
  runInNewContext(readFileSync('intro.js', 'utf8'), {
    document, matchMedia: () => ({ matches: true, addEventListener() {} }),
    requestAnimationFrame: () => { scheduled = true; },
  });
  assert.equal(heading.textContent, "Hey, I'm Abenezer.");
  assert.equal(skip.hidden, true);
  assert.equal(scheduled, false);
});
