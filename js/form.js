import { isEscEvent, isValidString } from './util.js';
import { resetEffects } from './apply-effect.js';
import { setDefaultImageScale } from './change-scale.js';
import { sendData } from './api.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('.body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const uploadForm = document.querySelector('#upload-select-image');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const imgUploadPicture = document.querySelector('.img-upload__picture');

uploadFile.addEventListener('change', (event) => {
  const file = event.target.files[0];
  imgUploadPicture.src = URL.createObjectURL(file);
});

const closeModal = function () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  resetEffects();
};

const onCloseModalEsc = (evt) => {
  if (document.activeElement !== textDescription &&  document.activeElement !== textHashtags ) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
      body.removeEventListener('keydown', onCloseModalEsc);
    }
  }
};

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  body.addEventListener('keydown', onCloseModalEsc);
  setDefaultImageScale();
  imgUploadEffectLevel.classList.add('visually-hidden');
});


uploadCancel.addEventListener('click', () => {
  closeModal();
});

// Хэш-теги

textHashtags.addEventListener('input', () => {
  const hashtags = textHashtags.value.trim().split(' ').filter(Boolean);

  if (hashtags.length > 5) {
    textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else {
    if (hashtags.length > 0) {
      hashtags.forEach((hashtag) => {
        if (re.test(hashtag)) {
          const dublicates = hashtags.filter((dublicate) => dublicate.toLowerCase() === hashtag.toLowerCase());
          if (dublicates.length >= 2) {
            textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          } else {
            textHashtags.setCustomValidity('');
            textHashtags.style.border = 'none';
          }
        } else {
          textHashtags.setCustomValidity('Невалидный хэштег');
          textHashtags.style.border = '2px solid red';
        }
      });
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.style.border = 'none';
    }

  }

  textHashtags.reportValidity();
});

// Комментарии

textDescription.addEventListener('input', () => {
  if (isValidString(textDescription.value, 140) === false) {
    textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    textDescription.style.border = '2px solid red';
  } else {
    textDescription.setCustomValidity('');
    textDescription.style.border = 'none';
  }
  textDescription.reportValidity();
});

const removeEventListeners = (fn) => {
  document.removeEventListener('click', fn);
  document.removeEventListener('keydown', fn);
};

function removeSuccessMessage(fn)  {
  document.body.lastElementChild.remove();
  removeEventListeners(fn);
}

function onCloseSuccessMessageEsc(evt) {
  if (isEscEvent(evt)) {
    removeSuccessMessage(onCloseSuccessMessageEsc);
  }}

function onCloseSuccessMessageClickOutside(evt) {
  if (evt.target === document.body.lastElementChild) {
    removeSuccessMessage(onCloseSuccessMessageClickOutside);
  }
}

function showSuccessMessage() {
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__button').addEventListener('click', () => {
    document.body.lastElementChild.remove();
    removeEventListeners(onCloseSuccessMessageEsc);
    removeEventListeners(onCloseSuccessMessageClickOutside);
  });
  document.addEventListener('click', onCloseSuccessMessageClickOutside);
  document.addEventListener('keydown', onCloseSuccessMessageEsc);
  document.body.append(successElement);
}

function showErrorMessage() {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    document.body.lastElementChild.remove();
    removeEventListeners(onCloseSuccessMessageEsc);
    removeEventListeners(onCloseSuccessMessageClickOutside);
  });

  document.addEventListener('click', onCloseSuccessMessageClickOutside);
  document.addEventListener('keydown', onCloseSuccessMessageEsc);
  document.body.append(errorElement);
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();


  sendData(
    () => {
      closeModal();
      showSuccessMessage();
    },
    () => {
      closeModal();
      showErrorMessage();
    },
    new FormData(evt.target),
  );

});
