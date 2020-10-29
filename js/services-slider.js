(function () {
  const slider = document.querySelector(`.page-main__services-wrapper`);
  const controls = slider.querySelectorAll(`.page-main__services-item a`);
  const slides = slider.querySelectorAll(`.page-main__services-body`);

  window.initSlider(`page-main__services-body--active`, `page-main__services-item--active`, slider, controls, slides, true);
})();
