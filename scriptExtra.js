'use strict';
let arrDay = ['Воскресенье','Понедельник', 'Вторник' , 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    arrMonth = ['января','февраля', 'марта' , 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];


let getDateLong = function (currentDate=new Date()) {
  let yyyy,
      day,
      mm,
      m,
      dd,
      hh,
      MM,
      ss,
      str,
      arrHour = ['час', 'часа', 'часов'],
      hour;
  yyyy =currentDate.getFullYear();
  day = arrDay[currentDate.getDay()];
  mm = (''+(currentDate.getMonth() + 1)).slice(-2);
  m = arrMonth[currentDate.getMonth()];
  dd = (''+currentDate.getDate()).slice(-2);
  hh = (''+currentDate.getHours()).slice(-2);
  MM = (''+currentDate.getMinutes()).slice(-2);
  ss = (''+currentDate.getSeconds()).slice(-2);

  if (hh.toString().endsWith('1')) hour = arrHour[0]
    else if ((parseInt(hh.toString().slice(-1)) > 1)&&(parseInt(hh.toString().slice(-1)) < 5)) hour = arrHour[1]
    else hour = arrHour[2];
  str = `Сегодня ${day}, ${dd} ${m} ${yyyy} года, ${hh} ${hour}, ${MM} минут, ${ss} секунды`;
  document.write(str,'<br>');
};
let getDateShort = function (currentDate=new Date()) {
  let yyyy,
      day,
      mm,
      m,
      dd,
      hh,
      MM,
      ss,
      str;
  yyyy =currentDate.getFullYear();
  day = arrDay[currentDate.getDay()];
  mm = ('0'+(currentDate.getMonth() + 1)).slice(-2);
  m = arrMonth[currentDate.getMonth() + 1];
  dd = ('0'+currentDate.getDate()).slice(-2);
  hh = ('0'+currentDate.getHours()).slice(-2);
  MM = ('0'+currentDate.getMinutes()).slice(-2);
  ss = ('0'+currentDate.getSeconds()).slice(-2);

  str = dd+'.'+mm+'.'+yyyy+ ' - '+ hh+'.'+MM+'.'+ss;
  document.write(str,'<br>');
};

setInterval(getDateLong, 1000);
setInterval(getDateShort, 1000);
