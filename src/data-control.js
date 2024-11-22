import { renderMytasktoPage } from "./render-task";
import { activeProjectChecker } from "./project-manager";
import { createProjectList } from './project-manager.js';

//create all of my tasks container
export let myTask = []
//create sorted tasks container
export let myTaskSorted = []

//call function from project-manager
createProjectList()

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
    let allBtn = document.querySelector('.all')
    activeProjectChecker(allBtn)
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

//task sorter per project
export function sortMyTask(myTask, theSorter) {
    let myTaskSortedPlaceholder = myTask.filter(tasks => tasks.projects === theSorter)
    myTaskSorted = myTaskSortedPlaceholder
    return myTaskSorted
}