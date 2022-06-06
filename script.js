// Declaração das Variáveis;
const addTaskInput = document.querySelector('#texto-tarefa');
const addTaskBtn = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const clearListBtn = document.querySelector('#apaga-tudo');
const clearCompletedTasksBtn = document.querySelector('#remover-finalizados');
const saveListBtn = document.querySelector('#salvar-tarefas');
const moveUpBtn = document.querySelector('#mover-cima');
const moveDownBtn = document.querySelector('#mover-baixo');
const removeSelectedTaskBtn = document.querySelector('#remover-selecionado');

// Definição das Funções;
function selectTask(e) {
  const lastSelected = document.querySelector('.selected');
  if (lastSelected) {
    lastSelected.classList.remove('selected');
  }
  e.target.classList.add('selected');
}

function completeTask(e) {
  if (e.target.classList.contains('completed')) {
    e.target.classList.remove('completed');
  } else {
    e.target.classList.add('completed');
  }
}

function addTask(content, className) {
  const newTask = document.createElement('li');
  newTask.innerHTML = content;
  newTask.setAttribute('class', className);
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
      addTask(savedTaskContent, savedTaskClass);
    }
  }
}

function switchTasks(selectedTask, taskToSwitch) {
  const x = selectedTask;
  const y = taskToSwitch;
  const xContent = x.innerHTML;
  const xClasses = x.className;
  const yContent = y.innerHTML;
  const yClasses = y.className;

  x.innerHTML = yContent;
  x.className = yClasses;
  y.innerHTML = xContent;
  y.className = xClasses;
}

function moveUpSelectedTask() {
  const createdTasks = document.getElementsByClassName('task');
  const selectedTask = document.querySelector('.selected');
  if (!selectedTask) {
    window.alert('Nenhum item selecionado');
  } else if (selectedTask === createdTasks[0]) {
    window.alert('O item selecionado é o primeiro da lista');
  } else {
    const previousTask = selectedTask.previousElementSibling;
    switchTasks(selectedTask, previousTask);
  }
}

function moveDownSelectedTask() {
  const createdTasks = document.getElementsByClassName('task');
  const selectedTask = document.querySelector('.selected');
  if (!selectedTask) {
    window.alert('Nenhum item selecionado');
  } else if (selectedTask === createdTasks[createdTasks.length - 1]) {
    window.alert('O item selecionado é o último da lista');
  } else {
    const nextTask = selectedTask.nextElementSibling;
    switchTasks(selectedTask, nextTask);
  }
}

function removeSelectedTask() {
  const createdTasks = document.getElementsByClassName('task');
  for (let i = 0; i < createdTasks.length; i += 1) {
    if (createdTasks[i].classList.contains('selected')) {
      taskList.removeChild(createdTasks[i]);
    }
  }
}

// Ativação das Funções;
window.addEventListener('load', getSavedListItems);
addTaskBtn.addEventListener('click', () => {
  if (addTaskInput.value === '') {
    window.alert('Campo vazio. Por gentileza, insira uma breve descrição da tarefa');
  } else {
    addTask(addTaskInput.value, 'task');
  }
});
clearListBtn.addEventListener('click', clearList);
clearCompletedTasksBtn.addEventListener('click', clearCompletedTasks);
saveListBtn.addEventListener('click', saveListItems);
moveUpBtn.addEventListener('click', moveUpSelectedTask);
moveDownBtn.addEventListener('click', moveDownSelectedTask);
removeSelectedTaskBtn.addEventListener('click', removeSelectedTask);
