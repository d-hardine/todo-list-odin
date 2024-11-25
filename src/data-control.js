import { renderMytasktoPage } from "./render-task";
import { activeProjectChecker } from "./project-manager";
import { createProjectList } from './project-manager.js';

//create all of my tasks container
export let myTask = JSON.parse(localStorage.getItem("myTask"))
if(myTask == null) {
    //myTask = []
    myTask = [{
        title: 'Buy Groceries',
        description: 'Buy ham and cheese. Also, milk is 50% off at Walmart.',
        dueDate: '2024-12-01',
        dueTime: '10:00',
        priority: 'High',
        projects: 'Home'
    },{
        title: 'Finish past project',
        description: 'Deadline in 2 weeks.',
        dueDate: '2024-12-05',
        dueTime: '15:00',
        priority: 'Medium',
        projects: 'Work'
    },{
        title: 'Visit Bali',
        description: 'Also visit the beach.',
        dueDate: '2024-12-07',
        dueTime: '11:00',
        priority: 'Low',
        projects: 'Travel'
    }]
}
renderMytasktoPage(myTask)
//create sorted tasks container
export let myTaskSorted = JSON.parse(localStorage.getItem("myTaskSorted"))
if(myTaskSorted == null) {
    myTaskSorted = []
}
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
    localStorage.setItem('myTask', JSON.stringify(myTask)) //save myTask to local storage
    localStorage.setItem('myTaskSorted', JSON.stringify(myTaskSorted)) //save myTaskSorted to local storage
    //close popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-new-task').style.display = 'none';
    document.querySelector('#edit-task').style.display = 'block'
    document.querySelector('#add-new-task').style.display = 'block'

    //render the task to main page
    if(submitter === 'edit-task') {
        if(allBtn.classList.contains('active')) {
            activeProjectChecker(allBtn)
            renderMytasktoPage(myTask)
        }
        else {
            myTaskSorted = myTask.filter(tasks => tasks.projects === newTask.projects)
            myTaskSorted.sort((a, b) => {
                let da = new Date(a.dueDate)
                let db = new Date(b.dueDate)
                return da - db
            })
            activeProjectChecker(newTask.projects)
            renderMytasktoPage(myTaskSorted)
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
    if(myTask != []) {
        let myTaskSortedPlaceholder = myTask.filter(tasks => tasks.projects === theSorter)
        myTaskSorted = myTaskSortedPlaceholder
        localStorage.setItem('myTaskSorted', JSON.stringify(myTaskSorted)) //save myTaskSorted to local storage
        return myTaskSorted
    }

}

//icon buttons logic
export function editButtonLogic(index) {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup-new-task').style.display = 'flex';
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
        localStorage.setItem('myTask', JSON.stringify(myTask)) //save myTask to local storage
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
        localStorage.setItem('myTask', JSON.stringify(myTask)) //save myTask to local storage
        renderMytasktoPage(myTaskSorted)
    }
}

//delete and rename project button logic and its consequences to the tasks inside the edited/deleted project
export function deleteWholeTasksInsideProject(nameOfProject) {
    let myTaskPlaceholder = myTask.filter(as => as.projects != nameOfProject)
    myTask = myTaskPlaceholder
    localStorage.setItem('myTask', JSON.stringify(myTask)) //save myTask to local storage
    renderMytasktoPage(myTask)
    return myTask
}

export function renameWholeTasksIndideProject(nameOfProject, updatedProjectName) {
    for(let i=0;i<myTask.length;i++) {
        if(myTask[i].projects == nameOfProject) {
            myTask[i].projects = updatedProjectName
        }
    }
    renderMytasktoPage(myTask)
}