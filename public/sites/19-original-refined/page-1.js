document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const v = id => document.getElementById(id).value;
  const msg = `Hi! I'd like a free cleaning quote.\nName: ${v('name')}${v('phone') ? `\nPhone: ${v('phone')}` : ''}\nArea: ${v('area')}\nService: ${v('service')}\nDetails: ${v('details')}`;
  window.location.href = 'sms:+18167154322?body=' + encodeURIComponent(msg);
});
