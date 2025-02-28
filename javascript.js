document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDateTime = document.getElementById("taskDateTime");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskInput.value} - <small>${taskDateTime.value}</small></span>
        <div class="buttons">
            <button class="complete-btn" onclick="completeTask(this)">✔</button>
            <button class="edit-btn" onclick="editTask(this)">✏</button>
            <button class="delete-btn" onclick="deleteTask(this)">✖</button>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
    taskDateTime.value = "";
}

function completeTask(button) {
    button.parentElement.parentElement.classList.toggle("completed");
    saveTasks();
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector("span").textContent;
    const taskParts = taskText.split(" - ");
    
    const newTask = prompt("Edit task:", taskParts[0]);
    if (newTask !== null) {
        li.querySelector("span").innerHTML = `${newTask} - <small>${taskParts[1]}</small>`;
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="buttons">
                <button class="complete-btn" onclick="completeTask(this)">✔</button>
                <button class="edit-btn" onclick="editTask(this)">✏</button>
                <button class="delete-btn" onclick="deleteTask(this)">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}
