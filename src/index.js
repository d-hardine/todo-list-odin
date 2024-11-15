import './styles.css';

const newTask = document.querySelector('.new-task-btn')
const closeBtn = document.querySelector('.close-popup-btn')

newTask.addEventListener('click', () => {
    document.querySelector('.popup-new-task').style.display = 'flex'
})

closeBtn.addEventListener('click', () => {
    document.querySelector('.popup-new-task').style.display = 'none'
})