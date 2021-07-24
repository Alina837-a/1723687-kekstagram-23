const filters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const filtersForm = document.querySelector('.img-filters__form');

function deactivateButtons() {
  Array.from(filterButtons).forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
}

function activateButton (button) {
  button.classList.add('img-filters__button--active');
}

export function setFilterClick(cb) {
  filtersForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    deactivateButtons();
    activateButton(evt.target);
    cb(evt.target.id);
  });
}

export function showFilter () {
  filters.classList.remove('img-filters--inactive');
}
