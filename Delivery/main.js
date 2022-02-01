'use strict'

// import {pagination, createListItemElement, renderPageBtn, pageBtnHandler} from './lib.js'

let json = null
let data = null;
let param = [undefined, undefined, undefined, undefined]; //[округ, район, тип, скидка]
let newArray = [];
let selectPlace = [];
let totalPrice = [1, 0, 0] //[быстрая доставка, подарок, стоимость]
let setArray = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
}
// let json = JSON.parse(`{
//     "set1": [
//       "Салат Цезарь",
//       "Салат Айсберг, помидоры черри, куриное филе в кляре, обжаренное во фритюре, сыр пармезан, соус цезарь, чесночные сухари.",
//       "staticIndex/s1.png"
//     ],
//     "set2": [
//       "Салат Греческий",
//       "Помидор, салат айсберг, огурец, перец болгарский, маслины, лук красный, сыр брынза, соус песто.",
//       "staticIndex/s2.png"
//     ],
//     "set3": [
//       "Мисо-Суп",
//       "Грибы шиитаке, вакаме, мисо паста темная, мисо паста светлая, приправа хондаши, сыр тофу, лук зеленый, белый кунжут жареный.",
//       "staticIndex/s3.png"
//     ],
//     "set4": [
//       "Ролл Филадельфия",
//       "Лосось, огурец, сыр сливочный.",
//       "staticIndex/s4.png"
//     ],
//     "set5": [
//       "Поке с Креветками",
//       "Креветки жареные, рис, салат айсберг, огурец, помидоры черри, такуан, сыр сливочный, водоросли маринованные чука, соус соевый, соус гамадари, белый кунжут.",
//       "staticIndex/s5.png"
//     ],
//     "set6": [
//       "Поке с Курицей",
//       "Куриное филе в кляре, обжаренное во фритюре, рис, салат айсберг, огурец, помидоры черри, такуан, сыр сливочный, водоросли маринованные чука, соус терияки, соус гамадари, белый кунжут.",
//       "staticIndex/s6.png"
//     ],
//     "set7": [
//       "Пицца Пепперони",
//       "Пицца, которая не оставит равнодушным ни одного гурмана: нежнейшее тесто, таящий во рту сыр моцарелла в сочетании с пепперони и томатным соусом.",
//       "staticIndex/s7.png"
//     ],
//     "set8": [
//       "Пицца Маргарита",
//       "Вкусное, тонкое тесто, сладкие помидоры и сыр моцарелла, украшенные сверху петрушкой – ингредиенты вашего идеального вечера.",
//       "staticIndex/s8.png"
//     ],
//     "set9": [
//       "Пицца Гавайская",
//       "Отличное сочетание нежного сыра моцарелла с куриной грудкой холодного копчения и консервированными ананасами в гавайском соусе для любителей необычных сочетаний.",
//       "staticIndex/s9.png"
//     ],
//     "set10": [
//       "Клубничный Пирог",
//       "Восхитительный пирог со всежей клубникой и творогом.",
//       "staticIndex/s10.png"
//     ]
// }`)

function countTotalPrice() {
    totalPrice[2] = 0
    if (totalPrice[1] != 0) totalPrice[2] -= Number(setArray[totalPrice[1]]) * eval('selectPlace.set_' + totalPrice[1])
    for (let i = 1; i < 11; i++) {
        if (setArray[i] != 0) {
            totalPrice[2] += Number(setArray[i]) * eval('selectPlace.set_' + i)
        }
    }
    totalPrice[2] *= totalPrice[0]
    document.querySelector('.totalPrice').innerHTML = `Итого: ${Math.round(totalPrice[2])} рублей`
    document.querySelector('.modal-totalPrice').innerHTML = `Итого: ${Math.round(totalPrice[2])} рублей`
}

function updateDeliveryOptions(event) {
    totalPrice[0] = (event.target.checked) ? 1.2 : 1
    countTotalPrice()
}

function updatePresentOptions(event) {
    if (event.target.checked) {
        totalPrice[1] = Math.floor(Math.random() * 10) + 1
        setArray[totalPrice[1]] += 1
    }
    else {
        setArray[totalPrice[1]] -= 1
        totalPrice[1] = 0
    }
}

function createStrInTable(key, i) {
    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.setAttribute('scope', 'row')
    th.innerHTML = i
    tr.append(th)
    th = document.createElement('th')
    th.innerHTML = json[`set${key}`][0]
    tr.append(th)
    th = document.createElement('th')
    th.classList.add('d-flex', 'justify-content-center')
    th.innerHTML = setArray[key]
    tr.append(th)
    return tr
}

function createOptionsInModal() {
    let elem = document.querySelector('.modal-option')
    elem.innerHTML = ''
    if (totalPrice[0] == 1 && totalPrice[1] == 0) {
        let option = document.createElement('div');
        option.classList.add('h5');
        option.innerHTML = 'Вы не выбрали дополнительных опций'
        elem.append(option)
    }
    if (totalPrice[0] == 1.2) {
        let option = document.createElement('div');
        option.classList.add('h4');
        option.innerHTML = 'Быстрая доставка'
        elem.append(option)
    }
    if (totalPrice[1] != 0) {
        let option = document.createElement('div');
        option.classList.add('h4');
        option.innerHTML = `Подарок (${eval('json.set' + totalPrice[1] + '[0]')})`
        elem.append(option)
    }
}

function updateModal() {
    document.getElementById('modal-name').value = selectPlace.name
    document.getElementById('modal-area').value = selectPlace.admArea
    document.getElementById('modal-district').value = selectPlace.district
    document.getElementById('modal-address').value = selectPlace.address
    document.getElementById('modal-rate').value = selectPlace.rate
    let table = document.querySelector('.tb')
    table.innerHTML = ''
    let i = 1
    for (var key in setArray) {
        if (setArray[key] > 0) {
            table.append(createStrInTable(key, i))
            i++
        }
    }
    createOptionsInModal()
}

function renderRecords(array) {
    let placeList = document.querySelector('.place-list');
    if (placeList.querySelector('.noRecord')) placeList.querySelector('.noRecord').remove()
    while (placeList.querySelector('.forDelete-list')) placeList.querySelector('.forDelete-list').remove();
    if (array.length == 0) {
        placeList.append(noRecords());
        return
    }
    for (let i = 0; i < array.length; i++) {
        placeList.append(createListItemElement(array[i]));
    }
}


function changeOrder(event) {
    setArray[(event.target.dataset.number)] = event.target.value;
    countTotalPrice();
}

function renderMenu() {
    for (let i = 1; i < 11; i++) {
        let elem = document.querySelector('.forCopy').cloneNode(true);
        elem.classList.remove('d-none')
        elem.classList.add('forDelete')
        elem.querySelector('.menu-name').innerHTML = json[`set${i}`][0]
        elem.querySelector('.menu-description').innerHTML = json[`set${i}`][1]
        elem.querySelector('.menu-img').setAttribute('src', json[`set${i}`][2])
        elem.querySelector('.input-group').classList.add(`numberOfSets-${i - 1}`)
        elem.querySelector('.input-group').setAttribute('data-number', i)
        elem.querySelector('.menu-price').innerHTML = selectPlace[`set_${i}`] + ' р.'
        document.querySelector('.options').before(elem)
    }
}

function placeBtnHandler(event) {
    if (event.target.id == '') return
    document.querySelector('.menu').classList.remove('d-none')
    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == event.target.id) selectPlace = newArray[i]
    }
    while (document.querySelector('.forDelete')) document.querySelector('.forDelete').remove()
    renderMenu()
}

function getSortedArray(array) {
    array.sort(function (a, b) {
        if (Number(a.rate) < Number(b.rate))
            return -1;
        if (Number(a.rate) > Number(b.rate))
            return 1;
        return 0;
    })
    return array
}

function searchBtnHandler() {
    let area = document.querySelector('.area').value;
    let district = document.querySelector('.district').value;
    let type = document.querySelector('.type').value;
    let sale = document.querySelector('.sale').checked;
    if (area == 'null') area = undefined;
    if (district == 'null') district = undefined;
    if (type == 'null') type = undefined;
    param = [area, district, type, sale];
    createArray();
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        pagination(event.target.dataset.page);
    }
}

function renderPageBtn(page) {
    let lastPage = newArray.length / 10
    if (document.querySelector('.pagination.d-none')) document.querySelector('.pagination.d-none').classList.remove('d-none')
    let activeBtn = document.querySelector('.page-item.active');
    activeBtn.classList.remove('active')
    let firstBtn = document.querySelector('.page-item.start');
    if (page != 1 && firstBtn.classList.contains("disabled")) {
        firstBtn.classList.remove('disabled')
    }
    let finishBtn = document.querySelector('.page-item.finish');
    if (page != lastPage && finishBtn.classList.contains("disabled")) {
        finishBtn.classList.remove('disabled')
    }
    if (lastPage == 1 || lastPage == 0) {
        btn = document.querySelector('.pagination');
        btn.classList.add('d-none')
        return
    }
    if (page == 1 || page == 'start') {
        let startBtn = document.querySelector('.page-item.start');
        startBtn.classList.add('disabled')
        let nowBtn = document.querySelector(`.page-link.b1`);
        nowBtn.setAttribute('data-page', 1)
        nowBtn.innerHTML = 1
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn = document.querySelector(`.page-link.b2`);
        nowBtn.setAttribute('data-page', 2)
        nowBtn.innerHTML = 2
        nowBtn = document.querySelector(`.page-link.b3`);
        nowBtn.setAttribute('data-page', 3)
        nowBtn.innerHTML = 3
    }
    if (page == 2) {
        let nowBtn = document.querySelector(`[data-page='${page}']`);
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
    }
    if (page != 2 && page != 1 && page != 'finish') {
        let nowBtn = document.querySelector('.page-link.b2');
        nowBtn.setAttribute('data-page', page)
        nowBtn.innerHTML = page;
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn = document.querySelector('.page-link.b1');
        nowBtn.setAttribute('data-page', page - 1)
        nowBtn.innerHTML = page - 1;
        nowBtn = document.querySelector('.page-link.b3');
        nowBtn.setAttribute('data-page', Number(page) + Number(1))
        nowBtn.innerHTML = Number(page) + Number(1);
    }
    if (page == 'finish' || page == lastPage) {
        let startBtn = document.querySelector('.page-item.finish');
        startBtn.classList.add('disabled')
        let nowBtn = document.querySelector('.page-link.b3');
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn.setAttribute('data-page', lastPage)
        nowBtn.innerHTML = lastPage;
        nowBtn = document.querySelector('.page-link.b2');
        nowBtn.setAttribute('data-page', lastPage - 1)
        nowBtn.innerHTML = lastPage - 1;
        nowBtn = document.querySelector('.page-link.b1');
        nowBtn.setAttribute('data-page', lastPage - 2)
        nowBtn.innerHTML = lastPage - 2;
    }
}

function pagination(page) {
    if (page == 'start') page = 1
    if (page == 'finish') page == newArray.length / 10
    let arr = newArray.slice((page - 1) * 10, (page - 1) * 10 + 10)
    renderRecords(arr)
    renderPageBtn(page)
}



function createListItemElement(place) {
    let element = document.querySelector('.nodeToCopy').cloneNode(true);
    element.classList.remove('d-none');
    element.classList.add('forDelete-list')
    element.querySelector('.place-list-name').innerHTML = place.name;
    element.querySelector('.place-list-type').innerHTML = place.typeObject;;
    element.querySelector('.place-list-address').innerHTML = place.address;
    element.querySelector('.place-list-area').innerHTML = place.admArea;
    element.querySelector('.place-list-district').innerHTML = place.district;
    element.querySelector('.place-list-sale').innerHTML = place.socialPrivileges ? '+' : '-'
    element.querySelector('.place-list-btn').setAttribute('id', place.id);
    return element;
}

function noRecords() {
    let element = document.createElement('div');
    element.classList.add('d-flex', 'justify-content-center', 'noRecord');
    let textElem = document.createElement('h3');
    textElem.innerHTML = 'Записей нет!';
    element.append(textElem);
    return element;
}



function createArray() {
    newArray = [];
    for (let i = 0; i < data.length; i++) {
        if ((data[i].admArea == param[0] || param[0] == undefined)
            && (data[i].district == param[1] || param[1] == undefined)
            && (data[i].typeObject == param[2] || param[2] == undefined)
            && (data[i].socialPrivileges == param[3] || param[3] == undefined)) {
            newArray.push(data[i])
        }
    }
    pagination(1);
}

function createSelect(array, name) {
    let arrayElement = document.querySelector(name);
    for (let i = 0; i < array.length; i++) {
        let text = document.createElement('option');
        text.innerHTML = array[i];
        text.setAttribute('value', array[i])
        arrayElement.append(text);
    }
}

function createSearch() {
    let area = new Set();
    let district = new Set();
    let type = new Set();
    for (let i = 0; i < data.length; i++) {
        area.add(data[i].admArea);
        district.add(data[i].district)
        type.add(data[i].typeObject)
    }
    createSelect(Array.from(area), '.area');
    createSelect(Array.from(district), '.district');
    createSelect(Array.from(type), '.type');
}

function downloadData() {
    let url = new URL('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants')
    url.searchParams.set('api_key', 'cbd284a6-b7cd-422c-b305-f3b1a413d861');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        data = this.response
        data = getSortedArray(data)
        createSearch();
        createArray();
    }
    xhr.send();
    let address = './static/menu.json'
    let xhr1 = new XMLHttpRequest();
    xhr1.open('GET', address);
    xhr1.responseType = 'json';
    xhr1.onload = function () {
        json = this.response
    }
    xhr1.send();
}



window.onload = function () {
    downloadData()
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.search-btn').onclick = searchBtnHandler;
    document.querySelector('.place-list').onclick = placeBtnHandler;
    document.querySelector('.menu').oninput = changeOrder;
    document.querySelector('.btn-info').onclick = updateModal;
    document.getElementById('getQuickDelivery').onclick = updateDeliveryOptions;
    document.getElementById('getPresent').onclick = updatePresentOptions;
}