(() => {
  const skip = document.querySelector('#skip-intro');
  if (!skip) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    skip.hidden = true;
    return;
  }
  const heading = document.querySelector('#intro-heading');
  const introduction = document.querySelector('.introduction');
  introduction.style.minHeight = `${introduction.getBoundingClientRect().height}px`;
  const name = heading.textContent;
  const parts = [...document.querySelectorAll('[data-start]')].map(element => {
    const text = element.querySelector('span') || element;
    return { element, text, content: text.textContent, start: Number(element.dataset.start), end: Number(element.dataset.end) };
  });
  let finished = false;
  let origin;
  function finish() {
    finished = true;
    heading.textContent = name;
    for (const part of parts) part.text.textContent = part.content;
    document.documentElement.classList.remove('intro-playing');
    introduction.style.minHeight = '';
    skip.hidden = true;
  }
  function frame(now) {
    if (finished) return;
    origin ??= now;
    const elapsed = now - origin;
    heading.textContent = name.slice(0, Math.max(0, Math.floor((elapsed - 440) / 1200 * name.length)));
    for (const part of parts) {
      const progress = Math.max(0, Math.min(1, (elapsed - part.start) / (part.end - part.start)));
      part.text.textContent = part.content.slice(0, Math.floor(progress * part.content.length));
      part.element.classList.toggle('badge-ready', progress === 1);
    }
    if (elapsed >= 5800) finish();
    else requestAnimationFrame(frame);
  }
  skip.hidden = false;
  skip.addEventListener('click', finish);
  reducedMotion.addEventListener('change', event => { if (event.matches) finish(); });
  document.documentElement.classList.add('intro-playing');
  heading.textContent = '';
  for (const part of parts) part.text.textContent = '';
  requestAnimationFrame(frame);
})();

document.querySelectorAll('.mobile-menu nav a').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('.mobile-menu').open = false; });
});

(() => {
  const links = [...document.querySelectorAll('.main-nav a[href^="#"], .mobile-menu nav a[href^="#"]')];
  if (!links.length) return;
  const sections = [...document.querySelectorAll('main section[id], main footer[id]')];
  function activate(hash) {
    for (const link of links) {
      if (link.hash === hash) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  function followScroll() {
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 160) current = section;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = sections.at(-1);
    }
    if (current) activate(`#${current.id}`);
  }
  window.addEventListener('hashchange', () => activate(location.hash || '#home'));
  window.addEventListener('scroll', followScroll, { passive: true });
  activate(location.hash || '#home');
})();
