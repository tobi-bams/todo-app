// Declaration of variables
let modeIconChange = document.getElementById("modeIconChange");
let darkmodeStatus = true;
let form = document.getElementById("form");
let todos = document.getElementById("todos");
let todoInput = document.getElementById("todoInput");
let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");
let clearCompletedTask = document.getElementById("clearCompletedTask");
let totalItems = document.getElementById("totalItems");
let deviceSize = window.matchMedia("(min-width: 768px)");
let allSmall = document.getElementById("allSmall");
let activeSmall = document.getElementById("activeSmall");
let completedSmall = document.getElementById("completedSmall");
let localStorage = window.localStorage;

// Initializing TODO Array
let todoArray = [ {todo: "Complete Todo App on Frontend Mentor", status: "active"}, 
                    {todo: "Pick up groceries", status: "active"}, 
                    {todo: "Read for 1 hour", status: "active"}, 
                    {todo: "10 minutes meditation", status:"active"}, 
                    {todo: "Jog Around the Park 3x", status:"active"}, 
                    {todo: "Complete online JavaScript Course", status: "completed"}
                ];


// Event Listener for the form Submittion
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let todoTask = {todo: todoInput.value, status: "active"};
    todoArray.push(todoTask);
    todos.innerHTML = '';
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
    })
    totalItemRemaining();
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
    form.reset();
})

// Event Listener for toggling between dark mode and light mode
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


// Function for the UI display of the Todo task
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

// Initializing localstorage and UI display on the screen
if(localStorage.getItem("todoArray")){
    let localStorageArray = localStorage.getItem("todoArray");
    todoArray = [...JSON.parse(localStorageArray)];
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
        totalItemRemaining();
    });
}else{
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
        totalItemRemaining();
    });
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

// Event listener function for when the mouse enters the todotask area
function todoMouseEnter(evt){
    let radioBackground = document.createElement("div");
    radioBackground.setAttribute("class", "radioBackgound");
    evt.target.children[0].style.border = "none";
    evt.target.children[0].style.background = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
    evt.target.children[0].appendChild(radioBackground);
    if(deviceSize.matches){
        evt.target.children[2].children[0].style.display = "flex";
    }
}

// Event listener function for when the mouse leaves the todotask area
function todoMouseLeave(evt){
    if(deviceSize.matches){
        evt.target.children[2].children[0].style.display = "none";
    }
    evt.target.children[0].removeChild(evt.target.children[0].children[0]);
    evt.target.children[0].style.background = "transparent";
    evt.target.children[0].style.border = "1px solid hsl(237, 14%, 26%)";
}

// Event listener function for when the user clicks on the todo task text itself
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
    totalItemRemaining();
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

// Event listener function for when the user clicks on radio button
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
    totalItemRemaining();
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

// Event listener function for when a todo task has been marked as completed and the mouse enters
function todoCompletedMouseEnter(evt){
    evt.target.children[2].children[0].style.display = "block";
}

// Event listener function for when a todo task has been marked as completed and the mouse leaves
function todoCompletedMouseLeave(evt){
    if(deviceSize.matches){
        evt.target.children[2].children[0].style.display = "none";
    }
}

// Event Listener function for when a user clicks on the cancel button
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
    totalItemRemaining();
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

// event listerner for when the user clicks on ALL to filter the todo task list on large Screens
all.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
    })
    evt.target.setAttribute("class", "active");
    evt.target.nextElementSibling.setAttribute("class", "nonActive");
    evt.target.nextElementSibling.nextElementSibling.setAttribute("class", "nonActive");
});

// event listerner for when the user clicks on ACTIVE to filter the todo task list on large Screens
active.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        if(todo.status === "active"){
            todoUIDisplay(todo);
        }
    })
    evt.target.setAttribute("class", "active");
    evt.target.nextElementSibling.setAttribute("class", "nonActive");
    evt.target.previousElementSibling.setAttribute("class", "nonActive");
});

// event listerner for when the user clicks on COMPLETED to filter the todo task list on large Screens
completed.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        if(todo.status === "completed"){
            todoUIDisplay(todo);
        }
    })

    evt.target.setAttribute("class", "active");
    evt.target.previousElementSibling.setAttribute("class", "nonActive");
    evt.target.previousElementSibling.previousElementSibling.setAttribute("class", "nonActive");
})

// event listerner for when the user clicks on ALL to filter the todo task list on small Screens
allSmall.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        todoUIDisplay(todo);
    })
    evt.target.setAttribute("class", "active");
    evt.target.nextElementSibling.setAttribute("class", "nonActive");
    evt.target.nextElementSibling.nextElementSibling.setAttribute("class", "nonActive");
});

// event listerner for when the user clicks on ACTIVE to filter the todo task list on small Screens
activeSmall.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        if(todo.status === "active"){
            todoUIDisplay(todo);
        }
    })
    evt.target.setAttribute("class", "active");
    evt.target.nextElementSibling.setAttribute("class", "nonActive");
    evt.target.previousElementSibling.setAttribute("class", "nonActive");
});

// event listerner for when the user clicks on COMPLETED to filter the todo task list on small Screens
completedSmall.addEventListener("click", (evt) => {
    todos.innerHTML = "";
    todoArray.forEach((todo) => {
        if(todo.status === "completed"){
            todoUIDisplay(todo);
        }
    })

    evt.target.setAttribute("class", "active");
    evt.target.previousElementSibling.setAttribute("class", "nonActive");
    evt.target.previousElementSibling.previousElementSibling.setAttribute("class", "nonActive");
})

// Event Listener for when the CLEAR COMPLETED TASK BUTTON is clicked
clearCompletedTask.addEventListener("click", (evt) => {
   let activeArray = todoArray.filter((todoTask) => {
        return todoTask.status === "active";
   })
   todoArray = [...activeArray];

    todos.innerHTML = "";
    todoArray.forEach((todoTassk) => {
        todoUIDisplay(todoTassk);
    })
})

// Function to calculate the total amount of ACTIVE task remaining in the todo list
function totalItemRemaining(){
    let totalItemsLeft = todoArray.filter((todoTask) => {
        return todoTask.status === "active";
    })
    
    if(totalItemsLeft.length <= 1){
        totalItems.textContent = `${totalItemsLeft.length} Item Left`;
    }else{
        totalItems.textContent = `${totalItemsLeft.length} Items Left`;
    }
}