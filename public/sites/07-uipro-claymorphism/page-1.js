document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("quote-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstProblem = null;
    for (const id of ["q-name", "q-city"]) {
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
    const phone = data.get("phone").trim();
    const lines = [
      "Hi Amber! I'd like a free cleaning quote.",
      `Name: ${data.get("name").trim()}`,
      `City/neighborhood: ${data.get("city").trim()}`,
      `Cleaning type: ${data.get("type") || "Not sure yet"}`,
      `Home size & needs: ${data.get("needs").trim() || "-"}`
    ];
    if (phone) {
      lines.splice(2, 0, `Phone: ${phone}`);
    }
    const message = lines.join("\n");
    window.location.href = "sms:+18167154322?body=" + encodeURIComponent(message);
  });
