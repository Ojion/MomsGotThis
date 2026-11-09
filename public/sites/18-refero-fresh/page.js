document.getElementById("year").textContent = new Date().getFullYear();

  const typeSelect = document.getElementById("q-type");
  document.querySelectorAll("[data-type]").forEach(function (link) {
    link.addEventListener("click", function () {
      typeSelect.value = link.dataset.type; typeSelect.dispatchEvent(new Event('input', {bubbles: true}));
    });
  });

  document.getElementById("quote-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const val = id => document.getElementById(id).value.trim();
    const message = [
      "Hi Amber! I'd like a free cleaning quote.",
      `Name: ${val("q-name")}`,
      `Phone: ${val("q-phone")}`,
      `City/neighborhood: ${val("q-city") || "-"}`,
      `Cleaning type: ${val("q-type")}`,
      `Home size & needs: ${val("q-needs") || "-"}`
    ].join("\n");
    handOffQuote(message, e);
  });
