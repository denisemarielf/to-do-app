import {format, parseISO} from 'date-fns'

export let calendarListItems = document.querySelectorAll('.calendar-list');
export let projectsListItems = document.querySelectorAll('.projects-list');
export const addProjectButton = document.querySelector('#add-projects-button');
export const addTodoButton = document.querySelector('#add-todo-button');
export const mainH2 = document.getElementById('main-title')
export let newProjectInput = document.getElementById('new-project');
export const projectList = document.getElementById('project-list');
export const projectSelection = document.getElementById('new-todo-project-selection')
export const navListItems = document.querySelectorAll('li')
export let projectSelectionContainer = document.querySelector('#new-todo-project-selection');
export const todoButton = document.querySelector('.todo-button')
export let addTodoForm = document.querySelector('#new-todo-form')
export let deleteTodoButton = document.querySelectorAll('.delete-item-button')
export let closeTodosButton = document.getElementById('close-button')

function updateMainTitle(item) {
    mainH2.innerText = item.innerText;
}

function updateTextFormatting(item, listItems){
    listItems.forEach(item=>{
        delete item.dataset.text;
    })
    item.dataset.text="bold";
}

export function updateProject () {
    calendarListItems = document.querySelectorAll('.calendar-list');
    projectsListItems = document.querySelectorAll('.projects-list');
    projectsListItems.forEach(item => {
    item.addEventListener('click', function(){
        updateTextFormatting(item, calendarListItems)
        updateTextFormatting(item, projectsListItems);
        updateMainTitle(item); 
    })
})
}


navListItems.forEach(item => {
    item.addEventListener('click', function(){
        updateTextFormatting(item, navListItems);
        updateTextFormatting(item, projectsListItems);
        updateTextFormatting(item, calendarListItems)
        updateMainTitle(item);
        updateProject()
    })
})

export function renderTodoList (todoList) {
    if(Object.keys(todoList).length > 0){    
    todoList.forEach(todo => {
        const todosContainer = document.querySelector('.todo-body')
        const todoElement = document.createElement('div')
        todoElement.classList.add('todo-item')
        todoElement.setAttribute('id', todo.id)
        const spanTitle = document.createElement('span')
        const spanPriority = document.createElement('div')
        spanPriority.innerHTML="◌"
        switch (todo.priority.toLowerCase()) {
            case 'high':
                spanPriority.style.color='red';
                break;
            case 'medium':
                spanPriority.style.color='yellow';
                break;
            case 'low':
                spanPriority.style.color="green"
                break;        
        }

        spanTitle.textContent = todo.title;
        const spanDate = document.createElement('span')
        let date = parseISO(todo.dueDate)
        spanDate.innerHTML = format((date), 'dd MMMM yyyy');
        const buttonDescription = document.createElement('button')
        buttonDescription.textContent="🛈"
        buttonDescription.setAttribute('class', 'description-button')
        const buttonDelete = document.createElement('button')
        buttonDelete.setAttribute('class', 'delete-item-button')
        buttonDelete.innerHTML="❌"
        buttonDelete.addEventListener('click', function(){
            this.parentElement.remove();
        })

        todoElement.append(spanPriority, spanTitle, spanDate, buttonDescription, buttonDelete)
        todosContainer.appendChild(todoElement)
        return todosContainer;
    })

    } else {
        const todosContainer = document.querySelector('.todo-body')
        const h2 = document.createElement('h2')
        h2.innerHTML = 'There are no todos'
        todosContainer.append(h2)
    }    
}

export function updateProjectListItems () {
    projectsListItems = document.querySelectorAll('.projects-list');
    projectsListItems.forEach(item => {
            let newOption = document.createElement('option');
            newOption.innerText = item.innerHTML;
            newOption.value = item.innerHTML.toLowerCase()
            projectSelection.appendChild(newOption)
    })
}

export function displayForm (button) {
    button.addEventListener('click', function(){
    addTodoForm.className = 'hidden' ? addTodoForm.className = 'visible' : addTodoForm.className = 'hidden';     

})
}

closeTodosButton.addEventListener('click', function() {
    addTodoForm.className = 'visible' ? addTodoForm.className = 'hidden' : addTodoForm.className = 'visible';
})