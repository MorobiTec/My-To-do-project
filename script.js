// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskNameInput = document.getElementById('task-name');
    const taskTimeInput = document.getElementById('task-time');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(addTaskToDOM);
    };
  
    // Save tasks to local storage
    const saveTasks = () => {
      const tasks = Array.from(taskList.children).map(task => {
        return {
          name: task.querySelector('.task-name').textContent,
          time: task.querySelector('.task-time').textContent,
          completed: task.classList.contains('completed'),
        };
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Add task to DOM
    const addTaskToDOM = ({ name, time, completed }) => {
      const task = document.createElement('li');
      task.className = 'task';
      if (completed) task.classList.add('completed');
  
      task.innerHTML = `
        <div class="task-info">
          <span class="task-name">${name}</span>
          <span class="task-time">${time}</span>
        </div>
        <div class="task-actions">
          <button class="edit-task">Edit</button>
          <button class="delete-task">Delete</button>
        </div>
      `;
  
      // Delete Task
      task.querySelector('.delete-task').addEventListener('click', () => {
        task.remove();
        saveTasks();
      });
  
      // Edit Task
      task.querySelector('.edit-task').addEventListener('click', () => {
        const taskName = task.querySelector('.task-name');
        const taskTime = task.querySelector('.task-time');
        const newName = prompt('Edit Task Name:', taskName.textContent);
        const newTime = prompt('Edit Task Time (HH:MM):', taskTime.textContent);
  
        if (newName !== null) taskName.textContent = newName;
        if (newTime !== null) taskTime.textContent = newTime;
  
        saveTasks();
      });
  
      // Toggle Completion
      task.addEventListener('click', (e) => {
        if (!e.target.classList.contains('edit-task') && !e.target.classList.contains('delete-task')) {
          task.classList.toggle('completed');
          saveTasks();
        }
      });
  
      taskList.appendChild(task);
    };
  
    // Add task button event
    addTaskButton.addEventListener('click', () => {
      const name = taskNameInput.value.trim();
      const time = taskTimeInput.value;
  
      if (!name || !time) {
        alert('Please enter both task name and time!');
        return;
      }
  
      const task = { name, time, completed: false };
      addTaskToDOM(task);
      saveTasks();
  
      taskNameInput.value = '';
      taskTimeInput.value = '';
    });
  
    // Load existing tasks on startup
    loadTasks();
  });
  