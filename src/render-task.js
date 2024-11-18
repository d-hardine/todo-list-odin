export function addTaskToMyTask() {
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#dueDate').value;
    let dueTime = document.querySelector('#dueTime').value;
    let priority = document.querySelector('#priority').value;
    let projects = document.querySelector('#projects').value;
    let newTask = new Task(title, description, dueDate, dueTime, priority, projects);
    myTask.push(newTask)
    console.log(myTask)
    //close popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-task').style.display = 'none';

    //clear main page
    if(mainPage.textContent === 'No Task') {
        clearMainPage()
    }

    //render the task to main page [UNDER CONSTRUCTION]
    renderMytasktoPage()
}

class Task {
    constructor(title, description, dueDate, dueTime, priority, projects) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
        this.projects = projects
    }
}

export let myTask = []
let mainPage = document.querySelector('.main')

function clearMainPage() {
    mainPage.textContent = ''
    mainPage.style.justifySelf = 'baseline'
    mainPage.style.alignContent = 'baseline'
}

function renderMytasktoPage() {
    mainPage.textContent = ''
    for(let i=0; i<myTask.length;i++) {

        let theTask = myTask[i]

        //create task container
        let taskContainer = document.createElement('div')
        taskContainer.classList.add('task-container')
        mainPage.appendChild(taskContainer)

        //create task title
        let taskTitle = document.createElement('div')
        taskTitle.classList.add('task-title')
        taskContainer.appendChild(taskTitle)
        taskTitle.textContent = theTask.title

        //create task project
        let taskProject = document.createElement('div')
        taskProject.classList.add('task-project')
        taskContainer.appendChild(taskProject)
        taskProject.textContent = theTask.projects
    }
}