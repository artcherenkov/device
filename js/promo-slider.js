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
