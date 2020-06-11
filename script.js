'use strict';
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

function isNumber (n) {
  return !isNaN(parseFloat(n)) ;
};

function start () {
  function one (n) {
    let i = 0;
    function two (i) {
      if (i<10) {
      i++;
        let y = prompt ('Угадай число от 1 до 100');
        if (y === null) {
          return;
        } else if (!isNumber(y)) {
          alert('Введите число!');
          return two (i);
        }
        else {if (parseFloat(y) == n)  {
              if (confirm('Поздравляем, вы угадали число! Хотите сыграть еще раз?')) return start(); 
              else {
                alert('Отличная работа! Ждем вас снова!');
                return;
                };
              }
                else if ( parseFloat(y)> n) {
                alert(`Загаданное число меньше, осталось ${10-i} попыток`); return two (i)
                } else {
                  alert(`Загаданное число больше, осталось ${10-i} попыток`); return two (i)
                };
            };  
      } else  {if (confirm('Попытки закончились, хотите сыграть еще?')) return start();
            else {
              alert('Не расстраивайтесь! Попытайте удачу в другой раз!');
              return;
              };
            };    
    };
    return two (0);
  };
  return one (randomInteger(1, 100));
};
start();
