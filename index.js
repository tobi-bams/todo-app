let modeIconChange = document.getElementById("modeIconChange");
let darkmodeStatus = true;
let form = document.getElementById("form");
let todos = document.getElementById("todos");
let todoInput = document.getElementById("todoInput");
let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed"); 

let todoArray = [ {todo: "Complete Todo App on Frontend Mentor", status: "active"}, 
                    {todo: "Pick up groceries", status: "active"}, 
                    {todo: "Read for 1 hour", status: "active"}, 
                    {todo: "10 minutes meditation", status:"active"}, 
                    {todo: "Jog Around the Park 3x", status:"active"}, 
                    {todo: "Complete online JavaScript Course", status: "completed"}
                ];

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let todoTask = {todo: todoInput.value, status: "active"};
    todoArray.push(todoTask);
    todos.innerHTML = '';
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
    })
    form.reset();
})

modeIconChange.addEventListener("click", (evt) => {
    document.body.classList.toggle("light");
    if(darkmodeStatus === true){
        evt.target.setAttribute("src", "./images/icon-moon.svg");
        darkmodeStatus = false;
    }
    else{
        evt.target.setAttribute("src", "./images/icon-sun.svg");
        darkmodeStatus = true;
    }
})

function todoUIDisplay(todo){
    let todoContainer = document.createElement("div");
    todoContainer.setAttribute("class", "todo");
    todoContainer.addEventListener("mouseenter", todoMouseEnter);
    todoContainer.addEventListener("mouseleave", todoMouseLeave);
    let radioCheckContainer = document.createElement("div");
    radioCheckContainer.addEventListener("click", radioCheckerClick)
    radioCheckContainer.setAttribute("class", "radio");
    let todoTextContainer = document.createElement("div");
    todoTextContainer.setAttribute("class", "todoTextContainer");
    let todoText = document.createElement("p");
    todoText.setAttribute("class", "todoText")
    todoText.addEventListener("click", changetodoStatus);
    todoText.textContent = todo.todo;
    todoTextContainer.appendChild(todoText);
    let cancelTodoContainer = document.createElement("div");
    cancelTodoContainer.setAttribute("class", "cancelTodo");
    let cancelImage = document.createElement("img");
    cancelImage.addEventListener("click", cancelTodo);
    cancelImage.setAttribute("src", "./images/icon-cross.svg");
    cancelTodoContainer.appendChild(cancelImage);
    todoContainer.appendChild(radioCheckContainer);
    todoContainer.appendChild(todoTextContainer);
    todoContainer.appendChild(cancelTodoContainer);
    todos.prepend(todoContainer);
    if(todo.status == "completed"){
        todoText.setAttribute("class", "todoTextLight");
        todoText.style.textDecoration = "line-through";
        todoContainer.removeEventListener("mouseenter", todoMouseEnter);
        todoContainer.removeEventListener("mouseleave", todoMouseLeave);
        todoContainer.addEventListener("mouseenter", todoCompletedMouseEnter);
        todoContainer.addEventListener("mouseleave", todoCompletedMouseLeave);
        radioCheckContainer.removeEventListener("click", radioCheckerClick);
        todoText.removeEventListener("click", changetodoStatus);
        radioCheckContainer.style.background = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        let checkImage = document.createElement("img");
        checkImage.setAttribute("src", "./images/icon-check.svg");
        radioCheckContainer.appendChild(checkImage);
    }
}

todoArray.forEach((todo) => {
    todoUIDisplay(todo);
});

todos.parentElement.nextElementSibling

function todoMouseEnter(evt){
    let radioBackground = document.createElement("div");
    radioBackground.setAttribute("class", "radioBackgound");
    evt.target.children[0].style.border = "none";
    evt.target.children[0].style.background = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
    evt.target.children[0].appendChild(radioBackground);
    evt.target.children[2].children[0].style.display = "flex";
}

function todoMouseLeave(evt){
    evt.target.children[2].children[0].style.display = "none";
    evt.target.children[0].removeChild(evt.target.children[0].children[0]);
    evt.target.children[0].style.background = "transparent";
    evt.target.children[0].style.border = "1px solid hsl(237, 14%, 26%)";
}


function changetodoStatus(evt){
    evt.target.style.textDecoration = "line-through";
    evt.target.setAttribute("class", "todoTextLight");
    evt.target.removeEventListener("click", changetodoStatus);
    evt.target.parentElement.parentElement.removeEventListener("mouseenter", todoMouseEnter);
    evt.target.parentElement.parentElement.removeEventListener("mouseleave", todoMouseLeave);
    evt.target.parentElement.previousElementSibling.removeChild(evt.target.parentElement.previousElementSibling.children[0]);
    let checkImage = document.createElement("img");
    checkImage.setAttribute("src", "./images/icon-check.svg");
    evt.target.parentElement.previousElementSibling.appendChild(checkImage);
    evt.target.parentElement.parentElement.addEventListener("mouseenter", todoCompletedMouseEnter);
    evt.target.parentElement.parentElement.addEventListener("mouseleave", todoCompletedMouseLeave);
    evt.target.parentElement.previousElementSibling.removeEventListener("click", radioCheckerClick);
    let todoIndex = todoArray.findIndex((todo) => {
        return evt.target.textContent == todo.todo;
    })
    todoArray[todoIndex].status = "completed";
}

function radioCheckerClick(evt){
    evt.target.parentElement.nextElementSibling.children[0].style.textDecoration = "line-through";
    evt.target.parentElement.nextElementSibling.children[0].setAttribute("class", "todoTextLight");
    evt.target.parentElement.nextElementSibling.children[0].removeEventListener("click", changetodoStatus);
    evt.target.parentElement.parentElement.removeEventListener("mouseenter", todoMouseEnter);
    evt.target.parentElement.parentElement.removeEventListener("mouseleave", todoMouseLeave);
    evt.target.parentElement.removeEventListener("click", radioCheckerClick);
    let checkImage = document.createElement("img");
    checkImage.setAttribute("src", "./images/icon-check.svg");
    evt.target.parentElement.appendChild(checkImage);
    let todoTask = evt.target.parentElement.nextElementSibling.children[0].textContent;
    let todoIndex = todoArray.findIndex((todo)=> {
        return todo.todo == todoTask;
    })
    todoArray[todoIndex].status = "completed";
    evt.target.parentElement.parentElement.addEventListener("mouseenter", todoCompletedMouseEnter);
    evt.target.parentElement.parentElement.addEventListener("mouseleave", todoCompletedMouseLeave);
    evt.target.parentElement.removeChild(evt.target.parentElement.children[0]);
}

function todoCompletedMouseEnter(evt){
    evt.target.children[2].children[0].style.display = "block";
}

function todoCompletedMouseLeave(evt){
    evt.target.children[2].children[0].style.display = "none";
}

function cancelTodo(evt){
    let todoText = evt.target.parentElement.previousElementSibling.children[0].textContent;
    let todoIndex = todoArray.findIndex((todo) => {
        return todo.todo == todoText;
    })
    todoArray.splice(todoIndex, 1);
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
    })
}

all.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
    })
});

active.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        if(todo.status === "active"){
            todoUIDisplay(todo);
        }
    })
});

completed.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        if(todo.status === "completed"){
            todoUIDisplay(todo);
        }
    })

    evt.target.style.color = "blue";
})