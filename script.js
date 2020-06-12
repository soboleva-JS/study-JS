'use strict';

let money,
    isNumber = function (n) {
      return !isNaN(parseFloat(n));
    },
    start = function () {
      do money = prompt('Какой у вас месячный доход?', 50000);
      while (!isNumber(money));
    };

start();

let appData = {
    budget: parseFloat(money),
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 120,
    asking: function () {
      let key;
      appData.deposit = confirm('Есть ли у вас депозит в банке');
      for (let i = 0; i < 4; i++) {
      key = prompt('Введите обязательную статью расходов','аренда');
      do appData.expenses[key] = parseFloat(prompt('Во сколько это обойдется?', 10000));
      while (!isNumber(appData.expenses[key]));
      };
    },
    getExpensesMonth: function () {
      for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
      }; 
    },
    getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
      appData.period = Math.ceil(appData.mission/appData.budgetMonth);
    },
    getStatusIncome: function () {
      switch (true) {
        case (appData.budgetDay >= 1200):
          return ('У вас высокий уровень дохода');
          
        case (appData.budgetDay >= 600):
          return ('У вас средний уровень дохода');
          
        case (appData.budgetDay >= 0):
          return ('К сожалению, у вас уровень дохода ниже среднего');
          
        case (appData.budgetDay < 0):
          return ('Что то пошло не так');
          
          }
      },
};
    
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Расходы за месяц', appData.expenses);
console.log('За какой период будет достигнута цель (в месяцах)', appData.period);
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ', key, appData[key] )

  }; 