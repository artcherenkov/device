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
  const catalogMenu = document.querySelector(`.catalog-menu`);
  const catalogMenuRollupBtn = document.querySelector(`.page-header__catalog-rollup-btn`);

  catalogMenuRollupBtn.addEventListener(`click`, () => {
    catalogMenu.classList.toggle(`visually-hidden`);
  });
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
