const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateInput = document.getElementById("date-input");
const searchBox = document.getElementById("search-box");
const filterButtons = document.querySelectorAll(".filters button");

// ADD TASK
function addTask() {
    if (inputBox.value === '') {
        alert("Write something!");
        return;
    }

    let li = document.createElement("li");

    let dateValue = dateInput.value;

    // ✅ DATE FIX
    let formattedDate = "No Date";
    if (dateValue) {
        const d = new Date(dateValue);
        formattedDate = d.toDateString();
    }

    li.innerHTML = `
        <div class="task-text">${inputBox.value}</div>
        <div class="task-date">${formattedDate}</div>
    `;

    li.classList.add("task");

    // DELETE BUTTON
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

    let priority = document.createElement("span");
    priority.innerHTML = "🔥"; // priority icon
    priority.classList.add("priority-btn");

    li.appendChild(priority);
    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";
    dateInput.value = "";

    updateTaskCount();
    saveData();
}

// CLICK EVENTS
listContainer.addEventListener("click", function (e) {

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.innerHTML === "🔥") {
        e.target.parentElement.classList.toggle("high-priority");
        saveData();
    }

    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateTaskCount();
        saveData();
    }

});


// FILTER
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        const tasks = document.querySelectorAll("#list-container li");

        tasks.forEach(task => {

            if (filter === "all") {
                task.style.display = "flex";
            }

            else if (filter === "pending") {
                task.style.display = task.classList.contains("checked") ? "none" : "flex";
            }

            else if (filter === "completed") {
                task.style.display = task.classList.contains("checked") ? "flex" : "none";
            }

            else if (filter === "high") {
                task.style.display = task.classList.contains("high-priority")
                    ? "flex" : "none";
            }

        });

    });
});

// TASK COUNT
function updateTaskCount() {
    const tasks = document.querySelectorAll("#list-container li");
    document.getElementById("task-count").innerText = `Total Tasks: ${tasks.length}`;
}

// STORAGE
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateTaskCount();
}

showTask();