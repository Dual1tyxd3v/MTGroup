const burgerBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.menu__item');
const galleryItems = document.querySelectorAll('.design__item');

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

galleryItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
  });
});
