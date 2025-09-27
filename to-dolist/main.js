const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const taskBody = document.getElementById("taskBody");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

// Apply Saved Theme
if(darkMode){ 
   document.body.classList.add("dark");
   themeToggle.textContent = "☀️ Light Made";
}

// Save & Render 
function saveAndRender() { 
    // Save tasks to localStorage properly
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Render Tasks..
function renderTasks() { 
    taskBody.innerHTML = "";
    tasks.forEach((task, index) => { 
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.text}</td>
            <td>${task.category}</td>
            <td>${task.date || "-"}</td>
            <td class="status ${task.completed ? "done" : "pending"}">
                ${task.completed ? "Achieved" : "Pending"}
            </td>
            <td>
                <button class="action complete" data-index="${index}">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
                <button class="action delete" data-index="${index}">Delete</button>
            </td>`;
        taskBody.appendChild(row);
    });
}



// Add New Track....
form.addEventListener("submit", e =>{ 
    e.preventDefault();
    const newTask = { 
        task: taskInput.ariaValueMax,
        category: taskCategory.ariaValueMax,
        date: taskDate.ariaValueMax,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    taskDate.value = "";
    saveAndRender();
});

// Handle Actions......
taskBody.addEventListener("click", e => { 
    const index = e.target.dataset.index;
    if(e.target.classList.contains("complete")){ 
    tasks[index].completed = !tasks[index].completed;
    }

    if(e.target.classList.contains("delete")){ 
    tasks.splice(index, 1);
    }
    saveAndRender();
});

// Toggle Theme.....
themeToggle.addEventListener("click", () => { 
    document.body.classList.toggle("dark");
    darkMode = document.body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️  Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
});


// Initial Render
renderTasks();