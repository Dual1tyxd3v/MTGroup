const burgerBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.menu__item');
const galleryItems = document.querySelectorAll('.design__item');
const slider = document.querySelector('.slider');
const sliderCloseBtn = document.querySelectorAll('.slider__close');
const sliderImg = document.querySelector('.slider__img');
const sliderCounter = document.querySelector('.slider__counter');
const sliderText = document.querySelector('.slider__text');
const sliderNextBtn = document.querySelector('.slider__rightBtn');
const sliderPrevBtn = document.querySelector('.slider__leftBtn');
const nameField = document.querySelector('#name');
const phoneField = document.querySelector('#phone');
const messageField = document.querySelector('textarea');
const inputs = document.querySelectorAll('input[name="phone"]');
const forms = document.querySelectorAll('form');
const modal = document.querySelector('.modal');
const modalBtns = document.querySelectorAll('.js-modal');
const buttonScrollUp = document.querySelector('.scrollUp');
const policyBtn = document.querySelector('.footer__text--policy');
const policyWindow = document.querySelector('.policy');

const PHONE_SCHEME = '+7-___-___-__-__';
let currentPos = 3;
let currentValue = '';

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
// слайдер
let currentSlideIndex = 0;
let slideAction = false;

sliderCloseBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.parentElement.classList.add('hide');
    document.querySelector('body').style.overflow = 'visible';
  });
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
// --загрузка слайдов
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
// --смена слайдов
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

let touchSlider = null;

sliderImg.addEventListener('touchstart', (e) => {
  touchSlider = e.touches[0].clientX;
}, {passive: true});
sliderImg.addEventListener('touchend', (e) => {
  if (touchSlider - e.changedTouches[0].clientX === 0) return;
  touchSlider = (touchSlider - e.changedTouches[0].clientX) > 0
    ? 1 : -1;
    changeSlide(touchSlider);
}, {passive: true});
//
// изменение стилистики обязательных полей формы
nameField.addEventListener('blur', (e) => {
  nameField.setAttribute('required', true);
});
phoneField.addEventListener('blur', (e) => {
  phoneField.setAttribute('required', true);
});
//
// обработка инпута в форме
inputs.forEach((input) => {
  input.addEventListener('focus', (e) => {
    if (e.target.value.length === 0) {
      e.target.value = PHONE_SCHEME;
      setTimeout(() => {
        e.target.selectionStart = 3;
        e.target.selectionEnd = 3;
      }, 1);
    }
    currentValue = e.target.value;
  });

  input.addEventListener('click', (e) => {
    if (e.target.value === PHONE_SCHEME) return;
    currentPos = getCursorPosition(e.target);
  });

  input.addEventListener('input', (e) => {
    currentPos = e.target.value === PHONE_SCHEME
      ? 3 : getCursorPosition(e.target) - 1;
    const letter = e.target.value[currentPos];
    if (letter.match(/\D/g)) {
      e.target.value = currentValue;
      setTimeout(() => {
        e.target.selectionStart = currentPos;
        e.target.selectionEnd = currentPos;
      }, 1);
      return;
    }
    if (e.target.value.length < currentValue.length) {
      currentPos++;
      currentPos < 3 ? currentPos = 3 : null;
      if (currentValue[currentPos] === '-') currentPos--;
      currentValue = (currentValue.slice(0, currentPos) + '_' + currentValue.slice(currentPos + 1)).slice(0, 16);
      e.target.value = currentValue;
      setTimeout(() => {
        e.target.selectionStart = currentPos;
        e.target.selectionEnd = currentPos;
      }, 1);
      return;
    }
    if (currentValue[currentPos] === '-') currentPos++;
    currentValue = (currentValue.slice(0, currentPos) + letter + currentValue.slice(currentPos + 1)).slice(0, 16);
    currentPos === 16 ? null : currentPos++;
    setTimeout(() => {
      e.target.selectionStart = currentPos;
      e.target.selectionEnd = currentPos;
    }, 1);
    e.target.value = currentValue;
  });

  input.addEventListener('blur', (e) => {
    e.target.value = e.target.value === PHONE_SCHEME
      ? ''
      : e.target.value;
  });
});

function getCursorPosition(ctrl) {
  let CaretPos = 0;
  if (document.selection) {
    ctrl.focus();
    const Sel = document.selection.createRange();
    Sel.moveStart('character', -ctrl.value.length);
    CaretPos = Sel.text.length;
  } else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
    CaretPos = ctrl.selectionStart;
  }
  return CaretPos;
}
//
// отправка формы
forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('sending')

    const currentForm = e.target;
    const phone = currentForm.querySelector('input[name=phone]');
    const name = currentForm.querySelector('input[name="name"]');
    const message = currentForm.querySelector('textarea');
    const status = currentForm.querySelector('.form__status');

    if (!phone.value || phone.value.includes('_')) {
      form.querySelector('input[name="phone"]').focus();
      return;
    }
    if (!name.value) {
      name.focus();
      return;
    }

    phone.value = phone.value.replace(/\D/g, '');
    const data = new FormData(currentForm);
    currentForm.dataset.location
      ? data.set('location', currentForm.dataset.location)
      : null;

    currentForm.querySelector('input[type="submit"]').setAttribute('disabled', true);
    await fetch('./js/send.php', {
      method: 'POST', body: data
    })
      .then(res => {
        if (res.ok) {
          currentForm.querySelector('input[type="submit"]').removeAttribute('disabled');
          status.textContent = 'Сообщение отправленно';
          setTimeout(() => status.textContent = ``, 2000);
          currentForm.reset();
        } else {
          status.textContent = 'Ошибка отправки';
          setTimeout(() => status.textContent = ``, 2000);
        }
      })
      .catch(e => console.log(e.message));
  });
});
//
// отображение модального окна
modalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelector('body').style.overflow = 'hidden';
    e.target.dataset.location
      ? modal.querySelector('form').dataset.location = e.target.dataset.location
      : modal.querySelector('form').dataset.location = '';
    modal.classList.toggle('hide');
  });
});
//
// показ кнопки Наверх
let timer = null;
window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) return;
  buttonScrollUp.classList.remove('hide');
  clearTimeout(timer);

  timer = setTimeout(() => buttonScrollUp.classList.add('hide'), 2000);
});
//
buttonScrollUp.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

policyBtn.addEventListener('click', (e) => {
  e.preventDefault();

  policyWindow.classList.remove('hide');
  document.querySelector('body').style.overflow = 'hidden';
});
