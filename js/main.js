import {getPicturesContainer} from './draw-thumbnails.js';
import {setUploadFormSubmit, onCloseFormPopup} from './form.js';
import {removeFiltersHidden, onFiltersClick} from './filter-image.js';
import {getData} from './api.js';
import './big-picture.js';
import './form.js';

getData((images) => {
  getPicturesContainer(images);
  removeFiltersHidden();
  onFiltersClick(images);
});
setUploadFormSubmit(onCloseFormPopup);
