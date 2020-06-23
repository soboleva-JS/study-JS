document.addEventListener('DOMContentLoaded', function(){
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
    cancel = document.getElementById('cancel'),
    depositCheck = document.querySelector('#deposit-check');
let isNumber = function (n) {
      return !isNaN(parseFloat(n));
    };
start.disabled = true; 

const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.period = 3;
};

AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getExpensesMonth();      
  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.getBudget();
  this.showResult();
  document.querySelectorAll('input[type=text]').forEach(function (item){
  item.disabled=true;
  });
  start.setAttribute("style", "display: none");
    cancel.setAttribute("style", "display: inline-block");
};
AppData.prototype.reset = function () {     
  periodSelect.value=1;
  periodAmount.textContent=periodSelect.value;
  document.querySelectorAll('input[type=text]').forEach(function (item){
    item.removeAttribute('disabled');
    item.value="";    
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
AppData.prototype.expensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if  (expensesItems.length === 3) expensesPlus.style.display = 'none';
};
AppData.prototype.incomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if  (incomeItems.length === 3) incomePlus.style.display = 'none';
};
AppData.prototype.getExpenses = function() {
  expensesItems.forEach(function (item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    };
  }, this);
};
AppData.prototype.getIncome = function() {
  incomeItems.forEach(function (item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.incomeMonth += +cashIncome;
  
    };
  }, this);
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(',');
  additionalncomeValue.value = this.addIncome.join(',');
  targetMonthValue.value = Math.ceil(this.getTargetMonth()); 
  incomePeriodValue.value = this.calcPeriod(); 
  periodSelect.addEventListener('input', () => {incomePeriodValue.value = this.calcPeriod();});
};
AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== '') this.addExpenses.push(item);
  }, this)
},
AppData.prototype.getAddIncome = function() {
  additionalIncomeItems.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== '') this.addIncome.push(itemValue);
  }, this)
},
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key]; 
    }; 
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value/this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
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
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do this.percentDeposit = parseFloat(prompt ('Какой годовой процент?', 10))
    while (!isNumber(this.percentDeposit));
    do this.moneyDeposit = parseFloat(prompt ('Какая сумма заложена?', 10000))
    while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcPeriod = function () {
  periodSelect = document.querySelector('.period-select');
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.showPeriodRange = function () {
  periodAmount.innerHTML = periodSelect.value;
};
AppData.prototype.salaryEnterCheck = function () {
  start.disabled = true; 
  salaryAmount = document.querySelector('.salary-amount');
  let salary = salaryAmount.value.trim();
  if (salary !== '')  start.disabled = false; 
};
AppData.prototype.eventsListeners = function () {
salaryAmount.addEventListener('input', appData.salaryEnterCheck);
start.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.expensesBlock);
incomePlus.addEventListener('click', appData.incomeBlock);
periodSelect.addEventListener('input', appData.showPeriodRange);
cancel.addEventListener('click', appData.reset.bind(appData));
};

const appData=new AppData ();
appData.eventsListeners();

});