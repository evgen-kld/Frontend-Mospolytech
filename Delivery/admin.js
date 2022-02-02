'use strict'

import {noRecords, showAlert, renderPageBtn} from './lib.js'

let newArray = [];
let activeTask = null;
let data = null;
let urlAddress = 'http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants';
let apiKey = 'cbd284a6-b7cd-422c-b305-f3b1a413d861';
let param = ['null', 'null', 'null', false, "", false, "", "", 0, 0]; 
//[округ, район, тип, скидка, название, сетевой, мест с, мест по, дата с, дата по]

function searchBtnHandler() {
    param[0] = document.querySelector('.area').value;
    param[1] = document.querySelector('.district').value;
    param[2] = document.querySelector('.type').value;
    param[3] = document.querySelector('.sale').checked;
    param[4] = document.querySelector('.name').value;
    param[5] = document.querySelector('.net').checked;
    param[6] = document.querySelector('.open-date-from').value;
    param[7] = document.querySelector('.open-date-to').value;
    param[8] = document.querySelector('.seat-from').value;
    param[9] = document.querySelector('.seat-to').value;
    filterArray();
}

function deleteItem() {
    let url = new URL(urlAddress + '/' + activeTask);
    url.searchParams.set('api_key', apiKey);
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        showAlert(Object.values(this.response));
    }
    xhr.send();
}

function createBtn() {
    let url = new URL(urlAddress)
    url.searchParams.set('api_key', apiKey);
    let formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    // formData.append('isNetObject', document.querySelector('input[name="isNet"]:checked').value);
    formData.append('operatingCompany', 'aaa');
    formData.append('typeObject', document.getElementById('type').value);
    formData.append('admArea ', document.getElementById('area').value);
    formData.append('district', document.getElementById('district').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('publicPhone', document.getElementById('phoneNumber').value);
    formData.append('rate', 11111);
    formData.append('seatsCount ', document.getElementById('numberOfGuest').value);
    formData.append('socialDiscount', 50);
    // formData.append('socialPrivileges', document.querySelector('input[name="social"]:checked').value);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        showAlert(Object.values(this.response));
    }
    xhr.send(formData);
}

function showItemModal(selectPlace) {
}

function editItemModal(selectPlace) {
}

function removeItemModal(selectPlace) {
    document.querySelector('.task-name').innerHTML = selectPlace.name;
}

function placeBtnHandler(event) {
    if (event.target.classList[0] != 'fas') return;
    activeTask = event.target.dataset.id;
    let selectPlace = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == activeTask) {
            selectPlace = data[i];
        }
    }
    if (event.target.classList[1] == 'show') showItemModal(selectPlace);
    if (event.target.classList[1] == 'edit') editItemModal(selectPlace);
    if (event.target.classList[1] == 'remove') removeItemModal(selectPlace);
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        pagination(event.target.dataset.page);
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
    while (document.querySelector('.forDelete-list')) document.querySelector('.forDelete-list').remove();
    let placeList = document.querySelector('.place-list');
    if (placeList.querySelector('.noRecord')) placeList.querySelector('.noRecord').remove()
    while (placeList.querySelector('.forDelete')) placeList.querySelector('.forDelete').remove();
    if (array.length == 0) {
        placeList.append(noRecords());
        showAlert('Записей нет!')
        return;
    }
    for (let i = 0; i < array.length; i++) {
        placeList.append(createListItemElement(array[i]));
    }
}

function pagination(page) {
    if (page == 'start') page = 1;
    if (page == 'finish') page = newArray.length / 10;
    let arr = newArray.slice((page - 1) * 10, (page - 1) * 10 + 10);
    renderRecords(arr);
    renderPageBtn(page, newArray);
}

function filterArray() {
    newArray = [];
    for (let i = 0; i < data.length; i++) {
        if ((data[i].admArea == param[0] || param[0] == 'null')
            && (data[i].district == param[1] || param[1] == 'null')
            && (data[i].typeObject == param[2] || param[2] == 'null')
            && (data[i].socialPrivileges == param[3] || param[3] == false)
            && (`${data[i].name}`.includes(param[4]) || param[4] == "")
            && (data[i].isNetObject == param[5] || param[5] == false)
            ) {
            newArray.push(data[i]);
        }
    }
    pagination(1);
}

function createSelect(array, name) {
    let arrayElement = document.querySelector(name);
    for (let i = 0; i < array.length; i++) {
        let text = document.createElement('option');
        text.innerHTML = array[i];
        text.setAttribute('value', array[i]);
        arrayElement.append(text);
    }
}

function createSearch() {
    let area = new Set();
    let district = new Set();
    let type = new Set();
    for (let i = 0; i < data.length; i++) {
        area.add(data[i].admArea);
        district.add(data[i].district);
        type.add(data[i].typeObject);
    }
    createSelect(Array.from(area), '.area');
    createSelect(Array.from(district), '.district');
    createSelect(Array.from(type), '.type');
}

function downloadData() {
    let url = new URL(urlAddress)
    url.searchParams.set('api_key', apiKey);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        data = this.response;
        createSearch();
        filterArray();
    }
    xhr.send();
}

window.onload = function () {
    downloadData()
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.place-list').onclick = placeBtnHandler;
    document.querySelector('.delete-task-btn').onclick = deleteItem;
    document.querySelector('.search-btn').onclick = searchBtnHandler;
    document.querySelector('.create-btn').onclick = createBtn;
}