import { renderPhotos } from './render-photos.js';
import './form.js';
import './change-scale.js';
import './apply-effect.js';
import { getPhotos } from './api.js';
import { showAlert } from './util.js';
import { showFilter, setFilterClick } from './filter.js';
import { debounce } from './utils/debounce.js';
import { shuffle } from './utils/shuffle.js';

const RERENDER_DELAY = 500;

function sortByCommentsLength(photos) {
  return photos.slice().sort((left, right) => right.comments.length - left.comments.length);
}

function randomTenPhotos(photos) {
  return shuffle(photos).slice(0, 10);
}

getPhotos((photos) => {
  showFilter();
  renderPhotos(photos);

  setFilterClick(debounce((filterId) => {
    switch(filterId) {
      case 'filter-default':
        renderPhotos(photos);
        break;
      case 'filter-random':
        renderPhotos(randomTenPhotos(photos));
        break;
      case 'filter-discussed':
        renderPhotos(sortByCommentsLength(photos));
        break;
    }
  }, RERENDER_DELAY));
}, () => {
  showAlert('Не удалось загрузить данные');
});
