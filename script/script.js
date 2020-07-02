window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }
    const updateClock = () => {
      let timer = getTimeRemaining();
      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(updateClock, 1000);
      } else {
        timerHours.textContent = (timer.hours.toString().length == 2) ? (timer.hours) : ('0' + timer.hours);
        timerMinutes.textContent = (timer.minutes.toString().length == 2) ? (timer.minutes) : ('0' + timer.minutes);
        timerSeconds.textContent = (timer.seconds.toString().length == 2) ? (timer.seconds) : ('0' + timer.seconds);
      }
    }
    setInterval(updateClock, 1000);
  }
  countTimer('3 July 2020');

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(item => item.addEventListener('click', handlerMenu));

    const scroll = function () {
      event.preventDefault();
      console.log('event: ', event.target);
      if (event.target.getAttribute('href')) document.getElementById(event.target.getAttribute('href').slice(1)).scrollIntoView({
        behavior: 'smooth'
      })
      else document.getElementById(event.target.parentNode.getAttribute('href').slice(1)).scrollIntoView({
        behavior: 'smooth'
      })
    };

    menuItems.forEach((item) => {
      item.addEventListener('click', scroll)
    });
    const arrowDown = document.querySelector('main>a');
    console.log('arrowDown: ', arrowDown);
    arrowDown.addEventListener('click', scroll);
  };
  toggleMenu();

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    const modalAnimate = () => {
      popup.style.display = 'block';
      popupContent.style.transform = "translateX(-1000px)";
      popupContent.style['-webkit-transform'] = "translateX(-1000px)";
      let count = -1000;
      const animate = () => {
        count += 50;
        if (count < -50) {
          popupContent.style.transform = `translateX(${count}px)`;
          popupContent.style['-webkit-transform'] = `translateX(${count}px)`;
          setTimeout(animate, 10);
        }
      }
      animate();
    };
    popupBtn.forEach((item) => item.addEventListener('click', () => {
      if (document.documentElement.clientWidth > 768) modalAnimate()
      else
        popup.style.display = 'block';
    }));
    popupClose.addEventListener('click', () => popup.style.display = 'none');
  }
  togglePopup();


});