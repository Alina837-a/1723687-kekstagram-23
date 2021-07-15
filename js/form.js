import {isEscEvent} from './util.js';
import {checkMaxStringLength} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const re = RegExp(/^#[A-Za-zА-Яа-я0-9]{1,19}$/);
const MAX_HASHTAG = 5;
const MAX_LENGTH_COMMENT = 140;

// Открываем и закрываем форму редактирования изображения

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';
};

const closeFormEsc = (evt) => {
  if (isEscEvent(evt)){
    if (textDescription === document.activeElement || textHashtags === document.activeElement) {
      evt.stopPropagation();
    }
    closeForm();
  }
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', closeFormEsc);
};

const onCloseClick = () => closeForm();

uploadFile.addEventListener('change', () => openForm());

uploadCancel.addEventListener('click', () => onCloseClick());

// Хеш-тег

const validationHashtag = () => {
  const hashtags = textHashtags.value.toLowerCase().trim().split(' ');
  for (let index = 0; index < hashtags.length; index++) {
    if (hashtags[index].indexOf('#') !== 0) {
      textHashtags.setCustomValidity('Хеш-тег начинается с #');
    } else if (hashtags.length > MAX_HASHTAG) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else if (hashtags[index].length === 1) {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (hashtags.indexOf(hashtags[index], index + 1) > 0) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }  else if (hashtags[index].indexOf('#', 1) > 1) {
      textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
    } else if (!re.test(hashtags[index])) {
      textHashtags.setCustomValidity('Хеш-тег начинается с #, состоит из 20 символов(букв и цифр, включая #). Не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;)');
    } else {
      textHashtags.setCustomValidity('');
    }
  }
  textHashtags.reportValidity();
};

textHashtags.addEventListener('input', validationHashtag);

// Комментарии

const validationComments = () => {
  if (checkMaxStringLength(textDescription.value, MAX_LENGTH_COMMENT) === false) {
    textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    textDescription.style.border = '2px solid red';
  } else {
    textDescription.setCustomValidity('');
    textDescription.style.border = 'none';
  }
};

validationComments();
