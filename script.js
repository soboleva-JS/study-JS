'use strict';

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

function isNumber (n) {
  return !isNaN(parseFloat(n)) ;
};

function one (n) {
  function two () {
    let y = prompt ('Угадай число от 1 до 100');
    if (y === null) return;
    else if (!isNumber(y)) {
      alert('Введите число!');
      return two ();
    }
      else {if (parseFloat(y) == n) return alert('Поздравляем, вы угадали число!')
            else if ( parseFloat(y)> n) {alert('Загаданное число меньше'); return two ()}
            else {alert('Загаданное число больше'); return two ()};
      };
  };
  return two();
};

one (randomInteger(1, 100));
