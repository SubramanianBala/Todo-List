// Selecting elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const resetTasksBtn = document.getElementById('reset-tasks-btn');

// Function to add a new task to the DOM
function addTaskToDOM(taskText) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const taskTextSpan = document.createElement('span');
  taskTextSpan.classList.add('task-text');
  taskTextSpan.innerText = taskText;

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('task-actions');

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.addEventListener('click', () => {
    taskTextSpan.classList.toggle('completed'); 
  });

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', taskTextSpan.innerText);
    if (newText) taskTextSpan.innerText = newText.trim();
    saveTasksToLocalStorage(); 
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasksToLocalStorage(); 
    checkResetButtonVisibility(); 
  });

  // Append buttons to actions div
  actionsDiv.appendChild(completeBtn);
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  // Append elements to task item
  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(actionsDiv);

  // Append task item to the task list
  taskList.appendChild(taskItem);
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim(); 
  if (taskText === '') return;

  addTaskToDOM(taskText);
  saveTasksToLocalStorage();
  checkResetButtonVisibility(); 
  taskInput.value = ''; 
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(task => task.querySelector('.task-text').innerText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage on page load
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskText => addTaskToDOM(taskText));
}

// Function to reset all tasks
function resetTasks() {
  taskList.innerHTML = ''; 
  localStorage.removeItem('tasks'); 
  checkResetButtonVisibility(); 
}

// Function to check if the reset button should be visible
function checkResetButtonVisibility() {
  if (taskList.children.length > 0) {
    resetTasksBtn.style.display = 'block';
  } else {
    resetTasksBtn.style.display = 'none';
  }
}

// Event listener for the "Add" button
addTaskBtn.addEventListener('click', addTask);

// Event listener to add a task on pressing the Enter key
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Event listener for the "Reset All Tasks" button
resetTasksBtn.addEventListener('click', resetTasks);

// Load tasks and check reset button visibility on page load
window.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  checkResetButtonVisibility(); 
});
