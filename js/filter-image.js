// Функциональсность по фильтрации изображений от других пользователей

import {getRandomArray, debounce} from './util.js';
import {renderPicturesThumbnails} from './draw-thumbnails.js';

const imagesFilters = document.querySelector('.img-filters');
const form = imagesFilters.querySelector('.img-filters__form');
const imagesFiltersButton = imagesFilters.querySelectorAll('.img-filters__button');
const filterDefaultButton = imagesFilters.querySelector('#filter-default');
const filterRandomButton = imagesFilters.querySelector('#filter-random');
const filterDiscussedButton = imagesFilters.querySelector('#filter-discussed');

const RERENDER_DELAY = 500;

// Функция применения стиля на активную кнопку фильтра;
const setStyleButtonFilter = (evt) => {
  const buttonFilter = evt.target;
  for (let index = 0; index < imagesFiltersButton.length; index++) {
    imagesFiltersButton[index].classList.remove('img-filters__button--active');
  }
  buttonFilter.classList.add('img-filters__button--active');
};

// Функция получения обсуждаемых изображений;
const getDiscussedImages = (pictures) => {
  const arrayDiscussedImages = pictures.slice();
  arrayDiscussedImages.sort((second, first) => first.comments.length - second.comments.length);
  return arrayDiscussedImages;
};

// Функция визуализации изображений с устранением дребезга;
const renderPicturesDebounce = debounce(renderPicturesThumbnails, RERENDER_DELAY);

// Обработчик события при выборе фильтра;
const setImagesFilter = (evt, pictures) => {
  const buttonFilter = evt.target;
  setStyleButtonFilter(evt);
  switch (buttonFilter) {
    case filterDefaultButton:
      return renderPicturesDebounce(pictures);
    case filterRandomButton:
      return  renderPicturesDebounce(getRandomArray(pictures));
    case filterDiscussedButton:
      return  renderPicturesDebounce(getDiscussedImages(pictures));
  }
};

//Функция отображения панели фильтров c обработчиком события при выборе фильтра;
const addImageFilters = (pictures) => {
  imagesFilters.classList.remove('img-filters--inactive');
  form.addEventListener('click', (evt) => setImagesFilter(evt, pictures));
};

export {addImageFilters};
