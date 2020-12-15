(function () {
  /**
   * Инициализирует слайдер
   *
   * @param {string} activeSlideClass
   * @param {string} activeControlClass
   * @param {Node} slider - контейнер, содержащий контролы слайдера и сами слайды
   * @param {NodeList} controls - список DOM-элементов контролов
   * @param {NodeList} slides - список DOM-элементов слайдов
   * @param {boolean} isServices - указывает на тип слайдера
   */
  window.initSlider = (activeSlideClass, activeControlClass, slider, controls, slides, isServices = false) => {
    const changeActiveControl = (from, to) => {
      isServices
        ? from.parentNode.classList.remove(activeControlClass)
        : from.classList.remove(activeControlClass);
      from = to;
      isServices
        ? from.parentNode.classList.add(activeControlClass)
        : from.classList.add(activeControlClass);

      return from;
    }
    const changeActiveSlide = (from, to) => {
      from.classList.remove(activeSlideClass);
      from = to;
      from.classList.add(activeSlideClass);

      return from;
    }

    let activeSlideToggle = controls[0];
    let activeSlide = slides[0];

    const handleControlClick = (evt) => {
      evt.preventDefault();

      activeSlideToggle = changeActiveControl(activeSlideToggle, evt.target);

      controlToSlides.map((value) => {
        if (activeSlideToggle === value.control) {
          activeSlide = changeActiveSlide(activeSlide, value.slide);
        }
      });
    }

    let controlToSlides = [];
    for (let i = 0; i < controls.length; i++) {
      controlToSlides.push({
        control: controls[i],
        slide: slides[i]
      });
    }

    for (let control of controls) {
      control.addEventListener(`click`, handleControlClick, true)
    }
  }
})();

(function () {
  const catalogMenu = document.querySelector(`.catalog-menu`);
  const catalogMenuRollupBtn = document.querySelector(`.page-header__catalog-rollup-btn`);

  catalogMenuRollupBtn.addEventListener(`click`, () => {
    catalogMenu.classList.toggle(`visually-hidden`);
  });
})();

(function () {
  const input = document.querySelector(`.page-header__search-input`);

  input.addEventListener(`input`, () => {
    const value = input.value;
    if (value) {
      input.classList.add(`page-header__search-input--with-content`);
    } else {
      input.classList.remove(`page-header__search-input--with-content`);
    }
  });
})();

(function () {
  const OPEN_POPUP_CLASS = `popup--opened`;
  const openPopupBtn = document.querySelector(`.page-main__contact-map-btn`);

  const mapPopup = document.querySelector(`.map.popup`);
  const closePopupBtn = mapPopup.querySelector(`.popup__close-btn`);

  const handleOpenPopupBtnClick = (evt) => {
    evt.preventDefault();
    mapPopup.classList.add(OPEN_POPUP_CLASS);
    closePopupBtn.addEventListener(`click`, handleClosePopupBtnClick);
    window.addEventListener(`keydown`, handleEscKeydown);
  }

  const handleClosePopupBtnClick = () => {
    mapPopup.classList.remove(OPEN_POPUP_CLASS);
  }

  const handleEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      if (mapPopup.classList.contains(OPEN_POPUP_CLASS)) {
        evt.preventDefault();
        mapPopup.classList.remove(OPEN_POPUP_CLASS);
        window.removeEventListener(`keydown`, handleEscKeydown);
      }
    }
  }

  openPopupBtn.addEventListener(`click`, handleOpenPopupBtnClick);
})();

(function () {
  const OPEN_POPUP_CLASS = `popup--opened`;
  const INPUT_ERROR_CLASS = `popup__input--error`;

  const openPopupBtn = document.querySelector(`.page-main__contact-more`);
  const popup = document.querySelector(`.popup`);
  const popupForm = popup.querySelector(`.popup form`);
  const closePopupBtn = popup.querySelector(`.popup__close-btn`);

  const popupInputs = popupForm.querySelectorAll(`.popup__input`);

  let errors = [];

  const createErrorMessage = () => {
    const span = document.createElement(`span`);
    span.textContent = `Тут пусто :(`;
    span.classList.add(`popup__error-message`);

    return span;
  }

  const clearErrors = ({input = null, fullRemove = false}) => {
    if (errors) {
      errors = errors.filter((error) => {
        if (fullRemove ? true : error.input === input) {
          resetDomError(error.error, error.input);
        }
        return fullRemove ? false : error.input !== input;
      });
    }
  }

  const resetDomError = (error, input) => {
    error.remove();
    input.classList.remove(INPUT_ERROR_CLASS);
  }

  const setError = (input) => {
    const error = createErrorMessage();
    errors.push({
      input,
      error
    });
    input.parentNode.appendChild(error);
    input.classList.add(INPUT_ERROR_CLASS);
  }

  const handleOpenPopupBtnClick = (evt) => {
    evt.preventDefault();
    popupForm.reset();
    popup.classList.add(OPEN_POPUP_CLASS);
    closePopupBtn.addEventListener(`click`, handleClosePopupBtnClick);
    window.addEventListener(`keydown`, handleEscKeydown);
  }

  const handleClosePopupBtnClick = () => {
    popup.classList.remove(OPEN_POPUP_CLASS);
    popup.classList.remove(`popup--error`);
    popupForm.reset();
    clearErrors({fullRemove: true});
  }

  const handleEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      if (popup.classList.contains(OPEN_POPUP_CLASS)) {
        evt.preventDefault();
        popup.classList.remove(OPEN_POPUP_CLASS);
        window.removeEventListener(`keydown`, handleEscKeydown);
      }
    }
  }

  const handleFormSubmit = (evt) => {
    const isValid = checkFormValidity();
    if (isValid) {
      evt.preventDefault();
    }
  }

  const checkFormValidity = () => {
    clearErrors({fullRemove: true});
    for (let input of popupInputs) {
      if (!input.value) {
        setError(input);
      }
    }
    if (Boolean(errors.length)) {
      popup.classList.add(`popup--error`);
    }
    return Boolean(errors.length);
  }

  const handleInput = (input) => {
    return () => {
      clearErrors({input});
      input.classList.remove(INPUT_ERROR_CLASS);
      if (!input.value) {
        setError(input);
      }
    }
  }

  popupForm.addEventListener(`submit`, handleFormSubmit);
  for (let input of popupInputs) {
    input.required = false;
    input.addEventListener(`input`, handleInput(input));
  }
  openPopupBtn.addEventListener(`click`, handleOpenPopupBtnClick);
})();

(function () {
  const productControls = document.querySelectorAll(`.page-main__product-controls`);
  const productImages = document.querySelectorAll(`.page-main__product-image`);

  let visibility = false;

  const setVisible = (evt) => {
    if (evt.keyCode === 9) {
      if (!visibility) {
        Array.from(productControls).map((control) => control.style = `visibility: visible`);
        Array.from(productImages).map((image) => image.style = `opacity: 0.7`);
      }
      visibility = true;
    }
  }

  const resetVisible = () => {
    if (visibility) {
      Array.from(productControls).map((control) => control.style = `visibility: hidden`);
      Array.from(productImages).map((image) => image.style = ``);
      Array.from(productControls).map((control) => control.style = ``);
    }
    visibility = false;
  }

  document.addEventListener(`keydown`, setVisible);
  document.addEventListener(`mouseover`, resetVisible);
})();

(function () {
  const slider = document.querySelector(`.page-main__slider`);
  const controls = slider.querySelectorAll(`.page-main__slider-toggle`);
  const slides = slider.querySelectorAll(`.slide`);

  window.initSlider(
    `slide--active`,
    `page-main__slider-toggle--active`,
    slider,
    controls,
    slides
  )
})();

(function () {
  const slider = document.querySelector(`.page-main__services-wrapper`);
  const controls = slider.querySelectorAll(`.page-main__services-item a`);
  const slides = slider.querySelectorAll(`.page-main__services-body`);

  window.initSlider(`page-main__services-body--active`, `page-main__services-item--active`, slider, controls, slides, true);
})();
