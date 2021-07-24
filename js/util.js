const ALERT_SHOW_TIME = 5000;

export function getRandomNumber(min, max) {
  if (max <= min) {
    [min, max] = [max, min];
  }
  if (min <= 0) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export function isValidString(string, maxLength) {
  return string.length <= maxLength;
}

export function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export function showAlert (message) {
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
}

