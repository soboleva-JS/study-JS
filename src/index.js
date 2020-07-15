    'use strict';
    import '@babel/polyfill';
    import 'nodelist-foreach-polyfill';
    import 'fetch-ie8';
    import 'es6-promise';
    import 'formdata-polyfill';
    import 'dom-node-polyfills';
    import elementClosest from 'element-closest';
    elementClosest(window);
    import countTimer from './modules/countTimer';
    import toggleMenu from './modules/toggleMenu';
    import togglePopup from './modules/togglePopup';
    import tubs from './modules/tubs';
    import slider from './modules/slider';
    import togglePicture from './modules/togglePicture';
    import calc from './modules/calc';
    import sendForm from './modules/sendForm';
    import cyrillicInput from './modules/cyrillicInput';
    import maskPhone from './modules/maskPhone';

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.style.display = 'none';



    // таймер
    countTimer('18 July 2020');

    // открытие, закрытие, переход по меню
    toggleMenu();

    //  модальное окно
    togglePopup();

    // табы
    tubs();

    // слайдер
    slider();

    // смена картинок команды     
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
    calc(100);

    // send-ajax-form
    sendForm(document.getElementById('form1'));
    sendForm(document.getElementById('form2'));
    sendForm(document.getElementById('form3'));

    // валидация форм
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        if (form.querySelector(`#${form.id}-name`)) cyrillicInput(`#${form.id}-name`);
        if (form.querySelector(`#${form.id}-message`)) cyrillicInput(`#${form.id}-message`);
        if (form.querySelector(`#${form.id}-phone`)) maskPhone(`#${form.id}-phone`);
    });