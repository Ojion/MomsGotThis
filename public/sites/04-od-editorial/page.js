document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('quote-form');
const emptyMessages = {
  'q-name': 'Add your name so I know who is texting.',
  'q-area': 'Add your city or neighborhood.'
};
const required = form.querySelectorAll('[required]');

function check(field) {
  const value = field.value.trim();
  let message = '';
  if (field.id === 'q-phone') {
    const digits = value.replace(/\D/g, '').length;
    if (!value) message = 'Add a phone number I can text back.';
    else if (digits < 10) message = 'That number looks short. Include the area code.';
  } else if (!value) {
    message = emptyMessages[field.id];
  }
  document.getElementById(field.id + '-error').textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  return !message;
}

// Validate on first blur after typing, then live while an error is showing
for (const field of required) {
  field.addEventListener('blur', () => {
    if (field.value) field.dataset.touched = 'yes';
    if (field.dataset.touched) check(field);
  });
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') check(field);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstBad = null;
  for (const field of required) {
    if (!check(field) && !firstBad) firstBad = field;
  }
  if (firstBad) {
    firstBad.focus();
    return;
  }
  const get = (id) => document.getElementById(id).value.trim();
  const message = `Hi Amber! I'd like a free cleaning quote.
Name: ${get('q-name')}
Phone: ${get('q-phone')}
Area: ${get('q-area')}
Cleaning type: ${get('q-type')}
Home size and needs: ${get('q-details')}`;
  handOffQuote(message, event);
});
