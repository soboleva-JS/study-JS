let loc;
const countryLocs = {
    'Россия': 'RU',
    'Deutschland': 'DE',
    'United Kingdom': 'EN'
};
const resourses = {
    RU: 'http://localhost:5000/RU',
    EN: 'http://localhost:5000/EN',
    DE: 'http://localhost:5000/DE'
}
const animate = () => {
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

const dataShow = (data) => {
    const init = () => {
        reset();

        const listDefault = document.querySelector('.dropdown-lists__list--default');
        listDefault.style.display = 'block';

        const listDefaultDropDown = listDefault.querySelector('.dropdown-lists__col');

        let flag = false;

        data.forEach((item) => {
            const countryBlock = document.createElement('div');
            countryBlock.classList.add('dropdown-lists__countryBlock');
            countryBlock.innerHTML = `
                <div class="dropdown-lists__total-line">
                <div class="dropdown-lists__country">${item['country']}</div>
                <div class="dropdown-lists__count">${item['count']}</div>
                </div>`;

            for (let k in countryLocs) {
                if ((k === item['country']) && (countryLocs[k] === loc))  flag = true;

            }
            if (flag === true) {

                listDefaultDropDown.prepend(countryBlock);
                const newCities = item['cities'] = item['cities'].sort((a, b) => b.count - a.count);

                for (let i = 0; i < 3; i++) {
                    const cityLine = document.createElement('div');
                    cityLine.classList.add('dropdown-lists__line');
                    cityLine.innerHTML = `
                <div class="dropdown-lists__city dropdown-lists__city--ip">${newCities[i]['name']}</div>
                <div class="dropdown-lists__count">${newCities[i]['count']}</div>`;
                    listDefaultDropDown.childNodes[i].insertAdjacentElement('afterend', cityLine);
                }
            } else {
                listDefaultDropDown.append(countryBlock);
                const newCities = item['cities'] = item['cities'].sort((a, b) => b.count - a.count);

                for (let i = 0; i < 3; i++) {
                    const cityLine = document.createElement('div');
                    cityLine.classList.add('dropdown-lists__line');
                    cityLine.innerHTML = `
                <div class="dropdown-lists__city dropdown-lists__city--ip">${newCities[i]['name']}</div>
                <div class="dropdown-lists__count">${newCities[i]['count']}</div>`;
                    listDefaultDropDown.append(cityLine);
                }
            }
            flag = false;
        })
    };

    const select = () => {

        inputValue(event.target.closest('.dropdown-lists__total-line').childNodes[1].textContent);
        const listDefault = document.querySelector('.dropdown-lists__list--default');
        const listSelect = document.querySelector('.dropdown-lists__list--select');
        animatedLists(listDefault, listSelect);
        reset();
        listSelect.style.display = 'block';
        const listSelectDropDown = listSelect.querySelector('.dropdown-lists__col');

        data.forEach((item) => {
            if (item['country'] === event.target.closest('.dropdown-lists__total-line').childNodes[1].textContent) {
                const countryBlock = document.createElement('div');
                countryBlock.classList.add('dropdown-lists__countryBlock');
                countryBlock.innerHTML = `
                        <div class="dropdown-lists__total-line">
                        <div class="dropdown-lists__country">${item['country']}</div>
                        <div class="dropdown-lists__count">${item['count']}</div>
                        </div>`;
                listSelectDropDown.append(countryBlock);

                item['cities'].forEach((city) => {
                    const cityLine = document.createElement('div');
                    cityLine.classList.add('dropdown-lists__line');
                    cityLine.innerHTML = `
                        <div class="dropdown-lists__city dropdown-lists__city--ip">${city['name']}</div>
                        <div class="dropdown-lists__count">${city['count']}</div>`;
                    listSelectDropDown.append(cityLine);

                })
            }
        })

    };

    const autocomplete = () => {
        reset();
        const listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
        const listAutocompleteCountryBlock = listAutocomplete.querySelector('.dropdown-lists__countryBlock');
        
        listAutocomplete.style.display = 'block';

        data.forEach((item) => {
            item['cities'].forEach((city) => {

                if (city['name'].substr(0, input.value.length).toLowerCase() === input.value.toLowerCase()) {

                    const cityLine = document.createElement('div');
                    cityLine.classList.add('dropdown-lists__line');
                    cityLine.innerHTML = `
                        <div class="dropdown-lists__city dropdown-lists__city--ip">${city['name']}</div>
                        <div class="dropdown-lists__count">${city['count']}</div>`;
                    listAutocompleteCountryBlock.append(cityLine);
                }
            })
        });

        if (listAutocompleteCountryBlock.innerHTML === '') {
            const cityLine = document.createElement('div');
            cityLine.classList.add('dropdown-lists__line');
            cityLine.innerHTML = `    
                <div class="dropdown-lists__city dropdown-lists__city--ip">Ничего не найдено</div>`;
            listAutocompleteCountryBlock.append(cityLine);

        }

        if (input.value === '') {
            document.querySelector('.button').href = '#';
            reset();           
            init();          
        }
    };

    const inputValue = (value) => {
        document.querySelector('.close-button').style.display = 'inline-block';
        document.querySelector('.label').style.display = 'none';
        input.value = value;
        document.querySelector('.button').href = '#';

        data.forEach((item) => {
            item['cities'].forEach((city) => {
                if (city['name'] === value) document.querySelector('.button').href = city['link']
            });
        })
    };

    const reset = () => {
        const listDefault = document.querySelector('.dropdown-lists__list--default');
        const listDefaultDropDown = listDefault.querySelector('.dropdown-lists__col');
        listDefaultDropDown.innerHTML = '';
        listDefault.style.display = 'none';

        const listSelect = document.querySelector('.dropdown-lists__list--select');
        const listSelectDropDown = listSelect.querySelector('.dropdown-lists__col');
        listSelectDropDown.innerHTML = '';
        listSelect.style.display = 'none';

        const listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
        const listAutocompleteCountryBlock = listAutocomplete.querySelector('.dropdown-lists__countryBlock');
        listAutocompleteCountryBlock.innerHTML = '';
        listAutocomplete.style.display = 'none';

    };



    const animatedLists = (list1, list2) => {
        if (list1 && list2) {

            list1.style.transform = "translateX(0px)";
            list1.style['-webkit-transform'] = "translateX(0px)";
            let count1 = 0;
            const animate1 = () => {
                count1 -= 10;
                if (count1 > -200) {
                    list1.style.transform = `translateX(${count1}px)`;
                    list1.style['-webkit-transform'] = `translateX(${count1}px)`;
                    setTimeout(animate1, 10);
                } else {


                    list1.style.display = 'none';
                    list1.style.transform = `translateX(0px)`;
                    list1.style['-webkit-transform'] = `translateX(0px)`;
                }
            }
            animate1();


            list2.style.transform = "translateX(200px)";
            list2.style['-webkit-transform'] = "translateX(200px)";
            list2.style.display = 'block';
            let count2 = 200;
            const animate2 = () => {
                count2 -= 10;
                if (count2 > 0) {
                    list2.style.transform = `translateX(${count2}px)`;
                    list2.style['-webkit-transform'] = `translateX(${count2}px)`;
                    setTimeout(animate2, 10);
                }
            }
            animate2();
        }
    }


    const input = document.getElementById('select-cities');
    input.addEventListener('keyup', () => autocomplete());

    document.addEventListener('click', (event) => {

        if (event.target.closest('#select-cities')) init();

        if (event.target.closest('.dropdown-lists__list--default') && event.target.closest('.dropdown-lists__total-line')) select();

        if (event.target.closest('.dropdown-lists__list--select') && event.target.closest('.dropdown-lists__total-line')) {
            const listDefault = document.querySelector('.dropdown-lists__list--default');
            const listSelect = document.querySelector('.dropdown-lists__list--select');
            animatedLists(listSelect, listDefault);
            init();

        };

        if (event.target.closest('dropdown-lists__country') || event.target.closest('.dropdown-lists__city')) inputValue(event.target.textContent);

        if (event.target.closest('.close-button')) {
            document.querySelector('.button').href = '#';
            event.target.style.display = 'none';
            document.querySelector('.label').style.display = 'inline-block';
            input.value = '';

            reset();
            const listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
            listAutocomplete.style.display = 'none';

            const listSelect = document.querySelector('.dropdown-lists__list--select');
            listSelect.style.display = 'none';

            const listDefault = document.querySelector('.dropdown-lists__list--default');
            listDefault.style.display = 'block';

        }

        if (event.target.closest('.button')) input.value = '';
    })

    window.onbeforeunload = function () {
        localStorage.setItem('citiesData', JSON.stringify(data));
    };

}

const getReadyJson = (url, cb) => {
    fetch(url)
        .then((response) => {

            if (response.status !== 200) throw new Error('network status not 200')
            else animate();
            return response.json();

        })
        .then((response) => cb(response))
        .catch((error) => console.log(error))
}

const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};


if (getCookie('inputCities') === 'RU' || getCookie('inputCities') === 'EN' || getCookie('inputCities') === 'DE') loc = getCookie('inputCities')
else {
    do loc = prompt('Please enter location: RU, EN or DE').trim().toUpperCase()    
    while ((loc !== 'RU') && (loc !== 'DE') && (loc !== 'EN'));
    document.cookie = `inputCities=${loc.toUpperCase()}`;
    localStorage.setItem('citiesData', JSON.stringify(''));
}

let data = JSON.parse(localStorage.getItem('citiesData'));

if (!data || data == null)
    getReadyJson(resourses[loc], data => dataShow(data))
else {
    animate();
    dataShow(data);
}