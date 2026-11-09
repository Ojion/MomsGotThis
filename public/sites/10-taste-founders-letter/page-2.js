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

// hero entrance, once
const hero = document.querySelector('.hero[data-enter]');
if (!reduced && hero) {
  const words = splitWords(hero.querySelector('h1'));
  const tops = [];
  for (const w of words) if (!tops.includes(w.offsetTop)) tops.push(w.offsetTop);
  for (const w of words) w.style.setProperty('--d', `${tops.indexOf(w.offsetTop) * 80}ms`);
  const start = (tops.length - 1) * 80 + 350;
  hero.querySelectorAll('[data-rise]').forEach((el, i) => el.style.setProperty('--d', `${start + i * 60}ms`));
  hero.classList.add('is-entering');
}

// quote form: check on submit, then open a text to Amber with the answers filled in
const form = document.getElementById('quote-form');
const status = form.querySelector('[data-form-status]');
form.addEventListener('submit', e => {
  e.preventDefault();
  const checks = [
    ['f-name', v => v.length > 0],
    ['f-area', v => v.length > 0],
    ['f-details', v => v.length > 0],
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
  const message = `Hi Amber, I'd like a free cleaning quote.\nName: ${v('f-name')}${v('f-phone') ? `\nPhone: ${v('f-phone')}` : ''}\nCity/neighborhood: ${v('f-area')}\nCleaning type: ${v('f-type')}\nHome size and needs: ${v('f-details')}`;
  status.textContent = 'Your texting app should open with the message ready. Nothing is sent until you press send.';
  window.location.href = 'sms:+18167154322?body=' + encodeURIComponent(message);
});
