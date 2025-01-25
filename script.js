document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Add a new task
  // Add a new task
  function addTask(save = true) {
    // Retrieve and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // Check if taskText is empty
    if (!taskText) {
      alert("Please enter a task.");
      return;
    }

    // Create new task elements
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // Use classList.add to assign the class

    // Remove task on button click
    removeButton.onclick = () => {
      taskList.removeChild(taskItem);
      removeTask(taskText);
    };

    // Append button to task item and task item to the list
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    // Save to Local Storage if required
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Clear the input field
    taskInput.value = "";
  }

  // Remove a task from Local Storage
  function removeTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  // Event listeners for adding tasks
  addButton.addEventListener("click", () => addTask(taskInput.value));
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask(taskInput.value);
    }
  });

  // Initial load
  loadTasks();
});
