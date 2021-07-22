import {isEscEvent} from './util.js';
import {sendData} from './api.js';

const newFilePopup = document.querySelector('.img-upload__overlay');
const uploudedImageBlock = document.querySelector('.img-upload__preview');
const uploudedImage = uploudedImageBlock.querySelector('img');
const hashTagField = newFilePopup.querySelector('.text__hashtags');
const scaleField = document.querySelector('.scale__control--value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const uploadField = document.querySelector('#upload-file');
const closeButtonNewFilePopup = newFilePopup.querySelector('.cancel');
const commendField = newFilePopup.querySelector('.text__description');
const effectsList = newFilePopup.querySelectorAll('.effects__radio');
const scaleControl = newFilePopup.querySelector('.img-upload__scale');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let onSuccessEvt = false;

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const checkValidityHashTag = () => {

  hashTagField.addEventListener('change', () => {

    const regex = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
    const hashTags = hashTagField.value.split(' ');
    const errorsList = [];
    const lowerCaseTags = [];

    hashTags.forEach((element) => {

      lowerCaseTags.push(element.toLowerCase());

      if(!regex.test(element)) {
        errorsList.push(element);
      } else if (element.length === 1){
        errorsList.push(element);
      }
    });

    const repeatedTegs = lowerCaseTags.filter((elm, index, array) => array.indexOf(elm) !== index);

    repeatedTegs.forEach((element) => {
      errorsList.push(element);
    });

    if(errorsList.length >= 1 ) {
      hashTagField.setCustomValidity('Хет-тег должен начинаться с символа #,\
            не повторяться,\
            cостоять из букв и цифр, а также иметь длину от 1 до 20 символов\
            и не может состоять из одного символа #\
            Хеш-теги не чувствительны к регистру');
      hashTagField.style.border = 'solid red';
    } else if(hashTags.length > 5){
      hashTagField.setCustomValidity('Максимальное колличество хеш-тегов: 5');
      hashTagField.style.border = 'solid red';
    } else {
      hashTagField.setCustomValidity('');
      hashTagField.style.border = 'none';
    }
  });
};

const getSliderOptions = (minValue, maxValue, stepValue) => {

  effectSlider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: maxValue,
    step: stepValue,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const onAddEffectsClick = (evt) => {

  Array.from(effectsList).forEach((element) => {
    element.removeAttribute('checked', 'checked');
  });
  evt.target.setAttribute('checked', 'checked');

  const targetElementValue  = evt.target.value;

  let styleFilter;

  if (uploudedImage.classList.length === 2) {
    uploudedImage.className = 'img-upload__preview';
  }

  uploudedImage.classList.add(`effects__preview--${targetElementValue}`);

  if(targetElementValue === 'none') {
    effectSlider.setAttribute('style', 'display: none;');
    uploudedImage.style.filter = 'none';
    return;
  } else {
    effectSlider.setAttribute('style', 'display: block;');
  }

  switch (targetElementValue) {
    case 'chrome':
      styleFilter = 'grayscale';
      getSliderOptions(0, 1, 0.1);
      break;
    case 'sepia':
      styleFilter = 'sepia';
      getSliderOptions(0, 1, 0.1);
      break;
    case 'marvin':
      styleFilter = 'invert';
      getSliderOptions(0, 100, 1);
      break;
    case 'phobos':
      styleFilter = 'blur';
      getSliderOptions(0, 3, 0.1);
      break;
    case 'heat':
      styleFilter = 'brightness';
      getSliderOptions(0, 3, 0.1);
      break;
    case 'none':
      break;
  }

  effectSlider.noUiSlider.on('update', (stub, handle, unencoded) => {

    if(Number.isInteger(unencoded[handle])) {
      effectLevelValue.value = unencoded[handle].toFixed(0);
    } else {
      effectLevelValue.value = unencoded[handle].toFixed(1);
    }

    if (targetElementValue === 'marvin') {
      return uploudedImage.style.filter = `${styleFilter}(${effectLevelValue.value}%)`;
    } else if (targetElementValue === 'phobos') {
      return uploudedImage.style.filter = `${styleFilter}(${effectLevelValue.value}px)`;
    }
    uploudedImage.style.filter = `${styleFilter}(${effectLevelValue.value})`;
  });

};

const onScaleControlClick = (evt) => {

  const reducedImage = () => {

    switch (scaleField.value) {
      case '100%':
        uploudedImage.style.transform = 'scale(0.75)';
        buttonBigger.removeAttribute('disabled', 'disabled');
        scaleField.value = '75%';
        break;
      case '75%':
        uploudedImage.style.transform = 'scale(0.5)';
        scaleField.value = '50%';
        break;
      case '50%':
        uploudedImage.style.transform = 'scale(0.25)';
        buttonSmaller.setAttribute('disabled', 'disabled');
        scaleField.value = '25%';
        break;
    }

  };

  const enlargeImage = () => {

    switch (scaleField.value) {
      case '75%':
        uploudedImage.style.transform = 'scale(1)';
        buttonBigger.setAttribute('disabled', 'disabled');
        scaleField.value = '100%';
        break;
      case '50%':
        uploudedImage.style.transform = 'scale(0.75)';
        scaleField.value = '75%';
        break;
      case '25%':
        uploudedImage.style.transform = 'scale(0.5)';
        buttonSmaller.removeAttribute('disabled', 'disabled');
        scaleField.value = '50%';
        break;
    }
  };

  if(evt.target.textContent === 'Уменьшить') {
    return reducedImage();
  }
  enlargeImage();
};

const onCloseFormPopup = (evt) => {

  const closeFormPopup = () => {

    newFilePopup.classList.add('hidden');
    document.body.classList.remove('modal-open');

    if(buttonSmaller.hasAttribute('disabled')){
      buttonSmaller.removeAttribute('disabled');
    }
    uploadField.value = '';
    hashTagField.value = '';
    commendField.value = '';
    scaleField.value = '100%';

    document.removeEventListener('keydown', onCloseFormPopup);
    closeButtonNewFilePopup.removeEventListener('click', onCloseFormPopup);
    scaleControl.removeEventListener('click', onScaleControlClick);
    for(let counter = 0 ; counter <= effectsList.length - 1 ; counter++) {
      effectsList[counter].removeEventListener('click', onAddEffectsClick);
      effectsList[counter].removeAttribute('checked', 'checked');
    }
  };

  if (onSuccessEvt) {
    return closeFormPopup();
  }

  if(evt.type === 'click') {
    closeFormPopup();
  } else if(isEscEvent(evt)) {
    if(document.activeElement.className === 'text__hashtags' || document.activeElement.className === 'text__description') {
      return;
    }
    closeFormPopup();
  }

  onSuccessEvt = false;
};

const addImageToForm = () => {

  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploudedImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

uploadField.addEventListener('change', () => {

  addImageToForm();

  newFilePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  effectSlider.setAttribute('style', 'display: none;');
  uploudedImage.className = 'img-upload__preview';
  uploudedImage.style = 'none';

  document.addEventListener('keydown', onCloseFormPopup);
  closeButtonNewFilePopup.addEventListener('click', onCloseFormPopup);
  scaleControl.addEventListener('click', onScaleControlClick);

  for(let counter = 0 ; counter <= effectsList.length - 1 ; counter++) {
    effectsList[counter].addEventListener('click', onAddEffectsClick);
  }
});

const downloadStatusMessage = (template, content, title, button, buttonText, massageBlock, classTitle, message) => {

  onSuccessEvt = false;

  document.removeEventListener('keydown', onCloseFormPopup);

  const popupTemplate = document.querySelector(template).content.querySelector(content);
  const contentTemplate = popupTemplate.cloneNode(true);
  const titleField = contentTemplate.querySelector(title);
  const popupButton = contentTemplate.querySelector(button);

  contentTemplate.style.zIndex = '3';
  titleField.textContent = message;
  popupButton.textContent = buttonText;

  document.body.appendChild(contentTemplate);

  const onCloseShowPopup = (evt) => {

    const closeShowPopup = () => {
      contentTemplate.remove();

      document.addEventListener('keydown', onCloseFormPopup);
      document.removeEventListener('click', onCloseShowPopup);
      document.removeEventListener('keydown', onCloseShowPopup);

      popupButton.removeEventListener('click', closeShowPopup);
    };

    if(isEscEvent(evt)) {
      closeShowPopup();
    } else if (evt.target.className === massageBlock || evt.target.className === popupButton || evt.target.className === classTitle) {
      return;
    }
    closeShowPopup();
  };

  popupButton.addEventListener('click', onCloseShowPopup);
  document.addEventListener('click', onCloseShowPopup);
  document.addEventListener('keydown', onCloseShowPopup);
};

const setUploadFormSubmit = (onSuccess) => {
  const uploadForm = document.querySelector('.img-upload__form');

  checkValidityHashTag();

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    onSuccessEvt = true;
    sendData(
      () => onSuccess(),
      () => downloadStatusMessage('#success', '.success', '.success__title', '.success__button', 'Круто!', 'success__inner', 'success__title', 'Изображение успешно загружено'),
      () => downloadStatusMessage('#error', '.error', '.error__title', '.error__button', 'попробовать снова', 'error__inner', 'error__title', 'Не удалось отправить форму'),

      new FormData(evt.target),
    );
  });
};

export {setUploadFormSubmit, onCloseFormPopup, onSuccessEvt};

