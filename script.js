'use strict'
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



money = prompt('Какой у вас месячный доход?');
console.log('money: ', money);
addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('addExpenses: ', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке');
console.log('deposit: ', deposit);

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдется');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдется');
let budgetMonth = amount1 + amount2;
console.log('budgetMonth: ', budgetMonth);

let months=Math.ceil(mission/(money-budgetMonth));
console.log('months: ', months);

budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);


switch (true) {
  case (budgetDay >= 1200):
    console.log('У вас высокий уровень дохода');
    break;
  case (budgetDay >= 600):
    console.log('У вас  средний уровень дохода');
    break;
  case (budgetDay >= 0):
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  case (budgetDay < 0):
    console.log('Что то пошло не так');
    break;

  }
