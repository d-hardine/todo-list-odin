import './styles.css';
import { addTaskToMyTask } from './new-task';
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

//create project list (inizialization)
let allProjects = ['All','Work','Home','Travel']
const projects = document.querySelector('.projects')

function createProjectList() {
    projects.textContent = ''
    for(let i=0; i<allProjects.length; i++) {

        let projectPlaceholder = allProjects[i]

        let projectButton = document.createElement('button')
        projectButton.classList.add(projectPlaceholder.toLowerCase())
        projectButton.textContent = projectPlaceholder
        //if(projectButton.textContent === 'Plus-Btn') {
        //    projectButton.textContent = '+'
        //}
        projects.appendChild(projectButton)
    }
    //create plus button for new project
    let plusBtn = document.createElement('button')
    plusBtn.classList.add('plus-btn')
    plusBtn.textContent = '+'
    projects.appendChild(plusBtn)

    plusBtn.addEventListener('click', () => {
        document.querySelector('.popup').style.display = 'flex';
        document.querySelector('.popup-new-project').style.display = 'block';
    })
}
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

function addProjectToSidebar() {
    let newProject = document.querySelector('#new-project').value;
    allProjects.push(newProject)
    createProjectList()
    
    //closing the popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-project').style.display = 'none';    
}