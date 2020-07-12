'use strict';
let arrDay = ['Воскресенье','Понедельник', 'Вторник' , 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    arrMonth = ['января','февраля', 'марта' , 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    zero = function (n) {
    if (n<10) return '0'+n; 
    else return n;
    },
    getHoursForm = function (n) {
      const arrHour = ['час', 'часа', 'часов'];
      if (n === 1) return arrHour[0]
        else if ((n > 1)&&(n < 5)) return arrHour[1]
        else return arrHour[2];

    },
    getDateLong = function (currentDate=new Date()) {
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
      m = arrMonth[currentDate.getMonth()];
      dd = (currentDate.getDate());
      hh = (currentDate.getHours());
      MM = (currentDate.getMinutes());
      ss = (currentDate.getSeconds());

      str = `Сегодня ${day}, ${dd} ${m} ${yyyy} года, ${hh} ${getHoursForm(parseInt(hh.toString().slice(-1)))}, ${MM} минут, ${ss} секунды`;
      document.body.innerHTML = '';
      document.write(str,'<br>');
    },
    getDateShort = function (currentDate=new Date()) {
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
      mm = zero((currentDate.getMonth() + 1));
      dd = zero(currentDate.getDate());
      hh = zero(currentDate.getHours());
      MM = zero(currentDate.getMinutes());
      ss = zero(currentDate.getSeconds());

      str = dd+'.'+mm+'.'+yyyy+ ' - '+ hh+'.'+MM+'.'+ss;
        document.write(str,'<br>');
    };

setInterval(getDateLong, 1000);
setInterval(getDateShort, 1000);
