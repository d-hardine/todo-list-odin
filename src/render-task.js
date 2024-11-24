import { editButtonLogic } from './data-control';
import { deleteButtonLogic } from './data-control';
import iconEdit from './icon-edit.svg'
import iconDelete from './icon-trash.svg';


let mainPage = document.querySelector('.main')

export function renderMytasktoPage(myTask) {

    if(myTask.length != 0) {
        mainPage.textContent = ''
        mainPage.style.justifySelf = 'normal'
        mainPage.style.alignContent = 'normal'

        let mainTitle = document.createElement('div')
        mainTitle.textContent = 'MY TASKS'
        mainTitle.classList.add('main-title')
        mainPage.appendChild(mainTitle)

        for(let i=0; i<myTask.length;i++) {
            
            //create task container
            let taskContainer = document.createElement('div')
            taskContainer.classList.add('task-container')
            taskContainer.classList.add(myTask[i].priority.toLowerCase())
            mainPage.appendChild(taskContainer)

            //create task project and priority container
            let projectPriorityContainer= document.createElement('div')
            projectPriorityContainer.classList.add('project-priority-container')
            taskContainer.appendChild(projectPriorityContainer)
            //create task project
            let taskProject = document.createElement('div')
            taskProject.classList.add('task-project')
            projectPriorityContainer.appendChild(taskProject)
            taskProject.textContent = `${myTask[i].projects}`
            //create task priority
            let taskPriority = document.createElement('div')
            taskPriority.classList.add('task-priority')
            projectPriorityContainer.appendChild(taskPriority)
            taskPriority.textContent = `Priority: ${myTask[i].priority}`

            //create task title
            let taskTitle = document.createElement('div')
            taskTitle.classList.add('task-title')
            taskContainer.appendChild(taskTitle)
            taskTitle.textContent = `${myTask[i].title}`
            //create task description
            let taskDescription = document.createElement('div')
            taskDescription.classList.add('task-description')
            taskContainer.appendChild(taskDescription)
            taskDescription.textContent = myTask[i].description

            //create due title
            let dueTitle= document.createElement('div')
            dueTitle.classList.add('due-title')
            taskContainer.appendChild(dueTitle)
            dueTitle.textContent = 'Due Date:'

            //create bottom container
            let bottomContainer= document.createElement('div')
            bottomContainer.classList.add('bottom-container')
            taskContainer.appendChild(bottomContainer)
            
            //create due container
            let dueContainer= document.createElement('div')
            dueContainer.classList.add('due-container')
            bottomContainer.appendChild(dueContainer)
            //create task due date
            let taskDueDate = document.createElement('div')
            taskDueDate.classList.add('task-due-date')
            dueContainer.appendChild(taskDueDate)
            taskDueDate.textContent = `${myTask[i].dueDate}`
            //create task due time
            let taskDueTime = document.createElement('div')
            taskDueTime.classList.add('task-due-time')
            dueContainer.appendChild(taskDueTime)
            taskDueTime.textContent = myTask[i].dueTime

            //create icon container
            let iconContainer= document.createElement('div')
            iconContainer.classList.add('icon-container')
            bottomContainer.appendChild(iconContainer)
            //create complete button
            let completeBtn = document.createElement('button')
            completeBtn.textContent = 'complete'
            completeBtn.classList.add('complete-button')
            iconContainer.appendChild(completeBtn)
            completeBtn.addEventListener('click', function() {
                event.preventDefault();
                if (taskContainer.classList.contains('completed') === false) {
                    taskContainer.classList.add('completed')
                    completeBtn.classList.add('done')
                }
                else if ((taskContainer.classList.contains('completed') === true)) {
                    taskContainer.classList.remove('completed')
                    completeBtn.classList.remove('done')
                }
            })
            //create task edit icon
            let editIcon = document.createElement('img')
            editIcon.classList.add('edit-icon')
            editIcon.src = iconEdit
            editIcon.style.height = '25px'
            iconContainer.appendChild(editIcon)
            editIcon.addEventListener('click', () => editButtonLogic(i))
            //create task edit delete
            let deleteIcon = document.createElement('img')
            deleteIcon.classList.add('delete-icon')
            deleteIcon.src = iconDelete
            deleteIcon.style.height = '25px'
            iconContainer.appendChild(deleteIcon)
            deleteIcon.addEventListener('click', () => deleteButtonLogic(i))

        }
    }
    else {
        mainPage.textContent = 'No Task'
        mainPage.style.justifySelf = 'center'
        mainPage.style.alignContent = 'center'

    }

}