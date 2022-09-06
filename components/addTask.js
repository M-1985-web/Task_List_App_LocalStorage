import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';


//tenemos una funcion addtask que recibe un evento que es que genera el formulario
export const addTask = (evento) => {
  evento.preventDefault();

  //nos trae la lista
  const list = document.querySelector('[data-list]');
  // el usuario llena este input
  const input = document.querySelector('[data-form-input]');
  //selecciona la fecha 
  const calendar = document.querySelector('[data-form-date]');

  //obtiene todos los datos
  const value = input.value;
  const date = calendar.value;
  const dateFormat = moment(date).format('DD/MM/YYYY');

  //por si apretamos agregar sin datos que no retorne nada 
  if (value === '' || date === '') {
    return;
  }

  //limpiamos le input y el calendario para que quede un string vacio
  input.value = '';
  calendar.value = '';

  //es false porque aun no la hemos completado
  const complete = false;

  //para almacenar
  const taskObj = {
    value,
    dateFormat,
    complete,
    id: uuid.v4(),
  };

  //aca a list lo inicializamos vacio
  list.innerHTML = '';

  //cortocircuito pipe
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskList));

  displayTasks();
};



//destructurar
export const createTask = ({ value, dateFormat, complete, id }) => {
  const task = document.createElement('li');
  task.classList.add('card');

  const taskContent = document.createElement('div');

  const check = checkComplete(id);

  if (complete) {
    //aca sobreescribimos las clases las cambiamos por check
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }
  // que es una constante y que se esta manipulando
  const titleTask = document.createElement('span');
    titleTask.classList.add('task');
    titleTask.innerText = value;
    taskContent.appendChild(check);
    taskContent.appendChild(titleTask);
  
    //const dateElement = document.createElement('span');
    //dateElement.innerHTML = dateFormat;


    task.appendChild(taskContent);
    //task.appendChild(dateElement);
    task.appendChild(deleteIcon(id));
  
  return task;
};
