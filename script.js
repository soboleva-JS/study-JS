'use strict';

function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'freelance',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'аренда, коммуналка'),
    deposit = confirm('Есть ли у вас депозит в банке'),
    mission = 5000000,
    period = 12;

function start () {
  do 
  money = prompt('Какой у вас месячный доход?', 50000);
  while (!isNumber(money));
};

start();

function showTypeOf (data) {
  console.log (data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [],
    expense;

function getExpensesMonth () {
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов','аренда');
    do expense = prompt('Во сколько это обойдется?', 10000);
    while (!isNumber(expense));
    sum += +expense;
  }
  console.log (expenses);
  return sum;

};

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц',expensesAmount);

function getAccumulatedMonth () {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth ();

function getTargetMonth () {
  return Math.ceil(mission/accumulatedMonth);
};

if (getTargetMonth()>0) console.log('Cрок достижения цели в месяцах', getTargetMonth ()) 
  else console.log('Цель не будет достигнута'); 

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
  case (budgetParameter >= 0):
    console.log('К сожалению, у вас уровень дохода ниже среднего');
    break;
  case (budgetParameter < 0):
    console.log('Что то пошло не так');
    break;
    }
};
getStatusIncome(budgetDay);


