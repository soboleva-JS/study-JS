'use strict';
let arrDay = ['Воскресенье','Понедельник', 'Вторник' , 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    arrMonth = ['января','февраля', 'марта' , 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    zero = function (n) {
    if (n<10) return '0'+n; 
    else return n;
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
          str,
          arrHour = ['час', 'часа', 'часов'],
          hour;
      yyyy =currentDate.getFullYear();
      day = arrDay[currentDate.getDay()];
      m = arrMonth[currentDate.getMonth()];
      dd = (currentDate.getDate());
      hh = (currentDate.getHours());
      MM = (currentDate.getMinutes());
      ss = (currentDate.getSeconds());

      if (hh.toString().endsWith('1')) hour = arrHour[0]
        else if ((parseInt(hh.toString().slice(-1)) > 1)&&(parseInt(hh.toString().slice(-1)) < 5)) hour = arrHour[1]
        else hour = arrHour[2];
      str = `Сегодня ${day}, ${dd} ${m} ${yyyy} года, ${hh} ${hour}, ${MM} минут, ${ss} секунды`;
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
