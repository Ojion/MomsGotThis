'use strict';

function handOffQuote(message, event) {
  const draft = document.getElementById('quote-draft');
  const text = document.getElementById('quote-draft-text');
  const email = event.submitter?.classList.contains('quote-fallback');

  draft.querySelector('label').textContent = email ? 'Sample quote email' : 'Sample quote text';
  text.value = message;
  draft.querySelector('.quote-draft-status').textContent = 'This is a sample. Nothing was sent.';
  draft.hidden = false;
  event.currentTarget.querySelector('.quote-fallback')?.setAttribute('aria-expanded', 'true');
  text.focus();
}

const previewForm = document.querySelector('form');
const previewDraft = document.getElementById('quote-draft');
const previewDraftText = document.getElementById('quote-draft-text');
const previewDraftStatus = previewDraft.querySelector('.quote-draft-status');

previewForm.addEventListener('input', event => {
  if (previewDraft.contains(event.target)) return;
  previewDraft.hidden = true;
  previewDraftText.value = '';
  previewDraftStatus.textContent = '';
  previewForm.querySelector('.quote-fallback')?.setAttribute('aria-expanded', 'false');
});

previewDraft.querySelector('.quote-copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(previewDraftText.value);
    previewDraftStatus.textContent = 'Sample draft copied.';
  } catch {
    previewDraftText.focus();
    previewDraftText.select();
    previewDraftStatus.textContent = 'The draft is selected. Use your device’s Copy command.';
  }
});

const previewBar = document.getElementById('design-preview');
if (previewBar.classList.contains('mgt-preview-fixed')) {
  document.documentElement.classList.add('mgt-preview-offset');
}
if (window.top !== window.self) {
  previewBar.querySelector('.mgt-preview-back').hidden = true;
}

const contactDialog = document.createElement('dialog');
contactDialog.className = 'mgt-contact-dialog';
contactDialog.setAttribute('aria-labelledby', 'mgt-contact-title');
contactDialog.innerHTML = '<h2 id="mgt-contact-title">Contact preview</h2><p>These buttons demonstrate how customers could reach me when the site launches. This preview keeps you here.</p><button type="button" autofocus>Back to the design</button>';
contactDialog.querySelector('button').addEventListener('click', () => contactDialog.close());
document.body.append(contactDialog);

document.addEventListener('click', event => {
  if (!event.target.closest('[data-preview-contact]')) return;
  event.preventDefault();
  if (!contactDialog.open) contactDialog.showModal();
});
