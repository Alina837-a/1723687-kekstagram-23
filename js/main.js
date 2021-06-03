// Функция, возвращающая случайное целое число
function getRandom(min, max) {
  if(min >= 0 && max >= min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'недопустимое значение';
  }
}

getRandom(0, 10);

//Функция для проверки максимальной длины строки

function checkMaxStringLength(testString, maxLength) {
  return testString <= maxLength;
}

checkMaxStringLength (120, 140);
