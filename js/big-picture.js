//Модуль который отвечает за отрисовку окна с полноразмерным изображением
import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsList = document.querySelector('.social__comments');
const descriptionPicture = document.querySelector('.social__caption');
const buttonClose = document.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const uploadNewPictire = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentTemplate = bigPicture.querySelector('.social__comment');
const PAGE_SIZE = 5;
let currentPage = 1;
let currentComments = [];

const getPictureComments = () => {
  const fragment = document.createDocumentFragment();
  const count = PAGE_SIZE * currentPage;
  const showMore = count < currentComments.length;
  socialCommentCount.textContent = count < currentComments.length ? count : currentComments.length;

  currentComments.slice(0, count-1).forEach((comment) => {
    const {avatar, name, message} = comment;
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    fragment.appendChild(commentElement);
  });

  if (showMore) {
    uploadNewPictire.classList.remove('hidden');
  } else {
    uploadNewPictire.classList.add('hidden');
  }

  return fragment;
};

const renderComments = () => {
  socialCommentsList.textContent = '';
  socialCommentsList.appendChild(getPictureComments());
};

const onShowMoreClick = () => {
  currentPage++;
  renderComments();
};

uploadNewPictire.addEventListener('click', onShowMoreClick);

const closePictureEsc = (evt) => {
  if (isEscEvent(evt)){
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

function openPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  uploadNewPictire.classList.add('hidden');
  document.addEventListener('keydown', closePictureEsc);
}

function closePicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', closePictureEsc);
}

buttonClose.addEventListener ( 'click', () => {
  closePicture();
});

export const renderBigPicture = (data) => {
  const {url, likes, comments, description} = data;
  openPicture();

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionPicture.textContent = description;
  currentComments = data.comments;
  currentPage = 1;
  renderComments();
  body.classList.add('modal-open');
  socialCommentsList.firstChild.textContent = `${currentComments.length} из ${currentComments.length} комментариев`;
};

