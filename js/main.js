window.onload = getParam;
class Create {
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


function getParam() {
    var boardName;
    return function() {
        let url = "" + window.location;
        var index = url.indexOf('=') + 1;
        if (index !== -1) {
            return boardName = url.slice(index)
            read();
        }
    }
}

function read() {
    document.getElementById('h1').innerHTML = 'Welcome to board ' + boardName + "!!!";
    let obj = JSON.parse(localStorage.getItem(boardName));
    let length = obj['length'];

    for (let i = 1; i <= length; i++) {
        let newArray = obj['addList' + i];
        openCreateBox();
        for (let j = 0; j < obj['addList' + i].length; j++) {
            let task = new Create("SPAN", 'list-text', '', "addList" + i);
            let tick = new Create('img', 'tick', '', 'addList' + i);
            task.span(obj['addList' + i][j].inputText);

            if (obj['addList' + i][j].condition === true) {
                tick.el.classList = 'tick1';
            } else {
                tick.el.classList = 'tick';
            }
            tick.onclick = tick();
        }
    }
}

function openCreateBox() {
    var count = 0;
    return function() {
        var id = "board";
        count++;
        //addList
        var list = new Create("DIV", "addList", count, id);
        id = list.id;

        var input = new Create("INPUT", 'addInput', count, id);
        input.input('text');

        var saveBtn = new Create("BUTTON", 'btnList', count, id);
        saveBtn.button("onclick", "save(id)", 'save');

        var delBtn = new Create("BUTTON", 'btnDelete', count, id);
        delBtn.button("onclick", "deleteList(id)", 'X');
    }
}

function deleteList(id) {

    let deleteList = document.getElementById(id);
    let list = deleteList.parentNode;
    deleteList.parentNode.parentNode.removeChild(list);
    var obj = JSON.parse(localStorage.getItem(boardName));
    let idNum = list.id.replace(/[^0-9]/g, '');
    delete obj[list.id];

    renameProp = (
        oldProp,
        newProp, {
            [oldProp]: old,
            ...others
        }) => ({
        [newProp]: old,
        ...others
    })

    for (let i = idNum; i < obj.length; i++) {
        idNum++;
        obj = renameProp('addList' + idNum, 'addList' + i, obj);
    }

    obj.length -= 1;
    localStorage.setItem(boardName, JSON.stringify(obj));
}

function save(id) {
    let inputObj = {};
    let idNum = id.replace(/[^0-9]/g, '');
    let inputTextId = "addInput" + idNum;

    inputObj.inputText = document.getElementById(inputTextId).value;
    if (inputObj.inputText !== '') {
        inputObj.condition = false;
        let addListId = 'addList' + idNum;
        let task = new Create("span", 'list-text', '', addListId);
        task.el.setAttribute('draggable', 'true');
        let tick = new Create("img", 'tick', '', addListId);
        tick.onclick = tick(inputObj);

        task.span(inputObj.inputText);

        let obj = JSON.parse(localStorage.getItem(boardName));
        if (obj.hasOwnProperty(addListId)) {
            var newArray = obj[addListId];
            newArray.push(inputObj);
            obj[addListId] = newArray;
            localStorage.setItem(boardName, JSON.stringify(obj));
        } else {
            obj[addListId] = [inputObj];
            obj['length'] += 1;
            localStorage.setItem(boardName, JSON.stringify(obj));
        }
    }
}

function tick(inputObj) {

    tick.el.classList.toggle('tick1');
    let objNew = JSON.parse(localStorage.getItem(boardName));
    let index = newArray.indexOf(inputObj);
    if (inputObj.condition === false) {
        inputObj.condition = true;
    } else {
        inputObj.condition = false;
    }
    objNew[addListId].splice(index, 1, inputObj);
    localStorage.setItem(boardName, JSON.stringify(objNew));
}