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
    downloadData([area, district, type, sale]);
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        pagination(event.target.dataset.page);
        window.scrollTo(0, 0);
    }
}

function pagination(page) {
    let mas = []
    for (let i = 0; i < 20; i++) {
        mas.push((page - 1) * 10 + i)
    }
    for (i = 0; i < 10; i++) {
        let elem = document.getElementById(mas[i]);
        elem.classList.remove('d-none')
    }
}

function createBtn() {
    let btnElem = document.createElement('div');
    btnElem.classList.add('col-1');
    btnElem.classList.add('d-flex');
    btnElem.classList.add('justify-content-center');
    let textElem = document.createElement('button');
    textElem.classList.add('btn');
    textElem.classList.add('btn-success');
    textElem.setAttribute('type', 'button');
    btnElem.append(textElem);
    return btnElem;
}

function createSale(sale) {
    let saleElem = document.createElement('div');
    saleElem.classList.add('col-2');
    saleElem.classList.add('d-flex');
    saleElem.classList.add('justify-content-center');
    let textElem = document.createElement('h5');
    textElem.innerHTML = sale ? '+' : '-';
    saleElem.append(textElem);
    return saleElem;
}

function createAddress(address, admArea, district) {
    let addressElem = document.createElement('div');
    addressElem.classList.add('col-4');
    let textElem = document.createElement('h5');
    textElem.innerHTML = address + ' ' + admArea + ' ' + district;
    addressElem.append(textElem);
    return addressElem;
}

function createType(type) {
    let typeElem = document.createElement('div');
    typeElem.classList.add('col-2');
    typeElem.classList.add('d-flex');
    typeElem.classList.add('justify-content-center');
    let textElem = document.createElement('h5');
    textElem.innerHTML = type;
    typeElem.append(textElem);
    return typeElem;
}


function createName(name) {
    let nameElem = document.createElement('div');
    nameElem.classList.add('col-3');
    nameElem.classList.add('d-flex');
    nameElem.classList.add('justify-content-center');
    let textElem = document.createElement('h5');
    textElem.innerHTML = name;
    nameElem.append(textElem);
    return nameElem;
}


function createListItemElement(place, i) {
    let element = document.createElement('div');
    element.classList.add('row');
    element.classList.add('my-3');
    element.classList.add('d-none');
    element.id = i;
    element.append(createName(place.name));
    element.append(createType(place.typeObject));
    element.append(createAddress(place.address, place.admArea, place.district));
    element.append(createSale(place.socialPrivileges));
    element.append(createBtn());
    return element;
}

function noRecords() {
    let element = document.createElement('div');
    element.classList.add('d-flex');
    element.classList.add('justify-content-center');
    let textElem = document.createElement('h3');
    textElem.innerHTML = 'Записей нет!';
    element.append(textElem);
    return element;
}

function renderRecords(array){ 
    if (array.length == 0) {
        let placeList = document.querySelector('.place-list');
        placeList.innerHTML = '';
        placeList.append(noRecords());
        return
    }
    let placeList = document.querySelector('.place-list');
    placeList.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        placeList.append(createListItemElement(array[i], i));
    }
    pagination(1);
}

function createArray(array, list) {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        if ((array[i].admArea == list[0] || list[0] == undefined)
                && (array[i].district == list[1] || list[1] == undefined) 
                    && (array[i].typeObject == list[2] || list[2] == undefined)
                         && (array[i].socialPrivileges == list[3] || list[3] == undefined)) {
                 newArray.push(array[i])
             }
    }
    renderRecords(newArray)
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

function createSearch(array) {
    let area = new Set();
    let district = new Set();
    let type = new Set();
    for (let i = 0; i < array.length; i++) {
        area.add(array[i].admArea);
        district.add(array[i].district)
        type.add(array[i].typeObject)
    }
    createSelect(Array.from(area), '.area');
    createSelect(Array.from(district), '.district');
    createSelect(Array.from(type), '.type');
}

function downloadData(list) {
    let url = new URL('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants')
    url.searchParams.set('api_key', 'cbd284a6-b7cd-422c-b305-f3b1a413d861');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        createSearch(this.response);
        createArray(getSortedArray(this.response), list);
    }
    xhr.send();
}

window.onload = function () {
    downloadData([undefined, undefined, undefined, undefined])
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.search-btn').onclick = searchBtnHandler;
}
