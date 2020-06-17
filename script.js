'use strict';
//Восстановить порядок книг
const elems = document.getElementsByClassName('book');
elems[1].after(elems[0]);
let elemClone = elems[2].cloneNode(true);
elems[2].replaceWith(elems[4]);
elems[4].after(elemClone);

//Заменить картинку заднего фона на другую из папки image
document.body.setAttribute('style','background-image: url(./image/you-dont-know-js.jpg');

//Исправить заголовок в книге 3
document.querySelectorAll('h2>a')[2].innerText='Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
document.querySelector('.adv').remove();

//Восстановить порядок глав во второй и пятой книге 

let articles1,
    articles4,
    foo = function (i) {
      return elems[i].querySelectorAll('li');
    };
articles1 = foo (1);
articles1[1].after(articles1[3]);
articles1 = foo (1);
articles1[2].after(articles1[6]);
articles1 = foo (1);
articles1[3].after(articles1[8]);
articles1 = foo (1);
articles1[4].after(articles1[6]);
articles1 = foo (1);
articles1[5].after(articles1[7]);
articles1 = foo (1);
articles1[6].after(articles1[8]);
articles1 = foo (1);
articles1[7].after(articles1[9]);

articles4 = foo (4);
articles4[1].after(articles4[9]);
articles4 = foo (4);
articles4[2].after(articles4[4]);
articles4 = foo (4);
articles4[3].after(articles4[5]);
articles4 = foo (4);
articles4[5].after(articles4[7]);
articles4 = foo (4);
articles4[6].after(articles4[8]);

//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let articles6 = elems[5].querySelectorAll('li'),
    newArticle = document.createElement('li');
newArticle.textContent = 'Глава 8: За пределами ES6';
articles6[8].after(newArticle);
