const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';
const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';

const getPhotos = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getPhotos, sendData };
