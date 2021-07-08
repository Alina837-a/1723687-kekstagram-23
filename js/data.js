import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';

// Генерация данных

const USER_PHOTO = 25;
const USER_PHOTO_DESCRIPTION = [
  'Зимнее путешествие на озеро Байкал',
  'Японский чайный сад',
  'Просто красота природы и ничего лишнего',
  'Улыбка - единственный тренд в моде, который актуален всегда',
  'Моя жизнь меняется..',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAME = [
  'Ира',
  'Денис',
  'Паша',
  'Даша',
  'Лиза',
];

const createComments = () => ({
  id: getRandomPositiveInteger(1, 120),
  avatar: `img/avatar${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(USER_NAME),
});

const createPhoto = () => ({
  id: getRandomPositiveInteger(1, 25),
  url: `photos/${ getRandomPositiveInteger(1, 25)  }.jpg`,
  description: getRandomArrayElement(USER_PHOTO_DESCRIPTION),
  likes: getRandomPositiveInteger(15, 200),
  comments: new Array(getRandomPositiveInteger(1, 6)).fill(null).map(() => createComments()),
});

const objectPhoto = new Array(USER_PHOTO).fill(null).map(() => createPhoto());

export {objectPhoto};
