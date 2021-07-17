// Модуль, который отвечает за отрисовку миниатюр

import {objectPhoto} from './data.js';
import {renderBigPicture} from './big-picture.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplete = document.querySelector('#picture').content.querySelector('.picture');

const picturesThumbnails = objectPhoto;
const picturesListFragment = document.createDocumentFragment();

const renderPicturesThumbnails = (pictures) => {
  pictures.forEach((data) => {
    const { url, likes, comments } = data;
    const pictureElement = pictureTemplete.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      renderBigPicture(data);
    });
    picturesListFragment.appendChild(pictureElement);
  });
  picturesListElement.appendChild(picturesListFragment);
};

renderPicturesThumbnails(picturesThumbnails);

export {renderPicturesThumbnails};


