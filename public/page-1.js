const PAIR = [
  { n: "00", tag: "Before", slug: "00-original", name: "Your site today", heart: false,
    blurb: "The site as it is now, for comparison.", sw: ["#E83C8D", "#087F89", "#FFFAFD", "#28342E"] },
  { n: "19", tag: "After", slug: "19-original-refined", name: "Your site, cleaned up", heart: true,
    blurb: "Same layout, logo and colours. Real typography instead of the template look, your photo beside a plain headline, and a one-tap text button.",
    sw: ["#E83687", "#51B9C6", "#193955", "#FCE8F1"] },
];

const LOOKS = [
  { n: "1", slug: "01-impeccable-delight", name: "The fridge list",
    blurb: "A family to-do list on a pink pad, where “Clean the whole house” gets crossed off: “I've got this one.”",
    sw: ["#F8C4DD", "#193955", "#E83687", "#51B9C6"] },
  { n: "2", slug: "02-impeccable-distill", name: "Quiet house",
    blurb: "Calm and spacious, very few words, one pink accent. The photos do the talking.",
    sw: ["#FBF8F6", "#193955", "#E83687", "#51B9C6"] },
  { n: "3", slug: "06-od-doodle", name: "A note from Amber",
    blurb: "Hand-drawn doodles in teal and pink, taped photos and a “Dear Amber,” notebook form.",
    sw: ["#FFFFFF", "#51B9C6", "#F47CB7", "#193955"] },
  { n: "4", slug: "07-uipro-claymorphism", name: "Soft clay",
    blurb: "Puffy pastel panels, your photo up front, and a clay-style bucket like the one in your logo.",
    sw: ["#FCE8F1", "#51B9C6", "#E83687", "#193955"] },
  { n: "5", slug: "10-taste-founders-letter", name: "The letter",
    blurb: "The whole page is a letter from you, in your own words, signed “Talk soon.”",
    sw: ["#F3F1EC", "#193955", "#CC095D", "#51B9C6"] },
];
const ALL = PAIR.concat(LOOKS);

const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

let picks = [];
try { picks = JSON.parse(localStorage.getItem("mgt-picks2") || "[]"); } catch (e) { picks = []; }

function cardHTML(s) {
  const href = `sites/${s.slug}/index.html`;
  const sw = s.sw.map(c => `<span style="background:${c}"></span>`).join("");
  const heart = s.heart === false ? "" :
    `<button type="button" class="heart" data-n="${s.n}" aria-pressed="${picks.includes(s.n)}" aria-label="Favourite ${s.name}">${HEART}</button>`;
  const label = s.tag ? `<span class="tag${s.tag === "After" ? " after" : ""}">${s.tag}</span>` : `<span class="num">${s.n}</span>`;
  return `<article class="card${s.heart === false ? " before" : ""}" id="s-${s.slug.slice(0, 2)}">
    <a class="stage" href="${href}" aria-label="Open ${s.name}">
      <img class="desk" src="thumbs/${s.slug}-desk.webp" alt="" loading="lazy" width="1000" height="625">
      <img class="phone" src="thumbs/${s.slug}-phone.webp" alt="" loading="lazy" width="300" height="649">
    </a>
    <div class="swatches" aria-hidden="true">${sw}</div>
    <div class="body">
      <div class="row">${label}<h3>${s.name}</h3></div>
      <p>${s.blurb}</p>
      <div class="actions"><a class="open" href="${href}">Open the site</a><button type="button" class="phone-open" data-path="${href}" data-title="${s.name}">Phone preview</button>${heart}</div>
    </div>
  </article>`;
}

const shelves = document.getElementById("shelves");
shelves.innerHTML = `<section class="section" aria-labelledby="h-pair"><h2 id="h-pair">Your site, before and after</h2>
  <p>Your current site on the left, and the same site cleaned up on the right.</p>
  <div class="pair">${PAIR.map(cardHTML).join("")}</div></section>
  <section class="section" aria-labelledby="h-looks"><h2 id="h-looks">Five new looks</h2>
  <p>Each one is a different take on your business, built from scratch.</p>
  <div class="grid">${LOOKS.map(cardHTML).join("")}</div></section>`;

const phone = document.getElementById("phone-preview");
const phoneFrame = document.getElementById("phone-frame");
document.getElementById("phone-close").addEventListener("click", () => phone.close());
phone.addEventListener("close", () => phoneFrame.removeAttribute("src"));
phone.addEventListener("click", e => { if (e.target === phone) phone.close(); });
shelves.addEventListener("click", e => {
  const b = e.target.closest(".phone-open");
  if (!b) return;
  document.getElementById("phone-title").textContent = `${b.dataset.title} on a phone`;
  phoneFrame.title = `${b.dataset.title} on a phone`;
  document.getElementById("phone-full").href = b.dataset.path;
  phoneFrame.src = b.dataset.path;
  phone.showModal();
});

function pickText() {
  return ALL.filter(s => picks.includes(s.n)).map(s => s.tag ? s.name : `${s.n}. ${s.name}`).join(", ");
}
function renderPicks() {
  document.getElementById("picks").textContent = picks.length ? `Your picks: ${pickText()}` : "No favourites yet. Tap ♥ on any design.";
}
shelves.addEventListener("click", e => {
  const b = e.target.closest(".heart");
  if (!b) return;
  const n = b.dataset.n;
  picks = picks.includes(n) ? picks.filter(x => x !== n) : picks.concat(n);
  b.setAttribute("aria-pressed", picks.includes(n));
  try { localStorage.setItem("mgt-picks2", JSON.stringify(picks)); } catch (err) {}
  renderPicks();
});
document.getElementById("copy").addEventListener("click", () => {
  const text = picks.length ? `Website picks: ${pickText()}` : "I haven't picked any yet.";
  const done = () => { const c = document.getElementById("copied"); c.hidden = false; setTimeout(() => { c.hidden = true; }, 2500); };
  const selectFallback = () => {
    const el = document.getElementById("picks");
    el.textContent = text;
    const r = document.createRange(); r.selectNodeContents(el);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done).catch(selectFallback);
  else selectFallback();
});
renderPicks();
// Coming back from a site lands on its card (#s-NN); the cards are drawn by script, so scroll after render.
if (/^#s-\d\d$/.test(location.hash)) {
  const card = document.getElementById(location.hash.slice(1));
  if (card) card.scrollIntoView({ block: "center" });
}
