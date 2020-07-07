window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // таймер
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
  countTimer('10 July 2020');

  // открытие, закрытие, переход по меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu'),
      main = document.querySelector('main');
    const handlerMenu = () => {
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    };
    const scroll = function (event) {
      event.preventDefault();
      if (event.target.getAttribute('href')) document.getElementById(event.target.getAttribute('href').slice(1)).scrollIntoView({
        behavior: 'smooth'
      })
      else document.getElementById(event.target.parentNode.getAttribute('href').slice(1)).scrollIntoView({
        behavior: 'smooth'
      })
    };
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('close-btn') || event.target.classList.contains('menu') || event.target.closest('.menu')) handlerMenu()
      else if (event.target.tagName == 'A' && event.target.closest('menu')) {
        handlerMenu();
        scroll(event)
      } else if (event.target.closest('a') && event.target.closest('main')) scroll(event)
      else if ((menu.style.transform = `translate(0)`) && !event.target.closest('menu')) handlerMenu()

    })
  };
  toggleMenu();

  //  модальное окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtn = document.querySelectorAll('.popup-btn');

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
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup-close')) popup.style.display = 'none'
      else if (!event.target.closest('.popup-content')) popup.style.display = 'none'
    });
  }
  togglePopup();

  // табы
  const tubs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target.closest('.service-header-tab');
      while (target !== tabHeader) {
        if (target) {
          tab.forEach((item, i) => {
            if (item === target) toggleTabContent(i)
          });
          return;
        }
        target = target.parentNode;
      }
    });
  };
  tubs();

  // слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content');

    let i = 0;
    const dots = document.querySelector('.portfolio-dots');

    while (i < slide.length) {
      const newDot = document.createElement('li');
      newDot.classList.add('dot');
      dots.append(newDot);
      i++;
    }

    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) currentSlide = 0;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time)
    };

    const stopSlide = (time) => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      if (!event.target.matches('.portfolio-btn, .dot')) return;

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (event.target.matches('#arrow-right')) currentSlide++
      else if (event.target.matches('#arrow-left')) currentSlide--
      else if (event.target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === event.target) currentSlide = index;
        })
      }

      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });
    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn, .dot')) stopSlide();

    });
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn, .dot')) startSlide();
    });

    startSlide(1500);
  };
  slider();
  // смена картинок команды
  const togglePicture = () => {
    if (event.target.tagName !== 'IMG') return;
    const changeImg = event.target.dataset.img;
    if (changeImg) {
      event.target.dataset.img = event.target.src;
      event.target.src = changeImg;
    }
  }
  const command = document.getElementById('command');
  command.addEventListener('mouseover', togglePicture);
  command.addEventListener('mouseout', togglePicture);

  // ввод только цифр в инпуты
  const calculator = document.getElementById('calc');
  const inputs = calculator.querySelectorAll('input');
  inputs.forEach((item) => {
    item.addEventListener('input', () => item.value = item.value.replace(/\D/g, ''));
  })

  // калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    }

    calcBlock.addEventListener('change', (event) => {
      if (event.target.matches('select') || event.target.matches('input')) {
        countSum();
      }
    })
  }
  calc(100);

});