const addTaskInput = document.querySelector('#texto-tarefa');
const addTaskButton = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');

function changeColor(event) {
  const hadClassSelected = document.querySelector('.selected');
  if (hadClassSelected) {
    hadClassSelected.style.backgroundColor = 'white';
    hadClassSelected.classList.remove('selected');
  }
  const auxiliar = event;
  auxiliar.target.classList.add('selected');
  auxiliar.target.style.backgroundColor = 'rgb(128, 128, 128)';
}

function addNewTask() {
  const newTask = document.createElement('li');
  newTask.innerHTML = addTaskInput.value;
  newTask.setAttribute('class', 'task');
  taskList.appendChild(newTask);
  addTaskInput.value = '';
  newTask.addEventListener('click', changeColor);
}

addTaskButton.addEventListener('click', addNewTask);
