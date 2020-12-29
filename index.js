let modeIconChange = document.getElementById("modeIconChange");
let darkmodeStatus = true;
let form = document.getElementById("form");
let todos = document.getElementById("todos");

let todoArray = [{todo: "Complete online JavaScript Course", status: "active"}, {todo: "Jog Around the Park 3x", status:"active"},
                {todo: "10 minutes meditation", status:"active"}, {todo: "Read for 1 hour", status: "active"},
            {todo: "Pick up groceries", status: "active"}, {todo: "Complete Todo App on Frontend Mentor", status: "active"}];

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("Happy");
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
    todoContainer.addEventListener("mouseenter", todoMouseEnter)
    let radioCheckContainer = document.createElement("div");
    radioCheckContainer.setAttribute("class", "radio");
    let checkImage = document.createElement("img");
    checkImage.setAttribute("src", "./images/icon-check.svg");
    let todoTextContainer = document.createElement("div");
    todoTextContainer.setAttribute("class", "todoTextContainer");
    let todoText = document.createElement("p");
    todoText.textContent = todo;
    todoTextContainer.appendChild(todoText);
    let cancelTodoContainer = document.createElement("div");
    cancelTodoContainer.setAttribute("class", "cancelTodo");
    let cancelImage = document.createElement("img");
    cancelImage.setAttribute("src", "./images/icon-cross.svg");
    cancelTodoContainer.appendChild(cancelImage);
    todoContainer.appendChild(radioCheckContainer);
    todoContainer.appendChild(todoTextContainer);
    todoContainer.appendChild(cancelTodoContainer);
    todos.appendChild(todoContainer);
}

todoArray.forEach((todo) => {
    let todoItem = todo.todo;
    todoUIDisplay(todoItem);
});