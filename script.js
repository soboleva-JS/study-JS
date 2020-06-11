'use strict';

function isNumber (n) {
  return !isNaN(parseFloat(n)) ;
};

function one (n) {
  return function two () {
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
};

const ask = one(50);
ask ();
