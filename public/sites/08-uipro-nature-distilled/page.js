document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("quote-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstProblem = null;
    for (const id of ["q-name", "q-phone", "q-city"]) {
      const input = document.getElementById(id);
      const missing = input.value.trim() === "";
      input.setAttribute("aria-invalid", missing ? "true" : "false");
      document.getElementById(id + "-err").hidden = !missing;
      if (missing && !firstProblem) {
        firstProblem = input;
      }
    }
    if (firstProblem) {
      firstProblem.focus();
      return;
    }
    const data = new FormData(form);
    const message = [
      "Hi Amber, I'd like a free cleaning quote.",
      `Name: ${data.get("name").trim()}`,
      `Phone: ${data.get("phone").trim()}`,
      `City/neighborhood: ${data.get("city").trim()}`,
      `Cleaning type: ${data.get("type")}`,
      `Home size & needs: ${data.get("needs").trim() || "-"}`
    ].join("\n");
    handOffQuote(message, event);
  });
