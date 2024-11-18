import { myTask } from "./new-task.js"

//create project list (inizialization and logic)
let allProjects = ['Work','Home','Travel']
const projects = document.querySelector('.projects')
const projectsForm = document.querySelector('#projects')


export function createProjectList() {
    projects.textContent = ''
    projectsForm.textContent = ''

    let allBtn = document.createElement('button')
    allBtn.classList.add('all')
    allBtn.textContent = 'All'
    projects.appendChild(allBtn)

    //project list updater
    for(let i=0; i<allProjects.length; i++) {

        let projectPlaceholder = allProjects[i]

        let projectButton = document.createElement('button')
        projectButton.classList.add(projectPlaceholder.toLowerCase().replace(/ /g, '-')) //use lower case, replaced whitespace to hyphen to prevent error
        projectButton.textContent = projectPlaceholder
        projects.appendChild(projectButton)

        let projectTaskForm = document.createElement('option')
        projectTaskForm.value = projectPlaceholder
        projectTaskForm.textContent = projectPlaceholder
        projectsForm.appendChild(projectTaskForm)

        //project sorter button
        projectButton.addEventListener('click', () => {
            let output = myTask.filter(tasks => tasks.projects == projectPlaceholder)
            console.log(output)
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