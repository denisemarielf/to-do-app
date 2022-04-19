import * as dom from "./dom";
import {parseISO, isThisWeek, isToday, isThisMonth} from 'date-fns'


export class Todo {
    constructor (title, description, dueDate, priority, project, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project= project;
        this.id = this.title.toLowerCase().split(" ").join('-');
    }
}


export const LOCAL_STORAGE_LIST_KEY = 'todo.lists'

export let defaultTodos = [new Todo("Video conference", "Have a conference call with the management team in Australia", new Date(), "High", "Work"), 
new Todo("Meeting", "Meet with executive assistant to go over the agenda for the week", new Date(2022,3,1), "Medium", "Work"), 
new Todo("Doctor's appointment", "Don't forget to bring prescription drugs I take", new Date(2022,2,3), "High", "Personal")]

if (localStorage.length === 0){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(defaultTodos))
}

export let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY));

export function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(todos))
}

function newTodo (){
    const todoTitle = document.getElementById('new-todo-title').value;
    const todoDate = document.getElementById('new-todo-date').value;
    const todoDescription = document.getElementById('new-todo-description').value;
    const todoPriority = document.getElementById('new-todo-priority').value;
    const todoProject = document.getElementById('new-todo-project-selection').value;

    if (todoTitle === "" || todoDate === "" || todoDescription === "" || todoPriority === "" || todoProject === "") {
        let div = document.createElement('div');
        div.innerHTML="Please fill out all fields"
        dom.addTodoForm.append(div)
        setTimeout(function(){
            dom.addTodoForm.lastElementChild.remove();
        }, 5000)
    } else {
        todos.push(new Todo(todoTitle, todoDescription, new Date(todoDate), todoPriority, todoProject))
        dom.addTodoForm.className = 'visible' ? dom.addTodoForm.className = 'hidden' : dom.addTodoForm.className = 'visible';
        save()
    }
    
}


dom.addTodoButton.addEventListener('click', function(e){
    e.preventDefault();  
    newTodo();
    save()
})


function cleanTodos(){
    let container = document.querySelector('.todo-body');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
        
    }
}


export function filterTodosPerProject(selection) {
    
    cleanTodos()
    let result = todos.filter(todo => todo.project.toLowerCase() === selection)
        dom.renderTodoList(result)    
}

export function renderProjectsListItems() {
    
    dom.projectsListItems.forEach(element => {
    element.addEventListener('click', function(){
        filterTodosPerProject(element.innerHTML.toLowerCase()) 
        deleteTodos()
        seeDetails()
        
    })
});
}


function filterTodosPerCalendar(date) {
    
    if (date == 'today') {
        let result = todos.filter(todo => isToday(parseISO(todo.dueDate)))
        return result;
    } else if (date == 'week') {
        let result = todos.filter(todo => isThisWeek(parseISO(todo.dueDate)))
        return result;
    } else if (date == 'month') {
        let result = todos.filter(todo => isThisMonth(parseISO(todo.dueDate)))
        return result;
    } else {
        let result = todos;
        return result;
    }
    
}

function deleteTodos () {
   
    let deleteItems = document.querySelectorAll('.delete-item-button');
        deleteItems.forEach(item => {
            item.addEventListener('click', function(){
                let itemId = item.parentElement.getAttribute('id')
                let index = todos.findIndex(item => item.id === itemId);
                todos.splice(index, 1)
                defaultTodos.splice(index, 1)
                save()
            } 
        )})     
}

dom.calendarListItems.forEach(element => {
    element.addEventListener('click', function(){
        cleanTodos();
        dom.renderTodoList(filterTodosPerCalendar(element.innerHTML.toLowerCase()))
        deleteTodos()
        seeDetails()
       
    })
});



export function seeDetails (item) {
    let todosDescription = document.querySelectorAll('.description-button')
    
    todosDescription.forEach(item => {
        item.addEventListener('click', function(){
          
            let itemId = item.parentElement.getAttribute('id')
            let itemParent = item.parentElement;
            let index = todos.findIndex(item => item.id === itemId);
            let todo = todos[index];
            let section = document.createElement('section');
            section.setAttribute('class', 'section')
            section.setAttribute('id', 'section-'+itemId)
            let dl = document.createElement('dl');
            
            for(const property in todo) {
                if (property !== 'id' && property !== 'priority' && property !== 'title' && property !== 'dueDate') {
                    if (property === 'description') {
                        let dt = document.createElement('dt')
                        dt.innerHTML = "Description"
                        dt.setAttribute('id', 'description-title')
                        let dd = document.createElement('dd')
                        dd.innerHTML = todo[property]
                        dd.setAttribute('id', 'description-description')
                        dl.append(dt, dd)
                    } else {
                        let dt = document.createElement('dt')
                        dt.innerHTML = "Project"
                        dt.setAttribute('id', 'project-title')
                        let dd = document.createElement('dd')
                        dd.innerHTML = todo[property]
                        dd.setAttribute('id', 'project-description')
                        dl.append(dt, dd)
                    }
                }
            }

           if (itemParent.nextElementSibling && itemParent.nextElementSibling.getAttribute('class') === "todo-item") {
                   section.append(dl) 
                    itemParent.after(section)
                    
               } else if (itemParent.nextElementSibling && itemParent.nextElementSibling.getAttribute('class') === 'section') {
               let itemToRemove = document.getElementById('section-'+itemId);
               itemToRemove.remove()
                
           } else if (!itemParent.nextElementSibling) {
            section.append(dl) 
            itemParent.after(section)
            
           }
        })
    })  
}

export {filterTodosPerCalendar} 