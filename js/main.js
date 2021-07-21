import {showAlert} from './util.js';
import './data.js';
import {fetchData} from './api.js';
import {renderPicturesThumbnails} from './draw-thumbnails.js';
import './big-picture.js';
import './form.js';
import './scale.js';
import './edit-image.js';
import {addImageFilters} from './filter-image.js';

fetchData(
  'https://23.javascript.pages.academy/kekstagram/data',
  'GET',
  (pictures) => {
    renderPicturesThumbnails(pictures);
    addImageFilters(pictures);
  },
  (onFail) => showAlert(onFail),
);
