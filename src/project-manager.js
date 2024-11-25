import { myTask, sortMyTask, deleteWholeTasksInsideProject, renameWholeTasksIndideProject } from './data-control.js'
import { renderMytasktoPage } from "./render-task.js"
import iconEditWhite from './icon-edit-white.svg'
import iconDeleteWhite from './icon-trash-white.svg'

//create project list (inizialization and logic)
export let allProjects = JSON.parse(localStorage.getItem("allProjects"))
if(allProjects == null) {
    allProjects = ['Work','Home','Travel']
}
const projects = document.querySelector('.projects')
const projectsForm = document.querySelector('#projects')
let cachedProject = []

//create sorted task container
export let sortedTask = []

export function createProjectList() {
    projects.textContent = ''
    projectsForm.textContent = ''

    //create All button
    let allBtn = document.createElement('button')
    allBtn.classList.add('project')
    allBtn.classList.add('all')
    allBtn.classList.add('active')
    allBtn.textContent = 'All'
    projects.appendChild(allBtn)
    allBtn.addEventListener('click', () => {
        activeProjectChecker(allBtn)
        renderMytasktoPage(myTask)
    })

    //project list updater
    for(let i=0; i<allProjects.length; i++) {

        let projectContainer = document.createElement('div')
        projectContainer.classList.add('project-container')
        projects.appendChild(projectContainer)

        let projectBtn = document.createElement('button')
        projectBtn.classList.add('project')
        projectBtn.classList.add(allProjects[i].toLowerCase().replace(/ /g, '-')) //use lower case, replaced whitespace to hyphen to prevent error
        projectBtn.textContent = allProjects[i]
        projectContainer.appendChild(projectBtn)

        let editIconWhite = document.createElement('img')
        editIconWhite.classList.add('edit-icon-white')
        editIconWhite.src = iconEditWhite
        editIconWhite.style.height = '30px'
        projectContainer.appendChild(editIconWhite)
        editIconWhite.addEventListener('click', () => whiteEditButtonLogic(i))

        let deleteIconWhite = document.createElement('img')
        deleteIconWhite.classList.add('delete-icon-white')
        deleteIconWhite.src = iconDeleteWhite
        deleteIconWhite.style.height = '30px'
        projectContainer.appendChild(deleteIconWhite)
        deleteIconWhite.addEventListener('click', () => whiteDeleteButtonLogic(i))

        let projectTaskForm = document.createElement('option')
        projectTaskForm.value = allProjects[i]
        projectTaskForm.textContent = allProjects[i]
        projectsForm.appendChild(projectTaskForm)

        //project sorter per category button
        projectBtn.addEventListener('click', () => {
            let sortedTask = sortMyTask(myTask, allProjects[i])
            activeProjectChecker(projectBtn)
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
        document.querySelector('.popup-new-project').style.display = 'flex';
        document.querySelector('#rename-project').style.display = 'none';
        document.querySelector('#add-new-project').style.display = 'block';
        document.querySelector('.new-project-title').style.display = 'block';
        document.querySelector('.rename-project-title').style.display = 'none';
        document.querySelector('#new-project').value = ''
    })
}

export function addProjectToSidebar(submitter) {
    if(submitter == 'add-new-project'){
        let newProject = document.querySelector('#new-project').value;
        if(allProjects.includes(newProject)) {
            alert('That project/category is already available. Pick a different name.')
        }
        else{
            allProjects.push(newProject)
            localStorage.setItem('allProjects', JSON.stringify(allProjects)) //save allProjects to local storage
            createProjectList()    
        }
    }
    else{
        for(let i=0;i<allProjects.length;i++) {

        }
        let updatedProjectName = document.querySelector('#new-project').value;
        renameWholeTasksIndideProject(cachedProject[0], updatedProjectName)
        allProjects[cachedProject[1]] = updatedProjectName
        localStorage.setItem('allProjects', JSON.stringify(allProjects)) //save allProjects to local storage
        createProjectList()
    }

    //closing the popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-project').style.display = 'none';   
}

//check active project and change color when clicked
export function activeProjectChecker(projectBtn) {
    let allProjectsDOM = document.querySelectorAll('.project')

    if(typeof(projectBtn) !== 'string') {
        projectBtn = projectBtn.textContent
    }

    for(let i=0;i<allProjectsDOM.length;i++) {
        allProjectsDOM[i].classList.remove('active')

        if(allProjectsDOM[i].textContent == projectBtn) {
            allProjectsDOM[i].classList.add('active')
        }
    }
}

//buttons beside the project logic
function whiteDeleteButtonLogic(index) {
    if(allProjects.length > 1) {
        deleteWholeTasksInsideProject(allProjects[index])
        allProjects.splice(index, 1)
        createProjectList()
        localStorage.setItem('allProjects', JSON.stringify(allProjects)) //save allProjects to local storage
    }
    else {
        alert('At least 1 project/category must available.')
    }
}

function whiteEditButtonLogic(index) {
    document.querySelector('#new-project').value = allProjects[index]
    cachedProject = [allProjects[index], index]

    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup-new-project').style.display = 'flex';
    document.querySelector('#rename-project').style.display = 'block';
    document.querySelector('#add-new-project').style.display = 'none';
    document.querySelector('.new-project-title').style.display = 'none';
    document.querySelector('.rename-project-title').style.display = 'block';
}