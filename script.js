'use strict';
let newColor = document.querySelector('.new-color'),
    btnChange = document.querySelector('.btn-change');

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function changeColor() {
  let randomColor = getRandomColor();
  document.body.setAttribute('style',`background-color:${randomColor}` );
  newColor.textContent = randomColor;
};

btnChange.addEventListener('click', changeColor);

