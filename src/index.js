import {Project} from './project-class'
import {ToDo} from './to-do-class'
import { displayProject} from './dom-manipulate'
import './style.css'
import { showProjectDialog } from './dialog'

const myProject = new Project("example")
const myProject2 = new Project("example2")
const myTodo1 = new ToDo("task1","do task1",(new Date()).getDate(),"high");
const myTodo2 = new ToDo("task2","do task2",(new Date()).getDate(),"medium");
const addProjectBtn = document.querySelector("#add-project")

addProjectBtn.addEventListener("click", showProjectDialog)

myProject.addToDoToArray(myTodo1)
myProject.addToDoToArray(myTodo2)
displayProject(myProject)
displayProject(myProject2)
