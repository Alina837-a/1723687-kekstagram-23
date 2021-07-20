import {isEscEvent, checkMaxStringLength} from './util.js';
import {minValueScale, bigValueScale, scaleControlBigger, scaleControlSmaller, scaleControlValue} from './scale.js';
import {imgUploadPreview, effectLevelSlider} from './edit-image.js';

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
  scaleControlValue.value = '100%';
};

const oncloseFormEsc = (evt) => {
  if (isEscEvent(evt)){
    if (textDescription === document.activeElement || textHashtags === document.activeElement) {
      return;
    }
    closeForm();
  }
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', oncloseFormEsc);
  scaleControlBigger.addEventListener('click', bigValueScale);
  scaleControlSmaller.addEventListener('click', minValueScale);
};

uploadFile.addEventListener('change', () => {
  openForm();
  document.addEventListener('keydown', oncloseFormEsc);
  imgUploadPreview.style = 'none';
});

uploadCancel.addEventListener('click', () => {
  closeForm();
  document.removeEventListener('keydown', oncloseFormEsc);
  scaleControlBigger.removeEventListener('click', bigValueScale);
  scaleControlSmaller.removeEventListener('click', minValueScale);
});

// Хеш-тег

const validationHashtag = () => {
  const hashtags = textHashtags.value.toLowerCase().trim().split(' ');
  for (let index = 0; index < hashtags.length; index++) {
    if (hashtags[index].indexOf('#') !== 0) {
      textHashtags.setCustomValidity('Хеш-тег начинается с #');
      textHashtags.style.border = '2px solid red';
    } else if (hashtags.length > MAX_HASHTAG) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      textHashtags.style.border = '2px solid red';
    } else if (hashtags[index].length === 1) {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      textHashtags.style.border = '2px solid red';
    } else if (hashtags.indexOf(hashtags[index], index + 1) > 0) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      textHashtags.style.border = '2px solid red';
    }  else if (hashtags[index].indexOf('#', 1) > 1) {
      textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
      textHashtags.style.border = '2px solid red';
    } else if (!re.test(hashtags[index])) {
      textHashtags.setCustomValidity('Хеш-тег начинается с #, состоит из 20 символов(букв и цифр, включая #). Не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.)');
      textHashtags.style.border = '2px solid red';
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.style.border = 'none';
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
    textDescription.reportValidity();
  } else {
    textDescription.setCustomValidity('');
    textDescription.style.border = 'none';
  }

};

textDescription.addEventListener('input', validationComments);
