document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quote-form");
const status = document.getElementById("status");
form.addEventListener("submit", e => {
  e.preventDefault();
  // form.name is the form's own name attribute, so go through .elements
  const f = form.elements;
  const name = f["name"].value.trim();
  const phone = f["phone"].value.trim();
  if (!name || !phone) {
    status.textContent = !name ? "Please add your name." : "Please add a phone number for the reply.";
    (!name ? f["name"] : f["phone"]).focus();
    return;
  }
  const kind = form.querySelector("input[name=kind]:checked");
  const message = "Hi Amber, I'd like a cleaning quote.\n" +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `City/neighborhood: ${f["area"].value.trim() || "-"}\n` +
    `Cleaning type: ${kind ? kind.value : "-"}\n` +
    `Home size & needs: ${f["home"].value.trim() || "-"}`;
  status.textContent = '';
  handOffQuote(message, e);
});
