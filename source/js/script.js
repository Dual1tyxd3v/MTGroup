const burgerBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.menu__item');
const galleryItems = document.querySelectorAll('.design__item');
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
const policyClose = document.querySelector('.policy__close');
const btnExpress = document.querySelector('.main__button--express');
const quizContainer = document.querySelector('.quiz');
const quizBlocks = document.querySelectorAll('.quiz__screen');
const btnNextQuiz = document.querySelector('.quiz__next');
const btnPrevQuiz = document.querySelector('.quiz__prev');
const quizBtns = document.querySelectorAll('.quiz__btn');
const quizTypeInput = document.querySelector('.quiz__type--input');
const quizStatus = document.querySelector('.quiz__status');
const quizResult = document.querySelector('.quiz__result');
const quizRulerCheckbox = document.querySelector('.quiz__checkbox');
const quizForm = document.querySelector('.quiz__form');
const quizBtnReset = document.querySelector('.quiz__btnNew');
const quizLengthInput = document.querySelector('#length');
const quizWidthInput = document.querySelector('#width');
const quizHeightInput = document.querySelector('#height');
const quizError = document.querySelector('.quiz__error');
const tabsContainer = document.querySelector('.about__tabs');
const tabs = document.querySelectorAll('.about__tab');
const tabsContent = document.querySelectorAll('.about__content');
const sliderBtnR = document.querySelector('.design__control--right');
const sliderBtnL = document.querySelector('.design__control--left');
const slider = document.querySelector('.design__slider');
const cardModal = document.querySelector('.card-info');
const cardBtnClose = document.querySelector('.card-info__close');
const cardTitle = document.querySelector('.card-info__title');
const cardText = document.querySelector('.card-info__text');
const cardSquare = document.querySelector('.card-info__value--square');
const cardTime = document.querySelector('.card-info__value--time');
const cardMainImage = document.querySelector('.card-info__img');
const cardGallery = document.querySelector('.card-info__imgs');
const cardBtnLeft = document.querySelector('.card-info__ctrl--left');
const cardBtnRight = document.querySelector('.card-info__ctrl--right');
const cardBtnPay = document.querySelector('.card-info__btn');
const modalClose = document.querySelector('.modal__close');

const PHONE_SCHEME = '+7-___-___-__-__';
let currentPos = 3;
let currentValue = '';
const YAM_ID = 93890524;

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
// slider
let OFFSET = document.querySelector('.card').getBoundingClientRect().width + 30;
const CARDS_COUNT = document.querySelectorAll('.design__card').length;
let LAST_SLIDE = 0;
const SLIDES_COUNT = window.innerWidth > 980
  ? CARDS_COUNT - 3 : window.innerWidth > 767 ? CARDS_COUNT - 2 : CARDS_COUNT - 1;

window.addEventListener('resize', () => {
  header.classList.remove('header--opened');
  document.body.style.overflow = 'auto';
  OFFSET = document.querySelector('.card').getBoundingClientRect().width + 30;
});

sliderBtnR.addEventListener('click', () => {
  changeSlide(1);
});
sliderBtnL.addEventListener('click', () => {
  changeSlide(-1);
});

function changeSlide(direction) {
  if ((direction === 1 && LAST_SLIDE === SLIDES_COUNT) || (direction === -1 && LAST_SLIDE === 0)) {
    return;
  }
  LAST_SLIDE += direction;
  slider.style.transform = `translateX(-${OFFSET * LAST_SLIDE}px)`;
  checkSlides();
}

function checkSlides() {
  sliderBtnR.style.display = 'block';
  sliderBtnL.style.display = 'block';
  if (LAST_SLIDE === SLIDES_COUNT) {
    sliderBtnR.style.display = 'none';
  }
  else if (LAST_SLIDE === 0) {
    sliderBtnL.style.display = 'none';
  }
}

let touchSlider = null;

slider.addEventListener('touchstart', (e) => {
  touchSlider = e.touches[0].clientX;
}, { passive: true });
slider.addEventListener('touchend', (e) => {
  if (touchSlider - e.changedTouches[0].clientX === 0) {
    return;
  }
  touchSlider = (touchSlider - e.changedTouches[0].clientX) > 0
    ? 1 : -1;
  changeSlide(touchSlider);
}, { passive: true });
//

// show card modal
let currentCardIndex = 0;
let cardsCount = 0;
let imgs = [];

cardBtnClose.addEventListener('click', () => closeCard());
cardModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-info') || e.target.classList.contains('card-info__main')) closeCard();
});

function closeCard() {
  cardModal.classList.add('hide');
  cardGallery.innerHTML = '';
  document.body.style.overflow = 'auto';
  imgs = [];
  currentCardIndex = 0;
  cardBtnLeft.style.display = 'block';
  cardBtnRight.style.display = 'block';
}

function changeImg(direction, index) {
  currentCardIndex = index >= 0 ? index : currentCardIndex + direction;
  if (currentCardIndex < 0) currentCardIndex = cardsCount;
  if (currentCardIndex > cardsCount) currentCardIndex = 0;

  imgs.forEach((img, i) => {
    img.classList.remove('card-info__img-small--active');
    if (i === currentCardIndex) img.classList.add('card-info__img-small--active');
  });

  cardMainImage.classList.remove('card-info__img--ready');
  setTimeout(() => {
    cardMainImage.src = imgs[currentCardIndex].src;
    cardMainImage.classList.add('card-info__img--ready');
  }, 200);
}

cardBtnLeft.addEventListener('click', () => changeImg(-1, -1));
cardBtnRight.addEventListener('click', () => changeImg(1, -1));
cardGallery.addEventListener('click', (e) => {
  if (!e.target.classList.contains('card-info__img-small')) return;

  changeImg(0, +e.target.dataset.index);
});

let cardTouchSlider = null;

cardMainImage.addEventListener('touchstart', (e) => {
  cardTouchSlider = e.touches[0].clientX;
}, { passive: true });
cardMainImage.addEventListener('touchend', (e) => {
  if (cardTouchSlider - e.changedTouches[0].clientX === 0) {
    return;
  }
  cardTouchSlider = (cardTouchSlider - e.changedTouches[0].clientX) > 0
    ? 1 : -1;
  changeImg(cardTouchSlider, -1);
}, { passive: true });

function renderCard(card) {
  document.body.style.overflow = 'hidden';

  cardTitle.textContent = card.querySelector('.card__name').textContent;
  cardText.textContent = card.querySelector('.card__description').textContent;
  cardTime.textContent = card.querySelector('.card__time').textContent;
  cardSquare.textContent = card.querySelector('.card__square').textContent;

  const titleImg = card.querySelector('.card__img').cloneNode(true);
  titleImg.classList.remove('card__img');
  const imgsData = [titleImg, ...card.querySelector('.card__gallery').querySelectorAll('img')];

  imgsData.forEach((img, i) => {
    const newImg = img.cloneNode(true);
    newImg.classList.add('card-info__img-small');
    newImg.setAttribute('alt', titleImg.alt);
    newImg.dataset.index = i;
    i === 0 && newImg.classList.add('card-info__img-small--active');
    cardGallery.append(newImg);
    imgs.push(newImg)
  });
  cardsCount = imgs.length - 1;
  cardMainImage.src = imgs[0].src;

  cardBtnPay.dataset.copy = `${cardTitle.textContent} (слайд ${card.dataset.index})`;

  cardModal.classList.remove('hide');
  if (imgs.length === 1) {
    cardBtnLeft.style.display = 'none';
    cardBtnRight.style.display = 'none';
  }
}

slider.addEventListener('click', (e) => {
  e.preventDefault();

  const card = e.target.closest('.design__card');
  renderCard(card);
});
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
/* inputs.forEach((input) => {
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
}); */

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
function renderStatusMessage(element, message) {
  element.textContent = message;
  setTimeout(() => element.textContent = ``, 2000);
}

function checkPhoneField(input) {
  const value = input.value.replace(/\+/g, '');
  if (value.length !== 11) return false;
  if (isNaN(value)) return false;
  if (value[0] !== '7' && value[0] !== '8') return false;
  return true;
}

forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentForm = e.target;
    const phone = currentForm.querySelector('input[name="phone"]');
    const name = currentForm.querySelector('input[name="name"]');
    const status = currentForm.querySelector('.form__status');

    if (form.classList.contains('quiz__form')) {
      if (currentQuiz === quizBlocks.length) checkInputs(document.querySelector(`[data-screen="${currentQuiz}"]`));
      if (checkRequired()) return;
    }

    if (!checkPhoneField(phone)) {
      form.querySelector('input[name="phone"]').focus();
      renderStatusMessage(status, 'Укажите корректный номер');
      return;
    }
    if (phone.value.replace(/\D/g, '').length !== 11) {
      phone.focus();
      phone.removeAttribute('value');
      phone.value = PHONE_SCHEME;
      renderStatusMessage(status, 'Укажите корректный номер');
      return;
    }
    if (!name.value) {
      name.focus();
      renderStatusMessage(status, 'Необходимо ввести имя');
      return;
    }

    phone.value = phone.value.replace(/\D/g, '');
    phone.value = phone.value[0] === '8' ? phone.value.replace('8', '7') : phone.value;

    const data = new FormData(currentForm);
    currentForm.dataset.location
      ? data.set('location', currentForm.dataset.location)
      : null;
    currentForm.dataset.copy
      ? data.set('copy', currentForm.dataset.copy) : null;

    currentForm.querySelector('input[type="submit"]').setAttribute('disabled', true);

    await fetch('./js/send.php', {
      method: 'POST', body: data
    })
      .then(res => {
        if (res.ok) {
          currentForm.querySelector('input[type="submit"]').removeAttribute('disabled');

          const formId = form.getAttribute('id');
          ym(YAM_ID, 'reachGoal', formId);

          status.textContent = 'Сообщение отправлено';
          quizStatus.textContent = 'Сообщение отправлено';
          setTimeout(() => status.textContent = ``, 2000);
        } else {
          status.textContent = 'Ошибка отправки';
          setTimeout(() => status.textContent = ``, 2000);
          quizStatus.textContent = 'Ошибка отправки. Попробуйте позже';
        }
        if (form.classList.contains('quiz__form')) {
          showQuizResult(form);
        }
      })
      .catch(e => console.log(e.message));
  });
});
//
// отображение модального окна
modalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.body.style.overflow = 'hidden';
    e.target.dataset.location
      ? modal.querySelector('form').dataset.location = e.target.dataset.location
      : modal.querySelector('form').dataset.location = '';

    e.target.dataset.copy
      ? modal.querySelector('form').dataset.copy = e.target.dataset.copy : null;
    modal.classList.toggle('hide');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hide');
  document.body.style.overflow = 'auto';
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
// окно с политикой
policyBtn.addEventListener('click', (e) => {
  e.preventDefault();

  policyWindow.classList.remove('hide');
  document.body.style.overflow = 'hidden';
});
policyClose.addEventListener('click', () => {
  policyWindow.classList.add('hide');
  document.body.style.overflow = 'auto';
});
//
//EXPRESS BUTTON SMOOTH SCROLL
btnExpress.addEventListener('click', (e) => {
  e.preventDefault();

  quizContainer.scrollIntoView({ behavior: 'smooth' });
});

// QUIZ MAP
ymaps.ready(init);
function init() {
  const mapSearch = document.querySelector('#suggest');
  var searchControl = new ymaps.control.SearchControl({
    options: {
      provider: 'yandex#search'
    }
  });

  var suggestView1 = new ymaps.SuggestView('suggest');
  var myPlacemark, myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 12,
    controls: []
  });
  myMap.controls.add(searchControl);

  myMap.events.add('click', function (e) {
    var coords = e.get('coords');

    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }

    else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);

      myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords, true);
  });

  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    });
  }

  function getAddress(coords, refresh = false) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords)
      .then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties
          .set({
            // Формируем строку с данными об объекте.
            iconCaption: [
              // Название населенного пункта или вышестоящее административно-территориальное образование.
              firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
              // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
            ].filter(Boolean).join(', '),
            // В качестве контента балуна задаем строку с адресом объекта.
            balloonContent: firstGeoObject.getAddressLine()
          });
      }).then(() => {
        if (refresh) {
          mapSearch.value = myPlacemark.properties._data.balloonContent;
          mapSearch.blur();
        }
      });
  }

  document.querySelector('.ymaps-2-1-79-controls-pane').style.display = 'none';

  mapSearch.addEventListener('change', function (e) {
    setTimeout(() => {
      searchControl.search(this.value);
      ymaps.geocode(this.value).then(res => {
        var firstGeoObject = res.geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();

        if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coords);
        }

        else {
          myPlacemark = createPlacemark(coords);
          myMap.geoObjects.add(myPlacemark);

          myPlacemark.events.add('dragend', function () {
            getAddress(myPlacemark.geometry.getCoordinates());
          });
        }
        getAddress(coords);
      });
    }, 200);
  })
}

// QUIZ
function renderControls() {
  btnNextQuiz.style.display = btnPrevQuiz.style.display = 'block';
  if (currentQuiz === 1) btnPrevQuiz.style.display = 'none';
  if (currentQuiz === quizBlocks.length) btnNextQuiz.style.display = 'none';
}

function changeQuizScreen(direction) {
  document.querySelector(`[data-screen="${currentQuiz}"]`).style.display = 'none';
  currentQuiz += direction;
  document.querySelector(`[data-screen="${currentQuiz}"]`).style.display = 'block';
}

function toggleScreen(e, direction) {
  e.currentTarget.blur();

  if (e.currentTarget.classList.contains('quiz__control')) {
    const container = document.querySelector(`[data-screen="${currentQuiz}"]`);
    checkInputs(container);
  }
  changeQuizScreen(direction);
  renderControls();
}

function showQuizResult(form) {
  form.style.display = 'none';
  quizResult.style.display = 'block';
}

quizBtnReset.addEventListener('click', () => {
  if (quizStatus.textContent === 'Сообщение отправлено') {
    quizForm.reset();
  }
  quizForm.style.display = 'block';
  quizForm.querySelectorAll('input').forEach(input => input.removeAttribute('disabled'));
  quizResult.style.display = 'none';
  initQuiz();
});

function checkInputs(container) {
  const inputs = container.querySelectorAll('input[required]');
  if (!inputs.length) return;

  let check = true;
  inputs.forEach(input => {
    if (input.value.length === 0) {
      container.setAttribute('data-filled', false);
      check = false;
    }
  });
  quizError.textContent = '';
  check && container.setAttribute('data-filled', true);
}

function checkRequired() {
  const emptyBlocks = document.querySelector('[data-filled="false"]');
  if (!emptyBlocks) return false;

  document.querySelector(`[data-screen="${currentQuiz}"]`).style.display = 'none';
  emptyBlocks.style.display = 'block';
  currentQuiz = +emptyBlocks.dataset.screen;
  renderControls();
  quizError.textContent = 'Необходимо заполнить все поля!'
  setTimeout(() => {
    quizError.textContent = '';
  }, 2000);
  return true;
}

let currentQuiz = 1;

function initQuiz() {
  quizBlocks.forEach((block, i) => {
    if (i === 0) {
      block.style.display = 'block';
    }
    else {
      block.style.display = 'none';
    }
  });

  currentQuiz = 1;

  renderControls();
}
initQuiz();

btnNextQuiz.addEventListener('click', (e) => toggleScreen(e, 1));

btnPrevQuiz.addEventListener('click', (e) => toggleScreen(e, -1));

quizForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('quiz__btn')
    || e.target.classList.contains('quiz__type--next')
    || (e.target.classList.contains('quiz__checkbox--js') && e.target.checked)) {
    e.target.closest('.quiz__screen').setAttribute('data-filled', true);
    quizError.textContent = '';
    toggleScreen(e, 1);
  }
});

quizTypeInput.addEventListener('input', (e) => {
  const screen = e.target.closest('.quiz__screen');
  screen.dataset.filled = e.target.value.length > 0 ? 'true' : 'false';
});

quizRulerCheckbox.addEventListener('change', (e) => {
  const inputs = e.target.closest('.quiz__answers').querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    quizRulerCheckbox.checked
      ? input.setAttribute('disabled', '1')
      : input.removeAttribute('disabled')
  });
});

// TABS
const ANIMATION_TIME = 500;

function switchTabs(index) {
  document.querySelector(`[data-content="${index}"]`).classList.toggle('about__content--hidden');
  tabsContainer.querySelector(`[data-tab="${index}"]`).classList.toggle('about__tab--active');
}

let currentTab = 1;

tabsContent.forEach((tab, i) => {
  if (i) tab.classList.add('about__content--hidden');
});

tabsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('about__tab') || +e.target.dataset.tab === currentTab) return;

  switchTabs(currentTab);
  currentTab = +e.target.dataset.tab;
  switchTabs(currentTab);
});
