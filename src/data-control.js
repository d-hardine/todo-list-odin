import { renderMytasktoPage } from "./render-task";
import { activeProjectChecker } from "./project-manager";
import { createProjectList } from './project-manager.js';

//create all of my tasks container
export let myTask = []
//create sorted tasks container
export let myTaskSorted = []
//create cached index container
let cachedIndex = ''

//call function from project-manager
createProjectList()

let allBtn = document.querySelector('.all')

export function addTaskToMyTask(submitter) {

    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#dueDate').value;
    let dueTime = document.querySelector('#dueTime').value;
    let priority = document.querySelector('#priority').value;
    let projects = document.querySelector('#projects').value;

    let newTask = new Task(title, description, dueDate, dueTime, priority, projects);
    myTask.push(newTask)

    if(submitter === 'edit-task') {
        if(allBtn.classList.contains('active') === true) {
            myTask.splice(cachedIndex, 1)
        }
        else {
            let updatedMyTask = myTask.filter(project => !myTaskSorted.includes(project))
            myTaskSorted.splice(cachedIndex, 1)
            myTask = updatedMyTask.concat(myTaskSorted)
        }
    }

    myTask.sort((a, b) => {
        let da = new Date(a.dueDate)
        let db = new Date(b.dueDate)
        return da - db
    })

    document.querySelector('.new-task-form').reset() //clear the form after submit
    //close popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-task').style.display = 'none';
    document.querySelector('#edit-task').style.display = 'block'

    //render the task to main page
    if(submitter === 'edit-task') {
        if(allBtn.classList.contains('active')) {
            activeProjectChecker(allBtn)
            renderMytasktoPage(myTask)
        }
        else {
            console.log(myTask[cachedIndex].projects)
            myTaskSorted = myTask.filter(tasks => tasks.projects === myTask[cachedIndex].projects)
            renderMytasktoPage(myTaskSorted)
            console.log(myTaskSorted)
        }
    }
    else {
        activeProjectChecker(allBtn)
        renderMytasktoPage(myTask)
    }
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

//icon buttons logic
export function editButtonLogic(index) {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup-new-task').style.display = 'block';
    document.querySelector('#add-new-task').style.display = 'none'

    if(allBtn.classList.contains('active') === true) {
        document.querySelector('#title').value = myTask[index].title
        document.querySelector('#description').value = myTask[index].description
        document.querySelector('#dueDate').value = myTask[index].dueDate
        document.querySelector('#dueTime').value = myTask[index].dueTime
        document.querySelector('#priority').value = myTask[index].priority
        document.querySelector('#projects').value = myTask[index].projects
    }
    else {
        document.querySelector('#title').value = myTaskSorted[index].title
        document.querySelector('#description').value = myTaskSorted[index].description
        document.querySelector('#dueDate').value = myTaskSorted[index].dueDate
        document.querySelector('#dueTime').value = myTaskSorted[index].dueTime
        document.querySelector('#priority').value = myTaskSorted[index].priority
        document.querySelector('#projects').value = myTaskSorted[index].projects
    }

    cachedIndex = index
}

export function deleteButtonLogic(index) {
    if(allBtn.classList.contains('active') === true) {
        myTask.splice(index, 1)
        renderMytasktoPage(myTask)
    }
    else {
        let updatedMyTask = myTask.filter(project => !myTaskSorted.includes(project))
        myTaskSorted.splice(index, 1)
        myTask = updatedMyTask.concat(myTaskSorted)
        myTask.sort((a, b) => {
            let da = new Date(a.dueDate)
            let db = new Date(b.dueDate)
            return da - db
        })
        renderMytasktoPage(myTaskSorted)
    }
}