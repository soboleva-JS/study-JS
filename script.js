document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
       const getData = (url) => {

           return new Promise ((resolve,reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) return;
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);                    
                } 
                else {
                    const errorMessage = 'Произошла ошибка';
                    reject(errorMessage);
                }
            });
           })

       }


       const showData  = (data) => {
            data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }            
        });
       }

       const url='./cars.json';



       getData(url)
       .then (showData)
       .catch (error =>console.log(error)) 
    });
});