// Модуль, который отвечает за отрисовку миниатюр
import {createObjects} from '.data.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplete = document.querySelector('#picture').content.querySelector('.picture');

const picturesThumbnails = createObjects();
const picturesListFragment = document.createDocumentFragment();

picturesThumbnails.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplete.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(pictureElement);
});

picturesListElement.appendChild(picturesListFragment);
