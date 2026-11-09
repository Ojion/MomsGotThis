document.getElementById('year').textContent = new Date().getFullYear();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// menu sheet under 1024px
const toggle = document.querySelector('.nav__toggle');
const sheet = document.getElementById('sheet');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
  sheet.hidden = !open;
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
sheet.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.getElementById(link.hash.slice(1));
  setMenu(false);
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll: true});
  }
});
document.addEventListener('focusin', event => {
  if (!sheet.hidden && event.target !== toggle && !sheet.contains(event.target)) setMenu(false);
});
addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); toggle.focus(); } });

// a cleaning card picks its kind in the form
for (const card of document.querySelectorAll('.card[data-type]')) {
  card.addEventListener('click', () => {
    const radio = document.querySelector(`.chips input[value="${card.dataset.type}"]`);
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('input', {bubbles: true}));
    }
  });
}

// pinned-chapters: from 1024 wide on a screen 640 tall, the steps open one at a time as the page scrolls past,
// and the frame beside them shows that step's room; otherwise every step stands with its photo
const steps = document.getElementById('steps');
const stepItems = [...steps.querySelectorAll('.mo-pc__step')];
const frame = steps.querySelector('.mo-pc__visuals');
const figures = stepItems.map(s => s.querySelector('.mo-pc__visual'));
for (const s of stepItems) {
  const p = s.querySelector('p');
  const span = document.createElement('span');
  while (p.firstChild) span.append(p.firstChild);
  p.append(span);
}
let live = false;
let current = -1;
function show(i) {
  if (i === current) return;
  current = i;
  stepItems.forEach((s, n) => s.classList.toggle('is-on', n === i));
  figures.forEach((f, n) => f.classList.toggle('is-on', n === i));
}
function scrub() {
  if (!live) return;
  const r = steps.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
  show(Math.min(stepItems.length - 1, Math.floor(p * stepItems.length)));
}
function syncSteps() {
  const fits = !reduced && innerWidth >= 1024 && innerHeight >= 640;
  if (fits && !live) {
    live = true;
    steps.classList.add('is-live');
    figures.forEach(f => frame.append(f));
    current = -1;
    show(0);
    scrub();
  } else if (!fits && live) {
    live = false;
    steps.classList.remove('is-live');
    figures.forEach((f, n) => { stepItems[n].append(f); f.classList.remove('is-on'); });
    stepItems.forEach(s => s.classList.remove('is-on'));
  }
}
syncSteps();
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; scrub(); }); } }, { passive: true });
let resizeTimer = 0;
addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { syncSteps(); scrub(); }, 120); });

// quote form: validate and display a sample draft
const form = document.getElementById('quote-form');
const status = form.querySelector('[data-form-status]');
form.addEventListener('submit', e => {
  e.preventDefault();
  const checks = [
    ['f-name', v => v.length > 0],
    ['f-phone', v => v.replace(/\D/g, '').length >= 10],
    ['f-area', v => v.length > 0],
  ];
  let firstBad = null;
  let bad = 0;
  for (const [id, ok] of checks) {
    const input = document.getElementById(id);
    const valid = ok(input.value.trim());
    input.setAttribute('aria-invalid', String(!valid));
    document.getElementById(`${id}-err`).hidden = valid;
    if (!valid) { bad++; if (!firstBad) firstBad = input; }
  }
  if (firstBad) {
    status.textContent = bad === 1 ? 'One thing to fix, then the text can open.' : `${bad} things to fix, then the text can open.`;
    firstBad.focus();
    return;
  }
  const v = id => document.getElementById(id).value.trim();
  const type = form.querySelector('input[name="type"]:checked').value;
  const message = `Hi Amber, I'd like a free cleaning quote.\nName: ${v('f-name')}\nPhone: ${v('f-phone')}\nCity/neighborhood: ${v('f-area')}\nCleaning type: ${type}\nHome size and needs: ${v('f-details')}`;
  status.textContent = '';
  handOffQuote(message, e);
});
