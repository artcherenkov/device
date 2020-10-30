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
