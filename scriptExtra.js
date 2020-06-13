'use strict';

let arr = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

document.write(`<p>#1</p><p>${arr}</p><p>#2</p>`);

for (let item of arr) document.write(`<p>${item}</p>`);

let str = arr[0] + ', '+arr[arr.length-1];
document.write(`<p>#3</p><p><i>${str}</i></p>`);

let currentDate = new Date();
document.write(`<p>#4</p><p><b>${arr[currentDate.getDay()]}</b></p>`);
