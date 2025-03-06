const inputField = document.getElementById("todoInput");
const todoList = document.getElementById("todolist");
const deleteAllBtn = document.getElementById("deleteButton");

function addTask() {
    const taskText = inputField.value.trim();

    if (taskText === "") {
        alert("please enter a task");
        return;
    }

    const taskItem = document.createElement("div")
    taskItem.classList.add("task-item")

    const taskContent = document.createElement("p");
    taskContent.textContent = taskText;

    taskContent.onclick = function () {
        taskContent.classList.toggle("completed");
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn")
    deleteBtn.onclick = function () {
        todoList.removeChild(taskItem);
    };

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteBtn)
    todoList.appendChild(taskItem);

    inputField.value = "";
}

deleteAllBtn.onclick = function () {
    todoList.innerHTML = ""
}

