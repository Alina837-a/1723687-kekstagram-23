const MAX_VALUE = 100;
const SCALE_STEP = 25;
const MIN_VALUE = 25;
const DEFAULT_SCALE_VALUE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPicture = document.querySelector('.img-upload__picture');


let currentScale = 100;

const setImageScale = (newScale) => {
  scaleControlValue.value = `${newScale}%`;
  imgUploadPicture.style = `transform: scale(${newScale / 100})`;
  currentScale = newScale;
};

export function setDefaultImageScale () {
  setImageScale(DEFAULT_SCALE_VALUE);
}

const onMinusButtonClick = () => {
  if (currentScale > MIN_VALUE) {
    currentScale -= SCALE_STEP;
    setImageScale(currentScale);
  }
};

const onPlusButtonClick = () => {
  if (currentScale < MAX_VALUE) {
    currentScale += SCALE_STEP;
    setImageScale(currentScale);
  }
};


scaleControlSmaller.addEventListener ('click', onMinusButtonClick);

scaleControlBigger.addEventListener ('click', onPlusButtonClick);
