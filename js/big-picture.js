//Модуль который отвечает за отрисовку окна с полноразмерным изображением
/*
import {objectPhoto} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const descriptionPicture = document.querySelector('.social__caption');
const buttonClose = document.querySelector('.big-picture__cancel');
const uploadNewPictire = document.querySelector('.comments-loader');
const body = document.querySelector('body');

function openPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  uploadNewPictire.classList.add('hidden');
}

function closePicture () {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
}

const generatedComments = objectPhoto();
const commentsListFragment = document.createDocumentFragment();

generatedComments.forEach(({avatar, name, message}) => {
  const commentElement = commentTemplate.closeNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  commentsListFragment.appendChild(commentElement);
});
*/
