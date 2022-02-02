'use strict'
 
function showAlert() {
    let alerts = document.querySelector('.alerts');
    let newAlertElement = document.querySelector('.alert-template').cloneNode(true);
    newAlertElement.querySelector('.msg').innerHTML = 'Записей нет!';
    newAlertElement.classList.remove('d-none');
    alerts.append(newAlertElement);
}

export function noRecords() {
    showAlert()
    let element = document.createElement('div');
    element.classList.add('d-flex', 'justify-content-center', 'noRecord');
    let textElem = document.createElement('h3');
    textElem.innerHTML = 'Записей нет!';
    element.append(textElem);
    return element;
}