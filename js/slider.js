const ACTIVE_SLIDE_CLASS = `slide--active`;
const ACTIVE_CONTROL_CLASS = `page-main__slider-toggle--active`;

const slider = document.querySelector(`.page-main__slider`);
const controls = slider.querySelectorAll(`.page-main__slider-toggle`);
const slides = slider.querySelectorAll(`.slide`);

let activeSlideToggle = controls[0];
let activeSlide = slides[0];

const handleControlClick = (evt) => {
  activeSlideToggle.classList.remove(ACTIVE_CONTROL_CLASS);
  activeSlideToggle = evt.target;

  activeSlideToggle.classList.add(ACTIVE_CONTROL_CLASS);
  activeSlide.classList.remove(ACTIVE_SLIDE_CLASS);

  controlToSlides.map((value) => {
    if (activeSlideToggle === value.control) {
      activeSlide = value.slide;
      activeSlide.classList.add(ACTIVE_SLIDE_CLASS);
    }
  })
}

let controlToSlides = [];
for (let i = 0; i < controls.length; i++) {
  controlToSlides.push({
    control: controls[i],
    slide: slides[i]
  });
}

for (let control of controls) {
  control.addEventListener(`click`, handleControlClick)
}
