
import {showAlert} from './util.js';

const SERVER = 'https://23.javascript.pages.academy/kekstagram';
const DATA = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess) => {
  fetch(DATA)
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (onSuccess, downloadStatus, errorStatus, body) => {

  fetch(SERVER,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
        downloadStatus();
      } else {
        errorStatus();
      }
    })
    .catch(() => {
      errorStatus;
    });
};

export {getData, sendData};
