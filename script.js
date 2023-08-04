let titleTodo = document.getElementById('title')
let dateTodo = document.getElementById('date')
let priorityTodo = document.getElementById('priority')
let descriptionTodo = document.getElementById('description')
const submitTodo = document.getElementById('submit-todo')
const form = document.getElementById('form')
const addProject = document.querySelector('.project-add')
let projects = document.querySelector('.projects')
let defaultProject = document.querySelector('.project')
let todos = document.querySelector('.todos')

let projectsArray = [[]]

class Todo {
    constructor(title, date, priority, description) {
        this.title = title
        this.date = date
        this.priority = priority
        this.description = description
    }
    getDate() { 
        let options = { year: 'numeric', month: 'short', day: 'numeric' }
        let d = new Date(this.date + 'T00:00-0800') 
        let actualDate = d.toLocaleDateString('en-US', options)   
        return actualDate
    }
}


/*function saveData() {
    localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
}

function loadData() {
    const storedData = localStorage.getItem('projectsArray')
    if (storedData) {
        if (projectsArray.length == 1) {
            displayProjectTodos(document.querySelectorAll('.project'))
        }
    }
}*/


submitTodo.addEventListener('click', addTodo)

addProject.addEventListener('click', projectPrompt)


function addTodo(e) {
    e.preventDefault()
    if (titleTodo.value == '' || dateTodo.value == '') {
        return 
    } else {
        let todo = new Todo(titleTodo.value, dateTodo.value, priorityTodo.value, descriptionTodo.value)
        form.reset() 
        arrayPush(todo)
        displayTodo(todo)
    }
}

function arrayPush(todoPushed) {
    let allProjects = document.querySelectorAll('.project')
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].classList.contains('active')) {
            projectsArray[i].push(todoPushed)
        }
    }
}

function displayTodo(todoItem) {
    let todoCard = document.createElement('div')
    todoCard.classList.add('todo')
    todos.appendChild(todoCard)

    let todoCardInfo = document.createElement('div')
    todoCardInfo.classList.add('todo-info')
    let todoCardDescription = document.createElement('div')
    todoCardDescription.classList.add('todo-description')
    todoCardDescription.innerHTML = todoItem.description
    todoCard.append(todoCardInfo, todoCardDescription)

    let todoCardTitle = document.createElement('div')
    todoCardTitle.classList.add('todo-title')
    todoCardTitle.innerHTML = todoItem.title
    let todoCardDate = document.createElement('div')
    todoCardDate.classList.add('todo-date')
    todoCardDate.innerHTML = todoItem.getDate()
    let todoCardPriority = document.createElement('div')
    todoCardPriority.classList.add('todo-priority')
    todoCardPriority.innerHTML = `Priority: ${todoItem.priority.charAt(0).toUpperCase() + todoItem.priority.slice(1)}`
    let todoCardOptions = document.createElement('div')
    todoCardOptions.classList.add('todo-options')
    let todoCardDetails = document.createElement('button')
    todoCardDetails.classList.add('details')
    todoCardDetails.innerHTML = 'See details'
    let todoCardRemove = document.createElement('i')
    todoCardRemove.classList.add('remove-todo', 'fa', 'fa-trash-o')
    todoCardRemove.style = 'font-size:24px;'
    todoCardOptions.append(todoCardDetails, todoCardRemove)
    todoCardInfo.append(todoCardTitle, todoCardDate, todoCardPriority, todoCardOptions)

    
    todoCardDetails.addEventListener('click', () => {
        if (todoCardDetails.innerHTML == 'See details') {
            todoCardDetails.innerHTML = 'Hide details'
            todoCard.classList.add('show')
        } else {
            todoCardDetails.innerHTML = 'See details'
            todoCard.classList.remove('show')
        }
    })

    todoCardRemove.addEventListener('click', () => {
        todoCard.remove()
        let allProjects = document.querySelectorAll('.project')
        for (let i = 0; i < allProjects.length; i++) {
            if (allProjects[i].classList.contains('active')) {
                let index = projectsArray[i].indexOf(todoItem)
                projectsArray[i].splice(index, 1)
                console.log(projectsArray[i])
            }
        }
    })

}

function projectPrompt() {
    let projectId = prompt('Name of the project?')
    if (projectId === null) {
        return 
    }
    projectAdd(projectId)
}

function projectAdd(id) {
    let nestedArray = new Array ()
    projectsArray.push(nestedArray)
    console.log(projectsArray)
    projectDisplay(nestedArray, id)
}


function projectDisplay(item, id) {
    let project = document.createElement('div')
    project.classList.add('project')
    projects.appendChild(project)

    let projectName = document.createElement('div')
    projectName.classList.add('project-name')
    if (id == '') {
        projectName = 'Project'
    } else {
        projectName = id
    }
    let projectRemove = document.createElement('div')
    projectRemove.classList.add('project-remove')
    project.append(projectName, projectRemove)
    let removeProjIcon = document.createElement('i')
    removeProjIcon.classList.add('remove', 'fa', 'fa-trash-o')
    removeProjIcon.style = 'font-size:24px;'
    projectRemove.appendChild(removeProjIcon)

    removeProjIcon.addEventListener('click', () => {
        project.remove()
        let index = projectsArray.indexOf(item)
        projectsArray.splice(index, 1)
        console.log(projectsArray)
    })

    project.addEventListener('click', () => {
        projectSelect(project)
    })

}

defaultProject.addEventListener('click', () => {
    projectSelect(defaultProject)
})

function projectSelect(div) {
    let allProjects = document.querySelectorAll('.project')
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].classList.contains('active')) {
            allProjects[i].classList.remove('active')
        } 
    }
    div.classList.add('active')
    displayProjectTodos(allProjects)
}

function displayProjectTodos(allProjects) {
    todos.replaceChildren()
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].classList.contains('active')) {
            for (let j = 0; j < projectsArray[i].length; j++) {
                displayTodo(projectsArray[i][j])
            }
        }
    }
}


/*window.onload = function() {
    loadData()
}*/ 


