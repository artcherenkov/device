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
