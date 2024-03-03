import {Project} from './project-class'
import {ToDo} from './to-do-class'
import { displayProject} from './dom-manipulate'
import './style.css'
import { showProjectDialog,showToDoGlobalDialog } from './dialog'
import { handleProjectSelection ,handleToDoCheckedSelection,handleToDoPrioritySelection} from './selection-handlerer'
import  Icon from "./to-do-icon.png"

const addProjectBtn = document.querySelector("#add-project")
const addToDoBtn = document.querySelector("#add-to-do-global")
const projectSelector = document.querySelector("#project-select")
const toDoCheckedSelector = document.querySelector("#to-do-checked-select")
const toDoPrioritySelector = document.querySelector("#to-do-priority-select")

const header = document.querySelector("header")
const headerIcon = new Image()
headerIcon.src = Icon
header.appendChild(headerIcon)

export const projectArray = []


const myProject = new Project("HouseWorks")
const myProject2 = new Project("School")
projectArray.push(myProject)
projectArray.push(myProject2)

const myTodo1 = new ToDo("Go shopping","Need some ingredients for the evening dinner.",(new Date("October 13, 2014 11:13")),0);
const myTodo2 = new ToDo("Make dinner","Sunday night the relatives come for us.",(new Date()),1);


addProjectBtn.addEventListener("click", showProjectDialog)
addToDoBtn.addEventListener("click",showToDoGlobalDialog)
projectSelector.addEventListener("change",handleProjectSelection)
toDoCheckedSelector.addEventListener("change",handleToDoCheckedSelection)
toDoPrioritySelector.addEventListener("change",handleToDoPrioritySelection)

myProject.addToDoToArray(myTodo1)
myProject.addToDoToArray(myTodo2)



displayProject(myProject)
displayProject(myProject2)


