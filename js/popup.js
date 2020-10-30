(function () {
  const OPEN_POPUP_CLASS = `popup--opened`;
  const INPUR_ERROR_CLASS = `popup__input--error`;

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
    input.classList.remove(INPUR_ERROR_CLASS);
  }

  const setError = (input) => {
    const error = createErrorMessage();
    errors.push({
      input,
      error
    });
    input.parentNode.appendChild(error);
    input.classList.add(INPUR_ERROR_CLASS);
  }

  const handleOpenPopupBtnClick = (evt) => {
    evt.preventDefault();
    popupForm.reset();
    popup.classList.add(OPEN_POPUP_CLASS);
    closePopupBtn.addEventListener(`click`, handleClosePopupBtnClick);
  }

  const handleClosePopupBtnClick = () => {
    popup.classList.remove(OPEN_POPUP_CLASS);
    popupForm.reset();
    clearErrors({fullRemove: true});
  }

  const handleEscKeydown = (evt) => {
    if (evt.key === 27) {
      if (popup.classList.contains(OPEN_POPUP_CLASS)) {
        evt.preventDefault();
        popup.classList.remove(OPEN_POPUP_CLASS);
        window.removeEventListener(`keydown`, handleEscKeydown);
      }
    }
  }

  const handleFormSubmit = (evt) => {
    if (checkFormValidity()) {
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
    return Boolean(errors.length);
  }

  const handleInput = (input) => {
    return () => {
      clearErrors({input});
      input.classList.remove(INPUR_ERROR_CLASS);
      if (!input.value) {
        setError(input);
      }
    }
  }

  popupForm.addEventListener(`submit`, handleFormSubmit);
  for (let input of popupInputs) {
    input.addEventListener(`input`, handleInput(input));
  }
  openPopupBtn.addEventListener(`click`, handleOpenPopupBtnClick);
  window.addEventListener("keydown", handleEscKeydown);

})();
