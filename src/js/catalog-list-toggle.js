(function () {
  const catalogMenu = document.querySelector(`.catalog-menu`);
  const catalogMenuRollupBtn = document.querySelector(`.page-header__catalog-rollup-btn`);

  catalogMenuRollupBtn.addEventListener(`click`, () => {
    catalogMenu.classList.toggle(`visually-hidden`);
  });
})();
