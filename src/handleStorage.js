import { projectArray } from ".";
import { displayProject} from './dom-manipulate'
import { Project } from "./project-class";

export function setStorageForProject(project){
    localStorage.setItem(JSON.stringify(project.title),
    JSON.stringify({"title":project.title,"toDoArray":project.toDoArray.map((todo)=>storeToDO(todo))}))
}

export function removeProjectFromLocalStorage(project){
    localStorage.removeItem(JSON.stringify(project.title))
}

export function loadAllFromStorage(){
    Object.keys(localStorage).forEach(function(key){
        const JSONdata = JSON.parse(localStorage.getItem(key))
        console.log(JSONdata)
        const newProject = new Project(JSONdata.title)
        JSONdata.toDoArray.forEach(todo=>{
            const newTodo = newProject.createToDo(todo.title,todo.describe,new Date(todo.dueDate),todo.priority,todo.check)
            console.log(newTodo)
            newProject.addToDoToArray(newTodo)
        })
        projectArray.push(newProject)
        displayProject(newProject)
     });
    
}

function storeToDO(todo){
return {
    "title":todo.title,
    "describe":todo.describe,
    "dueDate":todo.dueDate,
    "priority":todo.priority,
    "check":todo.check
}
}