import * as dom from './dom.js'
import * as todos from './todos.js'

const LOCAL_STORAGE_PROJECT_KEY = 'project.lists'

export let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || ['Work', 'Personal']

export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
    todos.save()
    renderProjectsArray()
}



export function renderProjectsArray () {
    cleanProjectListItems(dom.projectList)
    cleanProjectListItems(dom.projectSelectionContainer)
    dom.projectsListItems = document.querySelectorAll('.projects-list')
    projects.forEach(item => {
    const newProject = document.createElement('li');
    newProject.innerHTML = item;
    newProject.classList.add('projects-list');
    dom.projectList.append(newProject)
    return dom.projectsListItems;
})
}

export function cleanProjectListItems(domElement){
    let container = domElement 
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

dom.addProjectButton.addEventListener('click', function(e){
    todos.save()
    e.preventDefault()
    if (dom.newProjectInput.value === "") {
    } else {
        let newProject = dom.newProjectInput.value;
        projects.push(newProject)
        dom.newProjectInput.value = "";
        save()
        dom.projectsListItems = document.querySelectorAll('.projects-list')
        todos.renderProjectsListItems()
        dom.updateProjectListItems()
        dom.updateProject()
    }
})

