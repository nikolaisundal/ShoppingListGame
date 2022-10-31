
//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const checkBox = document.querySelector('#showHide');
const attemptButton = document.querySelector('.attempt-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
const li = document.getElementsByTagName('li');
const resetButton = document.querySelector('.reset-button')
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const formContainer = document.querySelector('.form-container')
const formElement = document.querySelector('.form')
const feedbackModal = document.querySelector('.feedback-modal')
const alreadyExists = document.querySelector('.already-exists')
const notFound = document.querySelector('.not-found')

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
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", hint);
/* filterOption.addEventListener("click", filterTodo); */
attemptButton.addEventListener('click', attempt);
checkBox.addEventListener('change', showHide);
resetButton.addEventListener('click', reset);

//Functions

const triggerAlreadyExists = () => {
    alreadyExists.show()
    setTimeout(() => {
        alreadyExists.close();
    }, 1500)
}

const triggerNotFound = () => {
    notFound.show()
    setTimeout(() => {
        notFound.close();
    }, 1500)
}

const triggerFeedbackModal = () => {
    const getRandomInt = Math.floor(Math.random()*12)
    const feedbackText = document.createElement('p')
    feedbackText.innerText = feedbackArray[getRandomInt]
    feedbackModal.appendChild(feedbackText)
    feedbackModal.show()
    setTimeout(() => {
        feedbackModal.close();
        feedbackModal.removeChild(feedbackText)
    }, 1200)
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    } )
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = button.closest('.modal')
        closeModal(modal)
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
        closeModal(modal)
    })
})

function reset() {
    const ul = document.querySelectorAll('ul li');
    for (let i = 0; i < ul.length; i++) {
        ul[i].parentElement.remove()
    }
    localStorage.removeItem('todoArray')
    if (checkBox.checked === true) {
        localStorage.removeItem('checkbox')
        checkBox.checked = false;
    }
    todoInput.value = "";
}


function showHide() {
    let todoArray;
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
    const ul = document.querySelectorAll('ul li');
    //Wow..
    if (ul.length === 0 || checkBox.checked) {
        localStorage.setItem("checkbox", JSON.stringify(checkBox.checked))
    }
    for (let i = 0; i <= ul.length - 1; i++) {
        ul[i].parentElement.remove()
    }
    todoArray.forEach((todo) => {
        todo.exception = false;
    })
    todoArray.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        //Create li
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
            /* localStorage.removeItem("checkbox"); */localStorage.setItem("checkbox", JSON.stringify(checkBox.checked))
            shownSpan.innerText = todo.item;
            newTodo.appendChild(shownSpan); 
            newTodo.appendChild(hiddenSpan);
            todoDiv.appendChild(newTodo);
        }
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>'; 
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
    })
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
}
        
function attempt(event) {
    event.preventDefault();
    let todoArray;
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
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
                    found = true;
                    break;
                } 
            }
        }
    } 
    if (found === false) {
        triggerNotFound();
    }  
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    todoInput.value = "";
}





//funker ikke med arrow function her;]
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    let todoArray;
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
    let found
    todoArray.forEach(function(todo) {
        if (todo.item.toLowerCase() === todoInput.value.toLowerCase()) {
            found= true
        }
    })
    if (found === true) {
        triggerAlreadyExists();
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
    /* let checkBoxCheck = JSON.parse(localStorage.getItem("checkbox")); */
    let todoArray;
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
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
        //remove from local storage
        
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
            //Check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>';
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
        })
    }
    
    if (todoArray.length === 0 && checkBox.checked === true) {
        /* localStorage.removeItem("checkbox"); */
        checkBox.checked = false
        localStorage.setItem("checkbox", JSON.stringify(checkBox.checked))
    }
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
}





function hint(e){
    let todoArray;
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
    const item = e.target;
    if (item.classList[0] === "hint-btn") {
        const todo = item.parentElement;
        /* if(todo.getElementsByTagName('li')[0].classList[1] === "completed"){
            console.log("hei")
            todo.getElementsByTagName('li')[0].classList.remove("completed")
        } */
        const shownInnerChild = todo.getElementsByTagName('li')[0].children[0].innerText;
        const secretInnerChild = todo.getElementsByTagName('li')[0].children[1].innerText;
        const concat = shownInnerChild.concat(secretInnerChild);
        /* todoArray.forEach((todo) => {
            if (concat === todo.item) {
                todo.count +=1;
            }
        }) */
        /* const ul = document.querySelectorAll('ul li');
        for (let i = 0; i <= ul.length - 1; i++) {
            ul[i].parentElement.remove()
        } */
        
          
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


/* function filterTodo(e) {
    const todos= todoList.childNodes;
    
}

 */

function saveLocalTodos(todo) {
    //check if there already is something in local storage.
    let todoArray;
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
    todoArray.push(todo)
    localStorage.setItem('todoArray', JSON.stringify(todoArray))
}

function getTodos() {
    let checkBoxCheck = JSON.parse(localStorage.getItem("checkbox"));
    if (checkBoxCheck === true) {
        checkBox.checked = true;
    }
    if(localStorage.getItem('todoArray') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todoArray'))
    }
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
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>';
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
    })
}


/* //gamle gettodos(sansynsligvis slett senere)
todoArray.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create li
    const newTodo = document.createElement('li');
    const shownSpan = document.createElement('span');
    shownSpan.classList.add('shown')
    const hiddenSpan = document.createElement('span');
    hiddenSpan.classList.add('secret')
    newTodo.classList.add('todo-item');
    if (checkBox.checked) {
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
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-mask"></i>';
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
}) */