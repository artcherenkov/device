const openPopupBtn = document.querySelector(`.page-main__contact-more`);
const popup = document.querySelector(`.popup`);
const popupForm = popup.querySelector(`.popup form`);
const closePopupBtn = popup.querySelector(`.popup__close-btn`);

const inputs = popup.querySelectorAll(`.popup__input-wrapper input`);

const OPEN_POPUP_CLASS = `popup--opened`;

const handleOpenPopupBtnClick = (evt) => {
  evt.preventDefault();
  popupForm.reset();
  popup.classList.add(OPEN_POPUP_CLASS);
  closePopupBtn.addEventListener(`click`, handleClosePopupBtnClick);
}

const handleClosePopupBtnClick = () => {
  popup.classList.remove(OPEN_POPUP_CLASS);
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

openPopupBtn.addEventListener(`click`, handleOpenPopupBtnClick);
window.addEventListener("keydown", handleEscKeydown);
