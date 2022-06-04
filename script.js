const addTaskInput = document.querySelector('#texto-tarefa');
const addTaskBtn = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const clearListBtn = document.querySelector('#apaga-tudo');
const clearCompletedTasksBtn = document.querySelector('#remover-finalizados');
const saveListBtn = document.querySelector('#salvar-tarefas');

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

function clearList() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function clearCompletedTasks() {
  const createdTasks = document.getElementsByClassName('task');
  for (let i = 0; i < createdTasks.length; i += 1) {
    if (createdTasks[i].classList.contains('completed')) {
      taskList.removeChild(createdTasks[i]);
      i -= 1;
    }
  }
}

function saveListItems() {
  localStorage.clear();
  const createdTasks = document.getElementsByClassName('task');
  for (let i = 0; i < createdTasks.length; i += 1) {
    const actualTask = createdTasks[i];
    const actualTaskInfo = [actualTask.innerHTML, actualTask.className];
    localStorage.setItem(`content${i}`, JSON.stringify(actualTaskInfo));
  }
}

function getSavedListItems() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const savedTaskInfo = JSON.parse(localStorage.getItem(`content${i}`));
      const savedTaskContent = savedTaskInfo[0];
      const savedTaskClass = savedTaskInfo[1];
      const newTask = document.createElement('li');
      newTask.innerHTML = savedTaskContent;
      newTask.className = savedTaskClass;
      taskList.appendChild(newTask);
      newTask.addEventListener('click', selectTask);
      newTask.addEventListener('dblclick', completeTask);
    }
  }
}

window.addEventListener('load', getSavedListItems);
addTaskBtn.addEventListener('click', addNewTask);
clearListBtn.addEventListener('click', clearList);
clearCompletedTasksBtn.addEventListener('click', clearCompletedTasks);
saveListBtn.addEventListener('click', saveListItems);
