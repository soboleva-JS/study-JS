let money = 100000;
let income = 'freelance';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 5000000;
let period = 12;

console.log('typeof money: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);
console.log('addExpenses lenght: ', addExpenses.length);
console.log (`Период равен ${period} месяцев`);
console.log (`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);