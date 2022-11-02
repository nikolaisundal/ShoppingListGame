
//selectors
const todoInput = document.querySelector('.todo-input');
const checkBox = document.querySelector('#showHide');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
const li = document.getElementsByTagName('li');
const resetButton = document.querySelector('.reset-button');
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const formContainer = document.querySelector('.form-container');
const formElement = document.forms[0]
const feedbackModal = document.querySelector('.feedback-modal');
const alreadyExists = document.querySelector('.already-exists');
const notFound = document.querySelector('.not-found');


//array
const feedbackArray = [
    "CongratuWellDone!",
    "Mastermind!",
    "Allright, calm down nerd..",
    "Well played!",
    "Good job!",
    "Good boy/girl/other!",
    "Clever clogs ;)",
    "I'm amazed!",
    "Are you a rocket surgeon?",
    "I'm impressed..",
    "You're too good at this!",
    "Well done, you!"
]

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", hint);
checkBox.addEventListener('change', showHide);
resetButton.addEventListener('click', reset);

//Functions

/* todo.classList.add("fall"); 
        todo.addEventListener("transitionend", function(){
            todo.remove();
        }) */


const changeMode = () => {
    if(checkBox.checked) {
        const todoButton = document.querySelector('.todo-button');
        if (todoButton) {
            todoButton.classList.add("add-flip");
            todoButton.addEventListener("animationend", function(){
            todoButton.removeEventListener('click', addTodo);
            todoButton.remove();
            const attemptButton = document.createElement('button');
            attemptButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            attemptButton.classList.add("attempt-button");
            attemptButton.setAttribute("type", "submit");
            formElement.appendChild(attemptButton);
            attemptButton.classList.add("attempt-flip");
            attemptButton.addEventListener('click', attempt);
            attemptButton.addEventListener("animationend", function(){
                attemptButton.classList.remove("attempt-flip")
            })})
        } else {

            const attemptButton = document.createElement('button');
            attemptButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            attemptButton.classList.add("attempt-button");
            attemptButton.setAttribute("type", "submit");
            formElement.appendChild(attemptButton);
            attemptButton.addEventListener('click', attempt);
        }
        }
        
        
     
        else {
        
        const attemptButton = document.querySelector('.attempt-button');
        if (attemptButton) {
            /* attemptButton.removeEventListener('click', attempt);
            attemptButton.remove(); */
            attemptButton.classList.add("attempt-flip");
            attemptButton.addEventListener("animationend", function(){
            attemptButton.removeEventListener('click', attempt);
            attemptButton.remove();
            const todoButton = document.createElement('button');
            todoButton.innerHTML = '<i class="fas fa-plus-square"></i>';
            todoButton.classList.add("todo-button");
            todoButton.setAttribute("type", "submit");
            formElement.appendChild(todoButton);
            todoButton.classList.add("add-flip");
            todoButton.addEventListener('click', addTodo);
            todoButton.addEventListener("animationend", function(){
                todoButton.classList.remove("add-flip")
            })})
        } else {
        const todoButton = document.createElement('button');
        todoButton.innerHTML = '<i class="fas fa-plus-square"></i>';
        todoButton.classList.add("todo-button");
        todoButton.setAttribute("type", "submit");
        formElement.appendChild(todoButton);
        todoButton.addEventListener('click', addTodo);
        }
    }
}

const triggerAlreadyExists = () => {
    alreadyExists.show();
    setTimeout(() => {
        alreadyExists.close();
    }, 1500)
}

const triggerNotFound = () => {
    notFound.show();
    setTimeout(() => {
        notFound.close();
    }, 1500)
}

const triggerFeedbackModal = () => {
    const getRandomInt = Math.floor(Math.random()*12);
    const feedbackText = document.createElement('p');
    feedbackText.innerText = feedbackArray[getRandomInt];
    feedbackModal.appendChild(feedbackText);
    feedbackModal.show();
    setTimeout(() => {
        feedbackModal.close();
        feedbackModal.removeChild(feedbackText);
    }, 1500)
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal);
    } )
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = button.closest('.modal')
        closeModal(modal);
    } )
})

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

overlay.addEventListener("transitionrun", function(){
    formContainer.classList.toggle('active');
})

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
    
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal);
    })
})

function reset() {
    const ul = document.querySelectorAll('ul li');
    for (let i = 0; i < ul.length; i++) {
        ul[i].parentElement.remove();
    }
    localStorage.removeItem('todoArray')
    if (checkBox.checked === true) {
        localStorage.removeItem('checkbox')
        checkBox.checked = false;
    }
    todoInput.value = "";
}


function showHide() {
    const todoArray = getLocalArray();
    changeMode();
    const ul = document.querySelectorAll('ul li');
    if (ul.length === 0 || checkBox.checked) {
        localStorage.setItem("checkbox", JSON.stringify(checkBox.checked));
    }
    for (let i = 0; i <= ul.length - 1; i++) {
        ul[i].parentElement.remove();
    }
    todoArray.forEach((todo) => {
        todo.exception = false;
    })
    todoArray.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        const shownSpan = document.createElement('span');
        shownSpan.classList.add('shown');
        const hiddenSpan = document.createElement('span');
        hiddenSpan.classList.add('secret');
        newTodo.classList.add('todo-item');
        if (checkBox.checked) {
            localStorage.setItem("checkbox", JSON.stringify(checkBox.checked))
            shownSpan.innerText = todo.item.substring(0, todo.count);
            newTodo.appendChild(shownSpan); 
            hiddenSpan.innerText = todo.item.substring(todo.count);
            newTodo.appendChild(hiddenSpan);
            todoDiv.appendChild(newTodo);
        } else {
            localStorage.setItem("checkbox", JSON.stringify(checkBox.checked))
            shownSpan.innerText = todo.item;
            newTodo.appendChild(shownSpan); 
            newTodo.appendChild(hiddenSpan);
            todoDiv.appendChild(newTodo);
        }
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>'; 
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"><i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        const hintButton = document.createElement('button');
        hintButton.innerHTML = '<i class="fa-regular fa-question"></i>';
        hintButton.classList.add("hint-btn");
        todoDiv.appendChild(hintButton);
        todoList.appendChild(todoDiv);
    })
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
}
        
function attempt(event) {
    event.preventDefault();
    const todoArray = getLocalArray();
    let found = false;
    for (let i = 0; i < todoArray.length; i++) {
        if (todoInput.value.toLowerCase() === todoArray[i].item.toLowerCase()) {
            const items = todoList.getElementsByTagName("li");
            for ( let j = 0; j < items.length; j++) {
                const shownInnerChild = items[j].children[0].innerText;
                const secretInnerChild = items[j].children[1].innerText;
                const concat = shownInnerChild.concat(secretInnerChild);
                if (concat.toLowerCase() === todoArray[i].item.toLowerCase()) {
                    items[j].innerHTML = 
                    `<span class="shown">${todoArray[i].item}</span>`+
                    `<span class="secret">${""}</span>`;
                    const theFirstChild = todoList.firstChild; 
                    const correct = items[j].parentElement;
                    todoList.insertBefore(correct, theFirstChild);
                    //change count so it works with show/hide
                    const itemToMove = 
                    {item: todoArray[i].item,
                    count: todoArray[i].item.length};
                    todoArray.splice(i ,1);
                    todoArray.unshift(itemToMove);
                    triggerFeedbackModal();
                    todoInput.focus();
                    found = true;
                    break;
                } 
            }
        }
    } 
    if (found === false) {
        triggerNotFound();
        todoInput.focus();
    }  
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    todoInput.value = "";
}



function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    const todoArray = getLocalArray();
    let found;
    todoArray.forEach(function(todo) {
        if (todo.item.toLowerCase() === todoInput.value.toLowerCase()) {
            found= true;
        }
    })
    if (found === true) {
        triggerAlreadyExists();
        todoInput.focus();
        return; 
    }
    //push to array
    const todoItem = {
        item: todoInput.value,
        count: 0,
        exception: false
    }
    saveLocalTodos(todoItem);
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create li
    const newTodo = document.createElement('li');
    const shownSpan = document.createElement('span');
    shownSpan.classList.add('shown')
    shownSpan.innerText = todoInput.value;
    newTodo.appendChild(shownSpan); 
    const hiddenSpan = document.createElement('span');
    hiddenSpan.classList.add('secret')
    newTodo.appendChild(hiddenSpan);
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML ='<i class="fa-solid fa-mask"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Hintbutton
    const hintButton = document.createElement('button');
    hintButton.innerHTML = '<i class="fa-regular fa-question"></i>';
    hintButton.classList.add("hint-btn");
    todoDiv.appendChild(hintButton);
    //Append todoDiv to list
    todoList.appendChild(todoDiv);
    //clear todoinput value
    todoInput.value = "";
    }
    
function deleteCheck(e){
    const todoArray = getLocalArray();
    const item = e.target;
    const todo = item.parentElement;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        //remove from array
        const shownInnerChild = todo.getElementsByTagName('li')[0].children[0].innerText;
        const secretInnerChild = todo.getElementsByTagName('li')[0].children[1].innerText;
        const concat = shownInnerChild.concat(secretInnerChild);
        for (let i = 0; i < todoArray.length; i++) {
            if (concat.replaceAll(" ", "") === todoArray[i].item.replaceAll(" ", "")) { 
                todoArray.splice(i, 1);
            }
        }
        //Animation
        todo.classList.add("fall"); 
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }
    // Check mark
    if (item.classList[0] === "complete-btn") {
        const secretInnerChild = todo.children[0].children[1].innerText; 
        const shownInnerChild = todo.children[0].children[0].innerText;
        const concat = shownInnerChild.concat(secretInnerChild);
        todoArray.forEach((todo) => {
            if (todo.item === concat && todo.exception === false) {
                todo.exception = true;
            } else if (todo.item === concat && todo.exception === true)
                todo.exception = false;
        })
        const ul = document.querySelectorAll('ul li');
        for (let i = 0; i <= ul.length - 1; i++) {
            ul[i].parentElement.remove()
        }
        todoArray.forEach(function (todo) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add('todo');
            const newTodo = document.createElement('li');
            const shownSpan = document.createElement('span');
            shownSpan.classList.add('shown')
            const hiddenSpan = document.createElement('span');
            hiddenSpan.classList.add('secret')
            newTodo.classList.add('todo-item');
            if (checkBox.checked) {
                if (todo.exception === true) {
                    shownSpan.innerText = todo.item
                    newTodo.appendChild(shownSpan); 
                    newTodo.appendChild(hiddenSpan);
                    todoDiv.appendChild(newTodo);
                } else {
                shownSpan.innerText = todo.item.substring(0, todo.count);
                newTodo.appendChild(shownSpan); 
                hiddenSpan.innerText = todo.item.substring(todo.count)
                newTodo.appendChild(hiddenSpan);
                todoDiv.appendChild(newTodo);
                }
            } else {
                if (todo.exception === true) {
                    shownSpan.innerText = todo.item.substring(0, todo.count);
                    newTodo.appendChild(shownSpan); 
                    hiddenSpan.innerText = todo.item.substring(todo.count)
                    newTodo.appendChild(hiddenSpan);
                    todoDiv.appendChild(newTodo);
                } else {
                shownSpan.innerText = todo.item
                newTodo.appendChild(shownSpan); 
                newTodo.appendChild(hiddenSpan);
                todoDiv.appendChild(newTodo);
                }
            }
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"><i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
            const hintButton = document.createElement('button');
            hintButton.innerHTML = '<i class="fa-regular fa-question"></i>';
            hintButton.classList.add("hint-btn");
            todoDiv.appendChild(hintButton);
            todoList.appendChild(todoDiv);
        })
    }
    
    if (todoArray.length === 0 && checkBox.checked === true) {
        checkBox.checked = false
        localStorage.setItem("checkbox", JSON.stringify(checkBox.checked))
        changeMode();
    }
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
}





function hint(e){
    const todoArray = getLocalArray();
    const item = e.target;
    if (item.classList[0] === "hint-btn") {
        const todo = item.parentElement;
        const shownInnerChild = todo.getElementsByTagName('li')[0].children[0].innerText;
        const secretInnerChild = todo.getElementsByTagName('li')[0].children[1].innerText;
        const concat = shownInnerChild.concat(secretInnerChild);  
        for (let i = 0; i < todoArray.length; i++) {
            if (concat === todoArray[i].item) {
                todoArray[i].count += 1;
                if(checkBox.checked) {
                    todoArray[i].exception = false;
                } else {
                    todoArray[i].exception = true;
                }
                const shownText = `<span class="shown">${todoArray[i].item.substring(0, todoArray[i].count)}</span>`;
                const hiddenText =`<span class="secret">${todoArray[i].item.substring(todoArray[i].count)}</span>`;
                todo.getElementsByTagName('li')[0].innerHTML = shownText + hiddenText;
            }  
        } 
    } 
    localStorage.setItem('todoArray', JSON.stringify(todoArray));   
} 



function saveLocalTodos(todo) {
    //check if there already is something in local storage.
    const todoArray = getLocalArray();
    todoArray.push(todo)
    localStorage.setItem('todoArray', JSON.stringify(todoArray))
}

function getTodos() {
    let checkBoxCheck = JSON.parse(localStorage.getItem("checkbox"));
    if (checkBoxCheck === true) {
        checkBox.checked = true;
    }
    changeMode();
    const todoArray = getLocalArray();
    //todo parameter = item in todoArray
    todoArray.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        const shownSpan = document.createElement('span');
        shownSpan.classList.add('shown')
        const hiddenSpan = document.createElement('span');
        hiddenSpan.classList.add('secret')
        newTodo.classList.add('todo-item');
        if (checkBox.checked) {
            if (todo.exception === true) {
                shownSpan.innerText = todo.item
                newTodo.appendChild(shownSpan); 
                newTodo.appendChild(hiddenSpan);
                todoDiv.appendChild(newTodo);
            } else {
            shownSpan.innerText = todo.item.substring(0, todo.count);
            newTodo.appendChild(shownSpan); 
            hiddenSpan.innerText = todo.item.substring(todo.count)
            newTodo.appendChild(hiddenSpan);
            todoDiv.appendChild(newTodo);
            }
        } else {
            if (todo.exception === true) {
                shownSpan.innerText = todo.item.substring(0, todo.count);
                newTodo.appendChild(shownSpan); 
                hiddenSpan.innerText = todo.item.substring(todo.count)
                newTodo.appendChild(hiddenSpan);
                todoDiv.appendChild(newTodo);
            } else {
            shownSpan.innerText = todo.item
            newTodo.appendChild(shownSpan); 
            newTodo.appendChild(hiddenSpan);
            todoDiv.appendChild(newTodo);
            }
        }
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"><i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        const hintButton = document.createElement('button');
        hintButton.innerHTML = '<i class="fa-regular fa-question"></i>';
        hintButton.classList.add("hint-btn");
        todoDiv.appendChild(hintButton);
        todoList.appendChild(todoDiv);
    })
}

function getLocalArray () {
    if(localStorage.getItem('todoArray') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('todoArray'))
    }
}