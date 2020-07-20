'use strict';
let selectStatus = document.getElementById('select-status');
let selectMovie = document.getElementById('select-movie');

let arr;
const getReadyJson = cb => {
  const request = new XMLHttpRequest();
  request.open('GET', './dbHeroes.json');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200) cb(JSON.parse(request.responseText));
    else new Error(request.statusText);
  })
}

const protection = (fields, obj) => Object.keys(obj)
  .filter(field => fields.includes(field))
  .reduce((newObj, key) => {
    newObj[key] = obj[key]
    return newObj;
  }, {}) 


const tvShowsList = document.querySelector('.tv-shows__list');
const movies = new Set;
const statuses = new Set;
const labels = {
  'name': 'имя',
  'realName': 'настоящее имя',
  'status': 'статус',
  'movies': 'фильмы'
};
const statusValues = {
  'deceased': 'скончался',
  'alive': 'жив',
  'unknown': 'неизвестно',
  'destroyed': 'уничтожен'
};


const getRusStatus = (st) => {
  for (let s in statusValues) {
    if (s === st) return statusValues[s]
  }
};

const renderCard = response => {
  tvShowsList.textContent = '';
  selectStatus.innerHTML = '';
  selectMovie.innerHTML = '';

  response.forEach((item, key, value) => {
    const card = document.createElement('div');
    const keys = Object.keys(item);

      card.innerHTML = `<img class="tv-card__img"
      src="${item['photo']}"
      alt="${item['name']}">`;
      

      card.querySelector('img').onerror = ()=> {
        card.querySelector('img').src ='dbimage/noPhotoAvailable.jpg'
      };

    keys.forEach((key) => {
      if (key == 'movies') {
        item[key].forEach((k) => movies.add(k));
      }
      if (key == 'status') statuses.add(item[key]);

      if (key !== 'photo') {
        let label;

        for (let k in labels) {
          if (k === key) {
            label = labels[k]
          }
        }
        const li = document.createElement('li');
        if (key !== 'status') li.innerHTML = `<i>${label}:</i> ${item[key]}`
        else {

          li.innerHTML = `<i>${label}:</i> ${getRusStatus(item[key])}`;

        }
        card.append(li);
      }

    })
    tvShowsList.append(card);

  });
  let newStatuses = new Set;

  const newMovies = new Set([...movies].sort());
  statuses.forEach((item) => newStatuses.add(getRusStatus(item)));
  newStatuses = new Set([...newStatuses].sort());

  selectMovie = document.getElementById('select-movie');
  let option = document.createElement("option");
  option.value = 'no';
  option.innerHTML = 'Выберите фильм';
  selectMovie.appendChild(option);
  option = document.createElement("option");
  option.value = 'all';
  option.innerHTML = '-Выбрaть все-';
  selectMovie.appendChild(option);
  newMovies.forEach((value, key) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    selectMovie.appendChild(option);
  });

  selectStatus = document.getElementById('select-status');
  option = document.createElement("option");
  option.value = 'no';
  option.innerHTML = 'Выберите статус';
  selectStatus.appendChild(option);
  option = document.createElement("option");
  option.value = 'all';
  option.innerHTML = '-Выбрaть все-';
  selectStatus.appendChild(option);

  newStatuses.forEach((value, key) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    selectStatus.appendChild(option);
  });
}


getReadyJson(data => {
  const newHeroes = data.map(item => protection(['photo', 'name', 'realName', 'movies', 'status'], item)); 
  renderCard(newHeroes);
  let filterHeroes, filterStatuses;

  selectMovie.addEventListener('change', () => {
    selectMovie = document.getElementById('select-movie');
    if (selectMovie.options[selectMovie.selectedIndex].value !== 'all') {
      const f = newHeroes.filter((item) => typeof item.movies === 'object');
      filterHeroes = f.filter((item) => item.movies.includes(selectMovie.options[selectMovie.selectedIndex].value));
      renderCard(filterHeroes);
    } else renderCard(newHeroes);


  })


  selectStatus.addEventListener('change', () => {
    selectStatus = document.getElementById('select-status');
    if (selectStatus.options[selectStatus.selectedIndex].value !== 'all') {
      const s = newHeroes.filter((item) => typeof item.status === 'string');
      filterStatuses = s.filter((item) => getRusStatus(item.status) === selectStatus.options[selectStatus.selectedIndex].value);
      renderCard(filterStatuses);
    } else
      renderCard(newHeroes);
  })


})