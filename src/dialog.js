import { displayProject, refreshProject,addOptionToProjectSelection } from "./dom-manipulate"
import { Project } from "./project-class"
import { projectArray } from "."
import { allSelected } from "./selection-handlerer"


const toDoDialog = document.querySelector("#to-do-dialog")
const titleInput = document.querySelector("#title-input")
const describeInput = document.querySelector("#describe-input")
const dateInput = document.querySelector("#date-input")
const priorityInput = document.querySelector("#priority-input")
const once = {
    once: true,
  };

const projectDialog = document.querySelector("#project-dialog")
const projectTitleInput = document.querySelector("#project-title")

export function showProjectDialog(){
    const projectSubmitBtn = document.querySelector("#submit-project-btn")
    projectDialog.showModal()
    projectSubmitBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        const newProject = new Project(projectTitleInput.value)
        projectArray.push(newProject)
        if (allSelected){displayProject(newProject)}
        else{addOptionToProjectSelection(newProject)}
        projectTitleInput.value=""
        projectDialog.close()
    },once
    )

}
export function showToDoDialog(project){
    
    const toDoSubmitBtn = document.querySelector("#submit-to-do-btn")
    toDoDialog.showModal()
    console.log("Before event listener:")
    console.log(project.title)
    toDoSubmitBtn.addEventListener("click", project.handleInput, once)
 
    
}

export function handleToDoDialog(event, project){
    
    event.preventDefault() 
    project.addToDoToArray(project.createToDo(titleInput.value, describeInput.value,dateInput.value?new Date(dateInput.value):null, parseInt(priorityInput.value)))
    refreshProject(project)
    clearToDoDialog()
    toDoDialog.close() 
    
}

function clearToDoDialog(){
    titleInput.value = ""
    describeInput.value = ""
    dateInput.value = ""
}