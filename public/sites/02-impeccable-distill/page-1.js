document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quote-form");
const status = document.getElementById("status");
form.addEventListener("submit", e => {
  e.preventDefault();
  // form.name is the form's own name attribute, so go through .elements
  const f = form.elements;
  const name = f["name"].value.trim();
  const phone = f["phone"].value.trim();
  if (!name) {
    status.textContent = "Please add your name.";
    f["name"].focus();
    return;
  }
  const kind = form.querySelector("input[name=kind]:checked");
  const message = "Hi Amber, I'd like a cleaning quote.\n" +
    `Name: ${name}\n` +
    (phone ? `Phone: ${phone}\n` : "") +
    `City/neighborhood: ${f["area"].value.trim() || "-"}\n` +
    `Cleaning type: ${kind ? kind.value : "-"}\n` +
    `Home size & needs: ${f["home"].value.trim() || "-"}`;
  status.textContent = "Your message is ready in your texting app.";
  window.location.href = "sms:+18167154322?body=" + encodeURIComponent(message);
});
