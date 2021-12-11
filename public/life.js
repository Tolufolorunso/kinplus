const button = document.getElementById('mainButton');
const registerBtn = document.querySelector('.register');
const form = document.querySelector('#mainButton');
const closeBtn = document.querySelector('.close-button');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const btns = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

let close = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

registerBtn.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

closeModal.addEventListener('click', close);

overlay.addEventListener('click', close);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    close();
  }
});
