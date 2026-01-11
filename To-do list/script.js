// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Add Task Function
addBtn.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.addEventListener('click', () => {
    listItem.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(listItem);
  });

  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteBtn);
  todoList.appendChild(listItem);

  todoInput.value = '';
});

// Allow Enter Key to Add Task
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
