class Creat {
    constructor(elName, identification, count, parent) {
        this.el = document.createElement(elName);
        this.el.classList.add(identification);
        this.id = identification + count;
        this.el.id = this.id;
        document.getElementById(parent).appendChild(this.el);
    }
    input(type) {
        this.el.type = type;
    }
    button(event, func, text) {
        this.el.setAttribute(event, func);
        var textBtn = document.createTextNode(text);
        this.el.appendChild(textBtn);
    }
    span(textSpan) {
        this.el.appendChild(document.createTextNode(textSpan));
    }
}

window.onload = getParam;
var boardName;

function getParam() {
    let url = "" + window.location;
    var index = url.indexOf('=') + 1;
    if (index !== -1) {
        boardName = url.slice(index)
        read();
    }
}

function read() {
    let obj = JSON.parse(localStorage.getItem(boardName));
    let length = obj['length'];
    for (let i = 1; i <= length; i++) {
        openCreateBox();
        for (let j = 0; j < obj['addList' + i].length; j++) {
            let task = new Creat("SPAN", 'list-text', '', "addList" + i);
            task.span(obj['addList' + i][j]);
        }
    }
}

var count = 0;

function openCreateBox() {
    var id = "board";
    count++;
    //addList
    var list = new Creat("DIV", "addList", count, id);
    id = list.id

    var input = new Creat("INPUT", 'addInput', count, id);
    input.input('text');

    var saveBtn = new Creat("BUTTON", 'btnList', count, id);
    saveBtn.button("onclick", "save(id)", 'save');

    var delBtn = new Creat("BUTTON", 'btnDelete', count, id);
    delBtn.button("onclick", "delete(id)", 'x');
}


function save(id) {
    let idNum = id.replace(/[^0-9]/g, '');
    let inputTextId = "addInput" + idNum;
    let inputText = document.getElementById(inputTextId).value;
    let addListId = 'addList' + idNum;
    let task = new Creat("SPAN", 'list-text', '', addListId);
    task.span(inputText)


    //set in localStorage
    let obj = JSON.parse(localStorage.getItem(boardName));
    if (obj.hasOwnProperty(addListId)) {
        var newArray = obj[addListId];
        newArray.push(inputText);
        obj[addListId] = newArray;
        localStorage.setItem(boardName, JSON.stringify(obj));
    } else {
        obj[addListId] = [inputText];
        obj['length'] += 1;
        localStorage.setItem(boardName, JSON.stringify(obj));
    }
}