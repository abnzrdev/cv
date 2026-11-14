const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

test('navigation follows the hash and the section reached by scrolling', () => {
  const links = ['home', 'work', 'projects'].map(id => ({
    hash: `#${id}`, attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    removeAttribute(name) { delete this.attributes[name]; },
  }));
  const sections = [0, 900, 1900].map((top, i) => ({ id: links[i].hash.slice(1), getBoundingClientRect: () => ({ top }) }));
  const events = {};
  const location = { hash: '#work' };
  runInNewContext(readFileSync('intro.js', 'utf8'), {
    document: {
      querySelector: () => null,
      querySelectorAll: selector => selector.includes('main-nav') ? links : selector.includes('section') ? sections : [],
    }, location,
    window: { addEventListener: (event, callback) => { events[event] = callback; } },
    requestAnimationFrame: callback => callback(),
  });
  assert.equal(links[1].attributes['aria-current'], 'location');
  location.hash = '#projects';
  events.hashchange();
  assert.equal(links[2].attributes['aria-current'], 'location');
  assert.equal(links[1].attributes['aria-current'], undefined);
  sections[1].getBoundingClientRect = () => ({ top: -100 });
  events.scroll();
  assert.equal(links[1].attributes['aria-current'], 'location');
});
