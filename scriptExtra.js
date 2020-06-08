'use strict';
let weekEn = 'monday,tuesday,wednesday,thursday,friday,saturday,sunday';
let weekRu ='понедельник,вторник,среда,четверг,пятница,суббота,воскресенье';


let lang = confirm ('Вы говорите по-русски?');
if (lang===true) {
  console.log (weekRu);
}
else  {
  console.log (weekEn);
};
 

switch (lang) {
  case true:
    console.log (weekRu);
    break;
  case false:
    console.log (weekEn);
    break;
};


let arr = [
  weekEn.split(','),
  weekRu.split(',')
];
let num = lang ? 1 : 0;
console.log(arr[num]);


let namePerson = prompt ('Введите имя');
let job = (namePerson === 'Артем') ? 'Директор' :
(namePerson === 'Максим') ? 'Преподаватель' : 'Студент';


console.log('job : ', job );