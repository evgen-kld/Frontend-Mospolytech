'use strict'

import {noRecords, showAlert, renderPageBtn} from './lib.js'

let action = [];
let titles = {
    'create': 'Создание новой записи',
    'show': 'Просмотр записи',
    'edit': 'Редактирование записи'
};
let actionBtnText = {
    'create': 'Создать',
    'show': 'Ок',
    'edit': 'Обновить'
};
let newArray = [];
let activeTask = null;
let data = null;
let urlAddress = 'http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants';
let apiKey = 'cbd284a6-b7cd-422c-b305-f3b1a413d861';
let selectPlace = null;
let param = ['null', 'null', 'null', false, "", false, "", "", 0, 0]; 
//[округ, район, тип, скидка, название, сетевой, мест с, мест по, дата с, дата по]

function editSend() {
    let url = new URL(urlAddress + '/' + activeTask)
    url.searchParams.set('api_key', apiKey);
    let formData = new FormData();
    console.log(selectPlace)
    if (selectPlace['name'] != document.getElementById('name').value) formData.append('name', document.getElementById('name').value);
    if (selectPlace['typeObject'] != document.getElementById('type').value) formData.append('typeObject', document.getElementById('type').value);
    if (selectPlace['admArea'] != document.getElementById('area').value) formData.append('admArea', document.getElementById('area').value);
    if (selectPlace['district'] != document.getElementById('district').value) formData.append('district', document.getElementById('district').value);
    if (selectPlace['address'] != document.getElementById('address').value) formData.append('address', document.getElementById('address').value);
    if (selectPlace['seatsCount'] != document.getElementById('numberOfGuest').value) formData.append('seatsCount', document.getElementById('numberOfGuest').value);
    if (selectPlace['publicPhone'] != document.getElementById('phoneNumber').value) formData.append('publicPhone', document.getElementById('phoneNumber').value);
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (this.status == 200) {
            showAlert('Запись успешно обновлена!');
        }
        else {
            showAlert(Object.values(this.response));
        }
        downloadData();
        document.querySelector('.name').value = document.getElementById('name').value;
        document.querySelector('.search-btn').onclick();
    }
    xhr.send(formData);
}

function createSend() {
    let url = new URL(urlAddress)
    url.searchParams.set('api_key', apiKey);
    let formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    // formData.append('isNetObject', document.querySelector('input[name="isNet"]:checked').value); сервер не работает с этим параметром
    // console.log(document.querySelector('input[name="isNet"]:checked').value)
    formData.append('typeObject', document.getElementById('type').value);
    formData.append('admArea ', document.getElementById('area').value);
    formData.append('district', document.getElementById('district').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('seatsCount', document.getElementById('numberOfGuest').value);
    // formData.append('socialPrivileges', document.querySelector('input[name="social"]:checked').value);
    formData.append('publicPhone', document.getElementById('phoneNumber').value);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (this.status == 200) {
            showAlert('Запись успешно создана!');
        }
        else {
            showAlert(Object.values(this.response));
        }
        downloadData();
        document.querySelector('.name').value = document.getElementById('name').value;
        document.querySelector('.search-btn').onclick();
    }
    xhr.send(formData);
}

function actionBtnHandler() {
    if (action == 'show') return
    if (action == 'create') {
        createSend();
    }
    if (action == 'edit') {
        editSend();
    }
}

function resetForm(form) {
    form.reset();
    form.elements['name'].classList.remove('form-control-plaintext');
    form.elements['isNet1'].disabled = false;
    form.elements['isNet1'].removeAttribute('checked', '')
    form.elements['isNet2'].disabled = false;
    form.elements['isNet2'].removeAttribute('checked', '')
    form.elements['type'].classList.remove('form-control-plaintext');
    form.elements['area'].classList.remove('form-control-plaintext');
    form.elements['district'].classList.remove('form-control-plaintext');
    form.elements['address'].classList.remove('form-control-plaintext');
    form.elements['numberOfGuest'].classList.remove('form-control-plaintext');
    form.elements['social1'].disabled = false;
    form.elements['social1'].removeAttribute('checked', '')
    form.elements['social2'].disabled = false;
    form.elements['social2'].removeAttribute('checked', '')
    form.elements['phoneNumber'].classList.remove('form-control-plaintext');
}

function prepareModalContent(event) {
    let form = event.target.querySelector('form');
    resetForm(form);
    action = event.relatedTarget.dataset.action;
    event.target.querySelector('.modal-title').innerHTML = titles[action];
    event.target.querySelector('.action-btn').innerHTML = actionBtnText[action];
    if (action == 'edit' || action == 'show') {
        activeTask = event.relatedTarget.firstElementChild.dataset.id;
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id == activeTask) selectPlace = newArray[i]; //не стал делать скрытый параметр, а повесил номер на id каждой кнопки 
        }
        form.elements['name'].value = selectPlace['name'];
        if (selectPlace['isNetObject']) {
            form.elements['isNet1'].setAttribute('checked', '');
        }
        else {
            form.elements['isNet2'].setAttribute('checked', '');
        }
        form.elements['type'].value = selectPlace['typeObject'];
        form.elements['area'].value = selectPlace['admArea'];
        form.elements['district'].value = selectPlace['district'];
        form.elements['address'].value = selectPlace['address'];
        form.elements['numberOfGuest'].value = selectPlace['seatsCount'];
        if (selectPlace['socialPriveleges']) {
            form.elements['social1'].setAttribute('checked', '');
        }
        else {
            form.elements['social1'].setAttribute('checked', '');
        }
        form.elements['phoneNumber'].value = selectPlace['publicPhone'];
    }

    if (action == 'show') {
        form.elements['name'].classList.add('form-control-plaintext');
        form.elements['isNet1'].disabled = true
        form.elements['isNet2'].disabled = true
        form.elements['type'].classList.add('form-control-plaintext');
        form.elements['area'].classList.add('form-control-plaintext');
        form.elements['district'].classList.add('form-control-plaintext');
        form.elements['address'].classList.add('form-control-plaintext');
        form.elements['numberOfGuest'].classList.add('form-control-plaintext');
        form.elements['social1'].disabled = true
        form.elements['social2'].disabled = true
        form.elements['phoneNumber'].classList.add('form-control-plaintext');
    }
}

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
        if (this.status == 200) {
            showAlert(`Запись №${Object.values(this.response)} успешно удалена!`);
        }
        else {
            showAlert(Object.values(this.response));
        }
        downloadData();
        document.querySelector('.search-btn').onclick();
    }
    xhr.send();
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
    element.querySelector('.btn-remove').setAttribute('data-id', place.id);;
    return element;
}

function renderRecords(array) {
    while (document.querySelector('.forDelete-list')) document.querySelector('.forDelete-list').remove();
    let placeList = document.querySelector('.place-list');
    if (placeList.querySelector('.noRecord')) placeList.querySelector('.noRecord').remove()
    while (placeList.querySelector('.forDelete')) placeList.querySelector('.forDelete').remove();
    if (array.length == 0) {
        placeList.append(noRecords());
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
    document.getElementById('update-modal').addEventListener('show.bs.modal', prepareModalContent);
    document.querySelector('.action-btn').onclick = actionBtnHandler;
}