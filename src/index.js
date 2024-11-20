import './styles.css';
import { addTaskToMyTask } from './render-task.js';
import { createProjectList } from './project-manager.js';
import { addProjectToSidebar } from './project-manager.js';
//import iconTrash from './icon-trash.svg';

//create new task
const newTaskBtn = document.querySelector('.new-task-btn')
const closeTaskFormBtn = document.querySelector('.close-task-btn')

newTaskBtn.addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup-new-task').style.display = 'block';
})

closeTaskFormBtn.addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-task').style.display = 'none';
})

const newTaskForm = document.querySelector('.new-task-form')

newTaskForm.addEventListener('submit', function() {
    event.preventDefault();
    addTaskToMyTask();
})

//create dynamic today date
const today = new Date().toISOString().slice(0,10)
document.querySelector('#dueDate').min = today

//call function from project-manager
createProjectList()


//create new project
const closeProjectFormBtn = document.querySelector('.close-project-btn')

closeProjectFormBtn.addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-project').style.display = 'none';
})

const newProjectForm = document.querySelector('.new-project-form')

newProjectForm.addEventListener('submit', function() {
    event.preventDefault();
    addProjectToSidebar();
})