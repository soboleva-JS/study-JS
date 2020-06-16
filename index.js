let startButton,
    plusIncomeBtn,
    plusExpensesBtn,
    depositCheck,
    additionalIncomeItems,
    budgetDay,
    expensesMonth,
    additionalncome,
    additionalExpenses,
    incomePeriod,
    targetMonth,
    salaryAmount,
    incomeTitle,
    incomeAmount,
    expensesTitle,
    expensesAmount,
    additionalExpensesItem,
    depositBank,
    depositAmount,
    depositPercent,
    targetAmount,
    periodSelect,
    periodAmount;

startButton = document.getElementById('start')
console.log('startButton: ', startButton);
plusIncomeBtn = document.getElementsByTagName('button')[0];
console.log('plusIncomeBtn: ', plusIncomeBtn);
plusExpensesBtn = document.getElementsByTagName('button')[1];
console.log('plusExpensesBtn: ', plusExpensesBtn);
depositCheck = document.querySelector('#deposit-check');
console.log('depositCheck: ', depositCheck);
additionalIncomeItems = document.querySelectorAll('.additional_income-item');
console.log('additionalIncomeItems: ', additionalIncomeItems);

budgetDay = document.querySelector('.budget_day-value');
expensesMonth = document.querySelector('.expenses_month-value');
additionalncome = document.querySelector('.additional_income-value');
additionalExpenses = document.querySelector('.additional_expenses-value');
incomePeriod = document.querySelector('.income_period-value');
targetMonth = document.querySelector('.target_month-value');
console.log(budgetDay,    expensesMonth,    additionalncome,    additionalExpenses,    incomePeriod,    targetMonth);

salaryAmount = document.querySelector('.salary-amount');
incomeTitle = document.querySelector('.income-title');
incomeAmount = document.querySelector('.income-amount');
expensesTitle = document.querySelector('.expenses-title');
expensesAmount = document.querySelector('.expenses-amount');
additionalExpensesItem = document.querySelector('.additional_expenses-item');
depositBank = document.querySelector('.deposit-bank');
depositAmount = document.querySelector('.deposit-amount');
depositPercent = document.querySelector('.deposit-percent');
targetAmount = document.querySelector('.target-amount');
periodSelect = document.querySelector('.period-select');
periodAmount = document.querySelector('.period-amount');
console.log(incomeTitle,incomeAmount,expensesTitle,expensesAmount,additionalExpensesItem,depositBank,depositAmount,depositPercent,targetAmount,periodSelect,periodAmount);








