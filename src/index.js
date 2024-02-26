import {Project} from './project-class'
import {ToDo} from './to-do-class'
import { displayProject} from './dom-manipulate'
import './style.css'

const myProject = new Project("example")
const myTodo1 = new ToDo("task1","do task1",(new Date().getDate),"high",0);
const myTodo2 = new ToDo("task2","do task2",(new Date().getDate),"medium",0);

myProject.addToDo(myTodo1)
myProject.addToDo(myTodo2)
console.log(myProject)
displayProject(myProject)
displayProject(myProject)