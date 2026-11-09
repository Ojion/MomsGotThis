'use strict';

const preview = document.getElementById('phone-preview');
const frame = document.getElementById('phone-site');
const title = document.getElementById('phone-title');
const full = document.getElementById('preview-full');

document.getElementById('close-preview').addEventListener('click', () => preview.close());
preview.addEventListener('close', () => frame.removeAttribute('src'));

document.getElementById('shelves').addEventListener('click', event => {
  const button = event.target.closest('.phone-open');
  if (!button) return;

  title.textContent = button.dataset.title + ' · Phone preview';
  frame.title = title.textContent;
  full.href = button.dataset.path;
  frame.src = button.dataset.path;
  preview.showModal();
});

const card = document.getElementById(location.hash.slice(1));
if (card && card.matches('.card')) card.scrollIntoView({block: 'center'});
