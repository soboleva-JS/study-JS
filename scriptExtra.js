'use strict';
let arr = [];
let i = 0;

function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function zeroCut (n) {
  let i=0;
  while (n [i] === '0') i++;
  return n.substr(i);
  
};

function getArr () {
do {
  do arr [i] = zeroCut(prompt (`Введите многозначное ${i}-е число`,'  000001  ').trim());
  while (!isNumber(arr [i] )||arr [i].length<2);
  i++;
}
while (i<8)
};

function twoFourLog () {
  for (let j = 0; j < arr.length; j ++) {
    if (arr[j].trim().startsWith('2') || arr[j].trim().startsWith('4')) 
    console.log(arr[j].trim());
    }
};

getArr ();
console.log(arr);
twoFourLog ();

let flag;
function simpleNumbers () {
  for (let n = 1; n < 99; n ++) {
    flag = true;    
    for (let k = 2; k < n; k ++) {
      if ((n%k)===0) {
        flag = false;
        break;
      };
    };
    if (flag) console.log(n,`Делители этого числа: 1 и ${n}`)
  };
};

simpleNumbers();