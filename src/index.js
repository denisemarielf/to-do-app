import * as dom from './dom.js'
import * as todos from './todos.js'
import * as projects from './projects.js'


dom.renderTodoList(todos.filterTodosPerCalendar('today'));

projects.renderProjectsArray();

todos.seeDetails()

dom.updateProjectListItems();

todos.renderProjectsListItems()

dom.displayForm(dom.todoButton)
