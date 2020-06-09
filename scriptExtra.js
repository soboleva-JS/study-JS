'use strict';

let str = prompt ('Введите строку', '012345678901234567890123456789ааа');

function spaceCut (data, callback) {
  if (typeof data!='string') {
  alert ('Ошибка ввода, введена не строка, а иной тип данных');
  } else {
    let newResult='';
    let i=0;
    while (data[i] === ' ') i += 1;
    let j=data.length;
    while (data[j-1] === ' ') j -= 1;
    let result = data.substr(i,j);

    if (result.endsWith === ' ')  {
      newResult = result[result.length-1] = '';
    } else newResult = result;

    if (newResult.length>29) {
      return newResult.substr(0,30) + '...'}
      else  return newResult
    };
  };


console.log(spaceCut(str));
