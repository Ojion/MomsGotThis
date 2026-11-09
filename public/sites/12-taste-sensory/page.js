document.getElementById('year').textContent = new Date().getFullYear();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = v => Math.min(1, Math.max(0, v));
const easeOut = t => 1 - Math.pow(1 - t, 3);

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

// picture-develops (film look): the tub waits as a faint grey print just before it scrolls in,
// then comes up darks first, then colour, once. A frame no observer reports keeps its photograph.
const develop = document.querySelector('[data-moment="picture-develops"]');
if (!reduced && 'IntersectionObserver' in window) {
  const arm = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !develop.classList.contains('is-developing')) develop.classList.add('is-armed');
  }, { rootMargin: '0px 0px 25% 0px' });
  const seen = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    develop.classList.remove('is-armed');
    develop.classList.add('is-developing');
    seen.disconnect();
    arm.disconnect();
  }, { threshold: 0.35 });
  arm.observe(develop);
  seen.observe(develop);
}

// photo-chapters: from 768 wide on a screen 600 tall or more the section holds while you scroll three screens;
// each next room is uncovered from its foot over the last, and the panel shows that room's lines.
// At rest (phones, reduced motion, no script, short screens) the three rooms stand stacked or side by side.
const rooms = document.getElementById('rooms');
const box = rooms.querySelector('.ph');
const list = rooms.querySelector('.ph__list');
const chapters = [...rooms.querySelectorAll('.ph__ch')];
const pics = chapters.map(c => c.querySelector('.ph__pic'));
for (const c of chapters) {
  const words = document.createElement('div');
  words.className = 'ph__words';
  for (const el of [...c.children]) if (!el.classList.contains('ph__pic')) words.append(el);
  c.append(words);
}
const stage = document.createElement('div');
stage.className = 'ph__stage';
const panel = document.createElement('div');
panel.className = 'ph__panel';
const count = document.createElement('p');
count.className = 'ph__count';
count.setAttribute('aria-hidden', 'true');
panel.append(count);
let roomsLive = false;
let onChapter = -1;
function drawRooms() {
  if (!roomsLive) return;
  const r = rooms.getBoundingClientRect();
  const p = clamp(-r.top / Math.max(1, r.height - box.offsetHeight));
  const seg = 1 / chapters.length;
  let k = 0;
  pics.forEach((pic, i) => {
    const u = i === 0 ? 1 : clamp((p - (i - 0.25) * seg) / (0.45 * seg));
    const e = easeOut(u);
    pic.style.setProperty('--c', `${((1 - e) * 100).toFixed(2)}%`);
    pic.style.setProperty('--z', (1.06 - 0.06 * e).toFixed(4));
    if (u >= 0.5) k = i;
  });
  if (k !== onChapter) {
    onChapter = k;
    chapters.forEach((c, i) => c.classList.toggle('is-on', i === k));
    count.textContent = `0${k + 1} / 0${chapters.length}`;
  }
}
function syncRooms() {
  const fits = !reduced && innerWidth >= 768 && innerHeight >= 600;
  if (fits && !roomsLive) {
    roomsLive = true;
    pics.forEach(p => stage.append(p));
    panel.append(list);
    stage.append(panel);
    box.append(stage);
    rooms.classList.add('is-live');
    onChapter = -1;
    drawRooms();
  } else if (!fits && roomsLive) {
    roomsLive = false;
    rooms.classList.remove('is-live');
    box.append(list);
    pics.forEach((p, i) => { chapters[i].prepend(p); p.style.removeProperty('--c'); p.style.removeProperty('--z'); });
    chapters.forEach(c => c.classList.remove('is-on'));
    stage.remove();
  }
}
syncRooms();
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; drawRooms(); }); } }, { passive: true });
let resizeTimer = 0;
addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { syncRooms(); drawRooms(); }, 120); });

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
    status.textContent = bad === 1 ? 'One field needs a fix.' : `${bad} fields need a fix.`;
    firstBad.focus();
    return;
  }
  const v = id => document.getElementById(id).value.trim();
  const message = `Hi Amber, I'd like a free cleaning quote.\nName: ${v('f-name')}\nPhone: ${v('f-phone')}\nCity/neighborhood: ${v('f-area')}\nCleaning type: ${v('f-type')}\nHome size and needs: ${v('f-details')}`;
  status.textContent = '';
  handOffQuote(message, e);
});
