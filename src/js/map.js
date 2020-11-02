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
