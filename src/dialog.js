import { ProvidePlugin } from "webpack"
import { displayProject, displayProjects } from "./dom-manipulate"
import { Project } from "./project-class"

const toDoDialog = document.querySelector("#to-do-dialog")
const titleInput = document.querySelector("#title-input")
const describeInput = document.querySelector("#describe-input")
const dateInput = document.querySelector("#date-input")
const priorityInput = document.querySelector("#priority-input")

const projectDialog = document.querySelector("#project-dialog")
const projectTitleInput = document.querySelector("#project-title")

export function showProjectDialog(){
    const projectSubmitBtn = document.querySelector("#submit-project-btn")
    projectDialog.showModal()
    projectSubmitBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        const newProject = new Project(projectTitleInput.value)
        displayProject(newProject)
        projectDialog.close()
    }
    )

}
export function showToDoDialog(project){
    const toDoSubmitBtn = document.querySelector("#submit-to-do-btn")
    toDoDialog.showModal()
    toDoSubmitBtn.addEventListener("click", project.handleInput)
 
    
}

export function handleToDoDialog(event, project){
    if(!event.defaultPrevented){
        event.preventDefault()
        toDoDialog.close()  
        project.addToDoToArray(project.createToDo(titleInput.value, describeInput.value, dateInput.value, priorityInput.value))
        displayProject(project)
    }
}
