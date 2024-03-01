import { displayProject, refreshProject,addOptionToProjectSelection } from "./dom-manipulate"
import { Project ,fromNodeElemenetGetProject} from "./project-class"
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

const toDoModDialog = document.querySelector("#to-do-mod-dialog")

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
    toDoSubmitBtn.addEventListener("click", project.handleInput, once)
 
    
}

export function handleToDoDialog(event, project){
    event.preventDefault() 
    project.addToDoToArray(project.createToDo(titleInput.value, describeInput.value,dateInput.value?new Date(dateInput.value):null, parseInt(priorityInput.value)))
    refreshProject(project)
    clearToDoDialog()
    toDoDialog.close() 
    
}

export function showToDoModifyDialog(e){
    console.log(e.target.parentElement.parentElement)
    let project = fromNodeElemenetGetProject(e.target.parentElement.parentElement.parentElement.parentElement)
    const toDOModBtn = document.querySelector("#submit-to-do-mod-btn")
    toDoModDialog.showModal()
    toDOModBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        projectDialog.close()
    },once
    )
}

function clearToDoDialog(){
    titleInput.value = ""
    describeInput.value = ""
    dateInput.value = ""
}