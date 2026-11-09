/* The artifact viewer carries the gallery's scroll into the page it opens; start every site at the top
   like a fresh load, and stop nudging as soon as the visitor scrolls or touches anything. */
(function () {
  // Inside the gallery's phone preview the chip would navigate the little frame; hide it there.
  try { if (window.parent !== window && window.parent.document.getElementById("phone-preview")) document.getElementById("mgt-back").hidden = true; } catch (e) {}
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  var touched = false;
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ev) {
    addEventListener(ev, function () { touched = true; }, { passive: true, once: true });
  });
  function top() {
    if (touched || location.hash) return;
    window.scrollTo(0, 0);
    try { document.documentElement.scrollIntoView({ block: "start" }); } catch (e) {}
  }
  top();
  addEventListener("DOMContentLoaded", top);
  addEventListener("load", function () { top(); setTimeout(top, 120); setTimeout(top, 450); });
  addEventListener("pageshow", function (e) { if (!e.persisted) top(); });
})();
