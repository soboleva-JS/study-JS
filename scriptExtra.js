'use strict';

let lang = prompt ('Введите \'ru\' или  \'en\'');
if (lang==='en') {
  console.log ('monday,tuesday,wednesday,thursday,friday,saturday,sunday');
}
else if (lang==='ru') {
  console.log ('понедельник,вторник,среда,четверг,пятница,суббота,воскресенье');
} else  console.log ('что-то пошло не так');
 

switch (lang) {
  case 'en':
    console.log ('monday,tuesday,wednesday,thursday,friday,saturday,sunday');
    break;
  case 'ru':
    console.log ('понедельник,вторник,среда,четверг,пятница,суббота,воскресенье');
    break;
  default:
    console.log ('что-то пошло не так');
    break;
}

lang = [
  ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
  ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье']
]

console.log(lang[0]);
console.log(lang[1]);

let namePerson = prompt ('Введите имя');
let job = (namePerson === 'Артем') ? 'Директор' :
(namePerson === 'Максим') ? 'Преподаватель' : 'Студент';


console.log('job : ', job );