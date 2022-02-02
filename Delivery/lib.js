'use strict'
 
export function showAlert(msg) {
    let alerts = document.querySelector('.alerts');
    let newAlertElement = document.querySelector('.alert-template').cloneNode(true);
    newAlertElement.querySelector('.msg').innerHTML = msg;
    newAlertElement.classList.remove('d-none');
    alerts.append(newAlertElement);
}

export function noRecords() {
    let element = document.createElement('div');
    element.classList.add('d-flex', 'justify-content-center', 'noRecord');
    let textElem = document.createElement('h3');
    textElem.innerHTML = 'Записей нет!';
    element.append(textElem);
    return element;
}

export function renderPageBtn(page, newArray) {
    let lastPage = newArray.length / 10;
    if (document.querySelector('.pagination.d-none')) document.querySelector('.pagination.d-none').classList.remove('d-none');
    let activeBtn = document.querySelector('.page-item.active');
    activeBtn.classList.remove('active');
    let firstBtn = document.querySelector('.page-item.start');
    if (page != 1 && firstBtn.classList.contains("disabled")) {
        firstBtn.classList.remove('disabled');
    }
    let finishBtn = document.querySelector('.page-item.finish');
    if (page != lastPage && finishBtn.classList.contains("disabled")) {
        finishBtn.classList.remove('disabled');
    }
    if (lastPage == 1 || lastPage == 0) {
        let btn = document.querySelector('.pagination');
        btn.classList.add('d-none');
        return;
    }
    if (page == 1) {
        let startBtn = document.querySelector('.page-item.start');
        startBtn.classList.add('disabled');
        let nowBtn = document.querySelector(`.page-link.b1`);
        nowBtn.setAttribute('data-page', 1);
        nowBtn.innerHTML = 1;
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn = document.querySelector(`.page-link.b2`);
        nowBtn.setAttribute('data-page', 2);
        nowBtn.innerHTML = 2;
        nowBtn = document.querySelector(`.page-link.b3`);
        nowBtn.setAttribute('data-page', 3)
        nowBtn.innerHTML = 3;
    }
    if (page == 2) {
        let nowBtn = document.querySelector(`[data-page='${page}']`);
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
    }
    if (page != 2 && page != 1 && page != lastPage) {
        let nowBtn = document.querySelector('.page-link.b2');
        nowBtn.setAttribute('data-page', page);
        nowBtn.innerHTML = page;
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn = document.querySelector('.page-link.b1');
        nowBtn.setAttribute('data-page', page - 1);
        nowBtn.innerHTML = page - 1;
        nowBtn = document.querySelector('.page-link.b3');
        nowBtn.setAttribute('data-page', Number(page) + Number(1));
        nowBtn.innerHTML = Number(page) + Number(1);
    }
    if (page == lastPage) {
        let startBtn = document.querySelector('.page-item.finish');
        startBtn.classList.add('disabled');
        let nowBtn = document.querySelector('.page-link.b3');
        let nowBtnParent = nowBtn.closest('.page-item');
        nowBtnParent.classList.add('active');
        nowBtn.setAttribute('data-page', lastPage);
        nowBtn.innerHTML = lastPage;
        nowBtn = document.querySelector('.page-link.b2');
        nowBtn.setAttribute('data-page', lastPage - 1);
        nowBtn.innerHTML = lastPage - 1;
        nowBtn = document.querySelector('.page-link.b1');
        nowBtn.setAttribute('data-page', lastPage - 2);
        nowBtn.innerHTML = lastPage - 2;
    }
}