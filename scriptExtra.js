'use strict';
let arr = [];
let i = 0;

function isMultipleNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && (n.trim().length>1)  ;
};

function getArr () {
do {
  do arr [i] = prompt (`Введите многозначное ${i}-е число`,'  22  ');  
  while (!isMultipleNumber(arr [i] ));
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