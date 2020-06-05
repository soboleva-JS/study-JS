let num = 266219;
let arr = num.toString().split('');
console.log('str: ', arr);
let result = 1;
for  (let i = 0; i < arr.length; i++) {
  result *= arr[i];  
  }
console.log(' result: ',  result);
result3=result**3
console.log(' result в третьей степени: ', result3);
console.log(' result первые две цифры: ',  result3.toString().substr(0,2));