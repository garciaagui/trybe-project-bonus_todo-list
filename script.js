const addTaskInput = document.querySelector('#texto-tarefa');
const addTaskButton = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');

function selectTask(event) {
  const hadClassSelected = document.querySelector('.selected');
  if (hadClassSelected) {
    hadClassSelected.classList.remove('selected');
  }
  const auxiliar = event;
  auxiliar.target.classList.add('selected');
}

function completeTask(event) {
  const auxiliar = event;
  if (auxiliar.target.classList.contains('completed')) {
    auxiliar.target.classList.remove('completed');
    console.log('true');
  } else {
    auxiliar.target.classList.add('completed');
  }
}

function addNewTask() {
  const newTask = document.createElement('li');
  newTask.innerHTML = addTaskInput.value;
  newTask.setAttribute('class', 'task');
  taskList.appendChild(newTask);
  addTaskInput.value = '';
  newTask.addEventListener('click', selectTask);
  newTask.addEventListener('dblclick', completeTask);
}

addTaskButton.addEventListener('click', addNewTask);
