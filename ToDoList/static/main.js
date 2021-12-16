function removeTaskBtnHandler(event) {
    let form = event.target.closest('.modal').querySelector('form');
    document.getElementById(form.elements['task-id'].value).remove();

}

function resetForm(form) {
    form.reset();
    form.querySelector('select').closest('.form-group').classList.remove('d-none');
    form.elements['name'].classList.remove('form-control-plaintext')
    form.elements['description'].classList.remove('form-control-plaintext')
}

function updateTask(form) {
    let taskElement = document.getElementById(form.elements['task-id'].value)
    taskElement.querySelector('.task-name').textContent = form.elements['name'].value;
    taskElement.querySelector('.task-description').textContent = form.elements['description'].value;
}

function setFormValues(form, taskId) {
    let taskElement = document.getElementById(taskId);
    form.elements['name'].value = taskElement.querySelector('.task-name').textContent;
    form.elements['description'].value = taskElement.querySelector('.task-description').textContent;
    form.elements['task-id'].value = taskId;
}


function showAlert(msg, category='success') {
    let alertsContainer = document.querySelector('.alerts');
    let newAlert = document.querySelector('.alert-template').cloneNode(true);
    newAlert.querySelector('.msg').innerHTML = msg;
    newAlert.classList.remove('d-none');
    alertsContainer.append(newAlert);
}


function crateTaskElement(form) {
    let newTaskElement = document.getElementById('task-template').cloneNode(true);
    newTaskElement.id = taskCounter++;
    newTaskElement.querySelector('.task-name').textContent = form.elements['name'].value
    newTaskElement.querySelector('.task-description').textContent = form.elements['description'].value
    newTaskElement.classList.remove('d-none');
    form.reset();
    return newTaskElement; 
}

function actionTaskBtnHandler(event) {
    let alertMsg;
    let form = this.closest('.modal').querySelector('form');
    let action = form.elements['action'].value;
    if (action == 'new') {
        document.getElementById(`${form.elements['colomn'].value}-list`).append(crateTaskElement(form));
        alertMsg = `Задача ${form.elements['name'].value} была успешно создана!`;      
    } else if (action == 'edit') {
        updateTask(form);
        alertMsg = `Задача ${form.elements['name'].value} была успешно обновлена!`;
    }
    if (alertMsg) {
        showAlert(alertMsg, 'success');
    }
}




let taskCounter = 0;


let titles = {
    'new': 'Создание новой задачи',
    'edit': 'Редактирование задачи',
    'show': 'Просмотр задачи'
};

let actionBtnText = {
    'new': 'Создать',
    'edit': 'Редактировать',
    'show': 'Ок'
};


window.onload = function () {
    document.querySelector('.action-task-btn').onclick = actionTaskBtnHandler;
    var exampleModal = document.getElementById('task-modal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
        let form = this.querySelector('form');
        resetForm(form);
        let action = event.relatedTarget.dataset.action || 'new';
        form.elements['action'].value = action;
        this.querySelector('.modal-title').textContent = titles[action];
        this.querySelector('.action-task-btn').textContent = actionBtnText[action];
        if (action == 'edit' || action == 'show') {
            setFormValues(form, event.relatedTarget.closest('.task').id);
            this.querySelector('select').closest('.form-group').classList.add('d-none');
        }     
        if (action == 'show') {
            form.elements['name'].classList.add('form-control-plaintext')
            form.elements['description'].classList.add('form-control-plaintext')
        }       
    });
    var exampleModal = document.getElementById('remove-task-modal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
        let taskElement = event.relatedTarget.closest('.task');
        let form = this.querySelector('form');
        form.elements['task-id'].value = taskElement.id;
        this.querySelector('.task-name').textContent = taskElement.querySelector('.task-name').textContent;
    });
    document.querySelector('.remove-task-btn').onclick = removeTaskBtnHandler;
}