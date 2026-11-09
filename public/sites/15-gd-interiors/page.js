document.getElementById("year").textContent = new Date().getFullYear();

  const track = document.getElementById("track");
  document.querySelectorAll(".arrows button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollBy({ left: Number(btn.dataset.dir) * track.clientWidth * 0.8, behavior: smooth ? "smooth" : "auto" });
    });
  });

  const form = document.getElementById("quote-form");
  document.querySelectorAll("[data-type]").forEach(function (link) {
    link.addEventListener("click", function () { form.elements.type.value = link.dataset.type; form.elements.type.dispatchEvent(new Event('input', {bubbles: true})); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const f = form.elements;
    const lines = [
      "Hi Amber! I'd like a free cleaning quote.",
      "Name: " + f.name.value.trim(),
      "Phone: " + f.phone.value.trim(),
      "City/neighborhood: " + (f.city.value.trim() || "-"),
      "Cleaning type: " + f.type.value,
      "Home size & needs: " + (f.needs.value.trim() || "-")
    ];
    handOffQuote(lines.join("\n"), e);
  });
