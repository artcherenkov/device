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
