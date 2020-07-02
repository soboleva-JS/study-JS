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
});