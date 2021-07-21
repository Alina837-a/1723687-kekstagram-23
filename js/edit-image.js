// Функциональность по редактированию изображения
export const effectLevelSlider = document.querySelector('.effect-level__slider');
export const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const uploadEffects = document.querySelector('.img-upload__effects');
export const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const effectName = {
  'chrome': 'effects__preview--chrome',
  'marvin': 'effects__preview--marvin',
  'sepia': 'effects__preview--sepia',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
  'none': 'effects__preview--none',
};

const effectSetting= {
  'effect-chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  'effect-none': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  },
  'effect-marvin': {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  'effect-sepia': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'effect-phobos': {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  'effect-heat': {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
};

function showSlider () {
  imgUploadEffectLevel.classList.remove('visually-hidden');
}

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
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

export function resetEffects () {
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.classList = 'img-upload__preview';
  imgUploadEffectLevel.classList.add('visually-hidden');
}

const applyEffect = (effectId) => {
  switch (effectId) {
    case 'effect-chrome':
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      showSlider();
      break;
    case 'effect-marvin':
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      showSlider();
      break;
    case 'effect-sepia':
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
      showSlider();
      break;
    case 'effect-phobos':
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      showSlider();
      break;
    case 'effect-heat':
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
      showSlider();
      break;

    default:
      imgUploadPreview.style.filter = '';
      imgUploadEffectLevel.classList.add('visually-hidden');
  }
};

uploadEffects.addEventListener('click', (evt) => {
  if (!evt.target.id) {
    return;
  }

  const effectId = evt.target.id;

  const effectClass = effectName[effectId];
  Object.keys(effectName).forEach((key) => {
    imgUploadPreview.classList.remove(effectName[key]);
  });

  imgUploadPreview.classList.add(effectClass);

  effectLevelSlider.noUiSlider.on('update', (__, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    applyEffect(effectId);
  });

  effectLevelSlider.noUiSlider.updateOptions(effectSetting[effectId]);
});

