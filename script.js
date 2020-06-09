'use strict'
let money = 100000;
let income = 'freelance';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 5000000;
let period = 12;

function showTypeOf (data) {
  console.log (data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

money = prompt('Какой у вас месячный доход?', 50000);
addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'аренда, коммуналка');
deposit = confirm('Есть ли у вас депозит в банке');
let expenses1 = prompt('Введите обязательную статью расходов','аренда');
let amount1 = +prompt('Во сколько это обойдется', 15000);
let expenses2 = prompt('Введите обязательную статью расходов', 'коммуналка');
let amount2 = +prompt('Во сколько это обойдется', 3000);

function getExpensesMonth () {
  return amount1+amount2;
};
console.log('Расходы за месяц вызов', getExpensesMonth ());
console.log('Возможные расходы',addExpenses.toLowerCase().split(', '));

function getAccumulatedMonth () {
  return money - getExpensesMonth ();
};
let accumulatedMonth = getAccumulatedMonth ();

function getTargetMonth () {
  return Math.ceil(mission/accumulatedMonth);
};
console.log('Cрок достижения цели в месяцах', getTargetMonth ());

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день', budgetDay);

function  getStatusIncome (budgetParameter) {
switch (true) {
  case (budgetParameter >= 1200):
    console.log('У вас высокий уровень дохода');
    break;
  case (budgetParameter >= 600):
    console.log('У вас средний уровень дохода');
    break;
  case (bbudgetParameter >= 0):
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  case (budgetParameter < 0):
    console.log('Что то пошло не так');
    break;
    }
};
getStatusIncome(budgetDay);
