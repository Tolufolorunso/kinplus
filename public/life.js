const button = document.getElementById('mainButton');
const registerBtn = document.querySelector('.register');
const form = document.querySelector('#mainButton');
const closeBtn = document.querySelector('.close-button');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const btns = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const alert = document.querySelector('#alert');
const alertP = document.querySelector('#alert-p');

if (alertP.textContent !== '') {
  alert.style.opacity = 1;
  setTimeout(function () {
    alert.style.opacity = 0;
    alertP.textContent = '';
  }, 2000);
}

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

// Slider

let sliderImages = document.querySelectorAll('.slide');
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');

let current = 0;

// clear images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
}

function startslide() {
  reset();
  sliderImages[0].style.display = 'block';
}

//show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  current--;
}

arrowLeft.addEventListener('click', function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

//show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  current++;
}

arrowRight.addEventListener('click', function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startslide();
