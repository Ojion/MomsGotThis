const PAIR = [
  { tag: "Current", slug: "00-original", name: "Current site",
    blurb: "The site as it is today.", sw: ["#E83C8D", "#087F89", "#FFFAFD", "#28342E"] },
  { tag: "Refreshed", slug: "19-original-refined", name: "Current site, refreshed",
    blurb: "Same layout, logo and colours, with cleaner type, Amber's photo beside the headline and a one-tap text button.",
    sw: ["#E83687", "#51B9C6", "#193955", "#FCE8F1"] },
];

const LOOKS = [
  { n: "1", slug: "01-impeccable-delight", name: "The fridge list",
    blurb: "A family to-do list on a pink pad where “Clean the whole house” gets crossed off.",
    sw: ["#F8C4DD", "#193955", "#E83687", "#51B9C6"] },
  { n: "2", slug: "02-impeccable-distill", name: "Quiet house",
    blurb: "Calm and spacious, few words and one pink accent. The photos carry it.",
    sw: ["#FBF8F6", "#193955", "#E83687", "#51B9C6"] },
  { n: "3", slug: "06-od-doodle", name: "A note from Amber",
    blurb: "Hand-drawn doodles in teal and pink, taped photos and a notebook-style quote form.",
    sw: ["#FFFFFF", "#51B9C6", "#F47CB7", "#193955"] },
  { n: "4", slug: "07-uipro-claymorphism", name: "Soft clay",
    blurb: "Puffy pastel panels with a clay-style bucket like the one in the logo.",
    sw: ["#FCE8F1", "#51B9C6", "#E83687", "#193955"] },
  { n: "5", slug: "10-taste-founders-letter", name: "The letter",
    blurb: "Written as a letter from Amber, signed “Talk soon.”",
    sw: ["#F3F1EC", "#193955", "#CC095D", "#51B9C6"] },
];

function cardHTML(s) {
  const href = `sites/${s.slug}/index.html`;
  const sw = s.sw.map(c => `<span style="background:${c}"></span>`).join("");
  const label = s.tag ? `<span class="tag${s.tag === "Refreshed" ? " after" : ""}">${s.tag}</span>` : `<span class="num">${s.n}</span>`;
  return `<article class="card" id="s-${s.slug.slice(0, 2)}">
    <a class="stage" href="${href}" aria-label="Open ${s.name}">
      <img class="desk" src="thumbs/${s.slug}-desk.webp" alt="" loading="lazy" width="1000" height="625">
      <img class="phone" src="thumbs/${s.slug}-phone.webp" alt="" loading="lazy" width="300" height="649">
    </a>
    <div class="swatches" aria-hidden="true">${sw}</div>
    <div class="body">
      <div class="row">${label}<h3>${s.name}</h3></div>
      <p>${s.blurb}</p>
      <div class="actions"><a class="open" href="${href}">Open the site</a><button type="button" class="phone-open" data-path="${href}" data-title="${s.name}">Phone preview</button></div>
    </div>
  </article>`;
}

const shelves = document.getElementById("shelves");
shelves.innerHTML = `<section class="section" aria-labelledby="h-pair"><h2 id="h-pair">Refresh</h2>
  <div class="pair">${PAIR.map(cardHTML).join("")}</div></section>
  <section class="section" aria-labelledby="h-looks"><h2 id="h-looks">New designs</h2>
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

// Coming back from a site lands on its card (#s-NN); the cards are drawn by script, so scroll after render.
if (/^#s-\d\d$/.test(location.hash)) {
  const card = document.getElementById(location.hash.slice(1));
  if (card) card.scrollIntoView({ block: "center" });
}
