document.addEventListener('DOMContentLoaded', function(){
  'use strict';

function DomElement (selector, height, width, bg, fontSize){
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.DomElementShow = function (text) {
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
    newEl.style.top=this.top;
    newEl.style.left=this.left;
    newEl.style.position='absolute';
    document.body.append(newEl);
};

function DivDomElement(selector, height, width, bg, fontSize, left, top) {
DomElement.apply(this,arguments);
this.left=left;
this.top=top;
};

DivDomElement.prototype=Object.create(DomElement.prototype);
DivDomElement.prototype.constructor=DivDomElement;

let div_1 = new DivDomElement ('.block', '100px', '100px', 'red', '30px','200px','200px');
div_1.DomElementShow('lala');

document.onkeydown = function(e) {  
  let el=document.querySelector('div');
  let x=el.style.left;
  let y=el.style.top;
  switch (e.key) {  
  case "ArrowLeft":
    el.style.left=(parseInt(x)-10)+'px';
    break;
  case "ArrowRight":
    el.style.left=(parseInt(x)+10)+'px';
    break;
  case "ArrowUp":
    el.style.top=(parseInt(y)-10)+'px';
    break;
  case "ArrowDown":
    el.style.top=(parseInt(y)+10)+'px';
    break;
};
};
});