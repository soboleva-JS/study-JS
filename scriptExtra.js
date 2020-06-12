'use strict';

let arr = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
console.log(arr.join(', '));
for (let item of arr) console.log (item);
let str = arr[0] + ', '+arr[arr.length-1];
console.log(str.italics());

let currentDate = new Date();
console.log(arr[currentDate.getDay()].bold());