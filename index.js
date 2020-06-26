document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // левая часть
  let periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
  const salaryAmount = document.querySelector('.salary-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
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
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    depositCheck = document.querySelector('#deposit-check');

  const isNumber = function (n) {
    return !isNaN(parseFloat(n));
  };
  start.disabled = true;

  class AppData {
    constructor(budget = 0, budgetDay = 0, budgetMonth = 0, expensesMonth = 0, incomeMonth = 0, income = {}, addIncome = [], expenses = {}, addExpenses = [], deposit = false, persentDeposit = 0, moneyDeposit = 0, period = 3) {
      this.budget = budget;
      this.budgetDay = budgetDay;
      this.budgetMonth = budgetMonth;
      this.expensesMonth = expensesMonth;
      this.incomeMonth = incomeMonth;
      this.income = income;
      this.addIncome = addIncome;
      this.expenses = expenses;
      this.addExpenses = addExpenses;
      this.deposit = deposit;
      this.percentDeposit = persentDeposit;
      this.moneyDeposit = moneyDeposit;
      this.period = period;
    };
    start() {
      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpInc();
      this.getBudget();
      this.showResult();
      document.querySelectorAll('input[type=text]').forEach(function (item) {
        item.disabled = true;
      });
      start.setAttribute("style", "display: none");
      cancel.setAttribute("style", "display: inline-block");
    };
    reset() {
      periodSelect.value = 1;
      periodAmount.textContent = periodSelect.value;
      document.querySelectorAll('input[type=text]').forEach(function (item) {
        item.removeAttribute('disabled');
        item.value = "";
      });
      start.setAttribute("style", "display: inline-block");
      start.disabled = true;
      cancel.setAttribute("style", "display: none");
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.incomeMonth = 0;
      this.income = 0;
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.period = 0;
    };
    showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(',');
      additionalncomeValue.value = this.addIncome.join(',');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcPeriod();
      });
    };
    getExpensesMonth() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      };
    };
    getBudget() {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
    };
    getStatusIncome() {
      switch (true) {
        case (this.budgetDay >= 1200):
          return ('У вас высокий уровень дохода');
        case (this.budgetDay >= 600):
          return ('У вас средний уровень дохода');
        case (this.budgetDay >= 0):
          return ('К сожалению, у вас уровень дохода ниже среднего');
        case (this.budgetDay < 0):
          return ('Что то пошло не так');
      }
    };
    getInfoDeposit() {
      if (this.deposit) {
        do this.percentDeposit = parseFloat(prompt('Какой годовой процент?', 10))
        while (!isNumber(this.percentDeposit));
        do this.moneyDeposit = parseFloat(prompt('Какая сумма заложена?', 10000))
        while (!isNumber(this.moneyDeposit));
      }
    };
    calcPeriod() {
      periodSelect = document.querySelector('.period-select');
      return this.budgetMonth * periodSelect.value;
    };
    showPeriodRange() {
      periodAmount.innerHTML = periodSelect.value;
    };
    salaryEnterCheck() {
      start.disabled = true;
      const salary = salaryAmount.value.trim();
      if (salary !== '') start.disabled = false;
    };
    // универсальный метод суммирования обязательных доходов и расходов
    getExpInc() {
      const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' && itemAmount !== '') {
          this[startStr][itemTitle] = itemAmount;
        }
      };
      expensesItems = document.querySelectorAll('.expenses-items');
      incomeItems = document.querySelectorAll('.income-items');
      incomeItems.forEach(count);
      expensesItems.forEach(count);
      for (const key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    };
    //универсальный метод добавления строк для доходов и расходов
    addBlock(btnClass, itemsClass) {
      const btn = document.querySelector(`.${btnClass}`);
      const items = document.querySelectorAll(`.${itemsClass}`);
      const cloneIncomeItem = items[0].cloneNode(true);
      items[0].parentNode.insertBefore(cloneIncomeItem, btn);
      items = document.querySelectorAll(`.${itemsClass}`);
      if (items.length === 3) btn.style.display = 'none';
    };
    //универсальный метод вывода дополнительных доходов и расходов
    getAddExpInc() {
      const foo = function (items, addData) {
        items.forEach(function (item) {
          if (item.value) {
            if (item.value.toString().trim() !== '') addData.push(item.value.toString().trim());
          } else {
            if (item.toString().trim() !== '') addData.push(item.toString().trim());
          }
        });
      };
      foo(additionalIncomeItems, this.addIncome);
      const arr = additionalExpensesItem.value.split(',');
      foo(arr, this.addExpenses);
    };
    
    eventsListeners() {
      salaryAmount.addEventListener('input', this.salaryEnterCheck);
      start.addEventListener('click', this.start.bind(this));
      expensesPlus.addEventListener('click', () => this.addBlock('expenses_add', 'expenses-items'));
      incomePlus.addEventListener('click', () => this.addBlock('income_add', 'income-items'));
      periodSelect.addEventListener('input', this.showPeriodRange);
      cancel.addEventListener('click', this.reset.bind(this));
    };
  };
  const appData = new AppData();
  appData.eventsListeners();

});
