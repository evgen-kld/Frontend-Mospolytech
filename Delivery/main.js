let data = null;
let param = [undefined, undefined, undefined, undefined];
let newArray = [];

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
    let activeBtn = document.querySelector('.page-item.active');
    activeBtn.classList.remove('active')
    let firstBtn = document.querySelector('.page-item.start');
    if (page != 1 && firstBtn.classList.contains("disabled")){
        firstBtn.classList.remove('disabled')
    }
    let finishBtn = document.querySelector('.page-item.finish');
    if (page != lastPage && finishBtn.classList.contains("disabled")){
        finishBtn.classList.remove('disabled')
    }
    if (lastPage == 1) {
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
        nowBtnParent = nowBtn.closest('.page-item');
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
        nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
    }
    if (page != 2 && page != 1 && page != 'finish') {
        let nowBtn = document.querySelector('.page-link.b2');
        nowBtn.setAttribute('data-page', page)
        nowBtn.innerHTML = page;
        nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn = document.querySelector('.page-link.b1');
        nowBtn.setAttribute('data-page', page - 1)
        nowBtn.innerHTML = page - 1;
        nowBtn = document.querySelector('.page-link.b3');
        nowBtn.setAttribute('data-page', Number(page) + Number(1))
        nowBtn.innerHTML = Number(page) + Number(1);
    }
    if (page == 'finish' || page == lastPage){
        let startBtn = document.querySelector('.page-item.finish');
        startBtn.classList.add('disabled')
        let nowBtn = document.querySelector('.page-link.b3');
        nowBtnParent = nowBtn.closest('.page-item');
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

function createBtn(id) {
    let btnElem = document.createElement('div');
    btnElem.classList.add('col-1');
    btnElem.classList.add('d-flex');
    btnElem.classList.add('justify-content-center');
    let textElem = document.createElement('button');
    textElem.classList.add('btn');
    textElem.classList.add('btn-success');
    textElem.classList.add('h-25');
    textElem.classList.add('align-items-center');
    textElem.setAttribute('data-bs-toggle', 'modal');
    textElem.setAttribute('data-bs-target', '#task-modal');
    textElem.setAttribute('data-action', 'create');
    textElem.setAttribute('id', id);
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
    element.id = i;
    element.append(createName(place.name));
    element.append(createType(place.typeObject));
    element.append(createAddress(place.address, place.admArea, place.district));
    element.append(createSale(place.socialPrivileges));
    element.append(createBtn(place.id));
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

function renderRecords(array) {
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
}



window.onload = function () {
    downloadData()
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.search-btn').onclick = searchBtnHandler;
}