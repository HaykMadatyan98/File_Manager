import { useState, POSITION, ROOT } from "./const.js";

export function drawRoot(container) {

    let buttonsDiv = createElements('div', [{name: 'id', value: 'buttons_div'}]);
    generatePopUp();
    let button = createElements('input', [{name: 'type', value: 'button'}, {name: 'value', value: 'Add File'}]);
    addEvent(button, 'click', () => openFilePopUp());
    buttonsDiv.append(button);

    button = createElements('input', [{name: 'type', value: 'button'}, {name: 'value', value: 'Add Folder'}]);
    addEvent(button, 'click', () => openFolderPopUp());
    buttonsDiv.append(button);

    container.append(buttonsDiv);

    let file_manager = createElements('div', [{name: 'id', value: 'file_manager'}]);
    var position = createElements('div', [{name: 'id', value: 'position'}]);
    var body = createElements('div', [{name: 'id', value: 'body'}]);
    file_manager.append(position);
    file_manager.append(body);
    container.append(file_manager);
    
    render(position, body, POSITION[POSITION.length - 1]);
}

function render(position, body, URL) {
    getPosition(position, URL);

    body.innerText = '';
    if (URL != 0) {
        let p = document.createElement('p');
        p.innerText = '<--';
        body.appendChild(p);
        p.addEventListener('click', (e) => back(body))
    }
    
    getFiles(body, URL);
}

function generatePopUp(){
    var div = document.createElement('div');
        div.setAttribute('id', 'popUp');
        div.setAttribute('display', 'none');

    var inputName = document.createElement('input');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('type','text');
    inputName.setAttribute('placeholder','Enter name');
    div.append(inputName);

    var inputText = document.createElement('input');
    inputText.setAttribute('id', 'text');
    inputText.setAttribute('type','text');
    inputText.setAttribute('placeholder','Enter text');
    inputText.setAttribute('style','display:none');
    div.append(inputText);

    var inputType = document.createElement('input');
    inputType.setAttribute('id', 'type');
    inputType.setAttribute('type','hidden');
    inputType.setAttribute('value', undefined);
    div.append(inputType);

    let button = document.createElement('input');
    button.setAttribute('id', 'create');
    button.setAttribute('type','button');
    button.setAttribute('value','Create');
    button.setAttribute('disabled', 'disabled');
    div.append(button);

    let cancel = document.createElement('input');
    cancel.setAttribute('id', 'Cancel');
    cancel.setAttribute('type','button');
    cancel.setAttribute('value','Cancel');
    div.append(cancel);
    
    button.addEventListener('click', () => {
        create(POSITION[POSITION.length - 1], inputName.value, inputType.value || undefined, inputText.value);
        inputName.value = '';
        inputText.value = '';
        inputType.value = '';
        div.setAttribute('style', 'display:none');
        inputText.setAttribute('style', 'display:none');
    })

    cancel.addEventListener('click', () => {
        inputName.value = '';
        inputText.value = '';
        inputType.value = '';
        div.setAttribute('style', 'display:none');
        inputText.setAttribute('style', 'display:none');
    })

    inputName.addEventListener('input', (e) => {
        if(e.target.value){
            button.removeAttribute('disabled')
        } else {
            button.setAttribute('disabled', 'disabled');
        }
    })

    ROOT.append(div)
}

function create(pos, name, type, text) {    
    if (type == 'undefined') {
        type = undefined;
        text = undefined;
    }
    useState.setFiles(
        pos,
        name,
        type,
        text,
    )
    render(position, body, pos);
}

function openFilePopUp() {
    let inputType = document.querySelector('#type');
    let inputText = document.querySelector('#text');
    let div = document.querySelector('#popUp');

    div.setAttribute('style', 'display:flex');
    inputText.setAttribute('style', 'display:block');
    inputType.value = '.txt'
}

function openFolderPopUp() {
    let div = document.querySelector('#popUp');

    div.setAttribute('style', 'display:flex');
}

function createElements(type, attributes, event) {
    let element = document.createElement(type);
    if (attributes.length > 0) {
        attributes.forEach(el => {
            element.setAttribute(el.name, el.value);
        });
    }
    return element;
}

function addEvent(container, eventType, func) {
    if (container.length > 1) {
        container.forEach(element => {
            element.addEventListener(eventType, func);
        })
    }
    container.addEventListener(eventType, func);
}

function getPosition(container) {
    container.innerText = '';
    let p = document.createElement('p');
    let pos = POSITION.map(element => {
        if (element == 0) {
            return 'root'
        } else {
            let index = useState.getFiles(0).findIndex(el => el.ID == element);
            return useState.getFiles(0)[index].name
        }
    }).join('/') + '/';
    p.append(pos);
    container.append(p);
}

function getFiles(container, position) {
    let fileList = useState.getFiles(position);
    fileList.forEach(element => {
        let p = document.createElement('p');
        p.innerText = element.name;
        p.setAttribute('id', element.ID);
        if (element.format) {
            addEvent(p, 'click', () => openFile(element))
        } else {
            addEvent(p, 'click', () => openFolder(element))
        }
        container.appendChild(p);
    })
}

function openFile(element) {
    alert(element.text)
}

function openFolder(element) {
    POSITION.push(element.ID);
    render(position, body, POSITION[POSITION.length - 1]);
}

function back(container) {
    POSITION.pop();
    render(position, body, POSITION[POSITION.length - 1])
}