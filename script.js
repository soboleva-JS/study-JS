'use strict';
function  DomElement (selector, height, width, bg, fontSize){
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.getNewElement = function (text) {
  let newEl;  
  if (this.selector.trim().startsWith('.')||this.selector.trim().startsWith('#')) {
    if (this.selector.trim().startsWith('.')) {
       newEl = document.createElement('div');    
       newEl.setAttribute("class", this.selector.substr(1));    
    } else {
      newEl = document.createElement('p');    
      newEl.setAttribute("id", this.selector.substr(1));  
    };
    };    
    newEl.innerHTML = text;
    newEl.style.height=this.height;
    newEl.style.width=this.width;
    newEl.style.background= this.bg;
    newEl.style.fontSize=this.fontSize;
    document.body.append(newEl);
};

let div_1 = new DomElement ('.block', '200px', '400px', 'red', '30px');
div_1.getNewElement ('первый элемент');

let div_2 = new DomElement ('#paragpaph', '200px', '400px', 'green', '30px');
div_2.getNewElement('второй элемент');