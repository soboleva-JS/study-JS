'use strict';
let greeting;
const arr=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
      date = new Date(),      
      day= date.getDay(),
      time=date.toLocaleTimeString('en'),
      dateStop = new Date('1 January 2021'),
      daysRemaining = Math.floor((dateStop.getTime()-date.getTime()) / 1000 / 60 / 60/ 24 ),
      el = document.createElement('div'),      
      hours = date.getHours();

if (hours > 18) greeting = 'Добрый вечер!'
 else if (hours > 12) greeting = 'Добрый день!'
  else if (hours > 6) greeting = 'Доброе утро!'
  else greeting = 'Доброй ночи!';

el.innerHTML=`<p>${greeting}</p>
<p>Сегодня: ${arr[day]}</p>
<p>Текущее время: ${time}</p>
<p>До нового года осталось ${daysRemaining} дней</p>
`;
document.body.append(el);
