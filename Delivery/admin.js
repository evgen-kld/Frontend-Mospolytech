// import {createListItemElement} from './lib.js'
activeTask = null;
data = null;
let param = [undefined, undefined, undefined, undefined];

function deleteItem() {
    let url = new URL('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants/' + activeTask)
    url.searchParams.set('api_key', 'cbd284a6-b7cd-422c-b305-f3b1a413d861');
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        console.log(this.response)
    }
    xhr.send();
}

function showItemModal(selectPlace) {

}

function editItemModal(selectPlace) {

}

function removeItemModal(selectPlace) {
    document.querySelector('.task-name').innerHTML = selectPlace.name
}


function placeBtnHandler(event) {
    if (event.target.classList[0] != 'fas') return
    activeTask = event.target.dataset.id
    let selectPlace = null
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == activeTask) {
            selectPlace = data[i]
        }
    }
    if (event.target.classList[1] == 'show') showItemModal(selectPlace)
    if (event.target.classList[1] == 'edit') editItemModal(selectPlace)
    if (event.target.classList[1] == 'remove') removeItemModal(selectPlace)
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
        nowBtnParent = nowBtn.closest('.page-item');
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

function createListItemElement(place) {
    let element = document.querySelector('.nodeToCopy').cloneNode(true);
    element.classList.remove('d-none');
    element.classList.add('forDelete');
    element.querySelector('.place-list-name').innerHTML = place.name;
    element.querySelector('.place-list-type').innerHTML = place.typeObject;;
    element.querySelector('.place-list-address').innerHTML = place.address;
    element.querySelector('.place-list-area').innerHTML = place.admArea;
    element.querySelector('.place-list-district').innerHTML = place.district;
    element.querySelector('.btn-show').setAttribute('data-id', place.id);
    element.querySelector('.btn-edit').setAttribute('data-id', place.id);
    element.querySelector('.btn-remove').setAttribute('data-id', place.id);
    return element;
}


function renderRecords(array) {
    let placeList = document.querySelector('.place-list');
    if (placeList.querySelector('.noRecord')) placeList.querySelector('.noRecord').remove()
    while (placeList.querySelector('.forDelete')) placeList.querySelector('.forDelete').remove();
    if (array.length == 0) {
        placeList.append(noRecords());
        return
    }
    for (let i = 0; i < array.length; i++) {
        placeList.append(createListItemElement(array[i]));
    }
}

function pagination(page) {
    if (page == 'start') page = 1
    if (page == 'finish') page == newArray.length / 10
    let arr = newArray.slice((page - 1) * 10, (page - 1) * 10 + 10)
    renderRecords(arr)
    renderPageBtn(page)
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
        createSearch();
        createArray();
    }
    xhr.send();
}

window.onload = function () {
    downloadData()
    document.querySelector('.place-list').onclick = placeBtnHandler;
    document.querySelector('.delete-task-btn').onclick = deleteItem;
}