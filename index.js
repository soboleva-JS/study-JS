'use strict';
// левая часть
let salaryAmount = document.querySelector('.salary-amount'),
    incomeItems= document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
// правая часть
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue= document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    start = document.getElementById('start'),
    depositCheck = document.querySelector('#deposit-check');

    let isNumber = function (n) {
      return !isNaN(parseFloat(n));
    },
    arrayCapitalizer = function (arr) {
      for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);      
      };
      return arr;
    },
    appData = {
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 3,
    start: function () {
      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getExpensesMonth();      
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getIncome();
      appData.getBudget();
      appData.showResult();
      },
    expensesBlock: function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if  (expensesItems.length === 3) expensesPlus.style.display = 'none';
    },
    incomeBlock: function () {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if  (incomeItems.length === 3) incomePlus.style.display = 'none';
    },
    getExpenses: function() {
      expensesItems.forEach(function (item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
      
        };
      });
    },
    getIncome: function() {
      incomeItems.forEach(function (item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          appData.expenses[itemIncome] = cashIncome;
          appData.incomeMonth += +cashIncome;
      
        };
      });
    },
    showResult: function () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(',');
      additionalncomeValue.value = appData.addIncome.join(',');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth()); //targetAmount.value/appData.budgetMonth;
      incomePeriodValue.value = appData.calcPeriod(); //appData.budgetMonth * periodSelect.value;
      periodSelect.addEventListener('input', () => {incomePeriodValue.value = appData.calcPeriod();});
    },
    getAddExpenses: function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') appData.addExpenses.push(item);

      })
    },
    getAddIncome: function() {
      additionalIncomeItems.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== '') appData.addIncome.push(itemValue);
      })
    },
    getExpensesMonth: function () {
      for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
      }; 
    },
    getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
      return targetAmount.value/appData.budgetMonth;
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
    calcPeriod: function () {
      periodSelect = document.querySelector('.period-select');
      return appData.budgetMonth * periodSelect.value;
    },
    showPeriodRange: function () {
      periodAmount.innerHTML = periodSelect.value;
    },
    salaryEnterCheck: function () {
      start.disabled = true; 
      salaryAmount = document.querySelector('.salary-amount');
      let salary = salaryAmount.value.trim();
      if (salary !== '')  start.disabled = false; 
    },
};
start.disabled = true; 
salaryAmount.addEventListener('input', appData.salaryEnterCheck);
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.expensesBlock);
incomePlus.addEventListener('click', appData.incomeBlock);
periodSelect.addEventListener('input', appData.showPeriodRange);