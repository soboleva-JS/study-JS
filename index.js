const animate = () => {
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);

}

const getReadyJson = (cb) => {
    fetch('db_cities.json')

        .then((response) => {
            if (response.status !== 200) throw new Error('network status not 200')
            else animate();
            return response.json()
        })
        .then((response) => cb(response))
        .catch((error) => console.log(error))
}

getReadyJson(data => {
    const init = () => {
        reset();
        const listDefault = document.querySelector('.dropdown-lists__list--default');

        listDefault.style.display = 'block';

        const listDefaultDropDown = listDefault.querySelector('.dropdown-lists__col');

        data['RU'].forEach((item) => {
            const countryBlock = document.createElement('div');
            countryBlock.classList.add('dropdown-lists__countryBlock');
            countryBlock.innerHTML = `
                <div class="dropdown-lists__total-line">
                <div class="dropdown-lists__country">${item['country']}</div>
                <div class="dropdown-lists__count">${item['count']}</div>
                </div>`;
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
        })
    };

    const select = () => {

        inputValue(event.target.closest('.dropdown-lists__total-line').childNodes[1].textContent);
        const listDefault = document.querySelector('.dropdown-lists__list--default');
        const listSelect = document.querySelector('.dropdown-lists__list--select');
        animatedLists(listDefault, listSelect);
        const listSelectDropDown = listSelect.querySelector('.dropdown-lists__col');

        data['RU'].forEach((item) => {
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
                listSelectDropDown.addEventListener('click', () => {
                    if (event.target.closest('.dropdown-lists__total-line')) {
                        inputValue(event.target.closest('.dropdown-lists__total-line').childNodes[1].textContent);
                        listSelectDropDown.innerHTML = '';
                        animatedLists(listSelect, listDefault);
                        listDefault.style.display = 'block';

                    }
                })
            }
        })

    };

    const autocomplete = () => {
        const listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
        const listAutocompleteCountryBlock = listAutocomplete.querySelector('.dropdown-lists__countryBlock');
        listAutocompleteCountryBlock.innerHTML = '';

        const listDefault = document.querySelector('.dropdown-lists__list--default');
        listDefault.style.display = 'none';

        listAutocomplete.style.display = 'block';

        data['RU'].forEach((item) => {
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
            listAutocomplete.style.display = 'none';
            const listSelect = document.querySelector('.dropdown-lists__list--select');
            listSelect.style.display = 'none';

            const listDefault = document.querySelector('.dropdown-lists__list--default');
            listDefault.style.display = 'block';
        }
    };

    const inputValue = (value) => {
        document.querySelector('.close-button').style.display = 'inline-block';
        document.querySelector('.label').style.display = 'none';
        input.value = value;
        document.querySelector('.button').href = '#';

        data['RU'].forEach((item) => {
            item['cities'].forEach((city) => {
                if (city['name'] === value) document.querySelector('.button').href = city['link']
            });
        })
    };

    const reset = () => {
        const listDefault = document.querySelector('.dropdown-lists__list--default');
        const listDefaultDropDown = listDefault.querySelector('.dropdown-lists__col');
        listDefaultDropDown.innerHTML = '';

        const listSelect = document.querySelector('.dropdown-lists__list--select');
        const listSelectDropDown = listSelect.querySelector('.dropdown-lists__col');
        listSelectDropDown.innerHTML = '';

        const listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
        const listAutocompleteCountryBlock = listAutocomplete.querySelector('.dropdown-lists__countryBlock');
        listAutocompleteCountryBlock.innerHTML = '';
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

        if (event.target.closest('.dropdown-lists__list--default') && event.target.closest('.dropdown-lists__col') && event.target.closest('.dropdown-lists__total-line')) select();

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
    })
});