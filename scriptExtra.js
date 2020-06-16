'use strict';
let currentDate = new Date(),
    arrDay = ['Воскресенье','Понедельник', 'Вторник' , 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    arrMonth = ['Января','Февраля', 'Марта' , 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

Date.prototype.format = function(format = 'yyyy-mm-dd') {
  const obj = {
      yyyy: this.getFullYear(),
      day: arrDay[this.getDay()],
      mm: ('0'+(this.getMonth() + 1)).slice(-2),
      m: arrMonth[this.getMonth() + 1],
      dd: ('0'+this.getDate()).slice(-2),
      hh: ('0'+this.getHours()).slice(-2),
      MM: ('0'+this.getMinutes()).slice(-2),
      ss: ('0'+this.getSeconds()).slice(-2)
  };
  let result = format;
  for(const i in obj) {
      result = result.replace(i,obj[i]);
      }
  return result;
};
      
let getDate = function () { 
console.log(currentDate.format('dd.mm.yyyy - hh:MM:ss'));
if (currentDate.getHours().toString().endsWith('1')) console.log((new Date()).format('Сегодня day, dd m yyyy года,  hh час MM минут ss секунды'))
  else if ((parseInt(currentDate.getHours().toString().slice(-1)) > 1)&&(parseInt(currentDate.getHours().toString().slice(-1)) < 5)) console.log((new Date()).format('Сегодня day, dd m yyyy года,  hh часа MM минут ss секунды'))
  else console.log((new Date()).format('Сегодня day, dd m yyyy года,  hh часов MM минут ss секунды'));
};

setInterval(getDate , 1000);