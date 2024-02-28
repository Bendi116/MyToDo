import {Project} from './project-class'
import {ToDo} from './to-do-class'
import { displayProject} from './dom-manipulate'
import './style.css'
import { showProjectDialog } from './dialog'



const addProjectBtn = document.querySelector("#add-project")
export const projectArray = []


const myProject = new Project("example")
const myProject2 = new Project("example2")
projectArray.push(myProject)
projectArray.push(myProject2)

const myTodo1 = new ToDo("task1","do task1",(new Date("October 13, 2014 11:13")),0);
const myTodo2 = new ToDo("task2","do task2",(new Date()),1);
const myTodo3 = new ToDo("task3","do task3",(new Date('1993')),0);


addProjectBtn.addEventListener("click", showProjectDialog)

myProject.addToDoToArray(myTodo1)
myProject.addToDoToArray(myTodo2)
myProject.addToDoToArray(myTodo3)



displayProject(myProject)
displayProject(myProject2)
