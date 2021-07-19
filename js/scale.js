// Редактирование масштаба изображения

const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');

const CHANGE_STEP = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;

let currentScale = 100;

const setImgScale = (currentValue) => {
  scaleControlValue .value =  `${currentValue}%`;
  uploadPreview.style.transform = `scale(${currentValue / 100})`;
};


const minValueScale = (evt) => {
  evt.preventDefault();
  if (currentScale > MIN_VALUE) {
    currentScale -= CHANGE_STEP;
    setImgScale(currentScale);
  }
};

const bigValueScale = (evt) => {
  evt.preventDefault();
  if (currentScale < MAX_VALUE) {
    currentScale += CHANGE_STEP;
    setImgScale(currentScale);
  }
};

scaleControlBigger.addEventListener('click', bigValueScale);
scaleControlSmaller.addEventListener('click', minValueScale);
