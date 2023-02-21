const burgerBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.menu__item');
const galleryItems = document.querySelectorAll('.design__item');
const slider = document.querySelector('.slider');
const sliderCloseBtn = document.querySelector('.slider__close');
const sliderImg = document.querySelector('.slider__img');
const sliderCounter = document.querySelector('.slider__counter');
const sliderText = document.querySelector('.slider__text');
const sliderNextBtn = document.querySelector('.slider__rightBtn');
const sliderPrevBtn = document.querySelector('.slider__leftBtn');

// взаимодействие с бургером
burgerBtn.addEventListener('click', () => {
  header.classList.toggle('header--opened');
  if (header.classList.contains('header--opened')) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflow = 'visible';
  }
});
//
// взаимодействие с мобильным меню
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('header--opened');
    document.querySelector('body').style.overflow = 'visible';
  })
});
//
// отслеживание позиции для запуска анимации элементов
const observer = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      const className = entry.target.dataset.class;
      entry.target.classList.add(className);
    }
  });
});
const animated = document.querySelectorAll('.js-animated');
animated.forEach((a) => observer.observe(a));
//
let currentSlideIndex = 0;
let slideAction = false;

sliderCloseBtn.addEventListener('click', () => {
  slider.classList.add('hide');
  document.querySelector('body').style.overflow = 'visible';
});

galleryItems.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    currentSlideIndex = i;
    loadSlide(e.currentTarget);
  });
});

sliderNextBtn.addEventListener('click', () => {
  changeSlide(1);
});

sliderPrevBtn.addEventListener('click', () => {
  changeSlide(-1);
});

function loadSlide(obj) {
  const currentSrc = obj.querySelector('img').src;
  const text = obj.querySelector('.design__text').textContent;
  sliderCounter.textContent = `${currentSlideIndex + 1} / ${galleryItems.length}`;
  sliderImg.src = currentSrc;
  sliderImg.alt = text;
  sliderText.textContent = text;
  slider.classList.remove('hide');
  document.querySelector('body').style.overflow = 'hidden';
}

function changeSlide(ind) {
  if (slideAction) return;
  slideAction = true;
  currentSlideIndex = currentSlideIndex + ind;
  if (currentSlideIndex < 0) {
    currentSlideIndex = galleryItems.length - 1;
  }
  if (currentSlideIndex === galleryItems.length) {
    currentSlideIndex = 0;
  }
  sliderImg.classList.add('slider__img--animated');
  setTimeout(() => {
    loadSlide(galleryItems[currentSlideIndex]);
    sliderImg.classList.remove('slider__img--animated');
  }, 300);
  setTimeout(() => slideAction = false, 600);
}
