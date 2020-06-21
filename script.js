document.addEventListener('DOMContentLoaded', function () {  
  'use strict';
  let firstName,
      lastName,
      registerBtn  = document.querySelector('.register-btn'),
      loginBtn = document.querySelector('.login-btn'),
      list = document.querySelector('.list'),
      user = document.querySelector('.user-name'),
      appData = [],
      arrMonth = ['января','февраля', 'марта' , 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  let zero = function (n) {
      if (n<10) return '0'+n; 
      else return n;
      },
      getDate = function (currentDate=new Date()) {
        let yyyy,
            m,
            dd,
            hh,
            MM,
            ss,
            str,
            hour;
        yyyy =currentDate.getFullYear();
        m = arrMonth[currentDate.getMonth()];
        dd = zero(currentDate.getDate());
        hh = zero(currentDate.getHours());
        MM = zero(currentDate.getMinutes());
        ss = zero(currentDate.getSeconds());
        str = `${dd} ${m} ${yyyy} г., ${hh}:${MM}:${ss}`;
        return str;
        
      },
      userNameCheck = function(data) {
        let arr = data.split(' ');
        if (arr.length ===2) {
          firstName=arr[0].trim();
          lastName=arr[1].trim(); 
          return true
        };
      },
      render = function () {
      list.textContent = '';
      appData.forEach(function(item) {
      const li = document.createElement('li');
      li.classList.add('item');
      li.innerHTML = '<span><span> Имя: ' +item.userFirstName+', фамилия: '+item.userLastName+', логин: '+item.userLogin+', пароль: '+item.userPassword+'</span>'+', дата регистрации: '+
      '<span class="user-date">'+item.userDate+'</span></span>'+
      '<button class="remove"></button>'
      '</div>';  
      list.append(li);
      
      const remove = li.querySelector('.remove');
      
      remove.addEventListener('click',  function() {
        appData.splice(appData.findIndex(item => item.userDate === this.parentNode.querySelector('.user-date').textContent), 1);
        render();
      });

      });
    };

registerBtn.addEventListener('click', function() {
  let userFirstName,
      userLastName,
       nameSurname;
  do nameSurname = prompt ('Введите имя и фамилию', 'Таня Соболева').trim()
  while (!userNameCheck(nameSurname));
  let login = prompt ('Введите логин', 'Tata'),
      password = prompt ('Введите пароль', 'qwerty'),
      newUser = {
      userFirstName: firstName,
      userLastName: lastName,
      userLogin: login,
      userPassword: password,
      userDate: getDate(),
  };
  if (appData !== null) {appData.push(newUser)}
  else {appData = [newUser]};
  render();
});

loginBtn.addEventListener('click', function() {
  let promptLogin = prompt ('Введите логин', 'Tata').trim(),
      promptPassword = prompt ('Введите пароль', 'qwerty').trim();
  if (appData.findIndex(item => item.userLogin === promptLogin)>-1) {    
    console.log('ступень 1');
    if (appData.findIndex(item => item.userPassword === promptPassword)>-1) {
      user.textContent = promptLogin;      
    } else alert('Пользователь не найден');
  } 
  
});

appData = JSON.parse (localStorage.getItem ('appData'));
if (appData !== null) render(); 
window.onbeforeunload = function () {
  localStorage.setItem ('appData', JSON.stringify(appData));
};    
});