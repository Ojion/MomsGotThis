document.getElementById("year").textContent = new Date().getFullYear();

// To-do list: tick items off; the house item replays its strike and hand-off note
const house = document.getElementById("house");
const gotit = document.getElementById("gotit");
for (const btn of document.querySelectorAll(".todo button")) {
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!on));
    if (btn === house) {
      // after the first click the load animation hands over to plain transitions
      house.classList.remove("play");
      gotit.classList.remove("play");
      gotit.classList.toggle("show", !on);
    }
  });
}

// Service ticks draw in as each row scrolls into view
const rows = document.querySelectorAll(".chores li");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("seen"); io.unobserve(e.target); }
    }
  }, { threshold: 0.6 });
  for (const r of rows) io.observe(r);
}

// Quote form -> prefilled text message
const form = document.getElementById("quote-form");
const status = document.getElementById("status");
form.addEventListener("submit", e => {
  e.preventDefault();
  // form.name is the form's own name attribute, so go through .elements
  const f = form.elements;
  const name = f["name"].value.trim();
  const phone = f["phone"].value.trim();
  if (!name) {
    status.textContent = "I'll need your name first.";
    f["name"].focus();
    return;
  }
  const kind = form.querySelector("input[name=kind]:checked");
  const message = "Hi Amber! I'd like a free cleaning quote.\n" +
    `Name: ${name}\n` +
    (phone ? `Phone: ${phone}\n` : "") +
    `City/neighborhood: ${f["area"].value.trim() || "-"}\n` +
    `Cleaning type: ${kind ? kind.value : "-"}\n` +
    `Home size & needs: ${f["home"].value.trim() || "-"}`;
  status.textContent = "Your note is waiting in your texting app. Hit send and I'll text you back.";
  window.location.href = "sms:+18167154322?body=" + encodeURIComponent(message);
});
