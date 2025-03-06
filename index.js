document.addEventListener("DOMContentLoaded", loadTasks);


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
        saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn")
    deleteBtn.onclick = function () {
        todoList.removeChild(taskItem);
        saveTasks();
        updateTaskCount();
    };

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteBtn)
    todoList.appendChild(taskItem);

    inputField.value = "";
    saveTasks();
    updateTaskCount();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item p").forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load items from local storage whem the page loads.
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskContent = document.createElement("p");
        taskContent.textContent = task.text;

        if (task.completed) {
            taskContent.classList.add("completed");
        }

        taskContent.onclick = function () {
            taskContent.classList.toggle("completed");
            saveTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            todoList.removeChild(taskItem);
            saveTasks();
        };

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteBtn);
        todoList.appendChild(taskItem);

    });

    updateTaskCount();
}

function updateTaskCount() {
    todoCount.textContent = document.querySelectorAll(".task-item").length;
}

deleteAllBtn.onclick = function () {
    todoList.innerHTML = "";
    localStorage.removeItem("tasks");
    updateTaskCount();
};