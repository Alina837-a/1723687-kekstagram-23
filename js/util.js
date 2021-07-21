// Функция, возвращающая случайное целое число

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для проверки максимальной длины строки

const checkMaxStringLength = (testString, maxLength) => testString.length <= maxLength;

// Функция для получения случайного элемента массива

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const ALERT_SHOW_TIME = 5000;
const FILTER_RANDOM_IMAGE_COUNT = 10;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getRandomArray = (items) => {
  const arrayIndexImages = [];
  const arrayRandomImages = [];
  while (arrayIndexImages.length < FILTER_RANDOM_IMAGE_COUNT) {
    const randomIndex = getRandomPositiveInteger(0, items.length-1);
    if (arrayIndexImages.indexOf(randomIndex) === -1) {
      arrayIndexImages.push(randomIndex);
    }
  }
  for (const value of arrayIndexImages) {
    arrayRandomImages.push(items[value]);
  }
  return arrayRandomImages;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveInteger, checkMaxStringLength, getRandomArrayElement, isEscEvent, debounce,getRandomArray, showAlert};
