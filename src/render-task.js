export function addTaskToMyTask() {
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#dueDate').value;
    let dueTime = document.querySelector('#dueTime').value;
    let priority = document.querySelector('#priority').value;
    let projects = document.querySelector('#projects').value;
    let newTask = new Task(title, description, dueDate, dueTime, priority, projects);
    myTask.push(newTask)
    myTask.sort((a, b) => {
        let da = new Date(a.dueDate)
        let db = new Date(b.dueDate)
        return da - db
    })
    //close popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-task').style.display = 'none';

    //render the task to main page [UNDER CONSTRUCTION]
    renderMytasktoPage(myTask)
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

export function renderMytasktoPage(myTask) {
    if(myTask.length != 0) {
        mainPage.textContent = ''
        mainPage.style.justifySelf = 'baseline'
        mainPage.style.alignContent = 'baseline'

        for(let i=0; i<myTask.length;i++) {

            //create task container
            let taskContainer = document.createElement('div')
            taskContainer.classList.add('task-container')
            mainPage.appendChild(taskContainer)
    
            //create task title
            let taskTitle = document.createElement('div')
            taskTitle.classList.add('task-title')
            taskContainer.appendChild(taskTitle)
            taskTitle.textContent = myTask[i].title
    
            //create task description
            let taskDescription = document.createElement('div')
            taskDescription.classList.add('task-description')
            taskContainer.appendChild(taskDescription)
            taskDescription.textContent = myTask[i].description
    
            //create task due date
            let taskDueDate = document.createElement('div')
            taskDueDate.classList.add('task-due-date')
            taskContainer.appendChild(taskDueDate)
            taskDueDate.textContent = myTask[i].dueDate
    
            //create task due time
            let taskDueTime = document.createElement('div')
            taskDueTime.classList.add('task-due-time')
            taskContainer.appendChild(taskDueTime)
            taskDueTime.textContent = myTask[i].dueTime
    
            //create task priority
            let taskPriority = document.createElement('div')
            taskPriority.classList.add('task-priority')
            taskContainer.appendChild(taskPriority)
            taskPriority.textContent = myTask[i].priority
    
            //create task project
            let taskProject = document.createElement('div')
            taskProject.classList.add('task-project')
            taskContainer.appendChild(taskProject)
            taskProject.textContent = myTask[i].projects
        }
    }
    //else {mainPage.textContent ='No Task'}

}