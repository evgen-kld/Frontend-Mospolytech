'use strict'



export function createListItemElement(place) {
    let element = document.querySelector('.nodeToCopy').cloneNode(true);
    element.classList.remove('d-none');
    element.classList.add('forDelete');
    element.querySelector('.place-list-name').innerHTML = place.name;
    element.querySelector('.place-list-type').innerHTML = place.typeObject;;
    element.querySelector('.place-list-address').innerHTML = place.address;
    element.querySelector('.place-list-area').innerHTML = place.admArea;
    element.querySelector('.place-list-district').innerHTML = place.district;
    element.querySelector('.place-list-sale').innerHTML = place.socialPrivileges ? '+' : '-'
    element.querySelector('.place-list-btn').setAttribute('id', place.id);
    return element;
}

export function renderPageBtn(page) {
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


