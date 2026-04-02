// afficher date
const date = document.getElementById("date");
const today = new Date();
date.textContent = today.toLocaleDateString();

// function générique
function setupSection(formId, inputId, listId, storageKey) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);

  let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

  tasks.forEach(task => createTask(task));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const task = { text, completed: false };
    tasks.push(task);
    save();
    createTask(task);
    input.value = "";
  });

  function createTask(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    span.addEventListener("click", () => {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      save();
    });

    const btn = document.createElement("button");
    btn.textContent = "X";

    btn.addEventListener("click", () => {
      tasks = tasks.filter(t => t !== task);
      li.remove();
      save();
    });

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  }

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }
}

// setup all sections
setupSection("priority-form", "priority-input", "priority-list", "priorityTasks");
setupSection("today-form", "today-input", "today-list", "todayTasks");
setupSection("note-form", "note-input", "note-list", "noteTasks");
setupSection("week-form", "week-input", "week-list", "weekTasks");
setupSection("app-form", "app-input", "app-list", "appTasks");
setupSection("event-form", "event-input", "event-list", "eventTasks");
setupSection("tomorrow-form", "tomorrow-input", "tomorrow-list", "tomorrowTasks");