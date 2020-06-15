'use strict';

let money,
    isNumber = function (n) {
      return !isNaN(parseFloat(n));
    },
    isString = function (n) {
      return (!(n == '')) && (!(n == '0')) &&(!isNumber(n));
    },
    start = function () {
      do money = prompt('Какой у вас месячный доход?', 50000);
      while (!isNumber(money));
    },
    arrayCapitalizer = function (arr) {
      for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);      
      };
      return arr;
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {
      let cashIncome,
      itemIncome,
      key,
      addExpenses;

      do addExpenses = prompt(' Перечислите возможные расходы через запятую', ' еда,    коммуналка  ,  интернет ').trim()
      while (!isString(addExpenses));
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      for (let j = 0; j < appData.addExpenses.length; j++) 
      appData.addExpenses[j] = appData.addExpenses[j].trim();

      if (confirm('Есть ли у вас дополнительный источник заработка?')) {
        do itemIncome = (prompt ('Какой у вас дополнительный заработок?', 'таксую').trim());
        while (!isString(itemIncome));        
        do {
          cashIncome = parseFloat (prompt ('Сколько вы на этом зарабатываете?', 10000));
        }
        while (!isNumber(cashIncome));
        appData.income[itemIncome] = cashIncome;
      };
      appData.deposit = confirm('Есть ли у вас депозит в банке');
      for (let i = 0; i < 4; i++) {
        do key = (prompt('Введите обязательную статью расходов','аренда').trim());
        while (!isString(key));     
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
      return Math.ceil(appData.mission/appData.budgetMonth);
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
    getInfoDeposit: function () {
      if (appData.deposit) {
        do appData.percentDeposit = parseFloat(prompt ('Какой годовой процент?', 10))
        while (!isNumber(appData.percentDeposit));
        do appData.moneyDeposit = parseFloat(prompt ('Какая сумма заложена?', 10000))
        while (!isNumber(appData.moneyDeposit));
      }
    },
    calcSavedMoney: function () {
      return appData.budgetMonth * appData.period;
    }
};
    
appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log('Расходы за месяц', appData.expenses);
console.log('За какой период будет достигнута цель (в месяцах)', appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ', key, appData[key] )

  }; 

appData.getInfoDeposit();
console.log (appData, appData.calcSavedMoney());
console.log ('Возможные расходы', arrayCapitalizer(appData.addExpenses).join(', '));

  