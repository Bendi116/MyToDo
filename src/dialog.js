import { displayProject, refreshProject } from "./dom-manipulate"
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
    const once = {
        once: true,
      };
    const toDoSubmitBtn = document.querySelector("#submit-to-do-btn")
    toDoDialog.showModal()
    console.log("Before event listener:")
    console.log(project.title)
    toDoSubmitBtn.addEventListener("click", project.handleInput, once)
 
    
}

export function handleToDoDialog(event, project){
    
    event.preventDefault() 
    project.addToDoToArray(project.createToDo(titleInput.value, describeInput.value, dateInput.value, priorityInput.value))
    refreshProject(project)
    clearToDoDialog()
    toDoDialog.close() 
    
}

function clearToDoDialog(){
    titleInput.value = ""
    describeInput.value = ""
    dateInput.value = ""
}