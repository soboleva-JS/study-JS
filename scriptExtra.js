'use strict';
let weekEn = 'monday,tuesday,wednesday,thursday,friday,saturday,sunday';
let weekRu ='понедельник,вторник,среда,четверг,пятница,суббота,воскресенье';
let weekError = 'что-то пошло не так';

let lang = prompt ('Введите \'ru\' или  \'en\'');
if (lang==='en') {
  console.log (weekEn);
}
else if (lang==='ru') {
  console.log (weekRu);
} else  console.log (weekError);
 

switch (lang) {
  case 'en':
    console.log (weekEn);
    break;
  case 'ru':
    console.log (weekRu);
    break;
  default:
    console.log (weekError);
    break;
}


lang = [
  weekEn.split(','),
  weekRu.split(',')
]

console.log(lang[0]);
console.log(lang[1]);

let namePerson = prompt ('Введите имя');
let job = (namePerson === 'Артем') ? 'Директор' :
(namePerson === 'Максим') ? 'Преподаватель' : 'Студент';


console.log('job : ', job );