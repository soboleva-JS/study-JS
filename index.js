document.addEventListener('DOMContentLoaded', function(){
'use strict';
// левая часть
let periodSelect = document.querySelector('.period-select'),
    incomeItems= document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
const salaryAmount = document.querySelector('.salary-amount'),    
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
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
    incomePeriodValue= document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    start = document.getElementById('start'),
    cancel = document.getElementById('cancel');

const isNumber = function (n) {
      return !isNaN(parseFloat(n));
    };
start.disabled = true; 

class AppData {
  constructor (budget=0,budgetDay=0,budgetMonth=0,expensesMonth=0,incomeMonth=0,income={}, addIncome=[],expenses={}, addExpenses=[], deposit=false, percentDeposit=0, moneyDeposit=0, period=3) {
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
  this.percentDeposit = percentDeposit;
  this.moneyDeposit = moneyDeposit;
  this.period = period;
};
start () {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getExpensesMonth();      
  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.getInfoDeposit();
  this.getBudget();
  this.showResult();
  document.querySelectorAll('input[type=text]').forEach(function (item){
  item.disabled=true;
  });
  start.setAttribute("style", "display: none");
  cancel.setAttribute("style", "display: inline-block");
};
reset () {     
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
  depositPercent.style.display='none';
};
expensesBlock () {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if  (expensesItems.length === 3) expensesPlus.style.display = 'none';
};
incomeBlock () {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if  (incomeItems.length === 3) incomePlus.style.display = 'none';
};
getExpenses () {
  const _this=this;
  expensesItems = document.querySelectorAll('.expenses-items');
  expensesItems.forEach(function (item){
    console.log(item.value);
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    };
  },);
};
getIncome () {
  const _this=this;
  incomeItems = document.querySelectorAll('.income-items');
  incomeItems.forEach(function (item){
    console.log(item.value);
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.incomeMonth += +cashIncome;  
    };
  },);
};
showResult () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(',');
  additionalncomeValue.value = this.addIncome.join(',');
  targetMonthValue.value = Math.ceil(this.getTargetMonth()); 
  incomePeriodValue.value = this.calcPeriod(); 
  periodSelect.addEventListener('input', () => {incomePeriodValue.value = this.calcPeriod();});
};
getAddExpenses () {
  const addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== '') this.addExpenses.push(item);
  }, this)
};
getAddIncome () {
  additionalIncomeItems.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== '') this.addIncome.push(itemValue);
  }, this)
};
getExpensesMonth () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key]; 
    }; 
};
getBudget () {
  const monthDeposit = this.moneyDeposit*(this.percentDeposit/100);
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
getTargetMonth () {
  return targetAmount.value/this.budgetMonth;
};
getStatusIncome () {
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
getInfoDeposit () {
  if (this.deposit) {
    this.percentDeposit = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
   
  }
};
calcPeriod () {
  periodSelect = document.querySelector('.period-select');
  return this.budgetMonth * periodSelect.value;
};
showPeriodRange () {
  periodAmount.innerHTML = periodSelect.value;
};
salaryEnterCheck () {
  start.disabled = true; 
  const salary = salaryAmount.value.trim();
  if (salary !== '')  start.disabled = false; 
};
changePercent () {
  const valueSelect = this.value;  
  if (valueSelect === 'other') {
    start.disabled = false;
    depositPercent.style.display='inline-block';
    depositPercent.addEventListener('input', ()=> {
      if ((+depositPercent.value<0)||(+depositPercent.value>100)||(!isNumber(depositPercent.value)))
      {alert('Введите корректное значение в поле проценты');
      start.disabled = true;
      } else {
      start.disabled = false;
      }
  });
  } else {
    depositPercent.value = valueSelect;
  }
};
depositHandler () {
  if (depositCheck.checked) {
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    this.deposit = true;
    depositBank.addEventListener('change', this.changePercent);
  } else {
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositBank.removeEventListener('change', this.changePercent);
  }
};

eventsListeners () {
salaryAmount.addEventListener('input', this.salaryEnterCheck);
start.addEventListener('click', this.start.bind(this));
expensesPlus.addEventListener('click', this.expensesBlock);
incomePlus.addEventListener('click', this.incomeBlock);
periodSelect.addEventListener('input', this.showPeriodRange);
cancel.addEventListener('click', this.reset.bind(this));
depositCheck.addEventListener('change', this.depositHandler.bind(this));
};
};
const appData=new AppData ();
appData.eventsListeners();

});