const addTaskInput = document.querySelector('#texto-tarefa');
const addTaskButton = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');

function addNewTask() {
  const newTask = document.createElement('li');
  newTask.innerHTML = addTaskInput.value;
  newTask.setAttribute('class', 'task');
  taskList.appendChild(newTask);
  addTaskInput.value = '';
}

addTaskButton.addEventListener('click', addNewTask);
