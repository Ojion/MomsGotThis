document.getElementById('year').textContent = new Date().getFullYear();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// splits an element's text into word spans (.w > .wi); used by the hero entrance and the statement
function splitWords(el) {
  const words = [];
  for (const node of [...el.childNodes]) {
    if (node.nodeType !== 3) continue;
    const frag = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { frag.append(part); continue; }
      const w = document.createElement('span');
      w.className = 'w';
      const wi = document.createElement('span');
      wi.className = 'wi';
      wi.textContent = part;
      w.append(wi);
      frag.append(w);
      words.push(w);
    }
    node.replaceWith(frag);
  }
  return words;
}

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

// word-highlight: Amber's line turns from grey to ink as it crosses the screen, scrubbed to the scroll
const statement = document.querySelector('[data-moment="word-highlight"] .statement');
const sWords = splitWords(statement);
if (!reduced) {
  statement.classList.add('is-mo');
  sWords.forEach(w => w.classList.add('mo-w'));
  let ticking = false;
  const paint = () => {
    ticking = false;
    const r = statement.getBoundingClientRect();
    const start = innerHeight * 0.85, end = innerHeight * 0.45;
    const t = Math.min(1, Math.max(0, (start - r.top) / ((start - end) + r.height)));
    const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    const k = atEnd ? sWords.length : Math.round(t * sWords.length);
    sWords.forEach((w, i) => w.classList.toggle('is-on', i < k));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
  addEventListener('resize', paint);
  paint();
}

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
    status.textContent = bad === 1 ? 'One field needs a fix before the text can open.' : `${bad} fields need a fix before the text can open.`;
    firstBad.focus();
    return;
  }
  const v = id => document.getElementById(id).value.trim();
  const message = `Hi Amber, I'd like a free cleaning quote.\nName: ${v('f-name')}\nPhone: ${v('f-phone')}\nCity/neighborhood: ${v('f-area')}\nCleaning type: ${v('f-type')}\nHome size and needs: ${v('f-details')}`;
  status.textContent = '';
  handOffQuote(message, e);
});
