
//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const attemptButton = document.querySelector('.attempt-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
const li = document.getElementsByTagName('li');

//array

const todoArray = [];

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", hint);
filterOption.addEventListener("click", filterTodo);
attemptButton.addEventListener('click', attempt);

//Functions

function attempt(event) {
    event.preventDefault();
    for (let i = 0; i < todoArray.length; i++) {
        if (todoInput.value === todoArray[i]) {
            const items = todoList.getElementsByTagName("li");
            for ( let j = 0; j < items.length; j++) {
                const secretInnerChild = items[j].children[1].innerText;
                const shownInnerChild = items[j].children[0].innerText;
                const concat = shownInnerChild.concat(secretInnerChild);
                if (concat === todoArray[i]) {
                    items[j].innerHTML = 
                    `<span class="shown">${todoArray[i]}</span>`+
                    `<span class="secret">${""}</span>`;
                    const theFirstChild = todoList.firstChild; 
                    const correct = items[j].parentElement;
                    todoList.insertBefore(correct, theFirstChild);

                } 
            }
        } 
    }  todoInput.value = "";
}

//funker ikke med arrow function her;]
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    console.log(todoArray)
    //push to array
    todoArray.push(todoInput.value)
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create li
    const newTodo = document.createElement('li');
    const shownSpan = document.createElement('span');
    shownSpan.classList.add('shown')
    newTodo.appendChild(shownSpan);
    const hiddenSpan = document.createElement('span');
    hiddenSpan.classList.add('secret')
    hiddenSpan.innerText = todoInput.value; 
    newTodo.appendChild(hiddenSpan);
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
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
    //Stupid Counter
    const counter=document.createElement('p');
    counter.innerHTML='0'
    counter.classList.add("counter");
    todoDiv.appendChild(counter);
    //Append todoDiv til list
    todoList.appendChild(todoDiv);
    //clear todoinput value
    todoInput.value = "";
    }

function deleteCheck(e){
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //remove from array
        const secretInnerChild = todo.getElementsByTagName('li')[0].children[1].innerText;
        const shownInnerChild = todo.getElementsByTagName('li')[0].children[0].innerText;
        const concat = shownInnerChild.concat(secretInnerChild);
        for (let i = 0; i < todoArray.length; i++) {
            if (concat.replaceAll(" ", "") === todoArray[i].replaceAll(" ", "")) { 
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
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}





function hint(e){
    const item = e.target;
    if (item.classList[0] === "hint-btn") {
        const todo = item.parentElement;
        const counter = todo.querySelector(".counter");
        counter.innerText = `${(Number(counter.innerHTML))+1}`;
        const secretInnerChild = todo.getElementsByTagName('li')[0].children[1].innerText;
        const shownInnerChild = todo.getElementsByTagName('li')[0].children[0].innerText;
        const concat = shownInnerChild.concat(secretInnerChild);
        for (let i = 0; i < todoArray.length; i++) {
            if (concat.replaceAll(" ", "") === todoArray[i].replaceAll(" ", "")) {
                const shownText = `<span class="shown">${todoArray[i].substring(0, Number(counter.innerText))}</span>`;
                const hiddenText =`<span class="secret">${todoArray[i].substring(Number(counter.innerText))}</span>`;
                todo.getElementsByTagName('li')[0].innerHTML = shownText + hiddenText;

                }  
        } 
    }    
} 


function filterTodo(e) {
    const todos= todoList.childNodes;
    
}


