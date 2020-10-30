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
