document.getElementById("year").textContent = new Date().getFullYear();

  // service links preselect the cleaning type
  const typeSelect = document.getElementById("f-type");
  document.querySelectorAll("[data-type]").forEach(function (link) {
    link.addEventListener("click", function () { typeSelect.value = link.dataset.type; typeSelect.dispatchEvent(new Event('input', {bubbles: true})); });
  });

  const form = document.getElementById("quote-form");
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
