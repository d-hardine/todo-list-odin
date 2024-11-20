import { myTask } from "./render-task.js"
import { renderMytasktoPage } from "./render-task.js"
//import { mainPage } from "./render-task.js"
//import { clearMainPage } from "./render-task.js"

//create project list (inizialization and logic)
let allProjects = ['Work','Home','Travel']
const projects = document.querySelector('.projects')
const projectsForm = document.querySelector('#projects')

let sortedTask = []


export function createProjectList() {
    projects.textContent = ''
    projectsForm.textContent = ''

    let allBtn = document.createElement('button')
    //allBtn.classList.add('project')
    allBtn.classList.add('all')
    allBtn.classList.add('active')
    allBtn.textContent = 'All'
    projects.appendChild(allBtn)

    //project list updater
    for(let i=0; i<allProjects.length; i++) {

        let projectButton = document.createElement('button')
        projectButton.classList.add('project')
        projectButton.classList.add(allProjects[i].toLowerCase().replace(/ /g, '-')) //use lower case, replaced whitespace to hyphen to prevent error
        projectButton.textContent = allProjects[i]
        projects.appendChild(projectButton)

        let projectTaskForm = document.createElement('option')
        projectTaskForm.value = allProjects[i]
        projectTaskForm.textContent = allProjects[i]
        projectsForm.appendChild(projectTaskForm)

        //project sorter per category button
        projectButton.addEventListener('click', () => {
            sortedTask = myTask.filter(tasks => tasks.projects == allProjects[i])
            console.log(sortedTask)
            allBtn.classList.remove('active')
            activeProjectChecker(projectButton)
            renderMytasktoPage(sortedTask)
        })
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

export function addProjectToSidebar() {
    let newProject = document.querySelector('#new-project').value;
    allProjects.push(newProject)
    createProjectList()

    //closing the popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-project').style.display = 'none';   
}

//check active project and change color when clicked
function activeProjectChecker(projectButton) {
    let allProjectsDOM = document.querySelectorAll('.project')
    for(let i=0;i<allProjectsDOM.length;i++) {
        allProjectsDOM[i].classList.remove('active')
        if(allProjectsDOM[i] === projectButton) {
            allProjectsDOM[i].classList.add('active')
        }   
    }
}